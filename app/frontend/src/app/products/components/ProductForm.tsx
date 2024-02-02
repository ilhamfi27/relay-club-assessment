import { Products, useProduct } from '@/services/products';
import { Box, Button, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';

type ProductFormProps = {
  data?: Products;
  onSubmitSuccess?: (...args: any) => void;
  onSubmitError?: (...args: any) => void;
};

const ProductForm: FC<ProductFormProps> = ({
  data,
  onSubmitError,
  onSubmitSuccess,
}) => {
  const { create, update } = useProduct();
  const [formValue, setFormValue] = useState<Products | null>(null);

  useEffect(() => {
    setFormValue(data as Products);
  }, [data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (data) {
      update(data.id, {
        sku: formData.get('sku') as string,
        name: formData.get('name') as string,
        price: Number(formData.get('price')),
      })
        .then((res) => {
          onSubmitSuccess && onSubmitSuccess(res);
        })
        .catch((err) => {
          onSubmitError && onSubmitError(err);
        });
    } else {
      create({
        sku: formData.get('sku') as string,
        name: formData.get('name') as string,
        price: Number(formData.get('price')),
      })
        .then((res) => {
          onSubmitSuccess && onSubmitSuccess(res);
        })
        .catch((err) => {
          onSubmitError && onSubmitError(err);
        });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 600,
      }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <TextField
        value={formValue?.sku}
        onChange={(e) =>
          setFormValue({
            ...formValue,
            sku: e.target.value,
          } as Products)
        }
        margin="normal"
        required
        fullWidth
        id="sku"
        label="SKU"
        name="sku"
        autoComplete="sku"
        autoFocus
      />
      <TextField
        value={formValue?.name}
        onChange={(e) =>
          setFormValue({
            ...formValue,
            name: e.target.value,
          } as Products)
        }
        margin="normal"
        required
        fullWidth
        id="name"
        label="Product Name"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        value={formValue?.price}
        onChange={(e) =>
          setFormValue({
            ...formValue,
            price: e.target.value as unknown as number,
          } as Products)
        }
        margin="normal"
        required
        fullWidth
        id="price"
        label="Price"
        name="price"
        autoComplete="price"
        autoFocus
        type="number"
      />
      <Button type="submit">Save</Button>
    </Box>
  );
};

export default ProductForm;
