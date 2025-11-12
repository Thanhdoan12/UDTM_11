import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function FoodDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/foods/${id}`)
      .then((res) => setFood(res.data))
      .catch((err) => console.error("Lỗi khi tải chi tiết món ăn:", err));
  }, [id]);

  // Thêm vào giỏ hàng
  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = storedCart.find((item) => item._id === food._id);

    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else storedCart.push({ ...food, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(storedCart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!food)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="mt-3 text-light">Đang tải chi tiết món ăn...</p>
      </div>
    );

  return (
    <div
      className="container py-5"
      style={{
        color: "#fff",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(59,0,120,0.9), rgba(26,0,51,0.95))",
        borderRadius: "20px",
        boxShadow: "0 0 40px rgba(255,215,0,0.15)",
      }}
    >
      <div className="row justify-content-center align-items-center">
        <motion.div
          className="col-md-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={food.image}
            alt={food.name}
            className="img-fluid rounded shadow-lg mb-4"
            style={{
              borderRadius: "18px",
              boxShadow: "0 0 25px rgba(255,215,0,0.3)",
              maxHeight: "400px",
              objectFit: "cover",
            }}
            whileHover={{ scale: 1.05 }}
          />

          <h2
            className="fw-bold mb-3"
            style={{
              color: "#FFD700",
              textShadow: "0 0 15px rgba(255,215,0,0.5)",
            }}
          >
            {food.name}
          </h2>
          <p className="text-light mb-4">{food.description}</p>

          <h4 style={{ color: "#FF33CC" }}>
            💰 Giá: {food.price?.toLocaleString()}đ
          </h4>

          <p className="mt-2">
            <strong style={{ color: "#FFD700" }}>Danh mục:</strong>{" "}
            <span style={{ color: "#d8bfff" }}>{food.category}</span>
          </p>

          <p>
            <strong style={{ color: "#FFD700" }}>Đánh giá:</strong>{" "}
            <span style={{ color: "#ffcc33" }}>⭐ {food.rating}/5</span>
          </p>

          <motion.button
            className="btn fw-bold mt-3"
            onClick={addToCart}
            whileTap={{ scale: 0.95 }}
            style={{
              background: added
                ? "linear-gradient(90deg,#00ff99,#00cc66)"
                : "linear-gradient(90deg,#FFD700,#FF33CC)",
              border: "none",
              borderRadius: "30px",
              padding: "12px 40px",
              color: "#fff",
              boxShadow: "0 0 20px rgba(255,215,0,0.4)",
              transition: "0.3s",
            }}
          >
            {added ? "✅ Đã thêm vào giỏ hàng" : "🛒 Thêm vào giỏ hàng"}
          </motion.button>

          <div className="mt-4">
            <a
              href="/menu"
              style={{
                color: "#FFD700",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              ← Quay lại Thực đơn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
