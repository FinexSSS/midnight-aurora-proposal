import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import WordMareque from './MarqueeProposal.jsx';
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

// Import Local GIFs to ensure 100% visibility
import initialGif from "./assets/GifData/main_temp.gif";
import sadGif from "./assets/GifData/sad.gif";
import happyGif from "./assets/GifData/happy.gif";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(null);

  const yesButtonSize = noCount * 12 + 16;

  // Phrases for the "No" button
  const noPhrases = [
    "না 🙁",
    "সত্যিই?",
    "আবার ভাবো!",
    "এতো কঠিন হৃদয়?",
    "একটু দয়া করো! 🥺",
    "আকাশও কাঁদছে দেখো! 🌧️",
    "চাঁদও লুকিয়ে গেলো!",
    "তারাগুলো নিভে যাচ্ছে! ⭐",
    "কবি বলেছেন — নিষ্ঠুরতা মানায় না! 📜",
    "ফুলগুলোও মুখ ঘুরিয়ে নিলো! 🌸",
    "বৃষ্টি নামলো চোখে! 🌧️",
    "রবীন্দ্রনাথও এতো নিষ্ঠুর ছিলেন না!",
    "শেষবারের মতো ভাবো! 🙏",
    "প্লিজ? আমি তো কিছু খারাপ চাইনি! 💫",
  ];

  // Dynamic Main Poetic Messages based on noCount
  const mainMessages = [
    "এই বিশাল পৃথিবীতে কিছু মানুষের উপস্থিতি খুব শান্ত, খুব মায়াবী... ঠিক তোমার মতো। একটু সময় হবে আমার জন্য? ✨", // 0
    "মেঘলা দিনে একলা আকাশ যেমন শূন্য লাগে, তুমি না থাকলে ঠিক তেমনই লাগে... ☁️", // 1
    "একটু ভেবে দেখো না? খুব বেশি তো কিছু চাইনি... 🍂", // 2
    "জানো, কিছু গল্প শুরু হওয়ার আগেই ফুরিয়ে গেলে খুব কষ্ট হয়... 📖", // 3
    "তোমার ওই হাসিটা দেখার জন্যই তো এতো আয়োজন! একটু হাসবে? 🌸", // 4
    "এতটা পাষাণ কি হতে হয়? একটু তো মায়া করো! 🥺", // 5
    "তুমি না বললে এই রাতের আকাশটাও কেমন যেন বিষণ্ণ হয়ে যায়... 🌙", // 6
    "প্লিজ? আমি কিন্তু তোমার ওই মিষ্টি হাসির অপেক্ষায় আছি... 💫", // 7
    "আচ্ছা ঠিক আছে, আমি আর জোর করবো না, কিন্তু একবার ভেবে দেখো! 💔", // 8
    "তুমি জানো তুমি কতটা স্পেশাল? তোমার 'হ্যাঁ' টা আমার খুব দরকার! 🌟", // 9
  ];

  // Fallback for when noCount exceeds mainMessages length
  const getCurrentMessage = () => {
    if (noCount >= mainMessages.length) {
      return "এখন তো আর 'না' বলার কোনো উপায় নেই! এবার অন্তত 'হ্যাঁ' বলে দাও! 🥰";
    }
    return mainMessages[noCount];
  };

  const getGifUrl = () => {
    if (yesPressed) return happyGif; 
    if (noCount === 0) return initialGif; 
    return sadGif; // Reuse the small sad.gif to prevent 4MB lag
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
         console.log("Audio blocked. Interaction needed.");
      });
    }
  };

  // Attempt to play on launch, and attach a global listener to guarantee play on first click/touch
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          // Once it plays successfully, remove the listeners
          document.removeEventListener('click', startAudio);
          document.removeEventListener('touchstart', startAudio);
        }).catch(() => {
          console.log("Waiting for interaction to play audio...");
        });
      }
    };

    // Try immediately
    startAudio();

    // Fallback: play on very first interaction anywhere on the screen
    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleNoClick = () => {
    playAudio();
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    
    if (nextCount === 1) {
      Swal.fire({
        title: "এত্ত পাষাণ তুমি? চাঁদটাও মেঘের আড়ালে লুকিয়ে গেলো তোমার না শুনে! 🌙",
        customClass: {
          popup: 'glass-swal',
          title: 'glass-swal-title',
          confirmButton: 'glass-swal-confirm'
        },
        buttonsStyling: false,
        confirmButtonText: "আচ্ছা, আরেকবার ভাবছি!"
      });
    } else if (nextCount === 10) {
      Swal.fire({
        title: "সত্যিই মানবে না? একটু তো মায়া করো! 🥺",
        customClass: {
          popup: 'glass-swal',
          title: 'glass-swal-title',
          confirmButton: 'glass-swal-confirm'
        },
        buttonsStyling: false,
        confirmButtonText: "হুমম"
      });
    }
  };

  const handleYesClick = () => {
    playAudio();
    setYesPressed(true);
    
    // Custom Stardust Confetti - High Performance Burst
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffffff', '#818cf8', '#c084fc', '#38bdf8']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffffff', '#818cf8', '#c084fc', '#38bdf8']
      });
    }, 250);
  };

  const showNoButton = noCount < noPhrases.length;

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      {/* HTML5 Audio Player referencing user's uploaded song */}
      <audio ref={audioRef} loop src="/Music/Ki hobey_  KaaktaalRaw v06 Ch08.mp3" preload="auto" />

      {/* Music Toggle */}
      <button
        className="fixed top-6 right-6 z-50 bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-400/30 p-3 rounded-full backdrop-blur-md transition-all duration-300 text-indigo-100"
        onClick={() => {
           playAudio();
           toggleMute();
        }}
        title="Toggle Music"
      >
        {isMuted ? <BsVolumeMuteFill size={24} /> : <BsVolumeUpFill size={24} />}
      </button>

      <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen selection:bg-indigo-500 selection:text-white p-4">
        
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="glass-panel p-6 md:p-12 w-full flex flex-col items-center text-center transition-all duration-1000 ease-in-out relative z-10">
            
            {/* Interactive Aesthetic GIF using reliable local assets */}
            <div className="mb-6 h-32 md:h-40 flex justify-center items-center">
              <img 
                key={getGifUrl()} // Key ensures image fade triggers if we add classes
                src={getGifUrl()} 
                alt="Aesthetic Animation" 
                className="h-full rounded-2xl shadow-lg border border-white/10 animate-fadeInUp"
              />
            </div>

            {yesPressed ? (
              <div className="animate-fadeIn w-full flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold my-6 text-indigo-200 animate-fadeInUp">
                  তুমি সত্যিই বিশেষ! 🌸
                </div>
                <div className="text-2xl md:text-3xl my-6 leading-relaxed max-w-2xl text-slate-100 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                  পৃথিবীর সব সুন্দর জিনিসের তালিকায় তোমার ওই মিষ্টি হাসিটাও একটা। এভাবেই থেকো, সবসময়। ✨
                </div>
                <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                  <WordMareque />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                {/* Instant FadeInUp Animation (No Typewriter to miss) */}
                <h1 
                  key={noCount} 
                  className="text-2xl md:text-4xl my-4 leading-relaxed md:leading-[1.5] min-h-[120px] max-w-3xl text-slate-50 font-medium animate-fadeInUp"
                >
                  {getCurrentMessage()}
                </h1>
                
                <div className="flex flex-wrap justify-center gap-6 items-center mt-6 h-24 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                  <button
                    className="bg-indigo-600/80 hover:bg-indigo-500 text-white font-semibold py-3 px-10 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.8)] backdrop-blur-md border border-indigo-400/30 transition-all duration-300 transform hover:scale-105"
                    style={{ fontSize: Math.min(yesButtonSize, 40) }}
                    onClick={handleYesClick}
                  >
                    হ্যাঁ
                  </button>
                  
                  {/* The Disappearing No Button */}
                  {showNoButton && (
                    <button
                      onClick={handleNoClick}
                      className="bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 font-semibold py-3 px-6 rounded-full backdrop-blur-md border border-slate-600/50 transition-all duration-300"
                    >
                      {noPhrases[noCount]}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <div className="fixed bottom-4 text-slate-400 text-sm font-light tracking-wider opacity-60 hover:opacity-100 transition-opacity z-20">
      Made with <span role="img" aria-label="sparkles">✨</span> by Shahariar Akram
    </div>
  );
};
