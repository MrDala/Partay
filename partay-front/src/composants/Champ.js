import React from 'react';

const Champ = ({ label, type, name, value, onChange, onBlur, required=false, erreur, children }) => {

  return (
    <div>
      <label>{label} :</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
      {erreur && <p>{erreur}</p>}
      {children}
    </div>
  );
};

export default Champ;
