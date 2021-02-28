import { useState } from 'react';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function AddToList() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);

  function addToList(e) {
    e.preventDefault();
    alert(amount + ' x ' + name);
    setAmount(1);
    setName('');
  }

  return (
    <>
      <h4>Add new item to list</h4>
      <Form onSubmit={addToList}>
        <Form.Group controlId="name">
            <Form.Label className="font-weight-bold">Name</Form.Label>
            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="amount">
            <Form.Label className="font-weight-bold">Amount</Form.Label>
            <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit">
            Add To List
        </Button>
      </Form>
    </>
  )
}

function App() {
  var shoppingList = [
    ['Milk', 4],
    ['Coffee', 1],
    ['Eggs', 12]
  ];

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
          <Col lg={6}>
            { false &&
              <div className="d-flex align-items-center">
                <Spinner animation="border" />
                <p className="lead pl-3 m-0">Loading...</p>
              </div>
            }
            
            <div className="border mw-100">
              <Row className="bg-light mw-100 mx-auto">
                <Col sm={8} className="border-right p-2 border-bottom">
                  <b>Name</b>
                </Col>
                <Col sm={2} className="text-center border-right p-2 border-bottom">
                  <b>Pcs.</b>
                </Col>
                <Col sm={2} className="border-bottom"></Col>
              </Row>

              {shoppingList.map((row, i) => {
                return (
                  <Row className={( (i % 2) === 1 ) ? 'bg-light mw-100 mx-auto shopping-list-row' : 'mw-100 mx-auto shopping-list-row'} key={i} >
                    {row.map((item, j) => {
                      return (
                        <Col key={j} sm={(j % 2 === 1) ? 2 : 8} className={(j % 2 === 1) ? 'text-center border-right p-2' : 'border-right p-2'}>
                          {item}
                        </Col>
                      )
                    })}
                    <Col className="text-center p-2" sm={2}>
                      <XCircle style={{cursor: "pointer"}} />
                    </Col>
                  </Row>
                )
              })}
            </div>
          </Col>
          <Col lg={{span: 4, offset: 2}}>
            <AddToList />
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
