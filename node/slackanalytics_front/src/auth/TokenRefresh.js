import { useCookies } from 'react-cookie';
import { useDispatch,useSelector } from 'react-redux'
import { renderMatches, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isLoggedInOff } from "../stores/Users";
import { apiURL } from '../App';


const TokenRefresh = () => {
    const navigate = useNavigate();
    const isLoggedIn= useSelector(state => state.user.isLoggedIn);
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    // アクセストークンのリフレッシュ処理
    async function refreshToken(){
    axios.post(apiURL+'auth/jwt/refresh',{
            refresh:cookies.refreshtoken,
        })
        .then(res => {
            console.log("refresh");
            setCookie('accesstoken', res.data.access, { path: '/' }, { httpOnly: true });
            setCookie('refreshtoken', res.data.refresh, { path: '/' }, { httpOnly: true });
        })
        .catch(err => {
            alert("ログインしてください");
            dispatch(isLoggedInOff());
            navigate('/login');
        });
    }
    // アクセストークンの検証処理
    async function verifyAccessToken(){
    axios.post(apiURL+'auth/jwt/verify',{
            token:cookies.accesstoken,
        }).then(res => {
            console.log("JWT ok");
        })
        .catch(err => {
            if(err.response.status === 401){
            console.log("verify failed")
            // 検証結果が401の場合リフレッシュを試す
            refreshToken();
            }
        });
    }
    // useLayoutEffect(() => {
    if(isLoggedIn){
        // isLoggedInがTrueで JWTがある
        if(cookies.accesstoken !== undefined){
        console.log("go verify");
        verifyAccessToken();
        }
        // isLoggedInはTrueだが JWTがない
        else{
        // ログインページへ遷移
        // isLoggedInをfalseに
        alert("ログインしてください。");
        dispatch(isLoggedInOff());
        navigate('/login');
        }
    }
    // },[]);
}

export default TokenRefresh