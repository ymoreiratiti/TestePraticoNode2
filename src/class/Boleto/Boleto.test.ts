import { Titulo } from './Boleto';
import { ValidationError } from "./enum/ValidationError";

const casesList = [
  //  Titulo Valid
  [
    '00190.50095 40144.816069 06809.350314 3 37370000000100',
    { barCode: '00190500954014481606906809350314337370000000100', validationError: ValidationError.NONE, amount: 1, expirationDate: '2007-12-31' }
  ],

  [
    '21290.00119 21100.012109 04475.617405 9 75870000002000',
    { barCode: '21290001192110001210904475617405975870000002000', validationError: ValidationError.NONE, amount: 20, expirationDate: '2018-07-16' }
  ],

  //  Titulo Invalid
  [
    '00190.50090 40144.816069 06809.350314 3 37370000000100',
    { barCode: '00190500904014481606906809350314337370000000100', validationError: ValidationError.INVALID_VERIFY_DIGIT }
  ],

  //  Convenio - Valid
  [
    '848700000009-529901612022-108051070520-732002251232',
    { barCode: '848700000009529901612022108051070520732002251232', validationError: ValidationError.NONE, amount: 52.99, expirationDate: '2021-08-05' }
  ],

  [
    '34191.09024 76274.679232 91577.540007 6 87080000050110',
    { barCode: '34191090247627467923291577540007687080000050110', validationError: ValidationError.NONE, amount: 501.10, expirationDate: '2021-08-10' }
  ],

  [
    '836700000018 548200863288 533654385012 100218417929',
    { barCode: '836700000018548200863288533654385012100218417929', validationError: ValidationError.NONE, amount: 154.82, expirationDate: '0000-00-00' }
  ],

  [
    '83670000000 0 12180192000 4 00356060401 3 00021723210 7',
    { barCode: '836700000000121801920004003560604013000217232107', validationError: ValidationError.NONE, amount: 12.18, expirationDate: '0000-00-00' }
  ],

  //  Convenio - DAC Invalid
  [
    '888300000009-529901612022-108051070520-732002251232',
    { barCode: '888300000009529901612022108051070520732002251232', validationError: ValidationError.INVALID_VERIFY_DIGIT }
  ],

  //  Convenio - Invalid - VD 1
  [
    '848700000000-529901612022-108051070520-732002251232',
    { barCode: '848700000000529901612022108051070520732002251232', validationError: ValidationError.INVALID_VERIFY_DIGIT }
  ],

  //  Convenio - Invalid - VD 2
  [
    '848700000009-529901612020-108051070520-732002251232',
    { barCode: '848700000009529901612020108051070520732002251232', validationError: ValidationError.INVALID_VERIFY_DIGIT }
  ],

  //  Convenio - Invalid - VD 3
  [
    '848700000009-529901612022-108051070529-732002251232',
    { barCode: '848700000009529901612022108051070529732002251232', validationError: ValidationError.INVALID_VERIFY_DIGIT }
  ],

  //  Convenio - Invalid - VD 4
  [
    '848700000009-529901612022-108051070520-732002251230',
    { barCode: '848700000009529901612022108051070520732002251230', validationError: ValidationError.INVALID_VERIFY_DIGIT }
  ],

  //  Invalid Length
  [
    '1313131313',
    { barCode: '1313131313', validationError: ValidationError.INVALID_LENGTH, }
  ],
]

test.each(casesList)('Bar Code: %s', (barCode, expected) => {
  const boleto = new Titulo(barCode as string).toJSON()
  expect(boleto).toEqual(expected)
})