import React from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - Cakelify `}</title>
    </Helmet>
  );
};

export default MetaData;
