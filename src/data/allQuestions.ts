import { ExamQuestion } from '../types/curriculum';
import { AZ900_ACT1_QUESTIONS } from './questions/az900Act1';
import { AZ900_ACT2_QUESTIONS } from './questions/az900Act2';
import { AZ900_ACT3_QUESTIONS } from './questions/az900Act3';
import { AZ104_ACT1_QUESTIONS } from './questions/az104Act1';
import { AZ104_ACT2_QUESTIONS } from './questions/az104Act2';
import { AZ104_ACT3_QUESTIONS } from './questions/az104Act3';
import { AZ104_ACT4_QUESTIONS } from './questions/az104Act4';
import { AZ104_ACT5_QUESTIONS } from './questions/az104Act5';

export const ALL_EXAM_QUESTIONS: ExamQuestion[] = [
  ...AZ900_ACT1_QUESTIONS,
  ...AZ900_ACT2_QUESTIONS,
  ...AZ900_ACT3_QUESTIONS,
  ...AZ104_ACT1_QUESTIONS,
  ...AZ104_ACT2_QUESTIONS,
  ...AZ104_ACT3_QUESTIONS,
  ...AZ104_ACT4_QUESTIONS,
  ...AZ104_ACT5_QUESTIONS
];
