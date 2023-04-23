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
    <div className='container px-0'>
      <div className='loginBackground'>
        <img src='./background.jpg' alt='' />
      </div>

      <div className='row rowContainer'>
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
                className='form-control loginInput'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Escribe tu email o número de teléfono'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className='form-group passwordGroup'>
              <input
                type='password'
                className='form-control loginInput'
                id='exampleInputPassword1'
                placeholder='Escribe tu contraseña'
                style={{ marginTop: '10px' }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className='row checkBoxLogin pt-1 d-flex flex-column align-items-end'>
              <div
                className='px-0'
                style={{
                  width: '99px',
                  height: '22px',
                }}
              >
                <div className='form-check d-flex align-items-center mx-0 px-0'>
                  {/* <img src={recuerdame} alt='' /> */}
                  <label
                    className='form-check-label recuerdameText'
                    htmlFor='exampleCheck1'
                    style={{ paddingLeft: '5px' }}
                  >
                    Recuérdame
                  </label>
                </div>
              </div>
              <div className=' px-0'>
                <div className='form-check d-flex align-items-center'>
                  <label
                    className='form-check-label passwordLogin m-1'
                    htmlFor='exampleCheck1'
                  >
                    ¿Olvidaste la contraseña?
                  </label>
                </div>
              </div>
            </div>

            <button type='submit' className='btn btnLogin'>
              Ingresa
            </button>

            <div className='login-form-footer pt-3'>
              <div className='footer-right'>
                <Link href='#' style={{ marginRight: '57px' }}>
                  {/* <img src={google} alt='google' className='socialLogin' /> */}
                </Link>

                <Link href='#'>
                  {/* <img src={facebook} alt='facebook' className='socialLogin' /> */}
                </Link>
              </div>
            </div>

            <div className='row' style={{ paddingTop: '15px' }}>
              <p className='miembroLogin'>
                ¿No eres miembro aún?{' '}
                <Link to='/register' className='miembroLogin uneteLogin'>
                  Únete
                </Link>{' '}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
