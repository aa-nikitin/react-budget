import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import styled from 'styled-components';
import Expanse from './Expanse';
import Incomes from './Incomes';

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

const Table = styled.table`
  width: 450px;
  text-align: right;
  padding-top: 30px;
  margin: 0 auto;
`;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      navSelected: 'expanse',
      transactions: []
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

  handleSubmitTransaction = (sum, category) => {
    const {date: TodayDate, transactions} = this.state;
    const newTransaction = {
      date: TodayDate.format('DD.MM.YYYY'),
      category,
      sum
    }
    const newTransactions = [...transactions, newTransaction];

    /*const aDate = moment('26.08.2018', 'DD.MM.YYYY');
    const bDate = moment(TodayDate.format('DD.MM.YYYY'), 'DD.MM.YYYY');
    */



    newTransactions.sort((a, b) => {
      //console.log(a);
      const aDate = moment(a.date, 'DD.MM.YYYY');
      const bDate = moment(b.date, 'DD.MM.YYYY');
      return aDate.isAfter(bDate);
    });
    //console.log(sum, category);
    //console.log(newTransaction);
    this.setState({
      transactions: newTransactions
    });
  }

  onToday = () => {
    const {transactions, date} = this.state;

    const currentMonthTransactions = transactions.filter(
      ({date: transactionDate}) => 
        moment(transactionDate, 'DD.MM.YYYY').isSame(date, 'month') && moment(transactionDate, 'DD.MM.YYYY').isBefore(date),
    );

    const dailyMoney =
      currentMonthTransactions.reduce(
        (acc, transaction) =>
          transaction.sum > 0 ? transaction.sum + acc : acc,
        0,
      ) / (moment(date).daysInMonth() - moment(date).get('date') + 1);    

    const expanseBeforeToday = currentMonthTransactions.reduce(
      (acc, {sum}) => (sum < 0 ? acc + sum : acc),
      0,
    ) / (moment(date).daysInMonth() - moment(date).get('date') + 1);

    return Math.floor(dailyMoney + expanseBeforeToday);
  };

  render() {
    const {date, navSelected} = this.state;

    return (
      <section>
        <header>
          <h1>Реактивный бюджет</h1>
          <DateLine>
            <DateButton onClick={this.handleSubstractDay}>-</DateButton>
            <p>{date.format('DD.MM.YYYY')}</p>
            <DateButton onClick={this.handleAddDay}>+</DateButton>
          </DateLine>
          <p>На сегодня: {this.onToday()} рублей</p>
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
          {navSelected === 'expanse' ? (
            <Expanse onSubmit={this.handleSubmitTransaction}/>
          ) : (
            <Incomes onSubmit={this.handleSubmitTransaction} />
          )}

          <Table>
            <tbody>
              {this.state.transactions
                .filter(({date: transactionDate}) =>
                  moment(transactionDate, 'DD.MM.YYYY').isSame(
                    date,
                    'month',
                  ),
                )
                .map(({date, sum, category}, index) => (
                  <tr key={index}>
                    <td>{date}</td>
                    <td>{sum} ₽</td>
                    <td>{category}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          
          
        </main>
      </section>
    );
  }
}

export default App;
