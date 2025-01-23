import { GoArrowLeft, GoChevronLeft } from "react-icons/go";
import React, { useState } from 'react';
import { AnimatePresence, motion, easeInOut } from "framer-motion";

function SleekButtonBack({ text, onClick, styles, disabled }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`inline-flex pl-2 pr-4 text-[#8d8eab] uppercase py-2 text-xs justify-between disabled:border-gray-800 disabled:text-gray-800 disabled:cursor-not-allowed items-center overflow-hidden rounded-full ${styles}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            disabled={disabled}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isHovered ? (
                    <motion.div
                        key="chevron"
                        initial={{ opacity: 0, x: -2 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 2 }}
                        transition={{ duration: 0.1, easeInOut }}
                        className="inline mr-2"
                    >
                        <GoArrowLeft />
                    </motion.div>
                ) : (
                    <motion.div
                        key="arrow"
                        initial={{ opacity: 0, x: -2 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 2 }}
                        transition={{ duration: 0.1, easeInOut }}
                        className="inline mr-2"
                    >
                        <GoChevronLeft />
                    </motion.div>
                )}
            </AnimatePresence>
            {text}

        </button>
    )
}

export default SleekButtonBack