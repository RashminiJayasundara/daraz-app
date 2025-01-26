import React,{useEffect, useReducer} from 'react'
import { useLocation } from 'react-router-dom'
import SearchResultShower from '../components/SearchResultShower'
import axios from 'axios';
import { productInfo } from '../components/MoreToLove';
import { actionInfo } from '../storeProvider';
import LoadingIndecator from '../components/LoadingIndecator';
import SearchResultTemplate from '../Templates/SearchResultTemplate';


interface fetchData{
    data:productInfo[],
    error:string;
    loading:boolean
    
}

function reducer(state:fetchData,action:actionInfo):fetchData{
    switch(action.type){
        case 'FETCH_SUCCESS':
            return {...state,data:action.payload,loading:false}
        case 'FETCH_REQUEST':
            return {...state,loading:true}
        case 'FETCH_ERROR':
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

function SearchResultPage () {
  const location = useLocation()
  const searchText = location.state
  const initState:fetchData ={
    data:[],
    error:"",
    loading:false
  }
  const[state,distpatch]= useReducer(reducer,initState)
  const instance = axios.create({
    baseURL: 'https://190072a114e14b8291119e8a8bc98065.asia-south1.gcp.elastic-cloud.com:443',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'ApiKey NlZ0UEI1UUJtOHJHVUFHa2RwcGk6dWJYLUx4VWFUQ0c1M2FpQTh4a2V2Zw==', // Replace with your actual API Key
    },
  });

    
 useEffect(()=>{
    const fetch = async ()=>{
        distpatch({type:'FETCH_REQUEST'})
        instance.post('/_search', {
        query: {
          match: { category: searchText }, // Replace with your field and value
        },
      })
      .then((response) => {
        distpatch({type:'FETCH_SUCCESS',payload:response.data.hits.hits.map((item:any)=>item._source)})
        console.log('Response:', response.data);
      })
      .catch((error) => {
        distpatch({type:'FETCH_ERROR',payload:error})
        console.error('Error:', error);
      });}
      fetch();
 },[ searchText])
  return (
    <div>
        {state.loading? <SearchResultTemplate/> :
        <SearchResultShower products={state.data}/>}
        
    </div>
  )
}

export default SearchResultPage