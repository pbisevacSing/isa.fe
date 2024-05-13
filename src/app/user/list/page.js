'use client';
import Link from "next/link";
import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Spinner} from "reactstrap";

export const tableColumns = [
    {
        name: 'First name',
        selector: (row) => `${row.firstName}`,
        sortable: false
    },
    {
        name: 'Last name',
        selector: (row) => `${row.lastName}`,
        sortable: false
    }
]

export default function UserList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const {getData, loading, data} = useListData(`user/get-user-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`user/get-user-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    const handlePageChange = async (page) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    return (
        <>
            {data != null && <DataTable data={data.users}
                                  columns={tableColumns}
                                  striped={true}
                                  noHeader={true}
                                  pagination
                                  paginationServer
                                  progressPending={loading}
                                  paginationTotalRows={data.totalElements}
                                  onChangePage={handlePageChange}
                                  onChangeRowsPerPage={handlePerRowsChange}
                                  progressComponent={<Spinner color="danger">Ocitavanje...</Spinner>}
                                  highlightOnHover
            />}
        </>
    );
}
