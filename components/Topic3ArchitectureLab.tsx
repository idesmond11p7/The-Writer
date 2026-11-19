'use client';

import React, { useState } from 'react';
import {
  Compass,
  Trees,
  GitBranch,
  Brain,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Copy,
  Check,
  Sliders,
  BookOpen,
  Scale,
  ClipboardCheck,
  Waves,
} from 'lucide-react';

interface VersionData {
  id: 'v1' | 'v2' | 'v3';
  number: string;
  title: string;
  subtitle: string;
  focusTag: string;
  paragraphs: string[];
  structuralNotes: {
    sentenceExcerpt: string;
    givenInfo: string;
    newInfo: string;
    subjectAgentFocus: string;
    perceptionVsKnowledge: string;
  }[];
  strengthsAndLimits: {
    whatWorked: string;
    whereItStrained: string;
  };
}

export const SPILLWAY_DETOUR_PARAGRAPHS: {
  paragraphNum: string;
  title: string;
  text: string;
  craftNote: string;
}[] = [
  {
    paragraphNum: 'Paragraph 1 · The Approach',
    title: 'Leaving the Upper Maintenance Road down the Riprap Bank',
    text: `With twenty minutes left to get the signed manifest across the canal, Tomas stepped over the low cable barrier at the edge of the paved maintenance road and started down the angled stone revetment toward the sluice bridge. The flat, predictable grip of the asphalt vanished under his boots as soon as his weight met the pitched riprap; fist-sized chunks of broken granite shifted and ground together with a dry, hollow clatter beneath his heels, forcing him to angle his feet sideways and keep one hand low for balance while he steadied the canvas courier bag against his hip. Down between the concrete canal walls, the roar of yesterday’s storm runoff echoed up the chute, loud enough to swallow the hum of the afternoon traffic behind the levee, while the flat gray overcast laid a cold, leaden sheen across the water surging toward the gates.`,
    craftNote:
      'Preserves the twenty-minute deadline, the transition from flat asphalt to shifting granite riprap, the courier bag against his hip, and the canal walls amplifying the runoff roar.',
  },
  {
    paragraphNum: 'Paragraph 2 · The Blocked Crossing',
    title: 'Calibrated Sluice Hazard (Overtopped Walkway, Slime, Baffle Blocks)',
    text: `He reached the concrete apron at the foot of the slope expecting to jog straight across the service walkway spanning the crest of the sluice gates, but pulled up short ten feet from the abutment. Storm drift had choked the upstream trash rack—split pine timbers, crushed blue plastic pallets, and a twisted mat of chain-link wire lay jammed against the iron bars, backing the swollen canal up until fast brown water poured six to eight inches deep across the narrow walkway. There was no handrail on the downstream side, and where the current sheared over the concrete lip, it slid across a dark, greasy coat of river algae before dropping six feet onto a row of submerged concrete baffle blocks and the turbulent wash of the spillway basin. Trying to wade that slick, unrailed ledge against the sideways push of the overflow meant one bad step could take his feet out from under him and drop him straight into the concrete teeth and churning water below.`,
    craftNote:
      'Micro-Revision A: Grounds the hazard in the interaction of 6–8 inch sheet flow, sideways current push, unrailed algae-slick concrete, and the six-foot drop onto concrete baffle blocks and turbulent basin wash without overclaiming a scripted headfirst trajectory.',
  },
  {
    paragraphNum: 'Paragraph 3 · The Reassessment & Arrest',
    title: 'Functional Pause & Clarified Sub-Station Catwalk Route',
    text: `Tomas stood at the edge of the wet stone, cold spray off the trash rack misting against his face while the runoff thundered through the sluice slots beneath his soles. Climbing back up to the road to go around by the main avenue bridge meant a two-mile detour through the warehouse district—forty minutes on foot, which would put him at the dispatch window well past the four-o'clock lockup. While the brown current kept hammering the jammed pallets beside him, he looked upstream along the left bank. Fifty yards back toward the bend, a brick-and-concrete pumping sub-station sat built directly into the sloped stone revetment. An unrailed iron-grate catwalk began along the building's outer foundation wall, then extended straight out across the open channel—hanging roughly eight feet above the churning spillway apron—to reach the opposite retaining pier, where an iron service ladder climbed to the far bank. He weighed the fifty-yard scramble along the slope against the clock, hitched the courier strap tighter across his shoulder, and turned upstream.`,
    craftNote:
      'Micro-Revision B: Clarifies how the catwalk starts along the sub-station’s outer foundation on the left bank and extends across the open channel (eight feet above the apron) to the service ladder on the opposite retaining pier.',
  },
  {
    paragraphNum: 'Paragraph 4 · The Crossing Begins',
    title: 'Resolved Left-Bank Access & Simplified View Through the Grating',
    text: `He picked his way fifty yards upstream along the pitched stone revetment to the side of the sub-station, stepped off the riprap over the low concrete foundation curb, and planted his boots directly onto the anchored end of the iron catwalk. The wet expanded-metal grating buzzed underfoot with the continuous tremor of the floodwater slamming through the sluice bays downstream, its diamond mesh biting cleanly into the rubber of his treads where the slime-coated concrete had offered no hold. Where the walkway left the building's foundation wall and spanned the open channel, he could see straight down through the metal grid to the white water and dark currents racing across the spillway apron eight feet beneath him, while the flat glare of the overcast sky turned the wet iron ahead into a narrow silver track. Keeping the canvas bag tucked tight against his ribs, Tomas fixed his eyes on the service ladder bolted to the opposite pier and started across.`,
    craftNote:
      'Micro-Revision C & D: Distinguishes the catwalk entrance (stepping off the sloped riprap over the foundation curb onto the catwalk’s anchored end) from the destination ladder on the opposite pier, and simplifies the view down through the metal grid to the water eight feet beneath him.',
  },
];

export const ARCH_CORE_003_EVALUATION = [
  {
    vector: '1. Spatial Clarity',
    verdict: 'Verified',
    analysis:
      'The complete loop is unambiguously mapped: upper left-bank maintenance road → down the pitched granite riprap revetment to the flooded sluice walkway → fifty yards upstream along the sloped revetment to the pumping sub-station → stepping off the bank over the foundation curb onto the catwalk’s anchored section → out across the open channel (eight feet above the spillway apron) toward the service ladder on the opposite retaining pier.',
  },
  {
    vector: '2. Physical Credibility',
    verdict: 'Verified',
    analysis:
      'The sluice hazard relies on verifiable physical interaction—six to eight inches of fast overflow pushing sideways across an unrailed, algae-greasy concrete lip above a six-foot drop onto concrete baffle blocks and turbulent basin water—without asserting an overly specific headfirst fall.',
  },
  {
    vector: '3. Movement Continuity',
    verdict: 'Verified',
    analysis:
      'Every transition is physically accounted for without anatomical clutter: stepping over the road cable onto shifting granite riprap, halting at the sluice abutment, scrambling fifty yards upstream along the sloped stone bank, stepping over the foundation curb onto the vibrating expanded-metal grating, and moving out over the open channel.',
  },
  {
    vector: '4. Natural Narrative Execution',
    verdict: 'Verified',
    analysis:
      'Maintains a grounded, fluent narrative voice focused on Tomas’s practical twenty-minute courier deadline, eliminating the earlier access-rung ambiguity and awkward grid phrasing while keeping the non-freezing Rest & Arrest beat intact.',
  },
];

export const BOUNDARY_PASSAGE_PARAGRAPHS: {
  phase: string;
  text: string;
  craftNote: string;
}[] = [
  {
    phase: 'Phase 1 · Leaving the Pavement',
    text: `The calico bolted between two rusted chain-link posts before the little girl on the sidewalk had even finished reaching for its collar. Ira was only three strides from the curb, and moving before he really thought about it—mostly because the embankment beyond the fence was a tangle of dry ditch-weed and thorny raspberry cane, and the kid was already lunging toward the gap in her thin sandals. "Stay on the walk," he called back over his shoulder, his sneaker soles trading the flat grip of the asphalt for a sliding skin of crushed gravel and dry clay at the base of the bank.`,
    craftNote:
      'Establishes the mundane motive (keeping a child in sandals out of briars) and the immediate shift from asphalt grip to sliding gravel/clay without pausing the scramble.',
  },
  {
    phase: 'Phase 1 → Phase 2 · Entering the Bank',
    text: `Up ahead, the cat's white tail flicked once under a low shelf of scrub cedar and vanished into the weeds. Behind him, a delivery scooter rattled past the corner and the girl let out a small, frustrated whine from the pavement, her voice clear in the late-afternoon air. Ira angled his weight into the slope to cut the cat off before it reached the heavier trees at the top of the rise, expecting five or six hard steps to bring him level with the cedar shelf.`,
    craftNote:
      'Open line of sight and proximity keep street sounds clear initially. Sets a concrete, ordinary expectation of distance (five or six hard steps to the cedar shelf).',
  },
  {
    phase: 'Phase 2 · The Incline and the Stretch',
    text: `The dirt under the weeds was softer than it looked from the road, dry leaf-mold over loose soil that gave backward an inch or two every time he drove his toes in. He caught a tough wrist-thick root with his left hand to haul himself past a sprawl of brambles, annoyed when a thorn snagged the cuff of his trousers and tugged back before snapping free. By the time he cleared the cedar shelf, his calves were warm and his breathing had gone heavy, yet the main stand of timber still sat uphill ahead of him behind another long rise of fern and tangled hazel.`,
    craftNote:
      'Physical effort is rendered through footing slippage, grabbing a root for leverage, and a snagged cuff. Direct emotion word ("annoyed") is used efficiently. The first spatial discrepancy arrives naturally: clearing the shelf reveals another rise rather than the top.',
  },
  {
    phase: 'Phase 2 · Mundane Rationalization & Acoustic Shading',
    text: `He frowned, eyes scanning the ground between the stems for a flash of orange-and-white fur. From down on the sidewalk the greenbelt had looked like a narrow strip of woods wedged behind the houses, the sort of shallow bank you could cross in half a minute, not a tiered hillside. He figured the low roof of the corner wall and the angle of the weeds had hidden how deep the grade really ran. Something small rustled through the dry litter ten yards higher up—quick, light, and moving away—and he pushed after it, stepping over a rotted pine log that crumbled into red punk under his heel. Around him, the afternoon noise from the neighborhood had thinned out to almost nothing, muffled behind the fold of the earth bank and the dense mat of needles overhead.`,
    craftNote:
      'Ira attributes the longer climb to visual foreshortening from the street, and the quieter air to the earth bank and foliage muffling the neighborhood.',
  },
  {
    phase: 'Phase 3 · The Pause and the Back-Trail Check',
    text: `At the top of that second rise, the ground leveled into a shallow hollow choked with waist-high nettles, and the rustling stopped. Ira halted against the trunk of a crooked beech to keep out of the nettles, wiping a smear of damp grit from his palm onto his hip while he searched the undergrowth. No calico. Not even a twitching stem.`,
    craftNote:
      'Natural physical reason to stop: nettles blocking the path and the sound of the cat vanishing.',
  },
  {
    phase: 'Phase 3 · Looking Back & Deciding',
    text: `He turned to check how far he had drifted from the gap in the chain-link fence, half-ready to call down to the girl that her cat had gone too deep into the brush. Instead of the gray strip of pavement and the power lines along the road, he was looking down into a long, sloping trough of laurel and old timber that curved away to the left, completely hiding the fence line and the roofs beyond it. For a second he just stood there, confused. He hadn't thought he had angled that far sideways during the climb, though dodging the briar patches and hauling himself around the cedar shelf clearly hadn't been a straight line. Up ahead, just past the edge of the nettle hollow, a pale patch of fur shifted beside a mossy boundary stone—and before he could second-guess the detour, the cat slipped behind the rock. Muttering under his breath, Ira skirted the nettles and followed.`,
    craftNote:
      'Sight leads across the back-trail check: the street and roofs are occluded by a curving trough of laurel and timber. He feels confused (plain emotion word), blames his own zigzagging around briars, spots the cat again, and commits forward.',
  },
];

export const PART_A_RESPONSES = [
  {
    num: '1',
    question: 'What writing skills is this exercise intended to develop?',
    answer:
      'It trains the ability to stage a subtle environmental shift entirely through ordinary human task-focus and bounded perception. Specifically: (a) keeping a character’s attention anchored to a practical, mundane goal (catching a runaway cat) so environmental anomalies enter almost sideways against his task; (b) pacing sensory changes (footing, uphill effort, acoustic shading, sightline occlusion) so they accumulate gradually rather than flipping like a switch; and (c) writing believable human rationalization—showing how an ordinary sixteen-year-old explains away odd distances or missing sightlines using everyday assumptions (foreshortened slopes, zigzagging around brambles) rather than leaping to supernatural conclusions.',
  },
  {
    num: '2',
    question: 'Which earlier methodological errors have been corrected?',
    answer:
      'Six specific overcorrections from prior iterations are stripped out: (1) replacing the false rule that "sound must always precede sight" with geometry-dependent sensory arrival; (2) dropping mandatory biomechanical pivot/head-turn descriptions for routine glances, reserving bodily mechanics for moments where balance or momentum is actually contested; (3) replacing ruler-like clearance inventories with immediate perceptual gestalt unless the character is actively trying to squeeze through a gap; (4) lifting the artificial ban on direct emotion words ("annoyed," "confused," "relieved") when they are efficient and grounded; (5) treating prose pacing as a continuous, breathing range rather than three rigid mode-switches; and (6) separating subjective perceptual oddities (feeling like a slope took too long) from premature claims about canon cosmology.',
  },
  {
    num: '3',
    question: 'Which principles should remain flexible rather than becoming mandatory formulas?',
    answer:
      'Three areas must remain flexible: First, the three-phase progression (Leaving Pavement → Incline/Stretch → Back-Trail Check) is scaffolding for this transition exercise, not a template for every traversal or boundary crossing. Second, rationalizing anomalies must not become a mechanical loop where every strange detail is immediately followed by an "Ira assumed X" sentence; sometimes a discrepancy is simply registered in passing and overridden by action. Third, the balance between direct emotion labels and physical cues must vary by moment—using a plain word like "annoyed" when a thorn catches a trouser cuff, while letting hesitation or a second glance carry the weight when he looks back and fails to see the street.',
  },
  {
    num: '4',
    question: 'Are there ambiguities or contradictions that would affect execution?',
    answer:
      'Two practical tensions in the specification require careful handling during execution: (a) Distance vs. Audibility in Phase 1–2: If the greenbelt initially looks like a tiny twenty-foot bank from the sidewalk, having neighborhood sound vanish too early would feel theatrical rather than gradual. The climb needs to involve at least a folded dip or earthen crest plus dense brush before the traffic hum plausibly thins out. (b) Stopping the child vs. continuing the chase in Phase 3: If Ira only chased the cat to stop the little girl from tumbling into the briars, once he is deep enough in the brush that the street is out of sight, why does he keep going instead of heading back to check on the kid? In the prose, this requires two anchors: calling back to her at the fence ("Stay on the walk") so she pauses at the curb, and catching a fresh glimpse of the cat just ahead in Phase 3 so the sunk cost of the scramble pulls him another ten yards in.',
  },
  {
    num: '5',
    question: 'How will you maintain natural, compelling fiction rather than producing a technical report?',
    answer:
      'By enforcing the separation between the Analytical, Pedagogical, and Narrative registers. None of the analytical vocabulary (egocentric updating, psychoacoustic attenuation, predictive error) or pedagogical labels (Phase 1, discrepancy beat, back-trail check) belongs in the prose. In the narrative register, details are chosen for how they feel to a sixteen-year-old in sneakers scrambling up dry dirt: the irritate-and-snap of a raspberry cane on his cuff, the soft give of leaf-mold over clay, the crumbly red punk of a rotted pine log, and the practical impatience of wanting to grab the cat and get back to his afternoon.',
  },
  {
    num: '6',
    question: 'What would you preserve, modify, or reject in the specification?',
    answer:
      'Preserve: The three-register separation, the epistemic correction table, the ban on stock horror clichés ("unnatural chill," "silence like a tomb") and premature supernatural intuition, and the five-question review checklist. Modify: Treat the illustrative numbers in the spec ("twenty-foot scramble," "a dozen paces") as approximate scale cues rather than mandatory wording, and allow the transition between Phase 2 and Phase 3 to turn on a concrete terrain feature (like a false crest or cedar shelf) so the foreshortening rationalization feels earned. Reject: Any residual tendency to treat the five diagnostic checklist items as a rigid paragraph-by-paragraph quota.',
  },
];

export const PART_C_ASSESSMENT = [
  {
    test: '1. The Ground Test',
    question: 'Is the terrain and its effect on movement understandable?',
    verdict: 'Pass with one minor density caveat',
    analysis:
      'The transition under Ira’s sneakers is clear at each stage: flat asphalt grip → sliding crushed gravel and dry clay at the ditch edge → dry leaf-mold slipping an inch or two over loose soil → a rotted pine log crumbling into red punk → a level hollow choked with waist-high nettles. Each surface directly alters his stride or balance. Caveat: naming both raspberry cane, scrub cedar, fern, hazel, beech, and laurel across 550 words risks crowding the botanical palette; in a full chapter revision, trimming one or two plant names in favor of simpler shape/obstacle terms ("scrub," "brush") would keep the visual model even cleaner.',
  },
  {
    test: '2. The Knowledge Test',
    question: 'Does Ira remain within what he can actually perceive and infer?',
    verdict: 'Pass',
    analysis:
      'Ira never suspects an astral boundary, a portal, or an entity. Every perception arrives through his immediate position—hearing the scooter and the girl clearly while still near the fence, losing sight of the cat under the cedar shelf, hearing an unseen rustle ten yards higher, and discovering the missing fence line only when he turns around at the beech tree.',
  },
  {
    test: '3. The Discrepancy Test',
    question: 'Do the oddities feel like plausible experiences before they become suspicious?',
    verdict: 'Pass',
    analysis:
      'Three subtle discrepancies occur—the hillside rising into a second tier past the cedar shelf, the afternoon neighborhood noise thinning out behind the earth bank, and the back-trail view showing a curving trough of laurel and old timber instead of the chain-link fence and roofs. Each has a genuine mundane explanation ready to hand: visual foreshortening caused by the corner wall, acoustic shading from the earth fold, and Ira’s own diagonal zigzagging around briar patches.',
  },
  {
    test: '4. The Pacing Test',
    question: 'Does the prose move naturally with the pursuit and its interruptions?',
    verdict: 'Pass',
    analysis:
      'The opening paragraph launches in mid-stride before Ira finishes deliberating. Sentences lengthen during the uphill slog where loose dirt and roots slow his climb, and pause naturally when the nettle hollow forces him to stop against the beech trunk and look back.',
  },
  {
    test: '5. The Voice Test',
    question: 'Does it read as compelling fiction rather than a technical demonstration?',
    verdict: 'Pass, with an honest critique of Paragraph 4',
    analysis:
      'The voice stays grounded in Ira’s practical irritation and physical momentum. The weakest sentence is in Paragraph 4 ("He figured the low roof of the corner wall and the angle of the weeds had hidden how deep the grade really ran"): spelling out his geometric reasoning is slightly too calm and complete for mid-scramble.',
  },
];

export const TOPIC_3_SCENARIO =
  'Ira is walking through an unfamiliar part of Kuoh. He reaches a junction, notices a landmark that helps him orient himself, and realizes that the route he initially intended to take is obstructed.';

export const TOPIC_3_VERSIONS: VersionData[] = [
  {
    id: 'v1',
    number: 'Version 1',
    title: 'Information Architecture',
    subtitle: 'Emphasizing clear spatial relationships, given-to-new progression, and grammatical subject control.',
    focusTag: 'Theme → Rheme · Spatial Causality · Subject vs. Agent',
    paragraphs: [
      `The residential lane climbed between concrete retaining walls until the slope leveled out at a four-way junction. Across the intersection, the tiled roof of a municipal bathhouse rose above a row of closed shutters, its brick chimney matching the landmark printed near the eastern margin of the station map.`,
      `Below the bathhouse, the road Ira intended to take descended toward the canal bridge. Halfway down that grade, two orange municipal barriers stood end to end across both lanes. Behind the barriers, a flatbed crane occupied the asphalt beside an open trench, leaving only a fenced footpath that ended against temporary sheeting.`,
      `To the north, a narrower side street ran parallel to the high wall of the bathhouse and stayed clear as far as the next corner.`,
    ],
    structuralNotes: [
      {
        sentenceExcerpt:
          'The residential lane climbed between concrete retaining walls until the slope leveled out at a four-way junction.',
        givenInfo: 'The residential lane (the path already under his feet).',
        newInfo: 'The leveling of the slope into a four-way junction.',
        subjectAgentFocus:
          'Grammatical Subject: "The residential lane" | Physical Agent: Terrain geometry | Narrative Focus: Reaching the decision point.',
        perceptionVsKnowledge:
          'Pure perceptual geometry; establishes the junction before introducing what lies across it.',
      },
      {
        sentenceExcerpt:
          'Below the bathhouse, the road Ira intended to take descended toward the canal bridge. Halfway down that grade, two orange municipal barriers stood end to end across both lanes.',
        givenInfo: 'The bathhouse (just established in Sentence 2) → "that grade" (established in Sentence 3).',
        newInfo: 'The descending road toward the canal bridge → the two municipal barriers blocking both lanes.',
        subjectAgentFocus:
          'Grammatical Subject shifts from "the road" to "two orange municipal barriers"—the obstacle takes grammatical focus when it interrupts the route.',
        perceptionVsKnowledge:
          'Visual evidence of obstruction presented in spatial sequence (junction → downhill grade → barrier → trench).',
      },
    ],
    strengthsAndLimits: {
      whatWorked:
        'Every sentence begins with an anchor established in the previous sentence (lane → junction → bathhouse → road below bathhouse → halfway down that grade). Ira is only named once, when his intended route matters. The reader never has to rebuild the map backward.',
      whereItStrained:
        'Because it prioritizes strict spatial chaining, the passage reads slightly like a surveyor’s report. In the second paragraph, listing the barriers, flatbed crane, open trench, fenced footpath, and temporary sheeting borders on a municipal inventory, and we lose the sense of a tired human being actually recalibrating on his feet.',
    },
  },
  {
    id: 'v2',
    number: 'Version 2',
    title: 'Psychological Narration',
    subtitle: 'Emphasizing internal interpretation, decision-making, expectation vs. reality, and imperfect knowledge.',
    focusTag: 'Perception ≠ Interpretation ≠ Knowledge · Non-Verbal Cognition',
    paragraphs: [
      `The uphill stretch had dragged on longer than Ira expected, and by the time the lane opened into a junction he was half-convinced he had turned one block too early. Then he caught sight of the square brick chimney above the tiled bathhouse roof across the street. That was the public bath near the eastern edge of the ward map—which meant the canal bridge was finally just down the hill to his right.`,
      `He turned toward the descending street with a brief sense of relief, already calculating how much time he had lost on the climb. Fifty yards down, orange barriers cut across the asphalt. A utility crew had opened the road surface beside a parked crane, and the narrow pedestrian walkway along the wall was boxed in with steel sheets.`,
      `He stopped at the curb, annoyed. He had no idea whether the next street north actually had a footbridge over the canal or merely dead-ended against the embankment, only that going back down the hill he had just climbed would cost him twenty minutes he didn’t want to spend.`,
    ],
    structuralNotes: [
      {
        sentenceExcerpt:
          'The uphill stretch had dragged on longer than Ira expected, and by the time the lane opened into a junction he was half-convinced he had turned one block too early.',
        givenInfo: 'The ongoing climb and Ira’s expectation of distance.',
        newInfo: 'His growing doubt that he took the wrong turn before reaching the junction.',
        subjectAgentFocus:
          'Focuses on subjective duration and spatial uncertainty rather than objective geometry.',
        perceptionVsKnowledge:
          'Distinguishes what Ira perceives (a long climb) from what he thinks it means (that he turned too early) before the landmark corrects him.',
      },
      {
        sentenceExcerpt:
          'He stopped at the curb, annoyed. He had no idea whether the next street north actually had a footbridge over the canal or merely dead-ended against the embankment...',
        givenInfo: 'The blocked downhill street and his halt at the curb.',
        newInfo: 'His irritation ("annoyed" used as an earned, efficient emotional label) and the strict boundary of his knowledge about the northern detour.',
        subjectAgentFocus:
          'Grammatical Subject: "He" | Focus: Practical trade-off between an uncertain northern street and a guaranteed twenty-minute backtrack.',
        perceptionVsKnowledge:
          'Explicitly respects knowledge boundaries: he knows where the canal lies, does not know if the northern street crosses it, and decides based on fatigue and time.',
      },
    ],
    strengthsAndLimits: {
      whatWorked:
        'Captures ordinary human navigation: doubting a turn when a hill takes too long, recognizing a landmark as a correction of that doubt, feeling brief relief, and then mild irritation ("annoyed") when the confirmed shortcut is dug up.',
      whereItStrained:
        'In two places ("which meant the canal bridge was finally just down the hill", "already calculating how much time he had lost"), the narration leans slightly toward explaining Ira’s thought process to the reader rather than letting the spatial facts and his pause at the curb carry part of that inference.',
    },
  },
  {
    id: 'v3',
    number: 'Version 3',
    title: 'Integrated Execution',
    subtitle: 'Combining given-new spatial clarity, embodied action, psychological nuance, and natural prose cadence.',
    focusTag: 'Unified Experience · Selective Detail · Earned Rhythm',
    paragraphs: [
      `The lane kept climbing between concrete retaining walls long enough that Ira began to suspect he had missed his turn. Only when the grade finally leveled into a four-way junction did the square brick chimney of the ward bathhouse rise above the shuttered storefronts opposite—right where the station map had promised it would be.`,
      `He let out a breath and rounded the corner toward the downhill road that led to the canal bridge.`,
      `Fifty yards down the slope, orange barriers blocked both lanes. A flatbed crane sat idling beside an open trench in the asphalt, its steel outriggers planted across the sidewalk where the pedestrian passage should have been.`,
      `Ira slowed to a stop by the corner post. The diesel smell from the trench drifted uphill on the draft, warm and oily. He looked north along the narrower street behind the bathhouse wall; it ran in the right direction, though he couldn't tell from here whether it actually crossed the water or died against the concrete bank. Still, anything was better than walking back down the hill he had just climbed. He adjusted the strap on his shoulder and took the northern road.`,
    ],
    structuralNotes: [
      {
        sentenceExcerpt:
          'Only when the grade finally leveled into a four-way junction did the square brick chimney of the ward bathhouse rise above the shuttered storefronts opposite—right where the station map had promised it would be.',
        givenInfo: 'The climbing grade and his suspicion of a missed turn.',
        newInfo: 'The junction leveling out + the bathhouse chimney appearing in the expected position.',
        subjectAgentFocus:
          'Grammatical Subject: "the square brick chimney" | Physical Event: Progressive revelation as elevation levels out | Psychological Effect: Instant, non-verbal confirmation of orientation.',
        perceptionVsKnowledge:
          'Fuses optical progressive revelation (horizon clearing as slope flattens) with cognitive relief ("right where the station map had promised").',
      },
      {
        sentenceExcerpt:
          'He let out a breath and rounded the corner toward the downhill road that led to the canal bridge. [Paragraph Break] Fifty yards down the slope, orange barriers blocked both lanes.',
        givenInfo: 'His relief and commitment to the downhill turn.',
        newInfo: 'The abrupt discovery of the orange barriers fifty yards down.',
        subjectAgentFocus:
          'Paragraph break isolates the turn from the obstacle. "Orange barriers" takes the subject position of the new paragraph to mirror the interruption of his stride.',
        perceptionVsKnowledge:
          'He commits to the turn before seeing down the hill; perception updates only after he clears the corner.',
      },
      {
        sentenceExcerpt:
          'A flatbed crane sat idling beside an open trench in the asphalt, its steel outriggers planted across the sidewalk where the pedestrian passage should have been.',
        givenInfo: 'The blocked downhill slope.',
        newInfo: 'Why he cannot even squeeze past on foot: the crane’s outriggers occupy the sidewalk.',
        subjectAgentFocus:
          'Selects one decisive physical detail (the steel outriggers across the sidewalk) instead of listing fences, sheets, and cones.',
        perceptionVsKnowledge:
          'Answers the practical pedestrian question ("Can I still slip around the roadwork on the pavement?") without an internal monologue.',
      },
    ],
    strengthsAndLimits: {
      whatWorked:
        'Information arrives in the exact order Ira experiences it: prolonged climb → doubt → horizon leveling → chimney landmark → physical commitment around the corner → barrier discovery → checking the sidewalk (blocked by outriggers) → weighing the uncertain northern street against backtracking.',
      whereItStrained:
        'The single sensory detail of the diesel draft ("warm and oily") grounds the pause at the corner post, though in a longer chapter traversal even that beat could be trimmed if the pacing needs to move faster.',
    },
  },
];

export const DIAGNOSTIC_QUESTIONS = [
  {
    question: '1. Where did the prose become an inventory?',
    finding:
      'In Version 1, paragraph 2 ("two orange municipal barriers... a flatbed crane... an open trench... a fenced footpath... temporary sheeting"), the desire to prove complete spatial clarity produced five separate construction objects in two sentences. A pedestrian does not catalog municipal equipment; he looks for a gap he can walk through. Version 3 fixes this by keeping only the crane’s steel outriggers planted across the sidewalk—the single detail that closes off pedestrian passage.',
  },
  {
    question: '2. Where did it explain something the reader could infer?',
    finding:
      'In Version 2 ("which meant the canal bridge was finally just down the hill to his right, and already calculating how much time he had lost on the climb"), the narrator steps in to summarize Ira’s map-reading arithmetic. In Version 3, simply pairing "right where the station map had promised it would be" with "He let out a breath and rounded the corner toward the downhill road that led to the canal bridge" lets the reader infer the spatial confirmation and relief directly from the action.',
  },
  {
    question: '3. Where did physical reactions replace actual thought?',
    finding:
      'None of the three versions fell back into the old checklist of clenched jaws or flattened breathing, though "He let out a breath" in Version 3 is at the threshold. It works only because it is paired immediately with a purposeful navigational decision ("and rounded the corner") and followed in paragraph 4 by genuine cognitive weighing (uncertain northern crossing vs. guaranteed uphill backtrack), rather than pretending a sigh by itself is characterization.',
  },
  {
    question: '4. Where did the narration exceed Ira’s knowledge?',
    finding:
      'Kept strictly bounded across all three versions, though Version 1 comes closest to an omniscient surveyor’s eye by describing the downhill trench and temporary sheeting before establishing where Ira is standing at the corner. Version 3 corrects the access route: Ira must first round the corner before the downhill slope opens into view, and when he looks north behind the bathhouse wall, he explicitly cannot tell from the junction whether that street crosses the canal or dead-ends at the bank.',
  },
  {
    question: '5. Which details genuinely improved the reader’s understanding of the scene?',
    finding:
      'Three details carried real structural weight: (a) the brick bathhouse chimney rising into view specifically because the uphill grade leveled out (tying terrain geometry to landmark visibility); (b) the paragraph break between rounding the corner and seeing the orange barriers fifty yards down (using typography and rhythm to stage discovery); and (c) the crane’s outriggers blocking the sidewalk (explaining why a pedestrian—not a car—is forced to detour).',
  },
];

export default function Topic3ArchitectureLab() {
  const [moduleTab, setModuleTab] = useState<
    'spillway_detour' | 'boundary_transition' | 'junction_3levels'
  >('spillway_detour');
  const [selectedView, setSelectedView] = useState<'all' | 'v1' | 'v2' | 'v3'>('all');
  const [showSentenceBreakdown, setShowSentenceBreakdown] = useState(true);
  const [showBoundaryNotes, setShowBoundaryNotes] = useState(true);
  const [showSpillwayNotes, setShowSpillwayNotes] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const fullBoundaryText = BOUNDARY_PASSAGE_PARAGRAPHS.map((p) => p.text).join('\n\n');
  const fullSpillwayText = SPILLWAY_DETOUR_PARAGRAPHS.map((p) => p.text).join('\n\n');

  const visibleVersions =
    selectedView === 'all'
      ? TOPIC_3_VERSIONS
      : TOPIC_3_VERSIONS.filter((v) => v.id === selectedView);

  return (
    <div className="space-y-8">
      {/* Sub-module selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-stone-800 bg-stone-900/70 font-mono text-xs">
        <div className="flex items-center gap-2 text-stone-300">
          <Compass className="w-4 h-4 text-sky-400" />
          <span>Experiential Reconstruction Exercises:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setModuleTab('spillway_detour')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              moduleTab === 'spillway_detour'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>ARCH-CORE-003: Industrial Spillway Detour (Final Micro-Revision)</span>
          </button>
          <button
            onClick={() => setModuleTab('boundary_transition')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              moduleTab === 'boundary_transition'
                ? 'bg-emerald-500 text-stone-950 font-semibold shadow-sm'
                : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Forest Boundary Transition (Parts A–D)</span>
          </button>
          <button
            onClick={() => setModuleTab('junction_3levels')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
              moduleTab === 'junction_3levels'
                ? 'bg-sky-500 text-stone-950 font-semibold shadow-sm'
                : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Kuoh Junction (3 Levels of Narration)</span>
          </button>
        </div>
      </div>

      {moduleTab === 'spillway_detour' ? (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="border border-amber-500/30 bg-gradient-to-br from-[#14110b] via-[#0e1014] to-[#0b1315] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-amber-400">
                <Waves className="w-4 h-4" />
                <span>ARCH-CORE-003 · Final Micro-Revision: The Industrial Spillway Detour</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                  4 Targeted Audit Corrections Applied
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                  Publication-Ready Exercise
                </span>
              </div>
            </div>

            <div className="space-y-2 max-w-4xl">
              <h1 className="text-2xl sm:text-3xl font-serif text-stone-100 tracking-tight">
                The Industrial Spillway Detour (Final Micro-Revision)
              </h1>
              <p className="text-sm text-stone-400 leading-relaxed">
                Targeted micro-revision resolving the four audit points: calibrating the sluice hazard with the concrete baffle blocks, clarifying how the catwalk extends from the sub-station foundation across the open channel, distinguishing the left-bank foundation step-on from the destination ladder on the opposite pier, and simplifying the view down through the open metal grating.
              </p>
            </div>
          </div>

          {/* 4-Paragraph Execution */}
          <section className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#13100c] to-[#0b0d10] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Final Revised Passage · 4 Paragraphs
                  </span>
                  <h2 className="text-xl font-serif text-stone-100">
                    Crossing the Canal Sluice &amp; Sub-Station Catwalk
                  </h2>
                </div>
                <p className="text-xs text-stone-400">
                  Preserves the structure, voice, and kinetic weight of Revision 2.0 with all four micro-corrections integrated.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSpillwayNotes((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                    showSpillwayNotes
                      ? 'bg-amber-950/60 border-amber-700/70 text-amber-300'
                      : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{showSpillwayNotes ? 'Micro-Revision Notes: ON' : 'Pure Reading View'}</span>
                </button>
                <button
                  onClick={() => handleCopy('spillway', fullSpillwayText)}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-stone-300 flex items-center gap-1.5"
                >
                  {copiedId === 'spillway' ? (
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
            </div>

            <div className="space-y-5 bg-stone-950/70 p-6 sm:p-8 rounded-xl border border-stone-800/80">
              {SPILLWAY_DETOUR_PARAGRAPHS.map((block, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 ${
                    showSpillwayNotes ? 'lg:grid-cols-12 gap-4 items-start' : ''
                  }`}
                >
                  <p
                    className={`font-serif text-base sm:text-[17px] leading-relaxed text-stone-100 ${
                      showSpillwayNotes ? 'lg:col-span-8' : ''
                    }`}
                  >
                    {block.text}
                  </p>
                  {showSpillwayNotes && (
                    <div className="lg:col-span-4 p-3.5 rounded-xl bg-stone-900/80 border border-stone-800/80 text-xs space-y-1">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-amber-400">
                        {block.paragraphNum}
                      </div>
                      <div className="text-stone-200 font-medium">{block.title}</div>
                      <p className="text-stone-400 leading-relaxed">{block.craftNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final Self-Assessment */}
          <section className="rounded-2xl border border-stone-800 bg-[#0e0f12] p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  <span>Part C · Final Self-Assessment</span>
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  Spatial Clarity, Physical Credibility, Movement Continuity &amp; Natural Execution
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {ARCH_CORE_003_EVALUATION.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-mono font-semibold text-amber-300 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item.vector}</span>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-emerald-300">
                      {item.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed pl-6">
                    {item.analysis}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : moduleTab === 'boundary_transition' ? (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="border border-emerald-500/30 bg-gradient-to-br from-[#0b1512] via-[#0d1014] to-[#111015] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-emerald-400">
                <Trees className="w-4 h-4" />
                <span>Writer Directive · Topic 3 Training Response (Forest Boundary Transition)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                  3 Vocabulary Registers Enforced
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                  Parts A, B, C &amp; D Complete
                </span>
              </div>
            </div>

            <div className="space-y-2 max-w-4xl">
              <h1 className="text-2xl sm:text-3xl font-serif text-stone-100 tracking-tight">
                Perception, Attention, and the Forest Boundary Transition
              </h1>
              <p className="text-sm text-stone-400 leading-relaxed">
                Demonstrating controlled perception and task-anchored attention during an ordinary chase that subtly begins to feel off—without supernatural leaps, stock horror clichés, or biomechanical over-narration.
              </p>
            </div>
          </div>

          {/* PART A: Methodological Understanding */}
          <section className="rounded-2xl border border-stone-800 bg-[#0e0f12] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400 flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Part A · Methodological Realignment &amp; Specification Review</span>
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  Six-Point Analysis of the Revised Training Specification
                </h2>
              </div>
              <span className="text-xs font-mono text-stone-400">
                Analytical vs. Pedagogical vs. Narrative Registers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PART_A_RESPONSES.map((item) => (
                <div
                  key={item.num}
                  className="p-5 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-2.5"
                >
                  <div className="text-xs font-mono font-semibold text-amber-400">
                    Question {item.num}: {item.question}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PART B: Continuous Exercise Passage */}
          <section className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-[#0d1512] to-[#0b0d10] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Part B · Continuous Passage
                  </span>
                  <h2 className="text-xl font-serif text-stone-100">
                    The Greenbelt Scramble (Phases 1–3)
                  </h2>
                </div>
                <p className="text-xs text-stone-400">
                  Narrative Register only: natural, rhythmic third-person limited prose anchored in Ira&apos;s mundane sixteen-year-old perspective.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBoundaryNotes((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                    showBoundaryNotes
                      ? 'bg-emerald-950/60 border-emerald-700/70 text-emerald-300'
                      : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{showBoundaryNotes ? 'Phase Margin Notes: ON' : 'Pure Reading View'}</span>
                </button>
                <button
                  onClick={() => handleCopy('boundary', fullBoundaryText)}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-stone-300 flex items-center gap-1.5"
                >
                  {copiedId === 'boundary' ? (
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
            </div>

            <div className="space-y-5 bg-stone-950/70 p-6 sm:p-8 rounded-xl border border-stone-800/80">
              {BOUNDARY_PASSAGE_PARAGRAPHS.map((block, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 ${
                    showBoundaryNotes ? 'lg:grid-cols-12 gap-4 items-start' : ''
                  }`}
                >
                  <p
                    className={`font-serif text-base sm:text-[17px] leading-relaxed text-stone-100 ${
                      showBoundaryNotes ? 'lg:col-span-8' : ''
                    }`}
                  >
                    {block.text}
                  </p>
                  {showBoundaryNotes && (
                    <div className="lg:col-span-4 p-3.5 rounded-xl bg-stone-900/80 border border-stone-800/80 text-xs space-y-1">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                        {block.phase}
                      </div>
                      <p className="text-stone-400 leading-relaxed">{block.craftNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* PART C: 5-Point Self-Assessment */}
          <section className="rounded-2xl border border-stone-800 bg-[#0e0f12] p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  <span>Part C · Honest Self-Assessment</span>
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-1">
                  Evaluating Ground, Knowledge, Discrepancy, Pacing, and Voice
                </h2>
              </div>
              <span className="text-xs font-mono text-stone-400">
                Includes specific lexical &amp; botanical density critiques
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {PART_C_ASSESSMENT.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-mono font-semibold text-emerald-300 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        {item.test}: {item.question}
                      </span>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300">
                      {item.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed pl-6">
                    {item.analysis}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* Earlier 3B & 3C Kuoh Junction Exercise */
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="border border-sky-500/30 bg-gradient-to-br from-[#0c1318] via-[#0e0f14] to-[#111015] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-sky-400">
                <Compass className="w-4 h-4" />
                <span>Topic 3B &amp; 3C Practical Assignment · Sentence Architecture &amp; Psychological Narration</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                  1 Event · 3 Levels of Narration
                </span>
                <span className="px-2.5 py-1 rounded-md bg-sky-950/60 border border-sky-800/60 text-sky-300">
                  5-Point Self-Diagnosis Included
                </span>
              </div>
            </div>

            <div className="space-y-2 max-w-4xl">
              <h1 className="text-2xl sm:text-3xl font-serif text-stone-100 tracking-tight">
                One Event, Three Levels of Narration: Constructing Experience Without Formula
              </h1>
              <p className="text-sm text-stone-400 leading-relaxed">
                Testing how sentence-level information flow (<strong>Given → New</strong>, <strong>Subject vs. Agent vs. Focus</strong>) and bounded human cognition (<strong>Perception vs. Interpretation vs. Knowledge</strong>) work together so the reader experiences a coherent world through Ira&apos;s limited, changing perspective.
              </p>
            </div>

            {/* Scenario Box */}
            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800/90 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                Assigned Scenario
              </div>
              <p className="text-sm text-stone-200 leading-relaxed">
                {TOPIC_3_SCENARIO}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800/80">
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                {[
                  { id: 'all', label: 'Compare All 3 Versions', icon: Layers },
                  { id: 'v1', label: '1. Information Architecture', icon: GitBranch },
                  { id: 'v2', label: '2. Psychological Narration', icon: Brain },
                  { id: 'v3', label: '3. Integrated Execution', icon: CheckCircle2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = selectedView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedView(tab.id as 'all' | 'v1' | 'v2' | 'v3')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        active
                          ? 'bg-sky-500 text-stone-950 font-semibold shadow-sm'
                          : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowSentenceBreakdown((prev) => !prev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                  showSentenceBreakdown
                    ? 'bg-emerald-950/60 border-emerald-700/70 text-emerald-300'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>
                  {showSentenceBreakdown
                    ? 'Sentence Architecture X-Ray: ON'
                    : 'Sentence Architecture X-Ray: OFF'}
                </span>
              </button>
            </div>
          </div>

          {/* Three Versions */}
          <div className="grid grid-cols-1 gap-6">
            {visibleVersions.map((ver) => {
              const fullText = ver.paragraphs.join('\n\n');
              return (
                <section
                  key={ver.id}
                  className={`rounded-2xl border p-6 sm:p-8 space-y-6 ${
                    ver.id === 'v3'
                      ? 'border-emerald-500/40 bg-gradient-to-b from-[#0d1512] to-[#0b0d10]'
                      : 'border-stone-800 bg-[#0e0f12]'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800/80 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${
                            ver.id === 'v3'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                          }`}
                        >
                          {ver.number}
                        </span>
                        <h2 className="text-xl font-serif text-stone-100">{ver.title}</h2>
                      </div>
                      <p className="text-xs text-stone-400">{ver.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400">
                        {ver.focusTag}
                      </span>
                      <button
                        onClick={() => handleCopy(ver.id, fullText)}
                        className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-stone-300 flex items-center gap-1.5"
                      >
                        {copiedId === ver.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Prose Body */}
                  <div className="space-y-4 font-serif text-base sm:text-[17px] leading-relaxed text-stone-100 bg-stone-950/60 p-5 sm:p-6 rounded-xl border border-stone-800/70">
                    {ver.paragraphs.map((para, idx) => (
                      <p key={idx} className="text-stone-100">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Sentence Architecture & Psychological Breakdown */}
                  {showSentenceBreakdown && (
                    <div className="space-y-4 pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                        Sentence-Level Information &amp; Cognition Trace
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {ver.structuralNotes.map((note, nIdx) => (
                          <div
                            key={nIdx}
                            className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-2.5 text-xs"
                          >
                            <div className="font-serif italic text-stone-200 border-l-2 border-sky-500 pl-3 py-0.5">
                              &ldquo;{note.sentenceExcerpt}&rdquo;
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              <div className="p-2 rounded bg-stone-950/70 border border-stone-800/60">
                                <span className="font-mono text-[10px] uppercase text-sky-400 block">
                                  Given (Anchor)
                                </span>
                                <span className="text-stone-300">{note.givenInfo}</span>
                              </div>
                              <div className="p-2 rounded bg-stone-950/70 border border-stone-800/60">
                                <span className="font-mono text-[10px] uppercase text-amber-400 block">
                                  New (Rheme / Update)
                                </span>
                                <span className="text-stone-300">{note.newInfo}</span>
                              </div>
                            </div>
                            <div className="text-stone-300">
                              <strong className="text-stone-200 font-mono text-[11px]">
                                Subject / Agent / Focus:{' '}
                              </strong>
                              {note.subjectAgentFocus}
                            </div>
                            <div className="text-stone-400">
                              <strong className="text-stone-200 font-mono text-[11px]">
                                Perception vs. Knowledge:{' '}
                              </strong>
                              {note.perceptionVsKnowledge}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Version Audit Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs space-y-1">
                          <div className="font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>What Worked in {ver.number}</span>
                          </div>
                          <p className="text-stone-300 leading-relaxed">
                            {ver.strengthsAndLimits.whatWorked}
                          </p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs space-y-1">
                          <div className="font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Where {ver.number} Strained or Overcorrected</span>
                          </div>
                          <p className="text-stone-300 leading-relaxed">
                            {ver.strengthsAndLimits.whereItStrained}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Five-Point Diagnostic Section */}
          <section className="rounded-2xl border border-stone-800 bg-[#0e0f12] p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Comparative Craft Audit
                </div>
                <h2 className="text-xl font-serif text-stone-100 mt-0.5">
                  Five-Question Diagnosis Across the Three Versions
                </h2>
              </div>
              <span className="text-xs font-mono text-stone-400">
                Evaluating Inventory, Over-Explanation, Motor-Response Substitution &amp; Epistemic Boundaries
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {DIAGNOSTIC_QUESTIONS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-2"
                >
                  <div className="text-sm font-mono font-semibold text-sky-300 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item.question}</span>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed pl-6">
                    {item.finding}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
