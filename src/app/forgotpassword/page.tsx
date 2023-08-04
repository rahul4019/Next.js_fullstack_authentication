'use client';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleSubmit = async () => {
    try {
      // Custom email validation checks
      const isValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        email
      ); // Simple email format check
      const isNotEmpty = email.trim() !== '';

      // Update the state with the validation result
      setIsValidEmail(isValid && isNotEmpty);

      if (!isValidEmail) {
        toast.error('Please enter a valid email Id');
        return;
      }
      
      const response = await axios.post('/api/users/forgotpassword', { email });
      setEmail('');
      toast.success(response.data.message);
    } catch (error: any) {
       toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen my-10 flex flex-col items-center">
      <div className="w-full px-6 md:w-1/3 md:p-0">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          placeholder="Enter your email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <p className="mt-1 text-xs text-gray-500">*This field is required</p>
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

export default ForgotPassword;
