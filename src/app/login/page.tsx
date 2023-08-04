'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogIn = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', user);
      toast.success('Login successful');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            {loading ? 'Loading...' : 'Sign in'}
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgotpassword"
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className={
                    buttonDisabled
                      ? 'inline-flex w-full items-center justify-center rounded-md bg-black opacity-25 px-3.5 py-2.5 font-semibold leading-7 text-white '
                      : 'inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 outline-2 outline-blue-400'
                  }
                  onClick={onLogIn}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3"></div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
