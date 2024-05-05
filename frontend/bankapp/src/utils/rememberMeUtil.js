import React, { useState } from 'react';

function RememberMeCheckbox() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    }

    return (
        <label>
            <input type="checkbox" id="rememberMeCheckbox" checked={isChecked} onChange={handleCheckboxChange}/>
            Muista minut
        </label>
    );
};
export default RememberMeCheckbox;
