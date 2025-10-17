import React, { useState } from 'react';
import type { Donation, Seva } from '../types';
import DonationSummary from './DonationSummary';
import SevaDonationSummary from './SevaDonationSummary';
import DonationTable from './DonationTable';
import SevaManagement from './SevaManagement';
import { exportDonationsToCsv } from '../services/csvExporter';
import DownloadIcon from './icons/DownloadIcon';
import PlusIcon from './icons/PlusIcon';
import { DonationModal } from './DonationModal';
import { useTranslation } from '../hooks/useTranslation';

interface AdminDashboardProps {
    donations: Donation[];
    sevas: Seva[];
    onSaveDonation: (donation: Donation) => void;
    onDeleteDonation: (donationId: string) => void;
    onSaveSeva: (seva: Seva) => void;
    onDeleteSeva: (sevaId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ donations, sevas, onSaveDonation, onDeleteDonation, onSaveSeva, onDeleteSeva }) => {
  const [modalState, setModalState] = useState<{ mode: 'add' | 'edit' | null, data?: Donation }>({ mode: null });
  const { t } = useTranslation();

  const handleEditClick = (donation: Donation) => {
    setModalState({ mode: 'edit', data: donation });
  };

  const handleAddClick = () => {
    setModalState({ mode: 'add' });
  };
  
  const handleModalClose = () => {
    setModalState({ mode: null });
  };

  const handleModalSave = (donationData: Donation) => {
    onSaveDonation(donationData);
    handleModalClose();
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-gray-800">{t('adminDashboard')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DonationSummary donations={donations} />
        <SevaDonationSummary donations={donations} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
           <h3 className="text-2xl font-bold text-gray-800">{t('allDonations')}</h3>
           <div className="flex items-center gap-4">
              <button 
                onClick={handleAddClick}
                className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                  <PlusIcon className="h-5 w-5" />
                  <span>{t('addDonation')}</span>
              </button>
              <button 
                onClick={() => exportDonationsToCsv(donations)}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                  <DownloadIcon className="h-5 w-5" />
                  <span>{t('exportAsCSV')}</span>
              </button>
           </div>
        </div>
        <DonationTable 
          donations={donations} 
          isAdmin={true} 
          onEdit={handleEditClick}
          onDelete={onDeleteDonation}
        />
      </div>

      <SevaManagement 
        sevas={sevas}
        onSave={onSaveSeva}
        onDelete={onDeleteSeva}
      />

      {modalState.mode && (
        <DonationModal
            isOpen={!!modalState.mode}
            onClose={handleModalClose}
            onSave={handleModalSave}
            mode={modalState.mode === 'add' ? 'admin-add' : 'admin-edit'}
            donationToEdit={modalState.data}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
