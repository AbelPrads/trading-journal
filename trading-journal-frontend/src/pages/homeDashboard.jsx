import React, { useEffect, useState} from 'react';
import axios from 'axios';
import loadingResources from '../components/loadingResources';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


export const homeDashboard = () => {
  const [dashboard, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    setLoading(true);
      axios
        .get('http://localhost:5173/dashboard')
        .then((response) => {
          setTrades(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
  }, []);

  return (
    <div className='p-4'>
      
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Books List</h1>
          <Link to='/dashboard/addTrade'>
            <MdOutlineAddBox className='text-sky-800 text-4x1' />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th>
                  
                </th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        )}
    </div>
  )
}

export default homeDashboard;