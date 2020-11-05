import React from 'react';

const Numbers = (props) => {
    return(<div>
      {props.persons.filter((person) => person.name.toLowerCase()
        .includes(props.newFilter.toLowerCase())).map((person) => (
        <p key={person.name}>
          {person.name}
          {' '}
          {person.number}
          {' '}
          <button onClick={function func(e) { props.removeItem(e, person); }}>delete</button>
        </p>
      ))}
    </div>)
  };

  export default Numbers