import React, { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz/FinishQuiz";
import {useLocation } from "react-router-dom";
import axios from "axios";
import Loader from '../../components/UI/Loader/Loader'

export const Quiz = () => {
    const location = useLocation()
    const initialState = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        quiz: [],
        loading:true
    }

    const [state, setState] = useState(initialState)

    const onAnswerClickHandler = answerId => {
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;


        if (question.rightAnswerId === answerId) {
            if (!results[[question.id]]) {
                results[[question.id]] = 'success'
            }

            setState(prev=>({
                ...prev,
                answerState: { [answerId]: 'success' },
                results
            }))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                    setState(prev=>({
                        ...prev,
                        isFinished: true
                    }))
                } else {
                    setState(prev=>({
                        ...prev,
                        activeQuestion: state.activeQuestion + 1,
                        answerState: null
                    }))
                }

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            setState(prev=>({
                ...prev,
                answerState: { [answerId]: 'error' },
                results
            }))
        }
    }
    const retryHandler = () => {
        setState((prev) => ({
            ...prev,
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        }))
    }

    const isQuizFinished = () => {
        return state.activeQuestion + 1 === state.quiz.length;
    }

    useEffect(() => {
        let id = +location.pathname.split('/').pop()
        getDatafromserver(id)
    }, [location])

    const  getDatafromserver = async (id) =>{
        const response = await axios.get('http://localhost:8000/tests/'+id)
        try {
            setState(prev => ({
                ...prev,
                quiz: response.data.quiz,
                loading: false
            }))
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className={styles.Quiz}>
            <div className={styles.QuizWrapper}>
                <h1>Answer to all questions</h1>

                {
                    state.loading
                    ?<Loader/>
                    :state.isFinished
                        ? <FinishQuiz
                            results={state.results}
                            quiz={state.quiz}
                            onRetry={retryHandler}
                        />
                        : <ActiveQuiz
                            answers={state.quiz && state.quiz[state.activeQuestion] && state.quiz[state.activeQuestion].answers || []}
                            question={state.quiz && state.quiz[state.activeQuestion] && state.quiz[state.activeQuestion].question || ''}
                            id={state.quiz && state.quiz[state.activeQuestion] && state.quiz[state.activeQuestion].id || ''}
                            onAnswerClick={onAnswerClickHandler}
                            quizLength={state.quiz && state.quiz.length}
                            answerNumber={state.activeQuestion + 1}
                            state={state.answerState}
                        />
                }

            </div>
        </div>
    )
}
