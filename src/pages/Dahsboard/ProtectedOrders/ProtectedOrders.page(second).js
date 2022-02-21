import { Button, Input, Table } from 'components';
import { DashboardLayout, Header } from 'layouts';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Styles from "./ProtectedOrders.page.module.css";
import { GetOrders } from 'api/getOrder.api';
import { convertMiladiToShamsi } from 'utils/functions.util';
import { GetUserFullName } from 'api/getUserData.api';
import swal from 'sweetalert';

export const ProtectedOrdersPage = (props) => {

    const [orderStatus, setOrderStatus] = useState('pending');
    const [pendingOrders, setPendingOrders] = useState([]);
    const [shipedOrders, setShipedOrders] = useState([]);

    const tableColumns = [
        {
            Header: 'کد سفارش',
            accessor: 'id',
            Filter: true
        },
        {
            Header: "نام کاربر",
            accessor: "username",
            Filter: true
        },
        {
            Header: 'زمان ثبت سفارش',
            accessor: 'ordertime',
            Filter: true
        },
        {
            Header: 'وضعیت',
            accessor: 'status',
            Cell: (value) => {
                return (
                    <Button type='primary' size='small' text='بررسی وضعیت' click={(e) => {
                        e.preventDefault();
                        console.log(value.row.original.id + " : " + value.row.original.status);
                    }} />
                );
            },
            Filter: false
        }
    ];

    useEffect(() => {
        getAllData();
    }, []);

    function getAllData() {
        try {
            GetOrders().then(async res => {
                let newPendingData = [];
                let newShipedData = [];

                for (let i = 0; i < res.data.length; i++) {
                    let tempObject = {};

                    await GetUserFullName(res.data[i]["user-id"]).then(userFullName => {
                        tempObject.username = userFullName;
                    });

                    tempObject.id = res.data[i].id;
                    tempObject.ordertime = convertMiladiToShamsi(new Date(res.data[i].createdAt).getFullYear(), new Date(res.data[i].createdAt).getMonth() + 1, new Date(res.data[i].createdAt).getDate())[0];
                    tempObject.status = res.data[i].status;

                    if(res.data[i].status === 'pending') {
                        newPendingData.push(tempObject);
                    } else {
                        newShipedData.push(tempObject);
                    }
                }
                setPendingOrders(newPendingData);
                setShipedOrders(newShipedData);
            });
        } catch(error) {
            swal({
                title: "خطا",
                text: "خطایی در دریافت اطلاعات رخ داده است",
                icon: "error",
                button: "تایید"
            });
        }
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>سفارشات سایت | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="لیست سفارشات سایت %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                <div className={Styles.ordersPageHeader}>
                    <div className={Styles.ordersPageHeaderTitle}>
                        {
                            orderStatus == 'pending' ?
                            <h1>مدیریت سفارشات کاربری ({pendingOrders.length})</h1> :
                            <h1>مدیریت سفارشات کاربری ({shipedOrders.length})</h1>
                        }
                        
                    </div>
                    <div className={Styles.ordersPageHeaderButtonsChangeStatus}>
                        <div>
                            <Input type='radio' id='status_pending' value='شفارش های در انتظار ارسال' defaultChecked={true} name='status' click={(event) => {
                                setOrderStatus("pending");
                            }}/>
                            <label htmlFor='status_pending'>شفارش های در انتظار ارسال</label>
                        </div>
                        <div>
                            <Input type='radio' id='status_shipped' value='شفارش های تحویل شده' name='status' click={(event) => {
                                setOrderStatus("shipped");
                            }}/>
                            <label htmlFor='status_shipped'>شفارش های تحویل شده</label>
                        </div>
                    </div>
                </div>

                {
                    orderStatus == "pending" && pendingOrders.length > 0 ?
                        <Table columns={tableColumns} data={pendingOrders} className={Styles.ordersTable} sorting pagination filtering />
                    :
                    orderStatus == "shipped" && shipedOrders.length > 0 ?
                        <Table columns={tableColumns} data={shipedOrders} className={Styles.ordersTable} sorting pagination filtering />
                    :
                        <div className={Styles.ordersPageEmpty}> <h1>هیچ سفارشی برای نمایش وجود ندارد</h1> </div>
                }

            </DashboardLayout>
        </div>
    );
};
