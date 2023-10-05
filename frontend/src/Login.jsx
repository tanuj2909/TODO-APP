import {Button, TextField, Card, Typography} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from "./App";
import axios from 'axios';
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    return<div >
        <div style={{display: "flex", justifyContent:"center",alignContent: "center", padding:"50px"}}>
            <Typography variant={'h3'} >Welcome back to Todoz</Typography>
        </div>
        <div style={{display: "flex", justifyContent:"center"}}>
            <Card style={{padding:"80px", width: "400px"}}>
                <TextField label="Username" variant="outlined" color={'secondary'} style={{display: "flex", justifyContent:"center", padding: '5px'}}  onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <br/>
                <TextField label="Password" varient="outlined" color={'secondary'} type ="password" style={{display: "flex", justifyContent:"center", padding: '5px'}} onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <br/>
                <Button variant="contained" size="large" style={{ margin: '5px' ,padding: '5px', backgroundColor: "#333333", color: "white"}} onClick={async () => {
                    
                    const response = await axios.post('http://localhost:3000/login', {
                        username,
                        password
                    })
                    if(response.status === 200){
                        localStorage.setItem("token", response.data.token);
                        setUser(username);
                        navigate('/');
                    }
                }}>Log in</Button>
            </Card>
        </div>
        
    </div>
}