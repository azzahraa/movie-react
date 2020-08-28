import React, {useState} from 'react';
import axios from 'axios';
import Search from './component/Search';
import Results from './component/Results';
import Popup from './component/Popup';

import './App.css';
import { v4 as uuidv4 } from "uuid";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Bootstrap from 'react-bootstrap';
function App() {
  const [state, setState] = useState({
    s: "",
    results : [],
    selected : {}
  });
  const apiurl = "http://www.omdbapi.com/?apikey=c55bd46f";
  const search = (e) =>{
    if(e.key === "Enter"){
      axios(apiurl + "&s=" + state.s).then(({ data })=>{
        let results = data.Search;
        setState(prevState=>{
          return {...prevState, results : results}
        })
      })
    }
  }



const handleInput = (e) =>{
  let s= e.target.value
   setState(prevState =>{
     return {...prevState, s:s}
   });
  
}
const openPopup = id =>{
  console.log(id)
  axios(apiurl + "&i=" + id + "&plot=full").then(({ data })=>
  {
    let result=data;
    console.log(result)
    setState(prevState =>{
      return{...prevState, selected: result}
    });
  });
}
const closePopup = () =>{
  setState(prevState =>{
    return{...prevState, selected:{} }
  });
}
  return (
    <div className="App">
      <header><h1>Movie Database App</h1></header>
      <main>
      <Search handleInput={handleInput} search={search}/>
      {/* <span>{`${result.imdbRating}`}</span> */}
      <Results results={state.results} openPopup={openPopup} />

      {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      
      </main>
    </div>
  );
}

export default App;
