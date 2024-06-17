import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import OAuth from "../components/OAuth";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/register", formData);
      const data = res.data;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

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
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-2 rounded-xl disabled:opacity-70"
        >
          {loading ? "Loading..." : "Register"}
        </button>
        <OAuth />
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
