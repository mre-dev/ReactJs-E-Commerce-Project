import { Header } from 'layouts';
import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link  } from 'react-router-dom';
import swal from 'sweetalert';

export const ProductPage = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const productId = params.productId;
    const productName = "محصول شماره " + productId;

    useEffect(() => {
        if(!productId) {
            swal('خطا', 'محصول مورد نظر یافت نشد', 'error');
        }
    }, [])

    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>{productName} | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content={`${productName} %REACT_APP_WEBSITE_NAME%`} />
            </Helmet>

            <Header/>

            {productId ?
                // if productId is found, render product page
                <Fragment>
                    <h1>Product {productId}</h1>
                </Fragment>
                :
                // if productId is not found, render 404 page
                <Fragment>
                    <h1>Product Not Found</h1>
                    <Link to={'/'}>Go to Home Page</Link>
                </Fragment>
            }
        </div>
    );
};
