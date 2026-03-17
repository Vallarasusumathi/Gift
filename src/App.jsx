// ╔══════════════════════════════════════════════════════════════════╗
// ║   Happy Birthday Logeshwary 🎂  —  Full React App               ║
// ║   File: src/App.jsx                                              ║
// ╚══════════════════════════════════════════════════════════════════╝

import { useState, useEffect, useRef, useCallback } from "react";

import CakeVideo    from "./assets/media/College_CakeCutting.mp4";
import sarathiVideo from "./assets/media/sarathi_bday.mp4";
import MuruganTemple from "./assets/media/Murugan_Temple.jpeg";


const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@600;700&family=Poppins:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --pink:#ff6b9d; --rose:#ff4081; --gold:#ffd700;
    --purple:#9c27b0; --deep:#1a0533; --deep2:#2d0a4e;
    --glass:rgba(255,255,255,0.07); --glass-b:rgba(255,107,157,0.25);
  }
  html,body { font-family:'Poppins',sans-serif; background:var(--deep); color:#fff; min-height:100vh; overflow-x:hidden; }
  #bg-particles { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
  .particle { position:absolute; border-radius:50%; animation:floatUp linear infinite; opacity:.5; }
  @keyframes floatUp {
    0%   { transform:translateY(100vh) rotate(0deg); opacity:0; }
    10%  { opacity:.6; } 90% { opacity:.3; }
    100% { transform:translateY(-10vh) rotate(720deg); opacity:0; }
  }
  #bg-hearts { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
  .heart { position:absolute; bottom:-60px; animation:heartFloat linear infinite; opacity:0; user-select:none; filter:drop-shadow(0 0 6px currentColor); }
  @keyframes heartFloat {
    0%   { transform:translateY(0) scale(.7) rotate(-15deg); opacity:0; }
    10%  { opacity:1; }
    40%  { transform:translateY(-40vh) scale(1.1) rotate(10deg); }
    70%  { transform:translateY(-70vh) scale(.95) rotate(-8deg); opacity:.85; }
    90%  { opacity:.4; }
    100% { transform:translateY(-105vh) scale(.8) rotate(20deg); opacity:0; }
  }
  #bg-side-hearts { position:fixed; inset:0; pointer-events:none; z-index:0; }
  .side-heart { position:absolute; opacity:.18; animation:sidePulse ease-in-out infinite; }
  @keyframes sidePulse {
    0%,100% { transform:scale(1) rotate(0deg); opacity:.18; }
    50%      { transform:scale(1.35) rotate(12deg); opacity:.35; }
  }
  .page-wrap { animation:pageFadeIn .6s ease forwards; }
  @keyframes pageFadeIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes glow {
    0%,100% { text-shadow:0 0 30px rgba(255,215,0,.45); }
    50%      { text-shadow:0 0 70px rgba(255,215,0,.9),0 0 110px rgba(255,107,157,.4); }
  }
  @keyframes cakeBounce {
    0%,100% { transform:translateY(0) scale(1); }
    50%      { transform:translateY(-16px) scale(1.08); }
  }
  @keyframes sway {
    0%,100% { transform:rotate(-12deg); }
    50%      { transform:rotate(12deg); }
  }
  @keyframes lockPulse {
    0%,100% { transform:scale(1); }
    50%      { transform:scale(1.12); }
  }
`;

/* ═══════════════════════════════════════════════════════════
   DATA — QUESTIONS
   ═══════════════════════════════════════════════════════════ */
const QUESTIONS = [
  {
    type: "mcq",
    text: "💬 On which exact date did you first begin speaking with Vallarasu?",
    options: ["20th October 2020", "20th July 2020", "20th April 2020", "20th November 2020"],
    correct: 0,
  },
  {
    type: "mcq",
    text: "🥰 With whom do you enjoy spending your time the most?",
    options: ["Family", "Friends", "Yourself", "Colleagues at work"],
    correct: 0,
  },
  {
    type: "yn",
    text: "🎂 Do you still miss the friends who was present with you during your birthday celebration back in your college days? 💕",
    yesMedia: { slotKey: "quiz_q3_yes", preloaded: { url: CakeVideo,     type: "video" }, label: "Cake Cutting Birthday Memory 🎂" },
    noMedia:  { slotKey: "quiz_q3_no",  preloaded: { url: CakeVideo,     type: "video" }, label: "Cake Cutting Birthday Memory 🎂" },
  },
  {
    type: "yn",
    text: "💙 Do you find yourself missing Sarathi? 🥺",
    yesMedia: { slotKey: "quiz_q4_yes", preloaded: { url: sarathiVideo,  type: "video" }, label: "Sarathi's Birthday Memory Video 🎬" },
    noMedia:  { slotKey: "quiz_q4_no",  preloaded: { url: sarathiVideo,  type: "video" }, label: "Sarathi's Birthday Memory Video 🎬" },
  },
  {
    type: "yn",
    text: "🛕 Do you remember that one truly wonderful day when you, Kowsy, and Vallarasu all travelled together to the Murugar Temple? You were so genuinely and completely happy that day... Do you miss it? 🌸",
    // ✅ type is now lowercase "image" — fixes the display bug
    yesMedia: { slotKey: "quiz_q5_yes", preloaded: { url: MuruganTemple, type: "image" }, label: "Our Murugar Temple Trip 🛕🌸" },
    noMedia:  { slotKey: "quiz_q5_no",  preloaded: { url: MuruganTemple, type: "image" }, label: "Our Murugar Temple Trip 🛕🌸" },
  },
];

/* ═══════════════════════════════════════════════════════════
   DATA — WISHES
   ═══════════════════════════════════════════════════════════ */
const WISHES = [
  {
    icon: "🏠", name: "Family",
    preview: "A warm and heartfelt wish from your loved ones...",
    from: "🏠 A Birthday Wish From Your Family",
    msg: "Logi, you are the sunshine of our home and the deepest joy of our hearts. Every single day, we watch you grow into a more wonderful, kind-hearted, and extraordinary person — and there are no words to describe how incredibly proud we are of you. On your birthday, we want you to know with absolute certainty that no matter where life takes you or what path you choose, your family will always be your greatest source of strength, your safest refuge, and your most unwavering support system. We love you far more than any words could ever hope to express. A very happy birthday to our dearest, most precious Logi! 🌸",
    media: { slotKey: "wish_family", icon: "📸", label: "Your Family Photo", accept: "image/*,video/*" },
  },
  {
    icon: "👩‍❤️‍👩", name: "Akka",
    preview: "Your sister's love for you is truly beyond all words...",
    from: "💝 A Birthday Wish From Your Sister",
    msg: "Logi, you are not merely my younger sister — you are one of the greatest and most precious loves of my entire life. Through every single phase of your journey, through every smile you have smiled and every tear you have shed, I have always stood as your most devoted supporter and your most enthusiastic admirer. You carry within you a heart of the purest gold, Logi, and anyone who truly knows you is extraordinarily fortunate to do so. On your birthday, I want you to hold onto this truth with both hands — I will always be right here beside you. I will hold your hand through every storm, celebrate every victory with you with all my heart, and lift you back up whenever life brings you down. You deserve every form of happiness and love that this beautiful world has to offer. A very happy birthday to my most darling Logi! 💕",
    media: null,
  },
  {
    icon: "💕", name: "Kowsy",
    preview: "A warm and genuine wish from your dearest friend...",
    from: "🌺 A Birthday Wish From Kowsy",
    msg: "Logi! My dearest, most treasured friend — where on earth do I even begin? You have been the source of my deepest laughter on my most difficult days, my most trusted confidante through everything, and my closest and most cherished companion in every memory that has ever truly mattered to me. From our unforgettable journey to the Murugar Temple to all our irreplaceable college days together — not a single one of those precious moments would have been the same without you right by my side. You possess this truly remarkable and almost magical ability to make every single person around you feel deeply seen, genuinely valued, and unconditionally loved. Today is entirely YOUR day, and I sincerely hope that you allow yourself to feel all of the love and warmth that you so generously pour into everyone else. I am so profoundly grateful to have you in my life. Happy Birthday, Logi! 🌸💕",
    media: null,
  },
  {
    icon: "🌸", name: "Raji",
    preview: "Wishing you all the joy and love in the world today...",
    from: "✨ A Birthday Wish From Raji",
    msg: "Happy Birthday, Logi! 🎉 You are truly one of the most genuine, warm-hearted, and sincerely kind people I have ever had the great pleasure and privilege of knowing. Your smile possesses this wonderful, almost effortless ability to brighten even the most ordinary and mundane of days, and your kindness towards others never, ever goes unnoticed by those who are fortunate enough to be around you. On this very special and beautiful day, I wish you an abundant and overflowing amount of love, laughter, and absolutely everything that your warm and beautiful heart has ever truly desired. May the year that lies ahead of you be every bit as wonderful, joyful, and extraordinary as you genuinely are. Wishing you nothing but the very best, today and always! 🌟",
    media: null,
  },
  {
    icon: "🌟", name: "Vallarasu",
    preview: "A deeply heartfelt message from your very best friend...",
    from: "🌟 A Birthday Wish From Vallarasu — Your Best Friend",
    msg: "Logi... I honestly do not know where in the world to even begin. You are the kind of person who can walk into any room and instantly make it feel warmer, brighter, and more alive — not because of anything you deliberately do, but simply because of the extraordinary and irreplaceable person that you genuinely are at your very core. Ever since the 20th of October, 2020, having you in my life has been one of the most wonderful, meaningful, and deeply cherished gifts I have ever had the joy of receiving. Every single memory we have built together — from all of our unforgettable college days to our beautiful and treasured trip to the Murugar Temple — is something I will carry with great pride and immense love in the very deepest part of my heart for as long as I live. You have always made me laugh harder than anyone else, feel more genuinely comfortable than I do anywhere else, and be the most authentically and freely myself. You are my very best friend, my most trusted person in the world, and my constant source of comfort and joy. On your birthday, I want you to feel every bit of the love that I hold for you — and believe me, it is absolutely immeasurable. You deserve the entire universe and everything beyond it, Logi. Happy Birthday! 💛🌸",
    media: { slotKey: "wish_vallarasu", icon: "📸", label: "Vallarasu — Your Best Friend", accept: "image/*,video/*" },
  },
];

/* ═══════════════════════════════════════════════════════════
   HEARTS CONFIG
   ═══════════════════════════════════════════════════════════ */
const HEART_EMOJIS = ["❤️","🧡","💛","💚","💙","💜","🩷","🩵","🤍","💖","💗","💓","💞","💝","🫀"];
const SIDE_EMOJIS  = ["❤️","🧡","💛","💚","💙","💜","🩷","🩵","💖","💗","💓","💞","💝"];
const SIDE_POS = [
  {top:"5%",left:"2%"},{top:"15%",left:"96%"},{top:"28%",left:"1%"},
  {top:"38%",left:"97%"},{top:"52%",left:"3%"},{top:"62%",left:"95%"},
  {top:"75%",left:"2%"},{top:"85%",left:"97%"},{top:"92%",left:"5%"},
  {top:"8%",left:"92%"},{top:"45%",left:"0%"},{top:"70%",left:"98%"},
  {top:"20%",left:"50%"},{top:"80%",left:"48%"},{top:"33%",left:"88%"},
  {top:"60%",left:"10%"},{top:"12%",left:"70%"},{top:"90%",left:"30%"},
];

/* ═══════════════════════════════════════════════════════════
   SHARED STYLES
   ═══════════════════════════════════════════════════════════ */
const S = {
  page:        { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:"24px 16px", position:"relative", zIndex:1 },
  primaryBtn:  { background:"linear-gradient(135deg,var(--rose),var(--gold))", color:"#1a0533", border:"none", padding:"16px 50px", borderRadius:50, fontSize:"1.1rem", fontWeight:700, cursor:"pointer", fontFamily:"'Poppins',sans-serif", letterSpacing:1, boxShadow:"0 8px 30px rgba(255,64,129,.4)", transition:"transform .3s,box-shadow .3s" },
  heroTitle:   { fontFamily:"'Dancing Script',cursive", fontSize:"clamp(2.4rem,9vw,5.5rem)", color:"var(--gold)", textAlign:"center", lineHeight:1.15, animation:"glow 2.5s ease-in-out infinite", margin:"10px 0 6px" },
  heroSub:     { fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"clamp(1rem,3vw,1.4rem)", color:"var(--pink)", textAlign:"center" },
  dateBadge:   { background:"linear-gradient(135deg,var(--rose),var(--purple))", padding:"8px 28px", borderRadius:50, fontSize:".85rem", letterSpacing:2, margin:"14px 0" },
  heroDesc:    { color:"rgba(255,255,255,.6)", textAlign:"center", maxWidth:400, fontSize:".9rem", lineHeight:1.75, marginBottom:20 },
  questionCard:{ background:"var(--glass)", backdropFilter:"blur(20px)", border:"1px solid var(--glass-b)", borderRadius:24, padding:"28px 22px", maxWidth:540, width:"100%" },
  questionText:{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(.95rem,2.4vw,1.15rem)", lineHeight:1.65, textAlign:"center", marginBottom:22, color:"#fff" },
  optBtn:      { background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,107,157,.25)", color:"#fff", padding:"13px 18px", borderRadius:14, cursor:"pointer", fontFamily:"'Poppins',sans-serif", fontSize:".92rem", textAlign:"left", width:"100%", transition:"background .25s,border-color .25s,transform .25s" },
  ynYes:       { padding:"13px 40px", borderRadius:50, border:"none", fontSize:"1rem", fontWeight:600, cursor:"pointer", fontFamily:"'Poppins',sans-serif", background:"linear-gradient(135deg,var(--rose),#ff8a65)", color:"#fff", boxShadow:"0 4px 18px rgba(255,64,129,.3)" },
  ynNo:        { padding:"13px 40px", borderRadius:50, border:"1px solid rgba(255,255,255,.2)", fontSize:"1rem", fontWeight:600, cursor:"pointer", fontFamily:"'Poppins',sans-serif", background:"rgba(255,255,255,.1)", color:"#fff" },
  nextBtn:     { background:"linear-gradient(135deg,var(--rose),var(--purple))", color:"#fff", border:"none", padding:"12px 34px", borderRadius:50, fontSize:".92rem", fontWeight:600, cursor:"pointer", fontFamily:"'Poppins',sans-serif", marginTop:18 },
  wishCard:    { background:"var(--glass)", border:"1px solid var(--glass-b)", borderRadius:22, padding:"22px 14px", cursor:"pointer", textAlign:"center", position:"relative", overflow:"hidden", transition:"transform .35s,box-shadow .35s,border-color .35s" },
  modalOverlay:{ position:"fixed", inset:0, background:"rgba(0,0,0,.88)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
  modalCard:   { background:"linear-gradient(145deg,var(--deep),var(--deep2))", border:"1px solid rgba(255,107,157,.4)", borderRadius:28, padding:"30px 24px", maxWidth:480, width:"100%", position:"relative", maxHeight:"88vh", overflowY:"auto" },
  uploadBtn:   { display:"inline-flex", alignItems:"center", gap:6, background:"linear-gradient(135deg,#ff4081,#9c27b0)", color:"#fff", padding:"8px 20px", borderRadius:50, fontSize:".82rem", fontWeight:600, marginTop:10, cursor:"pointer", border:"none", fontFamily:"'Poppins',sans-serif" },
  mediaPh:     { background:"linear-gradient(135deg,rgba(255,107,157,.18),rgba(156,39,176,.18))", border:"2px dashed rgba(255,107,157,.45)", borderRadius:16, padding:"28px 20px", textAlign:"center", color:"var(--pink)", cursor:"pointer" },
  pwInput:     { flex:1, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,107,157,.4)", color:"#fff", padding:"13px 18px", borderRadius:14, fontSize:"1rem", fontFamily:"'Poppins',sans-serif", outline:"none" },
  pwBtn:       { background:"linear-gradient(135deg,var(--rose),var(--purple))", border:"none", color:"#fff", padding:"13px 22px", borderRadius:14, cursor:"pointer", fontSize:"1.1rem" },
  specialWish: { background:"var(--glass)", border:"1px solid rgba(255,215,0,.28)", borderRadius:22, padding:"24px 20px", fontFamily:"'Playfair Display',serif", fontStyle:"italic", color:"rgba(255,255,255,.9)", lineHeight:1.9, textAlign:"center", fontSize:".93rem", marginBottom:20 },
  mediaLabel:  { color:"var(--pink)", fontSize:".75rem", textAlign:"center", marginBottom:6, letterSpacing:1 },
};

/* ═══════════════════════════════════════════════════════════
   FILE PICKER
   ═══════════════════════════════════════════════════════════ */
function openFilePicker(accept, callback) {
  let inp = document.getElementById("_fp");
  if (inp) inp.remove();
  inp = document.createElement("input");
  inp.type = "file"; inp.id = "_fp"; inp.accept = accept || "image/*,video/*";
  inp.style.display = "none";
  document.body.appendChild(inp);
  inp.onchange = () => {
    const file = inp.files[0];
    if (!file) return;
    callback({ url: URL.createObjectURL(file), type: file.type.startsWith("video") ? "video" : "image" });
  };
  inp.click();
}

/* ═══════════════════════════════════════════════════════════
   MEDIA DISPLAY
   ✅ type check is now case-insensitive (.toLowerCase())
      so both "image" and "Image" work correctly
   ═══════════════════════════════════════════════════════════ */
function MediaDisplay({ url, type, maxHeight = 280 }) {
  const isVideo = (type || "").toLowerCase() === "video";

  if (isVideo) {
    return (
      <video
        controls
        style={{ width:"100%", borderRadius:16, maxHeight, objectFit:"cover", marginTop:8, display:"block" }}
      >
        <source src={url} type="video/mp4" />
      </video>
    );
  }

  // IMAGE — show full image inside a styled frame, no cropping
  return (
    <div style={{
      marginTop:8,
      borderRadius:16,
      overflow:"hidden",
      border:"2px solid rgba(255,107,157,.35)",
      background:"rgba(0,0,0,.25)",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
    }}>
      <img
        src={url}
        alt="memory"
        style={{
          width:"100%",
          maxHeight,
          objectFit:"contain",   // ✅ shows the whole picture, no cropping
          display:"block",
          borderRadius:14,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   UPLOAD PLACEHOLDER
   ═══════════════════════════════════════════════════════════ */
function UploadPlaceholder({ icon, label, accept, onPicked }) {
  return (
    <div style={S.mediaPh} onClick={() => openFilePicker(accept, onPicked)}>
      <span style={{ fontSize:"2.4rem", display:"block", marginBottom:6 }}>{icon}</span>
      <div style={{ fontWeight:600, fontSize:".9rem", marginBottom:4 }}>{label}</div>
      <button style={S.uploadBtn}>📁 Tap to Choose File</button>
      <small style={{ display:"block", marginTop:6, opacity:.6, fontSize:".72rem" }}>
        Supports photos &amp; videos from your device
      </small>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MEDIA SLOT
   ═══════════════════════════════════════════════════════════ */
function MediaSlot({ slotKey, icon, label, accept, preloaded, mediaStore, onStore }) {
  // Preloaded (imported asset) — show directly
  if (preloaded) {
    const isVideo = (preloaded.type || "").toLowerCase() === "video";
    return (
      <div style={{ marginTop:16 }}>
        <p style={S.mediaLabel}>{isVideo ? "🎬" : "📸"} {label}</p>
        <MediaDisplay url={preloaded.url} type={preloaded.type} />
      </div>
    );
  }

  // User-uploaded
  const stored = mediaStore?.[slotKey];
  if (stored) {
    const isVideo = (stored.type || "").toLowerCase() === "video";
    return (
      <div style={{ marginTop:16 }}>
        <p style={S.mediaLabel}>{isVideo ? "🎬" : "📸"} {label}</p>
        <MediaDisplay url={stored.url} type={stored.type} />
      </div>
    );
  }

  // Empty — show upload button
  return (
    <div style={{ marginTop:16 }}>
      <UploadPlaceholder icon={icon || "📸"} label={label} accept={accept}
        onPicked={({ url, type }) => onStore(slotKey, { url, type })} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BACKGROUND
   ═══════════════════════════════════════════════════════════ */
function Background() {
  const particlesRef = useRef(null);
  const heartsRef    = useRef(null);
  const intervalRef  = useRef(null);

  useEffect(() => {
    const colors = ["#ff6b9d","#ffd700","#e1bee7","#ff4081","#ffffff","#ce93d8"];
    const pc = particlesRef.current;
    if (pc) {
      for (let i = 0; i < 28; i++) {
        const p = document.createElement("div"); p.className = "particle";
        const s = Math.random() * 9 + 3;
        p.style.cssText = `width:${s}px;height:${s}px;background:${colors[Math.floor(Math.random()*colors.length)]};left:${Math.random()*100}%;animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*-16}s`;
        pc.appendChild(p);
      }
    }
    const hc = heartsRef.current;
    const mkHeart = () => {
      if (!hc) return;
      const el = document.createElement("span");
      el.className = "heart";
      el.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      const sz = Math.random() * 1.4 + 0.8;
      el.style.cssText = `left:${Math.random()*100}%;font-size:${sz}rem;animation-duration:${Math.random()*7+6}s;animation-delay:${Math.random()*4}s`;
      hc.appendChild(el);
      setTimeout(() => el.remove(), 14000);
    };
    for (let i = 0; i < 18; i++) setTimeout(mkHeart, i * 300);
    intervalRef.current = setInterval(mkHeart, 600);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      <div id="bg-particles" ref={particlesRef} />
      <div id="bg-hearts"    ref={heartsRef} />
      <div id="bg-side-hearts">
        {SIDE_POS.map((pos, i) => (
          <span key={i} className="side-heart"
            style={{ top:pos.top, left:pos.left, fontSize:`${(Math.random()*1+0.8).toFixed(2)}rem`, animationDuration:`${(Math.random()*3+3).toFixed(2)}s`, animationDelay:`${(Math.random()*4).toFixed(2)}s` }}>
            {SIDE_EMOJIS[i % SIDE_EMOJIS.length]}
          </span>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 1
   ═══════════════════════════════════════════════════════════ */
function Page1({ onNext }) {
  return (
    <div className="page-wrap" style={S.page}>
      <div style={{ display:"flex", gap:14, fontSize:"2.4rem", marginBottom:8 }}>
        {["🎈","🎀","🎈","🎀","🎈"].map((b, i) => (
          <span key={i} style={{ display:"inline-block", animation:`sway ${2+i*0.25}s ease-in-out infinite` }}>{b}</span>
        ))}
      </div>
      <div style={{ fontSize:"clamp(4rem,14vw,8rem)", animation:"cakeBounce 1.2s ease-in-out infinite", lineHeight:1 }}>🎂</div>
      <h1 style={S.heroTitle}>Happy Birthday<br />Logeshwary! 🌸</h1>
      <p style={S.heroSub}>Today is your most special day ✨</p>
      <div style={S.dateBadge}>🗓️ 18 March 2026</div>
      <p style={S.heroDesc}>
        Someone who loves you very dearly has put together a truly special surprise just for you, Logi! 💕<br />
        Get ready to revisit your most cherished memories, receive heartfelt wishes, and unlock a secret gift waiting just for you...
      </p>
      <button style={S.primaryBtn} onClick={onNext}>🎮 Start the Surprise!</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 2 — QUIZ
   ═══════════════════════════════════════════════════════════ */
function Page2({ onNext }) {
  const [currentQ,   setCurrentQ]   = useState(0);
  const [score,      setScore]      = useState(0);
  const [answered,   setAnswered]   = useState(false);
  const [chosen,     setChosen]     = useState(null);
  const [mediaStore, setMediaStore] = useState({});

  const q        = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;
  const storeMedia = useCallback((key, val) => setMediaStore(prev => ({ ...prev, [key]: val })), []);

  const handleMCQ = (idx) => {
    if (answered) return;
    setChosen(idx); setAnswered(true);
    if (idx === q.correct) setScore(s => s + 1);
  };
  const handleYN = (isYes) => {
    if (answered) return;
    setChosen(isYes ? "yes" : "no"); setAnswered(true);
  };
  const advance = () => {
    if (currentQ + 1 >= QUESTIONS.length) { onNext(); return; }
    setCurrentQ(c => c + 1); setAnswered(false); setChosen(null);
  };

  const activeMedia = answered && q.type === "yn"
    ? (chosen === "yes" ? q.yesMedia : q.noMedia)
    : null;

  return (
    <div className="page-wrap" style={S.page}>
      <div style={{ textAlign:"center", width:"100%", maxWidth:540, marginBottom:18 }}>
        <p style={{ color:"var(--pink)", fontSize:".8rem", letterSpacing:"1.5px", marginBottom:8 }}>Question {currentQ + 1} of 5</p>
        <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"2rem", color:"var(--gold)" }}>💫 A Little Memory Quiz for Logi</h2>
        <div style={{ width:"100%", background:"rgba(255,255,255,.1)", borderRadius:50, height:7, margin:"6px 0" }}>
          <div style={{ height:7, borderRadius:50, background:"linear-gradient(90deg,var(--rose),var(--gold))", width:`${progress}%`, transition:"width .5s ease" }} />
        </div>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,215,0,.12)", border:"1px solid rgba(255,215,0,.35)", borderRadius:50, padding:"4px 16px", fontSize:".78rem", color:"var(--gold)", margin:"6px 0" }}>
          ⭐ Score: {score} / 5
        </span>
      </div>

      <div style={S.questionCard}>
        <p style={S.questionText}>{q.text}</p>

        {q.type === "mcq" && (
          <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
            {q.options.map((opt, i) => {
              let extra = {};
              if (answered) {
                if (i === q.correct)   extra = { background:"rgba(76,175,80,.3)",  border:"1px solid #4caf50" };
                else if (i === chosen) extra = { background:"rgba(244,67,54,.28)", border:"1px solid #f44336" };
              }
              return (
                <button key={i} style={{ ...S.optBtn, ...extra }} disabled={answered} onClick={() => handleMCQ(i)}>
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              );
            })}
          </div>
        )}

        {q.type === "yn" && (
          <div style={{ display:"flex", justifyContent:"center", gap:16 }}>
            <button style={S.ynYes} disabled={answered} onClick={() => handleYN(true)}>✅ Yes</button>
            <button style={S.ynNo}  disabled={answered} onClick={() => handleYN(false)}>❌ No</button>
          </div>
        )}

        {activeMedia && <MediaSlot {...activeMedia} mediaStore={mediaStore} onStore={storeMedia} />}

        {answered && (
          <div style={{ textAlign:"center" }}>
            <button style={S.nextBtn} onClick={advance}>
              {currentQ === QUESTIONS.length - 1 ? "🎁 See the Wishes →" : "Next ➜"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WISH MODAL
   ═══════════════════════════════════════════════════════════ */
function WishModal({ wish, mediaStore, onStore, onClose }) {
  if (!wish) return null;
  const stored = wish.media ? mediaStore[wish.media.slotKey] : null;
  return (
    <div style={S.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modalCard}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:18, background:"none", border:"none", color:"rgba(255,255,255,.45)", fontSize:"1.4rem", cursor:"pointer" }}>✕</button>
        <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"1.6rem", color:"var(--gold)", marginBottom:12 }}>{wish.from}</div>
        <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", color:"rgba(255,255,255,.88)", lineHeight:1.85, fontSize:".93rem", marginBottom:16 }}>{wish.msg}</p>
        {wish.media && (
          stored
            ? <MediaDisplay url={stored.url} type={stored.type} maxHeight={200} />
            : (
              <div style={{ ...S.mediaPh, cursor:"pointer" }}
                onClick={() => openFilePicker(wish.media.accept, ({ url, type }) => onStore(wish.media.slotKey, { url, type }))}>
                <span style={{ fontSize:"2rem" }}>{wish.media.icon}</span><br />
                <strong style={{ display:"block", margin:"6px 0" }}>{wish.media.label}</strong>
                <button style={S.uploadBtn}>📁 Tap to Choose Photo</button>
                <small style={{ display:"block", marginTop:6, opacity:.6, fontSize:".72rem" }}>Choose a photo or video from your device</small>
              </div>
            )
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 3 — WISHES
   ═══════════════════════════════════════════════════════════ */
function Page3({ onNext }) {
  const [activeWish, setActiveWish] = useState(null);
  const [mediaStore, setMediaStore] = useState({});
  const storeMedia = useCallback((key, val) => setMediaStore(prev => ({ ...prev, [key]: val })), []);

  return (
    <div className="page-wrap" style={S.page}>
      <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(1.5rem,5vw,2.2rem)", color:"var(--gold)", textAlign:"center", marginBottom:4 }}>
        🎁 These Special People Are Wishing You Well
      </h2>
      <p style={{ color:"var(--pink)", fontSize:".85rem", textAlign:"center", fontStyle:"italic", marginBottom:24 }}>
        Go ahead and click each box, Logi — enjoy every single message! 💝
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))", gap:14, maxWidth:700, width:"100%", marginBottom:24 }}>
        {WISHES.map((w, i) => (
          <div key={i} style={S.wishCard} onClick={() => setActiveWish(w)}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.borderColor="var(--pink)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(255,107,157,.28)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.borderColor="var(--glass-b)"; e.currentTarget.style.boxShadow=""; }}>
            <span style={{ fontSize:"2.2rem", marginBottom:8, display:"block" }}>{w.icon}</span>
            <div style={{ fontWeight:600, fontSize:".9rem", color:"var(--gold)", marginBottom:5 }}>{w.name}</div>
            <div style={{ fontSize:".72rem", color:"rgba(255,255,255,.55)", lineHeight:1.45 }}>{w.preview}</div>
          </div>
        ))}
      </div>
      <button style={S.primaryBtn} onClick={onNext}>🔐 Open Your Secret Gift →</button>
      <WishModal wish={activeWish} mediaStore={mediaStore} onStore={storeMedia} onClose={() => setActiveWish(null)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 4 — SECRET
   ═══════════════════════════════════════════════════════════ */
const SECRET_PW = "Logi@18";

function Page4() {
  const [pw, setPw]                   = useState("");
  const [error, setError]             = useState(false);
  const [unlocked, setUnlocked]       = useState(false);
  const [secretMedia, setSecretMedia] = useState(null);

  const checkPw = () => {
    if (pw === SECRET_PW) { setError(false); setUnlocked(true); }
    else { setError(true); setPw(""); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div className="page-wrap" style={S.page}>
      <div style={{ fontSize:"3.8rem", textAlign:"center", margin:"8px 0", animation: unlocked ? "none" : "lockPulse 2s ease-in-out infinite" }}>
        {unlocked ? "🎊" : "🔐"}
      </div>
      <h2 style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(1.8rem,6vw,2.8rem)", color:"var(--gold)", textAlign:"center", marginBottom:6 }}>
        A Secret Gift Awaits You!
      </h2>

      {!unlocked && (
        <>
          <p style={{ color:"rgba(255,255,255,.5)", fontSize:".85rem", textAlign:"center", fontStyle:"italic", marginBottom:22 }}>
            Please enter the secret key to unlock your very special surprise 🎁
          </p>
          <div style={{ display:"flex", gap:10, maxWidth:360, width:"100%" }}>
            <input type="password" style={S.pwInput} value={pw} placeholder="Enter secret key..."
              onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && checkPw()} />
            <button style={S.pwBtn} onClick={checkPw}>🔓</button>
          </div>
          {error && <p style={{ color:"#ff6b6b", fontSize:".82rem", textAlign:"center", marginTop:8 }}>❌ That is not the correct key. Please try again...</p>}
        </>
      )}

      {unlocked && (
        <div className="page-wrap" style={{ width:"100%", maxWidth:520 }}>
          <div style={{ textAlign:"center", marginBottom:14 }}>
            <div style={{ fontSize:"2.4rem", marginBottom:6 }}>🎊🎂🎉</div>
            <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:"clamp(1.6rem,5vw,2.4rem)", color:"var(--gold)", animation:"glow 2s infinite" }}>
              You Found It, Logi! 🥳
            </div>
          </div>
          <div style={S.specialWish}>
            🌸 Dear <strong style={{ color:"var(--gold)", fontStyle:"normal" }}>Logeshwary</strong>,<br /><br />
            Today is not simply another birthday — it is a celebration of one of the most{" "}
            <strong style={{ color:"var(--gold)", fontStyle:"normal" }}>beautiful souls</strong>{" "}
            I have ever had the honour of knowing. You carry genuine warmth in your eyes, true laughter in your heart, and boundless love in everything that you do.<br /><br />
            You are someone who has the rare and wonderful ability to transform every ordinary moment into something truly{" "}
            <strong style={{ color:"var(--gold)", fontStyle:"normal" }}>extraordinary</strong>.
            The way you care so deeply for the people around you, the way your smile can light up an entire room — there is simply no one quite like you in this world, Logi. 💕<br /><br />
            On this very special day, I want you to know that you are{" "}
            <strong style={{ color:"var(--gold)", fontStyle:"normal" }}>deeply loved</strong>,
            endlessly cherished, and never alone. Every memory we have created together is a{" "}
            <strong style={{ color:"var(--gold)", fontStyle:"normal" }}>priceless treasure</strong>{" "}
            I will hold close to my heart forever.<br /><br />
            May this year bring you joy that never fades, dreams that come true, and happiness that stays always. You deserve every wonderful thing! 🌟<br /><br />
            <strong style={{ color:"var(--gold)", fontStyle:"normal" }}>Happy Birthday, Logi! 🎂✨</strong>
          </div>
          <p style={{ color:"var(--pink)", fontSize:".8rem", letterSpacing:"1.5px", textAlign:"center", marginBottom:8 }}>🎬 YOUR SPECIAL BIRTHDAY VIDEO</p>
          {secretMedia ? (
            <MediaDisplay url={secretMedia.url} type={secretMedia.type} maxHeight={280} />
          ) : (
            <div style={{ ...S.mediaPh, borderRadius:22, padding:"44px 20px", cursor:"pointer" }}
              onClick={() => openFilePicker("video/*,image/*", ({ url, type }) => setSecretMedia({ url, type }))}>
              <span style={{ fontSize:"3rem", display:"block", marginBottom:10 }}>🎥</span>
              <strong style={{ fontSize:"1rem" }}>Special Birthday Wish Video</strong><br />
              <button style={S.uploadBtn}>📁 Tap to Choose Video</button>
              <small style={{ display:"block", marginTop:8, opacity:.6, fontSize:".78rem" }}>Choose a video or photo from your device</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const id = "logi-global-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id; s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);

  return (
    <>
      <Background />
      {page === 1 && <Page1 onNext={() => setPage(2)} />}
      {page === 2 && <Page2 onNext={() => setPage(3)} />}
      {page === 3 && <Page3 onNext={() => setPage(4)} />}
      {page === 4 && <Page4 />}
    </>
  );
}

/*
 ╔══════════════════════════════════════════════════════════════════╗
 ║  FILES NEEDED IN  src/assets/media/                             ║
 ║                                                                  ║
 ║   College_CakeCutting.mp4   → Q3 cake cutting video            ║
 ║   sarathi_bday.mp4          → Q4 Sarathi video                  ║
 ║   Murugan_Temple.jpeg       → Q5 temple image  ✅ fixed        ║
 ║                                                                  ║
 ║  vite.config.js must include:                                    ║
 ║   assetsInclude: ['**\/*.mp4','**\/*.webm','**\/*.jpeg','**\/*.jpg'] ║
 ╚══════════════════════════════════════════════════════════════════╝
*/
