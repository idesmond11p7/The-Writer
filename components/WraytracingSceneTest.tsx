'use client';

import React, { useState } from 'react';
import {
  Flame,
  Cpu,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

interface WraytracingSceneTestProps {
  onSelectWraytracingPack?: () => void;
  onSendPassageToWorkbench?: (passage: string, packId?: string) => void;
}

export const READER_AS_GPU_SCENE = `Fifty feet up the black grade, the tanker lay across the road like a drowned whale—long, silver, and sweating the last of the rain under a sick yellow streetlamp.

Nothing moved in the cab. Nothing moved in the dripping trees above it.

Only the wet road underneath the trailer’s belly was wrong: where the red bar light from the closed diner behind me bled across the asphalt, the water had stopped shining. A man’s shadow was drinking it up behind the rear tires.

I didn't wait for him to step out. I brought the gun up and pulled.

For one heartbeat the night tore open. The flash turned the wet leaves overhead into beaten tin and threw my own hand back at me, bone-white and stranger-stiff around the grip, before the dark clapped shut again—twice as black, with a bruised sun floating in the center of my eyes.

The sound didn't just echo; it owned the street. It slapped the sleeping storefronts, shook a cold scatter of dead water from the branches, and sent the crows screaming out of the dark canopy like torn rags across the yellow lamp.

Up the hill, the bullet took the tanker in the ribs.

*Spang.*

A small, bright mouth bit through the grey road-filth on the curve of the tank, followed by the heavy, dead *thud* of a full belly taking lead. No Hollywood fire. Just that neat silver wound winking under the streetlamp, and then a slow, dark ribbon of fuel beginning to bleed down the metal.

It ran slick and black down the curve of the hull. And as that wet ribbon caught the diner’s red neon, the belly of the truck turned into a crooked mirror—handing me the shine of a gun barrel and two wet boots crouched in the dark behind the wheels.

Then the wind came down the hill, carrying burnt copper and the heavy, sweet rot of gasoline.`;

export const OLD_PRECOMPUTED_DRAFT = `Fifty feet up the grade, the tanker trailer sat angled across the double yellow line, its aluminum belly chalky with dried road salt except along the upper curve, where a roadside sodium lamp hung through the wet sycamores and laid a single bar of orange down the metal. Beneath the rear tandem axle, the red reflection of the weigh-station’s CLOSED sign—cast from the window behind my shoulder into the puddle at the road crown—warped around the edge of a rubber boot heel.

My right wrist locked against the chipped concrete of the island bollard; the trigger broke against the frame.

A flat orange fan of muzzle gas spat past the bollard’s wet edge. The flash bleached the gravel at my knee white, snapped the shadow of the front sight across the curb, and left a dull green-violet spot swimming over the dark lane. The pressure wave slammed the corrugated tin canopy overhead and bounced back off the brick ditch wall opposite as a tight double crack that shook cold rainwater from the lower sycamore boughs onto my collar.

Forty feet out, two crows launched from the upper limbs, their wings cutting the sodium beam so two quick shadows scissored across the tractor’s windshield.

Three inches below the red 1203 placard on the tank’s flank, a thumb-sized silver scar punched through the salt crust. A hard metallic spang came back down the grade, followed a beat later by a dull internal thump against the steel baffle plate inside the shell. The dented rim pinched the overhead lamp’s reflection into a sharp amber point. From the torn lip of the hole, a thin, clear ribbon of distillate began to run down the curved flank.

As the fuel soaked into the dry salt film, it darkened the matte grey aluminum into a narrow, mirror-slick vertical band. That wet stripe caught the red neon from the weigh-station glass behind me and angled it down into the dark trough between the tandem tires—picking out the wet crease of a grey canvas knee and six inches of blued rifle barrel braced across the axle housing.

Down the grade, the sharp copper bite of burnt powder thinned in the mist, overtaken by the heavy, sweet-paraffin smell of kerosene pooling on wet asphalt.`;

export const GPU_PHILOSOPHY_COMPARISON = [
  {
    principle: '1. The Reader’s Brain is the GPU (Shader Code vs. Precomputed Pixels)',
    aiTrap:
      '"Three inches below the red 1203 placard... internal baffle plate... a flat orange fan of muzzle gas spat past the bollard’s wet edge." (Feeds pre-rendered CAD measurements to the reader, leaving the imagination zero work to do and killing momentum.)',
    gpuFix:
      '"the tanker lay across the road like a drowned whale—long, silver, and sweating the last of the rain under a sick yellow streetlamp." (Gives the human GPU an immediate, high-contrast psychological & epithetical seed; the brain renders the entire wet night in a split second.)',
  },
  {
    principle: '2. 70% Grounding Pulp Spine (Forward Hook & Nerve)',
    aiTrap:
      '"My right wrist locked against the chipped concrete of the island bollard; the trigger broke against the frame." (Over-anatomical, mechanical manual of arms that slows the action to a physics report.)',
    gpuFix:
      '"A man’s shadow was drinking it up behind the rear tires. I didn’t wait for him to step out. I brought the gun up and pulled." (Pure pulp urgency: threat recognized, immediate action, no mechanical clutter.)',
  },
  {
    principle: '3. Lyrical & Psychological Wraytracing (30% Poetic Charge)',
    aiTrap:
      '"left a dull green-violet spot swimming over the dark lane." (Clinical optometry report.)',
    gpuFix:
      '"For one heartbeat the night tore open. The flash turned the wet leaves overhead into beaten tin and threw my own hand back at me, bone-white and stranger-stiff around the grip, before the dark clapped shut again—twice as black, with a bruised sun floating in the center of my eyes." (Light carries psychological estrangement and poetic weight.)',
  },
  {
    principle: '4. Relational Consequence Without Engineering Jargon',
    aiTrap:
      '"As the fuel soaked into the dry salt film, it darkened the matte grey aluminum into a narrow, mirror-slick vertical band..." (Reads like a materials-science lab note.)',
    gpuFix:
      '"Just that neat silver wound winking under the streetlamp, and then a slow, dark ribbon of fuel beginning to bleed down the metal... And as that wet ribbon caught the diner’s red neon, the belly of the truck turned into a crooked mirror—handing me the shine of a gun barrel and two wet boots crouched in the dark behind the wheels."',
  },
];

export default function WraytracingSceneTest({
  onSelectWraytracingPack,
  onSendPassageToWorkbench,
}: WraytracingSceneTestProps) {
  const [copiedKey, setCopiedKey] = useState<'gpu' | 'old' | null>(null);

  const gpuWords = READER_AS_GPU_SCENE.trim().split(/\s+/).length;
  const oldWords = OLD_PRECOMPUTED_DRAFT.trim().split(/\s+/).length;

  const handleCopy = (text: string, key: 'gpu' | 'old') => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="border border-amber-500/40 bg-gradient-to-br from-[#16110b] via-[#0e0e11] to-[#0a1210] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <Cpu className="w-4 h-4" />
            <span>W-Ray Tracing Paradigm Correction · The Human Brain is the GPU</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold">
              70% Pulp Drive + 30% Poetic/Epithetical Wraytracing
            </span>
            {onSelectWraytracingPack && (
              <button
                onClick={onSelectWraytracingPack}
                className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 flex items-center gap-1 transition-colors"
              >
                <span>Inspect Wraytracing Pack</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-100">
            Why Precomputed Details Kill the Scene—and How the Reader’s GPU Actually Renders
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            In a video game, the hardware GPU renders the pixels and the player’s brain only consumes and reacts. In prose, <strong>the reader’s brain is both the GPU and the consumer</strong>. Feeding precomputed CAD measurements (<em>&ldquo;three inches below the 1203 placard&rdquo;</em>, <em>&ldquo;corrugated tin canopy&rdquo;</em>, <em>&ldquo;internal baffle plate&rdquo;</em>) starves the reader’s GPU of creation and stalls the pulp momentum.
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison: New Reader-as-GPU Rewrite vs. Old Precomputed AI Trap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NEW: Reader-as-GPU (70% Pulp + 30% Poetic Wraytracing) */}
        <section className="border border-amber-500/50 bg-[#110e0b] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-amber-900/50">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Reader-as-GPU Rewrite ({gpuWords} words)</span>
                </h3>
                <p className="text-[11px] font-mono text-amber-200/70 mt-0.5">
                  70% Pulp Hook &amp; Nerve + 30% Epithetical &amp; Poetic Light Triggers
                </p>
              </div>
              <div className="flex items-center gap-2">
                {onSendPassageToWorkbench && (
                  <button
                    onClick={() =>
                      onSendPassageToWorkbench(
                        READER_AS_GPU_SCENE,
                        'ledger_technique_pack_wraytracing'
                      )
                    }
                    className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] font-mono text-amber-200"
                  >
                    Test in Lab
                  </button>
                )}
                <button
                  onClick={() => handleCopy(READER_AS_GPU_SCENE, 'gpu')}
                  className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400"
                  title="Copy Reader-as-GPU Scene"
                >
                  {copiedKey === 'gpu' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4 font-serif text-[16px] leading-[1.85] text-stone-100">
              {READER_AS_GPU_SCENE.split('\n\n').map((para, idx) => (
                <p
                  key={idx}
                  className={
                    para === '*Spang.*'
                      ? 'font-mono text-sm tracking-widest text-amber-300 italic py-0.5'
                      : ''
                  }
                >
                  {para === '*Spang.*' ? 'Spang.' : para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* OLD: Precomputed AI / CAD Trap */}
        <section className="border border-stone-800/80 bg-[#0c0c0f] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-5 opacity-80">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Previous Attempt: The Precomputed AI Trap ({oldWords} words)</span>
                </h3>
                <p className="text-[11px] font-mono text-stone-500 mt-0.5">
                  Over-specified engineering/anatomical inventory that starves the reader’s GPU
                </p>
              </div>
              <button
                onClick={() => handleCopy(OLD_PRECOMPUTED_DRAFT, 'old')}
                className="p-1.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400"
                title="Copy Previous Attempt"
              >
                {copiedKey === 'old' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="space-y-4 font-serif text-[15px] leading-[1.8] text-stone-400">
              {OLD_PRECOMPUTED_DRAFT.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Diagnostic Breakdown of the Shift */}
      <section className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>Diagnostic Comparison: Precomputed Pixels vs. Reader-as-GPU Shader Prompts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GPU_PHILOSOPHY_COMPARISON.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-800 bg-stone-950/70 space-y-2.5"
            >
              <div className="text-xs font-mono font-semibold text-amber-300">
                {item.principle}
              </div>
              <div className="p-2.5 rounded bg-red-950/20 border border-red-900/40 text-xs text-stone-400">
                <span className="font-mono text-[10px] uppercase text-red-400 block mb-1">
                  Precomputed AI Trap (Over-Opened Detail)
                </span>
                {item.aiTrap}
              </div>
              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40 text-xs text-stone-200">
                <span className="font-mono text-[10px] uppercase text-emerald-400 block mb-1">
                  Reader-as-GPU (70% Pulp + 30% Poetic/Epithetical Spark)
                </span>
                {item.gpuFix}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
