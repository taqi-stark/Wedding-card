import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import mandala from "@/assets/mandala.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayesha & Hamza — Wedding Invitation" },
      { name: "description", content: "You are cordially invited to the wedding celebrations of Ayesha & Hamza — Mehndi, Barat and Walima." },
      { property: "og:title", content: "Ayesha & Hamza — Wedding Invitation" },
      { property: "og:description", content: "Open the envelope to view our Mehndi, Barat and Walima invitation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invite,
});

const EVENTS = [
  { name: "Mehndi", date: "Thursday, 10 December 2026", time: "7:00 PM onwards", venue: "Royal Palm Marquee, Lahore", tone: "text-emerald" },
  { name: "Barat", date: "Saturday, 12 December 2026", time: "8:00 PM onwards", venue: "Pearl Continental, Lahore", tone: "text-maroon" },
  { name: "Walima", date: "Sunday, 13 December 2026", time: "8:30 PM onwards", venue: "Nishat Banquet Hall, Lahore", tone: "text-maroon" },
];

function Petals() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="animate-petal absolute top-0 block h-3 w-2 rounded-full bg-gold-gradient opacity-0"
          style={{ left: `${(i * 37) % 100}%`, animationDuration: `${8 + (i % 6)}s`, animationDelay: `${i * 0.7}s` }}
        />
      ))}
    </div>
  );
}

function Invite() {
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setStage("open"), 1600);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <Petals />

      {stage !== "open" && (
        <div className="flex flex-col items-center">
          <p className="mb-8 font-display text-xs tracking-[0.4em] text-gold animate-shimmer">
            {stage === "closed" ? "TAP THE SEAL TO OPEN" : "\u00A0"}
          </p>
          <div className="relative w-[min(92vw,460px)] aspect-[4/3] [perspective:1200px]">
            {/* back */}
            <div className="absolute inset-0 rounded-md bg-envelope" />
            {/* letter peeking */}
            <div
              className="absolute inset-x-6 top-4 bottom-4 rounded-sm bg-ivory gold-frame transition-transform duration-1000 ease-out"
              style={{ transform: stage === "opening" ? "translateY(-55%)" : "translateY(0)", transitionDelay: "600ms" }}
            >
              <p className="pt-6 text-center font-script text-3xl text-maroon">Ayesha & Hamza</p>
            </div>
            {/* front pocket */}
            <div
              className="absolute inset-0 rounded-md bg-envelope"
              style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
            >
              <div className="absolute inset-3 rounded-sm border border-gold/40" style={{ clipPath: "inherit" }} />
              <p className="absolute bottom-6 w-full text-center font-display text-sm tracking-[0.3em] text-gold-soft">
                YOU ARE INVITED
              </p>
            </div>
            {/* flap */}
            <div
              className="absolute inset-x-0 top-0 h-[58%] origin-top bg-flap transition-transform duration-700 ease-in-out"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transform: stage === "opening" ? "rotateX(180deg)" : "rotateX(0)",
                zIndex: stage === "opening" ? 0 : 20,
              }}
            />
            {/* seal */}
            <button
              onClick={open}
              aria-label="Open the invitation"
              className={`absolute left-1/2 top-[58%] z-30 flex h-20 w-20 items-center justify-center rounded-full bg-seal transition-all duration-500 ${
                stage === "closed" ? "animate-seal cursor-pointer" : "scale-0 opacity-0"
              }`}
              style={{ transform: "translate(-50%,-50%)" }}
            >
              <span className="font-script text-3xl text-maroon">A&H</span>
            </button>
          </div>
        </div>
      )}

      {stage === "open" && <Card />}
    </main>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-gold">
      <span className="h-px w-16 bg-gold-gradient" />
      <span className="text-lg">❖</span>
      <span className="h-px w-16 bg-gold-gradient" />
    </div>
  );
}

function Card() {
  return (
    <article className="animate-float-up relative w-full max-w-xl overflow-hidden rounded-md bg-ivory p-3 text-card-foreground shadow-2xl">
      <div className="gold-frame relative rounded-sm px-6 py-10 sm:px-12">
        <img
          src={mandala}
          alt=""
          width={1024}
          height={1024}
          className="mx-auto -mt-2 h-32 w-32 rounded-full object-cover ring-2 ring-gold"
        />
        <p className="mt-6 text-center font-serif text-lg italic text-muted-foreground">
          بسم الله الرحمن الرحيم
        </p>
        <p className="mt-4 text-center font-display text-xs tracking-[0.3em] text-muted-foreground">
          TOGETHER WITH THEIR FAMILIES
        </p>
        <h1 className="mt-4 text-center font-script text-6xl leading-tight text-maroon sm:text-7xl">
          Ayesha
          <span className="block font-serif text-2xl italic text-gold">&amp;</span>
          Hamza
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-center font-serif text-lg text-muted-foreground">
          request the honour of your presence as we celebrate our union
        </p>

        <div className="my-8"><Ornament /></div>

        <div className="space-y-6">
          {EVENTS.map((e, i) => (
            <section
              key={e.name}
              className="animate-float-up rounded-sm border border-gold/50 bg-muted/50 px-5 py-5 text-center"
              style={{ animationDelay: `${0.3 + i * 0.25}s` }}
            >
              <h2 className={`font-script text-4xl ${e.tone}`}>{e.name}</h2>
              <p className="mt-2 font-display text-sm tracking-widest">{e.date}</p>
              <p className="font-serif text-base italic text-muted-foreground">{e.time}</p>
              <p className="mt-1 font-serif text-base">{e.venue}</p>
            </section>
          ))}
        </div>

        <div className="my-8"><Ornament /></div>
        <p className="text-center font-serif text-base italic text-muted-foreground">
          Your presence will make our celebration complete
        </p>
        <p className="mt-2 text-center font-display text-xs tracking-[0.3em] text-maroon">
          RSVP · +92 300 0000000
        </p>
      </div>
    </article>
  );
}
