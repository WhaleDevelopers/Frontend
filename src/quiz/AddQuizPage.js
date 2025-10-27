import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Paper,  
  Grid,  
  Stack, 
  FormHelperText 
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import { addQuiz } from './hooks/QuizClient';

import { fetchQuizDifficulties } from '../common/hooks/client/presetClient';
import { fetchCategories } from '../category/hooks/categoryClient';
import { createCategoryInstances } from '../category/hooks/categoryMapper';
import AddInterviewQuestionRequestDto from '../common/hooks/client/generated/src/model/AddInterviewQuestionRequestDto';
import CategoryAddModal from '../category/CategoryAddModal';

export default function AddQuizPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [difficulties, setDifficulties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  /*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡpreset API 호출ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
  const fetchDifficultiesAPI = async () => {
    const { success, message, data } = await fetchQuizDifficulties();
    if (!success){ enqueueSnackbar(`서버 연결에 실패했습니다. ${message}`, {variant: 'error' }); return; }
    console.log("컴포넌트 렌더링. 문제 난이도 조회: ", data);
    setDifficulties(data || []);
  };

  const fetchCategoriesAPI = async () => {
    const { success, message, data } = await fetchCategories();
    if (!success){ enqueueSnackbar(`서버 연결에 실패했습니다. ${message}`, {variant: 'error' }); return; }

    const categoryInstances = createCategoryInstances(data);
    console.log("컴포넌트 렌더링. 문제 카테고리 조회: ", categoryInstances);
    setCategories(categoryInstances);
  };

  /*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡAPI 호출 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
  const addQuizAPI = async (dto) => {
    const { success, message, data } =  await addQuiz(dto);

    if (!success) { enqueueSnackbar(`실패했습니다. ${message}`, { variant: 'error' }); return; }
    console.log("문제 추가 성공: ", data);
    enqueueSnackbar('문제 추가에 성공했습니다.', { variant: 'success' });
    return success;
  };

  /*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡuseEffect ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
  useEffect(() => {
    fetchDifficultiesAPI();
    fetchCategoriesAPI();
  }, []);



  const formik = useFormik({
    initialValues: {
      categoryId: '',
      question: '',
      answer: '',
      difficulty: 'etc',
      tagsText: '',
      version: 1,
      isActive: true,
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().required('Category id is required'),
      question: Yup.string().required('Question is required'),
      answer: Yup.string().required('Answer is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      const tags = values.tagsText
        ? values.tagsText.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

      const dtoObject = {
        categoryId: values.categoryId,
        question: values.question,
        answer: values.answer,
        difficulty: values.difficulty || 'etc',
        tags,
        version: Number(values.version) || 1,
        isActive: Boolean(values.isActive),
      };
      const dtoInstance = AddInterviewQuestionRequestDto.constructFromObject(dtoObject);
      console.log('폼 제출 데이터:', dtoInstance);

      const success = await addQuizAPI(dtoInstance);
      if (success) resetForm(); 
      setSubmitting(false);
    },
  });

  // 추가한 카테고리 자동선택
  const handleCategoryAdded = (newCat) => {
    fetchCategoriesAPI();
    if (newCat && newCat.id) {
      formik.setFieldValue('categoryId', newCat.id);
    }
  };


  return (
    <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          width: '100%', 
          maxWidth: 800, 
          borderRadius: 2 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add Interview Question
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack spacing={3}>
            
            {/* --- Category with add button --- */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={11} sm={11} minWidth={300}>
                <FormControl fullWidth error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}>
                  <InputLabel id="category-label">Category *</InputLabel>
                  <Select
                    labelId="category-label"
                    id="categoryId"
                    name="categoryId"
                    label="Category *"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {categories && categories.length > 0 ? (
                      categories.map((c) => (
                        <MenuItem key={c.id} value={c.id}>{c.displayName || c.name || c.id}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>Loading categories...</MenuItem>
                    )}
                  </Select>
                  {formik.touched.categoryId && formik.errors.categoryId ? (
                    <FormHelperText>{formik.errors.categoryId}</FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={1} sm={1}>
                <IconButton color="primary" onClick={() => setIsAddModalOpen(true)} aria-label="Add category">
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <CategoryAddModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdded={handleCategoryAdded} />

            {/* --- Question (변경 없음) --- */}
            <TextField
              fullWidth
              id="question"
              name="question"
              label="Question *"
              multiline
              minRows={3}
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.question && Boolean(formik.errors.question)}
              helperText={formik.touched.question && formik.errors.question}
            />

            {/* --- Answer (변경 없음) --- */}
            <TextField
              fullWidth
              id="answer"
              name="answer"
              label="Answer *"
              multiline
              minRows={8}
              value={formik.values.answer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.answer && Boolean(formik.errors.answer)}
              helperText={formik.touched.answer && formik.errors.answer}
            />
            
            {/* --- Tags (Grid 밖으로 이동, 전체 너비) --- */}
            <TextField
              fullWidth
              id="tagsText"
              name="tagsText"
              label="Tags (comma separated)"
              value={formik.values.tagsText}
              onChange={formik.handleChange}
            />

            {/* ⬇️ [수정] Difficulty, Version, Active를 한 줄로 묶음 ⬇️ */}
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              {/* Difficulty */}
              <Grid item xs={12} sm={6} sx={{ minWidth: 100 }}>
                <FormControl fullWidth >
                  <InputLabel id="difficulty-label">Difficulty</InputLabel>
                  <Select
                    labelId="difficulty-label"
                    id="difficulty"
                    name="difficulty"
                    label="Difficulty *"
                    value={formik.values.difficulty}
                    onChange={formik.handleChange}
                  >
                    {difficulties.map((d) => (
                      <MenuItem key={d} value={d}>{d}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Version */}
              <Grid item xs={9} sm={3} sx={{ maxWidth: 80 }}>
                <TextField
                  fullWidth
                  id="version"
                  name="version"
                  label="Version *"
                  type="number"
                  value={formik.values.version}
                  onChange={formik.handleChange}
                />
              </Grid>
              
              {/* Active: 25% 너비 (sm 이상) */}
              <Grid item xs={3} sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="isActive"
                      name="isActive"
                      checked={formik.values.isActive}
                      onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
                    />
                  }
                  label="Active"
                  sx={{ justifyContent: 'center', width: '100%' }} // 중앙 정렬
                />
              </Grid>
            </Grid>
            {/* ⬆️ [수정] Grid 끝 ⬆️ */}
            
            {/* --- 제출 버튼 (변경 없음) --- */}
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
                size="large"
              >
                {formik.isSubmitting ? 'Submitting...' : 'Add Quiz'}
              </Button>
            </Box>

          </Stack>
        </form>
      </Paper>
    </Box>
  );
};