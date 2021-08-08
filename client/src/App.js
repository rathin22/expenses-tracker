import './App.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import UserContext from './UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './Navbar';
function App() {

  var [expenses, setExpenses] = useState("");
  var [User, setUser] = useState(true);

  var userdata = "";
  useLayoutEffect(()=>{
    fetch('http://127.0.0.1:8080/sign-in-status')
    .then(response=>response.json())
    .then(signedInStatus => setUser(signedInStatus))
    .then(console.log("Status: "+ User));
    
  },[])
  
/*   fetch('http://127.0.0.1:8080')
  .then(response => response.json())
  .then(data => console.log(data)); */
  {/* <div className="App">
      {console.log(User)}
      <UserContext.Provider value= {{User, setUser}}>
        {!User && <SignIn/>}
        {User && <Dashboard/>}
      </UserContext.Provider>
       
    </div> */}
  return (
        <UserContext.Provider value= {{User, setUser}}>
          <Router>
            <Switch>
                <Route exact path = "/sign-in">
                    <SignIn/>
                </Route>
                <div>
                  <Navbar/>
                  <Route exact path = "/">
                      <Dashboard/>
                  </Route>
                </div>
            </Switch>
          </Router>
        </UserContext.Provider>
  );
}

export default App;
