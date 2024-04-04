import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const navigate = useNavigate();

  const token = queryParams.get("q");

  const userPassword = {
    password: newPassword,
    confirmPassword: confirmPassword,
  };
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      toast.error("Passwords do not match")
      return;
    }
    try {
      const resData = await axios.post(
        "http://localhost:8000/api/v1/auth/resetpassword",
        userPassword,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resData.status === 200) {
        navigate("/");
        toast.success("password updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white boxShadow rounded-lg w-[500px] h-[350px] py-4 px-3">
          <div className="flex justify-center mb-6">
            <h1 className="text-4xl font-semibold">User Details</h1>
          </div>
          <div>
            <label className="font-semibold">New Password</label>
            <br />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              name="password"
              className="border border-black mt-1 py-2 w-10/12 rounded-md outline-blue-500 px-3"
              placeholder="New Password"
              autoComplete="off"
              type="password"
            />
          </div>
          <div className="mt-4">
            <label className="font-semibold">Confirm Password</label>
            <br />
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmpassword"
              value={confirmPassword}
              className="border border-black  mt-1 py-2 w-10/12 rounded-md outline-blue-500 px-3"
              type="password"
              autoComplete="off"
              placeholder="Confirm New Password"
            />
          </div>

          <button
            onClick={handleResetPassword}
            className="border border-blue-500 bg-blue-500 text-white px-2 py-2 w-40  mt-4 rounded-md"
          >
            Continue
          </button>
          {passwordMismatch && (
            <p className="font-semibold text-red-500 mt-4">
              Password does not match
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
