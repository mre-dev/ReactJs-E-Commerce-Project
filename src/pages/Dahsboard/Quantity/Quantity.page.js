import { GetProducts } from 'api/Product.api';
import { Button, Input, Table } from 'components';
import { DashboardLayout, Footer, Header } from 'layouts';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert';
import Styles from "./Quantity.page.module.css";

export const UserQuantityPage = (props) => {

    const [saveButtonStatus, setSaveButtonStatus] = useState(true);
    const [tableData, setTableData] = useState([]);

    const tableColumns = [
        {
            Header: 'کد',
            accessor: 'id',
            Filter: true
        },
        {
            Header: 'نام کالا',
            accessor: 'title',
            Filter: true
        },
        {
            Header: 'قیمت',
            accessor: 'price',
            Cell: (value) => (
                <Input
                    type="number"
                    defaultValue={value.row.original.price}
                    id={`input_price_${value.row.original.id}`}
                    readOnly={true}
                    
                    onDoubleClick={(e) => {
                        e.target.readOnly = false;
                        e.target.focus();
                        e.target.style.borderColor = '#ff0000';
                    }}

                    onBlur={(e) => {
                        e.target.readOnly = true;
                        if (e.target.value == value.row.original.price) {
                            e.target.style.borderColor = '#ccc';
                        } else {
                            e.target.style.borderColor = '#ff0000';
                            setSaveButtonStatus(false);
                        }

                    }}
                    
                />
            ),
            Filter: true
        },
        {
            Header: 'موجودی',
            accessor: 'quantity',
            Cell: (value) => (
                <Input
                    type="number"
                    defaultValue={value.row.original.quantity}
                    id={`input_quantity_${value.row.original.id}`}
                    readOnly={true}
                    
                    onDoubleClick={(e) => {
                        e.target.readOnly = false;
                        e.target.focus();
                        e.target.style.borderColor = '#ff0000';
                    }}

                    onBlur={(e) => {
                        e.target.readOnly = true;
                        if (e.target.value == value.row.original.quantity) {
                            e.target.style.borderColor = '#ccc';
                        } else {
                            e.target.style.borderColor = '#ff0000';
                            setSaveButtonStatus(false);
                        }

                    }}
                    
                />
            ),
            Filter: true
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

                tempObject.id = res.data[i].id;
                tempObject.title = res.data[i]["product-name-fa"];
                tempObject.price = res.data[i].price.amount;
                tempObject.quantity = res.data[i].count;
                newData.push(tempObject);
            }
            setTableData(newData);
        });
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>موجودی محصولات | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="موجودی محصولات %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                <div className={Styles.contentHeader}>
                    <h1>مدیریت موجودی و قیمت ها</h1>
                    <Button text="ذخیره" size='small' type='primary' borderRadius disabled={saveButtonStatus} click={() => {
                        swal({
                            title: "موفق",
                            text: "تغییرات با موفقیت ذخیره شد",
                            icon: "success",
                            button: "بستن"
                        });
                    }}/>
                </div>
                <div className={Styles.content}>
                {
                    tableData && tableData.length > 0 ?
                            <Table pageSize={5} columns={tableColumns} data={tableData} className={Styles.productTable} sorting pagination filtering />
                            :
                            <div className={Styles.noProduct}>
                                <h1>محصولی برای نمایش وجود ندارد</h1>
                            </div>
                }
                </div>
            </DashboardLayout>

            <Footer/>
        </div>
    );
};
