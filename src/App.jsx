import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import StudentDashboard from './components/StudentDashboard'
import Admin from './components/Admin'
import Results from './components/Result'
import ManageClasses from './components/ClassManagement'
import Students from './components/Students'
import Settings from './components/Settings'
import StudentForm from './components/StudentFrom';
import InquiryForm from './components/InquiryForm';
import ContactForm from './components/Contact';
import { Course } from './components/Course';
import { CourseDashboard } from './components/Courses/CourseDashboard';
import { AccessCourse } from './components/Courses/AccessCourse';
import ThemeContext from './components/context/ThemeContext';
import { useEffect, useState } from 'react';
import Faculties from './components/Faculties';
import AdminClassManagement from './components/AdminClassManagement';
import TestManagement from './components/TestManagement';
import TestQuestions from './components/TestQuestions';
import StartMockTest from './components/ViewMockTestQuestions';
import ViewMockTestQuestions from './components/ViewMockTestQuestions';
import StartMockTestStudent from './components/StudentDashboard/StartMockTestStudent';
import MockTestScore from './components/StudentDashboard/MockTestScore';
import FacultyLogin from './components/faculties/FacultyLogin';
import FacultyDashboard from './components/faculties/FacultyDashboard';

const App = () => {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [bgtext, setbgtext] = useState('white');

  const phone = localStorage.getItem("phone")
  useEffect(() => {
    localStorage.setItem("theme", theme);

  }, [theme]);
  const bgclass = theme === 'light' ? 'bg-white' : 'bg-black';
  const mytext = theme === 'light' ? 'black' : 'white'

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme, bgtext, setbgtext }}>
        <div className={`${bgclass} text-${mytext} min-h-screen`}>
          <ScrollToTop />
          <Navbar onLogout={() => console.log("Logged out")} />
          <Routes>
            <Route path="/inquiry" element={<InquiryForm />} />
            <Route path="/inquiry" element={<ContactForm />} />
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/studentform' element={<StudentForm />} />
            <Route path='/studentdashboard' element={<StudentDashboard />} />
            <Route path='/admin/dashboard' element={<Admin />} />
            <Route path="/results" element={<Results />} />
            <Route path="/manage-classes" element={<ManageClasses />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/faculties" element={<Faculties />} />
            <Route path="/settings" element={<Settings />} />
            <Route path='/courses' element={<Course />} />
            <Route path='/course/PremiumDashboard' element={<CourseDashboard />} />
            <Route path='/accesscourse' element={<AccessCourse />} />
            <Route path='/admin/classes' element={<AdminClassManagement />} />
            <Route path='/admin/tests' element={<TestManagement />} />
            <Route path='/admin/questionTest' element={<TestQuestions />} />
            <Route path='/admin/viewmockTestQuestions' element={<ViewMockTestQuestions />} />
            <Route path='/startTest' element={<StartMockTestStudent />} />
            <Route path='/faculty/login' element={<FacultyLogin />} />
            <Route path='/faculty/dashboard' element={<FacultyDashboard />} />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App;
