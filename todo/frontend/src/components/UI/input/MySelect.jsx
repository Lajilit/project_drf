import React from 'react';
import classes from "./MyInput.module.css";

const MySelect = (props) => {
    return (
        <select className={classes.myInput}{...props} />
    );
};

export default MySelect;