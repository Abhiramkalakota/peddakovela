import React from 'react';
import type { Seva } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import PlusIcon from './icons/PlusIcon';

interface SevaListProps {
  sevas: Seva[];
  onDonate: (seva: Seva) => void;
  onGeneralDonate: () => void;
}

const SevaList: React.FC<SevaListProps> = ({ sevas, onDonate, onGeneralDonate }) => {
  const { t } = useTranslation();

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       {/* General Donation Card */}
      <div className="bg-amber-50 rounded-lg shadow-lg border-2 border-dashed border-amber-400 flex flex-col items-center justify-center p-6 text-center transform hover:-translate-y-1 transition-transform duration-300">
        <h3 className="text-xl font-bold text-amber-800 mb-4">{t('makeGeneralDonation')}</h3>
        <button 
          onClick={onGeneralDonate}
          className="flex items-center justify-center h-16 w-16 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition duration-300 shadow-lg"
        >
          <PlusIcon className="h-8 w-8" />
        </button>
      </div>
      
      {sevas.map(seva => (
        <div key={seva.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
          <img src={seva.imageUrl} alt={seva.name} className="w-full h-48 object-cover" />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-800">{seva.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{seva.timing}</p>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{seva.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-lg font-bold text-amber-600">₹{seva.amount.toLocaleString('en-IN')}</p>
              <button 
                onClick={() => onDonate(seva)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {t('donate')}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default SevaList;
