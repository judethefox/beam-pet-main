import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";

const PersonDetails = ({ name, description }) => (
  <Container>
    <Row>
      <Col>
        <h1 className="text-center">Meet {name}</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>{description || "No description available"}</p>
      </Col>
    </Row>
  </Container>
);

PersonDetails.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string
};

export default PersonDetails;
