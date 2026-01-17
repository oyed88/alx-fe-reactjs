import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <UserProfile
        name="Oyekola Daniel"
        age={25}
        bio="A passionate React developer learning React inline styling."
      />

      <MainContent />

      <Footer />
    </>
  );
}

export default App;
