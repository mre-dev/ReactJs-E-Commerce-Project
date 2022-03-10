import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import Styles from "./CategorySytle.page.module.css";
import { Button, Input, Table } from 'components';
import { DashboardLayout, Footer, Header } from 'layouts';
import { GetCategories, GetCategory } from 'api/getCategory.api';
import { Helmet } from 'react-helmet';
import { UploadImage } from 'api/UploadImage.api';
import { AddCategory, EditCategory } from 'api/category.api';
import swal from 'sweetalert';

export const UserCategoryPage = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState('');
    const [editCategoryNameFa, setEditCategoryNameFa] = useState('');
    const [editCategoryNameEn, setEditCategoryNameEn] = useState('');
    const [editCategoryIcon, setEditCategoryIcon] = useState('');
    const [editCategoryCreateDate, setEditCategoryCreateDate] = useState('');

    const tableColumns = [
        {
            Header: 'کد',
            accessor: 'id',
            Filter: true
        },
        {
            Header: "نام فارسی",
            accessor: "nameFa",
            Filter: true
        },
        {
            Header: 'نام انگلیسی',
            accessor: 'nameEn',
            Filter: true
        },
        {
            Header: 'تاریخ ایجاد',
            accessor: 'createdAt',
            Filter: true
        },
        {
            Header: 'آیکن',
            accessor: 'icon',
            Cell: (value) => {
                return (
                    <img src={value.value} alt="icon" />
                )
            }
        },
        {
            Header: 'وضعیت',
            accessor: 'status',
            Cell: (value) => {
                return (
                    <Button type='warning' borderRadius size='small' text='ویرایش' click={(e) => {
                        setEditCategoryId(value.row.original.id);
                        GetCategory(value.row.original.id).then(res => {
                            setEditCategoryCreateDate(res.data.createdAt);
                            setEditCategoryNameFa(res.data['name-fa']);
                            setEditCategoryNameEn(res.data['name-en']);
                            setEditCategoryIcon(res.data['icon']);
                        })
                        setEditMode(true);
                        setShowModal(true);
                    }} />
                );
            },
            Filter: false
        }
    ];

    const [tableData, setTableData] = React.useState([]);

    useEffect(() => {
        GetCategories().then(res => {
            res.data.map(item => {
                setTableData(tableData => [...tableData, {
                    id: item.id,
                    nameFa: item['name-fa'],
                    nameEn: item['name-en'],
                    createdAt: new Date(item.createdAt).toLocaleDateString("en-US"),
                    icon: process.env.REACT_APP_BASE_URL + "/files/" + item.icon,
                    status: item.status
                }]);
            });
        });
    }, []);

    const reqConfig = {
        headers: {
            'content-type': 'multipart/form-data',
            'token': localStorage.getItem('ACCESS_TOKEN')
        }
    };

    const categoryHandler = (e) => {
        if(!editMode) {
            e.preventDefault();
            let formData = new FormData();
            formData.append("image", e.target.icon.files[0]);
            UploadImage(formData, reqConfig).then(res => {
                const category = {
                    "name-fa": e.target.nameFa.value,
                    "name-en": e.target.nameEn.value,
                    createdAt: new Date().getTime(),
                    icon: res.data.filename
                };
                AddCategory(category).then(res => {
                    if (res.status === 201) {
                        setTableData(tableData => [...tableData, {
                            id: res.data.id,
                            nameFa: res.data['name-fa'],
                            nameEn: res.data['name-en'],
                            createdAt: new Date(res.data.createdAt).toLocaleDateString("en-US"),
                            icon: process.env.REACT_APP_BASE_URL + "/files/" + res.data.icon
                        }]);
                        setShowModal(false);
                        setEditMode(false);
                        swal("ثبت شد!", "دسته بندی با موفقیت ثبت شد!", "success");
                    }
                });
            });
        } else {
            e.preventDefault();
            
            if(e.target.icon.files[0] == undefined) {
                const category = {
                    id: editCategoryId,
                    createdAt: editCategoryCreateDate,
                    "name-fa": e.target.nameFa.value,
                    "name-en": e.target.nameEn.value,
                    icon: editCategoryIcon
                };

                EditCategory(category).then(res => {
                    if (res.status === 200) {
                        const index = tableData.findIndex(item => item.id === editCategoryId);
                        tableData[index].nameFa = res.data['name-fa'];
                        tableData[index].nameEn = res.data['name-en'];
                        tableData[index].icon = process.env.REACT_APP_BASE_URL + "/files/" + res.data.icon;
                        setTableData([...tableData]);
                        setShowModal(false);
                        setEditMode(false);
                        swal("ویرایش شد!", "دسته بندی با موفقیت ویرایش شد!", "success");
                    }
                });
            } else {
                let formData = new FormData();
                formData.append("image", e.target.icon.files[0]);
                
                UploadImage(formData, reqConfig).then(res => {
                    const category = {
                        id: editCategoryId,
                        createdAt: editCategoryCreateDate,
                        "name-fa": e.target.nameFa.value,
                        "name-en": e.target.nameEn.value,
                        icon: res.data.filename
                    };
                    EditCategory(category).then(res => {
                        if (res.status === 200) {
                            const index = tableData.findIndex(item => item.id === editCategoryId);
                            tableData[index].nameFa = res.data['name-fa'];
                            tableData[index].nameEn = res.data['name-en'];
                            tableData[index].icon = process.env.REACT_APP_BASE_URL + "/files/" + res.data.icon;
                            setTableData([...tableData]);
                            setShowModal(false);
                            setEditMode(false);
                            swal("ویرایش شد!", "دسته بندی با موفقیت ویرایش شد!", "success");
                        }
                    });
                });
            }
        }
    }

    return (
        <div className="contentWithHeaderAndFooter">
            <Helmet>
                <meta charSet="utf-8" />
                <title>دسته بندی ها | {process.env.REACT_APP_WEBSITE_NAME}</title>
                <meta name="description" content="لیست دسته بندی های %REACT_APP_WEBSITE_NAME%" />
            </Helmet>

            <Header/>

            <DashboardLayout>
                <div className={Styles.container}>
                    <div className={Styles.titleBox}>
                        <h1 className={Styles.title}>دسته بندی ها</h1>
                        <Button type='success' borderRadius text='افزودن دسته بندی' click={(e) => {
                            e.preventDefault();
                            setEditMode(false);
                            setShowModal(true);
                        }} />
                    </div>

                    <Table
                        columns={tableColumns}
                        data={tableData}
                        className={Styles.ordersTable}
                        pageSize={5}
                        sorting
                        pagination
                        filtering
                    />
                </div>

                <Modal
                    isOpen={showModal}
                    ariaHideApp={false}
                    contentLabel="Add Category Modal"
                    onRequestClose={() => {
                        setShowModal(false);
                    }}
                    className={Styles.Modal}
                    overlayClassName={Styles.Overlay}
                >

                    <div className={Styles.ModalHeader}>
                        {
                            editMode ?
                                <h1>ویرایش دسته بندی</h1>
                                :
                                <h1>افزودن دسته بندی</h1>
                        }
                        <Button text='بستن' type='danger' size='small' borderRadius click={() => {
                            setShowModal(false);
                            setEditMode(false);
                        }}/>
                    </div>

                    <div className={Styles.ModalContent}>
                        {
                        !editMode ?
                            <form onSubmit={categoryHandler}>
                                <Input type='text' name='nameFa' placeholder='نام فارسی دسته بندی را وارد کنید' required />
                                <Input type='text' name='nameEn' placeholder='نام انگلیسی دسته بندی را وارد کنید' required />
                                <Input type='file' name='icon' placeholder='آیکن دسته بندی را وارد کنید' required />
                                <Button type='success' text='ذخیره' size='small' borderRadius />
                            </form>
                            :
                            <form onSubmit={categoryHandler}>
                                <Input type='text' name='nameFa' placeholder='نام فارسی دسته بندی را وارد کنید' required value={editCategoryNameFa} onChange={(e) => {
                                    setEditCategoryNameFa(e.target.value);
                                }}/>
                                <Input type='text' name='nameEn' placeholder='نام انگلیسی دسته بندی را وارد کنید' required value={editCategoryNameEn} onChange={(e) => {
                                    setEditCategoryNameEn(e.target.value);
                                }}/>
                                <div>
                                    <Input type='file' name='icon' placeholder='آیکن دسته بندی را وارد کنید' accept="image/jpeg" />
                                    <img src={process.env.REACT_APP_BASE_URL + "/files/" + editCategoryIcon} alt="icon" />
                                </div>
                                <Button type='success' text='به روز رسانی' size='small' borderRadius />
                            </form>
                        }
                    </div>

                </Modal>
            </DashboardLayout>

            <Footer/>
        </div>
    );
};
