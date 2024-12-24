import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

export default function EditItemModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || '',
    image: item?.image || '',
    spiceLevel: item?.spiceLevel || 0,
    categories: item?.categories || []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl">
        <div className="p-6 border-b border-[#434725]/10 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-[#434725]">
            {item ? 'Edit Item' : 'Add New Item'}
          </h3>
          <button 
            onClick={onClose}
            className="text-[#434725]/60 hover:text-[#434725] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-[#434725] font-bold mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722]"
              required
            />
          </div>

          <div>
            <label className="block text-[#434725] font-bold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722] h-32"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#434725] font-bold mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722]"
                required
              />
            </div>

            <div>
              <label className="block text-[#434725] font-bold mb-2">Spice Level</label>
              <select
                value={formData.spiceLevel}
                onChange={(e) => setFormData({ ...formData, spiceLevel: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722]"
              >
                <option value="0">None</option>
                <option value="1">Mild</option>
                <option value="2">Medium</option>
                <option value="3">Hot</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#434725] font-bold mb-2">Categories</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.categories.includes('spicy')}
                  onChange={(e) => {
                    const newCategories = e.target.checked 
                      ? [...formData.categories, 'spicy']
                      : formData.categories.filter(c => c !== 'spicy');
                    setFormData({ ...formData, categories: newCategories });
                  }}
                />
                Spicy
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.categories.includes('vegetarian')}
                  onChange={(e) => {
                    const newCategories = e.target.checked 
                      ? [...formData.categories, 'vegetarian']
                      : formData.categories.filter(c => c !== 'vegetarian');
                    setFormData({ ...formData, categories: newCategories });
                  }}
                />
                Vegetarian
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[#434725] font-bold mb-2">Image URL</label>
            <div className="flex gap-4">
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="flex-1 px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722]"
                required
              />
              <button
                type="button"
                className="bg-[#434725] text-[#FFF8CC] px-6 rounded-xl flex items-center gap-2 hover:bg-[#434725]/90 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Upload
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-[#434725]/20 hover:bg-[#434725]/10 transition-colors font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#F26722] text-[#FFF8CC] hover:bg-[#FF850A] transition-colors font-bold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 