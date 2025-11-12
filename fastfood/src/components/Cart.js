import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // 📦 Lấy giỏ hàng từ localStorage khi load trang
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // ❌ Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 💰 Tính tổng tiền
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // 💳 Chuyển qua trang thanh toán
  const goToPayment = () => {
    if (cartItems.length === 0) {
      alert("🛍️ Giỏ hàng đang trống!");
      return;
    }
    // Gửi dữ liệu sang trang thanh toán
    navigate("/payment", { state: { cart: cartItems } });
  };

  return (
    <div
      className="container py-5 mt-5"
      style={{
        background:
          "linear-gradient(135deg, rgba(59,0,120,0.9), rgba(26,0,51,0.95))",
        borderRadius: "20px",
        padding: "40px",
        color: "#fff",
        boxShadow: "0 0 30px rgba(255,215,0,0.15)",
      }}
    >
      {/* Tiêu đề */}
      <motion.h2
        className="fw-bold mb-4 text-center"
        style={{
          color: "#FFD700",
          textShadow: "0 0 10px rgba(255,215,0,0.5)",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🛒 Giỏ hàng của bạn
      </motion.h2>

      {/* Nếu giỏ hàng trống */}
      {cartItems.length === 0 ? (
        <motion.div
          className="alert text-center"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "#FFD700",
            border: "1px solid rgba(255,215,0,0.3)",
            borderRadius: "15px",
            padding: "20px",
            fontWeight: 500,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Giỏ hàng của bạn đang trống 😢  
          <br />
          <a href="/menu" style={{ color: "#FF33CC", textDecoration: "none" }}>
            ➜ Quay lại thực đơn
          </a>
        </motion.div>
      ) : (
        // Nếu có sản phẩm
        <motion.div
          className="table-responsive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table
            className="table align-middle text-white"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 10px",
            }}
          >
            <thead style={{ color: "#FFD700" }}>
              <tr>
                <th>#</th>
                <th>Món ăn</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <motion.tr
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)",
                    transition: "0.3s",
                  }}
                  whileHover={{
                    background: "rgba(255,255,255,0.12)",
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td style={{ color: "#FF33CC" }}>
                    {item.price.toLocaleString()}đ
                  </td>
                  <td>{item.quantity || 1}</td>
                  <td style={{ color: "#FFD700" }}>
                    {(item.price * (item.quantity || 1)).toLocaleString()}đ
                  </td>
                  <td>
                    <button
                      className="btn btn-sm fw-bold"
                      style={{
                        background: "linear-gradient(90deg,#ff4d4d,#ff33cc)",
                        border: "none",
                        color: "#fff",
                        borderRadius: "10px",
                        padding: "6px 12px",
                      }}
                      onClick={() => removeItem(index)}
                    >
                      Xóa
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Tổng cộng + nút thanh toán */}
          <div className="text-end mt-4">
            <h5
              className="fw-bold"
              style={{
                color: "#FFD700",
                textShadow: "0 0 8px rgba(255,215,0,0.4)",
              }}
            >
              Tổng cộng:{" "}
              <span style={{ color: "#FF33CC" }}>
                {totalPrice.toLocaleString()}đ
              </span>
            </h5>
            <motion.button
              className="btn fw-bold mt-3"
              style={{
                background: "linear-gradient(90deg,#FFD700,#FF33CC)",
                color: "#fff",
                borderRadius: "30px",
                padding: "10px 30px",
                boxShadow: "0 0 15px rgba(255,215,0,0.3)",
                transition: "0.3s",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPayment}
            >
              💳 Thanh toán
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
