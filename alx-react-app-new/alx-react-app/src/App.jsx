import React from "react";
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to User Profiles</h1>
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      <UserProfile name="Bob" age={30} bio="Enjoys painting and traveling" />
      <UserProfile name="Charlie" age={28} bio="Tech enthusiast and gamer" />
    </div>
  );
};

export default App;
