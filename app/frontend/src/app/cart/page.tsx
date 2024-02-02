'use client';

import { Products, useProduct } from '@/services/products';
import { AddShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

const columns: GridColDef<Products>[] = [
  { field: 'sku', headerName: 'SKU' },
  { field: 'name', headerName: 'Product Name', width: 130 },
  {
    field: 'price',
    headerName: 'Price',
    width: 160,
    valueGetter: (params: GridValueGetterParams<Products>) =>
      `$${params.row.price}`,
  },
  {
    field: 'id',
    headerName: 'Action',
    width: 160,
    renderCell: (param) => (
      <>
        <IconButton onClick={() => null} aria-label="cart" size="small">
          <AddShoppingCart />
        </IconButton>
      </>
    ),
  },
];
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Products() {
  const { findAll } = useProduct();
  const [products, setProducts] = useState<Products[]>([]);
  useEffect(() => {
    findAll().then((res) => {
      console.log(res);
      setProducts(res.data);
    });
  }, []);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableColumnSelector={true}
        disableRowSelectionOnClick={true}
      />
    </div>
  );
}
