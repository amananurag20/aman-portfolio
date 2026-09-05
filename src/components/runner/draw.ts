import { DURATION, Run, SKILLS, JUMP_TIME, SLIDE_TIME, sectorAt } from "./engine";

const WIDTH = 960;
const HEIGHT = 580;
export function drawRun(ctx: CanvasRenderingContext2D, run: Run, portrait: HTMLImageElement | null, calm: boolean) {
  const width = ctx.canvas.width, height = ctx.canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.save(); ctx.scale(width / WIDTH, height / HEIGHT);
  const sector = sectorAt(run.time);
  const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  sky.addColorStop(0, "#090915"); sky.addColorStop(0.5, sector.sky); sky.addColorStop(1, "#08090e");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const glow = ctx.createRadialGradient(480, 190, 10, 480, 190, 310);
  glow.addColorStop(0, sector.color + "33"); glow.addColorStop(1, sector.color + "00");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Fixed code panels form the backdrop; only the track moves during play.
  ctx.font = "12px monospace";
  for (let i = 0; i < 12; i++) {
    const x = i < 6 ? 24 + i * 47 : 672 + (i - 6) * 47;
    const y = 90 + (i * 37) % 90;
    ctx.fillStyle = "#151522"; ctx.fillRect(x, y, 33, 255 - y);
    ctx.strokeStyle = "#573044"; ctx.strokeRect(x, y, 33, 255 - y);
    ctx.fillStyle = "#a66b812f";
    for (let j = 0; j < 5; j++) ctx.fillRect(x + 7, y + 12 + j * 17, 12 + j % 2 * 7, 3);
  }

  const top = 205, bottom = 568;
  const road = (p: number) => ({ y: top + (bottom - top) * p * p, half: 43 + 414 * p * p });
  function point(lane: number, p: number) {
    const r = road(p); return { x: 480 + (lane - 1) * (r.half * 2 / 3), y: r.y, scale: 0.16 + 0.84 * p * p };
  }
  ctx.beginPath(); ctx.moveTo(437, top); ctx.lineTo(523, top); ctx.lineTo(937, bottom); ctx.lineTo(23, bottom); ctx.closePath();
  ctx.fillStyle = "#11121b"; ctx.fill();
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(480 + (i / 3 * 2 - 1) * 43, top); ctx.lineTo(480 + (i / 3 * 2 - 1) * 457, bottom);
    ctx.strokeStyle = i === 0 || i === 3 ? sector.color : "#695273"; ctx.lineWidth = i === 0 || i === 3 ? 3 : 1; ctx.stroke();
  }
  const offset = calm ? 0 : run.time * 0.42 + run.time * run.time * 0.008;
  for (let i = 0; i < 16; i++) {
    const p = ((i / 16 + offset) % 1);
    const r = road(p); ctx.beginPath(); ctx.moveTo(480 - r.half, r.y); ctx.lineTo(480 + r.half, r.y);
    ctx.strokeStyle = "#ce678528"; ctx.lineWidth = 1; ctx.stroke();
  }

  if (!calm) {
    for (let i = 0; i < 14; i++) {
      const side = i % 2 ? 1 : -1;
      const p = (i / 14 + offset * 0.7) % 1;
      const r = road(p);
      ctx.strokeStyle = sector.color + "35"; ctx.lineWidth = 1 + p;
      ctx.beginPath(); ctx.moveTo(480 + side * (r.half + 25), r.y); ctx.lineTo(480 + side * (r.half + 55 + p * 30), r.y + p * 35); ctx.stroke();
    }
  }
  // Track arches establish depth without loading a 3D engine.
  for (const p of [0.2, 0.4, 0.65]) {
    const r = road(p), h = 60 + 140 * p;
    ctx.strokeStyle = sector.color + "28"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(480-r.half-12, r.y); ctx.lineTo(480-r.half-12, r.y-h); ctx.lineTo(480+r.half+12, r.y-h); ctx.lineTo(480+r.half+12, r.y); ctx.stroke();
  }
  const gateScale = !calm && run.time > 26 ? 1 + (run.time - 26) * 0.11 : 1;
  ctx.save(); ctx.translate(480, 164); ctx.scale(gateScale, gateScale);
  ctx.strokeStyle = "#ff365d"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-80, 43); ctx.lineTo(-80, -23); ctx.lineTo(80, -23); ctx.lineTo(80, 43); ctx.stroke();
  ctx.fillStyle = "#ffb3c2"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center";
  ctx.fillText("NEXT OPPORTUNITY", 0, 2); ctx.fillStyle = "#a19caf"; ctx.font = "10px monospace"; ctx.fillText("BUILD · SHIP · GROW", 0, 20); ctx.restore();

  for (const item of [...run.items].sort((a, b) => b.born - a.born)) {
    if (item.resolved) continue;
    const progress = Math.min(1, Math.max(0, (run.time - item.born) / item.travel));
    const p = 0.10 + progress * 0.80;
    const location = point(item.lane, p);
    ctx.save(); ctx.translate(location.x, location.y); ctx.scale(location.scale, location.scale);
    if (item.kind === "skill") {
      const skill = SKILLS[item.skill];
      ctx.fillStyle = "#0008"; ctx.beginPath(); ctx.ellipse(0, 11, 44, 10, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#181b2c"; ctx.strokeStyle = skill.color; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(-38, -79, 76, 76, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = skill.color; ctx.font = "bold 27px monospace"; ctx.textAlign = "center"; ctx.fillText(skill.short, 0, -35);
    } else if (item.kind === "shield" || item.kind === "magnet") {
      ctx.fillStyle = "#113847"; ctx.strokeStyle = "#7ceeff"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, -44, 38, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#bdf7ff"; ctx.font = "bold 22px monospace"; ctx.textAlign = "center"; ctx.fillText(item.kind === "shield" ? "S" : "M", 0, -39);
      ctx.font = "bold 12px monospace"; ctx.fillText(item.label, 0, 12);
    } else if (item.obstacle === "gate") {
      ctx.fillStyle = "#663d18"; ctx.fillRect(-71, -140, 10, 143); ctx.fillRect(61, -140, 10, 143);
      ctx.fillStyle = "#3e281c"; ctx.fillRect(-75, -140, 150, 58); ctx.strokeStyle = "#ffc777"; ctx.lineWidth = 3; ctx.strokeRect(-75, -140, 150, 58);
      ctx.fillStyle = "#ffe2b2"; ctx.font = "bold 20px monospace"; ctx.textAlign = "center"; ctx.fillText("↓ SLIDE", 0, -105);
    } else {
      const hurdle = item.obstacle === "hurdle";
      const h = hurdle ? 40 : 120;
      ctx.fillStyle = hurdle ? "#535127" : "#5e1834"; ctx.beginPath(); ctx.moveTo(-68, -h); ctx.lineTo(-54, -h-16); ctx.lineTo(80, -h-16); ctx.lineTo(67, -h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = hurdle ? "#353523" : "#2c1421"; ctx.fillRect(-68, -h, 135, h); ctx.strokeStyle = hurdle ? "#e3ef9b" : "#ff5475"; ctx.lineWidth = 2; ctx.strokeRect(-68, -h, 135, h);
      ctx.fillStyle = hurdle ? "#efffd3" : "#ffb8c6"; ctx.font = "bold 18px monospace"; ctx.textAlign = "center"; ctx.fillText(hurdle ? "↑ JUMP" : "↔ DODGE", 0, -h/2+6);
      if (!hurdle) { ctx.font = "12px monospace"; ctx.fillText("BUILD FAILED", 0, -12); }
    }
    ctx.restore();
  }

  const player = point(calm ? run.lane : run.visualLane, 0.9);
  const jumpProgress = Math.max(0, Math.min(1, (run.time - run.jumpAt) / JUMP_TIME));
  const jumping = jumpProgress > 0 && jumpProgress < 1;
  const lift = jumping ? (calm ? 75 : Math.sin(jumpProgress * Math.PI) * 105) : 0;
  const sliding = run.time - run.slideAt < SLIDE_TIME;
  ctx.fillStyle = "#0008"; ctx.beginPath(); ctx.ellipse(player.x, player.y+22, jumping ? 35 : 58, 12, 0, 0, Math.PI*2); ctx.fill();
  const bob = calm ? 0 : Math.sin(run.time * 10) * 2;
  ctx.save(); ctx.translate(player.x, player.y + bob - lift);
  if (!calm) ctx.rotate((run.lane - run.visualLane) * 0.13);
  if (sliding) ctx.scale(1.22, 0.42);
  ctx.fillStyle = "#ed234e3b"; ctx.beginPath(); ctx.ellipse(0, 21, 60, 12, 0, 0, Math.PI * 2); ctx.fill();
  if (run.magnetUntil > run.time) {
    ctx.strokeStyle = "#c7a0ff"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, -45, 64, 0.2, Math.PI-0.2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -45, 76, Math.PI+0.2, Math.PI*2-0.2); ctx.stroke();
  }
  if (run.shieldUntil > run.time) {
    ctx.fillStyle = "#7ceeff16"; ctx.strokeStyle = "#7ceeff"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, -45, 57, 75, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  }
  const hit = run.time < run.hitUntil;
  ctx.strokeStyle = hit ? "#ffbd6a" : "#ff4668"; ctx.lineWidth = 3;
  ctx.fillStyle = "#171727"; ctx.beginPath(); ctx.roundRect(-40, -92, 80, 98, 17); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.roundRect(-34, -86, 68, 68, 12); ctx.clip();
  if (portrait?.complete && portrait.naturalWidth) {
    const sw = portrait.naturalWidth * 0.65;
    ctx.drawImage(portrait, portrait.naturalWidth * 0.175, portrait.naturalHeight * 0.07, sw, sw, -34, -86, 68, 68);
  } else {
    ctx.fillStyle = "#442238"; ctx.fillRect(-34, -86, 68, 68); ctx.fillStyle = "white"; ctx.font = "bold 26px monospace"; ctx.textAlign = "center"; ctx.fillText("AA", 0, -42);
  }
  ctx.restore(); ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "bold 12px monospace"; ctx.fillText("AMAN", 0, -2); ctx.restore();
  for (const effect of run.bursts) {
    const age = (run.time - effect.born) / 0.9;
    const pos = point(effect.lane, 0.9);
    ctx.save(); ctx.globalAlpha = 1-age; ctx.fillStyle = effect.color; ctx.textAlign = "center"; ctx.font = "bold 24px monospace";
    ctx.fillText(effect.text, pos.x, pos.y - 125 - (calm ? 0 : age*55));
    if (!calm) for (let i=0;i<10;i++) {
      const angle = i*Math.PI/5;
      ctx.fillRect(pos.x+Math.cos(angle)*age*90, pos.y-45+Math.sin(angle)*age*65, 4, 4);
    }
    ctx.restore();
  }
  ctx.fillStyle = "#90899e"; ctx.textAlign = "center"; ctx.font = "12px monospace";
  ctx.fillText("01 / BUILD", 176, 561); ctx.fillText("02 / SHIP", 480, 561); ctx.fillText("03 / SCALE", 784, 561);
  ctx.fillStyle = sector.color; ctx.fillRect(0, HEIGHT - 3, WIDTH * run.time / DURATION, 3);
  ctx.restore();
}
