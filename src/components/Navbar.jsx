import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            dispatch(logout());
            navigate('/login');
        }
    };

    if (!user) {
        return null;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    SkillSphere
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/courses" sx={{ mr: 2 }}>
                        All Courses
                    </Button>
                    <Button color="inherit" component={Link} to="/enrolled-courses" sx={{ mr: 2 }}>
                        My Courses
                    </Button>
                    <Button color="inherit" component={Link} to="/analytics" sx={{ mr: 2 }}>
                        Analytics
                    </Button>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        Welcome, {user.name}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;