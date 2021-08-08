import { useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import './Dashboard.css';
import UserContext from './UserContext';
var dateFormat = require("dateformat");
var now = new Date();

function Dashboard() {
  const {User, setUser} = useContext(UserContext);
  let history = useHistory();
    
      if(User===false){
        return <Redirect to= "/sign-in"/>
      }
      else{
      return(
        <div id="dashboard">
          <div className="container">
            <div className="row align-items-center dash-row">
              <div className="col-7 dash-col" id="welcome-msg">
                <p>
                  {"Welcome " + User['fName'] + " " + (User['lName']? User['lName'] : "" ) + "!"}
                </p>
                <p id="spent-msg">
                  You have spent:
                </p>
              </div>

              <div className="col-5 dash-col" id="total-amt">
                2034$
              </div>
            </div>
          </div>
        </div>
      )}
}

export default Dashboard;