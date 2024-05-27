const authenticate = async (email: string, password: string) => {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
      expiresInMins: 30,
    }),
  });

  const response = await res.json();
  console.log(response);
  return response;
};

export default authenticate;
