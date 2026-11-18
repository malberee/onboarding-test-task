import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { routes } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { FetchStatus, getPayment } from '@/services/api'
import { resetPayment } from '@/store'

export const usePaymentVerification = () => {
  const navigate = useNavigate()
  const paymentId = useAppSelector((state) => state.payment.paymentIntent?.id)
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
      navigate(routes.success)
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
