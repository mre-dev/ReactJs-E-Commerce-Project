import { Footer, Header, ProductCategory } from 'layouts';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate  } from 'react-router-dom';
import swal from 'sweetalert';

export const ProductsPage = (props) => {
    const params = useParams();

    const [categoryName, setCategoryName] = useState(params.categoryName || 'all');
    const [pageNumber, setPageNumber] = useState((params.pageNumber != 0 && params.pageNumber != null) ? params.pageNumber : 1);

    useEffect(() => {
        window.history.replaceState(null, `دسته بندی محصولات ${categoryName}`, `/products/${categoryName}/${pageNumber}`);
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        setCategoryName(params.categoryName || 'all');
        setPageNumber((params.pageNumber != 0 && params.pageNumber != null) ? params.pageNumber : 1);
    }, [params.categoryName, params.pageNumber])

    const [currentCategory, setCurrentCategory] = useState(categoryName);
    useEffect(() => {
        setCurrentCategory(categoryName);
    });

    return (
        <div className="contentWithHeaderAndFooter">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{currentCategory} | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content={`${currentCategory} %REACT_APP_WEBSITE_NAME%`} />
            </Helmet>

            <Header/>

            <ProductCategory category={currentCategory} perPage={12} currentPage={pageNumber}/>

            <Footer/>
        </div>
    );
};