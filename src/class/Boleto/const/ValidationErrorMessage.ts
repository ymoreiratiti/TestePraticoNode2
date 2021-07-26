import { ValidationError } from "../enum/ValidationError";

export const ValidationErrorMessage = {
  [ValidationError.INVALID_LENGTH]: 'Invalid bar code length',
  [ValidationError.INVALID_VERIFY_DIGIT]: 'Verify Digit invalid',
};