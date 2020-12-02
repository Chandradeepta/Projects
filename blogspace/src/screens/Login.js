import React, { Component } from 'react'
import Branding from '../components/Login/Branding'
import LoginForm from '../components/Login/LoginForm'
import LoginNav from '../components/Login/LoginNav'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <section style={loginContainer}>
                <LoginNav />
                <Branding />
                <LoginForm />
            </section>
        )
    }
}

const loginContainer = {
    display: 'flex',
    width: '60%',
}
