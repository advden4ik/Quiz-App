import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';
import { API_KEY } from '../../axios/api-key';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    handleLogin = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };

        try {
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY, authData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    handleRegister = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };

        try {
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY, authData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    hangeChange = (e, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...this.state.formControls[controlName] };

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        
        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach( name => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls, isFormValid
        });
    }

    renderInputs() {
        const inputs = Object.keys(this.state.formControls);
        return inputs.map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    value={control.value}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    onChange={ e => this.hangeChange(e, controlName) }
                />
            )
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form className={classes.AuthForm} onSubmit={this.handleSubmit}>
                        
                        { this.renderInputs() }

                        <Button
                            type='success'
                            onClick={this.handleLogin}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.handleRegister}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;