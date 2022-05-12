import React, { Component } from 'react';
import loadUsers from '../../api';
import UsersListItem from './UsersListItem/UsersListItem';
import styles from './UsersLoader.module.scss';

class UsersLoader extends Component {
  constructor (props) {
    super(props);

    this.state = {
      users: [],
      isFatching: false,
      error: null,
      currentPage: 1,
      hendleResult: 1,
    };
  }

  load = () => {
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
    this.load();
  }
  componentDidUpdate (prevProps, prevState) {
    const { currentPage, hendleResult } = this.state;
    if (prevState.hendleResult !== hendleResult) {
      this.load();
    }
    if (prevState.currentPage !== currentPage) {
      this.load();
    }
  }
  increment = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  };
  decrement = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };
  lendleGetResults = e => {
    this.setState({ hendleResult: Number(e.target.value) });
  };
  mapUsersList = u => <UsersListItem key={u.login.uuid} users={u} />;
  render () {
    const { users, error, isFatching } = this.state;

    return (
      <>
        <div className={styles.containerList}>
          <div className={styles.containerBtn}>
            <button className={styles.btn} onClick={this.decrement}>
              Prev page
            </button>
            <button className={styles.btn} onClick={this.increment}>
              Next page
            </button>
          </div>
          <input
            className={styles.input}
            type='text'
            onChange={this.lendleGetResults}
            placeholder='Enter number pls'
            autoFocus
          />
          {error && <div>!!!error!!!</div>}
          {isFatching && <div>Loading, please wait...</div>}
          {!isFatching && !error && <ul>{users.map(this.mapUsersList)}</ul>}
        </div>
      </>
    );
  }
}
export default UsersLoader;
