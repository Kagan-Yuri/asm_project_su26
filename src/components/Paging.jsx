import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

function Paging(props) {
  const data = props.data || [];
  const renderItem = props.renderItem;
  const title = props.title || "Danh sách";

  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const stIndex = (curPage - 1) * itemsPerPage;
  const curData = data.slice(stIndex, stIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  function handleItemsPerPageChange(e) {
    setItemsPerPage(Number(e.target.value));
    setCurPage(1);
  }

  function goToPrevPage() {
    setCurPage(curPage - 1);
  }

  function goToNextPage() {
    setCurPage(curPage + 1);
  }

  // Hàm tạo function xử lý sự kiện click cho từng trang
  function createPageHandler(index) {
    return function() {
      setCurPage(index + 1);
    };
  }

  // Tạo mảng các nút trang bằng vòng lặp for (không dùng map với hàm mũi tên)
  const pageButtons = [];
  for (let i = 0; i < totalPages; i++) {
    pageButtons.push(
      <Button
        key={i}
        variant={curPage === i + 1 ? "primary" : "outline-primary"}
        onClick={createPageHandler(i)}
      >
        {i + 1}
      </Button>
    );
  }

  return (
    <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>{title}</h1>

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
                <option value={6}>6 mục</option>
                <option value={10}>10 mục</option>
                <option value={data.length}>Tất cả</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {/* Render dữ liệu dựa vào hàm được truyền từ component cha */}
        {curData.map(renderItem)}
      </Row>

      <Row className="justify-content-center mt-3">
        <Col
          md={8}
          className="d-flex justify-content-center align-items-center"
          style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="secondary"
            disabled={curPage === 1}
            onClick={goToPrevPage}
          >
            Prev
          </Button>

          {pageButtons}

          <Button
            variant="secondary"
            disabled={curPage === totalPages || totalPages === 0}
            onClick={goToNextPage}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Paging;