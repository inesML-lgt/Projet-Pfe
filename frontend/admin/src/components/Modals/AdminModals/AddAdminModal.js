import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddAdminModal = ({ open, closeModal }) => {
  const initialFormData = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    is_staff: false,
    is_admin: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Modal
      show={open}
      onHide={resetFormAndCloseModal}
      aria-labelledby="ModalHeader"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
          <h2>Add Admin User</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            controlId="formProductName"
            style={{ marginBottom: "15px" }}
          >
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group
            controlId="formProductName"
            style={{ marginBottom: "15px" }}
          >
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group
            controlId="formProductName"
            style={{ marginBottom: "15px" }}
          >
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group
            controlId="formProductName"
            style={{ marginBottom: "15px" }}
          >
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group
            controlId="formProductName"
            style={{ marginBottom: "15px" }}
          >
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group controlId="formIsStaff" style={{ marginBottom: "15px" }}>
            <Form.Check
              type="checkbox"
              label="Is Staff User"
              name="is_staff"
              checked={formData.is_staff}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formIsAdmin" style={{ marginBottom: "15px" }}>
            <Form.Check
              type="checkbox"
              label="Is Admin User"
              name="is_admin"
              checked={formData.is_admin}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetFormAndCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={{}}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAdminModal;
