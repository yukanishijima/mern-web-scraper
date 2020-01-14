import React, { Component } from "react";
import Header from './components/Header';
import Result from './components/Result';

import API from './API';

import './App.css';
// import { set } from "mongoose";


class App extends Component {
  state = {
    result: [],
  };

  handleScrape = (e) => {
    e.preventDefault();
    const website = e.target.name;
    API.scrapeArticles(website)
      .then(res => {
        // console.log(res.data);
        this.setState({
          result: res.data,
        })
      });
  }

  render() {

    return (
      <>
        <Header />
        <div>
          <button onClick={this.handleScrape} name="techcrunch">Tech Crunch</button>
          <button onClick={this.handleScrape} name="tnw">Tnw</button>
          <button onClick={this.handleScrape} name="wired">WIRED</button>
        </div>

        {this.state.result.map((el, index) =>
          <Result
            key={index}
            title={el.title}
            link={el.link}
            content={el.content}
            image={el.image}
          />
        )}
      </>
    );

  }
}

export default App;
