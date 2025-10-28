"use client";
import MyNavbar from "@/_components/Navbar";
import HeroSection from "@/_components/Hero-section";
import ScrollingBanner from "@/_components/ScrollingBanner";
import AboutUs from "@/_components/About"
import RangesSection from "@/_components/Ranges"
import CurateStyleSection from "@/_components/fscard"
import ScrollingBanner2 from "@/_components/ScrollingBanner2";
import Contact from "@/_components/Contact";
import Footer from "@/_components/Footer";
import { AnimateOnScroll } from "@/_components/AnimateOnScroll";

export default function Home() {
  return (
    <>
      <MyNavbar />
      <AnimateOnScroll animation="fade-in" duration={1200}>
        <section id="home">
          <HeroSection/>
        </section>
      </AnimateOnScroll>
      
      <ScrollingBanner />
      
      <AnimateOnScroll animation="fade-up" delay={200}>
        <section id="about">
          <AboutUs/>
        </section>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="slide-left" delay={300}>
        <section id="ranges"  style={{ scrollMarginTop: '-60px' }}>
          <RangesSection/>
        </section>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="slide-right" delay={400}>
        <section id="collections">
          <CurateStyleSection/>
        </section>
      </AnimateOnScroll>
      
      <ScrollingBanner2 />
      
      <AnimateOnScroll animation="fade-up" delay={500}>
        <section id="contact">
          <Contact/>
        </section>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="fade-up" delay={600}>
        <Footer/>
      </AnimateOnScroll>
    </>
  );
}
