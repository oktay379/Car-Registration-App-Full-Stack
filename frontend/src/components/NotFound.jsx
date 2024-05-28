import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
        <h1>404 - Sayfa Bulunamadı</h1>
        <p>Üzgünüz, aradığınız plaka mevcut değil.</p>
        <Link className='text-indigo-500' to={"/"}>Ana Sayfa Donmek Icin Tiklayiniz...</Link>
    </>
  )
}

export default NotFound