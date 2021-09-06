import logo from './logo.svg';
import './App.css';
import Cards from './components/cards';
import MultiSelect from './components/MultiSelect';
import { useEffect, useState } from 'react';
import { Select } from '@material-ui/core';

function App() {
  const [data, setData] = useState([])
  const [vendors, setVendors] = useState([])
  const [query, setQuery] = useState('')

  function handleChange(e){
    setQuery(e.target.value);
  }
  
  function handleSubmit(){
    const response = fetch('/search', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'query':query, 'vendor':vendors})
    }).then(response => response.json().then( data => {
      setData(data);
      console.log(data)
    }))

  }

  return (
    <div className="App">
      <nav class="container flex items-center px-20 py-8">
        <div class="text-3xl	">web scraper.</div>
        <ul class="hidden sm:flex flex-1 justify-end items-center gap-12">
          <li class="cursor-pointer">home</li>
          <li class="cursor-pointer">about</li>
        </ul>
      </nav>
      <div class="flex py-2">
        <input type='form' value ={query} class="flex justify-left items-center w-1/2 sm:w-5/6 mx-20 rounded-full border border-black	px-2 py-1 focus:outline-none" onChange={e => handleChange(e)}></input>
        <button type='button' class="flex justify-left items-center mx-20 rounded-full border border-black px-2 py-1 focus:outline-none" 
        onClick= { async () => handleSubmit() }
        >Search</button>
      </div>
      <MultiSelect vendors={vendors} changeVendors={vendor => setVendors(vendor)}></MultiSelect>

      <Cards data={data}/>


      <div class=""></div>
    </div>
  );
}

export default App;
