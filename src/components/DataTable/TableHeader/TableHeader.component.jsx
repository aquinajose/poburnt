import React from "react";

const TableHeader =({headers})=>{

    let headersMap ={
        poNumber:"PO",
        startDate:"Start Date",
        endDate:"End Date",
        poAmount:"PO Amount",
        manager: "Manager",
        totalInvoicedAmount:"Total Invoiced Value",
        poBalance:"PO Balance"
        
    }
    return (
     <thead>
        <tr>
        {/* {
        headersBeforeDate && (headersBeforeDate.map((head)=><th key={head}> {headersMap[head]?headersMap[head]:head}</th>))
        }
        {dateAmount && dateAmount.map((head)=><th key={head}> {headersMap[head]?headersMap[head]:head}</th>)}
        {
        headersAfterDate && headersAfterDate.map((head)=><th key={head}> {headersMap[head]?headersMap[head]:head}</th>)
        } */}
        {
            
         headers && headers.map((head)=><th key={head}> {headersMap[head]?headersMap[head]:head}</th>)   
        }
        </tr>
    </thead> 

)}

export default TableHeader;