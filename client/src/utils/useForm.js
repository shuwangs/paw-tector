import { useState } from "react";

const userForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = (newValues = initialValues) => {
    setFormData(newValues);
  };
   const handleClearForm = () => setFormData(initialValues);
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: checked
        }));
    }; 

  const handleHealthStatus = (status) => {
    setFormData((prev)=>({...prev, health_status: status}));
  }
  return [
    formData,
    setFormData,
    handleChange,
    handleCheckboxChange,
    resetForm,
    handleClearForm,
    handleHealthStatus
  ];
};

export default userForm;
