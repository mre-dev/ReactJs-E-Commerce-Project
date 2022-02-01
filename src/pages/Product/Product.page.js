import React, { Fragment, useEffect } from 'react';
import { useParams, useNavigate, Link  } from 'react-router-dom';
import swal from 'sweetalert';

export const ProductPage = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const productId = params.productId;


    useEffect(() => {
        if(!productId) {
            swal('Error', 'Product not found', 'error');
        }
    }, [])

    return (
        <div>
            {productId ?
                // if productId is found, render product page
                <Fragment>
                    <h1>Product Page {productId}</h1>
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
