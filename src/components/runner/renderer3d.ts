import * as THREE from "three";
import { Run, Item, laneX, itemLane, itemZ, playerHeight, isSliding, sectorAt, SKILLS } from "./engine";

export type World = { render(run: Run, calm: boolean): void; resize(width: number, height: number): void; dispose(): void; stats(): { calls: number; triangles: number; geometries: number; textures: number } };

export function createWorld(canvas: HTMLCanvasElement): World {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#100f23");
  scene.fog = new THREE.FogExp2("#100f23", 0.021);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 190);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const geo = <T extends THREE.BufferGeometry>(g: T) => { geometries.add(g); return g; };
  const mat = <T extends THREE.Material>(m: T) => { materials.add(m); return m; };
  const box = geo(new THREE.BoxGeometry(1, 1, 1));
  const sphere = geo(new THREE.SphereGeometry(1, 12, 8));
  const cylinder = geo(new THREE.CylinderGeometry(1, 1, 1, 10));
  const ring = geo(new THREE.TorusGeometry(0.48, 0.055, 6, 18));
  const flat = geo(new THREE.PlaneGeometry(1, 1));
  const standard = (color: string, metalness = 0.15) => mat(new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness }));
  const basic = (color: string) => mat(new THREE.MeshBasicMaterial({ color }));
  const asphalt = standard("#1b2232");
  const wall = standard("#283247");
  const steel = standard("#677587", 0.65);
  const neon = basic("#ff527a");
  const cyan = basic("#7eeaff");
  const warning = basic("#ffd382");
  const red = standard("#bc315a");
  const violet = standard("#664a93");
  const shadow = mat(new THREE.MeshBasicMaterial({ color: "#030710", transparent: true, opacity: 0.4, depthWrite: false }));
  const labelCache = new Map<string, THREE.MeshBasicMaterial>();
  function labelMaterial(text: string, color = "#ffffff", bg = "#141522") {
    const key = text + color + bg;
    const cached = labelCache.get(key); if (cached) return cached;
    const surface = document.createElement("canvas"); surface.width = 512; surface.height = 128;
    const ctx = surface.getContext("2d")!;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.strokeRect(5, 5, 502, 118);
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = "bold 42px monospace"; ctx.fillStyle = color; ctx.fillText(text, 256, 67, 482);
    const texture = new THREE.CanvasTexture(surface); texture.colorSpace = THREE.SRGBColorSpace; textures.add(texture);
    const material = mat(new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })); labelCache.set(key, material); return material;
  }
  function mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number, sx = 1, sy = 1, sz = 1) {
    const object = new THREE.Mesh(geometry, material); object.position.set(x, y, z); object.scale.set(sx, sy, sz); parent.add(object); return object;
  }
  const cube = (parent: THREE.Object3D, material: THREE.Material, x: number, y: number, z: number, sx: number, sy: number, sz: number) => mesh(parent, box, material, x, y, z, sx, sy, sz);
  function sign(parent: THREE.Object3D, text: string, color: string, x: number, y: number, z: number, width: number) { return mesh(parent, flat, labelMaterial(text, color), x, y, z, width, width / 4, 1); }

  scene.add(new THREE.HemisphereLight("#c5ddff", "#322338", 2.2));
  const sun = new THREE.DirectionalLight("#fff1dd", 3.1); sun.position.set(-9, 16, 7); scene.add(sun);
  const rim = new THREE.DirectionalLight("#fd6697", 1.6); rim.position.set(8, 7, -15); scene.add(rim);
  const road = new THREE.Group(); scene.add(road);
  const roadTiles = new THREE.InstancedMesh(box, asphalt, 144); roadTiles.frustumCulled = false; road.add(roadTiles);
  const markings = new THREE.InstancedMesh(box, neon, 96); markings.frustumCulled = false; road.add(markings);
  const matrix = new THREE.Matrix4(); const q = new THREE.Quaternion(); const v = new THREE.Vector3(); const size = new THREE.Vector3();
  function instance(target: THREE.InstancedMesh, index: number, x: number, y: number, z: number, sx: number, sy: number, sz: number) { v.set(x, y, z); size.set(sx, sy, sz); matrix.compose(v, q, size); target.setMatrixAt(index, matrix); }
  cube(scene, standard("#090e1c"), 0, -3.5, -45, 400, 0.2, 330);

  // Scenery is recycled in a bounded window; it never grows in Endless Mode.
  const city = new THREE.Group(), tunnel = new THREE.Group(), rooftops = new THREE.Group(); scene.add(city, tunnel, rooftops);
  const windows = labelMaterial("▥ ▥ ▥ ▥", "#7aa6dc", "#27354c");
  const skyline: THREE.Group[] = [];
  for (let i = 0; i < 26; i++) {
    const group = new THREE.Group(); const side = i % 2 ? 1 : -1; const h = 7 + i * 7 % 19;
    cube(group, wall, side * (7 + i % 3 * 2), h / 2 - 0.15, 0, 3.2, h, 6.5);
    const face = mesh(group, flat, windows, side * (7 + i % 3 * 2), h / 2, 3.26, 2.7, h * 0.8, 1); face.material = windows;
    cube(group, neon, side * (7 + i % 3 * 2), h + 0.1, 0, 3.35, 0.12, 6.7);
    city.add(group); skyline.push(group);
  }
  const tunnelFrames: THREE.Group[] = [];
  for (let i = 0; i < 11; i++) {
    const g = new THREE.Group();
    cube(g, wall, -5.2, 3.2, 0, 0.5, 6.4, 1); cube(g, wall, 5.2, 3.2, 0, 0.5, 6.4, 1); cube(g, wall, 0, 6.4, 0, 10.8, 0.6, 1);
    cube(g, cyan, 0, 6.05, 0.5, 9.6, 0.055, 0.1);
    for (const side of [-1, 1]) { cube(g, steel, side*5.7, 2.5, 0, 0.8, 4.6, 4); sign(g, "SERVER / OK", "#7eeaff", side*5.7, 3.4, 2.06, 0.8); }
    tunnel.add(g); tunnelFrames.push(g);
  }
  const roofProps: THREE.Group[] = [];
  for (let i = 0; i < 14; i++) {
    const g = new THREE.Group(); const side = i % 2 ? -1 : 1;
    cube(g, wall, side * 6.4, -1, 0, 4.5, 1.8, 8);
    cube(g, steel, side * 6.4, 0.45, 0, 1.9, 1.3, 2.4);
    const fan = mesh(g, cylinder, asphalt, side * 6.4, 1.15, 0, 0.65, 0.1, 0.65);
    fan.rotation.y = i;
    cube(g, neon, side*4.5, 0.3, 0, 0.06, 0.6, 8); rooftops.add(g); roofProps.push(g);
  }
  const gateway = new THREE.Group(); scene.add(gateway);
  cube(gateway, neon, -4.5, 3.5, 0, 0.22, 7, 0.3); cube(gateway, neon, 4.5, 3.5, 0, 0.22, 7, 0.3); cube(gateway, neon, 0, 7, 0, 9.2, 0.25, 0.3);
  sign(gateway, "NEXT OPPORTUNITY", "#ffd6e6", 0, 5.8, 0.1, 7.2);

  // Original low-poly character with articulated hip, knee, shoulder and elbow joints.
  // Meshes are attached to the bones; no remote model download is needed.
  const character = new THREE.Group(); scene.add(character);
  const rootBone = new THREE.Bone(); character.add(rootBone);
  const pelvis = new THREE.Bone(); pelvis.position.y = 1.13; rootBone.add(pelvis);
  const torso = new THREE.Bone(); pelvis.add(torso);
  const skin = standard("#b97b50"), hair = standard("#18131a"), jacket = standard("#1a202c"), pants = standard("#334158"), sole = standard("#dce5eb");
  cube(torso, jacket, 0, 0.36, 0, 0.78, 0.78, 0.47);
  cube(torso, red, 0, 0.4, 0.26, 0.13, 0.65, 0.025);
  sign(torso, "AMAN", "#ff8eac", 0, 0.4, 0.285, 0.58);
  const head = new THREE.Bone(); head.position.y = 0.92; torso.add(head);
  mesh(head, sphere, skin, 0, 0.06, 0, 0.29, 0.34, 0.28);
  mesh(head, sphere, hair, 0, 0.25, 0.025, 0.3, 0.19, 0.285);
  mesh(head, sphere, hair, 0.06, 0.38, -0.03, 0.23, 0.11, 0.21);
  cube(head, hair, 0, -0.13, -0.2, 0.32, 0.13, 0.13);
  mesh(head, sphere, skin, 0, 0.015, -0.27, 0.055, 0.065, 0.055);
  for (const side of [-1, 1]) {
    mesh(head, sphere, skin, side * 0.28, 0.05, 0, 0.06, 0.085, 0.045);
    mesh(head, sphere, hair, side*0.1, 0.11, -0.26, 0.029, 0.035, 0.016);
  }
  const hips: THREE.Bone[] = [], knees: THREE.Bone[] = [], shoulders: THREE.Bone[] = [], elbows: THREE.Bone[] = [];
  for (const side of [-1, 1]) {
    const hip = new THREE.Bone(); hip.position.set(side*0.21, 0, 0); pelvis.add(hip); hips.push(hip);
    mesh(hip, cylinder, pants, 0, -0.27, 0, 0.145, 0.55, 0.145);
    const knee = new THREE.Bone(); knee.position.y = -0.53; hip.add(knee); knees.push(knee);
    mesh(knee, cylinder, pants, 0, -0.23, 0, 0.115, 0.46, 0.115);
    cube(knee, jacket, 0, -0.46, -0.095, 0.27, 0.17, 0.48); cube(knee, sole, 0, -0.54, -0.095, 0.28, 0.05, 0.5);
    const shoulder = new THREE.Bone(); shoulder.position.set(side*0.49, 0.62, 0); torso.add(shoulder); shoulders.push(shoulder);
    mesh(shoulder, cylinder, jacket, 0, -0.2, 0, 0.12, 0.4, 0.12);
    const elbow = new THREE.Bone(); elbow.position.y = -0.39; shoulder.add(elbow); elbows.push(elbow);
    mesh(elbow, cylinder, skin, 0, -0.17, 0, 0.085, 0.35, 0.085); mesh(elbow, sphere, skin, 0, -0.35, 0, 0.105, 0.12, 0.09);
  }
  const board = new THREE.Group(); scene.add(board);
  cube(board, violet, 0, 0, 0, 1.05, 0.13, 1.9); cube(board, cyan, 0, -0.06, 0, 0.84, 0.04, 1.75);
  for (const x of [-0.32, 0.32]) mesh(board, cylinder, cyan, x, -0.14, 0.5, 0.14, 0.13, 0.14);
  const bubbleMat = mat(new THREE.MeshBasicMaterial({ color: "#8bedff", wireframe: true, transparent: true, opacity: 0.4 }));
  const bubble = mesh(scene, sphere, bubbleMat, 0, 1.25, 0, 0.82, 1.5, 0.72);
  const playerShadow = mesh(scene, geo(new THREE.CircleGeometry(0.62, 20)), shadow, 0, 0.025, 0, 1, 1, 1); playerShadow.rotation.x = -Math.PI / 2;

  const tokenMats = SKILLS.map(skill => standard(skill.color, 0.7));
  const labels = SKILLS.map(skill => labelMaterial(skill.short, skill.color));
  const powerColors = { shield: "#8aeaff", magnet: "#c1a2ff", double: "#ffd070", boost: "#87f5c9" };
  const rampGeometry = geo(new THREE.BufferGeometry());
  rampGeometry.setAttribute("position", new THREE.Float32BufferAttribute([
    -1.1,0,2, 1.1,0,2, -1.1,1.2,-2, 1.1,0,2, 1.1,1.2,-2, -1.1,1.2,-2,
    -1.1,0,2, -1.1,1.2,-2, -1.1,0,-2, 1.1,0,2, 1.1,0,-2, 1.1,1.2,-2,
  ], 3)); rampGeometry.computeVertexNormals();
  const rampMat = mat(new THREE.MeshStandardMaterial({ color: "#73b7a7", roughness: 0.5, side: THREE.DoubleSide }));
  function buildItem(item: Item) {
    const g = new THREE.Group();
    if (item.kind === "skill") {
      mesh(g, ring, tokenMats[item.skill], 0, 1.25, 0); mesh(g, flat, labels[item.skill], 0, 1.25, 0.07, 0.67, 0.26, 1);
    } else if (item.kind === "ramp") {
      mesh(g, rampGeometry, rampMat, 0, 0, 0); sign(g, "RAMP ↑", "#baffdb", 0, 0.3, 2.03, 1.8);
    } else if (item.kind === "obstacle") {
      if (item.obstacle === "gap") {
        for (const z of [-2.5, 2.5]) cube(g, warning, 0, 0.04, z, 2.55, 0.08, 0.15);
        sign(g, "GAP ↑", "#ffdca6", 0, 0.48, 2.5, 1.8);
      } else if (item.obstacle === "gate") {
        for (const x of [-1.08, 1.08]) cube(g, steel, x, 1.35, 0, 0.12, 2.7, 0.35);
        cube(g, violet, 0, 2.12, 0, 2.3, 1.14, 0.65); sign(g, "SLIDE ↓", "#e4ceff", 0, 2.14, 0.34, 2);
      } else if (item.obstacle === "hurdle") {
        cube(g, steel, 0, 0.42, 0, 2.1, 0.84, 0.6); sign(g, "JUMP ↑", "#fff0a1", 0, 0.46, 0.32, 1.8);
      } else {
        cube(g, red, 0, 1.3, 0, 2.0, 2.6, 1.9); cube(g, steel, 0, 2.65, 0, 2.04, 0.1, 2);
        sign(g, item.obstacle === "moving" ? "MOVING ↔" : "DODGE ↔", "#ffb1c8", 0, 1.8, 0.96, 1.9);
        for (let i=0;i<3;i++) cube(g, neon, 0, 0.4+i*0.3, 0.965, 1.6, 0.045, 0.04);
      }
    } else {
      const color = powerColors[item.kind];
      mesh(g, geo(new THREE.OctahedronGeometry(0.53)), standard(color, 0.65), 0, 1.3, 0);
      sign(g, item.kind === "double" ? "2×" : item.kind.toUpperCase(), color, 0, 2, 0.1, 1.45);
    }
    return g;
  }
  const itemPool = new Map<string, THREE.Group[]>(); const activeItems = new Map<number, { key: string; group: THREE.Group }>();
  // Prebuild a finite pool: procedural Endless courses reuse these meshes/materials.
  const templateKinds: Item["kind"][] = ["skill", "ramp", "obstacle", "shield", "magnet", "double", "boost"];
  const itemKey = (item: Item) => `${item.kind}:${item.obstacle || ""}:${item.kind === "skill" ? item.skill : ""}`;
  for (const kind of templateKinds) {
    const variants = kind === "skill" ? [0,1,2,3] : kind === "obstacle" ? ["block","hurdle","gate","moving","gap"] : [0];
    for (const variant of variants) {
      const sample = { kind, skill: typeof variant === "number" ? variant : 0, obstacle: typeof variant === "string" ? variant : undefined } as Item;
      const key = itemKey(sample), pool: THREE.Group[] = [];
      for (let i=0;i<(kind === "skill" ? 12 : 6);i++) { const g=buildItem(sample);g.visible=false;scene.add(g);pool.push(g); }
      itemPool.set(key, pool);
    }
  }
  const particleGeo = geo(new THREE.BufferGeometry()); const particlePositions = new Float32Array(240 * 3); particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = mat(new THREE.PointsMaterial({ color: "#ffdbad", size: 0.09, transparent: true, opacity: 0.8, depthWrite: false }));
  const particles = new THREE.Points(particleGeo, particleMat); particles.frustumCulled = false; scene.add(particles);
  const cameraTarget = new THREE.Vector3(); const look = new THREE.Vector3();
  let previousTime = -1, disposed = false;

  function render(run: Run, calm: boolean) {
    if (disposed) return;
    const dt = previousTime < 0 || run.time < previousTime ? 1 : Math.max(0, run.time - previousTime); previousTime = run.time;
    const blend = 1-Math.exp(-6 * dt);
    const sector = sectorAt(run.time, run.mode); const zone = Math.floor((run.mode === "recruiter" ? Math.min(run.time, 44.999) : run.time) / 15) % 3;
    (scene.background as THREE.Color).lerp(new THREE.Color(sector.sky), blend);
    (scene.fog as THREE.FogExp2).color.copy(scene.background as THREE.Color); neon.color.set(sector.color);
    city.visible=zone===0; tunnel.visible=zone===1; rooftops.visible=zone===2;
    skyline.forEach((g,i)=>g.position.z=((i*10+run.distance)%260)-248);
    tunnelFrames.forEach((g,i)=>g.position.z=((i*13+run.distance)%143)-131);
    roofProps.forEach((g,i)=>g.position.z=((i*12+run.distance)%168)-156);
    const tileLength=3.2, first=Math.floor(run.distance/tileLength)-4;
    for(let i=0;i<48;i++) for(let lane=0;lane<3;lane++) {
      let start=(first+i)*tileLength, end=start+tileLength;
      for (const gap of run.items) if (gap.obstacle === "gap" && gap.lane === lane) {
        const a=gap.distance-2.5, b=gap.distance+2.5;
        if (a < end && b > start) { if(a <= start) start=Math.min(end,b); else end=a; }
      }
      const length=Math.max(0,end-start), worldDistance=(start+end)/2;
      instance(roadTiles,i*3+lane,laneX(lane),-0.18,run.distance-worldDistance,length?2.64:0,0.35,length);
    }
    roadTiles.instanceMatrix.needsUpdate=true;
    for(let i=0;i<48;i++) for(let side=0;side<2;side++) instance(markings,i*2+side,side?4.08:-4.08,0.025,run.distance-(first+i)*tileLength,0.07,0.06,tileLength*0.68);
    markings.instanceMatrix.needsUpdate=true;
    const currentIds=new Set(run.items.filter(item=>!item.collected && itemZ(run,item)>-112).map(item=>item.id));
    for(const [id,entry] of Array.from(activeItems)) if(!currentIds.has(id)) { entry.group.visible=false;itemPool.get(entry.key)!.push(entry.group);activeItems.delete(id); }
    for(const item of run.items) {
      if(!currentIds.has(item.id)) continue;
      let entry=activeItems.get(item.id);const key=itemKey(item);
      // Reset IDs can be reused by a new seeded course with a different item type.
      if(entry && entry.key!==key) { entry.group.visible=false;itemPool.get(entry.key)!.push(entry.group);activeItems.delete(item.id);entry=undefined; }
      if(!entry) { const group=itemPool.get(key)?.pop();if(!group) continue;entry={key,group};activeItems.set(item.id,entry); }
      entry.group.visible=true;entry.group.position.set(laneX(itemLane(run,item)),0,itemZ(run,item));
      entry.group.rotation.y=item.kind==="skill" && !calm ? Math.sin(run.time*3+item.id)*0.25 : 0;
    }
    const x=laneX(run.visualLane), height=playerHeight(run), sliding=isSliding(run), boost=run.boostUntil>run.time;
    const cycle=run.distance*2.25, stride=run.time===0?0:Math.sin(cycle);
    jacket.color.set(run.time < run.hitUntil ? "#69434e" : "#1a202c");
    character.position.set(x,height,0); character.rotation.y=run.time===0?Math.PI*0.72:0;
    character.rotation.z=calm?0:(run.lane-run.visualLane)*-0.13;
    pelvis.position.y=sliding?0.42:1.13+(calm||run.height>0?0:Math.abs(stride)*0.055);
    torso.rotation.x=sliding?-0.9:run.height>0?-0.15:-0.1;
    head.rotation.x=sliding?0.35:0;
    for(let i=0;i<2;i++) {
      const step=i?stride:-stride;
      hips[i].rotation.x=sliding?-1.3:boost?(i?0.2:-0.2):run.height>0?-0.75:step*0.68;
      knees[i].rotation.x=sliding?1.2:boost?0.35:run.height>0?1.15:Math.max(0,-step)*1.0;
      shoulders[i].rotation.x=sliding?0.6:boost?-0.25:run.height>0?-1.8:-step*0.55;
      shoulders[i].rotation.z=boost?(i?0.65:-0.65):0;
      elbows[i].rotation.x=-0.55;
    }
    board.visible=boost;board.position.set(x,run.height+0.32,0);board.rotation.z=character.rotation.z;
    bubble.visible=run.shieldUntil>run.time; bubble.position.set(x,height+1.2,0);
    playerShadow.position.x=x;playerShadow.scale.setScalar(Math.max(0.5,1-height*0.13));
    const nearGap=run.items.some(item=>item.obstacle==="gap"&&Math.abs(itemZ(run,item))<2.5&&Math.abs(itemLane(run,item)-run.visualLane)<0.4);playerShadow.visible=!nearGap;
    gateway.visible=run.mode==="recruiter"&&run.time>37;
    gateway.position.z=run.finished==="checkpoint"?-1:-Math.max(1,(45-run.time)*run.speed);
    cameraTarget.set(calm?0:x*0.36,4.4+(calm?0:height*0.15),boost&&!calm?9.4:8.1);
    if(run.time===0) cameraTarget.set(4.6,3.5,7.8);
    camera.position.lerp(cameraTarget, previousTime===0?1:blend);
    look.set(calm?0:x*0.18,1.4,-8);if(run.time===0)look.set(0,1.1,-0.8);
    camera.lookAt(look);const fov=boost&&!calm?66:58;camera.fov+=(fov-camera.fov)*blend;camera.updateProjectionMatrix();
    let count=0;
    if(!calm) for(const burst of run.bursts) for(let i=0;i<10 && count<240;i++) {
      const age=run.time-burst.born,angle=i*Math.PI*0.2;
      particlePositions[count*3]=laneX(burst.lane)+Math.cos(angle)*age*2.7;
      particlePositions[count*3+1]=1+Math.sin(angle)*age*2+age*2;
      particlePositions[count*3+2]=age*run.speed*0.2;count++;
    }
    particleGeo.setDrawRange(0,count);particleGeo.attributes.position.needsUpdate=true;
    renderer.render(scene,camera);
  }
  return {
    render,
    resize(width,height) { if(disposed)return;renderer.setSize(Math.max(1,width),Math.max(1,height),false);camera.aspect=width/Math.max(1,height);camera.updateProjectionMatrix(); },
    stats() { return { calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures }; },
    dispose() { if(disposed)return;disposed=true;for(const g of Array.from(geometries))g.dispose();for(const m of Array.from(materials))m.dispose();for(const t of Array.from(textures))t.dispose();roadTiles.dispose();markings.dispose();scene.clear();renderer.dispose();activeItems.clear();itemPool.clear(); },
  };
}
