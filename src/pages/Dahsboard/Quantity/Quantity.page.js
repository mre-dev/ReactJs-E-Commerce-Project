import { GetProduct, GetProducts, UpdateProduct } from 'api/Product.api';
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
                        e.target.style.borderColor = '#ff0000';
                    }}

                    onBlur={(e) => {
                        e.target.readOnly = true;
                        const newValue = e.target.value;
                        checkEditedDataP(e.target.id, newValue);
                    }}

                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            e.target.readOnly = true;
                            e.target.style.borderColor = '#ccc';
                            e.defaultValue = value.row.original.price;
                            checkEditedDataP(e.target.id, value.row.original.price);
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
                        e.target.style.borderColor = '#ff0000';
                    }}

                    onBlur={(e) => {
                        e.target.readOnly = true;
                        const newValue = e.target.value;
                        checkEditedDataQ(e.target.id, newValue);
                    }}

                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            e.target.readOnly = true;
                            e.target.style.borderColor = '#ccc';
                            e.defaultValue = value.row.original.quantity;
                            checkEditedDataQ(e.target.id, value.row.original.quantity);
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

    const [editedData, setEditedData] = useState([]);
    function checkEditedDataP(inputId, newValue) {
        const id = inputId.split('_')[2];
        
        tableData.filter(item => {
            if (item.id == id) {
                if (item.price != newValue) {
                    setSaveButtonStatus(false);

                    if (editedData.filter(item => item.id == id).length == 0) {
                        let tempObject = {};
                        tempObject.id = id;
                        tempObject.price = newValue;
                        tempObject.quantity = item.quantity;
                        tempObject.title = item.title;
                        setEditedData([...editedData, tempObject]);
                    } else {
                        setEditedData(editedData.map(item => {
                            if (item.id == id) {
                                item.price = newValue;
                            }
                            return item;
                        }));
                    }
                } else {
                    if(editedData.filter(itemE => itemE.quantity != item.quantity).length > 0) {
                        setEditedData(editedData.map(itemN => {
                            if (itemN.id == id) {
                                itemN.price = newValue;
                            }
                            return itemN;
                        }));
                    } else {
                        const newEditedData = editedData.filter(item => item.id != id);
                        setEditedData(newEditedData);
                    }
                }
            }
        });
    }

    useEffect(() => {
        changeInputPColor(editedData);
    }, [editedData]);

    function changeInputPColor(editedData) {
        if(editedData.length > 0) {
            for (let i = 0; i < editedData.length; i++) {
                if(document.getElementById(`input_price_${editedData[i].id}`)) {
                    if(editedData[i].price != tableData.filter(item => item.id == editedData[i].id)[0].price) {
                        document.getElementById(`input_price_${editedData[i].id}`).style.borderColor = '#ff0000';
                        document.getElementById(`input_price_${editedData[i].id}`).value = editedData[i].price;
                    } else {
                        document.getElementById(`input_price_${editedData[i].id}`).style.borderColor = '#ccc';
                    }
                    if(editedData[i].quantity != tableData.filter(item => item.id == editedData[i].id)[0].quantity) {
                        document.getElementById(`input_quantity_${editedData[i].id}`).style.borderColor = '#ff0000';
                        document.getElementById(`input_quantity_${editedData[i].id}`).value = editedData[i].quantity;
                    } else {
                        document.getElementById(`input_quantity_${editedData[i].id}`).style.borderColor = '#ccc';
                    }

                    if(editedData[i].price == tableData.filter(item => item.id == editedData[i].id)[0].price && editedData[i].quantity == tableData.filter(item => item.id == editedData[i].id)[0].quantity) {
                        document.getElementById(`input_price_${editedData[i].id}`).style.borderColor = '#ccc';
                        document.getElementById(`input_quantity_${editedData[i].id}`).style.borderColor = '#ccc';
                        setEditedData(editedData.filter(item => item.id != editedData[i].id));
                    }
                }
            }
            setSaveButtonStatus(false);
        } else {
            setSaveButtonStatus(true);
        }
    }

    function checkEditedDataQ(inputId, newValue) {
        const id = inputId.split('_')[2];
        
        tableData.filter(item => {
            if (item.id == id) {
                if (item.quantity != newValue) {
                    setSaveButtonStatus(false);

                    if (editedData.filter(item => item.id == id).length == 0) {
                        let tempObject = {};
                        tempObject.id = id;
                        tempObject.price = item.price;
                        tempObject.quantity = newValue;
                        tempObject.title = item.title;
                        setEditedData([...editedData, tempObject]);
                    } else {
                        setEditedData(editedData.map(item => {
                            if (item.id == id) {
                                item.quantity = Number(newValue);
                            }
                            return item;
                        }));
                    }
                } else {
                    //check if price of this data dosnt changed, just change the quantity
                    if(editedData.filter(itemE => itemE.price != item.price).length > 0) {
                        setEditedData(editedData.map(itemN => {
                            if (itemN.id == id) {
                                itemN.quantity = Number(newValue);
                            }
                            return itemN;
                        }));
                    } else {
                        const newEditedData = editedData.filter(item => item.id != id);
                        setEditedData(newEditedData);
                    }
                }
            }
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
                    <Button text={`ذخیره (${editedData.length})`} size='small' type='primary' borderRadius disabled={saveButtonStatus} click={() => {
                        if(editedData.length > 0) {
                            setSaveButtonStatus(true);
                            for(let i = 0; i < editedData.length; i++) {
                                GetProduct(editedData[i].id).then(res => {
                                    if(res.status == 200) {
                                        const newProduct = res.data;
                                        newProduct.price.amount = editedData.filter(item => item.id == newProduct.id)[0].price;
                                        newProduct.count = Number(editedData.filter(item => item.id == newProduct.id)[0].quantity);
                                        UpdateProduct(editedData[i].id, newProduct).then(res => {
                                            if(res.status == 200) {
                                                setSaveButtonStatus(false);
                                                setTableData(tableData.map(item => {
                                                    if(item.id == editedData[i].id) {
                                                        item.price = editedData[i].price;
                                                        item.quantity = Number(editedData[i].quantity);
                                                    }
                                                    return item;
                                                }));
                                                setEditedData([]);
                                            }
                                        });
                                    }
                                });
                            }
                            swal({
                                title: "موفق",
                                text: "تغییرات با موفقیت ذخیره شد",
                                icon: "success",
                                button: "بستن"
                            });
                        }
                    }}/>
                </div>
                <div className={Styles.content}>
                {
                    tableData && tableData.length > 0 ?
                            <Table pageSize={5} editedData={editedData} tableData={tableData} columns={tableColumns} data={tableData} className={Styles.productTable} sorting pagination filtering />
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
