import React from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Home = () => {
  return (
    <>
     
      {/* Carousel Section */}
      <Container className="mt-5">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk="
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Winter Collection Sale</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.elwatannews.com/watan/840x473/3492177581705430815.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
            <h3>Winter Collection Sale</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://png.pngtree.com/thumb_back/fh260/background/20230703/pngtree-d-smartphone-with-gifts-and-discount-percentage-e-commerce-web-banner-image_3753281.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
            <h3>Winter Collection Sale</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://t3.ftcdn.net/jpg/06/49/80/60/360_F_649806064_gHA9HPb7BsKjhkFze3B3T0Kdf9Aviw4E.jpg"
              alt="fourth slide"
            />
            <Carousel.Caption>
            <h3>Winter Collection Sale</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Centered Button Section */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '20vh' }} // Full viewport height
      >
        <Link to="/product"> {/* Adjust the path according to your routes */}
          <Button variant="primary">Shop Now</Button>
        </Link>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        <Container>
          <p>&copy; 2024 My Store. All Rights Reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default Home;

