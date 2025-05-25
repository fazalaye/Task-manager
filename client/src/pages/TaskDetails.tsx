import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { tasks } from '../services/api';
import { Task } from '../types';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  category: yup.string().required('Category is required'),
  priority: yup.string().required('Priority is required'),
  status: yup.string().required('Status is required'),
  dueDate: yup.date(),
});

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      if (!id) return;
      const response = await tasks.getById(id);
      setTask(response.data);
    } catch (error) {
      console.error('Failed to fetch task:', error);
      navigate('/');
    }
  };

  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
      category: task?.category || '',
      priority: task?.priority || 'medium',
      status: task?.status || 'todo',
      dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (!id) return;
        await tasks.update(id, values);
        await fetchTask();
        setIsEditDialogOpen(false);
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
  });

  const handleDelete = async () => {
    try {
      if (!id) return;
      await tasks.delete(id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#000000';
    }
  };

  if (!task) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Task Details
        </Typography>
        <IconButton onClick={() => setIsEditDialogOpen(true)} sx={{ mr: 1 }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setIsDeleteDialogOpen(true)} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: getPriorityColor(task.priority) }}>
            {task.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Category: {task.category}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography paragraph>
            {task.description || 'No description provided'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Priority
            </Typography>
            <Box
              sx={{
                backgroundColor: getPriorityColor(task.priority),
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                display: 'inline-block',
              }}
            >
              {task.priority}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Status
            </Typography>
            <Box
              sx={{
                backgroundColor: task.status === 'completed' ? '#4caf50' : '#ff9800',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                display: 'inline-block',
              }}
            >
              {task.status}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Due Date
            </Typography>
            <Typography>
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              id="category"
              name="category"
              label="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            />
            <TextField
              fullWidth
              margin="normal"
              id="priority"
              name="priority"
              label="Priority"
              select
              value={formik.values.priority}
              onChange={formik.handleChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              id="status"
              name="status"
              label="Status"
              select
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              id="dueDate"
              name="dueDate"
              label="Due Date"
              type="date"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskDetails; 