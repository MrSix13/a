import React, {useContext, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../store';
import CheckoutSteps from '../components/CheckoutSteps';

//27
export default function PlaceOrderScreen(){
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart, userInfo} = state;
    
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) /100;

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a,c) => a+c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice +cart.taxtPrice

    const placeOrderHandler = async () =>{};

    useEffect(()=>{
        if(!cart.paymentMethod){
            navigate('/payment')
        }

    },[cart,navigate])
    return(
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <h1 className='my-3'>Preview Order</h1>
            <Row>
                <Col mb={8}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong>{ cart.shippingAddress.fullName}<br/>
                                <strong>Address: </strong>{cart.shippingAddress.address}<br/>
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                 {cart.shippingAddress.country}
                            </Card.Text>
                            <Link to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>

                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong>   {cart.paymentMethod}
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}