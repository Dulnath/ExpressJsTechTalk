import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './formStyle.css'
import UserList from './UserList';

function FormPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted: ${firstName} ${lastName} ${email}`);

    if(firstName!==''&& lastName!==''&& email!=='' ){
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email
      }

      fetch('http://localhost:4200/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.status === 'ok') {
            console.log('Data stored successfully!');
          }else{
            console.error('Error storing data:', response.status);
          }
        })
        .catch(error => {
          console.error('Error storing data:', error);
        });
    }else{
        console.log("All Forms must be filled");
    }

    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <>
      <div className='container'>
        <h2 className='heading'>Express Js Tech Talk</h2>
        <form className='form-content' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className="form-control" id="firstName" value={firstName} onChange={handleFirstNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className="form-control" id="lastName" value={lastName} onChange={handleLastNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
          </div>
          <br/>
          <button type="submit" className="btn btn-primary" >+Add User</button>
        </form>
        <hr/>
        <div>
          <h3 className='heading'>All Users List</h3>
          <UserList />
        </div>
      </div>
      
    </>
  );
}

export default FormPage;
