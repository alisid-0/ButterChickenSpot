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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[200]">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#434725]">
            {item ? 'Edit Menu Item' : 'Add Menu Item'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#434725]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-[#434725] mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#434725] mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none min-h-[100px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#434725] mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#434725] mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#434725] mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {['main', 'beverage', 'remix', 'special', 'side', 'spicy'].map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      const newCategories = formData.categories.includes(category)
                        ? formData.categories.filter(c => c !== category)
                        : [...formData.categories, category];
                      setFormData({ ...formData, categories: newCategories });
                    }}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${
                      formData.categories.includes(category)
                        ? 'bg-[#F26722] text-white'
                        : 'bg-gray-100 text-[#434725] hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto sm:flex-1 bg-[#F26722] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors text-sm sm:text-base"
            >
              {item ? 'Save Changes' : 'Add Item'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto sm:flex-1 bg-gray-100 text-[#434725] px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 