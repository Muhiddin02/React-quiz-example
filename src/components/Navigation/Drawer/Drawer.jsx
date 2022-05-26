import React, { Component } from "react";
import styles from "./Drawer.module.css";
import BackDrop from "../../UI/BackDrop/BackDrop";
import { useResolvedPath, useMatch, Link } from "react-router-dom";

const links = [
    { to: '/', label: 'List', exact: true },
    { to: '/auth', label: 'Authorization', exact: false },
    { to: '/quiz-creator', label: 'Create Test', exact: false },
]

class Drawer extends Component {
    clickHandler = () =>{
        this.props.onClose()
    }


    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <CustomLink
                        to={link.to}
                        exact={`${link.exact}`}
                        onClick = {this.clickHandler}
                    >
                        {link.label}
                    </CustomLink>
                </li>
            )
        })
    }

    render() {
        const classes = [styles.Drawer]


        if (!this.props.isOpen) {
            classes.push(styles.close)
        }

        return (
            <React.Fragment>
                <nav className={classes.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer

function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    return (
        <Link
            className={match ? styles.active : null}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
}