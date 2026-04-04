import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Categories from '../components/Categories'
import SpecialOffer from '../components/SpecialOffer'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Products/>
      <Categories/>
      <SpecialOffer/>
      <About/>
      <Testimonials/>
      <Faq/>
      <Footer/>
    </>
  )
}

export default Home
