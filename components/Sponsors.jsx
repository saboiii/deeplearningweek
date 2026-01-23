import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, easeInOut } from "framer-motion";

function Sponsors() {
  const bannerAnimation = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 });
  const [showPluses, setShowPluses] = useState(false);
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    if (isInView) {
      bannerAnimation.start({ x: 0, opacity: 1 });
      setShowPluses(true);
      setShowHeading(true);
    }
  }, [isInView, bannerAnimation]);

  const [isPhoneViewport, setIsPhoneViewport] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsPhoneViewport(window.innerWidth < 768);

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex flex-col h-screen w-screen items-center justify-center overflow-hidden"
      ref={ref}
    >
      <div className="flex h-1/5 w-screen items-center justify-center mb-8">
        {showHeading && (
          <motion.div
            className="flex h-full items-center justify-center flex-col w-[300px] md:w-[450px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, easeInOut }}
          >
            <h2 className="flex animate-gradient mb-2 md:mb-4">
              Our Sponsors.
            </h2>
            <p className="flex text-center text-xs mb-4 md:mb-6">
              We are proudly sponsored by our partners. Their support helps us
              to provide meaningful experiences for our participants.
            </p>
            {/* <Button text={"Exclusive Workshops"}/> */}
          </motion.div>
        )}
      </div>

      <div className="sponsorBanner">
        {showPluses && (
          <>
            <motion.div
              className="topPlus left-[8vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              +
            </motion.div>
            {!isPhoneViewport ? (
              <motion.div
                className="topPlus left-[36vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            ) : (
              <motion.div
                className="topPlus left-[50vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            )}
            {!isPhoneViewport && (
              <motion.div
                className="topPlus left-[64vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                +
              </motion.div>
            )}
            <motion.div
              className="topPlusEnd left-[92vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              +
            </motion.div>
          </>
        )}

        <motion.div
          className="flex sponsorContainer"
          initial={{ x: 200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="platinumSponsorBanner animate">
            <Image
              src="/images/openai.png"
              height={90}
              width={90}
              alt="OpenAI Logo"
              className="object-contain flex w-20 md:w-28 h-28"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex sponsorContainerEnd md:sponsorContainer"
          initial={{ x: 200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="platinumSponsorBanner animate">
            <Image
              src="/images/microsoft.png"
              height={90}
              width={90}
              alt="Microsoft Logo"
              className="object-contain flex translate-y-1 w-20 md:w-28 h-28"
            />
          </div>
        </motion.div>

        <motion.div
          className="hidden md:flex sponsorContainerEnd"
          initial={{ x: 200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="goldSponsorBanner animate">
            <Image
              src="/images/statschippac.png"
              height={90}
              width={90}
              alt="STATSChipPAC Logo"
              className="object-contain flex w-16 md:w-32 h-32"
            />
          </div>
        </motion.div>
      </div>

      <div className="sponsorBanner">
        {showPluses && (
          <>
            <motion.div
              className="topPlus left-[8vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              +
            </motion.div>
            {!isPhoneViewport ? (
              <motion.div
                className="topPlus left-[36vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            ) : (
              <motion.div
                className="topPlus left-[50vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            )}
            {!isPhoneViewport && (
              <motion.div
                className="topPlus left-[64vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                +
              </motion.div>
            )}
            <motion.div
              className="topPlusEnd left-[92vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              +
            </motion.div>
          </>
        )}

        {showPluses && (
          <>
            <motion.div
              className="hidden md:block bottomPlus left-[8vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              +
            </motion.div>
            <motion.div
              className="hidden md:block bottomPlus left-[36vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              +
            </motion.div>
            <motion.div
              className="hidden md:block bottomPlus left-[64vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              +
            </motion.div>
            <motion.div
              className="hidden md:block bottomPlusEnd left-[92vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              +
            </motion.div>
          </>
        )}

        <motion.div
          className="flex sponsorContainer"
          initial={{ x: -200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="silverSponsorBanner animate">
            <Image
              src="/images/aws.png"
              height={105}
              width={105}
              alt="AWS Logo"
              className="object-contain flex w-16 md:w-24 h-24"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex sponsorContainerEnd md:sponsorContainer"
          initial={{ x: -200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="bronzeSponsorBanner animate">
            <Image
              src="/images/notion.png"
              height={80}
              width={80}
              alt="Company Logo"
              className="object-contain flex md:translate-y-1 w-20 md:w-28 h-28"
            />
          </div>
        </motion.div>

        <motion.div
          className="sponsorContainerEnd hidden md:flex"
          initial={{ x: -200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="silverSponsorBanner animate">
            <Image
              src="/images/jane-street.png"
              height={70}
              width={70}
              alt="Jane Street logo"
              className="object-contain flex w-16 md:w-24 h-24"
            />
          </div>
        </motion.div>
      </div>

      <div className="sponsorBanner">
        {showPluses && (
          <>
            {!isPhoneViewport ? (
              <motion.div
                className="bottomPlus left-[8vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                +
              </motion.div>
            ) : (
              <motion.div
                className="topPlus left-[8vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                +
              </motion.div>
            )}

            {!isPhoneViewport ? (
              <motion.div
                className="bottomPlus left-[36vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            ) : (
              <motion.div
                className="topPlus left-[50vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            )}
            {!isPhoneViewport && (
              <motion.div
                className="bottomPlus left-[64vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                +
              </motion.div>
            )}

            {!isPhoneViewport ? (
              <motion.div
                className="bottomPlusEnd left-[92vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                +
              </motion.div>
            ) : (
              <motion.div
                className="topPlusEnd left-[92vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                +
              </motion.div>
            )}
          </>
        )}

        <motion.div
          className="flex sponsorContainer"
          initial={{ x: 200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="goldSponsorBanner animate">
            <Image
              src="/images/sginnovate.png"
              height={70}
              width={70}
              alt="SG Innovate Logo"
              className="object-contain flex w-16 md:w-24 h-24"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex sponsorContainerEnd md:sponsorContainer"
          initial={{ x: 200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="bronzeSponsorBanner animate">
            <Image
              src="/images/rnascence.png"
              height={90}
              width={90}
              alt="RNAscence Logo"
              className="object-contain blur-sm flex translate-y-1 w-16 md:w-32 h-32"
            />
          </div>
        </motion.div>

        <motion.div
          className="hidden md:flex sponsorContainerEnd"
          initial={{ x: 200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="bronzeSponsorBanner animate">
            <Image
              src="/images/nokia.png"
              height={90}
              width={90}
              alt="Nokia Logo"
              className="object-contain blur-sm flex w-16 md:w-24 h-24"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex sponsorBanner md:hidden">
        {showPluses && (
          <>
            <motion.div
              className="topPlus left-[8vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              +
            </motion.div>
            {!isPhoneViewport ? (
              <motion.div
                className="topPlus left-[36vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            ) : (
              <motion.div
                className="topPlus left-[50vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            )}
            {!isPhoneViewport && (
              <motion.div
                className="topPlus left-[64vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                +
              </motion.div>
            )}
            <motion.div
              className="topPlusEnd left-[92vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              +
            </motion.div>
          </>
        )}

        {showPluses && (
          <>
            <motion.div
              className="bottomPlus left-[8vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              +
            </motion.div>
            {!isPhoneViewport ? (
              <motion.div
                className="bottomPlus left-[36vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            ) : (
              <motion.div
                className="bottomPlus left-[50vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +
              </motion.div>
            )}
            {!isPhoneViewport && (
              <motion.div
                className="bottomPlus left-[64vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                +
              </motion.div>
            )}
            <motion.div
              className="bottomPlusEnd left-[92vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              +
            </motion.div>
          </>
        )}

        <motion.div
          className="sponsorContainer"
          initial={{ x: -200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="bronzeSponsorBanner animate">
            <Image
              src="/images/rnascence.png"
              height={100}
              width={100}
              alt="Company Logo"
              className="object-contain flex blur-sm translate-y-1 w-24 md:w-auto h-auto"
            />
          </div>
        </motion.div>

        <motion.div
          className="sponsorContainerEnd"
          initial={{ x: -200, opacity: 0 }}
          animate={bannerAnimation}
          transition={{ duration: 1, type: "tween", easeInOut }}
        >
          <div className="silverSponsorBanner animate">
            <Image
              src="/images/jane-street.png"
              height={70}
              width={70}
              alt="Jane Street logo"
              className="object-contain flex w-18 md:w-24 h-24"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Sponsors;
