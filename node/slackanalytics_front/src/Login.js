import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { apiURL } from './App';


const Login = (props) => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    const { register, handleSubmit, watch, errors } = useForm();

    const getJwt = async (data) =>{
        await axios.post(`${apiURL}auth/jwt/create/`,
          {
            email:data.email,
            password:data.password,
          },
        )
        .then(function (response) {
          setCookie('accesstoken', response.data.access, { path: '/' }, { httpOnly: true });
          setCookie('refreshtoken', response.data.refresh, { path: '/' }, { httpOnly: true });
          navigate('/');
        })
        .catch(err => {
            console.log("miss");
            alert("EmailまたはPasswordが間違っています。");
        });
      };

    return (
        <div className="top-wrapper">
          <div class="login">
            <h3>Login</h3>
          </div>
          <div class="login-block">
            <form onSubmit={handleSubmit(getJwt)}>
              <label for="email">Email：</label>
              <input className='form-control' {...register('email')} />
              <label for="password">PassWord：</label>
              <input className='form-control' type="password" {...register('password', { required: true })} />
              <input className='btn btn-secondary' type="submit" value="ログイン" />
            </form>
          </div>
        </div>
    );
  }

  export default Login;