import {
  DiscountRules,
  RuleType,
  useDiscountRules,
} from '@/services/discount-rules';
import { Products, useProduct } from '@/services/products';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import { FC, useEffect, useState } from 'react';

type DiscountRulesFormProps = {
  data?: DiscountRules;
  onSubmitSuccess?: (...args: any) => void;
  onSubmitError?: (...args: any) => void;
};

const DiscountRulesForm: FC<DiscountRulesFormProps> = ({
  data,
  onSubmitError,
  onSubmitSuccess,
}) => {
  const { create, update } = useDiscountRules();
  const { findAll } = useProduct();
  const [formValue, setFormValue] = useState<DiscountRules | null>(null);
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    findAll().then((res) => {
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    setFormValue(data as DiscountRules);
  }, [data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const product_id = Number(formData.get('product_id'));
    const payload = {
      quantity: Number(formData.get('quantity')),
      rule_type: formData.get('rule_type') as RuleType,
      discount_product_id: formData.get('discount_product_id')
        ? Number(formData.get('discount_product_id'))
        : undefined,
      discount_value: Number(formData.get('discount_value')),
    } as unknown as DiscountRules;

    if (data) {
      update(product_id, data.id, payload)
        .then((res) => {
          onSubmitSuccess && onSubmitSuccess(res);
        })
        .catch((err) => {
          onSubmitError && onSubmitError(err);
        });
    } else {
      console.log(Number(formData.get('discount_product_id')));

      create(product_id, payload)
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
        margin="normal"
        required
        fullWidth
        id="product_id"
        label="Discount For Product"
        name="product_id"
        autoComplete="product_id"
        autoFocus
        select
        defaultValue={formValue?.product.id}
      >
        {products.map((product) => (
          <MenuItem
            key={product.id}
            value={product.id}
            selected={formValue?.product.id === product.id}
          >
            {product.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        margin="normal"
        required
        fullWidth
        id="quantity"
        label="Minimum Quantity"
        name="quantity"
        autoComplete="quantity"
        type="number"
        value={formValue?.quantity}
        onChange={(e) => {
          setFormValue({
            ...formValue,
            quantity: Number(e.target.value),
          } as DiscountRules);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="rule_type"
        label="Rule Type"
        name="rule_type"
        autoComplete="rule_type"
        select
        onChange={(e) => {
          setFormValue({
            ...formValue,
            rule_type: e.target.value as RuleType,
          } as DiscountRules);
        }}
      >
        {Object.keys(RuleType).map((rule) => (
          <MenuItem key={rule} value={rule}>
            {rule.split('_').join(' ')}
          </MenuItem>
        ))}
      </TextField>

      {formValue?.rule_type !== RuleType.BULK_PURCHASE_DISCOUNT && (
        <TextField
          margin="normal"
          required
          fullWidth
          id="discount_product_id"
          label="Affected Product"
          name="discount_product_id"
          autoComplete="discount_product_id"
          select
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {formValue?.rule_type !== RuleType.FREE_PRODUCT && (
        <TextField
          margin="normal"
          required
          fullWidth
          id="discount_value"
          label="Discount Value"
          name="discount_value"
          autoComplete="discount_value"
          value={formValue?.discount_value}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              discount_value: Number(e.target.value),
            } as DiscountRules);
          }}
        />
      )}
      <Button type="submit">Save</Button>
    </Box>
  );
};

export default DiscountRulesForm;
