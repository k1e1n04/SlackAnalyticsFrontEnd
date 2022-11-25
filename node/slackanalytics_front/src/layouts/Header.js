import { apiURL } from '../App';
import React, { useState, useEffect, useRef} from 'react';
import '../stylesheets/layouts/Header.css'
import logo from "../images/slackanalytics_logo.svg"
import {Navbar,Nav,ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <div id="header-top">
                <div className='header-logo'>
                    <img src={logo} alt="" />
                </div>
            </div>
            <div id="header-left">
            <ListGroup variant="flush">
                <ListGroup.Item><Link to="login">ログイン</Link></ListGroup.Item>
                <ListGroup.Item><Link to="base/list">拠点管理</Link></ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            </div>
        </header>
    )
}

export default Header;