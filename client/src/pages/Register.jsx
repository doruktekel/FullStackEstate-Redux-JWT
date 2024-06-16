import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  console.log(formData);
  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  text-center gap-2 mt-5"
      >
        <h1 className="font-semibold text-xl">Register Form</h1>
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-50 rounded-xl p-2"
          onChange={handleChange}
          name="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-50 rounded-xl p-2"
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-50 rounded-xl p-2"
          onChange={handleChange}
          name="password"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-2 rounded-xl"
        >
          Register
        </button>
      </form>
      <div>
        Have an account
        <Link to={"/login"} className="text-blue-500 ml-2 ">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
