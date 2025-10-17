import React from 'react';
import type { Donation } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface SevaDonationSummaryProps {
  donations: Donation[];
}

const SevaDonationSummary: React.FC<SevaDonationSummaryProps> = ({ donations }) => {
  const { t } = useTranslation();
  const summary: Record<string, { total: number; count: number }> = {};

  donations.forEach(donation => {
    if (!summary[donation.seva]) {
      summary[donation.seva] = { total: 0, count: 0 };
    }
    summary[donation.seva].total += donation.amount;
    summary[donation.seva].count += 1;
  });

  const sortedSummary = Object.entries(summary).sort(([, a], [, b]) => b.total - a.total);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('donationsBySeva')}</h3>
       <div className="space-y-3 max-h-60 overflow-y-auto">
        {sortedSummary.length > 0 ? sortedSummary.map(([seva, data]) => (
          <div key={seva} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div>
                <p className="font-semibold text-gray-700">{seva}</p>
                <p className="text-sm text-gray-500">{data.count} donation{data.count > 1 ? 's' : ''}</p>
            </div>
            <p className="font-bold text-gray-800">₹{data.total.toLocaleString('en-IN')}</p>
          </div>
        )) : <p className="text-center text-gray-500 py-4">No donations to summarize.</p>}
      </div>
    </div>
  );
};

export default SevaDonationSummary;
