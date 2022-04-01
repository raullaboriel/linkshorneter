import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import RedirectPage from "./components/RedirectPage";
import "./style.css"; //style sheet 
import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from './components/NavBar';
import ls from 'local-storage'
import SignUp from './components/SignUp';
import axios from 'axios';


function App() {
  const [user, setUser] = useState(undefined);
  const [shorteredLinks, setShorteredLinks] = useState(ls.get('linkshortener') ? ls.get('linkshortener') : []);

  React.useEffect(() => {
    ls.set('linkshortener', shorteredLinks)
  }, [shorteredLinks]);

  React.useEffect(() => {
    const restoreSession = async () => {
      await axios.post('http://localhost:5000/user/restoresession', null, { withCredentials: true })
        .then(response => {
          setUser(response.data.user);
        });
    }
    restoreSession();
  }, []);

  React.useEffect(() => {
    const loadShorteredLinks = async () => {
      if (typeof user !== 'undefined' && user !== null) {
        await axios.post('http://localhost:5000/user/shorteredlinks', null, { withCredentials: true })
          .then(response => {
            let tempShorteredList = [];
            response.data.map(item => tempShorteredList.push({ shorteredRoute: item.shorteredroute, link: item.originallink, userId: item.user }))
            setShorteredLinks(tempShorteredList);
          })
      }
    }
    loadShorteredLinks();
  }, [user])

  if (typeof user === undefined) {
    return (
      <div className="loader-inner bg-transparent text-center text-secondary">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <br />
      </div>
    );
  }

  return (
    <Router>
      <Switch >
        <Route exact path="/">
          <NavBar user={user} />
          <Home shorteredLinks={shorteredLinks} setShorteredLinks={setShorteredLinks} user={user} />
        </Route>
        <Route path="/login" >
          <NavBar user={user} />
          {typeof user === 'undefined' || user === null ? <Login setUser={setUser} user={user} /> : <Redirect to='/' />}
        </Route>
        <Route path="/signup">
          <NavBar user={user} />
          <SignUp />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
