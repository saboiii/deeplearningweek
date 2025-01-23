import { GoArrowRight, GoChevronRight } from "react-icons/go";
import React, { useState } from 'react';
import {AnimatePresence, motion, easeInOut} from "framer-motion";

function Button( { text, onClick } ) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className="flex navButton items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {text}
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
        </button>
    )
}

export default Button