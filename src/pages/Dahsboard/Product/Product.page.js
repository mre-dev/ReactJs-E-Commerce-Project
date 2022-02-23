import { Button, Table } from 'components';
import { DashboardLayout, Header } from 'layouts';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert';
import Styles from "./Product.page.module.css";
import { DeleteProducts, GetProducts } from 'api/Product.api';
import { GetCategory } from 'api/getCategory.api';

export const UserProductPage = (props) => {

    const [tableData, setTableData] = useState([]);

    const tableColumns = [
        {
            Header: 'کد',
            accessor: 'id',
            Filter: true
        },
        {
            Header: "تصویر",
            accessor: "image",
            Cell: ({ cell: { value }}) => (
            <div className={Styles.productImage}>
                <img src={value} alt="Product Image" className={Styles.roundedCircleItem} />
            </div>
            )
        },
        {
            Header: 'نام کالا',
            accessor: 'title',
            Filter: true
        },
        {
            Header: 'قیمت',
            accessor: 'price',
            Filter: true
        },
        {
            Header: 'دسته بندی',
            accessor: 'category',
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
                            title: `آیا از حذف محصول ${value.row.original.title} با آی دی ${value.row.original.id} اطمینان دارید؟`,
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
                                
                                const productId = value.row.original.id;
                                DeleteProducts(productId).then( async res => {
                                    if (res.status === 200) {
                                        swal({
                                            title: "محصول با موفقیت حذف شد",
                                            text: `محصول شماره ${productId} با موفقیت حذف شد`,
                                            icon: "success", 
                                        });
                                        const newTableData = tableData.filter(item => item.id !== productId);
                                        setTableData(newTableData);
                                    } else {
                                        swal({
                                            title: "محصول حذف نشد",
                                            text: `محصول شماره ${productId} حذف نشد`,
                                            icon: "error", 
                                        });
                                    }
                                });
                                
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

    useEffect(() => {
        getAllData();
    }, []);

    function getAllData() {
        GetProducts().then(async res => {
            let newData = [];
            for (let i = 0; i < res.data.length; i++) {
                let tempObject = {};

                await GetCategory(res.data[i]["category-id"]).then(catRes => {
                    tempObject.category = catRes.data["name-fa"];
                });

                tempObject.id = res.data[i].id;
                tempObject.title = res.data[i]["product-name-fa"];
                tempObject.price = res.data[i].price.amount;
                tempObject.image = process.env.REACT_APP_BASE_URL + "/files/" + res.data[i].thumbnail;
                newData.push(tempObject);
            }
            setTableData(newData);
        });
    }

    function updateTableData(newData) {
        setTableData(newData);
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>لیست کالا ها | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="لیست کا های %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                <div className={Styles.productPageHeader}>
                    <div className={Styles.productPageHeaderTitle}>
                        <h1>لیست کالا ها ({tableData.length})</h1>
                    </div>
                    <div className={Styles.productPageHeaderAdd}>
                        <Button text='افزودن محصول' type='success' size='small' borderRadius click={(event) => {
                            event.preventDefault();
                            alert('افزودن محصول');
                        }}/>
                    </div>
                </div>

                {
                    tableData && tableData.length > 0 ?
                            <Table columns={tableColumns} data={tableData} className={Styles.productTable} sorting pagination filtering />
                            :
                            <div className={Styles.noProduct}>
                                <h1>محصولی برای نمایش وجود ندارد</h1>
                            </div>
                }
            </DashboardLayout>
        </div>
    );
};
