import { Box, Avatar, Typography, Tooltip } from '@mui/material';
import { useState } from 'react';
import StudentListModal from './StudentListModal';

function EnrolledStudents({ courseId, courseTitle, enrollments, users }) {
    const courseEnrollments = enrollments.filter((e) => e.courseId === courseId);
    const enrolledStudents = courseEnrollments
        .map((enrollment) => users.find((u) => u.id === enrollment.userId))
        .filter(Boolean);

    const [openModal, setOpenModal] = useState(false);

    if (enrolledStudents.length === 0) {
        return (
            <Typography variant="caption" color="textSecondary">
                No students enrolled yet
            </Typography>
        );
    }

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    
    const maxDisplay = 3;
    const visibleStudents = enrolledStudents.slice(0, maxDisplay);
    const remainingCount = enrolledStudents.length - maxDisplay;
    
    return (
        <>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 1, width: '100%', minHeight: '32px' }}>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold', mr: 0.5, flexShrink: 0 }}>
                    {enrolledStudents.length}:
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexWrap: 'nowrap', minWidth: 0, overflow: 'hidden' }}>
                    {visibleStudents.map((student, index) => (
                        <Tooltip key={student.id} title={student.name}>
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28,
                                    backgroundColor: colors[index % colors.length],
                                    fontSize: '0.65rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    flexShrink: 0,
                                    '&:hover': {
                                        transform: 'scale(1.15)',
                                    }
                                }}
                            >
                                {getInitials(student.name)}
                            </Avatar>
                        </Tooltip>
                    ))}
                    {remainingCount > 0 && (
                        <Tooltip title={`Click to see all ${enrolledStudents.length} students`}>
                            <Box
                                onClick={() => setOpenModal(true)}
                                sx={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    backgroundColor: '#FF8A65',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.65rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    flexShrink: 0,
                                    '&:hover': {
                                        transform: 'scale(1.15)',
                                    }
                                }}
                            >
                                +{remainingCount}
                            </Box>
                        </Tooltip>
                    )}
                </Box>
            </Box>
            <StudentListModal 
                open={openModal} 
                onClose={() => setOpenModal(false)}
                students={enrolledStudents}
                courseTitle={courseTitle}
            />
        </>
    );
}

export default EnrolledStudents;


