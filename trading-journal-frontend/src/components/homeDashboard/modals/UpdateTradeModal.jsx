import React, { useState, useEffect } from 'react';
import axios from 'axios';


import pseList from '../../../constants/pseList';

const fieldInputs = () => (
  "block w-full border border-gray-300 rounded-md shadow-sm text-[13px] font-albert font-regular p-1 subpixel-antialiased ease-out duration-100 hover:font-bold"
);

const UpdateTradeModal = ({ 
  isOpen, 
  onClose, 
  onUpdateSuccess,
  useStatus, 
  useId, 
  useSymbol, 
  useStop, 
  useAvePrice, 
  useShares, 
  useSide, 
  useSetup, 
  useExit, 
  useRemarks 
}) => {
  // Clean numeric values - remove currency symbols
  const cleanNumericValue = (value) => {
    if (typeof value === 'string') {
      // Remove currency symbols and other non-numeric characters except decimal point
      return value.replace(/[^\d.-]/g, '');
    }
    return value;
  };

  // Initialize state with values from props
  const [formData, setFormData] = useState({
    status: useStatus || '',
    closedDate: '',
    symbol: useSymbol || '',
    stop: cleanNumericValue(useStop) || '',
    avePrice: cleanNumericValue(useAvePrice) || '',
    shares: cleanNumericValue(useShares) || '',
    side: useSide || '',
    setup: useSetup || '',
    exit: cleanNumericValue(useExit) || '',
    remarks: useRemarks || ''
  });

  // Update state when props change
  useEffect(() => {
    setFormData({
      status: useStatus || '',
      closedDate: '',
      symbol: useSymbol || '',
      stop: cleanNumericValue(useStop) || '',
      avePrice: cleanNumericValue(useAvePrice) || '',
      shares: cleanNumericValue(useShares) || '',
      side: useSide || '',
      setup: useSetup || '',
      exit: cleanNumericValue(useExit) || '',
      remarks: useRemarks || ''
    });
  }, [useStatus, useSymbol, useStop, useAvePrice, useShares, useSide, useSetup, useExit, useRemarks]);

  // Handle all input changes with a single function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const tradeData = {
      status: formData.status,
      closedDate: formData.closedDate ,
      symbol: formData.symbol,
      stop: parseFloat(formData.stop) || 0,
      avePrice: parseFloat(formData.avePrice) || 0,
      shares: parseInt(formData.shares, 10) || 0,
      side: formData.side,
      setup: formData.setup,
      exit: parseFloat(formData.exit) || null,
      remarks: formData.remarks,
    };

    try {
      const response = await axios.put(`http://localhost:3000/dashboard/${useId}`, tradeData);

      if (response.status === 200) {
        console.log('Trade updated successfully');
        onUpdateSuccess();
        onClose();
      } else {
        console.error('Failed to update trade:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/dashboard/${useId}`);
      
      if (response.status === 200) {
        console.log('Trade deleted successfully');
        onUpdateSuccess();
        onClose();
      } else {
        console.error('Failed to delete trade:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  // Field configuration to avoid repetition
  const fields = [
    { name: 'status', label: 'STATUS', type: 'select', options: ['PENDING','ACTIVE', 'WIN', 'LOSS'] },
    { name: 'closedDate', label: 'CLOSED', type: 'date' },
    { name: 'symbol', label: 'TICKER SYMBOL', type: 'select', options: pseList() },
    { name: 'stop', label: 'STOP', type: 'number', step: "any" },
    { name: 'avePrice', label: 'AVERAGE PRICE', type: 'number', step: "any" },
    { name: 'shares', label: 'SHARES', type: 'number', step: "any" },
    { name: 'side', label: 'SIDE', type: 'select', options: ['LONG', 'SHORT'] },
    { name: 'setup', label: 'SETUP', type: 'text' },
    { name: 'exit', label: 'EXIT PRICE', type: 'number', step: "any" },
    { name: 'remarks', label: 'REMARKS', type: 'text' }
  ];

  return (
    <div className="fixed z-50 inset-0 backdrop-blur-sm bg-gray-800 bg-opacity-40 flex justify-center items-center">
      <div className="bg-homeAnalytics1 p-4 rounded-md shadow-lg w-96">

        <form onSubmit={handleUpdate} className="grid grid-rows-10 gap-y-2">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-[12px] text-white font-albert font-light tracking-wider subpixel-antialiased">
                {field.label}
              </label>
              {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={fieldInputs()}
                    >
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={fieldInputs()}
                    step={field.step}
                  />
              )}
            </div>
          ))}

          <div className="flex justify-center gap-x-2 pt-2">
            <button 
              type="submit" 
              className="w-full h-10 bg-button font-albert font-normal text-[14px] text-white rounded-md ease-out duration-200 drop-shadow-lg hover:bg-[#239673] hover:font-bold"
            >
              UPDATE
            </button>

            <button 
              type="button" 
              onClick={handleDelete}
              className="w-full h-10 bg-[#E24B4B] font-albert font-normal text-[14px] text-white rounded-md ease-out duration-200 drop-shadow-lg hover:bg-[#AD3939] hover:font-bold"
            >
              DELETE
            </button>

            <button 
              type="button" 
              className="w-full h-10 bg-[#81828C] font-albert font-normal text-[14px] text-white rounded-md ease-out duration-200 drop-shadow-lg hover:bg-tradeSummary hover:font-bold" 
              onClick={onClose}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTradeModal;