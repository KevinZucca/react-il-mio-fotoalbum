import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/guest/HomePage";
import About from "./pages/guest/About";
import { PhotosProvider } from "./contexts/PhotosContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/admin/Dashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import PrivateRoutes from "./middlewares/PrivateRoutes";
import EditPhoto from "./pages/admin/EditPhoto";
import JWTExpired from "./pages/guest/JWTExpired";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <PhotosProvider>
          <Routes>
            {/* public routes */}
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/about" element={<About />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/jwt-expired" element={<JWTExpired />}></Route>

            {/* private routes */}

            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <PrivateRoutes />
                </AdminLayout>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="photos" element={<Dashboard />} />
              <Route path="photos/:id" element={<EditPhoto />} />
              <Route path="categories" element={<AdminCategories />} />
            </Route>
          </Routes>
        </PhotosProvider>
      </AuthProvider>
    </Router>
  );
}
