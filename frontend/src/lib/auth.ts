  export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};