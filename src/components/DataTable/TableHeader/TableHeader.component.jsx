import React from "react";

const TableHeader =({headers})=>(
    <thead>
        <tr>
        {headers.map((head)=><th key={head.field}> {head.name}</th>)}
        </tr>
    </thead>
)

export default TableHeader;