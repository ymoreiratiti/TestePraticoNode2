import { Titulo } from "../Boleto"
import { ValidationError } from "../enum/ValidationError"

export function validateVerifyingDigit (this: Titulo): void {
  const field1 = this.barCodeFields[1].slice(0, -1)
  const field2 = this.barCodeFields[2].slice(0, -1)
  const field3 = this.barCodeFields[3].slice(0, -1)
  const field4 = this.barCodeFields[4].slice(0, -1)

  let fnMod = mod10
  if (this.type === 'CONVENIO' && [8, 9].includes(Number(field1[2]))) {
    fnMod = mod11
  }

  if (fnMod(field1) !== Number(this.barCodeFields[1].slice(-1))) { this.validationError = ValidationError.INVALID_VERIFY_DIGIT }
  if (fnMod(field2) !== Number(this.barCodeFields[2].slice(-1))) { this.validationError = ValidationError.INVALID_VERIFY_DIGIT }
  if (fnMod(field3) !== Number(this.barCodeFields[3].slice(-1))) { this.validationError = ValidationError.INVALID_VERIFY_DIGIT }


  if (this.type === 'CONVENIO') {
    const field1Raw = `${field1.substring(0, 3)} ${field1.substring(4, 11)}`
    const barCodeRaw = `${field1Raw} ${field2} ${field3} ${field4}`

    if (fnMod(barCodeRaw) !== Number(this.barCode[3])) this.validationError = ValidationError.INVALID_VERIFY_DIGIT
    if (fnMod(field4) !== Number(this.barCodeFields[4].slice(-1))) this.validationError = ValidationError.INVALID_VERIFY_DIGIT
  }

}

/**
 * 
 * @param value 
 * @returns 
 */
function mod10 (value: string): number {
  //  Keep only digits
  value = value.replace(/\D/g, '');

  const stepA: string = value.split('')
    .reverse()
    .map(Number)
    .map((digit, index) => digit * (index % 2 ? 1 : 2))
    .join('')

  //  Add, individually, the figures of the product results:
  const stepB: number = stepA.split('').map(Number).reduce((a, b) => a + b, 0)

  //  Divide the total found by 10 to determine the remainder of the division:
  const stepC: number = stepB % 10

  //  Divide the total found by 10 to determine the remainder of the division:
  //  TODO: Febraban DOC it's ok? The example appear's to be wrong
  const stepD: number = (10 - stepC)

  if (stepD === 10) return 0

  return stepD
}

/**
 * 
 * @param value 
 * @returns 
 */
function mod11 (value: string): number {
  value = value.replace(/\D/g, '');
  let mult = 2

  const stepA = value.split('')
    .reverse()
    .map(Number)
    .map(v => {
      if (mult === 10) mult = 2
      const result = v * mult;
      mult++
      return result
    });

  const stepB = stepA.reduce((a, b) => a + b, 0)

  const stepC = stepB % 11


  if ([0, 1].includes(stepC)) return 0
  if (stepC === 10) return 1;
  return 11 - stepC
}