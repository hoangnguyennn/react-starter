import { createPortal } from 'react-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { FC, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSnackbars } from '@hn/store/reducers/app.reducer'

const BxSnackbar: FC<Types.ISnackbar> = props => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Toast
      style={{ marginBottom: '12px' }}
      show={show}
      bg="success"
      onClose={() => setShow(false)}
    >
      {props.title && (
        <Toast.Header>
          <span className="me-auto">{props.title}</span>
        </Toast.Header>
      )}
      <Toast.Body className="text-white">{props.message}</Toast.Body>
    </Toast>
  )
}

const BxSnackbarList = () => {
  const snackbars = useSelector(getSnackbars())

  const TheSnackbar = useMemo(() => {
    return (
      <ToastContainer className="p-3" position="bottom-end">
        {snackbars.map(snackbar => (
          <BxSnackbar key={snackbar.id} {...snackbar} />
        ))}
      </ToastContainer>
    )
  }, [snackbars])

  return createPortal(
    TheSnackbar,
    document.querySelector('#modal') as HTMLDivElement
  )
}

export default BxSnackbarList
