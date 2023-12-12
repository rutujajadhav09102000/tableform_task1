import React, { useState } from 'react'
import './FormComponent.css'
import { Form , Button,Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const FormComponent = ({closeForm,onsubmit,defaultValue}) => {

  const [formState ,setFormState ] = useState(
    defaultValue || {
      username : "",
      address : "",
      mobileNo : "",
      status : "activate"
    });
  const [errors ,setErrors ] = useState("");

  const validateForm = () => {
    if(formState.username && formState.address &&  formState.mobileNo && formState.status){
      setErrors("")
      return true;
    }
    else{
      let errorFields = [];
      for(const [key,value] of Object.entries(formState)){
        if(!value){
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) =>{
    setFormState({
      ...formState,
      [e.target.name] : e.target.value
    });
  }

const handleSubmitData = (e) => {
  e.preventDefault();
  if(!validateForm()) return ;
  onsubmit(formState);
  closeForm();
}
return (
    <div className="form-wrapped" onClick={(ev) => {
      if (ev.target.className === "form-wrapped") closeForm();
      }}>

    <div className='form'>

    <Form >

    <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" name='username' value={formState.username} onChange={handleChange} placeholder="Enter Name" />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" name='address' value={formState.address} onChange={handleChange} placeholder="Enter Address" />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
    <Form.Label>MobileNo</Form.Label>
    <Form.Control type="text" name='mobileNo' value={formState.mobileNo} onChange={handleChange} placeholder="Enter MobileNo" />
    </Form.Group>

    <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    <Form.Control as="select" name='status' value={formState.status} onChange={handleChange}>
      <option value="activate">Activate</option>
      <option value="deactivate">DeActivate</option> 
    </Form.Control>
    </Form.Group>
    
    {
      errors && <div className='error'>{`Please include : ${errors}`}</div>
    }

  <Modal.Footer>
    <Button variant="primary" type="submit" onClick={handleSubmitData}>Submit</Button>
    <Button variant="light" type="submit" onClick={closeForm}>Close</Button>
  </Modal.Footer>

</Form>
    </div>
    
    </div>
)
}
export default FormComponent