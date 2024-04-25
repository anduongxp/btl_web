
const sql = require("mssql");
const config = require("../connect_sql");
const { getById, UserModel } = require("../models/user.model");
const {usermodels} = require("../models/Usermodel");
const { fileLoader } = require("ejs");
const AuthenticationController = {
    register : async (req , res ) => {
        try {
            const {username , email , password} = req.body;

            const querys = `insert into Userr(Username , Password , Email)
                            values('${username}' , '${password}' , '${email}')`
            await sql.connect(config);  
            sql.query(querys);
            res.redirect("/login");
        } catch (error) {
            console.log(error);
            res.redirect("/register");
        }
        finally{
            sql.close();
        }
    },

    login : async (req , res) =>{
        try {
            const {email , password} = req.body;
            const query = `select Password , ID from Userr where Email = '${email}'`
            await sql.connect(config);
            const result = await sql.query(query);
            if (result.recordset && result.recordset.length > 0) {
                const storedPassword = result.recordset[0].Password;
                console.log(storedPassword);
                if(password == storedPassword){
                    const id = result.recordset[0].ID;
                    usermodels.userid = id;
                    res.redirect("/");
                } 
                else res.redirect("/login");
            } else {
                // No user found with the provided email
                res.redirect("/login");
            }
        
        } catch (error) {
            console.log(error)
        }
        finally{
            sql.close();
        }
    },
    GetAllStory : async (req , res) =>{
        try {
           let query = `select * from Story`;
           await sql.connect(config);
           const result = await sql.query(query);
           var array = [];
           console.log(typeof result.recordset);
           for(var i = 0 ; i <result.recordset.length;i++){
               array.push({
                   id : result.recordset[i].ID,
                   title : result.recordset[i].Title,
                   Author : result.recordset[i].Author,
                   Description : result.recordset[i].Description,
                   UpdateDate : result.recordset[i].UpdateDate,
                   ChapterCount : result.recordset[i].ChapterCount,
                   imagelink : result.recordset[i].ImageTitle,
               })
           }
           console.log(array);
           return array;
        } catch (error) {
           console.log(error);
        }
        finally{
            sql.close();
        }
   }, 
   GetStoryWithid : async (req , res) =>{
        const storyid = req.params.id;
        try {
            const querys = `select * from Story where ID = '${storyid}'`
            await sql.connect(config);
            const result = await sql.query(querys);
            console.log(storyid);
            console.log(result.recordset[0]);
            const queryforgenre = `select * from Genre where ID ='${result.recordset[0].idgenre}'`
            const genre = await sql.query(queryforgenre);
            res.render("pages/detailStory" , {
                detail : result.recordset[0],
                genres : genre.recordset[0].Name!=undefined ? genre.recordset[0].Name : ""
            });
        } catch (error) {
            console.log(error);
        }
        finally{
            sql.close();
        }
   },
   AddNewFavorite : async (req , res)=>{
     console.log("da log duoc vao ham");
     try {
        const storyid = req.params.id;
        console.log("loggggg: "+usermodels.userid);
        const query = `insert into FavoritesList(UserID , StoryID)
        values('${usermodels.userid}', '${storyid}')`;
        await sql.connect(config);
        const result = await sql.query(query);
        console.log(result);
        return true;
     } catch (error) {
        console.log(error);
        return false;
     }
     finally{
        sql.close();
     }
   }, 
   LoadAllStoryFavorite : async (req , res) =>{
       console.log("userid: "+ usermodels.userid);
       const query = `SELECT t.*
       FROM Story AS t
       INNER JOIN (
           SELECT DISTINCT StoryID
           FROM FavoritesList
           WHERE UserID = '${usermodels.userid}'
       ) AS f ON f.StoryID = t.ID`;
       await sql.connect(config);
       const result = await sql.query(query);
       var array = [];
       for(var i = 0 ; i <result.recordset.length;i++){
            array.push({
                id : result.recordset[i].ID,
                title : result.recordset[i].Title,
                Author : result.recordset[i].Author,
                Description : result.recordset[i].Description,
                UpdateDate : result.recordset[i].UpdateDate,
                ChapterCount : result.recordset[i].ChapterCount,
                imagelink : result.recordset[i].ImageTitle,
            })
        }
        return array;
   },
   loadAllContentWhenRead : async (id)=>{
        const query = `select * from Chapter where StoryID = '${id}'`;
        await sql.connect(config);
        const result = await sql.query(query);
        const array =[];
        for(var i = 0 ; i <result.recordset.length;i++){
            array.push({
                title : result.recordset[i].Title,
                content : result.recordset[i].Content,
            })
        }
        console.log(array);
        return array;
   }   
}

module.exports = AuthenticationController;