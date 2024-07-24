import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@hn/hooks/useAppDispatch'
import { usePropsChange } from '@hn/hooks/usePropsChange'
import { getSnackbars, hideSnackbar } from '@hn/store/reducers/app.reducer'

type BxSnackbarType = Types.ISnackbar & { onHide?: (id: string) => void }

const BxSnackbar: FC<BxSnackbarType> = props => {
  usePropsChange(props)

  const [show, setShow] = useState(true)

  const hide = useCallback(() => {
    setShow(false)
    props.onHide && props.onHide(props.id)
  }, [props])

  useEffect(() => {
    const timer = setTimeout(hide, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [hide])

  return (
    <Toast
      style={{ marginBottom: '12px' }}
      show={show}
      bg="success"
      onClose={hide}
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
  const dispatch = useAppDispatch()

  const _hideSnackbar = (id: string) => {
    dispatch(hideSnackbar(id))
  }

  const TheSnackbar = useMemo(() => {
    return (
      <ToastContainer className="p-3" position="bottom-end">
        {snackbars.map(snackbar => (
          <BxSnackbar key={snackbar.id} {...snackbar} onHide={_hideSnackbar} />
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
