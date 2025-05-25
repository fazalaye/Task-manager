import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import type { GridProps } from '@mui/material';
import {
  Add as AddIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
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

const GridItem = Grid as any;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await tasks.getAll();
      setTaskList(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await tasks.create(values);
        await fetchTasks();
        setIsDialogOpen(false);
        formik.resetForm();
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    },
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {user?.username}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {taskList.map((task) => (
            <GridItem item xs={12} sm={6} md={4} key={task._id}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 },
                }}
                onClick={() => navigate(`/tasks/${task._id}`)}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: getPriorityColor(task.priority),
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {task.title}
                  <Box
                    sx={{
                      backgroundColor: getPriorityColor(task.priority),
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.8rem',
                    }}
                  >
                    {task.priority}
                  </Box>
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {task.category}
                </Typography>
                <Typography variant="body2" paragraph>
                  {task.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="caption" color="textSecondary">
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: task.status === 'completed' ? '#4caf50' : '#ff9800',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.8rem',
                    }}
                  >
                    {task.status}
                  </Box>
                </Box>
              </Paper>
            </GridItem>
          ))}
        </Grid>

        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setIsDialogOpen(true)}
        >
          <AddIcon />
        </Fab>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Create New Task</DialogTitle>
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
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
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
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Create</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </>
  );
};

export default Dashboard; 