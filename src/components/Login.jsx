import React, { useState, useEffect, useRef } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { animate } from "animejs";

function Login() {
  const [exists, setExist] = useState(true);
  const [registered, isRegistered] = useState(false);
  const [users, setUsers] = useState("");
  
  // Quản lý state của form input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Quản lý state thông báo lỗi/thành công để hiển thị ra UI
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Tham chiếu đến phần tử Card để điều khiển animation
  const cardRef = useRef(null);

  // Chạy hiệu ứng khi component vừa mount
  useEffect(() => {
    animate(cardRef.current, {
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1000
    });
  }, []);

  // Hàm tạo hiệu ứng rung lắc khi có lỗi
  const shakeAnimation = () => {
    animate(cardRef.current, {
      translateX: [-10, 10, -10, 10, 0],
      duration: 400
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload lại trang khi submit form
    
    if (!username || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      setIsSuccess(false);
      shakeAnimation(); // Gọi hiệu ứng rung khi thiếu thông tin
      return;
    }
  
    try {
      const res = await axios.get(`http://localhost:9999/users?username=${username}`);
      const foundUsers = res.data;

      if (foundUsers.length > 0) {
        const user = foundUsers[0];
        if (user.password === password) {
          setMessage("Đăng nhập thành công!");
          setIsSuccess(true);
        } else {
          setMessage("Sai mật khẩu, vui lòng thử lại!");
          setIsSuccess(false);
          shakeAnimation(); // Gọi hiệu ứng rung khi sai mật khẩu
        }
      } else {
        const newUser = {
          username: username, 
          password: password,
          role: "customer"
        };  
        await axios.post("http://localhost:9999/users", newUser);
        setMessage("Tài khoản chưa tồn tại. Hệ thống đã tự động tạo mới và đăng nhập!");
        setIsSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setMessage("Có lỗi xảy ra khi kết nối đến server.");
      setIsSuccess(false);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100" 
      style={{ backgroundColor: "#2e7d32" }} 
    >
      <Card ref={cardRef} className="p-4 shadow-lg" style={{ width: '400px', border: 'none' }}>
        <h3 className="text-center mb-4 font-weight-bold" style={{ color: '#2e7d32' }}>
          Đăng nhập / Đăng ký
        </h3>
        
        {/* Hiển thị thông báo nếu có */}
        {message && (
          <Alert variant={isSuccess ? "success" : "danger"}>
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Nhập username của bạn"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Nhập mật khẩu"
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="success" type="submit" style={{ backgroundColor: '#2e7d32', border: 'none' }}> 
              XÁC NHẬN
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;