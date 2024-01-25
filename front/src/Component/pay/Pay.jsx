import * as React from "react";
import axios from 'axios' 
import { useTable } from "react-table";
import './PAy.css'
import  { useState } from 'react';
import {useNavigate} from "react-router-dom"


const Pay= () => {
  const navigate=useNavigate();
  const response={
    "data": [
        {
            "card_number": "6037997404365943",
            "price": 16000,
            "pay_in_cash": false,
            "user": "mamad arab"
        },
        {
            "card_number": "6037997404365943",
            "price": 16000,
            "pay_in_cash": false,
            "user": "younes ebrahimi"
        },
        {
            "card_number": "6037997404365943",
            "price": 16000,
            "pay_in_cash": false,
            "user": "sepehr"
        },
        {
            "card_number": "6037997404365943",
            "price": 16000,
            "pay_in_cash": false,
            "user": "kazemi",        }
    ]
}

  const [pay,setPay]=useState(false)
  const data = React.useMemo(() => response.data, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "name",
        accessor: "user",
      },
      {
        Header: "price",
        accessor: "price",
      },
      
      {
        Header: "card number",
        accessor: "card_number",
      },
      {
        Header: "pay in cash",
        accessor: "pay_in_cash",
      },
    
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleClick = (index) => {
    setPay(true)
    console.log(pay);
    console.log(index);
  }
  return (
    <>
    <div className="khobe">
      <div className="divbut"></div>
      <div className="divpay">
      <div className="table-data">
      <div className="order">
                <div className="head">
                  <h3>بدهکاری های شما</h3>
                  <i className='bx bx-search' ></i>
                  <button onClick={()=>{navigate('/Payforme')}}  className="read-more">  طلبکاری های شما</button>
                </div>
                <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row,index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => ( cell.value===false ?
                   <td><button onClick={()=>{handleClick(index)}} className="bi" style={{margin:'17px', background:' rgba(102, 51, 153, 0.5)'}}> تصویه </button></td>:
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
  
  
      {/* <div className="container1">
      </div> */}
    </div>
    </div>
   
  </>
  );
}

export default Pay;