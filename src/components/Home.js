import React, { useState } from 'react'
import axios from "axios";
import ShorteredLink from "./ShorteredLink";
import Alert from './Alert';
import origin from '../origin.js';

const Home = (props) => {
    const [link, setLink] = useState('');
    const [showShortenURL, setShowShortenURL] = useState(true);
    const [isLinkCopied, setIsLinkCopied] = useState(false);
    const [notify, setNotify] = useState({ type: '', message: '', show: false });

    const handleNotify = (type, message) => {
        setNotify({
            type,
            message,
            show: true
        });

        setTimeout(() => {
            setNotify({
                ...notify,
                show: false
            });
        }, 7000);
    }

    const handleInputChange = (e) => {
        setLink(e.target.value);
        if (!showShortenURL) setShowShortenURL(true);
    }

    const onDelete = async (shorteredLink) => {
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
        const tempList = [...props.shorteredLinks].filter(item => item.shorteredRoute !== shorteredLink.shorteredRoute);
        props.setShorteredLinks(tempList);
        return;
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

    React.useEffect(() => {
        if (isLinkCopied) {
            setTimeout(() => {
                setIsLinkCopied(false);
            }, 2000);
        }
    }, [isLinkCopied])

    const onShortLink = async (e) => {
        e.preventDefault();

        if (link.trim().length === 0) {
            handleNotify('danger', 'Por favor ingresa un URL valido.');
            return;
        }

        if (validURL(link)) {
            let originalLink = link;

            if (originalLink.substring(0, 7) !== 'http://' && originalLink.substring(0, 8) !== 'https://') {
                originalLink = 'http://' + originalLink;
            }

            try {
                await axios.post(origin() + '/shorteredlink', { originalLink }, { withCredentials: true })
                    .then(response => {
                        const tempList = [...props.shorteredLinks];
                        const shorteredLink = response.data.shorteredLink;
                        tempList.unshift({ link: originalLink, shorteredRoute: shorteredLink.shorteredRoute, userId: shorteredLink.userId });
                        props.setShorteredLinks(tempList);
                        handleNotify('success', '¡Tu link ha sido recortado!');
                        setShowShortenURL(false);
                        setLink(
                            process.env.NODE_ENV === 'production' ?
                                'lilink.herokuapp.com' + `/${shorteredLink.shorteredRoute}`
                                :
                                'localhost:3000' + `/${shorteredLink.shorteredRoute}`
                        )
                    })
            } catch (err) {
                console.log(err);
            }
        } else {
            handleNotify('danger', 'No es posible recortar este link, no es un URL valido.');
        }
    }
    return (
        <div className="App">
            <div className="container mt-4 py-4">
                <div className="">
                    <div className="d-flex flex-row mb-4">
                        <form className="col-12" onSubmit={(e) => onShortLink(e)}>
                            <div className="row justify-content-center flex-nowrap">
                                <input style={{ 'backgroundColor': 'rgb(58,59,61)', 'fontWeight': 'bold' }} autoComplete="off" type="text" name='link' autocorrect="off" autocapitalize="none" onChange={(e) => handleInputChange(e)} value={link} className="form-control text-white flex-fill mr-2 p-4 border-0" placeholder="Ingresa tu enlace" />
                                {
                                    showShortenURL ?
                                        <button type="submit" style={{ 'backgroundColor': 'rgb(79,70,229)', 'fontSize': '18px' }} className="btn border-0 col-3 font-weight-bold btn-primary">
                                            Recortar
                                        </button>
                                        :
                                        <button type='button' onClick={() => { navigator.clipboard.writeText(link); setIsLinkCopied(true) }} style={{ 'backgroundColor': 'rgb(79,70,229)', 'fontSize': '18px' }} className="btn border-0 col-3 font-weight-bold btn-primary">
                                            {isLinkCopied ? '¡Copiado!' : '¡Copiar!'}
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                    <div className="notify-container">
                        <Alert type={notify.type} message={notify.message} show={notify.show} />
                    </div>
                    <div className="col-12 pl-0 pr-0 justify-content-center flex-fill mt-4 ">
                        {props.shorteredLinks.map((item, index) => <ShorteredLink item={item} onDelete={onDelete} key={index} />)}
                    </div>
                    {props.shorteredLinks.length === 0 &&
                        <div style={{ 'height': '400px', 'width': 'auto' }} >
                            <div className="d-flex flex-row align-items-center h-50">
                                <div className="col-6 mx-auto">
                                    <div className="jumbotron m-0 bg-transparent text-center text-white text-muted">
                                        No hay enlaces
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home