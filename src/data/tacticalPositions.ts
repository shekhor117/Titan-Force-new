export interface TacticalPositionDef {
  code: string;
  name: string;
  nameBn: string;
  roleGroup: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  roleGroupBn: string;
  x: number; // percentage 0-100 on vertical pitch
  y: number; // percentage 0-100 on vertical pitch (top = opponent goal, bottom = own goal)
  description: string;
  descriptionBn: string;
}

export const TACTICAL_POSITIONS_MAP: Record<string, TacticalPositionDef> = {
  GK: {
    code: 'GK',
    name: 'Goalkeeper',
    nameBn: 'গোলরক্ষক',
    roleGroup: 'Goalkeeper',
    roleGroupBn: 'গোলরক্ষক',
    x: 50,
    y: 91,
    description: 'Last line of defense; commands the penalty box, stops shots, and initiates build-up play.',
    descriptionBn: 'দলের শেষ প্রতিরোধ; গোল এরিয়া নিয়ন্ত্রণ, শট আটকানো ও বিল্ড-আপ সূচনা করে।'
  },
  SW: {
    code: 'SW',
    name: 'Sweeper / Libero',
    nameBn: 'সুইপার / লিবেরো',
    roleGroup: 'Defender',
    roleGroupBn: 'ডিফেন্ডার',
    x: 50,
    y: 84,
    description: 'Free defender behind the backline sweeping loose balls and stepping up to break lines.',
    descriptionBn: 'ব্যাকলাইনের পেছনের মুক্ত ডিফেন্ডার, বল ক্লিয়ার ও পজিশন উদ্ধার করে।'
  },
  CB: {
    code: 'CB',
    name: 'Centre-Back',
    nameBn: 'সেন্টার ব্যাক',
    roleGroup: 'Defender',
    roleGroupBn: 'ডিফেন্ডার',
    x: 49,
    y: 77,
    description: 'Central defensive powerhouse; blocks shots, wins aerial battles, and marshals the backline.',
    descriptionBn: 'কেন্দ্রীয় রক্ষণভাগের স্তম্ভ; এরিয়াল ডুয়েল জয় ও প্রতিপক্ষের আক্রমণ প্রতিহত করে।'
  },
  LCB: {
    code: 'LCB',
    name: 'Left Centre-Back',
    nameBn: 'লেফট সেন্টার ব্যাক',
    roleGroup: 'Defender',
    roleGroupBn: 'ডিফেন্ডার',
    x: 35,
    y: 77,
    description: 'Left-sided central defender specializing in left-channel covering and diagonal distribution.',
    descriptionBn: 'বাম পাশের সেন্ট্রাল ডিফেন্ডার; বাম চ্যানেলের কভার ও ডায়াগোনাল পাসিংয়ে দক্ষ।'
  },
  RCB: {
    code: 'RCB',
    name: 'Right Centre-Back',
    nameBn: 'রাইট সেন্টার ব্যাক',
    roleGroup: 'Defender',
    roleGroupBn: 'ডিফেন্ডার',
    x: 65,
    y: 77,
    description: 'Right-sided central defender anchoring the right half-space and repelling crosses.',
    descriptionBn: 'ডান পাশের সেন্ট্রাল ডিফেন্ডার; ডান হাফ-স্পেস সুরক্ষা ও ক্রস ক্লিয়ারে কার্যকর।'
  },
  LB: {
    code: 'LB',
    name: 'Left-Back',
    nameBn: 'লেফট ব্যাক',
    roleGroup: 'Defender',
    roleGroupBn: 'ডিফেন্ডার',
    x: 22,
    y: 77,
    description: 'Full-back locking down the left flank against wingers and supporting width during possession.',
    descriptionBn: 'বাম প্রান্তের ফুল-ব্যাক; প্রতিপক্ষের উইঙ্গার থামানো ও আক্রমণের সময় সাপোর্ট দেয়।'
  },
  RB: {
    code: 'RB',
    name: 'Right-Back',
    nameBn: 'রাইট ব্যাক',
    roleGroup: 'Defender',
    roleGroupBn: 'ডিফেন্ডার',
    x: 72,
    y: 78,
    description: 'Full-back defending the right flank with aggressive tackling and explosive overlap runs.',
    descriptionBn: 'ডান প্রান্তের ফুল-ব্যাক; নির্ভুল ট্যাকলিং ও দ্রুত ওভারল্যাপ দৌড়ে কার্যকরী ভূমিকা রাখে।'
  },
  LWB: {
    code: 'LWB',
    name: 'Left Wing-Back',
    nameBn: 'লেফট উইং ব্যাক',
    roleGroup: 'Defender',
    roleGroupBn: 'ডিফেন্ডার',
    x: 18,
    y: 66,
    description: 'High-energy wing-back covering the entire left corridor in 3-at-the-back or 5-at-the-back setups.',
    descriptionBn: 'বাম করিডোর জুড়ে নিরলস পরিশ্রমী উইং-ব্যাক; ক্রস প্রদান ও রিকভারিতে ক্ষিপ্র।'
  },
  RWB: {
    code: 'RWB',
    name: 'Right Wing-Back',
    nameBn: 'রাইট উইং ব্যাক',
    roleGroup: 'Defender',
    roleGroupBn: 'ডিফেন্ডার',
    x: 82,
    y: 66,
    description: 'Attacking full-back providing width, whipped deliveries, and rapid transition defense.',
    descriptionBn: 'আক্রমণাত্মক উইং-ব্যাক; ডান প্রান্ত দিয়ে ক্রস ও দ্রুত ট্রানজিশন ডিফেন্স নিশ্চিত করে।'
  },
  DM: {
    code: 'DM',
    name: 'Defensive Midfielder',
    nameBn: 'ডিফেন্সিভ মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 49,
    y: 64,
    description: 'Defensive screen stationed just ahead of the center-backs; disrupts counter-attacks and shields the box.',
    descriptionBn: 'রক্ষণভাগের ঠিক সামনের ঢাল; প্রতিপক্ষের আক্রমণ ভেঙে দেওয়া ও বল পুনরুদ্ধারে পারদর্শী।'
  },
  CDM: {
    code: 'CDM',
    name: 'Central Defensive Midfielder',
    nameBn: 'সেন্ট্রাল ডিফেন্সিভ মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 49,
    y: 64,
    description: 'Anchor who regulates midfield defensive balance, collects loose balls, and launches transition plays.',
    descriptionBn: 'মিডফিল্ডের ভারসাম্য রক্ষাকারী, ট্যাকল জয়ী ও প্রতি-আক্রমণ শুরুকারী।'
  },
  CM: {
    code: 'CM',
    name: 'Central Midfielder',
    nameBn: 'সেন্ট্রাল মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 49,
    y: 55,
    description: 'Engine room orchestrator operating in the center circle; dictates tempo with short and long passes.',
    descriptionBn: 'মাঝমাঠের প্রাণকেন্দ্র; বল ডিস্ট্রিবিউশন ও খেলার গতি নিয়ন্ত্রণ করে।'
  },
  LCM: {
    code: 'LCM',
    name: 'Left Central Midfielder',
    nameBn: 'লেফট সেন্ট্রাল মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 36,
    y: 54,
    description: 'Left-sided midfielder linking defense to attack via the left inside channel.',
    descriptionBn: 'বাম পাশের সেন্ট্রাল মিডফিল্ডার; বাম চ্যানেল দিয়ে বল লিঙ্ক-আপ করে।'
  },
  RCM: {
    code: 'RCM',
    name: 'Right Central Midfielder',
    nameBn: 'রাইট সেন্ট্রাল মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 64,
    y: 54,
    description: 'Right-sided midfielder executing progressive carries and quick give-and-goes.',
    descriptionBn: 'ডান পাশের সেন্ট্রাল মিডফিল্ডার; আক্রমণ গঠন ও বল সরবরাহে দক্ষ।'
  },
  LM: {
    code: 'LM',
    name: 'Left Midfielder',
    nameBn: 'লেফট মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 24,
    y: 55,
    description: 'Wide midfielder balancing defensive tracking and progressive ball progression on the left flank.',
    descriptionBn: 'বাম প্রান্তের মিডফিল্ডার; ট্যাকটিক্যাল ট্র্যাকিং ও উইং আক্রমণ সমন্বয় করে।'
  },
  RM: {
    code: 'RM',
    name: 'Right Midfielder',
    nameBn: 'রাইট মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 74,
    y: 55,
    description: 'Wide midfielder controlling the right wing with crossing accuracy and midfield pressing.',
    descriptionBn: 'ডান প্রান্তের মিডফিল্ডার; ক্রসিং দক্ষতা ও মাঝমাঠে প্রেসিংয়ে শক্তিশালী।'
  },
  CAM: {
    code: 'CAM',
    name: 'Attacking Midfielder',
    nameBn: 'অ্যাটাকিং মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 50,
    y: 41,
    description: 'Number 10 creative maestro operating in the pocket between lines; delivers through-balls and finishes chances.',
    descriptionBn: '১০ নম্বর প্লেমেকার; ডিফেন্স-ভাঙা থ্রু বল প্রদান ও গোল সৃষ্টির কারিগর।'
  },
  AM: {
    code: 'AM',
    name: 'Attacking Midfielder',
    nameBn: 'অ্যাটাকিং মিডফিল্ডার',
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 50,
    y: 41,
    description: 'Direct creative playmaker supporting strikers and testing goalkeepers from distance.',
    descriptionBn: 'সরাসরি আক্রমণাত্মক প্লেমেকার; দূরপাল্লার শট ও গোল করার সুযোগ তৈরিতে পারদর্শী।'
  },
  LW: {
    code: 'LW',
    name: 'Left Winger',
    nameBn: 'লেফট উইঙ্গার',
    roleGroup: 'Forward',
    roleGroupBn: 'ফরোয়ার্ড',
    x: 24,
    y: 27,
    description: 'Speedy attacker hugging or cutting inside from the left wing to curl shots or deliver cutbacks.',
    descriptionBn: 'গতিশীল উইঙ্গার; বাম দিক দিয়ে ড্রিবলিং করে ভেতরে ঢুকে শট বা কাটব্যাক দেয়।'
  },
  RW: {
    code: 'RW',
    name: 'Right Winger',
    nameBn: 'রাইট উইঙ্গার',
    roleGroup: 'Forward',
    roleGroupBn: 'ফরোয়ার্ড',
    x: 76,
    y: 27,
    description: 'Dynamic flank forward beating full-backs with pace, trickery, and pinpoint crosses into the penalty box.',
    descriptionBn: 'ডান উইং দিয়ে গতি ও ড্রিবলিংয়ে ডিফেন্ডার পরাস্ত করে নির্ভুল ক্রস বা শট নেয়।'
  },
  CF: {
    code: 'CF',
    name: 'Centre-Forward',
    nameBn: 'সেন্টার ফরোয়ার্ড',
    roleGroup: 'Forward',
    roleGroupBn: 'ফরোয়ার্ড',
    x: 50,
    y: 28,
    description: 'Forward dropping into space to combine with wingers and attacking midfielders before attacking the box.',
    descriptionBn: 'সেন্টার ফরোয়ার্ড; বল হোল্ড-আপ করে সতীর্থদের জায়গা তৈরি ও ফিনিশিং করে।'
  },
  SS: {
    code: 'SS',
    name: 'Second Striker',
    nameBn: 'সেকেন্ড স্ট্রাইকার',
    roleGroup: 'Forward',
    roleGroupBn: 'ফরোয়ার্ড',
    x: 50,
    y: 30,
    description: 'Shadow forward floating around the main striker to exploit defensive blind spots.',
    descriptionBn: 'মূল স্ট্রাইকারের পেছনে বিচরণ করে ডিফেন্সের ফাঁকা জায়গা কাজে লাগায়।'
  },
  ST: {
    code: 'ST',
    name: 'Striker',
    nameBn: 'স্ট্রাইকার',
    roleGroup: 'Forward',
    roleGroupBn: 'ফরোয়ার্ড',
    x: 50,
    y: 18,
    description: 'Predatory target man and finisher; leads the line, makes penetrating penalty-box runs, and scores goals.',
    descriptionBn: 'মূল গোলশিকারী স্ট্রাইকার; বক্সের ভেতরে তীক্ষ্ণ মুভমেন্ট ও নিখুঁত ফিনিশিংয়ে গোল আদায় করে।'
  }
};

export const getTacticalPosition = (rawCode: string): TacticalPositionDef => {
  const clean = rawCode.trim().toUpperCase();
  if (TACTICAL_POSITIONS_MAP[clean]) {
    return TACTICAL_POSITIONS_MAP[clean];
  }

  // Fallback defaults if non-standard string is provided
  if (clean.includes('GK') || clean.includes('GOAL')) return TACTICAL_POSITIONS_MAP.GK;
  if (clean.includes('CB') || clean.includes('DEF')) return TACTICAL_POSITIONS_MAP.CB;
  if (clean.includes('RB')) return TACTICAL_POSITIONS_MAP.RB;
  if (clean.includes('LB')) return TACTICAL_POSITIONS_MAP.LB;
  if (clean.includes('DM') || clean.includes('CDM')) return TACTICAL_POSITIONS_MAP.DM;
  if (clean.includes('CAM') || clean.includes('AM')) return TACTICAL_POSITIONS_MAP.CAM;
  if (clean.includes('CM') || clean.includes('MID')) return TACTICAL_POSITIONS_MAP.CM;
  if (clean.includes('LW')) return TACTICAL_POSITIONS_MAP.LW;
  if (clean.includes('RW')) return TACTICAL_POSITIONS_MAP.RW;
  if (clean.includes('ST') || clean.includes('CF') || clean.includes('FWD')) return TACTICAL_POSITIONS_MAP.ST;

  return {
    code: clean,
    name: clean,
    nameBn: clean,
    roleGroup: 'Midfielder',
    roleGroupBn: 'মিডফিল্ডার',
    x: 50,
    y: 50,
    description: 'Versatile field player contributing to team tactics.',
    descriptionBn: 'দলের কৌশলে অবদান রাখা বহুমুখী খেলোয়াড়।'
  };
};
