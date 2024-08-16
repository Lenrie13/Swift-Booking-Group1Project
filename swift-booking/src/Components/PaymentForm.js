import React, { useState } from 'react';

const PaymentForm = ({ amount, onPaymentSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [paymentData, setPaymentData] = useState({
    mpesaNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '', 
  });

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit({ ...paymentData, amount, paymentMethod });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment Amount: {amount} USD</h3>
      <div>
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

      {paymentMethod === 'mpesa' ? (
        <div>
          <input
            type="text"
            name="mpesaNumber"
            value={paymentData.mpesaNumber}
            onChange={handleChange}
            placeholder="Mpesa Number"
            required
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="cardHolderName"
            value={paymentData.cardHolderName}
            onChange={handleChange}
            placeholder="Card Holder's Name"
            required
          />
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            required
          />
          <input
            type="text"
            name="expiryDate"
            value={paymentData.expiryDate}
            onChange={handleChange}
            placeholder="Expiry Date (MM/YY)"
            required
          />
          <input
            type="text"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            placeholder="CVV"
            required
          />
        </div>
      )}

      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
