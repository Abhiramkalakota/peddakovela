import React, { createContext, useState, useContext, ReactNode } from 'react';

// Hardcode translations to avoid import/fetch issues and syntax errors.
const enTranslations = {
  "templeConnect": "Temple Connect",
  "welcome": "Welcome",
  "logout": "Logout",
  "signInToContinue": "Sign in to continue",
  "iAmA": "I am a",
  "devotee": "Devotee",
  "admin": "Admin",
  "username": "Username",
  "password": "Password",
  "signIn": "Sign In",
  "adminDashboard": "Admin Dashboard",
  "donationOverview": "Donation Overview",
  "totalRevenue": "Total Revenue",
  "totalDonations": "Total Donations",
  "donationsBySeva": "Donations by Seva",
  "allDonations": "All Donations",
  "exportAsCSV": "Export as CSV",
  "manageSevas": "Manage Sevas",
  "addNewSeva": "Add New Seva",
  "sevasForYou": "Sevas for You",
  "sevaBlessings": "Participate in a Seva and receive divine blessings.",
  "myDonationHistory": "My Donation History",
  "donate": "Donate",
  "proceedToPay": "Proceed to Pay",
  "saveDonation": "Save Donation",
  "donationId": "Donation ID",
  "amount": "Amount",
  "sevaPurpose": "Seva/Purpose",
  "date": "Date",
  "paymentId": "Payment ID",
  "actions": "Actions",
  "editDonationRecord": "Edit Donation Record",
  "updateDonation": "Update Donation",
  "cancel": "Cancel",
  "addDonation": "Add Donation",
  "makeGeneralDonation": "Make a General Donation",
  "generalDonation": "General Donation",
  "donateFor": "Donate for {sevaName}",
  "optionalDetails": "Please provide the following details for the temple records (optional).",
  "phoneNumber": "Phone Number",
  "gotram": "Gotram",
  "familyNames": "Names of Family Members",
  "phonePlaceholder": "For receipt and updates",
  "familyNamesPlaceholder": "e.g., Spouse Name, Child Name",
  "donationAmount": "Donation Amount (₹)",
  "devoteeName": "Devotee Name",
  "requiredField": "This field is required",
  "addDonationRecord": "Add New Donation Record",
  "editSeva": "Edit Seva",
  "addSeva": "Add New Seva",
  "saveSeva": "Save Seva"
};

const teTranslations = {
  "templeConnect": "టెంపుల్ కనెక్ట్",
  "welcome": "స్వాగతం",
  "logout": "లాగ్ అవుట్",
  "signInToContinue": "కొనసాగించడానికి సైన్ ఇన్ చేయండి",
  "iAmA": "నేను ఒక",
  "devotee": "భక్తుడు",
  "admin": "నిర్వాహకుడు",
  "username": "యూజర్‌నేమ్",
  "password": "పాస్‌వర్డ్",
  "signIn": "సైన్ ఇన్",
  "adminDashboard": "అడ్మిన్ డాష్‌బోర్డ్",
  "donationOverview": "విరాళాల అవలోకనం",
  "totalRevenue": "మొత్తం ఆదాయం",
  "totalDonations": "మొత్తం విరాళాలు",
  "donationsBySeva": "సేవల వారీగా విరాళాలు",
  "allDonations": "అన్ని విరాళాలు",
  "exportAsCSV": "CSVగా ఎగుమతి చేయండి",
  "manageSevas": "సేవలను నిర్వహించండి",
  "addNewSeva": "కొత్త సేవను జోడించండి",
  "sevasForYou": "మీ కోసం సేవలు",
  "sevaBlessings": "సేవలో పాల్గొని దైవానుగ్రహం పొందండి.",
  "myDonationHistory": "నా విరాళాల చరిత్ర",
  "donate": "విరాళం ఇవ్వండి",
  "proceedToPay": "చెల్లించడానికి కొనసాగండి",
  "saveDonation": "విరాళం సేవ్ చేయండి",
  "donationId": "విరాళం ID",
  "amount": "మొత్తం",
  "sevaPurpose": "సేవ/ప్రయోజనం",
  "date": "తేదీ",
  "paymentId": "చెల్లింపు ID",
  "actions": "చర్యలు",
  "editDonationRecord": "విరాళం రికార్డును సవరించండి",
  "updateDonation": "విరాళాన్ని నవీకరించండి",
  "cancel": "రద్దు చేయండి",
  "addDonation": "విరాళం జోడించండి",
  "makeGeneralDonation": "సాధారణ విరాళం ఇవ్వండి",
  "generalDonation": "సాధారణ విరాళం",
  "donateFor": "{sevaName} కోసం విరాళం ఇవ్వండి",
  "optionalDetails": "దయచేసి ఆలయ రికార్డుల కోసం క్రింది వివరాలను అందించండి (ఐచ్ఛికం).",
  "phoneNumber": "ఫోన్ నంబర్",
  "gotram": "గోత్రం",
  "familyNames": "కుటుంబ సభ్యుల పేర్లు",
  "phonePlaceholder": "రసీదు మరియు నవీకరణల కోసం",
  "familyNamesPlaceholder": "ఉదా., జీవిత భాగస్వామి పేరు, పిల్లల పేరు",
  "donationAmount": "విరాళం మొత్తం (₹)",
  "devoteeName": "భక్తుని పేరు",
  "requiredField": "ఈ ఫీల్డ్ అవసరం",
  "addDonationRecord": "కొత్త విరాళం రికార్డును జోడించండి",
  "editSeva": "సేవను సవరించండి",
  "addSeva": "కొత్త సేవను జోడించండి",
  "saveSeva": "సేవను సేవ్ చేయండి"
};

export type Locale = 'en' | 'te';
type Translations = Record<string, string>;

const allTranslations: Record<Locale, Translations> = {
  en: enTranslations,
  te: teTranslations,
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  const translations = allTranslations[locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, translations }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
