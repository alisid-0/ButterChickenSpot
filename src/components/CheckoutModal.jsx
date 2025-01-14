import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('your_publishable_key');

export default function CheckoutModal({ onClose }) {
  const { cart, orderNote, getCartTotal, clearCart } = useOrder();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderData = {
      items: cart,
      orderNote,
      total: getCartTotal(),
      customer: formData,
      orderType: 'pickup',
      orderDate: new Date().toISOString()
    };

    if (formData.paymentMethod === 'card') {
      try {
        // Create a payment session with your backend
        const response = await fetch('/api/create-payment-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        const session = await response.json();
        const stripe = await stripePromise;

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error('Payment error:', error);
          setIsProcessing(false);
          return;
        }
      } catch (err) {
        console.error('Checkout error:', err);
        setIsProcessing(false);
        return;
      }
    } else {
      // Handle cash payment
      console.log('Cash order submitted:', orderData);
      clearCart();
      onClose();
    }

    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#434725]">Pickup Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-[#434725] mb-2">
                Name for Pickup
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#434725] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#434725] mb-2">
                Payment Method
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
              >
                <option value="card">Pay Now with Card</option>
                <option value="cash">Pay at Pickup</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span className="text-[#434725]">Total Amount</span>
              <span className="text-[#F26722]">${getCartTotal().toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#F26722] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 