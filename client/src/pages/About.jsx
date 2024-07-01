import React from "react";

const About = () => {
  return (
    <div className="pt-40 max-w-xl md:max-w-6xl mx-auto flex flex-wrap flex-col gap-5">
      <p className="font-bold text-slate-800 text-lg md:text-3xl capitalize">
        MERN{" "}
        <span className="text-slate-500"> based real estate application!</span>
      </p>
      <p className="text-slate-800 text-md md:text-lg">
        The Real Estate Project is a comprehensive web application designed for
        browsing and managing real estate listings. With features like property
        search, detailed listings, and agent contact capabilities, it aims to
        provide users with a seamless experience in their property search
        journey. Utilizing the MERN stack (MongoDB, Express.js, React.js,
        Node.js) for both backend and frontend development, Tailwind CSS for
        styling, React Form Hook for form management, JWT token for
        authentication, Firebase OAuth for user authentication, Firestore for
        storing data, and Vite for the build tool, this project represents a
        culmination of various technologies and frameworks.
      </p>
      <p>
        🔑 Authentication: Implemented Google OAuth for seamless user login and
        authentication also JWT token-based authentication.
      </p>
      <p>
        🛠️ State Management: Used Redux Toolkit for efficient state management
        across the application.
      </p>
      <p>🌐 Routing: Utilized React Router DOM for routing</p>
      <p>🔒 Security: With bcrypt.js for password hashing and salting.</p>
      <p>
        🏠 Property Listings: Browse diverse listings, view details, and connect
        with sellers directly.
      </p>
      <p>
        👤 User Profiles: Manage listings, track activity, and update
        information easily.
      </p>
      <p>
        🔍 Search Functionality: Powerful search filters for location, price,
        and property type.
      </p>
      <p>🚀 Firebase Integration: Real-time updates via Firebase.</p>
    </div>
  );
};

export default About;
