import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log("errors" + Object.keys(errors).length);

    if (Object.keys(errors).length === 0) {
      console.log(formData);

      const axiosInstance = axios.create({
        baseURL: "http://localhost:5000", // Set the base URL for backend requests
      });

      try {
        await axiosInstance.post("/api/form-submit", formData);
        console.log("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("Eneter valid entry");
    }
  };

  const handleNameInput = (e) => {
    console.log(e);
    let errors = {};
    const nameValue = e.target.value;

    const regx = /^[a-zA-Z]+$/;

    if (regx.test(nameValue)) {
      console.log("working");
      if (nameValue.length < 3) {
        errors.userName = "name should have at least 3 char";
        setErrors(errors);
        console.log("name should have at least 3 char");
      } else {
        errors.userName = "";
        setErrors({});
        setFormData({ ...formData, username: nameValue });
      }
    } else {
      errors.userName = "Invalid Input";
      setErrors(errors);
      console.log("Invalid Input");
    }

    console.log(nameValue);
  };

  const handleEmailInput = (e) => {
    let errors = {};
    const emailValue = e.target.value;
    console.log(emailValue);

    const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (regx.test(emailValue)) {
      console.log("working");
      setFormData({ ...formData, email: emailValue });
      errors.userEmail = "";
      setErrors({});
    } else {
      errors.userEmail = "Invalid Input";
      setErrors(errors);
      console.log("Invalid Input");
    }
  };
  const handleNumberInput = (e) => {
    let errors = {};
    console.log(e);
    const numValue = e.target.value;
    console.log(numValue);

    const regx = /^[0-9]+$/;

    if (regx.test(numValue)) {
      console.log("working");
      if (numValue.length === 10) {
        setFormData({ ...formData, number: numValue });
        errors.userNum = "";
        setErrors({});
      } else {
        errors.userNum = "Number should not be more than 10";
        setErrors(errors);
      }
    } else {
      errors.userNum = "Invalid Input";
      setErrors(errors);
      console.log("Invalid Input");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSumbit(e);
        }}
      >
        <label htmlFor="">Name:</label>
        <input
          onChange={(e) => {
            handleNameInput(e);
          }}
          required="required"
          type="text"
          name="Enter Name"
        />
        {errors.userName && <span>{errors.userName}</span>}
        <br />
        <br />
        <label htmlFor="">Email:</label>
        <input
          onChange={(e) => {
            handleEmailInput(e);
          }}
          required="required"
          type="text"
          name="Enter Name
        "
        />
        {errors.userEmail && <span>{errors.userEmail}</span>}
        <br />
        <br />
        <label htmlFor="">Number:</label>
        <input
          onChange={(e) => {
            handleNumberInput(e);
          }}
          required="required"
          name="Enter Name
        "
        />
        {errors.userNum && <span>{errors.userNum}</span>}
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
