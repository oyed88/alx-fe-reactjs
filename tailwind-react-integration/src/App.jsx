import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div>
      <UserProfile
        name="John Doe"
        role="Developer at Example Co."
        bio="Loves to write code and explore new technologies."
        image="https://via.placeholder.com/150"
      />
    </div>
  );
}

export default App;
