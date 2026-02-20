import { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Alert, Link } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { login } from './authSlice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login({ email, password }));
        if (login.fulfilled.match(result)) {
            navigate('/courses');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: 3
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login to SkillSphere
                </Typography>
                <Box sx={{ 
                    width: '100%', 
                    mt: 2, 
                    p: 2, 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: 1,
                    mb: 2
                }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Test Credentials:
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                        <strong>Admin:</strong> admin@test.com / password123
                    </Typography>
                    <Typography variant="caption" display="block">
                        <strong>Student:</strong> anshulTest@gmail.com / Password123
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link component={RouterLink} to="/register" variant="body2">
                            Don't have an account? Register
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;