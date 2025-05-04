import React from "react";
import { useDispatch } from "react-redux";
import { closeSnackbar } from "../Redux/reducers/snackbarSlice";

const ToastMessage = ({ open, message, severity }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-500 z-50`}
    >
      <div
        className={`w-full max-w-sm rounded-lg shadow-lg px-4 py-3 text-white ${
          severity === "success"
            ? "bg-green-500"
            : severity === "error"
            ? "bg-red-500"
            : severity === "warning"
            ? "bg-yellow-500"
            : "bg-blue-500"
        }`}
        role="alert"
      >
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button
            className="ml-4 text-white hover:text-gray-200"
            onClick={() => dispatch(closeSnackbar())}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
