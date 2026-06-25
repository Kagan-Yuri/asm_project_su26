import React, { useState, useEffect } from "react";
import Paging from "./Paging";
import { Col, Card, Spinner, Alert, Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // Lấy thông tin user từ localStorage
  const currentUser = localStorage.getItem("loggedInUser"); 

  function handleLogout() {
    // Xóa user khỏi bộ nhớ và đẩy về trang đăng nhập
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  useEffect(function() {
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:9999/books");
        if (!response.ok) {
          throw new Error("Lỗi khi kết nối đến máy chủ");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []); 

  function renderBookItem(book, index) {
    return (
      <Col md={4} sm={6} xs={12} key={book.id} className="mb-4">
        <Card bg="light" text="dark" className="h-100 shadow-sm text-center">
          <Card.Body>
            <Card.Title style={{ color: "#0d6efd", fontSize: "1.2rem", fontWeight: "bold" }}>
              Mã Sách: {book.id}
            </Card.Title>
            <Card.Text>Cửa hàng ID: {book.shopId}</Card.Text>
            <Card.Text style={{ fontWeight: "bold", color: "#dc3545" }}>
              Giá thuê: {book.price.toLocaleString()} VNĐ
            </Card.Text>
            <Card.Text style={{ fontSize: "0.9rem", color: "gray" }}>
              Kho: {book.stock} cuốn | Đã thuê: {book.rentCount} lần
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return (
    <>
      {/* Thanh điều hướng ở trên đầu trang */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Hệ Thống Thuê Sách</Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            {currentUser ? (
              <>
                <span className="text-light me-3">
                  Chào, <strong>{currentUser}</strong>
                </span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link to="/" className="btn btn-outline-light btn-sm me-2">Đăng nhập</Link>
                <Link to="/register" className="btn btn-light btn-sm">Đăng ký</Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Hiển thị lỗi hoặc loading */}
      {loading && (
        <div className="text-center" style={{ marginTop: "100px" }}>
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Đang tải dữ liệu từ server...</p>
        </div>
      )}

      {error && (
        <div className="container mt-5">
          <Alert variant="danger">
            <strong>Đã xảy ra lỗi:</strong> {error}
          </Alert>
        </div>
      )}

      {/* Nội dung chính của trang (Paging) */}
      {!loading && !error && (
        <Paging
          title="Danh Sách Phân Trang"
          data={books}
          renderItem={renderBookItem}
        />
      )}
    </>
  );
}

export default BookList;