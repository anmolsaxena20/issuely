import { Html5QrcodeScanner } from "html5-qrcode";
import React,{ useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function QrScanner() {
  const navigate = useNavigate();
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );
    scanner.render(
      (decodedText) => {
        scanner.clear();
        console.log(decodedText)
       navigate(decodedText.replace(window.location.origin, ""));
      },
      (error) => {
        console.log("Error in scanning",error)
      }
    );


    return () => scanner.clear();
  }, []);


  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 text-black">
      <div className="bg-blue-300 p-6 rounded-xl w-87.5">
        <h2 className="text-xl font-semibold text-center mb-4">
          Scan Room QR
        </h2>
        <div id="qr-reader"  />
        <p className="text-xs text-gray-500 mt-4 text-center">
          Allow camera access to scan QR
        </p>
      </div>
    </div>
  );
}


