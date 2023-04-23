import React, { useState } from 'react';
import './login.css';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../redux/tokenSlice';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shown, setShown] = useState(false);

  const switchShown = (e) => {
    e.preventDefault();
    setShown(!shown);
  };
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tokens`,
        {
          email,
          password,
        }
      );

      dispatch(
        loginUser({
          email,
          token: response.data.token,
          userId: response.data.userId,
        })
      );

      setSuccessMessage(response.data);
      setErrorMessage('');
      setPassword('');
      setEmail('');
      navigate('/');
    } catch (err) {
      setErrorMessage(err.response.data);
      setSuccessMessage('');
    }
  };

  return (
    <div className='container vh-100 px-0'>
      <div className='loginBackground h-50'>
        <img src='./background.jpg' alt='' />
      </div>

      <div className='row rowContainer pt-5'>
        <div className='col-12'>
          <h1 className='titleLogin'>¡HOLA DE NUEVO!</h1>
          <h3 className='subtitleLogin'>Entra a tu cuenta</h3>
          <form
            className='d-flex flex-column justify-content-center align-items-center px-2'
            onSubmit={(e) => {
              handleLogin(e, email, password);
            }}
          >
            <div className='form-group pt-2'>
              <input
                type='email'
                className='form-control loginInput mb-2'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Escribe tu email o número de teléfono'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className='form-group passwordGroup loginInput-container'>
              <input
                type={shown ? 'text' : 'password'}
                className='form-control loginInput'
                id='exampleInputPassword1'
                placeholder='Escribe tu contraseña'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className='passwordIcon'
                onClick={(e) => {
                  switchShown(e);
                }}
              >
                {shown ? (
                  <i
                    className='fa-solid fa-eye-slash'
                    style={{ color: '#f2f2f2' }}
                  ></i>
                ) : (
                  <i
                    className='fa-sharp fa-solid fa-eye'
                    style={{ color: '#f2f2f2' }}
                  ></i>
                )}
              </button>
            </div>

            <button type='submit' className='btn btnLogin mt-5'>
              Ingresa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
