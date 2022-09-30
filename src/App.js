import React, { useState } from "react";
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
import NavBar from "./components/NavBar";
import ls from "local-storage";
import SignUp from "./components/SignUp";
import axios from "axios";
import origin from "./origin";

function App() {
  const [user, setUser] = useState(undefined);
  const [shorteredLinks, setShorteredLinks] = useState(
    ls.get("linkshortener") ? ls.get("linkshortener") : []
  );

  React.useEffect(() => {
    ls.set("linkshortener", shorteredLinks);
  }, [shorteredLinks]);

  React.useEffect(() => {
    const restoreSession = async () => {
      await axios
        .post(origin() + "/user/restoresession", null, {
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data.user);
        });
    };
    restoreSession();
  }, []);

  const deleteShorteredLink = async (shorteredLink) => {
    const tempList = [...shorteredLinks].filter(
      (item) => item.shorteredRoute !== shorteredLink.shorteredRoute
    );
    setShorteredLinks(tempList);
    return;

    //When cookies working
    /*         if (typeof props.user === 'undefined' || props.user === null) {
        const tempList = [...props.shorteredLinks].filter(item => item.shorteredRoute !== shorteredLink.shorteredRoute);
        props.setShorteredLinks(tempList);
        return;
    }

    try {
        await axios.delete(origin() + '/shorteredlink', { data: { shorteredRoute: shorteredLink.shorteredRoute }, withCredentials: true })
            .then(() => {
                const tempList = [...props.shorteredLinks].filter(item => item.shorteredRoute !== shorteredLink.shorteredRoute);
                props.setShorteredLinks(tempList);
            });
    } catch (e) {
        console.log(e);
    } */
  };

  React.useEffect(() => {
    const loadShorteredLinks = async () => {
      if (typeof user !== "undefined" && user !== null) {
        await axios
          .post(origin() + "/user/shorteredlinks", null, {
            withCredentials: true,
          })
          .then((response) => {
            let tempShorteredList = [];
            response.data.map((item) =>
              tempShorteredList.push({
                shorteredRoute: item.shorteredroute,
                link: item.originallink,
                userId: item.user,
              })
            );
            setShorteredLinks(tempShorteredList);
          });
      }
    };
    loadShorteredLinks();
  }, [user]);

  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/linkshortener/"]}>
          <NavBar user={user} />
          <Home
            shorteredLinks={shorteredLinks}
            setShorteredLinks={setShorteredLinks}
            user={user}
            deleteShorteredLink={deleteShorteredLink}
          />
        </Route>
        <Route path={["/login", "/linkshortener/login"]}>
          <NavBar user={user} />
          {typeof user === "undefined" || user === null ? (
            <Login setUser={setUser} user={user} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path={["/signup", "/linkshortener/signup"]}>
          <NavBar user={user} />
          <SignUp />
        </Route>
        <Route path="/:shorteredRoute">
          <RedirectPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
