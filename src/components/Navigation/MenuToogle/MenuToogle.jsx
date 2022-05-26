import React from "react";
import styles from "./MenuToogle.module.css";

const MenuToggle = props => {
    const classes = [
        styles.MenuToogle,
        'fa'
    ];

    if(props.isOpen){
        classes.push('fa-times',styles.open)
        classes.push(styles.open)
    }else{
        classes.push('fa-bars')
    }

    return(
        <i
         className={classes.join(' ')}
         onClick = {props.onToggle}
        />
    )
}

export default MenuToggle
