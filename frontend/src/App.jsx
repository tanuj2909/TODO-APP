
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Signup } from './Signup';
import { Login } from './Login';
import { Appbar } from './Appbar';
import { Landing } from './Landing';
import { AddTodo } from './AddTodo';
import { Todos } from './Todos';
import { RecoilRoot, atom } from 'recoil'

const App = () => {

  return <div style={{backgroundColor:"#eeeeee", height:"100vh", width:"100vw", marginLeft: "-10px", marginTop: "-10px"}} >
    <RecoilRoot>
      <Router>
        <Appbar/>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/todos/new' element={<AddTodo/>} />
          <Route path='/todos' element={<Todos/>} />
        </Routes>
      </Router>
    </RecoilRoot>
    

  </div>
}

export const userState = atom({
  key:'userState',
  default: null
})

export default App
