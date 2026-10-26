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
    identifiedTechniques: [],
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
    identifiedTechniques: [],
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
    linkedTechniquePackIds: [],
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
