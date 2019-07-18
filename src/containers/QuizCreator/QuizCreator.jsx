import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import { createControl, validate } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../redux/actions/quizCreatorActions';

function createOptionControl(number) {
    return createControl({
        label: 'Вопрос ' + number,
        errorMessage: 'Вопрос не может быть пустым',
        id: number
    }, {required: true});
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    handleAddQuestion = event => {
        event.preventDefault();

        const { formControls } = this.state;
        
        const questionItem = {
            question: formControls.question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: formControls.option1.value, id: formControls.option1.id},
                {text: formControls.option2.value, id: formControls.option2.id},
                {text: formControls.option3.value, id: formControls.option3.id},
                {text: formControls.option4.value, id: formControls.option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem);

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
    }

    handleCreateQuiz = async event => {
        event.preventDefault();
        
        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });

        this.props.finishCreateQuiz(this.props.quiz);
    }

    handleChange = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...this.state.formControls[controlName] };

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validate(formControls)
        });
    }

    handleSelectChange = e => {
        this.setState({
            rightAnswerId: +e.target.value
        });
    }

    renderInputs() {
        const inputs = Object.keys(this.state.formControls);
        return inputs.map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={ e => this.handleChange(e.target.value, controlName) }
                    />
                    { index === 0 ? <hr/> : null }
                </React.Fragment>
            )
        });
    }

    render() {
        const select = <Select
            label='Выберите правильный ответ'
            value={this.state.rightAnswerId}
            onChange={this.handleSelectChange}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.handleSubmit}>
                        
                        { this.renderInputs() }

                        { select }

                        <Button
                            type='primary'
                            onClick={this.handleAddQuestion}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.handleCreateQuiz}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps= state => ({
    quiz: state.quizCreate.quiz
})

export default connect(mapStateToProps, { createQuizQuestion, finishCreateQuiz })(QuizCreator);