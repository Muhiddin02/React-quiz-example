import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./QuizList.module.css"
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        const response = await axios.get('http://localhost:8000/tests')

        const quizes = [];

        try {
            response.data.forEach((item, index) => {
                quizes.push({
                    id: item.id,
                    name: `Test №${index + 1}`
                })
            })

            this.setState({
                quizes, loading: false
            })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>Quiz Lists</h1>

                    {
                        this.state.loading
                            ? <Loader />
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                    }
                </div>
            </div>
        );
    }
}

export default QuizList;