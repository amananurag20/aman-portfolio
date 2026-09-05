import { DURATION, Run, SKILLS, TRAVEL_TIME } from "./engine";

const WIDTH = 960;
const HEIGHT = 580;
export function drawRun(ctx: CanvasRenderingContext2D, run: Run, portrait: HTMLImageElement | null, calm: boolean) {
  const width = ctx.canvas.width, height = ctx.canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.save(); ctx.scale(width / WIDTH, height / HEIGHT);
  const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  sky.addColorStop(0, "#090915"); sky.addColorStop(0.5, "#241321"); sky.addColorStop(1, "#08090e");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const glow = ctx.createRadialGradient(480, 190, 10, 480, 190, 310);
  glow.addColorStop(0, "#ed233f33"); glow.addColorStop(1, "#ed233f00");
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
    ctx.strokeStyle = i === 0 || i === 3 ? "#ff3b5e" : "#695273"; ctx.lineWidth = i === 0 || i === 3 ? 3 : 1; ctx.stroke();
  }
  const offset = calm ? 0 : run.time * 0.48;
  for (let i = 0; i < 16; i++) {
    const p = ((i / 16 + offset) % 1);
    const r = road(p); ctx.beginPath(); ctx.moveTo(480 - r.half, r.y); ctx.lineTo(480 + r.half, r.y);
    ctx.strokeStyle = "#ce678528"; ctx.lineWidth = 1; ctx.stroke();
  }

  const gateScale = !calm && run.time > 26 ? 1 + (run.time - 26) * 0.11 : 1;
  ctx.save(); ctx.translate(480, 164); ctx.scale(gateScale, gateScale);
  ctx.strokeStyle = "#ff365d"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-80, 43); ctx.lineTo(-80, -23); ctx.lineTo(80, -23); ctx.lineTo(80, 43); ctx.stroke();
  ctx.fillStyle = "#ffb3c2"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center";
  ctx.fillText("NEXT OPPORTUNITY", 0, 2); ctx.fillStyle = "#a19caf"; ctx.font = "10px monospace"; ctx.fillText("BUILD · SHIP · GROW", 0, 20); ctx.restore();

  for (const item of [...run.items].sort((a, b) => b.born - a.born)) {
    if (item.resolved) continue;
    const progress = Math.min(1, Math.max(0, (run.time - item.born) / TRAVEL_TIME));
    const p = 0.10 + progress * 0.80;
    const location = point(item.lane, p);
    ctx.save(); ctx.translate(location.x, location.y); ctx.scale(location.scale, location.scale);
    if (item.kind === "skill") {
      const skill = SKILLS[item.skill];
      ctx.fillStyle = "#0008"; ctx.beginPath(); ctx.ellipse(0, 11, 44, 10, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#181b2c"; ctx.strokeStyle = skill.color; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(-38, -79, 76, 76, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = skill.color; ctx.font = "bold 27px monospace"; ctx.textAlign = "center"; ctx.fillText(skill.short, 0, -35);
    } else {
      ctx.fillStyle = "#5e1834"; ctx.beginPath(); ctx.moveTo(-68, -43); ctx.lineTo(-54, -59); ctx.lineTo(80, -59); ctx.lineTo(67, -43); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#2c1421"; ctx.fillRect(-68, -43, 135, 45); ctx.strokeStyle = "#ff5475"; ctx.lineWidth = 2; ctx.strokeRect(-68, -43, 135, 45);
      ctx.fillStyle = "#ffb8c6"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center"; ctx.fillText(item.label, 0, -16);
    }
    ctx.restore();
  }

  const player = point(run.lane, 0.9);
  const bob = calm ? 0 : Math.sin(run.time * 10) * 2;
  ctx.save(); ctx.translate(player.x, player.y + bob);
  ctx.fillStyle = "#ed234e3b"; ctx.beginPath(); ctx.ellipse(0, 21, 60, 12, 0, 0, Math.PI * 2); ctx.fill();
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
  ctx.fillStyle = "#90899e"; ctx.textAlign = "center"; ctx.font = "12px monospace";
  ctx.fillText("01 / BUILD", 176, 561); ctx.fillText("02 / SHIP", 480, 561); ctx.fillText("03 / SCALE", 784, 561);
  ctx.fillStyle = "#ff365d"; ctx.fillRect(0, HEIGHT - 3, WIDTH * run.time / DURATION, 3);
  ctx.restore();
}
