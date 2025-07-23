import exampleImage from '@hn/assets/images/example.png'
import '@hn/assets/styles/pages/home-page.scss'

const HomePage = () => {
  return (
    <div>
      <h2>HomePage</h2>
      <div>
        <img src={exampleImage} alt="" />
      </div>
    </div>
  )
}

export default HomePage
