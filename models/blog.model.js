const DB = require('../config/constants');

const dataBase = require('../database/database')(DB.BLOG, 'admin', '123456', {
        host: 'RUKAVITSINI',
        port: 1543,
        dialect: 'mssql'
    }),
    blog = {
      USERS:{},
      POSTS:{},
      COMMENTS:{}
    };

blog.USERS.getUserByCredentials = (username,password) =>{
  return dataBase(
            `SELECT ${DB.columns.BLOG.USERS.USER_ID},
                    ${DB.columns.BLOG.USERS.NAME},
                    ${DB.columns.BLOG.USERS.EMAIL},
                    ${DB.columns.BLOG.USERS.PASSWORD}
            FROM ${DB.tables.BLOG.USERS}
            WHERE ${DB.columns.BLOG.USERS.NAME}='${username}'
                  and ${DB.columns.BLOG.USERS.PASSWORD}='${password}'`
          );
}

blog.POSTS.addPost = (title,content) => {
  dataBase(`INSERT INTO [${DB.tables.BLOG.POSTS}] (${DB.columns.BLOG.POSTS.TITLE},
               [${DB.columns.BLOG.POSTS.DATE}],
               ${DB.columns.BLOG.POSTS.OWNER_ID})
            VALUES (
               '${title}',
               GETDATE(),
               ${global.User.id})`);
}

module.exports = blog;

// blog.USERS.getUserByFacebookId = (id) => {
//   return dataBase(`SELECT userID,Name, facebookId FROM Users WHERE facebookId='${id}'`);
// }
//
// blog.USERS.addNewFacebookUser = (facebookId) => {
//   dataBase(`INSERT INTO Users (facebookId) VALUES (${facebookId})`);
// }