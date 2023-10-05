import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Todo } from "./Todo";
import { Button, Typography } from "@mui/material";
export const Todos = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/todos', {
            method: 'GET',
            headers:{
                'Content-type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                setTodos(data);
            })
        })
    }, []);

    if(todos.length === 0) {
        return<div>
            <Button variant="contained" size="large" style={{ margin: '50px', backgroundColor: "#333333", color: "white", fontSize: '24px', padding: '10px'}}  onClick={() => {
                navigate('/todos/new');
            }}>    + Add a Todo    </Button>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Typography  style={{color: "grey", fontSize: '50px'}}>No Todos found</Typography>
            </div>
        </div>
    }
    return <div>
        <Button variant="contained" size="large" style={{ margin: '50px', backgroundColor: "#333333", color: "white", fontSize: '24px', padding: '10px'}}  onClick={() => {
            navigate('/todos/new');
        }}>    + Add a Todo    </Button>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {todos.map((todo) => <Todo todo={todo} />)}
        </div>
    </div>
}

