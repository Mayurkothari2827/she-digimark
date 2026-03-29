import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { 
  Instagram, 
  Linkedin, 
  ChevronRight, 
  Zap, 
  ArrowRight,
  Smartphone,
  PenTool,
  Layout,
  BookOpen,
  Compass,
  Megaphone,
  Search
} from 'lucide-react';
import './App.css';


const CurtainHero = () => {
  const { scrollYProgress } = useScroll();
  const leftX = useTransform(scrollYProgress, [0, 0.2], [0, -1200]);
  const rightX = useTransform(scrollYProgress, [0, 0.2], [0, 1200]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.05, 0.18], [0, 1, 0]);

  return (
    <section className="story-hero">
      {/* Sticky background — revealed as curtains open */}
      <div className="curtain-reveal-bg">
        <div className="intro-content">
          <div className="intro-line-wrap">
            <span className="intro-greeting">Hi!</span>
          </div>
          <div className="intro-line-wrap">
            <span className="intro-name">I am Nandika</span>
          </div>
          <div className="intro-line-wrap">
            <span className="intro-role">a digital marketer</span>
          </div>
        </div>
      </div>

      {/* Curtain Panels — slide apart on scroll */}
      <motion.div className="curtain-panel left" style={{ x: leftX }}>
        {/* Right-edge border — appears only after separation */}
        <motion.div className="panel-edge right-edge" style={{ opacity: borderOpacity }} />
        <div className="curtain-words-wrapper">
          <span className="curtain-word">SHE</span>
          <span className="curtain-word sub">DIGIMARK</span>
        </div>
      </motion.div>
      <motion.div className="curtain-panel right" style={{ x: rightX }}>
        {/* Left-edge border — appears only after separation */}
        <motion.div className="panel-edge left-edge" style={{ opacity: borderOpacity }} />
        <div className="curtain-words-wrapper">
          <span className="curtain-word">SHE</span>
          <span className="curtain-word sub">DIGIMARK</span>
        </div>
      </motion.div>
    </section>
  );
};


const App = () => {
  const scrollRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const marqueeText = "Ideate. Strategize. Grow. Dominate Your Brand Presence. • ";

  const lenisRef = useRef<Lenis | null>(null);

  const scrollToSection = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, {
        duration: 1.5,
        offset: -60,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, company, message } = contactData;
    const waNumber = "919587463676";
    const text = `Hi! I'm ${name}${company ? ` from ${company}` : ''}. %0AEmail: ${email} %0A%0A${message}`;
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="app-container" ref={scrollRef}>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <span className="logo-main">she</span>
          <span className="logo-sub">digimark</span>
          <span className="logo-tagline-nav">DIGITAL MARKETER</span>
        </div>
        <div className="nav-right">
          <button
            className="nav-cta-pill"
            onClick={() => { setContactOpen(true); setMenuOpen(false); }}
          >
            Get in touch <ArrowRight size={18} />
          </button>
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <span className="nav-hamburger-x">✕</span>
            ) : (
              <>
                <span></span>
                <span></span>
                <span></span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Slide-in Pink Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-menu-overlay"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="nav-menu-links">
              <button onClick={() => { scrollToSection('about'); setMenuOpen(false); }}>About Us</button>
              <button onClick={() => { scrollToSection('services'); setMenuOpen(false); }}>Services</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Overlay */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="contact-overlay"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close button */}
            <button className="contact-close" onClick={() => setContactOpen(false)} aria-label="Close">✕</button>

            <div className="contact-inner">
              {/* Heading */}
              <div className="contact-heading-block">
                <h2 className="contact-title">Say hello</h2>
                <p className="contact-subtitle">
                  If you like what you see, type some things into these boxes and<br />
                  hit the send button and enter the chat.
                </p>
              </div>

              {/* Form */}
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form-left">
                  <input 
                    className="contact-input" 
                    type="text" 
                    placeholder="Name" 
                    value={contactData.name}
                    onChange={(e) => setContactData({...contactData, name: e.target.value})}
                    required 
                  />
                  <input 
                    className="contact-input" 
                    type="email" 
                    placeholder="Email" 
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    required 
                  />
                  <input 
                    className="contact-input" 
                    type="text" 
                    placeholder="Company" 
                    value={contactData.company}
                    onChange={(e) => setContactData({...contactData, company: e.target.value})}
                  />
                </div>
                <div className="contact-form-right">
                  <textarea 
                    className="contact-textarea" 
                    placeholder="What would you like help with?" 
                    rows={6} 
                    value={contactData.message}
                    onChange={(e) => setContactData({...contactData, message: e.target.value})}
                  />
                </div>
                <div className="contact-form-submit">
                  <button type="submit" className="contact-submit-btn">
                    Get in touch <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CurtainHero />

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-content">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>


      {/* Services Section */}
      <motion.section 
        id="services" 
        className="services"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Do</h2>
            <p className="services-intro">From building your presence to scaling your growth, we offer:</p>
          </div>
          <div className="services-list">
            {[
              { icon: <Smartphone className="pink-text" />, title: "Social Media Management" },
              { icon: <PenTool className="pink-text" />, title: "Content & Creative Marketing" },
              { icon: <Zap className="pink-text" />, title: "Performance Marketing" },
              { icon: <Layout className="pink-text" />, title: "Website Design & Development" },
              { icon: <BookOpen className="pink-text" />, title: "Digital Marketing Courses" },
              { icon: <Compass className="pink-text" />, title: "Media Strategy & Planning" },
              { icon: <Megaphone className="pink-text" />, title: "Influencer Marketing" },
              { icon: <Search className="pink-text" />, title: "SEO & Organic Growth" }
            ].map((service, idx) => (
              <ServiceItem 
                key={idx}
                icon={service.icon}
                title={service.title}
                description=""
                index={idx}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <footer className="footer">
        {/* Nav Row */}
        <div className="footer-nav-row">
          <button onClick={() => scrollToSection('about')}>About Us</button>
          <button onClick={() => scrollToSection('services')}>Services</button>
        </div>

        <div className="footer-divider" />

        {/* Social + Brand */}
        <div className="footer-mid-row">
          <div className="footer-socials">
            <a href="https://www.instagram.com/she_digimark_11/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-icon"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/in/nandika-bihani-ba5918295/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-icon"><Linkedin size={18} /></a>
          </div>
          <div className="footer-logo">
            <span className="footer-logo-main">she</span>
            <span className="footer-logo-sub">digimark</span>
            <span className="footer-logo-tagline">DIGITAL MARKETER</span>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <p>© {new Date().getFullYear()} She Digimark. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
};


const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  
  return (
    <motion.section 
      ref={ref}
      id="about" 
      className="about container"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1 }}
      style={{ paddingTop: '4rem' }}
    >
      {/* Background large text for 'cool' feeling */}
      <div className="section-bg-text">DIGIMARK</div>
      
      <div className="about-grid">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="section-title">About She Digimark</h2>
          <p className="large-p">
            She Digimark is a digital marketing agency focused on turning ideas into real growth.
          </p>
          <p>
            Founded by Nandika Bihani, we help brands build a strong online presence through strategy, creativity, and performance marketing — not just content, but results.
          </p>
          <p>
            We also train individuals to grow in the digital marketing space with practical knowledge.
          </p>
        </motion.div>
        <div className="about-visual" style={{ padding: '4rem 0' }}>
          <motion.div 
            className="circle-bg"
            style={{ y: y1 }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="accent-box"
            style={{ y: y2 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img src="/nandika.png" alt="Nandika Bihani" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ServiceItem = ({ icon, title, description, index }: any) => (
  <motion.div 
    className="service-item"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1] 
    }}
  >
    <div className="service-icon">{icon}</div>
    <div className="service-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <ChevronRight className="service-arrow" />
  </motion.div>
);

export default App;
