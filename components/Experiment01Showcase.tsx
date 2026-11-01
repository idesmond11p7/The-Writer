'use client';

import React, { useState } from 'react';
import {
  FlaskConical,
  BookOpen,
  Layers,
  CheckSquare,
  AlertTriangle,
  Library,
  Sparkles,
  Eye,
  FileText,
  ArrowUpRight,
  Copy,
  Check,
  Flame,
  Zap,
} from 'lucide-react';
import WraytracingSceneTest from '@/components/WraytracingSceneTest';
import ResearchHandoffLab from '@/components/ResearchHandoffLab';

interface Experiment01ShowcaseProps {
  onSelectTechniquePack?: (packId: string) => void;
  onSendPassageToWorkbench?: (passage: string, packId?: string) => void;
}

interface TechniqueExecutionRow {
  number: number;
  packId: string;
  packName: string;
  sourceFile: string;
  concretePassageOrDecision: string;
  functionInScene: string;
  observedLimitation: string;
}

interface EvaluationItem {
  number: number;
  criterion: string;
  score: number;
  evidenceAndExplanation: string;
}

interface FailureAuditItem {
  label: string;
  finding: string;
}

interface ResearchNoteItem {
  category: 'specification' | 'academic' | 'literary';
  source: string;
  accessStatus: string;
  conceptExamined: string;
  relevantClaim: string;
  concreteWritingDecision: string;
}

export const EXPERIMENT_01_PREMISE = `On a wet late-November Friday fifteen minutes before the 4:30 PM municipal lockup, nineteen-year-old Julian Vance arrives at the Probate & Unclaimed Chattels Annex to retrieve his late grandfather Arthur’s 1928 Negretti & Zambra mahogany hair-hygrometer using a carbon-copy claim slip (Form 11-B) bearing an unfinished pencil note in Arthur’s hand: "Check the false bottom before—" Julian’s immediate practical objective is to surrender the yellow slip, verify the brass instrument inside its case, and carry it back to the estate executor before the weekend transfer. The complication arises when he finds his estranged aunt Clara already standing at the service counter beside a damp instrument-shop carton, while through the quarter-inch plate-glass partition—where cold overhead fluorescent light collides with low amber courtyard sun—the unlatched mahogany case on the sorting table appears already hollowed out.`;

export interface SnippetBlock {
  id: string;
  movement: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  movementLabel: string;
  type: 'prose' | 'document' | 'inscription' | 'isolated';
  text: string;
  activePacks?: string[];
  craftNote?: string;
}

export const EXPERIMENT_01_BLOCKS: SnippetBlock[] = [
  {
    id: 'p1',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'prose',
    text: `Rain had darkened the limestone steps of the Municipal Chattels Annex to the colour of wet slate, except along the shallow central trough worn by eighty years of heels, where a thin skin of water caught the low amber break under the western cloud bank and threw it upward against the ribbed wire-glass transom inside the doors.`,
    activePacks: ['Wraytracing', 'The Camera Eye', 'Kinetic Syntax (Precondition)'],
    craftNote:
      'Establishes the wet central trough (causal precondition for the slip in Movement C) and the low amber light path entering through the ribbed transom.',
  },
  {
    id: 'p2',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'prose',
    text: `I came in shaking the cuff of my rust-coloured canvas jacket, four minutes past four-fifteen, with the yellow carbon slip folded inside my palm so the damp wouldn't take the pencil lead.`,
    activePacks: ['The Camera Eye', 'Psycholinguistic Switchboard'],
    craftNote:
      'Anchors immediate time constraint (4:19 PM against a 4:30 PM cutoff), rust-coloured sleeve (needed for the glass reflection), and the physical claim slip.',
  },
  {
    id: 'p3',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'document',
    text: `COUNTY PROBATE & DEPOSITORY — WINDOW 3\nCLAIMS CLOSE 16:30 SHARP. NO VALUATION GUARANTEED.`,
    activePacks: ['Juxtaposition & Collage', 'Glyphcraft'],
    craftNote:
      'Institutional register establishing the bureaucratic frame indifferent to personal value.',
  },
  {
    id: 'p4',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'prose',
    text: `The corridor smelled of wet wool, floor wax warm from the cast-iron radiator grilles, and the sour zinc tang of old filing cabinets. Overhead, a single forty-watt fluorescent tube ran the length of the ceiling in a dented enamel trough. Its light was a cold, chalky cyan-white that flattened the plaster walls and turned the terrazzo floor into a field of grey pebbles suspended in tallow, but it could not quite reach the waist-high oak counter at the end of the hall. There, the late sun coming sideways through the wet transom met the fluorescent glare head-on across a sliding partition of quarter-inch plate glass.`,
    activePacks: ['Wraytracing', 'Cadence Engine'],
    craftNote:
      'Sets up the dichromatic collision (4000K cyan-white ceiling tube vs. oblique amber sun) across the quarter-inch plate-glass partition alongside olfactory and thermal grounding.',
  },
  {
    id: 'p5',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'prose',
    text: `Someone was already standing at Window 3.`,
    activePacks: ['Glyphcraft', 'Psycholinguistic Switchboard'],
    craftNote: 'Single-sentence paragraph isolating the unexpected presence at the counter.',
  },
  {
    id: 'p6',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'prose',
    text: `She had her back half-turned toward the radiator, a tall woman in a dark green loden coat whose wet hem hung heavy and plumb against her calves. Even before she shifted her weight and the amber transom light slid across the silver-threaded knot of hair at her nape, I knew the set of her shoulders. My mother had called me twice on the walk from the chemistry building to warn me that Clara was back in town and had asked the executor for the workshop keys on Wednesday. She knows the Negretti hygrometer is the only piece on the bench worth real money, my mother had said, her voice tight over the bus noise. Get down to the annex before four-thirty, Julian. Don't let her talk you out of the slip.`,
    activePacks: ['The Camera Eye', 'Psycholinguistic Switchboard', 'Wraytracing'],
    craftNote:
      'Distinguishes online visual recognition (loden coat, silver-threaded knot catching amber light) from offline memory (his mother’s phone warning that primes his theft schema).',
  },
  {
    id: 'p7',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'prose',
    text: `I stopped three paces back, where the dry margin of the terrazzo met the dark wet track of my own boots.\n\n"You're dripping on the register, Julian," Clara said, without turning around.`,
    activePacks: ['The Camera Eye', 'Subtext & Lacunae'],
    craftNote:
      'Clara perceives Julian via reflection and sound before turning; her first line deflects family tension into practical observation.',
  },
  {
    id: 'p8',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'prose',
    text: `Her voice had the low, dry scrape I remembered from three winters ago, before the argument over the house on Elm Street split the family into people who left messages and people who didn't. She was wiping the side of her right thumb with a folded paper handkerchief. When she balled the tissue into her palm, a faint brick-red smudge remained in the crease of her knuckle—dried jeweler's rouge, darkened at the edge by a film of machine oil.`,
    activePacks: ['The Camera Eye', 'Psycholinguistic Switchboard', 'Resonance & Echo'],
    craftNote:
      'Plants the physical clue of dried jeweler’s rouge and machine oil in Clara’s knuckle crease—observed accurately by Julian, but not yet understood.',
  },
  {
    id: 'p9',
    movement: 'A',
    movementLabel: 'Movement A: Practical Reality & Perceptual Field',
    type: 'prose',
    text: `"Came straight from the lab," I said, stepping up to the oak counter beside her, keeping two feet of scarred varnish between our elbows. "Bus stalled on the bridge."\n\n"Still wearing that canvas thing with the torn pocket."\n\n"Blocks the wind."\n\n"Doesn't block the rain." She nodded toward my left sleeve, where the wet cloth had wicked dark plum-brown from the wrist button halfway to the elbow. "Your mother still buying coats for the look of the collar?"`,
    activePacks: ['Subtext & Ellipsis', 'Subtext & Lacunae', 'Wraytracing'],
    craftNote:
      'Linguistic ellipsis (subject-dropped replies: "Came straight from the lab", "Blocks the wind") paired with material response (wet canvas wicking dark plum-brown).',
  },
  {
    id: 'p10',
    movement: 'B',
    movementLabel: 'Movement B: Recurring Perceptual Element & Optical Illusion',
    type: 'prose',
    text: `I didn't answer that. Instead I laid the yellow carbon of Form 11-B flat on the oak counter, four inches from my thumb, where the clerk would see it the moment he came back from the inner office. Along the bottom margin, beneath the purple manifold stamp (LOT 409 — ONE CASED HYGROMETER, MAHOGANY, DAMAGED), my grandfather's carpenter pencil had left a heavy, flat-grained scrawl two weeks before his stroke:`,
    activePacks: ['Juxtaposition & Collage', 'Resonance & Echo'],
    craftNote:
      'Introduces the secondary recurring element: the grandfather’s unfinished pencil inscription.',
  },
  {
    id: 'p11',
    movement: 'B',
    movementLabel: 'Movement B: Recurring Perceptual Element & Optical Illusion',
    type: 'inscription',
    text: `Check the false bottom before—`,
    activePacks: ['Glyphcraft', 'Subtext & Lacunae', 'Resonance & Echo'],
    craftNote:
      'Permanent/open syntactic lacuna where the 2B lead snapped, paired with a recoverable thematic gap.',
  },
  {
    id: 'p12',
    movement: 'B',
    movementLabel: 'Movement B: Recurring Perceptual Element & Optical Illusion',
    type: 'prose',
    text: `The dash ended in a small grey pit where the soft 2B lead had snapped against the grain of the workbench. No period. No noun. Just the pressure of an eighty-one-year-old thumb bearing down hard enough to emboss the back of the flimsy paper.\n\nI looked past the brass speaking grille set into the plate glass at chest height.\n\nBehind the partition lay the sorting bay—a long, high-ceilinged room lined with pine trestle tables and slotted crate racks, cooler and dimmer than the corridor because no direct sun reached its floor. Directly opposite me, four feet beyond the glass on a sheet of scarred grey zinc, sat my grandfather's mahogany case.\n\nIts brass hooks were unfastened. The hinged front door stood swung wide at ninety degrees, exposing the recessed chamber where the heavy brass recording drum and the vertical bundle of bleached horsehair should have been mounted against the silvered scale.`,
    activePacks: ['Wraytracing', 'The Camera Eye'],
    craftNote:
      'Establishes foreground (counter), middle plane (quarter-inch glass with brass grille), and background sorting bay.',
  },
  {
    id: 'p13',
    movement: 'B',
    movementLabel: 'Movement B: Recurring Perceptual Element & Optical Illusion',
    type: 'prose',
    text: `From where I stood—directly under the ceiling tube, with the low sodium-amber light from the wet transom striking my rust-coloured shoulder from behind—the quarter-inch plate glass acted like a tarnished mirror laid over clear water. Where the bright amber reflection of my own jacket sleeve and the green-patinated brass speaking grille fell across the glass, the surface became opaque; right inside that warm, reflected silhouette sat the open mahogany box. The dark plum shadow inside the box's velvet lining converged in tone with the reflected shadow of my own sternum. Where the silvered scale and the five-inch brass drum should have caught the overhead lamp, there was only a square of flat, undisturbed charcoal dark.\n\nThe case was empty.`,
    activePacks: ['Wraytracing', 'The Camera Eye', 'Resonance & Echo', 'Glyphcraft'],
    craftNote:
      'Core Wraytracing mechanism: tonal value convergence and specular reflection across the beam-splitting glass obscure the interior of the case, causing Julian to infer that the box is empty.',
  },
  {
    id: 'p14',
    movement: 'C',
    movementLabel: 'Movement C: Complication, Misinference & Kinetic Sequence',
    type: 'prose',
    text: `My eyes dropped from the glass to the oak counter between Clara's gloved left hand and the brass grille.\n\nSitting there on the varnish was a damp six-inch cube of grey pasteboard, tied once with waxed butcher's twine that had recently been untied and looped loosely back over the flaps. A purple rubber stamp on the top flap had bled slightly into the wet cardboard fibres:`,
    activePacks: ['The Camera Eye', 'Wraytracing'],
    craftNote:
      'Tracks eye movement from the partition down to the counter and renders ink diffusion in damp pasteboard fibers.',
  },
  {
    id: 'p15',
    movement: 'C',
    movementLabel: 'Movement C: Complication, Misinference & Kinetic Sequence',
    type: 'document',
    text: `H. VOS & SON — PRECISION INSTRUMENT & BAROMETER REPAIR\n19 MERCER STREET\n27 NOV — PAID CASH: £140.00\nHAIR BUNDLE & ESCAPEMENT RESTORED`,
    activePacks: ['Juxtaposition & Collage', 'Psycholinguistic Switchboard', 'Glyphcraft'],
    craftNote:
      'Fair-play evidentiary cue: the stamp states £140.00 paid for restoration, allowing an attentive reader to question Julian’s theft hypothesis before he does.',
  },
  {
    id: 'p16',
    movement: 'C',
    movementLabel: 'Movement C: Complication, Misinference & Kinetic Sequence',
    type: 'prose',
    text: `Beside the box lay a torn half-strip of stiff pink foil—the kind pawn and repair shops staple to a claim check when an item is cleared from the vault.\n\nMy pulse gave a single, hard thud against the inside of my collar. The inference assembled itself with the clean, frictionless certainty of a titration turning pink in a beaker: Clara had come here twenty minutes early, used her name as Arthur's daughter to inspect Lot 409 before probate closed, lifted the brass Negretti movement out of its mahogany shell, and brought a Mercer Street repair carton to pack it out of the building before I arrived with the executor's release slip.`,
    activePacks: ['The Camera Eye', 'Psycholinguistic Switchboard'],
    craftNote:
      'Explicitly separates observable evidence from the focalizer’s schema-driven misinterpretation.',
  },
  {
    id: 'p17',
    movement: 'C',
    movementLabel: 'Movement C: Complication, Misinference & Kinetic Sequence',
    type: 'prose',
    text: `"He's in the back checking the ledger," Clara said quietly, following my gaze toward the frosted glass door at the rear of the sorting bay. Behind that pebbled glass, a tall shadow in a grey cardigan moved slowly between two filing cabinets, blurring into a wide charcoal smear whenever he stepped away from the pane and sharpening into a crisp elbow and ledger spine when he leaned back toward it. "They had the lot number entered under Vance, C. instead of the estate."\n\n"Convenient," I said.\n\nClara turned her head half an inch. In the mixed light at the counter, the left side of her face took the cold overhead cyan—sharpening the grey hollows beneath her cheekbone and the fine wet wool hairs standing up along her lapel—while the right side of her jaw caught the reflected amber off the oak counter, warming the skin there to the colour of old parchment.\n\n"Meaning?"\n\n"Nothing." I kept my thumb on the corner of the yellow slip. "Just that Mr. Sato gave me the yellow copy this morning. Said the whole instrument was supposed to stay together until the inventory was signed."\n\n"The whole instrument," Clara repeated. Her voice was flat, almost neutral, the way people speak when they are testing how much weight a plank will bear before they put their other foot on it. "Is that what your mother told you I was doing down here?"\n\n"She didn't have to tell me anything."\n\n"No," Clara said, looking back toward the brass speaking grille. "She never did have to finish a sentence when you were in the room. You always preferred to supply the end yourself."`,
    activePacks: ['Wraytracing', 'Subtext & Lacunae', 'Subtext & Ellipsis', 'Resonance & Echo'],
    craftNote:
      'Renders light scattering through pebbled glass and dichromatic shading across Clara’s face while Clara explicitly names Julian’s habit of filling in unfinished sentences.',
  },
  {
    id: 'p18',
    movement: 'C',
    movementLabel: 'Movement C: Complication, Misinference & Kinetic Sequence',
    type: 'prose',
    text: `Across the wall above the sorting rack, the municipal regulator clock dropped its second hand down the dial with a dry, three-part mechanical hitch in its escapement: tick—tick—catch. Every third beat, a worn tooth on the brass wheel hesitated for a fraction of a second before the pendulum took it through, so that time in the corridor seemed to limp forward on one stiff knee. Below us, the cast-iron radiator gave a thin, wet hiss through its brass bleed valve, releasing a ribbon of warm vapour that rose across the lower corner of the plate glass and bloomed into a soft, milky gradient five inches wide before vanishing as it cooled.\n\n"Look," Clara said, and her ungloved right hand—the one with the red rouge stain in the knuckle crease—lifted from the oak counter and moved toward the damp Mercer Street cardboard box and the white intake voucher lying beside the brass pass-through trough. "Before the clerk comes back out here—"\n\nShe was reaching for the white voucher.\n\nI didn't think the decision through; my arm moved before the sentence in my head finished forming. I lunged half a step to my left to pin the white intake voucher before her fingers could close on it.\n\nMy left boot came down squarely in the wet central trough of the terrazzo floor. The smooth crepe sole hydroplaned on the film of rainwater and floor wax; my heel shot outward three inches; to keep my chin off the oak ledge, I threw my right forearm up against the counter rim. My wrist bone struck the unlatched brass pull-handle set into the edge of the sliding glass sash.\n\nThe heavy quarter-inch pane took the lateral shove along its oiled ball-bearing track.`,
    activePacks: ['Kinetic Syntax', 'Wraytracing', 'Cadence Engine', 'Subtext & Ellipsis'],
    craftNote:
      'Executes the 6-step Kinetic Syntax chain: Initiation (lunge left) -> Vector (boot into wet trough) -> Resistance loss (crepe sole hydroplanes) -> Contact (wrist strikes brass pull) -> Consequence (pane slides along track).',
  },
  {
    id: 'p19',
    movement: 'C',
    movementLabel: 'Movement C: Complication, Misinference & Kinetic Sequence',
    type: 'isolated',
    text: `Shhhhk—\n\nThe sash slid six inches to the right and slammed into the clerk's weighted cast-iron tape dispenser sitting on the inner wooden sill.\n\nCLANG.`,
    activePacks: ['Glyphcraft', 'Kinetic Syntax', 'Cadence Engine'],
    craftNote:
      'Typographic isolation marks the acoustic sliding of the sash and the cast-iron impact.',
  },
  {
    id: 'p20',
    movement: 'D',
    movementLabel: 'Movement D: Rest & Arrest',
    type: 'prose',
    text: `The iron dispenser toppled inward off the sill, struck the zinc top of the sorting table four feet away with a dull leaden thud, and skidded into the corner of my grandfather's open mahogany case. The case pivoted on its green baize base, slid three inches toward the floor, and caught against the raised zinc lip at the edge of the table—tilting forward at twenty degrees while its loose cedar false bottom rattled and slid half an inch out of its dado groove.\n\nNobody moved.\n\nThe iron tape dispenser rolled half a turn on the zinc sheet and stopped against a coil of twine.\n\nIn the sudden quiet, the room's small sounds rushed back in to fill the hollow left by the impact, each one distinct and abnormally loud: the wet drip—drip of Clara's umbrella tip into the brass floor pan by the radiator; the muffled burble of a transistor radio somewhere down the basement stairs reading out evening river-barge clearances; and overhead, the wall regulator's limping three-beat escapement:\n\nTick—tick—catch.\n\nClara had not touched the white voucher. Her hand had stopped two inches above the knotted twine of the damp Mercer Street box, her fingers slightly curved, palm up, in the unmistakable gesture of someone about to untie a string so another person can look inside.`,
    activePacks: ['Rest & Arrest', 'The Camera Eye', 'Cadence Engine', 'Juxtaposition & Collage'],
    craftNote:
      'Five-second arrest: physical motion freezes while background acoustic layers rush in and Julian registers the upward orientation of Clara’s palm.',
  },
  {
    id: 'p21',
    movement: 'E',
    movementLabel: 'Movement E: Optical Separation & Reinterpretation',
    type: 'prose',
    text: `I stood with my palm still braced against the cold brass track of the window, breathing the sharp dust shaken loose from the sash channel.\n\nBecause the heavy glass pane had slid six inches to the right—and because my own slip had carried my shoulders a foot to the left of the overhead tube—the optical geometry between the corridor and the sorting bay had broken apart.\n\nThe warm amber reflection of my rust-coloured jacket no longer covered the mahogany case. It hung harmlessly to the right now, suspended over an empty pine crate, while directly in front of my face lay a six-inch vertical gap of open air where there was no glass at all.\n\nThrough that clear slot, the cold 4000K light of the sorting bay fell straight down into the tilted mahogany interior without a reflection to cancel it.\n\nThe case was not empty.\n\nNested inside the faded purple velvet cradle sat the five-inch brass recording drum of the 1928 Negretti & Zambra hygrometer. Its lacquered cylinder did not have the dull, tobacco-brown tarnish of an instrument that had sat neglected on a damp basement shelf for five years. The brass had been freshly buffed to a pale, buttery gold that shaded smoothly from a crisp white highlight along the upper bezel down to a warm olive-bronze in the recessed gear train underneath; a tiny bead of fresh, water-clear watch oil clung to the steel pivot of the recording arm, and the vertical bundle of blonde horsehair—the delicate tension element that always rots first in an unheated workshop—stretched taut and gleaming like a single chord of rosin-dusted gut between the upper jaw and the silvered dial.\n\nAnd below the brass drum, where the impact of the iron dispenser had jarred the tilted mahogany shell against the table lip, the quarter-inch cedar false bottom projected half an inch past the front frame.\n\nPinned beneath that loose cedar tongue, half-exposed to the sorting-bay lamp, was a creased oblong of faded pink card stock—the exact weight, grain, and serrated perforation of the torn pink redemption foil lying on the oak counter beside Clara's thumb.\n\nEven upside down at four feet, the heavy black ledger numerals of a Mercer Street pawn-and-loan ticket were legible above my grandfather's cramped, upright ink from four winters back:`,
    activePacks: ['Wraytracing', 'Resonance & Echo', 'Cadence Engine', 'Psycholinguistic Switchboard'],
    craftNote:
      'Displacement of the glass pane eliminates the reflection seam, revealing the freshly buffed brass drum, clear watch oil, taut horsehair bundle, and the pink pawn ticket under the displaced cedar floor.',
  },
  {
    id: 'p22',
    movement: 'E',
    movementLabel: 'Movement E: Optical Separation & Reinterpretation',
    type: 'document',
    text: `PLEDGED: 1 NEGRETTI & ZAMBRA BRASS MOVEMENT & SCALE (CASE RETAINED)\nADVANCE: £95.00 — APPLIED: ST. JUDE INFIRMARY / PEDIATRIC RESPIRATORY WARD`,
    activePacks: ['Juxtaposition & Collage', 'Resonance & Echo', 'Psycholinguistic Switchboard'],
    craftNote:
      'Collides archival pawn ledger notation with Julian’s own medical history.',
  },
  {
    id: 'p23',
    movement: 'E',
    movementLabel: 'Movement E: Optical Separation & Reinterpretation',
    type: 'prose',
    text: `Four winters ago. The November I spent nine days in St. Jude's with pleurisy while my mother's teaching hours were cut and my grandfather swore up and down in our kitchen that the county retirees' fund had covered the hospital balance.\n\nHe had kept the mahogany shell on the high shelf above his lathe with its wooden door latched toward the wall so neither my mother nor I would ever look through the glass front and see the velvet cradle gutted. And two weeks before he died, knowing the executor would open every box in the shop for probate, he had written himself a reminder on the claim slip—Check the false bottom before—meaning to clear the debt or pull the old pawn ticket out from under the cedar floor before I ever saw what my lungs had cost him.\n\nHe hadn't lived to get to Mercer Street.\n\nClara had.\n\nI looked down at the damp grey cardboard box on the oak counter between us. Inside its loosely retied flaps, crumpled sheets of brown packing paper still held the hollow cylindrical impression where the restored brass movement had ridden across town in the rain an hour ago, before Clara talked the clerk into letting her inspect Lot 409 and spent twenty minutes fitting the oiled brass drum and its new horsehair bundle back into the empty mahogany case—wiping the fresh jeweler's rouge and watch oil from the brass onto her own thumb just before I walked through the street door.\n\nThe only thing she hadn't had time to remove before the clerk took the ledger into the back office was the old pink ticket wedged under the cedar false bottom.`,
    activePacks: ['Psycholinguistic Switchboard', 'Resonance & Echo', 'The Camera Eye'],
    craftNote:
      'Completes schema revision: every earlier clue (the rouge smudge, the £140 repair box, the pink foil stub, the unfinished pencil note) locks into its true causal place.',
  },
  {
    id: 'p24',
    movement: 'F',
    movementLabel: 'Movement F: Consequence, Decision & Ending',
    type: 'prose',
    text: `My hand on the brass window track felt cold and clumsy, too large for the cuff of my coat.\n\n"Your heel alright?" Clara asked quietly.\n\nShe hadn't looked at the tilted mahogany case once. She was looking at the wet grey smear my crepe sole had left across the terrazzo pebbles.\n\n"Yeah," I said. My voice came out lower than I intended, rough at the edge. "Wet sole."\n\n"Terrazzo's slick when they wax over damp stone," she said. With two fingers, she pushed the damp Mercer Street cardboard box an inch away from the speaking grille, toward the waste bin under the counter. "They never let the lime dry out in these old annexes."\n\nIn the back of the sorting bay, the frosted glass door clicked. The charcoal shadow behind the pebbled pane resolved into an older man in a grey cardigan carrying a cloth-bound ledger open across his forearm. His rubber soles made a soft, even shup-shup across the linoleum as he walked toward the sorting table.\n\nIf he saw the tilted mahogany case with its cedar floor jutting out—and the old pink pawn ticket sticking out from underneath—he would log the unredeemed enclosure on the probate sheet, or hand the loose ticket straight to Mr. Sato on Monday morning for my mother to read.\n\nI had maybe three seconds before he rounded the pine rack.\n\nI didn't look at Clara. I reached my right hand through the six-inch gap where the slid glass had cleared the air, braced my index finger against the raw, unvarnished edge of the cedar false bottom, and pressed it firmly back into its dado groove until the wood seated flush with a dry snick over the pink card. Then I lifted the mahogany case upright onto its green baize base, set the iron tape dispenser back beside the twine, and drew my arm back through the slot just as the clerk reached the table.`,
    activePacks: ['Subtext & Lacunae', 'Kinetic Syntax', 'The Camera Eye'],
    craftNote:
      'Julian acts on his revised understanding: instead of exposing the pawn ticket, he reaches through the gap and seats the cedar false bottom flush over the secret.',
  },
  {
    id: 'p25',
    movement: 'F',
    movementLabel: 'Movement F: Consequence, Decision & Ending',
    type: 'prose',
    text: `"Sorry to keep you waiting," the clerk said, setting the open ledger down on the inner sill and peering mildly at the six-inch gap in the window. "Track sticking again? The damp gets into the felt."\n\n"My elbow caught the pull," I said.\n\n"No harm done." He tapped the purple stamp on my yellow Form 11-B, then turned the cloth-bound ledger around toward the pass-through trough so the signature line faced me. "Your aunt already verified the movement and serial number on the brass drum ten minutes ago. If you're signing for the estate release, young man, I just need your name on line fourteen and you can take the case."\n\nI picked up the chained ballpoint pen from the brass cradle.\n\nBefore I signed, I looked at the yellow carbon slip under my left hand—at the broken dash after before— where the 2B lead had snapped. Then I tore a half-inch strip cleanly along the bottom margin of the yellow flimsy, lifting the pencil line off the receipt, and slipped the narrow ribbon of paper into my wet jacket pocket beside my keys.\n\nI signed line fourteen and pushed the ledger back under the glass.\n\nWhen the clerk lifted the mahogany case through the wide side hatch and set it in my hands, the wood was cool and solid, heavier by three pounds than it had been when it arrived at the annex that morning. Through the latched glass front, the freshly oiled brass drum caught the two lights of the corridor at once: a thin, sharp line of cyan along the upper bevel, and a deep, steady band of amber across the curve of the cylinder that moved when I breathed.`,
    activePacks: ['Resonance & Echo', 'Wraytracing', 'Subtext & Ellipsis'],
    craftNote:
      'Transforms the dichromatic light motif from an optical barrier on the partition glass into twin highlights coexisting on the restored brass cylinder.',
  },
  {
    id: 'p26',
    movement: 'F',
    movementLabel: 'Movement F: Consequence, Decision & Ending',
    type: 'prose',
    text: `Clara had already unhooked her wet umbrella from the radiator rail. She didn't wait for me at the counter, and she didn't look back to see whether I had taken the torn pink foil stub she'd left on the oak.\n\nI caught up with her outside on the top limestone step, under the stone lintel where the rain had thinned to a cold mist blowing off the viaduct. The wet slate courtyard below us held the last of the amber sky in long, irregular puddles between the cobbles, while the streetlamps along the iron fence were just coming on—pale mercury-vapour bulbs humming at a low, cold violet that hadn't yet overpowered the dusk.\n\nClara stood on the second step down, buttoning the collar of her loden coat with her ungloved right hand. In the fading daylight, the dry red smudge of jeweler's rouge in the crease of her knuckle looked almost brown, like an old burn or a stain from walnut hull.\n\n"Bus runs on the other side of the viaduct," she said, nodding toward the brick arches without looking at the mahogany box tucked under my arm. "If you cut through the alley you'll make the four-forty."\n\n"The Mercer Street shop closes at four," I said.\n\nShe stopped with the top horn button half through the slit. For two beats the only sound was the water running down the copper downspout beside the lintel—a steady, hollow glug-chink into the iron grate at our feet.\n\n"Three-thirty on Fridays," she said.\n\n"Must have taken him a week to re-string the hair bundle."\n\n"Ten days," Clara said, and pulled the button through. "Old Vos has arthritis in his left thumb. You can't rush him."\n\nShe went down two more steps into the mist, her umbrella held low by its ferrule like a walking stick, its wet black silk shedding drops into the shallow trough worn down the middle of the stone.\n\n"Clara," I said.\n\nShe paused at the bottom step where the limestone met the wet cobbles, her shoulder turned just enough that I could see the silver-threaded knot at the nape of her neck and the pale vapour of her breath rising against the brick viaduct.\n\n"Keep the box out of the kitchen steam," she said. "Your grandfather always hung it on the north wall by the hall door. The plaster's drier there."\n\n"I know where the nail is," I said. "Come look at it on Sunday. Mother's working the afternoon shift—or if she's home, come anyway."\n\nClara looked down at the wet cobbles for a second, where the amber reflection of the sky and the cold violet ring of the streetlamp met and trembled across the same puddle whenever a lorry crossed the bridge overhead. She didn't say yes, and she didn't say she had a train to catch.\n\n"Tell her to check the bleed valve on that hall radiator," she said. "It was sticking the last winter I was in the house."\n\nShe turned the corner past the iron gatepost, her loden hem dark against the wet stone, while under my right elbow the brass drum inside the mahogany case gave a tiny, almost imperceptible tick as its newly oiled hair bundle settled into the cold evening air.`,
    activePacks: ['Subtext & Lacunae', 'Lyric Forge', 'Wraytracing', 'Resonance & Echo', 'Cadence Engine'],
    craftNote:
      'Ends without sentimental commentary: reconciliation is negotiated through trade times ("Three-thirty on Fridays", "Ten days"), wall plaster, and a sticking radiator bleed valve, closing on the single settling tick of the restored hygrometer.',
  },
];

export const TECHNIQUE_EXECUTION_MAP: TechniqueExecutionRow[] = [
  {
    number: 1,
    packId: 'ledger_technique_pack_wraytracing',
    packName: 'Wraytracing — Light Mechanics for Prose & Poetry',
    sourceFile: 'technique_pack_wraytracing.md',
    concretePassageOrDecision:
      'The quarter-inch plate-glass partition at Window 3 acting as a partial beam-splitter between the 4000K overhead cyan fluorescent tube and the low 4:15 PM sodium-amber transom light, superimposing the warm reflection of Julian’s rust jacket over the cool sorting bay so the dark velvet interior of the open mahogany case converges in value with his reflected sternum and appears empty; later broken when the glass slides six inches to the right.',
    functionInScene:
      'Makes an optical interaction (source -> path -> medium -> surface -> observer angle -> consequence) the central engine of the plot complication and its reversal, rather than decorative scenery.',
    observedLimitation:
      'Requires sustained spatial setup across three paragraphs; a reader skimming the geometry of the transom and ceiling tube could miss why the reflection vanishes when the sash slides.',
  },
  {
    number: 2,
    packId: 'ledger_technique_pack_camera_eye',
    packName: 'The Camera Eye — Focalization, Attention & Perceptual Access',
    sourceFile: 'technique_pack_camera_eye.md',
    concretePassageOrDecision:
      'Strict first-person online perception separating raw visual registration (the dried brick-red jeweler’s rouge and machine oil in Clara’s knuckle crease; the damp H. VOS & SON carton stamped PAID CASH: £140.00; the torn pink foil stub) from Julian’s prejudiced inference ("The inference assembled itself with the clean, frictionless certainty of a titration turning pink").',
    functionInScene:
      'Demonstrates how a focalizer can accurately perceive every physical clue while constructing a completely inverted causal explanation due to prior emotional priming (his mother’s phone warning).',
    observedLimitation:
      'Because first-person retrospective narration uses past tense ("I didn’t think"), keeping the narrator’s later knowledge from leaking prematurely into the early description required strict suppression of retrospective commentary.',
  },
  {
    number: 3,
    packId: 'ledger_technique_pack_resonance_echo',
    packName: 'Resonance & Echo — Motifs That Change Across Repetition',
    sourceFile: 'technique_pack_resonance_echo.md',
    concretePassageOrDecision:
      'Primary motif: the dichromatic light pair (cold cyan/violet vs. warm amber/rust) across three returns: (1) on the glass partition where it deceives Julian’s eye; (2) on the freshly oiled brass drum inside the case ("a thin, sharp line of cyan... and a deep, steady band of amber"); (3) in the courtyard puddle where sky and streetlamp tremble together. Secondary motif: the broken pencil note ("Check the false bottom before—").',
    functionInScene:
      'Tracks Julian’s shift from binary accusation (thief vs. custodian) to holding two contradictory family truths at once, while transforming Arthur’s note from a suspected theft warning into evidence of concealed sacrifice.',
    observedLimitation:
      'Having three distinct returns of the cyan/amber pairing risks making the final puddle image feel slightly symmetrical if the reader notices the triadic pattern explicitly.',
  },
  {
    number: 4,
    packId: 'ledger_technique_pack_subtext_lacunae',
    packName: 'Subtext & Lacunae — Silence, Shadow Stories & Narrative Gaps',
    sourceFile: 'technique_pack_subtext_lacunae.md',
    concretePassageOrDecision:
      'Three distinct gap modes: (1) Recoverable gap: why Clara was at the annex twenty minutes early and why her knuckle has rouge on it; (2) Suggestive gap: Clara’s final non-answer regarding Sunday ("Tell her to check the bleed valve on that hall radiator"); (3) Permanent/open lacuna: the exact words Arthur meant to write after "Check the false bottom before—" when the 2B lead snapped.',
    functionInScene:
      'Preserves the emotional realism of an estranged family that communicates through household maintenance rather than explicit apologies, while keeping Arthur’s unfinished thought permanently open.',
    observedLimitation:
      'The hospital-bill revelation on the pawn ticket resolves the financial shadow story very cleanly; a subtler version might have left the exact nature of the £95 debt less explicit on the ticket itself.',
  },
  {
    number: 5,
    packId: 'ledger_technique_pack_subtext_ellipsis',
    packName: 'Subtext & Ellipsis — Omitted Language, Time & Meaning',
    sourceFile: 'technique_pack_subtext_ellipsis.md',
    concretePassageOrDecision:
      'Kept distinct from Lacunae across three scales: (1) Linguistic ellipsis in clipped dialogue ("Came straight from the lab." / "Blocks the wind." / "Convenient."); (2) Conversational ellipsis in Clara’s interrupted reach ("Before the clerk comes back out here—"); (3) Narrative compression between signing line fourteen and emerging onto the top limestone step with the case.',
    functionInScene:
      'Creates brisk, guarded interpersonal friction in the corridor and accelerates the bureaucratic handover once the emotional turn has already occurred.',
    observedLimitation:
      'The clipped subject-dropped replies in the first exchange ("Came straight from the lab." / "Blocks the wind.") skirt close to classic hardboiled compression before Clara’s longer sentences restore natural speech cadence.',
  },
  {
    number: 6,
    packId: 'ledger_technique_pack_rest_arrest',
    packName: 'Rest & Arrest — Stillness, Suspension & Timing of Attention',
    sourceFile: 'technique_pack_rest_arrest.md',
    concretePassageOrDecision:
      'The five-second stillness immediately after the cast-iron tape dispenser crashes ("Nobody moved. The iron tape dispenser rolled half a turn on the zinc sheet and stopped against a coil of twine"), anchored by the umbrella drip, the basement barge radio, and the clock’s Tick—tick—catch while Julian’s eye re-reads the now-unobstructed mahogany case.',
    functionInScene:
      'Uses physical arrest after sudden kinetic impact to force a cognitive and perceptual reorganization: motion stops so that what was optically hidden can register in working memory.',
    observedLimitation:
      'Holding the pause across four paragraphs while Julian reads the exposed pawn ticket stretches real-time plausibility slightly, given the clerk is walking back from the office.',
  },
  {
    number: 7,
    packId: 'ledger_technique_pack_juxtaposition_collage',
    packName: 'Juxtaposition & Collage — Meaning by Collision',
    sourceFile: 'technique_pack_juxtaposition_collage.md',
    concretePassageOrDecision:
      'Direct collision of four heterogeneous text/voice registers: the municipal warning sign (NO VALUATION GUARANTEED), Arthur’s intimate broken pencil scrawl (Check the false bottom before—), the commercial repair stamp (H. VOS & SON... PAID CASH: £140.00), the 4-year-old pawn ticket (APPLIED: ST. JUDE INFIRMARY), and the basement transistor radio reading river-barge clearances.',
    functionInScene:
      'Exposes the distance between cold institutional classification (LOT 409 — DAMAGED) and the lived economic and familial history embedded in the physical object.',
    observedLimitation:
      'Displaying four separate formatted text blocks across a 2,200-word scene approaches the upper threshold before document inserts begin to feel like an archival dossier device.',
  },
  {
    number: 8,
    packId: 'ledger_technique_pack_cadence_engine',
    packName: 'Cadence Engine — Prose Rhythm, Sentence Motion & Sonic Texture',
    sourceFile: 'technique_pack_cadence_engine.md',
    concretePassageOrDecision:
      'Contrast between the 94-word hypotactic sentence describing the newly visible brass drum and horsehair bundle (sustaining continuous visual discovery) and the clipped parataxis of the slip/impact sequence ("My left boot came down squarely... The case was not empty.") and the quiet trochaic exchanges on the steps ("Three-thirty on Fridays." / "Ten days.").',
    functionInScene:
      'Aligns syntactic span with attentional aperture: wide, subordinated clauses when perception integrates complex optical relationships; short, stressed clauses when physical equilibrium or certainty breaks.',
    observedLimitation:
      'The long sentence describing the restored brass drum (Movement E) packs four clauses and a semicolon together, demanding high working-memory maintenance from the reader.',
  },
  {
    number: 9,
    packId: 'ledger_technique_pack_glyphcraft',
    packName: 'Glyphcraft — Typography, Punctuation & the Shape of Reading',
    sourceFile: 'technique_pack_glyphcraft.md',
    concretePassageOrDecision:
      'Disciplined baseline prose broken only by: (1) monospaced/block-indented in-world notices and stamps; (2) the italicized unfinished pencil line with its terminal em-dash (Check the false bottom before—); (3) isolated single-line acoustic/visual pivots (Shhhhk—, CLANG., Tick—tick—catch., The case was not empty.).',
    functionInScene:
      'Uses visual isolation on the page to mark acoustic interrupts and cognitive reversals without resorting to all-caps shouting or decorative spacing tricks.',
    observedLimitation:
      'Isolating both Shhhhk— and CLANG. on separate lines within four lines of each other slightly dilutes the visual punch of the later isolated line The case was not empty.',
  },
  {
    number: 10,
    packId: 'ledger_technique_pack_psycholinguistic_switchboard',
    packName: 'Psycholinguistic Switchboard — Reader Prediction, Inference & Coherence',
    sourceFile: 'technique_pack_psycholinguistic_switchboard.md',
    concretePassageOrDecision:
      'Plants three fair-play cues before the reveal that contradict Julian’s theft hypothesis: (1) the rouge and watch oil are already drying on Clara’s knuckle when Julian arrives; (2) the Mercer Street box is stamped PAID CASH: £140.00 — HAIR BUNDLE & ESCAPEMENT RESTORED; (3) Clara’s palm is turned up toward the twine when she reaches.',
    functionInScene:
      'Allows an attentive reader to detect the prediction error in Julian’s schema several paragraphs before Julian himself sees the restored movement inside the case.',
    observedLimitation:
      'Because the H. VOS & SON stamp explicitly says HAIR BUNDLE & ESCAPEMENT RESTORED, a sharp reader may solve the reversal almost immediately in Movement B, reducing uncertainty during Movement C.',
  },
  {
    number: 11,
    packId: 'ledger_technique_pack_kinetic_syntax',
    packName: 'Kinetic Syntax — Action, Impact & Fragmented Attention',
    sourceFile: 'technique_pack_kinetic_syntax.md',
    concretePassageOrDecision:
      'The 6-step causal chain at the counter: (1) Initiation: Julian lunges left to pin the voucher; (2) Vector: left crepe sole lands in the wet terrazzo trough; (3) Resistance/loss of friction: sole hydroplanes three inches; (4) Contact: right forearm strikes the unlatched brass sash handle -> sash slams cast-iron dispenser; (5) Consequence: dispenser falls onto zinc table, tipping the mahogany case forward so the loose cedar false bottom slides half an inch out; (6) Attention shift: Julian notices the open six-inch air gap.',
    functionInScene:
      'Makes the physical accident the exact mechanical cause of both the optical unveiling (sliding the beam-splitting glass out of the line of sight) and the physical unveiling (dislodging the false bottom).',
    observedLimitation:
      'Rube-Goldberg risk: chaining boot slip -> forearm -> sliding sash -> iron tape dispenser -> tilted mahogany case -> dislodged false bottom involves five sequential mechanical transfers, which sits right at the boundary of believable everyday physics.',
  },
  {
    number: 12,
    packId: 'ledger_technique_pack_lyric_forge',
    packName: 'Lyric Forge — Lyricism, Refrain, Sound & the Turn',
    sourceFile: 'technique_pack_lyric_forge.md',
    concretePassageOrDecision:
      'Phonetic modulation from sibilants/fricatives in the opening rain and radiator steam (sh, s, f) to hard velar/alveolar stops during the impact (ck, cl, t, d) and liquid/nasal resonance in the courtyard ending; the structural turn when Julian tears off the bottom margin of Form 11-B and slides the cedar floor shut; the closing sensory rhyme between the clock’s tick—tick—catch and the hygrometer’s single settling tick.',
    functionInScene:
      'Grounds lyrical compression in concrete material facts (rosin-dusted horsehair, walnut-hull stain on a knuckle, limestone trough) and ends on an earned acoustic echo rather than a thematic summary.',
    observedLimitation:
      'The metaphor comparing the taut horsehair bundle to "a single chord of rosin-dusted gut" slightly aestheticizes a scientific instrument part at the exact moment Julian is supposed to be stunned by shock.',
  },
];

export const TECHNICAL_EVALUATION: EvaluationItem[] = [
  {
    number: 1,
    criterion: 'Scene coherence',
    score: 9,
    evidenceAndExplanation:
      'The practical objective (claim Lot 409 with Form 11-B before 4:30 PM), the spatial geometry (vestibule -> oak counter -> sliding plate-glass partition -> zinc sorting table -> frosted office door in the rear), the complication, and the resolution remain continuously reconstructable. One point is deducted because the five-link mechanical chain during the slip is slightly intricate on a first read.',
  },
  {
    number: 2,
    criterion: 'Wraytracing precision',
    score: 9,
    evidenceAndExplanation:
      'Optical rendering is built from physical relationships and positional changes rather than decorative colour adjectives: the 4000K overhead tube vs. the low sodium-amber transom sun creating a beam-splitting reflection on the quarter-inch glass that merges in tonal value with the dark velvet interior ("The dark plum shadow inside the box’s velvet lining converged in tone with the reflected shadow of my own sternum"), followed by its elimination when the sash moves six inches.',
  },
  {
    number: 3,
    criterion: 'Viewpoint discipline',
    score: 9,
    evidenceAndExplanation:
      'Every detail enters through Julian’s immediate sensory field or his explicitly marked memory (his mother’s phone call, his childhood hospital stay). His misinterpretation of the Mercer Street carton is explicitly separated from his visual perception ("The inference assembled itself with the clean, frictionless certainty of a titration turning pink in a beaker").',
  },
  {
    number: 4,
    criterion: 'Physical causality',
    score: 8,
    evidenceAndExplanation:
      'Every physical state change has an established material precondition: the wet central trough in the terrazzo floor is established in Paragraph 1 and recalled before Julian’s crepe sole slips in Movement C; the unlatched brass sash handle and weighted iron dispenser produce a clear vector of impact. However, having the falling tape dispenser tip the mahogany case at just the angle required to slide the cedar false bottom half an inch out without dumping the case onto the floor is a convenient mechanical coincidence.',
  },
  {
    number: 5,
    criterion: 'Sensory integration',
    score: 9,
    evidenceAndExplanation:
      'Visual rendering cooperates continuously with non-visual channels tied to concrete sources: the smell of floor wax heated by cast-iron radiator grilles, the sour zinc tang of filing cabinets, the wet drip—drip of Clara’s umbrella into the brass pan, the limping three-beat escapement (tick—tick—catch), the basement barge radio, and the added three-pound heft of the mahogany case when lifted.',
  },
  {
    number: 6,
    criterion: 'Cadence and form',
    score: 8,
    evidenceAndExplanation:
      'Sentence length and stress modulate purposefully across movements—from the 94-word perceptual synthesis when the brass drum becomes visible to the clipped two- and three-word exchanges on the limestone steps ("Three-thirty on Fridays." / "Ten days."). Occasionally, the multi-clause optical descriptions in Movement B and Movement E approach high syntactic density.',
  },
  {
    number: 7,
    criterion: 'Omission and subtext',
    score: 9,
    evidenceAndExplanation:
      'The scene maintains a clear separation between grammatical/conversational ellipsis ("Came straight from the lab.", "Convenient.") and structural/interpersonal lacunae (neither Julian nor Clara ever speaks openly about the £95 hospital debt or apologizes for the three-year estrangement; instead Clara says, "Tell her to check the bleed valve on that hall radiator").',
  },
  {
    number: 8,
    criterion: 'Motif development',
    score: 9,
    evidenceAndExplanation:
      'Both recurring elements transform in function: the cyan/amber double reflection shifts from an optical camouflage that causes a false accusation into a dual highlight on the restored brass cylinder and finally an emblem of coexistence in the courtyard puddle; Arthur’s broken pencil line ("Check the false bottom before—") shifts from a suspected warning against family theft to a dying man’s attempt to hide his own generosity.',
  },
  {
    number: 9,
    criterion: 'Reader inference',
    score: 8,
    evidenceAndExplanation:
      'All evidence required for the reader to outrun Julian’s prejudiced assumption is planted fairly in Movement B (the rouge already dried on Clara’s knuckle, the PAID CASH: £140.00 — HAIR BUNDLE & ESCAPEMENT RESTORED stamp, the pink redemption foil). Because the stamp explicitly includes the word RESTORED, an attentive reader can deduce Clara’s innocence slightly too early, turning the middle third into dramatic irony rather than shared uncertainty.',
  },
  {
    number: 10,
    criterion: 'Poetic effectiveness',
    score: 8,
    evidenceAndExplanation:
      'Imagery arises directly from the scene’s materials—terrazzo pebbles "suspended in tallow", the clock’s escapement limping "on one stiff knee", the rouge stain looking "like an old burn or a stain from walnut hull". One metaphor in Movement E ("like a single chord of rosin-dusted gut") feels slightly more poised than Julian’s stunned emotional state warrants.',
  },
  {
    number: 11,
    criterion: 'Technique integration',
    score: 9,
    evidenceAndExplanation:
      'Rather than operating as twelve isolated set pieces, the packs interlock around a single hinge event: Kinetic Syntax (the slip and sash impact) physically alters Wraytracing (removing the beam-splitting reflection) and triggers Rest & Arrest (the five-second pause), which updates The Camera Eye and Psycholinguistic Switchboard (schema revision), which in turn transforms Resonance & Echo and Subtext & Lacunae.',
  },
  {
    number: 12,
    criterion: 'Restraint and specificity',
    score: 8,
    evidenceAndExplanation:
      'The ending resists summarizing the moral or having Julian and Clara embrace; their reconciliation is negotiated entirely through radiator bleed valves, bus schedules, and where the nail hangs on the north wall. However, the wording printed on the pawn ticket (APPLIED: ST. JUDE INFIRMARY / PEDIATRIC RESPIRATORY WARD) is slightly more explicit than a real pawnbroker’s ledger stub would typically record.',
  },
];

export const FAILURE_AUDIT: FailureAuditItem[] = [
  {
    label: '1. Weakest paragraph and why it is weak',
    finding:
      'The paragraph in Movement E displaying and immediately explaining the pawn ticket ("PLEDGED: 1 NEGRETTI & ZAMBRA BRASS MOVEMENT... Four winters ago. The November I spent nine days in St. Jude’s with pleurisy..."). Pawn tickets rarely specify how the borrower spent the cash advance (APPLIED: ST. JUDE INFIRMARY), unless the grandfather wrote that note himself on the margin of the ticket. Presenting it as part of the printed ledger block compresses the evidentiary bridge slightly too conveniently.',
  },
  {
    label: '2. One instance of decorative detail that should be cut or revised',
    finding:
      'In Movement E, the simile describing the restored horsehair bundle—"stretched taut and gleaming like a single chord of rosin-dusted gut"—is slightly decorative. Julian is a chemistry student looking at his grandfather’s meteorological hygrometer in a moment of acute shock; simply noting that the new blonde horsehair bundle was taut and unfrayed between the upper jaw and the silvered dial would be faster and truer to his viewpoint.',
  },
  {
    label: '3. One physical or perceptual ambiguity that could confuse the reader',
    finding:
      'In Movement B and Movement E, the mahogany case sits "four feet beyond the glass on a sheet of scarred grey zinc", yet in Movement F Julian reaches his right hand "through the six-inch gap where the slid glass had cleared the air" to push the cedar false bottom shut and right the case. If the sorting table was four feet behind the glass partition, Julian could not reach it with his arm through a six-inch window slot unless the sorting table stood directly against the inner sill (roughly eighteen to twenty-four inches from the glass). That distance discrepancy ("four feet" vs. arm’s reach) is a genuine spatial error exposed by the experiment.',
  },
  {
    label: '4. One technique that was overused or underused',
    finding:
      'Juxtaposition & Collage (via block-indented document stamps/notices) was slightly overused: including four separate block-formatted text artifacts (WINDOW 3 sign, Check the false bottom before—, H. VOS & SON stamp, and the PLEDGED pawn ticket) in a 2,200-word scene leans heavily on typographic document insertion.',
  },
  {
    label: '5. One intended effect that the prose did not successfully achieve',
    finding:
      'I intended for the H. VOS & SON stamp in Movement B to remain genuinely ambiguous to the reader—so the reader might temporarily share Julian’s suspicion that Clara brought an empty repair box to steal the movement. However, including the line "27 NOV — PAID CASH: £140.00 / HAIR BUNDLE & ESCAPEMENT RESTORED" on the box lid makes Clara’s restorative act almost unmistakable to a careful reader on first sight, shifting the effect from shared epistemic uncertainty to dramatic irony.',
  },
  {
    label: '6. One meaningful trade-off created by the chosen style',
    finding:
      'Sustaining high-resolution optical and material specificity (Wraytracing) during the pivotal discovery in Movement E slows down subjective reading time right when the clerk is walking from the frosted office door toward the counter. The style trades real-time naturalistic speed for perceptual and emotional magnification during the arrest.',
  },
  {
    label: '7. One revision that would most improve the scene',
    finding:
      'Change the sorting table’s distance in Movement B from "four feet beyond the glass" to "eighteen inches beyond the glass, butted directly against the inner sill", and move the note "St. Jude’s — £92.10" from the printed pawn stub into Arthur’s own pencil handwriting on the back corner of the pink card. That single two-part revision would simultaneously repair the arm’s-reach spatial error and make the pawn ticket artifact completely realistic.',
  },
];

export const RESEARCH_NOTES: ResearchNoteItem[] = [
  {
    category: 'specification',
    source:
      'Twelve Ledger Technique Packs (/data/ledger-technique-packs.json, generated from idesmond11p7/The-Ledger: technique_pack_wraytracing.md through technique_pack_lyric_forge.md)',
    accessStatus: 'Read in full from workspace Ledger snapshot (all 12 markdown documents)',
    conceptExamined:
      '6-part ray model (Source -> Path -> Medium -> Surface -> Observer -> Consequence); 6-step Kinetic Syntax action chain; 3 gap modes of Subtext & Lacunae vs. 3 scales of Subtext & Ellipsis; Rest & Arrest timing; Motif lifecycle.',
    relevantClaim:
      'These twelve documents are provisional project-specific craft specifications (status: draft), not universal scientific laws or canon. They require observable physical causality and strict viewpoint boundaries.',
    concreteWritingDecision:
      'Built the central plot reversal around an optical beam-splitter effect on the Window 3 glass partition that is physically broken by the 6-step kinetic slip at the counter.',
  },
  {
    category: 'academic',
    source:
      'Manfred Jahn (2007), "Focalization," in The Cambridge Companion to Narrative (ed. David Herman, Cambridge University Press, pp. 94–108) & Cologne Narratology Framework (uni-koeln.de/~ame02/)',
    accessStatus:
      'Consulted via academic summary and indexed excerpts of Jahn’s narratological framework on Windows of Focalization and online vs. offline perception',
    conceptExamined:
      'Perspectival filtering; separation of online perception (concurrent sensory registration in the story-now) from offline perception (memory, inference, mental projection) and retrospective narrator knowledge.',
    relevantClaim:
      'A focalizer can register accurate sensory data in online perception while framing it falsely through offline inference or emotional priming.',
    concreteWritingDecision:
      'Structured Movement A/B so Julian accurately perceives the red jeweler’s rouge on Clara’s knuckle and the damp Mercer Street carton in online perception, while his mother’s phone warning drives his false theft inference without the retrospective narrator stepping in to spoil the reveal.',
  },
  {
    category: 'academic',
    source:
      'Tom Trabasso & Soyoung Suh (1993), "Understanding Text: Achieving Explanatory Coherence Through On-Line Inferences and Mental Operations in Working Memory," Discourse Processes, 16(1–2), 3–34',
    accessStatus:
      'Consulted via published abstract and psycholinguistic summaries of the four working-memory operations (maintaining, retrieving, elaborating, explaining)',
    conceptExamined:
      'On-line causal network construction and superordinate goal maintenance during narrative reading.',
    relevantClaim:
      'Readers achieve explanatory coherence by linking current actions and physical states to causal antecedents maintained or retrieved in working memory.',
    concreteWritingDecision:
      'Planted the worn central limestone/terrazzo water trough in Paragraph 1 and reactivated it in Paragraph 7 so that Julian’s hydroplaning crepe sole in Movement C has an explicit, retrievable causal antecedent.',
  },
  {
    category: 'academic',
    source:
      'Roslyn Wong, Erik D. Reichle, & Aaron Veldre (2025), "Prediction in Reading: A Review of Predictability Effects, Their Theoretical Implications, and Beyond," Psychonomic Bulletin & Review, 32(3), 973–1006 (PMCID: PMC12092549)',
    accessStatus:
      'Consulted via open-access PubMed Central summary and indexed theoretical review',
    conceptExamined:
      'Graded semantic/situational pre-activation vs. specific lexical prediction, and integration reanalysis following prediction error.',
    relevantClaim:
      'Contextual constraints prompt graded pre-activation of plausible features rather than deterministic mind-control; disconfirmed expectations require integration reanalysis.',
    concreteWritingDecision:
      'Co-activated two competing schemas in Movement B (Julian’s verbal accusation vs. the material restoration clues on Clara’s hands and box) so the Movement E reveal triggers grounded schema revision.',
  },
  {
    category: 'academic',
    source:
      'Peter Wilson (2000), Mind the Gap: Ellipsis and Stylistic Variation in Spoken and Written English (Longman / Routledge)',
    accessStatus:
      'Consulted via publisher/academic synopsis and stylistic classification overview',
    conceptExamined:
      'Classification of grammatical, situational, and conversational ellipsis across spoken and written registers.',
    relevantClaim:
      'Recoverable linguistic/situational omission in natural speech is structurally distinct from unrecoverable informational absence.',
    concreteWritingDecision:
      'Kept Julian and Clara’s situational subject-dropped dialogue ("Came straight from the lab." / "Blocks the wind.") distinct from the unrecoverable permanent lacuna of Arthur’s snapped pencil lead ("Check the false bottom before—").',
  },
  {
    category: 'academic',
    source:
      'Kerstin Barndt, "Montage," in The Routledge Encyclopedia of Modernism',
    accessStatus:
      'Consulted via Routledge Encyclopedia of Modernism article overview',
    conceptExamined:
      'Montage and collage as the juxtaposition of heterogeneous discourses and fragments whose visible seams produce irony, contradiction, or recontextualization.',
    relevantClaim:
      'Heterogeneous documents or public voices generate meaning when their collision exposes a contradiction that continuous single-voice narration would smooth over.',
    concreteWritingDecision:
      'Collided the municipal disclaimer (NO VALUATION GUARANTEED) and commercial repair stamp (PAID CASH: £140.00) with the pediatric ward pawn stub and background river-barge radio.',
  },
  {
    category: 'literary',
    source:
      'Comparative Literary Study Objects: Virginia Woolf (To the Lighthouse, Mrs Dalloway), James Joyce (Ulysses), T. S. Eliot (The Waste Land), Toni Morrison (Beloved), Cormac McCarthy (The Road)',
    accessStatus:
      'Consulted as comparative literary study objects (separating textual craft observation from scientific evidence)',
    conceptExamined:
      'Shared external perceptual anchors across estranged minds (Woolf); unsignaled sensory-triggered memory recall (Joyce); register shift across repeated phrases (Eliot); delayed moral completion of an early physical mark (Morrison); tactile trade nouns carrying emotional weight without sentimental commentary (McCarthy).',
    relevantClaim:
      'Literary precedents demonstrate compositional possibilities rather than scientific laws.',
    concreteWritingDecision:
      'Used the wall regulator’s tick—tick—catch as a Woolfian shared anchor, the rouge smudge on Clara’s knuckle as a delayed-completion detail, and trade nouns (dado groove, ferrule, baize, bleed valve) to negotiate the final reconciliation without emotional summary.',
  },
];

type TabMode = 'all' | 'snippet' | 'map' | 'evaluation' | 'audit' | 'research';

export default function Experiment01Showcase({
  onSelectTechniquePack,
  onSendPassageToWorkbench,
}: Experiment01ShowcaseProps) {
  const [experimentMode, setExperimentMode] = useState<
    'handoff_meltdown' | 'wraytracing_tanker' | 'exp01_12packs'
  >('handoff_meltdown');
  const [activeTab, setActiveTab] = useState<TabMode>('all');
  const [showXRayAnnotations, setShowXRayAnnotations] = useState<boolean>(false);
  const [copiedFullText, setCopiedFullText] = useState<boolean>(false);

  const fullSnippetPlainText = EXPERIMENT_01_BLOCKS.map((b) => b.text).join('\n\n');
  const snippetWordCount = fullSnippetPlainText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const averageScore = (
    TECHNICAL_EVALUATION.reduce((acc, item) => acc + item.score, 0) /
    TECHNICAL_EVALUATION.length
  ).toFixed(1);

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(fullSnippetPlainText);
    setCopiedFullText(true);
    setTimeout(() => setCopiedFullText(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#09090b] text-stone-200">
      <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-8">
        {/* Experiment Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-stone-800 bg-stone-950/90 font-mono text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <FlaskConical className="w-4 h-4 text-amber-400" />
            <span>Controlled Writing Experiments:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setExperimentMode('handoff_meltdown')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                experimentMode === 'handoff_meltdown'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Handoff Milestone: AK-117 Meltdown (Non-Aura Melee)</span>
            </button>
            <button
              onClick={() => setExperimentMode('wraytracing_tanker')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                experimentMode === 'wraytracing_tanker'
                  ? 'bg-emerald-500 text-stone-950 font-semibold shadow-sm'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>W-Ray Tracing: 50ft Tanker Shot (GPU Rewrite)</span>
            </button>
            <button
              onClick={() => setExperimentMode('exp01_12packs')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                experimentMode === 'exp01_12packs'
                  ? 'bg-purple-500 text-stone-950 font-semibold shadow-sm'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Experiment 01: All 12 Packs Under Load (2,200w)</span>
            </button>
          </div>
        </div>

        {experimentMode === 'handoff_meltdown' ? (
          <ResearchHandoffLab />
        ) : experimentMode === 'wraytracing_tanker' ? (
          <WraytracingSceneTest
            onSelectWraytracingPack={
              onSelectTechniquePack
                ? () => onSelectTechniquePack('ledger_technique_pack_wraytracing')
                : undefined
            }
            onSendPassageToWorkbench={onSendPassageToWorkbench}
          />
        ) : (
          <>
            {/* Top Experiment Header Card */}
            <div className="border border-amber-500/30 bg-gradient-to-br from-[#121110] via-[#0e0e11] to-[#0a0f12] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-amber-400">
              <FlaskConical className="w-4 h-4" />
              <span>Writer Experiment 01 · Live Deliverable Preview</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                Snippet: <strong className="text-amber-400">{snippetWordCount.toLocaleString()} words</strong> (Target: 1,800–2,600)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-800/60 text-emerald-300">
                12 / 12 Ledger Packs Integrated
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/50 border border-purple-800/60 text-purple-300">
                Mean Evaluation: {averageScore} / 10
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-serif text-stone-100 tracking-tight">
              The Technique Packs Under Load: A Research-Grounded Literary Demonstration
            </h1>
            <p className="text-sm text-stone-400 leading-relaxed">
              Original controlled experiment testing all twelve Ledger Technique Packs—centered on high-resolution optical &amp; material rendering (<strong>Wraytracing</strong>), strict online/offline focalization (<strong>The Camera Eye</strong>), causal action chains (<strong>Kinetic Syntax</strong>), and schema revision (<strong>Psycholinguistic Switchboard</strong>).
            </p>
          </div>

          {/* Navigation Bar for Parts A - F */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800/80">
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {[
                { id: 'all', label: 'All Sections (A–F)', icon: FileText },
                { id: 'snippet', label: 'A & B. Premise + Fiction', icon: BookOpen },
                { id: 'map', label: 'C. Execution Map (12)', icon: Layers },
                { id: 'evaluation', label: 'D. Technical Evaluation', icon: CheckSquare },
                { id: 'audit', label: 'E. Failure Audit (7)', icon: AlertTriangle },
                { id: 'research', label: 'F. Research Notes', icon: Library },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabMode)}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                        : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 border border-stone-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowXRayAnnotations((prev) => !prev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                  showXRayAnnotations
                    ? 'bg-emerald-950/70 border-emerald-600/70 text-emerald-300'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
                title="Toggle inline Movement A–F and Technique Pack annotations alongside the prose"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showXRayAnnotations ? 'X-Ray Annotations: ON' : 'Pure Reading Mode'}</span>
              </button>

              <button
                onClick={handleCopySnippet}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 flex items-center gap-1.5 transition-colors"
              >
                {copiedFullText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Fiction</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION A & B: PREMISE AND FICTIONAL SNIPPET */}
        {(activeTab === 'all' || activeTab === 'snippet') && (
          <div className="space-y-6">
            {/* Section A: Experimental Premise */}
            <section className="border border-stone-800/80 bg-[#0e0e11] rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  A. Experimental Premise
                </h2>
                <span className="text-[11px] font-mono text-stone-500">
                  Original Test Scene · Non-Canon Experimental Artifact
                </span>
              </div>
              <p className="text-sm text-stone-200 leading-relaxed font-sans">
                {EXPERIMENT_01_PREMISE}
              </p>
            </section>

            {/* Section B: Fictional Snippet */}
            <section className="border border-stone-800/80 bg-[#0c0c0f] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800/80">
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400">
                    B. Fictional Snippet ({snippetWordCount.toLocaleString()} words)
                  </h2>
                  <p className="text-xs text-stone-400 font-mono mt-0.5">
                    {showXRayAnnotations
                      ? 'Showing inline Movement A–F boundaries and active Technique Pack tags'
                      : 'Standalone literary text — click "Pure Reading Mode" above to toggle X-Ray craft tags'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
                  <span>Viewpoint: First-Person Limited (Past)</span>
                  <span>·</span>
                  <span>Movements A–F Complete</span>
                </div>
              </div>

              <div className="max-w-3xl mx-auto space-y-5">
                {EXPERIMENT_01_BLOCKS.map((block, index) => {
                  const prevMovement = index > 0 ? EXPERIMENT_01_BLOCKS[index - 1].movement : null;
                  const isNewMovement = block.movement !== prevMovement;

                  return (
                    <div key={block.id} className="space-y-3">
                      {showXRayAnnotations && isNewMovement && (
                        <div className="pt-4 pb-1 border-t border-amber-500/30 flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                            {block.movementLabel}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500">
                            Movement {block.movement}
                          </span>
                        </div>
                      )}

                      <div
                        className={
                          showXRayAnnotations
                            ? 'p-4 rounded-xl border border-stone-800/80 bg-stone-950/60 space-y-2.5'
                            : ''
                        }
                      >
                        {block.type === 'document' && (
                          <div className="my-4 px-5 py-3.5 rounded-lg border border-stone-700/80 bg-stone-900/90 font-mono text-xs text-amber-200/90 whitespace-pre-line tracking-wide leading-relaxed shadow-inner">
                            {block.text}
                          </div>
                        )}

                        {block.type === 'inscription' && (
                          <div className="my-4 pl-5 border-l-2 border-amber-500/60 font-serif italic text-lg text-stone-100 tracking-wide">
                            {block.text}
                          </div>
                        )}

                        {block.type === 'isolated' && (
                          <div className="my-4 space-y-4 font-serif text-base sm:text-[17px] leading-[1.85] text-stone-100">
                            {block.text.split('\n\n').map((para, i) => (
                              <p
                                key={i}
                                className={
                                  para === 'Shhhhk—' || para === 'CLANG.'
                                    ? 'font-mono text-sm tracking-widest text-amber-300 py-1'
                                    : ''
                                }
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        )}

                        {block.type === 'prose' && (
                          <div className="space-y-5 font-serif text-base sm:text-[17px] leading-[1.85] text-stone-200">
                            {block.text.split('\n\n').map((para, i) => (
                              <p
                                key={i}
                                className={
                                  para === 'The case was empty.' ||
                                  para === 'The case was not empty.' ||
                                  para === 'Nobody moved.' ||
                                  para === 'Tick—tick—catch.' ||
                                  para === 'Clara had.'
                                    ? 'text-stone-100 font-medium py-0.5'
                                    : ''
                                }
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        )}

                        {showXRayAnnotations && (
                          <div className="pt-2 border-t border-stone-800/70 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {block.activePacks?.map((pack) => (
                                <span
                                  key={pack}
                                  className="px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-800/60 text-emerald-300"
                                >
                                  {pack}
                                </span>
                              ))}
                            </div>
                            {onSendPassageToWorkbench && (
                              <button
                                onClick={() => onSendPassageToWorkbench(block.text)}
                                className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>Test in Technique Lab</span>
                              </button>
                            )}
                            {block.craftNote && (
                              <p className="w-full text-stone-400 font-sans text-xs mt-1">
                                <strong className="text-stone-300 font-mono">Execution Note:</strong>{' '}
                                {block.craftNote}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* SECTION C: TECHNIQUE EXECUTION MAP */}
        {(activeTab === 'all' || activeTab === 'map') && (
          <section className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  C. Technique Execution Map (All 12 Packs)
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Concrete textual decisions, functional roles, and observed limitations across all twelve Ledger Technique Packs.
                </p>
              </div>
              <span className="text-xs font-mono text-stone-400">
                Click any pack name to open it in the Technique Lab
              </span>
            </div>

            <div className="overflow-x-auto border border-stone-800 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-950/90 font-mono text-[11px] uppercase text-stone-400">
                    <th className="py-3.5 px-4 w-56">Technique Pack</th>
                    <th className="py-3.5 px-4">Concrete Passage or Decision</th>
                    <th className="py-3.5 px-4">Function in the Scene</th>
                    <th className="py-3.5 px-4">Observed Limitation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/70">
                  {TECHNIQUE_EXECUTION_MAP.map((row) => (
                    <tr key={row.number} className="hover:bg-stone-900/40 transition-colors align-top">
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-semibold text-emerald-400">
                          {row.number}. {row.packName}
                        </div>
                        <div className="text-[10px] text-stone-500 mt-0.5">{row.sourceFile}</div>
                        {onSelectTechniquePack && (
                          <button
                            onClick={() => onSelectTechniquePack(row.packId)}
                            className="mt-2 inline-flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300"
                          >
                            <span>Inspect Pack</span>
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-stone-200 leading-relaxed">
                        {row.concretePassageOrDecision}
                      </td>
                      <td className="py-3.5 px-4 text-stone-300 leading-relaxed">
                        {row.functionInScene}
                      </td>
                      <td className="py-3.5 px-4 text-amber-200/80 leading-relaxed">
                        {row.observedLimitation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION D: TECHNICAL EVALUATION */}
        {(activeTab === 'all' || activeTab === 'evaluation') && (
          <section className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400">
                  D. Technical Evaluation (12 Criteria)
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Grounded evaluation of the finished passage against the twelve Part VII criteria.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-800/60 font-mono text-xs text-purple-300">
                Composite Score: <strong>{averageScore} / 10</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TECHNICAL_EVALUATION.map((item) => (
                <div
                  key={item.number}
                  className="p-4 rounded-xl border border-stone-800/80 bg-stone-950/60 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 font-mono">
                    <span className="text-xs font-semibold text-stone-100">
                      {item.number}. {item.criterion}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        item.score >= 9
                          ? 'bg-emerald-950/60 border border-emerald-800/60 text-emerald-300'
                          : 'bg-amber-950/60 border border-amber-800/60 text-amber-300'
                      }`}
                    >
                      {item.score} / 10
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {item.evidenceAndExplanation}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION E: MANDATORY FAILURE AUDIT */}
        {(activeTab === 'all' || activeTab === 'audit') && (
          <section className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400">
                E. Mandatory Failure Audit
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Explicit diagnostic audit exposing spatial discrepancies, decorative phrasing, and trade-offs in the first complete experiment.
              </p>
            </div>

            <div className="space-y-3">
              {FAILURE_AUDIT.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border border-amber-900/40 bg-stone-950/70 space-y-1.5"
                >
                  <div className="text-xs font-mono font-semibold text-amber-300">
                    {item.label}
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">{item.finding}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION F: RESEARCH NOTES */}
        {(activeTab === 'all' || activeTab === 'research') && (
          <section className="border border-stone-800/80 bg-[#0e0e11] rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400">
                F. Research Notes &amp; Epistemic Provenance
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Separates project-specific draft specifications, academic psycholinguistic/narratological sources, and comparative literary study objects.
              </p>
            </div>

            <div className="space-y-4">
              {RESEARCH_NOTES.map((note, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-stone-800/80 bg-stone-950/60 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                    <span className="font-semibold text-sky-300">{note.source}</span>
                    <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">
                      {note.accessStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60">
                      <span className="block font-mono text-[10px] uppercase text-stone-400 mb-1">
                        Concept Examined
                      </span>
                      <p className="text-stone-300 leading-relaxed">{note.conceptExamined}</p>
                    </div>
                    <div className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60">
                      <span className="block font-mono text-[10px] uppercase text-stone-400 mb-1">
                        Relevant Claim / Argument
                      </span>
                      <p className="text-stone-300 leading-relaxed">{note.relevantClaim}</p>
                    </div>
                    <div className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60">
                      <span className="block font-mono text-[10px] uppercase text-emerald-400 mb-1">
                        Concrete Writing Decision
                      </span>
                      <p className="text-stone-200 leading-relaxed">
                        {note.concreteWritingDecision}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
          </>
        )}
      </div>
    </div>
  );
}
