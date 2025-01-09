import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function EditNewsletterModal({ post, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    author: post?.author || '',
    image: post?.image || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-4 z-[200] overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg my-20 sm:my-0 max-h-[calc(100vh-160px)] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#434725]">
            {post ? 'Edit Newsletter Post' : 'Add Newsletter Post'}
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
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#434725] mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none min-h-[200px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#434725] mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#434725] mb-2">
                Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto sm:flex-1 bg-[#F26722] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors text-sm sm:text-base"
            >
              {post ? 'Save Changes' : 'Add Post'}
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