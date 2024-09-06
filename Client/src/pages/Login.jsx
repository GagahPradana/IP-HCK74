import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const nav = useNavigate();

  async function fectGoogleLogin(response) {
    console.log("Google response:", response);
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/google-login",
        headers: {
          google_token: response.credential,
        },
      });
      console.log("Backend response:", data);
      localStorage.setItem("token", data.access_token);
      nav("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  }
  const handleLoginGoogle = async (response) => {
    fectGoogleLogin(response);
  };

  return (
    <div>
      <div
        className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
        style={{
          backgroundImage:
            "url(https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-md w-full mx-auto justify-center">
          <form className="bg-opacity-70 bg-zinc-200 rounded-2xl p-6 shadow-[0_2px_16px_-3px]">
            <div className="mb-12">
              <h3 className="pl-36 text-justify text-zinc-800 text-3xl font-extrabold justify-center">
                Sign in
              </h3>
            </div>
            <hr className="my-6 border-gray-400" />
            <div className="space-x-8 flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleLoginGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log("Login failed");
                }}
              ></GoogleLogin>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
