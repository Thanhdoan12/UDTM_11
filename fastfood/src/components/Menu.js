import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState(["Tất cả"]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/foods");
        const data = res.data.data || [];
        setFoods(data);

        // ✅ Tự động lấy danh mục duy nhất từ database
        const uniqueCats = Array.from(new Set(data.map((item) => item.category)));
        setCategories(["Tất cả", ...uniqueCats]);
      } catch (err) {
        console.error("❌ Lỗi khi gọi API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods =
    selectedCategory === "Tất cả"
      ? foods
      : foods.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cartData.find((f) => f._id === item._id);
    if (existing) existing.quantity += 1;
    else cartData.push({ ...item, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cartData));
    alert(`✅ Đã thêm ${item.name} vào giỏ hàng!`);
  };

  const handleBuyNow = (item) => {
    localStorage.setItem("checkoutItem", JSON.stringify(item));
    navigate("/checkout");
  };

  const handleViewDetail = (id) => navigate(`/food/${id}`);

  if (loading)
    return (
      <div className="text-center mt-5 text-light">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="mt-3">Đang tải menu...</p>
      </div>
    );

  return (
    <div
      className="container py-5"
      style={{
        color: "#fff",
        background:
          "linear-gradient(135deg, rgba(59,0,120,0.9), rgba(26,0,51,0.95))",
        borderRadius: "20px",
        boxShadow: "0 0 40px rgba(255,215,0,0.15)",
      }}
    >
      <h2
        className="text-center fw-bold mb-2"
        style={{
          color: "#FFD700",
          textShadow: "0 0 10px rgba(255,215,0,0.5)",
        }}
      >
        🍔 Thực Đơn Sang Trọng
      </h2>
      <p className="text-center mb-4" style={{ color: "#d1c6ff" }}>
        Chọn món bạn thích — bấm{" "}
        <strong style={{ color: "#FF33CC" }}>Thêm</strong> để đặt nhanh
      </p>

      {/* Danh mục */}
      <div className="d-flex justify-content-center flex-wrap mb-5 gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${
              selectedCategory === cat
                ? "text-dark"
                : "text-warning border-warning"
            } fw-semibold rounded-pill px-3 py-1`}
            style={{
              background:
                selectedCategory === cat
                  ? "linear-gradient(90deg,#FFD700,#FF33CC)"
                  : "transparent",
              border:
                selectedCategory === cat
                  ? "none"
                  : "1px solid rgba(255,215,0,0.5)",
              boxShadow:
                selectedCategory === cat
                  ? "0 0 15px rgba(255,215,0,0.4)"
                  : "none",
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Danh sách món */}
      <div className="row justify-content-center">
        <AnimatePresence mode="wait">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="col-10 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(255,215,0,0.2)",
                  }}
                  className="card text-center"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(59,0,120,0.95), rgba(26,0,51,0.95))",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,215,0,0.15)",
                    color: "#fff",
                    cursor: "pointer",
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: "260px",
                  }}
                >
                  <motion.img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="card-img-top"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "18px",
                      borderTopRightRadius: "18px",
                      transition: "0.3s",
                    }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleViewDetail(item._id)}
                    onError={(e) => {
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/3595/3595455.png";
                    }}
                  />
                  <div className="card-body">
                    <h6
                      className="fw-bold"
                      style={{ color: "#FFD700", fontSize: "1.1rem" }}
                    >
                      {item.name}
                    </h6>

                    <div
                      className="mb-2"
                      style={{
                        fontSize: "0.85rem",
                        color: "#ffb3ff",
                        minHeight: "40px",
                      }}
                    >
                      {item.description?.length > 45
                        ? item.description.slice(0, 45) + "..."
                        : item.description}
                    </div>

                    <p className="text-light mb-2 fw-semibold">
                      💰 {item.price?.toLocaleString()}đ
                    </p>

                    <div className="d-flex justify-content-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{
                          scale: 1.05,
                          background:
                            "linear-gradient(90deg,#FFD700,#FF33CC,#FF33CC)",
                          color: "#fff",
                        }}
                        className="btn btn-outline-warning btn-sm rounded-pill px-3 fw-semibold"
                        onClick={() => handleAddToCart(item)}
                      >
                        🛒 Thêm
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{
                          scale: 1.05,
                          background:
                            "linear-gradient(90deg,#FF33CC,#FFD700)",
                          color: "#fff",
                        }}
                        className="btn btn-outline-warning btn-sm rounded-pill px-3 fw-semibold"
                        onClick={() => handleBuyNow(item)}
                      >
                        💳 Mua ngay
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-light fs-5">
              🍽 Không có món nào trong danh mục này!
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
