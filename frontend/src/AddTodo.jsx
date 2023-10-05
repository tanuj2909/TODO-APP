import {Button, TextField, Card, Typography} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    return<div >
        <div style={{display: "flex", justifyContent:"center",alignContent: "center", padding:"50px"}}>
            <Typography variant={'h3'} >Add a new Todo</Typography>
        </div>
        <div style={{display: "flex", justifyContent:"center"}}>
            <Card style={{padding:"80px", width: "400px"}}>
                <TextField label="Title" variant="outlined" color={'secondary'} style={{display: "flex", justifyContent:"center", padding: '5px'}} onChange={(e) => {
                    setTitle(e.target.value);
                }}/>
                <br/>
                <TextField label="Description" varient="outlined" color={'secondary'} style={{display: "flex", justifyContent:"center", padding: '5px'}} onChange={(e) => {
                    setDescription(e.target.value);
                }}/>
                <br/>
                <Button variant="contained" size="large" style={{ margin: '5px' ,padding: '5px', backgroundColor: "#333333", color: "white"}} onClick={async () => {
                    
                    const response = await axios.post('http://localhost:3000/todos', {
                        title,
                        description
                    },{
                        headers:{
                            authorization: 'Bearer ' + localStorage.getItem("token")
                        }
                    })
                    if(response.status === 201) {
                        navigate('/todos');
                    }
                }}>Add Todo</Button>
            </Card>
        </div>
        
    </div>
}