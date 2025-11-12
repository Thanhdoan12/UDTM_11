import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [showCart, setShowCart] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // Hiệu ứng khi cuộn trang
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hiệu ứng rung nhẹ khi giỏ hàng thay đổi
  useEffect(() => {
    if (cartCount > 0) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "shadow-lg" : ""}`}
      style={{
        background: isScrolled
          ? "rgba(26,0,51,0.95)"
          : "linear-gradient(90deg, rgba(59,0,120,0.9), rgba(26,0,51,0.9))",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,215,0,0.3)",
        boxShadow: isScrolled ? "0 0 15px rgba(255,215,0,0.2)" : "none",
        transition: "all 0.4s ease",
        zIndex: 1000,
      }}
    >
      <div className="container">
        {/* Logo */}
        <NavLink
          to="/"
          className="navbar-brand fw-bold d-flex align-items-center"
          style={{
            color: "#FFD700",
            textShadow: "0 0 10px rgba(255,215,0,0.5)",
            letterSpacing: "1px",
          }}
        >
          <img
            src="https://i.imgur.com/7b1xwZP.png"
            alt="logo"
            width="38"
            height="38"
            className="me-2 rounded-circle"
            style={{ boxShadow: "0 0 10px rgba(255,215,0,0.6)" }}
          />
          TL-FastFood
        </NavLink>

        {/* Toggle mobile */}
        <button
          className="navbar-toggler text-light border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        {/* Menu chính */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-light fw-semibold" to="/">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light fw-semibold" to="/menu">
                Thực đơn
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light fw-semibold" to="/cart">
                Giỏ hàng
              </NavLink>
            </li>
            {/* 🔥 Thêm mục Thanh toán mới */}
            <li className="nav-item">
              <NavLink className="nav-link text-light fw-semibold" to="/payment">
                Thanh toán
              </NavLink>
            </li>
          </ul>

          {/* Login / Register / Cart / Payment */}
          <div className="d-flex align-items-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(90deg,#FFD700,#FF33CC)",
              }}
              whileTap={{ scale: 0.95 }}
              className="btn fw-bold text-dark me-2"
              style={{
                background: "linear-gradient(90deg,#FFD700,#FF33CC)",
                border: "none",
                borderRadius: "20px",
              }}
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                background: "rgba(255,255,255,0.2)",
                color: "#FFD700",
              }}
              whileTap={{ scale: 0.95 }}
              className="btn text-white fw-bold me-3"
              style={{
                border: "1px solid rgba(255,215,0,0.5)",
                borderRadius: "20px",
              }}
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </motion.button>

            {/* Cart Icon */}
            <div
              className="position-relative me-3"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={() => setShowCart(false)}
              onClick={() => navigate("/cart")}
            >
              <motion.div
                animate={shake ? { rotate: [0, -15, 15, -10, 10, 0] } : { rotate: 0 }}
                transition={{ duration: 0.6 }}
              >
                <FaShoppingCart className="fs-4" style={{ color: "#FFD700" }} />
              </motion.div>

              {/* Badge */}
              <span
                className="badge bg-warning text-dark position-absolute top-0 start-100 translate-middle"
                style={{
                  fontSize: "0.7rem",
                  borderRadius: "50%",
                  boxShadow: "0 0 6px rgba(255,215,0,0.4)",
                }}
              >
                {cartCount}
              </span>

              {/* Popup giỏ hàng mini */}
              <AnimatePresence>
                {showCart && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="position-absolute end-0 mt-2 p-3 rounded"
                    style={{
                      width: "230px",
                      top: "100%",
                      background:
                        "linear-gradient(145deg, rgba(59,0,120,0.95), rgba(26,0,51,0.95))",
                      color: "#fff",
                      border: "1px solid rgba(255,215,0,0.2)",
                      boxShadow: "0 0 20px rgba(255,215,0,0.3)",
                      zIndex: 999,
                    }}
                  >
                    <h6 className="fw-bold mb-2" style={{ color: "#FFD700" }}>
                      Giỏ hàng 🛍️
                    </h6>
                    <p className="small mb-1">🍔 Burger Bò Phô Mai</p>
                    <p className="small mb-1">🍟 Khoai Tây Chiên</p>
                    <hr style={{ borderColor: "rgba(255,215,0,0.2)" }} />
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        background: "linear-gradient(90deg,#FFD700,#FF33CC)",
                      }}
                      className="btn btn-sm fw-bold w-100 text-white"
                      style={{
                        background: "linear-gradient(90deg,#FFD700,#FF33CC)",
                        border: "none",
                        borderRadius: "10px",
                      }}
                      onClick={() => navigate("/cart")}
                    >
                      Xem Giỏ Hàng
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 💳 Nút Thanh toán */}
            <motion.button
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(90deg,#FF33CC,#FFD700)",
              }}
              whileTap={{ scale: 0.95 }}
              className="btn text-dark fw-bold d-flex align-items-center"
              style={{
                background: "linear-gradient(90deg,#FFD700,#FF33CC)",
                border: "none",
                borderRadius: "20px",
                boxShadow: "0 0 10px rgba(255,215,0,0.4)",
              }}
              onClick={() => navigate("/payment")}
            >
              <FaCreditCard className="me-2" /> Thanh toán
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
