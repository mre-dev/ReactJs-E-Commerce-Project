import { Fragment } from "react";

export const PublicRoute = (props) => {
    const {component} = props;
    return(<Fragment>{component}</Fragment>);
};