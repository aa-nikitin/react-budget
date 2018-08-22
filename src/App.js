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

const Link = styled.span`
  font-family: 'Marmelad';
  cursor: pointer;
  color: white;
  margin: 0 8px;
  border-bottom: ${({selected}) =>
    selected ? '2px solid white' : 'none'};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  font-size: 25px;
  padding: 40px 0 15px;
`;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      navSelected: 'expanse'
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

  handleNavClick = e => {
    this.setState({
      navSelected: e.target.getAttribute('name')
    });
  }

  render() {
    const {date, navSelected} = this.state;
    console.log(navSelected);

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
        <main>
          <Nav>
            <Link name='expanse' onClick={this.handleNavClick} selected={navSelected === 'expanse'}>
              Расходы сегодня
            </Link>
            <Link name='incomes' onClick={this.handleNavClick} selected={navSelected === 'incomes'}>
              Доходы
            </Link>
          </Nav>
        </main>
      </section>
    );
  }
}

export default App;
