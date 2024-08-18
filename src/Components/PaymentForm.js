import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentForm({ bookingData }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [amount] = useState(bookingData.numberOfNights * 100); // Example amount calculation

  const handlePayment = async () => {
    // Basic validation
    if (paymentMethod === 'mpesa' && !mpesaNumber) {
      alert('Please enter your Mpesa number.');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || !cardHolderName)) {
      alert('Please enter your card details.');
      return;
    }

    // Simulate a payment request
    try {
      // Payment API request simulation
      const paymentResponse = await fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          paymentMethod,
          mpesaNumber,
          cardNumber,
          cardHolderName,
        }),
      });

      const result = await paymentResponse.json();

      if (result.success) {
        alert('Payment successful!');
        navigate('/booking-confirmation', { state: { bookingData } });
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment error. Please try again.');
    }
  };

  return (
    <div className="payment-form">
      <h2>Payment</h2>
      <div className="payment-details">
        <p>Amount Payable: ${amount}</p>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="mpesa"
              checked={paymentMethod === 'mpesa'}
              onChange={() => setPaymentMethod('mpesa')}
            />
            Mpesa
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Bank Card
          </label>
        </div>
        {paymentMethod === 'card' && (
          <div className="card-details">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />
          </div>
        )}
        {paymentMethod === 'mpesa' && (
          <div className="mpesa-details">
            <input
              type="text"
              placeholder="Mpesa Number"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
            />
          </div>
        )}
        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
}

export default PaymentForm;
