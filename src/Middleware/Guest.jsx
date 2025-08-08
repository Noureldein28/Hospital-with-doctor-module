
import { Navigate } from "react-router";
import { getAuth } from "../helper"
import React from "react";



const Guest = ({children , to}) => {
    const auth=getAuth();
    if(auth === undefined) return <Navigate to={to} />;
    return children
}
export default Guest