import { React, useState, useEffect, useMemo } from 'react';
import Search from './Search/search.component';
import PaginationComponent from './Pagination/pagination.component';
import TableHeader from './TableHeader/TableHeader.component';
import CustomCalendar from './CustomCalendar/CustomCalendar.component';
import CustomButton from '../customButton/customButton.component';

//const { DatesRangeInput } = SemanticUiCalendarReact;
const Datatable = ({ data,dateAmount,headersBeforeDate,headersAfterDate}) => {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [newHeaders , setNewHeaders] =useState([]);
    const ITEMS_PER_PAGE = 4;
    const formatDate=(date)=>{
        if(date){
            let monthNames =["Jan","Feb","Mar","Apr",
            "May","Jun","Jul","Aug",
            "Sep", "Oct","Nov","Dec"];
            let dd = date.getDate();
            let monthIndex = date.getMonth();
            let monthName = monthNames[monthIndex];
            var yyyy = date.getFullYear();
            return `${monthName}-${yyyy}`
        }
  
    }
     //for formatting data in the start date and end date for each data
     const formatData = (value) => {
        var recievedDate = `/Date(${value})/`
        var timestamp = Number(recievedDate.replace(/\D/g, ""))
        var date = new Date(timestamp)
        var year = date.getFullYear();
        /// Add 1 because JavaScript months start at 0
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }
    const poDatas = useMemo(() => {
        console.log(data)
        let computedPOs = data;
       

        if (search) {
            computedPOs = computedPOs.filter(po => (
                po.manager.toLowerCase().includes(search.toLowerCase()) ||
                po.poNumber.toString().toLowerCase().includes(search.toLowerCase())
            ))
        }

        setTotalItems(computedPOs.length)
        //Current Page slice
        return computedPOs.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
    }, [data, currentPage, search]);

   const poHeaders = useMemo(()=>{
       let computedHeaders = dateAmount;
       console.log(computedHeaders.length);
    if (startDate || endDate) {
        console.log(formatDate(startDate));
        console.log(formatDate(endDate));
        if(computedHeaders){
            computedHeaders = computedHeaders.filter(header=>{
                console.log(header,formatDate(startDate))
                return header===formatDate(startDate)|| header===formatDate(endDate)}
            )
        console.log(computedHeaders)
        }
    }
        if(headersBeforeDate && headersAfterDate){
            console.log([...headersBeforeDate,...computedHeaders,...headersAfterDate])  
            setNewHeaders([...headersBeforeDate,...computedHeaders,...headersAfterDate])   
        }
          
        //setNewHeaders([...headersBeforeDate,...computedHeaders,...headersAfterDate])
    

    return [computedHeaders];
   },[dateAmount,startDate,endDate])
    return (
        <>
            <div className="row w-100 d-flex ">
                <div className="col-md-12">
                  
                    <CustomCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                </div>
            </div>
            <div className="row w-100">
                <div className="col-md-6">
                    <PaginationComponent total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)} />
                </div>

                <div className="col-md-6 d-flex flex-row-reverse">

                    <Search onSearch={(val) => {
                        setSearch(val);
                        setCurrentPage(1);
                    }} />
                </div>
            </div>
            <table className="table table-stripped">
                {
                    poHeaders && (<TableHeader headers={newHeaders}/>)
                }
                <tbody>
                    {poDatas.map((po) => {
                        return (
                            <tr key={po.poNumber}>
                                {
                                   
                                    newHeaders && (newHeaders.map((header)=>{
                                        if(header==='startDate'|| header==='endDate'){
                                        return <td>{formatData(po[header])}</td>
                                        }
                                        if(dateAmount.indexOf(header)>=0 || header==='totalInvoicedAmount' || header==='poBalance'){
                                            return  <td>{
                                                po[header] && po[header].toFixed(2)
                                           }</td>  
                                        }
                                        return  <td>{
                                             po[header] && po[header]
                                        }</td>
                                    })
                                    )
                                }
                                 {/* <td>{po.totalInvoicedAmount.toFixed(2)}</td>
                                 <td>{po.poBalance.toFixed(2)}</td> */}
                            </tr>

                        )
                    }
                    )}
                </tbody>
            </table>
            <div className="row w-100">
                <div className="col-md-6">
                    <PaginationComponent total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)} />
                </div>
            </div>
        </>
    )
}

export default Datatable