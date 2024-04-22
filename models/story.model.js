const sql = require("mssql");
const config = require("../connect_sql");

const Story = {
  getById: async (storyId) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("storyId", sql.Int, storyId)
        .query("SELECT * FROM [dbo].[Story] WHERE [ID] = @storyId");
      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
  getByTitle: async (title) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("title", sql.VarChar, title)
        .query("SELECT * FROM [dbo].[Story] WHERE [ID] = @storyId");
      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
  getByKeyword: async (keyword) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("keyword", sql.VarChar, `%${keyword}%`)
        .query(
          "Select * From [dbo].[Story] Where Lower(Title) Like '%' + Lower(@keyword) + '%'"
        );
      return result.recordset;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
  getAll: async () => {
    try {
      let pool = await sql.connect(config);
      const result = await pool.request().query("SELECT * FROM [dbo].[Story]");
      return result.recordset;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
  getGenreName: async (storyId) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("storyId", sql.Int, storyId)
        .query(
          "Select G.[Name] from [Genre] As G join [StoryGenre] AS SG On G.[ID] = SG.[GenreID] Where SG.[StoryID] = @storyId"
        );
      return result.recordset;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  },
};

module.exports = Story;
