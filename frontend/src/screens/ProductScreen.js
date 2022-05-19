import { useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const reducer = (state,action) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state,loading:true};
        case 'FETCH_SUCCESS':
            return {...state,product:action.payload, loading:false};
        case 'FETCH_FAIL':
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}



function ProductScreen(){
    const params = useParams();
    const {slug} = params;

    const [{loading,error,product}, dispatch] = useReducer(reducer, {
        product:[],
        loading: true,
        error: ''
    })
    //const [ products, setProducts] = useState([]);
    
    useEffect(() => {
        const fetchData = async() =>{
            dispatch({type:'FETCH_REQUEST'});
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({type:'FETCH_SUCCESS', payload: result.data})
            } catch (error) {
                dispatch({type:'FETCH_FAIL', payload:error.message})
            }
            //setProducts(result.data);
        };
        fetchData();
    }, [slug]);

    return (
        loading? (<div>Loading..</div>)
         : error? (<div>{error}</div>)
         : (
             <div>
                 <Row>
                     <Col md={6}>
                         <img
                           className="img-large"
                           src={product.image}
                           alt={product.name}
                         />
                     </Col>
                     <Col md={3}></Col>
                     <Col md={3}></Col>
                 </Row>
             </div>
         )
    )
}

export default ProductScreen;