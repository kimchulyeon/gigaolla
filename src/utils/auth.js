const users = [{ username: "admin1", password: "ollaedu" }];

export function signIn({ userName, password }) {
  const user = users.some(
    (user) => user.username === userName && user.password === password
  );
  if (!user) throw new Error("정보가 일치하지 않습니다.");
}
