import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentForm({ bookingData, onSubmit }) {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('mpesa');
    const [mpesaNumber, setMpesaNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const amount = bookingData ? bookingData.totalCost : 0;

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const paymentData = {
            amount,
            method: paymentMethod,
            mpesaNumber,
            cardNumber,
            cardHolderName,
        };

        if (typeof onSubmit === 'function') {
            onSubmit(paymentData);
        } else {
            console.error('onSubmit is not a function');
        }
    };

    return (
        <div className="payment-form">
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        <input
                            type="radio"
                            value="mpesa"
                            checked={paymentMethod === 'mpesa'}
                            onChange={handlePaymentMethodChange}
                        />
                        MPesa
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={handlePaymentMethodChange}
                        />
                        Bank Card
                    </label>
                </div>
                {paymentMethod === 'mpesa' && (
                    <div className="form-group">
                        <label htmlFor="mpesaNumber">MPesa Number:</label>
                        <input
                            type="text"
                            id="mpesaNumber"
                            value={mpesaNumber}
                            onChange={(e) => setMpesaNumber(e.target.value)}
                            required
                        />
                    </div>
                )}
                {paymentMethod === 'card' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardHolderName">Card Holder Name:</label>
                            <input
                                type="text"
                                id="cardHolderName"
                                value={cardHolderName}
                                onChange={(e) => setCardHolderName(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label htmlFor="amount">Amount Payable:</label>
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        readOnly
                    />
                </div>
                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
}

export default PaymentForm;
