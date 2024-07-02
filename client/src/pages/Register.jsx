import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

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
      toast.success("Registration was successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  text-center gap-2 mt-5"
      >
        <h1 className="font-semibold text-xl my-5">Register Form</h1>
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

      <div className="mt-2">
        Have an account
        <Link to={"/login"} className="text-blue-500 ml-2 ">
          Login
        </Link>
      </div>
      {error && <p className="text-red-500 text-sm my-2">* {error}</p>}
    </div>
  );
};

export default Register;
