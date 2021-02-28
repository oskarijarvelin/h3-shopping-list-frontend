import { Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App py-5">
      <Container>
        <Row>
          <Col>
            <h1>H3: Shopping List</h1>
            <p className="lead pt-2">Add and remove items from shopping list</p>
          </Col>
        </Row>

        <Row className="pt-4 pb-5 mb-5">
          <Col>
            <div className="d-flex align-items-center">
              <Spinner animation="border" />
              <p className="lead pl-3 m-0">Loading...</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <p>&copy; 2021: Oskari Järvelin, TIK20KM.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
