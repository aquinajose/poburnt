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

        {headers.map((head)=><th key={head}> {headersMap[head]?headersMap[head]:head}</th>)}
        </tr>
    </thead> 

)}

export default TableHeader;