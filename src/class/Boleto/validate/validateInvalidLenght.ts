import { Titulo } from "../Boleto"
import { ValidationError } from "../enum/ValidationError"

export function validateInvalidLenght (this: Titulo): void {
  if ([47, 48].includes(this.barCode.length)) { return undefined }

  this.validationError = ValidationError.INVALID_LENGTH
}