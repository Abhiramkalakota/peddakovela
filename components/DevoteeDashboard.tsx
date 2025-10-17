import React, { useState } from 'react';
import type { Donation, Seva } from '../types';
import SevaList from './SevaList';
import DonationTable from './DonationTable';
import { useAuth } from '../context/AuthContext';
import { initiatePayment } from '../services/paymentService';
import { DonationModal } from './DonationModal';
import { useTranslation } from '../hooks/useTranslation';

interface DevoteeDashboardProps {
    userDonations: Donation[];
    allSevas: Seva[];
    onSaveDonation: (donation: Donation) => void;
}

const DevoteeDashboard: React.FC<DevoteeDashboardProps> = ({ userDonations, allSevas, onSaveDonation }) => {
  const { user } = useAuth();
  const [modalState, setModalState] = useState<{ mode: 'seva' | 'general' | null, data?: Seva }>({ mode: null });
  const { t } = useTranslation();

  const handleDonateClick = (seva: Seva) => {
    setModalState({ mode: 'seva', data: seva });
  };
  
  const handleGeneralDonationClick = () => {
      setModalState({ mode: 'general' });
  };

  const handleModalClose = () => {
    setModalState({ mode: null });
  };
  
  const handleModalSave = (donationData: Omit<Donation, 'id' | 'devoteeId' | 'date' | 'paymentId'>, amount: number) => {
    if (!user) {
        alert("You must be logged in to donate.");
        return;
    }
    
    const paymentDetails = {
        amount: amount,
        seva: donationData.seva,
        devoteeName: user.username,
        phoneNumber: donationData.phoneNumber,
    };

    const onSuccess = (paymentResponse: { razorpay_payment_id: string; }) => {
        const newDonation: Donation = {
            id: `DON${Date.now()}`,
            devoteeId: user.id,
            devoteeName: user.username,
            date: new Date().toISOString().split('T')[0],
            paymentId: paymentResponse.razorpay_payment_id,
            amount: amount,
            ...donationData,
        };
        onSaveDonation(newDonation);
        handleModalClose();
    };

    initiatePayment(paymentDetails, onSuccess);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{t('sevasForYou')}</h2>
        <p className="mt-2 text-lg text-gray-600">{t('sevaBlessings')}</p>
      </div>

      <SevaList sevas={allSevas} onDonate={handleDonateClick} onGeneralDonate={handleGeneralDonationClick} />

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('myDonationHistory')}</h3>
        <DonationTable donations={userDonations} isAdmin={false} />
      </div>

      {modalState.mode && (
        <DonationModal
            isOpen={!!modalState.mode}
            onClose={handleModalClose}
            onSave={handleModalSave as any}
            mode={modalState.mode === 'seva' ? 'devotee-seva' : 'devotee-general'}
            seva={modalState.data}
            user={user!}
        />
      )}
    </div>
  );
};

export default DevoteeDashboard;
