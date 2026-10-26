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
import { INITIAL_LEDGER_TECHNIQUE_PACKS } from '@/lib/ledgerTechniquePackImport';

export const INITIAL_TECHNIQUE_PACKS: TechniquePack[] = INITIAL_LEDGER_TECHNIQUE_PACKS;

export const INITIAL_SCHEMES_OF_WORK: SchemeOfWork[] = [
  {
    id: 'sow_act1_threshold',
    title: 'Act I: Mortality, Transmigration & The Kuoh Threshold (Ch. 1–8)',
    scope: 'Chapters 1 to 8 — Canonical Ledger Arc',
    originalSource: 'idesmond11p7/The-Ledger (Authoritative Chapter Dump + Coordinator Architecture)',
    overview: 'Traces seventeen-year-old Jonah Laurence’s final days (two nights of sleep paralysis in Chapter 1, the shift from third-person to first-person in Chapter 2 alongside group-chat screenshot sabotage and anonymous warnings, and his fatal collision in Chapter 3 while chasing a phone thief), his disembodied cosmic transit in Chapter 4, and his awakening in 2005 Japan inside the sixteen-year-old body of "Ira Lowe"—culminating in the Kuoh Academy entrance examination (Chapters 6–7) and his decision in Chapter 8 to investigate the organization behind his fabricated educational dossier.',
    charactersInvolved: [
      'Jonah Laurence (Original Self, Ch. 1–3)',
      'Ira Lowe (Reincarnated Vessel / Identity, Ch. 4–8)',
      'Jonah’s Mother (Ch. 1–3, remembered in Ch. 4, 5, 8)',
      'Daniel (Jonah’s Best Friend, Ch. 1–3, remembered in Ch. 4, 5)',
      'Maya (Classmate in Ch. 2)',
      'Unnamed Classmate Who Returns Notebook (Ch. 3)',
      'Unidentified Kuoh Student Council Figure (Violet Eyes / Extended Shadow, Ch. 6)'
    ],
    milestones: [
      {
        id: 'm_ch1_normalcy',
        title: 'M1: The Weight of Normalcy — Two Nights of Paralysis & Anonymous Warnings',
        targetChapterNumber: 1,
        intendedEvents: [
          'Written in third-person limited: Jonah wakes in pitch-black sleep paralysis, hears a soft scrape, sees a low floor shape and a pale hand whose finger bends too far, and breaks free at 3:17 AM during a power outage',
          'Receives "You awake?" from an unknown number (at 6:11 AM and again on his walk to school), sees a reposted accusation screenshot in class, and receives "You should watch your back" while eating rice and stew at lunch',
          'At 12:42 AM that night, paralysis and total darkness return; a slow, wet breath sounds in the room and a voice that is not his mother’s whispers "Jonah."'
        ],
        characterBeats: [
          'Attempts to dismiss the 3:17 AM encounter as a "bad dream" while clinging to the mundane routine of school and home',
          'Strained, taciturn domestic exchanges with his mother ("You’re late" / "You always have an excuse")'
        ],
        thematicGoals: [
          'Establish claustrophobic perceptual restriction and the erosion of ordinary safety from both night terror and social rumors'
        ],
        status: 'completed'
      },
      {
        id: 'm_ch2_fracture',
        title: 'M2: The Fracture — First-Person Shift, Mirror Assessment & Second Warning',
        targetChapterNumber: 2,
        intendedEvents: [
          'Shifts to first-person narration ("I woke up before my alarm" at 6:17 AM); introduces the ceiling crack and the mirror routine ("Ugly. ... Not ugly. ... Average.")',
          'Walks to school with Daniel and banters with Maya about the undone assignment; laughs behind the science block until two new altered screenshots and hostile comments arrive',
          'While procrastinating on homework at home, an unknown number texts: "You looked happy today." / "Enjoy it while you can."'
        ],
        characterBeats: [
          'Relief in small, ordinary friendships (Daniel knowing when not to push; trading terrible memes at night)',
          'Hatred of not knowing what people actually believe behind his back'
        ],
        thematicGoals: [
          'Contrast genuine adolescent camaraderie against anonymous surveillance and rumor distortion'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch1_normalcy']
      },
      {
        id: 'm_ch3_tomorrow',
        title: 'M3: Maybe Tomorrow — The Sunrise Memory, The List & The Collision',
        targetChapterNumber: 3,
        intendedEvents: [
          'Wakes at 6:11 AM; Mom recalls six-year-old Jonah dragging his blanket to watch the sunrise at 5 AM and says "You’re welcome, Jonah Laurence"; banters with Daniel ("four minutes late / four minutes early")',
          'Snaps defensively at a girl returning his forgotten notebook ("Feel sorry for me"), then realizes his mistake and resolves to practice self-control, typing "Things I need to fix" in his phone Notes app before receiving "You looked happy today. / Enjoy it while you can." again',
          'Next afternoon, a thief snatches his blue-cased phone; Jonah chases him into sudden pouring rain and is struck by an impossibly massive black vehicle ("...I’ll do better")'
        ],
        characterBeats: [
          'Recognition that he projects hostility onto harmless people ("I knew what I imagined they thought")',
          'Dying stream-of-consciousness weaving together Mom, Daniel, the sunrise window, the girl with the notebook, and his belief in "Tomorrow"'
        ],
        thematicGoals: [
          'Sever Jonah’s first life at the exact moment he chooses self-discipline and hope'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch2_fracture']
      },
      {
        id: 'm_ch4_beyond',
        title: 'M4: Beyond — Cosmic Transit & Awakening on the Hill',
        targetChapterNumber: 4,
        intendedEvents: [
          'Disembodied drift past stars, an accretion-disk black hole, non-Euclidean folding geometry, and the shrinking pale sphere of the observable universe',
          'Collision with an ancient pre-existent boundary wall and awakening on a moonlit grassy hill in a new body',
          'Autonomous tactical sightline check (treeline, ditch, blind corner), discovery of a soft foreign voice, and shock at the stranger in the apartment bathroom mirror ("What the fuck?")'
        ],
        characterBeats: [
          'Ontological awe and terror during timeless cosmic transit',
          'Visceral shock of inhabiting a body that moves with pre-trained, effortless grace a fraction of a beat ahead of conscious thought'
        ],
        thematicGoals: [
          'Bridge cosmic immensity with hyper-specific bodily and sensory alienation'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch3_tomorrow']
      },
      {
        id: 'm_ch5_second_morning',
        title: 'M5: A Second Morning — Grief, Identity Discovery (Ira Lowe) & Reconnaissance to Kuoh',
        targetChapterNumber: 5,
        intendedEvents: [
          'Daylight examination of the new body (16-year-old male with delicate features, large green eyes, long black-and-teal hair)',
          'Grief and breakdown mourning his lost home and family, followed by quiet resolve in the shower ("Maybe this was a second chance")',
          'Discovery of the "Ira Lowe" ID card and Kuoh Academy entrance exam notice; first reconnaissance trip by train and paper map to Kuoh Academy’s gates'
        ],
        characterBeats: [
          'Mourning the ordinary life and small complaints he can never return to',
          'Transitioning from grief to practical agency by locating the station and campus before exam day'
        ],
        thematicGoals: [
          'Turn "Tomorrow" from a tragic interrupted promise into a concrete, survivable next step'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch4_beyond']
      },
      {
        id: 'm_ch6_mechanics_morning',
        title: 'M6: The Mechanics of Morning — Applicant 1044 & The Corridor Shadow',
        targetChapterNumber: 6,
        intendedEvents: [
          'Morning routine in the 2005 apartment; commuter train interaction with the hazel-eyed woman; pork bun at Minami-Chofu',
          'Near-miss with the Rapid train ("Kuoh: Passed"); registration at Kuoh Academy as Applicant No. 1044 ("Overseas transfer / Independent curriculum")',
          'Encounter in the main hall with the tall, violet-eyed student council figure whose shadow stretches 5–6 inches past window mullion geometry'
        ],
        characterBeats: [
          'Self-possession under pressure ("You fix the problem. You don’t whine about the track")',
          'Claiming ownership of his new hands in Room 301 as the 9:00 AM bronze bell strikes'
        ],
        thematicGoals: [
          'Ground Kuoh in dense 2005 material realism while planting a single uncertain visual clue of its hidden hierarchy'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch5_second_morning']
      },
      {
        id: 'm_ch7_examination',
        title: 'M7: The Examination — Procedural Rhythm & Quiet Decompression',
        targetChapterNumber: 7,
        intendedEvents: [
          'Completing the 80-minute Language and Mathematics modules at Desk 44 in Room 301',
          'Experiencing simultaneous dual awareness as Ira’s hand writes kanji effortlessly while Jonah comprehends the meaning',
          'Post-exam walk down Kuoh hill, eating warm curry buns in the park, and returning to the quiet apartment ("For the first time since morning, I had nothing I needed to do.")'
        ],
        characterBeats: [
          'Disciplined procedural focus under institutional time pressure',
          'Unconsciously saying "I’m back" to an empty apartment and washing graphite from his palm'
        ],
        thematicGoals: [
          'Demonstrate cognitive/motor duality and the quiet weight of returning to an unlived apartment'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch6_mechanics_morning']
      },
      {
        id: 'm_ch8_architecture_waiting',
        title: 'M8: The Architecture of Waiting — The Café Mismatch & The Dossier Lead',
        targetChapterNumber: 8,
        intendedEvents: [
          'Opens by repeating Chapter 7’s final line; confronts the biographical void behind his "Overseas Transfer / Independent Curriculum" dossier',
          'Formulates and tests the "Think ahead" rule at a local café (over-formal waitress exchange vs. answering an unasked question with two teenage boys)',
          'Copies the issuer address (Kanagawa Prefectural Educational Development Association, Minami-Kuoh annex) and marks his paper map to check a library directory tomorrow'
        ],
        characterBeats: [
          'Recognizing that his defensive rule ("Think ahead") promises control by making every surprise feel like a personal failure',
          'Pivoting from social pre-scripting to concrete empirical investigation'
        ],
        thematicGoals: [
          'Launch the Minami-Kuoh investigation into who constructed the "Ira Lowe" identity'
        ],
        status: 'completed',
        dependsOnMilestoneIds: ['m_ch7_examination']
      }
    ],
    discrepancies: [
      {
        chapterId: 'ledger_chapter_08_f9fb939',
        description: 'Ledger Title Discrepancy: Canonical file `ledger/records/chapter/chapter_08_the_architecture_of_waiting.md` is titled "Chapter 8 — The Architecture of Waiting", whereas an earlier planning note referred to Chapter 8 as "The Logistics of Waiting".',
        actionRequired: 'Preserve authoritative Ledger title ("The Architecture of Waiting") while keeping "The Logistics of Waiting" documented in metadata.',
        resolved: false
      },
      {
        chapterId: 'ledger_chapter_01_7720d50',
        description: 'Observed POV Shift & Repeated Threat Texts: Chapter 1 is written in third-person limited ("Jonah woke because he heard something"), whereas Chapters 2–8 are written in first person ("I woke up before my alarm"). Additionally, the unknown-number messages "You looked happy today. / Enjoy it while you can." appear in both Chapter 2 and Chapter 3.',
        actionRequired: 'Preserve as observed textual features of the authoritative Ledger chapters; do not silently rewrite or flatten.',
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
        title: '3:17 AM Sleep Paralysis & The Low Floor Shape',
        summary: 'Jonah wakes in pitch darkness unable to move or speak above a whisper ("...Mum?"), hears a soft scrape near the doorway, sees a low shape moving without changing height and a pale hand whose finger bends farther than it should, and jerks free when something touches near his ankle—knocking his phone to the floor at 3:17 AM during a power outage.',
        sceneLocation: 'Jonah’s Bedroom',
        chronologyType: 'linear',
        storyTimeEstimate: '3:17 AM',
        charactersPresent: ['Jonah Laurence', 'Unidentified Bedroom Entity'],
        decisionPoints: ['Checks locked bedroom door twice', 'Stays awake until his 6:11 AM alarm and tells himself it was a "bad dream"'],
        directConsequences: ['Enters the school day sleep-deprived and hyper-aware of his phone'],
        causalPredecessors: [],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'A hand appeared. It touched the floor. The fingers were pale... Then one finger bent. Jonah’s stomach dropped. It bent farther than it should have.'
      },
      {
        id: 'evt_ch1_02',
        chapterId: 'ledger_chapter_01_7720d50',
        sequenceIndex: 2,
        title: 'Anonymous "You awake?" Texts, Reposted Screenshot & Lunch Warning',
        summary: 'After waking at 6:11 AM and eating two slices of bread in the kitchen at 6:26 AM, Jonah receives "You awake?" from an unknown number (twice, blocking it both times), sees a reposted accusation screenshot in class, and while eating rice and stew at lunch receives "You should watch your back."',
        sceneLocation: 'Laurence Home, Street & School',
        chronologyType: 'linear',
        storyTimeEstimate: '6:11 AM – Afternoon',
        charactersPresent: ['Jonah Laurence', 'Jonah’s Mother', 'Daniel'],
        decisionPoints: ['Blocks the unknown number twice', 'Types "Who is this?" at lunch then deletes it and puts the phone away'],
        directConsequences: ['Loses his appetite and returns home in the rain at 6:03 PM under mounting isolation'],
        causalPredecessors: [],
        temporalPredecessors: ['evt_ch1_01'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'Unknown number. He opened it. You should watch your back.'
      },
      {
        id: 'evt_ch1_03',
        chapterId: 'ledger_chapter_01_7720d50',
        sequenceIndex: 3,
        title: '12:42 AM Second Paralysis & The Voice Beside the Bed',
        summary: 'Unable to sleep at 12:42 AM, Jonah hears the scrape again as pitch darkness and paralysis lock his body; a slow, wet breath sounds in the room and something very close to his bed whispers "Jonah" in a voice that is not his mother’s.',
        sceneLocation: 'Jonah’s Bedroom',
        chronologyType: 'linear',
        storyTimeEstimate: '12:42 AM',
        charactersPresent: ['Jonah Laurence', 'Unidentified Bedroom Entity'],
        decisionPoints: ['Tries to turn his head while paralyzed'],
        directConsequences: ['Culminates Chapter 1 on an unresolved auditory intrusion beside his bed'],
        causalPredecessors: ['evt_ch1_01'],
        temporalPredecessors: ['evt_ch1_02'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'Then, very close to his bed, something whispered his name. “Jonah.” His eyes widened. And this time, he knew the voice wasn’t his mother’s.'
      }
    ],
    causalEdges: [
      {
        id: 'edge_ch1_1',
        sourceEventId: 'evt_ch1_01',
        targetEventId: 'evt_ch1_02',
        edgeType: 'temporal_succession',
        epistemicStatus: 'explicit_text',
        rationale: 'The 6:11 AM alarm follows the 3:17 AM paralysis; whether the unknown-number texter ("You awake?") is connected to the nocturnal entity is left unconfirmed in the text.',
        supportingPassageExcerpt: 'At 6:11, his alarm went off... The last was from an unknown number. You awake?'
      },
      {
        id: 'edge_ch1_2',
        sourceEventId: 'evt_ch1_01',
        targetEventId: 'evt_ch1_03',
        edgeType: 'contributing_condition',
        epistemicStatus: 'explicit_text',
        rationale: 'Remembering the previous night’s darkness, shape, and hand keeps Jonah awake past 12:42 AM when the scrape and paralysis recur.',
        supportingPassageExcerpt: 'He remembered the room from the night before. The darkness. The shape. The hand... And then he heard the scrape again.'
      }
    ],
    characterKnowledge: [
      {
        characterName: 'Jonah Laurence',
        roleOrIdentityNote: 'Protagonist (Third-Person Limited Focalizer in Ch. 1)',
        knows: [
          'His bedroom door was locked both before and after the 3:17 AM paralysis episode, and the power was out',
          'An unknown number texted "You awake?" twice and "You should watch your back" at lunch',
          'Someone reposted an altered accusation screenshot in the school groups',
          'The voice whispering "Jonah" beside his bed after 12:42 AM was not his mother’s'
        ],
        suspects: [
          'Students at school are whispering and looking at phones behind the teacher’s back because of the reposted screenshot'
        ],
        believesFalsely: [
          'Calling the 3:17 AM experience a "bad dream" or blocking the unknown number will make the intrusions stop'
        ],
        unawareOf: [
          'What the low moving shape in his bedroom actually is',
          'Who is sending the unknown-number messages'
        ],
        evidencePassage: 'Nothing had happened. Nothing that could leave a mark, anyway.'
      }
    ],
    setupsAndPayoffs: [
      {
        setup: '3:17 AM sleep paralysis, low floor shape, abnormally bending pale finger, and 12:42 AM whispered name ("Jonah") in Chapter 1',
        payoff: 'Remains an open, underdetermined lacuna across Chapters 2–3 that Jonah rationalizes as stress/nightmares right up until the afternoon of his death.',
        status: 'setup_only',
        passageRef: 'Then, very close to his bed, something whispered his name. “Jonah.”'
      }
    ],
    continuityFindings: [
      {
        id: 'cf_ch1_01',
        severity: 'soft_discrepancy',
        description: 'POV Transition between Chapter 1 and Chapter 2: Chapter 1 is narrated in third-person limited ("Jonah woke because he heard something"), whereas Chapter 2 shifts permanently to first-person ("I woke up before my alarm").',
        affectedChaptersOrEvents: ['ledger_chapter_01_7720d50', 'ledger_chapter_02_7b063d9'],
        epistemicStatus: 'explicit_text',
        passageReference: 'Jonah woke because he heard something. (Ch. 1) vs. I woke up before my alarm. (Ch. 2)',
        recommendedResolution: 'Documented in Ledger Camera Eye research notes as an observed POV transition; do not automatically alter.'
      }
    ],
    identifiedTechniques: [],
    overallNarrativeAssessment: {
      strengths: [
        'Uses restricted perception in darkness and repeated failed movement attempts ("Nothing") to build claustrophobic tension',
        'Balances nocturnal terror against flat, realistic domestic and school alienation'
      ],
      vulnerabilities: [],
      causalIntegrityScore: '97%',
      summary: 'Establishes the twin pressures on Jonah’s life—the unseen nocturnal intrusion in his locked bedroom and the social corrosion of anonymous messages at school.'
    }
  },
  {
    id: 'ana_ledger_ch03',
    chapterId: 'ledger_chapter_03_4562324',
    chapterVersionTimestamp: 1792815663000,
    analyzedAt: 1792816200000,
    isStale: false,
    provenance: 'derived_analysis',
    modelIdentifier: 'Canonical Seed Extraction (Verified against Ledger Ch. 3)',
    events: [
      {
        id: 'evt_ch3_01',
        chapterId: 'ledger_chapter_03_4562324',
        sequenceIndex: 1,
        title: 'Morning Mirror Routine, Sunrise Memory & Walk with Daniel',
        summary: 'Waking at 6:11 AM, Jonah repeats his mirror judgment ("Ugly. ... Not ugly. ... Average."), hears his mother recall how six-year-old Jonah used to wake at 5:00 AM with his blanket to watch the sunrise ("You’re welcome, Jonah Laurence"), and banters with Daniel ("You’re four minutes late." / "Then you’re four minutes early.").',
        sceneLocation: 'Laurence Home & Street to School',
        chronologyType: 'linear',
        storyTimeEstimate: '6:11 AM – Morning',
        charactersPresent: ['Jonah Laurence', 'Jonah’s Mother', 'Daniel'],
        decisionPoints: ['Reflects on versions of himself that exist only in his mother’s memory'],
        directConsequences: ['Seeds the core sensory memories that return during the collision at the end of the chapter'],
        causalPredecessors: [],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: '“You used to drag your blanket into the living room and sit by the window.” I stared at her. “I don’t remember that.” “I do.”'
      },
      {
        id: 'evt_ch3_02',
        chapterId: 'ledger_chapter_03_4562324',
        sequenceIndex: 2,
        title: 'Notebook Mismatch & Typing "Things I need to fix"',
        summary: 'After snapping at a female classmate who returns his forgotten notebook ("You don’t have to do that... Feel sorry for me") and realizing she was only being considerate, Jonah resolves to change through discipline and types "Things I need to fix" in his phone Notes app—followed immediately by "You looked happy today. / Enjoy it while you can." from an unknown number.',
        sceneLocation: 'School Corridor & Jonah’s Bedroom',
        chronologyType: 'linear',
        storyTimeEstimate: 'Afternoon – Evening',
        charactersPresent: ['Jonah Laurence', 'Unnamed Classmate with Notebook'],
        decisionPoints: ['Recognizes his habit of assuming hostility without evidence', 'Writes 11-item self-improvement list in his phone Notes app for "Tomorrow"'],
        directConsequences: ['Makes his phone the vessel of his promised future ("Tomorrow")'],
        causalPredecessors: ['evt_ch3_01'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'Then I opened my notes app. I typed: Things I need to fix.'
      },
      {
        id: 'evt_ch3_03',
        chapterId: 'ledger_chapter_03_4562324',
        sequenceIndex: 3,
        title: 'Phone Theft Pursuit, Abnormal Downpour & Fatal Collision',
        summary: 'Walking home the next afternoon, a thief slams into Jonah’s shoulder and snatches his blue-cased phone; Jonah chases him as sudden rain swallows the clear afternoon and an impossibly massive black vehicle ("It towered over the street. The thing seemed to stretch backward into the rain forever") strikes him.',
        sceneLocation: 'Roadway on Walk Home',
        chronologyType: 'linear',
        storyTimeEstimate: 'Next Afternoon (Thursday)',
        charactersPresent: ['Jonah Laurence', 'Phone Thief'],
        decisionPoints: ['Sprints after the thief to recover his phone and his "Things I need to fix" list'],
        directConsequences: ['Fatal trauma, fragmented memory montage, and transition into the cosmic void of Chapter 4'],
        causalPredecessors: ['evt_ch3_02'],
        epistemicStatus: 'explicit_text',
        supportingPassageExcerpt: 'My phone. That was all I cared about... Everything was on that thing. Pictures. Messages. Notes. Accounts. My stupid schedule. The list. Tomorrow.'
      }
    ],
    causalEdges: [
      {
        id: 'edge_ch3_1',
        sourceEventId: 'evt_ch3_02',
        targetEventId: 'evt_ch3_03',
        edgeType: 'direct_causation',
        epistemicStatus: 'explicit_text',
        rationale: 'Because Jonah invested his hope for change ("Tomorrow") into the Notes list on his phone the night before, he refuses to let the thief escape with it, running headlong into the collision.',
        supportingPassageExcerpt: 'My stupid schedule. The list. Tomorrow. I could see the blue case. Mine.'
      }
    ],
    characterKnowledge: [
      {
        characterName: 'Jonah Laurence',
        roleOrIdentityNote: 'Protagonist (17 years old)',
        knows: [
          'He misjudged the girl who returned his notebook because he projected his own embarrassment onto her',
          'His phone holds his "Things I need to fix" list',
          'The afternoon sky turned from clear sun to torrential rain in seconds during the chase, and the black vehicle was impossibly large'
        ],
        suspects: [],
        believesFalsely: [
          'If he controls everything he can control, tomorrow is guaranteed ("I believed there would be a tomorrow")'
        ],
        unawareOf: [
          'Why the weather changed instantaneously or what the towering black vehicle actually was'
        ],
        evidencePassage: 'I believed there would be a tomorrow. Then— nothing.'
      }
    ],
    setupsAndPayoffs: [
      {
        setup: 'Mother’s kitchen memory of six-year-old Jonah watching the sunrise and her phrase "You’re welcome, Jonah Laurence", plus Daniel’s "four minutes late / four minutes early" banter (Ch. 3)',
        payoff: 'All three return in fragmented collage as Jonah lies dying in the rain after the collision at the end of Chapter 3.',
        status: 'paid_off',
        passageRef: 'Mom. The kitchen. A cup on the table. Eat. Daniel. You’re four minutes late. No. Four minutes early.',
        targetChapterRef: 'ledger_chapter_03_4562324'
      }
    ],
    continuityFindings: [
      {
        id: 'cf_ch3_01',
        severity: 'verified_continuity',
        description: 'The motif "Tomorrow" and the mirror self-assessment ("Ugly / Not ugly / Average") established in Chapters 2–3 transform directly in Chapter 5 when Jonah confronts Ira Lowe’s reflection in the mirror and reclaims "Tomorrow" as a second chance.',
        affectedChaptersOrEvents: ['ledger_chapter_02_7b063d9', 'ledger_chapter_03_4562324', 'ledger_chapter_05_623acd3'],
        epistemicStatus: 'explicit_text',
        passageReference: 'Tomorrow. I’d figure it out tomorrow. I had to.'
      }
    ],
    identifiedTechniques: [],
    overallNarrativeAssessment: {
      strengths: [
        'Profound psychological observation in the classroom and notebook scenes ("I didn’t actually know what anyone thought. I knew what I imagined they thought")',
        'Devastating structural payoff in the dying montage where every ordinary morning detail returns under the refrain of "Tomorrow"'
      ],
      vulnerabilities: [],
      causalIntegrityScore: '99%',
      summary: 'Brings Jonah Laurence’s original life to a tragic, tightly unified climax where his newly written self-improvement list directly drives the pursuit into the collision.'
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
        summary: 'Waking at 6:30 AM in early spring 2005, Jonah/Ira ties back his long black-and-teal hair, brews drip coffee, checks his Kuoh Academy application slip, 11,000 yen, and dead silver Panasonic flip phone, and dresses in a charcoal wool duffel coat.',
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
        directConsequences: ['Reinforces awareness of how his new appearance alters social treatment ("I am officially non-threatening. I am an ornament.")'],
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
        summary: 'Ira registers at the West Hall baize table ("Overseas transfer track?" / "Independent curriculum. Everything is in the dossier."), receives placard 1044, and inside the main corridor witnesses a tall, spectacled, violet-eyed student council figure whose shadow stretches 5–6 inches past the window geometry.',
        sceneLocation: 'Kuoh Academy Courtyard & Main Hall Corridor',
        chronologyType: 'linear',
        storyTimeEstimate: '8:35 AM – 9:00 AM',
        charactersPresent: ['Ira Lowe (Jonah Laurence)', 'Registration Teacher', 'Violet-Eyed Student Council Figure'],
        decisionPoints: ['Answers teacher with "Everything is in the dossier"', 'Dismisses the elongated shadow as a trick of leaded glass to focus on passing the exam in Room 301'],
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
          'The 5–6 inch shadow extension on the oak parquetry was merely a trick of the double-paned leaded glass and morning glare'
        ],
        unawareOf: [
          'Who the violet-eyed student council figure is or why her shadow stretched abnormally',
          'Who assembled his "Overseas transfer / Independent curriculum" dossier'
        ],
        evidencePassage: 'A trick of the double-paned leaded glass and the morning glare.'
      }
    ],
    setupsAndPayoffs: [
      {
        setup: 'Ira tells the registration teacher "Everything is in the dossier" to explain his "Independent curriculum" background (Ch. 6)',
        payoff: 'In Chapter 8, Ira realizes that while that phrase satisfied a busy administrator, it cannot sustain real conversation—prompting him to investigate the dossier’s issuing association.',
        status: 'paid_off',
        passageRef: 'At the academy, I had managed it by saying that everything was in the dossier... It did not mean I could live inside the explanation indefinitely.',
        targetChapterRef: 'ledger_chapter_08_f9fb939'
      },
      {
        setup: 'The violet-eyed student council figure orders the registry closed at 8:45 AM and casts an anomalously dense, elongated shadow (Ch. 6)',
        payoff: 'Preserved as an uncertain perceptual clue of Kuoh Academy’s deeper nature.',
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
    identifiedTechniques: [],
    overallNarrativeAssessment: {
      strengths: [
        'Rich 2005 Japanese sensory grounding (nikuman steam, magnetic paper tickets, parquetry wax)',
        'Restraint in introducing the violet-eyed student council figure through spatial deference and a half-second shadow anomaly'
      ],
      vulnerabilities: [],
      causalIntegrityScore: '98%',
      summary: 'Anchors the Kuoh setting in tangible 2005 reality while planting the first subtle perceptual anomaly inside the academy.'
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
          'Someone or some organization assembled the "Ira Lowe" paperwork before he arrived, though he refuses to assume whether it is fraudulent or legitimate without checking'
        ],
        believesFalsely: [],
        unawareOf: [
          'Whether the Kanagawa Prefectural Educational Development Association annex exists at the listed Minami-Kuoh address'
        ],
        evidencePassage: 'I could not assume the paperwork was fraudulent just because I did not understand it. I could not assume it was legitimate just because it had carried me through registration.'
      }
    ],
    setupsAndPayoffs: [
      {
        setup: 'Final sentence of Chapter 7 ("For the first time since morning, I had nothing I needed to do.") repeated verbatim as the opening sentence of Chapter 8',
        payoff: 'Transforms post-exam relief at the end of Chapter 7 into the uneasy stillness of waiting and biographical scrutiny in Chapter 8.',
        status: 'paid_off',
        passageRef: 'For the first time since morning, I had nothing I needed to do.',
        targetChapterRef: 'ledger_chapter_08_f9fb939'
      },
      {
        setup: 'Discovery of the "Kanagawa Prefectural Educational Development Association" (Minami-Kuoh administrative annex) on the dossier contact line (Ch. 8)',
        payoff: 'Target of Ira’s library directory verification and physical reconnaissance next morning.',
        status: 'setup_only',
        passageRef: 'Tomorrow, I would find out whether that address existed.'
      }
    ],
    continuityFindings: [
      {
        id: 'cf_ch8_01',
        severity: 'soft_discrepancy',
        description: 'Chapter 8 Title Variants: Authoritative Ledger file `chapter_08_the_architecture_of_waiting.md` uses the title "Chapter 8 — The Architecture of Waiting", while external planning notes have also referred to it as "The Logistics of Waiting".',
        affectedChaptersOrEvents: ['ledger_chapter_08_f9fb939'],
        epistemicStatus: 'explicit_text',
        passageReference: 'Chapter 8 / The Architecture of Waiting',
        recommendedResolution: 'Retain authoritative Ledger title in canonical snapshot; preserve variant note in workspace metadata.'
      }
    ],
    identifiedTechniques: [],
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
    summary: 'When Jonah Laurence woke up in Chapters 4–5, the apartment, wallet ID ("Ira Lowe, age 16"), 11,000 yen, and Kuoh Academy application under "Overseas Transfer / Independent Curriculum" were already prepared. In Chapter 8, Ira traces the contact line to an administrative annex in Minami-Kuoh under the "Kanagawa Prefectural Educational Development Association."',
    competingHypotheses: [
      {
        id: 'hyp_dossier_1',
        statement: 'Institutional / Supernatural Cover Agency: The Kanagawa Prefectural Educational Development Association annex is an administrative front used to insert displaced or unrecorded individuals into Kuoh with plausible paperwork.',
        epistemicStatus: 'hypothesis',
        supportingEvidence: [
          {
            chapterId: 'ledger_chapter_08_f9fb939',
            excerpt: 'An educational history had been assembled for me under the heading Overseas Transfer / Independent Curriculum. The words sat there with the confident, impersonal neatness of an answer that had already survived someone else’s scrutiny.',
            note: 'The paperwork was engineered specifically to satisfy institutional registration scrutiny while omitting personal life details.'
          },
          {
            chapterId: 'ledger_chapter_04_6337972',
            excerpt: 'There were no answers resting on the counter. No driver’s license left out, no mail stacked with a name and an address, no framed family photos smiling from the wall.',
            note: 'The apartment contains functional clothes, textbooks, and money, but zero family photographs or personal correspondence.'
          }
        ],
        counterEvidence: 'The Kuoh registration teacher in Chapter 6 paused in confusion at Ira’s appearance vs. his male gender marker and asked "Overseas transfer track?" cautiously, indicating front-line staff were not pre-briefed.'
      },
      {
        id: 'hyp_dossier_2',
        statement: 'Pre-Existing Inhabitant ("Original Ira Lowe"): Ira Lowe lived in the apartment prior to Chapter 4, leaving behind his procedural muscle memory, kanji handwriting, and an interrupted routine (dried ring in the mug, jacket on the chair).',
        epistemicStatus: 'hypothesis',
        supportingEvidence: [
          {
            chapterId: 'ledger_chapter_04_6337972',
            excerpt: 'A ceramic mug sat near the sink with a thin ring dried at the bottom. A jacket hung over the back of a kitchen chair... the casual disarray of a life temporarily stepped away from.',
            note: 'Physical traces in the apartment show an interrupted routine rather than a sterile staging room.'
          },
          {
            chapterId: 'ledger_chapter_07_24ac432',
            excerpt: 'My hand simply knew where the strokes went and how much pressure to use. Jonah knew what the sounds meant. The hand belonged to Ira.',
            note: 'The body possesses deeply ingrained procedural literacy and autonomous sightline-scanning habits (Ch. 4).'
          }
        ]
      }
    ],
    linkedChapterIds: ['ledger_chapter_04_6337972', 'ledger_chapter_05_623acd3', 'ledger_chapter_06_c914b6a', 'ledger_chapter_07_24ac432', 'ledger_chapter_08_f9fb939'],
    linkedTechniquePackIds: [],
    updatedAt: 1792817000000
  },
  {
    id: 'inv_stalker_and_impact',
    title: 'Connection between the Chapter 1 bedroom entity, the unknown-number texts, and the Chapter 3 collision',
    category: 'causal_gap',
    status: 'open',
    summary: 'In Chapter 1, Jonah experiences two sleep-paralysis intrusions (at 3:17 AM with an abnormally bending pale finger, and after 12:42 AM with a voice whispering "Jonah") alongside texts from an unknown number ("You awake?", "You should watch your back"). In Chapters 2 and 3, an unknown number sends "You looked happy today. / Enjoy it while you can.", and in Chapter 3 a phone theft pulls Jonah into sudden rain and the path of an impossibly huge black vehicle.',
    competingHypotheses: [
      {
        id: 'hyp_stalker_1',
        statement: 'Uncanny Convergence vs. Separate Layers: The text deliberately leaves open whether the school screenshot harassment, the unknown-number messages, the bedroom entity, and the sudden rain/black vehicle are separate human and anomalous pressures or a single coordinated severance.',
        epistemicStatus: 'unresolved_question',
        supportingEvidence: [
          {
            chapterId: 'ledger_chapter_01_7720d50',
            excerpt: 'Then, very close to his bed, something whispered his name. “Jonah.” His eyes widened. And this time, he knew the voice wasn’t his mother’s.',
            note: 'Establishes a non-ordinary presence in his locked bedroom during a power outage.'
          },
          {
            chapterId: 'ledger_chapter_02_7b063d9',
            excerpt: 'Unknown number. For a second I didn’t open it. Then I did. You looked happy today. I stared at it. Another message arrived. Enjoy it while you can.',
            note: 'Identical message pair appears in both Chapter 2 and Chapter 3 evening scenes.'
          },
          {
            chapterId: 'ledger_chapter_03_4562324',
            excerpt: 'My brain couldn’t make sense of the size. It towered over the street. The thing seemed to stretch backward into the rain forever. The road looked tiny beneath it. Wrong. Everything about it was wrong.',
            note: 'The sudden storm and the vehicle’s impossible scale break ordinary physical expectations right before death.'
          }
        ]
      }
    ],
    linkedChapterIds: ['ledger_chapter_01_7720d50', 'ledger_chapter_02_7b063d9', 'ledger_chapter_03_4562324'],
    linkedTechniquePackIds: [],
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
        statement: 'Authoritative Ledger Precedence: "The Architecture of Waiting" is the canonical title in `idesmond11p7/The-Ledger`, while "The Logistics of Waiting" is preserved as the user’s working title for the planned redo.',
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

// No synthetic benchmark evaluations are seeded. Evaluations must be created from actual reviewed runs.
export const INITIAL_EVALUATIONS: EvaluationRecord[] = [];

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
