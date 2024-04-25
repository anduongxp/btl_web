const sql = require("mssql");

// -------------cẤU HÌNH SQL-----------

const config = {
  user: "sa",
  password: "", //Tự làm mật khẩu server của cá nhân
  server: "", //Tên Server cá nhân
  database: "BTLWEBS", // Tên CSDL đã đặt trong SQL
  options: {
    trustServerCertificate: true, // fix lỗi self-signed certificate
  },
};
module.exports = config;
