import { Avatar, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "./App";


export const Appbar = () => {
    const navigate = useNavigate();
    const [imgStyle, setImgStyle] = useState({height: '75px', width: '75px', borderRadius: '50%', cursor: 'pointer', transition: 'borderRadius 1s'});
    const [username, setUsername] = useRecoilState(userState);
    
    if(username) {
        return <div style={{display: "flex", justifyContent:"space-between", padding:"10px"}}>
        <div>
            <img src="../assets/bLogo.png" style={imgStyle}
                onMouseEnter={() => {
                    setImgStyle({
                        ...imgStyle,
                        borderRadius: '25%',
                    });
                }}
                onMouseLeave={() => {
                    setImgStyle({
                        ...imgStyle,
                        borderRadius: '50%',
                    });
                }} onClick={() => {
                    navigate('/');
            }}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Avatar style={{margin:"12px"}}/>

            <div>
                <Button variant="contained" size="large" style={{margin: "10px", backgroundColor: "#333333", color: "white"}} onClick={() => {
                    localStorage.setItem("token", undefined);
                    setUsername(null)
                    navigate('/')
                }}>Log out</Button>
            </div>
            
            
            
            
        </div>
        
    </div>
    }
    return <div style={{display: "flex", justifyContent:"space-between", padding:"10px"}}>
        <div>
            <img src="../assets/bLogo.png" style={imgStyle}
                onMouseEnter={() => {
                    setImgStyle({
                        ...imgStyle,
                        borderRadius: '25%',
                    });
                }}
                onMouseLeave={() => {
                    setImgStyle({
                        ...imgStyle,
                        borderRadius: '50%',
                    });
                }} onClick={() => {
                    navigate('/');
            }}/>
        </div>
        <div>
            <Button variant="contained" size="large" style={{margin: "5px", backgroundColor: "#333333", color: "white"}} onClick={() => {
                navigate('/login')
            }}>Log in</Button>
            <Button variant="contained" size="large" style={{margin: "5px", marginRight: "30px", backgroundColor: "#333333", color: "white"}} onClick={() => {
                navigate('/signup')
            }}>Sign up</Button>
        </div>
        
    </div>

}

