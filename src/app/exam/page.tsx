'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { selectedAnswersState } from '../store/examDataStore';
import * as data from '../data/exam';
import { basePath } from '../../../next.config';
import ConfirmModal from '../components/confirmModal';
import PointDisplayModal from '../components/pointDisplayModal';
import Timer from '../components/timer';

const BASE_PATH = basePath ? basePath : '';

// 問題と選択肢の型定義
type QuizItem = {
  question: string;
  image: string | null;
  options: string[];
  from: string;
  correctAnswer: number;
  reason: string;
  valid: boolean;
};

// デモ用の問題リスト
const demoQuizItems: QuizItem[] = data.examData.filter(
  (item) => item.valid == true
);
const correctPic = '/correct.png';
const uncorrectPic = '/uncorrect.png';

// クイズページコンポーネント
export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] =
    useRecoilState(selectedAnswersState);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openPointModal, setOpenPointModal] = useState<boolean>(false);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  useEffect(() => {
    const defaultAnswers = demoQuizItems.map((item, index) => {
      const defaultAnswer = {
        selectedNumber: null,
        isCorrect: false,
      };
      return defaultAnswer;
    });
    setSelectedAnswers(defaultAnswers);
  }, []);

  const handleOptionChange = (
    index: number,
    option: string,
    optionIndex: number
  ) => {
    const updatedAnswers = selectedAnswers.map((answer, idx) => {
      if (index === idx) {
        const isCorrect =
          demoQuizItems[index].correctAnswer === optionIndex + 1;
        return {
          ...answer,
          selectedNumber: optionIndex + 1,
          isCorrect: isCorrect,
        };
      }
      return answer;
    });
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log('selectedAnswers: ', selectedAnswers);
    let correctCount = 0;

    demoQuizItems.map((item, index) => {
      const isCorrect =
        item.correctAnswer === selectedAnswers[index].selectedNumber;
      if (isCorrect) correctCount++;
    });

    setScore(Math.round((correctCount / demoQuizItems.length) * 100));

    setOpen(true);
  };

  const handleReturn = () => {
    setIsSubmitted(!isSubmitted);
  };

  return (
    <div className='p-4'>
      {isTimerActive ? (
        <div className='fixed w-1/12 h-20 items-center justify-center z-50 bottom-10 right-10 py-5 px-2 bg-gray-400 opacity-60 rounded-lg'>
          <Timer setIsTimerActive={setIsTimerActive} />
        </div>
      ) : null}
      <h1 className='text-3xl font-bold text-center mb-6'>高須式</h1>
      <h1 className='text-3xl font-bold text-center mb-6'>
        中小企業診断士 想定問題集
      </h1>
      {demoQuizItems.map((item, index) => (
        <div
          key={index}
          className='mb-4 pr-4 pl-4 pt-4 border border-gray-200 rounded-lg'
        >
          <div className='mb-2 pr-4 pl-4 pt-4 pb-2 rounded-lg'>
            <div className='flex mb-3 text-2xl font-bold text-gray-600 lg:text-2xl'>
              問題 {index + 1}
            </div>
            <div
              className='flex text-lg mb-3'
              style={{ whiteSpace: 'pre-line' }}
            >
              {item.question}
            </div>
            <div className='text-sm mb-3'>（{item.from}）</div>
          </div>
          <div className='mb-4 pr-4 pl-4 pt-4 pb-2 rounded-lg'>
            {item.image ? (
              <div className='flex items-center justify-center mb-4'>
                <Image
                  src={BASE_PATH + item.image}
                  width={'500'}
                  height={'300'}
                  alt='no-images'
                  className='flex'
                />
              </div>
            ) : (
              <div></div>
            )}
            <div className='flex flex-col gap-2 pt-4 pb-4'>
              {item.options.map((option, optionIndex) => (
                <label key={option} className='flex items-center gap-2 mb-2'>
                  <input
                    type='radio'
                    name={`question-${index}`}
                    value={option}
                    onChange={() =>
                      handleOptionChange(index, option, optionIndex)
                    }
                    className='accent-blue-500'
                  />
                  <span className='text-md'>{option}</span>
                </label>
              ))}
            </div>
            {isSubmitted ? (
              <div
                className={`flex flex-col gap-2 mt-4 mb-4 p-4 border ${
                  selectedAnswers[index].isCorrect
                    ? 'border-blue-500'
                    : 'border-red-500'
                } rounded-lg grid grid-flow-col grid-cols-12`}
              >
                <div className='col-span-2 flex justify-center items-center'>
                  <Image
                    src={
                      selectedAnswers[index].isCorrect
                        ? BASE_PATH + correctPic
                        : BASE_PATH + uncorrectPic
                    }
                    alt='no-image'
                    width={'100'}
                    height={'100'}
                  />
                </div>
                <div className='col-span-10'>
                  <div
                    className={`text-lg font-bold mb-2 ${
                      selectedAnswers[index].isCorrect
                        ? 'text-blue-500'
                        : 'text-red-500'
                    }`}
                  >
                    結果 :{' '}
                    {selectedAnswers[index].selectedNumber ===
                    item.correctAnswer
                      ? '正答'
                      : '誤答'}
                  </div>
                  <div className='mb-2'>
                    あなたの回答: {selectedAnswers[index].selectedNumber}
                  </div>
                  <div className='mb-2'>正解: {item.correctAnswer}</div>
                  <div className='mb-2' style={{ whiteSpace: 'pre-line' }}>
                    解説：{item.reason}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <div className='flex justify-center'>
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600'
          >
            採点
          </button>
        ) : (
          <button
            onClick={handleReturn}
            className='mt-4 px-4 py-2 bg-gray-400 text-white font-bold rounded hover:bg-gray-500'
          >
            回答に戻る
          </button>
        )}
      </div>
      {isSubmitted ? (
        <div className='flex items-baseline justify-center gap-2 mt-10 mb-4 p-4 rounded-lg'>
          <h1 className='text-xl flex items-center justify-center'>
            あなたの得点：
          </h1>

          <div className='flex items-center justify-center'>
            <h1 className='text-5xl font-bold '>{score} 点</h1>
          </div>
        </div>
      ) : null}
      {/* 確認モーダル */}
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        setOpenPointModal={setOpenPointModal}
        setIsTimerActive={setIsTimerActive}
      />
      {/* 得点モーダル */}
      <PointDisplayModal
        openPointModal={openPointModal}
        setOpenPointModal={setOpenPointModal}
        score={score}
      />
    </div>
  );
}
