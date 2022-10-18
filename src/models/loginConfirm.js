// db를 대체할 유저 목록
const users = [
  {
    id: 'test',
    pw: '1111',
  },
  {
    id: 'test1',
    pw: '1111',
  },
];

exports.loginConfirm = (id, pw) => {
  for (let user of users) {
    if (id === user.id && pw === user.pw) {
      return id;
    }
  }
};
