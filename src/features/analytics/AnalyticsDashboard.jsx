import React, { Suspense, lazy } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

// Lazy load heavy components to demonstrate code splitting
const HeavyChart = lazy(() => import('./HeavyChart'));
const HeavyList = lazy(() => import('./HeavyList'));

function AnalyticsDashboard() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Analytics Dashboard
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                This component demonstrates code splitting and lazy loading.
                Heavy components are loaded only when needed.
            </Typography>

            <Suspense fallback={<CircularProgress />}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>Course Statistics</Typography>
                    <HeavyChart />
                </Box>
            </Suspense>

            <Suspense fallback={<CircularProgress />}>
                <Box>
                    <Typography variant="h6" gutterBottom>Student Activity</Typography>
                    <HeavyList />
                </Box>
            </Suspense>
        </Box>
    );
}

export default AnalyticsDashboard;