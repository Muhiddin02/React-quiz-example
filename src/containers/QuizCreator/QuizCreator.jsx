import React, { Component } from 'react';
import styles from "./QuizCreator.module.css"
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Auixilary from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';

function createOptionControl(number) {
    return (createControl({
        label: `Option ${number}`,
        errorMessage: 'Value can not be empty'
    }, { required: true }))
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter the question',
            errorMessage: 'Question can not be empty'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls(),
        isFormValid: false,
        rightAnswerId: 1
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const quiz = this.state.quiz.concat()
        const index = quiz.length+1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id:index,
            rightAnswerId: this.state.rightAnswerId,
            answers:[
                {text: option1.value, id: 1},
                {text: option2.value, id: 2},
                {text: option3.value, id: 3},
                {text: option4.value, id: 4}
            ]
        }
        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = async event => {
        event.preventDefault();
        let quiz = {
            id:Math.floor(100000 + Math.random() * 900000),
            quiz:this.state.quiz
        }
        try {
            await axios.post('http://localhost:8000/tests',quiz)

            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        } catch (e) {
            console.log(e);
        }
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auixilary key={controlName + index}>
                    <Input
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auixilary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Select the right answer"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={
                [
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 }
                ]
            }
        />
        return (
            <div className={styles.QuizCreator}>
                <div>
                    <h1>Creating a test</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled = {!this.state.isFormValid}
                        >
                            Add Question
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled ={this.state.quiz.length === 0}
                        >
                            Create Test
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;