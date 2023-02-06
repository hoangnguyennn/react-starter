import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import '../assets/styles/pages/home-page.scss'

import BxButton from '../components/common/BxButton'
import {
  getIsLoading,
  getLanguage,
  setIsLoading,
  setLanguage
} from '../store/reducers/app.reducer'
import ConvertUtil from '../utils/convert.util'

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
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

  return (
    <div>
      <h2>HomePage</h2>
      <BxButton rounded={isLoading}>{t('hello')}</BxButton>
      <BxButton onClick={toggleIsLoading}>Change is loading</BxButton>
      <BxButton>{language}</BxButton>
      <BxButton onClick={changeLanguage}>Change language</BxButton>
      <p>{ConvertUtil.toVND(100000)}</p>
    </div>
  )
}

export default HomePage
