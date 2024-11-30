"use server";

import LoginForm from "@/components/loginForm";

const LoginPage: React.FC = () => {
  return (
    <div>
      <div className="h-screen flex items-center justify-end bg-[#202A30]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-auto object-cover "
        >
          <source src="./motion.mp4" type="video/mp4" />
        </video>
        {/* <img src="./logo2b.svg" alt="logo2b" className="w-56 h-16"/> */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;


