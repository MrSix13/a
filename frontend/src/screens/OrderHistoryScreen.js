import React,{useContext, useEffect, useReducer} from 'react';
import {Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../store';
import { getError } from '../utils';

const reducer = (state,action)=>{
    switch (action.type) {
        case 'FETCH_REQUEST':
            return{...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, orders:action.payload, loading: false}
        case 'FETCH_FAIL':
            return{...state,loading:false, error: action.payload}
        default:
            return state;
    }
}

export default function OrderHistoryScreen(){
    const {state} = useContext(Store);
    const {userInfo} = state;
    const navigate = useNavigate();

    const[{loading,error, orders}, dispatch] = useReducer(reducer,{
        loading:true,
        error:''
    })

    useEffect(()=>{
        const fetchData = async()=>{
            dispatch({type:'FETCH_REQUEST'})
            try {
                const {data} = await axios.get(
                    `/api/orders/mine`,
                    {headers:{Authorization:`Bearer ${userInfo.token}`}}
                )
                dispatch({type:'FETCH_SUCCESS', payload:data})
            } catch (error) {
                dispatch({
                    type:'FETCH_FAIL',
                    payload: getError(error)
                });
            }
        };
        fetchData()
    },[userInfo])
    return(
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <h1>Order History</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ): error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ):(
                <table>
                    
                </table>
            )}
        </div>
    )
}