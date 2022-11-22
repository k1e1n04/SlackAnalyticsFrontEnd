import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Top from './Top';

// APIサーバーのURLを指定
export const apiURL=process.env.REACT_APP_API_URL

const App = () => {
    return (
      <BrowserRouter>
        <div>
          <div className="main">
              <Routes>
                  <Route path="/" element={<Top/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route render={() => <p>not found!.</p>} />
              </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
}

export default App;
