import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false); // ⏳ Trạng thái loading
  const [form, setForm] = useState({
    name: "",
    card: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  // 🧾 Lấy dữ liệu giỏ hàng
  useEffect(() => {
    const stateCart = location.state?.cart;
    if (stateCart && stateCart.length > 0) {
      setCart(stateCart);
    } else {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(stored);
    }
  }, [location.state]);

  // 💰 Tính tổng tiền
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // 🧍‍♂️ Cập nhật dữ liệu form
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 💳 Xử lý thanh toán (có hiệu ứng loading)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Giỏ hàng đang trống! Quay lại chọn món nhé 🍔");
      return navigate("/menu");
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(
        `💳 Thanh toán thành công!\n\nCảm ơn ${form.name} đã đặt hàng tại TL-FastFood!\nTổng: ${total.toLocaleString()}đ`
      );
      localStorage.removeItem("cart");
      navigate("/");
    }, 1500); // ⏱️ Giả lập xử lý thanh toán trong 1.5 giây
  };

  // Nếu giỏ hàng trống
  if (cart.length === 0 && !loading) {
    return (
      <div className="text-center text-light py-5">
        <h3>😢 Không có sản phẩm nào để thanh toán.</h3>
        <button
          onClick={() => navigate("/menu")}
          className="btn mt-3"
          style={{
            background: "linear-gradient(90deg,#FFD700,#FF33CC)",
            color: "#1a0033",
            borderRadius: "10px",
            border: "none",
          }}
        >
          ➜ Quay lại thực đơn
        </button>
      </div>
    );
  }

  // Nếu đang xử lý thanh toán
  if (loading) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          height: "80vh",
          color: "#FFD700",
          background:
            "linear-gradient(135deg, rgba(26,0,51,0.95), rgba(59,0,120,0.9))",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{
            width: "70px",
            height: "70px",
            border: "6px solid rgba(255,215,0,0.3)",
            borderTopColor: "#FF33CC",
            borderRadius: "50%",
            marginBottom: "20px",
          }}
        ></motion.div>
        <h4 className="fw-bold">Đang xử lý thanh toán...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5 text-light">
      <motion.h2
        className="fw-bold text-center mb-4"
        style={{ color: "#FFD700", textShadow: "0 0 10px rgba(255,215,0,0.5)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💳 Xác nhận thanh toán
      </motion.h2>

      <div className="row justify-content-center">
        {/* Tóm tắt đơn hàng */}
        <motion.div
          className="col-md-5 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div
            className="p-4 rounded"
            style={{
              background:
                "linear-gradient(145deg, rgba(59,0,120,0.9), rgba(26,0,51,0.9))",
              border: "1px solid rgba(255,215,0,0.3)",
              boxShadow: "0 0 20px rgba(255,215,0,0.3)",
            }}
          >
            <h5 className="text-warning mb-3">🛍️ Đơn hàng của bạn</h5>
            {cart.map((item, i) => (
              <div
                key={i}
                className="d-flex justify-content-between mb-2"
                style={{ fontSize: "0.95rem" }}
              >
                <span>
                  {item.name} × {item.quantity || 1}
                </span>
                <span>
                  {(item.price * (item.quantity || 1)).toLocaleString()}đ
                </span>
              </div>
            ))}
            <hr style={{ borderColor: "rgba(255,215,0,0.3)" }} />
            <h5 className="text-end text-warning">
              Tổng cộng: {total.toLocaleString()}đ
            </h5>
          </div>
        </motion.div>

        {/* Form thanh toán */}
        <motion.div
          className="col-md-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div
            className="p-4 rounded"
            style={{
              background:
                "linear-gradient(145deg, rgba(59,0,120,0.9), rgba(26,0,51,0.9))",
              border: "1px solid rgba(255,215,0,0.3)",
              boxShadow: "0 0 20px rgba(255,215,0,0.3)",
            }}
          >
            <h5 className="text-warning mb-3">💳 Thông tin thanh toán</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Số thẻ</label>
                <input
                  type="text"
                  name="card"
                  className="form-control"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  value={form.card}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Hết hạn</label>
                  <input
                    type="text"
                    name="expiry"
                    className="form-control"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    className="form-control"
                    maxLength="3"
                    value={form.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Địa chỉ giao hàng</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="btn fw-bold w-100 mt-3"
                style={{
                  background: "linear-gradient(90deg,#FFD700,#FF33CC)",
                  color: "#1a0033",
                  borderRadius: "10px",
                  border: "none",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Xác nhận thanh toán
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
