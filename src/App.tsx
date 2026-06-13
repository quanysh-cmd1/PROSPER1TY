import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TikTokIcon, WhatsAppIcon, TelegramIcon } from './components/BrandIcons';
import { VolumeIcon, VolumeXIcon } from './components/AudioIcons';
import { Embers } from './components/Embers';
import logoImage from './assets/images/samurai_bg_1781284705466.jpg';
import guildLogo from './assets/images/prosperity_guild_logo_v2_1781272214717.jpg';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white selection:bg-orange-500/30">
      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        src="https://mp3tourl.com/audio/1781287512182-47524bec-9c82-4e71-bf70-2b41260ecfaa.mp3" 
        loop 
        playsInline
      />

      {/* Deep Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center origin-bottom animate-[sway_8s_ease-in-out_infinite]"
          style={{ backgroundImage: `url(${logoImage})` }}
        />
        {/* Tint layer for dark samurai mood (blur removed as requested) */}
        <div className="absolute inset-0 bg-orange-950/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Subtle radial gradient to center focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Background Avatar with Hover Effect */}
      <motion.div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-[120vw] h-[120vw] sm:w-[70vw] sm:h-[70vw] bg-center bg-contain bg-no-repeat opacity-10 cursor-pointer"
          style={{ backgroundImage: `url(${guildLogo})`, filter: "blur(12px)" }}
        />
      </motion.div>

      {/* Embers Component */}
      <Embers />

      {entered && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-orange-500/20 transition-all z-[100] shadow-lg shadow-black/20"
        >
          {isPlaying ? <VolumeIcon className="w-6 h-6" /> : <VolumeXIcon className="w-6 h-6" />}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="relative z-50 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleEnter}
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-xl sm:text-2xl font-light tracking-widest uppercase text-orange-200/80"
            >
              ЖАЛҒАСТЫРУ ҮШІН БАСЫҢЫЗ
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center"
          >
            {/* Main Glass Card - Apple Style but dark and edgy */}
            <motion.div 
              className="w-full relative group"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            >
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-red-600/10 rounded-[40px] blur-3xl transition-all duration-500 group-hover:bg-red-600/20" />
              
              <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 sm:p-10 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                
                {/* Diagonal subtle glint */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                  className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-widest sm:tracking-[0.15em] mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-200 to-red-500 max-w-full break-words"
                  style={{ filter: "drop-shadow(0 0 20px rgba(239,68,68,0.5))" }}
                >
                  PROSPER1TY
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-sm font-medium tracking-widest uppercase text-red-400/80 mb-8 sm:mb-10"
                >
                  Free Fire Guild
                </motion.p>
                
                {/* Description Space */}
                <div className="h-6" />

                {/* Call to action Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="mb-10 w-full text-orange-50/90"
                >
                  <p className="text-lg sm:text-xl font-medium leading-relaxed max-w-[280px] mx-auto">
                    гильдиямыз ға кіру үшін What's app - тағы фан беседағы кір
                  </p>
                </motion.div>

                {/* Social Buttons */}
                <div className="w-full flex flex-col gap-4">
                  <motion.a
                    href="https://chat.whatsapp.com/IEpx0ABM4As1U4pPXrmCCY"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/50 backdrop-blur-md rounded-2xl py-4 transition-colors relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                    <WhatsAppIcon className="w-6 h-6 text-[#25D366] transition-transform group-hover/btn:scale-110" />
                    <span className="font-semibold tracking-wide text-white">WhatsApp</span>
                  </motion.a>

                  <motion.a
                    href="https://www.tiktok.com/@prosper1ty_ps?_r=1&_t=ZS-979Nu2hGHtE"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 backdrop-blur-md rounded-2xl py-4 transition-colors relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                    <TikTokIcon className="w-5 h-5 text-red-400 transition-transform group-hover/btn:scale-110" />
                    <span className="font-semibold tracking-wide text-white">TikTok</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Creator Telegram Link */}
            <motion.a
              href="https://t.me/kukosyak"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, type: "spring" }}
              className="mt-8 inline-flex items-center gap-2 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 hover:border-[#229ED9]/50 backdrop-blur-md rounded-full px-3 py-1.5 text-xs text-[#229ED9] hover:text-white transition-all shadow-lg shadow-black/20 group cursor-pointer"
            >
              <TelegramIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span className="font-medium text-white/80 group-hover:text-white transition-colors">жасаушының телеграм арнасына тіркеліңіз</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
