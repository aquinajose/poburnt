import {React,useState,useEffect} from 'react';

import "react-table-6/react-table.css";  
//import data from '../../../../data';
import Datatable from '../../components/DataTable/DataTable.component';

import {getALLPOs} from '../../services/poServices';
import './poburntpage.styles.scss';
const POBurntPage =()=>{
    
    let [poData,setData]=useState([]);
    let [headersBeforeDate,setHeadersBefore] = useState();
    let [headersAfterDate,setHeadersAfter] = useState();
    let [dateAmount,setDateAmount] = useState([])
    useEffect(()=>{
        getALLPOs().then(res=>{
            let uniqLeng = 0;
            const dateAmountList =[],dataBeforeDateList=[],dataAfterdateList=[];
            let modifiedData = res.poDatas.map(data=>{
                const values={};
                let breakUpIndex = Object.keys(data).indexOf('dateAmountMap');
                for (let key in data){

                    let value=data[key];
                    if(Object.keys(data).indexOf(key)<breakUpIndex){
                        if(dataBeforeDateList.indexOf(key)<0){
                            dataBeforeDateList.push(key)
                        }  
                    }
                    if(Object.keys(data).indexOf(key)>breakUpIndex){
                        if(dataAfterdateList.indexOf(key)<0){
                            dataAfterdateList.push(key)
                        }  
                    }
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

            setData(modifiedData);
            setHeadersBefore(dataBeforeDateList);
            setHeadersAfter(dataAfterdateList);
            setDateAmount(dateAmountList)
        });
       
    },[]);


    return(
        <>

    <div className="section-content">
        <h3 className="po-burnt-header">PO Burnt</h3>
         <Datatable  data={poData} headersBeforeDate={headersBeforeDate} headersAfterDate={headersAfterDate} dateAmount={dateAmount}/>
    </div>
   
    </>
)}

export default POBurntPage;