import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from './src/Components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Titillium_Web/TitilliumWeb-Regular.ttf';
import './styles.css';
import {
    HomeScreen,
    AboutScreen,
    LogMyGenderScreen,
    HistoryScreen,
    ContactScreen
} from './src/Screens';

export const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/">
                    <HomeScreen />
                </Route>
                <Route path="/about">
                    <AboutScreen />
                </Route>
                <Route path="/log">
                    <LogMyGenderScreen />
                </Route>
                <Route path="/history">
                    <HistoryScreen />
                </Route>
                <Route path="/contact">
                    <ContactScreen />
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));