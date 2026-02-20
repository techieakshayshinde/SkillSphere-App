import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "./courseSlice";
import { enrollCourse, unenrollCourse } from "../enrollments/enrollmentSlice";
import EnrolledStudents from "./EnrolledStudents";

function CourseCard({ course, onEdit, isAdmin = false, isEnrolled = false, enrollmentId = null, allEnrollments = [], allUsers = [] }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.enrollments);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            dispatch(deleteCourse(course.id));
        }
    };

    const handleEnroll = () => {
        if (user?.id) {
            dispatch(enrollCourse({ userId: user.id, courseId: course.id }));
        }
    };

    const handleUnenroll = () => {
        if (enrollmentId && window.confirm('Are you sure you want to unenroll from this course?')) {
            dispatch(unenrollCourse(enrollmentId));
        }
    };

    return (
        <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            width: '100%',
            boxSizing: 'border-box',
            minWidth: 0,
            margin: 0,
            padding: 0,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            border: '1px solid #e0e0e0',
            '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-4px)'
            }
        }}>
            <CardContent sx={{ flexGrow: 1, pb: 1, width: '100%', minHeight: '150px', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)' }}>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.3,
                        color: '#1a1a1a',
                        fontWeight: 600
                    }}
                >
                    {course.title}
                </Typography>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        mb: 2, 
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.4
                    }}
                >
                    {course.description}
                </Typography>
                
                {isEnrolled && (
                    <Typography variant="caption" sx={{ color: 'green', fontWeight: 'bold', display: 'block', mb: 1 }}>
                        ✓ Enrolled
                    </Typography>
                )}

                <Box sx={{ minHeight: '40px', display: 'flex', alignItems: 'flex-start' }}>
                    <EnrolledStudents 
                        courseId={course.id}
                        courseTitle={course.title}
                        enrollments={allEnrollments} 
                        users={allUsers}
                    />
                </Box>
            </CardContent>

            <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1, flexWrap: 'wrap', width: '100%', boxSizing: 'border-box', borderTop: '1px solid #f0f0f0' }}>
                {!isEnrolled && (
                    <Button 
                        variant="contained" 
                        size="small" 
                        onClick={handleEnroll}
                        disabled={loading}
                        sx={{ textTransform: 'none', fontWeight: 500 }}
                    >
                        Enroll
                    </Button>
                )}

                {isEnrolled && (
                    <Button 
                        variant="outlined" 
                        color="error" 
                        size="small" 
                        onClick={handleUnenroll}
                        disabled={loading}
                        sx={{ textTransform: 'none', fontWeight: 500 }}
                    >
                        Unenroll
                    </Button>
                )}

                {isAdmin && (
                    <>
                        <Button 
                            variant="outlined" 
                            size="small" 
                            onClick={() => onEdit(course)}
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                        >
                            Edit
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="error" 
                            size="small" 
                            onClick={handleDelete}
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </Box>
        </Card>
    );
}

export default CourseCard;