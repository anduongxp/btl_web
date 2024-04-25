const sql = require("mssql");
const config = require("../connect_sql")

const tableconfig = [
    // `CREATE TABLE users (
    //     userid INT IDENTITY(1,1) PRIMARY KEY,
    //     username NVARCHAR(500),
    //     password NVARCHAR(500), 
    //     email NVARCHAR(255)
    // )`,
    // `CREATE TABLE Stories(
    //     StoryID int primary key identity(1 ,1),
    //     Title varchar(255),
    //     content text,
    //     author varchar(255),
    //     description varchar(255)
    // )`,
    // `create table comment(
    //     commentid int primary key identity(1,1),
    //     userid int FOREIGN KEY REFERENCES user(userid),
    //     storyid int FOREIGN KEY REFERENCES Stories(StoryID),
    //     CreatedAt DATETIME DEFAULT GETDATE(),
    // )`
  ]
  
  const CreateTable = async () => {
    try {
        await sql.connect(config);
        console.log("connected success to sql server");
        for(const queryitem of tableconfig){
          await sql.query(queryitem);
          console.log("table create successfully")
        }
    } catch (error) {
        console.log(error)
    }
    finally{
        sql.close();
    }
  }
  module.exports = CreateTable;