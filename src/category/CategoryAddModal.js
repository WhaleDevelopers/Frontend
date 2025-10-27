

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import AddCategoryRequestDto from '../common/hooks/client/generated/src/model/AddCategoryRequestDto';
import { addCategory } from '../category/hooks/categoryClient';

/**
 * CategoryAddModal
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onAdded: (data) => void  // optional callback when category added
 */
export default function CategoryAddModal({ open = false, onClose = () => {}, onAdded }) {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: '',
      displayName: '',
      sortOrder: 0,
      isActive: true,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Category name is required')
        .matches(/^[a-z]+$/, 'Name must contain lowercase letters only (a-z)'),
      displayName: Yup.string(),
      sortOrder: Yup.number().integer().min(0),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      const dto = AddCategoryRequestDto.constructFromObject({
        name: values.name,
        displayName: values.displayName,
        sortOrder: Number(values.sortOrder) || 0,
        isActive: Boolean(values.isActive),
      });

      const { success, message, data } = await addCategory(dto);
      console.log('카테고리 추가 데이터:', dto);
      if (!success) {
        enqueueSnackbar(`Failed to add category ${message}`, { variant: 'error' });
        setSubmitting(false);
        return;
      }

      console.log('카테고리 추가 성공:', data);
      enqueueSnackbar('Category added', { variant: 'success' });
      resetForm();
      if (onAdded) onAdded(data);
      onClose();
      setSubmitting(false);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            margin="normal"
            fullWidth
            id="displayName"
            name="displayName"
            label="Display Name"
            value={formik.values.displayName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                margin="normal"
                fullWidth
                id="sortOrder"
                name="sortOrder"
                label="Sort Order"
                type="number"
                value={formik.values.sortOrder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <FormControlLabel
                  control={<Checkbox id="isActive" name="isActive" checked={formik.values.isActive} onChange={(e) => formik.setFieldValue('isActive', e.target.checked)} />}
                  label="Active"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={formik.isSubmitting}>Cancel</Button>
        <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            onClick={() => formik.submitForm()}
            disabled={formik.isSubmitting}
          >
            Add
          </Button>
          {formik.isSubmitting && (
            <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}