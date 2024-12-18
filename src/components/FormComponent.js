import React, { useState } from 'react';
import axios from 'axios';
import './FormComponent.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    is_subscribe: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/common/add/users/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('User added successfully:', response.data);
      alert('User added successfully!');
      setFormData({
        name: '',
        email: '',
        age: '',
        gender: '',
        is_subscribe: false,
      });

    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
      alert(`Error adding user: ${error.response?.data?.msg || 'Unknown error'}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Simple Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="is_subscribe"
              checked={formData.is_subscribe}
              onChange={handleChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
