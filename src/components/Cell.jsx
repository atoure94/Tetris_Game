import { TETROMINOS } from '../utils/tetrominos';
// import PropTypes from 'prop-types';

import styled from 'styled-components';

import React from 'react';

function Cell({ type }) {
  return (
    <StyledCell
      type={type}
      // eslint-disable-next-line dot-notation
      color={TETROMINOS[type].color}
    ></StyledCell>
  );
}

const StyledCell = styled.div`
  width: auto;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => (props.type === 0 ? '0px solid' : '4px solid')};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
`;

// Cell.propTypes = {
//   type: PropTypes.object.isRequired,
// };

export default React.memo(Cell);
