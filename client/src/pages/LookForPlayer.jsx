import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React,{useState} from "react";
import axios from "axios"


function LookForPlayer() {
  const [input,setInput]=useState("");
  const fetchData=async (value)=>{
    try {
        const response=await axios.get(`https://localhost:8080/api/users/search-player?q=${value}`)
        const data=response.data
        console.log(data);
    } catch (error) {
      console.error("mahabech yekhdem")
      console.log(error)
      
    }
  }
  const handleChange=(value)=>{
    setInput(value)
    fetchData(value)
  }
  return (
    <>
      <h1>Look For Player</h1>

      <div className='search'>
        <input
          type='text'
          className='searchTerm'
          placeholder='Look for a player'
          value={input}
          onChange={(e)=>handleChange(e.target.value)}
        />
        <button
          type='submit'
          className='searchButton'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size='xl'
            style={{ color: "#ccc" }}
          />
        </button>
      </div>
    </>
  )
}

export default LookForPlayer
