import React from 'react'
import ProgramHighlight from '../components/ProgramHighlight'
import AboutSection from '../components/Aboutusshort'
import ClientsMarque from '../components/ClientsMarque'
import Experience from '../components/Experience'
import NeonMindMap from '../components/NeonMindMap'
import Reviews from '../components/Reviews'
import GlobalBrandsMarquee from '../components/GlobalBrandsMarque'
import HeroSection from '../components/HeroSection'
import OurReach from '../components/OurReach'

const Home = () => {
  return (<>
   < HeroSection />
      <ProgramHighlight />
      <AboutSection/>

      <ClientsMarque />
         < Experience />
        < NeonMindMap />
        <OurReach />
        < Reviews />
      
     < GlobalBrandsMarquee />
        
        </>
  )
}

export default Home