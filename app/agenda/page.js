"use client";
import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Schedule from "@/components/Schedule";
import { useSearchParams, notFound } from "next/navigation";

function Agenda() {
  const version = process.env.NEXT_PUBLIC_VERSION;
  if (version !== "1.0.0") {
    notFound();
  }

  const preRef = useRef(null);
  const mainRef = useRef(null);
  const overnightRef = useRef(null);
  const finalRef = useRef(null);
  const params = useSearchParams();

  useEffect(() => {
    const dayParam = params.get("day");
    if (dayParam) {
      const targetRef = {
        pre: preRef,
        main: mainRef,
        overnight: overnightRef,
        final: finalRef,
      };

      if (targetRef[dayParam]) {
        targetRef[dayParam].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

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

  const day1schedule = {
    "1900 - 2030": "Premium AI Workshop | Beginner",
  };

  const day2schedule = {
    "0830 - 0930": "Registration",
    "0930 - 1000": "Opening Ceremony",
    "1000 - 1030": "Keynote Speeches",
    "1030 - 1130": "Industry Round Table",
    "1130 - 1330": "Career Fair",
    "1200 - 1330": "Lunch",
    "1330 - 1500": "Premium AI Workshop | Intermediate",
    "1500 - 1515": "Break",
    "1515 - 1630": "Company Workshop",
    "1515 - 1630": "Company Workshop",
    "1630 - 1700": "Break",
    "1700 - 1815": "Company Workshop",
    "1700 - 1815": "Company Workshop",
    "1815 - 1930": "Dinner",
    "1930 - 2100": "Premium AI Workshop | Advanced",
  };

  const day3schedule = {
    "2100 - 0100": "E-Sports Tournament",
    "2100 - 0100": "Stargazing",
    "2100 - 1000": "Sleeping/Hacking",
    "0600 - 1200": "Announce Top Teams (5 teams per track)",
  };

  const day4schedule = {
    "1000 - 1100": "Closing Ceremony",
    "1100 - 1200": "Demos Part #1",
    "1200 - 1215": "Break",
    "1215 - 1300": "Demos Part #2",
    "1300 - 1430": "Lunch & Networking",
    "1430 - 1530": "Demos Part #3",
    "1530 - 1545": "Break",
    "1545 - 1630": "Demos Part #4",
    "1630 - 1715": "Break",
    "1715 - 1815": "Prize Ceremony",
  };

  const days = {
    "Pre-Hackathon":
      "Pre-Hackathon begins with a premium AI workshop for beginners, setting the stage for the event.",
    "Day 1":
      "Day one features registration, ceremonies, workshops, and company interactions.",
    "Overnight Stay.":
      "The overnight stay includes advanced workshops, gaming, stargazing, and hacking sessions extending into the next day.",
    "Final Day": "Demo day showcases projects, followed by the prize ceremony.",
  };

  // const day3schedule = {
  //     "0000 - 2359": "Judging Session",
  // };

  return (
    <div className="flex flex-col w-screen bg-bg py-20">
      <div ref={preRef} className="w-full pb-48">
        <Schedule
          styles="h-[20vh] lg:h-[15vh]"
          date={"28 February, 2026"}
          schedule={day1schedule}
          title={Object.keys(days)[0]}
          description={Object.values(days)[0]}
          divs={1}
        />
      </div>
      <div ref={mainRef} className="w-full">
        <Schedule
          styles="h-[280vh] lg:h-[200vh]"
          date={"1 March, 2026"}
          schedule={day2schedule}
          title={Object.keys(days)[1]}
          description={Object.values(days)[1]}
          divs={12}
        />
      </div>
      <div ref={overnightRef} className="w-full">
        <Schedule
          styles="h-[100vh] lg:h-[40vh]"
          date={"1-2 March, 2026"}
          schedule={day3schedule}
          title={Object.keys(days)[2]}
          description={Object.values(days)[2]}
          divs={4}
        />
      </div>
      <div ref={finalRef} className="w-full">
        <Schedule
          styles="h-[200vh] lg:h-[120vh]"
          date={"8 March, 2026"}
          schedule={day4schedule}
          title={Object.keys(days)[3]}
          description={Object.values(days)[3]}
          divs={10}
        />
      </div>
    </div>
  );
}

export default Agenda;
