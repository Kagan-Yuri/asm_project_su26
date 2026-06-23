import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Paging() {
  const data = [
    "Java",
    "Python",
    "C++",
    "JavaScript",
    "React",
    "NodeJS",
    "PHP",
    "C#",
    "Go",
    "Ruby",
  ];

  const [curPage, setCurPage] = useState(1);
  
  // Đưa itemsPerPage vào state để Form có thể thay đổi được giá trị này
  const [itemsPerPage, setItemsPerPage] = useState(3); 

  const stIndex = (curPage - 1) * itemsPerPage;
  // slice(startIndex, startIndex + itemsPerPage) sẽ trả về một mảng con của data, bắt đầu từ startIndex và kết thúc tại startIndex + itemsPerPage (không bao gồm phần tử tại startIndex + itemsPerPage).
  const curData = data.slice(stIndex, stIndex + itemsPerPage);
  // ceill() sẽ làm tròn lên số thập phân lên số nguyên gần nhất. Ví dụ: Math.ceil(4.2) sẽ trả về 5, Math.ceil(4.8) cũng sẽ trả về 5, và Math.ceil(4) sẽ trả về 4.
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Hàm xử lý khi thay đổi số lượng item trên mỗi trang
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurPage(1); // Reset về trang 1 khi người dùng đổi số lượng hiển thị
  };

  return (
    <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Pagination Example</h1>

      {/* 1. Sử dụng FORM: Cho phép chọn số lượng item mỗi trang */}
      <Row className="justify-content-center mb-4">
        <Col md={4} sm={6}>
          <Form>
            <Form.Group controlId="itemsPerPageSelect">
              <Form.Label style={{ fontWeight: "bold" }}>Số lượng hiển thị:</Form.Label>
              <Form.Select 
                value={itemsPerPage} 
                onChange={handleItemsPerPageChange}
                aria-label="Chọn số lượng item mỗi trang"
              >
                <option value={3}>3 mục</option>
                <option value={5}>5 mục</option>
                <option value={10}>10 mục (Tất cả)</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {/* 2. Sử dụng CARD: Trình bày dữ liệu đẹp mắt hơn */}
      <Row className="justify-content-center">
        {curData.map((item, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4">
            <Card bg="dark" text="white" className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title style={{ color: "#0d6efd", fontSize: "1.5rem" }}>
                  {item}
                </Card.Title>
                <Card.Text>Ngôn ngữ / Công nghệ</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">ID: {stIndex + index + 1}</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 3. Phần điều hướng Button (đã căn chỉnh lại CSS bằng className) */}
      <Row className="justify-content-center mt-3">
        <Col
          md={8}
          className="d-flex justify-content-center align-items-center"
          style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            gap: "10px", // Tạo khoảng cách đều giữa các nút
            flexWrap: "wrap"
          }}
        >
          <Button
            variant="secondary"
            disabled={curPage === 1}
            onClick={() => setCurPage(curPage - 1)}
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant={curPage === index + 1 ? "primary" : "outline-primary"}
              onClick={() => setCurPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="secondary"
            disabled={curPage === totalPages || totalPages === 0}
            onClick={() => setCurPage(curPage + 1)}
          >
            Next
          </Button>
          
        </Col>
      </Row>
    </Container>
  );
}

export default Paging;