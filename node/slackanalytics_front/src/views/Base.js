import { apiURL } from '../App';
import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { renderMatches, useNavigate } from 'react-router-dom';
import { Table,TableHead,TableBody,TableRow,TableCell  } from'@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import '../stylesheets/views/views.css';

function BaseList(){
    /*
    SlackAnalyticsBackEndから、リクエストを送ったユーザーが「所属する団体の拠点一覧」を取得します。
    そして取得したJson形式の拠点を一覧表示します。
    アクセストークンがCookieにセットされていない場合、アクセストークンが無効な場合はログインページに遷移します。
    */
    const navigate = useNavigate();
    const [cookies,setCookie] = useCookies(['auth']);
    // アクセストークンをcookieから取得
    const token = cookies.accesstoken;
    // stateをセットするための定義
    const [bases,setBases] = useState([]);
    useEffect(()=>{
        // SlackAnalyticsBackEndの/base/listにリクエストを送る
        axios.get(`${apiURL}base/list/`,{
            // headerにアクセストークンをセットする
            headers: {
                'Content-Type': 'application/json',
                "authorization": `JWT ${token}`,
            }
        },
        )
        .then(
            response =>{
                // 取得したオブジェクトを変換
                var base_obj = response.data.base_obj
                console.log(base_obj)
                // basesのstateをセットする
                setBases(base_obj)
            },
            error =>{
                // トークンがないまたは無効の場合、SlackAnalyticsBackEndからステータスコード401が返ってくる
                if(error.response.status === 401){
                    // alert('ログインしてください。');
                    navigate('/login');
                // SlackAnalyticsBackEndがInternalServerErrorを起こしている場合
                }else if(error.response.status === 500){
                    alert('サーバエラー')
                }
            }
        )
    },
    [])
    let base_array = []
    bases.map((base) =>
        base_array.push({
            name: base.name,
            created_at: base.created_at.split("T")[0]
        })
    );
    return(
        <div className='table-container'>
            <h2>拠点一覧</h2>
            <Table>
                <TableHead>
                    <TableCell align="center">
                        <b>拠点名</b>
                    </TableCell>
                    <TableCell align="center">
                        <b>登録日</b>
                    </TableCell>
                </TableHead>
                <TableBody>
                    {base_array.map((base,index)=>(
                        <TableRow key={index}>
                                <TableCell align="center">{base.name}</TableCell>
                                <TableCell align="center">{base.created_at}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </div>
    );

}

export default BaseList;