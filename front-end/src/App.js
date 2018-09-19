import React, { Component } from "react";
import "./App.css";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Nagivation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  width: "",
  height: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = user => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onEnterKeyPress = event => {
    if (event.charCode === 13) {
      this.onPictureSubmit();
    }
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input }, () => {
      const image = document.getElementById("inputimage");
      // image.style.display = "inline-block";
      fetch("http://localhost:3000/imageurl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: this.state.imageUrl
        })
      })
        .then(response => response.json())
        .then(response => {
          // response.json();
          // console.log(response);
          if (response) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              })
              .catch(err => console.log(err));
          }
          this.setState({ boxes: response.outputs[0].data.regions }, () => {
            this.setState({
              width: Number(image.width),
              height: Number(image.height)
            });
          });
        })
        .catch(err => console.log(err));
    });
  };

  onRouteChange = route => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes, width, height } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onEnterKeyPress={this.onEnterKeyPress}
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition
              boxes={boxes}
              imageUrl={imageUrl}
              w={width}
              h={height}
            />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
