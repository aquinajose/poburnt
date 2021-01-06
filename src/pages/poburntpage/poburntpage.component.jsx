import {React,useState,useEffect} from 'react';

import "react-table-6/react-table.css";  
//import data from '../../../../data';
import Datatable from '../../components/DataTable/DataTable.component';

import {getALLPOs} from '../../services/poServices';
import './poburntpage.styles.scss';
const POBurntPage =()=>{
    
    let [poData,setData]=useState([]);
    let [headers,setHeaders] = useState()
    useEffect(()=>{
        getALLPOs().then(res=>{
            let uniqLeng = 0;
            const dateAmountList =[];
            let modifiedData = res.poDatas.map(data=>{
                const values={};
                
                for (let key in data){
                    let value=data[key]
                    if(typeof value ==='object' && key==='dateAmountMap'){
                        for(let innerKey in value){
                            values[innerKey]=value[innerKey];
                            if(dateAmountList.indexOf(innerKey)<0){
                                dateAmountList.push(innerKey)
                            }
                        }
                    }else{
                        values[key]=value;
                    }
                };
                
                if(uniqLeng < Object.keys(values).length){
                    uniqLeng = Object.keys(values).length;
                }
                
                return values;
                
            });
            console.log(dateAmountList)
            console.log(modifiedData);

            // let headerKeys = modifiedData.filter(data=>{
            //     return Object.keys(data).length == uniqLeng
            // });
            let headerKeys = ["poNumber", "startDate", "endDate", "poAmount", "manager", ...dateAmountList, "totalInvoicedAmount", "poBalance"]
            setData(modifiedData);
            setHeaders(headerKeys);
            console.log(headerKeys)
        });
       
    },[]);


    return(
        <>

    <div className="section-content">
        <h3 className="po-burnt-header">PO Burnt Datas</h3>
         <Datatable  data={poData} headers={headers}/>
    </div>
   
    </>
)}

export default POBurntPage;