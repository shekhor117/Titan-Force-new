export type SquadSize = 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface TacticalSlotCoord {
  x: number; // 0 - 100 on pitch width
  y: number; // 0 - 100 on pitch length (0 = opponent goal, 100 = own goal)
  role: string;
  roleBn: string;
  tacticalTip: string;
  tacticalTipBn: string;
}

export interface FormationPreset {
  id: string;
  name: string;
  displayName: string;
  displayNameBn: string;
  squadSize: SquadSize;
  styleName: string;
  styleNameBn: string;
  mentality: 'Defensive' | 'Ultra Defensive' | 'Balanced' | 'Attacking' | 'Heavy Metal Press' | 'Counter Attack' | 'Possession Control';
  mentalityBn: string;
  strategyTitle: string;
  strategyTitleBn: string;
  strategyOverview: string;
  strategyOverviewBn: string;
  strengths: string[];
  strengthsBn: string[];
  coachNotes: string;
  coachNotesBn: string;
  metrics: {
    attack: number;
    defense: number;
    midfield: number;
    pressing: number;
  };
  // Default starter player numbers (from [1, 3, 4, 5, 6, 7, 8, 9, 11, 17])
  defaultStarters: number[];
  // Coords mapped by player number
  playerCoords: Record<number, TacticalSlotCoord>;
  // For 11-a-side format, a coaching flex slot (without creating any new player)
  flexSlot?: {
    id: 'flex-11';
    title: string;
    titleBn: string;
    role: string;
    roleBn: string;
    x: number;
    y: number;
    tip: string;
    tipBn: string;
  };
}

export const SQUAD_FORMATS: {
  size: SquadSize;
  labelEn: string;
  labelBn: string;
  descriptionEn: string;
  descriptionBn: string;
  defaultFormation: string;
}[] = [
  {
    size: 5,
    labelEn: '5-a-Side',
    labelBn: '৫ বনাম ৫ (মিনি ফুটবল)',
    descriptionEn: 'High-octane Futsal & tight caged pitch format. Demands lightning transitions.',
    descriptionBn: 'ফুটসাল ও ছোট মাঠের তীব্র গতির ম্যাচ। দ্রুত মুভমেন্ট ও শুটিং প্রয়োজন।',
    defaultFormation: '1-2-1'
  },
  {
    size: 6,
    labelEn: '6-a-Side',
    labelBn: '৬ বনাম ৬ (হাফ পিচ)',
    descriptionEn: 'Medium turf format. Perfect balance of defensive cover and dynamic dual wings.',
    descriptionBn: 'মাঝারি টার্ফ ও হাফ পিচ ফরম্যাট। রক্ষণ ও উইং আক্রমণের চমৎকার ভারসাম্য।',
    defaultFormation: '2-2-1'
  },
  {
    size: 7,
    labelEn: '7-a-Side',
    labelBn: '৭ বনাম ৭ (সিলেট স্ট্যান্ডার্ড)',
    descriptionEn: 'The beloved Zakigonj & Daudpur tournament knockout tournament format.',
    descriptionBn: 'জকিগঞ্জ ও দাউদপুর টুর্নামেন্টের সবচেয়ে জনপ্রিয় নকআউট ফরম্যাট।',
    defaultFormation: '2-3-1'
  },
  {
    size: 8,
    labelEn: '8-a-Side',
    labelBn: '৮ বনাম ৮',
    descriptionEn: 'Expanded local cup setup. Controlled build-up and midfield dominance.',
    descriptionBn: 'বৃহৎ লোকাল কাপ ফরম্যাট। মিডফিল্ড নিয়ন্ত্রণ ও নিখুঁত পাসের খেলা।',
    defaultFormation: '3-3-1'
  },
  {
    size: 9,
    labelEn: '9-a-Side',
    labelBn: '৯ বনাম ৯ (প্রি-রেগুলেশন)',
    descriptionEn: 'Near full-pitch tactical battle. Dual strikers with heavy counter-press.',
    descriptionBn: 'বড় মাঠের নকআউট লড়াই। জোড়া স্ট্রাইকার ও কাউন্টার প্রেসিং।',
    defaultFormation: '3-3-2'
  },
  {
    size: 10,
    labelEn: '10-a-Side',
    labelBn: '১০ বনাম ১০ (অল-টাইটান স্কোয়াড)',
    descriptionEn: 'Full registered squad on pitch! All 10 Titan Force warriors deployed in synergy.',
    descriptionBn: 'টাইটান ফোর্সের সম্পূর্ণ ১০ জন যোদ্ধা একসাথে মাঠে! চূড়ান্ত দলীয় সমন্বয়।',
    defaultFormation: '3-3-3'
  },
  {
    size: 11,
    labelEn: '11-a-Side',
    labelBn: '১১ বনাম ১১ (ফিফা রেগুলেশন)',
    descriptionEn: 'Full FIFA pitch regulation with our 10 Titans + dynamic tactical flex role.',
    descriptionBn: 'ফিফা পূর্ণাঙ্গ একাদশ ফরম্যাট। ১০ টাইটান ও কোচের কৌশলগত ফ্লেক্স রোল।',
    defaultFormation: '4-3-3'
  }
];

export const FORMATIONS_DATA: Record<SquadSize, FormationPreset[]> = {
  5: [
    {
      id: '5-1-2-1',
      name: '1-2-1',
      displayName: '1-2-1 Diamond Futsal',
      displayNameBn: '১-২-১ ডায়মন্ড ফুটসাল',
      squadSize: 5,
      styleName: 'Fluid Diamond Transition',
      styleNameBn: 'ডায়মন্ড কাউন্টার অ্যাটাক',
      mentality: 'Counter Attack',
      mentalityBn: 'কাউন্টার অ্যাটাক',
      strategyTitle: 'Rapid Ball Circulation & Diamond Shield',
      strategyTitleBn: 'তীব্র গতির বল সার্কুলেশন ও ডায়মন্ড শিল্ড',
      strategyOverview: 'The classic 5-a-side diamond formation. Captain Shekhor Mohan Roy orchestrates from the deep anchor pivot, feeding two dynamic wing-runners (Shuvo & Kourov) while Sajon strikes ruthlessly.',
      strategyOverviewBn: 'ফুটসালের সর্বকালের সেরা ডায়মন্ড ফর্মেশন। অধিনায়ক শেখর মোহন রায় সেন্ট্রাল ডিফেন্স থেকে খেলা পরিচালনা করেন, দুই উইংয়ে শুভ ও কৌরভ বল টেনে স্ট্রাইকার সাজনকে গোলের সুযোগ বানিয়ে দেয়।',
      strengths: ['Total pitch coverage in tight spaces', 'Rapid 1v1 transitional counter-attacks', 'Impenetrable defensive anchor'],
      strengthsBn: ['ছোট মাঠে সর্বোচ্চ জায়গা দখল', '১ বনাম ১ দ্রুত কাউন্টার অ্যাটাক', 'রক্ষণভাগে অধিনায়ক শেখরের দুর্ভেদ্য প্রাচীর'],
      coachNotes: 'Shuronjit initiates quick throws to Shekhor. Shekhor takes 2 touches max before releasing Shuvo or Kourov in behind.',
      coachNotesBn: 'গোলকিপার সুরঞ্জিত দ্রুত হাত দিয়ে পাস বাড়াবে শেখরকে। শেখর ২ টাচের মধ্যে উইংয়ে শুভ অথবা কৌরভকে খালি জায়গা দেবে।',
      metrics: { attack: 88, defense: 84, midfield: 86, pressing: 92 },
      defaultStarters: [1, 17, 7, 11, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Sweeper Keeper', roleBn: 'সুইপার কিপার', tacticalTip: 'Play off your line to cut out through balls.', tacticalTipBn: 'ডি-বক্স ছেড়ে সামনে এসে থ্রু বল ক্লিয়ার করবে।' },
        17: { x: 50, y: 68, role: 'Defensive Anchor & Captain', roleBn: 'সেন্ট্রাল ডিফেন্ডার ও অধিনায়ক', tacticalTip: 'Hold the diamond base; distribute forward instantly.', tacticalTipBn: 'ডায়মন্ডের স্তম্ভ ধরে রেখে আক্রমণ তৈরি করা।' },
        7: { x: 22, y: 44, role: 'Left Wing Runner', roleBn: 'বাম উইঙ্গার', tacticalTip: 'Sprint down flank and track back on defense.', tacticalTipBn: 'বাম পাশ দিয়ে গতি তুলে শট নেওয়া ও রক্ষণে সাহায্য করা।' },
        11: { x: 78, y: 44, role: 'Right Wing Runner', roleBn: 'ডান উইঙ্গার', tacticalTip: 'Cut inside on diagonal angles to test keeper.', tacticalTipBn: 'ডান দিক দিয়ে ভেতরে ঢুকে কোণাকুণি শট নেওয়া।' },
        9: { x: 50, y: 20, role: 'Target Finisher', roleBn: 'প্রধান স্ট্রাইকার', tacticalTip: 'First-time shots and aggressive press on turnovers.', tacticalTipBn: 'প্রথম টাচেই ক্লিন ফিনিশিং ও প্রতিপক্ষের রক্ষণে চাপ।' }
      }
    },
    {
      id: '5-2-1-1',
      name: '2-1-1',
      displayName: '2-1-1 Fortress Box',
      displayNameBn: '২-১-১ শক্ত রক্ষণ বক্স',
      squadSize: 5,
      styleName: 'Lockdown Low-Block',
      styleNameBn: 'লকডাউন লো-ব্লক ডিফেন্স',
      mentality: 'Ultra Defensive',
      mentalityBn: 'আল্ট্রা ডিফেন্সিভ',
      strategyTitle: 'Dual CB Wall with Midfield Playmaker',
      strategyTitleBn: 'জোড়া সেন্ট্রাল ডিফেন্স ও মিডফিল্ড ইঞ্জিন',
      strategyOverview: 'Used when defending a 1-goal tournament lead in the dying minutes. Shekhor and Akash form an iron barrier in front of Shuronjit.',
      strategyOverviewBn: 'টুর্নামেন্টের শেষ মিনিটে ১ গোলের ব্যবধান ধরে রাখার সেরা ফর্মেশন। শেখর ও আকাশ জোড়া সেন্ট্রাল ডিফেন্ডার হিসেবে সুরক্ষা দেয়।',
      strengths: ['Zero space for opponent shots', 'Dominant aerial and sliding duel winning', 'Direct long-ball counter route'],
      strengthsBn: ['প্রতিপক্ষকে কোনো শুটিং স্পেস না দেওয়া', 'ট্যাকল ও এরিয়াল ডুয়েল জয়', 'সরাসরি লম্বা পাসে কাউন্টার অ্যাটাক'],
      coachNotes: 'Do not overcommit forward. Keep two men behind the ball at all times.',
      coachNotesBn: 'কোনোভাবেই একসাথে সবাই ওপরে উঠবে না। সবসময় বলের পেছনে দুইজন খেলোয়াড় থাকবে।',
      metrics: { attack: 72, defense: 96, midfield: 78, pressing: 80 },
      defaultStarters: [1, 17, 5, 6, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Communicate constantly and organize wall.', tacticalTipBn: 'ডিফেন্ডারদের সতর্ক রাখা ও দেয়াল সাজানো।' },
        17: { x: 34, y: 72, role: 'Left Stopper & Captain', roleBn: 'লেফট স্টপার ও অধিনায়ক', tacticalTip: 'Break up attacks and spark low passes.', tacticalTipBn: 'আক্রমণ নষ্ট করে নিচু পাসে বল বের করা।' },
        5: { x: 66, y: 72, role: 'Right Stopper', roleBn: 'রাইট স্টপার', tacticalTip: 'Lock down physical duels in the final third.', tacticalTipBn: 'প্রতিপক্ষের ফরোয়ার্ডকে শরীর দিয়ে আটকে রাখা।' },
        6: { x: 50, y: 46, role: 'Central Playmaker', roleBn: 'সেন্ট্রাল প্লে-মেকার', tacticalTip: 'Keep possession under high pressure.', tacticalTipBn: 'চাপের মুখে বল ধরে রেখে সঠিক পাস দেওয়া।' },
        9: { x: 50, y: 22, role: 'Solo Striker', roleBn: 'একক স্ট্রাইকার', tacticalTip: 'Hold the ball up and wait for midfield runners.', tacticalTipBn: 'বল হোল্ড করে মিডফিল্ডের আগমন পর্যন্ত অপেক্ষা করা।' }
      }
    }
  ],

  6: [
    {
      id: '6-2-2-1',
      name: '2-2-1',
      displayName: '2-2-1 Balanced Hexagon',
      displayNameBn: '২-২-১ ব্যালেন্সড হেক্সাগন',
      squadSize: 6,
      styleName: 'Compact Block & Overload',
      styleNameBn: 'কমপ্যাক্ট ব্লক ও ওভারলোড',
      mentality: 'Balanced',
      mentalityBn: 'ভারসাম্যপূর্ণ',
      strategyTitle: 'Dual-Bank Stability with Roaming Number 9',
      strategyTitleBn: 'জোড়া ডিফেন্স ও মিডফিল্ডের দ্বৈত শক্তি',
      strategyOverview: 'Provides exceptional lateral balance. Shekhor and Srijon secure the backline, while Sujon and Shuvo control the center before unlocking Sajon.',
      strategyOverviewBn: 'মাঠের দুই পাশে সমান শক্তির বিন্যাস। শেখর ও সৃজন ব্যাকলাইন সামলান, সুজন ও শুভ মিডফিল্ড নিয়ন্ত্রণ করে সাজনকে বল জোগান।',
      strengths: ['Symmetrical pitch control', 'Safe passing triangles across all thirds', 'Hard for rivals to play through middle'],
      strengthsBn: ['মাঠজুড়ে ভারসাম্যপূর্ণ অবস্থান', 'সহজ ট্রায়াঙ্গেল পাসিং অপশন', 'মাঝমাঠ দিয়ে প্রতিপক্ষের আক্রমণ রোখা'],
      coachNotes: 'Sujon drops deep when Shekhor advances with the ball.',
      coachNotesBn: 'শেখর বল নিয়ে ওপরে উঠলে সুজন পেছনে এসে কাভার দেবে।',
      metrics: { attack: 84, defense: 86, midfield: 88, pressing: 85 },
      defaultStarters: [1, 17, 3, 6, 7, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Fast distribution to wings.', tacticalTipBn: 'উইংয়ে দ্রুত পাস দেওয়া।' },
        17: { x: 32, y: 72, role: 'Left Central Defender', roleBn: 'সেন্ট্রাল ডিফেন্ডার', tacticalTip: 'Command the backline line and win tackles.', tacticalTipBn: 'রক্ষণ নিয়ন্ত্রণ ও নিখুঁত ট্যাকল।' },
        3: { x: 68, y: 72, role: 'Right Fullback / CB', roleBn: 'রাইট ফুলব্যাক', tacticalTip: 'Lock down right touchline.', tacticalTipBn: 'ডান পাশের উইং পুরোপুরি বন্ধ রাখা।' },
        6: { x: 34, y: 46, role: 'Midfield Controller', roleBn: 'সেন্ট্রাল মিডফিল্ডার', tacticalTip: 'Dictate match rhythm and switch play.', tacticalTipBn: 'খেলার গতি নিয়ন্ত্রণ ও পাস পরিবর্তন।' },
        7: { x: 66, y: 46, role: 'Attacking Flanker', roleBn: 'অ্যাটাকিং ফ্ল্যাঙ্কার', tacticalTip: 'Exploit pockets between rival lines.', tacticalTipBn: 'প্রতিপক্ষের লাইনের ফাঁক দিয়ে ড্রিবল করা।' },
        9: { x: 50, y: 18, role: 'Clinical Striker', roleBn: 'ক্লিনিক্যাল স্ট্রাইকার', tacticalTip: 'Sharp runs across near post.', tacticalTipBn: 'পোস্টের সামনে দ্রুত ডার্ট দৌড় দেওয়া।' }
      }
    },
    {
      id: '6-1-3-1',
      name: '1-3-1',
      displayName: '1-3-1 Midfield Overload',
      displayNameBn: '১-৩-১ মাঝমাঠ আধিপত্য',
      squadSize: 6,
      styleName: 'High Possession Wave',
      styleNameBn: 'পজিশন ধরে রেখে আক্রমণ',
      mentality: 'Possession Control',
      mentalityBn: 'পজিশন কন্ট্রোল',
      strategyTitle: 'Midfield Superiority with 3 Creative Engines',
      strategyTitleBn: '৩ জন সৃষ্টিশীল মিডফিল্ডারের মাধ্যমে নিয়ন্ত্রণ',
      strategyOverview: 'Shekhor stands as the lone sweeper-defender with extreme composure, while 3 midfielders create passing triangles to dominate ball possession.',
      strategyOverviewBn: 'শেখর একা সেন্টার ব্যাক হিসেবে নিখুঁত পজিশনিং নিয়ে থাকেন, আর ৩ জন মিডফিল্ডার পুরো মাঝমাঠ শাসন করে।',
      strengths: ['Unrivaled 70%+ ball possession capability', 'Endless passing options in middle third', 'Smothers rival counter attacks early'],
      strengthsBn: ['৭০%+ বল পজিশন রাখার ক্ষমতা', 'মাঝমাঠে প্রচুর পাসের বিকল্প', 'শুরুতেই প্রতিপক্ষের আক্রমণ ভেঙে দেওয়া'],
      coachNotes: 'Midfielders must counter-press within 3 seconds of losing possession.',
      coachNotesBn: 'বল হারালে ৩ সেকেন্ডের ভেতর আবার রিকভার করতে হবে।',
      metrics: { attack: 86, defense: 78, midfield: 94, pressing: 88 },
      defaultStarters: [1, 17, 8, 6, 11, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Command the penalty box.', tacticalTipBn: 'ডি-বক্সের সম্পূর্ণ দখল রাখা।' },
        17: { x: 50, y: 72, role: 'Sweeper Defender & Captain', roleBn: 'সুইপার ডিফেন্ডার ও অধিনায়ক', tacticalTip: 'Sweep behind midfield and ping diagonals.', tacticalTipBn: 'মিডফিল্ডের পেছনে ক্লিয়ারেন্স ও লম্বা পাস।' },
        8: { x: 24, y: 46, role: 'Left Box-to-Box Mid', roleBn: 'বক্স-টু-বক্স মিডফিল্ডার', tacticalTip: 'Relentless running and ball recovery.', tacticalTipBn: 'মাঠজুড়ে দৌড়ে বল উদ্ধার করা।' },
        6: { x: 50, y: 42, role: 'Central Playmaker', roleBn: 'সেন্ট্রাল প্লে-মেকার', tacticalTip: 'Direct the passing tempo.', tacticalTipBn: 'পাসের সঠিক দিক ঠিক করা।' },
        11: { x: 76, y: 46, role: 'Right Wing Midfielder', roleBn: 'রাইট মিডফিল্ডার', tacticalTip: 'Combine with Sajon on one-twos.', tacticalTipBn: 'সাজনের সাথে ওয়ান-টু পাসে বক্সে ঢোকা।' },
        9: { x: 50, y: 18, role: 'Poacher Striker', roleBn: 'পোচার স্ট্রাইকার', tacticalTip: 'Attack rebounds and penalty box crosses.', tacticalTipBn: 'রিবাউন্ড ও ক্রস থেকে গোল আদায়।' }
      }
    }
  ],

  7: [
    {
      id: '7-2-3-1',
      name: '2-3-1',
      displayName: '2-3-1 Sylhet Tournament Master',
      displayNameBn: '২-৩-১ সিলেট টুর্নামেন্ট মাস্টার (চ্যাম্পিয়ন ফর্মেশন)',
      squadSize: 7,
      styleName: 'Tournament Winning Doctrine',
      styleNameBn: 'দাউদপুর কাপ জয়ী চ্যাম্পিয়ন রণকৌশল',
      mentality: 'Balanced',
      mentalityBn: 'ভারসাম্যপূর্ণ চ্যাম্পিয়ন ট্যাকটিক্স',
      strategyTitle: 'The Undefeated Daudpur Cup Blueprint (8W - 1D)',
      strategyTitleBn: 'দাউদপুর কাপ অপরাজিত চ্যাম্পিয়নের ঐতিহাসিক ফর্মেশন',
      strategyOverview: 'The exact tactical shape used by Captain Shekhor Mohan Roy to win the Daudpur Tournament 2026! Solid 2-man defensive foundation, vibrant 3-man creative midfield line, and clinical Sajon leading the line.',
      strategyOverviewBn: 'দাউদপুর ২০২৬ টুর্নামেন্টে চ্যাম্পিয়ন হওয়ার আসল ফর্মেশন! শেখর ও আকাশের শক্ত প্রাচীর, মাঝমাঠে সুজন ও দুই উইংয়ে শুভ ও কৌরভ, আর সামনে গোলমেশিন সাজন।',
      strengths: ['Proven tournament-winning balance', 'Blistering wing counter-attacks with Shuvo & Kourov', '4 clean sheets in 5 championship matches'],
      strengthsBn: ['প্রমাণিত ট্রফিজয়ী ফর্মেশন', 'শুভ ও কৌরভের তীব্র গতির উইং আক্রমণ', 'চ্যাম্পিয়নশিপ ম্যাচে ৪টি ক্লিন শিট'],
      coachNotes: 'When Shuvo attacks the left, Srijon pushes up slightly on the right to maintain structure.',
      coachNotesBn: 'শুভ বামে আক্রমণ করলে সৃজন ডানে সামান্য উঠে ব্যালেন্স বজায় রাখবে।',
      metrics: { attack: 92, defense: 90, midfield: 91, pressing: 89 },
      defaultStarters: [1, 17, 5, 7, 6, 11, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Golden Glove winner; high cross interception.', tacticalTipBn: 'গোল্ডেন গ্লাভস জয়ী; যেকোনো উঁচুতে আসা বল রুখে দেওয়া।' },
        17: { x: 34, y: 72, role: 'Left CB & Team Captain', roleBn: 'সেন্ট্রাল ডিফেন্ডার ও অধিনায়ক', tacticalTip: 'Organize team, win ground duels, launch attacks.', tacticalTipBn: 'দল পরিচালনা, নিশ্চিত ট্যাকল ও আক্রমণ শুরু করা।' },
        5: { x: 66, y: 72, role: 'Right CB & Aerial Anchor', roleBn: 'সেন্ট্রাল ডিফেন্ডার (এরিয়াল শিল্ড)', tacticalTip: 'Win every aerial duel in own third.', tacticalTipBn: 'মাথায় বল এলে সবার আগে ক্লিয়ার করা।' },
        7: { x: 20, y: 44, role: 'Left Winger Speedster', roleBn: 'বাম উইঙ্গার (গতির রাজা)', tacticalTip: '91 Pace: Beat defender on outside and cross.', tacticalTipBn: '৯১ পেস: গতি দিয়ে ডিফেন্ডারকে পেছনে ফেলে ক্রস দেওয়া।' },
        6: { x: 50, y: 46, role: 'Attacking Midfield Maestro', roleBn: 'সেন্ট্রাল অ্যাটাকিং মিডফিল্ডার', tacticalTip: 'Thread decisive through-balls into the box.', tacticalTipBn: 'ডি-বক্সে নিখুঁত থ্রু পাস বাড়ানো।' },
        11: { x: 80, y: 44, role: 'Right Winger Inside Forward', roleBn: 'ডান উইঙ্গার (ইনসাইড ফরোয়ার্ড)', tacticalTip: 'Cut inside to unleash curling left/right shots.', tacticalTipBn: 'ভেতরে ঢুকে বাঁকানো শটে গোল করা।' },
        9: { x: 50, y: 18, role: 'Golden Boot Striker', roleBn: 'টপ স্কোরার স্ট্রাইকার', tacticalTip: '6 Tournament Goals: Clinical first-time strikes.', tacticalTipBn: 'টুর্নামেন্টে ৬ গোল: সুযোগ পেলেই প্রথম শটে গোল।' }
      }
    },
    {
      id: '7-3-2-1',
      name: '3-2-1',
      displayName: '3-2-1 Iron Triangle',
      displayNameBn: '৩-২-১ আয়রন ট্রায়াঙ্গেল',
      squadSize: 7,
      styleName: 'Defensive Iron Triangle',
      styleNameBn: 'লৌহকঠিন ৩ ডিফেন্ডার প্রাচীর',
      mentality: 'Defensive',
      mentalityBn: 'ডিফেন্সিভ',
      strategyTitle: '3-Man Backline Wall with Dual Midfield Pivots',
      strategyTitleBn: '৩ জন ডিফেন্ডার ও ডাবল পিভট মিডফিল্ড',
      strategyOverview: 'Used against heavyweight opposition. 3 defenders give full width protection while Sojib and Sujon protect the central corridor.',
      strategyOverviewBn: 'শক্তিশালী প্রতিপক্ষের বিপক্ষে গোল হজম না করার সেরা পদ্ধতি। ৩ জন ডিফেন্ডার মাঠের পুরো প্রস্থ জুড়ে দেয়াল তৈরি করে।',
      strengths: ['Virtually impossible to score against', 'Dominates set pieces and corners', 'Stifles opponent playmakers'],
      strengthsBn: ['প্রতিপক্ষের জন্য গোল করা অত্যন্ত কঠিন', 'কর্নার ও সেট পিসে পূর্ণ নিয়ন্ত্রণ', 'প্রতিপক্ষের প্লে-মেকারকে অকার্যকর করা'],
      coachNotes: 'Both fullbacks Akash and Srijon can overlap alternately when safe.',
      coachNotesBn: 'আকাশ ও সৃজন সুযোগ বুঝে পালাক্রমে আক্রমণে উঠবে।',
      metrics: { attack: 76, defense: 95, midfield: 86, pressing: 82 },
      defaultStarters: [1, 4, 17, 3, 8, 6, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Hold clean sheet at all costs.', tacticalTipBn: 'ক্লিন শিট বজায় রাখা।' },
        4: { x: 20, y: 72, role: 'Left Full-Back', roleBn: 'লেফট ব্যাক', tacticalTip: 'Stop crosses from right flank.', tacticalTipBn: 'প্রতিপক্ষের ক্রস আটকে দেওয়া।' },
        17: { x: 50, y: 74, role: 'Central Sweeper & Captain', roleBn: 'সেন্ট্রাল সুইপার ও অধিনায়ক', tacticalTip: 'Direct the back three and control tempo.', tacticalTipBn: 'তিন ডিফেন্ডারের সমন্বয় ও খেলার গতি নিয়ন্ত্রণ।' },
        3: { x: 80, y: 72, role: 'Right Full-Back', roleBn: 'রাইট ব্যাক', tacticalTip: 'Sliding tackles and flank lockdown.', tacticalTipBn: 'স্লাইডিং ট্যাকল ও ডান পাশ বন্ধ রাখা।' },
        8: { x: 38, y: 48, role: 'Defensive Midfield Pivot', roleBn: 'ডিফেন্সিভ মিডফিল্ডার', tacticalTip: 'Win second balls and foul tactically if needed.', tacticalTipBn: 'লুজ বল রিকভার করা ও প্রতিপক্ষের গতি থামানো।' },
        6: { x: 62, y: 48, role: 'Playmaker Pivot', roleBn: 'প্লে-মেকিং মিডফিল্ডার', tacticalTip: 'Launch quick counter-attacks to Sajon.', tacticalTipBn: 'সাজনের উদ্দেশ্যে কাউন্টার অ্যাটাক বল ছাড়া।' },
        9: { x: 50, y: 18, role: 'Lone Striker', roleBn: 'একক স্ট্রাইকার', tacticalTip: 'Hold up play and draw fouls.', tacticalTipBn: 'বল ধরে রাখা ও ফাউল আদায় করা।' }
      }
    }
  ],

  8: [
    {
      id: '8-3-3-1',
      name: '3-3-1',
      displayName: '3-3-1 Complete Grid',
      displayNameBn: '৩-৩-১ কমপ্লিট গ্রিড',
      squadSize: 8,
      styleName: 'Structured Three-Line Balance',
      styleNameBn: 'তিন লাইনের মজবুত কাঠামো',
      mentality: 'Balanced',
      mentalityBn: 'ভারসাম্যপূর্ণ',
      strategyTitle: '3-Line Formation with Wide Wingers & Playmaker',
      strategyTitleBn: '৩ ডিফেন্ডার, ৩ মিডফিল্ডার ও ১ কেন্দ্রীয় স্ট্রাইকার',
      strategyOverview: 'A masterclass in width and depth. Shekhor anchors central defense flanked by Akash & Srijon, with Shuvo & Kourov wide, Sujon in the hole, and Sajon up top.',
      strategyOverviewBn: 'মাঠের বিস্তার ও গভীরতার অসাধারণ মিশ্রণ। শেখরের সাথে দুই ফুলব্যাক, মাঝমাঠে সুজন ও দুই উইংয়ে শুভ-কৌরভ, আর সামনে সাজন।',
      strengths: ['Natural triangles all over the pitch', 'Wide crosses from both flanks', 'Quick 4-man counter-attack waves'],
      strengthsBn: ['মাঠের সর্বত্র সহজ পাসিং ট্রায়াঙ্গেল', 'দুই উইং থেকেই বিপজ্জনক ক্রস', '৪ জনের ক্ষিপ্র কাউন্টার অ্যাটাক'],
      coachNotes: 'Sujon has total freedom to drift left or right based on where space opens.',
      coachNotesBn: 'সুজনের স্বাধীনতা থাকবে মাঠের যেকোনো পাশে গিয়ে বল রিসিভ করার।',
      metrics: { attack: 89, defense: 88, midfield: 90, pressing: 87 },
      defaultStarters: [1, 4, 17, 3, 7, 6, 11, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Distribute quickly to wide fullbacks.', tacticalTipBn: 'দুই ফুলব্যাককে দ্রুত পাস দেওয়া।' },
        4: { x: 20, y: 72, role: 'Left Back', roleBn: 'লেফট ব্যাক', tacticalTip: 'Support Shuvo down left wing.', tacticalTipBn: 'বাম পাশে শুভর সাথে ওয়ান-টু খেলা।' },
        17: { x: 50, y: 74, role: 'Centre Back & Captain', roleBn: 'সেন্ট্রাল ডিফেন্ডার ও অধিনায়ক', tacticalTip: 'Vocal leader; step up to intercept.', tacticalTipBn: 'সামনে এগিয়ে বল ইন্টারসেপ্ট করা।' },
        3: { x: 80, y: 72, role: 'Right Back', roleBn: 'রাইট ব্যাক', tacticalTip: 'Support Kourov on right flank.', tacticalTipBn: 'ডান পাশে কৌরভকে ওভারল্যাপ কাভার দেওয়া।' },
        7: { x: 20, y: 44, role: 'Left Winger', roleBn: 'বাম উইঙ্গার', tacticalTip: 'Burn past opponent with sprint pace.', tacticalTipBn: 'গতি দিয়ে মার্কারকে পরাস্ত করা।' },
        6: { x: 50, y: 44, role: 'Central Attacking Mid', roleBn: 'অ্যাটাকিং মিডফিল্ডার', tacticalTip: 'Orchestrate through balls.', tacticalTipBn: 'ডিফেন্সচেরা থ্রু বল বাড়ানো।' },
        11: { x: 80, y: 44, role: 'Right Winger', roleBn: 'ডান উইঙ্গার', tacticalTip: 'Cross or cut inside to shoot.', tacticalTipBn: 'ক্রস অথবা ভেতরে ঢুকে শট।' },
        9: { x: 50, y: 18, role: 'Striker', roleBn: 'সেন্টার ফরোয়ার্ড', tacticalTip: 'Stay in central goalmouth zone.', tacticalTipBn: 'গোলপোস্টের ঠিক সামনে অবস্থান নেওয়া।' }
      }
    },
    {
      id: '8-2-4-1',
      name: '2-4-1',
      displayName: '2-4-1 Midfield Box Engine',
      displayNameBn: '২-৪-১ মিডফিল্ড বক্স ইঞ্জিন',
      squadSize: 8,
      styleName: 'Overwhelming Central Engine',
      styleNameBn: '৪ মিডফিল্ডারের তীব্র চাপ',
      mentality: 'Heavy Metal Press',
      mentalityBn: 'হেভি মেটাল হাই প্রেস',
      strategyTitle: 'Midfield Box Overload to Suffocate Opposition',
      strategyTitleBn: 'মাঝমাঠে প্রতিপক্ষকে সম্পূর্ণ অচল করে দেওয়া',
      strategyOverview: '4 midfielders form a diamond box in the center, suffocating any opponent buildup play before it even crosses the halfway line.',
      strategyOverviewBn: 'মাঝমাঠে ৪ জন খেলোয়াড় মিলে একটি বক্স গঠন করে, যা প্রতিপক্ষের খেলা শুরুতেই ভেঙে দেয়।',
      strengths: ['Unstoppable midfield turnover generation', 'High turnover goals in final third', 'High pressing intensity'],
      strengthsBn: ['মাঝমাঠে প্রচুর বল রিকভারি', 'প্রতিপক্ষের অর্ধে বল কেড়ে নিয়ে সরাসরি গোল', 'তীব্র প্রেসিং ক্ষমতা'],
      coachNotes: 'Sojib and Sujon press together as a hunting pair.',
      coachNotesBn: 'সজীব ও সুজন একসাথে শিকারি জুটির মতো প্রেসিং করবে।',
      metrics: { attack: 91, defense: 82, midfield: 95, pressing: 96 },
      defaultStarters: [1, 17, 5, 7, 8, 6, 11, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Act as sweeping sweeper.', tacticalTipBn: 'সুইপারের মতো বেরিয়ে আসা।' },
        17: { x: 35, y: 72, role: 'Left Central Defender', roleBn: 'সেন্ট্রাল ডিফেন্ডার', tacticalTip: 'Cover depth behind aggressive press.', tacticalTipBn: 'প্রেসিংয়ের পেছনের খালি জায়গা কাভার দেওয়া।' },
        5: { x: 65, y: 72, role: 'Right Central Defender', roleBn: 'সেন্ট্রাল ডিফেন্ডার', tacticalTip: 'Clear high balls with authority.', tacticalTipBn: 'উঁচু বল হেড করে উড়িয়ে দেওয়া।' },
        7: { x: 18, y: 46, role: 'Left Wide Midfielder', roleBn: 'বাম মিডফিল্ডার', tacticalTip: 'Pinch inside to win loose balls.', tacticalTipBn: 'ভেতরে এসে বল কেড়ে নেওয়া।' },
        8: { x: 38, y: 52, role: 'Central Holding Mid', roleBn: 'ডিফেন্সিভ মিডফিল্ডার', tacticalTip: 'Win physical tackles in the engine room.', tacticalTipBn: 'শক্ত ট্যাকলে বল দখল করা।' },
        6: { x: 62, y: 44, role: 'Advanced Playmaker', roleBn: 'অ্যাডভান্সড প্লে-মেকার', tacticalTip: 'Fast one-touch combinations.', tacticalTipBn: 'দ্রুত ওয়ান-টাচ ফুটবল।' },
        11: { x: 82, y: 46, role: 'Right Wide Midfielder', roleBn: 'ডান মিডফিল্ডার', tacticalTip: 'Drive into box on transitions.', tacticalTipBn: 'বক্সের ভেতর ড্রাইভ করা।' },
        9: { x: 50, y: 18, role: 'Finishing Striker', roleBn: 'স্ট্রাইকার', tacticalTip: 'Ruthless conversion rate.', tacticalTipBn: 'সুযোগ পেলেই জালে জড়ানো।' }
      }
    }
  ],

  9: [
    {
      id: '9-3-3-2',
      name: '3-3-2',
      displayName: '3-3-2 Dual Strike Wave',
      displayNameBn: '৩-৩-২ জোড়া স্ট্রাইকার অ্যাটাক',
      squadSize: 9,
      styleName: 'Twin Striker Firepower',
      styleNameBn: 'জোড়া ফরোয়ার্ডের বিধ্বংসী আক্রমণ',
      mentality: 'Attacking',
      mentalityBn: 'আক্রমণাত্মক',
      strategyTitle: 'Dual Goal Threat with Sajon & Kourov Upfront',
      strategyTitleBn: 'সাজন ও কৌরভের জোড়া স্ট্রাইকার জুটি',
      strategyOverview: 'Deploying both Sajon Biswas and Kourov Chakroborty as twin strikers creates unbearable chaos for opposition center-backs.',
      strategyOverviewBn: 'সাজন বিশ্বাস ও কৌরভ চক্রবর্তী একসাথে জোড়া স্ট্রাইকার হিসেবে খেললে প্রতিপক্ষের ডিফেন্স পুরোপুরি ভেঙে পড়ে।',
      strengths: ['Overwhelming 2v2 situations in opponent box', 'Balanced 3-man backline security', 'Continuous goal threat'],
      strengthsBn: ['প্রতিপক্ষের বক্সে ২ বনাম ২ সুযোগ তৈরি', 'রক্ষণভাগে ৩ জনের মজবুত অবস্থান', 'প্রতি মুহূর্তে গোলের সম্ভাবনা'],
      coachNotes: 'When Kourov drifts wide, Sajon takes the penalty spot.',
      coachNotesBn: 'কৌরভ উইংয়ে গেলে সাজন পেনাল্টি স্পটে অবস্থান নেবে।',
      metrics: { attack: 94, defense: 87, midfield: 89, pressing: 88 },
      defaultStarters: [1, 4, 17, 3, 7, 8, 6, 9, 11],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Reliable shot stopping.', tacticalTipBn: 'নির্ভরযোগ্য গোলকিপিং।' },
        4: { x: 22, y: 72, role: 'Left Center-Back', roleBn: 'লেফট সেন্টার ব্যাক', tacticalTip: 'Stop wide attacks.', tacticalTipBn: 'ওয়াইড আক্রমণ প্রতিহত করা।' },
        17: { x: 50, y: 74, role: 'Central Commander & Captain', roleBn: 'সেন্ট্রাল ডিফেন্ডার ও অধিনায়ক', tacticalTip: 'Command high line and launch forwards.', tacticalTipBn: 'ডিফেন্স লাইন ওপরে রাখা ও লম্বা পাস।' },
        3: { x: 78, y: 72, role: 'Right Center-Back', roleBn: 'রাইট সেন্টার ব্যাক', tacticalTip: 'Lockdown 1v1 wing defense.', tacticalTipBn: '১ বনাম ১ ডুয়েলে জয়ী হওয়া।' },
        7: { x: 20, y: 46, role: 'Left Midfielder', roleBn: 'বাম মিডফিল্ডার', tacticalTip: 'Cross early for twin strikers.', tacticalTipBn: 'দ্রুত বক্সে ক্রস ফেলা।' },
        8: { x: 50, y: 52, role: 'Central Engine Mid', roleBn: 'সেন্ট্রাল ইঞ্জিন মিডফিল্ডার', tacticalTip: 'Shield the back three.', tacticalTipBn: 'তিন ডিফেন্ডারের সামনে ঢাল হওয়া।' },
        6: { x: 80, y: 46, role: 'Right Attacking Mid', roleBn: 'রাইট অ্যাটাকিং মিডফিল্ডার', tacticalTip: 'Slide balls into striker channels.', tacticalTipBn: 'স্ট্রাইকারদের জন্য থ্রু বল দেওয়া।' },
        9: { x: 38, y: 18, role: 'Left Striker', roleBn: 'বাম স্ট্রাইকার', tacticalTip: 'Clinical poacher runs.', tacticalTipBn: 'ডিফেন্ডারের পেছনে রান নেওয়া।' },
        11: { x: 62, y: 18, role: 'Right Striker', roleBn: 'ডান স্ট্রাইকার', tacticalTip: 'Snap shots and combination play.', tacticalTipBn: 'দ্রুত শট ও ওয়ান-টু কম্বিনেশন।' }
      }
    }
  ],

  10: [
    {
      id: '10-3-3-3',
      name: '3-3-3',
      displayName: '3-3-3 Total Titans (All 10 Players)',
      displayNameBn: '৩-৩-৩ অল-টাইটান ফর্মেশন (১০ জনই মাঠে)',
      squadSize: 10,
      styleName: 'Complete Squad Total Football',
      styleNameBn: '১০ টাইটান যোদ্ধার টোটাল ফুটবল',
      mentality: 'Attacking',
      mentalityBn: 'আক্রমণাত্মক চ্যাম্পিয়ন রূপ',
      strategyTitle: 'All 10 Registered Titans Unified on the Pitch',
      strategyTitleBn: 'টাইটান ফোর্সের ১০ জন বীর একসাথে এক রণক্ষেত্রে',
      strategyOverview: 'The signature 10-player formation! Shuronjit in goal, 3-man impenetrable defense (Akash 4, Shekhor 17, Srijon 3), 3-man relentless midfield (Sojib 8, Sujon 6, Akash 5 as CDM), and 3-man explosive attack (Shuvo 7, Sajon 9, Kourov 11)! Zero bench warmers, 100% brotherhood.',
      strategyOverviewBn: 'টাইটান ফোর্সের নিজস্ব ১০ জনের ঐতিহাসিক ফর্মেশন! গোলকিপার সুরঞ্জিত, ৩ ডিফেন্ডার (আকাশ ৪, শেখর ১৭, সৃজন ৩), ৩ মিডফিল্ডার (সজীব ৮, সুজন ৬, আকাশ ৫), এবং ৩ ফরোয়ার্ড (শুভ ৭, সাজন ৯, কৌরভ ১১)! সবাই একসাথে মাঠে লড়াই করবে।',
      strengths: ['All 10 players active simultaneously', 'Perfect 3-layer balance across pitch', 'Dominates pitch vertically and horizontally'],
      strengthsBn: ['১০ জন খেলোয়াড়ই একসাথে মাঠে উপস্থিত', 'মাঠের ৩ স্তরের নিখুঁত ভারসাম্য', 'মাঠের প্রতিটি কোণে কর্তৃত্ব বজায় রাখা'],
      coachNotes: 'Akash #5 steps into midfield to provide defensive muscle next to Sojib, liberating Sujon to attack.',
      coachNotesBn: 'আকাশ ৫ মিডফিল্ডে উঠে সজীবের পাশে ডিএম হিসেবে খেলবে, যাতে সুজন সম্পূর্ণ মুক্তভাবে আক্রমণ চালাতে পারে।',
      metrics: { attack: 95, defense: 92, midfield: 93, pressing: 94 },
      defaultStarters: [1, 4, 17, 3, 5, 8, 6, 7, 9, 11],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Command your 9 outfield brothers.', tacticalTipBn: 'মাঠের ৯ ভাইয়ের সাথে নিয়মিত যোগাযোগ রাখা।' },
        4: { x: 20, y: 72, role: 'Left Center-Back', roleBn: 'লেফট ব্যাক / স্টপার', tacticalTip: 'Stop crosses and push up with Shuvo.', tacticalTipBn: 'ক্রস আটকানো ও শুভর সাথে সমন্বয়।' },
        17: { x: 50, y: 74, role: 'Central Sweeper & Captain', roleBn: 'সেন্ট্রাল সুইপার ও অধিনায়ক', tacticalTip: 'Orchestrate the entire 10-player symphony.', tacticalTipBn: 'পুরো ১০ জনের দলকে পরিচালনা করা।' },
        3: { x: 80, y: 72, role: 'Right Center-Back', roleBn: 'রাইট ব্যাক / স্টপার', tacticalTip: 'Lock down right touchline.', tacticalTipBn: 'ডান পাশ সম্পূর্ণ লকডাউন রাখা।' },
        5: { x: 34, y: 52, role: 'Defensive Midfield Enforcer', roleBn: 'ডিফেন্সিভ মিডফিল্ডার (ডিএম)', tacticalTip: 'Aerial superiority and breakdown tackles.', tacticalTipBn: 'মাঝমাঠের আকাশে শ্রেষ্ঠত্ব ও শক্ত ট্যাকল।' },
        8: { x: 50, y: 52, role: 'Box-to-Box Midfielder', roleBn: 'বক্স-টু-বক্স মিডফিল্ডার', tacticalTip: 'Connect defense and attack non-stop.', tacticalTipBn: 'রক্ষণ ও আক্রমণের সেতুবন্ধন।' },
        6: { x: 66, y: 44, role: 'Central Attacking Playmaker', roleBn: 'সেন্ট্রাল প্লে-মেকার', tacticalTip: 'Thread golden passes to the front three.', tacticalTipBn: 'সামনের তিন ফরোয়ার্ডকে গোল বানিয়ে দেওয়া।' },
        7: { x: 20, y: 24, role: 'Left Winger Speedster', roleBn: 'বাম উইঙ্গার (গতি তারকা)', tacticalTip: 'Burst past fullback and drill low crosses.', tacticalTipBn: 'ফুলব্যাককে ফেলে গিয়ে নিচু ক্রস দেওয়া।' },
        9: { x: 50, y: 16, role: 'Center Forward Finisher', roleBn: 'সেন্টার ফরোয়ার্ড (গোল শিকারি)', tacticalTip: 'Direct finishes inside 18-yard box.', tacticalTipBn: 'ডি-বক্সের ভেতর এক টাচেই গোল।' },
        11: { x: 80, y: 24, role: 'Right Winger Inside Forward', roleBn: 'ডান উইঙ্গার (ইনসাইড ফরোয়ার্ড)', tacticalTip: 'Cut inside on left foot or test keeper.', tacticalTipBn: 'ভেতরে ঢুকে বাঁকানো শটে গোল করা।' }
      }
    },
    {
      id: '10-4-3-2',
      name: '4-3-2',
      displayName: '4-3-2 Steel Fortress',
      displayNameBn: '৪-৩-২ ইস্পাত কঠিন দুর্গ',
      squadSize: 10,
      styleName: 'Flat Back-Four Barrier',
      styleNameBn: 'চার ডিফেন্ডারের অজেয় দুর্গ',
      mentality: 'Defensive',
      mentalityBn: 'ডিফেন্সিভ প্রাচীর',
      strategyTitle: 'Full Back-Four Defensive Lockdown with Dual Attackers',
      strategyTitleBn: '৪ ডিফেন্ডারের ব্যাকলাইন ও সামনে দ্রুতগতির জোড়া ফরোয়ার্ড',
      strategyOverview: 'A rock-solid 4-defender backline with Akash 4, Shekhor 17, Akash 5, and Srijon 3. Midfield trio of Sojib, Sujon, and Kourov feed pure strikers Shuvo and Sajon.',
      strategyOverviewBn: '৪ জনের বিশ্বস্ত ব্যাকলাইন (আকাশ ৪, শেখর ১৭, আকাশ ৫, সৃজন ৩)। মাঝমাঠে সজীব, সুজন ও কৌরভ বল জোগান শুভ ও সাজনকে।',
      strengths: ['Total defensive protection', 'Near impossible to score against', 'Swift counter-breakouts'],
      strengthsBn: ['রক্ষণভাগে শতভাগ নিরাপত্তা', 'প্রতিপক্ষের গোলের কোনো সুযোগ না দেওয়া', 'ক্ষিপ্র কাউন্টার অ্যাটাক'],
      coachNotes: 'Keep the back four flat and maintain 8-yard distance between center backs.',
      coachNotesBn: 'চার ডিফেন্ডার এক লাইনে থাকবে এবং সেন্ট্রাল ডিফেন্ডারদের দূরত্ব ৮ গজের বেশি হবে না।',
      metrics: { attack: 85, defense: 97, midfield: 88, pressing: 86 },
      defaultStarters: [1, 4, 17, 5, 3, 8, 6, 11, 7, 9],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Protect the clean sheet.', tacticalTipBn: 'ক্লিন শিট রক্ষা করা।' },
        4: { x: 18, y: 74, role: 'Left Back', roleBn: 'লেফট ব্যাক', tacticalTip: 'Cover left flank.', tacticalTipBn: 'বাম উইং সুরক্ষিত রাখা।' },
        17: { x: 38, y: 76, role: 'Left Center Back & Captain', roleBn: 'সেন্টার ব্যাক ও অধিনায়ক', tacticalTip: 'Commander of the back four.', tacticalTipBn: 'চার ডিফেন্ডারের সেনাপতি।' },
        5: { x: 62, y: 76, role: 'Right Center Back', roleBn: 'সেন্টার ব্যাক', tacticalTip: 'Aerial enforcer.', tacticalTipBn: 'উঁচু বলের প্রাচীর।' },
        3: { x: 82, y: 74, role: 'Right Back', roleBn: 'রাইট ব্যাক', tacticalTip: 'Lock down right flank.', tacticalTipBn: 'ডান উইং সুরক্ষিত রাখা।' },
        8: { x: 30, y: 50, role: 'Central Midfielder', roleBn: 'সেন্ট্রাল মিডফিল্ডার', tacticalTip: 'Break up opposition play.', tacticalTipBn: 'প্রতিপক্ষের আক্রমণ নষ্ট করা।' },
        6: { x: 50, y: 46, role: 'Central Playmaker', roleBn: 'সেন্ট্রাল প্লে-মেকার', tacticalTip: 'Visionary through balls.', tacticalTipBn: 'দুরন্ত থ্রু পাস বাড়ানো।' },
        11: { x: 70, y: 50, role: 'Right Midfielder', roleBn: 'রাইট মিডফিল্ডার', tacticalTip: 'Drive forward on turnovers.', tacticalTipBn: 'কাউন্টারে দ্রুত ওপরে ওঠা।' },
        7: { x: 36, y: 20, role: 'Left Forward', roleBn: 'লেফট ফরোয়ার্ড', tacticalTip: 'Diagonal runs into space.', tacticalTipBn: 'খালি জায়গায় কোণাকুণি রান নেওয়া।' },
        9: { x: 64, y: 20, role: 'Center Forward', roleBn: 'সেন্টার ফরোয়ার্ড', tacticalTip: 'Hold up and ruthless finish.', tacticalTipBn: 'বল ধরে রেখে নিখুঁত ফিনিশিং।' }
      }
    }
  ],

  11: [
    {
      id: '11-4-3-3',
      name: '4-3-3',
      displayName: '4-3-3 Pro Attack (FIFA Standard)',
      displayNameBn: '৪-৩-৩ আক্রমণাত্মক মাস্টারক্লাস (ফিফা স্ট্যান্ডার্ড)',
      squadSize: 11,
      styleName: 'High-Octane Modern 4-3-3',
      styleNameBn: 'আধুনিক ৪-৩-৩ পূর্ণাঙ্গ রণকৌশল',
      mentality: 'Attacking',
      mentalityBn: 'আক্রমণাত্মক চ্যাম্পিয়ন ট্যাকটিক্স',
      strategyTitle: '10 Titans Deployed in Full FIFA 11-a-Side Grid + Tactical Flex Anchor',
      strategyTitleBn: '১০ টাইটান যোদ্ধা ও কোচের কৌশলগত ফ্লেক্স অ্যাঙ্কর',
      strategyOverview: 'The full 11-a-side FIFA regulation formation! All 10 Titan Force players occupy their authentic positions: Shuronjit (GK), Akash 4 (LB), Shekhor 17 (CB/Captain), Akash 5 (CB), Srijon 3 (RB), Sojib 8 (CM), Sujon 6 (CAM), Shuvo 7 (LW), Kourov 11 (RW), Sajon 9 (ST). The 11th role is the Coach\'s Tactical Flex Anchor / Numerical Free Pivot (No extra player added, preserving true squad integrity).',
      strategyOverviewBn: 'ফিফা আন্তর্জাতিক মানের পূর্ণাঙ্গ ১১ জনের রণকৌশল! কোনো অতিরিক্ত খেলোয়াড় যোগ না করেই আমাদের ১০ জন টাইটান তাদের নিজস্ব পজিশনে রয়েছে। ১১তম পজিশনটি হলো কোচের ট্যাকটিক্যাল ফ্রি পিভট, যা দলের খেলোয়াড়রা পর্যায়ক্রমে মুভ করে পূরণ করে।',
      strengths: ['Complete field width and depth', 'High pressing with 3 forwards', 'Total pitch balance across all zones'],
      strengthsBn: ['মাঠের পূর্ণাঙ্গ প্রস্থ ও গভীরতা ব্যবহার', '৩ ফরোয়ার্ডের ভয়ংকর হাই প্রেস', 'মাঠের প্রতিটি জোনে নিখুঁত ভারসাম্য'],
      coachNotes: 'Captain Shekhor Mohan Roy directs the backline while Shuvo and Kourov pin back opponent fullbacks.',
      coachNotesBn: 'অধিনায়ক শেখর মোহন রায় ব্যাকলাইন সাজাবেন, আর শুভ ও কৌরভ প্রতিপক্ষের ফুলব্যাকদের চেপে রাখবে।',
      metrics: { attack: 96, defense: 91, midfield: 94, pressing: 95 },
      defaultStarters: [1, 4, 17, 5, 3, 8, 6, 7, 9, 11],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Lead the defense vocally and stop long shots.', tacticalTipBn: 'রক্ষণ নিয়ন্ত্রণ ও দূরপাল্লার শট ঠেকানো।' },
        4: { x: 18, y: 72, role: 'Left-Back (LB)', roleBn: 'লেফট ব্যাক (এলবি)', tacticalTip: 'Overlap Shuvo when space opens.', tacticalTipBn: 'সুযোগ পেলে শুভর পেছন দিয়ে ওভারল্যাপ করা।' },
        17: { x: 38, y: 74, role: 'Central Defender (CB) & Captain', roleBn: 'সেন্ট্রাল ডিফেন্ডার (সিবি) ও অধিনায়ক', tacticalTip: 'Command high line, intercept and distribute.', tacticalTipBn: 'হাই লাইন কমান্ড, ইন্টারসেপ্ট ও নিখুঁত ডিস্ট্রিবিউশন।' },
        5: { x: 62, y: 74, role: 'Central Defender (CB)', roleBn: 'সেন্ট্রাল ডিফেন্ডার (সিবি)', tacticalTip: 'Physical aerial dominance in penalty box.', tacticalTipBn: 'ডি-বক্সে শারীরিক ও এরিয়াল শ্রেষ্ঠত্ব।' },
        3: { x: 82, y: 72, role: 'Right-Back (RB)', roleBn: 'রাইট ব্যাক (আরবি)', tacticalTip: 'Lockdown opposing left winger.', tacticalTipBn: 'প্রতিপক্ষের লেফট উইঙ্গারকে আটকে রাখা।' },
        8: { x: 34, y: 52, role: 'Central Midfielder (CM)', roleBn: 'সেন্ট্রাল মিডফিল্ডার (সিএম)', tacticalTip: 'Win loose balls and switch play.', tacticalTipBn: 'লুজ বল রিকভার করে খেলা পরিবর্তন করা।' },
        6: { x: 66, y: 44, role: 'Attacking Midfielder (CAM)', roleBn: 'অ্যাটাকিং মিডফিল্ডার (ক্যাম)', tacticalTip: 'Slip through-balls into striker channels.', tacticalTipBn: 'ডিফেন্সচেরা থ্রু বল বাড়ানো।' },
        7: { x: 20, y: 24, role: 'Left Winger (LW)', roleBn: 'বাম উইঙ্গার (এলডব্লিউ)', tacticalTip: '91 Pace: sprint past defender and whip crosses.', tacticalTipBn: '৯১ পেস: গতি দিয়ে পেছনে ফেলে বিপজ্জনক ক্রস।' },
        9: { x: 50, y: 16, role: 'Striker (ST)', roleBn: 'সেন্টার ফরোয়ার্ড (এসটি)', tacticalTip: 'Primary goalscorer: finish 1-touch in the box.', tacticalTipBn: '১ টাচে গোল করার ক্ষিপ্র দক্ষতা।' },
        11: { x: 80, y: 24, role: 'Right Winger (RW)', roleBn: 'ডান উইঙ্গার (আরডব্লিউ)', tacticalTip: 'Cut inside to shoot or cross to far post.', tacticalTipBn: 'ভেতরে ঢুকে বাঁকানো শট নেওয়া।' }
      },
      flexSlot: {
        id: 'flex-11',
        title: 'Tactical Flex Anchor (Coach Free Pivot)',
        titleBn: 'কৌশলগত ফ্লেক্স অ্যাঙ্কর (কোচ ফ্রি পিভট)',
        role: 'DM / Free Pivot',
        roleBn: 'ডিএম / ফ্রি পিভট',
        x: 50,
        y: 60,
        tip: 'Fluid tactical zone: Shekhor steps up or Sojib drops back to create numerical overload.',
        tipBn: 'ফ্লুইড ট্যাকটিক্যাল জোন: শেখর সামনে উঠে অথবা সজীব পেছনে নেমে সংখ্যাগত সুবিধা তৈরি করে।'
      }
    },
    {
      id: '11-4-2-3-1',
      name: '4-2-3-1',
      displayName: '4-2-3-1 Modern European Control',
      displayNameBn: '৪-২-৩-১ আধুনিক ইউরোপিয়ান কন্ট্রোল',
      squadSize: 11,
      styleName: 'Double-Pivot Positional Control',
      styleNameBn: 'ডাবল পিভট পজিশনাল কন্ট্রোল',
      mentality: 'Balanced',
      mentalityBn: 'ভারসাম্যপূর্ণ কৌশল',
      strategyTitle: 'Double Defensive Pivot Shielding the Backline',
      strategyTitleBn: 'ডাবল ডিফেন্সিভ পিভট ও ৩ অ্যাটাকিং মিডফিল্ডার',
      strategyOverview: 'The world\'s most popular tournament knockout formation! Dual CDM pivots protect Captain Shekhor\'s back four, while three creative attacking midfielders create endless chances for Sajon.',
      strategyOverviewBn: 'বিশ্ব ফুটবলের সবচেয়ে জনপ্রিয় নকআউট ফর্মেশন! ডাবল পিভট মিডফিল্ড শেখরের ব্যাকলাইনকে দুর্ভেদ্য সুরক্ষা দেয়, আর ৩ জন অ্যাটাকার সাজনকে নিয়মিত বল জোগায়।',
      strengths: ['Ultimate tournament knockout stability', 'Double defensive layer in central channel', 'Dynamic 4-man attacking frontline'],
      strengthsBn: ['নকআউট টুর্নামেন্টের সর্বোচ্চ স্থায়িত্ব', 'মাঝমাঠে ডাবল ডিফেন্সিভ শিল্ড', '৪ জনের ক্ষিপ্র আক্রমণ ফ্রন্টলাইন'],
      coachNotes: 'Sojib and the CDM anchor alternate who supports attacks while the other stays back.',
      coachNotesBn: 'সজীব ও ডিএম পিভটের একজন ওপরে উঠলে অপরজন অবশ্যই নিচে থেকে কাভার দেবে।',
      metrics: { attack: 92, defense: 94, midfield: 96, pressing: 90 },
      defaultStarters: [1, 4, 17, 5, 3, 8, 6, 7, 9, 11],
      playerCoords: {
        1: { x: 50, y: 88, role: 'Goalkeeper', roleBn: 'গোলকিপার', tacticalTip: 'Dominate the 6-yard box.', tacticalTipBn: '৬-গজ বক্স সম্পূর্ণ নিজের নিয়ন্ত্রণে রাখা।' },
        4: { x: 18, y: 74, role: 'Left-Back (LB)', roleBn: 'লেফট ব্যাক', tacticalTip: 'Safe passing and flank defense.', tacticalTipBn: 'নিরাপদ পাস ও উইং রক্ষা।' },
        17: { x: 38, y: 76, role: 'Central Defender & Captain', roleBn: 'সেন্ট্রাল ডিফেন্ডার ও অধিনায়ক', tacticalTip: 'Vocal organization and defensive masterclass.', tacticalTipBn: 'রক্ষণ নিয়ন্ত্রণ ও ট্যাকল মাস্টারক্লাস।' },
        5: { x: 62, y: 76, role: 'Central Defender', roleBn: 'সেন্ট্রাল ডিফেন্ডার', tacticalTip: 'Clear all opponent crosses.', tacticalTipBn: 'প্রতিপক্ষের সব ক্রস ক্লিয়ার করা।' },
        3: { x: 82, y: 74, role: 'Right-Back (RB)', roleBn: 'রাইট ব্যাক', tacticalTip: 'Slide tackles and wing cover.', tacticalTipBn: 'স্লাইডিং ট্যাকল ও উইং কাভার।' },
        8: { x: 38, y: 58, role: 'Holding Midfielder (CDM)', roleBn: 'হোল্ডিং মিডফিল্ডার (সিডিএম)', tacticalTip: 'Screen passes into opponent forwards.', tacticalTipBn: 'প্রতিপক্ষের ফরোয়ার্ডের পাসের লাইন বন্ধ করা।' },
        7: { x: 22, y: 36, role: 'Left Attacking Mid (LAM)', roleBn: 'বাম অ্যাটাকিং মিডফিল্ডার', tacticalTip: 'Drive inside towards goal.', tacticalTipBn: 'গোলের দিকে ভেতরে ড্রাইভ করা।' },
        6: { x: 50, y: 34, role: 'Central Attacking Mid (CAM)', roleBn: 'সেন্ট্রাল প্লে-মেকার (ক্যাম)', tacticalTip: 'The creative playmaker of the side.', tacticalTipBn: 'দলের প্রধান সৃষ্টিশীল প্লে-মেকার।' },
        11: { x: 78, y: 36, role: 'Right Attacking Mid (RAM)', roleBn: 'ডান অ্যাটাকিং মিডফিল্ডার', tacticalTip: 'Overload the right half-space.', tacticalTipBn: 'ডান পাশের হাফ-স্পেসে চাপ সৃষ্টি।' },
        9: { x: 50, y: 16, role: 'Center Forward (ST)', roleBn: 'সেন্টার ফরোয়ার্ড', tacticalTip: 'Lead the press and finish.', tacticalTipBn: 'সামনে থেকে প্রেস ও ফিনিশ করা।' }
      },
      flexSlot: {
        id: 'flex-11',
        title: 'Secondary Holding Pivot (Coach Slot)',
        titleBn: 'দ্বিতীয় হোল্ডিং পিভট (কোচ স্লট)',
        role: 'CDM / Deep Pivot',
        roleBn: 'সিডিএম / ডিপ পিভট',
        x: 62,
        y: 58,
        tip: 'Deep tactical screen protecting the central backline alongside Sojib.',
        tipBn: 'সজীবের সাথে ডিফেন্সের সামনে দেয়াল তৈরি করা সেন্ট্রাল স্ক্রিন।'
      }
    }
  ]
};
