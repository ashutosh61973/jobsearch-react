import {useEffect, useReducer} from 'react'
import axios from 'axios'
const ACTIONS={
    MAKE_REQUEST:'make-request',
    GET_DATA:'get-data',
    ERORR:'error'
}
function reducer(state,action) {
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
        return {
            loading:true,contests:{}
        }      
        case ACTIONS.GET_DATA:
        return {
            ...state,loading:false,contests:{...state.contests,...action.payload.contests}      
        }  
        case ACTIONS.ERORR:
        return {
             ...state,loadin:false,error:action.payload.error ,contests:{}      
        }  
        default:
            return state 
    }
}
const BASE_URL='https://codeforces.com/api/contest.list'
export default function useFetchJobs(params,page){
    const initialState={contests:{},loading:true,error:false};
    const [state, dispatch] = useReducer(reducer, initialState)

    // const base_end=`${BASE_URL}+${endpoint}`
    useEffect(() => {
        dispatch({type:ACTIONS.MAKE_REQUEST});
        axios.get(BASE_URL,{
            params:{
                ...params
            }
        }).then(res=>{
            console.log(res.data);
            dispatch({type:ACTIONS.GET_DATA,payload:{contests:res.data}})
        }).catch((err)=>{
            dispatch({type:ACTIONS.ERORR,payload:{error:err}})
        })
        return () => {
            // cleanup
        }
    }, [params,page])

    return state
}