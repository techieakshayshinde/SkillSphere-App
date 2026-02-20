import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Courses from './features/courses/Courses';
import EnrolledCourses from './features/enrollments/EnrolledCourses';
import AnalyticsDashboard from './features/analytics/AnalyticsDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

function App() {
    const { user } = useSelector((state) => state.auth);

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <Box sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/courses" replace /> : <Login />}
                        />
                        <Route
                            path="/register"
                            element={user ? <Navigate to="/courses" replace /> : <Register />}
                        />
                        <Route
                            path="/courses"
                            element={
                                <ProtectedRoute>
                                    <Courses />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/enrolled-courses"
                            element={
                                <ProtectedRoute>
                                    <EnrolledCourses />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/analytics"
                            element={
                                <ProtectedRoute>
                                    <AnalyticsDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/courses" replace />} />
                    </Routes>
                </Box>
            </Box>
        </BrowserRouter>
    );
}

export default App;
