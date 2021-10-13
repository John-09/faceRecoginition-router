import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import './App.css';
import 'tachyons';
import { BrowserRouter, Route, Link } from "react-router-dom";

const app=new Clarifai.App({
  apiKey:'c507a50224884d90bd77c83915093a6e'
});

const particlesOptions={
  particles: {
    number: {
      value:40,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}
class App extends Component{
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'Signin'
    }
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayFaceBox = (box)=>{
    console.log(box);
    this.setState({box:box});
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err=>console.log(err));
  }

  // if(sign==='Signout'){
  //   this.setState({isSignedin:false})
  // }else if(sign==='/'){
  //   this.setState({isSignedin:true})
  // }


  render(){
    const {imageUrl,box}=this.state;
    const Main={Navigation,Logo,Rank,ImageLinkForm,FaceRecognition};
    return (
      <BrowserRouter>
      <div className="App">
          <Particles className='particles'
          params={particlesOptions} />
          <Route path="/Main" >
            <div>
              <Navigation />   
              <Logo/>
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          </Route>
          <Route path="/" exact>
            <Signin />
          </Route>
          <Route path="/register"> 
            <Register />
          </Route>
          </div>
        </BrowserRouter>
    );
  }
}  

export default App;


