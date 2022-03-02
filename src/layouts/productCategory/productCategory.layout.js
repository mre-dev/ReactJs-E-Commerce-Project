import { GetCategories } from 'api/getCategory.api';
import { FilterProductByCategories, GetProducts, ProductsPagination } from 'api/Product.api';
import { Button, Navigation, ProductCard } from 'components';
import { PATHS } from 'configs/routes.config';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './productCategory.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { sortByAsc, sortByDesc } from 'redux/type';

export const ProductCategory = (props) => {

    const Nav = useNavigate();

    const sortStatus = useSelector((state) => state.productSort);
    const customDispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        GetCategories().then(res => {
            res.data.push({
                createdAt: new Date().getTime(),
                icon: null,
                id: res.data.length + 1,
                'name-en': "all",
                'name-fa': "همه"
            });
            setCategories(res.data);
        });
    }, []);

    const [categoryId, setCategoryId] = useState();
    useEffect(() => {
        if(categories.length != 0) {
            //check if category name in the categories array
            const category = categories.find(c => c['name-en'] == props.category);
            if(category) {
                setCategoryId(category.id);
            } else {
                setCategoryId(null);
            }
        }
    }, [props.category, categories]);

    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if(categoryId) {

            if(props.category == 'all') {
                GetProducts().then(res => {
                    setAllProducts(res.data);
                });
            } else {
                FilterProductByCategories(categoryId).then(res => {
                    setAllProducts(res.data);
                });
            }

            if(props.category == 'all') {
                ProductsPagination("all", props.currentPage, props.perPage, sortStatus).then(res => {
                    setProducts(res.data);
                });
            } else {
                ProductsPagination(categoryId, props.currentPage, props.perPage, sortStatus).then(res => {
                    setProducts(res.data);
                });
            }

        }
    }, [categoryId, props.currentPage, sortStatus]);

    const [pagination, setPagination] = useState([1]);
    const [currentPage, setCurrentPage] = useState(props.currentPage || 1);

    useEffect(() => {
        if(products.length != 0) {
            const pagination = [];
            for(let i = 1; i <= Math.ceil(allProducts.length / props.perPage); i++) {
                pagination.push(i);
            }
            setPagination(pagination);
        }
    }, [products, allProducts]);

    useEffect(() => {
        if(currentPage != props.currentPage) {
            setCurrentPage(props.currentPage);
        }
    }, [props.currentPage]);

    const changeProductSort = (event) => {
        if(event.target.value == "desc") {
            customDispatch(sortByDesc());
        } else {
            customDispatch(sortByAsc());
        }
    };

    return (
        <div className={Styles.productCategory}>
            <div className={Styles.productCategory__sideBar}>
                <div className={Styles.productCategory__sideBar__title}>
                    <h2>دسته بندی محصولات</h2>
                </div>
                <hr />
                <div className={Styles.productCategory__sideBar__list}>
                    <ul>
                        {categories.map(category => {
                            return (
                                <li key={category.id} className={props.category === category['name-en'] ? Styles.productCategory__sideBar__list__item__selected : ''}>
                                    {category.icon ? <img src={process.env.REACT_APP_BASE_URL + "/files/" + category.icon} /> : null}
                                    <Navigation link={PATHS.PRODUCTS + "/" + category['name-en']} text={category['name-fa']} internal />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            
            <div className={Styles.productContent}>

                <div className={Styles.productContent__sort}>

                    <div>
                        <p> مرتب سازی بر اساس زمان انتشار : </p>
                    </div>

                    <div>
                        <div className={Styles.productContent__sort__form} onChange={changeProductSort}>
                            <input type="radio" value="desc" name="sortDate" /> نزولی
                            <input type="radio" value="asc" name="sortDate" /> صعودی
                        </div>
                    </div>

                </div>
                
                <div className={Styles.productCategory__products}>
                    {categoryId ? (
                        <Fragment>
                            {products.length > 0 ? 
                                <Fragment>
                                    {products.map((product, index) => {
                                        return (
                                            <ProductCard key={index} id={product.id}
                                                image={product.thumbnail}
                                                title={product['product-name-fa']}
                                                price={product.price.amount}
                                            />
                                        )
                                    })}
                                </Fragment>
                                : 
                                <div className={Styles.productCategory__products__empty}>
                                    <h2>محصولی وجود ندارد</h2>
                                </div>
                                
                            }
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className={Styles.productCategory__products__notFound}>
                                <h2>دسته بندی مورد نظر یافت نشد</h2>
                                <Button text="بازگشت به صفحه اصلی" size='small' type='danger' borderRadius click={() => {
                                    Nav(PATHS.PRODUCTS);
                                }}/>
                            </div>
                        </Fragment>
                    )}
                </div>

                {products.length > 0 && (categoryId || props.category == "all") ? (
                    <div className={Styles.productCategory__pagination}>
                        <ul>
                            {pagination.map(pageNumber => {
                                return (
                                    <li key={pageNumber} className={props.currentPage == pageNumber ? Styles.productCategory__pagination__item__selected : ''}>
                                        <Navigation link={PATHS.PRODUCTS + "/" + props.category + "/" + pageNumber} text={pageNumber} internal />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ) : null}
                
            </div>
             
        </div>
    );
}

ProductCategory.defaultProps = {
    category: 'all'
}

ProductCategory.propTypes = {
    category: PropTypes.string
}