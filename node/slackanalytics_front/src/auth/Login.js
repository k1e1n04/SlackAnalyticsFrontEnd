import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
import {Button,Form} from 'react-bootstrap';
import '../stylesheets/auth/Login.css'
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInOn } from "../stores/Users";

const Login = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    const { register, handleSubmit, watch, errors } = useForm();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const getJwt = async (data) =>{
      await axios.post(`${apiURL}auth/jwt/create/`,
        {
          email:data.email,
          password:data.password,
        },
      )
      .then(function (response) {
        dispatch(isLoggedInOn());
        // アクセストークンとリフレッシュトークンをcookieにセット、XSS対策のためにhttpOnly属性を有効にしておく
        setCookie('accesstoken', response.data.access, { path: '/' }, { httpOnly: true });
        setCookie('refreshtoken', response.data.refresh, { path: '/' }, { httpOnly: true });
        navigate('/');
      })
      .catch(err => {
          alert("EmailまたはPasswordが間違っています。");
      });
    };

    return (
        <div className="form-wrapper">
          <div className="login">
            <h3>ログイン</h3>
          </div>
          <div className="login-block">
            <Form onSubmit={handleSubmit(getJwt)}>
              <Form.Label for="email">Email</Form.Label>
              <Form.Control type="email" className='shadow-none' placeholder="name@example.com" {...register('email')} />
              <Form.Label for="password">PassWord</Form.Label>
              <Form.Control className='shadow-none' type="password" {...register('password', { required: true })} />
              <Button variant="btn btn-primary" type="submit">ログイン</Button>
            </Form>
          </div>
        </div>
    );
  }

  export default Login;