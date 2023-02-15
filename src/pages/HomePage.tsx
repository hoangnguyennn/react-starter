import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import '@hn/assets/styles/pages/home-page.scss'

import BxButton from '@hn/components/common/BxButton'
import {
  getIsLoading,
  getLanguage,
  setIsLoading,
  setLanguage,
  showSnackbar
} from '@hn/store/reducers/app.reducer'
import ConvertUtil from '@hn/utils/convert.util'
import { useAppDispatch } from '@hn/hooks/useAppDispatch'

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getIsLoading())
  const language = useSelector(getLanguage())

  const toggleIsLoading = () => changeIsLoading(!isLoading)

  const changeIsLoading = (isLoading: boolean) => {
    dispatch(setIsLoading(isLoading))
  }

  const changeLanguage = () => {
    if (language === 'en') {
      dispatch(setLanguage('vi'))
    } else {
      dispatch(setLanguage('en'))
    }
  }

  const onShowSnackbar = () => {
    dispatch(showSnackbar('123'))
  }

  const onShowSnackbarWithTitle = () => {
    dispatch(showSnackbar({ message: '123', title: 'title 123' }))
  }

  return (
    <div>
      <h2>HomePage</h2>
      <BxButton rounded={isLoading}>{t('hello')}</BxButton>
      <BxButton onClick={toggleIsLoading}>Change is loading</BxButton>
      <BxButton>{language}</BxButton>
      <BxButton onClick={changeLanguage}>Change language</BxButton>
      <p>{ConvertUtil.toVND(100000)}</p>
      <BxButton onClick={onShowSnackbar}>Show snackbar</BxButton>
      <BxButton onClick={onShowSnackbarWithTitle}>
        Show snackbar with title
      </BxButton>
    </div>
  )
}

export default HomePage
