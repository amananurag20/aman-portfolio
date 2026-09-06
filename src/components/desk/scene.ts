import * as THREE from "three";
import { PROJECTS, type DeviceId } from "./content";

export type DeskScene = ReturnType<typeof createDeskScene>;

// Owns a single GPU context. React owns accessibility, navigation, and content.
export function createDeskScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#101017");
  scene.fog = new THREE.Fog("#101017", 20, 42);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 70);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const devices = new Map<DeviceId, THREE.Group>();
  const glows = new Map<DeviceId, THREE.MeshStandardMaterial>();
  const pulses: { mesh: THREE.Mesh; phase: number; base: number }[] = [];
  const raycaster = new THREE.Raycaster();
  let selected: DeviceId = "ai", hovered: DeviceId | null = null;
  let disposed = false, calm = true, focused = false, elapsed = 0;
  let yaw = 0.24, pitch = 0.48, aspect = 1.5;
  const look = new THREE.Vector3(0, 1.6, 0);
  const desiredLook = new THREE.Vector3();
  const desiredCamera = new THREE.Vector3();
  const lighting = new THREE.HemisphereLight("#dfe9ff", "#291923", 2.5);
  scene.add(lighting);
  const key = new THREE.DirectionalLight("#fff0e4", 4.5);
  key.position.set(-4, 8, 5); scene.add(key);
  const rim = new THREE.DirectionalLight("#789eff", 3);
  rim.position.set(4, 5, -5); scene.add(rim);
  const accentLight = new THREE.PointLight("#ff425f", 35, 13, 2);
  accentLight.position.set(-4, 4, 1); scene.add(accentLight);

  function material(color: string, metalness = 0, roughness = 0.55) {
    const value = new THREE.MeshStandardMaterial({ color, metalness, roughness });
    materials.add(value); return value;
  }
  const graphite = material("#242631", 0.65, 0.32);
  const edge = material("#555864", 0.75, 0.35);
  const black = material("#080b12", 0.15, 0.6);
  const keys = material("#30333d", 0.2, 0.8);
  const desk = material("#29232b", 0.15, 0.55);
  const steel = material("#333441", 0.8, 0.35);
  const rubber = material("#12131c", 0, 0.95);
  function box(parent: THREE.Object3D, size: number[], pos: number[], mat: THREE.Material) {
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]); geometries.add(geometry);
    const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(pos[0], pos[1], pos[2]); parent.add(mesh); return mesh;
  }
  function rounded(parent: THREE.Object3D, width: number, height: number, depth: number, pos: number[], mat: THREE.Material, radius = 0.09) {
    const x = -width / 2, y = -height / 2, r = Math.min(radius, height / 3, width / 3);
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y); shape.lineTo(x + width - r, y); shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r); shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    shape.lineTo(x + r, y + height); shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r); shape.quadraticCurveTo(x, y, x + r, y);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 5 });
    geometry.translate(0, 0, -depth / 2); geometries.add(geometry);
    const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(pos[0], pos[1], pos[2]); parent.add(mesh); return mesh;
  }
  function screen(parent: THREE.Object3D, width: number, height: number, pos: number[], id: DeviceId, vertical = false) {
    const project = PROJECTS.find(item => item.id === id)!;
    const surface = document.createElement("canvas"); surface.width = vertical ? 384 : 768; surface.height = vertical ? 680 : 440;
    const ctx = surface.getContext("2d")!;
    ctx.fillStyle = "#10151e"; ctx.fillRect(0, 0, surface.width, surface.height);
    ctx.fillStyle = project.color; ctx.fillRect(0, 0, surface.width, 8);
    ctx.fillStyle = "#aebaca"; ctx.font = "22px sans-serif"; ctx.fillText(vertical ? "MOBILE" : project.category, 32, 57);
    ctx.fillStyle = "#f5f7ff"; ctx.font = "bold 48px sans-serif";
    const title = id === "desktop" ? "Electron" : id === "mobile" ? "Focus Room" : project.title;
    ctx.fillText(title, 32, vertical ? 138 : 136, surface.width - 64);
    ctx.font = "22px sans-serif"; ctx.fillStyle = project.color; ctx.fillText(vertical ? "React Native" : "Explore the engineering", 32, 178, surface.width - 64);
    project.steps.forEach((step, i) => {
      const y = (vertical ? 280 : 235) + i * (vertical ? 92 : 58);
      ctx.fillStyle = "#202838"; ctx.fillRect(32, y - 26, surface.width - 64, 42);
      ctx.fillStyle = project.color; ctx.fillText(`0${i + 1}`, 46, y + 2);
      ctx.fillStyle = "#d5dfed"; ctx.fillText(step.title, 96, y + 2, surface.width - 128);
    });
    const texture = new THREE.CanvasTexture(surface); texture.colorSpace = THREE.SRGBColorSpace; textures.add(texture);
    const mat = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }); materials.add(mat);
    const geometry = new THREE.PlaneGeometry(width, height); geometries.add(geometry);
    const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(pos[0], pos[1], pos[2]); parent.add(mesh); return mesh;
  }
  function device(id: DeviceId, x: number, z: number) {
    const group = new THREE.Group(); group.position.set(x, 1.31, z); group.userData.device = id; devices.set(id, group); scene.add(group);
    const glow = new THREE.MeshStandardMaterial({ color: PROJECTS.find(p => p.id === id)!.color, emissive: PROJECTS.find(p => p.id === id)!.color, emissiveIntensity: 0.5, roughness: 0.45 });
    materials.add(glow); glows.set(id, glow);
    box(group, [id === "desktop" ? 2.8 : id === "ai" ? 2.6 : 1.1, 0.02, 0.045], [0, 0.025, id === "ai" ? 0.86 : 0.69], glow);
    return group;
  }

  // A real, selectable object for each project surface, built from original geometry.
  box(scene, [11, 0.22, 5], [0, 1.16, 0], desk);
  box(scene, [10.4, 0.035, 4.3], [0, 1.287, 0], rubber);
  [-4.5, 4.5].forEach(x => { box(scene, [0.13, 1.1, 3.7], [x, 0.52, 0], steel); });
  box(scene, [28, 0.15, 24], [0, -0.12, 0], material("#15151e", 0, 0.92));

  const laptop = device("ai", -3.05, 0.6); laptop.rotation.y = 0.16;
  box(laptop, [2.5, 0.1, 1.6], [0, 0.09, 0], edge);
  const lid = new THREE.Group(); lid.position.set(0, 0.2, -0.68); lid.rotation.x = -0.16; laptop.add(lid);
  rounded(lid, 2.5, 1.55, 0.095, [0, 0.74, 0], graphite);
  screen(lid, 2.3, 1.31, [0, 0.76, 0.052], "ai");
  const keyboardGeometry = new THREE.BoxGeometry(0.145, 0.025, 0.105); geometries.add(keyboardGeometry);
  const keyboard = new THREE.InstancedMesh(keyboardGeometry, keys, 60);
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < 60; i++) { matrix.makeTranslation((i % 12 - 5.5) * 0.18, 0.16, Math.floor(i / 12) * 0.15 - 0.43); keyboard.setMatrixAt(i, matrix); }
  laptop.add(keyboard); box(laptop, [0.66, 0.012, 0.3], [0, 0.149, 0.51], graphite);

  const phone = device("mobile", -0.73, 1.08); phone.rotation.y = -0.12;
  box(phone, [0.8, 0.06, 0.65], [0, 0.04, 0], edge);
  const phoneBody = new THREE.Group(); phoneBody.position.set(0, 0.24, 0); phoneBody.rotation.x = -0.13; phone.add(phoneBody);
  rounded(phoneBody, 0.91, 1.85, 0.12, [0, 0.86, 0], edge, 0.13);
  rounded(phoneBody, 0.84, 1.77, 0.018, [0, 0.86, 0.065], black, 0.1);
  screen(phoneBody, 0.76, 1.51, [0, 0.83, 0.08], "mobile", true);
  rounded(phoneBody, 0.24, 0.05, 0.01, [0, 1.66, 0.081], black, 0.02);

  const monitor = device("desktop", 1.03, -0.53);
  box(monitor, [1.15, 0.07, 0.7], [0, 0.055, 0.06], steel);
  box(monitor, [0.16, 0.73, 0.16], [0, 0.42, -0.08], steel);
  rounded(monitor, 3, 1.96, 0.18, [0, 1.61, -0.1], graphite);
  screen(monitor, 2.79, 1.67, [0, 1.64, -0.005], "desktop");
  box(monitor, [0.15, 0.016, 0.015], [1.19, 0.71, 0.005], glows.get("desktop")!);

  const server = device("systems", 3.6, 0.36); server.rotation.y = -0.16;
  rounded(server, 1.23, 2.15, 1.1, [0, 1.1, 0], graphite);
  for (let i = 0; i < 4; i++) {
    rounded(server, 1.05, 0.36, 0.035, [0, 0.39 + i * 0.47, 0.57], black, 0.025);
    box(server, [0.53, 0.025, 0.04], [-0.1, 0.4 + i * 0.47, 0.602], edge);
    const led = box(server, [0.06, 0.06, 0.02], [0.4, 0.4 + i * 0.47, 0.602], glows.get("systems")!);
    pulses.push({ mesh: led, phase: i * 0.8, base: 1 });
  }

  // Small light strips and a cable keep the scene grounded without expensive shadows.
  box(scene, [10.2, 0.024, 0.024], [0, 1.29, -2.14], glows.get("ai")!);
  const cableCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(-2, 1.34, -0.8), new THREE.Vector3(-1, 1.34, -1.7), new THREE.Vector3(2.5, 1.34, -1.65), new THREE.Vector3(3.6, 1.34, -0.3)]);
  const cableGeometry = new THREE.TubeGeometry(cableCurve, 30, 0.023, 5, false); geometries.add(cableGeometry); scene.add(new THREE.Mesh(cableGeometry, edge));

  function render(dt = 0, snap = false) {
    if (disposed) return;
    elapsed += Math.min(dt, 0.05);
    const focus = devices.get(selected)!;
    const scale = aspect < 1.25 ? 1.25 / Math.max(aspect, 0.5) : 1;
    desiredLook.set(focused ? focus.position.x : focus.position.x * 0.12, focused ? 2.2 : 1.6, focused ? focus.position.z : 0);
    const distance = (focused ? 7.4 : 15.5) * Math.sqrt(scale);
    const angle = yaw + (calm ? 0 : Math.sin(elapsed * 0.13) * 0.014);
    desiredCamera.set(desiredLook.x + Math.sin(angle) * Math.cos(pitch) * distance, desiredLook.y + Math.sin(pitch) * distance, desiredLook.z + Math.cos(angle) * Math.cos(pitch) * distance);
    const blend = snap || calm ? 1 : 1 - Math.exp(-Math.max(dt, 0.001) * 5);
    camera.position.lerp(desiredCamera, blend); look.lerp(desiredLook, blend); camera.lookAt(look);
    glows.forEach((mat, id) => { mat.emissiveIntensity = id === selected ? 1.7 : id === hovered ? 1 : 0.22; });
    pulses.forEach(({mesh, phase, base}) => { mesh.scale.setScalar(calm ? base : base + Math.sin(elapsed * 2 + phase) * 0.13); });
    renderer.render(scene, camera);
  }
  render(0, true);
  return {
    render,
    resize(width: number, height: number) { if (disposed || width < 1 || height < 1) return; aspect = width / height; camera.aspect = aspect; camera.updateProjectionMatrix(); renderer.setSize(width, height, false); render(0, true); },
    select(id: DeviceId) { selected = id; },
    hover(id: DeviceId | null) { hovered = id; },
    setCalm(value: boolean) { calm = value; },
    setFocused(value: boolean) { focused = value; },
    orbit(dx: number, dy: number) { yaw = THREE.MathUtils.clamp(yaw - dx * 0.005, -0.65, 0.75); pitch = THREE.MathUtils.clamp(pitch + dy * 0.003, 0.26, 0.74); },
    reset() { yaw = 0.24; pitch = 0.48; focused = false; },
    pick(x: number, y: number): DeviceId | null {
      if (disposed) return null;
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      for (const hit of raycaster.intersectObjects(Array.from(devices.values()), true)) {
        let object: THREE.Object3D | null = hit.object;
        while (object) { if (object.userData.device) return object.userData.device as DeviceId; object = object.parent; }
      }
      return null;
    },
    dispose() {
      if (disposed) return; disposed = true;
      keyboard.dispose(); geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose()); textures.forEach(value => value.dispose());
      scene.clear(); renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
