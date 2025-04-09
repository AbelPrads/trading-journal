import React, { useState } from 'react';
import AddTradeModal from '../modals/AddTradeModal';
import UpdateTradeModal from '../modals/UpdateTradeModal';
import RenderStatus from '../render/renderStatus';

export const TradeManagementButton = ({
  event, 
  status, 
  id, 
  symbol, 
  stop, 
  avePrice, 
  shares, 
  side, 
  setup, 
  exit, 
  remarks,
  onUpdateSuccess  // Add this prop to handle refresh
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle successful update
  const handleUpdateSuccess = () => {
    if (onUpdateSuccess) {
      onUpdateSuccess();
    }
    closeModal();
  };

  switch (event) {
    case 'ADD TRADE':
      return (
        <>
          <button
            className="flex-none w-9 border-2 border-button ease-out duration-200 drop-shadow-lg flex rounded-md items-center justify-center p-1 hover:bg-button"
            onClick={openModal}
          >
            <span className="font-albert font-black text-[12px] whitespace-nowrap tracking-[.16em] text-white -rotate-90">
              {event}
            </span>
          </button>
          <AddTradeModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            onUpdateSuccess={handleUpdateSuccess}  // Pass the callback
          />
        </>
      );
    case 'UPDATE TRADE':
      return (
        <>
          <button onClick={openModal}>
            {RenderStatus(status)}
          </button>
          <UpdateTradeModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            onUpdateSuccess={handleUpdateSuccess}  // Pass the callback
            useStatus={status} 
            useId={id} 
            useSymbol={symbol}
            useStop={stop}
            useAvePrice={avePrice}
            useShares={shares}
            useSide={side}
            useSetup={setup}
            useExit={exit}
            useRemarks={remarks}
          />
        </> 
      );
    case 'DELETE TRADE':
      return (
        <>
          <DeleteTradeModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            useId={id}
            onUpdateSuccess={handleUpdateSuccess}  // Pass the callback
          />
        </> 
      );
    default:
      return null;
  }
};

export default TradeManagementButton;