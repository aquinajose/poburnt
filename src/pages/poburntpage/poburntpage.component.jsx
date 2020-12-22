import {React,useState,useEffect} from 'react';
import ReactTable from "react-table-6";  

import "react-table-6/react-table.css";  
import Datatable from '../../components/DataTable/DataTable.component';

import {getALLPOs} from '../../services/poServices';
import './poburntpage.styles.scss';
const POBurntPage =()=>{
    
    let [poData,setData]=useState([]);
    let [headers,setHeaders] = useState()
    useEffect(()=>{
        getALLPOs().then(res=>{
            setData(res.poDatas.map(data=>{
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
            console.log(poData);
            let headerKeys=poData.map(data=>{
                return Object.keys(data)
            })
            setHeaders(headerKeys)
        });
       
    },[]);
    // const columns=[{ 
    //         Header: 'PO',  
    //         accessor: 'poNumber'  
    // },
    // { 
    //     Header: 'Start Date',  
    //     accessor: 'startDate'  
    // },
    // { 
    //     Header: 'End Date',  
    //     accessor: 'endDate'  
    // },{ 
    //     Header: 'PO Amount',  
    //     accessor: 'poAmount'  
    // },
    // { 
    //     Header: 'Apple Manager',  
    //     accessor: 'manager'  
    // },{ 
    //     Header: 'Nov-2020',  
    //     accessor: 'Nov-2020'  
    // },{ 
    //     Header: 'Total Invoiced Value',  
    //     accessor: 'totalInvoicedAmount'  
    // },
    // { 
    //     Header: 'PO Balance',  
    //     accessor: 'poBalance'  
    // }]

    return(
        <>

    <div className="section-content">
        <h3 className="po-burnt-header">PO Burnt Datas</h3>
        {/* {JSON.stringify(poData,null,4)}
        {JSON.stringify(headers,null,4)} */}
        {/* <ReactTable  
                  data={poData}  
                  columns={columns} defaultPageSize = {2}  /> */}
         <Datatable  data={poData}/>
    </div>
   
    </>
)}

export default POBurntPage;