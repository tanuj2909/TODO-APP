import { Card, Typography, Button } from "@mui/material"
import { useState } from "react"
import axios from "axios";

export const Todo = ({todo}) => {
    const [Todo, setTodo] = useState(todo);
    if(!Todo) {
        return<div></div>
    }
    if(Todo.done == true) {
        return <div >
        <Card style={{ width: '300px', height: '300px', margin: '20px'}}>
            
            <Typography variant={'h6'} style={{margin: '10px', marginTop: '80px'}}>
                 <b>Todo: </b>
                {todo.title}
            </Typography>
            <Typography variant={'h6'}  style={{margin: '10px'}}>
                <b>Description: </b>
                {todo.description}
            </Typography>
            <Button variant="contained" size="large" style={{ margin: '5px' ,padding: '5px', backgroundColor: "#808080", color: "white"}} disabled >Done</Button>
            <Button variant="contained" size="large" style={{ margin: '5px' ,padding: '5px', backgroundColor: "#333333", color: "white"}} onClick={async () => {
                
                const response = await axios.delete(`http://localhost:3000/todos/${todo._id}`,null, {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                })
                if(response.status === 200){
                    setTodo(null);
                }
            }}>Delete</Button>
        </Card>
    </div>
    }
    return <div >
        <Card style={{ width: '300px', height: '300px', margin: '20px'}}>
            
            <Typography variant={'h6'} style={{margin: '10px', marginTop: '80px'}}>
                 <b>Todo: </b>
                {todo.title}
            </Typography>
            <Typography variant={'h6'}  style={{margin: '10px'}}>
                <b>Description: </b>
                {todo.description}
            </Typography>
            <Button variant="contained" size="large" style={{ margin: '5px' ,padding: '5px', backgroundColor: "#333333", color: "white"}} onClick={async () => {
                
                const response = await axios.patch(`http://localhost:3000/todos/${todo._id}/done`, null, {
                    headers:{
                        authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                })
                if(response.status === 200) {
                    setTodo(response.data);
                }
            }}>Mark as done</Button>
                
            <Button variant="contained" size="large" style={{ margin: '5px' ,padding: '5px', backgroundColor: "#333333", color: "white"}} onClick={async () => {
                
                const response = await axios.delete(`http://localhost:3000/todos/${todo._id}`,null, {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                })
                if(response.status === 200){
                    setTodo(null);
                }
            }}>Delete</Button>
        </Card>
    </div>
    
}

