import { ASC, DESC } from "redux/types";

export const sortByDesc = () => {
    return {
      type: DESC,
    };
};

export const sortByAsc = () => {
    return {
      type: ASC,
    };
};