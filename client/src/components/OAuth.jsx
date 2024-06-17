import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleConnection = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
        profilePicture: result.user.photoURL,
      });
      const data = res.data;
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Google connection problem", error);
    }
  };
  return (
    <div className=" bg-red-500 text-white rounded-xl ">
      <button
        onClick={handleGoogleConnection}
        type="button"
        className="flex p-2 w-full justify-center items-center gap-2"
      >
        Continue with google <FaGoogle />
      </button>
    </div>
  );
};

export default OAuth;
