import React from 'react';

const Filter = (props) => {
    const { handler } = props;
    if (props.handler) {
      return (
        <div>
          filter shown with
          {' '}
          <input
            onChange={handler}
          />
        </div>
      );
    }
  };

  export default Filter