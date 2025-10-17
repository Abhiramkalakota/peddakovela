import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import DevoteeDashboard from './components/DevoteeDashboard';
import Header from './components/Header';
import { Role, Donation, Seva } from './types';
import { MOCK_DONATIONS, MOCK_SEVAS } from './constants';

export const App: React.FC = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [sevas, setSevas] = useState<Seva[]>(MOCK_SEVAS);

  const handleSaveDonation = (donationToSave: Donation) => {
    const existingIndex = donations.findIndex(d => d.id === donationToSave.id);
    if (existingIndex > -1) {
      // Update existing donation
      setDonations(prev => {
        const newDonations = [...prev];
        newDonations[existingIndex] = donationToSave;
        return newDonations;
      });
      alert(`Donation ${donationToSave.id} updated.`);
    } else {
      // Add new donation
      setDonations(prev => [...prev, donationToSave]);
       // No alert for new donations from devotee flow as payment alert is shown
      if(user?.role === Role.ADMIN) {
        alert('New donation record added.');
      }
    }
     // In a real app, you would also make an API call here
  };

  const handleDeleteDonation = (donationId: string) => {
    if (window.confirm(`Are you sure you want to delete donation ${donationId}?`)) {
        setDonations(prev => prev.filter(d => d.id !== donationId));
        alert(`Donation ${donationId} deleted.`);
         // In a real app, you would also make an API call here
    }
  };

  const handleSaveSeva = (sevaToSave: Seva) => {
    const existing = sevas.find(s => s.id === sevaToSave.id);
    if (existing) {
        setSevas(sevas.map(s => s.id === sevaToSave.id ? sevaToSave : s));
        alert(`Seva "${sevaToSave.name}" updated.`);
    } else {
        setSevas([...sevas, sevaToSave]);
        alert(`Seva "${sevaToSave.name}" added.`);
    }
     // In a real app, you would also make an API call here
  };

  const handleDeleteSeva = (sevaId: string) => {
     if (window.confirm(`Are you sure you want to delete this Seva? This action cannot be undone.`)) {
        setSevas(sevas.filter(s => s.id !== sevaId));
        alert(`Seva deleted.`);
     }
      // In a real app, you would also make an API call here
  };


  return (
    <div className="min-h-screen font-sans text-stone-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!user ? (
          <LoginPage />
        ) : user.role === Role.ADMIN ? (
          <AdminDashboard 
            donations={donations}
            sevas={sevas}
            onSaveDonation={handleSaveDonation}
            onDeleteDonation={handleDeleteDonation}
            onSaveSeva={handleSaveSeva}
            onDeleteSeva={handleDeleteSeva}
          />
        ) : (
          <DevoteeDashboard
            userDonations={donations.filter(d => d.devoteeId === user?.id)}
            allSevas={sevas}
            onSaveDonation={handleSaveDonation}
          />
        )}
      </main>
    </div>
  );
};
