import React, { useState, useRef } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { AppCategory, AppEntry } from '../types';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (app: Omit<AppEntry, 'id' | 'createdAt'>) => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState<string>(AppCategory.GAMES);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Replace any existing image with the new one
      setImages([URL.createObjectURL(e.target.files[0])]);
    }
  };

  const removeImage = () => {
    setImages([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !link || images.length === 0) {
      alert('Please fill in all fields and upload an image.');
      return;
    }
    onSubmit({
      name,
      description,
      link,
      category,
      images
    });
    // Reset form
    setName('');
    setDescription('');
    setLink('');
    setCategory(AppCategory.GAMES);
    setImages([]);
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImages([URL.createObjectURL(file)]);
      }
    }
  };

  // Filter out 'All Apps' for the select dropdown
  const categoriesForSelect = Object.values(AppCategory).filter(c => c !== AppCategory.ALL);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-[#1E1F20] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#444746] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#444746]">
          <h2 className="text-xl font-semibold text-[#E3E3E3]">Submit your App</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#2D2E31] rounded-full text-[#C4C7C5] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          <form id="submit-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* App Name */}
            <div>
              <label className="block text-sm font-medium text-[#C4C7C5] mb-2">App Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Galaxy Explorer"
                className="w-full bg-[#2D2E31] border border-transparent focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] rounded-lg px-4 py-3 text-[#E3E3E3] placeholder-[#8E918F] outline-none transition-all"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#C4C7C5] mb-2">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#2D2E31] border border-transparent focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] rounded-lg px-4 py-3 text-[#E3E3E3] appearance-none outline-none transition-all cursor-pointer"
                >
                  {categoriesForSelect.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C4C7C5]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#C4C7C5] mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your app in a few sentences..."
                rows={4}
                className="w-full bg-[#2D2E31] border border-transparent focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] rounded-lg px-4 py-3 text-[#E3E3E3] placeholder-[#8E918F] outline-none transition-all resize-none"
                required
              />
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-[#C4C7C5] mb-2">App Link</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://apps.apple.com/..."
                className="w-full bg-[#2D2E31] border border-transparent focus:border-[#A8C7FA] focus:ring-1 focus:ring-[#A8C7FA] rounded-lg px-4 py-3 text-[#E3E3E3] placeholder-[#8E918F] outline-none transition-all"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-[#C4C7C5] mb-2">App Screenshot</label>
              
              {images.length === 0 ? (
                <div 
                  className={`
                    border-2 border-dashed rounded-xl p-8 transition-all text-center cursor-pointer
                    ${isDragging ? 'border-[#A8C7FA] bg-[#A8C7FA]/10' : 'border-[#444746] hover:border-[#8E918F] hover:bg-[#2D2E31]'}
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-[#2D2E31] rounded-full shadow-lg">
                      <Upload className="w-8 h-8 text-[#A8C7FA]" />
                    </div>
                    <div>
                      <p className="text-[#E3E3E3] font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-[#8E918F] mt-1">Single image (PNG, JPG)</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden group bg-black border border-[#444746]">
                  <img src={images[0]} alt="Preview" className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Image
                    </button>
                  </div>
                </div>
              )}
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-[#444746] flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-[#A8C7FA] font-medium hover:bg-[#2D2E31] transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="submit-form"
            className="px-6 py-2.5 rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white font-medium transition-colors shadow-lg shadow-blue-900/20"
          >
            Submit App
          </button>
        </div>
      </div>
    </div>
  );
};