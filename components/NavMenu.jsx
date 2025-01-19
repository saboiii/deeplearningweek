"use client";
import { useState } from 'react';
import { AnimatePresence, motion, circInOut } from 'framer-motion';

function NavMenu({menuData}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = (menu) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
    setTimeoutId(id);
  };



  return (
    <div className="fixed top-0 left-0 right-0 z-10 h-20">
      <div className="relative flex items-center justify-center h-full">
        <div className="flex justify-between gap-4 navMenuContainer px-6">
          <div className="flex navMenuItem">Home</div>
          <div
            className="flex navMenuItem"
            onMouseEnter={() => handleMouseEnter("About Us")}
            onMouseLeave={handleMouseLeave}
          >
            About Us
          </div>
          <div
            className="flex navMenuItem"
            onMouseEnter={() => handleMouseEnter("Agenda")}
            onMouseLeave={handleMouseLeave}
          >
            Agenda
          </div>
          {/* <div
            className="flex navMenuItem"
            onMouseEnter={() => handleMouseEnter("Speakers")}
            onMouseLeave={handleMouseLeave}
          >
            Speakers
          </div> */}
          <div className="flex navMenuItem">FAQs</div>
        </div>

        <AnimatePresence>
          {activeMenu && menuData[activeMenu] && (
            <motion.div
              className="absolute grid grid-cols-2 divide-x top-[90%] navDropdownMenuContainer w-1/2 bg-white"
              initial={{ opacity: 0, scaleY: 0, scaleX: 0}}
              animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleY: 0, scaleX: 0 }}
              transition={{
                duration: 0.1,
                ease: circInOut,
              }}
              onMouseEnter={() => handleMouseEnter(activeMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="navDropdownMenuBox">
                <h3 className="flex w-full">{menuData[activeMenu].title}</h3>
                <p className="flex text-xs w-full">{menuData[activeMenu].description}</p>
              </div>
              <div className="navDropdownMenuBox">
                <p className="navDropdownCaption">{menuData[activeMenu].caption}</p>
                {menuData[activeMenu].items.map((item, index) => (
                  <div key={index} className="navDropdownMenuItem">
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NavMenu;
