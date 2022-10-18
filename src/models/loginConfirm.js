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
  const findId = users.find((user) => user.id === id);
  if (findId === undefined) {
    return { msg: '아이디가 없습니다', id: null };
  } else {
    for (let user of users) {
      if (id === user.id && pw !== user.pw) {
        return { msg: '비밀번호가 틀렸습니다.', id: null };
      } else if (id === user.id && pw === user.pw) {
        return { msg: '성공', id: user.id };
      }
    }
  }
};
