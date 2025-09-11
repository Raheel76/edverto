import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  AuthLayout,
  ForgotPassword,
  Login,
  ResetPassword,
  Signup,
  VerifyOtp,
} from "./auth";

import {
  About,
  ContactUs,
  CourseDetail,
  Courses,
  HomePage,
  OurTeachers,
  Pricing,
} from "./pages";
import { UserLayout } from "./components";
import {
  AdminAnalytics,
  AdminDashboard,
  AdminLayout,
  AdminProfile,
  PaymentManagement,
  UserManagement,
} from "./pages/Admin";
import CourseManagement from "./pages/Admin/CourseManagement";
import Features from "./pages/Admin/Features";
import {
  CourseCatalog,
  ProgressTracking,
  StduentWallet,
  StudentAssignment,
  StudentDashboard,
  StudentLayout,
  StudentProfile,
} from "./pages/Student";
import { Communications, CreateCourse, LiveClasses, Quizzes, StudentAnalytics, TeacherCourses, TeacherLayout, TeacherProfile, TeacherWallet } from "./pages/Teacher";
import TeacherDashboard from "./pages/Teacher/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path:"/auth",
      element: <AuthLayout/>,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "forgot", element: <ForgotPassword /> },
        { path: "otp", element: <VerifyOtp /> },
        { path: "reset", element: <ResetPassword /> },
      ]
    },
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "/about", element: <About /> },
        { path: "/courses", element: <Courses /> },
        { path: "/courses/:id", element: <CourseDetail /> },
        { path: "/contact", element: <ContactUs /> },
        { path: "/teachers", element: <OurTeachers /> },
        { path: "/pricing", element: <Pricing /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "", element: <AdminDashboard /> },
        { path: "/admin/users", element: <UserManagement /> },
        { path: "/admin/courses", element: <CourseManagement /> },
        { path: "/admin/analytics", element: <AdminAnalytics /> },
        { path: "/admin/payments", element: <PaymentManagement /> },
        { path: "/admin/ai-features", element: <Features /> },
        { path: "/admin/profile", element: <AdminProfile /> },
      ],
    },
    {
      path: "/student",
      element: <StudentLayout />,
      children: [
        { index: true, element: <StudentDashboard /> },
        { path: "courses-catalog", element: <CourseCatalog /> },
        { path: "courses-catalog/:id", element: <CourseDetail /> },
        { path: "assignments", element: <StudentAssignment /> },
        { path: "assignments/:id", element: <CourseDetail /> },
        { path: "progress", element: <ProgressTracking /> },
        { path: "profile", element: <StudentProfile /> },
        { path: "wallet", element: <StduentWallet /> },
      ],
    },
    {
      path: "/teacher",
      element: <TeacherLayout />,
      children: [
        { index: true, element: <TeacherDashboard /> },
        { path: "courses", element: <TeacherCourses /> },
        { path: "courses/create", element: <CreateCourse /> },
        { path: "quizzes", element: <Quizzes /> },
        { path: "analytics", element: <StudentAnalytics /> },
        { path: "live-classes", element: <LiveClasses /> },
        { path: "communications", element: <Communications /> },
        { path: "profile", element: <TeacherProfile /> },
        { path: "wallet", element: <TeacherWallet /> },

      ],
    },
    {
      path: "*",
      // element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
