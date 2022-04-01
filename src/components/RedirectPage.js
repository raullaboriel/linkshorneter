import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../style.css"; //style sheet
import { Link } from 'react-router-dom';
import origin from '../origin';

const RedirectPage = () => {

    const { shorteredRoute } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log(shorteredRoute);
        const getOriginalLink = async () => {
            try {
                const response = await axios.get(origin() + `/shorteredlink/${shorteredRoute}`);
                const tempData = response.data;
                setData(tempData);
            } catch (err) {
                setData(undefined);
                console.log(err);
            }
        }
        getOriginalLink();
    }, [shorteredRoute])

    useEffect(() => {
        if (data !== null && data !== undefined) {
            window.location.href = data.originallink;
        }
    }, [data]);

    if (data || data === null) {
        return (
            <div className="loader-inner bg-transparent text-center text-secondary">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <br />
                <span>Redireccionado...</span>
            </div>
        );
    } else if(data === undefined) {
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404"></div>
                    <h1>404</h1>
                    <h2>Oops! URL is unavailable</h2>
                    <p>Sorry but the URL you are looking for does not exist, have been removed or is temporarily unavailable</p>
                    <Link to="/">Back to homepage</Link>
                </div>
            </div>
        );
    }
}

export default RedirectPage