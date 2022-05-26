import React from "react";
import styles from "./BackDrop.module.css";

const Backdrop = props => <div className={styles.BackDrop} onClick = {props.onClick}></div> 

export default Backdrop