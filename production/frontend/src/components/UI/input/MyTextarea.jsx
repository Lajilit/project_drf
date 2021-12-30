import React from 'react';
import classes from "./MyInput.module.css";

const MyTextarea = (props) => {
    return (
        <textarea className={classes.myInput} {...props} />
    );
};

export default MyTextarea;