export interface Player {
  id: number;
  num: number;
  name: string;
  fullName: string;
  position: string;
  primaryPosition: string;
  secondaryPositions: string[];
  category: 'GK' | 'DEF' | 'MID' | 'FWD';
  age: number;
  dateOfBirth: string;
  height: string;
  weight: string;
  hometown: string;
  foot: 'Right' | 'Left' | 'Both';
  squadRole: string;
  joinedDate: string;
  goals: number;
  assists: number;
  cleanSheets?: number;
  appearances: number;
  minutesPlayed: number;
  passAccuracy: number;
  tacklesWon: number;
  interceptions: number;
  saves?: number;
  motmAwards: number;
  yellowCards: number;
  redCards: number;
  photoUrl: string;
  bio: string;
  pitchCoords: { x: number; y: number }; // percentage on tactical pitch
  stats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  detailedStats: {
    sprintSpeed: number;
    acceleration: number;
    finishing: number;
    shotPower: number;
    vision: number;
    shortPassing: number;
    crossing: number;
    ballControl: number;
    agility: number;
    standingTackle: number;
    interceptions: number;
    stamina: number;
    strength: number;
  };
  recentMatches: {
    date: string;
    opponent: string;
    score: string;
    rating: number;
    goals: number;
    assists: number;
    minutes: number;
    notes: string;
  }[];
}

export interface MatchGoal {
  minute: number;
  scorer: string;
  assist?: string;
  team: 'home' | 'away';
  type?: 'Open Play' | 'Penalty' | 'Free Kick' | 'Header';
}

export interface MatchTimelineEvent {
  minute: number;
  type: 'goal' | 'save' | 'card' | 'sub' | 'whistle' | 'chance';
  title: string;
  description: string;
  player?: string;
  team: 'home' | 'away' | 'neutral';
}

export interface MatchStats {
  possession: [number, number]; // [home, away]
  shots: [number, number];
  shotsOnTarget: [number, number];
  xg: [number, number];
  corners: [number, number];
  fouls: [number, number];
  offsides: [number, number];
  passAccuracy: [number, number];
  yellowCards: [number, number];
  saves: [number, number];
}

export interface MatchLineupPlayer {
  num: number;
  name: string;
  pos: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  status: 'completed' | 'upcoming';
  result?: 'W' | 'L' | 'D';
  league: string;
  stage?: string;
  attendance?: string;
  referee?: string;
  weather?: string;
  pitchCondition?: string;
  manOfTheMatch?: string;
  notes?: string;
  goals?: MatchGoal[];
  timeline?: MatchTimelineEvent[];
  stats?: MatchStats;
  homeLineup?: {
    formation: string;
    starters: MatchLineupPlayer[];
    bench: MatchLineupPlayer[];
  };
  awayLineup?: {
    formation: string;
    starters: MatchLineupPlayer[];
    bench: MatchLineupPlayer[];
  };
  editorialReport?: string;
}

export interface StandingsRow {
  pos: number;
  team: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: ('W' | 'D' | 'L')[];
}

export interface Trophy {
  id: string;
  name: string;
  year: number;
  category: string;
  description: string;
  descriptionBn: string;
  venue: string;
  opponent?: string;
  score?: string;
  highlight: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  features: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  titleBn: string;
  summary: string;
  summaryBn: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
}

export const PLAYERS_DATA: Player[] = [
  {
    id: 10,
    num: 17,
    name: 'Shekhor',
    fullName: 'Shekhor Mohan Roy',
    position: 'CB / RB / DM / CM / RM / LM',
    primaryPosition: 'CB',
    secondaryPositions: ['RB', 'DM', 'CM', 'RM', 'LM'],
    category: 'DEF',
    age: 20,
    dateOfBirth: 'May 17, 2005',
    height: '179 cm (5 ft 10 in)',
    weight: '71 kg',
    hometown: 'Mulikandi, Zakigonj, Sylhet',
    foot: 'Right',
    squadRole: 'Club Captain, Founder & Playmaker',
    joinedDate: 'January 2025 (Founding Member)',
    goals: 4,
    assists: 7,
    appearances: 9,
    minutesPlayed: 810,
    passAccuracy: 89.2,
    tacklesWon: 36,
    interceptions: 29,
    motmAwards: 4,
    yellowCards: 1,
    redCards: 0,
    photoUrl: '/players/player-17.png',
    bio: 'Founder, team captain, and tactical heart of Titan Force Mulikandi. Renowned for immense tactical IQ, stamina to cover every blade of grass, and visionary distribution that orchestrates the team from defense right into attack.',
    pitchCoords: { x: 40, y: 72 },
    stats: { pace: 84, shooting: 78, passing: 88, dribbling: 82, defending: 89, physical: 86 },
    detailedStats: {
      sprintSpeed: 85,
      acceleration: 83,
      finishing: 76,
      shotPower: 82,
      vision: 90,
      shortPassing: 89,
      crossing: 84,
      ballControl: 85,
      agility: 80,
      standingTackle: 91,
      interceptions: 88,
      stamina: 94,
      strength: 83
    },
    recentMatches: [
      { date: '2026-08-04', opponent: 'Daudpur Rising Titans', score: '1 - 0 W', rating: 9.2, goals: 0, assists: 1, minutes: 90, notes: 'Man of the Match in the Grand Final. Set up the tournament-winning goal.' },
      { date: '2026-03-06', opponent: 'Wasar FC', score: '2 - 0 W', rating: 8.8, goals: 1, assists: 0, minutes: 90, notes: 'Scored thunderous free kick from 25 yards; commanding backline dominance.' },
      { date: '2026-02-18', opponent: 'Daudpur FC', score: '1 - 0 W', rating: 8.5, goals: 0, assists: 1, minutes: 90, notes: 'Crucial goal-line clearance in the 81st minute.' },
      { date: '2026-02-11', opponent: 'Bilopar FC', score: '2 - 0 W', rating: 8.9, goals: 1, assists: 1, minutes: 90, notes: 'Controlled midfield tempo with 94% pass accuracy.' }
    ]
  },
  {
    id: 1,
    num: 1,
    name: 'Shuronjit',
    fullName: 'Shuronjit Biswas',
    position: 'Goalkeeper',
    primaryPosition: 'GK',
    secondaryPositions: ['SW'],
    category: 'GK',
    age: 18,
    dateOfBirth: 'October 12, 2007',
    height: '185 cm (6 ft 1 in)',
    weight: '76 kg',
    hometown: 'Mulikandi, Zakigonj, Sylhet',
    foot: 'Right',
    squadRole: 'First Choice Goalkeeper & Golden Glove Holder',
    joinedDate: 'January 2025',
    goals: 0,
    assists: 1,
    cleanSheets: 7,
    appearances: 9,
    minutesPlayed: 810,
    passAccuracy: 78.4,
    tacklesWon: 8,
    interceptions: 14,
    saves: 38,
    motmAwards: 2,
    yellowCards: 0,
    redCards: 0,
    photoUrl: '/players/player-1.png',
    bio: 'Commanding young goalkeeper with exceptional acrobatic reach, rapid diving reaction, and fearlessness on 1v1 breakaways. Held 7 clean sheets in 9 matches, conceding merely 2 goals throughout the 2026 campaign.',
    pitchCoords: { x: 50, y: 88 },
    stats: { pace: 72, shooting: 40, passing: 76, dribbling: 60, defending: 91, physical: 84 },
    detailedStats: {
      sprintSpeed: 70,
      acceleration: 74,
      finishing: 32,
      shotPower: 68,
      vision: 75,
      shortPassing: 78,
      crossing: 65,
      ballControl: 68,
      agility: 88,
      standingTackle: 82,
      interceptions: 92,
      stamina: 82,
      strength: 86
    },
    recentMatches: [
      { date: '2026-08-04', opponent: 'Daudpur Rising Titans', score: '1 - 0 W', rating: 9.1, goals: 0, assists: 0, minutes: 90, notes: 'Clean sheet in final; pulled off three world-class reflex saves in second half.' },
      { date: '2026-03-06', opponent: 'Wasar FC', score: '2 - 0 W', rating: 8.6, goals: 0, assists: 0, minutes: 90, notes: 'Clean sheet, stopped close-range header in 74th minute.' },
      { date: '2026-02-12', opponent: 'Mijarchok FC', score: '1 - 0 W', rating: 8.7, goals: 0, assists: 0, minutes: 90, notes: 'Penalty kick save in 62nd minute to protect 1-0 advantage.' }
    ]
  },
  {
    id: 2,
    num: 3,
    name: 'Srijon',
    fullName: 'Srijon Roy',
    position: 'CB / RB',
    primaryPosition: 'RB',
    secondaryPositions: ['CB', 'RWB', 'RM'],
    category: 'DEF',
    age: 21,
    dateOfBirth: 'August 24, 2004',
    height: '176 cm (5 ft 9 in)',
    weight: '69 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Right',
    squadRole: 'Right Flank Stopper & Full-Back',
    joinedDate: 'January 2025',
    goals: 1,
    assists: 2,
    cleanSheets: 7,
    appearances: 9,
    minutesPlayed: 790,
    passAccuracy: 81.5,
    tacklesWon: 31,
    interceptions: 24,
    motmAwards: 1,
    yellowCards: 2,
    redCards: 0,
    photoUrl: '/players/player-3.png',
    bio: 'Disciplined full-back known for aggressive sliding challenges, lockdown 1v1 wing defense, and rapid transition support down the right flank.',
    pitchCoords: { x: 82, y: 68 },
    stats: { pace: 81, shooting: 62, passing: 75, dribbling: 71, defending: 87, physical: 85 },
    detailedStats: {
      sprintSpeed: 82,
      acceleration: 80,
      finishing: 59,
      shotPower: 70,
      vision: 74,
      shortPassing: 77,
      crossing: 78,
      ballControl: 73,
      agility: 76,
      standingTackle: 88,
      interceptions: 86,
      stamina: 88,
      strength: 84
    },
    recentMatches: [
      { date: '2026-08-04', opponent: 'Daudpur Rising Titans', score: '1 - 0 W', rating: 8.4, goals: 0, assists: 0, minutes: 90, notes: 'Completely neutralized opposition winger on the right touchline.' },
      { date: '2026-03-06', opponent: 'Wasar FC', score: '2 - 0 W', rating: 8.2, goals: 0, assists: 1, minutes: 90, notes: 'Dangerous low cross set up second goal.' }
    ]
  },
  {
    id: 3,
    num: 4,
    name: 'Akash',
    fullName: 'Akash Roy',
    position: 'CB / LB',
    primaryPosition: 'LB',
    secondaryPositions: ['CB', 'LWB', 'LM'],
    category: 'DEF',
    age: 18,
    dateOfBirth: 'November 3, 2007',
    height: '175 cm (5 ft 9 in)',
    weight: '68 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Left',
    squadRole: 'Left-Back & Ball Recoverer',
    joinedDate: 'January 2025',
    goals: 1,
    assists: 3,
    cleanSheets: 6,
    appearances: 8,
    minutesPlayed: 720,
    passAccuracy: 83.1,
    tacklesWon: 27,
    interceptions: 21,
    motmAwards: 1,
    yellowCards: 1,
    redCards: 0,
    photoUrl: '/players/player-4.png',
    bio: 'Naturally left-footed defender whose pace and anticipation neutralize speedy wingers. Reliable set-piece delivery into the box.',
    pitchCoords: { x: 18, y: 68 },
    stats: { pace: 79, shooting: 58, passing: 78, dribbling: 72, defending: 86, physical: 80 },
    detailedStats: {
      sprintSpeed: 80,
      acceleration: 78,
      finishing: 55,
      shotPower: 67,
      vision: 79,
      shortPassing: 80,
      crossing: 83,
      ballControl: 74,
      agility: 79,
      standingTackle: 87,
      interceptions: 85,
      stamina: 84,
      strength: 78
    },
    recentMatches: [
      { date: '2026-03-09', opponent: 'Kunagram FC', score: '0 - 1 L', rating: 8.5, goals: 0, assists: 0, minutes: 90, notes: 'Selected Man of the Match despite defeat; made 8 defensive interventions.' }
    ]
  },
  {
    id: 4,
    num: 5,
    name: 'Akash',
    fullName: 'Akash Roy',
    position: 'CB / CDM',
    primaryPosition: 'CB',
    secondaryPositions: ['CDM', 'RB'],
    category: 'DEF',
    age: 20,
    dateOfBirth: 'June 19, 2005',
    height: '182 cm (6 ft 0 in)',
    weight: '75 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Right',
    squadRole: 'Central Defensive Anchor & Aerial Shield',
    joinedDate: 'January 2025',
    goals: 2,
    assists: 1,
    cleanSheets: 7,
    appearances: 9,
    minutesPlayed: 810,
    passAccuracy: 84.7,
    tacklesWon: 34,
    interceptions: 30,
    motmAwards: 1,
    yellowCards: 2,
    redCards: 0,
    photoUrl: '/players/player-5.png',
    bio: 'Commanding aerial presence and physical anchor in central defense. Formed an impenetrable partnership with Shekhor Mohan Roy.',
    pitchCoords: { x: 60, y: 72 },
    stats: { pace: 76, shooting: 64, passing: 77, dribbling: 70, defending: 90, physical: 88 },
    detailedStats: {
      sprintSpeed: 76,
      acceleration: 75,
      finishing: 61,
      shotPower: 74,
      vision: 76,
      shortPassing: 80,
      crossing: 62,
      ballControl: 72,
      agility: 70,
      standingTackle: 92,
      interceptions: 89,
      stamina: 89,
      strength: 91
    },
    recentMatches: [
      { date: '2026-08-04', opponent: 'Daudpur Rising Titans', score: '1 - 0 W', rating: 8.7, goals: 0, assists: 0, minutes: 90, notes: 'Won 11 of 12 aerial duels; rock-solid clearance in stoppage time.' },
      { date: '2026-02-09', opponent: 'Hamindopur FC', score: '2 - 1 W', rating: 8.3, goals: 1, assists: 0, minutes: 90, notes: 'Headed goal from corner kick in 38th minute.' }
    ]
  },
  {
    id: 5,
    num: 6,
    name: 'Sujon',
    fullName: 'Sujon Roy',
    position: 'CAM / CM',
    primaryPosition: 'CAM',
    secondaryPositions: ['CM', 'RW', 'LW'],
    category: 'MID',
    age: 20,
    dateOfBirth: 'March 14, 2005',
    height: '174 cm (5 ft 8 in)',
    weight: '67 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Right',
    squadRole: 'Attacking Playmaker & Key Chance Creator',
    joinedDate: 'January 2025',
    goals: 3,
    assists: 5,
    appearances: 9,
    minutesPlayed: 785,
    passAccuracy: 88.5,
    tacklesWon: 18,
    interceptions: 16,
    motmAwards: 1,
    yellowCards: 0,
    redCards: 0,
    photoUrl: '/players/player-6.png',
    bio: 'Artistic central attacking midfielder who unlocks tight tournament defenses with delicate turns, line-breaking passes, and curling long-range efforts.',
    pitchCoords: { x: 62, y: 46 },
    stats: { pace: 80, shooting: 81, passing: 86, dribbling: 85, defending: 71, physical: 77 },
    detailedStats: {
      sprintSpeed: 81,
      acceleration: 82,
      finishing: 80,
      shotPower: 83,
      vision: 89,
      shortPassing: 88,
      crossing: 81,
      ballControl: 87,
      agility: 86,
      standingTackle: 71,
      interceptions: 72,
      stamina: 82,
      strength: 74
    },
    recentMatches: [
      { date: '2026-02-09', opponent: 'Hamindopur FC', score: '2 - 1 W', rating: 9.3, goals: 1, assists: 1, minutes: 90, notes: 'Man of the Match. Scored 88th-minute thunderbolt winner at Mulikandi High School.' }
    ]
  },
  {
    id: 6,
    num: 7,
    name: 'Shuvo',
    fullName: 'Shuvo Roy',
    position: 'LW / RW / CAM',
    primaryPosition: 'LW',
    secondaryPositions: ['RW', 'LM', 'CAM'],
    category: 'FWD',
    age: 19,
    dateOfBirth: 'February 8, 2006',
    height: '173 cm (5 ft 8 in)',
    weight: '66 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Both',
    squadRole: 'Explosive Winger & Speedster',
    joinedDate: 'January 2025',
    goals: 5,
    assists: 4,
    appearances: 9,
    minutesPlayed: 790,
    passAccuracy: 81.0,
    tacklesWon: 14,
    interceptions: 11,
    motmAwards: 2,
    yellowCards: 1,
    redCards: 0,
    photoUrl: '/players/player-7.png',
    bio: 'The fastest player in the squad with 91 Pace. Capable of playing along either flank, dribbling past defenders with explosive cuts, and striking cleanly with both feet.',
    pitchCoords: { x: 22, y: 24 },
    stats: { pace: 91, shooting: 83, passing: 79, dribbling: 89, defending: 55, physical: 74 },
    detailedStats: {
      sprintSpeed: 93,
      acceleration: 90,
      finishing: 84,
      shotPower: 82,
      vision: 79,
      shortPassing: 81,
      crossing: 83,
      ballControl: 89,
      agility: 92,
      standingTackle: 54,
      interceptions: 56,
      stamina: 86,
      strength: 69
    },
    recentMatches: [
      { date: '2026-02-11', opponent: 'Bilopar FC', score: '2 - 0 W', rating: 9.0, goals: 1, assists: 1, minutes: 90, notes: 'Opened scoring with blistering sprint and curling far-post finish.' }
    ]
  },
  {
    id: 7,
    num: 8,
    name: 'Sojib',
    fullName: 'Sojib Roy',
    position: 'CM / CAM',
    primaryPosition: 'CM',
    secondaryPositions: ['CAM', 'CDM', 'RM'],
    category: 'MID',
    age: 20,
    dateOfBirth: 'April 22, 2005',
    height: '177 cm (5 ft 10 in)',
    weight: '72 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Right',
    squadRole: 'Box-to-Box Midfield Engine',
    joinedDate: 'January 2025',
    goals: 2,
    assists: 4,
    appearances: 9,
    minutesPlayed: 770,
    passAccuracy: 85.0,
    tacklesWon: 29,
    interceptions: 22,
    motmAwards: 1,
    yellowCards: 2,
    redCards: 0,
    photoUrl: '/players/player-8.png',
    bio: 'Tireless box-to-box midfielder who covers ground relentlessly. Breaks up opposition attacks in the middle third and sparks quick forward transitions.',
    pitchCoords: { x: 38, y: 46 },
    stats: { pace: 83, shooting: 75, passing: 82, dribbling: 79, defending: 79, physical: 84 },
    detailedStats: {
      sprintSpeed: 84,
      acceleration: 82,
      finishing: 74,
      shotPower: 79,
      vision: 83,
      shortPassing: 84,
      crossing: 77,
      ballControl: 80,
      agility: 81,
      standingTackle: 82,
      interceptions: 80,
      stamina: 91,
      strength: 84
    },
    recentMatches: [
      { date: '2026-03-01', opponent: 'Daudpur All-Stars', score: '1 - 0 W', rating: 8.6, goals: 0, assists: 1, minutes: 90, notes: 'Overpowered the midfield battle; won 9 loose ball duels.' }
    ]
  },
  {
    id: 8,
    num: 9,
    name: 'Sajon',
    fullName: 'Sajon Biswas',
    position: 'AM / LW / CF',
    primaryPosition: 'ST',
    secondaryPositions: ['CF', 'LW', 'CAM'],
    category: 'FWD',
    age: 18,
    dateOfBirth: 'December 15, 2007',
    height: '178 cm (5 ft 10 in)',
    weight: '70 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Right',
    squadRole: 'Golden Boot Striker & Clinical Finisher',
    joinedDate: 'January 2025',
    goals: 6,
    assists: 3,
    appearances: 9,
    minutesPlayed: 800,
    passAccuracy: 79.5,
    tacklesWon: 11,
    interceptions: 9,
    motmAwards: 3,
    yellowCards: 0,
    redCards: 0,
    photoUrl: '/players/player-9.png',
    bio: 'Top goalscorer of Titan Force Mulikandi with 6 strikes. Boasts predatory off-the-ball movement, ruthless 1v1 finishing, and composure in high-pressure cup finals.',
    pitchCoords: { x: 50, y: 16 },
    stats: { pace: 87, shooting: 88, passing: 74, dribbling: 84, defending: 52, physical: 78 },
    detailedStats: {
      sprintSpeed: 88,
      acceleration: 86,
      finishing: 91,
      shotPower: 86,
      vision: 76,
      shortPassing: 78,
      crossing: 70,
      ballControl: 85,
      agility: 87,
      standingTackle: 52,
      interceptions: 53,
      stamina: 83,
      strength: 78
    },
    recentMatches: [
      { date: '2026-08-04', opponent: 'Daudpur Rising Titans', score: '1 - 0 W', rating: 9.3, goals: 1, assists: 0, minutes: 90, notes: 'Scored the championship-winning goal in the 64th minute.' },
      { date: '2026-02-12', opponent: 'Mijarchok FC', score: '1 - 0 W', rating: 9.0, goals: 1, assists: 0, minutes: 90, notes: 'Man of the Match; scored decisive quarter-final goal.' }
    ]
  },
  {
    id: 9,
    num: 11,
    name: 'Kourov',
    fullName: 'Kourov Chakroborty',
    position: 'LW / ST / CAM',
    primaryPosition: 'RW',
    secondaryPositions: ['ST', 'LW', 'CAM'],
    category: 'FWD',
    age: 19,
    dateOfBirth: 'September 28, 2006',
    height: '176 cm (5 ft 9 in)',
    weight: '69 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Right',
    squadRole: 'Inside Forward & Goal Threat',
    joinedDate: 'January 2025',
    goals: 4,
    assists: 3,
    appearances: 9,
    minutesPlayed: 760,
    passAccuracy: 80.2,
    tacklesWon: 12,
    interceptions: 10,
    motmAwards: 1,
    yellowCards: 1,
    redCards: 0,
    photoUrl: '/players/player-11.png',
    bio: 'Versatile forward with sharp diagonal runs, clinical snapshot technique, and the ability to operate across all frontline positions.',
    pitchCoords: { x: 78, y: 24 },
    stats: { pace: 88, shooting: 84, passing: 77, dribbling: 83, defending: 54, physical: 76 },
    detailedStats: {
      sprintSpeed: 89,
      acceleration: 87,
      finishing: 85,
      shotPower: 83,
      vision: 78,
      shortPassing: 79,
      crossing: 78,
      ballControl: 84,
      agility: 85,
      standingTackle: 53,
      interceptions: 55,
      stamina: 82,
      strength: 75
    },
    recentMatches: [
      { date: '2026-03-01', opponent: 'Daudpur All-Stars', score: '1 - 0 W', rating: 9.1, goals: 1, assists: 0, minutes: 90, notes: 'Man of the Match; curled in a 20-yard beauty in the 71st minute.' }
    ]
  },
  {
    id: 11,
    num: 10,
    name: 'Tanvir',
    fullName: 'Tanvir Ahmed',
    position: 'CDM / CM / CB',
    primaryPosition: 'DM',
    secondaryPositions: ['CM', 'CB', 'CDM'],
    category: 'MID',
    age: 21,
    dateOfBirth: 'January 14, 2005',
    height: '179 cm (5 ft 10 in)',
    weight: '73 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Right',
    squadRole: 'Defensive Midfield Shield & Ball Recoverer',
    joinedDate: 'January 2025',
    goals: 1,
    assists: 3,
    appearances: 8,
    minutesPlayed: 710,
    passAccuracy: 86.4,
    tacklesWon: 31,
    interceptions: 28,
    motmAwards: 1,
    yellowCards: 1,
    redCards: 0,
    photoUrl: '/logos/titanforce-logo.svg',
    bio: 'Tenacious defensive midfielder stationed at the base of the midfield triangle. Disrupts opponent buildup with clean tackles and launches swift forward counters.',
    pitchCoords: { x: 50, y: 60 },
    stats: { pace: 78, shooting: 68, passing: 84, dribbling: 77, defending: 88, physical: 85 },
    detailedStats: {
      sprintSpeed: 79,
      acceleration: 77,
      finishing: 64,
      shotPower: 78,
      vision: 83,
      shortPassing: 86,
      crossing: 71,
      ballControl: 81,
      agility: 75,
      standingTackle: 89,
      interceptions: 88,
      stamina: 89,
      strength: 86
    },
    recentMatches: [
      { date: '2026-08-04', opponent: 'Daudpur Rising Titans', score: '1 - 0 W', rating: 8.5, goals: 0, assists: 0, minutes: 90, notes: 'Anchor display in the final; made 6 key interceptions.' }
    ]
  },
  {
    id: 12,
    num: 14,
    name: 'Joy',
    fullName: 'Joy Roy',
    position: 'RM / RW / ST',
    primaryPosition: 'RM',
    secondaryPositions: ['RW', 'ST', 'RB'],
    category: 'FWD',
    age: 19,
    dateOfBirth: 'November 20, 2006',
    height: '172 cm (5 ft 8 in)',
    weight: '65 kg',
    hometown: 'Mulikandi, Zakigonj',
    foot: 'Right',
    squadRole: 'Impact Super-Sub & Wide Threat',
    joinedDate: 'January 2025',
    goals: 2,
    assists: 2,
    appearances: 7,
    minutesPlayed: 420,
    passAccuracy: 81.0,
    tacklesWon: 14,
    interceptions: 11,
    motmAwards: 0,
    yellowCards: 0,
    redCards: 0,
    photoUrl: '/logos/titanforce-logo.svg',
    bio: 'Dynamic wide attacker brought on to inject blistering pace and direct dribbling in the second half of competitive cup fixtures.',
    pitchCoords: { x: 80, y: 38 },
    stats: { pace: 89, shooting: 78, passing: 76, dribbling: 82, defending: 50, physical: 72 },
    detailedStats: {
      sprintSpeed: 90,
      acceleration: 88,
      finishing: 79,
      shotPower: 77,
      vision: 74,
      shortPassing: 78,
      crossing: 79,
      ballControl: 82,
      agility: 88,
      standingTackle: 50,
      interceptions: 51,
      stamina: 80,
      strength: 70
    },
    recentMatches: [
      { date: '2026-02-18', opponent: 'Daudpur FC', score: '1 - 0 W', rating: 8.3, goals: 0, assists: 1, minutes: 35, notes: 'Instant impact off the bench with dangerous low delivery.' }
    ]
  }
];

export const STANDINGS_DATA: StandingsRow[] = [
  { pos: 1, team: 'Titan Force Mulikandi', p: 9, w: 8, d: 0, l: 1, gf: 14, ga: 2, gd: 12, pts: 24, form: ['W', 'W', 'W', 'W', 'W'] },
  { pos: 2, team: 'Daudpur Rising Titans', p: 9, w: 6, d: 1, l: 2, gf: 11, ga: 4, gd: 7, pts: 19, form: ['W', 'L', 'W', 'W', 'D'] },
  { pos: 3, team: 'Hamindopur FC', p: 9, w: 5, d: 2, l: 2, gf: 10, ga: 6, gd: 4, pts: 17, form: ['W', 'D', 'W', 'L', 'W'] },
  { pos: 4, team: 'Bilopar FC', p: 9, w: 4, d: 2, l: 3, gf: 8, ga: 7, gd: 1, pts: 14, form: ['L', 'W', 'D', 'W', 'L'] },
  { pos: 5, team: 'Wasar FC', p: 9, w: 4, d: 1, l: 4, gf: 7, ga: 9, gd: -2, pts: 13, form: ['L', 'W', 'L', 'D', 'W'] },
  { pos: 6, team: 'Kunagram FC', p: 9, w: 3, d: 2, l: 4, gf: 6, ga: 8, gd: -2, pts: 11, form: ['W', 'L', 'D', 'L', 'L'] },
  { pos: 7, team: 'Mijarchok FC', p: 9, w: 2, d: 1, l: 6, gf: 4, ga: 11, gd: -7, pts: 7, form: ['L', 'L', 'L', 'W', 'D'] },
  { pos: 8, team: 'Zakigonj United', p: 9, w: 1, d: 1, l: 7, gf: 3, ga: 16, gd: -13, pts: 4, form: ['L', 'L', 'D', 'L', 'L'] }
];

export const MATCHES_DATA: Match[] = [
  {
    id: 'm4',
    homeTeam: 'Titan Force Mulikandi',
    awayTeam: 'Daudpur Rising Titans',
    homeScore: 1,
    awayScore: 0,
    date: '2026-08-04',
    time: '17:00 BST',
    venue: 'Daudpur Stadium',
    status: 'completed',
    result: 'W',
    league: 'Daudpur Tournament 2026',
    stage: 'Grand Final (Championship Decider)',
    attendance: '3,500',
    referee: 'M. Kabir Hossain (Sylhet DFA)',
    weather: '27°C, Sunny & Clear, Wind 8 km/h',
    pitchCondition: 'Natural Grass, Excellent',
    manOfTheMatch: 'Shekhor Mohan Roy (#17)',
    notes: 'Historic Championship Victory! Titan Force Mulikandi lifted the Daudpur 2026 trophy in front of 3,500 roaring fans.',
    editorialReport: 'In an unforgettable championship final at Daudpur Stadium, Titan Force Mulikandi put on a masterclass of defensive grit and surgical counter-attacking football. After a tense first half where goalkeeper Shuronjit Biswas produced two stunning saves, captain Shekhor Mohan Roy seized control of the midfield in the 64th minute, threading an inch-perfect diagonal ball to striker Sajon Biswas who slotted home the winning goal. The Mulikandi defense stood tall until the 95th minute to crown Titan Force the champions of Daudpur.',
    goals: [
      { minute: 64, scorer: 'Sajon Biswas (#9)', assist: 'Shekhor Mohan Roy (#17)', team: 'home', type: 'Open Play' }
    ],
    timeline: [
      { minute: 1, type: 'whistle', title: 'Kickoff', description: 'Grand Final underway under the floodlights at Daudpur Stadium.', team: 'neutral' },
      { minute: 19, type: 'save', title: 'World-Class Save', description: 'Shuronjit Biswas (#1) tips a fierce 20-yard volley over the crossbar.', player: 'Shuronjit Biswas', team: 'home' },
      { minute: 38, type: 'chance', title: 'Shuvo Hit Woodwork', description: 'Shuvo Roy (#7) cuts inside and rattles the crossbar from 18 yards.', player: 'Shuvo Roy', team: 'home' },
      { minute: 45, type: 'whistle', title: 'Half Time (0 - 0)', description: 'Deadlocked at the break with Titan Force dominating possession.', team: 'neutral' },
      { minute: 64, type: 'goal', title: 'GOAL! 1 - 0 TITAN FORCE', description: 'Shekhor Mohan Roy picks out Sajon Biswas, who chips the advancing keeper cleanly!', player: 'Sajon Biswas', team: 'home' },
      { minute: 78, type: 'card', title: 'Yellow Card', description: 'Tactical foul by Srijon Roy (#3) stopping a dangerous counter-attack.', player: 'Srijon Roy', team: 'home' },
      { minute: 88, type: 'save', title: 'Point-Blank Save', description: 'Shuronjit Biswas dives low to deny a header from 6 yards out.', player: 'Shuronjit Biswas', team: 'home' },
      { minute: 90, type: 'whistle', title: 'Full Time & Trophy Presentation', description: 'Final whistle blows! Titan Force Mulikandi are crowned 2026 Champions!', team: 'neutral' }
    ],
    stats: {
      possession: [58, 42],
      shots: [13, 7],
      shotsOnTarget: [6, 3],
      xg: [1.84, 0.72],
      corners: [6, 3],
      fouls: [9, 14],
      offsides: [2, 3],
      passAccuracy: [86, 74],
      yellowCards: [1, 2],
      saves: [3, 5]
    },
    homeLineup: {
      formation: '4-3-3 Attacking',
      starters: [
        { num: 1, name: 'Shuronjit Biswas', pos: 'GK' },
        { num: 4, name: 'Akash Roy', pos: 'LB' },
        { num: 17, name: 'Shekhor Mohan Roy (C)', pos: 'CB' },
        { num: 5, name: 'Akash Roy', pos: 'CB' },
        { num: 3, name: 'Srijon Roy', pos: 'RB' },
        { num: 10, name: 'Tanvir Ahmed', pos: 'CDM' },
        { num: 8, name: 'Sojib Roy', pos: 'CM' },
        { num: 6, name: 'Sujon Roy', pos: 'CAM' },
        { num: 7, name: 'Shuvo Roy', pos: 'LW' },
        { num: 9, name: 'Sajon Biswas', pos: 'ST' },
        { num: 11, name: 'Kourov Chakroborty', pos: 'RW' }
      ],
      bench: [
        { num: 14, name: 'Joy Roy', pos: 'SUB' }
      ]
    },
    awayLineup: {
      formation: '4-4-2 Flat',
      starters: [
        { num: 1, name: 'Rafiqul Islam', pos: 'GK' },
        { num: 2, name: 'Babul Miah', pos: 'RB' },
        { num: 4, name: 'Masud Rana', pos: 'CB' },
        { num: 5, name: 'Ariful Haque', pos: 'CB' },
        { num: 3, name: 'Sohag Ali', pos: 'LB' },
        { num: 7, name: 'Faruk Hossain', pos: 'RM' },
        { num: 8, name: 'Kamal Ahmed', pos: 'CM' },
        { num: 6, name: 'Habib Rahman', pos: 'CM' },
        { num: 11, name: 'Zahid Hasan', pos: 'LM' },
        { num: 9, name: 'Tareq Aziz', pos: 'ST' },
        { num: 10, name: 'Shamim Osman', pos: 'ST' }
      ],
      bench: [
        { num: 16, name: 'Rubel Miah', pos: 'SUB' },
        { num: 18, name: 'Sumon Das', pos: 'SUB' }
      ]
    }
  },
  {
    id: 'm2',
    homeTeam: 'Titan Force Mulikandi',
    awayTeam: 'Hamindopur FC',
    homeScore: 2,
    awayScore: 1,
    date: '2026-02-09',
    time: '17:00 BST',
    venue: 'Mulikandi High School Ground',
    status: 'completed',
    result: 'W',
    league: 'Friendly Match',
    stage: 'Home Derby Showcase',
    attendance: '1,800',
    referee: 'Anisur Rahman',
    weather: '24°C, Clear',
    pitchCondition: 'Home Pitch Grass',
    manOfTheMatch: 'Sujon Roy (#6)',
    notes: 'Electrifying home atmosphere at Mulikandi High School with stoppage-time winner.',
    editorialReport: 'Mulikandi High School was electric as 1,800 local fans packed the touchlines. Hamindopur took a shock lead in the 22nd minute, but central defender Akash Roy (#5) leveled with a towering header in the 38th minute. The winner arrived in the 88th minute when playmaker Sujon Roy smashed home from 20 yards to send the village into raptures.',
    goals: [
      { minute: 22, scorer: 'Tareq Rahman', team: 'away', type: 'Open Play' },
      { minute: 38, scorer: 'Akash Roy (#5)', assist: 'Akash Roy (#4)', team: 'home', type: 'Header' },
      { minute: 88, scorer: 'Sujon Roy (#6)', assist: 'Shuvo Roy (#7)', team: 'home', type: 'Open Play' }
    ],
    stats: {
      possession: [62, 38],
      shots: [16, 5],
      shotsOnTarget: [9, 2],
      xg: [2.35, 0.55],
      corners: [8, 2],
      fouls: [7, 11],
      offsides: [1, 2],
      passAccuracy: [88, 70],
      yellowCards: [0, 2],
      saves: [1, 7]
    }
  },
  {
    id: 'm1',
    homeTeam: 'Titan Force Mulikandi',
    awayTeam: 'Bilopar FC',
    homeScore: 2,
    awayScore: 0,
    date: '2026-02-11',
    time: '19:00 BST',
    venue: 'Bilopar Pitch',
    status: 'completed',
    result: 'W',
    league: 'Friendly Match',
    stage: 'Regional Friendly',
    attendance: '1,200',
    referee: 'Mustafa Ali',
    weather: '22°C, Evening Floodlights',
    pitchCondition: 'Good Grass',
    manOfTheMatch: 'Shekhor Mohan Roy (#17)',
    notes: 'Flawless clean sheet with dominant midfield display.',
    goals: [
      { minute: 28, scorer: 'Shuvo Roy (#7)', assist: 'Shekhor Mohan Roy (#17)', team: 'home', type: 'Open Play' },
      { minute: 73, scorer: 'Sajon Biswas (#9)', assist: 'Sojib Roy (#8)', team: 'home', type: 'Open Play' }
    ],
    stats: {
      possession: [64, 36],
      shots: [14, 4],
      shotsOnTarget: [7, 1],
      xg: [2.1, 0.3],
      corners: [7, 2],
      fouls: [6, 10],
      offsides: [2, 1],
      passAccuracy: [89, 68],
      yellowCards: [0, 1],
      saves: [1, 5]
    }
  },
  {
    id: 'm3',
    homeTeam: 'Titan Force Mulikandi',
    awayTeam: 'Wasar FC',
    homeScore: 2,
    awayScore: 0,
    date: '2026-03-06',
    time: '19:00 BST',
    venue: 'Wasar Ground',
    status: 'completed',
    result: 'W',
    league: 'Tournament Semis',
    stage: 'Tournament Semi-Final',
    attendance: '1,500',
    referee: 'Selim Uddin',
    weather: '23°C, Pleasant',
    pitchCondition: 'Hard Pitch',
    manOfTheMatch: 'Shuronjit Biswas (#1)',
    notes: 'Semi-final masterclass sealing qualification to the grand final.',
    goals: [
      { minute: 41, scorer: 'Shekhor Mohan Roy (#17)', team: 'home', type: 'Free Kick' },
      { minute: 82, scorer: 'Kourov Chakroborty (#11)', assist: 'Srijon Roy (#3)', team: 'home', type: 'Open Play' }
    ],
    stats: {
      possession: [55, 45],
      shots: [11, 8],
      shotsOnTarget: [5, 4],
      xg: [1.6, 0.9],
      corners: [5, 4],
      fouls: [8, 12],
      offsides: [1, 2],
      passAccuracy: [82, 76],
      yellowCards: [1, 2],
      saves: [4, 3]
    }
  },
  {
    id: 'm5',
    homeTeam: 'Titan Force Mulikandi',
    awayTeam: 'Mijarchok FC',
    homeScore: 1,
    awayScore: 0,
    date: '2026-02-12',
    time: '16:30 BST',
    venue: 'Daudpur Ground',
    status: 'completed',
    result: 'W',
    league: 'Daudpur Tournament QF',
    stage: 'Quarter-Final',
    attendance: '1,400',
    referee: 'M. Kabir Hossain',
    weather: '25°C',
    pitchCondition: 'Grass Pitch',
    manOfTheMatch: 'Sajon Biswas (#9)',
    notes: 'Gritty quarter-final triumph sealed with clinical finish.',
    goals: [
      { minute: 64, scorer: 'Sajon Biswas (#9)', assist: 'Sujon Roy (#6)', team: 'home', type: 'Open Play' }
    ],
    stats: {
      possession: [52, 48],
      shots: [9, 7],
      shotsOnTarget: [4, 2],
      xg: [1.2, 0.8],
      corners: [4, 5],
      fouls: [11, 13],
      offsides: [2, 1],
      passAccuracy: [79, 75],
      yellowCards: [2, 3],
      saves: [2, 3]
    }
  },
  {
    id: 'm6',
    homeTeam: 'Titan Force Mulikandi',
    awayTeam: 'Kunagram FC',
    homeScore: 0,
    awayScore: 1,
    date: '2026-03-09',
    time: '20:00 BST',
    venue: 'Wasar Ground',
    status: 'completed',
    result: 'L',
    league: 'Tournament',
    stage: 'Group Stage',
    attendance: '1,650',
    referee: 'M. Azad',
    weather: '21°C',
    pitchCondition: 'Dry Ground',
    manOfTheMatch: 'Akash Roy (#4)',
    notes: 'Sole tournament defeat; hit woodwork twice in stoppage time.',
    goals: [
      { minute: 54, scorer: 'Zubair Ahmed', team: 'away', type: 'Open Play' }
    ],
    stats: {
      possession: [61, 39],
      shots: [15, 5],
      shotsOnTarget: [6, 2],
      xg: [2.2, 0.6],
      corners: [9, 2],
      fouls: [8, 14],
      offsides: [3, 1],
      passAccuracy: [85, 68],
      yellowCards: [1, 3],
      saves: [1, 6]
    }
  },
  {
    id: 'm7',
    homeTeam: 'Titan Force Mulikandi',
    awayTeam: 'Daudpur All-Stars',
    homeScore: 1,
    awayScore: 0,
    date: '2026-03-01',
    time: '17:00 BST',
    venue: 'Daudpur Ground',
    status: 'completed',
    result: 'W',
    league: 'Tournament Group Stage',
    stage: 'Group Stage Matchday 2',
    attendance: '2,100',
    referee: 'Kabir Hossain',
    weather: '26°C',
    pitchCondition: 'Good Grass',
    manOfTheMatch: 'Kourov Chakroborty (#11)',
    notes: 'Tactical pressing masterclass to secure group top spot.',
    goals: [
      { minute: 71, scorer: 'Kourov Chakroborty (#11)', assist: 'Sojib Roy (#8)', team: 'home', type: 'Open Play' }
    ],
    stats: {
      possession: [56, 44],
      shots: [10, 6],
      shotsOnTarget: [5, 2],
      xg: [1.4, 0.6],
      corners: [5, 3],
      fouls: [9, 12],
      offsides: [1, 2],
      passAccuracy: [84, 73],
      yellowCards: [1, 2],
      saves: [2, 4]
    }
  },
  {
    id: 'm8',
    homeTeam: 'Titan Force Mulikandi',
    awayTeam: 'Zakigonj United',
    homeScore: undefined,
    awayScore: undefined,
    date: '2026-11-15',
    time: '16:00 BST',
    venue: 'Mulikandi High School Ground',
    status: 'upcoming',
    league: 'Sylhet Regional Cup',
    stage: 'Regional Derby Clash',
    attendance: '2,500 Expected',
    referee: 'Official DFA Referee TBD',
    weather: '24°C Projected, Clear Skies',
    pitchCondition: 'Mulikandi Home Grass',
    notes: 'Major regional derby! Stands and supporter pavilions open from 2 PM. Free entry for all Mulikandi residents.'
  },
  {
    id: 'm9',
    homeTeam: 'Duronto FC Sylhet',
    awayTeam: 'Titan Force Mulikandi',
    homeScore: undefined,
    awayScore: undefined,
    date: '2026-11-28',
    time: '17:30 BST',
    venue: 'Sylhet District Stadium',
    status: 'upcoming',
    league: 'Super Challenge Cup',
    stage: 'City Super Match',
    attendance: '4,000 Expected',
    referee: 'National Referee Panel',
    weather: '23°C Evening Floodlights',
    pitchCondition: 'National Standard Turf',
    notes: 'Away fixture under the floodlights at Sylhet District Stadium.'
  }
];

export const TROPHIES_DATA: Trophy[] = [
  {
    id: 't1',
    name: 'Daudpur Football Tournament',
    year: 2026,
    category: 'Regional Championship',
    description: 'Triumphant victory at the prestigious Daudpur Tournament 2026. Titan Force displayed unbreakable resolve, overcoming tough opponents including Daudpur Rising Titans in the grand final.',
    descriptionBn: '২০২৬ সালের সম্মানজনক দাউদপুর ফুটবল টুর্নামেন্টে ঐতিহাসিক চ্যাম্পিয়নশিপ অর্জন। ফাইনালে দুর্দান্ত ফুটবল প্রদর্শন করে ট্রফি ঘরে তোলে টাইটান ফোর্স মুলিকান্দি।',
    venue: 'Daudpur Stadium',
    opponent: 'Daudpur Rising Titans',
    score: '1 - 0',
    highlight: 'Undefeated tournament run with 4 clean sheets in 5 fixtures.'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'kit-17-shekhor',
    name: 'Titan Force Official Kit 17 - Shekhor Jersey',
    description: 'Official match jersey worn by captain Shekhor Mohan Roy #17. Engineered with breathable moisture-wicking aerodynamic fabric, featuring the embroidered Titan Force crest, bold red-and-black gradient armor stripes, and premium sublimated numbering.',
    price: 499,
    currency: 'BDT',
    imageUrl: '/shop/kit-17-shekhor.png',
    category: 'Official Kit',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Titan Red & Night Black'],
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    features: [
      'Pro-grade breathable micro-mesh',
      'Anti-odor & quick-dry sports technology',
      'Official woven Titan Force silicone badge',
      'Sublimated Number 17 & Shekhor typography',
      'Regular athletic fit engineered for match performance'
    ]
  },
  {
    id: 'titan-training-tee',
    name: 'Titans Core Training Tee 2026',
    description: 'Lightweight high-mobility pre-match warm-up tee. Designed for intense training sessions at Mulikandi High School ground.',
    price: 349,
    currency: 'BDT',
    imageUrl: '/shop/kit-17-shekhor.png',
    category: 'Training',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal Black / Crimson'],
    inStock: true,
    rating: 4.7,
    reviewsCount: 14,
    features: [
      'Ultralight 140 GSM polyester blend',
      'High-stretch mobility panels',
      'Reflective club crest detail'
    ]
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'n1',
    title: 'Titan Force Crowned Daudpur 2026 Tournament Champions',
    titleBn: 'দাউদপুর টুর্নামেন্ট ২০২৬ চ্যাম্পিয়ন হলো টাইটান ফোর্স মুলিকান্দি',
    summary: 'A breathtaking 1-0 triumph against Daudpur Rising Titans sealed the championship trophy for Mulikandi.',
    summaryBn: 'রোমাঞ্চকর ফাইনালে ১-০ গোলের জয় নিয়ে শিরোপা নিজেদের করে নিল টাইটান ফোর্স।',
    date: 'August 4, 2026',
    category: 'Tournament',
    imageUrl: '/src/assets/images/titan_trophy_celebration_1792594584475.jpg',
    readTime: '3 min read'
  },
  {
    id: 'n2',
    title: 'Mulikandi High School Pitch Roars in 2-1 Home Derby Victory',
    titleBn: 'মুলিকান্দি উচ্চ বিদ্যালয় মাঠে ২-১ গোলের চোখধাঁধানো জয়',
    summary: 'Over 1,800 local supporters packed the ground as Titan Force scored a stoppage-time stunner against Hamindopur.',
    summaryBn: 'হাজারো দর্শকের গর্জনে ঘরের মাঠে হামিনদপুরকে পরাজিত করে টাইটান ফোর্স।',
    date: 'February 9, 2026',
    category: 'Match Report',
    imageUrl: '/src/assets/images/titan_stadium_fans_1792594584092.jpg',
    readTime: '4 min read'
  },
  {
    id: 'n3',
    title: 'Official 2026 Match Kit 17 Launched for Supporters Worldwide',
    titleBn: 'সমর্থকদের জন্য এলো অফিশিয়াল ম্যাচ কিট ১৭ জার্সি',
    summary: 'The iconic Red & Black Shekhor #17 jersey is now available for direct order across Zakigonj and Sylhet.',
    summaryBn: 'লাল-কালো শেকড় ১৭ অফিশিয়াল জার্সি এখন সমর্থকদের জন্য উন্মুক্ত।',
    date: 'October 14, 2026',
    category: 'Club Store',
    imageUrl: '/src/assets/images/titan_match_action_1792594583613.jpg',
    readTime: '2 min read'
  }
];

export const CLUB_INFO = {
  name: 'Titan Force Mulikandi',
  nameBn: 'টাইটান ফোর্স মুলিকান্দি',
  nickname: 'The Titans / রেড & ব্ল্যাক আর্মি',
  founded: 2025,
  location: 'Mulikandi, Zakigonj, Sylhet, Bangladesh',
  locationBn: 'মুলিকান্দি, জকিগঞ্জ, সিলেট, বাংলাদেশ',
  homeGround: 'Mulikandi High School Ground',
  homeGroundBn: 'মুলিকান্দি উচ্চ বিদ্যালয় মাঠ',
  phone: '+8809697377938',
  email: 'titanforcemulikandi@gmail.com',
  motto: 'Pride of Mulikandi. Power of the Titans.',
  mottoBn: 'মুলিকান্দির গর্ব। টাইটানদের শক্তি।',
  description: "Titan Force FC is more than a football club — it is a brotherhood forged on the grassroots pitches of Mulikandi, Zakigonj, Sylhet. Driven by courage, unity, and an unbreakable winning mentality.",
  descriptionBn: "টাইটান ফোর্স মুলিকান্দি শুধু একটি ফুটবল দল নয় — এটি মুলিকান্দির মাটির সাথে যুক্ত এক অবিচ্ছেদ্য ভ্রাতৃত্ব ও শক্তির প্রতীক।",
  values: [
    {
      title: 'Passion',
      titleBn: 'আবেগ ও উদ্দীপনা',
      desc: 'We play with intense heart and energy, honoring our badge in every challenge.',
      descBn: 'প্রতিটি পদক্ষেপে আমরা খেলি হৃদয়ের গভীর থেকে, ক্লাবের মর্যাদার জন্য।'
    },
    {
      title: 'Unity',
      titleBn: 'ঐক্য ও ভ্রাতৃত্ব',
      desc: 'Players, coaching staff, families, and village supporters move as one unstoppable unit.',
      descBn: 'খেলোয়াড়, টিম ম্যানেজমেন্ট ও মুলিকান্দির সমর্থক সবাই এক পরিবার।'
    },
    {
      title: 'Progress',
      titleBn: 'উন্নতি ও লক্ষ্য',
      desc: 'Every match teaches us to elevate our tactical discipline and physical standards.',
      descBn: 'প্রতিটি ম্যাচ আমাদের দেয় নতুন অনুপ্রেরণা এবং খেলার মান বাড়ানোর দীক্ষা।'
    },
    {
      title: 'Resilience',
      titleBn: 'অদম্য সাহস',
      desc: 'No lead is taken for granted, and no challenge is ever conceded.',
      descBn: 'মাঠে কখনো হাল না ছেড়ে শেষ বাঁশি পর্যন্ত লড়াই করার মানসিকতা।'
    }
  ]
};

export const TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      squad: 'Squad',
      fixtures: 'Fixtures',
      trophies: 'Honours',
      store: 'Club Store',
      about: 'About Club',
      contact: 'Contact'
    },
    hero: {
      tagline: 'Pride of Mulikandi · Power of the Titans',
      headline: 'FORGED IN MULIKANDI. BOUND FOR GLORY.',
      subtitle: 'Zakigonj’s premier football club. Defending champions of the Daudpur Tournament 2026, building the next generation of football icons.',
      viewSquad: 'View Squad Roster',
      orderKit: 'Order Official Kit 17',
      nextMatch: 'Upcoming Matchday',
      vs: 'VS'
    },
    stats: {
      matches: 'Official Matches',
      wins: 'Victories',
      winRate: 'Win Ratio',
      trophyCount: 'Major Honours',
      cleanSheets: 'Clean Sheets'
    },
    squad: {
      title: 'First Team Squad',
      subtitle: 'Meet the 10 elite Titans representing Mulikandi on the pitch with pride and power',
      filterAll: 'All Positions',
      filterGk: 'Goalkeepers',
      filterDef: 'Defenders',
      filterMid: 'Midfielders',
      filterFwd: 'Forwards',
      viewProfile: 'Full Profile',
      votePlayer: 'Vote for Player',
      voted: 'Voted!',
      captain: 'Club Captain'
    },
    matches: {
      title: 'Match Centre & Results',
      subtitle: 'Track our competitive campaign across Sylhet and grassroots tournaments',
      tabRecent: 'Recent Results',
      tabUpcoming: 'Upcoming Fixtures',
      matchReport: 'Match Recap',
      venue: 'Venue',
      league: 'Competition'
    },
    trophy: {
      title: 'Trophy Cabinet & Honours',
      subtitle: 'Championship milestones forged through relentless grit and teamwork',
      champion: 'Champions',
      viewStory: 'Championship Journey'
    },
    store: {
      title: 'Official Club Merchandise',
      subtitle: 'Wear the colors of Mulikandi. Authentic match jerseys and supporter gear delivered to your door',
      buyNow: 'Order Now',
      inStock: 'In Stock',
      selectSize: 'Select Size',
      orderSuccess: 'Order placed successfully! We will contact you at your phone number.',
      currency: '৳'
    },
    about: {
      title: 'Our Roots & Legacy',
      subtitle: 'The history, mission, and people behind Titan Force Football Club'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Reach out for club trials, sponsorship inquiries, friendly fixtures, or supporter relations',
      sendMsg: 'Send Message',
      successMsg: 'Thank you! Your message has been sent to Titan Force Mulikandi management.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Your Message'
    }
  },
  bn: {
    nav: {
      home: 'মূলপাতা',
      squad: 'স্কোয়াড',
      fixtures: 'ম্যাচ সূচি',
      trophies: 'ট্রফি ও সম্মাননা',
      store: 'ক্লাব স্টোর',
      about: 'ক্লাব সম্পর্কে',
      contact: 'যোগাযোগ'
    },
    hero: {
      tagline: 'মুলিকান্দির গর্ব · টাইটানদের শক্তি',
      headline: 'মুলিকান্দির মাটিতে তৈরি, বিজয়ের দৃপ্ত শপথে অটল।',
      subtitle: 'জকিগঞ্জ, সিলেটের গর্বিত ফুটবল ক্লাব। ২০২৬ সালের দাউদপুর টুর্নামেন্ট চ্যাম্পিয়ন। তৃণমূল থেকে আগামীর তারকা তৈরির অগ্রদূত।',
      viewSquad: 'প্লেয়ার স্কোয়াড দেখুন',
      orderKit: 'অফিশিয়াল কিট ১৭ কিনুন',
      nextMatch: 'পরবর্তী ম্যাচ',
      vs: 'বনাম'
    },
    stats: {
      matches: 'অফিসিয়াল ম্যাচ',
      wins: 'বিজয়',
      winRate: 'জয়ের হার',
      trophyCount: 'শিরোপা',
      cleanSheets: 'ক্লিন শিট'
    },
    squad: {
      title: 'টাইটান ফোর্স স্কোয়াড',
      subtitle: 'মুলিকান্দির প্রতিনিধিত্বকারী ১০ জন সাহসী ফুটবলার',
      filterAll: 'সব পজিশন',
      filterGk: 'গোলকিপার',
      filterDef: 'ডিফেন্ডার',
      filterMid: 'মিডফিল্ডার',
      filterFwd: 'ফরওয়ার্ড',
      viewProfile: 'প্রোফাইল দেখুন',
      votePlayer: 'ভোট দিন',
      voted: 'ভোট দেওয়া হয়েছে!',
      captain: 'ক্লাব ক্যাপ্টেন'
    },
    matches: {
      title: 'ম্যাচ সেন্টার ও ফলাফল',
      subtitle: 'আমাদের সব ম্যাচ ফলাফল ও আসন্ন খেলার সময়সূচি',
      tabRecent: 'সাম্প্রতিক ফলাফল',
      tabUpcoming: 'আসন্ন ম্যাচ',
      matchReport: 'ম্যাচ বিবরণী',
      venue: 'মাঠ',
      league: 'টুর্নামেন্ট'
    },
    trophy: {
      title: 'শিরোপা ও গৌরবগাঁথা',
      subtitle: 'কঠোর পরিশ্রম আর অটুট একতায় গড়া ঐতিহাসিক জয়',
      champion: 'চ্যাম্পিয়ন',
      viewStory: 'বিজয়ের গল্প'
    },
    store: {
      title: 'অফিশিয়াল ক্লাব স্টোর',
      subtitle: 'গর্বের সাথে পরুন মুলিকান্দির লাল-কালো জার্সি',
      buyNow: 'অর্ডার করুন',
      inStock: 'স্টকে আছে',
      selectSize: 'সাইজ নির্বাচন করুন',
      orderSuccess: 'আপনার অর্ডারটি সফল হয়েছে! শীঘ্রই আপনার নম্বরে যোগাযোগ করা হবে।',
      currency: '৳'
    },
    about: {
      title: 'আমাদের পরিচিতি ও আদর্শ',
      subtitle: 'টাইটান ফোর্স ক্লাবের ইতিহাস, মূল্যবোধ ও স্বপ্ন'
    },
    contact: {
      title: 'যোগাযোগ করুন',
      subtitle: 'যেকোনো তথ্য, ম্যাচ আমন্ত্রণ বা স্পনসরশিপের জন্য আমাদের সাথে কথা বলুন',
      sendMsg: 'বার্তা পাঠান',
      successMsg: 'ধন্যবাদ! আপনার বার্তাটি ক্লাব ম্যানেজমেন্টের কাছে সফলভাবে পৌঁছেছে।',
      name: 'আপনার নাম',
      email: 'ইমেইল ঠিকানা',
      phone: 'ফোন নম্বর',
      subject: 'বিষয়',
      message: 'আপনার বার্তা'
    }
  }
};

export const getPlayerByIdOrNum = (val: string | number): Player | undefined => {
  const numVal = Number(val);
  if (!isNaN(numVal)) {
    // Crucial: check jersey number (num) first, then fallback to id
    const byJersey = PLAYERS_DATA.find(p => p.num === numVal);
    if (byJersey) return byJersey;
    const byId = PLAYERS_DATA.find(p => p.id === numVal);
    if (byId) return byId;
  }
  const str = String(val).toLowerCase().trim();
  return PLAYERS_DATA.find(p => 
    p.name.toLowerCase() === str || 
    p.fullName.toLowerCase().includes(str)
  );
};

export const getMatchById = (id: string): Match | undefined => {
  return MATCHES_DATA.find(m => m.id === id);
};

