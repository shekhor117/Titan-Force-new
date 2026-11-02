import { Player } from '../data/clubData';
import { TacticalFormation, FormationPlayerNode } from '../data/tacticalFormationsData';

export interface FormationExportOptions {
  formation: TacticalFormation;
  starters: { player: Player; node: FormationPlayerNode }[];
  substitutes: Player[];
  playerCount: number;
  mode: 'poster' | 'pitch';
  format?: 'png' | 'jpeg';
  lang: 'en' | 'bn';
}

/**
 * Downloads a data URL as a file in the browser safely.
 */
export function triggerFileDownload(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Safely loads an image from same-origin path without CORS crossOrigin header issues.
 */
function loadLocalImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    // Do NOT set crossOrigin on same-origin local assets
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
    setTimeout(() => resolve(null), 800);
  });
}

/**
 * Renders complete authentic football pitch turf and crisp white markings.
 * Guaranteed to draw boundary lines, halfway line, center circle, penalty boxes,
 * 6-yard boxes, penalty arcs, and corner arcs.
 */
function drawPitchTurfAndMarkings(
  ctx: CanvasRenderingContext2D,
  pitchX: number,
  pitchY: number,
  pitchWidth: number,
  pitchHeight: number,
  boardImg: HTMLImageElement | null,
  logoImg: HTMLImageElement | null
) {
  ctx.save();
  roundRect(ctx, pitchX, pitchY, pitchWidth, pitchHeight, 22);
  ctx.clip();

  // 1. Draw Turf Grass
  if (boardImg) {
    ctx.drawImage(boardImg, pitchX, pitchY, pitchWidth, pitchHeight);
  } else {
    // High-fidelity alternating lawn stripes
    const stripeCount = 12;
    const stripeH = pitchHeight / stripeCount;
    for (let i = 0; i < stripeCount; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#1b4d2e' : '#164026';
      ctx.fillRect(pitchX, pitchY + i * stripeH, pitchWidth, stripeH);
    }
  }

  // 2. Exact Pitch Markings
  const pad = Math.round(pitchWidth * 0.045); // e.g. 43px
  const bX = pitchX + pad;
  const bY = pitchY + pad;
  const bW = pitchWidth - pad * 2;
  const bH = pitchHeight - pad * 2;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 3.5;

  // Outer Touchlines & Goal Lines
  ctx.strokeRect(bX, bY, bW, bH);

  // Halfway Line
  const midY = bY + bH / 2;
  ctx.beginPath();
  ctx.moveTo(bX, midY);
  ctx.lineTo(bX + bW, midY);
  ctx.stroke();

  // Center Circle
  const centerX = bX + bW / 2;
  const centerRadius = Math.round(bW * 0.16); // ~140px
  ctx.beginPath();
  ctx.arc(centerX, midY, centerRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Center Spot
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  ctx.arc(centerX, midY, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Center Circle Watermark Crest (Soft opacity, NO colliding text!)
  if (logoImg) {
    const logoSize = Math.round(centerRadius * 1.5);
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.drawImage(
      logoImg,
      centerX - logoSize / 2,
      midY - logoSize / 2,
      logoSize,
      logoSize
    );
    ctx.restore();
  } else {
    // Subtle circular watermark glow
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, midY, centerRadius * 0.7, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Top Penalty Box (Opponent Goal)
  const boxW = Math.round(bW * 0.52);
  const boxH = Math.round(bH * 0.16);
  const boxX = centerX - boxW / 2;
  ctx.strokeRect(boxX, bY, boxW, boxH);

  // Top 6-yard Box (Goal Area)
  const smallBoxW = Math.round(bW * 0.25);
  const smallBoxH = Math.round(bH * 0.06);
  ctx.strokeRect(centerX - smallBoxW / 2, bY, smallBoxW, smallBoxH);

  // Top Penalty Spot
  const penaltyDist = Math.round(bH * 0.11);
  ctx.beginPath();
  ctx.arc(centerX, bY + penaltyDist, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Top Penalty Arc (D-arc outside box)
  ctx.beginPath();
  ctx.arc(centerX, bY + penaltyDist, Math.round(bW * 0.10), 0.65, Math.PI - 0.65, false);
  ctx.stroke();

  // Bottom Penalty Box (Our Goal / GK)
  ctx.strokeRect(boxX, bY + bH - boxH, boxW, boxH);

  // Bottom 6-yard Box
  ctx.strokeRect(centerX - smallBoxW / 2, bY + bH - smallBoxH, smallBoxW, smallBoxH);

  // Bottom Penalty Spot
  ctx.beginPath();
  ctx.arc(centerX, bY + bH - penaltyDist, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Bottom Penalty Arc
  ctx.beginPath();
  ctx.arc(centerX, bY + bH - penaltyDist, Math.round(bW * 0.10), Math.PI + 0.65, 2 * Math.PI - 0.65, false);
  ctx.stroke();

  // Corner Arcs (4 corners)
  const cornerR = Math.round(bW * 0.035);
  ctx.beginPath();
  ctx.arc(bX, bY, cornerR, 0, Math.PI / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(bX + bW, bY, cornerR, Math.PI / 2, Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(bX, bY + bH, cornerR, 1.5 * Math.PI, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(bX + bW, bY + bH, cornerR, Math.PI, 1.5 * Math.PI);
  ctx.stroke();

  // Goal Lines Frame
  const goalW = Math.round(bW * 0.18);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 4;
  ctx.strokeRect(centerX - goalW / 2, bY - 14, goalW, 14);
  ctx.strokeRect(centerX - goalW / 2, bY + bH, goalW, 14);

  ctx.restore();

  return { bX, bY, bW, bH };
}

/**
 * Draws an individual player token on the pitch.
 */
function drawPlayerToken(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  player: Player,
  node: FormationPlayerNode,
  radius: number = 30
) {
  const isCaptain = player.num === 17;
  const isGK = node.role === 'GK';

  // Drop Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;

  // Token Circle
  ctx.beginPath();
  ctx.arc(px, py, radius, 0, Math.PI * 2);

  if (isCaptain) {
    const capGrad = ctx.createLinearGradient(px - radius, py - radius, px + radius, py + radius);
    capGrad.addColorStop(0, '#e11d48');
    capGrad.addColorStop(1, '#9f1239');
    ctx.fillStyle = capGrad;
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3.5;
    ctx.stroke();
  } else if (isGK) {
    const gkGrad = ctx.createLinearGradient(px - radius, py - radius, px + radius, py + radius);
    gkGrad.addColorStop(0, '#d97706');
    gkGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = gkGrad;
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
  } else {
    const fldGrad = ctx.createLinearGradient(px - radius, py - radius, px + radius, py + radius);
    fldGrad.addColorStop(0, '#18181b');
    fldGrad.addColorStop(1, '#09090b');
    ctx.fillStyle = fldGrad;
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  ctx.shadowColor = 'transparent';

  // Jersey Number
  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${Math.round(radius * 0.72)}px "Arial Black", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${player.num}`, px, py - 1);

  // Captain 'C' Badge
  if (isCaptain) {
    const cRadius = Math.round(radius * 0.35);
    const cX = px + radius - 7;
    const cY = py - radius + 7;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(cX, cY, cRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#09090b';
    ctx.font = `900 ${Math.round(cRadius * 1.2)}px sans-serif`;
    ctx.fillText('C', cX, cY);
  }

  // Role Chip under token
  const chipW = Math.round(radius * 1.3);
  const chipH = 16;
  ctx.fillStyle = '#09090b';
  roundRect(ctx, px - chipW / 2, py + radius - 7, chipW, chipH, 4);
  ctx.fill();
  ctx.strokeStyle = isCaptain ? '#fbbf24' : '#71717a';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = isCaptain ? '#fbbf24' : '#f43f5e';
  ctx.font = '800 10px monospace';
  ctx.fillText(node.role, px, py + radius + 1);

  // Name Placard Underneath
  ctx.textBaseline = 'alphabetic';
  const nameY = py + radius + 22;
  const nameText = isCaptain ? `${player.name.toUpperCase()} (C)` : player.name.toUpperCase();
  ctx.font = '800 12px sans-serif';
  const textWidth = ctx.measureText(nameText).width;
  const placardW = Math.max(textWidth + 18, 72);
  const placardH = 20;

  ctx.fillStyle = 'rgba(9, 9, 11, 0.94)';
  roundRect(ctx, px - placardW / 2, nameY - 14, placardW, placardH, 6);
  ctx.fill();
  ctx.strokeStyle = isCaptain ? 'rgba(251, 191, 36, 0.7)' : 'rgba(244, 63, 94, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.fillText(nameText, px, nameY);
}

/**
 * High-definition Canvas renderer that creates an official Titan Force Mulikandi
 * matchday tactical formation sheet / poster (1200 x 1720 px).
 */
export async function generateTacticalPosterCanvas(options: {
  formation: TacticalFormation;
  starters: { player: Player; node: FormationPlayerNode }[];
  substitutes: Player[];
  playerCount: number;
  lang: 'en' | 'bn';
  format?: 'png' | 'jpeg';
}): Promise<string> {
  const { formation, starters, substitutes, playerCount, lang, format = 'png' } = options;

  const [boardImg, logoImg] = await Promise.all([
    loadLocalImage('/assets/aistudio/tactical-board__1__4dfcd60c.png'),
    loadLocalImage('/logos/titanforce-logo.svg')
  ]);

  const width = 1200;
  const height = 1720;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // 1. Overall Dark Carbon Stadium Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#0a0a0d');
  bgGrad.addColorStop(0.3, '#101217');
  bgGrad.addColorStop(0.7, '#0d0f14');
  bgGrad.addColorStop(1, '#07080a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle radial glow behind the pitch
  const glow = ctx.createRadialGradient(width / 2, 750, 80, width / 2, 750, 700);
  glow.addColorStop(0, 'rgba(225, 29, 72, 0.10)');
  glow.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // 2. Club Header Banner
  const redBar = ctx.createLinearGradient(0, 0, width, 0);
  redBar.addColorStop(0, '#e11d48');
  redBar.addColorStop(0.5, '#f43f5e');
  redBar.addColorStop(1, '#e11d48');
  ctx.fillStyle = redBar;
  ctx.fillRect(0, 0, width, 8);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Montserrat", "Arial Black", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('TITAN FORCE MULIKANDI FC', 60, 58);

  ctx.fillStyle = '#f59e0b';
  ctx.font = '700 13px sans-serif';
  ctx.fillText('OFFICIAL MATCHDAY TACTICAL FORMATION & STARTING XI', 60, 84);

  ctx.fillStyle = '#71717a';
  ctx.font = '600 12px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('GROUND: MULIKANDI HIGH SCHOOL · ZAKIGONJ, SYLHET', width - 60, 58);
  ctx.fillText('TOURNAMENT: DAUDPUR CUP 2026 CHAMPIONS', width - 60, 84);

  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(60, 102);
  ctx.lineTo(width - 60, 102);
  ctx.stroke();

  // Formation Info Pills Bar
  const badgeY = 118;
  ctx.fillStyle = '#e11d48';
  roundRect(ctx, 60, badgeY, 150, 36, 10);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 18px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`SHAPE: ${formation.code}`, 135, badgeY + 24);

  ctx.fillStyle = '#18181b';
  roundRect(ctx, 222, badgeY, 175, 36, 10);
  ctx.fill();
  ctx.strokeStyle = '#3f3f46';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = '#e4e4e7';
  ctx.font = '700 13px sans-serif';
  ctx.fillText(`${playerCount} PLAYERS ON PITCH`, 309, badgeY + 23);

  ctx.fillStyle = '#18181b';
  roundRect(ctx, 409, badgeY, 230, 36, 10);
  ctx.fill();
  ctx.strokeStyle = '#3f3f46';
  ctx.stroke();
  ctx.fillStyle = '#fbbf24';
  ctx.font = '700 13px sans-serif';
  ctx.fillText(`★ ${formation.categoryTag}`, 524, badgeY + 23);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#a1a1aa';
  ctx.font = '600 13px sans-serif';
  const styleText = lang === 'en' ? formation.formationStyleEn : formation.formationStyleBn;
  ctx.fillText(styleText, width - 60, badgeY + 24);

  // 3. Draw Pitch with Guaranteed Markings
  const pitchWidth = 960;
  const pitchHeight = 1280;
  const pitchX = (width - pitchWidth) / 2;
  const pitchY = 170;

  // Outer Board Border & Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 25;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = '#0f2415';
  roundRect(ctx, pitchX - 8, pitchY - 8, pitchWidth + 16, pitchHeight + 16, 28);
  ctx.fill();
  ctx.shadowColor = 'transparent';

  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw turf and complete pitch markings
  const bounds = drawPitchTurfAndMarkings(ctx, pitchX, pitchY, pitchWidth, pitchHeight, boardImg, logoImg);

  // Active Formation Tag on Top-Left of Pitch
  ctx.fillStyle = 'rgba(9, 9, 11, 0.90)';
  roundRect(ctx, pitchX + 16, pitchY + 16, 220, 38, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(225, 29, 72, 0.5)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#f43f5e';
  ctx.font = '900 16px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(formation.code, pitchX + 28, pitchY + 41);

  ctx.fillStyle = '#e4e4e7';
  ctx.font = '700 12px sans-serif';
  ctx.fillText(`· ${playerCount} STARTERS`, pitchX + 100, pitchY + 40);

  // 4. Render Starters onto the Pitch
  starters.forEach(({ player, node }) => {
    // Map percentage coordinates (0-100) exactly to pitch bounds
    const px = bounds.bX + (node.x / 100) * bounds.bW;
    const py = bounds.bY + (node.y / 100) * bounds.bH;
    drawPlayerToken(ctx, px, py, player, node, 28);
  });

  // 5. Tactical Substitutes & Reserves Bench
  const benchY = pitchY + pitchHeight + 16;
  const benchHeight = 110;

  ctx.fillStyle = '#111217';
  roundRect(ctx, 60, benchY, width - 120, benchHeight, 16);
  ctx.fill();
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = '900 12px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('TACTICAL BENCH RESERVES & MATCHDAY OPTIONS', 84, benchY + 26);

  ctx.fillStyle = '#71717a';
  ctx.font = '600 11px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`${substitutes.length} SUBSTITUTES READY · 12-MAN FIRST TEAM ROSTER`, width - 84, benchY + 26);

  const cardW = 196;
  const cardH = 50;
  const cardGap = 10;
  const startCardX = 84;
  const startCardY = benchY + 40;

  substitutes.slice(0, 5).forEach((sub, idx) => {
    const cx = startCardX + idx * (cardW + cardGap);
    const cy = startCardY;

    ctx.fillStyle = '#181920';
    roundRect(ctx, cx, cy, cardW, cardH, 8);
    ctx.fill();
    ctx.strokeStyle = '#2d2e38';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#22232d';
    roundRect(ctx, cx + 6, cy + 8, 34, 34, 6);
    ctx.fill();
    ctx.fillStyle = '#f43f5e';
    ctx.font = '900 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`#${sub.num}`, cx + 23, cy + 30);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 12px sans-serif';
    const subName = sub.name.length > 13 ? sub.name.substring(0, 12) + '..' : sub.name;
    ctx.fillText(subName, cx + 48, cy + 24);

    ctx.fillStyle = '#10b981';
    ctx.font = '600 10px monospace';
    ctx.fillText(`${sub.primaryPosition} · READY`, cx + 48, cy + 39);
  });

  // 6. Captain Directive Strip
  const quoteY = benchY + benchHeight + 14;
  ctx.fillStyle = '#1a1118';
  roundRect(ctx, 60, quoteY, width - 120, 46, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(225, 29, 72, 0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = '900 11px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('CAPTAIN DIRECTIVE:', 80, quoteY + 28);

  const rawDirective = formation.strategy.captainDirectiveEn || '';
  const cleanDirective = rawDirective.replace(/^["'\s]+|["'\s]+$/g, '');
  const quoteText = `"${cleanDirective}"`;
  const truncatedQuote = quoteText.length > 115 ? quoteText.substring(0, 112) + '..."' : quoteText;

  ctx.fillStyle = '#f4f4f5';
  ctx.font = 'italic 12px sans-serif';
  ctx.fillText(truncatedQuote, 215, quoteY + 28);

  // 7. Footer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#52525b';
  ctx.font = '600 11px monospace';
  ctx.fillText('TITAN FORCE MULIKANDI FOOTBALL CLUB · OFFICIAL TACTICAL BOARD ENGINE · ALL RIGHTS RESERVED', width / 2, height - 20);

  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(mime, 0.98);
}

/**
 * High-definition Canvas renderer that creates a standalone tactical pitch board image (1080 x 1440 px).
 * Guaranteed to have complete, crisp white pitch markings (touchlines, boxes, center circle).
 */
export async function generatePitchOnlyCanvas(options: {
  formation: TacticalFormation;
  starters: { player: Player; node: FormationPlayerNode }[];
  playerCount: number;
  format?: 'png' | 'jpeg';
}): Promise<string> {
  const { formation, starters, playerCount, format = 'png' } = options;

  const [boardImg, logoImg] = await Promise.all([
    loadLocalImage('/assets/aistudio/tactical-board__1__4dfcd60c.png'),
    loadLocalImage('/logos/titanforce-logo.svg')
  ]);

  const width = 1080;
  const height = 1440; // 3:4 aspect ratio
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // Dark border background
  ctx.fillStyle = '#0a0b0e';
  ctx.fillRect(0, 0, width, height);

  // Pitch board margin
  const margin = 20;
  const pW = width - margin * 2;
  const pH = height - margin * 2;

  // Outer green board border
  ctx.fillStyle = '#0f2415';
  roundRect(ctx, margin - 6, margin - 6, pW + 12, pH + 12, 32);
  ctx.fill();
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Draw complete turf and pitch markings
  const bounds = drawPitchTurfAndMarkings(ctx, margin, margin, pW, pH, boardImg, logoImg);

  // Formation Info Tag (Top Left)
  ctx.fillStyle = 'rgba(9, 9, 11, 0.90)';
  roundRect(ctx, margin + 18, margin + 18, 250, 46, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(225, 29, 72, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#f43f5e';
  ctx.font = '900 18px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(formation.code, margin + 34, margin + 47);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 13px sans-serif';
  ctx.fillText(`· ${playerCount} PLAYERS`, margin + 115, margin + 46);

  // Club Watermark Tag (Top Right)
  ctx.fillStyle = 'rgba(9, 9, 11, 0.90)';
  roundRect(ctx, margin + pW - 240, margin + 18, 222, 46, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(63, 63, 70, 0.8)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = '800 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TITAN FORCE FC', margin + pW - 129, margin + 37);
  ctx.fillStyle = '#a1a1aa';
  ctx.font = '600 10px monospace';
  ctx.fillText('OFFICIAL TACTICAL BOARD', margin + pW - 129, margin + 51);

  // Render Starting Players onto the pitch
  starters.forEach(({ player, node }) => {
    const px = bounds.bX + (node.x / 100) * bounds.bW;
    const py = bounds.bY + (node.y / 100) * bounds.bH;
    drawPlayerToken(ctx, px, py, player, node, 32);
  });

  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(mime, 0.98);
}

/**
 * Helper to draw a rounded rectangle on Canvas context.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
