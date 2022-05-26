import React from "react";
import styles from "./Button.module.css";

const Button = props =>{

    const classes = [
        styles.Button,
        styles[props.type]
    ]
    return(
        <button
        onClick={props.onClick}
        className = {classes.join(' ')}
        disabled = {props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button