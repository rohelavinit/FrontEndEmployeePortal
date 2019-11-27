import React, { Component } from 'react';
import { Input, DropDown, Button, Toaster } from '../pattern-library';
import {saveEmployeeDetails} from '../../api/saveEmployeeDetails';
import './RegistrationForm.css'
const defaultErrorConf = () => ({
    firstNameError: null,
    lastNameError: null,
    dobError: null,
    departmentError: null,
})
class RegistrationForm extends Component {  
    constructor(){
        super();
        this.state = {...defaultErrorConf()}
    }  

    validateInput() {
        return {
            hasError: !( this.firstNameEl.value && this.lastNameEl.value && this.dateOfBirthEl.value && this.departmentEl.value ),
            firstNameError: this.firstNameEl.value ? null : "Can't be empty",
            lastNameError: this.lastNameEl.value ? null : "Can't be empty",
            dobError: this.dateOfBirthEl.value ? null : "Can't be empty",
            departmentError: this.departmentEl.value ? null : "Can't be empty"
        }
    }

    registerUser = (event) => {
        let errors = this.validateInput();
        if(errors.hasError){
            this.setState({...errors, isToasterActive: false, saveMessage: "", isApiError: false})
        } else {
            saveEmployeeDetails(this)
            .then(response => {
                this.firstNameEl.value = "";
                this.lastNameEl.value = "";
                this.dateOfBirthEl.value = "";
                this.departmentEl.value = "";
                this.setState({
                    ...defaultErrorConf(),
                    isApiError: false,
                    isToasterActive: true,
                    saveMessage: "Empolyee registered successfully !!!"
                })
            })
            .catch(error => {
                this.setState({
                    ...defaultErrorConf(),
                    isApiError: true,
                    isToasterActive: true,
                    saveMessage: "Empolyee registration failed !!!"
                })
            })
        }
    }

    render() {
        let { firstNameError, lastNameError, dobError, departmentError, saveMessage, isApiError, isToasterActive } = this.state;
        return (
            <div className='registration-form'>
                <h2>Register</h2>
                <Toaster
                    isToasterActive={isToasterActive}
                    message={saveMessage || ""}
                    type={isApiError ? "ERROR" : "SUCCESS"}
                />
                <div className='form'>
                    <Input
                        type='text'
                        className="mg-b-15"
                        placeholder='Enter First Name'
                        label="First Name"
                        errorMsg={firstNameError}
                        inputRef={(el => this.firstNameEl = el)}
                        onChange={() => { }}
                    />
                    <Input
                        type='text'
                        className="mg-b-15"
                        placeholder='Enter Last Name'
                        label="Last Name"
                        errorMsg={lastNameError}
                        inputRef={(el => this.lastNameEl = el)}
                        onChange={() => { }}
                    />
                    <Input
                        type='text'
                        className="mg-b-15"
                        placeholder='Enter Department'
                        label="Department"
                        errorMsg={departmentError}
                        inputRef={(el => this.departmentEl = el)}
                        onChange={() => { }}
                    />
                    <DropDown
                        label="Gender"
                        className="mg-b-15"
                        ddRef={(el => this.genderEl = el)}
                        options={
                            ['Male', 'Female']
                        }
                        onChange={() => { }}
                    />
                    <Input
                        type='date'
                        className="mg-b-15"
                        placeholder='dd/mm/yyyy'
                        label="Date of Birth"
                        errorMsg={dobError}
                        inputRef={(el => this.dateOfBirthEl = el)}
                        onChange={() => { }}
                    />
                    <Button
                        text='Submit'
                        btnType='btn-pm'
                        onClickHandler={this.registerUser}
                    />
                </div>
            </div>
        )
    }
}

export default RegistrationForm;