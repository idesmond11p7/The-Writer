'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  GitBranch,
  Brain,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  Eye,
  Sliders,
  Volume2,
  Lock,
  Zap,
  Compass,
} from 'lucide-react';

export const BLOCK_1_DATA = {
  rawData:
    'A courier slips on wet iron steps, catches a handrail, drops a metal canister, and listens to it bounce down into the dark.',
  profileA: {
    title: 'Profile A: High-Velocity Paratactic Strike',
    subtitle: 'Four independent clauses, coordinate conjunctions stripped, monosyllabic terminal stops.',
    text: 'His boots skidded on the wet iron steps. His hand clamped the cold rail. The metal canister tore from his grip. He listened to it bounce down into the dark.',
    clauses: [
      { text: 'His boots skidded on the wet iron steps.', meter: '8 syllables', stop: 'steps (/s/ + /p/ cluster)', function: 'Immediate friction failure on the wet tread.' },
      { text: 'His hand clamped the cold rail.', meter: '7 syllables', stop: 'rail (/l/ liquid)', function: 'Direct reflex grab arresting body momentum.' },
      { text: 'The metal canister tore from his grip.', meter: '11 syllables', stop: 'grip (/p/ hard stop)', function: 'Sudden shock-load jars the canister loose.' },
      { text: 'He listened to it bounce down into the dark.', meter: '11 syllables', stop: 'dark (/k/ hard stop)', function: 'Stationary listening stance tracking the continuing acoustic bounce.' },
    ],
  },
  profileB: {
    title: 'Profile B: Cumulative Fluid Period',
    subtitle: 'Single right-branching sentence carrying the slip, recovery, and acoustic bounce in one syntactic breath.',
    text: 'Tomas caught the handrail as his boots skidded on the wet iron steps, the sudden jolt of his weight wrenching the metal canister from his other hand and sending it into the dark below, where he hung listening to it bounce away down the stairs.',
    branches: [
      { type: 'Main Clause (Anchor)', content: 'Tomas caught the handrail', function: 'Grounds the character and recovery action upfront.' },
      { type: 'Subordinate Temporal Clause', content: 'as his boots skidded on the wet iron steps', function: 'Establishes the loss of traction on the wet surface.' },
      { type: 'Absolute Participial Phrase', content: 'the sudden jolt of his weight wrenching the metal canister from his other hand', function: 'Makes the release physically intelligible through shock-load transfer.' },
      { type: 'Participial Trailing Clause', content: 'and sending it into the dark below', function: 'Launches the canister down into the unlit space.' },
      { type: 'Relative Acoustic Clause', content: 'where he hung listening to it bounce away down the stairs', function: 'Preserves the courier’s stationary listening stance and the continuing acoustic decay.' },
    ],
  },
  corrections: [
    {
      title: '1. Non-Deterministic Phonetic Texture',
      detail:
        'Phonetic qualities interact with syntax, meter, and semantics. Consonant stops do not automatically freeze action, nor do liquids automatically create lingering mood; the felt cadence emerges from the whole sentence in context.',
    },
    {
      title: '2. Given–New as a Strategic Tool, Not a Dogma',
      detail:
        'Theme–Rheme and Ground-before-Figure provide stability in complex spaces, but Figure-first syntax is superior when staging sudden kinetic surprise or immediate agentive focus.',
    },
    {
      title: '3. Full Event-Fidelity & Physical Intelligibility',
      detail:
        'Eliminated invented details (three flights down, flat rock). Profile B explicitly explains the canister release via the shock of falling body weight rather than accidental magic.',
    },
  ],
};

export const BLOCK_2_DATA = {
  premise:
    'A character approaches a security hatch. It appears closed. The character tries the handle, but it will not move. Sensory evidence in the surrounding environment allows the reader to infer that the hatch is locked from the other side before the character consciously recognizes the implication.',
  passage: [
    `Tomas reached the dead end of the utility cutting where the conduit entered a square concrete bulkhead. The iron hatch set into the collar stood flush with the frame, its heavy dog-lever resting horizontal across the seam. While the conduit walls were crusted with dry saltpeter and peeling paint, the hinge pins of the hatch showed clean steel, and a thin halo of wet machine oil darkened the concrete around the latch-spindle.`,
    `He caught the lever with his gloved right hand and pulled downward. The handle rotated an inch through the loose mechanical play of the linkage, then struck a dead, immovable stop with a heavy, muffled clunk. Assuming the latch dogs were sticking in the damp gaskets, Tomas planted his boots against the concrete lip, braced his left shoulder against the door plate, and bore down on the lever with his full weight.`,
    `Through the cold iron under his shoulder, a faint jolt traveled up his collarbone—not the flex of the steel door, but a sharp metallic click directly behind the keyway, followed by the dull scrape of rubber soles shifting on gravel on the other side. As he strained against the lever, the handle did not budge further, but the iron plate vibrated with a second, heavier thump as a drop-bar seated firmly into its bracket.`,
    `Tomas stopped pulling. He did not release the lever to let it snap back against the housing; he kept his shoulder pinned to the plate, his knuckles white around the grip, slowly bleeding off the tension until the handle rested back in its horizontal keeper without a sound. He eased his boots off the wet lip and backed two strides into the darkness of the cutting.`,
  ],
  auditItems: [
    {
      heading: '1. Information Progression',
      content:
        'Visual discrepancy (clean steel pins + wet machine oil in an abandoned corridor) → tactile mechanical feedback (1-inch slack before a solid stop) → acoustic/vibrational evidence under pressure (rubber soles scuffing gravel + drop-bar thumping into bracket) → behavioral recognition (silent tension release + retreat).',
    },
    {
      heading: '2. What the Reader Infers at Each Stage',
      content:
        'The reader suspects the door is actively serviced before Tomas touches it; recognizes that an internal bar blocks the mechanism when it gives one inch; and confirms a human presence on the other side when footsteps scuff and the bar is re-seated under load.',
    },
    {
      heading: '3. What the Character Knows at Each Stage',
      content:
        'Tomas initially assumes an ordinary service portal; interprets the stop as stiff/swollen damp gaskets; and only realizes someone is inches away on the other side when the footstep and drop-bar counter-pressure transmit through his shoulder.',
    },
    {
      heading: '4. Decisive Physical Evidence',
      content:
        'Wet machine oil halo; one-inch linkage play; heavy crosswise clunk vs. rusted seizure; rubber scuffing gravel through the plate; drop-bar settling under tension.',
    },
    {
      heading: '5. Preserved Ambiguities',
      content:
        'Identity and hostility of the person on the other side; whether they know it was an intruder or thought it was a shifting pipe; layout of the unpaved space beyond.',
    },
    {
      heading: '6. Self-Audit',
      content:
        'Naming "rubber soles shifting on gravel" is a decisive clue that borders on high obviousness, but guarantees the physical situation model resolves cleanly without confusion. Vibration transmission through steel plate is physically credible.',
    },
  ],
};

export const BLOCK_3_DATA = {
  premise:
    'A runner is pursued through an industrial alley and clears a chain-link fence.',
  specification: {
    setting: 'A 12-foot-wide service alley flanked by blind brick masonry (left) and corrugated metal siding (right), terminating twenty paces (approx. 50 feet) ahead at a dead-end fence.',
    illumination: 'High-mounted amber sodium vapor pack on the left wall (stationary ambient pool) + a mobile white halogen lantern carried at waist height by two pursuers entering from 50 feet behind at the alley mouth. The beam sweeps forward past the runner\'s legs, cutting through puddle spray and washing the wet asphalt in hard white glare.',
    pursuit: 'Exactly two pursuers on foot wearing heavy work boots, splashing through entrance puddles 50 feet back. No motor vehicles.',
    fenceAndTerrain: 'A 7-foot commercial galvanized chain-link fence on a horizontal tubular steel top rail; level asphalt grade on both sides; far side is a wet asphalt container yard.',
    mechanics: '9-step biomechanical sequence: (1) Three-stride launch; (2) Right boot toe hooks diamond mesh at 3ft; (3) Dual palms clamp 7ft pipe rail; (4) Chest hauled to rail; (5) Right leg swings over pipe; (6) Trailing left foot whipped clear of wire; (7) Palms push off rail to clear fence; (8) Body descends through 5ft vertical freefall; (9) Forefeet land on wet asphalt with knee/shin flexion; forward sprint resumes.',
    geometryExplanation: 'Distance to fence is twenty paces (~50 ft). Pursuers are 50 ft behind. Rather than asserting an unsupported ground-shadow projection across the 50-foot distance to the fence, both passages depict the direct observable lighting effects: the halogen beam rakes past the runner\'s legs, illuminates flying puddle spray, and catches the wet surfaces of the alley walls and macadam ahead.',
    fallExplanation: 'Rail height is established at 7.0 ft (84 in). At the crest, hands press the pipe rail (7.0 ft) and pelvis clears at ~7.2 ft. The runner executes an athletic push-off vault: palms press downward and away from the pipe to clear the fence. At release, hands break contact at 7.0 ft and torso clears downward; boot displacement places soles at approximately 4.5 to 5.0 ft above the asphalt as freefall begins. The five-foot descent is retained as a chosen scene specification representing the vertical travel of the boot soles during freefall, with center-of-mass displacement estimated at ~4.0 ft (from ~7.5 ft at crest to ~3.5 ft at knee-flexed landing compression, with ±0.5 ft operational variance based on leg tuck angle).',
  },
  profileA: {
    title: 'Profile A: Severe Kinetic Compression (Final)',
    subtitle: 'Prioritizing immediate momentum, physical resistance, mechanical vectors, and consequential transitions without narrative padding.',
    wordCount: 170,
    text: `The gravel gave under his boots. Behind him, two pairs of work soles hit the puddles at the alley mouth, and a white halogen beam swept past his hips, flaring across the wet brick and lighting the spray ahead. The lane ended twenty paces ahead at a seven-foot chain-link fence bolted to a steel pipe rail. He didn't shorten his stride. Three strides out, he drove the toe of his right boot into the diamond mesh three feet up and caught the cold top pipe with both palms. The galvanized wire screeched and bellied into the dark under his momentum. He hauled his chest to the rail, swung his right leg over the pipe, and whipped his trailing left foot across the bar. Pressing both palms against the steel, he shoved clear of the rail and dropped five feet to the wet asphalt, taking the impact on his forefeet with knees flexing to damp the hit. His left knuckles grazed the grit. He drove up off his thighs and sprinted into the container yard as the first pursuing boot slammed into the wire behind him.`,
    clauses: [
      { beat: 'Step 1 & 2: Substrate & Dual Pursuit', detail: 'Friction loss on gravel; acoustic arrival of two pursuing work soles; sweeping halogen beam lighting spray and wet brick.' },
      { beat: 'Step 3: Geometry & 20-Pace Target', detail: 'Lane ends 20 paces ahead at a 7-foot chain-link fence on tubular steel pipe rail.' },
      { beat: 'Step 4: Launch & 3ft Mesh Purchase', detail: 'Maintained stride; 3-stride launch; right boot toe hooks mesh at 3ft; palms clamp 7ft pipe.' },
      { beat: 'Step 5: Elastic Wire Resistance', detail: 'Galvanized wire screeches and bellies outward under momentum.' },
      { beat: 'Step 6: Torso Haul & Both Legs Crossing', detail: 'Chest hauled to rail; right leg swings over pipe; trailing left foot whipped across the bar.' },
      { beat: 'Step 7: Push-off & 5ft Freefall', detail: 'Palms press steel, shoving clear of rail; 5ft vertical drop to wet asphalt.' },
      { beat: 'Step 8 & 9: Forefoot Touchdown & Sprint', detail: 'Forefeet take impact with knee flexion; left knuckles graze grit; thigh drive into container yard as pursuer hits wire.' },
    ],
  },
  profileB: {
    title: 'Profile B: Lyrical Atmospheric Traversal (Final)',
    subtitle: 'Prioritizing environmental presence, spatial volume, visual composition, material resonance, and the runner’s embodiment within the industrial terrain.',
    wordCount: 295,
    text: `The alley ran narrow between windowless masonry and wet corrugated siding, smelling of coal-smoke and stagnant gutter wash. High on the left wall, an amber sodium pack spilled a greasy yellow fan of light across the broken macadam; behind him, at the mouth of the lane, two sets of heavy boots splashed through the entrance puddles, and their white halogen beam raked forward from fifty feet back, catching the flying spray of his heels and washing the wet macadam in hard white glare. The fence stood seven feet high across the dead end twenty paces out, its galvanized mesh beaded with drizzle, its tubular steel top rail catching the collision of amber sodium and sweeping white glare. He measured their closing pace by the double-time slap of work boots against wet stone. Three strides from the wire, he launched, driving the toe of his right boot into the mesh diamonds and locking both hands over the icy pipe. The fence took his weight with a deep, ringing twang that echoed off the corrugated metal. He drew his chest to the rail, swung his right leg over the galvanized bar, and whipped his trailing foot clear of the wire. For a suspended heartbeat at the crest, balanced on his palms atop the seven-foot rail, the wet expanse of the container yard opened before him in rows of dark, quiet hulls; then he shoved off the pipe and dropped five feet through the mist. His forefeet struck the wet asphalt with a dull, flat slap, his knees buckling to take the downward heave of his mass. He touched one palm to the wet grit, found his balance in the dark, and surged forward between the stacked steel boxes while the struck fence behind him continued to hum in the sweeping light.`,
    resonances: [
      { layer: 'Spatial Volume & Olfactory Grounding', detail: 'Canyon of wet corrugated siding and windowless brick; coal-smoke and stagnant gutter wash.' },
      { layer: 'Dichromatic Lighting & Spray Glare', detail: 'Stationary amber sodium pack on left wall vs. mobile white halogen beam from 50ft back, catching spray of heels and glazing wet macadam.' },
      { layer: 'Acoustic Tracking of Foot Pursuit', detail: 'Closing pace measured by the double-time slap of work boots against wet stone.' },
      { layer: 'Complete 9-Step Biomechanical Crossing', detail: 'Three-stride launch -> right boot in mesh -> hands on pipe -> chest drawn to rail -> right leg over -> trailing foot whipped clear -> palm push-off.' },
      { layer: 'Held Suspension & Spatial Vista', detail: 'Rest & Arrest at crest: momentary pause on palms atop the 7ft rail revealing rows of dark, quiet container hulls.' },
      { layer: '5ft Descent & Decaying Resonance', detail: 'Drop through 5ft of mist; forefeet strike asphalt with flat slap; knees absorb downward heave; struck wire hums in sweeping beam.' },
    ],
  },
  verificationMatrix: [
    {
      metric: 'Pursuit: Two men on foot with halogen lantern 50ft back',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages explicitly establish two pairs/sets of work boots at the alley mouth and a white halogen beam sweeping forward from behind.',
    },
    {
      metric: 'Distance: Twenty paces (~50ft) to the dead-end fence',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages specify "twenty paces" to the dead-end fence, aligning with the 50-foot gap to the obstacle.',
    },
    {
      metric: 'Illumination: Fixed amber sodium lamp on left wall',
      profileA: 'Omitted by stylistic choice',
      profileB: 'Present and consistent',
      analysis: 'Profile A omits the stationary wall pack to concentrate exclusively on the pursuers\' sweeping beam and immediate spray/brick surfaces. Profile B articulates the full dichromatic collision.',
    },
    {
      metric: 'Observable Lighting: Halogen beam raking from rear',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages establish the observable lighting effect: beam sweeps forward, illuminates spray and wet pavement/brick ahead, and avoids unsupported ground-shadow projections.',
    },
    {
      metric: 'Fence: 7ft height with tubular steel top rail',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages explicitly state "seven-foot chain-link fence" and "tubular steel top rail". Profile B identifies the crest as "atop the seven-foot rail" without implying a 7ft fall.',
    },
    {
      metric: 'Launch Measurement: Standardized to "three strides"',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages consistently use "Three strides" ("Three strides out" in Profile A; "Three strides from the wire" in Profile B).',
    },
    {
      metric: 'Crossing: Right toe at 3ft -> hands on rail -> chest to rail',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages establish the three-stride launch, right boot toehold in mesh diamonds, and both palms locking onto the pipe.',
    },
    {
      metric: 'Biomechanics: Right leg crosses -> trailing left leg clears wire',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages explicitly account for both legs: right leg swings over, trailing left foot is whipped across/clear of the bar.',
    },
    {
      metric: 'Drop: 5ft vertical freefall descent to wet asphalt',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages specify a 5ft drop from the push-off release to the wet asphalt, representing the chosen scene specification for boot-sole freefall descent.',
    },
    {
      metric: 'Impact: Forefeet landing with knee flexion + balance touch',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages detail forefeet striking asphalt, knees buckling/flexing to damp the load, and hand/knuckle contact with grit.',
    },
    {
      metric: 'Destination: Asphalt apron of container yard with stacked boxes',
      profileA: 'Present and consistent',
      profileB: 'Present and consistent',
      analysis: 'Both passages terminate in the container yard; Profile B further specifies "between the stacked steel boxes".',
    },
  ],
  audit: [
    {
      title: '1. Resolution of the Seven-Foot Rail / Five-Foot Drop Relationship',
      profileA: 'The 7ft rail establishes the physical boundary height. Because the runner executes a push-off vault rather than a hang-drop, his feet break contact at approximately 4.5–5.0ft above the pavement, resulting in a 5ft freefall descent.',
      profileB: 'Explicitly identifies the crest as "balanced on his palms atop the seven-foot rail", removing the implication of a 7ft fall while establishing the 5ft drop through mist to the asphalt.',
    },
    {
      title: '2. Observable Lighting Effects vs. Unsupported Shadow Projections',
      profileA: 'Text establishes the observable lighting: "a white halogen beam swept past his hips, flaring across the wet brick and lighting the spray ahead." Completely removes ungrounded shadow projection assertions.',
      profileB: 'Text establishes the observable lighting: "catching the flying spray of his heels and washing the wet macadam in hard white glare." Eliminates unsupported shadow-throw claims.',
    },
    {
      title: '3. Standardized Launch Measurement',
      profileA: 'Uses "Three strides out", standardized with the shared specification and Profile B.',
      profileB: 'Uses "Three strides from the wire", standardized with the shared specification and Profile A.',
    },
    {
      title: '4. Actual Text vs. Intended Design (Figurative Language Audit)',
      profileA: 'Zero ornamental similes. Retains functional mechanical idioms: "gravel gave" (traction loss), "damp the hit" (mechanical shock absorption).',
      profileB: 'Materially grounded sensory figuration: "greasy yellow fan", "deep, ringing twang", "suspended heartbeat", "dark, quiet hulls". Anchored strictly in physical materials.',
    },
  ],
};

export const BLOCK_4_DATA = {
  premise:
    'A courier traverses an exposed, unrailed industrial catwalk forty yards along the exterior brick wall of a municipal pumping substation at twilight beside an urban canal basin. A sudden electrical fault/transformer arc flash erupts thirty paces out from the access door, knocking him toward the twelve-foot drop. He arrests his forward momentum by locking onto a cantilevered steel support bracket two feet short of the exposed culvert span, holding in stillness as the four tripped turbines die and unmask the roaring weir water below.',
  spatialCorrection: {
    defect:
      'The previous draft stated "thirty paces short of the culvert span", which placed Tomas 75+ feet away from the bracket, creating an inexplicable spatial leap before catching it in two sliding steps.',
    resolution:
      'Reconciled to: "thirty paces out from the access door, closing on the exposed culvert span". In a 120-foot (40-yard) total run with the culvert beginning at 80 ft and the bracket at 78 ft, thirty paces (~75 ft) places Tomas exactly 3 to 5 feet from the bracket, making the two-step slide and angle-iron catch physically and geometrically seamless.',
  },
  passage: [
    `Tomas kept his weight forward, boots taking the wet diamond grating in a steady, rhythmic clip thirty paces out from the access door, closing on the exposed culvert span. To his left, the blank brickwork of the pumping substation rose two storeys into the drizzling twilight, sweating dark runnels of soot-stained water; twelve feet below to his right, the black canal basin churned under the outfall sluices, its hollow suck masked almost entirely by the heavy sixty-cycle drone of the substation’s four cooling turbines vibrating through the steel brackets beneath his soles. His courier satchel rode high and flat between his shoulder blades, held tight against his ribs by its crossed webbing as he set his eyes on the culvert crossing forty yards out.`,
    `Ten paces short of the intake, the night split open with a sound like tearing sheet brass. Above the brick parapet, a step-down insulator ruptured with a blue-white arc flash that instantly vaporized the twilight, throwing the diamond pattern of the catwalk onto the canal below in hard, vibrating relief and burning every drop of suspended mist into incandescent needle-points. The acoustic shockwave hammered Tomas across the chest like an iron plank. An instant later, the substation’s main circuit breakers slammed open with a concussive double-crack, and the four turbine shafts seized under emergency regenerative braking, their sixty-cycle drone dying in a violent downward groan that stripped all ambient sound from the basin in half a heartbeat.`,
    `The blast knocked Tomas half a step sideways toward the void. His left heel caught the slick iron margin of the grating, skidded two inches through wet sludge, and shot into empty air above the twelve-foot drop. He pitched forward, boots pedaling against the diamond mesh as friction broke across the waterlogged iron, took two desperate, sliding steps across the slick grating, and threw his upper body into the blind masonry wall. His gloved hands struck cold angle iron: the heavy gusset plate of a cantilevered support bracket bolted into the brick two feet short of the exposed culvert. He clamped both palms around the flange, his chest slamming against the wet brick as his boots found purchase against the angle iron, arresting his forward momentum with his heels hanging over the sheer canal edge.`,
    `Nobody moved in the basin. The violent cessation of the turbines left an echoing vacuum into which the city’s unmasked sounds immediately rushed back: the cold, hollow churning of the weir sluices twelve feet beneath him, the heavy splatter of raindrops slapping the oily canal surface, and the distant, rhythmic thrum of diesel engines idling three wharves down. From the shattered parapet fifteen feet overhead, a coil of scorched dielectric oil smoke billowed out in white, sulfurous clouds, drifting through the drizzle with the sharp, metallic sting of freshly generated ozone. A loose brass washer pinged off the upper brickwork, bounced twice off the catwalk mesh six inches from his forearm, and disappeared into the churning black water below.`,
    `Tomas stayed pinned against the brick for four ragged breaths, his pulse hammering against his ribs in time with the weir water. He bled off the tension in his forearms slowly, testing the bracket’s anchor bolts with his weight before shifting his boots back onto the secure diamond grating. He reached back with his right hand, confirmed the canvas flap of the satchel was still buckled flat to his spine, and drew his breath through his teeth. Ahead of him, forty feet through the rising oil smoke and the gray rain, the unrailed catwalk ran clear across the culvert span toward the sodium-lit access ladder of the north sluice gate. He wiped the sulfur grease from his brow with the back of his sleeve, set his shoulder to the brick, and pushed off into the dark.`,
  ],
  comprehensionBlueprint: {
    spatialModel: [
      { element: 'Catwalk Geometry', metric: '40 yards (120 ft) total length, 28 inches wide, unrailed, galvanized diamond mesh.' },
      { element: 'Elevation & Lateral Bounds', metric: 'Left: Blind 2-storey brick substation wall. Right: 12-foot sheer drop to black canal basin.' },
      { element: 'Initial Position', metric: '30 paces (~75 ft) out from the south access door, moving north.' },
      { element: 'Obstacle / Goal Target', metric: 'Exposed culvert intake span beginning at 80 ft (approx. 32 paces out).' },
      { element: 'Arrest Anchor', metric: 'Cantilevered steel angle-iron bracket at 78 ft (2 ft short of culvert), bolted to masonry.' },
      { element: 'Kinetic Slide Vector', metric: 'Blast deflects him right; 2 sliding steps (4–5 ft) forward/left into brick, clamping bracket at 78 ft.' },
    ],
    crossModalMatrix: [
      { sensoryChannel: 'Visual Field', progression: 'Subdued twilight drizzle → 5800K blue-white arc flash projecting diamond shadow onto water → flash-blindness & silhouette relief → drifting sulfurous white smoke under distant sodium city glow.' },
      { sensoryChannel: 'Acoustic Architecture', progression: 'Masking 85dB 60-cycle turbine hum → concussive 110dB arc detonation & breaker double-crack → sudden emergency brake deceleration to 0dB → unmasked 72dB weir churn, water slapping, diesel thrum.' },
      { sensoryChannel: 'Material & Kinetic', progression: 'Steady rhythmic friction on diamond mesh → sideways blast shockwave → left heel over void → 2-step dynamic hydroplane slide → chest slamming brick → static clamp on cold gusset flange.' },
      { sensoryChannel: 'Olfactory & Thermal', progression: 'Damp river mist & soot runnels → instant searing flash heat → thick scorched dielectric transformer oil smoke → sharp metallic ozone sting.' },
    ],
    workingMemoryCurve: [
      { phase: '1. Pacing Goal', readerState: 'Maintains forward courier vector, awareness of the 12ft drop and loud turbines.' },
      { phase: '2. Disruptive Detonation', readerState: 'Working memory overloaded by concurrent visual flash, acoustic blast, and mechanical turbine failure.' },
      { phase: '3. Survival Arrest', readerState: 'Attentional aperture narrows strictly to boot slip, 2-step slide, and manual clamp on steel bracket.' },
      { phase: '4. Sensory De-masking', readerState: 'Turbine silence creates cognitive space; unmasked weir churn and rain provide relief and orientation.' },
      { phase: '5. Mission Reset', readerState: 'Checks satchel, inspects remaining 40ft culvert span, and re-engages forward movement.' },
    ],
  },
  auditItems: [
    {
      heading: '1. Spatial Reference Reconciliation',
      content:
        'The original draft stated "thirty paces short of the culvert span", which placed Tomas 75+ feet away from the bracket, creating an inexplicable spatial leap before catching it in two steps. Reconciling the spatial baseline to "thirty paces out from the access door, closing on the exposed culvert span" places Tomas at ~75 feet along the 120-foot catwalk, putting him within 3 to 5 feet of the support bracket at 78 ft, making the 2-step slide and bracket catch physically and geometrically seamless.',
    },
    {
      heading: '2. The Acoustic De-Masking Mechanism',
      content:
        'The four cooling turbines produce a dominant masking noise (60-cycle electrical drone). When the emergency breakers trip, the masking sound ceases instantly. Because human auditory processing relies on relative amplitude, the cessation does not produce silence; rather, it unmasks the low-frequency acoustic energy of the weir sluice and falling rain that was previously submerged.',
    },
    {
      heading: '3. Strict Register Firewall & Character-Grounding',
      content:
        'Zero academic, neurological, or computer-graphics terms ("saccade", "photoreceptor", "W-Raytracing", "Theme-Rheme", "proprioception") appear in the narrative prose. All sensory data is delivered through Tomas\'s embodied, lived perceptions (the jolt in his chest, iron under his palms, ozone in his throat, boots finding grip).',
    },
    {
      heading: '4. Rest & Arrest Integrity',
      content:
        'Paragraph 4 demonstrates the core principle of Rest & Arrest: Tomas\'s movement is suspended in stillness against the brick wall, but the surrounding world systems do NOT freeze—the smoke billows, the rain splatters, the weir churns, and a brass washer falls and pings off the grating. Character velocity is zero; world velocity continues at normal speed.',
    },
  ],
};

export default function TrainProseLab() {
  const [activeTab, setActiveTab] = useState<'block4' | 'block3' | 'block2' | 'block1' | 'curriculum'>('block4');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="border border-indigo-500/30 bg-gradient-to-br from-[#0e0f1a] via-[#0d1017] to-[#12111a] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-indigo-400">
            <GraduationCap className="w-4 h-4" />
            <span>TRAIN-PROSE-001 · Intensive Prose Training Deployment</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Block 1: PASSED</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Block 2: PASSED</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Block 3: PASSED</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/60 text-amber-300 flex items-center gap-1.5 animate-pulse">
              <Zap className="w-3.5 h-3.5" />
              <span>Block 4: VERIFIED</span>
            </span>
          </div>
        </div>

        <div className="space-y-2 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-100 tracking-tight">
            TRAIN-PROSE-001: Applied Methodology &amp; Multi-System Integration
          </h1>
          <p className="text-sm text-stone-400 leading-relaxed">
            Transitioning from mechanical compliance to deliberate artistic selection across four progressive blocks: clausal syntax, reader working memory, stylistic range, and integrated multimodal execution.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800/80">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setActiveTab('block4')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'block4'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Block 4: The Substation Surge (Multi-System)</span>
            </button>
            <button
              onClick={() => setActiveTab('block3')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'block3'
                  ? 'bg-rose-500 text-stone-950 font-bold shadow-md shadow-rose-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Block 3: The Industrial Alley (Stylistic Range)</span>
            </button>
            <button
              onClick={() => setActiveTab('block2')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'block2'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Block 2: The Security Hatch (Reader Inference)</span>
            </button>
            <button
              onClick={() => setActiveTab('block1')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'block1'
                  ? 'bg-indigo-500 text-stone-950 font-semibold shadow-sm'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Block 1: Wet Iron Steps (Profiles A &amp; B)</span>
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'curriculum'
                  ? 'bg-sky-500 text-stone-950 font-semibold shadow-sm'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Curriculum &amp; 10 Governing Corrections</span>
            </button>
          </div>
        </div>
      </div>

      {/* BLOCK 4 VIEW */}
      {activeTab === 'block4' && (
        <div className="space-y-6">
          {/* Main Narrative Submission */}
          <section className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#18140f] via-[#110f0d] to-[#0c0b0f] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Block 4 Approved Submission
                  </span>
                  <h2 className="text-xl font-serif text-stone-100">
                    The Substation Surge: Dynamic Multi-System Integration
                  </h2>
                </div>
                <p className="text-xs text-stone-400">
                  Targeted Correction Verified: Spatial baseline reconciled to 30 paces out from access door, closing on the bracket.
                </p>
              </div>

              <button
                onClick={() => handleCopy('block4_full', BLOCK_4_DATA.passage.join('\n\n'))}
                className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-mono transition-colors flex items-center gap-2"
              >
                {copiedId === 'block4_full' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Passage</span>
                  </>
                )}
              </button>
            </div>

            {/* Targeted Correction Callout */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs space-y-2">
              <div className="font-mono text-amber-300 uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Targeted Correction Applied: Spatial Reference &amp; Movement Continuity</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-rose-400 font-mono text-[10px] uppercase block">Defect Resolved:</span>
                  <p className="text-stone-300 leading-relaxed">{BLOCK_4_DATA.spatialCorrection.defect}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-emerald-400 font-mono text-[10px] uppercase block">Spatial Verification:</span>
                  <p className="text-stone-300 leading-relaxed">{BLOCK_4_DATA.spatialCorrection.resolution}</p>
                </div>
              </div>
            </div>

            {/* Narrative Passage */}
            <div className="space-y-4 bg-stone-950/80 p-6 sm:p-8 rounded-xl border border-stone-800 font-serif text-base sm:text-[17px] leading-relaxed text-stone-100">
              {BLOCK_4_DATA.passage.map((para, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80 font-bold block">
                    Paragraph {idx + 1}
                  </span>
                  <p>{para}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Three-Part Comprehension Blueprint */}
          <section className="rounded-2xl border border-stone-800 bg-[#0e0f14] p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Part 1: Three-Part Comprehension Blueprint</span>
              </div>
              <h2 className="text-xl font-serif text-stone-100 mt-1">
                Spatial Model, Multi-Modal Sensory Matrix &amp; Working-Memory Curve
              </h2>
            </div>

            {/* Part A: Spatial Model */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>A. Spatial Model &amp; Vector Continuity</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {BLOCK_4_DATA.comprehensionBlueprint.spatialModel.map((item, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                    <span className="font-mono text-amber-400 font-semibold text-[11px] block">{item.element}</span>
                    <p className="text-stone-300 leading-relaxed font-sans">{item.metric}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Part B: Cross-System Multi-Modal Sensory Matrix */}
            <div className="space-y-3 pt-4 border-t border-stone-800/80">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>B. Cross-Modal Sensory Matrix</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {BLOCK_4_DATA.comprehensionBlueprint.crossModalMatrix.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1.5">
                    <span className="font-mono text-sky-400 font-semibold text-[11px] block">{item.sensoryChannel}</span>
                    <p className="text-stone-300 leading-relaxed font-sans">{item.progression}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Part C: Reader Working Memory Curve */}
            <div className="space-y-3 pt-4 border-t border-stone-800/80">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span>C. Reader Attention &amp; Working-Memory Curve</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                {BLOCK_4_DATA.comprehensionBlueprint.workingMemoryCurve.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
                    <span className="font-mono text-purple-400 font-semibold text-[10px] block">{item.phase}</span>
                    <p className="text-stone-300 leading-relaxed text-[11px] font-sans">{item.readerState}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Part 3: Craft & Evidential Audit */}
          <section className="rounded-2xl border border-stone-800 bg-[#0e0f14] p-6 sm:p-8 space-y-5">
            <div className="border-b border-stone-800 pb-4">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Part 3: Craft &amp; Evidential Self-Audit</span>
              </div>
              <h2 className="text-xl font-serif text-stone-100 mt-1">
                Verification of Physical, Acoustic &amp; Register Integrity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BLOCK_4_DATA.auditItems.map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
                  <div className="text-xs font-mono font-semibold text-emerald-300 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.heading}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-5 font-sans">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* BLOCK 3 VIEW */}
      {activeTab === 'block3' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-rose-500/40 bg-gradient-to-b from-[#180f14] to-[#0d0c10] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Block 3 Remediation Submission
                  </span>
                  <h2 className="text-xl font-serif text-stone-100">
                    The Industrial Alley: Severe Kinetic Compression vs. Lyrical Atmospheric Traversal
                  </h2>
                </div>
                <p className="text-xs text-stone-400">
                  Shared physical event: A runner is pursued through an industrial alley by two men on foot and clears a seven-foot chain-link fence into a container yard.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy('both', `--- PROFILE A: SEVERE KINETIC COMPRESSION ---\n\n${BLOCK_3_DATA.profileA.text}\n\n--- PROFILE B: LYRICAL ATMOSPHERIC TRAVERSAL ---\n\n${BLOCK_3_DATA.profileB.text}`)}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-stone-300 flex items-center gap-1.5"
                >
                  {copiedId === 'both' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Both Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Both Passages</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Shared Event & Continuity Specification Card */}
            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-mono text-amber-400 uppercase tracking-wider text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Shared Physical Event Specification (Strict Continuity Baseline)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px] pt-1">
                <div className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60 space-y-1">
                  <span className="text-stone-400 font-mono block uppercase text-[10px]">Alley Setting</span>
                  <p className="text-stone-200">{BLOCK_3_DATA.specification.setting}</p>
                </div>
                <div className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60 space-y-1">
                  <span className="text-stone-400 font-mono block uppercase text-[10px]">Illumination Geometry</span>
                  <p className="text-stone-200">{BLOCK_3_DATA.specification.illumination}</p>
                </div>
                <div className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60 space-y-1">
                  <span className="text-stone-400 font-mono block uppercase text-[10px]">Pursuit (On Foot)</span>
                  <p className="text-stone-200">{BLOCK_3_DATA.specification.pursuit}</p>
                </div>
                <div className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60 space-y-1">
                  <span className="text-stone-400 font-mono block uppercase text-[10px]">Obstacle &amp; Drop</span>
                  <p className="text-stone-200">{BLOCK_3_DATA.specification.fenceAndTerrain}</p>
                </div>
              </div>
            </div>

            {/* Side-by-Side Dual Profiles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile A */}
              <div className="p-6 rounded-xl bg-stone-950/80 border border-rose-900/40 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold">
                        {BLOCK_3_DATA.profileA.title}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        {BLOCK_3_DATA.profileA.wordCount} words · Immediate physical resistance &amp; friction
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('pro3A', BLOCK_3_DATA.profileA.text)}
                      className="p-1.5 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
                      title="Copy Profile A"
                    >
                      {copiedId === 'pro3A' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="font-serif text-base leading-relaxed text-stone-100 p-4 rounded-lg bg-stone-900/60 border border-stone-800/80">
                    &ldquo;{BLOCK_3_DATA.profileA.text}&rdquo;
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-800 text-xs">
                  <div className="font-mono text-[11px] text-rose-300 uppercase tracking-wider">
                    Mechanical Vectors &amp; Force Transfers
                  </div>
                  {BLOCK_3_DATA.profileA.clauses.map((c, i) => (
                    <div key={i} className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60 space-y-0.5">
                      <div className="font-mono text-[11px] text-rose-300">{c.beat}</div>
                      <p className="text-stone-400 text-[11px]">{c.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile B */}
              <div className="p-6 rounded-xl bg-stone-950/80 border border-sky-900/40 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold">
                        {BLOCK_3_DATA.profileB.title}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        {BLOCK_3_DATA.profileB.wordCount} words · Spatial volume, lighting &amp; material resonance
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('pro3B', BLOCK_3_DATA.profileB.text)}
                      className="p-1.5 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
                      title="Copy Profile B"
                    >
                      {copiedId === 'pro3B' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="font-serif text-base leading-relaxed text-stone-100 p-4 rounded-lg bg-stone-900/60 border border-stone-800/80">
                    &ldquo;{BLOCK_3_DATA.profileB.text}&rdquo;
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-800 text-xs">
                  <div className="font-mono text-[11px] text-sky-300 uppercase tracking-wider">
                    Spatial &amp; Material Resonances
                  </div>
                  {BLOCK_3_DATA.profileB.resonances.map((r, i) => (
                    <div key={i} className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60 space-y-0.5">
                      <div className="font-mono text-[11px] text-sky-300">{r.layer}</div>
                      <p className="text-stone-400 text-[11px]">{r.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Comparative Self-Audit Matrix */}
          <section className="rounded-2xl border border-stone-800 bg-[#0e0f12] p-6 sm:p-8 space-y-5">
            <div className="border-b border-stone-800 pb-4">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>Block 3 Self-Audit Matrix: Stylistic Range &amp; Artistic Selection</span>
              </div>
              <h2 className="text-xl font-serif text-stone-100 mt-1">
                Comparative Craft Analysis (Points 1–7)
              </h2>
            </div>

            <div className="space-y-4">
              {BLOCK_3_DATA.audit.map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-3">
                  <div className="text-xs font-mono font-semibold text-stone-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{item.title}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-stone-900/70 border border-rose-950/60 space-y-1">
                      <span className="font-mono text-[10px] text-rose-300 uppercase tracking-wider font-semibold">
                        Profile A: Severe Compression
                      </span>
                      <p className="text-stone-300 leading-relaxed text-[11px]">{item.profileA}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-stone-900/70 border border-sky-950/60 space-y-1">
                      <span className="font-mono text-[10px] text-sky-300 uppercase tracking-wider font-semibold">
                        Profile B: Lyrical Traversal
                      </span>
                      <p className="text-stone-300 leading-relaxed text-[11px]">{item.profileB}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4-Tier Continuity Verification Matrix Table */}
            <div className="pt-4 border-t border-stone-800 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>4-Tier Event &amp; Mechanical Verification Matrix</span>
              </div>
              <p className="text-xs text-stone-400">
                Classifying continuity using explicit precision criteria: <strong className="text-emerald-400">Present and consistent</strong>, <strong className="text-amber-400">Omitted by stylistic choice</strong>, <strong className="text-rose-400">Contradicted</strong>, or <strong className="text-stone-400">Unresolved</strong>.
              </p>

              <div className="overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-800 bg-stone-900/80 font-mono text-[11px] text-stone-400">
                      <th className="p-3">Physical Metric &amp; Feature</th>
                      <th className="p-3 w-48">Profile A (Severe)</th>
                      <th className="p-3 w-48">Profile B (Lyrical)</th>
                      <th className="p-3">Physical &amp; Stylistic Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 font-sans">
                    {BLOCK_3_DATA.verificationMatrix.map((row, i) => {
                      const getBadge = (status: string) => {
                        if (status === 'Present and consistent') {
                          return <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/70 text-emerald-300 font-mono text-[10px] whitespace-nowrap">Present &amp; consistent</span>;
                        }
                        if (status === 'Omitted by stylistic choice') {
                          return <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/70 text-amber-300 font-mono text-[10px] whitespace-nowrap">Omitted by style</span>;
                        }
                        if (status === 'Contradicted') {
                          return <span className="px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/70 text-rose-300 font-mono text-[10px] whitespace-nowrap">Contradicted</span>;
                        }
                        return <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono text-[10px] whitespace-nowrap">Unresolved</span>;
                      };

                      return (
                        <tr key={i} className="hover:bg-stone-900/40">
                          <td className="p-3 font-medium text-stone-200 text-xs">{row.metric}</td>
                          <td className="p-3">{getBadge(row.profileA)}</td>
                          <td className="p-3">{getBadge(row.profileB)}</td>
                          <td className="p-3 text-stone-400 text-[11px] leading-relaxed">{row.analysis}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* BLOCK 2 VIEW */}
      {activeTab === 'block2' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#14100c] to-[#0b0d10] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Block 2 Practice Exercise
                  </span>
                  <h2 className="text-xl font-serif text-stone-100">
                    The Security Hatch: Evidential Staging &amp; Predictive Shift
                  </h2>
                </div>
                <p className="text-xs text-stone-400">
                  Allowing the reader to assemble the barred door through sensory cues before Tomas consciously acknowledges the person on the other side.
                </p>
              </div>

              <button
                onClick={() => handleCopy('hatch', BLOCK_2_DATA.passage.join('\n\n'))}
                className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-stone-300 flex items-center gap-1.5"
              >
                {copiedId === 'hatch' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Passage</span>
                  </>
                )}
              </button>
            </div>

            {/* Premise Callout */}
            <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 text-xs space-y-1">
              <div className="font-mono text-amber-400 uppercase tracking-wider text-[11px]">
                Assigned Premise
              </div>
              <p className="text-stone-300 leading-relaxed">{BLOCK_2_DATA.premise}</p>
            </div>

            {/* Prose Body */}
            <div className="space-y-4 bg-stone-950/80 p-6 sm:p-8 rounded-xl border border-stone-800 font-serif text-base sm:text-[17px] leading-relaxed text-stone-100">
              {BLOCK_2_DATA.passage.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>

          {/* Psychological & Evidential Audit */}
          <section className="rounded-2xl border border-stone-800 bg-[#0e0f12] p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Psychological Information Sequence &amp; Situation-Model Audit</span>
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  Tracking Reader Inference vs. Character Knowledge
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BLOCK_2_DATA.auditItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2"
                >
                  <div className="text-xs font-mono font-semibold text-amber-300 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.heading}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-5">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* BLOCK 1 VIEW */}
      {activeTab === 'block1' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-indigo-500/40 bg-gradient-to-b from-[#0f111d] to-[#0a0c12] p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-stone-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Block 1 Corrected Practice
                </span>
                <h2 className="text-xl font-serif text-stone-100">
                  The Courier on Wet Iron Steps (Profile A vs. Profile B)
                </h2>
              </div>
              <p className="text-xs text-stone-400">
                Raw Data: <em className="text-stone-300 font-serif">&ldquo;{BLOCK_1_DATA.rawData}&rdquo;</em>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile A */}
              <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs uppercase tracking-wider text-indigo-400">
                    {BLOCK_1_DATA.profileA.title}
                  </div>
                  <button
                    onClick={() => handleCopy('proA', BLOCK_1_DATA.profileA.text)}
                    className="p-1.5 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
                  >
                    {copiedId === 'proA' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="font-serif text-base leading-relaxed text-stone-100 p-4 rounded-lg bg-stone-900/50 border border-stone-800/80">
                  &ldquo;{BLOCK_1_DATA.profileA.text}&rdquo;
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-800 text-xs">
                  {BLOCK_1_DATA.profileA.clauses.map((c, i) => (
                    <div key={i} className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60 space-y-1">
                      <div className="flex justify-between font-mono text-[11px] text-stone-400">
                        <span className="text-indigo-300">Clause {i + 1}</span>
                        <span>{c.meter} · Stop: {c.stop}</span>
                      </div>
                      <p className="font-serif text-stone-200 text-xs">&ldquo;{c.text}&rdquo;</p>
                      <p className="text-stone-400 text-[11px]">{c.function}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile B */}
              <div className="p-6 rounded-xl bg-stone-950/80 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs uppercase tracking-wider text-sky-400">
                    {BLOCK_1_DATA.profileB.title}
                  </div>
                  <button
                    onClick={() => handleCopy('proB', BLOCK_1_DATA.profileB.text)}
                    className="p-1.5 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
                  >
                    {copiedId === 'proB' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="font-serif text-base leading-relaxed text-stone-100 p-4 rounded-lg bg-stone-900/50 border border-stone-800/80">
                  &ldquo;{BLOCK_1_DATA.profileB.text}&rdquo;
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-800 text-xs">
                  {BLOCK_1_DATA.profileB.branches.map((b, i) => (
                    <div key={i} className="p-2.5 rounded bg-stone-900/60 border border-stone-800/60 space-y-1">
                      <div className="font-mono text-[11px] text-sky-300">{b.type}</div>
                      <p className="font-serif text-stone-200 text-xs">&ldquo;{b.content}&rdquo;</p>
                      <p className="text-stone-400 text-[11px]">{b.function}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Block 1 Conceptual Corrections */}
            <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Conceptual Corrections Applied (Non-Deterministic Mechanics)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {BLOCK_1_DATA.corrections.map((cor, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="font-medium text-stone-200">{cor.title}</div>
                    <p className="text-stone-400 leading-relaxed text-[11px]">{cor.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CURRICULUM VIEW */}
      {activeTab === 'curriculum' && (
        <section className="rounded-2xl border border-stone-800 bg-[#0e0f12] p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <h2 className="text-xl font-serif text-stone-100">
              TRAIN-PROSE-001 Curriculum Architecture &amp; Governing Corrections
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              The ten governing corrections enforcing context-sensitive craft over rigid dogmatic formulas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              '1. Phonetic effects, sentence lengths, and Given-New are context-sensitive principles, not mechanical laws.',
              '2. Readers do not process passages identically; working memory is not a fixed numerical formula.',
              '3. Not every informational gap creates pleasure; unannounced omissions must have recoverable evidence.',
              '4. Study literary passages closely; never reduce McCarthy, Woolf, or Morrison to a reusable syntax template.',
              '5. Grounded physical realism is not the only acceptable literary style.',
              '6. W-Raytracing includes expressive visual composition, color scripting, and aesthetic art direction beyond lighting.',
              '7. DLSS remains a pedagogical analogy for grounded reconstruction, material friction, and continuity.',
              '8. Rest & Arrest holds character momentum while surrounding world systems continue (ST = DT). It does not freeze time.',
              '9. Techniques must be selected according to narrative objectives; they are not mandatory scene decorations.',
              '10. Remediation exercises are temporary diagnostic constraints, not permanent stylistic restrictions.',
            ].map((rule, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <div className="font-mono text-indigo-400 font-semibold text-[11px]">Correction {idx + 1}</div>
                <p className="text-stone-300 leading-relaxed">{rule.split('. ')[1]}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
