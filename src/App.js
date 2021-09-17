import React from 'react'
import useFetchJobs from './useFetchJobs'
import { Container } from 'react-bootstrap';
export default function App() {
  
  const {contests,loading,error }=useFetchJobs();
  
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error  && <h1>Try Refressing or click <b>f5</b></h1>}
      
      
{/* 
      if(contests.result){
        contests.result.map(obj => (
          <li>
            {obj.name}
          </li>
        ))
      } */}
  
      const {result}=contests;
      <h1>{contests.status}</h1>
    </Container>
  )
}

