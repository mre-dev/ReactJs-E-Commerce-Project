import { Header } from 'layouts';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate  } from 'react-router-dom';
import swal from 'sweetalert';

export const ProductsPage = (props) => {
    const params = useParams();
    //const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState(params.categoryName || 'all');
    const [pageNumber, setPageNumber] = useState(params.pageNumber || 1);

    useEffect(() => {
        window.history.replaceState(null, `دسته بندی محصولات ${categoryName}`, `/products/${categoryName}/${pageNumber}`);
        //navigate(`/products/${categoryName}/${pageNumber}`);
    }, [])

    useEffect(() => {
        setCategoryName(params.categoryName || 'all');
        setPageNumber(params.pageNumber || 1);
    }, [params.categoryName])

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{categoryName} | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content={`${categoryName} %REACT_APP_WEBSITE_NAME%`} />
            </Helmet>

            <Header/>

            Products Page <br/>
            { categoryName } <br/>
            { pageNumber }
        </div>
    );
};
