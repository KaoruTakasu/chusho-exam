'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { selectedAnswersState } from '../store/examDataStore';
import * as data from '../data/exam';

// 問題と選択肢の型定義
type QuizItem = {
  question: string;
  image: string | null;
  options: string[];
  from: string;
  correctAnswer: number;
  reason: string;
};

// デモ用の問題リスト
const demoQuizItems: QuizItem[] = data.examData;
const correctPic = '/correct.png';
const uncorrectPic = '/uncorrect.png';

// クイズページコンポーネント
export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] =
    useRecoilState(selectedAnswersState);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const router = useRouter();

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

    setScore((correctCount / demoQuizItems.length) * 100);

    setIsSubmitted(!isSubmitted);
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold text-center mb-6'>
        高須式 中小企業診断士 想定問題集
      </h1>
      {demoQuizItems.map((item, index) => (
        <div key={index} className='mb-4 p-4 border border-gray-200 rounded-lg'>
          <div key={index} className='mb-4 p-4 rounded-lg'>
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
          <div key={index} className='mb-4 p-4 rounded-lg'>
            {item.image ? (
              <img
                src={item.image}
                width={'500'}
                height={'300'}
                alt='no-images'
              />
            ) : (
              <div></div>
            )}
            <div className='flex flex-col gap-2 mb-5'>
              {item.options.map((option, optionIndex) => (
                <label key={option} className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name={`question-${index}`}
                    value={option}
                    onChange={() =>
                      handleOptionChange(index, option, optionIndex)
                    }
                    className='accent-blue-500'
                  />
                  <span className='text-md mb-2'>{option}</span>
                </label>
              ))}
            </div>
            {isSubmitted ? (
              <div
                className={`flex flex-col gap-2 mt-2 mb-4 p-4 border ${
                  selectedAnswers[index].isCorrect
                    ? 'border-blue-500'
                    : 'border-red-500'
                } rounded-lg grid grid-flow-col grid-cols-12`}
              >
                <div className='col-span-2 flex justify-center items-center'>
                  <img
                    src={
                      selectedAnswers[index].isCorrect
                        ? correctPic
                        : uncorrectPic
                    }
                    alt='no-image'
                    width={'100'}
                    height={'100'}
                  ></img>
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
                  <div className='mb-2'>解説：{item.reason}</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <div className='flex flex-col gap-2 mt-2 mb-4 p-4 border border-blue-500 rounded-lg'>
        <h1>あなたの得点：</h1>
        {isSubmitted ? (
          <div className='flex justify-center flex-col gap-2 mt-2'>
            <h1 className='bold '>{score} 点</h1>
          </div>
        ) : null}
      </div>
      <div className='flex justify-center'>
        <button
          onClick={handleSubmit}
          className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600'
        >
          採点
        </button>
      </div>
    </div>
  );
}
