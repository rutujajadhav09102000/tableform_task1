import { useState } from 'react';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [ formOpen , setFormOpen ] = useState(false);
  const [ data ,setData ] = useState([
    {username:"Rutuja",address:"Pune",mobileNo:"12345789",status:"activate"}
  ]);
  const [ dataToEdit ,setDataToEdit ] = useState(null);

  const handleEditData = (id) => {
    setDataToEdit(id);
    setFormOpen(true);
  }

  const handleDeleteData = (targetid) => {
    setData(data.filter((_,id) => id !== targetid));
  }

  const handleSubmit = (newdata) => {
    dataToEdit == null ?
    setData([...data,newdata]) :
    setData(data.map((currdata,id) => {
      if(id !== dataToEdit){
        return currdata ;
      }
      return newdata ;
    }))
  }

  const handleSaveData = () =>{
    localStorage.setItem("Studentdata",JSON.stringify(data))
  }

  const handleGetData = () => {
    let d = localStorage.getItem("Studentdata")
    console.log("typeOf data..",typeof d)
    let objData=JSON.parse(d)
    setData(objData)
    console.log("objData..",objData)
 }

 const handleDeleteAllData = () =>{
  localStorage.clear();
}

  return (
    <div className="App">

      <TableComponent data={data} deleteData={handleDeleteData} editData={handleEditData}/>
      <Button variant="danger" onClick={() => setFormOpen(true)}>Add+</Button>
      {
        formOpen  && 
        <FormComponent closeForm ={ () => {   
          setFormOpen(false);
          setDataToEdit(null);
        }} 
        onsubmit={handleSubmit}
        defaultValue={dataToEdit !== null && data[dataToEdit]}
        /> 
      }

      <div className='flex'>
      <Button variant="success" onClick={handleSaveData}>SaveData_LS</Button>
      <Button variant="warning" onClick={handleGetData}>GetData_LS</Button>
      <Button variant="danger" onClick={handleDeleteAllData}>DeleteAllData_LS</Button>
      </div>

    </div>
  );
}

export default App;
