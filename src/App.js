import React, { Component } from 'react';
import './App.css';

import Repo from './Repo'

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      isReady: false,
      width: 0,
      height: 0,
    };
  }
  
  componentDidMount() {
    window.addEventListener('resize', ()=>{this.updateWindowDimensions()});
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ()=>{this.updateWindowDimensions()});
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight, isReady: true });
  }
  
  render() {
    if(!this.state.isReady) return <div/>;
    let divHeight = (this.state.height / 2 )-15;
    let repos = ['legendary-keystone-csl', 'legendary-keystone-dsl', 'legendary-keystone-web', 'projectalpha-documentation'];
    let tags = [];
    for(let i in repos)
    {
      tags.push(
        <Repo key={i} repoName={repos[i]} height={divHeight}/>
      );
    }
    return (
      <div>
        {tags}
      </div>
    );
  }
};
