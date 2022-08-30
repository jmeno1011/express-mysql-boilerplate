const { users } = require("../config/usersInfo");

exports.loginConfirm = (id, pw) => {
    for (let user of users) {
      if (id === user.id && pw === user.pw) {
        return id;
      }
    }
  };