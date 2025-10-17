// This declares the Razorpay object that comes from the script tag in index.html
declare const Razorpay: any;

const RAZORPAY_TEST_KEY = 'rzp_test_ILgsg364K33nI0'; // This is a public test key

interface PaymentDetails {
    amount: number; // in rupees
    devoteeName: string;
    phoneNumber?: string;
    seva: string;
}

interface PaymentSuccessResponse {
    razorpay_payment_id: string;
}

export const initiatePayment = (
    details: PaymentDetails,
    onSuccess: (response: PaymentSuccessResponse) => void,
): void => {
    if (typeof Razorpay === 'undefined') {
        alert('Payment gateway could not be loaded. Please check your internet connection and try again.');
        return;
    }

    const options = {
        key: RAZORPAY_TEST_KEY,
        amount: details.amount * 100, // Amount in the smallest currency unit (paise for INR)
        currency: "INR",
        name: "Temple Connect",
        description: `Donation for ${details.seva}`,
        notes: {
            seva_purpose: details.seva,
            devotee_name: details.devoteeName,
        },
        handler: (response: PaymentSuccessResponse) => {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            onSuccess(response);
        },
        prefill: {
            name: details.devoteeName,
            contact: details.phoneNumber,
        },
        theme: {
            color: "#F59E0B", // amber-500
        },
        modal: {
            ondismiss: () => {
                alert('Payment was not completed.');
            }
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
};