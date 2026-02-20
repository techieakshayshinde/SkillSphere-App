import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
// Import heavy libraries
import moment from 'moment';
import { faker } from '@faker-js/faker';

function HeavyList() {
    const items = React.useMemo(() => {
        const result = [];
        for (let i = 0; i < 100; i++) {
            result.push({
                id: i,
                name: faker.person.fullName(),
                email: faker.internet.email(),
                date: moment().subtract(i * 3.65, 'days').format('MMM DD, YYYY'), // Fixed calculation
                activity: faker.lorem.sentence()
            });
        }
        return result;
    }, []);

    return (
        <List sx={{ maxHeight: 400, overflow: 'auto', border: '1px solid #ccc' }}>
            {items.map((item) => (
                <ListItem key={item.id} divider>
                    <ListItemText
                        primary={`${item.name} - ${item.email}`}
                        secondary={
                            <>
                                <Typography variant="body2" color="textSecondary">
                                    {item.activity}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {item.date}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
            ))}
            <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }} color="textSecondary">
                Heavy List Component (using Moment.js and Faker)
                <br />
                Bundle size impact: ~300KB+ (Moment + Faker)
            </Typography>
        </List>
    );
}

export default HeavyList;