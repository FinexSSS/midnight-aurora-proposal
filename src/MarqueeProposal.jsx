import React, { useState, useEffect } from "react";

const MarqueeProposal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sentences = [
    "কিছু মানুষ কেবল বন্ধু নয়, তারা জীবনের আশীর্বাদ। 🌿",
    "তোমার থাকা মানেই একটা অদ্ভুত প্রশান্তি। 🕊️",
    "তোমার সাথে কাটানো মুহূর্তগুলো স্মৃতির সবচেয়ে সুন্দর পাতায় লেখা। 📖",
    "যে হাসিতে জোছনা ঝরে, সে হাসি তো সবার হয় না! 🌙",
    "তুমি আমার পরিচিত পৃথিবীর সবচেয়ে সুন্দর অধ্যায়। ✨",
    "কিছু মানুষের উপস্থিতি নিঃশব্দেই অনেক কিছু বলে দেয়। 🍂",
    "ধন্যবাদ, আমার পৃথিবীর এতোটা অংশ জুড়ে থাকার জন্য। 🌸",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 9000); // Change sentence every 9 seconds
    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "600px",
        height: "75px",
        margin: "30px auto",
        borderRadius: "25px",
        overflow: "hidden",
        position: "relative",
        background: "transparent",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        border: "4px solid #ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          position: "absolute",
          animation: "marquee 10s linear infinite",
          willChange: "transform",
        }}
        key={currentIndex}
      >
        <span
          style={{
            fontSize: "2rem",
            fontFamily: "'Hind Siliguri', sans-serif", 
            fontStyle: "normal",
            fontWeight: "700",
            color: "#e2e8f0",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          {sentences[currentIndex]}
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%); /* Start fully off-screen to the right */
          }
          100% {
            transform: translateX(-100%); /* End fully off-screen to the left */
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeProposal;
