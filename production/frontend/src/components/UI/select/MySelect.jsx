import React from 'react';
import classes from "../select/MySelect.module.css";

const MySelect = (props) => {
    return (
        <select className={classes.mySelect}{...props} />
    );
};

export default MySelect;