import React from "react";
import axios from "axios";

const PaymentComponent = () => {
    const loadRazorpay = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const order = await axios.post("http://localhost:5000/create-order", { amount: 499 }); // Rs.499

        const options = {
            key: "your_key_id_here", // from Razorpay Dashboard
            amount: order.data.amount,
            currency: "INR",
            name: "Your Tuition Classes",
            description: "Course Purchase",
            order_id: order.data.id,
            handler: async (response) => {
                const verifyRes = await axios.post("http://localhost:5000/verify-payment", response);
                alert(verifyRes.data.message);
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    return (
        <div className="flex justify-center mt-10">
            <button
                onClick={loadRazorpay}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
                Buy Course - Rs.499
            </button>
        </div>
    );
};

export default PaymentComponent;
