import { atom } from 'recoil';

type SelectedAnswer = {
  selectedNumber: number | null;
  isCorrect: boolean;
};

export const selectedAnswersState = atom<SelectedAnswer[]>({
  key: 'selectedAnswersState',
  default: [],
});
