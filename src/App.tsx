import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomePortalHub } from './components/HomePortalHub';
import { PageHeaderBanner, PageView } from './components/PageHeaderBanner';
import { SquadSection } from './components/SquadSection';
import { TacticsPitch } from './components/TacticsPitch';
import { MatchCenter } from './components/MatchCenter';
import { StandingsSection } from './components/StandingsSection';
import { TrophiesSection } from './components/TrophiesSection';
import { ShopSection } from './components/ShopSection';
import { SupporterPassGenerator } from './components/SupporterPassGenerator';
import { NewsSection } from './components/NewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PlayerProfilePage } from './components/PlayerProfilePage';
import { MatchDetailsPage } from './components/MatchDetailsPage';
import { 
  Player, 
  Match, 
  PLAYERS_DATA, 
  MATCHES_DATA, 
  getPlayerByIdOrNum, 
  getMatchById 
} from './data/clubData';

export default function App() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [cartOpen, setCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);

  // Theme state with localStorage persistence (dark vs vibrant gradient light)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('titan_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('titan_theme', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('theme-dark', 'dark');
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  // Sync state with URL hash (e.g., #squad, #tactics, #matches, #player/17, #match/m4)
  const handleHashChange = useCallback(() => {
    const rawHash = window.location.hash.replace(/^#/, '');

    if (rawHash.startsWith('player/')) {
      const param = rawHash.replace('player/', '');
      const player = getPlayerByIdOrNum(param) || PLAYERS_DATA[0];
      setActivePlayer(player);
      setCurrentView('player');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (rawHash.startsWith('match/')) {
      const matchId = rawHash.replace('match/', '');
      const match = getMatchById(matchId) || MATCHES_DATA[0];
      setActiveMatch(match);
      setCurrentView('match');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const validViews: PageView[] = [
      'home', 'squad', 'tactics', 'matches', 'standings', 
      'trophies', 'store', 'member-pass', 'news', 'about', 'contact'
    ];

    if (validViews.includes(rawHash as PageView)) {
      setCurrentView(rawHash as PageView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Default to home view if empty or unknown
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  // General Navigation Handler for Tabs & Links
  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    setActivePlayer(null);
    setActiveMatch(null);

    if (view === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = view;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Player Profile Handler
  const handleNavigateToPlayer = (player: Player) => {
    setActivePlayer(player);
    setCurrentView('player');
    window.location.hash = `player/${player.num}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Match Details Handler
  const handleNavigateToMatch = (matchOrId: Match | string) => {
    const match = typeof matchOrId === 'string' ? getMatchById(matchOrId) : matchOrId;
    if (!match) return;
    setActiveMatch(match);
    setCurrentView('match');
    window.location.hash = `match/${match.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'theme-light' : 'theme-dark bg-neutral-950 text-neutral-100'} flex flex-col font-sans overflow-x-hidden w-full max-w-full transition-colors duration-300 ${lang === 'bn' ? 'font-bengali' : ''}`}>
      {/* Top Bar Navigation with Separate Section Switching & Theme Toggle */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenStore={() => handleNavigate('store')}
        currentView={currentView}
        onNavigate={handleNavigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area - Each Tab Opens Its Own Isolated Page */}
      <main className="flex-1">

        {/* 1. SEPARATE PLAYER PROFILE PAGE */}
        {currentView === 'player' && activePlayer && (
          <PlayerProfilePage
            player={activePlayer}
            lang={lang}
            onBackToSquad={() => handleNavigate('squad')}
            onSelectPlayer={handleNavigateToPlayer}
            onOpenStore={() => handleNavigate('store')}
            onNavigateToMatch={(matchId) => handleNavigateToMatch(matchId)}
          />
        )}

        {/* 2. SEPARATE MATCH DETAILS PAGE */}
        {currentView === 'match' && activeMatch && (
          <MatchDetailsPage
            match={activeMatch}
            lang={lang}
            onBackToMatches={() => handleNavigate('matches')}
            onSelectMatch={handleNavigateToMatch}
            onNavigateToPlayer={handleNavigateToPlayer}
          />
        )}

        {/* 3. HOME VIEW (HERO + PORTAL DASHBOARD OF ALL SECTIONS) */}
        {currentView === 'home' && (
          <>
            <Hero
              lang={lang}
              onNavigate={handleNavigate}
              onViewMatch={handleNavigateToMatch}
            />
            <HomePortalHub
              lang={lang}
              onNavigate={handleNavigate}
              onNavigateToPlayer={handleNavigateToPlayer}
              onNavigateToMatch={handleNavigateToMatch}
            />
          </>
        )}

        {/* 4. SEPARATE FIRST TEAM SQUAD PAGE */}
        {currentView === 'squad' && (
          <>
            <PageHeaderBanner view="squad" lang={lang} onNavigate={handleNavigate} />
            <SquadSection 
              lang={lang} 
              onViewFullProfile={handleNavigateToPlayer}
            />
          </>
        )}

        {/* 5. SEPARATE TACTICAL BOARD & FORMATION PAGE */}
        {currentView === 'tactics' && (
          <>
            <PageHeaderBanner view="tactics" lang={lang} onNavigate={handleNavigate} />
            <TacticsPitch
              lang={lang}
              onSelectPlayer={handleNavigateToPlayer}
            />
          </>
        )}

        {/* 6. SEPARATE MATCH CENTRE & FIXTURES PAGE */}
        {currentView === 'matches' && (
          <>
            <PageHeaderBanner view="matches" lang={lang} onNavigate={handleNavigate} />
            <MatchCenter 
              lang={lang} 
              onViewFullMatch={handleNavigateToMatch}
            />
          </>
        )}

        {/* 7. SEPARATE TOURNAMENT STANDINGS PAGE */}
        {currentView === 'standings' && (
          <>
            <PageHeaderBanner view="standings" lang={lang} onNavigate={handleNavigate} />
            <StandingsSection lang={lang} />
          </>
        )}

        {/* 8. SEPARATE TROPHY CABINET & HONOURS PAGE */}
        {currentView === 'trophies' && (
          <>
            <PageHeaderBanner view="trophies" lang={lang} onNavigate={handleNavigate} />
            <TrophiesSection lang={lang} />
          </>
        )}

        {/* 9. SEPARATE OFFICIAL KIT STORE PAGE */}
        {currentView === 'store' && (
          <>
            <PageHeaderBanner view="store" lang={lang} onNavigate={handleNavigate} />
            <ShopSection
              lang={lang}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
            />
          </>
        )}

        {/* 10. SEPARATE DIGITAL SUPPORTER PASS GENERATOR PAGE */}
        {currentView === 'member-pass' && (
          <>
            <PageHeaderBanner view="member-pass" lang={lang} onNavigate={handleNavigate} />
            <SupporterPassGenerator lang={lang} />
          </>
        )}

        {/* 11. SEPARATE CLUB NEWS WIRE PAGE */}
        {currentView === 'news' && (
          <>
            <PageHeaderBanner view="news" lang={lang} onNavigate={handleNavigate} />
            <NewsSection lang={lang} />
          </>
        )}

        {/* 12. SEPARATE ABOUT TITAN FORCE PAGE */}
        {currentView === 'about' && (
          <>
            <PageHeaderBanner view="about" lang={lang} onNavigate={handleNavigate} />
            <AboutSection lang={lang} />
          </>
        )}

        {/* 13. SEPARATE CONTACT & MATCH DESK PAGE */}
        {currentView === 'contact' && (
          <>
            <PageHeaderBanner view="contact" lang={lang} onNavigate={handleNavigate} />
            <ContactSection lang={lang} />
          </>
        )}

      </main>

      {/* Footer with onNavigate for all section links */}
      <Footer
        lang={lang}
        onScrollToTop={handleScrollToTop}
        onNavigate={handleNavigate}
        theme={theme}
      />
    </div>
  );
}

