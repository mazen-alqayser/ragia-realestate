'use client';

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Building2, Home as HomeIcon, MessageSquare, Settings, TrendingUp, FileText,
  MapPin, Bed, Bath, Maximize, Phone, Mail, ChevronDown, ChevronLeft,
  Menu, X, Globe, Volume2, VolumeX, Music as MusicIcon, Star,
  Facebook, Instagram, Linkedin, Twitter, Send, Crown, Award, Users,
  Building, Shield, Sparkles, Quote, ArrowDown, MessageCircle,
  CheckCircle2, MapPinned, Landmark, Compass, Hotel, Trees, Warehouse,
  Layers, Briefcase, ArrowLeft, ArrowRight, Languages, Heart,
} from 'lucide-react';
import {
  servicesData,
  propertiesData,
  propertyTypes,
  sudanCities,
  countriesData,
  testimonialsData,
  statsData,
  WA_NUMBER,
  PHONE_NUMBER,
  type Property,
  type Testimonial,
  type Lang as _Lang,
} from '@/lib/sudan-data';

// ============================================================
// TYPES & HELPERS
// ============================================================
type Lang = 'ar' | 'en';
type Bi = { ar: string; en: string };

const t = (obj: Bi, lang: Lang): string => obj[lang];

const iconMap: Record<string, typeof Building2> = {
  Building2,
  Home: HomeIcon,
  MessageSquare,
  Settings,
  TrendingUp,
  FileText,
  Building,
  Crown,
  Award,
  Users,
  Shield,
  Sparkles,
  Landmark,
  Compass,
  Hotel,
  Trees,
  Warehouse,
  Layers,
  MapPinned,
  Briefcase,
};

const getIcon = (name: string) => iconMap[name] ?? Building2;

const getPropertyCategory = (property: Property): string => {
  const typeEn = property.type.en.toLowerCase();
  if (typeEn.includes('villa')) return 'villa';
  if (typeEn.includes('apartment')) return 'apartment';
  if (typeEn.includes('land')) return 'land';
  if (typeEn.includes('tower')) return 'tower';
  if (typeEn.includes('farm')) return 'farm';
  if (typeEn.includes('building')) return 'building';
  return 'all';
};

const buildWhatsAppLink = (message: string): string =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const openWhatsApp = (message: string): void => {
  if (typeof window !== 'undefined') {
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  }
};

const NAV_LINKS = [
  { id: 'home', ar: 'الرئيسية', en: 'Home' },
  { id: 'services', ar: 'خدماتنا', en: 'Services' },
  { id: 'properties', ar: 'عقاراتنا', en: 'Properties' },
  { id: 'cities', ar: 'مدن السودان', en: 'Cities' },
  { id: 'countries', ar: 'الدول', en: 'Countries' },
  { id: 'contact', ar: 'تواصل معنا', en: 'Contact' },
] as const;

// ============================================================
// HOOK: 3D TILT EFFECT
// ============================================================
function useTilt3D(maxDeg: number = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * maxDeg;
    const rotateY = (x / rect.width) * maxDeg;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
    );
  };

  const onLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return { ref, transform, onMove, onLeave };
}

// ============================================================
// HOOK: COUNT UP ANIMATION
// ============================================================
function useCountUp(target: number, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let startTime = 0;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setCount(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

// ============================================================
// TILT CARD WRAPPER
// ============================================================
function TiltCard({
  children,
  className = '',
  maxDeg = 8,
}: {
  children: ReactNode;
  className?: string;
  maxDeg?: number;
}) {
  const { ref, transform, onMove, onLeave } = useTilt3D(maxDeg);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-3d ${className}`}
      style={{ transform, transition: 'transform 0.25s ease-out' }}
    >
      {children}
    </div>
  );
}

// ============================================================
// SECTION HEADING
// ============================================================
function SectionHeading({
  title,
  subtitle,
  lang,
  align = 'center',
}: {
  title: Bi;
  subtitle?: Bi;
  lang: Lang;
  align?: 'center' | 'start';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className={`mb-12 sm:mb-16 ${align === 'center' ? 'text-center mx-auto' : 'text-start'} max-w-3xl`}
    >
      <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
        <span className="text-[#d4af37] text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
          RAGIA
        </span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient mb-4 leading-tight">
        {t(title, lang)}
      </h2>
      {subtitle && (
        <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed">{t(subtitle, lang)}</p>
      )}
    </motion.div>
  );
}

// ============================================================
// 1. PRELOADER
// ============================================================
function Preloader({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Fallback: force remove preloader after animation
      setTimeout(() => {
        const el = document.getElementById('ragia-preloader');
        if (el) el.style.display = 'none';
      }, 1000);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="ragia-preloader"
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#05070d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.6s ease' }}
    >
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ height: 1, width: 40, background: 'rgba(212,175,55,0.6)' }} />
          <Crown style={{ width: 24, height: 24, color: '#d4af37' }} />
          <span style={{ height: 1, width: 40, background: 'rgba(212,175,55,0.6)' }} />
        </div>
        <h1
          className="text-gold-gradient"
          style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 700, letterSpacing: '0.2em', margin: 0 }}
        >
          RAGIA
        </h1>
        <p style={{ color: '#94a3b8', letterSpacing: '0.5em', fontSize: 'clamp(0.65rem, 2vw, 0.875rem)', textTransform: 'uppercase', marginLeft: '0.5em', marginTop: 4 }}>
          Real Estate
        </p>
      </div>
      <div style={{ marginTop: 40, width: 'clamp(180px, 40vw, 256px)', height: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', borderRadius: 9999, position: 'relative', zIndex: 10 }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg, #b8960c, #f0d060, #b8960c)', animation: 'slideRight 2s linear infinite' }} />
      </div>
      <p style={{ marginTop: 24, color: 'rgba(148,163,184,0.6)', fontSize: 12, letterSpacing: '0.2em' }}>
        {lang === 'ar' ? 'جارٍ التحضير...' : 'Loading...'}
      </p>
    </div>
  );
}

// ============================================================
// 2. AMBIENT MUSIC PLAYER
// ============================================================
function AmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const start = useCallback(() => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      gainRef.current = master;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 700;
      filter.Q.value = 1.5;
      filter.connect(master);
      filterRef.current = filter;

      // Ambient pad — root, fifth, octave (C3, G3, C4)
      const freqs = [130.81, 196.0, 261.63, 329.63];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.detune.value = (i - 1.5) * 4;
        const g = ctx.createGain();
        g.gain.value = 0.22;
        osc.connect(g);
        g.connect(filter);
        osc.start();
        oscillatorsRef.current.push(osc);
      });

      // Slow LFO on filter cutoff for movement
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 180;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      oscillatorsRef.current.push(lfo);

      master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.5);
    } catch {
      // Audio not supported — fail silently
    }
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (ctx && gain) {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => {
          try { o.stop(); } catch { /* noop */ }
          try { o.disconnect(); } catch { /* noop */ }
        });
        oscillatorsRef.current = [];
        try { ctx.close(); } catch { /* noop */ }
        ctxRef.current = null;
        gainRef.current = null;
        filterRef.current = null;
      }, 900);
    }
  }, []);

  const toggle = () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass-gold flex items-center justify-center group hover:scale-110 transition-transform"
      style={{ pointerEvents: 'auto' }}
    >
      {playing ? (
        <span className="relative flex items-center justify-center">
          <MusicIcon className="w-5 h-5 text-[#d4af37] animate-pulse-gold" />
          <span className="absolute inset-0 rounded-full border border-[#d4af37] animate-ping opacity-40" />
        </span>
      ) : (
        <VolumeX className="w-5 h-5 text-[#d4af37]/70 group-hover:text-[#d4af37] transition-colors" />
      )}
    </button>
  );
}

// ============================================================
// 3. PARTICLES BACKGROUND
// ============================================================
function ParticlesBg() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 10,
        tx: (Math.random() - 0.5) * 200,
        ty: -100 - Math.random() * 300,
        opacity: 0.2 + Math.random() * 0.5,
      })),
    [],
  );

  return (
    <div className="particles-bg" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#d4af37]"
          style={
            {
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              opacity: p.opacity,
              boxShadow: '0 0 6px rgba(212,175,55,0.8)',
              animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// ============================================================
// 4. NAVBAR
// ============================================================
function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass py-2 shadow-lg shadow-black/40' : 'bg-transparent py-4'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, 'home')}
            className="flex items-center gap-2 group"
          >
            <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-[#d4af37] group-hover:rotate-12 transition-transform" />
            <div className="flex flex-col leading-none">
              <span
                className="text-xl sm:text-2xl font-bold text-gold-gradient tracking-wider"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                RAGIA
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#94a3b8] tracking-[0.3em] uppercase">
                Real Estate
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNav(e, link.id)}
                className="px-4 py-2 text-sm font-medium text-[#e2e8f0]/90 hover:text-[#d4af37] transition-colors relative group"
              >
                {t({ ar: link.ar, en: link.en }, lang)}
                <span className="absolute bottom-1 right-1/2 translate-x-1/2 h-px w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-2/3" />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-gold text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37]/15 transition-colors"
              aria-label="Toggle language"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'EN' : 'ع'}
            </button>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8960c] text-[#080b14] text-xs font-bold hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'اتصل الآن' : 'Call Now'}
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-[#d4af37]"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: lang === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`absolute top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} h-full w-72 glass border-${lang === 'ar' ? 'l' : 'r'} border-[#d4af37]/20 p-6 pt-24 flex flex-col gap-2`}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNav(e, link.id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#e2e8f0] hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-colors text-base font-medium"
                >
                  <span className="h-1 w-6 bg-[#d4af37]/40 rounded-full" />
                  {t({ ar: link.ar, en: link.en }, lang)}
                </motion.a>
              ))}
              <div className="mt-4 pt-4 border-t border-[#d4af37]/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setLang(lang === 'ar' ? 'en' : 'ar');
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-gold text-[#d4af37] font-semibold"
                >
                  <Languages className="w-4 h-4" />
                  {lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                </button>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8960c] text-[#080b14] font-bold"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_NUMBER}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// 5. HERO SECTION
// ============================================================
function Hero({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070"
          alt="Luxury real estate"
          className="w-full h-[120%] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b14]/70 via-[#080b14]/75 to-[#080b14]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-transparent to-[#080b14]/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <Crown className="w-5 h-5 text-[#d4af37]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-6xl sm:text-8xl lg:text-9xl font-bold text-gold-gradient mb-3 tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          RAGIA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl sm:text-2xl text-[#d4af37] font-semibold mb-8 tracking-wide"
        >
          {lang === 'ar' ? 'راقية للعقارات' : 'RAGIA Real Estate'}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="hero-title text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {lang === 'ar' ? (
            <>
              إرث من <span className="text-gold-gradient">الثقة</span> والتميز العقاري
            </>
          ) : (
            <>
              A Legacy of <span className="text-gold-gradient">Trust</span> & Real Estate Excellence
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {lang === 'ar'
            ? 'مع خبرة تتجاوز ٢٠ عاماً، نقدم لك أرقى العقارات في السودان ومصر والإمارات والسعودية. نحوّل رؤيتك العقارية إلى واقع ملموس بفخامة واحترافية.'
            : 'With over 20 years of expertise, we offer the finest properties across Sudan, Egypt, UAE, and Saudi Arabia. We turn your real estate vision into a tangible reality with luxury and professionalism.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => handleNav('properties')}
            className="group w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8960c] text-[#080b14] font-bold text-sm sm:text-base hover:shadow-2xl hover:shadow-[#d4af37]/40 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            {lang === 'ar' ? 'استكشف عقاراتنا' : 'Explore Properties'}
            {lang === 'ar' ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-[#d4af37] text-[#d4af37] font-bold text-sm sm:text-base hover:bg-[#d4af37] hover:text-[#080b14] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleNav('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#d4af37]/70 hover:text-[#d4af37] transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">
          {lang === 'ar' ? 'اسحب للأسفل' : 'Scroll'}
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce-slow" />
      </motion.button>
    </section>
  );
}

// ============================================================
// 6. ABOUT SECTION
// ============================================================
function About({ lang }: { lang: Lang }) {
  const stats = [
    { icon: Award, value: '20+', label: { ar: 'سنة خبرة', en: 'Years Experience' } },
    { icon: Globe, value: '4', label: { ar: 'دول', en: 'Countries' } },
    { icon: Building, value: '2500+', label: { ar: 'عقار', en: 'Properties' } },
  ];

  const points = lang === 'ar'
    ? [
        'فريق من الخبراء العقاريين المعتمدين بأعلى المعايير الدولية',
        'شبكة واسعة من الشركاء في السودان ومصر والإمارات والسعودية',
        'خدمات قانونية متكاملة لضمان سلامة جميع المعاملات',
        'استراتيجيات تسويق عقاري حديثة ومبتكرة',
      ]
    : [
        'A team of certified real estate experts with the highest international standards',
        'An extensive network of partners across Sudan, Egypt, UAE, and Saudi Arabia',
        'Integrated legal services ensuring the safety of all transactions',
        'Modern and innovative real estate marketing strategies',
      ];

  return (
    <section id="about" className="section-padding py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={{ ar: 'من نحن', en: 'About RAGIA' }}
          subtitle={{
            ar: 'تعرف على راقية للعقارات — حيث يلتقي الفخامة بالخبرة',
            en: 'Discover RAGIA Real Estate — where luxury meets expertise',
          }}
          lang={lang}
          align="start"
        />
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
                alt="RAGIA luxury property"
                className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-transparent to-transparent" />
              <div className="absolute inset-0 border border-[#d4af37]/20 rounded-3xl" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute ${lang === 'ar' ? '-bottom-6 -left-6' : '-bottom-6 -right-6'} glass-gold rounded-2xl p-5 sm:p-6 max-w-[180px]`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#080b14]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold-gradient leading-none">20+</div>
                  <div className="text-[10px] text-[#94a3b8] mt-1">
                    {lang === 'ar' ? 'سنة تميّز' : 'Years of Excellence'}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
              {lang === 'ar' ? (
                <>روّاد التسويق العقاري <span className="text-gold-gradient">الفاخر</span> منذ ٢٠٠٣</>
              ) : (
                <>Pioneers of <span className="text-gold-gradient">Luxury</span> Real Estate Since 2003</>
              )}
            </h3>
            <p className="text-[#cbd5e1] mb-6 leading-relaxed text-base sm:text-lg">
              {lang === 'ar'
                ? 'راقية للعقارات هي الاسم الذي يرمز للثقة والفخامة في عالم العقارات. منذ تأسيسنا، ونحن نضع بصمتنا في السوق السوداني والإقليمي، مقدّمين خدمات عقارية متكاملة بمعايير عالمية. نؤمن أن كل عقار يحمل قصة، وكل عميل يستحق تجربة استثنائية.'
                : 'RAGIA Real Estate is the name that symbolizes trust and luxury in the world of real estate. Since our founding, we have made our mark in the Sudanese and regional markets, offering integrated real estate services with global standards. We believe every property tells a story, and every client deserves an exceptional experience.'}
            </p>

            <div className="space-y-3 mb-8">
              {points.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span className="text-[#cbd5e1] text-sm sm:text-base">{p}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="glass rounded-2xl p-3 sm:p-4 text-center"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37] mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-[#94a3b8] mt-1">{t(s.label, lang)}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 7. SERVICES SECTION
// ============================================================
function Services({ lang }: { lang: Lang }) {
  return (
    <section id="services" className="section-padding py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="section-divider mb-16" />
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={{ ar: 'خدماتنا العقارية', en: 'Our Real Estate Services' }}
          subtitle={{
            ar: 'باقة متكاملة من الخدمات الاحترافية لتلبية كافة احتياجاتك العقارية',
            en: 'A comprehensive suite of professional services for all your real estate needs',
          }}
          lang={lang}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <TiltCard className="h-full" maxDeg={6}>
                  <div className="glass-gold rounded-3xl p-6 sm:p-8 h-full relative overflow-hidden group">
                    {/* Decorative corner */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#d4af37]/5 blur-2xl group-hover:bg-[#d4af37]/10 transition-colors" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8960c] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-[#080b14]" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gold-gradient mb-3">
                        {t(service.title, lang)}
                      </h3>
                      <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
                        {t(service.description, lang)}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-sm text-[#cbd5e1]">
                            <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                            {t(f, lang)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 8. PROPERTIES SHOWCASE
// ============================================================
function Properties({ lang }: { lang: Lang }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return propertiesData;
    return propertiesData.filter((p) => getPropertyCategory(p) === activeFilter);
  }, [activeFilter]);

  const inquire = (property: Property) => {
    const msg =
      lang === 'ar'
        ? `مرحباً راقية للعقارات،\n\nأنا مهتم بـ: ${property.title.ar}\nالموقع: ${property.loc.ar}\nالسعر: ${property.price.ar}\n\nيرجى تزويدي بمزيد من التفاصيل. شكراً.`
        : `Hello RAGIA Real Estate,\n\nI'm interested in: ${property.title.en}\nLocation: ${property.loc.en}\nPrice: ${property.price.en}\n\nPlease provide more details. Thank you.`;
    openWhatsApp(msg);
  };

  return (
    <section id="properties" className="section-padding py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="section-divider mb-16" />
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={{ ar: 'مختاراتنا من العقارات', en: 'Featured Properties' }}
          subtitle={{
            ar: 'تشكيلة فاخرة من أرقى العقارات في السودان والمنطقة',
            en: 'A luxurious selection of the finest properties in Sudan and the region',
          }}
          lang={lang}
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {propertyTypes.map((pt) => {
            const active = activeFilter === pt.value;
            return (
              <button
                key={pt.value}
                onClick={() => setActiveFilter(pt.value)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8960c] text-[#080b14] shadow-lg shadow-[#d4af37]/30'
                    : 'glass text-[#cbd5e1] hover:text-[#d4af37] hover:border-[#d4af37]/40'
                }`}
              >
                {t(pt.label, lang)}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="h-full" maxDeg={5}>
                  <div className="glass rounded-3xl overflow-hidden h-full group flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={property.img}
                        alt={t(property.title, lang)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1525] via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full bg-[#d4af37] text-[#080b14] text-[10px] font-bold tracking-wide">
                          {t(property.type, lang)}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 left-3 flex items-center gap-1.5 text-white/90 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span className="truncate">{t(property.loc, lang)}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 leading-snug">
                        {t(property.title, lang)}
                      </h3>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-[#94a3b8] mb-4 flex-wrap">
                        {property.beds && (
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-[#d4af37]" /> {property.beds}
                          </span>
                        )}
                        {property.baths && (
                          <span className="flex items-center gap-1">
                            <Bath className="w-4 h-4 text-[#d4af37]" /> {property.baths}
                          </span>
                        )}
                        {property.area && (
                          <span className="flex items-center gap-1">
                            <Maximize className="w-4 h-4 text-[#d4af37]" /> {property.area}
                          </span>
                        )}
                      </div>

                      {/* Features */}
                      {property.features && property.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {property.features.slice(0, 3).map((f, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-medium border border-[#d4af37]/15"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price + CTA */}
                      <div className="mt-auto pt-3 border-t border-[#d4af37]/10 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] text-[#94a3b8]">
                            {lang === 'ar' ? 'السعر' : 'Price'}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-gold-gradient">
                            {t(property.price, lang)}
                          </div>
                        </div>
                        <button
                          onClick={() => inquire(property)}
                          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1da851] transition-colors"
                          aria-label="Inquire on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          {lang === 'ar' ? 'استفسر' : 'Inquire'}
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center text-[#94a3b8] py-12">
            {lang === 'ar' ? 'لا توجد عقارات في هذا القسم حالياً' : 'No properties in this category'}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// 9. SUDAN CITIES SECTION
// ============================================================
function SudanCitiesSection({ lang }: { lang: Lang }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id="cities" className="section-padding py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="section-divider mb-16" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeading
            title={{ ar: 'كل مدن السودان', en: 'Cities of Sudan' }}
            subtitle={{
              ar: 'حضورنا العقاري يمتد عبر كافة ولايات ومدن السودان',
              en: 'Our real estate presence extends across all states and cities of Sudan',
            }}
            lang={lang}
            align="start"
          />
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll(lang === 'ar' ? 'right' : 'left')}
              className="w-11 h-11 rounded-full glass-gold flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors"
              aria-label="Previous"
            >
              {lang === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5 rotate-180" />}
            </button>
            <button
              onClick={() => scroll(lang === 'ar' ? 'left' : 'right')}
              className="w-11 h-11 rounded-full glass-gold flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors"
              aria-label="Next"
            >
              {lang === 'ar' ? <ChevronLeft className="w-5 h-5 rotate-180" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4"
          style={{ scrollbarWidth: 'thin' }}
        >
          {sudanCities.map((city, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="snap-center shrink-0 w-[300px] sm:w-[340px]"
            >
              <div className="glass-gold rounded-3xl p-6 h-full animate-border-glow group hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gold-gradient mb-1">
                      {lang === 'ar' ? city.nameAr : city.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      {lang === 'ar' ? city.stateAr : city.state}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">{city.propertyCount}</div>
                    <div className="text-[10px] text-[#94a3b8]">
                      {lang === 'ar' ? 'عقار' : 'Properties'}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#cbd5e1] leading-relaxed mb-4 min-h-[60px]">
                  {t(city.description, lang)}
                </p>

                <div className="mb-5">
                  <div className="text-[10px] text-[#94a3b8] uppercase tracking-wider mb-2">
                    {lang === 'ar' ? 'الأحياء' : 'Areas'}
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                    {city.areas.map((a, ai) => (
                      <span
                        key={ai}
                        className="px-2 py-0.5 rounded-md bg-[#d4af37]/10 text-[#d4af37] text-[10px] border border-[#d4af37]/15"
                      >
                        {lang === 'ar' ? a.nameAr : a.name}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById('properties');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold hover:bg-[#d4af37] hover:text-[#080b14] transition-all flex items-center justify-center gap-2"
                >
                  {lang === 'ar' ? 'تصفح العقارات' : 'Browse Properties'}
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 10. STATS SECTION
// ============================================================
function StatsSection({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
          alt="City skyline"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#080b14]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b14] via-[#080b14]/70 to-[#080b14]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <TrendingUp className="w-5 h-5 text-[#d4af37]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            {lang === 'ar' ? 'أرقام تتحدث عن' : 'Numbers That Speak'}{' '}
            <span className="text-gold-gradient">{lang === 'ar' ? 'تميّزنا' : 'Our Excellence'}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {statsData.map((stat, i) => (
            <StatCard key={i} stat={stat} start={inView} lang={lang} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  start,
  lang,
  delay,
}: {
  stat: typeof statsData[number];
  start: boolean;
  lang: Lang;
  delay: number;
}) {
  const count = useCountUp(stat.target, 2000, start);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-gold rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden group"
    >
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#d4af37]/5 blur-2xl group-hover:bg-[#d4af37]/15 transition-colors" />
      <div className="relative">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient mb-2">
          {count}
          {stat.suffix}
        </div>
        <div className="text-xs sm:text-sm text-[#cbd5e1]">{t(stat.label, lang)}</div>
      </div>
    </motion.div>
  );
}

// ============================================================
// 11. COUNTRIES SECTION
// ============================================================
function CountriesSection({ lang }: { lang: Lang }) {
  return (
    <section id="countries" className="section-padding py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="section-divider mb-16" />
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={{ ar: 'دولنا حول العالم', en: 'Our Global Presence' }}
          subtitle={{
            ar: 'نمتدّ بفخامتنا عبر أربع دول رائدة في المنطقة',
            en: 'Our luxury presence extends across four leading countries in the region',
          }}
          lang={lang}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {countriesData.map((country, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="glass-gold rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-transparent transition-all" />
              <div className="relative">
                <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {country.flag}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gold-gradient mb-3">
                  {t(country.name, lang)}
                </h3>
                <div className="mb-4">
                  <div className="text-[10px] text-[#94a3b8] uppercase tracking-wider mb-1">
                    {lang === 'ar' ? 'المدن' : 'Cities'}
                  </div>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">{country.cities}</p>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8] uppercase tracking-wider mb-2">
                    {lang === 'ar' ? 'أنواع العقارات' : 'Property Types'}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {country.propertyTypes.map((pt, pi) => (
                      <span
                        key={pi}
                        className="px-2 py-0.5 rounded-md bg-[#d4af37]/10 text-[#d4af37] text-[10px] border border-[#d4af37]/15"
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#d4af37]/40 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 12. TESTIMONIALS SECTION
// ============================================================
function TestimonialsSection({ lang }: { lang: Lang }) {
  const doubled = useMemo(() => [...testimonialsData, ...testimonialsData], []);
  const [paused, setPaused] = useState(false);

  return (
    <section className="section-padding py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={{ ar: 'ماذا يقول عملاؤنا', en: 'What Our Clients Say' }}
          subtitle={{
            ar: 'قصص نجاح حقيقية من عملاء وثقوا بنا في رحلتهم العقارية',
            en: 'Real success stories from clients who trusted us on their real estate journey',
          }}
          lang={lang}
        />
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge gradients */}
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#080b14] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#080b14] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: lang === 'ar' ? ['0%', '50%'] : ['0%', '-50%'] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {doubled.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} lang={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, lang }: { testimonial: Testimonial; lang: Lang }) {
  return (
    <div className="w-[300px] sm:w-[380px] shrink-0">
      <div className="glass-gold rounded-3xl p-6 sm:p-8 h-full relative">
        <Quote className="w-8 h-8 text-[#d4af37]/40 mb-4" />
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-[#94a3b8]/30'}`}
            />
          ))}
        </div>
        <p className="text-[#cbd5e1] text-sm sm:text-base leading-relaxed italic mb-6 min-h-[100px]">
          “{t(testimonial.text, lang)}”
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-[#d4af37]/10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8960c] flex items-center justify-center text-[#080b14] font-bold text-sm">
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-bold text-white text-sm">{testimonial.name}</div>
            <div className="text-xs text-[#94a3b8]">{t(testimonial.role, lang)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 13. CTA SECTION
// ============================================================
function CTASection({ lang }: { lang: Lang }) {
  const waMessage =
    lang === 'ar'
      ? 'مرحباً راقية للعقارات، أرغب في البدء برحلتي العقارية معكم. يرجى التواصل معي.'
      : 'Hello RAGIA Real Estate, I would like to start my real estate journey with you. Please contact me.';

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#b8960c] via-[#d4af37] to-[#b8960c]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(8,11,20,0.4) 0%, transparent 40%)',
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-5" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {lang === 'ar' ? 'ابدأ رحلتك العقارية مع راقية' : 'Start Your Real Estate Journey with RAGIA'}
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'فريقنا من الخبراء جاهز لمساعدتك في اتخاذ القرار العقاري الصحيح. تواصل معنا اليوم واحصل على استشارة مجانية.'
              : 'Our team of experts is ready to help you make the right real estate decision. Contact us today for a free consultation.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openWhatsApp(waMessage)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#080b14] text-white font-bold text-sm sm:text-base hover:bg-[#1a2238] transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              {lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Us'}
            </button>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-white text-white font-bold text-sm sm:text-base hover:bg-white hover:text-[#080b14] transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {lang === 'ar' ? 'اتصل بنا' : 'Call Us'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// 14. FOOTER
// ============================================================
function Footer({ lang }: { lang: Lang }) {
  const quickLinks = NAV_LINKS;
  const services = servicesData.slice(0, 6).map((s) => ({ ar: s.title.ar, en: s.title.en }));

  const socials = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: MessageCircle, href: `https://wa.me/${WA_NUMBER}`, label: 'WhatsApp' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const handleNav = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#02040a] border-t-2 border-[#d4af37]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-7 h-7 text-[#d4af37]" />
              <div>
                <div
                  className="text-2xl font-bold text-gold-gradient tracking-wider leading-none"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  RAGIA
                </div>
                <div className="text-[9px] text-[#94a3b8] tracking-[0.3em] uppercase mt-1">
                  Real Estate
                </div>
              </div>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
              {lang === 'ar'
                ? 'راقية للعقارات — روّاد التسويق العقاري الفاخر في السودان والمنطقة منذ ٢٠٠٣. نحوّل رؤيتك العقارية إلى واقع.'
                : 'RAGIA Real Estate — Pioneers of luxury real estate marketing in Sudan and the region since 2003. We turn your real estate vision into reality.'}
            </p>
            <div className="flex gap-2">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#080b14] transition-all hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#d4af37] uppercase tracking-wider mb-4">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNav(e, link.id)}
                    className="text-sm text-[#94a3b8] hover:text-[#d4af37] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronLeft className="w-3 h-3 text-[#d4af37]/50 group-hover:translate-x-[-2px] transition-transform" />
                    {t({ ar: link.ar, en: link.en }, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-[#d4af37] uppercase tracking-wider mb-4">
              {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-2.5">
              {services.map((s, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    onClick={(e) => handleNav(e, 'services')}
                    className="text-sm text-[#94a3b8] hover:text-[#d4af37] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronLeft className="w-3 h-3 text-[#d4af37]/50 group-hover:translate-x-[-2px] transition-transform" />
                    {t(s, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-[#d4af37] uppercase tracking-wider mb-4">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-3 text-sm text-[#94a3b8] hover:text-[#d4af37] transition-colors"
                >
                  <span className="w-8 h-8 rounded-full glass flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  </span>
                  <span dir="ltr">{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#94a3b8] hover:text-[#d4af37] transition-colors"
                >
                  <span className="w-8 h-8 rounded-full glass flex items-center justify-center shrink-0">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  </span>
                  <span dir="ltr">+{WA_NUMBER}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#94a3b8]">
                <span className="w-8 h-8 rounded-full glass flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                </span>
                info@ragia-realestate.com
              </li>
              <li className="flex items-start gap-3 text-sm text-[#94a3b8]">
                <span className="w-8 h-8 rounded-full glass flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                </span>
                <span>
                  {lang === 'ar'
                    ? 'الخرطوم، ولاية الخرطوم، السودان'
                    : 'Khartoum, Khartoum State, Sudan'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#d4af37]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-xs text-[#94a3b8]">
            © {new Date().getFullYear()} {lang === 'ar' ? 'راقية للعقارات' : 'RAGIA Real Estate'}.{' '}
            {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-[#94a3b8]/70 flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-[#d4af37]" />
            {lang === 'ar' ? 'صُنع بشغف للعقارات الفاخرة' : 'Crafted with passion for luxury real estate'}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// 15. WHATSAPP FLOATING WIDGET
// ============================================================
function WhatsAppWidget({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      lang === 'ar'
        ? `مرحباً راقية للعقارات،\n\nالاسم: ${name}\nالهاتف: ${phone}\nالموضوع: ${subject}\n\nأرغب في الاستفسار عن خدماتكم العقارية.`
        : `Hello RAGIA Real Estate,\n\nName: ${name}\nPhone: ${phone}\nSubject: ${subject}\n\nI'd like to inquire about your real estate services.`;
    openWhatsApp(msg);
    setOpen(false);
    setName('');
    setPhone('');
    setSubject('');
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        {open ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white relative z-10" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-80 glass-gold rounded-3xl p-5 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#d4af37]/15">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  {lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Us'}
                </div>
                <div className="text-[10px] text-[#94a3b8]">
                  {lang === 'ar' ? 'رد سريع خلال دقائق' : 'Quick reply within minutes'}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] text-[#94a3b8] uppercase tracking-wider mb-1 block">
                  {lang === 'ar' ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'ar' ? 'اسمك الكريم' : 'Your name'}
                  className="w-full px-3 py-2 rounded-xl bg-[#080b14]/60 border border-[#d4af37]/20 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#94a3b8] uppercase tracking-wider mb-1 block">
                  {lang === 'ar' ? 'رقم الهاتف' : 'Phone'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={lang === 'ar' ? '+249...' : '+249...'}
                  dir="ltr"
                  className="w-full px-3 py-2 rounded-xl bg-[#080b14]/60 border border-[#d4af37]/20 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:border-[#d4af37]/60 transition-colors text-right"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#94a3b8] uppercase tracking-wider mb-1 block">
                  {lang === 'ar' ? 'موضوع الرسالة' : 'Subject'}
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={lang === 'ar' ? 'موضوع استفسارك' : 'Your subject'}
                  className="w-full px-3 py-2 rounded-xl bg-[#080b14]/60 border border-[#d4af37]/20 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1da851] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {lang === 'ar' ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function Home() {
  const [lang, setLang] = useState<Lang>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync dir/lang attributes when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <>
      <Preloader lang={lang} />
      <ParticlesBg />
      <AmbientMusic />
      <Navbar lang={lang} setLang={setLang} />

      <main className="relative">
        <Hero lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        <Properties lang={lang} />
        <SudanCitiesSection lang={lang} />
        <StatsSection lang={lang} />
        <CountriesSection lang={lang} />
        <TestimonialsSection lang={lang} />
        <CTASection lang={lang} />
      </main>

      <Footer lang={lang} />
      <WhatsAppWidget lang={lang} />

      {/* Decorative bottom gradient */}
      <div className="fixed bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#080b14] to-transparent pointer-events-none z-[-1]" />
    </>
  );
}
