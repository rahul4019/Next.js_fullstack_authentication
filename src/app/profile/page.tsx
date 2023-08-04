'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState({ _id: '', username: '', email: '' });
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
 
    setData({
      ...res.data.user,
    });
   };

  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button
              className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={getUserDetails}
            >
              Get details
            </button>
            <button
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            Username: {data.username && `${data.username}`}
          </h1>
          <p className="font-light text-gray-600 mt-3">
            {data._id ? `User Id: ${data._id}` : 'No data'}
          </p>
          <p className="font-light text-gray-600 mt-3">
            {data.email ? `Email: ${data.email}` : 'No data'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
