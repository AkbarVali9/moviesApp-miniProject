import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const VideosSlider = props => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const {videoData} = props

  return (
    <>
      <Slider {...settings}>
        {videoData.map(eachVideo => (
          <Link to={`/movies/${eachVideo.id}`} key={eachVideo.id}>
            <img
              className="thumbnail"
              src={eachVideo.posterPath}
              alt={eachVideo.title}
            />
          </Link>
        ))}
      </Slider>
    </>
  )
}

export default VideosSlider
