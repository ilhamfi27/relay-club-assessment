import SimpleDialog from '@/components/Dialog/SimpleDialog';
import { Products, useProduct } from '@/services/products';
import { Edit, Delete, Add } from '@mui/icons-material';
import { IconButton, Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';

const ProductList = () => {
  const { findAll, remove } = useProduct();
  const [products, setProducts] = useState<Products[]>([]);
  const [product, setProduct] = useState<Products | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [willDelete, setWillDelete] = useState(false);

  useEffect(() => {
    findAll().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleButtonAction = (param: any) => {
    const row = param.row as Products;
    setModalOpen(true);
    setProduct(row);
  };

  const handleOk = (p: Products) => {
    remove(p?.id as number).then(() => {
      findAll().then((res) => {
        setProducts(res.data);
      });
    });
  };

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
          <IconButton
            onClick={() => {
              handleButtonAction(param);
            }}
            aria-label="edit"
            size="small"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              handleButtonAction(param);
              setWillDelete(true);
            }}
            aria-label="delete"
            size="small"
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="w-full flex gap-4 justify-end mb-4">
        <Button
          variant="contained"
          onClick={() => {
            setModalOpen(true);
            setProduct(null);
          }}
        >
          <Add />Add Product
        </Button>
      </div>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
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
      </Box>
      {willDelete ? (
        <ConfirmationDialog
          open={modalOpen && willDelete}
          handleClose={() => {
            setModalOpen(false);
            setWillDelete(false);
          }}
          handleOk={() => {
            setModalOpen(false);
            setWillDelete(false);
            handleOk(product as Products);
          }}
          title="Delete Product"
          message={`Are you sure you want to delete ${product?.name} with sku ${product?.sku}? This action cannot be undone.`}
        />
      ) : (
        <SimpleDialog
          open={modalOpen}
          handleClose={() => {
            setModalOpen(false);
          }}
          title={`${product ? 'Edit' : 'Add'} Product`}
          maxWidth="md"
        >
          <ProductForm
            data={product as Products}
            onSubmitSuccess={() => {
              setModalOpen(false);
              findAll().then((res) => {
                setProducts(res.data);
              });
            }}
          />
        </SimpleDialog>
      )}
    </>
  );
};

export default ProductList;
