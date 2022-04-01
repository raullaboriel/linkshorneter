import React from 'react'
import { Link } from 'react-router-dom';

const ShorteredLink = (props) => {
    const [showCopied, setShowCopied] = React.useState(false);

    const onCopyLink = () => {
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 1500)
    }

    const copyButton = () => {
        if (showCopied) {
            return (
                <button style={{ 'color': 'rgb(164,167,171)', 'backgroundColor': 'rgb(79,167,69, 0.6)' }} className="btn btn-sm font-weight-bold mr-2 col-4 col-lg-2 col-md-2">
                    ¡Copiado!
                </button>
            )
        }

        return (
            <button className="btn btn-sm font-weight-bold mr-2 col col-lg-2 col-md-2" style={{ 'color': 'rgb(164,167,171)', 'backgroundColor': 'rgb(58,59,61, 0.6)' }} onClick={() => { navigator.clipboard.writeText(`localhost:3000/${props.item.shorteredRoute}`); onCopyLink() }}>
                Copiar
            </button>
        )
    }

    return (
        <div style={{ 'backgroundColor': 'rgb(37,37,38, 0.8)' }} className="d-flex flex-row p-3 rounded-lg mb-2 justify-content-between">
            <div title={props.item.link} style={{ 'color': 'rgb(145,148,152)' }} className="align-self-center text-truncate flex-fill">
                {props.item.link}
            </div>
            <div className='col-8'>
                <div className='row justify-content-end'>
                    <div className='btn-link text-truncate text-right align-self-center col'>
                        <Link to={`/${props.item.shorteredRoute}`} target="_blank">{`localhost:3000/${props.item.shorteredRoute}`}</Link>
                    </div>
                    {copyButton()}
                    < button onClick={() => props.onDelete(props.item)} className="btn btn-sm btn-danger col-3 col-lg-1 col-md-2">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default ShorteredLink