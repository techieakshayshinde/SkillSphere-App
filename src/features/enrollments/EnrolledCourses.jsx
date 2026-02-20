import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserEnrollments } from './enrollmentSlice';
import { fetchCourses } from '../courses/courseSlice';
import { Container, Typography, Grid, Box, Card, CardContent, LinearProgress } from '@mui/material';

function EnrolledCourses() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { list: enrollments, loading: enrollmentsLoading } = useSelector((state) => state.enrollments);
    const { list: courses } = useSelector((state) => state.courses);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchUserEnrollments(user.id));
            dispatch(fetchCourses());
        }
    }, [dispatch, user?.id]);

    const enrolledCourses = enrollments.map((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.courseId);
        return { ...enrollment, ...course };
    });

    if (enrollmentsLoading) {
        return <Typography>Loading your enrollments...</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Enrolled Courses
            </Typography>

            {enrolledCourses.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" color="textSecondary">
                        You haven't enrolled in any courses yet
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Go to Courses and enroll to get started!
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {enrolledCourses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                        {course.description}
                                    </Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Progress</Typography>
                                            <Typography variant="body2">{course.progress}%</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={course.progress} />
                                    </Box>
                                    <Typography variant="caption" color="textSecondary">
                                        Enrolled: {new Date(course.enrolledDate).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default EnrolledCourses;