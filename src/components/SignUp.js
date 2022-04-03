import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import origin from '../origin.js';

const SignUp = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isDataValid, setIsDataValid] = useState({
        username: true,
        email: true,
        password: true,
    });

    const [signedUp, setSignedUp] = useState(false);

    const signUp = async (e) => {
        e.preventDefault();

        const user = {
            username: data.username,
            email: data.email,
            password: data.password
        }
        if (isDataValid.username && isDataValid.email && isDataValid.password) {
            await axios.post(origin() + '/user', user)
                .then(() => {
                    setSignedUp(true);
                })
        }
    }

    React.useEffect(() => {
        if ((data.password !== data.confirmPassword) || (data.password.length < 6 || data.confirmPassword.length < 6)) {
            if ((data.password !== '' && data.confirmPassword !== '')) {
                setIsDataValid(isDataValid => ({
                    ...isDataValid,
                    password: false
                }))
            }
        } else {
            setIsDataValid(isDataValid => ({
                ...isDataValid,
                password: true
            }))
        }
    }, [data.password, data.confirmPassword])

    React.useEffect(() => {
        const checkEmailUsername = async () => {
            await axios.post(origin() + '/user/check', { username: data.username, email: data.email })
                .then((response) => {
                    setIsDataValid(isDataValid => ({
                        ...isDataValid,
                        username: response.data.validUsername,
                        email: response.data.validEmail,
                    }))
                });
        }
        checkEmailUsername();
    }, [data.username, data.email]);

    const handleDataChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    if (signedUp) {
        return (
            <Redirect to={'/login'}></Redirect>
        )
    }

    return (
        <div className='container center'>
            <form onSubmit={e => signUp(e)} className='d-flex flex-column form rounded-lg'>
                <div className='row text-left justify-content-center mt-1 mb-1'>
                    <div className='col'>
                        <input autoCapitalize="none" onChange={e => handleDataChange(e)} value={data.username} placeholder='Nombre de usuario' name='username' required style={{ 'backgroundColor': 'rgb(58,59,61)', 'fontWeight': 'bold' }}
                            className={`form-control ${!isDataValid.username ? 'border-danger' : data.username !== '' ? 'border-success' : 'border-0'} text-white`} type='text' />
                        {!isDataValid.username ?
                            <div className='row text-left justify-content-center'>
                                <div className='col position-sticky'>
                                    <span className='text-danger'><small className='font-weight-bold'>Este usuario no esta disponible</small></span>
                                </div>
                            </div>
                            :
                            data.username !== '' &&
                            <div className='row text-left justify-content-center'>
                                <div className='col position-sticky'>
                                    <span className='text-success'><small className='font-weight-bold'>¡Se ve bien!</small></span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='row text-left justify-content-center mt-1 mb-1'>
                    <div className='col'>
                        <input onChange={e => handleDataChange(e)} value={data.email} placeholder='Correo eletrónico' name='email' required style={{ 'backgroundColor': 'rgb(58,59,61)', 'fontWeight': 'bold' }}
                            className={`form-control ${!isDataValid.email ? 'border-danger' : data.email !== '' ? 'border-success' : 'border-0'} text-white`} type='email' />
                        {
                            !isDataValid.email ?
                                <div className='row text-left justify-content-center'>
                                    <div className='col position-sticky'>
                                        <span className='text-danger'><small className='font-weight-bold'>Este correo no esta disponible</small></span>
                                    </div>
                                </div>
                                :
                                data.email !== '' &&
                                <div className='row text-left justify-content-center'>
                                    <div className='col position-sticky'>
                                        <span className='text-success'><small className='font-weight-bold'>¡Se ve bien!</small></span>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className='row text-left justify-content-center mt-1 mb-1'>
                    <div className='col'>
                        <input minLength={6} onChange={e => handleDataChange(e)} value={data.password} placeholder='Contraseña' name='password' required style={{ 'backgroundColor': 'rgb(58,59,61)', 'fontWeight': 'bold' }}
                            className={`form-control ${!isDataValid.password && data.password !== '' ? 'border-danger' : data.password !== '' ? 'border-success' : 'border-0'} text-white`} type='password' />
                    </div>
                </div>
                <div className='row text-left justify-content-center mt-1 mb-1'>
                    <div className='col'>
                        <input minLength={6} onChange={e => handleDataChange(e)} value={data.confirmPassword} placeholder='Confirme su contraseña' name='confirmPassword' required style={{ 'backgroundColor': 'rgb(58,59,61)', 'fontWeight': 'bold' }}
                            className={`form-control ${!isDataValid.password && data.confirmPassword !== '' ? 'border-danger' : data.confirmPassword !== '' ? 'border-success' : 'border-0'} text-white`} type='password' />
                        {!isDataValid.password ?
                            <div className='row text-left justify-content-center'>
                                <div className='col position-sticky'>
                                    <span className='text-danger'>
                                        <small className='font-weight-bold'>
                                            {`${data.password !== data.confirmPassword ? 'Las contraseñas no coinciden' : 'La contraseña es demasiado corta'}`}
                                        </small>
                                    </span>
                                </div>
                            </div>
                            :
                            (data.password !== '' && data.confirmPassword !== '') &&
                            <div className='row text-left justify-content-center'>
                                <div className='col position-sticky'>
                                    <span className='text-success'><small className='font-weight-bold'>¡Se ve bien!</small></span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='row justify-content-center mt-1'>
                    <div className='col'>
                        <button style={{ 'backgroundColor': 'rgb(79,70,229)', 'fontSize': '18px' }}
                            className='form-control border-0 text-white font-weight-bold' type='submit' >
                            Registrarte
                        </button>
                    </div>
                </div>
                <div className='row justify-content-center mt-2'>
                    <div className='col'>
                        <span style={{ 'fontSize': '14px' }} className='text-white text-muted'>
                            ¿Ya tienes una cuenta?
                            <Link className='ml-1' to='/login'>
                                <strong>
                                    Inicia sesión
                                </strong>
                            </Link>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp