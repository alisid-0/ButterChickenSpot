import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function AddToCartModal({ item, onClose }) {
  const { addToCart } = useOrder();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart(item, quantity, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#434725]">{item.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block font-medium text-[#434725]">
              Special Instructions
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests?"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
              rows="3"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-[#434725]">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-bold text-xl w-8 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center font-bold text-lg">
            <span className="text-[#434725]">Total</span>
            <span className="text-[#F26722]">
              ${((item.discountPrice || item.price) * quantity).toFixed(2)}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#F26722] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-[#434725] px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 