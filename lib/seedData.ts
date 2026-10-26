import { 
  WorkspaceState, 
  ChapterDraft, 
  TechniquePack, 
  SchemeOfWork, 
  ChapterAnalysis, 
  EvaluationRecord, 
  InvestigationQuestion,
  PinnedWorkingItem
} from '@/types/domain';
import { INITIAL_LEDGER_CHAPTER_DRAFTS } from '@/lib/ledgerChapterImport';

export const INITIAL_TECHNIQUE_PACKS: TechniquePack[] = [
  {
    id: 'tp_sensory_fracture',
    name: 'Somatic & Perceptual Fracture',
    category: 'psychology',
    description: 'Registers ontological threat, sleep paralysis, or supernatural incursion through involuntary somatic micro-lags and spatial distortion before conscious focalizer comprehension.',
    currentVersion: '1.3.0',
    tags: ['focalization', 'somatic-lag', 'uncanny', 'ontological-friction', 'ur-verse'],
    createdAt: 1711800000000,
    updatedAt: 1711900000000,
    applicationRecords: [
      {
        id: 'app_rec_01',
        timestamp: 1711910000000,
        techniquePackId: 'tp_sensory_fracture',
        techniqueVersion: '1.3.0',
        chapterId: 'ledger_chapter_06_c914b6a',
        originalPassage: 'As she turned toward the corridor, she looked intimidating and powerful, like there was something supernatural about her shadow on the floor.',
        revisedPassage: 'As she turned toward the corridor, the high clerestory windows caught her profile. And right then, my eyes caught something wrong on the floor... For half a heartbeat, the dark shape cast by her hem and shoulders reached five or six inches past where the geometry of the window mullions should have allowed—a sharp, heavy blade of grey that seemed to cling to the timber with an unnatural density.',
        appliedProcedures: [
          '1. Establish mundane physical baseline (honey-coloured oak parquetry, diagonal morning sun through clerestory glass).',
          '2. Introduce a concrete geometric anomaly (shadow extending 5-6 inches past window mullion geometry).',
          '3. Allow focalizer rational dismissal ("A trick of the double-paned leaded glass and the morning glare").'
        ],
        outcomeStatus: 'effective',
        observedEffectNotes: 'Preserves mundane surface realism at Kuoh Academy while planting a precise visual anomaly that signals non-human ontology without breaking Ira/Jonah’s epistemic boundary.',
        methodUsed: 'manual_workbench'
      }
    ],
    versions: {
      '1.3.0': {
        versionNumber: '1.3.0',
        updatedAt: 1711900000000,
        changelog: 'Grounded examples in canonical Ledger Chapters 1, 4, and 6; added mechanism flow steps.',
        componentA: {
          principles: 'Perceptual Precedence over Naming: When a limited human focalizer encounters an anomalous entity or ontological boundary, the body and raw optical geometry register the discrepancy before the intellect can categorize it.',
          formalRepresentation: 'Stimulus(Anomaly) -> Baseline_Environment(Mundane) -> Geometric_or_Somatic_Mismatch(Δt < 0.5s) -> Rationalization_Attempt(Focalizer)',
          coreAssumptions: 'Readers experience deeper dread and immersion when they infer an anomaly from physical/sensory geometry (a shadow five inches too long, a dry scraping across floorboards at 3:17 AM) rather than being told an object is "supernatural" or "evil".',
          methodologicalStatus: 'documented_principle',
        },
        componentB: {
          mechanisms: 'Contrasts high-resolution mundane textures (radiator heat, parquetry wood grain, alarm clock digits) against a single localized violation of physics or proprioception.',
          intendedEffects: 'Creates creeping ontological unease while strictly protecting the focalizer’s limited epistemic state.',
          psychologicalPhilosophicalRationale: 'Grounded in William James’s somatic theory of emotion and predictive-processing accounts of uncanny perception: prediction error spikes when low-level sensory priors fail inside a familiar setting.',
          limitationsAndRisks: 'Overuse causes sensory fatigue and slows scene momentum. Must be restricted to genuine threshold moments ( maximum 1-2 micro-anomalies per scene).',
          evidenceBase: 'Documented in cognitive poetics (embodied simulation) and verified across Chapters 1, 4, and 6 of Apocrypha DXD.',
          mechanismSteps: [
            {
              stepNumber: 1,
              phase: 'Mundane Anchor',
              InputState: 'Ordinary scene environment',
              operation: 'Establish tactile/acoustic baseline with high specificity (e.g., 3:17 AM red digits, oak parquetry).',
              observableOutput: 'Reader trusts the physical reliability of the environment.'
            },
            {
              stepNumber: 2,
              phase: 'Micro-Discrepancy',
              InputState: 'Anomalous entity or state enters perimeter',
              operation: 'Describe raw physical measurement mismatch (e.g., shadow 5-6 inches too long, blackness hitching behind eyelids).',
              observableOutput: 'Immediate perceptual friction without lore exposition.'
            },
            {
              stepNumber: 3,
              phase: 'Defensive Rationalization',
              InputState: 'Focalizer notices discrepancy',
              operation: 'Have focalizer attribute the glitch to fatigue, glare, or nerves and resume urgent task.',
              observableOutput: 'Maintains dramatic tension and prevents premature genre collapse.'
            }
          ]
        },
        componentC: {
          sources: [
            'William James — What is an Emotion? (1884)',
            'Ernst Jentsch / Sigmund Freud — The Uncanny (Das Unheimliche)',
            'Apocrypha DXD Ledger Canon: Chapter 1 (Morning) & Chapter 6 (The Mechanics of Morning)'
          ],
          historicalContext: 'Developed in weird fiction and modernist psychological realism to represent phenomena that exceed the protagonist’s conceptual vocabulary.',
          documentedLiteraryPrecedents: 'Henry James (The Turn of the Screw); Shirley Jackson (The Haunting of Hill House).',
          attribution: 'Synthesized from classical psychological realism and adapted for Apocrypha DXD.',
          linkedCanonicalChapterIds: ['ledger_chapter_01_7720d50', 'ledger_chapter_04_6337972', 'ledger_chapter_06_c914b6a']
        },
        componentD: {
          examples: [
            {
              title: 'Canonical Example: The 3:17 AM Corner Entity (Chapter 1)',
              excerpt: 'There was a shape in the corner of my room. Right where the closet met the wall, the shadows were too thick. They didn’t blend into the rest of the dark the way they were supposed to. They stood upright... Scrrrrtch. A slow, dry sound. Like fingernails—or something harder than fingernails—dragging lightly across the floorboards.',
              annotation: 'Anchors the anomaly in shadow density and acoustic texture ("slow, dry sound") while Jonah is locked in sleep paralysis, followed by the mundane 6:00 AM alarm.',
              type: 'effective',
              criterionAnalysis: 'Passes all criteria: zero lore naming, purely somatic/acoustic evidence, preserves morning normalcy contrast.',
              sourceChapterId: 'ledger_chapter_01_7720d50'
            },
            {
              title: 'Canonical Example: Kuoh Corridor Shadow Geometry (Chapter 6)',
              excerpt: 'For half a heartbeat, the dark shape cast by her hem and shoulders reached five or six inches past where the geometry of the window mullions should have allowed—a sharp, heavy blade of grey that seemed to cling to the timber with an unnatural density. I blinked. When my eyes focused again, the floor was ordinary.',
              annotation: 'Uses architectural geometry (clerestory window mullions vs. oak planks) to register the student council figure’s non-human nature in a split second.',
              type: 'effective',
              criterionAnalysis: 'Exemplary restraint: one concrete visual measurement ("five or six inches"), immediate blink recovery.',
              sourceChapterId: 'ledger_chapter_06_c914b6a'
            },
            {
              title: 'Counterexample: Premature Lore Labeling (Ineffective)',
              excerpt: 'As I walked past the student council president, I felt a terrifying demonic aura radiating from her peerage king power.',
              annotation: 'Violates epistemic boundaries and replaces concrete sensory geometry with abstract anime terminology.',
              type: 'ineffective',
              criterionAnalysis: 'Fails constraint #1 (no abstract aura naming) and leaks knowledge Ira/Jonah cannot possess in Chapter 6.'
            }
          ]
        },
        componentE: {
          practicalProcedures: [
            '1. Establish at least two concrete mundane sensory anchors (light angle, surface texture, ambient sound) before introducing any anomaly.',
            '2. Express the anomaly as a measurable physical or proprioceptive discrepancy (length, weight, timing lag, acoustic friction).',
            '3. Restrict the anomaly’s duration to a fraction of a second or a single frozen interval.',
            '4. Follow the anomaly with the focalizer’s pragmatic attempt to rationalize or suppress it in favor of immediate survival/task demands.'
          ],
          decisionRules: [
            'IF the focalizer lacks supernatural knowledge THEN forbid terms like "aura", "mana", "demonic", or "magic".',
            'IF the scene is primarily mundane/institutional (like the Chapter 7 examination) THEN suppress anomalies entirely to let institutional pressure carry the scene.'
          ],
          constraints: [
            'Never use generic adjectives ("eerie", "otherworldly", "spooky", "sinister") as substitutes for physical geometry.',
            'Do not allow somatic distortion to halt scene progression for more than one paragraph unless the character is physically immobilized.'
          ],
          commonErrorsToAvoid: [
            'Stacking multiple metaphors on the same sensory beat.',
            'Allowing the narrator to confirm that the anomaly was supernatural when the character is still uncertain.'
          ],
          evaluationTests: [
            'Epistemic Cleanliness Test: Does the passage contain any noun or concept unavailable to Jonah/Ira at this point in the timeline?',
            'Concrete Geometry Test: Can the anomaly be drawn or measured physically (e.g., inches of shadow, seconds of visual hitch) rather than described abstractly?'
          ]
        }
      }
    }
  },
  {
    id: 'tp_somatic_cognitive_duality',
    name: 'Dual-Inhabitance Somatic vs. Episodic Split',
    category: 'psychology',
    description: 'Models the psychological and motor friction of a reincarnated/transmigrated consciousness (Jonah Laurence) inhabiting a body with pre-existing procedural memory and autonomous reflexes (Ira Lowe).',
    currentVersion: '1.1.0',
    tags: ['reincarnation', 'jonah-ira', 'motor-memory', 'identity-friction', 'character-voice'],
    createdAt: 1711820000000,
    updatedAt: 1711920000000,
    applicationRecords: [
      {
        id: 'app_rec_02',
        timestamp: 1711925000000,
        techniquePackId: 'tp_somatic_cognitive_duality',
        techniqueVersion: '1.1.0',
        chapterId: 'ledger_chapter_07_24ac432',
        originalPassage: 'I wrote the name Ira Lowe on the exam sheet. Surprisingly, I knew how to write Japanese kanji effortlessly.',
        revisedPassage: 'The first box took the number easily. Then the name. Lowe, Ira. My hand moved through the characters without much thought. The phonetic guide came next. The strange part was how little translation happened in my head. I knew what I was writing. I also didn’t have to stop and think about how to write it. My hand simply knew where the strokes went and how much pressure to use. Jonah knew what the sounds meant. The hand belonged to Ira. For a few seconds, those two things existed at the same time.',
        appliedProcedures: [
          '1. Separate episodic/biographical memory (absent for Ira, intact for Jonah) from procedural/motor skill (intact in Ira’s nervous system).',
          '2. Show the motor execution occurring slightly ahead of conscious deliberation.',
          '3. Register the psychological unsettledness of benefiting from a competence the narrator never earned.'
        ],
        outcomeStatus: 'effective',
        observedEffectNotes: 'Turns a potential plot convenience (knowing Japanese for the Kuoh exam) into an unsettling, character-defining ontological mystery.',
        methodUsed: 'manual_workbench'
      }
    ],
    versions: {
      '1.1.0': {
        versionNumber: '1.1.0',
        updatedAt: 1711920000000,
        changelog: 'Codified from Chapters 4, 5, 6, and 7 (hill awakening reflexes, mirror alienation, kanji stroke pressure).',
        componentA: {
          principles: 'Procedural Retention vs. Episodic Void: While the protagonist retains strictly Jonah Laurence’s seventeen years of autobiographical memory and has zero episodic recall of Ira Lowe’s past, the physical vessel of Ira Lowe retains ingrained motor programs, linguistic fluency, and pre-conscious threat assessment.',
          formalRepresentation: 'Mind(Episodic = Jonah, Bio_Ira = ∅) + Body(Procedural = Ira_Motor + Tactical_Reflex) -> Cognitive_Motor_Dissonance',
          coreAssumptions: 'Neurologically, procedural memory (basal ganglia/cerebellum) and episodic memory (hippocampus/neocortex) are dissociable. Representing this dissociation with clinical precision makes the transmigration psychologically credible and mysterious.',
          methodologicalStatus: 'project_adaptation'
        },
        componentB: {
          mechanisms: 'Splits action descriptions into two layers: the narrator’s conscious intention (often hesitant, grieving, or blue-collar American) and the body’s physical execution (fluid, balanced, high-pitched, pre-trained in Japanese and sightline scanning).',
          intendedEffects: 'Sustains the mystery of who or what Ira Lowe was before Chapter 4 while grounding everyday scenes (walking, speaking, taking an exam) in tangible bodily tension.',
          psychologicalPhilosophicalRationale: 'Explores the philosophy of personal identity (Lockean memory continuity vs. embodied cognition): when your body moves with "effortless, predatory grace" you never trained for, who are you?',
          limitationsAndRisks: 'If Ira’s procedural reflexes solve every problem effortlessly, tension drops. Procedural skill must never substitute for biographical or social knowledge (as shown in Chapter 8 when Ira fails basic conversational small talk).',
          evidenceBase: 'Grounded in cognitive neuroscience dissociation models and directly demonstrated in Ledger Chapters 4, 5, 6, 7, and 8.',
          mechanismSteps: [
            {
              stepNumber: 1,
              phase: 'Intention Initiation',
              InputState: 'Jonah’s conscious mind initiates an action (standing, speaking, writing kanji)',
              operation: 'Trigger Ira’s somatic execution a fraction of a beat faster or cleaner than Jonah expects.',
              observableOutput: 'Physical fluidity ("wearing gloves tailored so precisely they felt like a second skin").'
            },
            {
              stepNumber: 2,
              phase: 'Proprioceptive Audit',
              InputState: 'Action completes',
              operation: 'Contrast the body’s output (soft choir-like voice, slender center of gravity, automatic escape-route check) against Jonah’s 17-year habit expectations.',
              observableOutput: 'Identity friction and unspoken question about the body’s origin.'
            },
            {
              stepNumber: 3,
              phase: 'Biographical Boundary Check',
              InputState: 'Social or institutional inquiry occurs',
              operation: 'Enforce zero episodic recall—motor fluency cannot tell him where he went to school or who his neighbours are.',
              observableOutput: 'Vulnerability in interpersonal/investigative scenes (Chapter 8).'
            }
          ]
        },
        componentC: {
          sources: [
            'Squire, L. R. — Memory Systems of the Brain: A Brief History and Current Perspective (Procedural vs. Declarative dissociation)',
            'Apocrypha DXD Ledger Canon: Chapter 4 (Beyond), Chapter 6 (The Mechanics of Morning), Chapter 7 (The Examination)'
          ],
          historicalContext: 'Contrasts with standard isekai/transmigration tropes where protagonists either inherit full memory dumps or immediately treat the new body as a weightless avatar.',
          documentedLiteraryPrecedents: 'Identity-displacement fiction and clinical case studies of dissociative fugue.',
          attribution: 'Project-specific narrative architecture created for Apocrypha DXD: ForeverWorlds.',
          linkedCanonicalChapterIds: ['ledger_chapter_04_6337972', 'ledger_chapter_05_623acd3', 'ledger_chapter_06_c914b6a', 'ledger_chapter_07_24ac432']
        },
        componentD: {
          examples: [
            {
              title: 'Canonical Example: Instinctive Tactical Sightlines on the Hill (Chapter 4)',
              excerpt: 'My gaze snapped to the treeline. Then down the road to the drainage ditch. Then to the blind corner where the road curved toward a cluster of distant buildings. I stood frozen on the grass, my pulse steady, my breathing slow. Why did I just check those? I hadn’t thought about escape routes or cover. The assessment had simply occurred, clean and instinctive, before I had even realized I was looking.',
              annotation: 'Demonstrates autonomous threat-scanning reflexes built into the body prior to Jonah’s arrival.',
              type: 'effective',
              criterionAnalysis: 'Establishes that the vessel of Ira Lowe has a history of training or design that Jonah knows nothing about.',
              sourceChapterId: 'ledger_chapter_04_6337972'
            },
            {
              title: 'Canonical Example: Kanji Stroke Pressure During the Exam (Chapter 7)',
              excerpt: 'My hand simply knew where the strokes went and how much pressure to use. Jonah knew what the sounds meant. The hand belonged to Ira. For a few seconds, those two things existed at the same time.',
              annotation: 'Cleanly articulates the split between semantic recognition and motor execution.',
              type: 'effective',
              criterionAnalysis: 'Concise, unsentimental, and grounded in physical action.',
              sourceChapterId: 'ledger_chapter_07_24ac432'
            }
          ]
        },
        componentE: {
          practicalProcedures: [
            '1. Track physical differences in center of gravity, stride length (two inches shorter, cleaner tap), hair weight, and vocal register (soft, clear, high in the chest cavity).',
            '2. Allow procedural fluency in reading/speaking Japanese and physical balance, but strictly forbid any spontaneous flashback or memory unlock from Ira Lowe.',
            '3. Contrast outsiders’ visual categorization of Ira (delicate, feminine/androgynous, non-threatening "ornament") with Jonah’s internal blue-collar adolescent self-image.'
          ],
          decisionRules: [
            'IF a task relies on muscle memory or language recognition THEN the body assists automatically.',
            'IF a task requires autobiographical history ("Where did you go to school before?", "Do you live around here?") THEN the protagonist must rely purely on paper evidence or improvisation.'
          ],
          constraints: [
            'Never grant Jonah sudden access to Ira’s personal memories, childhood, or relationships.',
            'Do not treat the body’s grace as a combat superpower in mundane scenes; keep it grounded in posture, balance, and handwriting.'
          ],
          commonErrorsToAvoid: [
            'Forgetting the vocal pitch mismatch when Ira speaks to strangers.',
            'Letting Jonah’s internal monologue sound archaic or aristocratic—his thoughts remain grounded, practical, and seventeen.'
          ],
          evaluationTests: [
            'Memory Dissociation Test: Does the scene preserve the strict wall between procedural competence (present) and episodic memory of Ira’s past (absent)?'
          ]
        }
      }
    }
  },
  {
    id: 'tp_causal_compression',
    name: 'Paratactic Kinetic & Crisis Compression',
    category: 'prose',
    description: 'Modulates sentence length, paragraph white-space, and syntactic subordination in inverse proportion to physical velocity, shock, or cognitive overload.',
    currentVersion: '1.2.0',
    tags: ['syntax', 'pacing', 'parataxis', 'crisis-rhythm', 'prose-mechanics'],
    createdAt: 1711830000000,
    updatedAt: 1711890000000,
    applicationRecords: [],
    versions: {
      '1.2.0': {
        versionNumber: '1.2.0',
        updatedAt: 1711890000000,
        changelog: 'Calibrated with Chapter 3 (Impact) and Chapter 7 (Examination time-pressure shift).',
        componentA: {
          principles: 'Syntactic Bandwidth Matching: Human working memory narrows under acute physical crisis or time pressure. Prose syntax must mirror cognitive bandwidth by stripping subordinate clauses and isolating sensory impacts onto single-line paragraphs.',
          formalRepresentation: 'Crisis_Intensity(↑) => Clause_Subordination(↓) + Paragraph_Break_Frequency(↑) + Verb_Transitivity(↑)',
          coreAssumptions: 'Long hypotactic sentences imply reflective leisure. Short paratactic fragments force the reader’s eye down the page at the speed of the event.',
          methodologicalStatus: 'documented_principle'
        },
        componentB: {
          mechanisms: 'Transitions systematically from multi-clause descriptive paragraphs (establishing environment) to clipped declarative statements and single-noun sensory flashes during peak impact or countdowns.',
          intendedEffects: 'Produces visceral kinetic momentum in crisis scenes (Chapter 3 collision) and crisp procedural focus in institutional scenes (Chapter 7 exam countdown).',
          psychologicalPhilosophicalRationale: 'Reflects attentional tunneling under sympathetic nervous system arousal.',
          limitationsAndRisks: 'If sustained across an entire chapter without rhythmic recovery, single-line fragmentation becomes monotonous and loses impact. Requires deliberate slow-down intervals.',
          evidenceBase: 'Grounded in stylistic rhythm analysis and demonstrated in Chapter 3 (Impact) and Chapter 7 (The Examination).',
          mechanismSteps: [
            {
              stepNumber: 1,
              phase: 'Baseline Cadence',
              InputState: 'Normal scene navigation',
              operation: 'Use balanced 15-25 word sentences with concrete environmental observation.',
              observableOutput: 'Grounded narrative pacing.'
            },
            {
              stepNumber: 2,
              phase: 'Compression Threshold',
              InputState: 'Sudden threat, pursuit, or countdown ("Twenty minutes remaining")',
              operation: 'Eliminate relative clauses ("which", "that") and isolate physical actions into 2-6 word lines.',
              observableOutput: 'Accelerated reading velocity and heightened urgency.'
            },
            {
              stepNumber: 3,
              phase: 'Aftermath Expansion',
              InputState: 'Crisis concludes or environment stabilizes',
              operation: 'Lengthen sentences gradually as breathing and observational perimeter return.',
              observableOutput: 'Earned emotional or physical decompression.'
            }
          ]
        },
        componentC: {
          sources: [
            'Virginia Tufte — Artful Sentences: Syntax as Style',
            'Apocrypha DXD Ledger Canon: Chapter 3 (Impact) & Chapter 7 (The Examination)'
          ],
          historicalContext: 'Modernist parataxis refined for high-impact contemporary literary and speculative prose.',
          documentedLiteraryPrecedents: 'Ernest Hemingway; Cormac McCarthy; modern psychological thriller prose.',
          attribution: 'Standard syntactic pacing principle adapted to Apocrypha DXD.',
          linkedCanonicalChapterIds: ['ledger_chapter_03_013bf32', 'ledger_chapter_07_24ac432']
        },
        componentD: {
          examples: [
            {
              title: 'Canonical Example: The Collision Sequence (Chapter 3)',
              excerpt: 'The headlights hit me.\n\nWHITE.\n\nMy body understood before my brain did.\n\nMOVE.\n\nI tried.\n\nMy foot slipped.\n\nThe world lurched.\n\nBOOOOOOOOOOOOOOM!\n\nPain.\n\nNoise.\n\nWhite.\n\nI didn’t know which way was up.',
              annotation: 'Strips syntax down to raw sensory nouns ("Pain. Noise. White.") at the exact moment of physical trauma.',
              type: 'effective',
              criterionAnalysis: 'Zero retrospective commentary during the impact; pure chronological sensory sequence.',
              sourceChapterId: 'ledger_chapter_03_013bf32'
            },
            {
              title: 'Canonical Example: Exam Rhythm Consolidation (Chapter 7)',
              excerpt: 'By question fifteen, I had settled into a rhythm.\n\nRead.\n\nRecognize.\n\nChoose.\n\nFill.\n\nTurn the page.',
              annotation: 'Uses five single-line verbs/clauses to enact cognitive workflow during the Language examination module.',
              type: 'effective',
              criterionAnalysis: 'Demonstrates that paratactic compression also models intense procedural focus, not just violence.',
              sourceChapterId: 'ledger_chapter_07_24ac432'
            }
          ]
        },
        componentE: {
          practicalProcedures: [
            '1. Order clause elements strictly in chronological order of perception: Sound/Light -> Somatic Impact -> Delayed Realization.',
            '2. Replace passive constructions and "I saw / I heard / I felt" filter verbs with direct environmental subjects.',
            '3. After a high-compression sequence, re-anchor the character in a quiet, concrete physical detail (e.g., rain on cheek, boiling kettle).'
          ],
          decisionRules: [
            'IF physical danger or time pressure spikes THEN cut average sentence length below 8 words.',
            'IF the character is waiting or reflecting (as in Chapter 8) THEN restore fuller hypotactic reflection to expose internal overthinking.'
          ],
          constraints: [
            'Do not use abstract philosophical metaphors in the middle of a physical impact sequence.',
            'Avoid using exclamation marks on narrative prose lines (reserve for spoken cries or acoustic onomatopoeia).'
          ],
          commonErrorsToAvoid: [
            'Explaining *why* something happened before showing the physical collision.',
            'Using fragmented one-word lines during casual, low-stakes walking scenes where fuller texture belongs.'
          ],
          evaluationTests: [
            'Chronological Order Test: Does any sentence in the crisis sequence state the cause before the sensory effect?',
            'Filter-Verb Audit: Have "I noticed that", "I realized that", and "It seemed to me" been removed from peak kinetic beats?'
          ]
        }
      }
    }
  },
  {
    id: 'tp_epistemic_irony',
    name: 'Over-Preparation & Conversational Mismatch',
    category: 'narrative',
    description: 'Exposes the fragility of a character’s defensive rules ("Think ahead. Stop walking into things unprepared") by staging ordinary social interactions that bypass their pre-scripted answers.',
    currentVersion: '1.0.0',
    tags: ['character-psychology', 'dialogue', 'defensive-rules', 'chapter-8', 'epistemic-gap'],
    createdAt: 1711850000000,
    updatedAt: 1711950000000,
    applicationRecords: [],
    versions: {
      '1.0.0': {
        versionNumber: '1.0.0',
        updatedAt: 1711950000000,
        changelog: 'Extracted directly from Chapter 8 (The Architecture of Waiting) café experiment and dossier investigation.',
        componentA: {
          principles: 'The Pre-Scripted Trap: When an anxious or displaced protagonist adopts a rigid rule of anticipatory control ("predict what people will ask so you are never caught off guard"), test that rule in low-stakes social reality where an initial minor success breeds overconfidence, immediately followed by a mismatch where the protagonist answers an unasked question.',
          formalRepresentation: 'Trauma/Uncertainty -> Defensive_Rule("Anticipate Everything") -> Trial_1(Partial_Hit + Overformal_Tone) -> Trial_2(Schema_Mismatch: Answer(Q_expected) != Question(Q_actual)) -> Pivoting_to_Empirical_Investigation',
          coreAssumptions: 'Psychological growth is earned through falsifiable behavioral experiments in scene, not internal pep talks.',
          methodologicalStatus: 'project_adaptation'
        },
        componentB: {
          mechanisms: 'Pairs internal anticipatory branching ("If he asks X, I will say Y") against casual, unbothered dialogue from secondary characters who have their own mundane priorities.',
          intendedEffects: 'Creates acute, relatable social friction and forces the protagonist to abandon imaginary conversational armor in favor of concrete empirical action (investigating the dossier address).',
          psychologicalPhilosophicalRationale: 'Models hypervigilant social monitoring and cognitive rigidity following trauma/displacement: trying to control interpersonal unpredictability guarantees awkwardness because real interlocutors are not interrogators.',
          limitationsAndRisks: 'Must keep the secondary characters natural and non-hostile so the protagonist realizes the friction came from his own over-preparation, not external persecution.',
          evidenceBase: 'Directly realized in Chapter 8 ("The Architecture of Waiting").',
          mechanismSteps: [
            {
              stepNumber: 1,
              phase: 'Rule Formulation',
              InputState: 'Protagonist confronts identity gap in solitude',
              operation: 'Formulate a seductive, seemingly logical coping rule ("Think ahead. Pay attention. Stop walking into things unprepared").',
              observableOutput: 'Temporary illusion of control.'
            },
            {
              stepNumber: 2,
              phase: 'False Positive Validation',
              InputState: 'First social interaction (Café waitress)',
              operation: 'Allow the protagonist to predict the question ("Do you need help with the menu?") while botching the register ("Thank you for your consideration").',
              observableOutput: 'Mixed result that tempts the character to cling to the rule.'
            },
            {
              stepNumber: 3,
              phase: 'Schema Collision & Pivot',
              InputState: 'Second social interaction (Teenage boys in café)',
              operation: 'Have the interlocutor ask a simple local question ("Hey, do you live around here?") and have the protagonist blurt out his pre-scripted institutional defense ("No, I’m here for the academy").',
              observableOutput: 'Exposes the rule’s flaw and motivates concrete archival investigation.'
            }
          ]
        },
        componentC: {
          sources: [
            'Apocrypha DXD Ledger Canon: Chapter 8 (The Architecture of Waiting)',
            'Cognitive-Behavioral models of safety behaviors and hypervigilant social scripting'
          ],
          historicalContext: 'Psychological realism technique for grounding high-concept speculative premises in everyday human vulnerability.',
          documentedLiteraryPrecedents: 'Dostoevsky (Notes from Underground); Kazuo Ishiguro (The Unconsoled).',
          attribution: 'Derived from Chapter 8 of Apocrypha DXD: ForeverWorlds.',
          linkedCanonicalChapterIds: ['ledger_chapter_08_f9fb939']
        },
        componentD: {
          examples: [
            {
              title: 'Canonical Example: Answering the Unasked Question (Chapter 8)',
              excerpt: 'The first boy looked back in my direction. "Hey, do you live around here?" ... I had a response for a question he had not asked. "No," I said. "I’m here for the academy." He frowned slightly. "The academy?" ... He seemed to consider that for a second, then asked, "So where do you live?" I opened my mouth. Nothing useful came out.',
              annotation: 'Shows how preparing for an interrogation about his dossier causes Ira to fail a harmless neighborhood question.',
              type: 'effective',
              criterionAnalysis: 'Earns the chapter’s final pivot: realizing he cannot bluff his way through his paper life without investigating who created the dossier.',
              sourceChapterId: 'ledger_chapter_08_f9fb939'
            }
          ]
        },
        componentE: {
          practicalProcedures: [
            '1. Explicitly distinguish between what the protagonist *expects* an interlocutor to care about and what the interlocutor *actually* cares about (e.g., meeting their complaining friend).',
            '2. Let the narrator recognize when a coping rule is unfair ("The rule promised control by making every surprise feel like a personal failure").',
            '3. Convert failed internal coping rules into concrete external investigative actions (e.g., copying the Kanagawa Prefectural Educational Development Association address onto a scrap of paper).'
          ],
          decisionRules: [
            'IF the protagonist invents a self-improvement rule in isolation THEN test and complicate that rule within the same chapter.',
            'IF a stranger notices Ira’s appearance THEN keep their reaction brief and ordinary rather than melodramatic.'
          ],
          constraints: [
            'Do not make random townspeople act like omniscient interrogators.',
            'Ensure every psychological realization produces a concrete physical decision or next step.'
          ],
          commonErrorsToAvoid: [
            'Letting the protagonist’s new mental rule magically make him suave and socially infallible.',
            'Leaving internal reflection untethered from physical objects (the kettle, the blue 1044 placard, the folded map).'
          ],
          evaluationTests: [
            'Falsifiability Test: Does the scene subject the character’s internal rule to an external test that reveals its blindspot?',
            'Action Pivot Test: Does the scene end with a tangible investigative lead rather than circular brooding?'
          ]
        }
      }
    }
  }
];

export const INITIAL_SCHEMES_OF_WORK: SchemeOfWork[] = [
  {
    id: 'sow_act1_threshold',
    title: 'Act I: Mortality, Transmigration & The Kuoh Threshold (Ch. 1–8)',
    scope: 'Chapters 1 to 8 — Canonical Ledger Arc',
    originalSource: 'idesmond11p7/The-Ledger (Authoritative Chapter Dump + Coordinator Architecture)',
    overview: 'Traces seventeen-year-old Jonah Laurence’s final days (sleep paralysis, targeted social sabotage, and fatal collision while chasing a phone thief), his disembodied transit beyond the observable universe, and his awakening in 2005 Japan inside the sixteen-year-old body of "Ira Lowe"—culminating in the Kuoh Academy entrance examination and the decision to investigate the organization behind his fabricated educational dossier.',
    charactersInvolved: [
      'Jonah Laurence (Original Self, Ch. 1–3)',
      'Ira Lowe (Reincarnated Vessel / Identity, Ch. 4–8)',
      'Jonah’s Mother (Ch. 1, remembered in Ch. 3, 5, 8)',
      'Daniel (Jonah’s Best Friend, Ch. 1–3)',
      'Maya (Classmate in Ch. 1–2)',
      'Unidentified Kuoh Student Council Figure (Violet Eyes / Extended Shadow, Ch. 6)'
    ],
    milestones: [
      {
        id: 'm_ch1_morning',
        title: 'M1: The 3:17 AM Entity & The Improvement List',
        targetChapterNumber: 1,
        intendedEvents: [
          'Jonah experiences sleep paralysis at 3:17 AM with an upright shadow scraping the floorboards',
          'Receives anonymous midnight texts ("You awake?", "You should watch your back")',
          'Writes "List for Improving My Life" in his phone notes and walks to school with Daniel'
        ],
        characterBeats: [
          'Self-perception as "average" and chronic reliance on "tomorrow" to fix his habits',
          'Quiet domestic warmth with his mother before school'
        ],
        thematicGoals: [
          'Establish the fragile normalcy and deferred promises of Jonah’s original life'
        ],
        status: 'completed'
      },
      {
        id: 'm_ch2_fracture',
        title: 'M2: Social Sabotage & The Second Anonymous Warning',
        targetChapterNumber: 2,
        intendedEvents: [
          'Out-of-context group chat screenshots circulate across the school',
          'Maya returns Jonah’s history notebook and distances herself',
          'Unknown number texts: "You looked happy today. Enjoy it while you can."'
        ],
        characterBeats: [
          'Helplessness against coordinated reputational fracture',
          'Growing sense of unseen surveillance'
        ],
        thematicGoals: [
          'Erode Jonah’s social perimeter prior to physical isolation in Chapter 3'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch1_morning']
      },
      {
        id: 'm_ch3_impact',
        title: 'M3: The Phone Theft Pursuit & Fatal Collision',
        targetChapterNumber: 3,
        intendedEvents: [
          'Daniel departs early for an appointment, leaving Jonah to walk home alone',
          'A hooded thief snatches Jonah’s blue-cased phone containing his improvement list',
          'Jonah chases the thief into a sudden downpour and is struck by an impossibly massive black vehicle'
        ],
        characterBeats: [
          'Desperate refusal to lose his phone/list',
          'Dying stream-of-consciousness culminating in "...I’ll do better" and belief in "Tomorrow"'
        ],
        thematicGoals: [
          'Sever the first life at the moment of unresolved intention'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch2_fracture']
      },
      {
        id: 'm_ch4_beyond',
        title: 'M4: Cosmic Transit & Awakening on the Hill',
        targetChapterNumber: 4,
        intendedEvents: [
          'Disembodied drift past black holes, non-Euclidean geometry, and the shrinking sphere of the observable universe',
          'Collision with an ancient boundary wall and awakening on a moonlit grassy hill in a new body',
          'Instinctive sightline check (treeline, ditch, blind corner) and discovery of the unfamiliar reflection in the apartment mirror'
        ],
        characterBeats: [
          'Ontological awe and terror during cosmic transit',
          'Visceral shock of inhabiting a foreign body with autonomous predatory grace and a soft voice'
        ],
        thematicGoals: [
          'Bridge cosmic scale with hyper-specific bodily alienation'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch3_impact']
      },
      {
        id: 'm_ch5_second_morning',
        title: 'M5: Grief, Identity Discovery (Ira Lowe) & Reconnaissance to Kuoh',
        targetChapterNumber: 5,
        intendedEvents: [
          'Daylight examination of the new body (16-year-old male with delicate features, emerald eyes, long black-and-teal hair)',
          'Emotional breakdown mourning his lost home and family, followed by resolve in the shower',
          'Discovery of the "Ira Lowe" ID card and Kuoh Academy entrance exam notice; first reconnaissance trip to Kuoh'
        ],
        characterBeats: [
          'Acceptance that he is alive and has a second chance',
          'Navigating an unfamiliar Japanese city using a paper map and strangers’ directions'
        ],
        thematicGoals: [
          'Transition from paralysis and grief to practical agency'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch4_beyond']
      },
      {
        id: 'm_ch6_mechanics_morning',
        title: 'M6: Exam Day Commute, Applicant 1044 & The Corridor Shadow',
        targetChapterNumber: 6,
        intendedEvents: [
          'Morning routine in the 2005 apartment; commuter train interaction with the hazel-eyed woman; pork bun at Minami-Chofu',
          'Near-miss with the Rapid train; registration at Kuoh Academy as Applicant No. 1044 ("Overseas transfer / Independent curriculum")',
          'Encounter in the main hall with the tall, violet-eyed student council figure whose shadow stretches 5–6 inches too long'
        ],
        characterBeats: [
          'Self-possession under pressure ("You fix the problem. You don’t whine about the track")',
          'Claiming ownership of his new hands in Room 301 as the 9:00 AM bronze bell strikes'
        ],
        thematicGoals: [
          'Ground the supernatural world of Kuoh in dense 2005 material realism before hinting at its hidden rulers'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch5_second_morning']
      },
      {
        id: 'm_ch7_examination',
        title: 'M7: The Examination & Quiet Decompression',
        targetChapterNumber: 7,
        intendedEvents: [
          'Completing the 80-minute Language and Mathematics modules at Desk 44',
          'Experiencing simultaneous dual awareness as Ira’s hand writes kanji while Jonah comprehends the meaning',
          'Post-exam walk down Kuoh hill, eating warm curry buns in the park, and returning to the quiet apartment'
        ],
        characterBeats: [
          'Disciplined focus under institutional rules',
          'Quiet earned relief ("I’m back") followed by the onset of post-task silence'
        ],
        thematicGoals: [
          'Demonstrate competence and the quiet rhythms of ordinary survival'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch6_mechanics_morning']
      },
      {
        id: 'm_ch8_architecture_waiting',
        title: 'M8: The Architecture of Waiting & The Dossier Lead',
        targetChapterNumber: 8,
        intendedEvents: [
          'Confronting the lack of biographical memories behind his "Overseas Transfer / Independent Curriculum" dossier',
          'Formulating and testing the "Think ahead" rule at a local café (waitress exchange vs. awkward mismatch with two teenage boys)',
          'Copying the issuer address (Kanagawa Prefectural Educational Development Association, Minami-Kuoh annex) to investigate at the library tomorrow'
        ],
        characterBeats: [
          'Recognizing that pre-scripting conversations cannot solve his missing past',
          'Shifting from defensive social anxiety to concrete archival investigation'
        ],
        thematicGoals: [
          'Launch the next narrative arc: investigating who constructed "Ira Lowe"'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch7_examination']
      }
    ],
    discrepancies: [
      {
        chapterId: 'ledger_chapter_08_f9fb939',
        description: 'Ledger Title Discrepancy: Canonical file `ledger/records/chapter/chapter_08_the_architecture_of_waiting.md` is titled "Chapter 8 — The Architecture of Waiting", whereas an earlier user request referred to Chapter 8 as "The Logistics of Waiting".',
        actionRequired: 'Preserve authoritative Ledger title ("The Architecture of Waiting") while keeping "The Logistics of Waiting" indexed in search and continuity notes.',
        resolved: false
      },
      {
        chapterId: 'ledger_chapter_06_c914b6a',
        description: 'Chapter 6 explicitly anchors the setting in early spring 2005 (silver Panasonic flip phone, pre-Suica paper magnetic tickets, 2005 cinema posters), whereas Chapters 1–3 feature modern smartphone group-chat screenshots in Jonah’s original world/timeline.',
        actionRequired: 'Track cross-world / cross-temporal displacement between Jonah’s origin timeline and Ira Lowe’s 2005 Kuoh timeline as a verified structural feature.',
        resolved: true
      }
    ],
    createdAt: 1711800000000,
    updatedAt: 1711950000000
  }
];

export const INITIAL_ANALYSES: ChapterAnalysis[] = [
  {
    id: 'ana_ledger_ch01',
    chapterId: 'ledger_chapter_01_7720d50',
    chapterVersionTimestamp: 1792815661000,
    analyzedAt: 1792816000000,
    isStale: false,
    provenance: 'derived_analysis',
    modelIdentifier: 'Canonical Seed Extraction (Verified against Ledger Ch. 1)',
    events: [
      {
        id: 'evt_ch1_01',
        chapterId: 'ledger_chapter_01_7720d50',
        sequenceIndex: 1,
        title: '12:42 AM Anonymous Threat Texts',
        summary: 'Prior to falling asleep, Jonah receives two messages from an unknown number ("You awake?" and "You should watch your back") and blocks the sender.',
        sceneLocation: 'Jonah’s Bedroom',
        chronologyType: 'flashback',
        storyTimeEstimate: '12:42 AM',
        charactersPresent: ['Jonah Laurence'],
        decisionPoints: ['Assumes it is a prank and blocks the number'],
        directConsequences: ['Heightened subconscious unease entering sleep'],
        causalPredecessors: [],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: '12:42 AM — Unknown Number: You awake?\n12:43 AM — Unknown Number: You should watch your back.'
      },
      {
        id: 'evt_ch1_02',
        chapterId: 'ledger_chapter_01_7720d50',
        sequenceIndex: 2,
        title: '3:17 AM Sleep Paralysis & Corner Entity',
        summary: 'Jonah wakes at 3:17 AM unable to move or breathe while an upright mass of thick shadow in the corner produces a slow, dry scraping sound across the floorboards.',
        sceneLocation: 'Jonah’s Bedroom',
        chronologyType: 'linear',
        storyTimeEstimate: '3:17 AM',
        charactersPresent: ['Jonah Laurence', 'Unidentified Corner Entity'],
        decisionPoints: ['Struggles to move fingers while paralyzed'],
        directConsequences: ['Wakes exhausted at 6:00 AM questioning whether it was a nightmare'],
        causalPredecessors: ['evt_ch1_01'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'Right where the closet met the wall, the shadows were too thick... Scrrrrtch. A slow, dry sound.'
      },
      {
        id: 'evt_ch1_03',
        chapterId: 'ledger_chapter_01_7720d50',
        sequenceIndex: 3,
        title: 'Drafting "List for Improving My Life" & Morning Routine',
        summary: 'At 6:00 AM, Jonah eats breakfast with his mother ("You’re welcome, Jonah Laurence") and creates a 5-point self-improvement list in his phone notes before walking to school with Daniel.',
        sceneLocation: 'Laurence Kitchen & Suburban Street',
        chronologyType: 'linear',
        storyTimeEstimate: '6:00 AM – 7:45 AM',
        charactersPresent: ['Jonah Laurence', 'Jonah’s Mother', 'Daniel'],
        decisionPoints: ['Writes list: Wake up early, Exercise, Study harder, Stop wasting time, Read more'],
        directConsequences: ['Establishes the phone and unfinished list as the emotional anchor he will die chasing in Chapter 3'],
        causalPredecessors: [],
        temporalPredecessors: ['evt_ch1_02'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'List for Improving My Life:\n1. Wake up early\n2. Exercise\n3. Study harder\n4. Stop wasting time\n5. Read more'
      }
    ],
    causalEdges: [
      {
        id: 'edge_ch1_1',
        sourceEventId: 'evt_ch1_01',
        targetEventId: 'evt_ch1_02',
        edgeType: 'contributing_condition',
        epistemicStatus: 'inferred',
        rationale: 'The 12:42 AM warning texts precede the 3:17 AM corner entity; whether the sender and the entity are causally linked or part of the same stalking/omen sequence remains an active investigation.',
        supportingPassageExcerpt: '12:43 AM — Unknown Number: You should watch your back.'
      },
      {
        id: 'edge_ch1_2',
        sourceEventId: 'evt_ch1_02',
        targetEventId: 'evt_ch1_03',
        edgeType: 'temporal_succession',
        epistemicStatus: 'explicit_text',
        rationale: 'The 6:00 AM alarm interrupts the night terror and initiates the mundane morning routine, though Jonah’s improvement list comes from long-standing habit rather than the entity.',
        supportingPassageExcerpt: 'BEEP. BEEP. BEEP. Light flooded the room.'
      }
    ],
    characterKnowledge: [
      {
        characterName: 'Jonah Laurence',
        roleOrIdentityNote: 'Protagonist (17 years old, Original Life)',
        knows: [
          'He received two anonymous texts at 12:42 AM and blocked the number',
          'He experienced a terrifying paralysis episode at 3:17 AM with a scraping sound in the corner',
          'Maya borrowed his history notebook the previous week'
        ],
        suspects: [
          'The 12:42 AM messages were just a prank from someone at school'
        ],
        believesFalsely: [
          'He has plenty of tomorrows left to gradually improve his life',
          'Blocking the first unknown number ended the harassment'
        ],
        unawareOf: [
          'Cropped screenshots of his old group chats are about to be posted anonymously at school (Ch. 2)',
          'He will die in the rain tomorrow afternoon (Ch. 3)'
        ],
        evidencePassage: 'I was seventeen. Seventeen wasn’t old.'
      }
    ],
    setupsAndPayoffs: [
      {
        setup: 'Jonah’s phone Notes app containing "List for Improving My Life" (Ch. 1)',
        payoff: 'Jonah sprints after the phone thief in Ch. 3 because the phone holds his unfinished list, leading directly into the path of the black vehicle.',
        status: 'paid_off',
        passageRef: 'My list. The notes app. I hadn’t finished it.',
        targetChapterRef: 'ledger_chapter_03_013bf32'
      },
      {
        setup: 'Mother’s parting kitchen phrase: "You’re welcome, Jonah Laurence." (Ch. 1)',
        payoff: 'Recalled as Jonah’s most cherished memory as he dies on the wet asphalt in Chapter 3.',
        status: 'paid_off',
        passageRef: '"You’re welcome, Jonah Laurence." I wanted to hear it again.',
        targetChapterRef: 'ledger_chapter_03_013bf32'
      },
      {
        setup: '3:17 AM upright shadow and dry scraping sound in Jonah’s bedroom corner (Ch. 1)',
        payoff: 'Unresolved ontological origin—potential connection to his transmigration or the forces monitoring him.',
        status: 'setup_only',
        passageRef: 'Scrrrrtch. A slow, dry sound.'
      }
    ],
    continuityFindings: [
      {
        id: 'cf_ch1_01',
        severity: 'verified_continuity',
        description: 'Daniel’s "four minutes early / four minutes late" banter in Chapter 1 is accurately recalled word-for-word during Jonah’s dying sensory flash in Chapter 3.',
        affectedChaptersOrEvents: ['ledger_chapter_01_7720d50', 'ledger_chapter_03_013bf32'],
        epistemicStatus: 'explicit_text',
        passageReference: 'You’re four minutes late. No. Four minutes early. Whatever.'
      }
    ],
    identifiedTechniques: [
      {
        techniqueName: 'Somatic & Perceptual Fracture',
        techniquePackId: 'tp_sensory_fracture',
        confidence: 'high_evidence',
        supportingPassage: 'Right where the closet met the wall, the shadows were too thick. They didn’t blend into the rest of the dark the way they were supposed to.',
        analysis: 'Uses shadow geometry and acoustic friction during sleep paralysis without introducing supernatural terminology.'
      }
    ],
    overallNarrativeAssessment: {
      strengths: [
        'Seamless contrast between 3:17 AM nocturnal dread and warm, grounded suburban morning banter',
        'Every mundane detail (the crack in the ceiling, the mother’s phrase, the notes list) pays off emotionally in Chapter 3'
      ],
      vulnerabilities: [],
      causalIntegrityScore: '96%',
      summary: 'Establishes Jonah Laurence’s baseline life, voice, and deferred ambitions while planting the first ominous threads.'
    }
  },
  {
    id: 'ana_ledger_ch06',
    chapterId: 'ledger_chapter_06_c914b6a',
    chapterVersionTimestamp: 1792815666000,
    analyzedAt: 1792816500000,
    isStale: false,
    provenance: 'derived_analysis',
    modelIdentifier: 'Canonical Seed Extraction (Verified against Ledger Ch. 6)',
    events: [
      {
        id: 'evt_ch6_01',
        chapterId: 'ledger_chapter_06_c914b6a',
        sequenceIndex: 1,
        title: 'Exam Day Morning Preparation in Ira’s Apartment',
        summary: 'Waking at 6:30 AM in early spring 2005, Jonah/Ira ties back his long black-and-teal hair, brews drip coffee, checks Applicant Slip and 11,000 yen, and dresses in a charcoal wool duffel coat.',
        sceneLocation: 'Ira Lowe’s Third-Floor Apartment',
        chronologyType: 'linear',
        storyTimeEstimate: '6:30 AM – 7:15 AM',
        charactersPresent: ['Ira Lowe (Jonah Laurence)'],
        decisionPoints: ['Wears heavy duffel coat to conceal slender frame', 'Packs 3 HB pencils, eraser, and Kuoh application slip'],
        directConsequences: ['Departs on schedule for the railway station'],
        causalPredecessors: [],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'On the low table lay the brown envelope... The application slip for Kuoh Academy.'
      },
      {
        id: 'evt_ch6_02',
        chapterId: 'ledger_chapter_06_c914b6a',
        sequenceIndex: 2,
        title: 'JR Commuter Train & Big-Sister Misrecognition',
        summary: 'On the crowded JR train, a hazel-eyed woman in a camel coat mistakes Ira for a nervous girl heading to an entrance exam and offers gentle encouragement ("With a face like that, the interviewers will probably pass you before you even sit down").',
        sceneLocation: 'JR Commuter Train Carriage',
        chronologyType: 'linear',
        storyTimeEstimate: '7:35 AM',
        charactersPresent: ['Ira Lowe (Jonah Laurence)', 'Commuter Woman in Camel Coat'],
        decisionPoints: ['Tries to drop vocal pitch half an octave, fails, and accepts the encouragement silently'],
        directConsequences: ['Reinforces awareness of how his new appearance alters social treatment ("I am officially non-threatening")'],
        causalPredecessors: ['evt_ch6_01'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: '"Don’t be nervous. With a face like that, the interviewers will probably pass you before you even sit down."'
      },
      {
        id: 'evt_ch6_03',
        chapterId: 'ledger_chapter_06_c914b6a',
        sequenceIndex: 3,
        title: 'Minami-Chofu Pork Bun & Rapid Train Near-Miss',
        summary: 'At the Minami-Chofu transfer concourse, Ira eats a steaming nikuman (pork bun), then nearly boards the Rapid train that bypasses Kuoh before spotting "Kuoh: Passed" on the door timetable and pulling his foot back.',
        sceneLocation: 'Minami-Chofu Station Concourse & Platform',
        chronologyType: 'linear',
        storyTimeEstimate: '8:05 AM',
        charactersPresent: ['Ira Lowe (Jonah Laurence)'],
        decisionPoints: ['Yanks foot back from closing Rapid train doors', 'Calmly checks Local timetable instead of panicking'],
        directConsequences: ['Arrives at Kuoh Station on time via the 4-car Local train'],
        causalPredecessors: ['evt_ch6_02'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'Kuoh: Passed. The Rapid bypassed it entirely... I yanked my foot back just as the warning chime sounded.'
      },
      {
        id: 'evt_ch6_04',
        chapterId: 'ledger_chapter_06_c914b6a',
        sequenceIndex: 4,
        title: 'Registration as Applicant No. 1044 & The Corridor Shadow Anomaly',
        summary: 'Ira registers at the West Hall baize table ("Overseas transfer track / Independent curriculum"), receives placard 1044, and inside the main corridor witnesses a tall, spectacled, violet-eyed student council figure whose shadow stretches 5–6 inches past the window geometry.',
        sceneLocation: 'Kuoh Academy Courtyard & Main Hall Corridor',
        chronologyType: 'linear',
        storyTimeEstimate: '8:35 AM – 9:00 AM',
        charactersPresent: ['Ira Lowe (Jonah Laurence)', 'Registration Teacher', 'Violet-Eyed Student Council Figure'],
        decisionPoints: ['Deflects teacher’s curiosity with "Everything is in the dossier"', 'Dismisses the elongated shadow to focus on passing the exam in Room 301'],
        directConsequences: ['Takes seat 44 in Room 301 as the 9:00 AM bell begins the examination (Ch. 7)'],
        causalPredecessors: ['evt_ch6_03'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'For half a heartbeat, the dark shape cast by her hem and shoulders reached five or six inches past where the geometry of the window mullions should have allowed.'
      }
    ],
    causalEdges: [
      {
        id: 'edge_ch6_1',
        sourceEventId: 'evt_ch6_01',
        targetEventId: 'evt_ch6_02',
        edgeType: 'direct_causation',
        epistemicStatus: 'explicit_text',
        rationale: 'Boarding the morning JR commuter train with his exam bag visible prompts the commuter woman’s remark.',
        supportingPassageExcerpt: 'She was looking at my canvas bag, the pencil case visible through the unzipped top edge.'
      },
      {
        id: 'edge_ch6_2',
        sourceEventId: 'evt_ch6_03',
        targetEventId: 'evt_ch6_04',
        edgeType: 'direct_causation',
        epistemicStatus: 'explicit_text',
        rationale: 'Catching the error on the Rapid train allows Ira to arrive at Kuoh before the 8:45 AM registry cutoff ordered by the student council figure.',
        supportingPassageExcerpt: '"Close the registry at eight-forty-five."'
      }
    ],
    characterKnowledge: [
      {
        characterName: 'Ira Lowe (Jonah Laurence)',
        roleOrIdentityNote: 'Protagonist (16-year-old vessel in 2005 Japan)',
        knows: [
          'His registered name is Ira Lowe, Applicant No. 1044, under "Overseas transfer / Independent curriculum"',
          'The current year is 2005 (flip phone, cinema posters, early Suica era)',
          'Kuoh Academy recently transitioned from an all-girls private institution to co-ed'
        ],
        suspects: [
          'The tall, violet-eyed girl in the corridor wields institutional authority even over adult faculty'
        ],
        believesFalsely: [
          'The 5–6 inch shadow extension on the oak parquetry was merely a trick of the leaded glass and morning glare'
        ],
        unawareOf: [
          'The true identity of the violet-eyed student council figure (Sona Sitri / Devils of Kuoh)',
          'Who assembled his "Overseas transfer / Independent curriculum" dossier'
        ],
        evidencePassage: 'A trick of the double-paned leaded glass and the morning glare.'
      }
    ],
    setupsAndPayoffs: [
      {
        setup: 'Ira tells the registration teacher "Everything is in the dossier" to explain his "Independent curriculum" background (Ch. 6)',
        payoff: 'In Chapter 8, Ira realizes that while that phrase satisfied a busy administrator, it will collapse in personal conversation—prompting him to investigate the dossier’s issuing association.',
        status: 'paid_off',
        passageRef: 'At the academy, I had managed it by saying that everything was in the dossier... It did not mean I could live inside the explanation indefinitely.',
        targetChapterRef: 'ledger_chapter_08_f9fb939'
      },
      {
        setup: 'The violet-eyed student council figure orders the registry closed at 8:45 AM and casts an anomalously dense, elongated shadow (Ch. 6)',
        payoff: 'First concrete physical trace of Kuoh Academy’s supernatural governance.',
        status: 'setup_only',
        passageRef: 'Behind her glasses, her eyes were a dark, deep violet.'
      }
    ],
    continuityFindings: [
      {
        id: 'cf_ch6_01',
        severity: 'verified_continuity',
        description: 'Applicant No. 1044 blue plastic placard and Room 301 / Desk 44 carry continuously across Chapters 6, 7, and 8 without discrepancy.',
        affectedChaptersOrEvents: ['ledger_chapter_06_c914b6a', 'ledger_chapter_07_24ac432', 'ledger_chapter_08_f9fb939'],
        epistemicStatus: 'explicit_text',
        passageReference: 'Applicant No. 1044. Third floor, North Hall, Room 301.'
      }
    ],
    identifiedTechniques: [
      {
        techniqueName: 'Somatic & Perceptual Fracture',
        techniquePackId: 'tp_sensory_fracture',
        confidence: 'high_evidence',
        supportingPassage: 'For half a heartbeat, the dark shape cast by her hem and shoulders reached five or six inches past where the geometry of the window mullions should have allowed',
        analysis: 'Exemplary geometric micro-anomaly followed by rational dismissal.'
      },
      {
        techniqueName: 'Dual-Inhabitance Somatic vs. Episodic Split',
        techniquePackId: 'tp_somatic_cognitive_duality',
        confidence: 'high_evidence',
        supportingPassage: 'Ira’s legs were shorter than Jonah’s by maybe two inches, but his center of gravity was lower, cleaner. I didn’t clomp.',
        analysis: 'Tracks concrete biomechanical and social-perception differences between Jonah’s 17-year habits and Ira’s 16-year-old frame.'
      }
    ],
    overallNarrativeAssessment: {
      strengths: [
        'Rich 2005 Japanese sensory grounding (nikuman steam, magnetic paper tickets, parquetry wax)',
        'Masterful restraint in introducing the violet-eyed student council figure purely through spatial deference and a half-second shadow anomaly'
      ],
      vulnerabilities: [],
      causalIntegrityScore: '98%',
      summary: 'Anchors the Kuoh setting in tangible 2005 reality while planting the first subtle supernatural visual cue.'
    }
  },
  {
    id: 'ana_ledger_ch08',
    chapterId: 'ledger_chapter_08_f9fb939',
    chapterVersionTimestamp: 1792815668000,
    analyzedAt: 1792817000000,
    isStale: false,
    provenance: 'derived_analysis',
    modelIdentifier: 'Canonical Seed Extraction (Verified against Ledger Ch. 8)',
    events: [
      {
        id: 'evt_ch8_01',
        chapterId: 'ledger_chapter_08_f9fb939',
        sequenceIndex: 1,
        title: 'Confronting the Dossier Gap & Formulating the "Think Ahead" Rule',
        summary: 'Sitting in the quiet apartment after the exam, Ira inspects placard 1044 and his "Overseas Transfer / Independent Curriculum" papers, realizing he has no memories to answer personal questions about his past, and formulates the defensive rule: "Think ahead. Pay attention. Stop walking into things unprepared."',
        sceneLocation: 'Ira Lowe’s Apartment',
        chronologyType: 'linear',
        storyTimeEstimate: 'Evening (Post-Exam)',
        charactersPresent: ['Ira Lowe (Jonah Laurence)'],
        decisionPoints: ['Adopts anticipatory control rule', 'Decides to go for an evening walk to escape the quiet apartment'],
        directConsequences: ['Enters a neighborhood café and tests his predictive rule'],
        causalPredecessors: [],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'Think ahead. Pay attention. Stop walking into things unprepared.'
      },
      {
        id: 'evt_ch8_02',
        chapterId: 'ledger_chapter_08_f9fb939',
        sequenceIndex: 2,
        title: 'Café Trial 1: Predicting the Waitress’s Question (Over-Formal Response)',
        summary: 'Inside a quiet commercial-street café, Ira predicts the waitress will ask if he needs help with the menu, but replies so stiffly ("Thank you for your consideration") that she gently teases him for speaking like he is addressing a school principal.',
        sceneLocation: 'Neighborhood Café',
        chronologyType: 'linear',
        storyTimeEstimate: 'Evening',
        charactersPresent: ['Ira Lowe (Jonah Laurence)', 'Café Waitress', 'Newspaper Regular'],
        decisionPoints: ['Pre-empts the menu question with overly formal Japanese'],
        directConsequences: ['Feels a false surge of confidence in his predictive method despite the awkward phrasing'],
        causalPredecessors: ['evt_ch8_01'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: '"You don’t have to speak to me like I’m a school principal," she said.'
      },
      {
        id: 'evt_ch8_03',
        chapterId: 'ledger_chapter_08_f9fb939',
        sequenceIndex: 3,
        title: 'Café Trial 2: Conversational Mismatch with Two Teenage Boys',
        summary: 'Two teenage boys enter with a map, briefly mistake Ira for a girl from behind, and ask "Hey, do you live around here?" Because Ira pre-scripted an answer about his school dossier, he blurts out "No, I’m here for the academy," creating an awkward mismatch.',
        sceneLocation: 'Neighborhood Café',
        chronologyType: 'linear',
        storyTimeEstimate: 'Evening',
        charactersPresent: ['Ira Lowe (Jonah Laurence)', 'Two Teenage Boys'],
        decisionPoints: ['Answers the unasked question ("I’m here for the academy") instead of what was actually asked ("do you live around here?")'],
        directConsequences: ['Realizes on the walk home that pre-scripting conversations fails when people ask ordinary questions'],
        causalPredecessors: ['evt_ch8_02'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'I had a response for a question he had not asked. "No," I said. "I’m here for the academy."'
      },
      {
        id: 'evt_ch8_04',
        chapterId: 'ledger_chapter_08_f9fb939',
        sequenceIndex: 4,
        title: 'Extracting the Kanagawa Prefectural Educational Development Association Lead',
        summary: 'Returning to the apartment, Ira abandons abstract conversational scripting and examines the dossier’s issuing contact line: an administrative annex in Minami-Kuoh associated with the Kanagawa Prefectural Educational Development Association. He copies the address and marks his paper map to verify via the public library directory tomorrow.',
        sceneLocation: 'Ira Lowe’s Apartment',
        chronologyType: 'linear',
        storyTimeEstimate: 'Night',
        charactersPresent: ['Ira Lowe (Jonah Laurence)'],
        decisionPoints: ['Copies the Minami-Kuoh administrative annex address and phone number', 'Plans library directory verification before traveling'],
        directConsequences: ['Establishes the concrete investigative objective for Chapter 9'],
        causalPredecessors: ['evt_ch8_03'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'The address included the name of an administrative annex in the Minami-Kuoh area, associated with the Kanagawa Prefectural Educational Development Association.'
      }
    ],
    causalEdges: [
      {
        id: 'edge_ch8_1',
        sourceEventId: 'evt_ch8_01',
        targetEventId: 'evt_ch8_02',
        edgeType: 'direct_causation',
        epistemicStatus: 'explicit_text',
        rationale: 'Formulating the "Think ahead" rule directly drives Ira to anticipate the waitress’s menu question.',
        supportingPassageExcerpt: 'The rule came back to me because there was suddenly something to think about.'
      },
      {
        id: 'edge_ch8_2',
        sourceEventId: 'evt_ch8_02',
        targetEventId: 'evt_ch8_03',
        edgeType: 'contributing_condition',
        epistemicStatus: 'explicit_text',
        rationale: 'Getting the first prediction right emboldens Ira to pre-script an academy answer when the teenage boys speak to him.',
        supportingPassageExcerpt: 'My first prediction had been right. My second had been wrong.'
      },
      {
        id: 'edge_ch8_3',
        sourceEventId: 'evt_ch8_03',
        targetEventId: 'evt_ch8_04',
        edgeType: 'direct_causation',
        epistemicStatus: 'explicit_text',
        rationale: 'The failure of pre-scripted answers convinces Ira that he must investigate who actually issued the dossier rather than trying to out-guess conversations.',
        supportingPassageExcerpt: 'If I wanted to stop being caught off guard, I needed to know what the documents actually said and who had issued them.'
      }
    ],
    characterKnowledge: [
      {
        characterName: 'Ira Lowe (Jonah Laurence)',
        roleOrIdentityNote: 'Protagonist',
        knows: [
          'His dossier lists an administrative annex in Minami-Kuoh under the "Kanagawa Prefectural Educational Development Association"',
          'His silver Panasonic flip phone remains completely dead',
          'Pre-scripting answers for imaginary interrogations causes him to misfire in ordinary conversations'
        ],
        suspects: [
          'Someone or some organization deliberately assembled the "Ira Lowe" identity and paperwork before he woke up on the hill'
        ],
        believesFalsely: [],
        unawareOf: [
          'Whether the Kanagawa Prefectural Educational Development Association annex is a real municipal office, a front, or an abandoned address'
        ],
        evidencePassage: 'I could not assume the paperwork was fraudulent just because I did not understand it. I could not assume it was legitimate just because it had carried me through registration.'
      }
    ],
    setupsAndPayoffs: [
      {
        setup: 'Discovery of the "Kanagawa Prefectural Educational Development Association" (Minami-Kuoh administrative annex) on the dossier contact line (Ch. 8)',
        payoff: 'Target of Ira’s library directory verification and physical reconnaissance in Chapter 9+.',
        status: 'setup_only',
        passageRef: 'Tomorrow, I would find out whether that address existed.'
      }
    ],
    continuityFindings: [
      {
        id: 'cf_ch8_01',
        severity: 'soft_discrepancy',
        description: 'Chapter 8 Title Variants: Authoritative Ledger file `chapter_08_the_architecture_of_waiting.md` uses the title "Chapter 8 — The Architecture of Waiting", while external notes have also referred to it as "The Logistics of Waiting".',
        affectedChaptersOrEvents: ['ledger_chapter_08_f9fb939'],
        epistemicStatus: 'explicit_text',
        passageReference: 'Chapter 8 / The Architecture of Waiting',
        recommendedResolution: 'Retain authoritative Ledger title in canonical snapshot; preserve variant note in workspace metadata.'
      }
    ],
    identifiedTechniques: [
      {
        techniqueName: 'Over-Preparation & Conversational Mismatch',
        techniquePackId: 'tp_epistemic_irony',
        confidence: 'high_evidence',
        supportingPassage: 'The problem was not that I had failed to think of an answer. I had thought of too many answers, all for questions that had not been asked.',
        analysis: 'Tests the protagonist’s defensive rule in a mundane café scene and uses its failure to drive the plot toward concrete investigation.'
      }
    ],
    overallNarrativeAssessment: {
      strengths: [
        'Exceptional psychological honesty in dissecting how trauma/displacement breeds rigid, self-defeating rules',
        'Earns the transition from passive survival (passing the exam) to active investigation (tracking the dossier issuer)'
      ],
      vulnerabilities: [],
      causalIntegrityScore: '99%',
      summary: 'A quiet, razor-sharp character and investigation chapter that turns post-exam stillness into the launchpad for the Minami-Kuoh dossier inquiry.'
    }
  }
];

export const INITIAL_INVESTIGATIONS: InvestigationQuestion[] = [
  {
    id: 'inv_dossier_origin',
    title: 'Who assembled the "Ira Lowe" identity and the Minami-Kuoh dossier?',
    category: 'character_identity',
    status: 'investigating',
    summary: 'When Jonah Laurence woke up in Chapter 4–5, the apartment, wallet ID ("Ira Lowe, age 16"), 11,000 yen, and Kuoh Academy application under "Overseas Transfer / Independent Curriculum" were already prepared. In Chapter 8, Ira traces the contact line to an administrative annex in Minami-Kuoh under the "Kanagawa Prefectural Educational Development Association."',
    competingHypotheses: [
      {
        id: 'hyp_dossier_1',
        statement: 'Institutional / Supernatural Cover Agency: The Kanagawa Prefectural Educational Development Association annex is a bureaucratic front maintained to insert displaced or artificial individuals into Kuoh without raising municipal alarms.',
        epistemicStatus: 'hypothesis',
        supportingEvidence: [
          {
            chapterId: 'ledger_chapter_08_f9fb939',
            excerpt: 'An educational history had been assembled for me under the heading Overseas Transfer / Independent Curriculum. The words sat there with the confident, impersonal neatness of an answer that had already survived someone else’s scrutiny.',
            note: 'The paperwork was engineered specifically to satisfy school registration scrutiny.'
          },
          {
            chapterId: 'ledger_chapter_04_6337972',
            excerpt: 'There were no answers resting on the counter. No driver’s license left out, no mail stacked with a name and an address, no framed family photos smiling from the wall.',
            note: 'The apartment contains functional supplies and textbooks, but zero personal history or family photographs.'
          }
        ],
        counterEvidence: 'The Kuoh registration teacher in Chapter 6 reacted with slight caution rather than instant recognition, suggesting Kuoh’s front-desk staff are not directly briefed on Ira.'
      },
      {
        id: 'hyp_dossier_2',
        statement: 'Pre-Existing Inhabitant ("Original Ira Lowe"): Ira Lowe was an actual sixteen-year-old resident whose life was interrupted moments before Jonah woke up on the grassy hill in Chapter 4.',
        epistemicStatus: 'hypothesis',
        supportingEvidence: [
          {
            chapterId: 'ledger_chapter_04_6337972',
            excerpt: 'A ceramic mug sat near the sink with a thin ring dried at the bottom. A jacket hung over the back of a kitchen chair... the casual disarray of a life temporarily stepped away from.',
            note: 'Physical traces in the apartment suggest someone had been actively living there prior to Chapter 4.'
          },
          {
            chapterId: 'ledger_chapter_07_24ac432',
            excerpt: 'My hand simply knew where the strokes went and how much pressure to use. Jonah knew what the sounds meant. The hand belonged to Ira.',
            note: 'The body possesses deeply ingrained procedural literacy and tactical sightline habits.'
          }
        ]
      }
    ],
    linkedChapterIds: ['ledger_chapter_04_6337972', 'ledger_chapter_05_623acd3', 'ledger_chapter_06_c914b6a', 'ledger_chapter_08_f9fb939'],
    linkedTechniquePackIds: ['tp_somatic_cognitive_duality', 'tp_epistemic_irony'],
    updatedAt: 1792817000000
  },
  {
    id: 'inv_stalker_and_impact',
    title: 'Connection between the 12:42 AM stalker texts, the 3:17 AM entity, and the Chapter 3 collision',
    category: 'causal_gap',
    status: 'open',
    summary: 'In Chapters 1–2, Jonah receives targeted texts from unknown numbers ("You should watch your back", "You looked happy today. Enjoy it while you can"), experiences a 3:17 AM entity scraping his floorboards, suffers an anonymous screenshot leak, and in Chapter 3 is lured into the rain by a phone thief directly into the path of an impossibly huge black vehicle.',
    competingHypotheses: [
      {
        id: 'hyp_stalker_1',
        statement: 'Coordinated Orchestration: The screenshot leak, phone theft, and anomalous black vehicle ("The thing seemed to stretch backward into the rain forever") were part of a single engineered sequence to sever Jonah from his world.',
        epistemicStatus: 'inferred',
        supportingEvidence: [
          {
            chapterId: 'ledger_chapter_02_b8b8cd6',
            excerpt: 'Unknown Number: You looked happy today. Enjoy it while you can.',
            note: 'Demonstrates active real-time observation of Jonah at school prior to the screenshot leak.'
          },
          {
            chapterId: 'ledger_chapter_03_013bf32',
            excerpt: 'My brain couldn’t make sense of the size. It towered over the street. The thing seemed to stretch backward into the rain forever. The road looked tiny beneath it. Wrong. Everything about it was wrong.',
            note: 'The vehicle’s geometry violates normal vehicular scale right before impact.'
          }
        ]
      }
    ],
    linkedChapterIds: ['ledger_chapter_01_7720d50', 'ledger_chapter_02_b8b8cd6', 'ledger_chapter_03_013bf32'],
    linkedTechniquePackIds: ['tp_sensory_fracture', 'tp_causal_compression'],
    updatedAt: 1792816800000
  },
  {
    id: 'inv_ch8_title_discrepancy',
    title: 'Chapter 8 Title Discrepancy: "The Architecture of Waiting" vs. "The Logistics of Waiting"',
    category: 'textual_discrepancy',
    status: 'resolved_in_canon',
    summary: 'Tracks the relationship between the authoritative Ledger record (`ledger/records/chapter/chapter_08_the_architecture_of_waiting.md`, SHA `f9fb939`) titled "Chapter 8 — The Architecture of Waiting" and external planning references to "The Logistics of Waiting".',
    competingHypotheses: [
      {
        id: 'hyp_title_1',
        statement: 'Authoritative Ledger Precedence: "The Architecture of Waiting" is the canonical title in `idesmond11p7/The-Ledger`, while "The Logistics of Waiting" was a working/planning variant.',
        epistemicStatus: 'explicit_text',
        supportingEvidence: [
          {
            chapterId: 'ledger_chapter_08_f9fb939',
            excerpt: 'Chapter 8\nThe Architecture of Waiting\nFor the first time since morning, I had nothing I needed to do.',
            note: 'Verified directly from `ledger/records/chapter/chapter_08_the_architecture_of_waiting.md`.'
          }
        ]
      }
    ],
    linkedChapterIds: ['ledger_chapter_08_f9fb939'],
    updatedAt: 1792817100000
  }
];

export const INITIAL_PINNED_ITEMS: PinnedWorkingItem[] = [
  {
    id: 'pin_ch8_lead',
    type: 'passage',
    title: 'Ch. 8 — Dossier Issuer Lead (Minami-Kuoh Annex)',
    subtitle: 'Chapter 8 — The Architecture of Waiting',
    content: 'The address included the name of an administrative annex in the Minami-Kuoh area, associated with the Kanagawa Prefectural Educational Development Association.',
    chapterId: 'ledger_chapter_08_f9fb939',
    provenance: 'ledger_authoritative',
    pinnedAt: 1792817200000
  },
  {
    id: 'pin_ch6_shadow',
    type: 'passage',
    title: 'Ch. 6 — Kuoh Corridor Shadow Geometry',
    subtitle: 'Chapter 6: The Mechanics of Morning',
    content: 'For half a heartbeat, the dark shape cast by her hem and shoulders reached five or six inches past where the geometry of the window mullions should have allowed—a sharp, heavy blade of grey that seemed to cling to the timber with an unnatural density.',
    chapterId: 'ledger_chapter_06_c914b6a',
    provenance: 'ledger_authoritative',
    pinnedAt: 1792817150000
  },
  {
    id: 'pin_inv_dossier',
    type: 'question',
    title: 'Active Investigation: Who assembled the "Ira Lowe" dossier?',
    subtitle: 'Identity & Provenance Thread',
    content: 'Next empirical step: Ira plans to visit a public library or municipal desk to verify the Kanagawa Prefectural Educational Development Association address in a telephone directory before traveling to Minami-Kuoh.',
    chapterId: 'ledger_chapter_08_f9fb939',
    sourceId: 'inv_dossier_origin',
    provenance: 'derived_analysis',
    pinnedAt: 1792817250000
  }
];

export const INITIAL_EVALUATIONS: EvaluationRecord[] = [
  {
    id: 'eval_seed_ch08',
    timestamp: 1792817300000,
    chapterId: 'ledger_chapter_08_f9fb939',
    revisionId: 'rev_ledger_chapter_08_f9fb939',
    techniquePackIdsUsed: ['tp_epistemic_irony', 'tp_somatic_cognitive_duality'],
    evaluatorType: 'human_audit',
    modelId: 'Canonical Benchmark Audit',
    results: [
      {
        criterionId: 'crit_obj',
        criterionName: 'Objective & Constraint Compliance',
        score: 5,
        evidenceExcerpt: 'Tomorrow, I would start at the library. I would check the directory, verify the name, and find out whether the office was where the documents claimed it was.',
        findings: 'Converts post-exam existential quiet into a concrete, falsifiable investigative plan for Chapter 9.',
        passFail: 'pass'
      },
      {
        criterionId: 'crit_tech',
        criterionName: 'Technique Pack Adherence (Procedures & Rules)',
        score: 5,
        evidenceExcerpt: 'The problem was not that I had failed to think of an answer. I had thought of too many answers, all for questions that had not been asked.',
        findings: 'Executes the Over-Preparation & Conversational Mismatch technique with clinical precision across two contrasting café interactions.',
        passFail: 'pass'
      },
      {
        criterionId: 'crit_causal',
        criterionName: 'Causal Coherence & Narrative Logic',
        score: 5,
        evidenceExcerpt: 'If I wanted to stop being caught off guard, I needed to know what the documents actually said and who had issued them.',
        findings: 'Every internal realization is causally triggered by a concrete interaction in the café rather than unmotivated introspection.',
        passFail: 'pass'
      },
      {
        criterionId: 'crit_char',
        criterionName: 'Character Voice & Psychological Realism',
        score: 5,
        evidenceExcerpt: 'It was an unfair rule. If I failed to predict something, I could blame myself for not thinking hard enough.',
        findings: 'Preserves Jonah’s grounded, self-aware voice while honoring the social vulnerability of inhabiting a sixteen-year-old stranger’s life.',
        passFail: 'pass'
      },
      {
        criterionId: 'crit_cont',
        criterionName: 'Factual Continuity with Ur-Verse Canon',
        score: 5,
        evidenceExcerpt: 'The blue examination placard marked 1044 lay on top of the other papers... I put the dead silver Panasonic flip phone in my pocket out of habit.',
        findings: 'Maintains 100% continuity with Chapters 5, 6, and 7 (Applicant 1044, dead silver Panasonic flip phone, Overseas Transfer / Independent Curriculum dossier).',
        passFail: 'pass'
      }
    ],
    overallSummary: 'Chapter 8 ("The Architecture of Waiting") serves as a benchmark of psychological and investigative realism, bridging the completion of the Kuoh Academy entrance examination with the Minami-Kuoh dossier investigation.',
    identifiedDeviations: [],
    recommendations: [
      'When drafting Chapter 9, maintain the methodological discipline established at the end of Chapter 8: verify the Minami-Kuoh annex via municipal/library directories before physical approach.'
    ]
  }
];

export const INITIAL_CHAPTERS: ChapterDraft[] = INITIAL_LEDGER_CHAPTER_DRAFTS;

export const INITIAL_WORKSPACE_STATE: WorkspaceState = {
  version: '2.0.0',
  lastSavedAt: 1792817500000,
  chapters: INITIAL_CHAPTERS,
  techniquePacks: INITIAL_TECHNIQUE_PACKS,
  schemesOfWork: INITIAL_SCHEMES_OF_WORK,
  analyses: INITIAL_ANALYSES,
  evaluations: INITIAL_EVALUATIONS,
  executionLogs: [],
  investigations: INITIAL_INVESTIGATIONS,
  pinnedItems: INITIAL_PINNED_ITEMS,
  activeChapterId: INITIAL_CHAPTERS[0]?.id || 'ledger_chapter_01_7720d50',
  ledgerConnection: {
    status: 'connected_proxy',
    endpointUrl: 'idesmond11p7/The-Ledger (8 Canonical Chapters Synced)',
    lastSynced: 1792817500000,
  },
};
