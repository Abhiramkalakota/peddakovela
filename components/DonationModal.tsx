import React, { useState, useEffect } from 'react';
import type { Donation, Seva, User } from '../types';
import { useTranslation } from '../hooks/useTranslation';

type ModalMode = 'admin-edit' | 'admin-add' | 'devotee-seva' | 'devotee-general';

interface DonationModalProps {
  isOpen: boolean;
  mode: ModalMode;
  onClose: () => void;
  onSave: (donationData: any, amount?: number) => void;
  donationToEdit?: Donation;
  seva?: Seva;
  user?: User;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, mode, onClose, onSave, donationToEdit, seva, user }) => {
  const [formData, setFormData] = useState<Partial<Donation>>({});
  const { t } = useTranslation();

  const isDevoteeMode = mode === 'devotee-seva' || mode === 'devotee-general';
  const isAdminMode = mode === 'admin-add' || mode === 'admin-edit';

  useEffect(() => {
    if (!isOpen) return;

    let initialData: Partial<Donation> = {
        devoteeName: '',
        seva: '',
        amount: 0,
        gotram: '',
        phoneNumber: '',
        familyNames: '',
    };
    
    switch (mode) {
        case 'admin-edit':
            initialData = { ...donationToEdit };
            break;
        case 'admin-add':
            initialData.date = new Date().toISOString().split('T')[0];
            break;
        case 'devotee-seva':
            if (seva) {
                initialData.seva = seva.name;
                initialData.amount = seva.amount;
            }
            break;
        case 'devotee-general':
             initialData.seva = 'General Donation';
             break;
    }
    setFormData(initialData);

  }, [isOpen, mode, donationToEdit, seva]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdminMode) {
        // Admin save doesn't need payment, just saves the data
        const finalData: Donation = {
            id: formData.id || `DON${Date.now()}`,
            devoteeId: formData.devoteeId || 'admin-entry', // Or find user if needed
            devoteeName: formData.devoteeName || '',
            amount: formData.amount || 0,
            seva: formData.seva || 'General Donation',
            date: formData.date || new Date().toISOString().split('T')[0],
            gotram: formData.gotram,
            phoneNumber: formData.phoneNumber,
            familyNames: formData.familyNames,
            paymentId: formData.paymentId || 'N/A',
        };
        onSave(finalData);
    } else {
        // Devotee save passes clean data up to trigger payment
        const donationDetails = {
            devoteeName: user?.username,
            seva: formData.seva,
            gotram: formData.gotram,
            phoneNumber: formData.phoneNumber,
            familyNames: formData.familyNames,
        };
        onSave(donationDetails, formData.amount);
    }
  };

  if (!isOpen) return null;

  const getTitle = () => {
      switch(mode) {
          case 'admin-edit': return t('editDonationRecord');
          case 'admin-add': return t('addDonationRecord');
          case 'devotee-seva': return t('donateFor', { sevaName: seva?.name || '' });
          case 'devotee-general': return t('makeGeneralDonation');
      }
  };

  const getSubmitButtonText = () => {
      if (isDevoteeMode) return t('proceedToPay');
      if (mode === 'admin-edit') return t('updateDonation');
      return t('saveDonation');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{getTitle()}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isAdminMode && (
             <div>
                <label htmlFor="devoteeName" className="block text-sm font-medium text-gray-700">{t('devoteeName')}</label>
                <input type="text" name="devoteeName" id="devoteeName" value={formData.devoteeName || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
             </div>
          )}

          { (mode === 'admin-add' || mode === 'devotee-general') && (
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">{t('donationAmount')}</label>
              <input type="number" name="amount" id="amount" value={formData.amount || ''} onChange={handleChange} required min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
            </div>
          )}

           { mode === 'admin-add' && (
            <div>
              <label htmlFor="seva" className="block text-sm font-medium text-gray-700">{t('sevaPurpose')}</label>
              <input type="text" name="seva" id="seva" value={formData.seva || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
            </div>
          )}
          
          <hr/>
          <p className="text-sm text-gray-600">{t('optionalDetails')}</p>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">{t('phoneNumber')}</label>
            <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" placeholder={t('phonePlaceholder')} />
          </div>
          <div>
            <label htmlFor="gotram" className="block text-sm font-medium text-gray-700">{t('gotram')}</label>
            <input type="text" name="gotram" id="gotram" value={formData.gotram || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="familyNames" className="block text-sm font-medium text-gray-700">{t('familyNames')}</label>
            <input type="text" name="familyNames" id="familyNames" value={formData.familyNames || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" placeholder={t('familyNamesPlaceholder')} />
          </div>
          
          <div className="flex justify-end items-center pt-4 space-x-3">
             { isDevoteeMode && <p className="text-xl font-bold text-gray-800">{t('amount')}: ₹{formData.amount?.toLocaleString('en-IN')}</p>}
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300">
              {t('cancel')}
            </button>
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
              {getSubmitButtonText()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
