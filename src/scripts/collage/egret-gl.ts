// Draws the flying egret with a wingbeat. One photo of the bird in flight is split by a wing mask into
// far wing, body and near wing; each wing turns about its shoulder, the far one behind the body and the
// near one in front. theta runs from -0.5 (wings down) to 1 (wings up). Without WebGL it draws the photo still.

const VERT = `attribute vec2 a; varying vec2 v;
void main(){ v = a * 0.5 + 0.5; v.y = 1.0 - v.y; gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `precision mediump float;
varying vec2 v;
uniform sampler2D tex;
uniform sampler2D mask;
uniform float theta;
const float ASPECT = 1.789;
const vec2 PADF = vec2(0.06, 0.30);
const vec2 FAR_P = vec2(0.4216, 0.555);
const vec2 NEAR_P = vec2(0.509, 0.737);
const float DEG = 0.0174533;
vec2 rot(vec2 p, float a){ float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }
bool inside(vec2 uv){ return uv.x >= 0.0 && uv.y >= 0.0 && uv.x <= 1.0 && uv.y <= 1.0; }
vec4 samp(vec2 iso){ vec2 uv = vec2(iso.x / ASPECT, iso.y); return inside(uv) ? texture2D(tex, uv) : vec4(0.0); }
vec2 mk(vec2 iso){ vec2 uv = vec2(iso.x / ASPECT, iso.y); return inside(uv) ? texture2D(mask, uv).rg : vec2(0.0); }
void main(){
  vec2 s = v * (1.0 + 2.0 * PADF) - PADF;
  vec2 q = vec2(s.x * ASPECT, s.y);
  vec2 pF = vec2(FAR_P.x * ASPECT, FAR_P.y), pN = vec2(NEAR_P.x * ASPECT, NEAR_P.y);
  vec2 relF = q - pF;
  float aF = theta * 24.0 * DEG * smoothstep(0.04, 0.30, length(relF) / 0.83);
  vec2 srcF = pF + rot(relF, -aF);
  vec4 cF = samp(srcF) * mk(srcF).r;
  vec2 relN = q - pN;
  float aN = -theta * 32.0 * DEG * smoothstep(0.04, 0.28, length(relN) / 0.864);
  vec2 srcN = pN + rot(relN, -aN);
  vec4 cN = samp(srcN) * mk(srcN).g;
  vec2 qb = q - vec2(0.0, theta * 0.016);
  vec2 mb = mk(qb);
  vec4 cB = samp(qb) * (1.0 - clamp(mb.r + mb.g, 0.0, 1.0));
  // Where a wing has barely turned, its pixels and the body's come from the same spot, so add them.
  float kF = smoothstep(0.0, 2.5 * DEG, abs(aF));
  float kN = smoothstep(0.0, 2.5 * DEG, abs(aN));
  vec4 c = cB + cF * (1.0 - cB.a * kF);
  gl_FragColor = cN + c * (1.0 - cN.a * kN);
}`;

/** Padding around the bird inside the canvas, as a share of the bird's own size (room for the wings). */
export const PAD = { x: 0.06, y: 0.3 };

export interface EgretRenderer {
  draw(theta: number): void;
}

const load = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });

export async function createEgretRenderer(canvas: HTMLCanvasElement, photoUrl: string, maskUrl: string): Promise<EgretRenderer> {
  const photo = await load(photoUrl);
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  const still = (): EgretRenderer => {
    const ctx = canvas.getContext('2d');
    const w = canvas.width / (1 + 2 * PAD.x);
    const h = canvas.height / (1 + 2 * PAD.y);
    return {
      draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(photo, w * PAD.x, h * PAD.y, w, h);
      },
    };
  };
  if (!gl) return still();

  let maskImg: HTMLImageElement;
  try {
    maskImg = await load(maskUrl);
  } catch {
    return still();
  }
  const shader = (type: number, source: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
    return s;
  };
  const program = gl.createProgram()!;
  try {
    gl.attachShader(program, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
  } catch {
    return still();
  }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const texture = (unit: number, img: HTMLImageElement, premultiply: boolean) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiply);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };
  texture(0, photo, true);
  texture(1, maskImg, false);
  gl.uniform1i(gl.getUniformLocation(program, 'tex'), 0);
  gl.uniform1i(gl.getUniformLocation(program, 'mask'), 1);
  const uTheta = gl.getUniformLocation(program, 'theta');
  gl.clearColor(0, 0, 0, 0);

  return {
    draw(theta: number) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTheta, theta);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  };
}
