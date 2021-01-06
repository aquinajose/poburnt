import React from "react";

const TableHeader =({headers})=>{

    let headersMap ={
        poNumber:"PO",
        startDate:"Start Date",
        endDate:"End Date",
        poAmount:"PO Amount",
        manager: "Manager",
        Nov2020: "Nov-2020",
        Sep2020: "Sep-2020",
        Dec2020: "Dec-2020",
        totalInvoicedAmount:"Total Invoiced Value",
        poBalance:"PO Balance"
        
    }
    return (
     <thead>
        <tr>

        {headers.map((head)=><th key={head}> {headersMap[head]}</th>)}
        </tr>
    </thead> 

)}

export default TableHeader;