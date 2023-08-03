import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {QuestionnaireItem} from 'components/QuestionnaireItem';

import {generateQuestionnaireItemMap} from 'utils/questionnaire';

interface Questionnaire {
  uri?: string;
  title?: string;
  item: QuestionnaireItem[];
  [key: string]: any;
}

interface QuestionnaireState {
  activeQuestionnaire?: Questionnaire;
  itemMap: null | Record<string, any>;
}

const initialState: QuestionnaireState = {
  activeQuestionnaire: undefined,
  itemMap: null,
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setActiveQuestionnaire: (
      state,
      {payload}: PayloadAction<QuestionnaireState['activeQuestionnaire']>,
    ) => {
      state.activeQuestionnaire = payload;
      state.itemMap = generateQuestionnaireItemMap(payload);
    },
    setAnswer: (
      state,
      {
        payload,
      }: PayloadAction<{answer: any; linkId: string; repeats?: boolean}>,
    ) => {
      const itemMap: Record<string, any> = state.itemMap || {};
      const {answer, linkId, repeats} = payload;
      let newItemMap;
      if (!repeats) {
        newItemMap = {
          ...itemMap,
          [linkId]: {
            ...itemMap[linkId],
            answer: answer ? [answer] : null,
          },
        };
      } else {
        const currentAnswers = itemMap[linkId]?.answer
          ? [...itemMap[linkId].answer]
          : [];
        const foundIdx = currentAnswers.findIndex(
          item => JSON.stringify(item) === JSON.stringify(answer),
        );
        if (foundIdx > -1) {
          currentAnswers.splice(foundIdx, 1);
        } else {
          currentAnswers.push(answer);
        }
        newItemMap = {
          ...itemMap,
          [linkId]: {
            ...itemMap[linkId],
            answer: currentAnswers.length > 0 ? currentAnswers : null,
            done: currentAnswers.length > 0 || !itemMap[linkId].required,
          },
        };
      }
      state.itemMap = newItemMap;
      state.activeQuestionnaire!.started = true;
    },
    removeActiveQuestionnaire: () => {
      return initialState;
    },
  },
});

export const {setActiveQuestionnaire, setAnswer, removeActiveQuestionnaire} =
  questionnaireSlice.actions;

export default questionnaireSlice.reducer;
