import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

import counterImage1 from "../../assets/images/counterImage1.jpg";
import counterImage2 from "../../assets/images/counterImage-2.jpg";

const Counter = () => {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      end: 19,
      label: "Completed Cases",
      text: "We always provide people a complete solution upon focused of any business",
    },
    {
      end: 46,
      label: "Our Office",
      text: "We always provide people a complete solution upon focused of any business",
    },
    {
      end: 190,
      label: "Skilled People",
      text: "We always provide people a complete solution upon focused of any business",
    },
    {
      end: 30,
      label: "Happy Clients",
      text: "We always provide people a complete solution upon focused of any business",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-black">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* IMAGE SIDE */}
          <div className="relative">
            <motion.img
              src={counterImage1}
              alt="Team"
              className="w-full rounded-3xl shadow-xl object-cover max-h-[420px] sm:max-h-[520px]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Overlay image (desktop) */}
            <motion.div
              className="absolute -bottom-10 right-0 hidden lg:block bg-white rounded-2xl shadow-sm p-2"
              animate={{ x: [0, 14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={counterImage2}
                alt="Meeting"
                className="w-80 xl:w-96 rounded-xl object-cover"
              />
            </motion.div>

            {/* Overlay mini (tablet) */}
            <div className="mt-4 lg:hidden">
              <img
                src={counterImage2}
                alt="Meeting"
                className="w-full rounded-2xl shadow-sm object-cover max-h-[220px]"
              />
            </div>
          </div>

          {/* TEXT SIDE */}
          <div className="text-center lg:text-left">
            <p className="text-gray-500 font-semibold mb-2">
              Millions Of Jobs.
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Find The One That’s{" "}
              <span className="text-blue-600">Right For You</span>
            </h1>

            <p className="text-gray-600 mb-7 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="btn btn-primary px-8 w-full sm:w-auto">
                Search Jobs
              </button>
              <button className="btn btn-ghost border border-blue-400 w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* COUNTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-14 sm:mt-20 lg:mt-28 py-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col items-center text-center"
            >
              <div className="flex items-end gap-1">
                {startCount ? (
                  <CountUp
                    start={0}
                    end={item.end}
                    duration={2.5}
                    className="text-4xl sm:text-5xl font-extrabold text-blue-600"
                  />
                ) : (
                  <span className="text-4xl sm:text-5xl font-extrabold text-blue-600">
                    0
                  </span>
                )}
                <span className="text-4xl sm:text-5xl font-extrabold text-blue-600">
                  +
                </span>
              </div>

              <p className="mt-3 text-gray-900 font-semibold text-base sm:text-lg">
                {item.label}
              </p>

              <p className="mt-2 text-gray-600 text-sm leading-relaxed max-w-[28ch]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
