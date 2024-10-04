import React from 'react'
import {SocialIcon} from 'react-social-icons'

const Footer = () => {
  return (
    <footer>
        Robbie's Weekly Blog
        <div className='icons'>
          <SocialIcon network="instagram" url="https://www.instagram.com" />
          <SocialIcon network="facebook" url="https://www.facebook.com" />
          <SocialIcon network="tiktok" url="https://www.tiktok.com" />
          <SocialIcon network="pinterest" url="https://www.pinterest.com/" />
          <SocialIcon network="github" url="https://www.github.com/roberanegussie" />
        </div>
    </footer>
  )
} 

export default Footer