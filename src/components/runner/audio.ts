import type { Cue } from "./engine";

/** Short original synth cues; sound is opt-in and never blocks gameplay. */
export class GameAudio {
  private context: AudioContext | null = null;
  private gain: GainNode | null = null;
  private voices = new Set<OscillatorNode>();
  private enabled = false;
  async enable(value: boolean) {
    this.enabled = value;
    if (!value) { this.pause(); return; }
    try {
      if (!this.context) { this.context = new AudioContext(); this.gain = this.context.createGain(); this.gain.gain.value = 0.11; this.gain.connect(this.context.destination); }
      await this.context.resume();
    } catch { this.enabled = false; }
  }
  play(cue: Cue) {
    const ctx = this.context;
    if (!this.enabled || !ctx || ctx.state !== "running" || !this.gain || this.voices.size >= 8) return;
    const oscillator = ctx.createOscillator(); const envelope = ctx.createGain(); const t = ctx.currentTime;
    const [start, end, length] = ({ coin: [760, 1120, 0.09], hit: [150, 60, 0.17], power: [420, 960, 0.24], jump: [220, 470, 0.13], slide: [280, 90, 0.11], finish: [520, 1040, 0.4] })[cue];
    oscillator.type = cue === "hit" ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(start, t); oscillator.frequency.exponentialRampToValueAtTime(end, t + length);
    envelope.gain.setValueAtTime(0.001, t); envelope.gain.exponentialRampToValueAtTime(0.4, t + 0.01); envelope.gain.exponentialRampToValueAtTime(0.001, t + length);
    oscillator.connect(envelope); envelope.connect(this.gain); this.voices.add(oscillator);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); this.voices.delete(oscillator); };
    oscillator.start(); oscillator.stop(t + length + 0.02);
  }
  pause() { void this.context?.suspend().catch(() => {}); }
  dispose() { for (const voice of Array.from(this.voices)) { try { voice.stop(); } catch {} voice.disconnect(); } this.voices.clear(); this.gain?.disconnect(); void this.context?.close().catch(() => {}); this.context = null; this.gain = null; }
}
