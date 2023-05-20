import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './formStyle.css'
import { useParams,useNavigate } from 'react-router-dom';

function EditForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`http://localhost:4200/api/user/${userId}`);
        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUser(userId);
  }, [userId]);


  const goBack = (event) =>{
    event.preventDefault();
    navigate(`/`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Submitted: ${userId}`);

    if (firstName !== '' && lastName !== '' && email !== '') {
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email
      }
      fetch(`http://localhost:4200/api/updateUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log('User successfully updated');
          } else {
            console.error('Error updating user:', response.status);
          }
          navigate(`/`);
        })
        .catch(error => {
          console.error('Error storing data:', error);
        });
        
    } else {
      console.log("All Forms must be filled");
    }
  };

  return (
    <>
      <div className='container'>
        <h2 className='heading'>Edit User</h2>
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
          <br />
          <button type="submit" className="btn btn-primary" >Save</button>
          <button type="submit" className="btn btn-secondary mx-1" onClick={ goBack }>Back</button>
        </form>
        
      </div>
    </>
  );
}

export default EditForm;
