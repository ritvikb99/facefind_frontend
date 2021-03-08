import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '1f3c8ed98c994a4782f4b162e9aae6be',
});

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      },
    };
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  calculateFaceBox = (data) => {
    let image = document.getElementById('inputImage');
    let height = Number(image.height);
    let width = Number(image.width);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - data.right_col * width,
      bottomRow: height - data.bottom_row * height,
    };
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onPictureSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict('d02b4508df58432fbb84e800597b8959', this.state.input)
      .then((response) => {
        if (response) {
          fetch('https://still-mountain-29865.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id }),
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState(Object.assign(this.state.user, { entries: data }));
            });
        }
        let boxes = [];
        for (let i = 0; i < response.outputs[0].data.regions.length; i++) {
          boxes.push(this.calculateFaceBox(response.outputs[0].data.regions[i].region_info.bounding_box));
        }
        this.displayFaceBox(boxes);
      })
      .catch((error) => console.log(error));
  };
  changeRoute = (route) => {
    if (route === 'main') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

  render() {
    if (this.state.route === 'signin') {
      return (
        <div className='App'>
          <Navigation isSignedIn={this.state.isSignedIn} changeRoute={this.changeRoute} />
          <SignIn changeRoute={this.changeRoute} loadUser={this.loadUser} />
        </div>
      );
    } else if (this.state.route === 'main') {
      return (
        <div className='App'>
          <Navigation isSignedIn={this.state.isSignedIn} changeRoute={this.changeRoute} />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
          <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageURL} />
        </div>
      );
    } else {
      return (
        <div className='App'>
          <Navigation isSignedIn={this.state.isSignedIn} changeRoute={this.changeRoute} />
          <Register changeRoute={this.changeRoute} loadUser={this.loadUser} />
        </div>
      );
    }
  }
}

export default App;
