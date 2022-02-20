import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import Styles from "assets/styles/components/Table/Table.module.css";
import { useTable, useSortBy, usePagination, useFilters } from 'react-table';
import { Button, Input } from 'components';

export const Table = (props) => {
    
    const columns = useMemo(() => props.columns, []);
    const data = useMemo(() => props.data, []);

    const tableInstanse = useTable({
        columns,
        data,
        initialState: { pageSize: props.pageSize || 10 },
    }, props.filtering && useFilters, props.sorting && useSortBy, props.pagination && usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
    } = tableInstanse;

    const { pageIndex, pageSize } = state;

    return (
        <Fragment>
            <table {...getTableProps()} className={`${Styles.table} ${props.className}`}>
                <thead className={Styles.thead}>
                    {
                        headerGroups.map((headerGroup, i) => (
                            <Fragment>
                                <tr {...headerGroup.getHeaderGroupProps()} key={`header_row${i}`}>
                                    {
                                        headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps(props.sorting && column.getSortByToggleProps)}>
                                                {column.render('Header')}
                                                <span className={Styles.sortIcon}>
                                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                </span>
                                                
                                            </th>
                                        ))
                                    }
                                </tr>
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map(column => (
                                            <th key={column.id}>
                                                {
                                                    props.filtering && column.Filter && column.canFilter ? ( 
                                                        <div className={Styles.filterBox}>
                                                            <Input
                                                                id={column.Header + "_filter"}
                                                                className={Styles.filterInput}
                                                                type="text"
                                                                placeholder="جستجو"
                                                                value={column.filterValue}
                                                                onChange={(e) => {
                                                                    e.stopPropagation()
                                                                    column.setFilter(e.target.value)
                                                                }}
                                                            />
                                                        </div>
                                                    ) : null
                                                }
                                            </th>
                                        ))
                                    }
                                </tr>
                            </Fragment>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()} className={Styles.tbody}>
                    {
                        page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                props.pagination &&
                <Fragment>
                    <div className={Styles.pagination}>
                        <Button click={() => gotoPage(0)} text='اول' size='small' type='dark' disabled={!canPreviousPage} borderRadius />
                        <Button click={() => previousPage()} text='قبلی' size='small' type='dark' disabled={!canPreviousPage} borderRadius />
                        <span>
                            <strong>صفحه {pageIndex + 1} از {pageOptions.length}</strong>
                        </span>
                        <Button click={() => nextPage()} text='بعدی' size='small' type='dark' disabled={!canNextPage} borderRadius />
                        <Button click={() => gotoPage(pageCount - 1)} text='آخر' size='small' type='dark' disabled={!canNextPage} borderRadius />

                        <span className={Styles.pagination__number}>
                            <span>رفتن به صفحه : {' '}</span>
                            <Input type='number' id='gotoPage' min={1} max={pageCount} defaultValue={'1'} onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber)
                            }} />
                        </span>

                        <span className={Styles.pagination__select}>
                            <span>تعداد در هر صفحه : {' '}</span>
                            <select value={pageSize} onChange={(e) => {
                                const pageSize = e.target.value ? Number(e.target.value) : 10;
                                setPageSize(pageSize)
                            }}>
                                {
                                    [5, 10, 20, 50, 100].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>نمایش {pageSize} محصول</option>
                                    ))
                                }
                            </select>
                        </span>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

Table.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    sorting: PropTypes.bool,
    filtering: PropTypes.bool,
    pagination: PropTypes.bool,
    pageSize: PropTypes.number
};