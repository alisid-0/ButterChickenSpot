import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import CheckoutModal from './CheckoutModal';

export default function Cart({ isOpen, onClose }) {
  const { 
    cart, 
    orderNote, 
    setOrderNote, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useOrder();

  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: isOpen ? 0 : '100%' }}
      transition={{ type: 'tween' }}
      className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#434725] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.specialInstructions}`}
                className="flex gap-4 bg-gray-50 p-4 rounded-xl"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-[#434725]">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id, item.specialInstructions)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {item.specialInstructions && (
                    <p className="text-sm text-gray-600">
                      Note: {item.specialInstructions}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1),
                          item.specialInstructions
                        )}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(
                          item.id,
                          item.quantity + 1,
                          item.specialInstructions
                        )}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-[#F26722]">
                      ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <label className="block font-medium text-[#434725]">
                Order Notes
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Any notes for your order?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                rows="3"
              />
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-6 border-t border-gray-200 space-y-4">
          <div className="flex justify-between items-center font-bold text-lg">
            <span className="text-[#434725]">Total</span>
            <span className="text-[#F26722]">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCheckout}
              className="flex-1 bg-[#F26722] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="flex-1 bg-gray-100 text-[#434725] px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </motion.div>
  );
} 