 
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      {/* Slider */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://althemist.com/wp-content/uploads/2019/07/babystreet-portfolio-main2023.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First Slide</h3>
            <p>Some representative placeholder content for the first slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Slide+2https://althemist.com/wp-content/uploads/2019/07/babystreet-portfolio-main2023.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second Slide</h3>
            <p>Some representative placeholder content for the second slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Slide+3"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third Slide</h3>
            <p>Some representative placeholder content for the third slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Product Section */}
      <h2 className="mt-4">Featured Products</h2>
      <Row>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col md={3} key={idx} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Product {idx + 1}</Card.Title>
                <Card.Text>
                  This is a brief description of the product.
                </Card.Text>
                <button className="btn btn-primary">Add to Cart</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
