import React, { useState } from 'react';
import type { Donation } from '../types';
import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';
import { DonationModal } from './DonationModal';
import { useTranslation } from '../hooks/useTranslation';

interface DonationTableProps {
  donations: Donation[];
  isAdmin: boolean;
  onEdit?: (donation: Donation) => void;
  onDelete?: (donationId: string) => void;
}

const DonationTable: React.FC<DonationTableProps> = ({ donations, isAdmin, onEdit, onDelete }) => {
    const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
    const { t } = useTranslation();

    const handleEditSave = (updatedDonation: Donation) => {
        if (onEdit) {
            onEdit(updatedDonation);
        }
        setEditingDonation(null);
    };


  if (donations.length === 0) {
    return <p className="text-center text-gray-500 py-4">No donation records found.</p>;
  }

  return (
    <>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-amber-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t('donationId')}</th>
            {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t('devotee')}</th>}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t('amount')}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t('sevaPurpose')}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t('date')}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t('paymentId')}</th>
            {isAdmin && <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">{t('actions')}</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {donations.map((donation) => (
            <tr key={donation.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{donation.id}</td>
              {isAdmin && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{donation.devoteeName}</td>}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹{donation.amount.toLocaleString('en-IN')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{donation.seva}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{donation.paymentId || 'N/A'}</td>
              {isAdmin && onEdit && onDelete && (
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button onClick={() => setEditingDonation(donation)} className="text-amber-600 hover:text-amber-900 mr-4 transition duration-150 ease-in-out" aria-label="Edit Donation">
                     <EditIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => onDelete(donation.id)} className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out" aria-label="Delete Donation">
                    <DeleteIcon className="h-5 w-5" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {editingDonation && isAdmin && (
        <DonationModal
            isOpen={!!editingDonation}
            mode="admin-edit"
            donationToEdit={editingDonation}
            onClose={() => setEditingDonation(null)}
            onSave={handleEditSave}
        />
    )}
    </>
  );
};

export default DonationTable;
