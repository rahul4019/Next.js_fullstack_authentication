'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import React from 'react';

const VerifyEmailPage = () => {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-4xl">Verify email</h1>
      <h2 className="p-2 bg-orange-400 text-black">
        {token ? `${token}` : 'no token'}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login" className='underline underline-offset-2 text-blue-700'>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>{' '}
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
