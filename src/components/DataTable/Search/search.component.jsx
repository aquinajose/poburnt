import React from 'react';
import { useState } from 'react';

const Search = ({onSearch}) => {
    const [search,setSearch]=useState("");
    const onInputChange=(val)=>{
        console.log(val)
        setSearch(val);
        onSearch(val);
    }
    return (
    <input type="text" className="form-control"
     style={{ width: '240px' }} 
     onChange={e=>onInputChange(e.target.value)}
     value={search}
     placeholder="Search" />
)}

export default Search;