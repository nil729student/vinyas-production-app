
import React from 'react';

const SelectSection = ({name, section, setFormSection }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Selecciona l'apartat</h2>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        value={section}
        onChange={(e) => setFormSection(e.target.value)}
      >
        <option value="BOLA">BOLA</option>
        <option value="BLOC">BLOC</option>
        <option value="FALDA">FALDA</option>
        <option value="DAVANT">DAVANT</option>
      </select>
    </div>
  );
};

export default SelectSection;
