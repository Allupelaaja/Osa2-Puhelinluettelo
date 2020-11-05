import React from 'react';

const Form = (props) => {
    if (props.additem) {
      const {
        newName, nameChange, newNumber, numberChange,
      } = props;
      const addItem = props.additem;
      return (
        <form onSubmit={addItem}>
          <div>
            name:
            {' '}
            <input
              value={newName}
              onChange={nameChange}
            />
          </div>
          <div>
            number:
            {' '}
            <input
              value={newNumber}
              onChange={numberChange}
            />
          </div>
          <div>
            <button type="submit">
              add
            </button>
          </div>
        </form>
      );
    }
  };

  export default Form