import {RecoilRoot} from 'recoil';
import {BrowserRouter} from 'react-router-dom'
import Router from './routes'
import './App.css';

function App() {
  window.onbeforeunload = ()=>{
    window.confirm("Reloading the page will lose your data, are you sure that you want to continue?");
  }
  return (
    <RecoilRoot>
      <div className="App">
       <BrowserRouter> 
        <Router/>
       </BrowserRouter> 
      </div>
    </RecoilRoot>
  );
}

export default App;
