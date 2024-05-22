
import React, { useState } from 'react';

const Input = ({ onSearch }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="חפש מסעדה לפי עיר"
            value={value}
            onChange={handleChange}
        />
    );
};

export default Input;
