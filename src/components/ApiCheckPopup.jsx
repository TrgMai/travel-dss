import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ApiCheckPopup = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch(
          "https://travel-dss-backend.onrender.com/"
        );
        const data = await response.json();

        if (data.message === "Hello from Tour API") {
          setIsLoading(false);
          onSuccess();
        } else {
          setError("Unexpected response from server");
        }
      } catch (err) {
        setError("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.");
      }
    };

    checkApi();
  }, [onSuccess]);

  if (!isLoading && !error) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        {isLoading ? (
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Đang kết nối...</h2>
            <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold mb-2">Lỗi Kết Nối</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Thử Lại
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ApiCheckPopup;
