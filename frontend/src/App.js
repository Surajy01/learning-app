import './App.css';
import { MainRoutes } from './Routes/MainRoutes';

function App() {
  console.log(process.env.REACT_APP_SERVER);
  return (
    <div className="App">
      <MainRoutes/>
    </div>
  );
  
}

export default App;
