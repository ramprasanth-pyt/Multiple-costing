'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlaneSelector,
  ViroText
} from 'react-viro';

const API = 'http://10.101.2.77:8080/api'

// import {triggerSampleAPICall} from '../API/triggerApiCall';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {};

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount = () => {
    axios.get(`${API}/ar/sample`).then(response => response.data).then((data) => this.setState({ dataTORender: data.data }))
  }

  render() {
    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {this.state.dataTORender ? this.state.dataTORender.length > 2 ? <Viro3DObject
          source={require("../assets/modals/lowpolytree.obj")}
          resources={[require('../assets/modals/lowpolytree.mtl')]}
          highAccuracyEvents={true}
          position={[0, 0, -1]}
          scale={[0.1, 0.1, 0.1]}
          rotation={[1, 0, 0]}
          type="OBJ"
        //transformBehaviors={["billboard"]}
        /> : <ViroText style={{ fontFamily: "Arial", fontSize: 10, fontStyle: "italic", color: "#0000FF" }} text={this.state.dataTORender[0]} /> : null}

      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
