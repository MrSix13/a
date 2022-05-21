import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { useContext } from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './store';
import CartScreen from './screens/CartScreen';

function App() {
  const {state} = useContext(Store);
  const {cart} = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className='nav-link'>
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c)=> a+c.quantity, 0)}
                  </Badge>
                )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
          <Link to="/">Amazona</Link>
        </header>

        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/cart" element={<CartScreen/>}/>
              <Route path="/product/:slug" element={<ProductScreen/>}/>
              <Route path="/" element={<HomeScreen/>}/>
            </Routes>
          </Container>
        </main>
      
        <footer>
          <div className='text-center'>ALL right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
