'use client';

import { useRouter } from 'next/navigation';
import { examData } from './data/exam';
import { initialSetMinutes } from './components/timer';
import { basePath } from '../../next.config';
import Image from 'next/image';

const BASE_PATH = basePath ? basePath : '';

export default function Example() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/exam');
  };

  const examDataLength = examData.filter((item) => item.valid == true);

  return (
    <div className='flex items-center justify-center'>
      <div
        className='absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
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
      <div className='flex justify-center py-30 sm:py-40 lg:py-50 w-full m-0 pl-0 pr-0'>
        <div className='flex flex-row w-full h-full'>
          <div className='text-center basis-1/2 px-10'>
            <h1 className='3xl:text-10xl 2xl:text-6xl font-bold tracking-tight text-blue-600 lg:text-4xl'>
              高須式
            </h1>
            <br />
            <h1 className='3xl:mb-25 2xl:mb-20 lg:mb-10 3xl:text-8xl 2xl:text-5xl font-bold tracking-tight text-blue-600 lg:text-4xl'>
              中小企業診断士 CCS統一模試
            </h1>
            <p className='3xl:mt-20 2xl:mt-15 lg:mt-10 3xl:text-xl 2xl:text-lg lg:text-md leading-8 text-gray-600'>
              試験問題 {examDataLength.length}問 　制限時間 {initialSetMinutes}
              分
            </p>
            <p className='3xl:mt-10 2xl:mt-4 lg:mt-2 3xl:text-xl 2xl:text-lg lg:text-md leading-8 text-gray-600'>
              「試験開始」の合図があるまで、この画面でお待ちください。
            </p>
            <p className='3xl:text-xl 2xl:text-lg lg:text-md leading-8 text-gray-600'>
              「試験」に進んだ後は、ブラウザの「戻る」ボタンは使用しないでください。
            </p>
            <div className='flex 3xl:mt-30 2xl:mt-28 lg:mt-20 items-center justify-center gap-x-6'>
              <button
                onClick={handleSubmit}
                className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600'
              >
                試験へ進む
              </button>
            </div>
          </div>
          <div className='flex items-center justify-center text-center basis-1/2 px-10'>
            <Image
              src={`${BASE_PATH}/exam.png`}
              alt='exam'
              width={'500'}
              height={'500'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
