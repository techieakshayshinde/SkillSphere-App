import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from './courseSlice';
import { fetchAllEnrollments } from '../enrollments/enrollmentSlice';
import CourseCard from './CourseCard';
import CourseForm from './CourseForm';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { api } from '../../api/api';

function Courses() {
    const dispatch = useDispatch();
    const { list: courses, loading } = useSelector((state) => state.courses);
    const { list: enrollments } = useSelector((state) => state.enrollments);
    const { user } = useSelector((state) => state.auth);
    const [openForm, setOpenForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        dispatch(fetchCourses());
        if (user?.id) {
            // Both admin and students fetch all enrollments
            dispatch(fetchAllEnrollments());
        }
        // Fetch all users for admin view
        api.get('/users')
            .then((response) => setUsers(response.data))
            .catch(() => setUsers([]));
    }, [dispatch, user?.id]);

    const handleAdd = () => {
        setEditingCourse(null);
        setOpenForm(true);
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingCourse(null);
    };

    const isEnrolled = (courseId) => {
        return enrollments.some((e) => e.courseId === courseId);
    };

    const getEnrollmentId = (courseId) => {
        const enrollment = enrollments.find((e) => e.courseId === courseId);
        return enrollment?.id || null;
    };

    if (loading) {
        return <Typography>Loading courses...</Typography>;
    }

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                        Courses
                    </Typography>
                    <Button variant="contained" onClick={handleAdd} sx={{ textTransform: 'none', fontSize: '1rem' }}>
                        + Add New Course
                    </Button>
                </Box>
                <Grid container spacing={4} sx={{ width: '100%', margin: '0 auto', alignItems: 'stretch' }}>
                    {courses.map((course) => (
                        <Grid item xs={12} sm={12} md={6} key={course.id} sx={{ display: 'flex', alignItems: 'stretch', boxSizing: 'border-box' }}>
                        <CourseCard 
                            course={course} 
                            onEdit={handleEdit}
                            isAdmin={user?.isAdmin || false}
                            isEnrolled={isEnrolled(course.id)}
                            enrollmentId={getEnrollmentId(course.id)}
                            allEnrollments={enrollments}
                            allUsers={users}
                        />
                </Grid>
            ))}
            </Grid>
            <CourseForm
                open={openForm}
                onClose={handleCloseForm}
                course={editingCourse}
            />
            </Container>
        </Box>
    );
}

export default Courses;