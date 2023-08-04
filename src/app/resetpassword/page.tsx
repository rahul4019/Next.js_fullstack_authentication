'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, [token]);

  const handleSubmit = async () => {
    try {
      if (password.trim() === '') {
        return toast.error('Password field cannot be empty');
      }
      if (password !== confirmPassword) {
        return toast.error("Password and confirm password don't match");
      }

      const response = await axios.post('/api/users/resetpassword', {
        token,
        password,
      });

      toast.success(response.data.message);
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-10 items-center gap-5">
      <h1 className="text-2xl">Reset your password</h1>
      <div className="w-full px-6 md:w-1/3 md:p-0 flex  flex-col">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="email"
        >
          Password
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          placeholder="Enter your email"
          id="email"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div className="w-full px-6 md:w-1/3 md:p-0">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="email"
        >
          Confirm password
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          placeholder="Enter your email"
          id="email"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        ></input>
      </div>
      <button
        type="button"
        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default ResetPassword;
