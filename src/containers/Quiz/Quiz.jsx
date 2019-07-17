import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../redux/actions/quizActions';

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        const { results,
                isFinished,
                activeQuestion,
                answerState,
                quiz,
                loading } = this.props.quiz;

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        loading
                        ? <Loader />
                        : isFinished
                          ? <FinishedQuiz
                                results={results}
                                quiz={quiz}
                                onRetry={this.props.retryQuiz}
                            />
                          : <ActiveQuiz
                                answers={quiz[activeQuestion].answers}
                                question={quiz[activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1}
                                state={answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    quiz: state.quiz
})

export default connect(mapStateToProps, { fetchQuizById, quizAnswerClick, retryQuiz })(Quiz);