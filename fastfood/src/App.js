import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// 🧩 Import các component
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Specials from "./components/Specials";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import FoodDetail from "./components/FoodDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Payment from "./components/Payment"; // ✅ Trang thanh toán mới

// 🎨 CSS tổng
import "../src/styles/luxury.css";

// ⚙️ Layout chung cho toàn bộ trang
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh" }}>{children}</div>
      <Footer />
    </>
  );
}

// 🚀 Khai báo router (chuẩn React Router DOM v7)
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Trang chủ */}
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
            <Specials />
          </Layout>
        }
      />

      {/* Trang chi tiết món ăn */}
      <Route
        path="/food/:id"
        element={
          <Layout>
            <FoodDetail />
          </Layout>
        }
      />

      {/* Trang thực đơn */}
      <Route
        path="/menu"
        element={
          <Layout>
            <Menu />
          </Layout>
        }
      />

      {/* Trang giỏ hàng */}
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />

      {/* ✅ Trang thanh toán */}
      <Route
        path="/payment"
        element={
          <Layout>
            <Payment />
          </Layout>
        }
      />

      {/* Trang đăng nhập */}
      <Route
        path="/dang-nhap"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      {/* Trang đăng ký */}
      <Route
        path="/dang-ky"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />

      {/* 🧭 Trang 404 */}
      <Route
        path="*"
        element={
          <Layout>
            <div
              style={{
                textAlign: "center",
                padding: "100px",
                color: "#ffd700",
                background: "linear-gradient(135deg, #1a0033, #3b0078)",
              }}
            >
              <h2>404 - Trang không tồn tại 😢</h2>
              <p>
                Vui lòng quay lại{" "}
                <a href="/" style={{ color: "#ff33cc" }}>
                  trang chủ
                </a>.
              </p>
            </div>
          </Layout>
        }
      />
    </>
  )
);

// 🧠 App chính
export default function App() {
  return <RouterProvider router={router} />;
}
