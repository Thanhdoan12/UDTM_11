// src/services/foodService.js
import axios from "axios";

// Lấy URL backend từ .env (ưu tiên dùng biến môi trường)
const BASE_URL =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

/**
 * 🥗 Lấy danh sách món ăn
 * @param {Object} options
 * @param {string} options.search - Từ khóa tìm kiếm
 * @param {string} options.category - Loại món ăn (Burger, Drink,...)
 * @param {number} options.page - Trang hiện tại
 * @param {number} options.limit - Giới hạn số món
 * @returns {Promise<{data: [], total: number}>}
 */
export const getAllFoods = async ({
  search = "",
  category = "",
  page = 1,
  limit = 50,
} = {}) => {
  try {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    params.page = page;
    params.limit = limit;

    const res = await axios.get(`${BASE_URL}/api/foods`, { params });
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API getAllFoods:", error.message);
    return { data: [], total: 0 };
  }
};

/**
 * 🍔 Lấy chi tiết 1 món ăn theo ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const getFoodById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/foods/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Lỗi khi lấy món ăn ID=${id}:`, error.message);
    return null;
  }
};

/**
 * 🍟 Tạo món ăn mới (dành cho Admin)
 * @param {Object} newFood
 * @returns {Promise<Object>}
 */
export const createFood = async (newFood) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/foods`, newFood);
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi tạo món ăn:", error.message);
    return null;
  }
};

/**
 * ✏️ Cập nhật món ăn theo ID
 * @param {string} id
 * @param {Object} updateData
 * @returns {Promise<Object>}
 */
export const updateFood = async (id, updateData) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/foods/${id}`, updateData);
    return res.data;
  } catch (error) {
    console.error(`❌ Lỗi khi cập nhật món ăn ID=${id}:`, error.message);
    return null;
  }
};

/**
 * ❌ Xóa món ăn
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const deleteFood = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/foods/${id}`);
    return true;
  } catch (error) {
    console.error(`❌ Lỗi khi xóa món ăn ID=${id}:`, error.message);
    return false;
  }
};
