import { Button, Table } from 'components';
import { Header } from 'layouts';
import React from 'react';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert';
import Styles from "./Product.page.module.css";

export const UserProductPage = (props) => {

    const tableColumns = [
        {
            Header: 'ردیف',
            accessor: 'id',
            Filter: true
        },
        {
            Header: "تصویر",
            accessor: "Image",
            Cell: ({ cell: { value }}) => (
            <div className={Styles.productImage}>
                <img src={value} alt="Product Image" className={Styles.roundedCircleItem} />
            </div>
            )
        },
        {
            Header: 'نام کالا',
            accessor: 'Title',
            Filter: true
        },
        {
            Header: 'دسته بندی',
            accessor: 'Category',
            Filter: true
        },
        {
            Header: 'عملیات',
            accessor: 'ActionButtons',
            Cell: (value) => (
                <div className={Styles.productActions}>
                    <Button className={Styles.btnEdit} text='ویرایش' type='info' size='small' borderRadius click={(e) => {
                        e.preventDefault();
                        alert("Edit : " + value.row.original.id);
                    }}/>
                    <Button className={Styles.btnDelete} text='حذف' type='danger' size='small' borderRadius click={(e) => {
                        e.preventDefault();

                        swal({
                            title: `آیا از حذف محصول ${value.row.original.Title} با آی دی ${value.row.original.id} اطمینان دارید؟`,
                            text: "توجه داشته باشید که حذف این محصول به طور کامل از سیستم حذف خواهد شد.",
                            icon: "warning",
                            buttons: {
                                cancel: "خیر",
                                catch: "بله"
                            },
                            dangerMode: true,
                            className: Styles.sweetAlertDeleteProduct
                        }).then((willDelete) => {
                            if (willDelete) {
                              swal("محصول مورد نظر با موفقیت حذف شد", {
                                icon: "success",
                              });
                            } else {
                              swal("محصول مورد نظر حذف نشد");
                            }
                        });

                    }} />
                </div>
            )
        }
    ];

    const tableData = [
        {
            id: 1,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 2,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 3,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 4,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 5,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 6,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 7,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 7,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 9,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 10,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        },
        {
            id: 11,
            Image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            Title: "کفش برقی",
            Category: "کفش",
            ActionButtons: "مشاهده و تغییر"
        }
    ];

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>لیست کالا ها | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="لیست کا های %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <div className={Styles.productPageHeader}>
                <div className={Styles.productPageHeaderTitle}>
                    <h1>لیست کالا ها</h1>
                </div>
                <div className={Styles.productPageHeaderAdd}>
                    <Button text='افزودن محصول' type='success' size='small' borderRadius click={(event) => {
                        event.preventDefault();
                        alert('افزودن محصول');
                    }}/>
                </div>
            </div>


            <Table columns={tableColumns} data={tableData} className={Styles.productTable} sorting pagination filtering />
        </div>
    );
};
