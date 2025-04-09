import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import axios from 'axios';

import LoadingResources from '../../components/common/loadingResources';
import RenderDirection from '../../components/homeDashboard/render/renderDirection';
import TradeManagementButton from '../../components/homeDashboard/buttons/TradeManagementButton';

const API_ENDPOINTS = {
  TRADES: 'http://localhost:3000/dashboard',
  TOTAL_RETURN: 'http://localhost:3000/dashboard-analytics/total-return',
  TOTAL_GAIN_LOSS: 'http://localhost:3000/dashboard-analytics/total-gain-loss',
  TOTAL_WIN_RATE: 'http://localhost:3000/dashboard-analytics/win-rate',
  DAYS_HELD: 'http://localhost:3000/dashboard-analytics/days-held',
  TOP_SETUPS: 'http://localhost:3000/dashboard-analytics/top-setups'
};

const formatCurrency = (value, minimumFractionDigits = 1, maximumFractionDigits = 4) => {
  if (value === null || value === undefined) return '0.0';
  return value.toLocaleString('en-PH', { minimumFractionDigits, maximumFractionDigits });
};

const formatDate = (value) => {
  if (value === null || value === undefined) return '—';
  return format(new Date(value), 'MMM dd, yyyy').toUpperCase() ;
};

const formatNumberWithColor = (value, formatFn = formatCurrency) => {
  if (value === null || value === undefined) return ' —';
  
  const numValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numValue)) return ' —';
  
  const color = numValue < 0 ? '#FF5F5F' : '#86FF8C';
    const formattedValue = formatFn(numValue);
  
  return (
    <span style={{ color }}>
      {formattedValue}
    </span>
  );
};

const HomeDashboard = () => {
  const [trades, setTrades] = useState([]);
  const [totalReturn, setTotalReturn] = useState('₱ 0.00');
  const [totalGainLoss, setTotalGainLoss] = useState('0.00%');
  const [totalWinRate, setWinRate] = useState('0.00%');
  const [daysHeldWins, setDaysHeldWins] = useState('0');
  const [daysHeldLoss, setDaysHeldLoss] = useState('0s');
  const [loading, setLoading] = useState(false);
  const [topSetups, setTopSetups] = useState([]);


  const fetchTrades = useCallback(async () => {
    setLoading(true);
    try {
      const [tradesResponse, returnResponse, gainLossResponse, winRateResponse, daysHeldResponse, topSetups] = await Promise.all([
        axios.get(API_ENDPOINTS.TRADES),
        axios.get(API_ENDPOINTS.TOTAL_RETURN),
        axios.get(API_ENDPOINTS.TOTAL_GAIN_LOSS),
        axios.get(API_ENDPOINTS.TOTAL_WIN_RATE),
        axios.get(API_ENDPOINTS.DAYS_HELD),
        axios.get(API_ENDPOINTS.TOP_SETUPS)
      ]);
      
      setTrades(tradesResponse.data.data || []);
      setTopSetups(topSetups.data.data || []);
      
      const formattedReturn = parseFloat(returnResponse.data || 0);
      const formattedGainLoss = parseFloat(gainLossResponse.data || 0);
      const formattedWinRate = parseFloat(winRateResponse.data.winRate || 0);
      const formattedDaysHeldWins = parseFloat(daysHeldResponse.data.averageWinDaysHeld || 0);
      const formattedDaysHeldLoss = parseFloat(daysHeldResponse.data.averageLossDaysHeld || 0);

      
      setTotalReturn(`₱ ${formatCurrency(formattedReturn,1,2)}`);
      setTotalGainLoss(`${formattedGainLoss}%`);
      setWinRate(`${formattedWinRate}%`);
      setDaysHeldWins(`W ${formattedDaysHeldWins}`);
      setDaysHeldLoss(`L ${formattedDaysHeldLoss}`);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  // Memoize the formatted trades to prevent unnecessary recalculations
  const formattedTrades = useMemo(() => 
    trades.map((trade) => ({
      status: trade.status,
      id: trade._id,
      addedDate: trade.createdAt ? format(parseISO(trade.createdAt), 'MMM dd, yyyy').toUpperCase() : '',
      closedDate: formatDate(trade.closedDate),
      symbol: trade.symbol,
      avePrice: `₱ ${formatCurrency(trade.avePrice)}`,
      shares: trade.shares ? trade.shares.toLocaleString('en-US') : '0.0',
      value: `₱ ${formatCurrency(trade.value)}`,
      stop: `₱ ${formatCurrency(trade.stop, 1, 4)}`,
      exit: (trade.exit !== 0 && trade.exit != null) ? `₱ ${formatCurrency(trade.exit)}` : ' —',
      side: trade.side,
      return: (trade.exit !== 0 && trade.exit != null) ? (formatNumberWithColor(trade.return, value => `₱ ${formatCurrency(value,1,2)}`)) : ' —',
      percentGainLoss: (trade.exit !== 0 && trade.exit != null) ? (formatNumberWithColor(trade.percentGainLoss, value => `${value}%`)) : ' —',
      setup: trade.setup || ' —',
      remarks: trade.remarks || ' —'
    })), [trades]);

  const TableHeader = () => (
    <thead className="bg-tradeSummary h-6 sticky top-0 text-[10px] font-albert font-normal drop-shadow-md tracking-wide text-white">
      <tr>
        <th className="w-[6%] pl-3 py-2 text-left" scope="col">STATUS</th>
        <th className="w-[7%] pl-2 py-2 text-left" scope="col">ADDED</th>
        <th className="w-[7%] pl-2 py-2 text-left" scope="col">CLOSED</th>
        <th className="w-[6%] pl-2 py-2 text-left" scope="col">SYMBOL</th>
        <th className="w-[6%] pl-2 py-2 text-left" scope="col">AVE. PRICE</th>
        <th className="w-[7%] pl-2 py-2 text-left" scope="col">SHARES</th>
        <th className="w-[7%] pl-2 py-2 text-left" scope="col">VALUE</th>
        <th className="w-[7%] pl-2 py-2 text-left" scope="col">STOP LOSS</th>
        <th className="w-[7%] pl-2 py-2 text-left" scope="col">EXIT PRICE</th>
        <th className="w-[6%] pl-2 py-2 text-left" scope="col">DIRECTION</th>
        <th className="w-[7%] pl-2 py-2 text-left" scope="col">RETURN</th>
        <th className="w-[5%] pl-2 py-2 text-left" scope="col">% G/L</th>
        <th className="w-[11%] pl-2 py-2 text-left" scope="col">SETUP</th>
        <th className="w-[7%] pl-2 py-2 text-left" scope="col">REMARKS</th>
      </tr>
    </thead>
  );

  const TableFooter = ({ totalWinRate, totalReturn, totalGainLoss, daysHeldWins, daysHeldLoss }) => {
    const footerColumns = [
      { width: '2%', label: 'WR', value: totalWinRate, align: 'center', style: 'font-extralight' },
      { width: '4%', value: totalWinRate, align: 'left', style: 'font-bold' },
      { width: '8%', label: 'AVE. DAYS HELD', align: 'left', style: 'font-extralight' },
      { width: '3%', value: daysHeldWins, align: 'left', style: 'font-bold' },
      { width: '3%', value: daysHeldLoss, align: 'left', style: 'font-bold' },
      { width: '20%', label: 'MONTHLY CHURN RATE', align: 'right', style: 'font-extralight' },
      { width: '7%', value: '—', align: 'left', style: 'font-bold' },
      { width: '21%', label: 'TOTAL PROFIT/LOSS', align: 'right', style: 'font-extralight' },
      { width: '7%', value: totalReturn, align: 'left', style: 'font-bold' },
      { width: '5%', value: totalGainLoss, align: 'left', style: 'font-bold' },
      { width: '18%', value: '', align: 'left', style: 'font-light' }
    ];
  
    return (
      <div className="bg-homeAnalytics2 rounded-sm mt-1 mb-2">
        <div className="w-full flex text-[10px] font-albert drop-shadow-md tracking-wide text-white">
          {footerColumns.map((column, index) => (
            <div 
              key={index}
              className={`w-[${column.width}] pl-2 py-2 text-${column.align} ${column.style} overflow-hidden whitespace-nowrap text-ellipsis`}
            >
              {column.label || column.value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TableCell = ({ content, className = "text-white" }) => (
    <td className="pl-2 border-b border-opacity-[.05] border-white h-9 min-h-9 align-middle">
      <div className={`text-[10px] font-albert font-light tracking-wide ${className} truncate`}>
        {content}
      </div>
    </td>
  );

  const AnalyticsCard = ({ title, content }) => (
    <div className="bg-homeAnalytics2 drop-shadow-md rounded-md">
      <div className="bg-homeAnalytics1 flex items-center rounded-t-md h-7">
        <p className="ml-3 font-albert font-light text-[13px] tracking-[.13em] text-white">{title}</p>
      </div>
        {content}
      <div className="p-2">
      </div>
    </div>
  );

  return (
    <div className="bg-darkBgDefault flex flex-row gap-2 overflow-auto h-screen">
      {/* NAVIGATION BAR */}
      <div className="z-20 pt-4 bg-homeNavbar flex-none basis-[3.3%] drop-shadow-md border-opacity-10 border-white flex flex-col items-center">
        <div className="relative group">
          <div className="w-11 h-11 rounded-full duration-300 group-hover:bg-[#30323d] flex items-center justify-center">
            <img
              src="src/assets/logo_hdb.png"
              className="w-8 h-8 rounded-full"
              alt="Logo"
            />
          </div>
          <div className="absolute opacity-0 left-full ml-2 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-albert font-normal py-1 px-2 rounded-md shadow-md group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Expand Menu
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow flex flex-col justify-center w-full">
          {/* Navigation items will go here */}
        </nav>
      </div>
      
      {/* TRADE FULL VIEW */}
      <div className="flex-none basis-[80%] h-screen flex flex-col">
        {/* top analytics bar */}
        <div className="flex-none basis-[16%] flex flex-row mt-2 gap-2">
          <TradeManagementButton 
            event="ADD TRADE" 
            onUpdateSuccess={fetchTrades} // Pass the refresh callback
          />
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`flex-${i < 2 ? 'none basis-[25%]' : 'auto w-25 h-25'} bg-home${i < 2 ? 'Analytics1' : 'Analytics2'} border border-opacity-[.05] border-white rounded-md drop-shadow-md`} 
            />
          ))}
        </div>

        {/* pagination info */}
        <div className="flex-auto basis-[2%] mt-2 ml-1 mb-1">
          <p className="text-[10px] font-albert font-extralight tracking-wide text-white">
            Showing 1 to {Math.min(20, trades.length)} of {trades.length} entries
          </p>
        </div>

        {/* trade table */}
        <div className="flex-initial basis-[90%] border border-opacity-[.2] border-white rounded-t-md h-full overflow-auto">
          <table className="w-full table-fixed border-collapse">
            <TableHeader />
            
            {loading ? (
              <LoadingResources />
            ) : (
              <tbody className="align-top">
                {formattedTrades.length > 0 ? (
                  formattedTrades.map((trade) => {
                    const cellData = [
                      { content: trade.addedDate },
                      { content: trade.closedDate },
                      { content: trade.symbol, className: "text-[#00dbfc] font-normal" },
                      { content: trade.avePrice },
                      { content: trade.shares },
                      { content: trade.value },
                      { content: trade.stop },
                      { content: trade.exit },
                      { content: RenderDirection(trade.side) },
                      { content: trade.return },
                      { content: trade.percentGainLoss },
                      { content: trade.setup, className: "text-[#00dbfc] font-normal" },
                      { content: trade.remarks }
                    ];

                    return (
                      <tr key={trade.id} className="h-9">
                        <td className="h-9 min-h-9 pl-2 border-b border-opacity-[.05] border-white">
                          <div className="flex items-center h-full">
                            <TradeManagementButton
                              event="UPDATE TRADE"
                              status={trade.status}
                              id={trade.id}
                              symbol={trade.symbol}
                              stop={trade.stop}
                              avePrice={trade.avePrice}
                              shares={trade.shares}
                              side={trade.side}
                              setup={trade.setup}
                              exit={trade.exit}
                              remarks={trade.remarks}
                              onUpdateSuccess={fetchTrades}
                            />
                          </div>
                        </td>
                        {cellData.map((cell, cellIndex) => (
                          <TableCell key={cellIndex} content={cell.content} className={cell.className} />
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  <tr className="h-9">
                    <td colSpan={14} className="pl-2 py-1 border-b border-opacity-[.05] border-white text-center">
                      <p className="text-[15px] font-albert font-light tracking-wide text-white align-middle">
                        No trades available ...
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
            <TableFooter 
                totalWinRate={totalWinRate} 
                totalReturn={totalReturn} 
                totalGainLoss={totalGainLoss} 
                daysHeldWins={daysHeldWins} 
                daysHeldLoss={daysHeldLoss} 
            />
      </div>

      {/* ANALYTICS SIDEBAR */}
      <div className="flex-initial basis-[18%] flex flex-col overflow-y-auto gap-2 py-2 pr-1">
        <AnalyticsCard title="Top Trading Setup" />
        <AnalyticsCard title="Top Trading Mistake" content={topSetups}/>
        <AnalyticsCard title="Market Sentiment" />
      </div>
    </div>
  );
};

export default HomeDashboard;