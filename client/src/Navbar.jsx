import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import './Navbar.css';
import UserContext from "./UserContext";

function Navbar() {

    const {user, setUser} = useContext(UserContext);
    const history = useHistory();

    const signOut = ()=>{
        fetch('http://127.0.0.1:8080/log-out', {
          method: 'POST'
        })
        .then(response => {
          if(response.ok){
            setUser(false);
            history.push("/sign-in");
          }
          else{
            alert('Something went wrong. Please try again');
          }
        })
      }

    return(
        <div id="navbar">
            <div>
                <div className="row justify-content-between">
                    <div className="col-xl-2 navbarcol">
                        <button onClick={()=>{
                        signOut();
                        }} id="log-out">Log Out</button>
                    </div>
                    <div className="col-xl-9 navbarcol">      
                        <div className="row">
                            <div className="col-xl-4 navbar-inner-col" style={{paddingLeft:"55px"}}>
                                <Link to="/dashboard" className="navbar-link">DASHBOARD</Link>
                                <i class="material-icons" style={{fontSize:'36px', color:'#00FFBA', marginTop:'8px', position:'absolute'}}>auto_awesome_mosaic</i>
                            </div>
                            <div className="col-xl-3 navbar-inner-col" style={{color:'black'}}>
                                <Link to="/expenses" className="navbar-link">EXPENSES</Link>
                                <i className="fa fa-solid fa-dollar-sign fa-2x" style={{color: '#00FFBA'}}></i>
                            </div>
                            <div className="col-xl-3 navbar-inner-col">
                                <Link to="/report" className="navbar-link">REPORT</Link>
                                <i class="fa fa-solid fa-chart-bar fa-2x" style={{color: '#00FFBA'}}></i>
                            </div>
                            <div className="col-xl-2">
                                <button className="navbar-button">
                                    <i className="fas fa-plus fa-3x"></i>
                                </button>
                            </div>
                                
                            
                                
                                
                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;