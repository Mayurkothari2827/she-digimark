import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
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
  const marqueeText = "Ideate. Strategize. Grow. Dominate Your Brand Presence. • ";

  return (
    <div className="app-container" ref={scrollRef}>
      {/* Navbar */}
      <nav className="navbar">
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
              <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
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
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="contact-form-left">
                  <input className="contact-input" type="text" placeholder="Name" required />
                  <input className="contact-input" type="email" placeholder="Email" required />
                  <input className="contact-input" type="text" placeholder="Company" />
                </div>
                <div className="contact-form-right">
                  <textarea className="contact-textarea" placeholder="What would you like help with?" rows={6} />
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
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Do</h2>
            <p className="services-intro">From building your presence to scaling your growth, we offer:</p>
          </div>
          <div className="services-list">
            <ServiceItem 
              icon={<Smartphone className="pink-text" />}
              title="Social Media Management"
              description=""
            />
            <ServiceItem 
              icon={<PenTool className="pink-text" />}
              title="Content & Creative Marketing"
              description=""
            />
            <ServiceItem 
              icon={<Zap className="pink-text" />}
              title="Performance Marketing"
              description=""
            />
            <ServiceItem 
              icon={<Layout className="pink-text" />}
              title="Website Design & Development"
              description=""
            />
            <ServiceItem 
              icon={<BookOpen className="pink-text" />}
              title="Digital Marketing Courses"
              description=""
            />
            <ServiceItem 
              icon={<Compass className="pink-text" />}
              title="Media Strategy & Planning"
              description=""
            />
            <ServiceItem 
              icon={<Megaphone className="pink-text" />}
              title="Influencer Marketing"
              description=""
            />
            <ServiceItem 
              icon={<Search className="pink-text" />}
              title="SEO & Organic Growth"
              description=""
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about container">
        <div className="about-grid">
          <div className="about-text">
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
          </div>
          <div className="about-visual">
            <div className="circle-bg"></div>
            <div className="accent-box">
              <img src="/nandika.png" alt="Nandika Bihani" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        {/* Nav Row */}
        <div className="footer-nav-row">
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
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


const ServiceItem = ({ icon, title, description }: any) => (
  <div className="service-item">
    <div className="service-icon">{icon}</div>
    <div className="service-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <ChevronRight className="service-arrow" />
  </div>
);

export default App;
