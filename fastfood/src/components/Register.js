import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(135deg, #1a0033 0%, #3b0078 60%, #000 100%)",
      }}
    >
      <div
        className="register-box"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          padding: "50px",
          width: "400px",
          color: "white",
          boxShadow: "0 0 25px rgba(255, 215, 0, 0.25)",
          border: "1px solid rgba(255,215,0,0.3)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#ffd700",
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "30px",
            textShadow: "0 0 15px rgba(255, 215, 0, 0.6)",
          }}
        >
          Đăng ký tài khoản 🍟
        </h2>

        <form>
          <input
            type="text"
            placeholder="Họ và tên"
            style={inputStyle}
            required
          />
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            style={inputStyle}
            required
          />
          <button style={buttonStyle}>Tạo tài khoản</button>
        </form>

        <p style={{ marginTop: "20px", color: "#d1c6ff" }}>
          Đã có tài khoản?{" "}
          <Link
            to="/dang-nhap"
            style={{ color: "#ffcc00", textDecoration: "underline" }}
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: "15px",
  padding: "12px 15px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 215, 0, 0.4)",
  background: "rgba(255,255,255,0.07)",
  color: "#fff",
  outline: "none",
  fontSize: "0.95rem",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background:
    "linear-gradient(90deg, #ffd700 0%, #ff33cc 50%, #ffd700 100%)",
  border: "none",
  borderRadius: "12px",
  color: "#1a0033",
  fontWeight: "700",
  cursor: "pointer",
  transition: "0.3s",
};
