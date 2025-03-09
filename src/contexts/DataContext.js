import React, { createContext, useState, useContext, useEffect } from 'react';
import { partnershipData, addExpiringAgreement } from '../data/sampleData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Initialize state from localStorage or fallback to sample data
  const [partners, setPartners] = useState(() => {
    try {
      const savedPartners = localStorage.getItem('unido-partners');
      return savedPartners ? JSON.parse(savedPartners) : partnershipData;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return partnershipData;
    }
  });

  // Save to localStorage whenever partners change
  useEffect(() => {
    try {
      localStorage.setItem('unido-partners', JSON.stringify(partners));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [partners]);

  const addPartner = (newPartner) => {
    const newId = partners.length > 0 
      ? Math.max(...partners.map(p => p.id)) + 1 
      : 1;
    setPartners([...partners, { ...newPartner, id: newId }]);
  };

  const updatePartner = (updatedPartner) => {
    setPartners(partners.map(p => p.id === updatedPartner.id ? updatedPartner : p));
  };

  const deletePartner = (partnerId) => {
    setPartners(partners.filter(p => p.id !== partnerId));
  };

  const importPartners = (newPartners) => {
    // Assign IDs to imported partners if they don't have them
    const partnersWithIds = newPartners.map((partner, index) => ({
      ...partner,
      id: partner.id || partners.length + index + 1
    }));
    setPartners([...partnersWithIds]);
  };

  const resetToSampleData = () => {
    // Ensure we have an expiring agreement for demo purposes
    addExpiringAgreement();
    setPartners(partnershipData);
  };

  return (
    <DataContext.Provider value={{
      partners,
      addPartner,
      updatePartner,
      deletePartner,
      importPartners,
      resetToSampleData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
