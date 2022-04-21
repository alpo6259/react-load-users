import React, { Component } from 'react';
import loadUsers from '../../api';

class UsersLoader extends Component {
  constructor (props) {
    super(props);

    this.state = {
      users: [],
      isFatching: false,
      error: null,
      currentPage: 1,
      hendleResult: 0,
    };
  }
  //

  load = () => {
    console.log('load');
    const { currentPage, hendleResult } = this.state;
    this.setState({ isFatching: true });
    loadUsers({ page: currentPage, results: hendleResult })
      .then(({ results }) => this.setState({ users: results }))
      .catch(e => {
        this.setState({ error: e });
      })
      .finally(() => {
        this.setState({ isFatching: false });
      });
  };

  componentDidMount () {
    this.getNamber();
    console.log('cdm');
    this.load();
  }
  //
  componentDidUpdate (prevProps, prevState) {
    console.log('cdu');

    //
    const { currentPage, hendleResult } = this.state;
    //
    if (prevState.hendleResult !== hendleResult) {
      this.load();
    }
    //
    if (prevState.currentPage !== currentPage) {
      this.load();
    }
  }

  increment = () => {
    const { currentPage, users } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  };

  decrement = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };
  myUserList = ({
    gender,
    name: { first: firstName, last: lastName },
    picture: { large: src },
  }) => {
    return (
      <div>
        <img src={src} />
        <span>{gender}</span>
        <span>
          {firstName}
          {lastName}
        </span>
      </div>
    );
  };
  getNamber = () => {
    console.log('number');
    const { hendleResult } = this.state;
    this.setState({ hendleResult: Number(prompt('get number')) });
  };
  lendleGetResults = e => {
    this.setState({ hendleResult: Number(e.target.value) });
  };
  // this.getNamber();

  //
  render () {
    console.log('render');
    //
    const { users, error, isFatching } = this.state;

    return (
      <>
        {/* <button onClick={this.getNamber}></button> */}
        <br />
        <input type='number' onChange={this.lendleGetResults} />
        <button onClick={this.decrement}>prev page</button>
        <button onClick={this.increment}>next page</button>
        {error && <div>!!!error!!!</div>}
        {isFatching && <div>Loading, please wait...</div>}

        <ul>
          {users.map(u => (
            <li key={u.login.uuid}>{JSON.stringify(u)}</li>
          ))}
        </ul>
        {/*  */}
        <ul>
          {users.map(u => (
            <li key={u.login.uuid}>{this.myUserList(u)}</li>
          ))}
        </ul>
      </>
    );
  }
}
export default UsersLoader;
