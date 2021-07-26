import { ValidationError } from "./enum/ValidationError";
import { validateInvalidLenght } from "./validate/validateInvalidLenght";
import { validateVerifyingDigit } from "./validate/validateVerifyingDigit";
import dayjs from 'dayjs'

export class Titulo {
  protected barCode: string;
  protected type: 'CONVENIO' | 'TITULO' = 'TITULO';
  protected validationError: ValidationError = ValidationError.NONE
  protected get barCodeFields () {
    switch (this.type) {
      case 'CONVENIO': return {
        1: this.barCode.substring(0, 12),
        2: this.barCode.substring(12, 24),
        3: this.barCode.substring(24, 36),
        4: this.barCode.substring(36, 48),
        5: ''
      }

      case 'TITULO': return {
        1: this.barCode.substring(0, 10),
        2: this.barCode.substring(10, 21),
        3: this.barCode.substring(21, 32),
        4: this.barCode.substring(32, 33),
        5: this.barCode.substring(33, 47),
      }

      default: throw new Error('Not implemented')
    }
  }

  protected get amount (): number {
    switch (this.type) {
      case 'CONVENIO': return Number(`${this.barCode.substring(5, 11)}${this.barCode.substring(12, 16)}`) / 100;
      case 'TITULO': return Number(this.barCode.substring(37, 47)) / 100;
      default: throw new Error('Not implemented')
    }
  }
  protected get expirationDate (): string {
    let expirationDate = dayjs()
    switch (this.type) {
      case 'CONVENIO':
        expirationDate = dayjs(`${this.barCodeFields[2].substring(8, 11)}${this.barCodeFields[3].substring(0, 5)}`, 'YYYYMMDD')
        break
      case 'TITULO':
        expirationDate = dayjs('1997-10-07').add(Number(this.barCodeFields[5].slice(0, 4)), 'days')
        break

      default: throw new Error('Not implemented')
    }

    if (expirationDate.year() < 1970 || expirationDate.year() > 2050) return '0000-00-00'

    return expirationDate.format('YYYY-MM-DD')
  }

  constructor(barCode: string) {
    this.barCode = barCode.toString().replace(/\D+/g, '');
    if (this.barCode.length === 48) this.type = 'CONVENIO'
    this.validate();
  }

  private validate (): void {
    if (this.validationError === ValidationError.NONE) this.validateInvalidLenght()
    if (this.validationError === ValidationError.NONE) this.validateVerifyingDigit()
  }

  private validateInvalidLenght = validateInvalidLenght
  private validateVerifyingDigit = validateVerifyingDigit

  public toJSON () {
    return this.validationError !== ValidationError.NONE
      ? {
        validationError: this.validationError,
        barCode: this.barCode,
      }
      : {
        validationError: this.validationError,
        barCode: this.barCode,
        amount: this.amount,
        expirationDate: this.expirationDate
      }
  }
}
