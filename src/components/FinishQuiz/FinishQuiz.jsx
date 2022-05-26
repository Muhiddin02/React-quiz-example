import React from "react";
import Button from "../UI/Button/Button";
import styles from "./FinishQuiz.module.css";
import { Link } from "react-router-dom";

const FinishQuiz = props =>{
    const successCount = Object.keys(props.results).reduce((total,key) =>{
        if(props.results[key] === 'success'){
            total++
        }
        return total
    },0)

    return(
        <div className={styles.FinishQuiz}>
            <ul>
                {props.quiz.map((quizItem,index) =>{
                    const classes = [
                        'fa',
                        props.results[quizItem.id] === 'error'?'fa-times':'fa-check',
                        styles[props.results[quizItem.id]]
                    ]

                    return(
                        <li
                        key={index} 
                        >
                            <strong>{index + 1}</strong>&nbsp;
                            {quizItem.question}
                            <i className={classes.join(' ')}/>
                        </li>
                    )
                })}            
            </ul>

            <p>Right {successCount} from {props.quiz.length}</p>

            <div>
                <Button onClick = {props.onRetry} type = "primary">Try Again</Button>
                <Link
                 to='/'
                 >        
                <Button type = "success">Go to tests list</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishQuiz;