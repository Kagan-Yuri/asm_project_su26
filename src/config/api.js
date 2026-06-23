import axios from 'axios';

const API = axios.create({
    baseURL:'http://localhost:9999'
});
// Lấy dữ liệu
export const getUsers = () => API.get('/users');
export const getUserinformations = () => API.get('/userinformations');
export const getShops = () => API.get('/shops');
export const getBooks = () => API.get('/books');
export const getBookInformations = () => API.get('/bookinformations');
export const getOrders = () => API.get('/orders');
export const getPayments = () => API.get('/payments');

// Xóa
export const deleteUser = (id) => API.delete(`/users/${id}`);
// export const getUsers = () => API.delete('/users');
export const deleteBook = (id) => API.delete(`/books/${id}`);
// export const getUsers = () => API.delete('/users');
// export const getUsers = () => API.get('/users');

//  Thêm
export const addUser = (username) => API.post('/users', username);
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
// Get product by Id
export const getProductById = (id) => API.get(`/Product/${id}`);
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
// Cập nhật
export const updateProduct = (id, product) => API.put(`/Product/${id}`, product);
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');
export const getUsers = () => API.get('/users');