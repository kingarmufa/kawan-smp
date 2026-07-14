import { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Copy, 
  Check, 
  Users, 
  Download, 
  Server, 
  Sword, 
  Coins, 
  Shield, 
  ShieldAlert, 
  Sparkles, 
  Calendar, 
  Laptop, 
  Flame, 
  Gift, 
  Wallet, 
  ExternalLink, 
  MessageSquare, 
  Phone, 
  BookOpen, 
  Globe, 
  Heart, 
  Menu, 
  X, 
  ArrowRight,
  ChevronDown,
  Info,
  Smartphone
} from "lucide-react";

// Import images from generated asset paths
import logoUrl from "./assets/images/kawan_smp_logo_1783449266106.jpg";
import bgUrl from "./assets/images/minecraft_rpg_hero_bg_1783449283446.jpg";

interface DeveloperConfig {
  name: string;
  contact: {
    phone: string;
    whatsapp: string;
  };
  community: {
    name: string;
    website: string;
    discord: string;
  };
  website: {
    portfolio: string;
  };
}

const FALLBACK_DEV_CONFIG: DeveloperConfig = {
  name: "KING ARYA",
  contact: {
    phone: "0895602592430",
    whatsapp: "0895602592430"
  },
  community: {
    name: "SERVER KOMUNITAS",
    website: "https://web.kawansmp.my.id",
    whatsapp: "https://chat.whatsapp.com/BF1KRxLOvk86EvyP8vmrKc"
  },
  website: {
    portfolio: "https://sfl.gl/x2ic"
  }
};

export default function App() {
  const [devConfig, setDevConfig] = useState<DeveloperConfig>(FALLBACK_DEV_CONFIG);
  const [copied, setCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [isScrolled, setIsScrolled] = useState(false);

  // Fetch Developer Configuration from API
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/kingarmufa/Tes/refs/heads/main/config.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data developer.");
        return res.json();
      })
      .then((data) => {
        if (data && data.name) {
          setDevConfig(data);
        }
      })
      .catch((err) => {
        console.warn("Menggunakan data developer lokal (fallback):", err);
      });
  }, []);

  // Track header shrinking scroll threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic SEO, Favicon, & Open Graph Meta Tags Injection
  useEffect(() => {
    // 1. Set Document Title
    document.title = `KAWAN SMP - Server Minecraft Survival RPG & Economy`;

    // 2. Dynamic Favicon Setup
    let faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!faviconLink) {
      faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(faviconLink);
    }
    // Set dynamic logoUrl from config if available, otherwise fallback
    faviconLink.href = logoUrl;

    // 3. Dynamic Meta Tags Creation & Update
    const metaData = [
      { property: "og:title", content: "KAWAN SMP - Server Minecraft Survival RPG & Economy" },
      { property: "og:description", content: `Server Minecraft RPG & Ekonomi dengan komunitas aktif. Developed by ${devConfig.name}.` },
      { property: "og:image", content: bgUrl },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.origin },
      { name: "description", content: "Server Minecraft RPG & Ekonomi dengan komunitas aktif, tantangan seru, dan petualangan tanpa batas." }
    ];

    metaData.forEach((tag) => {
      const selector = tag.property 
        ? `meta[property='${tag.property}']` 
        : `meta[name='${tag.name}']`;
      let metaEl = document.querySelector(selector);
      if (!metaEl) {
        metaEl = document.createElement("meta");
        if (tag.property) metaEl.setAttribute("property", tag.property);
        if (tag.name) metaEl.setAttribute("name", tag.name);
        document.getElementsByTagName("head")[0].appendChild(metaEl);
      }
      metaEl.setAttribute("content", tag.content);
    });
  }, [devConfig]);

  // Copy IP handler
  const handleCopyIP = () => {
    navigator.clipboard.writeText("supernova.armufa.my.id");
    setCopied(true);
    setShowNotification(true);
    setTimeout(() => {
      setCopied(false);
      setShowNotification(false);
    }, 3000);
  };

  const menuItems = [
    { id: "beranda", label: "Beranda" },
    { id: "server", label: "Server" },
    { id: "fitur", label: "Fitur" },
    { id: "rules", label: "Rules" },
    { id: "tim", label: "Tim" },
    { id: "download", label: "Download" }
  ];

  // Helper to format WhatsApp link
  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("0") 
      ? `62${cleanPhone.slice(1)}` 
      : cleanPhone;
    return `https://wa.me/${formattedPhone}?text=Halo%20${encodeURIComponent(devConfig.name)},%20saya%20tertarik%20dengan%20layanan%20pengembangan%20server%20Minecraft.`;
  };

  // Safe SPA navigation with auto scroll-to-top
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-main text-white relative font-sans selection:bg-primary selection:text-white flex flex-col justify-between">
      {/* Background Ambience Overlays */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* STICKY HEADER WITH SHRINK ANIMATION */}
      <header 
        id="app-header"
        className={`sticky top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-3 bg-bg-main/90 border-b border-white/10 shadow-2xl backdrop-blur-md" 
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Name */}
          <button 
            onClick={() => navigateToSection("beranda")} 
            className="flex items-center space-x-3 group cursor-pointer text-left"
          >
            <div className={`relative overflow-hidden rounded-lg border border-white/10 group-hover:border-primary/50 transition-all duration-300 ${isScrolled ? "w-9 h-9" : "w-11 h-11"}`}>
              <img 
                src={logoUrl} 
                alt="KAWAN SMP Logo Small" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className={`font-heading font-bold tracking-wider text-white group-hover:text-primary transition-all duration-300 block ${isScrolled ? "text-base" : "text-xl"}`}>
                KAWAN SMP
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToSection(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeSection === item.id 
                    ? "text-primary bg-primary/10 border border-primary/20 shadow-inner" 
                    : "text-text-muted hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Desktop Developer & Community Elegant Dropdown Popover */}
            <div className="relative group ml-4">
              <button className="px-3.5 py-2 rounded-xl text-xs font-semibold text-text-muted hover:text-white hover:bg-white/5 border border-white/5 transition-all flex items-center space-x-1.5 cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span>Dev Info</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300 text-text-muted" />
              </button>
              
              {/* Dropdown Menu on hover */}
              <div className="absolute right-0 mt-2.5 w-64 glass rounded-2xl p-4 shadow-2xl border border-white/10 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="flex items-center space-x-2.5 mb-3 border-b border-white/5 pb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center font-heading font-bold text-primary text-xs">
                    RD
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-white">{devConfig.name}</h5>
                    <p className="text-[9px] text-text-muted font-mono leading-none">Server Architect</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <a 
                    href={devConfig.website.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-primary transition-all duration-200"
                  >
                    <span className="text-text-muted text-[11px]">Developer Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a 
                    href={getWhatsAppLink(devConfig.contact.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-success transition-all duration-200"
                  >
                    <span className="text-text-muted text-[11px]">Hubungi WhatsApp</span>
                    <Phone className="w-3 h-3 text-success" />
                  </a>

                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <span className="text-[9px] text-text-muted uppercase font-bold tracking-wider block">Komunitas</span>
                    <div className="p-2.5 rounded-xl bg-bg-main/50 border border-white/5 space-y-2">
                      <div className="font-semibold text-[11px] text-white truncate">{devConfig.community.name}</div>
                      <div className="flex space-x-1.5">
                        <a 
                          href={devConfig.community.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-1 py-1 rounded bg-white/5 hover:bg-primary/20 text-[9px] font-semibold transition-all"
                        >
                          <Globe className="w-2.5 h-2.5 text-secondary" />
                          <span>Website</span>
                        </a>
                        <a 
                          href={devConfig.community.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-1 py-1 rounded bg-white/5 hover:bg-indigo-600/20 text-[9px] font-semibold transition-all"
                        >
                          <MessageSquare className="w-2.5 h-2.5 text-indigo-400" />
                          <span>Discord</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Clean Action CTA on Desktop */}
          <div className="hidden lg:block">
            <button 
              onClick={() => navigateToSection("server")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <Server className="w-3.5 h-3.5" />
              <span>Gabung Sekarang</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-white/5 bg-bg-main/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToSection(item.id)}
                    className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-all ${
                      activeSection === item.id 
                        ? "text-primary bg-primary/10 font-bold border-l-4 border-l-primary pl-3" 
                        : "text-text-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Developer Info Section beautifully embedded */}
                <div className="mt-6 pt-5 border-t border-white/5 space-y-4">
                  <div className="px-3 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center font-heading font-extrabold text-primary text-sm">
                      RD
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">{devConfig.name}</h4>
                      <p className="text-[10px] text-text-muted font-mono leading-none mt-1">Professional Server Developer</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 px-3 text-xs">
                    <a 
                      href={devConfig.website.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-white/5 text-text-muted hover:text-primary transition-all duration-200 text-center border border-white/5"
                    >
                      <Globe className="w-4 h-4 text-primary" />
                      <span>Portfolio</span>
                    </a>
                    <a 
                      href={getWhatsAppLink(devConfig.contact.whatsapp)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-white/5 text-text-muted hover:text-success transition-all duration-200 text-center border border-white/5"
                    >
                      <Phone className="w-4 h-4 text-success" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <div className="px-3">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2.5">
                      <div className="text-[9px] text-text-muted font-bold tracking-wider uppercase">Komunitas Developer</div>
                      <div className="font-semibold text-xs text-white">{devConfig.community.name}</div>
                      <div className="flex space-x-2 pt-1">
                        <a 
                          href={devConfig.community.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-white/5 hover:bg-primary/20 text-xs transition-all text-center font-medium"
                        >
                          <Globe className="w-3.5 h-3.5 text-secondary" />
                          <span>Website</span>
                        </a>
                        <a 
                          href={devConfig.community.discord} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-white/5 hover:bg-indigo-600/20 text-xs transition-all text-center font-medium"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Discord</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Fast Action CTA Drawer Button */}
                <div className="pt-4 px-2">
                  <button
                    onClick={() => navigateToSection("server")}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/95 hover:to-secondary/95 text-white font-bold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-md shadow-primary/10"
                  >
                    <Server className="w-4 h-4" />
                    <span>Gabung Sekarang</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CORE DYNAMIC SPA CONTENT WITH MOUNT/UNMOUNT FADE EFFECTS */}
      <main className="flex-grow relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            {/* BERANDA / HOME VIEW */}
            {activeSection === "beranda" && (
              <>
                <section className="relative min-h-[85vh] flex items-center justify-center py-16 px-4 overflow-hidden">
                  {/* Parallax Background Artwork */}
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-bg-main/30 via-bg-main/70 to-bg-main z-10" />
                    <img 
                      src={bgUrl} 
                      alt="Minecraft Castle floating island cinematic artwork background" 
                      className="w-full h-full object-cover opacity-35 scale-105 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="max-w-4xl mx-auto text-center relative z-20 flex flex-col items-center">
                    {/* Logo Main Floating */}
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-95 opacity-50 animate-pulse" />
                      <div className="animate-float relative z-10">
                        <img 
                          src={logoUrl} 
                          alt="KAWAN SMP Main Logo Shield" 
                          className="w-44 h-44 md:w-52 md:h-52 object-contain drop-shadow-[0_10px_30px_rgba(46,139,255,0.45)]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h1 className="font-minecraft text-4xl md:text-7xl font-extrabold tracking-wider text-white mb-4 uppercase drop-shadow-[0_4px_12px_rgba(46,139,255,0.25)]">
                        KAWAN SMP
                      </h1>
                      <p className="font-heading font-semibold text-base md:text-2xl text-secondary tracking-widest uppercase mb-6">
                        Selamat Datang di KAWAN SMP
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-text-muted text-xs md:text-base max-w-xl mx-auto leading-relaxed mb-10 font-medium">
                      Server Survival RPG &amp; Economy dengan komunitas aktif, tantangan seru, dan petualangan tanpa batas yang terus berkembang bersama sistem permainan modern dan menantang.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                      <button 
                        onClick={() => navigateToSection("server")}
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold tracking-wide text-sm flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Server className="w-4.5 h-4.5" />
                        <span>Gabung Server</span>
                      </button>
                      <button 
                        onClick={() => navigateToSection("fitur")}
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-white/10 text-white font-bold tracking-wide text-sm flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <BookOpen className="w-4.5 h-4.5" />
                        <span>Lihat Informasi</span>
                      </button>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-16 flex flex-col items-center space-y-1 opacity-60">
                      <span className="text-[9px] text-text-muted font-mono uppercase tracking-widest">Temukan Informasi</span>
                      <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
                    </div>
                  </div>
                </section>

                {/* QUICK INFO SECTION */}
                <section className="relative py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                      { label: "MODE SERVER", value: "RPG & Economy", icon: Sword, color: "text-primary" },
                      { label: "PLATFORM", value: "Java & Bedrock", icon: Laptop, color: "text-secondary" },
                      { label: "STATUS SERVER", value: "Online", icon: Server, color: "text-success", badge: true },
                      { label: "RILIS SERVER", value: "Minggu, 10 Mei 2026", icon: Calendar, color: "text-warning" }
                    ].map((info, idx) => {
                      const IconComponent = info.icon;
                      return (
                        <div
                          key={idx}
                          className="glass rounded-[24px] p-5 flex items-start space-x-3.5 hover:border-white/15 transition-all duration-300 subtle-glow"
                        >
                          <div className={`p-3 rounded-xl bg-white/5 ${info.color} shrink-0`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-[9px] text-text-muted font-bold font-mono tracking-widest uppercase mb-1">
                              {info.label}
                            </span>
                            {info.badge ? (
                              <div className="flex items-center space-x-2 mt-0.5">
                                <span className="font-heading font-extrabold text-sm md:text-base text-white">
                                  {info.value}
                                </span>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold bg-success/15 text-success border border-success/30 uppercase animate-pulse">
                                  Aktif
                                </span>
                              </div>
                            ) : (
                              <span className="font-heading font-extrabold text-sm md:text-base text-white mt-0.5 block">
                                {info.value}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* CTA BERGABUNG */}
                <section className="py-20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="space-y-6">
                      <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-white tracking-tight leading-tight">
                        Mulai Petualanganmu di KAWAN SMP
                      </h2>
                      <p className="text-text-muted text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed">
                        Komunitas ramah, survival RPG menantang, dan sistem ekonomi yang adil sudah menanti kehadiranmu. Sambungkan IP sekarang dan berkembanglah bersama kami!
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
                        <button
                          onClick={() => navigateToSection("server")}
                          className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/95 hover:to-secondary/95 text-white font-bold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                        >
                          <Server className="w-4.5 h-4.5" />
                          <span>Gabung Sekarang</span>
                        </button>
                        <button
                          onClick={handleCopyIP}
                          className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl glass hover:bg-white/10 text-white font-bold text-sm tracking-wide flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                        >
                          {copied ? <Check className="w-4.5 h-4.5 text-success" /> : <Copy className="w-4.5 h-4.5" />}
                          <span>{copied ? "IP Berhasil Disalin!" : "Copy IP Server"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* SERVER SECTION */}
            {activeSection === "server" && (
              <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-primary text-xs font-bold font-mono tracking-widest uppercase block mb-2">IP &amp; PORT KAWAN SMP</span>
                  <h2 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight text-white">
                    Hubungkan Game Milikmu Sekarang
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
                </div>

                <div className="glass rounded-[24px] p-6 md:p-10 max-w-3xl mx-auto relative overflow-hidden subtle-glow-lg border border-white/10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Survival RPG &amp; Economy</span>
                      </div>
                      <h3 className="text-lg md:text-2xl font-heading font-extrabold text-white">
                        Siap Memulai Petualangan Epic?
                      </h3>
                      <p className="text-text-muted text-xs md:text-sm leading-relaxed font-medium">
                        Salin alamat IP dan port di samping, lalu tambahkan ke daftar server Minecraft kamu. Server KAWAN SMP mendukung versi Java Edition dan Bedrock Edition untuk pengalaman bermain tanpa batasan platform!
                      </p>
                    </div>

                    <div className="space-y-4 bg-bg-main/50 p-6 rounded-2xl border border-white/5">
                      <div className="space-y-2">
                        <label className="text-[9px] text-text-muted font-bold font-mono tracking-widest uppercase">ALAMAT IP SERVER</label>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-white/15">
                          <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-accent select-all">
                            supernova.armufa.my.id
                          </span>
                          <div className="text-[9px] px-2 py-0.5 rounded bg-white/5 font-mono text-white">JAVA</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] text-text-muted font-bold font-mono tracking-widest uppercase">PORT BEDROCK</label>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-white/15">
                          <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-accent select-all">
                            24061
                          </span>
                          <div className="text-[9px] px-2 py-0.5 rounded bg-white/5 font-mono text-white">BEDROCK</div>
                        </div>
                      </div>

                      <button
                        onClick={handleCopyIP}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/95 hover:to-secondary/95 text-white font-bold text-sm tracking-wide flex items-center justify-center space-x-2 transition-all shadow-md shadow-primary/10 hover:shadow-primary/20 cursor-pointer"
                        aria-label="Salin IP Server"
                      >
                        {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                        <span>{copied ? "IP Berhasil Disalin!" : "Salin IP & Port"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FITUR SECTION */}
            {activeSection === "fitur" && (
              <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-primary text-xs font-bold font-mono tracking-widest uppercase block mb-2">FITUR UTAMA</span>
                  <h2 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight text-white">
                    Sistem Permainan Unggulan Kami
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Senjata Legendaris", desc: "Kumpulkan senjata dan perlengkapan sakti tingkat tinggi dengan statistik unik untuk membantumu membasmi monster kuat.", icon: Sword, color: "text-primary" },
                    { title: "Sistem Economy", desc: "Gunakan ekonomi dinamis di dalam server untuk berjual beli, membangun kekayaan, dan berdagang dengan sesama petualang.", icon: Coins, color: "text-secondary" },
                    { title: "Pertahanan Wilayah", desc: "Klaim wilayah pribadimu agar terlindung dari gangguan, griefer, ataupun maling dengan kontrol penuh hak akses wilayah.", icon: Shield, color: "text-accent" },
                    { title: "Sistem Keuangan", desc: "Simpan, kelola, dan investasikan dana servermu secara mandiri melalui bank server teraman untuk mengamankan aset pribadi.", icon: Wallet, color: "text-warning" },
                    { title: "Survival Hardcore", desc: "Tantang batasan kemampuan bertahan hidupmu di dunia survival yang tangguh dan monster-monster yang lebih agresif.", icon: Flame, color: "text-danger" },
                    { title: "Bansos Harian", desc: "Klaim bantuan sosial (bansos) harian berupa perlengkapan dasar gratis untuk membantumu berkembang lebih cepat.", icon: Gift, color: "text-success" },
                    { title: "Gacha Gratis", desc: "Gunakan kupon gacha yang diperoleh dari aktivitas game untuk memenangkan item langka dan koin bonus tanpa bayar.", icon: Sparkles, color: "text-purple-400" }
                  ].map((feat, idx) => {
                    const IconComp = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="glass rounded-[24px] p-6 flex flex-col justify-between hover:border-white/15 hover:bg-card/40 transition-all duration-300 subtle-glow group"
                      >
                        <div>
                          <div className={`p-3 rounded-xl bg-white/5 w-fit ${feat.color} group-hover:scale-110 transition-all duration-300`}>
                            <IconComp className="w-5.5 h-5.5" />
                          </div>
                          <h3 className="font-heading font-extrabold text-base text-white mt-5 mb-2.5">
                            {feat.title}
                          </h3>
                          <p className="text-text-muted text-xs leading-relaxed font-medium">
                            {feat.desc}
                          </p>
                        </div>
                        <div className="w-8 h-1 bg-gradient-to-r from-transparent to-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300 rounded-full mt-5" />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* RULES SECTION */}
            {activeSection === "rules" && (
              <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-primary text-xs font-bold font-mono tracking-widest uppercase block mb-2">ATURAN SEVER</span>
                  <h2 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight text-white">
                    Regulasi &amp; Ketertiban Komunitas
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2 space-y-4">
                    {[
                      "Dilarang promosi server lain di dalam chat maupun discord server.",
                      "Dilarang melakukan spamming teks atau penyalahgunaan fitur pesan.",
                      "Dilarang membuat rusuh, melakukan griefing, atau mengganggu ketenangan pemain lain.",
                      "Dilarang keras menyinggung, melecehkan, atau menghina agama apa pun.",
                      "Dilarang menghina, melecehkan, atau membawa unsur orang tua dalam perselisihan.",
                      "Tetap saling menghormati dan menjaga etika berkomunikasi antar anggota.",
                      "Tidak boleh bermusuhan, memicu drama negatif, atau merusak keharmonisan server."
                    ].map((rule, idx) => (
                      <div
                        key={idx}
                        className="glass rounded-2xl p-4.5 flex items-start space-x-3.5 hover:bg-card/25 transition-all duration-200"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center font-mono font-bold text-primary text-xs shrink-0 pt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-text-muted text-xs md:text-sm font-semibold leading-relaxed pt-0.5">
                          {rule}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="glass rounded-[24px] p-6 border border-danger/30 subtle-glow-lg flex flex-col justify-between bg-danger/5">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-danger/10 border border-danger/25 flex items-center justify-center text-danger mb-5">
                        <ShieldAlert className="w-5.5 h-5.5" />
                      </div>
                      <h3 className="font-heading font-extrabold text-base text-white mb-3">
                        Peringatan Keras Pelanggaran!
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed mb-6 font-medium">
                        Setiap bentuk pelanggaran yang sengaja dilakukan demi merusak ketertiban server KAWAN SMP akan segera diproses oleh jajaran admin secara tegas. Sanksi yang diberikan akan disesuaikan secara adil berdasarkan tingkat kesalahan, mulai dari peringatan keras, mute, hingga pemblokiran permanen dari server.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <span className="text-[8.5px] font-bold font-mono tracking-wider text-danger uppercase">
                        ● KEBIJAKAN ADMINISTRASI KAWAN SMP
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* TIM SECTION */}
            {activeSection === "tim" && (
              <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-primary text-xs font-bold font-mono tracking-widest uppercase block mb-2">TIM ADMINISTRASI</span>
                  <h2 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight text-white">
                    Pengelola &amp; Staff Server
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {[
                    { name: "ARMUFA (Arya)", role: "Founder", desc: "Pemilik Utama KAWAN SMP", code: "A", col: "border-t-primary", bg: "bg-primary/10", tagBg: "bg-primary/15", tagText: "text-primary", detailsGrad: "from-primary to-secondary" },
                    { name: "Ken (Keiiru5543)", role: "Ketua Admin", desc: "Kepala Manajemen Server", code: "K", col: "border-t-secondary", bg: "bg-secondary/10", tagBg: "bg-secondary/15", tagText: "text-secondary", detailsGrad: "from-secondary to-accent" },
                    { name: "KYy", role: "Ketua Admin", desc: "Kepala Pengawas Moderator", code: "Y", col: "border-t-secondary", bg: "bg-secondary/10", tagBg: "bg-secondary/15", tagText: "text-secondary", detailsGrad: "from-indigo-500 to-secondary" },
                    { name: "AZAZEL5347", role: "Ketua Admin", desc: "KANAZUKI - Sistem Kontrol", code: "Z", col: "border-t-secondary", bg: "bg-secondary/10", tagBg: "bg-secondary/15", tagText: "text-secondary", detailsGrad: "from-pink-500 to-secondary" }
                  ].map((staff, idx) => (
                    <div
                      key={idx}
                      className={`glass rounded-[24px] p-5 text-center border-t-2 ${staff.col} hover:scale-[1.02] transition-all duration-300`}
                    >
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden ${staff.bg} border border-white/5 flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className={`w-9 h-9 bg-gradient-to-br ${staff.detailsGrad} rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm`}>
                          {staff.code}
                        </div>
                      </div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full ${staff.tagBg} ${staff.tagText} text-[9px] font-bold uppercase tracking-wider mb-2`}>
                        {staff.role}
                      </span>
                      <h3 className="font-heading font-bold text-xs md:text-sm text-white truncate">{staff.name}</h3>
                      <p className="text-[9px] text-text-muted font-mono mt-0.5">{staff.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="glass rounded-[24px] p-6 text-center max-w-2xl mx-auto border border-dashed border-white/10">
                  <Info className="w-5.5 h-5.5 text-text-muted mx-auto mb-2.5" />
                  <h4 className="font-heading font-bold text-xs text-white mb-1">Informasi Staff Lainnya</h4>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    Struktur tim dan daftar staff pembantu sedang dalam proses tinjauan ulang. Detail admin server akan diperbarui dalam waktu dekat secara bertahap demi efisiensi layanan.
                  </p>
                </div>
              </section>
            )}

            {/* DOWNLOAD SECTION */}
            {activeSection === "download" && (
              <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-primary text-xs font-bold font-mono tracking-widest uppercase block mb-2">DOWNLOAD MINECRAFT</span>
                  <h2 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight text-white">
                    Unduh Aplikasi Klien Minecraft
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="glass rounded-[24px] p-6 md:p-8 flex flex-col justify-between border border-white/10 hover:border-primary/30 transition-all duration-300">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-5">
                        <Laptop className="w-5.5 h-5.5" />
                      </div>
                      <h3 className="font-heading font-extrabold text-lg text-white mb-2.5">
                        Minecraft Java Edition
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed mb-6 font-medium">
                        Versi orisinal Minecraft untuk sistem komputer (Windows, MacOS, Linux). Ideal untuk petualangan RPG maksimal dengan kompatibilitas shader yang optimal.
                      </p>
                    </div>
                    <a
                      href="https://www.minecraft.net/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-wide flex items-center justify-center space-x-1.5 transition-all border border-white/10 text-center"
                    >
                      <span>Download Minecraft Java</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="glass rounded-[24px] p-6 md:p-8 flex flex-col justify-between border border-white/10 hover:border-secondary/30 transition-all duration-300">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary mb-5">
                        <Smartphone className="w-5.5 h-5.5" />
                      </div>
                      <h3 className="font-heading font-extrabold text-lg text-white mb-2.5">
                        Minecraft Bedrock / PE
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed mb-6 font-medium">
                        Versi portabel Minecraft untuk perangkat smartphone (Android, iOS) dan konsol modern. Mainkan game seru ini dari mana saja dan kapan saja secara praktis.
                      </p>
                    </div>
                    <a
                      href="https://www.minecraft.net/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-wide flex items-center justify-center space-x-1.5 transition-all border border-white/10 text-center"
                    >
                      <span>Download Minecraft Bedrock</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Toast Notification for copied status */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-2xl bg-surface border border-success/30 shadow-2xl flex items-center space-x-3 w-[90%] max-w-sm glass"
          >
            <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center text-success shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs text-white">Berhasil Disalin!</h4>
              <p className="text-[10px] text-text-muted">IP supernova.armufa.my.id berhasil disalin.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL FOOTER */}
      <footer className="border-t border-white/5 bg-bg-main relative z-20 py-12 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Left Column: Branding */}
            <div className="space-y-3.5">
              <div className="flex items-center space-x-2.5">
                <img 
                  src={logoUrl} 
                  alt="KAWAN SMP Footer Logo" 
                  className="w-10 h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="font-heading font-extrabold text-base text-white">
                  KAWAN SMP
                </span>
              </div>
              <p className="text-text-muted text-xs leading-relaxed max-w-sm font-medium">
                &quot;Bangun, Bertahan, Berkembang Bersama.&quot;
              </p>
              <p className="text-[9px] text-text-muted font-mono pt-1">
                © 2026 KAWAN SMP. Hak Cipta Dilindungi.
              </p>
            </div>

            {/* Middle Column: Quick Links */}
            <div>
              <h4 className="font-heading font-extrabold text-xs text-white mb-3.5 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => navigateToSection(item.id)} 
                      className="text-text-muted hover:text-primary transition-colors font-semibold cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Developer Info */}
            <div className="space-y-3">
              <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">Developer</h4>
              <div className="space-y-2 text-xs text-text-muted">
                <div className="font-bold text-white text-[11px]">{devConfig.name}</div>
                <div>
                  <a 
                    href={devConfig.website.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-colors flex items-center space-x-1 font-medium"
                  >
                    <span>Portfolio Website</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <div>
                  <a 
                    href={getWhatsAppLink(devConfig.contact.whatsapp)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-success transition-colors flex items-center space-x-1 font-medium"
                  >
                    <span>Hubungi WhatsApp</span>
                    <Phone className="w-2.5 h-2.5 text-success" />
                  </a>
                </div>
                <div>
                  <a 
                    href={devConfig.website.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-colors flex items-center space-x-1 font-medium"
                  >
                    <span>Website Server Lain</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Far Right Column: Community developer info */}
            <div className="space-y-3">
              <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">Komunitas Developer</h4>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="font-bold text-white text-[11px] truncate">{devConfig.community.name}</div>
                  <div className="flex flex-col space-y-1.5 pt-0.5">
                    <a 
                      href={devConfig.community.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-primary transition-all flex items-center space-x-1.5 text-text-muted font-semibold text-[11px]"
                    >
                      <Globe className="w-3 h-3 text-secondary" />
                      <span>Website Komunitas</span>
                    </a>
                    <a 
                      href={devConfig.community.discord} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-indigo-400 transition-all flex items-center space-x-1.5 text-text-muted font-semibold text-[11px]"
                    >
                      <MessageSquare className="w-3 h-3 text-indigo-400" />
                      <span>Discord Komunitas</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
