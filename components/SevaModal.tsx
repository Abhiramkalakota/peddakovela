import React, { useState, useEffect } from 'react';
import type { Seva } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface SevaModalProps {
  seva: Partial<Seva> | null;
  onClose: () => void;
  onSave: (seva: Seva) => void;
}

const SevaModal: React.FC<SevaModalProps> = ({ seva, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Seva>>({
    name: '',
    description: '',
    timing: '',
    amount: 0,
    imageUrl: '',
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (seva) {
      setFormData(seva);
    } else {
        // Reset for new Seva
        setFormData({ name: '', description: '', timing: '', amount: 0, imageUrl: '' });
    }
  }, [seva]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.amount && formData.timing) {
      const sevaToSave: Seva = {
        id: formData.id || `seva-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        timing: formData.timing,
        amount: formData.amount,
        imageUrl: formData.imageUrl || `https://picsum.photos/seed/${formData.name.replace(/\s+/g, '')}/400/300`,
      };
      onSave(sevaToSave);
    } else {
      alert('Please fill out all required fields.');
    }
  };
  
  const isEditMode = !!seva?.id;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isEditMode ? t('editSeva') : t('addSeva')}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seva Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" rows={3} value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"></textarea>
          </div>
           <div>
            <label htmlFor="timing" className="block text-sm font-medium text-gray-700">Timing</label>
            <input type="text" name="timing" id="timing" value={formData.timing} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
          </div>
           <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">{t('amount')} (₹)</label>
            <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
          </div>
          <div className="flex justify-end pt-4 space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300">
              {t('cancel')}
            </button>
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
              {t('saveSeva')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SevaModal;
