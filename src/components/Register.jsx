import React, { useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  // Quản lý state cho các trường nhập liệu
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Quản lý trạng thái thông báo
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  // Các hàm xử lý sự kiện thay đổi input (không dùng mũi tên)
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  // Hàm xử lý gửi form
  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Kiểm tra rỗng
    if (!username || !email || !password || !confirmPassword) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      setIsSuccess(false);
      return;
    }

    // 2. Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      setIsSuccess(false);
      return;
    }

    try {
      // 3. Kiểm tra xem username đã tồn tại trong db.json chưa
      const res = await axios.get(`http://localhost:9999/users?username=${username}`);
      const foundUsers = res.data;

      if (foundUsers.length > 0) {
        setMessage("Tên đăng nhập đã tồn tại, vui lòng chọn tên khác!");
        setIsSuccess(false);
        return;
      }

      // 4. Tạo object user mới (role mặc định là customer)
      const newUser = {
        username: username,
        email: email,
        password: password,
        role: "customer"
      };

      // 5. Gửi request POST để lưu vào db.json
      await axios.post("http://localhost:9999/users", newUser);
      
      setMessage("Đăng ký thành công! Đang chuyển hướng về trang đăng nhập...");
      setIsSuccess(true);

      // 6. Chuyển hướng về trang Login sau 1.5 giây
      setTimeout(function() {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.log(err);
      setMessage("Có lỗi xảy ra khi kết nối đến server.");
      setIsSuccess(false);
    }
  }

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100" 
      style={{ backgroundColor: "#2e7d32" }} 
    >
      <Card className="p-4 shadow-lg" style={{ width: '450px', border: 'none', borderRadius: '10px' }}>
        <h3 className="text-center mb-4 font-weight-bold" style={{ color: '#2e7d32' }}>
          Đăng Ký Tài Khoản
        </h3>
        
        {message && (
          <Alert variant={isSuccess ? "success" : "danger"}>
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập (Username):</Form.Label>
            <Form.Control 
              type="text" 
              value={username}
              onChange={handleUsernameChange} 
              placeholder="Nhập tên đăng nhập"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
              type="email" 
              value={email}
              onChange={handleEmailChange} 
              placeholder="Nhập địa chỉ email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control 
              type="password" 
              value={password}
              onChange={handlePasswordChange} 
              placeholder="Nhập mật khẩu"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Xác nhận mật khẩu:</Form.Label>
            <Form.Control 
              type="password" 
              value={confirmPassword}
              onChange={handleConfirmPasswordChange} 
              placeholder="Nhập lại mật khẩu"
            />
          </Form.Group>

          <div className="d-grid mb-3">
            <Button variant="success" type="submit" style={{ backgroundColor: '#2e7d32', border: 'none' }}> 
              ĐĂNG KÝ
            </Button>
          </div>
          
          <div className="text-center">
            <span className="text-muted">Đã có tài khoản? </span>
            <Link to="/" style={{ color: '#2e7d32', fontWeight: 'bold', textDecoration: 'none' }}>
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;