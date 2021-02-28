import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const url = 'http://localhost/h3-shopping-list-backend/';

function AddToList({items, setItems}) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);

  function addToList(e) {
    e.preventDefault();
    let status = 0;

    fetch(url + 'add.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: name,
        amount: amount
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          setItems(items => [...items, res]);
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )

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
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let status = 0;

  useEffect(() => {
    fetch(url + 'index.php')
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(
      (response) => {
        if (status === 200) {
          setItems(response);
          setIsLoading(false);
        } else {
          alert(response.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }, [url, status])

  function deleteFromList(id) {
    let status = 0;
    fetch(url + 'delete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          const updatedList = items.filter((item) => item.id !== id);
          setItems(updatedList);
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }

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
            {isLoading === true &&
              <div className="d-flex align-items-center">
                <Spinner animation="border" />
                <p className="lead pl-3 m-0">Loading...</p>
              </div>
            }
            
            {isLoading === false &&
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

                {items.map((item, i) => {
                  return (
                    <Row className={( (i % 2) === 1 ) ? 'bg-light mw-100 mx-auto shopping-list-row' : 'mw-100 mx-auto shopping-list-row'} key={i} >
                      <Col sm={8} className="border-right p-2">
                        {item.description}
                      </Col>
                      <Col sm={2} className="border-right text-center p-2">
                        {item.amount}
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center p-2" sm={2}>
                        <XCircle style={{cursor: "pointer"}} onClick={() => deleteFromList(item.id)} />
                      </Col>
                    </Row>
                  )
                })}
              </div>
            }
          </Col>
          <Col lg={{span: 4, offset: 2}}>
            <AddToList items={items} setItems={setItems} />
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
