import {FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="contact-icons-container">
      <li className="google-icon">
        <FcGoogle className="icon-size" />
      </li>
      <li className="twitter-icon">
        <FaTwitter className="icon-size" />
      </li>
      <li className="instagram-icon">
        <FaInstagram className="icon-size" />
      </li>
      <li className="youtube-icon">
        <FaYoutube className="icon-size" />
      </li>
    </ul>
    <p className="contact-text">Contact us</p>
  </div>
)

export default Footer
