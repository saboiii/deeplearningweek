import { GoArrowRight, GoChevronRight } from "react-icons/go";
import React, { useState } from 'react';
import { AnimatePresence, motion, easeInOut } from "framer-motion";

function SleekButton({ text, onClick, styles, disabled }) {
    const [isHovered, setIsHovered] = useState(false);

    return (

            <button
                className={`inline-flex pl-4 pr-3 uppercase py-2 text-xs justify-between disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-not-allowed items-center overflow-hidden ${styles}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
                {!disabled ? (
                    <AnimatePresence mode="wait" initial={false}>
                    {isHovered ? (
                        <motion.div
                            key="chevron"
                            initial={{ opacity: 0, x: -2 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 2 }}
                            transition={{ duration: 0.1, easeInOut }}
                            className="inline ml-2"
                        >
                            <GoArrowRight />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="arrow"
                            initial={{ opacity: 0, x: -2 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 2 }}
                            transition={{ duration: 0.1, easeInOut }}
                            className="inline ml-2"
                        >
                            <GoChevronRight />
                        </motion.div>
                    )}
                </AnimatePresence>
                ) : (
                    <div>
                        <div className="ml-4 w-3 h-3 border-b border-gray-600 rounded-full animate-spin"></div>
                    </div>
                )}
                
            </button>
    )
}

export default SleekButton