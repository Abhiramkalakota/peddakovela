import React, { useState } from 'react';
import type { Seva } from '../types';
import SevaModal from './SevaModal';
import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';
import PlusIcon from './icons/PlusIcon';
import { useTranslation } from '../hooks/useTranslation';

interface SevaManagementProps {
  sevas: Seva[];
  onSave: (seva: Seva) => void;
  onDelete: (sevaId: string) => void;
}

const SevaManagement: React.FC<SevaManagementProps> = ({ sevas, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeva, setEditingSeva] = useState<Partial<Seva> | null>(null);
  const { t } = useTranslation();

  const handleOpenModal = (seva?: Seva) => {
    setEditingSeva(seva || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSeva(null);
  };

  const handleSave = (seva: Seva) => {
    onSave(seva);
    handleCloseModal();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h3 className="text-2xl font-bold text-gray-800">{t('manageSevas')}</h3>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          <PlusIcon className="h-5 w-5" />
          <span>{t('addNewSeva')}</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-amber-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Timing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t('amount')}</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">{t('actions')}</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {sevas.map(seva => (
                    <tr key={seva.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seva.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seva.timing}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">₹{seva.amount.toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <button onClick={() => handleOpenModal(seva)} className="text-amber-600 hover:text-amber-900 mr-4">
                                <EditIcon className="h-5 w-5" />
                            </button>
                            <button onClick={() => onDelete(seva.id)} className="text-red-600 hover:text-red-900">
                                <DeleteIcon className="h-5 w-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {isModalOpen && (
        <SevaModal
          seva={editingSeva}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SevaManagement;
