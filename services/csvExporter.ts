import type { Donation } from '../types';

export const exportDonationsToCsv = (donations: Donation[]): void => {
  if (donations.length === 0) {
    alert("No donation data to export.");
    return;
  }

  const filename = `temple_donations_${new Date().toISOString().split('T')[0]}.csv`;
  const headers = ['Donation ID', 'Payment ID', 'Devotee Name', 'Amount', 'Date', 'Seva/Purpose', 'Gotram', 'Phone Number', 'Family Members'];
  const csvRows = [
    headers.join(','),
    ...donations.map(d => [
      d.id,
      d.paymentId || 'N/A',
      d.devoteeName,
      d.amount,
      d.date,
      `"${d.seva.replace(/"/g, '""')}"`,
      d.gotram || '',
      d.phoneNumber || '',
      `"${d.familyNames?.replace(/"/g, '""') || ''}"`
    ].join(','))
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};