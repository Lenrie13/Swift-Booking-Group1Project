import './App.css';
import Header from './Components/Header';
import LandingPageBody from './Components/LandingPageBody';
import Promotions from './Components/Promotions';

function App() {
  return (
    <div className="App">
      <Header />
      <Promotions />
      <LandingPageBody />
    </div>
  );
}

export default App;
