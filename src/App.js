import ShorteredLink from "./components/ShorteredLink";
import React, { useState } from 'react';
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RedirectPage from "./components/RedirectPage";
import axios from "axios";
import ls from 'local-storage'
import "./style.css"; //style sheet

function App() {
  const [shorteredLinks, setShorteredLinks] = useState(ls.get('linkshortener') ? ls.get('linkshortener') : []);
  const [link, setLink] = useState('');
  const [alerts, setAlerts] = useState({ linkAdded: false, invalidLink: false, noLink: false, linkCopied: false })

  React.useEffect(() => {
    ls.set('linkshortener', shorteredLinks)
  }, [shorteredLinks])

  const handleInputChange = (e) => {
    setLink(e.target.value);
  }

  const onDelete = (shorteredRoute) => {
    const tempList = [...shorteredLinks].filter(item => item.shorteredRoute !== shorteredRoute);
    setShorteredLinks(tempList);
  }

  const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  const handleAlertShow = (alert) => {
    setAlerts({
      ...alerts,
      [alert]: true
    });

    setTimeout(() => {
      setAlerts({
        linkAdded: false, invalidLink: false, noLink: false, linkCopied: false
      });
    }, 7000);
  }

  const onShortLink = async (e) => {
    e.preventDefault();

    if (link.trim().length === 0) {
      handleAlertShow('noLink');
      return;
    }

    if (validURL(link)) {
      try {
        await axios.post(`http://localhost:5000/`, { id: 0, originalLink: link, user: null })
          .then(response => {
            const tempList = [...shorteredLinks];
            tempList.unshift({ link: link, shorteredRoute: response.data.shorteredRoute });
            setShorteredLinks(tempList);
            handleAlertShow('linkAdded')
          })
      } catch (err) {
        console.log(err);
      }
    } else {
      handleAlertShow('invalidLink');
    }
  }

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <div className="App">
            <NavBar />
            <div className="container mt-4 py-4">
              <div className="mr-4 ml-4">
                <div className="d-flex flex-row mb-4">
                  <form className="col-12" onSubmit={(e) => onShortLink(e)}>
                    <div className="row justify-content-center flex-nowrap">
                      <input style={{ 'backgroundColor': 'rgb(58,59,61)' }} autoComplete="off" type="text" name='link' onChange={(e) => handleInputChange(e)} value={link} className="form-control text-white flex-fill mr-2 p-4 border-0" placeholder="Ingresa tu enlace" />
                      <button style={{ 'backgroundColor': 'rgb(79,70,229)' }} className="btn border-0 col-3 font-weight-bold btn-primary">Recortar</button>
                    </div>
                  </form>
                </div>
                {
                  alerts.linkAdded === true &&
                  <div className="alert alert-success" role="alert">
                    ¡Tu link ha sido recortado!
                  </div>
                }
                {
                  alerts.linkCopied === true &&
                  <div className="alert alert-success" role="alert">
                    Enlace copiado en el portapapeles.
                  </div>
                }
                {
                  alerts.invalidLink === true &&
                  <div className="alert alert-danger" role="alert">
                    No es posible recortar este link, no es un URL valido.
                  </div>
                }
                {
                  alerts.noLink === true &&
                  <div className="alert alert-danger" role="alert">
                    Por favor ingresa un URL valido.
                  </div>
                }
                <div className="col-12 pl-0 pr-0 justify-content-center flex-fill mt-4 ">
                  {shorteredLinks.map((item, index) => <ShorteredLink item={item} onDelete={onDelete} handleAlertShow={handleAlertShow} key={index} />)}
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route path='/:shorteredRoute'>
          <RedirectPage shorteredLinks={shorteredLinks} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
