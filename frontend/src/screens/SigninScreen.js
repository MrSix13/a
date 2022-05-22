import { Helmet } from "react-helmet-async";
import {useContext, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from "../store";
import { toast } from "react-toastify";
import { getError } from "../utils";

export default function SigninScreen(){
    const {search} = useLocation();
    const navigate = useNavigate();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {state,dispatch: ctxDispatch} = useContext(Store)
    const {userInfo} = state;

    const submitHandler = async(e)=>{
        e.preventDefault();
        
        try {
            const {data} = await axios.post('/api/users/signin',{
                email,
                password
            });
            console.log(data)
            ctxDispatch({type:'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/' );
        } catch (error) {
            toast.error(getError(error))
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])
    return(
        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    new Costumer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    )
}