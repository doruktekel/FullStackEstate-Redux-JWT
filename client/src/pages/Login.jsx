import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
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
      const res = await axios.post("/api/auth/login", formData);
      const data = res.data;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/");
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
        <h1 className="font-semibold text-xl">Login Form</h1>
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
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div>
        Dont you have an account ?
        <Link to={"/register"} className="text-blue-500 ml-2 ">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
