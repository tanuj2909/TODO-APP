import { CardContent, Typography, CardActions, Card, CardMedia, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from './App';
export const Landing = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    if(!user) {
        return <div style={{display:'flex', justifyContent:'center', marginTop: '200px'}}>
            <Card sx={{ width: 500 }}>
                <CardMedia sx={{ height: 200 }} image="../assets/_.jpeg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Welcome to TODOz
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            At TODOz, we believe in simplifying your life, one task at a time. Whether you're a busy professional, a student, or anyone looking to stay organized, our Todo app is here to help.
                        </Typography>
                    </CardContent>
                <CardActions>
                    <Button size="small" style={{backgroundColor: "#333333", color: "white"}}  onClick={() => {
                        navigate('/login')
                    }}>Log in</Button>
                    <Button size="small" style={{backgroundColor: "#333333", color: "white"}}  onClick={() => {
                        navigate('/signup')
                    }}>Sign up</Button>
                </CardActions>
            </Card>
        </div>
    }
    return<div style={{display:'flex', justifyContent:'center', marginTop: '200px'}}>
        <Card sx={{ width: 500 }}>
            <CardMedia sx={{ height: 200 }} image="../assets/_.jpeg" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Welcome to TODOz
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        At TODOz, we believe in simplifying your life, one task at a time. Whether you're a busy professional, a student, or anyone looking to stay organized, our Todo app is here to help.
                    </Typography>
                </CardContent>
            <CardActions>
                <Button size="small" style={{backgroundColor: "#333333", color: "white"}}  onClick={() => {
                    navigate('/todos')
                }}>Get Todos</Button>
                <Button size="small" style={{backgroundColor: "#333333", color: "white"}}  onClick={() => {
                    navigate('/todos/new')
                }}>Add a new todo</Button>
            </CardActions>
        </Card>
    </div>
    
}