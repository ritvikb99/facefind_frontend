import React from "react";
import logo from "./FFlogo.png";
import './Navigation.css';
import Particles from "react-particles-js";
const PartOptions = {
    "particles": {
        "number": {
            "value": 160,
            "density": {
                "enable": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "speed": 4,
                "size_min": 0.3
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "random": true,
            "speed": 1,
            "direction": "top",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            }
        },
        "modes": {
            "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
            },
            "repulse": {
                "distance": 400,
                "duration": 4
            }
        }
    }
}
const Navigation = ()=>{
    return(
        
        <nav className = "bb b--green" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Particles className="particles"
            params={PartOptions} />
            <img className = "pl3 top" src={logo} height="100px" width="150px" style={{marginRight:'auto'}} />
            <p style ={{marginBottom:'auto', marginTop:'auto'}} className = " top f3 link dim white b ba b--white pa1 mr1 pointer">Sign Out</p>
        </nav>
    )
}

export default Navigation;