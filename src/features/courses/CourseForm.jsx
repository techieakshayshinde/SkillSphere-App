import { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addCourse, updateCourse } from './courseSlice';

function CourseForm({ open, onClose, course }) {
    const [title, setTitle] = useState(course?.title || '');
    const [description, setDescription] = useState(course?.description || '');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (course) {
            dispatch(updateCourse({ id: course.id, title, description }));
        } else {
            dispatch(addCourse({ title, description }));
        }
        onClose();
    };

    return (
        <Dialog key={course?.id} open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{course ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Course Title"
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Course Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        {course ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default CourseForm;