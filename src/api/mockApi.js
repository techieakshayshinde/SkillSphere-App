// Static data for production builds (when json-server is not available)
export const staticData = {
    users: [
        {
            id: "1",
            email: "student@test.com",
            password: "password123",
            name: "Test Student"
        },
        {
            id: "ad24",
            email: "anshulTest@gmail.com",
            password: "Password123",
            name: "Anshul"
        }
    ],
    courses: [
        {
            id: "1",
            title: "Introduction to React",
            description: "Learn the basics of React.js and build dynamic web applications."
        },
        {
            title: "Full-Stack Development + AI",
            description: "Become a full-stack developer by mastering both front-end and back-end technologies and AI",
            id: "2"
        },
        {
            id: "a00f",
            title: "AI/AL",
            description: "Gen AI course.."
        }
    ]
};

// Simulate API delay
export const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions for production
export const mockApi = {
    get: async (endpoint) => {
        await simulateDelay();
        if (endpoint === '/courses') {
            return { data: staticData.courses };
        }
        if (endpoint === '/users') {
            return { data: staticData.users };
        }
        if (endpoint.startsWith('/courses/')) {
            const id = endpoint.split('/')[2];
            const course = staticData.courses.find(c => c.id === id);
            return { data: course };
        }
        throw new Error('Endpoint not found');
    },

    post: async (endpoint, data) => {
        await simulateDelay();
        if (endpoint === '/courses') {
            const newCourse = { ...data, id: Date.now().toString() };
            staticData.courses.push(newCourse);
            return { data: newCourse };
        }
        if (endpoint === '/users') {
            const newUser = { ...data, id: Date.now().toString() };
            staticData.users.push(newUser);
            return { data: newUser };
        }
        throw new Error('Endpoint not found');
    },

    put: async (endpoint, data) => {
        await simulateDelay();
        if (endpoint.startsWith('/courses/')) {
            const id = endpoint.split('/')[2];
            const index = staticData.courses.findIndex(c => c.id === id);
            if (index !== -1) {
                staticData.courses[index] = { ...staticData.courses[index], ...data };
                return { data: staticData.courses[index] };
            }
        }
        throw new Error('Course not found');
    },

    delete: async (endpoint) => {
        await simulateDelay();
        if (endpoint.startsWith('/courses/')) {
            const id = endpoint.split('/')[2];
            const index = staticData.courses.findIndex(c => c.id === id);
            if (index !== -1) {
                staticData.courses.splice(index, 1);
                return { data: null };
            }
        }
        throw new Error('Course not found');
    }
};