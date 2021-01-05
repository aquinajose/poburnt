import React, { useState } from 'react';

import axios from 'axios';

import './uploadForm.styles.scss';
import CustomButton from '../customButton/customButton.component';
import {uploadFile} from '../../services/poServices';


const UploadForm =({buttonLabel})=>{
    const [upfile,setFile]=useState(null);
   const onChangeHandler =(e)=>{
       setFile(e.target.files[0]);
   }
   var map={
       SOW:".zip,.rar,.7zip"
   }
   var descMap ={
       SOW:"only zip file allowed"
   }
    const onClickHandler =()=>{
        const data = new FormData();
        data.append('file',upfile);
        // uploadFile(data).then(response=>{
        //     console.log(response)
        // })
        axios.post("http://localhost:8000/api/upload", data, { 
            // receive two    parameter endpoint url ,form data
        }).then(response=>{
            console.log(response.statusText)
        })
    }
    return(
        <form className='form-upload' >
            <label htmlFor={buttonLabel} className="form-upload-label">Select a {buttonLabel} file
            {descMap[buttonLabel]?(<span className="form-upload-label-span">(Only zip file allowed)</span>):''}
            </label>
            <input  type="file" id={buttonLabel} accept={map[buttonLabel]} onChange={onChangeHandler}/>
            
            <CustomButton onClickHandler={onClickHandler}>Upload</CustomButton>
        </form>
    )
}
export default UploadForm;