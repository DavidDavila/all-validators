import { AllValidators } from "..";

export type TimeRanges =
  | "year"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second";

export type Inclusivity = "()" | "[)" | "(]" | "[]";

export type AllValidatorKeysT = keyof AllValidators;
export type AllValidatorParamsT<T extends AllValidatorKeysT> = Parameters<
  (...args: Parameters<AllValidators[T]>) => boolean
>;
