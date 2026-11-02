export type PlayerCount = 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface FormationPlayerNode {
  playerNum: number;
  role: string; // e.g., 'GK', 'CB', 'LB', 'RB', 'CM', 'CAM', 'RW', 'LW', 'ST'
  roleNameEn: string;
  roleNameBn: string;
  x: number; // percentage (0-100) left to right
  y: number; // percentage (0-100) top to bottom (y=88 is GK, y=16 is Striker)
  tacticalInstructionEn: string;
  tacticalInstructionBn: string;
}

export interface FormationStrategy {
  attackEn: string;
  attackBn: string;
  defenseEn: string;
  defenseBn: string;
  transitionEn: string;
  transitionBn: string;
  captainDirectiveEn: string;
  captainDirectiveBn: string;
  strengthsEn: string[];
  strengthsBn: string[];
  watchoutsEn: string[];
  watchoutsBn: string[];
  metrics: {
    pressing: number; // 0-100
    possession: number; // 0-100
    counterAttack: number; // 0-100
    compactness: number; // 0-100
    width: number; // 0-100
  };
}

export interface TacticalFormation {
  id: string;
  name: string;
  code: string;
  playerCount: PlayerCount;
  labelEn: string;
  labelBn: string;
  categoryTag: string;
  formationStyleEn: string;
  formationStyleBn: string;
  summaryEn: string;
  summaryBn: string;
  startingXI: number[]; // Array of playerNum (length matches playerCount)
  positions: FormationPlayerNode[];
  strategy: FormationStrategy;
}

export interface FormatGroup {
  playerCount: PlayerCount;
  nameEn: string;
  nameBn: string;
  subtitleEn: string;
  subtitleBn: string;
  recommendedPitchEn: string;
  recommendedPitchBn: string;
  formations: TacticalFormation[];
}

export const TACTICAL_FORMATS_DATA: Record<PlayerCount, FormatGroup> = {
  // ==========================================
  // 5-A-SIDE FORMATIONS (5 PLAYERS)
  // ==========================================
  5: {
    playerCount: 5,
    nameEn: '5-a-Side (Futsal & Mini-Pitch)',
    nameBn: '৫ জনের দল (মিনি পিচ ও ফুটসাল)',
    subtitleEn: 'High-octane agility, quick 1-2 passing, and rapid transitions in tight spaces.',
    subtitleBn: 'দ্রুত ১-২ পাসিং, স্কিল ও সীমিত জায়গায় গতিশীল ফুটসাল কৌশল।',
    recommendedPitchEn: 'Mulikandi Indoor / High School Compact Cage',
    recommendedPitchBn: 'মুলিকান্দি ইন্ডোর / ছোট মাঠ',
    formations: [
      {
        id: '5-1-2-1',
        name: '1-2-1 (The Diamond)',
        code: '1-2-1',
        playerCount: 5,
        labelEn: 'Diamond Balance',
        labelBn: 'ডায়মন্ড ভারসাম্য',
        categoryTag: 'Fluid Agility',
        formationStyleEn: 'Fast Triangular Possession & Diamond Pivot',
        formationStyleBn: 'ত্রিভুজাকার পাসিং ও ডায়মন্ড পিভট কৌশল',
        summaryEn: 'The gold standard in 5-player football. Offers defensive width and central striker finishing with Captain Shekhor locking down the backline.',
        summaryBn: '৫ জনের খেলায় সেরা ব্যালেন্স। অধিনায়ক শেখর নিচে দেয়াল গড়েন এবং উইঙ্গাররা দ্রুত আক্রমণ শানান।',
        startingXI: [1, 17, 10, 7, 9], // GK, Shekhor, Anik, Shuvo, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Sweeper Keeper', roleNameBn: 'সুইপার কিপার', x: 50, y: 88, tacticalInstructionEn: 'Act as secondary distributor and close down angles.', tacticalInstructionBn: 'দ্রুত বল এগিয়ে দেওয়া এবং অ্যাঙ্গেল কভার করা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Anchor Defender (C)', roleNameBn: 'অ্যাঙ্কর ডিফেন্ডার (অধিনায়ক)', x: 50, y: 70, tacticalInstructionEn: 'Break opposition counters, distribute to flanks with surgical passes.', tacticalInstructionBn: 'প্রতিপক্ষের কাউন্টার আটকে উইংয়ে সঠিক পাস দেওয়া।' },
          { playerNum: 10, role: 'CM', roleNameEn: 'Central Pivot Playmaker', roleNameBn: 'সেন্ট্রাল প্লেমেকার', x: 28, y: 46, tacticalInstructionEn: 'Tempo conductor, high energy box-to-box work rate.', tacticalInstructionBn: 'মাঝমাঠে বলের গতি নিয়ন্ত্রণ ও রক্ষণকে সহায়তা।' },
          { playerNum: 7, role: 'RM', roleNameEn: 'Explosive Right Winger', roleNameBn: 'ডানপ্রান্তীয় উইঙ্গার', x: 72, y: 46, tacticalInstructionEn: 'Overload flank and supply pinpoint low crosses.', tacticalInstructionBn: 'ডান প্রান্ত চিরে বক্সে নিখুঁত পাস দেওয়া।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Target Striker', roleNameBn: 'টার্গেট স্ট্রাইকার', x: 50, y: 22, tacticalInstructionEn: 'High pressing and lethal first-touch finishing.', tacticalInstructionBn: 'সামনে হাই প্রেস এবং বক্সে নিশ্চিত ফিনিশিং।' },
        ],
        strategy: {
          attackEn: 'Quick one-touch give-and-go triangles creating overloads on either flank.',
          attackBn: 'দ্রুত ওয়ান-টাচ ওয়ান-টু পাসের মাধ্যমে দুই প্রান্তে প্রতিপক্ষকে পরাস্ত করা।',
          defenseEn: 'Captain Shekhor marshals a 1-2 compact block, pushing opponents into corners.',
          defenseBn: 'অধিনায়ক শেখরের নেতৃত্বে জমাট রক্ষণ, প্রতিপক্ষকে বাইরে ঠেলে দেওয়া।',
          transitionEn: 'Instant ball recovery turns into immediate 3-man offensive counter-surge.',
          transitionBn: 'বল পেলেই মুহূর্তের মধ্যে ৩ জন খেলোয়াড়ের প্রতি-আক্রমণ।',
          captainDirectiveEn: '"Stay disciplined in the diamond. Never allow through-balls down the middle. Release the ball on 2 touches maximum!" — Shekhor Mohan Ray',
          captainDirectiveBn: '"ডায়মন্ডের শেপ ধরে রাখো। মাঝখান দিয়ে কোনো বল যেন না যায়। সর্বোচ্চ দুই টাচে পাস দাও!" — শেখর মোহন রায়',
          strengthsEn: ['Continuous passing triangles', 'Defensive stability through central anchor', 'Seamless role swapping'],
          strengthsBn: ['নিরবচ্ছিন্ন পাসিং ট্রায়াঙ্গেল', 'কেন্দ্রীয় ডিফেন্ডারের নির্ভরযোগ্যতা', 'সহজ পজিশন অদলবদল'],
          watchoutsEn: ['Vulnerable if lone CB is drawn out wide', 'Requires extreme stamina from wingers'],
          watchoutsBn: ['ডিফেন্ডার বাইরে গেলে ফাঁকা জায়গা সৃষ্টি', 'উইঙ্গারদের প্রচুর দম প্রয়োজন'],
          metrics: { pressing: 88, possession: 82, counterAttack: 85, compactness: 90, width: 68 }
        }
      },
      {
        id: '5-2-2',
        name: '2-2 (The Box)',
        code: '2-2',
        playerCount: 5,
        labelEn: 'Solid Box',
        labelBn: 'বক্স বাফার',
        categoryTag: 'Ultra Compact',
        formationStyleEn: 'Two Banks of Two with Overlapping Shifts',
        formationStyleBn: 'দুই স্তরের ব্লক ও ওভারল্যাপিং আক্রমণ',
        summaryEn: 'High defensive rigidity. Two disciplined defenders paired with two dynamic forwards who track back when losing possession.',
        summaryBn: 'রক্ষণভাগে সর্বোচ্চ শৃঙ্খলা। দুজন ডিফেন্ডার ও দুজন ফরোয়ার্ডের যৌথ সমন্বয়।',
        startingXI: [1, 17, 4, 10, 9], // GK, Shekhor, Tonmoy, Anik, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goal Guardian', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Command penalty territory.', tacticalInstructionBn: 'ডি-বক্সের সম্পূর্ণ নিয়ন্ত্রণ রাখা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Right Stopper (C)', roleNameBn: 'রাইট স্টপার (অধিনায়ক)', x: 68, y: 72, tacticalInstructionEn: 'Lock down right channel, step into midfield when pressing.', tacticalInstructionBn: 'ডান প্রান্ত পাহারা ও সুযোগমতো মাঝমাঠে ওঠা।' },
          { playerNum: 4, role: 'CB', roleNameEn: 'Left Stopper', roleNameBn: 'লেফট স্টপার', x: 32, y: 72, tacticalInstructionEn: 'Physical duels and aerial clearances.', tacticalInstructionBn: 'শারীরিক ট্যাকল ও বল ক্লিয়ারেন্স।' },
          { playerNum: 10, role: 'CAM', roleNameEn: 'Attacking Engine', roleNameBn: 'অ্যাটাকিং ইঞ্জিন', x: 34, y: 32, tacticalInstructionEn: 'Link play between backline and front duo.', tacticalInstructionBn: 'ডিফেন্স ও অ্যাটাকের সংযোগ বজায় রাখা।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Predatory Finisher', roleNameBn: 'স্ট্রাইকার', x: 66, y: 30, tacticalInstructionEn: 'Press enemy distributor, shoot on sight.', tacticalInstructionBn: 'সামনে বল পেয়েই শট নেওয়া।' },
        ],
        strategy: {
          attackEn: 'Staggered vertical runs: one striker drops while the other pierces behind.',
          attackBn: 'একজন ফরোয়ার্ড নিচে নেমে পাস নেবে, অন্যজন সুযোগ বুঝে বক্সে ঢুকবে।',
          defenseEn: 'Two disciplined walls of two blocking all central passing corridors.',
          defenseBn: 'মাঝমাঠের সব করিডোর বন্ধ করে দুই স্তরের জমাট দেয়াল।',
          transitionEn: 'Direct passes to target striker Sajon with midfield runner trailing for rebounds.',
          transitionBn: 'সরাসরি সজনের কাছে বল দেওয়া এবং রিবাউন্ডে আক্রমণ করা।',
          captainDirectiveEn: '"Stay glued to our markers. If Tonmoy steps up, I cover the line. Nobody gets an easy shot!" — Shekhor',
          captainDirectiveBn: '"মার্কিং কোনোভাবেই মিস করা যাবে না। তন্ময় সামনে গেলে আমি পেছনে কভার দেব।" — শেখর',
          strengthsEn: ['Near impossible to break down centrally', 'Physical dominance in duels', 'Clear individual responsibilities'],
          strengthsBn: ['মাঝখান দিয়ে প্রবেশ করা প্রায় অসম্ভব', 'ট্যাকলে শারীরিক শ্রেষ্ঠত্ব', 'স্পষ্ট দায়িত্ব বণ্টন'],
          watchoutsEn: ['Can lack width if wingers do not pull wide', 'Stagnant build-up if midfield drops too deep'],
          watchoutsBn: ['প্রস্থ কম থাকলে আক্রমণ আটকে যেতে পারে', 'বেশি ডিফেন্সিভ হয়ে পড়ার ঝুঁকি'],
          metrics: { pressing: 75, possession: 70, counterAttack: 92, compactness: 95, width: 60 }
        }
      }
    ]
  },

  // ==========================================
  // 6-A-SIDE FORMATIONS (6 PLAYERS)
  // ==========================================
  6: {
    playerCount: 6,
    nameEn: '6-a-Side (Dynamic Arena)',
    nameBn: '৬ জনের দল (ডাইনামিক অ্যারেনা)',
    subtitleEn: 'Expanded tactical flexibility with dedicated midfield anchors and width.',
    subtitleBn: 'মাঝমাঠের বাড়তি নিয়ন্ত্রণ ও দুই উইংয়ে গতিশীল সমন্বয়।',
    recommendedPitchEn: 'Grassroots Small Field / Mulikandi North Ground',
    recommendedPitchBn: 'তৃণমূল ছোট মাঠ / মুলিকান্দি উত্তর মাঠ',
    formations: [
      {
        id: '6-2-2-1',
        name: '2-2-1 (Balanced Backbone)',
        code: '2-2-1',
        playerCount: 6,
        labelEn: 'Balanced 6s',
        labelBn: 'ভারসাম্যপূর্ণ ৬',
        categoryTag: 'Standard 6s',
        formationStyleEn: 'Solid Twin Centerbacks with Mobile Dual Midfield',
        formationStyleBn: 'দুই নির্ভরযোগ্য ডিফেন্ডার ও গতিশীল মিডফিল্ড',
        summaryEn: 'Classic 6-a-side shape. Two defensive pillars provide insurance while two central midfielders support the lone hitman.',
        summaryBn: '৬ জনের আদর্শ দল। শেখর ও তন্ময়ের বিশ্বস্ত রক্ষণ, মিডফিল্ডে শান্ত-অনিত এবং সামনে সজন।',
        startingXI: [1, 17, 4, 8, 10, 9], // GK, Shekhor, Tonmoy, Shanto, Anik, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goalkeeper', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Organize the back wall.', tacticalInstructionBn: 'ডিফেন্স দেয়াল সাজিয়ে রাখা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Commanding CB (C)', roleNameBn: 'অধিনায়ক ও সেন্ট্রাল ব্যাক', x: 65, y: 72, tacticalInstructionEn: 'Command backline, initiate line-breaking diagonal passes.', tacticalInstructionBn: 'রক্ষণ নিয়ন্ত্রণ ও ডায়াগনাল পাস দেওয়া।' },
          { playerNum: 4, role: 'CB', roleNameEn: 'Stopper CB', roleNameBn: 'স্টপার সিবি', x: 35, y: 72, tacticalInstructionEn: 'Aggressive man-marking.', tacticalInstructionBn: 'প্রতিপক্ষের ফরোয়ার্ডকে কড়া পাহারা।' },
          { playerNum: 8, role: 'CM', roleNameEn: 'Deep-Lying Midfielder', roleNameBn: 'ডিপ লাইং মিডফিল্ডার', x: 32, y: 48, tacticalInstructionEn: 'Break opposition counter-attacks and distribute.', tacticalInstructionBn: 'কাউন্টার প্রতিহত করা ও বল বাড়ানো।' },
          { playerNum: 10, role: 'CAM', roleNameEn: 'Attacking Playmaker', roleNameBn: 'অ্যাটাকিং প্লেমেকার', x: 68, y: 46, tacticalInstructionEn: 'Drift between channels and create shooting chances.', tacticalInstructionBn: 'ফাঁকা জায়গায় বল বাড়ানো ও দূরপাল্লার শট।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Centre Forward', roleNameBn: 'সেন্টার ফরোয়ার্ড', x: 50, y: 20, tacticalInstructionEn: 'Hold up play, spin past markers to score.', tacticalInstructionBn: 'বল ধরে রেখে বক্সে শট নেওয়া।' },
        ],
        strategy: {
          attackEn: 'Patient build-up through Captain Shekhor feeding Anik, who slides passes to Sajon.',
          attackBn: 'শেখর থেকে অনিকের মাধ্যমে বল নিয়ে বক্সে সজনের কাছে পৌঁছানো।',
          defenseEn: 'Midfield drops into a 4-man low defensive shield whenever possession is lost.',
          defenseBn: 'বল হারালেই মিডফিল্ডাররা নিচে নেমে ৪ জনের দুর্ভেদ্য দুর্গ তৈরি করবে।',
          transitionEn: 'Rapid long-range switch to the opposite wing to catch defenders out of position.',
          transitionBn: 'বিপরীত উইংয়ে দ্রুত লং বল পাঠিয়ে প্রতিপক্ষকে অপ্রস্তুত করা।',
          captainDirectiveEn: '"Patience on the ball. When Anik drives forward, Shanto stays disciplined beside me." — Shekhor',
          captainDirectiveBn: '"ধৈর্য ধরে খেলো। অনিক ওপরে উঠলে শান্ত আমার পাশে থাকবে।" — শেখর',
          strengthsEn: ['Bulletproof defensive spine', 'Balanced spatial coverage', 'Strong central passing lanes'],
          strengthsBn: ['অসাধারণ রক্ষণ মেরুদণ্ড', 'মাঠের সমান ভারসাম্য', 'মাঝমাঠে নিখুঁত পাসিং'],
          watchoutsEn: ['Flanks can be exposed if CMs fail to track wide runners'],
          watchoutsBn: ['উইঙ্গাররা নিচে না নামলে দুই পাশ খালি হওয়ার ঝুঁকি'],
          metrics: { pressing: 80, possession: 85, counterAttack: 80, compactness: 92, width: 72 }
        }
      },
      {
        id: '6-2-1-2',
        name: '2-1-2 (The Hourglass Attack)',
        code: '2-1-2',
        playerCount: 6,
        labelEn: 'Twin Threat',
        labelBn: 'টুইন স্ট্রাইকার',
        categoryTag: 'High Scoring',
        formationStyleEn: 'Aggressive High Press with Double Strikers',
        formationStyleBn: 'ডাবল স্ট্রাইকার ও প্রতিপক্ষের অর্ধে হাই প্রেস',
        summaryEn: 'Designed to score early goals and overwhelm opposing backlines with twin strikers Sajon and Shuvo.',
        summaryBn: 'দ্রুত গোল আদায়ের আক্রমণাত্মক রূপরেখা। সজন ও শুভর যুগলবন্দিতে তীব্র আক্রমণ।',
        startingXI: [1, 17, 5, 10, 7, 9], // GK, Shekhor, Bristo, Anik, Shuvo, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Keeper', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Quick roll-outs.', tacticalInstructionBn: 'দ্রুত হাতে বল বাড়ানো।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Sweeper CB (C)', roleNameBn: 'সুইপার সিবি (অধিনায়ক)', x: 62, y: 74, tacticalInstructionEn: 'Cover depth and orchestrate attacking transitions.', tacticalInstructionBn: 'পেছনে কভার দেওয়া ও আক্রমণ শুরু করা।' },
          { playerNum: 5, role: 'CB', roleNameEn: 'Tackler CB', roleNameBn: 'ট্যাকলার ডিফেন্ডার', x: 38, y: 74, tacticalInstructionEn: 'Win loose balls and feed Anik.', tacticalInstructionBn: 'বল কেড়ে নিয়ে মিডফিল্ডে দেওয়া।' },
          { playerNum: 10, role: 'CM', roleNameEn: 'Regista Playmaker', roleNameBn: 'সেন্ট্রাল প্লেমেকার', x: 50, y: 48, tacticalInstructionEn: 'Dictate tempo, thread passes to strikers.', tacticalInstructionBn: 'দুই স্ট্রাইকারের মাঝে সঠিক থ্রু বল দেওয়া।' },
          { playerNum: 7, role: 'RF', roleNameEn: 'Right Forward', roleNameBn: 'ডান প্রান্তের ফরোয়ার্ড', x: 70, y: 22, tacticalInstructionEn: 'Cut inside, pull defenders, test the goalie.', tacticalInstructionBn: 'ভেতরে ঢুকে ডিফেন্ডার টেনে শট নেওয়া।' },
          { playerNum: 9, role: 'LF', roleNameEn: 'Left Forward', roleNameBn: 'বাম প্রান্তের ফরোয়ার্ড', x: 30, y: 22, tacticalInstructionEn: 'Overload left channel, poach second balls.', tacticalInstructionBn: 'বক্সের ভেতর রিবাউন্ডে লক্ষ্যভেদ।' },
        ],
        strategy: {
          attackEn: 'Double frontline keeps two defenders occupied at all times, opening shooting space for Anik.',
          attackBn: 'দুই ফরোয়ার্ড প্রতিপক্ষকে চাপে রাখবে, ফলে অনিক দূরপাল্লার শটের সুযোগ পাবে।',
          defenseEn: 'High-line trap with Shekhor stepping forward to catch opponents offside.',
          defenseBn: 'শেখর ও বৃষ্টি উঁচু লাইন ধরে প্রতিপক্ষকে আটকে রাখবে।',
          transitionEn: 'Single pass from deep straight to Sajon or Shuvo on the run.',
          transitionBn: 'নিচ থেকে এক পাসে সরাসরি শুভর পায়ে বল পৌঁছে দেওয়া।',
          captainDirectiveEn: '"Press from the front! Sajon and Shuvo, don\'t give their goalie a second to breathe!" — Shekhor',
          captainDirectiveBn: '"সামনে থেকে প্রেস করো! সজন আর শুভ, প্রতিপক্ষের কিপারকে সময় দিও না!" — শেখর',
          strengthsEn: ['Overwhelming offensive presence', 'Constant goal scoring threat', 'Relentless forward pressure'],
          strengthsBn: ['আক্রমণে দুর্দান্ত উপস্থিতি', 'প্রতি মুহূর্তে গোলের সম্ভাবনা', 'সামনের সারির প্রচণ্ড চাপ'],
          watchoutsEn: ['Lone central midfielder Anik must cover vast ground'],
          watchoutsBn: ['একমাত্র মিডফিল্ডার অনিককে প্রচুর দৌড়াতে হবে'],
          metrics: { pressing: 92, possession: 76, counterAttack: 88, compactness: 78, width: 80 }
        }
      }
    ]
  },

  // ==========================================
  // 7-A-SIDE FORMATIONS (7 PLAYERS - TOURNAMENT STANDARD)
  // ==========================================
  7: {
    playerCount: 7,
    nameEn: '7-a-Side (Tournament Standard)',
    nameBn: '৭ জনের দল (টুর্নামেন্ট স্ট্যান্ডার্ড)',
    subtitleEn: 'The hallmark format of the Daudpur 2026 Championship win! Perfect width and tactical balance.',
    subtitleBn: 'দাউদপুর টুর্নামেন্ট ২০২৬ চ্যাম্পিয়ন হওয়ার ঐতিহাসিক ফরম্যাট! নিখুঁত ব্যালেন্স।',
    recommendedPitchEn: 'Daudpur Tournament Official Ground / Mulikandi Arena',
    recommendedPitchBn: 'দাউদপুর টুর্নামেন্ট মাঠ / মুলিকান্দি স্টেডিয়াম মাঠ',
    formations: [
      {
        id: '7-2-3-1',
        name: '2-3-1 (Titan Force Championship Standard)',
        code: '2-3-1',
        playerCount: 7,
        labelEn: 'Championship 2-3-1',
        labelBn: 'চ্যাম্পিয়ন ২-৩-১',
        categoryTag: 'Trophy Winning',
        formationStyleEn: 'High Wing Intensity & Rock Solid Double Central Spine',
        formationStyleBn: 'উইং আক্রমণ ও শক্ত ডিফেন্সের অপ্রতিরোধ্য সমন্বয়',
        summaryEn: 'The exact tactical formation that won Titan Force the Daudpur 2026 Undefeated Trophy. Shekhor anchors the back with Tonmoy while Shuvo and Kourov terrorize the flanks.',
        summaryBn: 'এই ফরম্যাটেই টাইটান ফোর্স অপরাজিত চ্যাম্পিয়ন ট্রফি জিতেছে। শেখর-তন্ময়ের দুর্ভেদ্য রক্ষণ ও দুই উইংয়ে শুভ-কৌরবের তাণ্ডব।',
        startingXI: [1, 17, 4, 10, 7, 11, 9], // GK, Shekhor, Tonmoy, Anik, Shuvo, Kourov, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Clean Sheet Keeper', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Command defensive vocal signals.', tacticalInstructionBn: 'রক্ষণভাগকে নির্দেশ দেওয়া ও সতর্ক রাখা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Titan Commander (C)', roleNameBn: 'সেন্টার ব্যাক ও অধিনায়ক', x: 62, y: 73, tacticalInstructionEn: 'Last man tackle, step up to intercept, ping 40-yard passes.', tacticalInstructionBn: 'শেষ ট্যাকল, বল কেড়ে নেওয়া ও লং বল বাড়ানো।' },
          { playerNum: 4, role: 'CB', roleNameEn: 'Shield Defender', roleNameBn: 'লেফট সেন্টার ব্যাক', x: 38, y: 73, tacticalInstructionEn: 'Stay glued to the striker, protect left corridor.', tacticalInstructionBn: 'বাম প্রান্ত পাহারা ও প্রতিপক্ষকে বক্সে ঢুকতে না দেওয়া।' },
          { playerNum: 10, role: 'CAM', roleNameEn: 'Central Conductor', roleNameBn: 'সেন্ট্রাল প্লেমেকার', x: 50, y: 50, tacticalInstructionEn: 'Distribute effortlessly, link with both wingers and shoot.', tacticalInstructionBn: 'দুই উইংয়ে বল ছড়ানো ও সুযোগ বুঝে দূর থেকে শট।' },
          { playerNum: 11, role: 'LM', roleNameEn: 'Lightning Left Wing', roleNameBn: 'বামপ্রান্তীয় উইঙ্গার', x: 22, y: 44, tacticalInstructionEn: 'Blistering acceleration down the touchline, cut back low.', tacticalInstructionBn: 'বাম প্রান্ত দিয়ে গতিতে ঢুকে নিচু ক্রস বাড়ানো।' },
          { playerNum: 7, role: 'RM', roleNameEn: 'Creative Right Wing', roleNameBn: 'ডানপ্রান্তীয় উইঙ্গার', x: 78, y: 44, tacticalInstructionEn: 'Whip curling crosses to far post, track opponent back.', tacticalInstructionBn: 'দূরবর্তী পোস্টে ক্রস দেওয়া ও নিচে নেমে কভার দেওয়া।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Championship Striker', roleNameBn: 'গোলমেশিন স্ট্রাইকার', x: 50, y: 18, tacticalInstructionEn: 'Lead the press, clinical aerial headers and first-time strikes.', tacticalInstructionBn: 'সামনে বল ধরে রাখা ও নিখুঁত ফিনিশিং।' },
        ],
        strategy: {
          attackEn: 'Overload the flanks with Kourov and Shuvo. Anik arrives at the edge of the box for cutbacks.',
          attackBn: 'দুই উইং দিয়ে আক্রমণ গড়ে বক্সে ক্রস ও অনিকের দূরপাল্লার শট।',
          defenseEn: 'Shekhor and Tonmoy form an impenetrable wall, backed by Anik acting as a screen.',
          defenseBn: 'শেখর ও তন্ময় দুর্ভেদ্য দেয়াল গড়ে তোলে, অনিক সামনে বল প্রতিহত করে।',
          transitionEn: 'Lethal counter-attack: Shekhor intercepts, feeds Shuvo in 1 touch, leading to an immediate 3v2 overload.',
          transitionBn: 'শেখর বল কেড়ে নিয়ে এক টাচে শুভকে দিলে প্রতিপক্ষ অপ্রস্তুত হয়ে পড়বে।',
          captainDirectiveEn: '"This is our winning system! Kourov and Shuvo stretch them wide. Sajon, stay between their center-backs. We control the rhythm!" — Shekhor Mohan Ray',
          captainDirectiveBn: '"এই কৌশলই আমাদের শিরোপা এনে দিয়েছে! শুভ আর কৌরব উইংয়ে জায়গা বের করবে। সজন মাঝে থাকবে।" — শেখর',
          strengthsEn: ['88.9% tournament win rate proven', 'Devastating flank speed', 'Supreme central solidity'],
          strengthsBn: ['৮৮.৯% জয়ের ঐতিহাসিক রেকর্ড', 'উইংয়ে অবিশ্বাস্য গতি', 'মাঝমাঠের চরম নির্ভরযোগ্যতা'],
          watchoutsEn: ['Must prevent opposition counter through gaps between CBs and wingers'],
          watchoutsBn: ['উইঙ্গাররা বেশি ওপরে উঠলে পেছনের জায়গা দ্রুত কভার করতে হবে'],
          metrics: { pressing: 90, possession: 88, counterAttack: 94, compactness: 91, width: 88 }
        }
      },
      {
        id: '7-3-2-1',
        name: '3-2-1 (The Mulikandi Fortress)',
        code: '3-2-1',
        playerCount: 7,
        labelEn: 'Fortress Defense',
        labelBn: 'মুলিকান্দি দুর্গ',
        categoryTag: 'Clean Sheet Focus',
        formationStyleEn: 'Triple Centerback Wall with Quick Wing Transitions',
        formationStyleBn: 'তিন ডিফেন্ডারের দুর্ভেদ্য দেয়াল ও প্রতি-আক্রমণ',
        summaryEn: 'The defensive fortress strategy used to protect leads in knockout finals. Three dedicated defenders guarantee a clean sheet.',
        summaryBn: 'ফাইনাল খেলায় লিড ধরে রাখার জন্য তিন ডিফেন্ডারের অপরাজেয় কৌশল। ক্লিন শিটের নিশ্চয়তা।',
        startingXI: [1, 17, 4, 3, 8, 10, 9], // GK, Shekhor, Tonmoy, Niloy, Shanto, Anik, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goal Sentinel', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Collect high balls safely.', tacticalInstructionBn: 'উঁচু বল নিরাপদে ধরা।' },
          { playerNum: 3, role: 'LB', roleNameEn: 'Left Defensive Wall', roleNameBn: 'লেফট ব্যাক', x: 24, y: 72, tacticalInstructionEn: 'Neutralize opposing right winger completely.', tacticalInstructionBn: 'প্রতিপক্ষের উইঙ্গারকে আটকে রাখা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Central Commander (C)', roleNameBn: 'সেন্টার ব্যাক ও অধিনায়ক', x: 50, y: 74, tacticalInstructionEn: 'Command offside line, clear danger, sweep second balls.', tacticalInstructionBn: 'রক্ষণভাগকে পরিচালনা ও সব বিপদ দূর করা।' },
          { playerNum: 4, role: 'RB', roleNameEn: 'Right Defensive Wall', roleNameBn: 'রাইট ব্যাক', x: 76, y: 72, tacticalInstructionEn: 'Aggressive physical challenges.', tacticalInstructionBn: 'প্রতিপক্ষের আক্রমণ রুখে দেওয়া।' },
          { playerNum: 8, role: 'DM', roleNameEn: 'Defensive Anchor', roleNameBn: 'ডিফেন্সিভ মিডফিল্ডার', x: 38, y: 48, tacticalInstructionEn: 'Sweep loose passes, tackle without fouling.', tacticalInstructionBn: 'ফাউল না করে বল কেড়ে নেওয়া।' },
          { playerNum: 10, role: 'CAM', roleNameEn: 'Counter Outlet', roleNameBn: 'কাউন্টার প্লেমেকার', x: 62, y: 46, tacticalInstructionEn: 'Break free and deliver killer long balls.', tacticalInstructionBn: 'দ্রুত সামনে বল পাঠানো।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Lone Hunter', roleNameBn: 'স্ট্রাইকার', x: 50, y: 20, tacticalInstructionEn: 'Hold ball until midfield arrives, draw fouls in final third.', tacticalInstructionBn: 'বল ধরে রাখা ও ফাউল আদায় করা।' },
        ],
        strategy: {
          attackEn: 'Direct counter-strikes targeting spaces behind pressing fullbacks.',
          attackBn: 'প্রতিপক্ষের খালি জায়গায় দ্রুত লং পাস দিয়ে প্রতি-আক্রমণ।',
          defenseEn: 'Three defenders and a holding midfielder create a 4-man concrete barrier inside the D-box.',
          defenseBn: 'ডি-বক্সের সামনে চার জনের কংক্রিট প্রাচীর গড়ে তোলা।',
          transitionEn: 'Deep recovery and high-arching cross-pitch release to Sajon Biswas.',
          transitionBn: 'নিচ থেকে লম্বা ক্লিয়ারেন্স দিয়ে সজনকে দিয়ে গোল আদায়।',
          captainDirectiveEn: '"Nobody crosses our 18-yard box! Communicate loudly. Keep the clean sheet intact!" — Shekhor',
          captainDirectiveBn: '"বক্সের ভেতর কাউকে ঢুকতে দেবে না! কথা বলে খেলো। কোনো গোল খাওয়া চলবে না!" — শেখর',
          strengthsEn: ['Virtually impenetrable defense', 'Dominant aerial clearance', 'Eliminates opponent central threat'],
          strengthsBn: ['ভেঙে ফেলা অসম্ভব এমন রক্ষণ', 'উঁচু বলে একচ্ছত্র আধিপত্য', 'প্রতিপক্ষের শক্তি নিষ্ক্রিয় করা'],
          watchoutsEn: ['Lone striker Sajon can become isolated without quick midfield support'],
          watchoutsBn: ['সজন একা হয়ে পড়তে পারে যদি অনিক সময়মতো ওপরে না ওঠে'],
          metrics: { pressing: 72, possession: 68, counterAttack: 95, compactness: 98, width: 65 }
        }
      }
    ]
  },

  // ==========================================
  // 8-A-SIDE FORMATIONS (8 PLAYERS)
  // ==========================================
  8: {
    playerCount: 8,
    nameEn: '8-a-Side (Intermediate Pitch)',
    nameBn: '৮ জনের দল (মাঝারি মাঠ)',
    subtitleEn: 'Enhanced passing triangles, dedicated fullbacks, and coordinated midfield control.',
    subtitleBn: 'উন্নত পাসিং ট্রায়াঙ্গেল, পূর্ণ ফুলব্যাক ও মাঝমাঠের আধিপত্য।',
    recommendedPitchEn: 'Mulikandi Secondary Pitch / Sub-District Cup',
    recommendedPitchBn: 'মুলিকান্দি মধ্যম মাঠ / উপজেলা কাপ গ্রাউন্ড',
    formations: [
      {
        id: '8-3-3-1',
        name: '3-3-1 (Complete Control)',
        code: '3-3-1',
        playerCount: 8,
        labelEn: 'Controlled 8s',
        labelBn: 'নিয়ন্ত্রিত ৮',
        categoryTag: 'Possession Mastery',
        formationStyleEn: 'Triple Line Symmetry with Wingback Support',
        formationStyleBn: 'তিন স্তরের সুষম গঠন ও উইংব্যাকের সহায়তা',
        summaryEn: 'Equally balanced across all thirds. Three defenders, three midfielders forming triangles, and a central finisher.',
        summaryBn: 'মাঠজুড়ে অসাধারণ ভারসাম্য। তিন ডিফেন্ডার, তিন মিডফিল্ডার ও গোলশিকারি স্ট্রাইকার।',
        startingXI: [1, 17, 4, 3, 8, 10, 7, 9], // GK, Shekhor, Tonmoy, Niloy, Shanto, Anik, Shuvo, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goal Warden', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Distribute short to fullbacks.', tacticalInstructionBn: 'ফুলব্যাকদের ছোট পাসে বল বাড়ানো।' },
          { playerNum: 3, role: 'LB', roleNameEn: 'Left Fullback', roleNameBn: 'লেফট ব্যাক', x: 22, y: 73, tacticalInstructionEn: 'Hold width, advance on overlap.', tacticalInstructionBn: 'বাম প্রান্ত ধরে খেলা ও ওপরে ওঠা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Central Pillar (C)', roleNameBn: 'সেন্ট্রাল পিলার (অধিনায়ক)', x: 50, y: 75, tacticalInstructionEn: 'Lead defensive shape, distribute diagonally.', tacticalInstructionBn: 'ডিফেন্স সাজানো ও ডায়াগনাল পাস ছড়ানো।' },
          { playerNum: 4, role: 'RB', roleNameEn: 'Right Fullback', roleNameBn: 'রাইট ব্যাক', x: 78, y: 73, tacticalInstructionEn: 'Contain opponent wing, cover CB.', tacticalInstructionBn: 'ডান প্রান্ত পাহারা ও মাঝমাঠ কভার করা।' },
          { playerNum: 8, role: 'DM', roleNameEn: 'Defensive Anchor', roleNameBn: 'ডিফেন্সিভ মিডফিল্ড', x: 50, y: 54, tacticalInstructionEn: 'Shield center backs, break up plays.', tacticalInstructionBn: 'সেন্টার ব্যাকের সামনে ঢাল হওয়া।' },
          { playerNum: 10, role: 'LM', roleNameEn: 'Playmaker', roleNameBn: 'প্লেমেকার', x: 28, y: 44, tacticalInstructionEn: 'Provide creativity from the inside-left channel.', tacticalInstructionBn: 'বাম খাঁজ দিয়ে আক্রমণ রচনা।' },
          { playerNum: 7, role: 'RM', roleNameEn: 'Right Midfielder', roleNameBn: 'রাইট মিডফিল্ডার', x: 72, y: 44, tacticalInstructionEn: 'Sprint down right flank, whip in accurate crosses.', tacticalInstructionBn: 'ডান প্রান্তে ঝড় তুলে ক্রস দেওয়া।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Center Forward', roleNameBn: 'স্ট্রাইকার', x: 50, y: 18, tacticalInstructionEn: 'Hold line, attack the near post.', tacticalInstructionBn: 'কাছের পোস্টে দৌড় দিয়ে গোল করা।' },
        ],
        strategy: {
          attackEn: 'Triangular passing combinations between fullbacks, wide midfielders and Anik.',
          attackBn: 'ফুলব্যাক, মিডফিল্ডার ও অনিকের মাঝে ত্রিমাত্রিক পাসিংয়ে আক্রমণ।',
          defenseEn: 'Shanto drops right in front of Shekhor while the back three stay shoulder to shoulder.',
          defenseBn: 'শান্ত শেখরের সামনে নামে এবং তিন ডিফেন্ডার দেয়াল গড়ে তোলে।',
          transitionEn: 'Explosive vertical transitions utilizing Shuvo Biswas down the right channel.',
          transitionBn: 'ডান প্রান্তে শুভ বিশ্বাসের অবিশ্বাস্য গতির মাধ্যমে তাৎক্ষণিক কাউন্টার।',
          captainDirectiveEn: '"Keep our lines tight. Shanto, protect my front. Shuvo, stay high on the right wing!" — Shekhor',
          captainDirectiveBn: '"লাইন যেন ভেঙে না যায়। শান্ত, আমার সামনে থাকো। শুভ, ডান উইংয়ে স্পেস নাও!" — শেখর',
          strengthsEn: ['Total pitch coverage', 'Natural passing angles', 'Smooth transition from defense to attack'],
          strengthsBn: ['মাঠের সর্বত্র নিখুঁত উপস্থিতি', 'স্বাভাবিক পাসিং অ্যাঙ্গেল', 'রক্ষণ থেকে আক্রমণে দ্রুত পরিবর্তন'],
          watchoutsEn: ['Requires high stamina from wide midfielders'],
          watchoutsBn: ['ওয়াইড মিডফিল্ডারদের অক্লান্ত পরিশ্রম প্রয়োজন'],
          metrics: { pressing: 84, possession: 86, counterAttack: 89, compactness: 91, width: 84 }
        }
      }
    ]
  },

  // ==========================================
  // 9-A-SIDE FORMATIONS (9 PLAYERS)
  // ==========================================
  9: {
    playerCount: 9,
    nameEn: '9-a-Side (Open Ground Strategy)',
    nameBn: '৯ জনের দল (উন্মুক্ত মাঠের কৌশল)',
    subtitleEn: 'Wider midfield overload and twin strike options for fast-paced tournament clashes.',
    subtitleBn: 'মাঝমাঠে বাড়তি শক্তি ও দুই স্ট্রাইকারের সমন্বয়ে বড় আক্রমণ।',
    recommendedPitchEn: 'Mulikandi High School Main Pitch (Three-Quarter Length)',
    recommendedPitchBn: 'মুলিকান্দি হাই স্কুল প্রধান মাঠ',
    formations: [
      {
        id: '9-3-3-2',
        name: '3-3-2 (Dynamic Attackers)',
        code: '3-3-2',
        playerCount: 9,
        labelEn: 'Twin Front 9s',
        labelBn: 'টুইন ফ্রন্ট ৯',
        categoryTag: 'Double Striker',
        formationStyleEn: 'Solid Back 3 with Overloaded Frontline',
        formationStyleBn: 'তিন নির্ভরযোগ্য ডিফেন্ডার ও ডাবল স্ট্রাইকার',
        summaryEn: 'High-threat 9-man system featuring dual strikers Sajon Biswas and Shuvo Biswas fed by a commanding 3-man midfield.',
        summaryBn: '৯ জনের খেলায় সবচেয়ে বিধ্বংসী আক্রমণ। দুই স্ট্রাইকার সজন ও শুভকে বল জোগাবে তিন মিডফিল্ডার।',
        startingXI: [1, 17, 4, 3, 6, 8, 10, 7, 9], // GK, Shekhor, Tonmoy, Niloy, Pritom, Shanto, Anik, Shuvo, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goal Sentinel', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Command defensive box.', tacticalInstructionBn: 'বক্সের সম্পূর্ণ নিরাপত্তা দেওয়া।' },
          { playerNum: 3, role: 'LB', roleNameEn: 'Left Back', roleNameBn: 'লেফট ব্যাক', x: 22, y: 73, tacticalInstructionEn: 'Protect left flank and provide support.', tacticalInstructionBn: 'বাম প্রান্ত পাহারা ও বল এগিয়ে দেওয়া।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Sweeper Defender (C)', roleNameBn: 'সেন্টার ব্যাক ও অধিনায়ক', x: 50, y: 76, tacticalInstructionEn: 'Command offside trap, marshal back three.', tacticalInstructionBn: 'অফসাইড ফাঁদ তৈরি ও ডিফেন্স পরিচালনা।' },
          { playerNum: 4, role: 'RB', roleNameEn: 'Right Back', roleNameBn: 'রাইট ব্যাক', x: 78, y: 73, tacticalInstructionEn: 'Solid tackling on opposing wingers.', tacticalInstructionBn: 'প্রতিপক্ষের উইঙ্গারদের ট্যাকল করা।' },
          { playerNum: 6, role: 'CDM', roleNameEn: 'Defensive Destroyer', roleNameBn: 'বল উইনার মিডফিল্ডার', x: 30, y: 52, tacticalInstructionEn: 'Aggressive ball winning and short distribution.', tacticalInstructionBn: 'বল কেড়ে নিয়ে ছোট পাস দেওয়া।' },
          { playerNum: 8, role: 'CM', roleNameEn: 'Box-to-Box Midfielder', roleNameBn: 'বক্স-টু-বক্স মিডফিল্ডার', x: 50, y: 48, tacticalInstructionEn: 'Relentless running between penalty boxes.', tacticalInstructionBn: 'উভয় বক্সে সমান পরিশ্রম করা।' },
          { playerNum: 10, role: 'CAM', roleNameEn: 'Playmaker', roleNameBn: 'প্লেমেকার', x: 70, y: 46, tacticalInstructionEn: 'Slide killer balls between centerbacks.', tacticalInstructionBn: 'দুই স্ট্রাইকারের জন্য থ্রু বল তৈরি করা।' },
          { playerNum: 7, role: 'ST', roleNameEn: 'Pacy Striker', roleNameBn: 'গতিশীল স্ট্রাইকার', x: 65, y: 20, tacticalInstructionEn: 'Run channels and finish from acute angles.', tacticalInstructionBn: 'কোণা থেকে বক্সে ঢুকে নিখুঁত ফিনিশিং।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Power Striker', roleNameBn: 'পাওয়ার স্ট্রাইকার', x: 35, y: 20, tacticalInstructionEn: 'Physical duels, hold up play, lethal headers.', tacticalInstructionBn: 'হেড ও জোরালো শটে গোল আদায়।' },
        ],
        strategy: {
          attackEn: 'Direct passes to Sajon who lays off for Shuvo or Anik crashing into the box.',
          attackBn: 'সজনের কাছে বল পাঠিয়ে সেখান থেকে শুভ বা অনিকের জোরালো শট।',
          defenseEn: 'Pritom and Shanto act as double barriers, allowing Shekhor to anticipate and sweep behind.',
          defenseBn: 'প্রীতম ও শান্ত মাঝমাঠ আটকে রাখে, ফলে শেখর পেছন থেকে সহজেই ক্লিয়ার করতে পারে।',
          transitionEn: 'Immediate 4-man offensive charge upon turnover.',
          transitionBn: 'বল পাওয়া মাত্রই ৪ জনের মারাত্মক প্রতি-আক্রমণ।',
          captainDirectiveEn: '"Two strikers give us double the chance. Feed them early and protect our back three!" — Shekhor',
          captainDirectiveBn: '"দুই স্ট্রাইকার থাকলে গোলের সুযোগ দ্বিগুণ। ওদের জলদি বল দাও আর ডিফেন্স ঠিক রাখো!" — শেখর',
          strengthsEn: ['Massive goal potential with 2 strikers', 'Double midfield screen', 'Dominant aerial presence'],
          strengthsBn: ['দুই স্ট্রাইকারের বিধ্বংসী আক্রমণ', 'মাঝমাঠে দ্বিগুণ সুরক্ষা', 'উঁচু বলে নিশ্চিত দখল'],
          watchoutsEn: ['Space behind fullbacks if they step up together'],
          watchoutsBn: ['দুই ফুলব্যাক একসাথে ওপরে উঠলে পেছনের স্পেস সাবধানে দেখতে হবে'],
          metrics: { pressing: 86, possession: 82, counterAttack: 92, compactness: 88, width: 80 }
        }
      }
    ]
  },

  // ==========================================
  // 10-A-SIDE FORMATIONS (10 PLAYERS)
  // ==========================================
  10: {
    playerCount: 10,
    nameEn: '10-a-Side (Full Pitch Tactical Drill)',
    nameBn: '১০ জনের দল (ট্যাকটিক্যাল মহড়া)',
    subtitleEn: 'High discipline, four-man backline security, and tactical numerical superiority.',
    subtitleBn: 'রক্ষণভাগে চারজন, মাঝমাঠের শৃঙ্খলা ও কৌশলগত শ্রেষ্ঠত্ব।',
    recommendedPitchEn: 'Mulikandi High School Full Football Ground',
    recommendedPitchBn: 'মুলিকান্দি হাই স্কুল সম্পূর্ণ ফুটবল মাঠ',
    formations: [
      {
        id: '10-4-4-1',
        name: '4-4-1 (Disciplined Shield)',
        code: '4-4-1',
        playerCount: 10,
        labelEn: 'Compact 10s',
        labelBn: 'কমপ্যাক্ট ১০',
        categoryTag: 'Defensive Mastery',
        formationStyleEn: 'Two Flat Banks of Four with Free Roaming Playmaker',
        formationStyleBn: 'দুই স্তরের ফ্ল্যাট চার ও মুক্ত প্লেমেকার',
        summaryEn: 'Extremely organized formation. A solid back four with a four-man midfield bank, giving zero passing lanes to opponents.',
        summaryBn: 'অত্যন্ত সুশৃঙ্খল কৌশল। পেছনে চারজন ও মাঝমাঠে চারজন মিলে প্রতিপক্ষকে কোনো সুযোগই দেয় না।',
        startingXI: [1, 4, 17, 5, 3, 7, 8, 10, 11, 9], // GK, Tonmoy, Shekhor, Bristo, Niloy, Shuvo, Shanto, Anik, Kourov, Sajon
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goal Keeper', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Command the penalty box.', tacticalInstructionBn: 'ডি-বক্সের সম্পূর্ণ নিয়ন্ত্রণ রাখা।' },
          { playerNum: 3, role: 'LB', roleNameEn: 'Left Fullback', roleNameBn: 'লেফট ব্যাক', x: 18, y: 74, tacticalInstructionEn: 'Lock down left corridor.', tacticalInstructionBn: 'বাম প্রান্ত পাহারা দেওয়া।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Captain & Sweeper CB', roleNameBn: 'সেন্টার ব্যাক (অধিনায়ক)', x: 40, y: 76, tacticalInstructionEn: 'Vocal organization, critical blocks.', tacticalInstructionBn: 'রক্ষণ নিয়ন্ত্রণ ও নিশ্চিত ট্যাকল।' },
          { playerNum: 5, role: 'CB', roleNameEn: 'Stopper CB', roleNameBn: 'স্টপার সেন্টার ব্যাক', x: 60, y: 76, tacticalInstructionEn: 'Aerial clearing, man-marking.', tacticalInstructionBn: 'উঁচু বল ক্লিয়ার ও কড়া মার্কিং।' },
          { playerNum: 4, role: 'RB', roleNameEn: 'Right Fullback', roleNameBn: 'রাইট ব্যাক', x: 82, y: 74, tacticalInstructionEn: 'Solid tackling, overlap when safe.', tacticalInstructionBn: 'ডান প্রান্ত সামলানো ও সুযোগমতো ওপরে ওঠা।' },
          { playerNum: 11, role: 'LM', roleNameEn: 'Left Midfield', roleNameBn: 'লেফট মিডফিল্ড', x: 22, y: 48, tacticalInstructionEn: 'Pace down flank, support fullback.', tacticalInstructionBn: 'বাম উইং দিয়ে আক্রমণ ও নিচে কভার।' },
          { playerNum: 8, role: 'CM', roleNameEn: 'Central Anchor', roleNameBn: 'সেন্ট্রাল মিডফিল্ডার', x: 42, y: 52, tacticalInstructionEn: 'Shield defense, quick distribution.', tacticalInstructionBn: 'রক্ষণ ঢাল ও দ্রুত পাস বাড়ানো।' },
          { playerNum: 10, role: 'CAM', roleNameEn: 'Attacking Playmaker', roleNameBn: 'প্লেমেকার', x: 58, y: 46, tacticalInstructionEn: 'Dictate play, feed striker.', tacticalInstructionBn: 'খেলার ছন্দ তৈরি ও স্ট্রাইকারকে পাস দেওয়া।' },
          { playerNum: 7, role: 'RM', roleNameEn: 'Right Midfield', roleNameBn: 'রাইট মিডফিল্ড', x: 78, y: 48, tacticalInstructionEn: 'Crosses and high pressing.', tacticalInstructionBn: 'ক্রস বাড়ানো ও প্রতিপক্ষকে প্রেস করা।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Lone Striker', roleNameBn: 'সেন্টার ফরোয়ার্ড', x: 50, y: 18, tacticalInstructionEn: 'Occupy defenders, score on half-chances.', tacticalInstructionBn: 'হাফ-চান্স থেকেও গোল আদায়।' },
        ],
        strategy: {
          attackEn: 'Width from Kourov and Shuvo, while Anik pulls the strings in the center.',
          attackBn: 'কৌরব ও শুভর উইং ধরে আক্রমণ এবং মাঝখান থেকে অনিকের শৈল্পিক পাস।',
          defenseEn: 'Two horizontal lines of four squeeze the pitch, eliminating half-spaces.',
          defenseBn: 'চারজনের দুই স্তরের দেয়াল প্রতিপক্ষকে কোনো জায়গা না দিয়ে আটকে রাখবে।',
          transitionEn: 'Rapid release to either winger on the flanks for a quick counter.',
          transitionBn: 'উইংয়ে দ্রুত বল বাড়িয়ে চকিত প্রতি-আক্রমণ।',
          captainDirectiveEn: '"Stay compact in the four-four block! Move as one unit across the pitch!" — Shekhor',
          captainDirectiveBn: '"চার-চার ব্লকে সবাই একসাথে মুভ করো! একজন আরেকজনকে কভার দাও!" — শেখর',
          strengthsEn: ['Maximum defensive solidity', 'Extremely hard to break through', 'Clear positional clarity'],
          strengthsBn: ['রক্ষণভাগে চরম স্থিতিশীলতা', 'ভাঙা প্রায় অসম্ভব', 'সবার দায়িত্ব সুস্পষ্ট'],
          watchoutsEn: ['Striker can lack support if wide midfielders lag behind'],
          watchoutsBn: ['উইঙ্গাররা সময়মতো না উঠলে স্ট্রাইকার একা হয়ে পড়তে পারে'],
          metrics: { pressing: 82, possession: 80, counterAttack: 90, compactness: 97, width: 85 }
        }
      }
    ]
  },

  // ==========================================
  // 11-A-SIDE FORMATIONS (11 PLAYERS - FULL FOOTBALL)
  // ==========================================
  11: {
    playerCount: 11,
    nameEn: '11-a-Side (Full Pitch Master Strategy)',
    nameBn: '১১ জনের দল (পূর্ণাঙ্গ মাঠের কৌশল)',
    subtitleEn: 'Full squad deployment with starting XI orchestrated by Captain Shekhor Mohan Ray.',
    subtitleBn: 'অধিনায়ক শেখর মোহন রায়ের নেতৃত্বে পূর্ণাঙ্গ প্রথম একাদশের লড়াই।',
    recommendedPitchEn: 'Mulikandi High School Stadium Football Ground',
    recommendedPitchBn: 'মুলিকান্দি হাই স্কুল স্টেডিয়াম ফুটবল মাঠ',
    formations: [
      {
        id: '11-4-3-3',
        name: '4-3-3 (Titan Force Attack Doctrine)',
        code: '4-3-3',
        playerCount: 11,
        labelEn: 'High Press 4-3-3',
        labelBn: 'হাই প্রেস ৪-৩-৩',
        categoryTag: 'Championship Winning',
        formationStyleEn: 'Gegenpress & Overlapping Wingers with Single Holding Pivot',
        formationStyleBn: 'গেগেনপ্রেস ও ওভারল্যাপিং উইঙ্গারদের আক্রমণাত্মক ৪-৩-৩',
        summaryEn: 'The flagship system of Titan Force Mulikandi FC. Captain Shekhor commands the defense, Anik and Shanto control the engine room, while Shuvo, Sajon, and Kourov form a lethal front three.',
        summaryBn: 'টাইটান ফোর্স মুলিকান্দির মূল রণকৌশল। অধিনায়ক শেখরের নেতৃত্বে ব্যাকলাইন, মাঝমাঠে অনিক ও শান্ত এবং সামনে শুভ, সজন ও কৌরবের ত্রিমুখী আক্রমণ।',
        startingXI: [1, 4, 17, 5, 3, 10, 8, 6, 7, 9, 11], // 11 players! (Player #12 Ripon is on the bench)
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goalkeeper', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Command the penalty box, swift distribution.', tacticalInstructionBn: 'বক্সের সম্পূর্ণ নিরাপত্তা ও সঠিক ডিস্ট্রিবিউশন।' },
          { playerNum: 4, role: 'RB', roleNameEn: 'Right Fullback', roleNameBn: 'রাইট ব্যাক', x: 82, y: 73, tacticalInstructionEn: 'Lock down right flank, overlap when Shuvo cuts inside.', tacticalInstructionBn: 'ডান প্রান্ত পাহারা ও সুযোগমতো ওভারল্যাপ করা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Captain & Sweeper CB (C)', roleNameBn: 'সেন্টার ব্যাক ও অধিনায়ক', x: 38, y: 75, tacticalInstructionEn: 'Vocal leadership, crunching tackles, initiate counter-attacks.', tacticalInstructionBn: 'দলকে পরিচালনা, নির্ভুল ট্যাকল ও আক্রমণ শুরু করা।' },
          { playerNum: 5, role: 'CB', roleNameEn: 'Stopper CB', roleNameBn: 'স্টপার সেন্টার ব্যাক', x: 62, y: 75, tacticalInstructionEn: 'Dominate aerial balls, tight marking on target man.', tacticalInstructionBn: 'উঁচু বলে আধিপত্য ও স্ট্রাইকারকে কড়া পাহারা।' },
          { playerNum: 3, role: 'LB', roleNameEn: 'Left Fullback', roleNameBn: 'লেফট ব্যাক', x: 18, y: 73, tacticalInstructionEn: 'Solid defensive discipline, deliver curling deliveries.', tacticalInstructionBn: 'বাম প্রান্ত আঁটসাঁট রাখা ও সুন্দর ক্রস দেওয়া।' },
          { playerNum: 10, role: 'CAM', roleNameEn: 'Central Playmaker', roleNameBn: 'অ্যাটাকিং প্লেমেকার', x: 50, y: 60, tacticalInstructionEn: 'Dictate tempo, dribble past defenders, unlock backlines.', tacticalInstructionBn: 'খেলার গতি নিয়ন্ত্রণ ও ফাইনাল থ্রু পাস দেওয়া।' },
          { playerNum: 8, role: 'CM', roleNameEn: 'Box-to-Box Midfielder', roleNameBn: 'বক্স-টু-বক্স মিডফিল্ড', x: 35, y: 46, tacticalInstructionEn: 'Relentless work rate, supporting both defense and attack.', tacticalInstructionBn: 'অক্লান্ত পরিশ্রম ও উভয় প্রান্তে সহায়তা।' },
          { playerNum: 6, role: 'CDM', roleNameEn: 'Defensive Anchor', roleNameBn: 'ডিফেন্সিভ মিডফিল্ডার', x: 65, y: 46, tacticalInstructionEn: 'Screen backline, disrupt counter-attacks.', tacticalInstructionBn: 'ব্যাকলাইনের সামনে দেয়াল হওয়া ও বল রিকভার করা।' },
          { playerNum: 7, role: 'RW', roleNameEn: 'Right Winger', roleNameBn: 'ডানপ্রান্তীয় উইঙ্গার', x: 80, y: 24, tacticalInstructionEn: 'Explosive pace, cut inside to shoot with power.', tacticalInstructionBn: 'বিদ্যুৎ গতিতে উইং ধরে ঢুকে গোল করা।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Center Forward', roleNameBn: 'সেন্টার ফরোয়ার্ড', x: 50, y: 16, tacticalInstructionEn: 'Clinical finishing, aerial threat, draw defenders.', tacticalInstructionBn: 'বক্সে মারাত্মক ফিনিশিং ও হেড।' },
          { playerNum: 11, role: 'LW', roleNameEn: 'Left Winger', roleNameBn: 'বামপ্রান্তীয় উইঙ্গার', x: 20, y: 24, tacticalInstructionEn: 'Take on fullbacks 1v1, whip pinpoint low crosses.', tacticalInstructionBn: 'ফুলব্যাককে ডজ দিয়ে বক্সে নিখুঁত পাস দেওয়া।' },
        ],
        strategy: {
          attackEn: 'Front three press high up the pitch, forcing defensive errors. Fullbacks provide width while Anik slips passes into the half-spaces.',
          attackBn: 'সামনের তিনজন প্রতিপক্ষকে চেপে ধরবে। ফুলব্যাকরা উইংয়ে জায়গা নেবে এবং অনিক নিপুণ পাসে সুযোগ বানাবে।',
          defenseEn: 'High pressing defensive line led by Shekhor Mohan Ray. Pritom screens the center while back four stays compact.',
          defenseBn: 'অধিনায়ক শেখর মোহন রায়ের নেতৃত্বে হাই লাইন ডিফেন্স। প্রীতম সামনে শিল্ড তৈরি করবে।',
          transitionEn: 'Instant ball recovery turns into immediate triangular passing toward Sajon, Shuvo, and Kourov.',
          transitionBn: 'বল পেলেই এক মুহূর্তও দেরি না করে শুভ, সজন ও কৌরবকে দিয়ে সরাসরি আক্রমণ।',
          captainDirectiveEn: '"This is our true identity! Never let them breathe on the ball. When we win it, release Shuvo and Kourov immediately!" — Shekhor Mohan Ray',
          captainDirectiveBn: '"এটাই আমাদের আসল ফুটবল! প্রতিপক্ষকে বল ধরে রাখার কোনো সুযোগ দেবে না। বল পেলেই উইংয়ে বাড়াও!" — শেখর মোহন রায়',
          strengthsEn: ['Unstoppable attacking momentum', 'High possession domination (61.4%)', 'Total pitch width utilization'],
          strengthsBn: ['আক্রমণের দুর্দান্ত গতি', 'বল দখলে একচ্ছত্র আধিপত্য (৬১.৪%)', 'মাঠের সম্পূর্ণ প্রস্থের ব্যবহার'],
          watchoutsEn: ['High defensive line requires swift recovery against speedy counter-attacks'],
          watchoutsBn: ['উঁচু ডিফেন্স লাইনের পেছনে প্রতিপক্ষের দ্রুত গতির কাউন্টার সাবধানে সামলাতে হবে'],
          metrics: { pressing: 94, possession: 89, counterAttack: 91, compactness: 87, width: 92 }
        }
      },
      {
        id: '11-4-2-3-1',
        name: '4-2-3-1 (Double Pivot Balance)',
        code: '4-2-3-1',
        playerCount: 11,
        labelEn: 'Double Pivot 4-2-3-1',
        labelBn: 'ডাবল পিভট ৪-২-৩-১',
        categoryTag: 'Modern Tactical',
        formationStyleEn: 'Twin Defensive Anchors with Dynamic Attacking Midfield Trio',
        formationStyleBn: 'দুই ডিফেন্সিভ মিডফিল্ডার ও তিন আক্রমণাত্মক মিডফিল্ডার',
        summaryEn: 'Elite modern balance. Shanto and Pritom provide a rock-solid double screen in front of Shekhor, giving creative freedom to Anik, Shuvo, and Kourov.',
        summaryBn: 'আধুনিক ফুটবলের সেরা ব্যালেন্স। শান্ত ও প্রীতমের ডাবল পিভট ডিফেন্সকে সুরক্ষা দেয়, ফলে অনিক ও উইঙ্গাররা স্বাধীনভাবে আক্রমণ করতে পারে।',
        startingXI: [1, 4, 17, 5, 3, 8, 6, 7, 10, 11, 9], // 11 players!
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goalkeeper', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Command the box.', tacticalInstructionBn: 'বক্সের সম্পূর্ণ নিয়ন্ত্রণ রাখা।' },
          { playerNum: 4, role: 'RB', roleNameEn: 'Right Fullback', roleNameBn: 'রাইট ব্যাক', x: 82, y: 74, tacticalInstructionEn: 'Stay compact, overlap selectively.', tacticalInstructionBn: 'ডান দিক আঁটসাঁট রাখা ও সুযোগ বুঝে ওপরে ওঠা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Captain & Sweeper CB (C)', roleNameBn: 'সেন্টার ব্যাক ও অধিনায়ক', x: 38, y: 76, tacticalInstructionEn: 'Direct backline, precise distribution.', tacticalInstructionBn: 'রক্ষণভাগ পরিচালনা ও লং পাস বাড়ানো।' },
          { playerNum: 5, role: 'CB', roleNameEn: 'Stopper CB', roleNameBn: 'স্টপার সেন্টার ব্যাক', x: 62, y: 76, tacticalInstructionEn: 'Physical dominance in duels.', tacticalInstructionBn: 'শারীরিক লড়াইয়ে জয়লাভ।' },
          { playerNum: 3, role: 'LB', roleNameEn: 'Left Fullback', roleNameBn: 'লেফট ব্যাক', x: 18, y: 74, tacticalInstructionEn: 'Cover left channel securely.', tacticalInstructionBn: 'বাম প্রান্ত নিরাপদ রাখা।' },
          { playerNum: 8, role: 'CDM', roleNameEn: 'Holding Pivot', roleNameBn: 'হোল্ডিং মিডফিল্ডার', x: 38, y: 58, tacticalInstructionEn: 'Break opposition rhythm, retain possession.', tacticalInstructionBn: 'প্রতিপক্ষের আক্রমণ ভেঙে বল ধরে রাখা।' },
          { playerNum: 6, role: 'CDM', roleNameEn: 'Ball Winner', roleNameBn: 'বল উইনার', x: 62, y: 58, tacticalInstructionEn: 'Tackle aggressively, protect centerbacks.', tacticalInstructionBn: 'আগ্রাসী ট্যাকল ও ডিফেন্ডারদের সুরক্ষা।' },
          { playerNum: 7, role: 'RAM', roleNameEn: 'Right Attacking Mid', roleNameBn: 'ডান আক্রমণাত্মক মিড', x: 78, y: 34, tacticalInstructionEn: 'Drift inside, unleash shots.', tacticalInstructionBn: 'ভেতরে ঢুকে দূর থেকে শট নেওয়া।' },
          { playerNum: 10, role: 'CAM', roleNameEn: 'Central Playmaker', roleNameBn: 'নাম্বার টেন প্লেমেকার', x: 50, y: 32, tacticalInstructionEn: 'Free role, unlock defense with killer passes.', tacticalInstructionBn: 'মুক্ত ভূমিকা ও ডিফেন্স চেরা পাস।' },
          { playerNum: 11, role: 'LAM', roleNameEn: 'Left Attacking Mid', roleNameBn: 'বাম আক্রমণাত্মক মিড', x: 22, y: 34, tacticalInstructionEn: 'Beat defenders with speed and trickery.', tacticalInstructionBn: 'গতি ও স্কিলে ডিফেন্ডারকে পরাস্ত করা।' },
          { playerNum: 9, role: 'ST', roleNameEn: 'Target Forward', roleNameBn: 'স্ট্রাইকার', x: 50, y: 17, tacticalInstructionEn: 'Hold up play, clinical finishing in the box.', tacticalInstructionBn: 'বক্সের ভেতর মোক্ষম ফিনিশিং।' },
        ],
        strategy: {
          attackEn: 'Attacking midfield trio fluidly interchanges positions, creating numerical overloads.',
          attackBn: 'তিন অ্যাটাকিং মিডফিল্ডার স্থান বদল করে প্রতিপক্ষকে বিভ্রান্ত করবে।',
          defenseEn: 'Double pivot forms a shield that suffocates enemy playmakers before they reach the box.',
          defenseBn: 'দুই ডিফেন্সিভ মিডফিল্ডার প্রতিপক্ষের প্লেমেকারদের কোনো সময় দেবে না।',
          transitionEn: 'Controlled counter-surge through Anik Biswas directing traffic from the middle.',
          transitionBn: 'মাঝমাঠ থেকে অনিকের নেতৃত্বে সুনিয়ন্ত্রিত প্রতি-আক্রমণ।',
          captainDirectiveEn: '"Shanto and Pritom, you are the club\'s shield. Protect our central channel and let our front four unleash havoc!" — Shekhor',
          captainDirectiveBn: '"শান্ত আর প্রীতম, তোমরাই ক্লাবের আসল ঢাল। মাঝখান আটকে রাখো আর সামনের চারজনকে গোল করতে দাও!" — শেখর',
          strengthsEn: ['Supreme defensive protection in midfield', 'Total creative freedom for Anik', 'Fluid front four'],
          strengthsBn: ['মাঝমাঠের সর্বোচ্চ সুরক্ষা', 'অনিকের স্বাধীন ক্রিয়েটিভিটি', 'আক্রমণে বহুমাত্রিকতা'],
          watchoutsEn: ['Striker can get crowded out if wingers stay too wide'],
          watchoutsBn: ['উইঙ্গাররা বেশি বাইরে থাকলে স্ট্রাইকার মার্কিংয়ে পড়ে যেতে পারে'],
          metrics: { pressing: 86, possession: 88, counterAttack: 90, compactness: 95, width: 84 }
        }
      },
      {
        id: '11-3-4-3',
        name: '3-4-3 (Wingback Surge)',
        code: '3-4-3',
        playerCount: 11,
        labelEn: 'Total Football 3-4-3',
        labelBn: 'টোটাল ফুটবল ৩-৪-৩',
        categoryTag: 'Ultra Offensive',
        formationStyleEn: 'High Flying Wingbacks with Three Centerbacks & Fluid Front Three',
        formationStyleBn: 'উড়ন্ত উইংব্যাক, তিন সেন্ট্রাল ব্যাক ও বিধ্বংসী আক্রমণ',
        summaryEn: 'High intensity all-action system. Shekhor anchors a back three, allowing fullbacks to push high up the pitch as wingers.',
        summaryBn: 'চরম আক্রমণাত্মক রূপরেখা। শেখরের নেতৃত্বে তিন ডিফেন্ডার এবং দুই ফুলব্যাক উইং ধরে ওপরে উঠে সাতজনের আক্রমণ গড়ে তোলে।',
        startingXI: [1, 4, 17, 5, 3, 10, 8, 6, 7, 9, 11], // 11 players!
        positions: [
          { playerNum: 1, role: 'GK', roleNameEn: 'Goalkeeper', roleNameBn: 'গোলরক্ষক', x: 50, y: 88, tacticalInstructionEn: 'Act as sweeper keeper.', tacticalInstructionBn: 'সুইপার কিপার হিসেবে খেলা।' },
          { playerNum: 4, role: 'RCB', roleNameEn: 'Right Centerback', roleNameBn: 'রাইট সেন্ট্রাল ব্যাক', x: 75, y: 74, tacticalInstructionEn: 'Cover right half-space.', tacticalInstructionBn: 'ডান দিকের খাঁজ কভার করা।' },
          { playerNum: 17, role: 'CB', roleNameEn: 'Commander Libero (C)', roleNameBn: 'সেন্টার ব্যাক ও অধিনায়ক', x: 50, y: 76, tacticalInstructionEn: 'Libero sweeper, step into midfield with the ball.', tacticalInstructionBn: 'লিবারো সুইপার ও বল নিয়ে মাঝমাঠে ওঠা।' },
          { playerNum: 5, role: 'LCB', roleNameEn: 'Left Centerback', roleNameBn: 'লেফট সেন্ট্রাল ব্যাক', x: 25, y: 74, tacticalInstructionEn: 'Cover left half-space.', tacticalInstructionBn: 'বাম দিকের খাঁজ কভার করা।' },
          { playerNum: 6, role: 'RWB', roleNameEn: 'Right Wingback', roleNameBn: 'রাইট উইংব্যাক', x: 84, y: 50, tacticalInstructionEn: 'Run the entire right touchline.', tacticalInstructionBn: 'ডান টাচলাইন জুড়ে দৌড়ানো ও ক্রস দেওয়া।' },
          { playerNum: 8, role: 'CM', roleNameEn: 'Central Midfielder', roleNameBn: 'সেন্ট্রাল মিডফিল্ডার', x: 62, y: 50, tacticalInstructionEn: 'Dictate passing rhythm.', tacticalInstructionBn: 'পাসিংয়ের ছন্দ তৈরি করা।' },
          { playerNum: 10, role: 'CM', roleNameEn: 'Playmaker', roleNameBn: 'প্লেমেকার', x: 38, y: 50, tacticalInstructionEn: 'Create opportunities and shoot.', tacticalInstructionBn: 'সুযোগ তৈরি ও দূর থেকে শট।' },
          { playerNum: 3, role: 'LWB', roleNameEn: 'Left Wingback', roleNameBn: 'লেফট উইংব্যাক', x: 16, y: 50, tacticalInstructionEn: 'Bomb up and down the left flank.', tacticalInstructionBn: 'বাম উইং ধরে ওঠানামা ও ডিফেন্সে সাহায্য।' },
          { playerNum: 7, role: 'RF', roleNameEn: 'Right Forward', roleNameBn: 'ডানপ্রান্তীয় ফরোয়ার্ড', x: 78, y: 22, tacticalInstructionEn: 'Direct runs behind defense.', tacticalInstructionBn: 'ডিফেন্সের পেছনে দৌড় দিয়ে গোল করা।' },
          { playerNum: 9, role: 'CF', roleNameEn: 'Center Forward', roleNameBn: 'সেন্টার ফরোয়ার্ড', x: 50, y: 16, tacticalInstructionEn: 'Hold up ball, lethal finishing.', tacticalInstructionBn: 'বল ধরে রাখা ও নিশ্চিত ফিনিশিং।' },
          { playerNum: 11, role: 'LF', roleNameEn: 'Left Forward', roleNameBn: 'বামপ্রান্তীয় ফরোয়ার্ড', x: 22, y: 22, tacticalInstructionEn: 'Cut inside, pull defenders out of position.', tacticalInstructionBn: 'ভেতরে ঢুকে ডিফেন্স ছিন্নভিন্ন করা।' },
        ],
        strategy: {
          attackEn: 'Overwhelming 7-man attacking wave pinning opponents inside their own half.',
          attackBn: 'একসাথে সাতজনের আক্রমণ প্রতিপক্ষকে তাদের অর্ধে বন্দি করে ফেলবে।',
          defenseEn: 'Wingbacks sprint back to transform formation into a 5-man unbreakable backline.',
          defenseBn: 'উইংব্যাকরা নিচে নেমে পাঁচজনের মজবুত ডিফেন্স তৈরি করবে।',
          transitionEn: 'Instant wide distribution exploiting massive space on both flanks.',
          transitionBn: 'দুই উইংয়ের সুবিশাল জায়গা কাজে লাগিয়ে চকিত আক্রমণ।',
          captainDirectiveEn: '"Courage! We pin them deep in their own territory. Wingbacks, run your hearts out!" — Shekhor',
          captainDirectiveBn: '"সাহস রাখো! ওদের নিজেদের অর্ধে বন্দি করো। উইংব্যাকরা পুরো প্রান্ত চষে ফেলবে!" — শেখর',
          strengthsEn: ['Unstoppable width and overlapping threat', 'Dominates possession completely', 'Seven players in the attack'],
          strengthsBn: ['অপ্রতিদ্বন্দ্বী উইং আক্রমণ', 'বল দখলে চূড়ান্ত কর্তৃত্ব', 'আক্রমণে সাত খেলোয়াড়ের উপস্থিতি'],
          watchoutsEn: ['Vulnerable to counter-attacks in the wide channels if wingbacks are caught high'],
          watchoutsBn: ['উইংব্যাকরা ওপরে থাকলে উইংয়ের খালি জায়গায় প্রতিপক্ষ কাউন্টার করতে পারে'],
          metrics: { pressing: 96, possession: 91, counterAttack: 86, compactness: 84, width: 98 }
        }
      }
    ]
  }
};
