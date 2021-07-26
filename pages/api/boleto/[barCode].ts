import type { NextApiRequest, NextApiResponse } from 'next'
import { Boleto, ValidationError, ValidationErrorMessage } from '../../../src/class/Boleto'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(500)
  const barCode = req.query.barCode.toString()

  const boleto = new Boleto(barCode).toJSON()

  if (boleto.validationError === ValidationError.NONE) {
    res.status(200).json({
      error: false,
      barCode: boleto.barCode,
      amount: boleto.amount,
      expirationDate: boleto.expirationDate,
    })
  } else {
    res.status(400).json({
      error: true,
      validationErrorCode: boleto.validationError,
      validationErrorMessage: ValidationErrorMessage[boleto.validationError],
    })
  }
}