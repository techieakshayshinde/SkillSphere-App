import React from 'react';
import { Box, Typography } from '@mui/material';
// Import heavy libraries to increase bundle size for analysis
import * as d3 from 'd3';
import * as lodash from 'lodash';

function HeavyChart() {
    // Simulate heavy computation - generate random data once
    const data = React.useMemo(() => {
        const result = [];
        const randomSeed = 0.5; // Fixed value for demo purposes
        for (let i = 0; i < 1000; i++) {
            result.push({
                x: i,
                y: Math.sin(i * 0.1) * Math.cos(i * 0.05) + randomSeed
            });
        }
        return lodash.chunk(result, 50); // Use lodash for heavy processing
    }, []);

    React.useEffect(() => {
        // Simulate D3 usage (though not actually rendering)
        const svg = d3.select(document.createElement('svg'));
        svg.append('g').selectAll('circle')
            .data(data.flat())
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y * 100 + 200)
            .attr('r', 2);
    }, [data]);

    return (
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc' }}>
            <Typography variant="h6" color="textSecondary">
                Heavy Chart Component (using D3 and Lodash)
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
                Bundle size impact: ~500KB+ (D3 + Lodash)
            </Typography>
        </Box>
    );
}

export default HeavyChart;