import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import emailjs from '@emailjs/browser';
import { ordersApi } from '../services/api';

export default function CheckoutModal({ onClose }) {
  const { cart, orderNote, getCartTotal, clearCart } = useOrder();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const generateOrderNumber = () => {
    const timestamp = new Date().getTime().toString().slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `TBC${timestamp}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderNumber = generateOrderNumber();
    const orderData = {
      userId: "guest",
      customerName: formData.name,
      contactNumber: formData.phone.replace(/\D/g, ''),
      email: formData.email || null,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: parseInt(item.quantity),
        price: Number(item.discountPrice || item.price),
        specialInstructions: item.specialInstructions || ''
      })),
      total: parseFloat(getCartTotal().toFixed(2)),
      paymentMethod: 'cash',
      orderNumber,
      orderNote: orderNote || null,
      status: 'pending'
    };

    try {
      // Create order in database
      const response = await ordersApi.createOrder(orderData);
      console.log('Server response:', response);

      // Send email if provided
      if (formData.email) {
        await emailjs.send(
          'service_ocbwpgx',
          'template_gahmkge',
          {
            to_email: formData.email,
            customer_name: formData.name,
            customer_phone: formData.phone,
            order_number: orderNumber,
            order_items: cart.map(item => {
              const price = parseFloat(item.discountPrice || item.price);
              return `${item.name} (${item.quantity}x) - $${(price * item.quantity).toFixed(2)}${
                item.specialInstructions ? `\nNote: ${item.specialInstructions}` : ''
              }`
            }).join('\n\n'),
            order_note: orderNote || 'None',
            total: getCartTotal().toFixed(2)
          },
          'Os_w4KHmtCNiCzAtB'
        );
      }

      console.log('Order submitted:', orderData);
      clearCart();
      onClose();
    } catch (error) {
      console.error('Order submission error:', error.response?.data || error.message);
      console.error('Order data that failed:', orderData);
    } finally {
      setIsProcessing(false);
    }
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
                Email (Optional - for order confirmation)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
              />
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