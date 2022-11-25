// Bootstrapの導入
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import BaseList from './views/Base';
import Top from './Top';
import Header from './layouts/Header';
import TokenRefresh from './auth/TokenRefresh';

// APIサーバーのURLを指定
export const apiURL=process.env.REACT_APP_API_URL

const App = () => {
    return (
      <BrowserRouter>
          <TokenRefresh/>
          <Header/>
            <div className="main">
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/base/list" element={<BaseList/>} />
                    <Route path="/" element={<Top/>} />
                    <Route render={() => <p>not found!.</p>} />
                </Routes>
            </div>
      </BrowserRouter>
    );
}

export default App;
