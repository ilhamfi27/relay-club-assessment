import SimpleDialog from '@/components/Dialog/SimpleDialog';
import {
  DiscountRules,
  RuleType,
  useDiscountRules,
} from '@/services/discount-rules';
import { Edit, Delete, Add } from '@mui/icons-material';
import { IconButton, Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DiscountRuleForm from './DiscountRuleForm';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';

const DiscountRuleList = () => {
  const { findAll, remove } = useDiscountRules();
  const [discountRules, setDiscountRules] = useState<DiscountRules[]>([]);
  const [discountRule, setDiscountRule] = useState<DiscountRules | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [willDelete, setWillDelete] = useState(false);

  useEffect(() => {
    findAll().then((res) => {
      setDiscountRules(res.data);
    });
  }, []);

  const handleButtonAction = (param: any) => {
    const row = param.row as DiscountRules;
    setModalOpen(true);
    setDiscountRule(row);
  };

  const handleOk = (p: DiscountRules) => {
    remove(p?.id as number).then(() => {
      findAll().then((res) => {
        setDiscountRules(res.data);
      });
    });
  };

  const columns: GridColDef<DiscountRules>[] = [
    { field: 'rule_type', headerName: 'Rule Type', width: 250 },
    { field: 'quantity', headerName: 'Discount Quantity', width: 150 },
    {
      field: 'discount_value',
      headerName: 'Discount Value',
      valueGetter: (params: GridValueGetterParams<DiscountRules>) =>
        params.row.rule_type === RuleType.BULK_PURCHASE_DISCOUNT
          ? `$${params.row.discount_value}`
          : params.row.discount_value,
      width: 150,
    },
    {
      field: 'product',
      headerName: 'Product Discount',
      width: 250,
      valueGetter: (params: GridValueGetterParams<DiscountRules>) =>
        params.row.product.name,
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
            setDiscountRule(null);
          }}
        >
          <Add /> Add Discount Rule
        </Button>
      </div>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
        <DataGrid
          rows={discountRules}
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
            handleOk(discountRule as DiscountRules);
          }}
          title="Delete Discount Rule"
          message={`Are you sure you want to delete ${discountRule?.rule_type} discount type for product ${discountRule?.product.name}? This action cannot be undone.`}
        />
      ) : (
        <SimpleDialog
          open={modalOpen}
          handleClose={() => {
            setModalOpen(false);
          }}
          title={`${discountRule ? 'Edit' : 'Add'} Discount Rule`}
          maxWidth="md"
        >
          <DiscountRuleForm
            data={discountRule as DiscountRules}
            onSubmitSuccess={() => {
              setModalOpen(false);
              findAll().then((res) => {
                setDiscountRules(res.data);
              });
            }}
          />
        </SimpleDialog>
      )}
    </>
  );
};

export default DiscountRuleList;
