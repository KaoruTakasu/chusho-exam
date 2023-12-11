'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function Example() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/exam');
  };

  return (
    <div>
      <div
        className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            高須式
          </h1>
          <br />
          <h1 className='text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            中小企業診断士 想定問題集
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <button
              onClick={handleSubmit}
              className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600'
            >
              テストへ進む
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
