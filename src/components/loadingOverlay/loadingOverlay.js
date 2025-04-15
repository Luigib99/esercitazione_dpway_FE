import React from 'react';
import { ClipLoader } from 'react-spinners';
import './loadingOverlay.css';

function LoadingOverlay({ loading }) {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );
}

export default LoadingOverlay;
