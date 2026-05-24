import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import chadImg from './assets/chad.jpg';
import codenomiconImg from './assets/Codenomicon.jpg';
// --- DECOMMENTEZ CI-DESSOUS POUR AJOUTER VOS PHOTOS ---
// import leoImg from './assets/leo.jpg';
import killianImg from './assets/pdp .jpg';
// import louisImg from './assets/louis.jpg';
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  Globe, 
  Heart, 
  ChevronRight,
  ChevronDown,
  Fingerprint,
  Menu,
  X,
  BookOpen,
  Mail,
  HelpCircle,
  Zap,
  Award,
  Users,
  Code,
  Send,
  Calendar,
  Clock,
  Server,
  Terminal as TerminalIcon,
  Volume2,
  VolumeX,
  Search,
  Database
} from 'lucide-react';
import './App.css';

// --- Scroll To Top ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Progress Context ---
const ProgressContext = createContext<any>(null);

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [visitedPages, setVisitedPages] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(true);

  const addPage = (path: string) => {
    if (!visitedPages.includes(path)) {
      setVisitedPages(prev => [...prev, path]);
    }
  };

  const addBadge = (badge: string) => {
    if (!badges.includes(badge)) {
      setBadges(prev => [...prev, badge]);
    }
  };

  return (
    <ProgressContext.Provider value={{ visitedPages, addPage, badges, addBadge, isMuted, setIsMuted }}>
      {children}
    </ProgressContext.Provider>
  );
};

// --- Custom Cursor ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div 
      className="custom-cursor"
      animate={{ x: position.x - 10, y: position.y - 10 }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="cursor-drop" />
    </motion.div>
  );
};

// --- Hacker Terminal ---
const HackerTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setOutput] = useState<string[]>(['SSH Connection established...', 'Type "help" for available commands.']);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: any = {
    help: () => [
      'Commandes disponibles :', 
      '  scan    - Chercher le défaut de sécurité', 
      '  exploit - Lancer la récupération de données', 
      '  patch   - Réparer le serveur', 
      '  clear   - Effacer l\'écran'
    ],
    scan: () => [
      'Vérification du serveur en cours...', 
      'OpenSSL 1.0.1f trouvé (= le verrou de sécurité du serveur est une vieille version)', 
      'Extension Heartbeat : ACTIVÉE (= la porte est ouverte)', 
      '[!] FAILLE DÉTECTÉE : Le serveur est vulnérable !'
    ],
    exploit: () => [
      'Envoi d\'un paquet "Battement de Cœur" piégé...',
      'Message envoyé : "PING" (Taille annoncée : 65535 caractères au lieu de 4)',
      'Réception du contenu de la mémoire (64KB)...',
      '-----------------------------------',
      'ADMIN_MDP : admin:P@ssw0rd123 (= Mot de passe trouvé !)',
      'SESSION_ID : 92a83f10c2... (= Code de connexion d\'un utilisateur)',
      'CLÉ_PRIVÉE : -----BEGIN RSA PRIVATE KEY----- (= Le code secret du serveur !)',
      '-----------------------------------',
      '[SUCCESS] La mémoire a "bavé" ses secrets avec succès.'
    ],
    patch: () => [
      'Application de la mise à jour de sécurité...', 
      'Téléchargement d\'OpenSSL 1.0.1g (= le nouveau verrou solide)...', 
      'Redémarrage des services...', 
      '[OK] Serveur réparé : La faille est refermée.'
    ],
    clear: () => []
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (cmd === 'clear') {
      setOutput([]);
    } else if (commands[cmd]) {
      setOutput([...history, `> ${input}`, ...commands[cmd]()]);
    } else if (cmd) {
      setOutput([...history, `> ${input}`, `Command not found: ${cmd}`]);
    }
    setInput('');
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-window" onClick={handleTerminalClick}>
      <div className="terminal-header">
        <div className="terminal-dots"><div className="dot red"/><div className="dot yellow"/><div className="dot green"/></div>
        <span>root@exploit-machine:~</span>
      </div>
      <div className="terminal-body">
        {history.map((line, i) => (
          <div key={i} className="terminal-line">{line}</div>
        ))}
        <form onSubmit={handleCommand} className="terminal-input-line">
          <span className="terminal-prompt">&gt;</span>
          <input 
            ref={inputRef}
            type="text" 
            autoFocus 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

// --- World Map SVG ---
const WorldMap = () => {
  const points = [
    { x: '20%', y: '30%' }, { x: '70%', y: '25%' }, { x: '80%', y: '50%' },
    { x: '30%', y: '60%' }, { x: '60%', y: '80%' }, { x: '40%', y: '20%' },
    { x: '15%', y: '45%' }, { x: '85%', y: '35%' }, { x: '50%', y: '50%' }
  ];

  return (
    <div className="world-map-container">
      <div className="sphere-wrapper">
        <div className="sphere">
          <div className="sphere-grid" />
          <div className="sphere-dots">
            {points.map((p, i) => (
              <motion.div
                key={i}
                className="sphere-dot"
                style={{
                  position: 'absolute',
                  left: p.x,
                  top: p.y,
                  width: '8px',
                  height: '8px',
                  background: '#ff4d4d',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #ff4d4d'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="map-overlay-text">Visualisation des serveurs vulnérables en 2014</div>
    </div>
  );
};

// --- Glossary Component ---
const Glossary = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const terms = [
    { 
      t: "SSL / TLS", 
      d: "Le garde du corps de vos données. C'est le protocole qui crée une connexion sécurisée. Imaginez un tunnel privé et blindé entre vous et le site web." 
    },
    { 
      t: "Mémoire RAM", 
      d: "La 'table de travail' du serveur. C'est là qu'il pose temporairement vos mots de passe et vos messages pour les traiter. C'est cette table que Heartbleed permet de fouiller." 
    },
    { 
      t: "Buffer Over-read", 
      d: "Le 'débordement de mémoire'. C'est quand on demande au serveur de nous lire plus de choses qu'il ne devrait, le forçant à nous montrer ses secrets voisins." 
    },
    { 
      t: "CVE", 
      d: "La plaque d'immatriculation d'une faille. Chaque vulnérabilité importante a son propre numéro pour que les experts du monde entier parlent de la même chose." 
    },
    { 
      t: "Open Source", 
      d: "Un logiciel dont la recette (le code) est publique. Tout le monde peut l'examiner, l'améliorer ou... y trouver des erreurs oubliées." 
    },
    { 
      t: "Clé Privée", 
      d: "La clé unique qui permet de déverrouiller vos messages chiffrés. Si un pirate la vole, il peut lire tout ce que vous envoyez au serveur, sans laisser de trace." 
    }
  ];

  return (
    <PageTransition>
      <div className="content-page">
        <h2 className="section-title">Glossaire Cyber</h2>
        <div className="glossary-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '3rem auto' }}>
          {terms.map((term, i) => (
            <div 
              key={i} 
              className={`glossary-dropdown-card ${expandedIndex === i ? 'expanded' : ''}`}
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            >
              <div className="glossary-header">
                <h4>{term.t}</h4>
                <ChevronDown className="chevron" size={20} />
              </div>
              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="glossary-content">
                      {term.d}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <NavigationFooter prevPath="/autres-failles" nextPath="/quizz" nextLabel="Vers le Quizz" />
      </div>
    </PageTransition>
  );
};

// --- Other Flaws Component ---
const OtherFlaws = () => {
  const flaws = [
    { 
      name: "Log4Shell", 
      year: "2021", 
      impact: "Critique", 
      desc: "C'est comme si le carnet de notes de tous les secrétaires du monde devenait soudainement un passage secret pour les voleurs. Cette faille a permis de pirater des serveurs gouvernementaux et des entreprises de jeux vidéo en quelques secondes." 
    },
    { 
      name: "Shellshock", 
      year: "2014", 
      impact: "Élevé", 
      desc: "Imaginez que le simple fait de dire bonjour à un garde lui fasse faire tout ce que vous voulez, même ouvrir le coffre-fort. Elle a exposé des millions d'ordinateurs Mac et Linux à des prises de contrôle à distance." 
    },
    { 
      name: "EternalBlue", 
      year: "2017", 
      impact: "Massif", 
      desc: "C'est une 'clé universelle' volée aux services secrets américains qui ouvre toutes les portes Windows du monde. Elle a été utilisée pour paralyser des hôpitaux entiers et bloquer des usines de voitures." 
    }
  ];

  return (
    <PageTransition>
      <div className="content-page">
        <h2 className="section-title">D'autres failles historiques</h2>
        <div className="flaws-grid">
          {flaws.map((f, i) => (
            <div key={i} className="flaw-card">
              <span className="flaw-year">{f.year}</span>
              <h3>{f.name}</h3>
              <p>{f.desc}</p>
              <div className="flaw-badge">{f.impact}</div>
            </div>
          ))}
        </div>
        <NavigationFooter prevPath="/impact" nextPath="/glossaire" nextLabel="Voir le Glossaire" />
      </div>
    </PageTransition>
  );
};

// --- Splash Screen ---
const SplashScreen = ({ finish }: { finish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(finish, 3500);
    return () => clearTimeout(timer);
  }, [finish]);

  return (
    <motion.div 
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="splash-content">
        <div className="hero-heart-container">
          <Heart size={100} className="bleeding-heart" />
          <motion.div 
            className="hero-drip" 
            animate={{ height: [0, 60], opacity: [1, 0], y: [0, 100] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Heartbleed
        </motion.h1>
        <motion.div 
          className="splash-loader"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 3 }}
        />
      </div>
    </motion.div>
  );
};

// --- Animated Counter ---
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const step = end / 100;

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, totalMiliseconds / 100);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// --- Simplified Interactive Demo ---
const HeartbeatAnalogy = () => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<string[]>([]);
  
  const normalRequest = () => {
    setData([]);
    setStatus('sending');
    setTimeout(() => {
      setStatus('receiving');
      setData(['"Bonjour"']);
      setTimeout(() => setStatus('idle'), 2000);
    }, 1000);
  };

  const maliciousRequest = () => {
    setData([]);
    setStatus('sending-malicious');
    setTimeout(() => {
      setStatus('receiving-leak');
      setData([
        '"Bonjour"', 
        'MOT DE PASSE: 1234', 
        'COOKIE DE SESSION', 
        'CLE PRIVEE DU SERVEUR'
      ]);
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <div className="heartbeat-container">
      <h3>Le Test du Battement de Cœur</h3>
      <p>
        Normalement, le serveur ne renvoie que ce qu'on lui a envoyé. Mais avec <strong>Heartbleed</strong>, 
        on peut le forcer à "baver" le contenu secret de sa mémoire RAM.
      </p>
      <div className="demo-controls">
        <button onClick={normalRequest} disabled={status !== 'idle'}>
          <Zap size={18} /> Demande Normale
        </button>
        <button onClick={maliciousRequest} disabled={status !== 'idle'} className="btn-malicious">
          <AlertTriangle size={18} /> Attaque Heartbleed
        </button>
      </div>
      <div className="demo-visual-wrapper">
        <div className="demo-nodes">
          <div className={`node client ${status.includes('sending') ? 'active' : ''}`}>
            <div className="node-label">VOUS</div>
          </div>
          <div className="connection-line">
            {status.includes('sending') && <motion.div initial={{ left: 0 }} animate={{ left: '100%' }} className="pulse" />}
            {status.includes('receiving') && <motion.div initial={{ right: 0 }} animate={{ right: '100%' }} className="pulse-return" />}
          </div>
          <div className={`node server ${status.includes('receiving') ? 'active' : ''}`}>
            <div className="node-label">SERVEUR</div>
          </div>
        </div>
        
        <div className="memory-display">
          <div className="memory-container">
            <div className="memory-header">
              <Activity size={14} /> MÉMOIRE RAM DU SERVEUR
            </div>
            <div className="ram-visual">
              {data.length > 0 ? (
                data.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className={`memory-block ${i > 0 ? 'leaked-data' : 'safe-data'}`}
                  >
                    <span className="addr">0x{ (i * 16).toString(16).padStart(2, '0') }</span>
                    <span className="val">{item}</span>
                  </motion.div>
                ))
              ) : (
                <div className="memory-placeholder">
                  {status === 'idle' ? "En attente de commande..." : "Le serveur traite votre demande..."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="demo-info">
        {status === 'sending-malicious' && <p className="warning">Tentative d'exploitation : Demande de 64 000 lettres...</p>}
        {status === 'receiving-leak' && <p className="danger">ALERTE : Le serveur vide sa mémoire privée !</p>}
      </div>
    </div>
  );
};

// --- Navigation Footer Component ---
const NavigationFooter = ({ prevPath, nextPath, nextLabel }: { prevPath?: string, nextPath?: string, nextLabel?: string }) => (
  <div className="navigation-footer">
    {prevPath ? (
      <Link to={prevPath} className="nav-btn-back">
        <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Retour
      </Link>
    ) : <div />}
    {nextPath && (
      <Link to={nextPath} className="nav-btn-next">
        {nextLabel || "Continuer"} <ChevronRight size={20} />
      </Link>
    )}
  </div>
);

// --- Page Components ---
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const { addPage } = useContext(ProgressContext);
  const location = useLocation();

  useEffect(() => {
    addPage(location.pathname);
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => (
  <PageTransition>
    <header className="hero">
      <div className="hero-content">
        <div className="hero-heart-wrapper">
          <div className="hero-heart-container">
            <Heart size={120} className="bleeding-heart" />
            <div className="hero-drip" />
          </div>
        </div>
        <h1>Heartbleed</h1>
        <p className="subtitle">2014 : Le jour où la confiance a volé en éclats.</p>
        <p className="intro-text">
          Et si le petit cadenas vert de votre navigateur n'était qu'une illusion ? 
          Découvrez comment une simple erreur de code a mis à nu la vie privée de millions de personnes et fait vaciller les fondations d'Internet.
        </p>
        <div className="hero-cta-wrapper">
          <Link to="/comprendre" className="cta-investigate">
            <span className="cta-text">Commencez l'enquête</span>
            <div className="cta-icon-box">
              <ChevronRight size={24} />
            </div>
            <div className="cta-glare" />
          </Link>
        </div>
      </div>
    </header>
  </PageTransition>
);

const Context = () => (
  <PageTransition>
    <div className="content-page">
      <h2 className="section-title">1. OpenSSL : L'Armure Invisible</h2>
      <div className="analogy-card">
        <div className="analogy-icon-container">
          <ShieldCheck size={32} />
        </div>
        <div className="analogy-content">
          <h3>L'Analogie de l'Enveloppe Blindée</h3>
          <p>
            Imaginez que vous envoyiez un secret par courrier. Sans OpenSSL, c'est une <strong>carte postale</strong> lisible par tous. 
            Avec OpenSSL, votre message est glissé dans une <strong>enveloppe blindée</strong> qui se verrouille toute seule et que seul votre destinataire peut ouvrir. 
            C'est ce qui permet de payer en ligne ou d'envoyer un message privé sans crainte.
          </p>
        </div>
      </div>
      <p className="page-intro">
        OpenSSL est le gardien discret du web. C'est ce logiciel qui crée le fameux <strong>"HTTPS"</strong> et le petit cadenas vert. 
        Il s'assure que vos mots de passe ne voyagent pas "en clair" sur les réseaux, mais sous forme de codes indéchiffrables (le <strong>chiffrement</strong>).
      </p>
      <div className="stats-grid">
        <div className="stat-card"><h3>99%</h3><p>De votre sécurité repose sur lui</p></div>
        <div className="stat-card"><h3>2/3</h3><p>Du web mondial l'utilisait en 2014</p></div>
      </div>
      <NavigationFooter prevPath="/" nextPath="/la-faille" nextLabel="Découvrir la faille" />
    </div>
  </PageTransition>
);

const TheFlaw = () => (
  <PageTransition>
    <div className="content-page">
      <h2 className="section-title">2. Le Bug "Heartbeat" : Le Cri d'Alarme</h2>
      
      <p className="page-intro">
        En 2012, une nouvelle fonction appelée <strong>"Heartbeat"</strong> (Battement de Cœur) voit le jour. 
        C'est un simple signal pour vérifier que la connexion n'est pas "morte". Un peu comme si vous criiez 
        <em>"Tu es là ?"</em> à travers une porte fermée, et que le serveur devait vous répondre 
        <em>"Oui, je suis là !"</em> pour prouver qu'il est toujours réveillé.
      </p>

      <div className="bug-layout">
        <div className="bug-explanation">
          <div className="analogy-card danger-border">
            <div className="analogy-icon-container">
              <AlertTriangle size={32} color="#ff4d4d" />
            </div>
            <div className="analogy-content">
              <h3>La Porte Entrouverte sur votre Vie</h3>
              <p>
                Le bug, c'est comme demander au serveur : <em>"Crie-moi le mot 'CHAT' (4 lettres)"</em>, mais lui mentir en disant qu'il en fait 60 000. 
                Le serveur, trop docile, va vous crier <em>"CHAT"</em>... puis continuer à vous hurler <strong>tout ce qu'il a sous la main dans sa mémoire</strong> 
                (vos mots de passe, vos messages privés, vos coordonnées bancaires) jusqu'à atteindre les 60 000 lettres. 
                C'est votre vie privée qui s'échappe par une simple erreur de lecture.
              </p>
            </div>
          </div>
        </div>

        <HeartbeatAnalogy />
      </div>

      <NavigationFooter prevPath="/comprendre" nextPath="/hacker-mode" nextLabel="Passer en mode Hacker" />
    </div>
  </PageTransition>
);

const HackerPage = () => (
  <PageTransition>
    <div className="content-page">
      <h2 className="section-title">Le Lab du Hackeur</h2>
      <p className="page-intro">
        N'ayez pas peur, vous ne risquez rien ! Prenez les commandes de ce simulateur pour voir 
        par vous-même comment un pirate informatique s'y prend. C'est simple comme bonjour : 
        il suffit de savoir quoi demander au serveur.
      </p>
      <HackerTerminal />
      <NavigationFooter prevPath="/la-faille" nextPath="/timeline" nextLabel="Voir la chronologie" />
    </div>
  </PageTransition>
);

const Timeline = () => {
  const events = [
    { date: "2012", title: "Le péché originel", desc: "Un développeur soumet une mise à jour mineure. Une simple erreur de frappe qui va rester cachée pendant 2 ans.", icon: Code },
    { date: "Mars 2014", title: "Le calme avant la tempête", desc: "La faille est présente sur des millions de serveurs. Personne ne se doute que les portes sont grandes ouvertes.", icon: Clock },
    { date: "7 Avril 2014", title: "L'Alerte Rouge", desc: "La faille CVE-2014-0160 est révélée. Le monde découvre le nom 'Heartbleed' et son logo sanglant.", icon: AlertTriangle },
    { date: "9 Avril 2014", title: "La Course Contre la Montre", desc: "Les ingénieurs du monde entier travaillent jour et nuit. 2/3 des sites sont patchés en 48 heures.", icon: ShieldCheck },
    { date: "Mai 2014", title: "L'Heure des Comptes", desc: "Le coût du nettoyage est estimé à 500 millions de dollars. La confiance en l'Internet est brisée.", icon: Globe },
    { date: "2015", title: "L'Héritage", desc: "Le monde comprend enfin que l'Open Source a besoin de financement pour protéger notre futur numérique.", icon: Award },
  ];

  return (
    <PageTransition>
      <div className="content-page">
        <h2 className="section-title">L'Histoire de Heartbleed</h2>
        <div className="timeline-container">
          <div className="timeline-line" />
          {events.map((ev, i) => (
            <motion.div 
              key={i}
              className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="timeline-dot"><ev.icon size={16} /></div>
              <div className="timeline-card">
                <span className="timeline-date">{ev.date}</span>
                <h4>{ev.title}</h4>
                <p>{ev.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <NavigationFooter prevPath="/hacker-mode" nextPath="/impact" nextLabel="Voir l'impact mondial" />
      </div>
    </PageTransition>
  );
};

const Impact = () => (
  <PageTransition>
    <div className="content-page">
      <h2 className="section-title">3. Un Choc Planétaire</h2>
      
      <p className="page-intro">
        Imaginez que du jour au lendemain, 17% des clés de toutes les maisons du monde soient distribuées gratuitement. 
        En 2014, c'est exactement ce qui s'est passé pour les serveurs du web mondial.
      </p>

      <div className="impact-stats-grid">
        <div className="impact-stat-card">
          <Globe size={40} color="#ff4d4d" />
          <h3><AnimatedCounter value={17} suffix="%" /></h3>
          <p>Du web mondial à nu</p>
        </div>
        <div className="impact-stat-card">
          <Server size={40} color="#ff4d4d" />
          <h3><AnimatedCounter value={500000} /></h3>
          <p>Serveurs vulnérables</p>
        </div>
        <div className="impact-stat-card">
          <Calendar size={40} color="#ff4d4d" />
          <h3><AnimatedCounter value={2} suffix=" ans" /></h3>
          <p>De vulnérabilité totale</p>
        </div>
      </div>

      <WorldMap />

      <div className="impact-list">
        <div className="impact-item">
          <ShieldCheck size={32} />
          <div>
            <h3>La Fin de l'Anonymat</h3>
            <p>
              Les pirates n'avaient plus besoin de forcer votre porte. Ils avaient vos <strong>Clés Privées</strong>. 
              Ils pouvaient lire vos emails, vos données bancaires et vos mots de passe comme s'ils étaient à votre place.
            </p>
          </div>
        </div>
      </div>
      <div className="branding-section">
        <h3>Le "Branding" d'un Désastre</h3>
        <p>
          Pour alerter une population qui n'y comprenait rien, les chercheurs ont créé un nom ("Heartbleed") et un logo sanglant. 
          C'était la première fois qu'un bug devenait une véritable "star" médiatique pour forcer le monde à agir vite.
        </p>
        <div className="logo-mockup">Heartbleed</div>
      </div>
      <NavigationFooter prevPath="/timeline" nextPath="/autres-failles" nextLabel="Autres failles" />
    </div>
  </PageTransition>
);

const Conclusion = () => (
  <PageTransition>
    <div className="content-page">
      <h2 className="section-title">4. Pourquoi cela vous concerne-t-il ?</h2>
      <p className="page-intro">
        Heartbleed a été un électrochoc. Il a révélé que la sécurité de tout Internet reposait sur le travail bénévole de quelques passionnés, 
        sans aucun financement des géants de la tech qui l'utilisaient pourtant chaque jour.
      </p>
      <div className="analogy-card success-border">
        <div className="analogy-icon-container">
          <HelpCircle size={32} color="#4ade80" />
        </div>
        <div className="analogy-content">
          <h3>Ce qui a changé pour vous</h3>
          <p>
            Depuis 2014, les fondations du web sont enfin surveillées. Les entreprises ont compris que si les "tuyaux" de l'Internet cassent, 
            c'est toute notre vie numérique (banque, santé, amis) qui s'écroule. 
            C'est grâce à cette leçon que vous pouvez aujourd'hui surfer avec plus de sérénité.
          </p>
        </div>
      </div>
      <blockquote>
        "Internet n'est pas une forteresse imprenable. C'est un écosystème fragile que nous apprenons enfin à protéger ensemble."
      </blockquote>
      <NavigationFooter prevPath="/glossaire" nextPath="/quizz" nextLabel="Tester vos connaissances" />
    </div>
  </PageTransition>
);

// --- Quiz Data ---
const QUIZ_QUESTIONS = [
  {
    question: "Qu'est-ce que OpenSSL ?",
    options: ["Un virus informatique", "Un logiciel de chiffrement sécurisé", "Un navigateur web", "Une banque en ligne"],
    correct: 1,
    explanation: "OpenSSL est une bibliothèque de logiciels qui sécurise les communications sur Internet en chiffrant les données entre votre ordinateur et le serveur."
  },
  {
    question: "Pourquoi la faille s'appelle-t-elle 'Heartbleed' ?",
    options: ["C'est un virus qui attaque le cœur de l'ordinateur", "C'est une fuite de données dans l'extension 'Heartbeat'", "Le logo était joli", "Elle a été découverte le jour de la St Valentin"],
    correct: 1,
    explanation: "La faille se trouvait dans l'extension 'Heartbeat' (Battement de cœur). Comme elle permettait de vider la mémoire du serveur, on a dit que le cœur saignait (Bleed)."
  },
  {
    question: "Quelle donnée sensible Heartbleed permettait-il de voler ?",
    options: ["L'historique YouTube", "La RAM du serveur (clés privées, mots de passe)", "La couleur de votre écran", "La vitesse de votre ventilateur"],
    correct: 1,
    explanation: "Heartbleed permettait de lire la mémoire vive (RAM) du serveur, là où transitent les mots de passe, les cookies de session et surtout les clés secrètes du serveur."
  },
  {
    question: "En quelle année Heartbleed a-t-il été rendu public ?",
    options: ["1998", "2010", "2014", "2020"],
    correct: 2,
    explanation: "La faille a été découverte et rendue publique en avril 2014, bien qu'elle existait dans le code depuis 2012."
  },
  {
    question: "Qui a accidentellement introduit le bug dans le code ?",
    options: ["Mark Zuckerberg", "Robin Seggelmann", "Linus Torvalds", "Steve Jobs"],
    correct: 1,
    explanation: "Robin Seggelmann, un développeur allemand, a soumis le code fin 2011. Il a déclaré que c'était une erreur innocente et non intentionnelle."
  },
  {
    question: "Quel pourcentage du web mondial a été touché par Heartbleed ?",
    options: ["1%", "5%", "17%", "50%"],
    correct: 2,
    explanation: "Environ 17% des sites web sécurisés (ceux utilisant HTTPS) étaient vulnérables, incluant les plus grands comme Google et Facebook."
  },
  {
    question: "Concrètement, comment le pirate réussit-il à voler des données avec cette faille ?",
    options: ["En cassant le mot de passe", "En forçant le serveur à lire ses propres secrets par erreur", "En installant un virus sur votre ordinateur", "En coupant l'électricité du serveur"],
    correct: 1,
    explanation: "C'est comme si vous demandiez à un garde de vous montrer une page d'un dossier secret, mais qu'il oubliait de refermer le dossier et vous laissait lire les 100 pages suivantes remplies de secrets."
  },
  {
    question: "Combien de dons OpenSSL recevait-il par an avant la faille ?",
    options: ["2 000 €", "100 000 €", "1 million €", "Rien du tout"],
    correct: 0,
    explanation: "C'est absurde : alors qu'un seul développeur gagne environ 60 000 € par an, ce projet vital pour la sécurité mondiale ne recevait que 2 000 €. C'est moins que le budget café d'une petite entreprise, pour protéger tout l'Internet !"
  }
];

const Quiz = () => {
  const { addBadge } = useContext(ProgressContext);
  const [questions] = useState(() => {
    return [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Cheat Code : Taper "heartbleed()" dans la console
  useEffect(() => {
    (window as any).heartbleed = () => {
      console.log("%c Cheat Code Activé : Faille exploitée ! ", "background: #8b0000; color: #ff4d4d; font-weight: bold;");
      setScore(questions.length);
      setIsFinished(true);
      addBadge('🏆');
    };
    return () => {
      delete (window as any).heartbleed;
    };
  }, [questions.length, addBadge]);

  const handleAnswer = (index: number) => {
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      const nextScore = score + 1;
      setScore(nextScore);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsFinished(true);
        if (nextScore >= questions.length / 2) addBadge('🏆');
      }
    } else {
      setShowExplanation(true);
    }
  };

  const nextAfterExplanation = () => {
    setShowExplanation(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
      if (score >= questions.length / 2) addBadge('🏆');
    }
  };

  if (isFinished) {
    return (
      <PageTransition>
        <div className="quiz-container finished">
          <div className="finish-card">
            <Award size={80} color="#fbbf24" className="finish-icon" />
            <h2>Quizz Terminé !</h2>
            <p className="final-score">Votre score : <span>{score} / {questions.length}</span></p>
            <p className="finish-msg">{score === questions.length ? "Parfait ! Vous êtes un expert en cybersécurité." : "Pas mal ! Voici de quoi approfondir vos connaissances."}</p>
          </div>
          
          <div className="video-integration">
            <div className="video-header">
              <div className="video-badge">DOCUMENTAIRE</div>
              <h3>HEARTBLEED : La Faille qui a fait saigner Internet</h3>
            </div>
            <div className="video-embed-container">
              <iframe 
                src="https://www.youtube.com/embed/SKwEkMrG-8A" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            <p className="video-footer-text">Vidéo recommandée pour comprendre les enjeux géopolitiques et techniques de la faille.</p>
          </div>

          <div className="finish-actions">
            <Link to="/equipe" className="nav-btn-next">Voir l'équipe <ChevronRight size={20} /></Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="quiz-container">
        <AnimatePresence mode="wait">
          {!showExplanation ? (
            <motion.div 
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="quiz-card"
            >
              <div className="quiz-progress">Question {currentQuestion + 1} / {questions.length}</div>
              <h3>{questions[currentQuestion].question}</h3>
              <div className="quiz-options">
                {questions[currentQuestion].options.map((option, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="quiz-opt-btn">
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="explanation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="explanation-overlay"
            >
              <div className="explanation-card">
                <div className="expl-header">
                  <AlertTriangle size={32} color="#ff4d4d" />
                  <h3>Dommage !</h3>
                </div>
                <p className="expl-text">{questions[currentQuestion].explanation}</p>
                <button onClick={nextAfterExplanation} className="nav-btn-next">J'ai compris, suivant</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const members = [
    { 
      name: "Montourcy Leo", 
      role: "Conception & Design", 
      email: "leo.montourcy@example.com", 
      discord: "Discord: 16leo.", 
      task: "Identité visuelle et expérience utilisateur.",
      img: null // Utilisez 'leoImg' ici après avoir décommenté l'import en haut
    },
    { 
      name: "Gauchet Killian", 
      role: "Développement React", 
      email: "killian.gauchetpro@gmail.com", 
      discord: "Discord: soyeskiki", 
      portfolio: "http://madebykiki.duckdns.org:18000/",
      task: "Architecture de l'application et animations.",
      img: killianImg // Utilisez 'killianImg' ici après avoir décommenté l'import en haut
    },
    { 
      name: "Bochereau Louis", 
      role: "Recherche & Contenu", 
      email: "louis.bochereau@example.com", 
      discord: "Discord: brochettedeserpent", 
      task: "Rédaction des textes et création du quizz.",
      img: null // Utilisez 'louisImg' ici après avoir décommenté l'import en haut
    },
  ];

  return (
    <PageTransition>
      <div className="content-page">
        <h2 className="section-title">L'Équipe</h2>
        
        <div className="team-section">
          <h3>Les Découvreurs de la Faille</h3>
          <p className="page-intro">Ceux qui ont identifié et alerté le monde en avril 2014.</p>
          <div className="team-grid">
            <div className="team-card researcher">
              <div className="team-avatar">
                <img src={chadImg} alt="Neel Mehta" className="avatar-img" />
              </div>
              <h4>Neel Mehta</h4>
              <p className="team-role">Google Security</p>
              <p className="team-desc">L'ingénieur qui a découvert la faille indépendamment lors de tests de routine.</p>
            </div>
            <div className="team-card researcher">
              <div className="team-avatar">
                <img src={codenomiconImg} alt="Codenomicon" className="avatar-img" />
              </div>
              <h4>Codenomicon</h4>
              <p className="team-role">Équipe de Recherche</p>
              <p className="team-desc">L'équipe qui a inventé le nom "Heartbleed" et créé le logo pour alerter le public.</p>
            </div>
          </div>
        </div>

        <div className="team-section secondary-team">
          <h3>Notre Groupe</h3>
          <p className="page-intro">Les créateurs de ce documentaire interactif.</p>
          <div className="team-grid triple">
            {members.map((m, i) => (
              <div key={i} className="team-card member">
                <div className="team-avatar">
                  {m.img ? (
                    <img src={m.img} alt={m.name} className="avatar-img" />
                  ) : (
                    i === 0 ? <Fingerprint size={32} /> : i === 1 ? <Code size={32} /> : <Activity size={32} />
                  )}
                </div>
                <h4>{m.name}</h4>
                <p className="team-role">{m.role}</p>
                <button className="team-contact-btn" onClick={() => setSelectedMember(m)}>
                  <Mail size={16} /> Contacter
                </button>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedMember && (
            <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
              <motion.div 
                className="contact-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => setSelectedMember(null)}><X size={20} /></button>
                <div className="modal-header">
                  <div className="modal-avatar">
                    {selectedMember.img ? (
                      <img src={selectedMember.img} alt={selectedMember.name} className="avatar-img" />
                    ) : (
                      <Users size={32} color="#4ade80" />
                    )}
                  </div>
                  <div>
                    <h4>{selectedMember.name}</h4>
                    <p className="team-role">{selectedMember.role}</p>
                  </div>
                </div>
                <div className="modal-body">
                  <div className="info-row">
                    <Mail size={18} />
                    <span>{selectedMember.email}</span>
                  </div>
                  <div className="info-row">
                    <Activity size={18} />
                    <span>{selectedMember.discord}</span>
                  </div>
                  {selectedMember.portfolio && (
                    <div className="info-row">
                      <Globe size={18} />
                      <a href={selectedMember.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: '#ff4d4d', textDecoration: 'none' }}>
                        Portfolio personnel
                      </a>
                    </div>
                  )}
                  <div className="modal-task">
                    <strong>Mission :</strong>
                    <p>{selectedMember.task}</p>
                  </div>
                </div>
                <button className="cta-primary modal-cta" onClick={() => window.location.href = `mailto:${selectedMember.email}`}>
                  <Send size={18} /> Envoyer un message
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <NavigationFooter prevPath="/quizz" nextPath="/" nextLabel="Retour à l'accueil" />
      </div>
    </PageTransition>
  );
};

// --- Main App & Navigation ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { visitedPages, badges, isMuted, setIsMuted } = useContext(ProgressContext);

  const navGroups = [
    {
      label: 'Comprendre',
      links: [
        { path: '/', label: 'Home', icon: Globe },
        { path: '/comprendre', label: 'SSL', icon: BookOpen },
        { path: '/timeline', label: 'Timeline', icon: Calendar },
      ]
    },
    {
      label: "L'Attaque",
      links: [
        { path: '/la-faille', label: 'Bug', icon: Activity },
        { path: '/hacker-mode', label: 'Lab', icon: TerminalIcon },
        { path: '/impact', label: 'Impact Map', icon: AlertTriangle },
      ]
    },
    {
      label: 'Ressources',
      links: [
        { path: '/autres-failles', label: 'Autres Failles', icon: Database },
        { path: '/glossaire', label: 'Glossaire', icon: Search },
        { path: '/lecon', label: 'Leçon', icon: ShieldCheck },
        { path: '/quizz', label: 'Quizz', icon: Award },
        { path: '/equipe', label: "L'Équipe", icon: Users },
      ]
    }
  ];

  const allLinks = navGroups.flatMap(g => g.links);
  const progress = Math.min((visitedPages.length / 11) * 100, 100);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="nav-heart-container">
            <Heart size={18} color="#ff4d4d" className="nav-heart" />
            <div className="nav-drip" />
          </div>
          <span>Heartbleed</span>
        </Link>
        
        <div className="nav-links-desktop-compact">
          {navGroups.map((group, i) => (
            <div key={i} className="nav-dropdown">
              <div className="nav-dropdown-trigger">
                <span>{group.label}</span>
                <ChevronDown size={14} />
              </div>
              <div className="nav-dropdown-content">
                {group.links.map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    <link.icon size={16} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="nav-right-actions">
          <button className="sound-toggle-btn" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="#ff4d4d" />}
          </button>
          <div className="nav-badges-mini">
            {badges.map((b: string, i: number) => (
              <span key={i} className="badge-dot">{b}</span>
            ))}
          </div>
          <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      <div className="nav-progress-bar">
        <motion.div 
          className="nav-progress-fill" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }} 
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="nav-links-mobile"
          >
            {allLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                <link.icon size={16} /> {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Background Particles ---
const BackgroundParticles = () => {
  const [particles] = useState(() => [...Array(8)].map(() => ({
    x: Math.random() * 400 - 200,
    y: Math.random() * 400 - 200,
    duration: 15 + Math.random() * 15
  })));

  return (
    <div className="particles-container">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`particle p${i}`}
          animate={{
            x: [0, p.x, 0],
            y: [0, p.y, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/WebDoc-HeartBleed" element={<Home />} />
        <Route path="/comprendre" element={<Context />} />
        <Route path="/la-faille" element={<TheFlaw />} />
        <Route path="/hacker-mode" element={<HackerPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/autres-failles" element={<OtherFlaws />} />
        <Route path="/glossaire" element={<Glossary />} />
        <Route path="/lecon" element={<Conclusion />} />
        <Route path="/quizz" element={<Quiz />} />
        <Route path="/equipe" element={<Team />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialisation du son
  useEffect(() => {
    // Note: Utilisation d'un son procedurale ou lien externe pour la démo
    const audio = new Audio("https://actions.google.com/sounds/v1/human_voices/heartbeat.ogg");
    audio.loop = true;
    audioRef.current = audio;
  }, []);

  return (
    <ProgressProvider>
      <AppContent showSplash={showSplash} setShowSplash={setShowSplash} audioRef={audioRef} />
    </ProgressProvider>
  );
}

const AppContent = ({ showSplash, setShowSplash, audioRef }: any) => {
  const { isMuted } = useContext(ProgressContext);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log("Interaction utilisateur requise pour lancer le son");
        });
      }
    }
  }, [isMuted, audioRef]);

  return (
    <Router basename="/WebDoc-HeartBleed">
      <ScrollToTop />
      <CustomCursor />
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" finish={() => setShowSplash(false)} />}
      </AnimatePresence>
      <div className="app-wrapper">
        <BackgroundParticles />
        <div className="bg-grid" />
        <div className="bleed-gradient" />
        {!showSplash && <Navbar />}
        <main className="container main-content">
          {!showSplash && <AnimatedRoutes />}
        </main>
        <footer className="site-footer">
          <p>© 2026 Heartbleed Doc. Tous droits réservés. Contenu strictement privé et non libre de droits.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
