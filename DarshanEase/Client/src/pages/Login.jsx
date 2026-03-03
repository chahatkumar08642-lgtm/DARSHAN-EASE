import axios from "axios";

const loginUser = async () => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    {
      email: "test@gmail.com",
      password: "123456"
    }
  );
  console.log(response.data);
};