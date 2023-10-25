import { useState } from 'react'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormGroupCheckbox from './FormGroupCheckbox'
import FormTextArea from './FormTextArea'
import axios from 'axios'

const userTypeOptions = [
    {value: 0, label: 'Student'},
    {value: 1, label: 'Tutor'}
]

const subjects = [
    {
        name:'maths',
        value:'maths',
        checked:false,
        lableText:'Maths'
    },
    {
        name:'biology',
        value:'biology',
        checked:false,
        lableText:'Biology'
    },
    {
        name:'chemistry',
        value:'chemistry',
        checked:false,
        lableText:'Chemistry'
    },
    {
        name:'physics',
        value:'physics',
        checked:false,
        lableText:'Physics'
    },
    {
        name:'history',
        value:'history',
        checked:false,
        lableText:'History'
    },
]

let initialState={
    user_type:1
};

function submitForm(event) {
    const form = document.getElementById('registration-form');
    if (form.checkValidity()){
        event.preventDefault();
        const data = { 
            FirstName: document.getElementById('firstname').value,
            LastName: document.getElementById('lastname').value,
            Email: document.getElementById('email').value,
            Password: document.getElementById('password').value,
            HoursCompleted: 0,
            IsTutor: document.getElementById('user_type').value
        };
        var apiEndpoint = '';
        if (document.getElementById('user_type').value == '0') {
            apiEndpoint = 'students';
        } else {
            apiEndpoint = 'tutors';
            data['Bio'] = document.getElementById('bio').value
            var selectedSubject = [];
            subjects.forEach((subject,index) => {
                if (document.getElementById(`subjects-${index}`).checked) {
                    selectedSubject.push(subject.lableText);
                }
            });
            data['Subject'] = selectedSubject.join(', ');
            data['AvailableHoursStart'] = document.getElementById('availablehoursstart').value;
            data['AvailableHoursEnd'] = document.getElementById('availablehoursend').value;
        }
        axios.post(`http://localhost:8800/${apiEndpoint}`, data)
        .then((response)=>{
            alert('Account created successfully!')
        }).catch((error)=>{
            alert(error.response.data.sqlMessage || error)
        });
    } else {
        return false;
    }
}

export default function Singup(){
    const [signupState,setSignupState]=useState(initialState);

    const handleInputChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

    return (
        <div className="flex flex-col bg-gray-100 rounded-lg py-8 px-10 shadow-lg">
            <div className="flex place-content-center">
                <h1 className="text-2xl text-blue-500 pb-10">Signup to create an account</h1>
            </div>
            <div>
                <form id="registration-form">
                    <FormInput 
                        id='firstname'
                        name='firstname'
                        labelText='First Name'
                        type='text'
                        isRequired={true}
                        placeholder='First name'
                    />
                    <FormInput 
                        id='lastname'
                        name='lastname'
                        labelText='Last Name'
                        type='text'
                        isRequired={true}
                        placeholder='First name'
                    />
                    <FormInput 
                        id='email'
                        name='email'
                        labelText='Email Address'
                        type='email'
                        isRequired={true}
                        placeholder='Email'
                    />
                    <FormSelect
                        id='user_type'
                        name='user_type'
                        labelText='User Type'
                        isRequired={true}
                        options={userTypeOptions}
                        changeHandler={handleInputChange}
                    />
                    {
                        signupState.user_type === '1' && 
                        <FormGroupCheckbox
                            id='subjects'
                            name='subjects'
                            labelText='Subjects'
                            options={subjects}
                        />
                    }
                    {
                        signupState.user_type === '1' && 
                        <FormTextArea
                            id='bio'
                            name='bio'
                            labelText='Bio'
                        />
                    }
                    <div className="flex flex gap-2">
                        {
                            signupState.user_type === '1' && 
                            <FormInput 
                                id='availablehoursstart'
                                name='availablehoursstart'
                                labelText='Available Hours Start'
                                type='time'
                            />
                        }
                        {
                            signupState.user_type === '1' && 
                            <FormInput 
                                id='availablehoursend'
                                name='availablehoursend'
                                labelText='Available Hours End'
                                type='time'
                            />
                        }
                    </div>
                    <FormInput 
                        id='password'
                        name='password'
                        labelText='Password'
                        type='password'
                        isRequired={true}
                        placeholder='****'
                    />
                    <FormInput 
                        id='confirm_password'
                        name='confirm_password'
                        labelText='Confirm Password'
                        type='password'
                        isRequired={true}
                        placeholder='*****'
                    />
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
                        onClick={submitForm}
                    >Signup</button>
                </form>
            </div>
        </div>
    )
}