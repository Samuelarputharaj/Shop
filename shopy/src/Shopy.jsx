import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Shopy.css';

function Shopy() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ mobile: '', name: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('There was an error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customers', newCustomer);
      console.log('Customer added successfully');
      fetchCustomers(); // Refresh the customer list
      setNewCustomer({ mobile: '', name: '' }); // Clear form fields
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleDeleteCustomer = async (mobile) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${mobile}`);
      console.log('Customer deleted successfully');
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditCustomer = async (editIdx) => {
    // Handling edit functionality goes here
    let updatedContent = prompt("Enter the new name for the customer");
    if (updatedContent !== null) {
      try {
        await axios.put(`http://localhost:5000/api/customers/${customers[editIdx].mobile}`, { name: updatedContent });
        console.log('Customer updated successfully');
        fetchCustomers(); // Refresh the customer list
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Customers</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile">Mobile:</label>
        <input type="text" id="mobile" name="mobile" value={newCustomer.mobile} onChange={handleInputChange} required />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={newCustomer.name} onChange={handleInputChange} required />
        <button type="submit">Add Customer</button>
      </form>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Mobile</th>
            <th>Name</th>
            <th>Since</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{customer.mobile}</td>
              <td>{customer.name}</td>
              <td>{new Date(customer.since).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDeleteCustomer(customer.mobile)}>Delete</button>
                <button onClick={() => handleEditCustomer(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shopy;