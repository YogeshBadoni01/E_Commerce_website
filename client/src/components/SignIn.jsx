import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/reducers/userSlice";
import { openSnackbar } from "../Redux/reducers/snackbarSlice";
import { redirect } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = (setOpenAuth) => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setButtonLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Login Successful",
              severity: "success",
            })
          );
          redirect("/");
        })
        .catch((err) => {
          if (err.response) {
            setButtonLoading(false);
            setButtonDisabled(false);
            alert(err.response.data.message);
            dispatch(
              openSnackbar({
                message: err.response.data.message,
                severity: "error",
              })
            );
            // setOpenAuth(false)
          } else {
            setButtonLoading(false);
            setButtonDisabled(false);
            dispatch(
              openSnackbar({
                message: err.message,
                severity: "error",
              })
            );
          }
        });
    }
    setButtonDisabled(false);
    setButtonLoading(false);
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-9 mx-auto">
      <div>
        <h1 className="text-[30px] font-bold text-theme-primary">
          Welcome to Krist 👋
        </h1>
        <p className="text-[16px] font-normal text-theme-secondary">
          Please login with your details here
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-end text-theme-text-primary text-[14px] font-medium cursor-pointer transition-all duration-300 hover:text-theme-primary">
          Forgot Password?
        </p>
        <Button
          text="Sign In"
          onClick={handleSignIn}
          isLoading={buttonLoading}
          isDisabled={buttonDisabled}
        />
      </div>
    </div>
  );
};
  
export default SignIn;
