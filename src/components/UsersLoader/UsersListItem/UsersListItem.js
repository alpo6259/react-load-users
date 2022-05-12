import React from 'react';
import styles from './UsersListItem.module.scss';

function UsersListItem (props) {
  const {
    users: {
      gender,
      name: { title, first: firstName, last: lastName },
      picture: { large: src },
    },
  } = props;

  return (
    <li className={styles.containerItem}>
      <img
        className={gender === 'female' ? styles.imgMale : styles.imgFemale}
        src={src}
        alt={firstName}
      />
      <div className={styles.containerInfoItem}>
        <div>
          <span>{title}</span>
        </div>
        <div>
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
      </div>
    </li>
  );
}

export default UsersListItem;
