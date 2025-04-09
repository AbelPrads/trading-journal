import React, { useState, memo, useCallback } from 'react';
import axios from 'axios';

import pseList from '../../../constants/pseList';

const fieldInputs = () => (
  "block w-full border border-gray-300 rounded-md shadow-sm text-[13px] font-albert font-regular p-1 subpixel-antialiased ease-out duration-100 hover:font-bold"
);

const AddTradeModal = ({ isOpen, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    status: 'PENDING',
    symbol: '2GO',
    stop: '0',
    avePrice: '0',
    shares: '0',
    side: 'LONG',
    setup: '—',
    remarks: '—'
  });

  // Handle all input changes with a single function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tradeData = {
      status: formData.status,
      symbol: formData.symbol,
      stop:  parseFloat(formData.stop),
      avePrice: parseFloat(formData.avePrice),
      shares: parseInt(formData.shares, 10),
      side: formData.side,
      setup: formData.setup,
      remarks: formData.remarks,
    };

    console.log('Submitting trade data:', tradeData);

    try {
      const response = await axios.post('http://localhost:3000/dashboard', tradeData);

      if (response.status === 200) {
        console.log('Trade added successfully');
        onClose();
        onUpdateSuccess();
      } else {
        console.error('Failed to add trade:', response);
      }
    } catch (error) {
      console.error('Error — Failed to Add Trade:', error);
    }
  };

  if (!isOpen) return null;

    // Field configuration to avoid repetition
    const fields = [
      { name: 'status', label: 'STATUS', type: 'select', options: ['PENDING','ACTIVE', 'WIN', 'LOSS'] },
      { name: 'symbol', label: 'TICKER SYMBOL', type: 'select', options: pseList() },
      { name: 'stop', label: 'STOP', type: 'number', step: "any" },
      { name: 'avePrice', label: 'AVERAGE PRICE', type: 'number', step: "any" },
      { name: 'shares', label: 'SHARES', type: 'number', step: "any" },
      { name: 'side', label: 'SIDE', type: 'select', options: ['LONG', 'SHORT'] },
      { name: 'setup', label: 'SETUP', type: 'text' },
      { name: 'remarks', label: 'REMARKS', type: 'text' }
    ];

  return (
    <div className="fixed z-50 inset-0 backdrop-blur-sm bg-gray-800 bg-opacity-40 flex justify-center items-center">
      <div className="bg-homeAnalytics1 p-4 rounded-md shadow-lg w-96">

        <form onSubmit={handleSubmit} className="grid grid-rows-9 gap-y-2">
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
              ENTER
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

export default AddTradeModal;