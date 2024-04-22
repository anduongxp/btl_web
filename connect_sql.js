const sql = require("mssql");

// -------------cẤU HÌNH SQL-----------

const config = {
  user: "sa",
  password: "TonamaMiriki", //Tự làm mật khẩu server của cá nhân
  server: "DESKTOP-EFGDU03\\SQLDIEP", //Tên Server cá nhân
  database: "BTLWEB", // Tên CSDL đã đặt trong SQL
  options: {
    trustServerCertificate: true, // fix lỗi self-signed certificate
  },
};

module.exports = config;
