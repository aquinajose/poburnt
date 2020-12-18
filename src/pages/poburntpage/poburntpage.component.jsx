import {React,useState,useEffect} from 'react';
import ReactTable from "react-table-6";  

import "react-table-6/react-table.css";  

import {getALLPOs} from '../../services/poServices';
import './poburntpage.styles.scss';
const POBurntPage =()=>{
    let  dataApi;
    let [modifiedData,setData]=useState([]);
    useEffect(()=>{
        getALLPOs().then(res=>{
            dataApi=res.poDatas;
            setData(dataApi.map(data=>{
                const values={}
                for (let key in data){
                    let value=data[key]
                    if(typeof value ==='object' && value!==null){
                        for(let innerKey in value){
                            values[innerKey]=value[innerKey]
                        }
                    }else{
                        values[key]=value;
                    }
                };
                return values;
                
            }));
            console.log(modifiedData);
        }
        );
       
    },[]);
    const columns=[{ 
            Header: 'PO',  
            accessor: 'poNumber'  
    },
    { 
        Header: 'Start Date',  
        accessor: 'startDate'  
    },
    { 
        Header: 'End Date',  
        accessor: 'endDate'  
    },{ 
        Header: 'PO Amount',  
        accessor: 'poAmount'  
    },
    { 
        Header: 'Apple Manager',  
        accessor: 'manager'  
    },{ 
        Header: 'Nov-2020',  
        accessor: 'Nov-2020'  
    },{ 
        Header: 'Total Invoiced Value',  
        accessor: 'totalInvoicedAmount'  
    },
    { 
        Header: 'PO Balance',  
        accessor: 'poBalance'  
    }]
    return(
        <>

    <div className="section-content">
        <h3 className="po-burnt-header">PO Burnt Datas</h3>


        <ReactTable  
                  data={modifiedData}  
                  columns={columns} defaultPageSize = {2}  />
    </div>
    </>
)}

export default POBurntPage;