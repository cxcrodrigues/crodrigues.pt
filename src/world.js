// The "world": one continuous WebGL2 point field behind the whole page.
// Each section asks for a mode and the terrain morphs between them, so the page
// reads as one unbroken shot rather than a stack of separate backgrounds.

const VS = `#version 300 es
precision highp float;
in vec2 a;
uniform float T, Asp, Dpr, Dim, Heat, CamY, Pitch, Pi, Flow;
uniform float M[7];
uniform vec2 P;
out float vA;
out float vH;
out float vS;

vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453);}
float h1(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5453);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(dot(h2(i),f),dot(h2(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(h2(i+vec2(0,1)),f-vec2(0,1)),dot(h2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}
float ridged(vec2 p){float s=0.,w=.55;for(int i=0;i<4;i++){float n=1.-abs(n2(p))*2.;s+=w*n*n;w*=.5;p=p*2.03+vec2(7.1,3.7);}return s;}
float fbm(vec2 p){float s=0.,w=.6;for(int i=0;i<3;i++){s+=w*n2(p);w*=.5;p=p*2.1+3.3;}return s;}

float heightAt(vec2 g){
  vec2 p=vec2(g.x,g.y+T*Flow);
  float h=0.;
  // 0 hero: a valley with ridgelines rising either side of the type
  if(M[0]>.002){float v=smoothstep(1.5,9.,abs(g.x));h+=M[0]*(ridged(p*.2)*2.5*(.22+v*1.1)+.1*n2(p*.8));}
  // 1 Roamlii: alpine terrain
  if(M[1]>.002){float r=ridged(p*.17+11.);h+=M[1]*(r*r*4.4-.25);}
  // 2 Movize: routes winding through a landscape, pulses travelling along them
  if(M[2]>.002){float w=g.x*.33+sin(p.y*.2)*1.7+fbm(p*.1)*3.8;float s=pow(.5+.5*sin(w*5.),10.);
    float pulse=.55+.45*sin(p.y*.8-T*2.2+floor(w*5./6.283)*2.1);h+=M[2]*(s*1.05*pulse+.05*n2(p*.5));}
  // 3 DriverWise: modular blocks, a city of workshops
  if(M[3]>.002){vec2 c=floor(p*.62);float r=h1(c);vec2 f=fract(p*.62);float e=step(.09,f.x)*step(.09,f.y);
    h+=M[3]*(e*r*r*r*3.3*(.75+.25*sin(T*.45+r*40.)));}
  // 4 Circunomics: stacked telemetry traces
  if(M[4]>.002){float row=floor(g.y*.42);float amp=.35+.65*h1(vec2(row,3.));float x=g.x*(.55+amp*.5)+T*(.9+amp*1.2)+row*1.9;
    float s=sin(x*1.3)*.34+sin(x*3.9)*.13*amp+pow(max(0.,sin(x*.47)),30.)*2.4;
    h+=M[4]*(s*amp*1.25+.5);}
  // 5 Calm: long swell, used behind reading sections
  if(M[5]>.002){h+=M[5]*(.2*sin(p.y*.35+g.x*.12)+.2*fbm(p*.2));}
  // 6 Contact: everything gathers into one peak
  if(M[6]>.002){vec2 q=g-vec2(0.,-15.);float r=length(q);
    float peak=exp(-r*r*.024)*(3.1+ridged(q*.26+T*.04)*1.9);
    h+=M[6]*(peak+sin(r*1.5-T*1.2)*.2*exp(-r*.1));}
  return h;
}

vec3 cam(vec3 w){
  vec3 q=vec3(w.x,w.y-CamY,w.z);
  float c=cos(Pitch),s=sin(Pitch);
  return vec3(q.x,q.y*c-q.z*s,q.y*s+q.z*c);
}

void main(){
  float spread=max(1.,Asp/1.5);
  float zt=a.y*.5+.5;vec2 g=vec2(a.x*19.*spread,mix(-1.5,-34.,zt*zt*.55+zt*.45));
  float h=heightAt(g);
  const float F=1.55;
  vec3 q0=cam(vec3(g.x,h,g.y));
  vec2 ndc=vec2(q0.x*F/Asp,q0.y*F)/max(.1,-q0.z);
  float d=length((ndc-P)*vec2(Asp,1.));
  float lift=Pi*exp(-d*d*16.)*(.75+.12*sin(d*26.-T*5.));
  h+=lift;
  vec3 q=cam(vec3(g.x,h,g.y));
  float w=-q.z;
  gl_Position=vec4(q.x*F/Asp,q.y*F,0.,max(.1,w));
  gl_PointSize=clamp(30./w,1.05,5.)*Dpr*.85;
  float far=smoothstep(34.,17.,w);
  float near=smoothstep(.8,4.,w);
  float side=1.-smoothstep(.72,1.,abs(a.x));
  vA=far*near*side*Dim;
  vH=clamp(smoothstep(.3,2.1,h)*Heat+lift*.7,0.,1.);
  // A scan front keeps sweeping the field, like a model reading its input.
  float sw=fract(T*.06);
  float dz=zt-sw;
  vS=exp(-dz*dz*900.)*.9+exp(-dz*dz*40.)*.1;
  vA*=1.+vS*1.8;
}`;

const FS = `#version 300 es
precision highp float;
in float vA;
in float vH;
in float vS;
uniform vec3 Ink, Hot, Sig;
uniform float Add;
out vec4 o;
void main(){
  vec2 c=gl_PointCoord-.5;
  float r=dot(c,c);
  if(r>.25)discard;
  float e=smoothstep(.25,.1,r);
  float a=vA*e*(.34+.66*vH);
  vec3 col=mix(mix(Ink,Hot,vH),Sig,clamp(vS,0.,1.));
  o=vec4(col,a);
}`;

//                 hero roam  move  driv  circ  calm  cont
const CAM_Y   =   [2.5, 4.2,  3.1,  4.4,  3.0,  2.2,  2.3];
const GRAPH   =   [.58, .3,   .38,  .3,   .4,   .5,   .55];
const PITCH   =   [.15, .26,  .32,  .38,  .24,  .13,  .1];
const DIM     =   [.9,  .9,   1.05, .85,  1.1,  .42,  1.0];
const HEAT    =   [.85, .75,  1.5,  .8,   1.2,  .35,  1.25];
const FLOW    =   [.55, .22,  .15,  .1,   .05,  .28,  .1];

// Signal network: a layered graph floating above the terrain, pulses running along its edges.
const GVS = `#version 300 es
precision highp float;
in vec3 p;
in vec2 m; // along-edge position (-1 for nodes), phase
uniform float T, Asp, Dpr, CamY, Pitch, Node;
out float vS;
out float vP;
void main(){
  float spread=max(1.,Asp/1.5);
  vec3 w=vec3(p.x*17.*spread,p.y+sin(T*.32+p.x*5.+p.z)*.22,p.z);
  vec3 q=vec3(w.x,w.y-CamY,w.z);
  float c=cos(Pitch),s=sin(Pitch);
  q=vec3(q.x,q.y*c-q.z*s,q.y*s+q.z*c);
  gl_Position=vec4(q.x*1.55/Asp,q.y*1.55,0.,max(.1,-q.z));
  gl_PointSize=(2.2+1.6*(.5+.5*sin(T*1.3+m.y*6.283)))*Dpr;
  vS=m.x;
  vP=m.y;
}`;
const GFS = `#version 300 es
precision highp float;
in float vS;
in float vP;
uniform float T, G, Node;
uniform vec3 Sig, Hot;
out vec4 o;
void main(){
  if(Node>.5){
    float r=dot(gl_PointCoord-.5,gl_PointCoord-.5);
    if(r>.25)discard;
    o=vec4(mix(Sig,Hot,step(.82,vP)),G*.85);
    return;
  }
  float t=fract(T*(.09+vP*.11)+vP*17.);
  float pulse=smoothstep(.07,0.,abs(t*1.2-.1-vS));
  o=vec4(mix(Sig,Hot,step(.82,vP)),G*(.13+pulse*.95));
}`;

const PALETTES = {
  dark:  { bg: [0.016, 0.075, 0.086], ink: [0.47, 0.74, 0.78], hot: [1.0, 0.353, 0.122], sig: [0.216, 0.902, 0.847], add: 1 },
  light: { bg: [0.937, 0.918, 0.875], ink: [0.05, 0.27, 0.31], hot: [0.84, 0.25, 0.04], sig: [0, 0.5, 0.53], add: 0 },
};

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

export function createWorld(canvas, { still = false } = {}) {
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: false });
  if (!gl) { canvas.style.display = 'none'; return null; }

  const prog = gl.createProgram();
  try {
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FS));
    gl.bindAttribLocation(prog, 0, 'a');
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) {
    console.warn('world disabled:', e);
    canvas.style.display = 'none';
    return null;
  }
  gl.useProgram(prog);
  const u = {};
  for (const n of ['T', 'Asp', 'Dpr', 'Dim', 'Heat', 'CamY', 'Pitch', 'Pi', 'Flow', 'P', 'Ink', 'Hot', 'Sig', 'Add']) u[n] = gl.getUniformLocation(prog, n);
  u.M = gl.getUniformLocation(prog, 'M');

  // --- signal network geometry (seeded, so every visit draws the same graph)
  const gProg = gl.createProgram();
  gl.attachShader(gProg, compile(gl, gl.VERTEX_SHADER, GVS));
  gl.attachShader(gProg, compile(gl, gl.FRAGMENT_SHADER, GFS));
  gl.bindAttribLocation(gProg, 1, 'p');
  gl.bindAttribLocation(gProg, 2, 'm');
  gl.linkProgram(gProg);
  const gu = {};
  for (const n of ['T', 'Asp', 'Dpr', 'CamY', 'Pitch', 'G', 'Node', 'Sig', 'Hot']) gu[n] = gl.getUniformLocation(gProg, n);
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const layers = [];
  const LAYERS = innerWidth < 760 ? 5 : 8;
  for (let l = 0; l < LAYERS; l++) {
    const n = 5 + Math.floor(rnd() * 5);
    const col = [];
    for (let i = 0; i < n; i++) col.push([(l / (LAYERS - 1)) * 1.9 - 0.95 + (rnd() - 0.5) * 0.05, 2.6 + (i / (n - 1)) * 6.4 + (rnd() - 0.5) * 0.5, -15 - rnd() * 10, rnd()]);
    layers.push(col);
  }
  const nodes = layers.flat();
  const edges = [];
  for (let l = 0; l < LAYERS - 1; l++) for (const a of layers[l]) {
    const links = 2 + Math.floor(rnd() * 2);
    for (let k = 0; k < links; k++) {
      const b = layers[l + 1][Math.floor(rnd() * layers[l + 1].length)];
      const ph = rnd();
      edges.push(a[0], a[1], a[2], 0, ph, b[0], b[1], b[2], 1, ph);
    }
  }
  const eCount = edges.length / 5;
  const nCount = nodes.length;
  const gData = new Float32Array([...edges, ...nodes.flatMap((n) => [n[0], n[1], n[2], -1, n[3]])]);
  const gBuf = gl.createBuffer();
  const gVao = gl.createVertexArray();
  gl.bindVertexArray(gVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gBuf);
  gl.bufferData(gl.ARRAY_BUFFER, gData, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 20, 0);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 20, 12);
  const fieldVao = gl.createVertexArray();
  gl.bindVertexArray(fieldVao);

  const buf = gl.createBuffer();
  let count = 0;
  function grid(cols, rows) {
    const d = new Float32Array(cols * rows * 2);
    let k = 0;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      d[k++] = (x / (cols - 1)) * 2 - 1;
      d[k++] = (y / (rows - 1)) * 2 - 1;
    }
    gl.bindVertexArray(fieldVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, d, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    count = cols * rows;
  }

  const small = () => innerWidth < 760;
  let quality = small() ? 0.6 : 1;
  const setGrid = () => grid(Math.round(340 * quality), Math.round(170 * quality));
  setGrid();

  gl.enable(gl.BLEND);

  let dpr = 1;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, quality < 1 ? 1.25 : 1.75);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();

  const w = [1, 0, 0, 0, 0, 0, 0];
  const pal = { bg: [0, 0, 0], ink: [0, 0, 0], hot: [0, 0, 0], sig: [0, 0, 0], add: 1 };
  const applyPal = (name, snap) => {
    const p = PALETTES[name];
    target.pal = p;
    if (snap) { pal.bg = [...p.bg]; pal.ink = [...p.ink]; pal.hot = [...p.hot]; pal.sig = [...p.sig]; pal.add = p.add; }
  };
  const target = { mode: 0, pal: PALETTES.dark, px: 0, py: 0, pi: 0, master: 0 };
  const cur = { px: 0, py: 0, pi: 0, master: 0 };
  let t = still ? 40 : Math.random() * 100;
  let frames = 0, slow = 0;

  const mix = (arr) => arr.reduce((s, v, i) => s + v * w[i], 0);

  function draw(dt) {
    const kMode = 1 - Math.exp(-dt * (still ? 100 : 1.9));
    let sum = 0;
    for (let i = 0; i < 7; i++) { w[i] += ((i === target.mode ? 1 : 0) - w[i]) * kMode; sum += w[i]; }
    for (let i = 0; i < 7; i++) w[i] /= sum;

    const kPal = 1 - Math.exp(-dt * 6);
    for (const key of ['bg', 'ink', 'hot', 'sig']) for (let i = 0; i < 3; i++) pal[key][i] += (target.pal[key][i] - pal[key][i]) * kPal;
    pal.add += (target.pal.add - pal.add) * kPal;

    const kP = 1 - Math.exp(-dt * 7);
    cur.px += (target.px - cur.px) * kP;
    cur.py += (target.py - cur.py) * kP;
    cur.pi += (target.pi - cur.pi) * (1 - Math.exp(-dt * 3));
    cur.master += (target.master - cur.master) * (1 - Math.exp(-dt * (still ? 100 : 1.5)));
    if (!still) t += dt;

    gl.clearColor(pal.bg[0], pal.bg[1], pal.bg[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (pal.add > 0.5) gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    else gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.uniform1f(u.T, t);
    gl.uniform1f(u.Asp, canvas.width / canvas.height);
    gl.uniform1f(u.Dpr, dpr);
    gl.uniform1f(u.Dim, mix(DIM) * cur.master * (pal.add > 0.5 ? 1 : 1.25));
    gl.uniform1f(u.Heat, mix(HEAT));
    gl.uniform1f(u.CamY, mix(CAM_Y));
    gl.uniform1f(u.Pitch, mix(PITCH));
    gl.uniform1f(u.Flow, mix(FLOW));
    gl.uniform1f(u.Pi, cur.pi);
    gl.uniform2f(u.P, cur.px, cur.py);
    gl.uniform3fv(u.Ink, pal.ink);
    gl.uniform3fv(u.Hot, pal.hot);
    gl.uniform3fv(u.Sig, pal.sig);
    gl.uniform1f(u.Add, pal.add);
    gl.uniform1fv(u.M, w);
    gl.bindVertexArray(fieldVao);
    gl.drawArrays(gl.POINTS, 0, count);

    gl.useProgram(gProg);
    gl.bindVertexArray(gVao);
    gl.uniform1f(gu.T, t);
    gl.uniform1f(gu.Asp, canvas.width / canvas.height);
    gl.uniform1f(gu.Dpr, dpr);
    gl.uniform1f(gu.CamY, mix(CAM_Y));
    gl.uniform1f(gu.Pitch, mix(PITCH));
    gl.uniform1f(gu.G, mix(GRAPH) * cur.master * (pal.add > 0.5 ? 1 : 1.2));
    gl.uniform3fv(gu.Sig, pal.sig);
    gl.uniform3fv(gu.Hot, pal.hot);
    gl.uniform1f(gu.Node, 0);
    gl.drawArrays(gl.LINES, 0, eCount);
    gl.uniform1f(gu.Node, 1);
    gl.drawArrays(gl.POINTS, eCount, nCount);
    gl.useProgram(prog);
    gl.bindVertexArray(fieldVao);

    // Drop detail once if this device can't hold frame rate; never drop the effect.
    if (!still && quality === 1 && frames < 240) {
      frames++;
      if (dt > 1 / 38) slow++;
      if (frames === 240 && slow > 90) { quality = 0.62; setGrid(); resize(); }
    }
  }

  return {
    draw,
    resize,
    setMode: (m) => { target.mode = m; },
    setTheme: (name, snap) => applyPal(name, snap),
    setPointer: (x, y, on) => { target.px = x; target.py = y; target.pi = on ? 1 : 0; },
    setMaster: (v) => { target.master = v; },
    still,
  };
}
