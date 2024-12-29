import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingResources from '../components/common/loadingResources';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';

const HomeDashboard = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/dashboard')
      .then((response) => {
        // console.log('API response:', response.data); // Debug log
        setTrades(response.data.data || []);
        // setTimeout(() => {setLoading(false)}, 5000);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
  <div class="bg-darkBgDefault flex flex-row gap-2 overflow-auto h-screen">
      {/* NAVIGATION BAR */}
      <div class="bg-homeNavbar flex-none basis-[2.8%] drop-shadow-lg border-r border-opacity-10 border-white">

      </div>
      {/* TRADE FULL VIEW */}
      <div class="flex-none basis-[80%] h-screen flex flex-col">
          <div class="flex-none basis-[16%] flex flex-row mt-2 gap-2">
              <button class="flex-none w-9 border-2 border-button ease-out duration-200 drop-shadow-lg flex rounded-md items-center justify-center p-1 hover:bg-button">
                <a href="/dashboard/addTrade/" class="font-albert font-black text-[12px] whitespace-nowrap tracking-[.16em] text-white -rotate-90">
                  ADD TRADE
                </a>
              </button>
              <div class="flex-none basis-[25%] bg-homeAnalytics1 border border-opacity-[.05] border-white rounded-lg drop-shadow-lg"></div>
              <div class="flex-none basis-[25%] bg-homeAnalytics1 border border-opacity-[.05] border-white rounded-lg drop-shadow-lg"></div>
              <div class="flex-auto w-25 h-25 bg-homeAnalytics2 border border-opacity-[.05] border-white rounded-lg drop-shadow-lg"></div>
              <div class="flex-auto w-25 h-25 bg-homeAnalytics2 border border-opacity-[.05] border-white rounded-lg drop-shadow-lg"></div>
              <div class="flex-auto w-25 h-25 bg-homeAnalytics2 border border-opacity-[.05] border-white rounded-lg drop-shadow-lg"></div>
              <div class="flex-auto w-25 h-25 bg-homeAnalytics2 border border-opacity-[.05] border-white rounded-lg drop-shadow-lg"></div>
          </div>

          <div class="flex-auto basis-[2%] mt-2 ml-1 mb-1">
          <p class= "text-[9px] font-albert font-thin tracking-wide text-white">Showing 1 to 20 of 150 entries</p>
          </div>

          <div class="flex-initial basis-[90%] border border-opacity-[.05] border-white rounded-t-md h-full overflow-y-auto overflow-x-auto overflow-hidden"> 
              <table class="w-full text-left">  
                  <thead class="bg-tradeSummary sticky top-0">
                    <tr>
                      <th class="w-[7%] pl-3 py-2 "><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">STATUS</p></th>
                      <th class="w-[8%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">DATE</p></th>
                      <th class="w-[6%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">SYMBOL</p></th>
                      <th class="w-[6%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">AVE. PRICE</p></th>
                      <th class="w-[10%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">SHARES</p></th>
                      <th class="w-[10%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">VALUE</p></th>
                      <th class="w-[6%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">STOP LOSS</p></th>
                      <th class="w-[6%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">EXIT</p></th>
                      <th class="w-[6%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">DIRECTION</p></th>
                      <th class="w-[10%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">RETURN</p></th>
                      <th class="w-[5%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">% G/L</p></th>
                      <th class="w-[13%] pl-2 py-2"><p class= "text-[9px] font-albert font-bold drop-shadow-lg tracking-wide text-white">SETUP</p></th>
                      <th class="w-[7%] pl-2 py-2"><p class= "text-[9px] text-center font-albert font-bold drop-shadow-lg tracking-wide text-white">REMARKS</p></th>
                    </tr>
                  </thead>
                {loading ? (<LoadingResources/>) : (
                    <tbody>
                    {trades.map((trade, index) => (
                      <tr key={trade._id} class='h-8'>
                        <td class="pl-7 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.status}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.date}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.symbol}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.avePrice}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.shares}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.value}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.stop}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.exit}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.side}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.return}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.percentGainLoss}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] font-albert font-light tracking-wide text-white">{trade.setup}</p></td>
                        <td class="pl-2 py-1 border-r border-t border-opacity-[.05] border-white"><p class= "text-[10px] text-center font-albert font-light tracking-wide text-white">{trade.remarks}</p></td>
                      </tr>
                    ))}
                    </tbody>
                )}
              </table>  
          </div>

          <div class="flex-auto basis-[5%] bg-homeAnalytics3 border-opacity-[.05] drop-shadow-lg rounded-b-md mb-2"></div>
      </div>
      {/* ANALYTICS */}
      <div class="flex-initial basis-[18%] flex flex-col overflow-y-scroll overscroll-contain gap-2 py-2 pr-1">
          <div class="bg-homeAnalytics2 flex-none basis-[48%] drop-shadow-lg rounded-lg">
              <div class="bg-homeAnalytics1 flex flex-wrap items-center rounded-t-lg"><p class= "ml-4 font-albert font-light text-[13px] tracking-[.13em] text-white">Top Trading Setup</p></div>
              <p class="break-all">Abe;l</p>
          </div>
          <div class="bg-homeAnalytics2 flex-none basis-[48%] drop-shadow-lg rounded-lg">
              <div class="bg-homeAnalytics1 flex items-center rounded-t-lg"><p class= "ml-4 font-albert font-light text-[13px] tracking-[.13em] text-white">Top Trading Mistake</p></div>
              <p class="break-all">Abe;l</p>
          </div>
          <div class="bg-homeAnalytics2 flex-none basis-[48%] drop-shadow-lg rounded-lg">
              <div class="bg-homeAnalytics1 flex-none h-7 items-center rounded-t-lg"><p class= "ml-4 font-albert font-light text-[13px] tracking-[.13em] text-white">Market Sentiment</p></div>
              <p class="break-all">Abe;l</p>
          </div>
      </div>
  </div>
  );
};

export default HomeDashboard;