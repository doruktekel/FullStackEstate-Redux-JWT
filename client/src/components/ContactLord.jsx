import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContactLord = ({ list }) => {
  const [landlord, setLandlord] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/${list.userRef}`);
        const data = res.data;
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [list.userRef]);

  const handleSendMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 my-1">
      {list && (
        <p>
          You are sending email for{" "}
          <span className="font-semibold capitalize">{list.name}</span> estate
          to{" "}
          <span className="font-semibold capitalize ">{landlord.username}</span>
        </p>
      )}
      <hr />
      <textarea
        value={message}
        onChange={handleSendMessage}
        className="border border-gray-200 w-full min-h-20 rounded-lg p-2"
      />
      <Link
        to={`mailto:${landlord.email}?subject=Regarding ${list.name}&body=${message}`}
        className="p-1 text-slate-100 bg-slate-900 rounded-lg hover:opacity-75 shadow-lg w-full text-center"
      >
        Send Email
      </Link>
    </div>
  );
};

export default ContactLord;
