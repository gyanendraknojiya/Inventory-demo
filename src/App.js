import "./App.css";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup"
import { useSelector } from "react-redux";

function App() {

  const {currentUser} = useSelector(state=> state)
  // console.log(currentUser)
  return (
    <Router>
      <Header />
      <Switch>
        <div className="container">
          <Route exact path="/login" render={()=> 
            currentUser? <Redirect to="/"/>:<Login/>
          } />
          <Route exact path="/signup" render={()=>
            currentUser? <Redirect to="/"/>:<Signup/>
          }  />
          <Route exact path="/" render={()=>
            !currentUser? <Redirect to="/login"/>:<Inventory/>
          } />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
