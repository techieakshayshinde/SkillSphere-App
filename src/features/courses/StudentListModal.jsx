import { Dialog, DialogTitle, DialogContent, Avatar, Box, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

function StudentListModal({ open, onClose, students, courseTitle }) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                {courseTitle} - Enrolled Students ({students.length})
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                <List>
                    {students.map((student, index) => (
                        <ListItem key={student.id} sx={{ mb: 1 }}>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        backgroundColor: colors[index % colors.length],
                                        fontWeight: 'bold',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {getInitials(student.name)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={student.name}
                                secondary={student.email}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default StudentListModal;
