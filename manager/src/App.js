import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyBc1rwAV-Gl6QVK0MMunYnRu_phULooUT4",
            authDomain: "react-native-auth-b31ed.firebaseapp.com",
            databaseURL: "https://react-native-auth-b31ed.firebaseio.com",
            projectId: "react-native-auth-b31ed",
            storageBucket: "react-native-auth-b31ed.appspot.com",
            messagingSenderId: "845563395378"
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;