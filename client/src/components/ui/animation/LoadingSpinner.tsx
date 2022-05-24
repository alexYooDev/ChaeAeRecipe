import React from 'react';
import ReactDOM from 'react-dom';
import LottieLoader from 'react-lottie-loader';
import styled from 'styled-components';

import Lottie from '../../../assets/lotties/walking-broccoli.json';

const LoadingSpinner: React.FC = ({ children }) => {
  const portal = document.getElementById('loading-spinner');

  return (
    <>
      {ReactDOM.createPortal(
        <LoadingSpinnerWapper>
          {children}
          <LottieLoader animationData={Lottie} />
        </LoadingSpinnerWapper>,
        portal as Element
      )}
    </>
  );
};

export default LoadingSpinner;

const LoadingSpinnerWapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  padding: 2rem;
`;
