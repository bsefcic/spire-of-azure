import { ExamQuestion } from '../types/curriculum';
import { AZ900_ACT1_QUESTIONS } from './questions/az900Act1';
import { AZ900_ACT2_QUESTIONS } from './questions/az900Act2';
import { AZ900_ACT3_QUESTIONS } from './questions/az900Act3';
import { AZ104_ACT1_QUESTIONS } from './questions/az104Act1';
import { AZ104_ACT2_QUESTIONS } from './questions/az104Act2';
import { AZ104_ACT3_QUESTIONS } from './questions/az104Act3';
import { AZ104_ACT4_QUESTIONS } from './questions/az104Act4';
import { AZ104_ACT5_QUESTIONS } from './questions/az104Act5';
import { AIPC_ACT1_QUESTIONS } from './questions/aipcAct1';
import { AIPC_ACT2_QUESTIONS } from './questions/aipcAct2';
import { AIPC_ACT3_QUESTIONS } from './questions/aipcAct3';
import { AIPC_ACT4_QUESTIONS } from './questions/aipcAct4';
import { AIPC_ACT5_QUESTIONS } from './questions/aipcAct5';
import { AIPC_ACT6_QUESTIONS } from './questions/aipcAct6';

export const ALL_EXAM_QUESTIONS: ExamQuestion[] = [
  ...AZ900_ACT1_QUESTIONS,
  ...AZ900_ACT2_QUESTIONS,
  ...AZ900_ACT3_QUESTIONS,
  ...AZ104_ACT1_QUESTIONS,
  ...AZ104_ACT2_QUESTIONS,
  ...AZ104_ACT3_QUESTIONS,
  ...AZ104_ACT4_QUESTIONS,
  ...AZ104_ACT5_QUESTIONS,
  ...AIPC_ACT1_QUESTIONS,
  ...AIPC_ACT2_QUESTIONS,
  ...AIPC_ACT3_QUESTIONS,
  ...AIPC_ACT4_QUESTIONS,
  ...AIPC_ACT5_QUESTIONS,
  ...AIPC_ACT6_QUESTIONS
];
