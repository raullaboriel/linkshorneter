import React from 'react'
import origin from '../origin.js';
import axios from 'axios';

const Login = (props) => {
  const [data, setData] = React.useState({ username: '', password: '' });
  const [isInfoOk, setIsInfoOk] = React.useState(true);

  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    setIsInfoOk(true);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    await axios.post(origin() + '/user/login', data, { withCredentials: true })
      .then((res) => {
        props.setUser(res.data);
        setIsInfoOk(true);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoOk(false);
        return;
      });
  }

  return (
    <div className='container center'>
      <form onSubmit={(e) => onLogin(e)} className='d-flex flex-column form rounded-lg'>
        <div className='row text-left justify-content-center'>
          <div className='col'>
            <span className='text-white text-muted'>Usuario</span>
            <input onChange={(e) => handleDataChange(e)} value={data.username} name='username' required style={{ 'backgroundColor': 'rgb(58,59,61)', 'fontWeight': 'bold' }}
              className='form-control border-0 text-white' type='text' />
          </div>
        </div>
        <div className='row text-left justify-content-center'>
          <div className='col'>
            <span className='text-white text-muted'>Contraseña</span>
            <input onChange={(e) => handleDataChange(e)} value={data.password} name='password' required style={{ 'backgroundColor': 'rgb(58,59,61)', 'fontWeight': 'bold' }}
              className='form-control border-0 text-white' type='password' />
          </div>
        </div>
        {!isInfoOk &&
          <div className='row text-left justify-content-center'>
            <div className='col mt-1 mb-3'>
              <span className='text-danger position-fixed'><small className='font-weight-bold'>El usuario o contraseña es incorrecto</small></span>
            </div>
          </div>
        }
        <div className='row justify-content-center mt-3'>
          <div className='col'>
            <button style={{ 'backgroundColor': 'rgb(79,70,229)', 'fontSize': '18px' }}
              className='form-control border-0 text-white font-weight-bold' type='submit' >
              Iniciar sesión
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login