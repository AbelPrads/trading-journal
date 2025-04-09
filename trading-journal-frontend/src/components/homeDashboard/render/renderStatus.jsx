import React from 'react';

export const renderStatus = (status) => {
  const statusUpper = status.toUpperCase();

  switch (statusUpper) {
    case 'LOSS':
      return (
        <div className="h-6 w-14 rounded-md bg-[#E24B4B] hover:bg-[#A43F3F] border border-opacity-[.10] border-white flex items-center justify-center">
          <p className="text-[10px] text-center font-albert font-bold tracking-wide text-white">
            LOSS
          </p>
        </div>
      );
    case 'WIN':
      return (
        <div className="h-6 w-14 rounded-md bg-[#18BA8A] hover:bg-[#248F70] border border-opacity-[.10] border-white flex items-center justify-center">
          <p className="text-[10px] text-center font-albert font-bold tracking-wide text-white">
            WIN
          </p>
        </div>
      );
    case 'ACTIVE':
      return (
        <div className="h-6 w-14 rounded-md bg-[#E4B723] hover:bg-[#A8832B] border border-opacity-[.10] border-white flex items-center justify-center">
          <p className="text-[10px] text-center font-albert font-bold tracking-wide text-white">
            ACTIVE
          </p>
        </div>
      );
      case 'PENDING':
        return (
          <div className="h-6 w-14 rounded-md bg-[#ff21b5] hover:bg-[#cc168f] border border-opacity-[.10] border-white flex items-center justify-center">
            <p className="text-[10px] text-center font-albert font-bold tracking-wide text-white">
             PENDING
            </p>
          </div>
        );
      default:
          return (
            <div className="h-6 w-14 rounded-md bg-[#ff21b5] hover:bg-[#cc168f] border border-opacity-[.10] border-white flex items-center justify-center">
              <p className="text-[10px] text-center font-albert font-bold tracking-wide text-white">
               PENDING
              </p>
            </div>
          );
  }
};

export default renderStatus;