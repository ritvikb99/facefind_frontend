import React, {Component} from 'react';
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import './App.css';
import Rank from "./components/Rank/Rank";
import Clarifai from "clarifai";


const app = new Clarifai.App({
  apiKey: '1f3c8ed98c994a4782f4b162e9aae6be'
 });

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: ""
    }
  }
  calculateFaceBox = (data)=>{
    console.log(data);
    let image = document.getElementById("inputImage");
    let height = Number(image.height);
    let width = Number(image.width);
    return({
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height - (data.bottom_row * height) 
    });
  }

  displayFaceBox = (box)=>{
    console.log(box);
    this.setState({box: box});
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }
  onButtonSubmit =()=>{
    this.setState({imageURL:this.state.input});
    app.models.predict("d02b4508df58432fbb84e800597b8959", this.state.input).then(
      (response)=>{
        this.displayFaceBox(this.calculateFaceBox(response.outputs[0].data.regions[0].region_info.bounding_box));
      }).catch(error => console.log(error));
  }

  render() {
    return (
    <div className="App">
      <Navigation />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
      
    </div>
    );
  }
}

export default App;
