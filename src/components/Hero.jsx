import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { HeadphoneData } from '../data/MockData';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { SlideRight } from '../utility/animation'

const Hero = () => {
  const [activeData, setActiveData] = useState(HeadphoneData[0]);
  const [currentIndext, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HeadphoneData.length);
    }, 3000) // change every 3 seconds

    return () => clearInterval(interval); // cleanup ,nterval on component unmount
  }, [currentIndext])

  useEffect(() => {
    setActiveData(HeadphoneData[currentIndext]);
  }, [currentIndext])

  return (
    <motion.section
      initial={{ backgroundImage: `radial-gradient(circle, ${activeData.bgColor} 0%, ${activeData.bgColor} 0%)`, }}
      animate={{ backgroundImage: `radial-gradient(circle, ${activeData.bgColor}aa 0%, ${activeData.bgColor} 70%)`, }}
      transition={{ duration: 0.8 }}
      className='text-white'>
      <Navbar />
      <div className="container grid grid-cols-1 md:grid-cols-2 h-screen md:h-[700px] relative">
        {/* headphoen info section */}
        <div className='flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px] order-2 md:order-1'>
          <div className='space-y-5md:space-y-7 text-center md:text-left'>
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeData.id}
                variants={SlideRight(0.2)}
                initial="hidden"
                animate="show"
                exit="exit"
                className='text-3xl lg:text-4xl xl:text-5xl font-bold'
              >
                {activeData.title}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeData.id}
                variants={SlideRight(0.5)}
                initial="hidden"
                animate="show"
                exit="exit"
                className='text-sm leading-loose text-white/80'
              >
                {activeData.subtitle}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeData.id}
                variants={SlideRight(0.8)}
                initial="hidden"
                animate="show"
                exit="exit"
                className='text-3xl lg:text-4xl xl:text-5xl font-bold'
              >
                {activeData.price}
              </motion.p>
            </AnimatePresence>

            {/* social icons section */}
            <div className='flex items-center justify-center md:justify-center gap-4 text-3xl'>
              <FaInstagram className='cursor-pointer border bordered-full p-[6px]' />
              <FaFacebook className='cursor-pointer border bordered-full p-[6px]' />
              <FaTwitter className='cursor-pointer border bordered-full p-[6px]' />
            </div>
          </div>
        </div>
        {/* headphoen img section */}
        <div className='flex flex-col items-center justify-center order-1 md:order-2 relative'>
          <AnimatePresence mode="wait">
            <motion.img
              key={activeData.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeInOut, delay: 0 }}
              exit={{ opacity: 0, x: -100 }}
              src={activeData.image}
              alt=""
              className='w-[300px] md:w-[400px] xl:w-[500px] z-10'
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeInOut, delay: 0 }}
              exit={{ opacity: 0 }}
              className='text-[300px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 text-white/5 font-poppins font-extrabold'>{activeData.modal}</motion.div>
          </AnimatePresence>
        </div>
        {/* chat icon section */}
        <div className='absolute bottom-10 right-10 z-[999]'>
          <FaMessage className='text-2xl cursor-pointer' />
        </div>
      </div>
    </motion.section>
  )
};

export default Hero;
