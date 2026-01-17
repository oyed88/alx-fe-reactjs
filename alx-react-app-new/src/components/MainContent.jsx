import React from 'react';

function MainContent() {
  return (
    <main
      style={{
        padding: '20px',
        backgroundColor: '#eef2f7',
        minHeight: '200px'
      }}
    >
      <h2>Welcome!</h2>
      <p>
        This app demonstrates inline CSS styling applied directly
        to React components.
      </p>
    </main>
  );
}

export default MainContent;
