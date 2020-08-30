import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from '../src/redux/store';
import ToDoMain from '../src/components/todoMain';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <ToDoMain />
            </div>
        </Provider>
    );
}

export default App;
