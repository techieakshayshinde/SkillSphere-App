# How to Create and View Enrollments

## Step-by-Step Guide

### 1. **Start the Application**

Open 2 terminals and run:

**Terminal 1 - Start Backend (JSON Server):**
```bash
npm run server
```
Expected output:
```
  ✓ mock server started at http://localhost:5000
```

**Terminal 2 - Start Frontend (Development Server):**
```bash
npm run dev
```
Expected output:
```
  ➜  Local:   http://localhost:5174/
```

---

### 2. **Login to Your Account**

1. Open browser: http://localhost:5174
2. Click **Login**
3. Use test credentials:
   - **Email:** `student@test.com`
   - **Password:** `password123`
4. Or use:
   - **Email:** `anshulTest@gmail.com`
   - **Password:** `Password123`

---

### 3. **View All Courses**

1. After login, you'll see **"All Courses"** page
2. You'll see available courses:
   - Introduction to React
   - Full-Stack Development + AI
   - AI/AL
   - DSA

---

### 4. **Create/Enroll in a Course**

**Option A: Enroll in Existing Course**
1. Go to **"All Courses"** (top navigation)
2. Click **"Enroll"** button on any course card
3. See the button change to **"Unenroll"**
4. The enrollment is created in the database

**Option B: Create New Course (Admin)**
1. Click **"Add New Course"** button (top right)
2. Fill in:
   - **Course Title:** e.g., "Python Basics"
   - **Course Description:** e.g., "Learn Python programming"
3. Click **"Add"** button
4. New course appears in the list
5. You can now enroll in it

---

### 5. **View Your Enrolled Courses**

1. Click **"My Courses"** in the top navigation bar
2. See all your enrolled courses with:
   - Course title and description
   - Enrollment date
   - Progress bar (shows 0% initially)
   - Each shows when you enrolled

**Example:**
```
My Enrolled Courses
├─ Introduction to React (45% progress)
│  Enrolled: 1/15/2025
└─ AI/AL (0% progress)
   Enrolled: 2/5/2026
```

---

### 6. **Update Progress (Optional)**

Progress tracking is built-in:
- Enrollment starts at 0%
- Can be updated programmatically
- Visible on "My Courses" page

---

### 7. **Unenroll from a Course**

1. Go to **"All Courses"**
2. Find enrolled course (marked with ✓ Enrolled)
3. Click **"Unenroll"** button
4. Confirm in the dialog
5. Enrollment is deleted
6. Button changes back to **"Enroll"**

---

## Database Structure (mock-backend/db.json)

### Users Table
```json
{
  "id": "1",
  "email": "student@test.com",
  "password": "password123",
  "name": "Test Student"
}
```

### Courses Table
```json
{
  "id": "1",
  "title": "Introduction to React",
  "description": "Learn the basics of React.js..."
}
```

### Enrollments Table
```json
{
  "id": "e1",
  "userId": "1",
  "courseId": "1",
  "enrolledDate": "2025-01-15",
  "progress": 45
}
```

---

## Troubleshooting

### Problem: "Enroll" button not working

**Solution:**
1. Check if both servers are running:
   ```bash
   npm run dev      # Frontend on :5174
   npm run server   # Backend on :5000
   ```

2. Check browser console (F12) for errors

3. Verify you're logged in (you should see your name in navbar)

### Problem: Can't see "My Courses"

**Solution:**
1. Make sure you're logged in
2. Look in top navigation bar
3. Click "My Courses" link between "All Courses" and "Analytics"

### Problem: Enrolled courses list is empty

**Solution:**
1. Go to "All Courses"
2. Click "Enroll" on at least one course
3. Return to "My Courses" to see it

### Problem: Can't create new courses

**Solution:**
1. Click "Add New Course" button (top right of Courses page)
2. Fill title and description
3. Click "Add" button
4. Check that form dialog closes (successful submission)

---

## Navigation Map

```
Home Page (/)
├─ Redirect to /courses
│
Login Page (/login)
├─ Email & Password fields
├─ "Sign In" button → /courses
└─ "Create Account" link → /register

Register Page (/register)
├─ Name, Email, Password fields
├─ "Sign Up" button → /courses
└─ "Already have account?" link → /login

Courses Page (/courses) ⭐ MAIN
├─ "All Courses" (in navbar)
├─ View all available courses
├─ [Enroll] or [Unenroll] buttons per course
├─ [Add New Course] button (create new)
├─ Course cards showing:
│  ├─ Course title
│  ├─ Course description
│  ├─ ✓ Enrolled badge (if enrolled)
│  └─ Action buttons

My Courses Page (/enrolled-courses) ⭐ YOUR ENROLLMENTS
├─ "My Courses" (in navbar)
├─ Show only your enrolled courses
├─ Progress bar for each course
├─ Enrollment date
└─ Empty state if no enrollments

Analytics Page (/analytics)
├─ "Analytics" (in navbar)
└─ Dashboard with sample data

Navbar (all pages)
├─ SkillSphere logo/title
├─ [All Courses]
├─ [My Courses] ← VIEW ENROLLMENTS HERE
├─ [Analytics]
├─ Welcome, {Name}!
└─ [Logout] button
```

---

## API Endpoints (JSON Server)

```
GET    /courses              → Get all courses
GET    /courses/:id          → Get single course
POST   /courses              → Create new course
PATCH  /courses/:id          → Update course
DELETE /courses/:id          → Delete course

GET    /enrollments          → Get all enrollments
GET    /enrollments?userId=1 → Get user's enrollments
POST   /enrollments          → Create enrollment
PATCH  /enrollments/:id      → Update enrollment
DELETE /enrollments/:id      → Delete enrollment

GET    /users                → Get all users
POST   /users                → Create user (register)
```

---

## Quick Testing Checklist

- [ ] Run `npm run server` (Backend on :5000)
- [ ] Run `npm run dev` (Frontend on :5174)
- [ ] Login with test@student.com / password123
- [ ] See courses list on /courses
- [ ] Click "Enroll" on a course
- [ ] Button changes to "Unenroll"
- [ ] Go to "My Courses" link in navbar
- [ ] See your enrolled course with progress
- [ ] Click "Unenroll" button
- [ ] Confirm in dialog
- [ ] Course removed from "My Courses"

✅ If all steps work, enrollment system is fully functional!

---

## Code Files

**Key Files for Enrollment:**
- `src/features/enrollments/enrollmentSlice.jsx` - Redux state management
- `src/features/enrollments/EnrolledCourses.jsx` - View your enrollments page
- `src/features/courses/CourseCard.jsx` - Enroll/Unenroll buttons
- `src/features/courses/Courses.jsx` - Courses list page
- `src/app/store.js` - Redux store configuration
- `src/App.jsx` - Routing configuration
- `mock-backend/db.json` - Database with enrollments table
