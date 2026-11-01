'use client';

import React, { useState } from 'react';
import {
  Flame,
  Cpu,
  ShieldAlert,
  CheckCircle2,
  Layers,
  Zap,
  Volume2,
  Eye,
  Compass,
  Copy,
  Check,
} from 'lucide-react';

export const MELTDOWN_SYNTHESIS_SCENE = `The mud in the trench was already freezing to my boots when the thing came over the parapet—not glowing, not shouting, just three hundred pounds of dead iron and wet hide dropping out of the sleet and cracking the duckboards under its heels.

I didn't have room to bring a rifle up. I took the Meltdown blade off my hip by the taped grip, thumbing the feed-latch open against my thigh as I stepped into its chest.

Inside the channel of the spine, the core woke with a dry, throttled *whump*—like an oil furnace catching in a flooded cellar.

No halo. No hero light. Just a seam of trapped, yellow-white slag surging down the fuller behind the blackened ribs of the housing, so hot the sleet hissed into blind white steam the instant it touched the guard. The glare off the vents bleached the trench walls to chalk and burned a jagged white bar across the center of my vision, wiping out the thing’s face and leaving only the wet, tar-black bulk of its shoulder driving down at my collarbone.

Its cleaver met my upper housing two inches above the cross-lug.

The impact didn't ring; it *clanked* like two freight couplings slamming together, driving my rear boot ankle-deep into the slush and sending a numb, greasy jolt straight up my radius into the socket of my shoulder. Where the cleaver’s edge bit the vented spine, a gout of pressurized plasma spat sideways out of the relief port—orange-white, viscous as molten brass—splashing across the creature’s jaw and the wet creosote timbers behind its head.

For two seconds the roar of the open vent ate the whole world. The rain, the river down the slope, my own breath—gone under a high, tearing industrial shriek that smelled of ozone, burnt pig-fat, and boiling pine tar.

The thing flinched back half a step, its left eye cooked white in the socket, its jaw-plates clicking shut on empty air.

My own left eye was still blind from the vent-flash—nothing on that side but a drifting purple smear—so I kept my chin tucked behind my right shoulder, let the blade’s forward weight drop out of the bind, and drove the superheated point up under its ribs until the cross-lug struck wet bone and stalled.

Deep inside its chest, something ruptured with a wet, muffled *pop*, like a radiator hose letting go under a hood.

The blade’s cooling vents choked on tallow and black blood, sputtering from white-hot orange down to a dull, smoking cherry-red that barely lit the mud between our knees. As the core-shriek died in the clogged ports, the trench rushed back into my ears all at once: the sleet ticking on my helmet rim, the grease sizzling along the fuller, and fifty yards down the ravine, a second set of duckboards groaning under sudden weight.`;

export const MODULE_DIAGNOSIS = [
  {
    title: '1. Why the Handoff Document Created the "Ray-Tracing Trap"',
    summary:
      'Look at the Anchor Objective in Module 1 & Module 6 of the Research Package: in trying to kill "Specimen A (Low-Tier Purple Lyricism)", the document swung the pendulum all the way to "non-lyrical prose methodology" and "Materialist, grounded parataxis." Because it banned lyricism while demanding continuous tracking of Global Illumination, Ambient Occlusion, Velocity Gradients, and Camera Rig geometry, it forced the prose toward Specimen B—precomputing the scene like a game engine and starving the reader’s GPU.',
  },
  {
    title: '2. What the Handoff Document Gets Right (The 4 Embodied Laws)',
    summary:
      'The four physical laws in Module 6—(1) Tool Transparency (Heidegger’s ready-to-hand: weapons felt only through recoil, heat, and downrange impact), (2) Mutual Physical/Optical Causality (light bounce + biological exposure clipping), (3) Continuous Traversal (ST = DT, substrate friction underfoot), and (4) W-Surround Sound (HDR acoustic masking where near-field roar ducks the horizon)—give the scene undeniable physical weight.',
  },
  {
    title: '3. The Missing Key: Replacing "Precomputed Geometry" with "70% Pulp + 30% Epithetical Shader Code"',
    summary:
      'When you fuse Module 6’s Four Laws (especially Law 5: Banning the Shonen Aura in favor of Ontological Bleed & Industrial-Eldritch Thermodynamics) with your Reader-as-GPU rule, the prose stops measuring angles ("45-degree angle", "3 millimeters") and instead uses compact, high-voltage tactile and epithetical triggers ("like an oil furnace catching in a flooded cellar", "viscous as molten brass", "cooked white in the socket") so the reader’s brain renders the violence at full pulp speed.',
  },
];

export const FIVE_POINT_AUDIT_RESULTS = [
  {
    check: '1. The Footing Check',
    question:
      'Are the character’s boots firmly connected to a specific surface with tangible weight and friction?',
    result:
      'PASS — Opens with mud freezing to boots and duckboards cracking under the adversary’s heels; the parry drives the protagonist’s rear boot "ankle-deep into the slush."',
  },
  {
    check: '2. The Tool Check (Ready-to-Hand / Zuhandenheit)',
    question:
      'Did we waste words admiring the weapon like a museum piece, or does it exist strictly through operation, heat, recoil, and friction?',
    result:
      'PASS — The Meltdown blade is never admired; it is felt through the taped grip, the thumb-latch against the thigh, the blinding steam off the guard, the numb jolt up the radius, and the cooling vents choking on tallow and blood.',
  },
  {
    check: '3. The Light Check (W-Raytracing & Sensor Limits)',
    question:
      'Does the illumination source bounce off surfaces, cast contact shadows, and respect biological eye limits?',
    result:
      'PASS — The yellow-white slag in the fuller bleaches the trench walls to chalk and burns a jagged white bar across the protagonist’s retina, blinding his left eye to a "drifting purple smear" so he must tuck his chin and fight off physical contact.',
  },
  {
    check: '4. The Audio Masking Check (W-Surround Sound)',
    question:
      'Does loud near-field noise duck the horizon, and does the wider soundscape re-emerge when the loud noise stops?',
    result:
      'PASS — When the relief port vents plasma, "for two seconds the roar of the open vent ate the whole world. The rain, the river down the slope, my own breath—gone." When the vents clog with blood and the core-shriek dies, "the trench rushed back into my ears all at once: the sleet ticking on my helmet rim... and fifty yards down the ravine, a second set of duckboards groaning."',
  },
  {
    check: '5. The Non-Aura & Lyricism Check',
    question:
      'Is supernatural/reactive energy treated as industrial-eldritch thermodynamics rather than a glowing shonen aura, and do all comparisons serve instant physical simulation?',
    result:
      'PASS — Explicitly rejects auras ("No halo. No hero light"). Energy behaves like trapped furnace slag and pressurized molten brass that boils sleet, scorches creosote timbers, smells of ozone and burnt pig-fat, and stalls when its vents clog.',
  },
];

export default function ResearchHandoffLab() {
  const [copied, setCopied] = useState(false);
  const wordCount = MELTDOWN_SYNTHESIS_SCENE.trim().split(/\s+/).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(MELTDOWN_SYNTHESIS_SCENE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="border border-amber-500/40 bg-gradient-to-br from-[#17110c] via-[#0e0e11] to-[#0b1315] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <Flame className="w-4 h-4" />
            <span>Operational Handoff Synthesis · Module 7 Milestone Executed</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-700/60 text-emerald-300">
              Test Record 004: AK-117 Meltdown Non-Aura Standard ({wordCount} words)
            </span>
            <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-700/60 text-amber-300">
              5 / 5 Self-Correction Audit Checks Passed
            </span>
          </div>
        </div>

        <div className="space-y-2 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-100">
            Reconciling the Research Package (Modules 1–7) with the Reader-as-GPU Architecture
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            Diagnosing why the Handoff Package&apos;s strict anti-lyrical materialism previously caused the &ldquo;precomputed simulation trap,&rdquo; and executing the <strong>Module 7 Milestone (Supernatural Fluid Dynamics &amp; Energy Containment: The AK-117 Meltdown Non-Aura Standard)</strong> by fusing the Four Operational Laws with 70% pulp momentum and 30% visceral GPU triggers.
          </p>
        </div>
      </div>

      {/* Part 1: Architectural Diagnosis of the Research Package */}
      <section className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
          <Cpu className="w-4 h-4" />
          <span>Part 1. Architectural Diagnosis of the Research Package (Modules 1–7)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MODULE_DIAGNOSIS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-800 bg-stone-950/70 space-y-2"
            >
              <div className="text-xs font-mono font-semibold text-amber-300">
                {item.title}
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Part 2: Test Record 004 — Supernatural Fluid Dynamics & Energy Containment */}
      <section className="border border-amber-500/40 bg-[#0d0b0a] rounded-2xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>
                Part 2. Test Record 004 — Supernatural Fluid Dynamics &amp; Energy Containment (The Non-Aura Standard)
              </span>
            </h3>
            <p className="text-xs text-stone-400 font-mono mt-1">
              Scenario: High-speed supernatural melee engagement applying the AK-117 Meltdown reactive aesthetic (Industrial-Eldritch Thermodynamics + Exposure Clipping + HDR Audio Masking + Ready-to-Hand Tool Transparency)
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-mono text-stone-300 flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Scene ({wordCount}w)</span>
              </>
            )}
          </button>
        </div>

        <div className="max-w-3xl mx-auto space-y-5 font-serif text-base sm:text-[17px] leading-[1.85] text-stone-100">
          {MELTDOWN_SYNTHESIS_SCENE.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* Part 3: The 5-Point Self-Correction Audit Protocol (Module 6) */}
      <section className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>Part 3. Module 6 Five-Point Self-Correction Audit Protocol</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FIVE_POINT_AUDIT_RESULTS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-800 bg-stone-950/70 space-y-2"
            >
              <div className="flex items-center justify-between gap-2 font-mono text-xs">
                <span className="font-semibold text-amber-300">{item.check}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-[10px]">
                  VERIFIED
                </span>
              </div>
              <p className="text-[11px] font-mono text-stone-500">{item.question}</p>
              <p className="text-xs text-stone-200 leading-relaxed">{item.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summary of the 4 Operational Laws Active in Workspace */}
      <section className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-300">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Active System Laws Locked In (Modules 2 &amp; 6 + Reader-as-GPU Synthesis)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          <div className="p-3.5 rounded-xl border border-stone-800 bg-stone-950/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-mono font-semibold text-amber-400">
              <Zap className="w-3.5 h-3.5" />
              <span>Law 1: Tool Transparency</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Heideggerian <em>Zuhandenheit</em>: never inspect weapons or gear like museum props. Render them solely through recoil, heat, mass transfer, downrange consequence, or jamming/clogging friction.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-stone-800 bg-stone-950/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-mono font-semibold text-emerald-400">
              <Eye className="w-3.5 h-3.5" />
              <span>Law 2: W-Raytracing + Clipping</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Mutual optical causality + biological sensor limits: intense core flashes bleach nearby surfaces and temporarily blind the eye, wiping out shadow detail until the viewpoint adapts or shifts.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-stone-800 bg-stone-950/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-mono font-semibold text-sky-400">
              <Compass className="w-3.5 h-3.5" />
              <span>Law 3: Continuous Traversal</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              No descriptive pauses (<code className="text-sky-300">ST = DT</code>). Disclose space through motion parallax, occluding edges, and substrate resistance underfoot (slush, duckboards, iron grating).
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-stone-800 bg-stone-950/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-mono font-semibold text-purple-400">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Law 4: HDR Acoustic Masking</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              High-energy near-field events (venting plasma, gunfire) swallow the ambient horizon; when the local roar chokes or stops, the wider acoustic world floods back in.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
