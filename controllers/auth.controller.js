import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Đăng ký người dùng
export const register = async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra xem email và password có tồn tại không
  if (!email || !password) {
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
  }

  try {
    // Kiểm tra nếu người dùng đã tồn tại
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Người dùng đã tồn tại" });
    }

    // Tạo người dùng mới mà không mã hóa mật khẩu
    const newUser = new User({ email, password });  // Lưu mật khẩu thô
    await newUser.save();

    res.status(201).json({ message: "Người dùng đã được tạo thành công" });

  } catch (error) {
    console.error(error); // In ra lỗi chi tiết
    res.status(500).json({ message: "Đã có lỗi xảy ra", error: error.message });
  }
};

// Đăng nhập người dùng
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại!" });
    }

    // Kiểm tra mật khẩu người dùng nhập vào với mật khẩu đã lưu (so sánh trực tiếp)
    if (password !== user.password) { // So sánh mật khẩu thô
      return res.status(400).json({ message: "Mật khẩu không đúng!" });
    }

    // Tạo JWT token sau khi xác thực thành công
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" } // Token hết hạn sau 1 giờ
    );

    // Trả về kết quả và token
    res.status(200).json({ 
      message: "Đăng nhập thành công!",
      result: user, 
      token 
    });

  } catch (error) {
    // Lỗi hệ thống
    console.error(error);
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};
