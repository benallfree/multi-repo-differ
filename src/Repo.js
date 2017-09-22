import React, { Component } from 'react';
import {parseDiff, Diff} from 'react-diff-view';
import axios from 'axios';
import './Repo.css'

export default class Repo extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      files: [], 
      isReady: false,
      branchName: '',
    };
  }
  
  componentWillMount() {
    let refresh = ()=>{
      axios.get(`http://localhost:4001/api/${this.props.repoName}`).then((res)=>{
        this.setState(p=>{
          let d = res.data.diff.replace(/\t/g, '  ');
          p.branchName = res.data.branchName;
          p.files = parseDiff(d);
          p.isReady = true;
          return p;
        });
      });
    }
    refresh();
    setInterval(refresh, 5000);
  }
  
  render() {
    if(!this.state.isReady) { return <div/>};
    let diffs = [];
    this.state.files.forEach(({newPath, hunks}, i) => {
      diffs.push(
        <div key={i}  className='File'>
          <div>{newPath}</div>
          <Diff hunks={hunks} viewType="unified" />
        </div>
      );
    });
    
    return (
      <div className='Repo' style={{height: this.props.height}}>
        <h3>{this.props.repoName}/{this.state.branchName}</h3>
        {diffs}
      </div>
    );
  }
};
