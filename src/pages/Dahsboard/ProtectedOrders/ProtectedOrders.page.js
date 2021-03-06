import { Button, Input, Navigation, Table } from 'components';
import { DashboardLayout, Footer, Header } from 'layouts';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Styles from "./ProtectedOrders.page.module.css";
import { GetOrder, GetOrders } from 'api/getOrder.api';
import { convertMiladiToShamsi, ShowPrice } from 'utils/functions.util';
import { GetUserData, GetUserFullName } from 'api/getUserData.api';
import swal from 'sweetalert';
import Modal from 'react-modal';
import { GetMapByLatLng } from 'api/getMap';
import { GetProduct } from 'api/Product.api';
import { updateOrder } from 'api/updateOrder';

export const ProtectedOrdersPage = (props) => {

    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [modalData_order, setmodalData_order] = useState({});
    const [modalData_user, setmodalData_user] = useState({});
    const [modalData_product, setmodalData_product] = useState([]);
    const [modalDataFiltered_product, setmodalDataFiltered_product] = useState([]);

    useEffect(() => {
        console.log(modalData_order)
        if(modalData_order.id) {
            for(let i = 0; i < modalData_order.products.length; i++) {
                GetProduct(modalData_order.products[i].productId).then(res => {
                    setmodalData_product(prev => [...prev, res.data]);
                })
            }
        }
    }, [modalData_order]);


    useEffect(() => {
        if(modalData_order && modalData_product) {
                let tempModalTableData = [];
                for(let i = 0; i < modalData_product.length; i++) {
                    tempModalTableData.push({
                        name: modalData_product[i]['product-name-fa'],
                        price: modalData_product[i].price.amount,
                        count: modalData_order.products[i].quantity,
                    })
                }
                setmodalDataFiltered_product(tempModalTableData);
            }
        
    }, [modalData_product]);

    const tableColumns = [
        {
            Header: '???? ??????????',
            accessor: 'id',
            Filter: true
        },
        {
            Header: "?????? ??????????",
            accessor: "username",
            Filter: true
        },
        {
            Header: '???????? ?????? ??????????',
            accessor: 'ordertime',
            Filter: true
        },
        {
            Header: '??????????',
            accessor: 'status',
            Cell: (value) => {
                return (
                    <Button type='primary' size='small' text='?????????? ??????????' click={(e) => {
                        e.preventDefault();
                        GetOrder(value.row.original.id).then(res => {
                            setmodalData_order(res.data);
                            GetUserData(res.data['user-id']).then(userRes => {
                                setmodalData_user(userRes.data);
                                setShowModal(true);
                            });

                            //GetMapByLatLng(res.data.map.lat, res.data.map.lng).then(mapRes => {
                            //    console.log(mapRes);
                            //});
                        })
                    }} />
                );
            },
            Filter: false
        }
    ];

    const userOrderProductColumns = [
        {
            Header: '?????? ??????????',
            accessor: 'name',
            Filter: true
        },
        {
            Header: '??????????',
            accessor: 'count',
            Filter: true
        },
        {
            Header: '????????',
            accessor: 'price',
            Filter: true
        }
    ];

    //ok
    useEffect(() => {
        getAllData();
    }, []);

    //ok
    function getAllData() {
        try {
            GetOrders().then(async res => {
                let newData = [];
                for (let i = 0; i < res.data.length; i++) {
                    let tempObject = {};

                    await GetUserFullName(res.data[i]["user-id"]).then(userFullName => {
                        tempObject.username = userFullName;
                    });

                    tempObject.id = res.data[i].id;
                    tempObject.ordertime = convertMiladiToShamsi(new Date(res.data[i].createdAt).getFullYear(), new Date(res.data[i].createdAt).getMonth() + 1, new Date(res.data[i].createdAt).getDate())[0];
                    tempObject.status = res.data[i].status;

                    newData.push(tempObject);
                }
                setAllData(newData);
            });
        } catch(error) {
            swal({
                title: "??????",
                text: "?????????? ???? ???????????? ?????????????? ???? ???????? ??????",
                icon: "error",
                button: "??????????"
            });
        }
    }

    //ok
    async function filterData(status) {
        let newData = [];
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].status == status) {
                newData.push(allData[i]);
            }
        }
        setTableData(newData);
    }

    //ok
    useEffect(() => {
        filterData("pending");
    }, [allData]);

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>?????????????? ???????? | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="???????? ?????????????? ???????? %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                <div className={Styles.ordersPageHeader}>
                    <div className={Styles.ordersPageHeaderTitle}>
                        <h1>???????????? ?????????????? ???????????? ({tableData.length})</h1>
                    </div>
                    <div className={Styles.ordersPageHeaderButtonsChangeStatus}>
                        <div>
                            <Input type='radio' id='status_pending' value='?????????? ?????? ???? ???????????? ??????????' defaultChecked={true} name='status' click={(event) => {
                                filterData("pending");
                            }}/>
                            <label htmlFor='status_pending'>?????????? ?????? ???? ???????????? ??????????</label>
                        </div>
                        <div>
                            <Input type='radio' id='status_shipped' value='?????????? ?????? ?????????? ??????' name='status' click={(event) => {
                                filterData("shipped");
                            }}/>
                            <label htmlFor='status_shipped'>?????????? ?????? ?????????? ??????</label>
                        </div>
                    </div>
                </div>

                {
                    tableData && tableData.length > 0 ?

                        <Table
                            columns={tableColumns}
                            data={tableData}
                            className={Styles.ordersTable}
                            sorting
                            pagination
                            filtering
                        />
                        :
                        <div className={Styles.noProductMessage}>
                            <h1>?????? ???????????? ?????? ???????? ??????</h1>
                        </div>
                }

            </DashboardLayout>

            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                contentLabel="Add Product Modal"
                onRequestClose={() => {
                    setShowModal(false);
                }}
                className={Styles.Modal}
                overlayClassName={Styles.Overlay}
            >
                <div className={Styles.ModalHeader}>
                    <h1>?????????? ??????????</h1>
                    <Button type='primary' size='small' text='????????' borderRadius click={() => {
                        setShowModal(false);
                        setmodalData_order({});
                        setmodalData_user({});
                        setmodalData_product([]);
                    }} />
                </div>
                <div className={Styles.ModalBody}>
                    
                    <div className={Styles.bodyContent}>
                        <span>?????????? ?????????? : <h3>{modalData_order.id}</h3></span>
                        <span>?????? ?????????? : <h3>{modalData_user.firstName + " " + modalData_user.lastName}</h3></span>
                        <span>???????? : <h3>{modalData_user.country + "?? " + modalData_user.state + "?? " + modalData_user.city + "?? " + modalData_user.address + " ( ???? ???????? : " + modalData_user.zip + " )"}</h3></span>
                        <span>???????? : <h3><Navigation link={`tel:${modalData_user.phone}`} text={`${modalData_user.phone}`} external /></h3></span>
                        <span>???????? ?????????? : <h3>{convertMiladiToShamsi(new Date(modalData_order.createdAt).getFullYear(), new Date(modalData_order.createdAt).getMonth() + 1, new Date(modalData_order.createdAt).getDate())[0]}</h3></span>
                        <span>???????? ?????????? : <h3>{modalData_order['delivery-date']}</h3></span>
                    </div>
                    
                    <div className={Styles.productBox}>
                        {
                            //check if modalDataFiltered_product is empty or not, then create table or show message
                            modalData_product.length > 0 ?
                                <table className={Styles.productTable}>
                                    <thead>
                                        <tr>
                                            <th>?????? ??????????</th>
                                            <th>??????????</th>
                                            <th>????????</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            modalDataFiltered_product.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{product.name}</td>
                                                        <td>{product.count}</td>
                                                        <td>{product.price} ??????????</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className={Styles.noProductMessage}>
                                    <h1>?????? ???????????? ?????? ???????? ??????</h1>
                                </div>
                        }
                        {
                            modalData_product.length > 0 ?
                            <p>???????? ???? ?????? ???????? : {modalData_order['total-price']} ??????????</p>
                            : null
                        }
                    </div>

                </div>

                <div className={Styles.ModalFooter}>
                    {
                        modalData_order.status === "pending" ?
                        <Button type='primary' size='small' text='?????????? ???????? ??????' borderRadius click={() => {

                            setAllData(allData.map((order) => {
                                if(order.id === modalData_order.id) {
                                    order.status = "shipped";
                                }
                                return order;
                            }));

                            const tempOrder = {
                                ...modalData_order,
                                status: "shipped"
                            }
                            updateOrder(modalData_order.id, tempOrder).then(response => {
                                if(response.status === 200) {
                                    swal("?????????? ?????????? ??????????", "?????????? ???? ???????????? ?????????? ????????", "success");
                                } else {
                                    swal("?????????? ?????????? ??????????", "?????????? ???? ?????????? ?????????? ?????????? ???? ???????? ??????", "error");
                                }
                            });

                            setShowModal(false);
                            setmodalData_order({});
                            setmodalData_user({});
                            setmodalData_product([]);

                        }} />
                        : <p>???????? ?????????? : {modalData_order['delivery-date']}</p>
                    }
                
                </div>

            </Modal>
            <Footer/>
        </div>
    );
};
