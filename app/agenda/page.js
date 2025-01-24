'use client'
import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Schedule from '@/components/Schedule';
import { useSearchParams } from 'next/navigation'

function Agenda() {
    const day1Ref = useRef(null);
    const day2Ref = useRef(null);
    const day4Ref = useRef(null);
    const params = useSearchParams();

    useEffect(() => {
        if (params.has("day")) {
            const targetRef = {
                'day=1': day1Ref,
                'day=2': day2Ref,
                'day=4': day4Ref,
            };

            targetRef[params.toString()].current.scrollIntoView({ behavior: 'smooth' });
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
        "1630 - 1800": "Registration + Dinner + Company Booths",
        "1800 - 2000": "Opening Ceremony + Hacking Begins",
        "2000 - 2200": "Platinum Sponsors' Workshop",
        "2200 - 0000": "Coding Challenge",
    };


    const day2schedule = {
        "0000 - 0200": "Poker Tournament + Karaoke (No Gambling!)",
        "0200 - 0400": "Merch Drops + Stargazing",
        "0600 - 0730": "Sunrise Chasing + Picture Competition",
        "0730 - 1000": "Breakfast + Refreshments",
        "1000 - 1200": "Workshop I",
        "1200 - 1400": "Lunch",
        "1400 - 1600": "No Scheduled Events",
        "1600 - 1800": "Workshop II",
        "1800 - 1900": "Dinner",
        "1900 - 2100": "Workshop III"
    };


    const day4schedule = {
        "1700 - 1900": "Pitching Session",
        "1900 - 2000": "Refreshments + Networking (Finalists)",
        "2000 - 2100": "Results + Prize Ceremony",
    };

    const days = {
        "Day 1.": "Day 1 begins with registration, followed by dinner and opportunities to participate in workshops and visit booths. The opening ceremony will officially kick off the start of the coding sprint.",
        "Overnight Stay.": "For day two, we're hosting an overnight stay. We'll have workshops, meals, and time for relaxation throughout the day, ending with more interactive sessions and networking events.",
        "Day 4.": "It's finally demo day: Showcase your project, network with other teams, and celebrate the winners at the awards ceremony.",
    }

    // const day3schedule = {
    //     "0000 - 2359": "Judging Session",
    // };



    return (
        <div className="flex flex-col w-screen bg-bg py-20 gap-32 lg:gap-0">
            <div ref={day1Ref} className='w-full'>
                <Schedule styles='h-[78vh] lg:h-[50vh]' date={"28 February, 2025"} schedule={day1schedule} title={Object.keys(days)[0]} description={Object.values(days)[0]} divs={4} />
            </div>
            <div ref={day2Ref} className='w-full'>
                <Schedule  styles='h-[160vh] lg:h-[140vh]' date={"1 March, 2025"} schedule={day2schedule} title={Object.keys(days)[1]} description={Object.values(days)[1]} divs={10} />
            </div>
            <div ref={day4Ref} className='w-full'>
                <Schedule styles='h-[62vh] lg:h-[40vh]' date={"3 March, 2025"} schedule={day4schedule} title={Object.keys(days)[2]} description={Object.values(days)[2]} divs={3} />
            </div>
        </div>
    );
}

export default Agenda;
