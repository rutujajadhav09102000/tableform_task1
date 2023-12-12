import React from 'react'
import { Table } from 'react-bootstrap';
import {BsFillTrashFill,BsFillPencilFill} from 'react-icons/bs'
import './TableComponent.css'

const TableComponent = ({data,deleteData,editData}) => {
return (
    <div className='table-wrapped'>
      <nav class="navbar navbar-light bg-light justify-content-between">
  <a class="navbar-brand">User Details</a>
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</nav>
    <Table striped bordered hover size="sm" className='table'>
  <thead>
    <tr>
      <th>Username</th>
      <th>Address</th>
      <th>MobileNo</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {
      data.map((d,id)=>{
        const textStatus = d.status.charAt(0).toUpperCase() + d.status.slice(1);
        return <tr key={id}>
      <td>{d.username}</td>
      <td>{d.address}</td>
      <td>{d.mobileNo}</td>
      <td><span className={`label-${d.status}`}>{textStatus}</span></td>

      <td>
        <span className='actions'>
          <BsFillTrashFill className='delete-btn' onClick={()=>deleteData(id)}/>
          <BsFillPencilFill onClick={()=>editData(id)}/>
        </span>
      </td>
    </tr>
})
}
  </tbody>
</Table>

    </div>
)
}
export default TableComponent