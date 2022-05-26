import React from "react";
import styles from "./AnswerItem.module.css"

const AnswerItem = props =>{

    const classes = [styles.AnswerItem]

    if(props.state){
        classes.push(styles[props.state])
    }

    return(
        <li 
            className={classes.join(' ')}
            onClick= {() => props.onAnswerClick(props.answer.id)}
            >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem;

