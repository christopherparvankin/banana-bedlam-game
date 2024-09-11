import "./App.css"
import Navigator from "./Navigator";
import Game from "./BananaBedlam/components/Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="apl">
      <Router>
        <div className='nav_wrapper'>
          <Navigator />   
        </div>
        <div className='router_wrapped'>
          <Routes>
            <Route path="/" exact element={<Game />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
