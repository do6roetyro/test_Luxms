import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MainContainer from './components/Main/Main';
import './App.css'

function App() {


  return (
    <Provider store={store}>
      <div className="App">
        <MainContainer />
      </div>
    </Provider>
  );
}

export default App;
