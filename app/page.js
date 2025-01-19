"use client"
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Sponsors from '@/components/Sponsors';
import Title from '@/components/Title';
import SignUp from '@/components/SignUp';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className='flex bg-bg bg-repeat flex-col items-center justify-center'>
      <Title/>
      <Sponsors/>
      <SignUp/>
      <Footer/>
    </div>
  );
}


