import React from 'react';
import classes from "../select/MySelect.module.css";

const MySelectSort = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            className={classes.mySelectSort}
            onChange={event => onChange(event.target.value)}>
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelectSort;