import React from 'react';
import logo from './FFlogo.png';
import './Navigation.css';
import Particles from 'react-particles-js';
const PartOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out',
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};
const Navigation = (props) => {
  return (
    <nav className='bb b--light-blue' style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Particles className='particles' params={PartOptions} />
      <img className='pl3 top' height='90px' width='150px' src={logo} style={{ marginRight: 'auto' }} />
      {props.isSignedIn ? (
        <p
          style={{ marginBottom: 'auto', marginTop: 'auto' }}
          onClick={() => props.changeRoute('signin')}
          className=' top f3 link dim white b ba b--white pa1 mr1 pointer'
        >
          Sign Out
        </p>
      ) : (
        <div style={{ display: 'flex' }}>
          <p
            style={{ marginBottom: 'auto', marginTop: 'auto', marginRight: '1em', marginLeft: '1em' }}
            onClick={() => props.changeRoute('signin')}
            className='top f6 f5-ns f3-m f3-l dim white b ba b--white pa1 mr1 pointer links'
          >
            Sign In
          </p>

          <p
            style={{ marginBottom: 'auto', marginTop: 'auto', marginRight: '1em', marginLeft: '1em' }}
            onClick={() => props.changeRoute('register')}
            className=' top f6 f5-ns f3-m f3-l dim white b ba b--white pa1 mr1 pointer links'
          >
            Register
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
