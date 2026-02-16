import React, { useRef, useEffect } from 'react';

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}

void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.1)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.3+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		col+=.00125/d*(cos(sin(i)*vec3(1.,1.5,2.))+1.); // Shifted to teal/blue
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		col=mix(col,vec3(bg*0.05, bg*0.25, bg*0.35),d); // Teal cloud mix
	}
	O=vec4(col,1);
}`;

const KFZHero = ({ trustBadge, headline, subtitle, buttons }) => {
    const canvasRef = useRef(null);
    const animationFrameRef = useRef();
    const rendererRef = useRef(null);

    class WebGLRenderer {
        constructor(canvas, scale) {
            this.canvas = canvas;
            this.scale = scale;
            this.gl = canvas.getContext('webgl2');
            this.updateViewport();
            this.shaderSource = defaultShaderSource;
        }

        updateViewport() {
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }

        compile(shader, source) {
            const gl = this.gl;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
            }
        }

        setup() {
            const gl = this.gl;
            const vertexSrc = `#version 300 es
      precision highp float;
      in vec4 position;
      void main(){gl_Position=position;}`;

            this.vs = gl.createShader(gl.VERTEX_SHADER);
            this.fs = gl.createShader(gl.FRAGMENT_SHADER);
            this.compile(this.vs, vertexSrc);
            this.compile(this.fs, this.shaderSource);

            this.program = gl.createProgram();
            gl.attachShader(this.program, this.vs);
            gl.attachShader(this.program, this.fs);
            gl.linkProgram(this.program);

            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(this.program));
            }
        }

        init() {
            const gl = this.gl;
            const program = this.program;
            const vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
            this.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            const position = gl.getAttribLocation(program, 'position');
            gl.enableVertexAttribArray(position);
            gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

            program.resolution = gl.getUniformLocation(program, 'resolution');
            program.time = gl.getUniformLocation(program, 'time');
        }

        render(now = 0) {
            const gl = this.gl;
            const program = this.program;
            if (!program) return;

            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);

            gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
            gl.uniform1f(program.time, now * 1e-3);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        reset() {
            const gl = this.gl;
            if (this.program) gl.deleteProgram(this.program);
        }
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

        let isVisible = true;

        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            if (rendererRef.current) rendererRef.current.updateViewport();
        };

        rendererRef.current = new WebGLRenderer(canvas, dpr);
        rendererRef.current.setup();
        rendererRef.current.init();
        resize();

        const loop = (now) => {
            if (rendererRef.current && isVisible) {
                rendererRef.current.render(now);
            }
            animationFrameRef.current = requestAnimationFrame(loop);
        };
        loop(0);

        // Intersection Observer to pause rendering when not visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(canvas);

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            observer.disconnect();
            cancelAnimationFrame(animationFrameRef.current);
            if (rendererRef.current) rendererRef.current.reset();
        };
    }, []);

    return (
        <div className="kfz-hero-container">
            <canvas ref={canvasRef} className="kfz-shader-canvas" />

            <div className="kfz-hero-overlay">
                {trustBadge && (
                    <div className="kfz-trust-badge animate-fade-in-down">
                        {trustBadge.icons && (
                            <span style={{ display: 'flex' }}>
                                {trustBadge.icons.map((icon, i) => <span key={i}>{icon}</span>)}
                            </span>
                        )}
                        <span>{trustBadge.text}</span>
                    </div>
                )}

                <div className="kfz-headline-group">
                    <h1 className="kfz-headline-1 animate-fade-in-up animation-delay-200">{headline.line1}</h1>
                    <h1 className="kfz-headline-2 animate-fade-in-up animation-delay-400">{headline.line2}</h1>
                </div>

                <p className="kfz-subtitle-text animate-fade-in-up animation-delay-600">
                    {subtitle}
                </p>

                {buttons && (
                    <div className="kfz-btn-group animate-fade-in-up animation-delay-800">
                        {buttons.primary && (
                            <button
                                onClick={buttons.primary.onClick}
                                className="kfz-btn-primary"
                            >
                                {buttons.primary.text}
                            </button>
                        )}
                        {buttons.secondary && (
                            <button
                                onClick={buttons.secondary.onClick}
                                className="kfz-btn-secondary"
                            >
                                {buttons.secondary.text}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KFZHero;
