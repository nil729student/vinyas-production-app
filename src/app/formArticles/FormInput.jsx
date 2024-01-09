
import React from 'react';

const FormInput = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <div>
      <div className="font-bold">{label}</div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        name={name} // name="animalDib"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
