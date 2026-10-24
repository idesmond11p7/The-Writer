import { WorkspaceState, TechniquePack, ChapterDraft, SchemeOfWork, ChapterAnalysis, AIExecutionLog } from '@/types/domain';

// Deterministic fixed base timestamp for SSR and hydration consistency
export const BASE_TIMESTAMP = 1774180800000;

export const INITIAL_TECHNIQUE_PACKS: TechniquePack[] = [
  {
    id: 'pack_psy_foreshadowing_01',
    name: 'Recursive Psychological Foreshadowing',
    category: 'psychology',
    description: 'A structural technique embedding latent trauma responses and somatic sensory distortions as heralds of impending supernatural breach, avoiding overt exposition.',
    currentVersion: '1.2.0',
    tags: ['psychology', 'causality', 'foreshadowing', 'ur-verse-canon'],
    createdAt: BASE_TIMESTAMP - 86400000 * 5,
    updatedAt: BASE_TIMESTAMP - 86400000 * 2,
    versions: {
      '1.0.0': {
        versionNumber: '1.0.0',
        updatedAt: BASE_TIMESTAMP - 86400000 * 5,
        changelog: 'Initial formalization of recursive sensory heralds.',
        componentA: {
          principles: 'Future narrative causality casts psychological shadows in the protagonist\'s perception before physical manifest.',
          formalRepresentation: 'P(t_0) = Filter(SomaticDistortion) -> Trigger(t_1) -> Breach(t_2) where t_0 < t_1 < t_2.',
          coreAssumptions: 'The human psyche detects reality boundary strain as visceral discomfort prior to intellectual apprehension.',
        },
        componentB: {
          mechanisms: 'Micro-fixations, auditory frequency shifts, tactile dysmorphia.',
          intendedEffects: 'Uncanny apprehension without overt spoil of plot.',
          psychologicalPhilosophicalRationale: 'Anchored in cognitive dissonance and sensory sensory habituation failure under high-dimensional metaphysical stress.',
          limitationsAndRisks: 'Overuse numbs reader sensitivity; must be calibrated against mundane grounding.',
          evidenceBase: 'Documented in literary horror traditions and cognitive response studies to uncanny stimuli.',
        },
        componentC: {
          sources: ['Dostoyevsky\'s pre-seizure sensory aura depictions', 'Ur-Verse Narrative Workshop Note #4'],
          historicalContext: 'Emerged from late 19th century psychological realism crossed with weird fiction.',
          documentedLiteraryPrecedents: 'The Brothers Karamazov (Smerdyakov aura); Lovecraft\'s Colour Out of Space sensory descriptions.',
          attribution: 'Documented literary precedents; specific Ur-Verse adaptation by Project Coordinator.',
        },
        componentD: {
          examples: [
            {
              title: 'Sensory Aura at Crossroad',
              excerpt: 'The streetlamp did not flicker, but the sodium glare seemed suddenly thick, tasting faintly of oxidized copper on the back of his molars.',
              annotation: 'Effective somatic grounding without screaming "supernatural".',
              type: 'effective',
              criterionAnalysis: 'Demonstrates subtle olfactory and gustatory displacement without breaking third-person limited focalization.',
            },
          ],
        },
        componentE: {
          practicalProcedures: [
            'Introduce a mundane sensory artifact 300 words prior to an anomaly.',
            'Reflect the sensation in involuntary motor response (throat swallow, pupil contraction).',
            'Do not name the incoming threat until after the protagonist reacts physically.',
          ],
          decisionRules: [
            'If the character is familiar with the threat, shorten the aura phase by 50%.',
            'If the threat is alien/Apocryphal, emphasize spatial dissonance.',
          ],
          constraints: ['Never explain the herald in internal monologue during the scene.'],
          commonErrorsToAvoid: ['Expository internal thoughts explaining what the feeling means.'],
          evaluationTests: ['Can the reader feel the change in scene atmosphere without looking at dialogue?'],
        },
      },
      '1.2.0': {
        versionNumber: '1.2.0',
        updatedAt: BASE_TIMESTAMP - 86400000 * 2,
        changelog: 'Added strict causal constraints and formal evaluation tests.',
        componentA: {
          principles: 'Narrative causality casts visceral psychological shadows prior to event boundary collision. The narrative voice must maintain strict third-person limited observational discipline.',
          formalRepresentation: '∀e ∈ Events_Breach: ∃h ∈ Heralds(e) such that Time(h) < Time(e) ∧ CausalLink(h, e) = DirectVisceral.',
          coreAssumptions: 'Reality distortion creates measurable psychological drag. The observer registers environmental friction as somatic anomaly.',
        },
        componentB: {
          mechanisms: 'Peripheral sensory latency, auditory micro-decay, gustatory metallic trace, instinctive spatial avoidance.',
          intendedEffects: 'Deep physiological dread and organic narrative rhythm without melodrama.',
          psychologicalPhilosophicalRationale: 'Sensory gating breakdown under ontological disruption. The brain attempts to normalize an impossible sensory pattern before surrender.',
          limitationsAndRisks: 'Requires careful pacing; if applied to every encounter, tension flattens.',
          evidenceBase: 'Documented clinical accounts of prodromal aura in neurological literature and high-tension scene mechanics.',
        },
        componentC: {
          sources: [
            'Apocrypha DXD Narrative Canon Document Vol. I',
            'Neurological Studies on Prodromal Sensory Distortion (1998)',
            'Literary lineage of the Uncanny (Freud 1919; Machen 1895)'
          ],
          historicalContext: 'Formulated to bridge mundane high school psychological realism with the cosmic-gothic scale of the Ur-Verse.',
          documentedLiteraryPrecedents: 'Arthur Machen ("The Great God Pan"), Gene Wolfe ("The Shadow of the Torturer").',
          attribution: 'Compiled and refined within the Ur-Verse project team.',
        },
        componentD: {
          examples: [
            {
              title: 'Peripheral Static Over the Kuoh Canal',
              excerpt: 'The water did not splash so much as tear. When Issei looked directly at the ripple, the canal was dark glass, but in the fringe of his left eye the reflection trailed a second behind the motion, greasy and sluggish.',
              annotation: 'Anchors the breach in optical latency before any demonic presence is announced.',
              type: 'effective',
              criterionAnalysis: 'Satisfies third-person observational fidelity. Zero expository commentary.',
            },
            {
              title: 'Expository Failure (Contrast Example)',
              excerpt: 'Issei felt a bad feeling. He realized that a Fallen Angel must be nearby because the magical power was distorting the space.',
              annotation: 'Ineffective: Breaks somatic immersion, spoon-feeds conclusion.',
              type: 'ineffective',
              criterionAnalysis: 'Violates the rule of physical somatic precedence; tells reader the conceptual diagnosis.',
            },
          ],
        },
        componentE: {
          practicalProcedures: [
            'Step 1: Anchor the protagonist in a tactile mundane detail (key ring, damp collar, dry asphalt).',
            'Step 2: Introduce one sensory variable that deviates from environmental baseline (sound drop, taste, spatial drag).',
            'Step 3: Trigger an unprompted autonomic physical reaction (cold sweat, jaw clench, gaze dart).',
            'Step 4: Only then introduce the macro-event or supernatural breach.',
          ],
          decisionRules: [
            'Maintain strict adherence to the protagonist\'s sensory horizon.',
            'Never allow the character to name the metaphysical mechanism during the onset.',
          ],
          constraints: [
            'Prohibit omniscient narrator summaries during somatic transition.',
            'Word count for sensory prelude must remain between 80 and 180 words.',
          ],
          commonErrorsToAvoid: [
            'Naming the entity before the physical consequence manifests.',
            'Using generic abstract words like "menacing" or "evil" instead of sensory specifics.',
          ],
          evaluationTests: [
            'Does the passage contain at least one specific non-visual sensory anchor?',
            'Is the cause-and-effect relationship between somatic discomfort and breach maintained?',
          ],
        },
      },
    },
  },
  {
    id: 'pack_sacred_resonance_02',
    name: 'Sacred Gear Phenomenological Weight',
    category: 'narrative',
    description: 'Disciplined methodology for depicting Sacred Gear activation not as a luminous power-up, but as a violent biological and spiritual displacement with reciprocal cost.',
    currentVersion: '1.0.0',
    tags: ['sacred-gear', 'combat', 'ur-verse-canon', 'physicality'],
    createdAt: BASE_TIMESTAMP - 86400000 * 3,
    updatedAt: BASE_TIMESTAMP - 86400000 * 1,
    versions: {
      '1.0.0': {
        versionNumber: '1.0.0',
        updatedAt: BASE_TIMESTAMP - 86400000 * 1,
        changelog: 'Initial version emphasizing metabolic and skeletal strain.',
        componentA: {
          principles: 'A Sacred Gear is an extraterrestrial metaphysical artifact grafted into a mortal soul. Its activation exerts mechanical leverage upon biological tissue.',
          formalRepresentation: 'OutputPower ∝ MetabolicDrag × SpiritualTorque - HeatDissipationRate.',
          coreAssumptions: 'Power cannot be generated without proportional anatomical stress and psychic backfire.',
        },
        componentB: {
          mechanisms: 'Vascular dilation, bone vibration, cognitive tunnel vision, thermal spikes.',
          intendedEffects: 'Visceral stakes, palpable danger, rejection of easy shonen escalation.',
          psychologicalPhilosophicalRationale: 'Physical pain grounds miraculous acts in consequence, making victory costly and narratively earned.',
          limitationsAndRisks: 'Can slow down rapid-fire action sequences if descriptive density is excessive.',
          evidenceBase: 'Drawing on athletic biomechanics and mythological representations of divine burdens.',
        },
        componentC: {
          sources: ['Ur-Verse Armament Compendium', 'Classical Tragic Weaponry Trope Analysis'],
          historicalContext: 'Formulated to counteract power-creep and maintain grounded human vulnerability in High School DxD fanwork.',
          documentedLiteraryPrecedents: 'Cú Chulainn\'s warp spasm in the Ulster Cycle; Berserk armor depictions in Miura\'s works.',
          attribution: 'Ur-Verse Narrative Workshop.',
        },
        componentD: {
          examples: [
            {
              title: 'Boosted Gear Radial Seizure',
              excerpt: 'The gauntlet didn\'t just latch on; it clamped like a hydraulic vise against his radius, popping the cartilage in his wrist with a wet snap that the red gemstone smothered in heat.',
              annotation: 'Depicts immediate anatomical price before the first "Boost" sound echoes.',
              type: 'effective',
              criterionAnalysis: 'Demonstrates tangible biological resistance to divine intervention.',
            },
          ],
        },
        componentE: {
          practicalProcedures: [
            'Detail the entry wound or skin-contact junction of the weapon.',
            'Track respiration and circulatory shift during power accumulation.',
            'Enforce cooldown penalty or physical exhaustion after combat release.',
          ],
          decisionRules: [
            'Double the metabolic toll if the host is mentally unfocused or terrified.',
          ],
          constraints: [
            'No effortless power activation without an established narrative ritual or cost.',
          ],
          commonErrorsToAvoid: [
            'Treating the gear as a lightweight costume piece or visual sticker.',
          ],
          evaluationTests: [
            'Does the host experience physical aftermath proportionate to the power deployed?',
          ],
        },
      },
    },
  },
];

export const INITIAL_CHAPTERS: ChapterDraft[] = [
  {
    id: 'chap_dxd_01',
    title: 'Chapter 1: The Boundary Fracture at Kuoh',
    chapterNumber: '1',
    provenance: 'local_working_draft',
    sourceIdentifier: 'LEDGER-REF-DXD-FW-001 (Pending Sync)',
    targetPlanId: 'sow_act_1_perimeter',
    activeTechniquePackIds: ['pack_psy_foreshadowing_01'],
    writingObjectives: [
      'Establish Issei Hyoudou\'s baseline mundane existence prior to Raynare\'s approach.',
      'Deploy Recursive Psychological Foreshadowing through sensory latency and metallic air.',
      'Depict the first subtle glitch in the Kuoh town perimeter without revealing demonic factions.',
    ],
    constraints: [
      'Strict third-person limited focalization.',
      'No overt supernatural exposition in the opening 1,000 words.',
      'Retain continuity with the Ur-Verse timeline fracture milestone.',
    ],
    notes: 'Draft revision working towards final handoff to the Ledger archive once approved by Project Coordinator.',
    currentContent: `The sodium lights along the Kuoh drainage canal never illuminated the water so much as they stained it.

Issei Hyoudou paused at the crest of the concrete embankment, his bicycle chain rattling with the loose, dry chatter of neglected grease. It was twenty past seven. The dusk had that sticky, late-spring thickness that made shirts adhere to shoulder blades, but as he reached down to adjust the strap of his school bag, his fingertips brushed the cold steel handlebar and found it dry as powdered bone.

Not damp. The humidity was ninety percent, yet the handlebar felt desiccated.

He rubbed his thumb against his forefinger. On the back of his tongue sat the dull, alkaline tang of an old copper coin held too long in a closed fist. 

He hadn't chewed copper. He had eaten lukewarm pork cutlet twenty minutes ago at the diner by the station with Matsuda and Motohama, listening to them argue over volleyball rankings with the single-minded fervor that usually shielded him from thinking about anything else.

He looked down into the canal.

The water moved, but the reflection of the concrete pillar below him was late. It hesitated by a quarter of a heartbeat, lagging behind the current like heavy oil, before catching up in a greasy shudder.

Issei blinked once, hard. A muscle at the base of his skull tightened, pulling his chin an inch downward in an involuntary twitch.

"Just tired," he muttered, though his voice sounded thin, swallowed instantly by the concrete underpass. "Staring at kanji too long."

He kicked the pedal forward. The bicycle rolled down the incline, but as the wheels hit the shadowed asphalt under the bridge, the silence didn't sound like evening quiet. It sounded like air being evacuated from an open jar.`,
    revisions: [
      {
        id: 'rev_dxd_01_initial',
        timestamp: BASE_TIMESTAMP - 86400000 * 2,
        author: 'user',
        notes: 'Initial scene opening draft exploring canal atmosphere.',
        content: `The sodium lights along the Kuoh drainage canal never illuminated the water so much as they stained it.\n\nIssei Hyoudou paused at the crest of the concrete embankment, his bicycle chain rattling with the loose, dry chatter of neglected grease...`,
        wordCount: 312,
        techniquePackIds: ['pack_psy_foreshadowing_01'],
      },
    ],
    createdAt: BASE_TIMESTAMP - 86400000 * 3,
    updatedAt: BASE_TIMESTAMP - 3600000 * 4,
    lastAnalysisTimestamp: BASE_TIMESTAMP - 3600000 * 2,
  },
];

export const INITIAL_SCHEMES_OF_WORK: SchemeOfWork[] = [
  {
    id: 'sow_act_1_perimeter',
    title: 'Act I: Fracture at Kuoh Perimeter',
    scope: 'Chapters 1 to 5: The Incursion and the Sacred Awakening',
    originalSource: 'Legacy Pre-Application Planning Document (Ur-Verse Project Archive 2024)',
    overview: 'Chronicles the initial metaphysical distortion in Kuoh Town, the silent observation by Grigori scouts, and Issei\'s unwitting entrapment in the metaphysical crossfire.',
    charactersInvolved: ['Issei Hyoudou', 'Raynare (Yuma Amano)', 'Rias Gremory', 'Akeno Himejima', 'Kiba Yuuto'],
    milestones: [
      {
        id: 'm_01',
        title: 'Mundane Sensory Disruption & Canal Prelude',
        targetChapterNumber: 1,
        intendedEvents: [
          'Issei encounters local reality lag at the canal.',
          'Atmospheric pressure drop foreshadows Fallen Angel ward deployment.',
          'First contact with Raynare in human disguise.',
        ],
        characterBeats: [
          'Establish Issei\'s naive social exterior concealing latent intuitive awareness.',
          'Demonstrate his reluctance to acknowledge abnormal sensory data.',
        ],
        thematicGoals: ['Mundane vulnerability vs looming cosmic indifference.'],
        status: 'drafted',
      },
      {
        id: 'm_02',
        title: 'The Park Encounter & Crimson Intervention',
        targetChapterNumber: 2,
        intendedEvents: [
          'The twilight date at the fountain.',
          'Spear of Light manifestation and lethal puncture.',
          'Crimson summoning glyph activation and Gremory retrieval.',
        ],
        characterBeats: [
          'Issei\'s disorientation and existential betrayal.',
          'Rias\'s calculated aristocratic intervention.',
        ],
        thematicGoals: ['Death as the price of admission to the supernatural hierarchy.'],
        status: 'planned',
      },
    ],
    discrepancies: [
      {
        chapterId: 'chap_dxd_01',
        description: 'Chapter 1 draft focuses heavily on the canal reflection delay; ensure Raynare\'s introduction is not postponed past the closing scene of Chapter 1.',
        actionRequired: 'Verify whether Raynare\'s human silhouette appears before the chapter cutoff.',
        resolved: false,
      },
    ],
    createdAt: BASE_TIMESTAMP - 86400000 * 10,
    updatedAt: BASE_TIMESTAMP - 86400000 * 2,
  },
];

export const INITIAL_ANALYSES: ChapterAnalysis[] = [
  {
    id: 'ana_chap_01_01',
    chapterId: 'chap_dxd_01',
    chapterVersionTimestamp: BASE_TIMESTAMP - 86400000 * 2,
    analyzedAt: BASE_TIMESTAMP - 3600000 * 2,
    isStale: false,
    modelIdentifier: 'gemini-3.8-flash',
    events: [
      {
        id: 'evt_01',
        sequenceIndex: 1,
        title: 'Canal Halt and Handlebar Anomaly',
        summary: 'Issei stops his bicycle at the Kuoh drainage canal and notices the desiccated state of the steel despite high humidity.',
        sceneLocation: 'Kuoh Drainage Canal Embankment',
        chronologyType: 'linear',
        storyTimeEstimate: '19:20',
        charactersPresent: ['Issei Hyoudou'],
        decisionPoints: ['Decides to rub his fingers and inspect the handlebar rather than riding past immediately.'],
        directConsequences: ['Sensory fixation primes him to notice the optical lag in the water.'],
        causalPredecessors: [],
        supportingPassageExcerpt: 'The humidity was ninety percent, yet the handlebar felt desiccated. He rubbed his thumb against his forefinger.',
        uncertaintyOrInferenceNotes: 'Direct observation grounded in text.',
      },
      {
        id: 'evt_02',
        sequenceIndex: 2,
        title: 'Gustatory Copper Herald',
        summary: 'Issei experiences a phantom alkaline/copper taste on his tongue, ruling out mundane food contamination.',
        sceneLocation: 'Kuoh Drainage Canal Embankment',
        chronologyType: 'linear',
        storyTimeEstimate: '19:21',
        charactersPresent: ['Issei Hyoudou'],
        decisionPoints: ['Mental rationalization by remembering dinner with Matsuda and Motohama.'],
        directConsequences: ['Internal attempt to preserve mundane psychological stability.'],
        causalPredecessors: ['evt_01'],
        supportingPassageExcerpt: 'On the back of his tongue sat the dull, alkaline tang of an old copper coin... He had eaten lukewarm pork cutlet twenty minutes ago.',
        uncertaintyOrInferenceNotes: 'Direct physiological symptom of boundary disruption.',
      },
      {
        id: 'evt_03',
        sequenceIndex: 3,
        title: 'Canal Reflection Lag Observed',
        summary: 'Issei observes the reflection of the concrete pillar lagging behind the physical current of the water.',
        sceneLocation: 'Underpass Entrance',
        chronologyType: 'linear',
        storyTimeEstimate: '19:22',
        charactersPresent: ['Issei Hyoudou'],
        decisionPoints: ['Forces himself to rationalize the visual lag as eye fatigue.'],
        directConsequences: ['Dismissal leads him directly into the silent vacuum zone under the bridge.'],
        causalPredecessors: ['evt_01', 'evt_02'],
        supportingPassageExcerpt: 'The water moved, but the reflection of the concrete pillar below him was late. It hesitated by a quarter of a heartbeat...',
        uncertaintyOrInferenceNotes: 'First observable physical boundary breakdown in the chapter.',
      },
    ],
    characterKnowledge: [
      {
        characterName: 'Issei Hyoudou',
        knows: ['His bicycle handlebar is uncharacteristically dry', 'His mouth tastes of copper', 'The water reflection appeared to lag'],
        suspects: ['He is suffering from severe fatigue from studying'],
        believesFalsely: ['He is in mundane, safe Kuoh town on an ordinary evening ride home'],
        unawareOf: ['Grigori containment ward surrounding the canal perimeter', 'Fallen Angel surveillance', 'The presence of the Welsh Dragon within his soul'],
      },
    ],
    setupsAndPayoffs: [
      {
        setup: 'Air being evacuated from an open jar as he enters underpass.',
        payoff: 'Pending Chapter 1 conclusion / Chapter 2 ward activation.',
        status: 'setup_only',
        passageRef: 'It sounded like air being evacuated from an open jar.',
      },
    ],
    continuityFindings: [
      {
        id: 'cont_01',
        severity: 'verified_continuity',
        description: 'Atmospheric pressure drop and reflection lag align precisely with Milestone 1 of Act I Scheme of Work.',
        affectedChaptersOrEvents: ['chap_dxd_01', 'sow_act_1_perimeter:m_01'],
        passageReference: 'It sounded like air being evacuated from an open jar.',
        recommendedResolution: 'Maintain this sensory signature for subsequent ward crossings.',
      },
    ],
    identifiedTechniques: [
      {
        techniqueName: 'Recursive Psychological Foreshadowing',
        confidence: 'high_evidence',
        supportingPassage: 'He rubbed his thumb against his forefinger. On the back of his tongue sat the dull, alkaline tang of an old copper coin...',
        analysis: 'Strictly executes Component E procedure: tactile grounding -> sensory deviation -> autonomic response -> macro event.',
      },
    ],
    overallNarrativeAssessment: {
      strengths: [
        'Strict third-person limited focalization creates organic tension.',
        'Zero intrusive exposition; avoids naming factions prematurely.',
        'Sensory details are concrete, memorable, and physically grounded.',
      ],
      vulnerabilities: [
        'Pacing is deliberate; must transition into interpersonal interaction before scene fatigue sets in.',
      ],
      causalIntegrityScore: '94% Causal Coherence',
      summary: 'High narrative discipline. The scene successfully establishes boundary disruption without violating character knowledge constraints.',
    },
  },
];

export const INITIAL_EXECUTION_LOGS: AIExecutionLog[] = [
  {
    id: 'exec_init_001',
    timestamp: BASE_TIMESTAMP - 3600000 * 2,
    provider: 'gemini',
    modelId: 'gemini-3.8-flash',
    taskType: 'chapter_analysis',
    chapterId: 'chap_dxd_01',
    techniquePackIds: ['pack_psy_foreshadowing_01'],
    inputPromptSummary: 'Analyze Chapter 1 opening passage for story events, causal links, character knowledge matrix, and Technique Pack adherence.',
    rawInputPrompt: 'Target: Chapter 1 Draft (312 words). Attached Pack: Recursive Psychological Foreshadowing v1.2.0. Extract events, causality, knowledge states.',
    rawOutputText: 'Extracted 3 events (evt_01, evt_02, evt_03). Identified causal link between somatic fixation and reflection observation. Confirmed adherence to Component E procedures.',
    status: 'success',
    latencyMs: 1420,
    promptTokens: 850,
    completionTokens: 420,
    totalTokens: 1270,
    estimatedCostUsd: 0.000253,
    userAccepted: true,
  },
];

export const INITIAL_WORKSPACE_STATE: WorkspaceState = {
  version: '1.0.0',
  lastSavedAt: BASE_TIMESTAMP,
  chapters: INITIAL_CHAPTERS,
  techniquePacks: INITIAL_TECHNIQUE_PACKS,
  schemesOfWork: INITIAL_SCHEMES_OF_WORK,
  analyses: INITIAL_ANALYSES,
  evaluations: [],
  executionLogs: INITIAL_EXECUTION_LOGS,
  activeChapterId: 'chap_dxd_01',
  ledgerConnection: {
    status: 'unconnected_standalone',
    endpointUrl: 'https://ledger.ur-verse.internal/api/v1',
    lastSynced: undefined,
  },
};
