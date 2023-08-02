'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState('');
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center gap-3">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="text-2xl text-purple-500 hover:underline-offset-2 hover:underline ">
        {data ? <Link href={`/profile/${data}`}>{data}</Link> : 'No data'}
      </h2>
      <button
        type="button"
        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        onClick={logout}
      >
        Logout
      </button>
      <button
        type="button"
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-blue-900"
        onClick={getUserDetails}
      >
        Get Details
      </button>
    </div>
  );
};

export default ProfilePage;
