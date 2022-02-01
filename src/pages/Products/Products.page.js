import React, { useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import swal from 'sweetalert';

export const ProductsPage = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    const categoryName = params.categoryName || 'all';
    const pageNumber = params.pageNumber || 1;

    useEffect(() => {
        navigate(`/products/${categoryName}/${pageNumber}`);
    }, [])

    return (
        <div>
            Products Page <br/>
            { categoryName } <br/>
            { pageNumber }
        </div>
    );
};
