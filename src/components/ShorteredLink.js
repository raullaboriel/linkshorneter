import React from "react";
import { Link } from "react-router-dom";

const ShorteredLink = (props) => {
  const [showCopied, setShowCopied] = React.useState(false);

  const origin = () => {
    if (process.env.NODE_ENV === "production") {
      return "https://lilink.herokuapp.com";
    }
    return "localhost:3000";
  };

  const onCopyLink = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  const copyButton = () => {
    if (showCopied) {
      return (
        <button
          className="btn border-success font-weight-bold mr-2 col"
          style={{ color: "rgb(164,167,171)" }}
        >
          ¡Copiado!
        </button>
      );
    }

    return (
      <button
        className="btn font-weight-bold mr-2 col"
        style={{
          color: "rgb(164,167,171)",
          backgroundColor: "rgb(58,59,61, 0.6)",
        }}
        onClick={() => {
          navigator.clipboard.writeText(
            origin() + `/${props.item.shorteredRoute}`
          );
          onCopyLink();
        }}
      >
        Copiar
      </button>
    );
  };

  return (
    <div
      style={{ backgroundColor: "rgb(33, 33, 33, 0.4)" }}
      className="d-flex flex-lg-row  flex-xl-row flex-column p-3 rounded-lg mb-2 justify-content-between"
    >
      <div className="col-lg-5 col-12 d-flex align-items-center">
        <div
          title={props.item.link}
          style={{ color: "rgb(145,148,152)" }}
          className=" text-truncate text-nowrap"
        >
          {props.item.link}
        </div>
      </div>

      <div className="col-lg-4 col-12 mb-lg-0 mb-1 d-flex align-items-center justify-content-lg-end">
        <div className="btn-link text-truncate">
          <Link to={`/${props.item.shorteredRoute}`} target="_blank">
            {origin() + `/${props.item.shorteredRoute}`}
          </Link>
        </div>
      </div>

      <div className="col">
        <div className="d-flex flex-row">
          {copyButton()}
          <button
            onClick={() => props.deleteShorteredLink(props.item)}
            className="btn btn btn-danger col-lg-3 col-md-3 col-2"
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShorteredLink;
