import React from 'react'
import { Box, useTheme } from '@mui/material'
import { useGetUserPerformanceQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import { useSelector } from 'react-redux';

const Performance = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId)
    const { data, isLoading} = useGetUserPerformanceQuery(userId);
    

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "products",
            headerName: "No. of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
    ]

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Performance" subtitle="Track your Affiliate Sales Performance" />
        {/* Manipulating CSS properties of some classes */}
        <Box mt="40px" height="75vh" sx={{
            "& .MuiDataGrid-root": {
                border: "none"
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none"
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`
            }
        }}>
            <DataGrid
                loading={isLoading || !data} //Loading value
                getRowId={(row) => row._id} //Gets the row id from db
                rows={(data && data.sales) || []} //Shows data if available, empty if not
                columns={columns} //Passing the columns array made into the property.
            />
        </Box>
    </Box>
  )
}

export default Performance;