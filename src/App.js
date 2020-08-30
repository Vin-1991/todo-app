import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from '../src/redux/store';
import ToDoMain from '../src/components/todoMain';
import AppToDo from '../src/components/addToDo';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <ToDoMain />
                <AppToDo />
            </div>
        </Provider>
    );
}

export default App;
