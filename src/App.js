import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import styled from 'styled-components';

const DateButton = styled.button`
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  background-color: transparent;
  width: 32px;
  height: 32px;
  margin: 3px;
  cursor: pointer;
  text-align: center;
`;

const DateLine = styled.div`
  display: flex;
  align-items: center;
`;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment()
    }
  }

  handleAddDay = () => {
    this.setState({
      date: this.state.date.add(1, 'day')
    });
  }

  handleSubstractDay = () => {
    this.setState({
      date: this.state.date.subtract(1, 'day')
    });
  }

  render() {
    const {date} = this.state;

    return (
      <section>
        <header>
          <h1>Реактивный бюджет</h1>
          <DateLine>
            <DateButton onClick={this.handleSubstractDay}>-</DateButton>
            <p>{date.format('DD.MM.YYYY')}</p>
            <DateButton onClick={this.handleAddDay}>+</DateButton>
          </DateLine>
        </header>
      </section>
    );
  }
}

export default App;
