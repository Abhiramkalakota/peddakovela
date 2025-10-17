import React from 'react';
import type { Donation } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface DonationSummaryProps {
  donations: Donation[];
}

const DonationSummary: React.FC<DonationSummaryProps> = ({ donations }) => {
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalDonations = donations.length;
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('donationOverview')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-amber-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-amber-800">{t('totalRevenue')}</p>
          <p className="text-3xl font-bold text-amber-900">₹{totalAmount.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-blue-800">{t('totalDonations')}</p>
          <p className="text-3xl font-bold text-blue-900">{totalDonations}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationSummary;
