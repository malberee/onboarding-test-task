import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector, useFlowNavigation } from '@/hooks'
import { FetchStatus, getPayment } from '@/services/api'
import { resetPayment } from '@/store'

export const usePaymentVerification = () => {
  const paymentId = useAppSelector((state) => state.payment.paymentIntent?.id)
  const { next } = useFlowNavigation()
  const dispatch = useAppDispatch()
  const [isVerifying, setIsVerifying] = useState(false)

  const verifyPayment = async () => {
    setIsVerifying(true)
    if (!paymentId) {
      return null
    }

    const payment = await getPayment(paymentId)

    if (payment.status === FetchStatus.SUCCEEDED) {
      dispatch(resetPayment())
      next()
    }

    setIsVerifying(false)

    return payment
  }

  useEffect(() => {
    if (paymentId) {
      const timer = setTimeout(() => {
        setIsVerifying(true)
        verifyPayment()
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [paymentId])

  return { verifyPayment, isVerifying }
}
