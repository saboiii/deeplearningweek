import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function AgendaStream() {
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 0.5], [2.5, 2])

    return (
        <div className="relative flex w-screen bg-white">
            <motion.img
                src='/images/agenda-bg.png'
                height={1080}
                width={1920}
                loading="lazy"
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
                alt="Background"
                style={{ scale }}
            />
            <motion.img
                src='/images/agenda-cover.png'
                height={1080}
                width={1920}
                loading="lazy"
                className="object-cover z-20 object-center"
                alt="Cover"
                style={{ scale }}
            />
        </div>
    )
}

export default AgendaStream
