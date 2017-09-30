import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    // lifecycle method
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBc1rwAV-Gl6QVK0MMunYnRu_phULooUT4',
            authDomain: 'react-native-auth-b31ed.firebaseapp.com',
            databaseURL: 'https://react-native-auth-b31ed.firebaseio.com',
            projectId: 'react-native-auth-b31ed',
            storageBucket: 'react-native-auth-b31ed.appspot.com',
            messagingSenderId: '845563395378'
          });

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
          });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;