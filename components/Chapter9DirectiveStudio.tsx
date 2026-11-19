'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  Eye,
  Compass,
  Volume2,
  Flame,
  MapPin,
  Footprints,
  AlertOctagon,
  CheckSquare,
  Search,
  Copy,
  Check,
  ChevronRight,
  Lock,
  ArrowRight,
  FileText,
  HelpCircle,
  Activity,
  User,
  Zap,
  Send,
} from 'lucide-react';
import {
  CHAPTER_9_SECTIONS,
  CHAPTER_9_METADATA,
  CHAPTER_9_FULL_TEXT,
} from '@/lib/chapter9Text';
import ScribbleHubCopyModal from './ScribbleHubCopyModal';

export interface LockedEventItem {
  number: number;
  id: string;
  title: string;
  subtitle: string;
  timingAndLocation: string;
  narrativeFunction: string;
  mandatoryRequirements: string[];
  physicalAndSpatialRules: string[];
  povAndPsychology: string;
  strictProhibitions: string[];
  craftPacks: string[];
}

export const CHAPTER_9_LOCKED_EVENTS: LockedEventItem[] = [
  {
    number: 1,
    id: 'event_01_errand',
    title: 'Event 1: Opening — The Errand',
    subtitle: 'Ordinary life vehicle anchored in Chapter 8 continuity',
    timingAndLocation: 'Same-day evening after the Chapter 8 café visit; outside the commercial arcade / crossing',
    narrativeFunction:
      'Gives Ira an ordinary reason to traverse Kuoh. Serves as the psychological hinge where Ira follows through on his Chapter 8 resolve to stop letting fear dictate what he is allowed to attempt.',
    mandatoryRequirements: [
      'Same-day continuity from published Chapter 8 (The Architecture of Waiting).',
      'The errand originates from the first friendly teenage boy from the Chapter 8 café (Tetsuo, holding the marked paper map).',
      'Ordinary collection task: picking up replacement mitre saw clamps from the 4th sluice depot for Mizuno Timber.',
      'Ira pivots internally: recognizes his habitual retreat, refuses to let fear decide, and follows through.',
    ],
    physicalAndSpatialRules: [
      'Same-day evening continuity; dead Panasonic flip phone, wallet money, paper slip with Minami-Kuoh address.',
      'Strictly prohibited: Wednesday, next-day errand, old footbridge accident, kinetic-anchor deformation, dead-mother premise, Kenji locker machinery.',
    ],
    povAndPsychology:
      'Ira operates in the Self-Monitoring Adolescent and Procedural Observing registers. He evaluates the errand with dry teenage practicality and makes the quiet, stubborn choice to follow through.',
    strictProhibitions: [
      'Do not invent a new acquaintance or fabricate an intimacy level not established in Chapter 8.',
      'Do not introduce Wednesday, next-day delay, or obsolete kinetic-anchor footbridge material.',
      'Do not inflate the errand into an artificial mission, conspiracy, or countdown clock.',
      'Do not introduce supernatural foreknowledge or suspicion before departure.',
    ],
    craftPacks: ['The Camera Eye', 'Subtext & Lacunae', 'Cadence Engine'],
  },
  {
    number: 2,
    id: 'event_02_traversal',
    title: 'Event 2: Kuoh Traversal (3–4 Hours)',
    subtitle: 'Associative Node-Skipping supported by Topographical Landmarks',
    timingAndLocation: 'Kuoh Municipal Area across 3 to 4 hours of narrative traversal',
    narrativeFunction:
      'Establishes Kuoh as a living, inhabited Japanese municipality with distinct urban zones, changing elevations, human routines, and architectural density.',
    mandatoryRequirements: [
      'Duration must span approximately three to four hours; do not compress into a one-line summary.',
      'Demonstrate meaningful changes across: urban density, commercial vs. residential layouts, human activity, sounds, vegetation, and elevation.',
      'Show Ira’s developing competence in navigating Kuoh compared to his disorientation in Chapter 6.',
      'Anchor movement via established landmarks (Kuoh Station, Local/Rapid tracks, academy ridge, pine hills, commercial shops).',
    ],
    physicalAndSpatialRules: [
      'Use three compositional planes: Near plane (body, clothing, reach), Midground (street, vehicles, pedestrians), Far plane (skyline, hills, powerlines).',
      'Follow the selected Associative Node-Skipping model: summarize routine movement, expand time at meaningful junctions, discoveries, and route decisions.',
    ],
    povAndPsychology:
      'Procedural Observing Self active: assessing walking distances, heat/fatigue, terrain grades, and economic costs. Historical Jonah memory provides comparative echoes without omniscient exposition.',
    strictProhibitions: [
      'Do not describe every street like a municipal tourist guidebook.',
      'Do not force random filler encounters that do not serve navigation, character, or atmosphere.',
      'Do not invent impossible geographic adjacencies or instant travel times.',
    ],
    craftPacks: ['Wraytracing', 'WSurroundSounds', 'Cadence Engine'],
  },
  {
    number: 3,
    id: 'event_03_child_cat',
    title: 'Event 3: The Child and the Cat',
    subtitle: 'A small, grounded human decision leading off the established path',
    timingAndLocation: 'Wooded greenbelt edge / public park margin bordering Kuoh’s outskirts',
    narrativeFunction:
      'Provides a natural, non-supernatural human catalyst that draws Ira away from the paved municipal route into the marginal green space.',
    mandatoryRequirements: [
      'Ira encounters a four-year-old child, an attentive and responsible accompanying adult, and the child’s cat.',
      'The cat bolts for an ordinary animal reason (startled by noise, insect, or movement).',
      'The adult behaves responsibly: attends immediately to the four-year-old child’s safety.',
      'Ira is the nearest older person positioned to intercept or follow the cat; he makes a quick, helpful human decision to follow.',
      'The chase initially appears short, manageable, and bounded.',
    ],
    physicalAndSpatialRules: [
      'Establish clear spatial baseline: position of adult and child, edge of the gravel/pavement, tree line, initial vector of the cat.',
      'Plausible animal sprint speed and visual tracking through brush and tree trunks.',
    ],
    povAndPsychology:
      'Immediate Experiencing Self + Adolescent decency: Ira doesn’t want to be a hero; he acts on reflexive human helpfulness because the cat is right in front of him.',
    strictProhibitions: [
      'Do not make the adult incompetent or neglectful to justify Ira’s action.',
      'Do not make the cat supernatural, demonic, or fleeing because it "senses the plot".',
      'Do not stage a melodramatic rescue spectacle.',
    ],
    craftPacks: ['The Camera Eye', 'Kinetic Syntax', 'Subtext & Lacunae'],
  },
  {
    number: 4,
    id: 'event_04_boundary',
    title: 'Event 4: Gradual Astral Boundary Crossing',
    subtitle: 'Ecological & acoustic failure compounding into metric inconsistency',
    timingAndLocation: 'Transition from public park / greenbelt path into altered wooded terrain',
    narrativeFunction:
      'Dismantles environmental trust gradually without dramatic portals or sudden teleportation, drawing the reader into an uncanny spatial transgression.',
    mandatoryRequirements: [
      'Crossing is gradual and continuous: no flashing portals, magical rips, or explanatory announcements.',
      'Follow the selected model: ecological and acoustic failure compounding into metric inconsistency.',
      'Establish a solid spatial baseline before introducing anomalies so deviations have meaning.',
      'Acoustic attenuation must follow physics first (tree absorption, distance, low-frequency persistence) before spatial relationships become unreliable.',
    ],
    physicalAndSpatialRules: [
      'Paths continue physically, but surrounding topography, tree spacing, and ground slopes subtly defy the expected map.',
      'Metric mismatch: distances covered do not correlate with footsteps or travel time; landmarks appear unexpectedly near or distant.',
    ],
    povAndPsychology:
      'Procedural Observing Self detects anomalies before conscious alarm sets in. Ira experiences sensory cognitive dissonance, attempting to rationalize metric errors as ordinary disorientation.',
    strictProhibitions: [
      'No sudden teleportation, wormholes, or glowing portal frames.',
      'No digital "mute button" turning off all ambient city noise instantaneously.',
      'No omniscient narrator explaining "he had stepped into the Astral Realm".',
    ],
    craftPacks: ['Psycholinguistic Switchboard', 'Wraytracing', 'WSurroundSounds'],
  },
  {
    number: 5,
    id: 'event_05_stalker',
    title: 'Event 5: The Stalking Presence',
    subtitle: 'Controlled threat, single dominant entity, occupied environment',
    timingAndLocation: 'Altered forest / peripheral structure approaches',
    narrativeFunction:
      'Builds supernatural dread and predatory tension through consistent observable behavior rather than jump-scares or creature exposition.',
    mandatoryRequirements: [
      'Exactly one dominant malicious presence (with at most one secondary or distant signature).',
      'Presence behaves consistently: tracking from flanks, utilizing blind spots, causing directional disturbances.',
      'Its true taxonomy, origin, name, and supernatural rank remain strictly unknown.',
      'Threat builds through accumulating physical and sensory evidence: branch deflection, disturbed shadows, directional acoustic anomalies.',
    ],
    physicalAndSpatialRules: [
      'Visual presentation via silhouettes against background light, occluded movement behind trunks, and rapid shifts between focal planes.',
      'Sound directionality must remain partially elusive, exploiting reverberation in the altered terrain.',
    ],
    povAndPsychology:
      'Immediate Experiencing Self dominates: elevated heart rate, hyper-vigilance, hair rising on neck, narrowing visual focus. Humour recedes naturally as somatic dread takes over.',
    strictProhibitions: [
      'Do not introduce a procession of multiple unrelated monsters.',
      'Do not assign the presence a known lore classification (e.g. Stray Devil, Fallen Angel, Youkai) unless confirmed in canon.',
      'Do not have the entity deliver a theatrical villain monologue.',
    ],
    craftPacks: ['The Camera Eye', 'WSurroundSounds', 'Rest & Arrest'],
  },
  {
    number: 6,
    id: 'event_06_house',
    title: 'Event 6: The Isolated House',
    subtitle: 'Reconstructable architecture, motivated entry, tactile decay',
    timingAndLocation: 'Clearing / dead-end slope in the altered astral boundary zone',
    narrativeFunction:
      'Provides a grounded, claustrophobic architectural container for the climactic encounter, maintaining clear spatial layout and motivated search.',
    mandatoryRequirements: [
      'The house’s approach, exterior condition, and position must follow logically from Ira’s path.',
      'Entry is motivated by a concrete observation: seeing the cat slip inside or hearing a specific sound within.',
      'Internal architecture must remain intelligible: entry vestibule, hall, stairs, upper landing, and damaged room.',
      'The physical dilapidation (dry rot, cracked joists, water damage) must be established before the structural failure.',
    ],
    physicalAndSpatialRules: [
      'Establish dimensions and sightlines: doorway width, stair tread creaks, floorboard flex, dust motes, ceiling height.',
      'Light entry paths: low external light through grimy sash panes or rotted eaves.',
    ],
    povAndPsychology:
      'Tension between urgent concern for the animal and rising survival instinct. Ira moves cautiously, testing floorboards, breathing through his nose to avoid inhaling rot spores.',
    strictProhibitions: [
      'Do not make Ira enter merely because "it’s a horror trope". Motivate his action through the cat.',
      'No shifting "haunted house" geometries that render spatial reconstruction impossible.',
      'No invented historical owners, family backstory, or lore documents found on tables.',
    ],
    craftPacks: ['Wraytracing', 'Kinetic Syntax', 'Subtext & Lacunae'],
  },
  {
    number: 7,
    id: 'event_07_purple_phenomenon',
    title: 'Event 7: Upper-Floor Purple Phenomenon',
    subtitle: 'Visually immense, perceptually rupturing, strictly unclassified',
    timingAndLocation: 'Upper room / attic floor of the isolated house',
    narrativeFunction:
      'Delivers the visual and metaphysical climax of the chapter: a phenomenon of extraordinary depth and power that defies room geometry.',
    mandatoryRequirements: [
      'Encountered on the upper floor: an inexplicable, luminous purple phenomenon.',
      'May manifest as: miasmic volume, void, rotational storm, fluid whirlpool, or light field exceeding the physical dimensions of the room.',
      'Render through observable physical interactions: how its violet/purple radiation casts colored shadows, causes chromatic bleed, and catches suspended dust.',
      'The phenomenon’s origin, owner, nature, and mechanism must remain completely unexplained.',
    ],
    physicalAndSpatialRules: [
      'Compositional contrast: deep violet/indigo emission clashing against raw wood, rotting wallpaper, and twilight.',
      'Acoustic signature: low sub-bass hum, ionizing hiss, or unsettling vibrational pressure.',
    ],
    povAndPsychology:
      'Perceptual rupture: Ira’s working memory is stunned by visual scale. His historical mind searches for physics analogies while his adolescent body freezes in primal awe.',
    strictProhibitions: [
      'Do NOT name or classify the phenomenon (no "Power of Destruction", no "Astral Gate", no "Sacred Gear").',
      'Do NOT have Ira figure out what it is or who put it there.',
      'Do NOT use the quarantined Lorekeeper explanation.',
    ],
    craftPacks: ['Wraytracing', 'Cadence Engine', 'Rest & Arrest'],
  },
  {
    number: 8,
    id: 'event_08_collapse',
    title: 'Event 8: Structural Failure & Fall',
    subtitle: 'Rigorous 6-step causal physical mechanics: Initiation → Consequence',
    timingAndLocation: 'Upper room floorboards / ceiling joist fracture',
    narrativeFunction:
      'Forces a sudden kinetic crisis through intelligible physical failure, stripping safety and testing physical survival without superpowers.',
    mandatoryRequirements: [
      'The floor failure must be physically intelligible: rotted joists, compromised subfloor, shifted center of gravity.',
      'Follow the 6-step causal chain: Initiation → Vector → Resistance → Contact → Consequence → Attention.',
      'Ira’s fall must have direction, velocity, contact points, and bodily impact consequences.',
      'Injuries incurred (bruised ribs, scraped palms, strained ankle) must persist and affect subsequent movement.',
    ],
    physicalAndSpatialRules: [
      'Partial floor collapse (e.g. 8–10 foot drop through splintering lath and plaster onto ground floor debris).',
      'Physical resistance: snapping lath, grabbing at joists, boots breaking through floorboards.',
    ],
    povAndPsychology:
      'Pure Immediate Experiencing Self: paratactic syntax, reflex grabs, shock impact, wind knocked out of lungs, survival adrenaline.',
    strictProhibitions: [
      'No convenient supernatural rescue or magical levitation.',
      'Do NOT allow Ira to summon or control the Chapter 8 kinetic manifestation to save himself.',
      'Do NOT erase the injury consequences in the aftermath.',
    ],
    craftPacks: ['Kinetic Syntax', 'Cadence Engine', 'Rest & Arrest'],
  },
  {
    number: 9,
    id: 'event_09_necklace',
    title: 'Event 9: The One-Tooth Necklace',
    subtitle: 'Physical snag and mechanical detachment during the fall',
    timingAndLocation: 'Mid-fall / structural collapse contact point',
    narrativeFunction:
      'Introduces a critical continuity artifact into Ira’s possession entirely through believable physical mechanics without magical attraction.',
    mandatoryRequirements: [
      'A necklace featuring a single tooth pendant is hanging or secured to an exposed nail, joist hook, or damaged structural fitting.',
      'During Ira’s fall or slide, his trousers, belt loop, or pocket rim snags the necklace cord.',
      'His falling body weight exerts sufficient force to snap the support or pull the loop clear.',
      'The necklace remains snagged on his clothing or gripped in his hand in the aftermath.',
      'Its owner, history, magical properties, and purpose remain totally unrevealed.',
    ],
    physicalAndSpatialRules: [
      'Five-step physical arrangement: (1) Attached to support; (2) Body brings clothing in contact; (3) Cord catches on loop/hem; (4) Mass pulls cord free; (5) Stays on his person.',
      'Material tactility: cord texture (leather, braided hemp, cordage), yellowed tooth enamel, bone or wire wrap.',
    ],
    povAndPsychology:
      'Ira discovers the snagged object in the dark after landing. He registers it as an unexpected physical fact, not a mystical treasure.',
    strictProhibitions: [
      'Do NOT have the necklace magically jump into his hands.',
      'Do NOT give the necklace a confirmed magical power or identity.',
      'Do NOT have Ira recognize its mythological or factional origin.',
    ],
    craftPacks: ['Kinetic Syntax', 'Subtext & Lacunae', 'The Camera Eye'],
  },
  {
    number: 10,
    id: 'event_10_escape_ending',
    title: 'Event 10: Escape and Final Image',
    subtitle: 'Embodied retreat closing on the purple reflection in Ira’s eyes',
    timingAndLocation: 'Ground floor egress / exterior threshold looking back at the house',
    narrativeFunction:
      'Resolves the immediate physical peril while sealing the chapter with an enduring, unresolved visual consequence.',
    mandatoryRequirements: [
      'Ira scrambles clear of the collapsed timber and escapes through the ground floor doorway or broken window frame.',
      'Movement reflects the physical shock and bruises of the fall.',
      'He clears the immediate structure and turns to look back across the dark ground.',
      'Final locked image: The purple glowing phenomenon is reflected in Ira’s eyes.',
      'End strictly on the visual image itself.',
    ],
    physicalAndSpatialRules: [
      'Exterior atmospheric rendering: cold night air, dripping eaves, distant tree silhouettes, chromatic violet sheen reflecting in moist corneas.',
    ],
    povAndPsychology:
      'Stillness after kinetic violence. Breath ragged, pulse loud in ears, eyes wide as the alien glow imprints upon his retinas.',
    strictProhibitions: [
      'Do NOT explain the purple phenomenon.',
      'Do NOT identify the stalker or explain the necklace.',
      'Do NOT write an explanatory summary paragraph after the final image.',
      'Do NOT plan Chapter 10 inside the final sentences.',
    ],
    craftPacks: ['Wraytracing', 'Rest & Arrest', 'Resonance & Echo'],
  },
];

export const AUTHORITY_HIERARCHY_LEVELS = [
  {
    rank: 1,
    source: 'Author Decisions & Corrections',
    rule: 'Absolute highest authority. Explicit instructions, corrections, and approved milestones override all else.',
    status: 'Active & Binding',
  },
  {
    rank: 2,
    source: 'Newest Authoritative Chapter 8 Manuscript & Preceding Chapters (1–7)',
    rule: 'Immediate continuity authority. Footbridge accident, kinetic grip, steel deformation, and Kuoh crest clue.',
    status: 'Source Gate Active (Audit Pending)',
  },
  {
    rank: 3,
    source: 'Chapter 9 Master Architecture & Locked Events (Events 1–10)',
    rule: 'Locked event sequence, causal progression, character operating distances, and hard ending constraint.',
    status: 'Locked Directive',
  },
  {
    rank: 4,
    source: 'Supplied Prose Research & Technique Packs',
    rule: 'Wraytracing, WSurroundSounds, Kinetic Syntax, Rest & Arrest, Cadence Engine, Given-New, Jahn focalization.',
    status: 'Active Craft Toolset',
  },
  {
    rank: 5,
    source: 'Clearly Identified Illustrative Examples',
    rule: 'Passage demonstrations and comparative literary study objects (Woolf, McCarthy, Morrison). Not rigid templates.',
    status: 'Pedagogical Reference',
  },
  {
    rank: 6,
    source: 'Writer Local Execution Decisions',
    rule: 'Sentence length, vocabulary, local paragraph cadence, descriptive staging. Subordinate to all higher tiers.',
    status: 'Writer Execution Scope',
  },
];

export const QUARANTINED_MATERIAL_NOTICE = {
  source: 'Lorekeeper Response (Explicitly Quarantined)',
  status: 'STRICT QUARANTINE ENFORCED',
  mandate:
    'Do not adopt its conclusions, use its suggested narrative choices, treat its labels as canon, or import its proposed explanations for the purple phenomenon, the one-tooth necklace, the boundary, or the stalking presence. The quarantined report is not an authority source for Chapter 9.',
};

export const PROHIBITIONS_30_LIST = [
  '1. Changing the 10-event sequence.',
  '2. Removing any required event.',
  '3. Adding major unapproved plot events.',
  '4. Replacing the errand with a different quest.',
  '5. Inventing a new ungrounded acquaintance.',
  '6. Making the child or adult guardian behave unnaturally.',
  '7. Making the cat supernatural without authority.',
  '8. Making the boundary crossing a sudden teleportation or portal.',
  '9. Explaining the astral environment with metaphysical exposition.',
  '10. Giving the stalking presence an invented taxonomy or faction label.',
  '11. Revealing or classifying the purple phenomenon.',
  '12. Making the isolated house spatially incoherent.',
  '13. Using an unearned supernatural rescue.',
  '14. Granting Ira deliberate control over his kinetic manifestation.',
  '15. Making the floor collapse physically unintelligible.',
  '16. Making the necklace magically attach itself to Ira.',
  '17. Giving the necklace a confirmed identity, power, or owner.',
  '18. Erasing physical injury consequences in the aftermath.',
  '19. Replacing Ira’s voice with generic action-hero narration.',
  '20. Turning the 3-4 hour city traversal into empty filler.',
  '21. Turning the chapter into a sensory checklist.',
  '22. Using academic or rendering jargon in Ira’s thoughts.',
  '23. Forcing every single emotion into bodily symptoms.',
  '24. Banning humour during danger as a dogmatic universal rule.',
  '25. Making every single paragraph metaphorical or decorative.',
  '26. Treating Technique Packs as mandatory sentence-by-sentence checklists.',
  '27. Explaining the final purple reflection image.',
  '28. Adding an explanatory paragraph after the ending.',
  '29. Planning Chapter 10 decisions inside Chapter 9.',
  '30. Treating quarantined Lorekeeper conclusions as canon.',
];

export default function Chapter9DirectiveStudio() {
  const [activeTab, setActiveTab] = useState<
    | 'manuscript'
    | 'architecture'
    | 'source_gate'
    | 'authority'
    | 'character_pov'
    | 'spatial_traversal'
    | 'sensory_art'
    | 'prohibitions'
  >('manuscript');
  const [selectedEventId, setSelectedEventId] = useState<string>('event_01_errand');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isScribbleHubModalOpen, setIsScribbleHubModalOpen] = useState<boolean>(false);

  const selectedEvent =
    CHAPTER_9_LOCKED_EVENTS.find((e) => e.id === selectedEventId) ||
    CHAPTER_9_LOCKED_EVENTS[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEvents = CHAPTER_9_LOCKED_EVENTS.filter(
    (e) =>
      e.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      e.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      e.narrativeFunction.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-[#09090b] text-stone-200">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        {/* Master Header Card */}
        <div className="border border-purple-500/30 bg-gradient-to-br from-[#120e1e] via-[#0f0d18] to-[#0a0a0f] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-purple-400">
              <BookOpen className="w-4 h-4" />
              <span>Chapter 9 · Master Writer Production Directive</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/60 text-purple-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Directive Authority: CIRCULATOR</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/60 text-amber-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Final Authority: AUTHOR</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-rose-950/60 border border-rose-800/60 text-rose-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Ch. 10: OUT OF SCOPE</span>
              </span>
              <button
                onClick={() => setIsScribbleHubModalOpen(true)}
                className="px-3 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Copy for Scribble Hub</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-serif text-stone-100 tracking-tight">
              Full Narrative Architecture, Continuity &amp; Prose Engineering
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed font-sans">
              Complete operational execution manual for drafting Chapter 9 of <em>Apocrypha DXD: ForeverWorlds</em>. Enforces the 10 locked events, the 4-distance first-person character register, gradual boundary mechanics, physical fall vectors, the Register Firewall, and strict Source Gate controls.
            </p>
          </div>

          {/* Source Gate Status Banner */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-start sm:items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <span className="font-bold text-amber-300 uppercase tracking-wider block sm:inline mr-2">
                  Source Gate Audit Status (Remastered Canon):
                </span>
                <span className="text-stone-300">
                  Locked to published Chapter 8 (The Architecture of Waiting). Same-day evening continuity, café acquaintance handoff (Tetsuo), 3-4 hr Kuoh traversal, and hard-cut purple reflection cliffhanger.
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('source_gate')}
              className="px-3 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800/60 border border-amber-700/80 text-amber-200 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Inspect Source Gate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Navigation Subtabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/80 font-mono text-xs">
            <button
              onClick={() => setActiveTab('manuscript')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'manuscript'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Manuscript ({CHAPTER_9_METADATA.wordCount.toLocaleString()} words · Published Canon)</span>
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'architecture'
                  ? 'bg-purple-500 text-stone-950 font-bold shadow-md shadow-purple-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>10 Locked Events</span>
            </button>
            <button
              onClick={() => setActiveTab('source_gate')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'source_gate'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Source Gate &amp; Ch. 8</span>
            </button>
            <button
              onClick={() => setActiveTab('authority')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'authority'
                  ? 'bg-sky-500 text-stone-950 font-bold shadow-md shadow-sky-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authority &amp; Quarantine</span>
            </button>
            <button
              onClick={() => setActiveTab('character_pov')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'character_pov'
                  ? 'bg-emerald-500 text-stone-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>4 Operating Distances (POV)</span>
            </button>
            <button
              onClick={() => setActiveTab('spatial_traversal')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'spatial_traversal'
                  ? 'bg-indigo-500 text-stone-950 font-bold shadow-md shadow-indigo-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Spatial Traversal &amp; Boundary</span>
            </button>
            <button
              onClick={() => setActiveTab('sensory_art')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'sensory_art'
                  ? 'bg-pink-500 text-stone-950 font-bold shadow-md shadow-pink-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prose &amp; Sensory Art</span>
            </button>
            <button
              onClick={() => setActiveTab('prohibitions')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'prohibitions'
                  ? 'bg-rose-500 text-stone-950 font-bold shadow-md shadow-rose-500/20'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>30 Explicit Prohibitions</span>
            </button>
          </div>
        </div>

        {/* TAB 0: CHAPTER 9 FULL MANUSCRIPT */}
        {activeTab === 'manuscript' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#1c1409] via-[#120f0a] to-[#0a0a0f] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Accepted &amp; Published Canon</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-stone-900 text-stone-300 border border-stone-800">
                      Author: {CHAPTER_9_METADATA.author}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif text-stone-100">
                      {CHAPTER_9_METADATA.title}
                    </h2>
                  </div>
                  <p className="text-xs text-stone-400 font-mono">
                    {CHAPTER_9_METADATA.wordCount.toLocaleString()} words · {CHAPTER_9_METADATA.readingTime} · {CHAPTER_9_METADATA.pov} · Published Fiction
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsScribbleHubModalOpen(true)}
                    className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono transition-colors flex items-center gap-2 shadow-md shadow-amber-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Copy for Scribble Hub</span>
                  </button>
                  <button
                    onClick={() =>
                      handleCopy('ch9_full_text', CHAPTER_9_FULL_TEXT)
                    }
                    className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-mono transition-colors flex items-center gap-2"
                  >
                    {copiedId === 'ch9_full_text' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Manuscript</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Full Chapter</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Canon Status Notice */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-emerald-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    <strong>Remastered Canon Active:</strong> Official Chapter 9 Remaster ({CHAPTER_9_METADATA.wordCount.toLocaleString()} words). Same-day Chapter 8 continuity, café acquaintance handoff (Tetsuo), 3–4 hr Kuoh traversal, Cutscene A &amp; B, and hard-cut purple reflection cliffhanger.
                  </span>
                </div>
              </div>

              {/* Quick Part Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-stone-500 text-[11px] uppercase mr-1">Jump to Scene:</span>
                {CHAPTER_9_SECTIONS.map((sec) => (
                  <a
                    key={sec.partNumber}
                    href={`#part-${sec.partNumber}`}
                    className="px-2.5 py-1 rounded bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 text-[11px] transition-colors"
                  >
                    Part {sec.partNumber}: {sec.title.split(':')[1]?.trim() || `Scene ${sec.partNumber}`}
                  </a>
                ))}
              </div>
            </div>

            {/* Prose Sections Container */}
            <div className="space-y-8 bg-[#0c0d11] p-6 sm:p-10 rounded-2xl border border-stone-800 font-serif text-base sm:text-[17px] leading-relaxed text-stone-200">
              {CHAPTER_9_SECTIONS.map((sec) => (
                <article
                  key={sec.partNumber}
                  id={`part-${sec.partNumber}`}
                  className="space-y-4 pt-6 first:pt-0 border-t first:border-t-0 border-stone-800/80"
                >
                  <div className="space-y-1 font-sans border-b border-stone-800/50 pb-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold uppercase tracking-wider">
                        {sec.title}
                      </span>
                      <span className="text-stone-500">
                        {sec.wordCount} words · {sec.eventAnchors}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">{sec.subtitle}</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {sec.text.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Post-Draft Validation Report (Directive §19.1–19.6) */}
            <div className="p-6 rounded-2xl border border-stone-800 bg-[#0e0f14] space-y-4 text-xs font-mono">
              <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
                <div className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Post-Draft Validation Report (Directive §19.1–19.6)</span>
                </div>
                <span className="text-emerald-400 font-bold">STATUS: AUDITED &amp; CORRECTED CANON (CORR-CH9-001)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-amber-300 font-semibold text-[11px] block">
                    1. 10-Event Architecture Compliance (5,421 Words)
                  </span>
                  <p className="text-stone-300 leading-relaxed">
                    Official Remaster audited under CORR-CH9-001 (5,421 words). Successfully expands Phase 2 traversal via the Terrace Steps commuter bottleneck, industrial sluice aggregate conveyors, and tactile tool-steel depot exchange. Executes all 10 movements without omission.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-sky-300 font-semibold text-[11px] block">
                    2. First-Person Epistemic Purity &amp; W-Raytracing
                  </span>
                  <p className="text-stone-300 leading-relaxed">
                    Meta-prompt leakage and omniscient monster-roster catalogs permanently purged. Script directions (&ldquo;camera pulls back&rdquo;, &ldquo;angle cuts low&rdquo;) eliminated in favor of strict first-person experiential optics and sensory dread.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-emerald-300 font-semibold text-[11px] block">
                    3. Physical Joist Fall &amp; Nail Snag Physics
                  </span>
                  <p className="text-stone-300 leading-relaxed">
                    Mechanically accountable snag: As Ira plunges through the sheared joist, his right hip strikes the surviving doorframe stud. A bent square-head framing nail catches his waistband denim, gouging open the pocket seam and tearing the knotted hemp cord free from the wall, leaving the 4-inch tooth wedged in the pocket rivet.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-purple-300 font-semibold text-[11px] block">
                    4. Hard Ending &amp; Register Firewall
                  </span>
                  <p className="text-stone-300 leading-relaxed">
                    Zero analytical or computer-graphics terminology in narrative fiction. Final sentence locks strictly on the purple reflection in Ira&apos;s eyes: <em>&ldquo;And in the dark water of my eyes, looking back across the clearing, the purple light burned right to the center of the pupil.&rdquo;</em> No post-ending summary; Chapter 10 remains strictly unbroached.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: 10 LOCKED EVENTS ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800">
              <div>
                <h2 className="text-base font-semibold text-stone-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>The 10 Locked Events Architecture (Mandatory Order)</span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Ordinary life → urban exploration → human interruption → pursuit → environmental unreliability → stalking → isolation → perceptual rupture → physical collapse → escape → unresolved visual consequence.
                </p>
              </div>
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter events..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Event Selector List */}
              <div className="lg:col-span-5 space-y-2 max-h-[750px] overflow-y-auto pr-1">
                {filteredEvents.map((evt) => {
                  const isSelected = evt.id === selectedEventId;
                  return (
                    <div
                      key={evt.id}
                      onClick={() => setSelectedEventId(evt.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                        isSelected
                          ? 'bg-purple-950/40 border-purple-500/70 shadow-md shadow-purple-500/10'
                          : 'bg-stone-900/40 border-stone-800/80 hover:bg-stone-900/80 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-purple-400 font-bold">Event {evt.number}</span>
                        <span className="text-stone-500 text-[10px]">{evt.timingAndLocation.split(';')[0]}</span>
                      </div>
                      <h3 className="text-xs font-semibold text-stone-100 leading-snug">
                        {evt.title}
                      </h3>
                      <p className="text-[11px] text-stone-400 line-clamp-2">{evt.subtitle}</p>
                    </div>
                  );
                })}
              </div>

              {/* Selected Event Detail Dossier */}
              <div className="lg:col-span-7 rounded-2xl border border-stone-800 bg-[#0e0f14] p-6 sm:p-7 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-4">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-semibold">
                      Locked Event #{selectedEvent.number} · {selectedEvent.id}
                    </div>
                    <h2 className="text-xl font-serif text-stone-100 mt-1">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-xs text-stone-400 mt-0.5">{selectedEvent.subtitle}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedEvent.id, JSON.stringify(selectedEvent, null, 2))}
                    className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    {copiedId === selectedEvent.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Event JSON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Timing & Narrative Function */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800/80 space-y-1">
                    <span className="text-stone-500 uppercase text-[10px] block">Timing &amp; Geography</span>
                    <span className="text-stone-200">{selectedEvent.timingAndLocation}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800/80 space-y-1">
                    <span className="text-stone-500 uppercase text-[10px] block">Active Technique Packs</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {selectedEvent.craftPacks.map((p, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-purple-950/50 border border-purple-800/50 text-purple-300 text-[10px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mandatory Requirements */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Mandatory Production Requirements</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {selectedEvent.mandatoryRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/60">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Physical & Spatial Rules */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Physical Staging &amp; Spatial Continuity</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {selectedEvent.physicalAndSpatialRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/60">
                        <span className="text-sky-400 font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* POV & Character Psychology */}
                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-1.5 text-xs">
                  <div className="text-purple-300 font-mono font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>POV Register &amp; Psychology</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-sans">{selectedEvent.povAndPsychology}</p>
                </div>

                {/* Strict Prohibitions */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>Strict Event Prohibitions</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {selectedEvent.strictProhibitions.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/40">
                        <span className="text-rose-400 font-bold mt-0.5">✕</span>
                        <span className="leading-relaxed text-stone-300">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SOURCE GATE AUDIT & CH 8 STATUS */}
        {activeTab === 'source_gate' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#1c1409] via-[#120f0a] to-[#0a0a0f] space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                    Directive §2.1 &amp; §2.2 Compliance
                  </div>
                  <h2 className="text-xl font-serif text-stone-100 mt-0.5">
                    Source Gate Audit: Chapter 8 Authoritative Manuscript
                  </h2>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed space-y-3 font-sans">
                <p>
                  <strong>Directive Mandate (§2.1):</strong> &ldquo;The newest Chapter 8 manuscript is essential. Do not substitute an obsolete Chapter 8 draft. The previous Chapter 8 material contained different objectives and arrangements. Some earlier ideas, including a library-directory objective, must not be carried into this chapter unless the newest manuscript actually confirms them.&rdquo;
                </p>
                <p>
                  <strong>Missing-Source Finding (§2.2):</strong> &ldquo;If the newest Chapter 8 manuscript is absent: Do not pretend you have read it. Do not reconstruct its exact contents from summaries. Instead, identify the missing source and provide a concise list of the continuity decisions that cannot safely be finalized without it. Do not draft a fabricated opening bridge.&rdquo;
                </p>
              </div>

              {/* The 4 Core New Chapter 8 Continuity Anchors */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  4 Authoritative Chapter 8 Continuity Points to Confirm
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                    <div className="font-semibold text-stone-200 flex items-center gap-1.5 font-mono text-amber-300">
                      <span>1. The Canal-Footbridge Accident</span>
                    </div>
                    <p className="text-stone-400 leading-relaxed">
                      Physical event occurring on the pedestrian canal footbridge. Replaces the older October 24 archive/library direction. Needs exact staging, timing, and environmental details.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                    <div className="font-semibold text-stone-200 flex items-center gap-1.5 font-mono text-amber-300">
                      <span>2. Involuntary Kinetic Anchoring / Grip</span>
                    </div>
                    <p className="text-stone-400 leading-relaxed">
                      Ira’s kinetic manifestation triggers involuntarily under stress. He does NOT possess deliberate control or conscious mastery over it in Chapter 9.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                    <div className="font-semibold text-stone-200 flex items-center gap-1.5 font-mono text-amber-300">
                      <span>3. Physical Deformation of Steel</span>
                    </div>
                    <p className="text-stone-400 leading-relaxed">
                      Concrete material evidence: the footbridge steel railing or fitting was physically pinched, crimped, or bent under the grip load, leaving permanent visible deformation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                    <div className="font-semibold text-stone-200 flex items-center gap-1.5 font-mono text-amber-300">
                      <span>4. Kuoh Academy Crest on Freight Paperwork</span>
                    </div>
                    <p className="text-stone-400 leading-relaxed">
                      Quiet clue discovered in shipping, municipal, or warehouse paperwork bearing the academy crest, establishing territorial institutional reach without character confrontation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Continuity Decisions Awaiting Author Confirmation */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-2 text-xs">
                <div className="font-mono text-amber-300 font-semibold uppercase tracking-wider">
                  List of Continuity Decisions That Cannot Safely Be Finalized Without Full Source Text:
                </div>
                <ul className="space-y-1.5 text-stone-300 list-disc pl-5 leading-relaxed">
                  <li><strong>The Acquaintance Identity:</strong> Exact name, age, dialogue register, and prior relationship context of the friend asking for the errand (Kenji vs. alternative contact).</li>
                  <li><strong>The Concrete Errand Target:</strong> The exact item, document, or pickup objective specified by the acquaintance.</li>
                  <li><strong>Chronological Gap:</strong> Whether Chapter 9 begins the immediate next morning (Saturday) or following a multi-day recovery interval.</li>
                  <li><strong>Physical Injury Aftereffects:</strong> Residual soreness in Ira’s wrist, forearm tendons, or fingers from the footbridge kinetic grip deformation.</li>
                  <li><strong>Examination Status:</strong> Specific date and pending status of the Friday entrance examination score results.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTHORITY HIERARCHY & QUARANTINE */}
        {activeTab === 'authority' && (
          <div className="space-y-6">
            {/* Quarantined Material Notice Box */}
            <div className="p-5 rounded-2xl border border-rose-500/50 bg-rose-950/30 space-y-3">
              <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-semibold uppercase tracking-widest">
                <AlertOctagon className="w-4 h-4" />
                <span>{QUARANTINED_MATERIAL_NOTICE.status}</span>
              </div>
              <h3 className="text-base font-serif text-stone-100">
                {QUARANTINED_MATERIAL_NOTICE.source}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {QUARANTINED_MATERIAL_NOTICE.mandate}
              </p>
            </div>

            {/* 6-Tier Authority Hierarchy */}
            <div className="rounded-2xl border border-stone-800 bg-[#0e0f14] p-6 sm:p-8 space-y-5">
              <div className="border-b border-stone-800 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  Directive §1.1 Hierarchy
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  The Six-Tier Authority Hierarchy
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  When sources conflict, the higher-level tier strictly wins. If two authoritative sources genuinely conflict, flag the conflict rather than silently choosing.
                </p>
              </div>

              <div className="space-y-3">
                {AUTHORITY_HIERARCHY_LEVELS.map((tier) => (
                  <div
                    key={tier.rank}
                    className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/60 text-sky-300 font-bold">
                          Tier {tier.rank}
                        </span>
                        <span className="font-semibold text-stone-100 text-sm font-serif">
                          {tier.source}
                        </span>
                      </div>
                      <p className="text-stone-400 leading-relaxed font-sans pl-1">
                        {tier.rule}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-stone-500 whitespace-nowrap px-2 py-1 rounded bg-stone-900 border border-stone-800">
                      {tier.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Writer Decision Boundary Table */}
              <div className="pt-4 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Writer Decision Boundary Table (Directive §1.3)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                    <div className="font-mono text-emerald-400 font-semibold uppercase text-[11px] flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>You May Decide (Prose Execution)</span>
                    </div>
                    <ul className="space-y-1.5 text-stone-300 pl-4 list-disc">
                      <li>How Ira phrases an observation or internal reaction</li>
                      <li>How the city route is rendered and described</li>
                      <li>How the cat’s physical movement is staged</li>
                      <li>How the isolated house is visually introduced</li>
                      <li>How the floor physically snaps and fails</li>
                      <li>How the necklace catches on clothing</li>
                      <li>How the purple light interacts with surfaces and dust</li>
                      <li>How the ending sentence cadence is constructed</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                    <div className="font-mono text-rose-400 font-semibold uppercase text-[11px] flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>You May NOT Decide (Narrative Canon)</span>
                    </div>
                    <ul className="space-y-1.5 text-stone-300 pl-4 list-disc">
                      <li>That Ira now understands the astral realm</li>
                      <li>That the errand becomes a different quest or mission</li>
                      <li>That the cat is secretly supernatural or demonic</li>
                      <li>That the house belongs to an invented faction</li>
                      <li>That Ira gains a new power to survive the fall</li>
                      <li>That the necklace has a confirmed magical function</li>
                      <li>What the purple phenomenon objectively is</li>
                      <li>A different ending or post-ending summary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHARACTER POV & 4 OPERATING DISTANCES */}
        {activeTab === 'character_pov' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-stone-800 bg-[#0e0f14] p-6 sm:p-8 space-y-6">
              <div className="border-b border-stone-800 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  Directive Part V
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  Character &amp; POV Execution: Ira Lowe / Jonah Laurence
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Jonah Laurence and Ira Lowe are the same character. Jonah is the historical self; Ira is the current body and social position. Four operating distances modulate within one unified consciousness.
                </p>
              </div>

              {/* Four Operating Distances Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5">
                  <div className="font-mono text-emerald-400 font-semibold uppercase text-[11px] flex items-center justify-between">
                    <span>A. Immediate Experiencing Self</span>
                    <span className="text-stone-500 text-[10px]">Kinetic &amp; Somatic</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    Used for bodily feedback, reflexes, movement, pain, balance, physical resistance, and sudden danger. Prose remains close to raw sensorimotor perception without analytical distance.
                  </p>
                  <div className="text-[11px] font-mono text-stone-400 bg-stone-900/60 p-2 rounded border border-stone-800/80">
                    Application: The cat pursuit, boundary stumbling, floor collapse, impact absorption.
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5">
                  <div className="font-mono text-sky-400 font-semibold uppercase text-[11px] flex items-center justify-between">
                    <span>B. Procedural Observing Self</span>
                    <span className="text-stone-500 text-[10px]">Topographical &amp; Tactical</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    Used for navigation, infrastructure, landmarks, route choices, practical costs, and environmental layout. Ira notices details because they help him understand and move through the physical world.
                  </p>
                  <div className="text-[11px] font-mono text-stone-400 bg-stone-900/60 p-2 rounded border border-stone-800/80">
                    Application: 3-4 hour city traversal, rail line crossings, elevation changes, street transitions.
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5">
                  <div className="font-mono text-amber-400 font-semibold uppercase text-[11px] flex items-center justify-between">
                    <span>C. Self-Monitoring Adolescent</span>
                    <span className="text-stone-500 text-[10px]">Social &amp; Defensive</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    Used for social awkwardness, embarrassment, self-consciousness, humour, defensive interpretation, and interpersonal friction. Grounded adolescent perspective navigating a foreign social environment.
                  </p>
                  <div className="text-[11px] font-mono text-stone-400 bg-stone-900/60 p-2 rounded border border-stone-800/80">
                    Application: Errand dialogue with acquaintance, interacting with the child and guardian.
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5">
                  <div className="font-mono text-purple-400 font-semibold uppercase text-[11px] flex items-center justify-between">
                    <span>D. Historical Self</span>
                    <span className="text-stone-500 text-[10px]">Memory &amp; Ethics</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    Used for memory, existing attachments, comparison with prior life experience, ethical residue, and habits from Jonah’s former life. He is NOT an omniscient philosopher, but carries lived weight.
                  </p>
                  <div className="text-[11px] font-mono text-stone-400 bg-stone-900/60 p-2 rounded border border-stone-800/80">
                    Application: Evaluating urban decay, comparing Japanese municipal order to prior industrial memory.
                  </div>
                </div>
              </div>

              {/* Humour & Emotion Guidelines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-sans">
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                  <div className="font-mono text-amber-300 font-semibold uppercase text-[11px]">
                    Humour as Variable Defence Mechanism (§5.3)
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    Humour is permitted to relieve social awkwardness or minimize danger, but never turns into audience-facing stand-up banter. When mortal dread escalates, humour recedes naturally.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                  <div className="font-mono text-emerald-300 font-semibold uppercase text-[11px]">
                    Direct Emotional Language Allowed (§5.4)
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    Explicit emotion words are permitted. Avoid the rigid dogmatic rule that every emotion must be translated into an involuntary somatic motor symptom (sweat, stomach knot, twitch).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SPATIAL TRAVERSAL & ASTRAL BOUNDARY */}
        {activeTab === 'spatial_traversal' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-stone-800 bg-[#0e0f14] p-6 sm:p-8 space-y-6">
              <div className="border-b border-stone-800 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                  Directive Parts VI &amp; VII
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  Kuoh Traversal &amp; Gradual Astral Boundary Mechanics
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Selected Traversal Method: Associative Node-Skipping supported by Topographical Landmarks. Selected Boundary Model: Ecological/Acoustic Failure compounding into Metric Inconsistency.
                </p>
              </div>

              {/* Three Spatial Planes */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-300">
                  The Three Compositional Spatial Planes (§6.3)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                    <span className="font-mono text-indigo-400 font-semibold uppercase text-[11px]">Near Plane</span>
                    <p className="text-stone-300 leading-relaxed">
                      Ira’s body, clothing, reachable surfaces, gravel under boots, handle grips, immediate obstacles, and the cat’s fleeting trail.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                    <span className="font-mono text-indigo-400 font-semibold uppercase text-[11px]">Midground</span>
                    <p className="text-stone-300 leading-relaxed">
                      Active street, passing cyclists, shop fronts, tree spacing, park boundary walls, and immediate trail bends.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                    <span className="font-mono text-indigo-400 font-semibold uppercase text-[11px]">Far Plane</span>
                    <p className="text-stone-300 leading-relaxed">
                      Kuoh skyline, academy ridge, pine-covered mountain silhouettes, weather fronts, and high-voltage transmission pylons.
                    </p>
                  </div>
                </div>
              </div>

              {/* Boundary Transition Mechanics */}
              <div className="p-5 rounded-xl bg-indigo-950/20 border border-indigo-800/40 space-y-4 text-xs font-sans">
                <div className="font-mono text-indigo-300 font-semibold uppercase text-[11px] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Gradual Astral Boundary Crossing Sequence (§7.1–7.4)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-stone-950/80 border border-stone-800 space-y-1">
                    <span className="font-mono text-sky-300 text-[10px] uppercase block">Phase 1: Baseline Establishment</span>
                    <p className="text-stone-300 leading-relaxed">
                      Establish normal park edge: gravel sound under boots, distant traffic wash, pine scent, clear line of sight back to the paved path.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-stone-950/80 border border-stone-800 space-y-1">
                    <span className="font-mono text-purple-300 text-[10px] uppercase block">Phase 2: Acoustic Attenuation</span>
                    <p className="text-stone-300 leading-relaxed">
                      High-frequency city sounds (car horns, chatter) are absorbed by foliage. Low-frequency rumble persists unnaturally or detaches from visible topography.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-stone-950/80 border border-stone-800 space-y-1">
                    <span className="font-mono text-rose-300 text-[10px] uppercase block">Phase 3: Metric Inconsistency</span>
                    <p className="text-stone-300 leading-relaxed">
                      Footstep distance fails to match terrain travel. Landmarks recede or appear too close. Path continues physically but surrounding woods cease to match Kuoh geography.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Stalking Presence Rules */}
              <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3 text-xs font-sans">
                <div className="font-mono text-purple-400 font-semibold uppercase text-[11px] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>The Stalking Presence: Behavioural Rules (Part VIII)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-stone-200 font-semibold block">Consistent Behaviour:</span>
                    <p className="text-stone-400 leading-relaxed">
                      Tracks from the flanks and blind spots. Uses trees and ruins for partial silhouettes. Causes directional disturbance in vegetation without immediate full-body exposure.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-stone-200 font-semibold block">No Classification or Monologues:</span>
                    <p className="text-stone-400 leading-relaxed">
                      Never assign an invented classification or lore title. The presence does not speak or deliver villain speeches. Threat emerges solely through intentional stalking pressure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PROSE & SENSORY ART */}
        {activeTab === 'sensory_art' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-stone-800 bg-[#0e0f14] p-6 sm:p-8 space-y-6">
              <div className="border-b border-stone-800 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-pink-400">
                  Directive Parts X, XI, XII &amp; XIII
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  Prose Engineering: Sensory Art &amp; Sentence Architecture
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Synthesizing Kinetic Compression + Cumulative Physical Clarity. Disciplined sensory art direction without analytical jargon in narrative fiction.
                </p>
              </div>

              {/* W-Raytracing Three Orders */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-pink-400">
                  Visual Composition: The Three Orders of W-Raytracing (Part X)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                    <div className="font-mono text-pink-300 font-semibold uppercase text-[11px]">1. Material Response</div>
                    <p className="text-stone-400 leading-relaxed">
                      Differentiate how light interacts with wet macadam, weathered timber, cracked plaster, dust motes, and rust. Avoid generic shine or darkness.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                    <div className="font-mono text-pink-300 font-semibold uppercase text-[11px]">2. Structural Composition</div>
                    <p className="text-stone-400 leading-relaxed">
                      Silhouettes against lighter backgrounds, value contrast, negative space, leading lines of paths and roof ridges, and directional framing.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                    <div className="font-mono text-pink-300 font-semibold uppercase text-[11px]">3. Expressive Lighting</div>
                    <p className="text-stone-400 leading-relaxed">
                      The purple phenomenon casts violet radiation, creates chromatic bleed on decaying wallpaper, and illuminates suspended airborne moisture.
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-[11px] text-rose-300 font-mono">
                  ⚠ Ray-Tracer Benchmark Trap Warning: Never pause the narrative to list photometric parameters, reflection angles, or rendering jargon.
                </div>
              </div>

              {/* Kinetic Action Model */}
              <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3 text-xs font-sans">
                <div className="font-mono text-amber-300 font-semibold uppercase text-[11px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>6-Step Causal Action Verification Chain (§9.3)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center font-mono text-[11px]">
                  <div className="p-2.5 rounded bg-stone-900 border border-stone-800">
                    <span className="text-amber-400 block font-bold">1. Initiation</span>
                    <span className="text-stone-400 text-[10px]">What Ira attempts</span>
                  </div>
                  <div className="p-2.5 rounded bg-stone-900 border border-stone-800">
                    <span className="text-amber-400 block font-bold">2. Vector</span>
                    <span className="text-stone-400 text-[10px]">Direction &amp; angle</span>
                  </div>
                  <div className="p-2.5 rounded bg-stone-900 border border-stone-800">
                    <span className="text-amber-400 block font-bold">3. Resistance</span>
                    <span className="text-stone-400 text-[10px]">What resists load</span>
                  </div>
                  <div className="p-2.5 rounded bg-stone-900 border border-stone-800">
                    <span className="text-amber-400 block font-bold">4. Contact</span>
                    <span className="text-stone-400 text-[10px]">Impact surface</span>
                  </div>
                  <div className="p-2.5 rounded bg-stone-900 border border-stone-800">
                    <span className="text-amber-400 block font-bold">5. Consequence</span>
                    <span className="text-stone-400 text-[10px]">Material &amp; bodily state</span>
                  </div>
                  <div className="p-2.5 rounded bg-stone-900 border border-stone-800">
                    <span className="text-amber-400 block font-bold">6. Attention</span>
                    <span className="text-stone-400 text-[10px]">Next immediate goal</span>
                  </div>
                </div>
              </div>

              {/* Sentence Architecture Triad */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                  <div className="font-mono text-sky-400 font-semibold uppercase text-[11px]">Paratactic Compression</div>
                  <p className="text-stone-400 leading-relaxed">
                    Short, direct clauses for rapid impact, reflex actions, floor snapping, and immediate physical peril.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                  <div className="font-mono text-emerald-400 font-semibold uppercase text-[11px]">Cumulative Syntax</div>
                  <p className="text-stone-400 leading-relaxed">
                    Longer, right-branching periods for steady traversal, complex visual vistas, and continuous bodily movement.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1.5">
                  <div className="font-mono text-purple-400 font-semibold uppercase text-[11px]">Fused Focalization</div>
                  <p className="text-stone-400 leading-relaxed">
                    Perceptual cue → Cognitive appraisal → Behavioural consequence. Natural sequence without overexplaining.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: 30 EXPLICIT PROHIBITIONS */}
        {activeTab === 'prohibitions' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-br from-[#1a0c10] via-[#120a0d] to-[#0a0a0f] p-6 sm:p-8 space-y-6">
              <div className="border-b border-rose-900/60 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-rose-400 flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4" />
                  <span>Directive Part XVII Compliance Checklist</span>
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  The Thirty Explicit Production Failures
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Violating any of these thirty constraints constitutes an immediate production failure requiring rejection and remediation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {PROHIBITIONS_30_LIST.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800/80 flex items-start gap-2.5"
                  >
                    <span className="text-rose-400 font-bold font-mono mt-0.5">✕</span>
                    <span className="text-stone-300 leading-relaxed font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scribble Hub Copy Suite Modal */}
      <ScribbleHubCopyModal
        isOpen={isScribbleHubModalOpen}
        onClose={() => setIsScribbleHubModalOpen(false)}
        title={CHAPTER_9_METADATA.title}
        chapterNumber={9}
        content={CHAPTER_9_FULL_TEXT}
      />
    </div>
  );
}
