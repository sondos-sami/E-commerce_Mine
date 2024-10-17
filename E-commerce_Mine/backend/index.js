const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://mongodb:mongodb123456@cluster0.mxx0h.mongodb.net/E-commerce2")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// API creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));


app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


// Create Product Schema
const Product = mongoose.model("Product", {
    id: { 
        type: Number, 
        required: true
     },
    name: {
         type: String,
          required: true 
        },
    image: { 
        type: String, 
        required: true },
    category: { 
        type: String,
         required: true
         },
    new_price: { 
        type: Number,
         required: true
         },
    old_price: { 
        type: Number, 
        required: true 
    },
    date: {
         type: Date, 
         default: Date.now
         },
    available: { 
        type: Boolean,
         default: true },
});

// API for Adding Products
app.post("/addproduct",async(req,res)=>{

    let products = await Product.find({});
    let id;
    if(products.length>0){
        let lastProductInProductsArray = products.slice(-1);
        let lastProduct = lastProductInProductsArray[0];
        id = lastProduct.id+1;
    }else{
        id = 1;
    }

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log("Saved Successfully");

    res.json({
        success:true,
        name:req.body.name,
    })
})

// API for Deleting Products
app.post("/deleteproduct", async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed Successfully");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// API for getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});
app.get("/allproducts/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ id: Number(id) }); // Assuming id is a Number in your database
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send(product);
  });
  
// User Schema
const User = mongoose.model('User', {
    name: { 
        type: String 
    },
    email: { 
        type: String,
         unique: true
         },
    password: { 
        type: String
     },
    cartData: {
         type: Object
         },
    isAdmin: { 
        type: Boolean,
         default: false
         },
    date: { 
        type: Date,
         default: Date.now 
        },
});

// Admin Schema
const Admin = mongoose.model('Admin', {
    name: { 
        type: String,
         required: true
         },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String,
         required: true 
        },
    date: { 
        type: Date,
         default: Date.now
         },
});

// Sign-up Endpoint
app.post("/signup", async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {
        if (email === 'admin0@gmail.com') {
            return res.json({ success: false, errors: "This is a reserved email!" });
        }

        let existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.json({ success: false, errors: "This email is reserved for an admin!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        await newUser.save();
        res.json({ success: true, message: "User registered successfully!" });
    } catch (err) {
        return res.status(500).json({ success: false, errors: "Server error!" });
    }
});

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.json({
                success: false,
                errors: "Email and password are required!",
            });
        }

        // Main admin check
        if (email === 'admin0@gmail.com') {
            if (password === 'admin0') {
                const data = {
                    user: {
                        id: 'mainAdminId', 
                        isAdmin: true,
                        isMainAdmin: true,
                    },
                };

                const token = jwt.sign(data, "secret_ecom");
                return res.json({
                    success: true,
                    token,
                    isAdmin: true,
                    isMainAdmin: true,
                    redirect: 'http://localhost:5173/', 
                });
            } else {
                return res.json({
                    success: false,
                    errors: "Wrong Password for Main Admin!",
                });
            }
        }

        // Check if user exists in the Admin database
        let admin = await Admin.findOne({ email });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.json({
                    success: false,
                    errors: "Incorrect password!",
                });
            }

           
            const data = {
                user: {
                    id: admin.id,
                    isAdmin: true,
                    isMainAdmin: false, 
                },
            };

            const token = jwt.sign(data, "secret_ecom");
            return res.json({
                success: true,
                token,
                isAdmin: true,
                isMainAdmin: false,
                redirect: 'http://localhost:5173/', 
            });
        }

        // Check if user exists in the User database
        let user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.json({
                    success: false,
                    errors: "Incorrect password!",
                });
            }

            const data = {
                user: {
                    id: user.id,
                    isAdmin: false,
                },
            };

            const token = jwt.sign(data, "secret_ecom");
            return res.json({
                success: true,
                token,
                isAdmin: false,
                redirect: 'http://localhost:5173/home', 
            });
        }

        // If no user or admin found
        return res.json({
            success: false,
            errors: "No user or admin found with this email!",
        });

    } catch (err) {
        console.error("Server error during login:", err.message); 
        return res.status(500).json({ success: false, errors: "Server error! Please check the logs." });
    }
});

// API for adding a new admin
app.post("/addadmin", async (req, res) => {
    const { name, email } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ success: false, message: 'Admin with this email already exists.' });
    }

    const defaultPassword = "admin123";  // default password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newAdmin = new Admin({
        name: name,
        email: email,
        password: hashedPassword,
    });

    await newAdmin.save();
    res.json({ success: true, message: 'Admin added successfully with default password: admin123' });
});

// API for deleting an admin
app.post("/deleteadmin", async (req, res) => {
    const { email } = req.body;

    const admin = await Admin.findOneAndDelete({ email });
    if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found.' });
    }

    res.json({ success: true, message: 'Admin removed successfully.' });
});

// API for listing all admins
app.get("/listadmins", async (req, res) => {
    const admins = await Admin.find({});
    res.json(admins);
});

// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running at port " + port);
    } else {
        console.log("Error " + error);
    }
});










