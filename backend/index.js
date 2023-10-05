
const  express = require("express");
const  mongoose = require("mongoose");
const  jwt = require("jsonwebtoken");
const  cors = require("cors");


const app = express();
const port = 3000;
const SECRET = 'SECr3t';


app.use(cors());
app.use(express.json());


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});
const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);




const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload) {
        return res.sendStatus(403);
      }
      if (typeof payload === "string") {
        return res.sendStatus(403);
      }
      
      req.headers["userId"] = payload.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/signup', async (req, res) => {
   
    const {username, password} = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token  });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

app.get('/me', authenticateJwt, async (req, res) => {
    const userId = req.headers["userId"];
    const user = await User.findOne({ _id: userId });
    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(403).json({ message: 'User not logged in' });
    }
});

app.post('/todos', authenticateJwt, (req, res) => {
    const { title, description } = req.body;
    const done = false;
    const userId = req.headers["userId"];
    
    const newTodo = new Todo({ title, description, done, userId });
    
    newTodo.save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
        })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
    
    
app.get('/todos', authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];

    Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
        })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

app.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];

    Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
        .then((updatedTodo) => {
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
        })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to update todo' });
    });
});
    
app.delete('/todos/:todoId', authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    Todo.findOneAndDelete({ _id: todoId, userId }).then((deletedTodo) => {
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(deletedTodo);
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    })

});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://tanuj:z3UZbdBCTyad5JeU@cluster0.tgbhlws.mongodb.net/', { dbName: "TODO-APP" });