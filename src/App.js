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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
    };
  }

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
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict('d02b4508df58432fbb84e800597b8959', this.state.input)
      .then((response) => {
        console.log(response);
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
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  };

  render() {
    if (this.state.route === 'signin') {
      return (
        <div className='App'>
          <Navigation isSignedIn={this.state.isSignedIn} changeRoute={this.changeRoute} />
          <SignIn changeRoute={this.changeRoute} />
        </div>
      );
    } else if (this.state.route === 'main') {
      return (
        <div className='App'>
          <Navigation isSignedIn={this.state.isSignedIn} changeRoute={this.changeRoute} />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageURL} />
        </div>
      );
    } else {
      return (
        <div className='App'>
          <Navigation isSignedIn={this.state.isSignedIn} changeRoute={this.changeRoute} />
          <Register />
        </div>
      );
    }
  }
}

export default App;
