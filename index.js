// const CX = 250;
// const CY =230;
// const SCALE = 11.5;
// const COUNT = 80;
// const CYCLE = 5000;
// const WINDOW = 0.32;

// function HeartXY(t) {
//     const x = SCALE * 16 * Math.pow(Math.sin(t),3);
//     const y = -SCALE *( 13 * Math.cos(t) - 5*Math.cos(2*t) - 2 * Math.cos(3 * t)
//         - Math.cos(4 * t));
//     return { x:CX+x, y:CY+y};
// }

// const labels =[
//     'We love you','Happy MothersDay','Siyaguthanda',
//     'We love you','Happy MothersDay','Siyaguthanda',
// ];

// const container = document.getElementById('heart-container');
// const nodes = [];

// for (let i = 0; i < COUNT; i++) {
//    const element = document.createElement('div');
//    element.className='word';
//    element.textContent= labels[i%labels.length];
//    container.appendChild(element);
//    nodes.push(element);
// }

// function waveDelay(i){
//     const t = (i/COUNT)*2*Math.PI
//     const {x} = HeartXY(t);

//     if (x<CX) {
//         return Math.max(0, Math.min(1,(t-Math.PI)/Math.PI))
//     }else{
//         return t/ Math.PI;
//     }
// }

// function tick(now) {
//    const phase = (now%CYCLE) /CYCLE ;

//    for (let i = 0; i < COUNT; i++) {
//     const element =nodes[i];
//     const t = (i/COUNT) * 2 * Math.PI;
//     const pt = HeartXY(t);
//     const delay = waveDelay(i)

//     // Postition
//     element.style.left = pt.x +'px'
//     element.style.top = pt.y +'py'

    
//   /* Colour — pink → magenta gradient around the heart */
//      const hue = 310 + (i / COUNT) * 50;
//      element.style.color      = `hsl(${hue}, 100%, 68%)`;
//      element.style.textShadow = `0 0 6px hsl(${hue}, 100%, 70%)`;

//     /* Opacity — smooth sine fade in/out around the wave front */
//      let diff = Math.abs(phase - delay);
//     if (diff > 0.5) diff = 1 - diff;          // wrap-around distance
//      const raw    = Math.max(0, 1 - diff / WINDOW);
//      const smooth = Math.sin(raw * Math.PI / 2); // ease curve

//      element.style.opacity = smooth.toFixed(3);
//    }
   
//       requestAnimationFrame(tick);
// }
      /* SSCalculate the heart container size based on the available screen space,
       so it looks great on phones, tablets, and desktops. */
    const PADDING   = 80;   // px reserved for title + button + body padding
    const MAX_SIZE  = 500;  // desktop cap
 
    const availW = Math.min(window.innerWidth  - 32, MAX_SIZE);
    const availH = Math.min(window.innerHeight - PADDING * 3, MAX_SIZE);
    const SIZE   = Math.min(availW, availH);
 
    const container = document.getElementById('heart-container');
    container.style.width  = SIZE + 'px';
    container.style.height = SIZE + 'px';
//   requestAnimationFrame(tick);
    /* ── Config — tweak these to customise ── */
    /* ── Heart config ── */
    const CX       = SIZE / 2;
    const CY       = SIZE / 2.1;
    const SCALE    = SIZE / 43;        // scales with container
    const COUNT    = 80;
    const CYCLE_MS = 5000;
    const WINDOW   = 0.32;
    const FONTSIZE = Math.max(0.5, SIZE / 700) + 'rem';
 
    function heartXY(t) {
      const x = SCALE * 16 * Math.pow(Math.sin(t), 3);
      const y = -SCALE * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
      return { x: CX + x, y: CY + y };
    }
 
    const labels = ['I love you', 'Happy mothers Day', "You the best", 'I love you', 'Happy mothers day', 'You the best'];
    const nodes  = [];
 
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      el.className   = 'word';
      el.textContent = labels[i % labels.length];
      el.style.fontSize = FONTSIZE;
      container.appendChild(el);
      nodes.push(el);
    }
 
    function waveDelay(i) {
      const t      = (i / COUNT) * 2 * Math.PI;
      const { x }  = heartXY(t);
      if (x < CX) return Math.max(0, Math.min(1, (t - Math.PI) / Math.PI));
      return t / Math.PI;
    }
 
    const colors = [
      '#0e0e0e', '#2a2a2a', '#444444', '#1a1a1a',
      '#333333', '#0e0e0e', '#222222', '#3a3a3a'
    ];
 
    function tick(now) {
      const phase = (now % CYCLE_MS) / CYCLE_MS;
 
      for (let i = 0; i < COUNT; i++) {
        const el    = nodes[i];
        const t     = (i / COUNT) * 2 * Math.PI;
        const pt    = heartXY(t);
        const delay = waveDelay(i);
 
        el.style.left  = pt.x + 'px';
        el.style.top   = pt.y + 'px';
        el.style.color = colors[i % colors.length];
        el.style.textShadow = '0 0 6px rgba(0,0,0,0.1)';
 
        let diff = Math.abs(phase - delay);
        if (diff > 0.5) diff = 1 - diff;
        const raw    = Math.max(0, 1 - diff / WINDOW);
        const smooth = Math.sin(raw * Math.PI / 2);
        el.style.opacity = smooth.toFixed(3);
      }
 
      requestAnimationFrame(tick);
    }
 
    requestAnimationFrame(tick);
