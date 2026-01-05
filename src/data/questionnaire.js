export const STRENGTH_LEVELS = {
  WEAK: { value: 1, label: 'Weak', symbol: '○' },
  MODERATE: { value: 2, label: 'Moderate', symbol: '●' },
  STRONG: { value: 3, label: 'Strong', symbol: '●●' }
};

export const SECTIONS = [
  { id: 'meta', title: 'Meta Worldview', description: 'Your overall perception of human society and its trajectory' },
  { id: 'human-nature', title: 'Human Nature', description: 'Fundamental beliefs about what humans are' },
  { id: 'power-state', title: 'Power, State & Authority', description: 'Views on governance and political power' },
  { id: 'equality-hierarchy', title: 'Equality, Hierarchy & Justice', description: 'Beliefs about human equality and social structure' },
  { id: 'social-issues', title: 'Social Issues', description: 'Views on LGBTQ+ rights, race relations, and social justice' },
  { id: 'responsibility', title: 'Responsibility & Support', description: 'Views on individual vs collective responsibility' },
  { id: 'culture-morality', title: 'Culture & Morality', description: 'Beliefs about cultural values and moral frameworks' },
  { id: 'religion-meaning', title: 'Religion & Meaning', description: 'Views on faith, spirituality, and existential purpose' },
  { id: 'knowledge-science', title: 'Knowledge & Science', description: 'Epistemology and views on scientific inquiry' },
  { id: 'philosophy', title: 'Philosophy & Existence', description: 'Views on consciousness, free will, and the nature of reality' },
  { id: 'drugs', title: 'Drugs & Consciousness', description: 'Views on substance use, altered states, and personal freedom' },
  { id: 'genetics', title: 'Genetics & Human Modification', description: 'Views on biotechnology and human enhancement' },
  { id: 'ai-tech', title: 'AI & Technology', description: 'Perspectives on artificial intelligence and technological change' },
  { id: 'force-legitimacy', title: 'Force & Legitimacy', description: 'Views on violence, coercion, and legitimate authority' },
  { id: 'identity', title: 'Identity & Belonging', description: 'Views on national identity and group membership' },
  { id: 'globalism', title: 'Globalism & Sovereignty', description: 'Views on global governance, borders, and international cooperation' },
  { id: 'personality', title: 'Personality Signals', description: 'Core motivations, fears, and response patterns' }
];

export const QUESTIONS = [
  // SECTION I: META WORLDVIEW
  {
    id: 1,
    sectionId: 'meta',
    text: 'How do you perceive the overall direction of human society?',
    multiSelect: true,
    options: [
      { id: 'q1_optimistic', text: 'Generally improving', description: 'Overall trajectory is positive. Despite setbacks, we are solving problems and making genuine progress.' },
      { id: 'q1_mixed', text: 'Mixed progress and decline', description: 'Some domains improve while others worsen. The trajectory is not uniform.' },
      { id: 'q1_stagnant', text: 'Mostly stagnant', description: 'Fundamental patterns repeat. Surface changes mask underlying continuity.' },
      { id: 'q1_decline', text: 'Declining', description: 'We are moving away from better states. Key capacities or values are being lost.' },
      { id: 'q1_cyclical', text: 'Cyclical', description: 'Societies and civilizations rise and fall in recurring patterns.' },
      { id: 'q1_unsure', text: 'Not sure / mixed', description: 'The trajectory is genuinely uncertain or depends heavily on frame of reference.', isUnsure: true }
    ]
  },

  // SECTION II: HUMAN NATURE
  {
    id: 2,
    sectionId: 'human-nature',
    text: 'Humans are primarily:',
    multiSelect: true,
    options: [
      { id: 'q2_cooperative', text: 'Cooperative', description: 'Humans naturally incline toward cooperation and mutual aid. Most conflict comes from artificial scarcity or corrupting systems.' },
      { id: 'q2_contextual', text: 'Contextually shaped', description: 'Human nature is highly malleable. Circumstances and culture determine whether cooperation or competition dominates.' },
      { id: 'q2_mixed', text: 'Mixed motives', description: 'Humans possess both cooperative and competitive drives. Neither is reducible to the other.' },
      { id: 'q2_competitive', text: 'Competitive', description: 'Humans naturally seek status, resources, and advantage. Cooperation emerges from strategic necessity, not innate altruism.' },
      { id: 'q2_tribal', text: 'Tribal', description: 'Humans cooperate within groups but compete between them. In-group/out-group dynamics are fundamental.' },
      { id: 'q2_unsure', text: 'Not sure / mixed', description: 'Human nature is too complex or contested to reduce to simple claims.', isUnsure: true }
    ]
  },

  // SECTION III: POWER, STATE & AUTHORITY
  {
    id: 3,
    sectionId: 'power-state',
    text: 'The ideal role of the state is:',
    multiSelect: true,
    options: [
      { id: 'q3_minimal', text: 'Minimal', description: 'Protect basic rights and enforce contracts. Most coordination should happen through voluntary association and markets.' },
      { id: 'q3_framework', text: 'Framework provider', description: 'Establish rules and institutions that enable flourishing, but remain neutral on specific outcomes.' },
      { id: 'q3_active', text: 'Active steward', description: 'Shape society toward positive ends through policy, investment, and regulation. Neutrality is a myth.' },
      { id: 'q3_comprehensive', text: 'Comprehensive planner', description: 'Coordinate society at scale. Many problems require centralized planning and resource allocation.' },
      { id: 'q3_contextual', text: 'Context dependent', description: 'The right level of state involvement varies by domain and circumstance. No universal answer.' },
      { id: 'q3_unsure', text: 'Not sure / mixed', description: 'Your view on the state\'s role is uncertain or doesn\'t fit these categories.', isUnsure: true }
    ]
  },
  {
    id: 4,
    sectionId: 'power-state',
    text: 'Democracy is:',
    multiSelect: true,
    options: [
      { id: 'q4_essential', text: 'Essential and sacred', description: 'Popular sovereignty is a fundamental right. Rule by the people is intrinsically valuable, regardless of outcomes.' },
      { id: 'q4_valuable', text: 'Valuable but not absolute', description: 'Democracy is the best system we have, but it requires guardrails, checks, and sometimes constraints.' },
      { id: 'q4_instrumental', text: 'Instrumentally useful', description: 'Democracy is valuable mainly for its outcomes: accountability, stability, and preference aggregation.' },
      { id: 'q4_overrated', text: 'Overrated', description: 'Democracy has serious flaws: short-termism, populism, and mob rule. Other considerations matter more than popular will.' },
      { id: 'q4_outdated', text: 'Outdated', description: 'Modern challenges require expertise and long-term thinking incompatible with electoral cycles and mass politics.' },
      { id: 'q4_unsure', text: 'Not sure / mixed', description: 'Your view on democracy is nuanced or uncertain.', isUnsure: true }
    ]
  },
  {
    id: 5,
    sectionId: 'power-state',
    text: 'Political power primarily comes from:',
    multiSelect: true,
    options: [
      { id: 'q5_consent', text: 'Consent of the governed', description: 'Legitimate authority flows from popular will and democratic processes.' },
      { id: 'q5_tradition', text: 'Tradition and continuity', description: 'Authority is inherited from established institutions, customs, and long-standing social order.' },
      { id: 'q5_expertise', text: 'Expertise and competence', description: 'Those with knowledge and demonstrated ability to govern should hold power.' },
      { id: 'q5_force', text: 'Monopoly on force', description: 'Power ultimately comes from the ability to enforce decisions through coercion.' },
      { id: 'q5_resources', text: 'Control of resources', description: 'Economic power is the foundation of political power. Those who control resources make the rules.' },
      { id: 'q5_unsure', text: 'Not sure / mixed', description: 'Power has multiple sources that interact in complex ways.', isUnsure: true }
    ]
  },
  {
    id: 6,
    sectionId: 'power-state',
    text: 'When state and individual clash:',
    multiSelect: true,
    options: [
      { id: 'q6_individual', text: 'Individual usually prevails', description: 'Personal autonomy is paramount. The burden of proof is always on the state to justify coercion.' },
      { id: 'q6_balance', text: 'Balance of interests', description: 'Both individual and collective goods matter. The right balance depends on stakes and context.' },
      { id: 'q6_collective', text: 'Collective usually prevails', description: 'Social goods often outweigh individual preferences. Rights are granted by society and can be limited for common benefit.' },
      { id: 'q6_state', text: 'State authority is primary', description: 'The state represents the collective will. Individual interests are subordinate to the greater good.' },
      { id: 'q6_unsure', text: 'Not sure / mixed', description: 'This depends heavily on the specific issue and circumstances.', isUnsure: true }
    ]
  },
  {
    id: 7,
    sectionId: 'power-state',
    text: 'In emergencies, the state should:',
    multiSelect: true,
    options: [
      { id: 'q7_decisive', text: 'Act decisively even if rights are limited', description: 'Existential threats require extraordinary measures. Temporary suspension of normal protections may be necessary to preserve society itself.' },
      { id: 'q7_limited', text: 'Act with strict limits and oversight', description: 'Emergency powers are necessary but dangerous. Strong safeguards, sunset clauses, and judicial review must accompany any expansion of state authority.' },
      { id: 'q7_avoid', text: 'Avoid emergency powers', description: 'Emergency powers are almost always abused and rarely relinquished. The cure is typically worse than the disease.' },
      { id: 'q7_unsure', text: 'Not sure / mixed', description: 'The appropriate response depends heavily on the specific emergency and context.', isUnsure: true }
    ]
  },

  // SECTION IV: EQUALITY, HIERARCHY, JUSTICE
  {
    id: 8,
    sectionId: 'equality-hierarchy',
    text: 'Humans are fundamentally:',
    multiSelect: true,
    options: [
      { id: 'q8_equal_both', text: 'Equal in value and ability', description: 'All humans deserve equal moral consideration AND possess roughly equal potential. Observed differences stem from circumstances, not inherent traits.' },
      { id: 'q8_equal_value', text: 'Equal in value, unequal in ability', description: 'All humans deserve equal moral consideration, but individuals genuinely differ in talents, intelligence, and capabilities.' },
      { id: 'q8_unequal_both', text: 'Unequal in both', description: 'Humans differ in both moral worth and ability. Some people contribute more to society and deserve greater consideration.' },
      { id: 'q8_equality_tool', text: 'Equality is a moral tool, not a fact', description: 'Treating people as equals is a useful social convention that promotes cooperation, but isn\'t a statement about reality.' },
      { id: 'q8_unsure', text: 'Not sure / mixed', description: 'The question of human equality is complex and your view doesn\'t fit neatly into these categories.', isUnsure: true }
    ]
  },
  {
    id: 9,
    sectionId: 'equality-hierarchy',
    text: 'Average group differences usually result from:',
    multiSelect: true,
    options: [
      { id: 'q9_choices', text: 'Individual choices', description: 'Different outcomes reflect different decisions people make. Aggregate differences emerge from individual preference and effort patterns.' },
      { id: 'q9_culture', text: 'Culture and family', description: 'Values, practices, and expectations transmitted through families and communities shape outcomes more than other factors.' },
      { id: 'q9_systemic', text: 'Historical and systemic factors', description: 'Past discrimination, ongoing bias, and structural barriers explain most group-level differences in outcomes.' },
      { id: 'q9_biological', text: 'Biological differences', description: 'Genetic and physiological differences between groups contribute meaningfully to observed outcome differences.' },
      { id: 'q9_context', text: 'Context dependent mix', description: 'The relative importance of these factors varies significantly depending on which groups and which outcomes you examine.' },
      { id: 'q9_unsure', text: 'Not sure / mixed', description: 'This is a complex empirical question where you don\'t feel confident in any single answer.', isUnsure: true }
    ]
  },
  {
    id: 10,
    sectionId: 'equality-hierarchy',
    text: 'Inequality should be:',
    multiSelect: true,
    options: [
      { id: 'q10_reduced', text: 'Actively reduced', description: 'Society should work to minimize gaps in wealth, power, and status through redistribution, regulation, and structural change.' },
      { id: 'q10_limited', text: 'Limited but tolerated', description: 'Some inequality is acceptable or inevitable, but extreme disparities undermine social cohesion and require correction.' },
      { id: 'q10_natural', text: 'Accepted as natural', description: 'Inequality reflects real differences in ability and effort. Attempts to eliminate it create worse problems.' },
      { id: 'q10_strategic', text: 'Used strategically', description: 'Inequality can be a tool for incentivizing productivity and achievement. The question is how to deploy it effectively.' },
      { id: 'q10_unsure', text: 'Not sure / mixed', description: 'Your view on inequality depends heavily on what type and degree you\'re discussing.', isUnsure: true }
    ]
  },
  {
    id: 11,
    sectionId: 'equality-hierarchy',
    text: 'Justice is primarily about:',
    multiSelect: true,
    options: [
      { id: 'q11_fairness', text: 'Fair processes', description: 'Justice means following consistent rules and procedures. Outcomes are just if the process is fair.' },
      { id: 'q11_equality', text: 'Equal outcomes', description: 'Justice requires roughly equal results. Processes that produce large disparities are unjust by definition.' },
      { id: 'q11_desert', text: 'What people deserve', description: 'Justice means people get what they earn or merit through their actions and choices.' },
      { id: 'q11_need', text: 'Meeting needs', description: 'Justice means ensuring everyone has their basic needs met. Beyond that, differences are acceptable.' },
      { id: 'q11_restoration', text: 'Correcting past wrongs', description: 'Justice requires actively repairing historical injustices and their ongoing effects.' },
      { id: 'q11_unsure', text: 'Not sure / mixed', description: 'Justice involves multiple competing principles that must be balanced.', isUnsure: true }
    ]
  },

  // SECTION V: SOCIAL ISSUES
  {
    id: 12,
    sectionId: 'social-issues',
    text: 'Same-sex marriage should be:',
    multiSelect: true,
    options: [
      { id: 'q12_legal', text: 'Legal and equal', description: 'Same-sex couples should have the same marriage rights as opposite-sex couples. This is a matter of equal treatment under law.' },
      { id: 'q12_civil', text: 'Civil unions only', description: 'Same-sex couples should have legal protections but marriage as an institution should be reserved for opposite-sex couples.' },
      { id: 'q12_states', text: 'Left to states/communities', description: 'Different communities should be free to define marriage according to their values. National uniformity isn\'t necessary.' },
      { id: 'q12_prohibited', text: 'Not recognized', description: 'Marriage is inherently between a man and woman. Same-sex unions shouldn\'t receive state recognition.' },
      { id: 'q12_unsure', text: 'Not sure / mixed', description: 'Your views on this are complex or uncertain.', isUnsure: true }
    ]
  },
  {
    id: 13,
    sectionId: 'social-issues',
    text: 'Same-sex couples adopting children:',
    multiSelect: true,
    options: [
      { id: 'q13_equal', text: 'Equal right to adopt', description: 'Same-sex couples should have the same adoption rights as opposite-sex couples. What matters is loving, stable homes.' },
      { id: 'q13_case', text: 'Case by case', description: 'Adoption should focus on child welfare. Sexual orientation is one factor among many in evaluating prospective parents.' },
      { id: 'q13_concerns', text: 'Prefer opposite-sex', description: 'Children ideally need both mother and father figures. Opposite-sex couples should be preferred when available.' },
      { id: 'q13_opposed', text: 'Should not adopt', description: 'Children should be raised by a mother and father. Same-sex couples shouldn\'t adopt.' },
      { id: 'q13_unsure', text: 'Not sure / mixed', description: 'Your views on this are complex or uncertain.', isUnsure: true }
    ]
  },
  {
    id: 14,
    sectionId: 'social-issues',
    text: 'Transgender people should:',
    multiSelect: true,
    options: [
      { id: 'q14_full', text: 'Be fully recognized', description: 'Transgender people should be legally recognized in their identified gender and have full access to appropriate facilities and services.' },
      { id: 'q14_adults', text: 'Adults can transition', description: 'Adults should be free to transition but there should be restrictions on medical interventions for minors and in competitive sports.' },
      { id: 'q14_private', text: 'Private matter, not public', description: 'People can identify as they wish privately but shouldn\'t expect institutions to recognize gender identity over biological sex.' },
      { id: 'q14_biological', text: 'Biological sex is what matters', description: 'Gender identity doesn\'t change biological reality. Institutions should operate based on sex, not gender identity.' },
      { id: 'q14_unsure', text: 'Not sure / mixed', description: 'Your views on this are complex or evolving.', isUnsure: true }
    ]
  },
  {
    id: 15,
    sectionId: 'social-issues',
    text: 'Systemic racism in modern society is:',
    multiSelect: true,
    options: [
      { id: 'q15_pervasive', text: 'Pervasive and central', description: 'Racial inequities are primarily driven by ongoing systemic racism embedded in institutions, policies, and culture.' },
      { id: 'q15_exists', text: 'Real but not sole cause', description: 'Systemic racism exists and matters but isn\'t the only factor explaining racial outcome gaps.' },
      { id: 'q15_declining', text: 'Largely historical', description: 'Past racism has lasting effects but current systems are mostly fair. Remaining gaps have other explanations.' },
      { id: 'q15_exaggerated', text: 'Greatly exaggerated', description: 'Claims of systemic racism are overblown. Current institutions generally treat people fairly regardless of race.' },
      { id: 'q15_unsure', text: 'Not sure / mixed', description: 'This is a complex empirical question where you\'re uncertain.', isUnsure: true }
    ]
  },
  {
    id: 16,
    sectionId: 'social-issues',
    text: 'Affirmative action and racial preferences:',
    multiSelect: true,
    options: [
      { id: 'q16_necessary', text: 'Necessary to address inequality', description: 'Race-conscious policies are needed to counteract historical injustice and ongoing disparities.' },
      { id: 'q16_temporary', text: 'Acceptable as temporary measure', description: 'Racial preferences may be justified short-term but should be phased out as equality is achieved.' },
      { id: 'q16_class', text: 'Class-based instead', description: 'Help disadvantaged people based on economics, not race. Class-based affirmative action is fairer and more effective.' },
      { id: 'q16_opposed', text: 'Wrong to use race', description: 'Racial preferences are themselves racist. We should be colorblind and judge people as individuals.' },
      { id: 'q16_unsure', text: 'Not sure / mixed', description: 'Your views on this are complex or context-dependent.', isUnsure: true }
    ]
  },
  {
    id: 17,
    sectionId: 'social-issues',
    text: 'Gender differences in outcomes primarily reflect:',
    multiSelect: true,
    options: [
      { id: 'q17_discrimination', text: 'Discrimination and barriers', description: 'Remaining gender gaps in pay, leadership, etc. are mainly due to ongoing sexism and structural barriers.' },
      { id: 'q17_mixed', text: 'Both bias and choices', description: 'Gender gaps reflect a combination of discrimination AND different average preferences and life choices between men and women.' },
      { id: 'q17_choices', text: 'Different choices', description: 'Men and women on average make different career and life choices. This explains most outcome differences.' },
      { id: 'q17_biological', text: 'Biological differences', description: 'Innate differences between men and women in interests, abilities, and priorities drive most outcome gaps.' },
      { id: 'q17_unsure', text: 'Not sure / mixed', description: 'The causes of gender outcome gaps are complex and contested.', isUnsure: true }
    ]
  },

  // SECTION VI: RESPONSIBILITY & SUPPORT
  {
    id: 18,
    sectionId: 'responsibility',
    text: 'Responsibility for life outcomes is:',
    multiSelect: true,
    options: [
      { id: 'q18_primarily_individual', text: 'Primarily individual', description: 'People are largely responsible for their own success or failure. External factors matter but individual agency is decisive.' },
      { id: 'q18_mostly_individual', text: 'Mostly individual', description: 'Individual choices matter most, but circumstances can create genuine obstacles that deserve recognition.' },
      { id: 'q18_balanced', text: 'Balanced', description: 'Individual agency and structural factors contribute roughly equally. Neither pure meritocracy nor pure determinism captures reality.' },
      { id: 'q18_mostly_societal', text: 'Mostly societal', description: 'Life outcomes are primarily shaped by circumstances of birth, social position, and systemic factors beyond individual control.' },
      { id: 'q18_primarily_societal', text: 'Primarily societal', description: 'Individual outcomes are overwhelmingly determined by structural factors. The illusion of individual control masks systemic causation.' },
      { id: 'q18_unsure', text: 'Not sure / mixed', description: 'The balance between individual and structural factors varies dramatically by domain and person.', isUnsure: true }
    ]
  },

  // SECTION VII: CULTURE & MORALITY
  {
    id: 19,
    sectionId: 'culture-morality',
    text: 'Moral truths are:',
    multiSelect: true,
    options: [
      { id: 'q19_objective', text: 'Objective and universal', description: 'Moral facts exist independently of human opinion. Some things are right or wrong regardless of culture or individual belief.' },
      { id: 'q19_discovered', text: 'Discoverable through reason', description: 'Morality can be worked out through rational inquiry and philosophical investigation.' },
      { id: 'q19_relative', text: 'Culturally relative', description: 'Moral values are created by cultures and vary legitimately across societies. No universal standard exists.' },
      { id: 'q19_subjective', text: 'Individual and subjective', description: 'Morality is personal preference. Each person determines their own values.' },
      { id: 'q19_constructed', text: 'Socially constructed', description: 'Morality emerges from human needs and cooperation. It\'s neither purely objective nor purely subjective.' },
      { id: 'q19_unsure', text: 'Not sure / mixed', description: 'The nature of morality is complex and contested.', isUnsure: true }
    ]
  },

  // SECTION VIII: RELIGION & MEANING
  {
    id: 20,
    sectionId: 'religion-meaning',
    text: 'The universe has:',
    multiSelect: true,
    options: [
      { id: 'q20_purpose', text: 'Inherent purpose or design', description: 'Reality is fundamentally meaningful. Purpose exists whether or not humans perceive it.' },
      { id: 'q20_created', text: 'Meaning from creation', description: 'The universe was created with intention and purpose by a higher power or intelligence.' },
      { id: 'q20_human', text: 'Only human-created meaning', description: 'The universe itself is meaningless. Humans create meaning through consciousness and culture.' },
      { id: 'q20_meaningless', text: 'No inherent meaning', description: 'The universe is fundamentally purposeless. Meaning is an illusion or human projection.' },
      { id: 'q20_unsure', text: 'Not sure / mixed', description: 'The question of cosmic meaning is uncertain or unanswerable.', isUnsure: true }
    ]
  },

  // SECTION IX: KNOWLEDGE & SCIENCE
  {
    id: 21,
    sectionId: 'knowledge-science',
    text: 'Scientific knowledge is:',
    multiSelect: true,
    options: [
      { id: 'q21_truth', text: 'Path to objective truth', description: 'Science reveals reality as it actually is. Scientific facts are true regardless of perspective.' },
      { id: 'q21_best', text: 'Best available method', description: 'Science is our most reliable way to understand reality, though always provisional and subject to revision.' },
      { id: 'q21_limited', text: 'Limited to certain domains', description: 'Science works for physical phenomena but cannot address questions of meaning, value, or subjective experience.' },
      { id: 'q21_constructed', text: 'Socially constructed', description: 'Scientific "facts" are shaped by culture, power, and human interests as much as by nature.' },
      { id: 'q21_unsure', text: 'Not sure / mixed', description: 'The nature and limits of scientific knowledge are complex.', isUnsure: true }
    ]
  },

  // SECTION X: PHILOSOPHY & EXISTENCE
  {
    id: 22,
    sectionId: 'philosophy',
    text: 'Consciousness is:',
    multiSelect: true,
    options: [
      { id: 'q22_fundamental', text: 'Fundamental to reality', description: 'Consciousness is a basic feature of the universe, not reducible to physical processes.' },
      { id: 'q22_emergent', text: 'Emergent from complexity', description: 'Consciousness arises from sufficiently complex information processing but is not itself fundamental.' },
      { id: 'q22_physical', text: 'Fully physical', description: 'Consciousness is brain activity. Mental states are identical to physical brain states.' },
      { id: 'q22_illusion', text: 'An illusion', description: 'What we call consciousness is a useful fiction. There is no unified subjective experience.' },
      { id: 'q22_unsure', text: 'Not sure / mixed', description: 'The nature of consciousness remains deeply mysterious.', isUnsure: true }
    ]
  },
  {
    id: 23,
    sectionId: 'philosophy',
    text: 'Free will is:',
    multiSelect: true,
    options: [
      { id: 'q23_libertarian', text: 'Real and uncaused', description: 'We have genuine freedom to choose otherwise. Our choices are not fully determined by prior causes.' },
      { id: 'q23_compatible', text: 'Compatible with determinism', description: 'Free will means acting according to our desires and reasons, even if those are causally determined.' },
      { id: 'q23_illusion', text: 'An illusion', description: 'Free will is a cognitive illusion. All events, including decisions, are causally determined.' },
      { id: 'q23_incoherent', text: 'Incoherent concept', description: 'The notion of free will doesn\'t make sense. Neither determinism nor randomness produces genuine freedom.' },
      { id: 'q23_unsure', text: 'Not sure / mixed', description: 'The free will problem is unresolved and perhaps unresolvable.', isUnsure: true }
    ]
  },

  // SECTION XI: DRUGS & CONSCIOUSNESS
  {
    id: 24,
    sectionId: 'drugs',
    text: 'Adults should be:',
    multiSelect: true,
    options: [
      { id: 'q24_free', text: 'Free to use any substance', description: 'Individual autonomy includes the right to alter one\'s consciousness. Drug prohibition is unjustified.' },
      { id: 'q24_regulated', text: 'Free with regulation', description: 'Adults can use substances, but society can regulate quality, age, and context.' },
      { id: 'q24_restricted', text: 'Restricted to safer drugs', description: 'Some drugs should remain prohibited due to harm potential. Distinguish between cannabis and harder drugs.' },
      { id: 'q24_prohibited', text: 'Protected from harmful drugs', description: 'Society should prevent drug use. Prohibition protects individuals and communities.' },
      { id: 'q24_unsure', text: 'Not sure / mixed', description: 'Drug policy requires balancing freedom, harm reduction, and social costs.', isUnsure: true }
    ]
  },
  {
    id: 25,
    sectionId: 'drugs',
    text: 'Psychedelic experiences:',
    multiSelect: true,
    options: [
      { id: 'q25_valuable', text: 'Valuable and insightful', description: 'Psychedelics can produce genuine insights and therapeutic benefits.' },
      { id: 'q25_interesting', text: 'Interesting but not truth', description: 'Psychedelic experiences are fascinating but don\'t reveal objective truths about reality.' },
      { id: 'q25_dangerous', text: 'Potentially dangerous', description: 'The risks of psychedelics outweigh potential benefits for most people.' },
      { id: 'q25_no_opinion', text: 'No strong view', description: 'You don\'t have enough information or interest to form a view.', isUnsure: true }
    ]
  },

  // SECTION XII: GENETICS & HUMAN MODIFICATION
  {
    id: 26,
    sectionId: 'genetics',
    text: 'Genetic enhancement of humans:',
    multiSelect: true,
    options: [
      { id: 'q26_pursue', text: 'Should be pursued', description: 'Improving human capabilities through genetic engineering is desirable and ethical.' },
      { id: 'q26_cautious', text: 'Proceed cautiously', description: 'Genetic enhancement may be acceptable but requires careful regulation and oversight.' },
      { id: 'q26_disease_only', text: 'Only to prevent disease', description: 'Gene editing should be limited to treating serious medical conditions, not enhancement.' },
      { id: 'q26_oppose', text: 'Should be opposed', description: 'Genetic modification of humans crosses ethical lines and risks unforeseen consequences.' },
      { id: 'q26_unsure', text: 'Not sure / mixed', description: 'The ethics of genetic enhancement are complex and unresolved.', isUnsure: true }
    ]
  },

  // SECTION XIII: AI & TECHNOLOGY
  {
    id: 27,
    sectionId: 'ai-tech',
    text: 'AI development should be:',
    multiSelect: true,
    options: [
      { id: 'q27_accelerate', text: 'Accelerated', description: 'AI benefits are enormous. We should develop it as quickly as possible.' },
      { id: 'q27_market', text: 'Market driven', description: 'Private companies competing will produce the best outcomes. Regulation slows progress.' },
      { id: 'q27_regulated', text: 'Regulated', description: 'AI development needs oversight to ensure safety and alignment with human values.' },
      { id: 'q27_restricted', text: 'Heavily restricted', description: 'Strong controls are necessary. AI poses existential risks.' },
      { id: 'q27_slowed', text: 'Slowed significantly', description: 'Current pace is reckless. We need to dramatically slow down AI development.' },
      { id: 'q27_unsure', text: 'Not sure / mixed', description: 'AI governance involves difficult tradeoffs between progress and safety.', isUnsure: true }
    ]
  },

  // SECTION XIV: FORCE & LEGITIMACY
  {
    id: 28,
    sectionId: 'force-legitimacy',
    text: 'Political violence by citizens:',
    multiSelect: true,
    options: [
      { id: 'q28_never', text: 'Never justified', description: 'Violence by citizens against the state is never legitimate. Use democratic processes.' },
      { id: 'q28_extreme', text: 'Only in extreme cases', description: 'Violence might be justified against tyranny when all other options are exhausted.' },
      { id: 'q28_oppression', text: 'Justified against oppression', description: 'Oppressed groups have the right to use force to resist systematic injustice.' },
      { id: 'q28_contextual', text: 'Highly contextual', description: 'Whether violence is justified depends entirely on specific circumstances and alternatives.' },
      { id: 'q28_unsure', text: 'Not sure / mixed', description: 'The ethics of political violence are complex and situational.', isUnsure: true }
    ]
  },

  // SECTION XV: IDENTITY & BELONGING
  {
    id: 29,
    sectionId: 'identity',
    text: 'National identity is:',
    multiSelect: true,
    options: [
      { id: 'q29_important', text: 'Important and valuable', description: 'Shared national identity creates social cohesion and mutual obligation.' },
      { id: 'q29_acceptable', text: 'Acceptable if inclusive', description: 'National identity is fine as long as it doesn\'t exclude or discriminate.' },
      { id: 'q29_outdated', text: 'Increasingly outdated', description: 'In a globalized world, national identity matters less than universal human values.' },
      { id: 'q29_harmful', text: 'Actively harmful', description: 'Nationalism and national identity cause division, conflict, and suffering.' },
      { id: 'q29_unsure', text: 'Not sure / mixed', description: 'The value and risks of national identity are complex.', isUnsure: true }
    ]
  },

  // SECTION XVI: GLOBALISM & SOVEREIGNTY
  {
    id: 30,
    sectionId: 'globalism',
    text: 'Global governance institutions (UN, WHO, WTO, etc.) should be:',
    multiSelect: true,
    options: [
      { id: 'q30_strengthened', text: 'Strengthened significantly', description: 'Global challenges require strong international institutions with real enforcement power.' },
      { id: 'q30_reformed', text: 'Reformed and empowered', description: 'Current institutions are flawed but the concept is sound. They need democratic reform and more authority.' },
      { id: 'q30_advisory', text: 'Advisory only', description: 'International bodies should coordinate and advise but nations must retain full sovereignty over decisions.' },
      { id: 'q30_minimized', text: 'Minimized or abolished', description: 'Global governance erodes national sovereignty and democratic accountability. Nations should cooperate bilaterally.' },
      { id: 'q30_unsure', text: 'Not sure / mixed', description: 'The appropriate role for global institutions varies by issue and context.', isUnsure: true }
    ]
  },
  {
    id: 31,
    sectionId: 'globalism',
    text: 'National borders should be:',
    multiSelect: true,
    options: [
      { id: 'q31_open', text: 'Open and permeable', description: 'Free movement of people is a human right. Borders create artificial divisions and should be minimized.' },
      { id: 'q31_easier', text: 'Easier to cross legally', description: 'Immigration should be simplified and expanded, though some screening and limits are reasonable.' },
      { id: 'q31_controlled', text: 'Firmly controlled', description: 'Nations have the right and duty to control who enters. Current immigration levels should be maintained or reduced.' },
      { id: 'q31_strict', text: 'Strictly enforced', description: 'Strong borders protect national identity, security, and economic interests. Immigration should be highly selective.' },
      { id: 'q31_unsure', text: 'Not sure / mixed', description: 'Border policy involves complex tradeoffs that vary by country and circumstance.', isUnsure: true }
    ]
  },
  {
    id: 32,
    sectionId: 'globalism',
    text: 'Economic globalization is:',
    multiSelect: true,
    options: [
      { id: 'q32_beneficial', text: 'Highly beneficial', description: 'Free trade and global markets lift all boats. Protectionism makes everyone poorer.' },
      { id: 'q32_managed', text: 'Good with safeguards', description: 'Globalization creates wealth but requires labor protections, environmental standards, and safety nets.' },
      { id: 'q32_mixed', text: 'Winners and losers', description: 'Global trade benefits some while harming others. The costs and benefits are unevenly distributed.' },
      { id: 'q32_harmful', text: 'Largely harmful', description: 'Globalization undermines wages, destroys communities, and concentrates power in corporations. We need economic nationalism.' },
      { id: 'q32_unsure', text: 'Not sure / mixed', description: 'The effects of economic globalization are complex and contested.', isUnsure: true }
    ]
  },
  {
    id: 33,
    sectionId: 'globalism',
    text: 'A world government would be:',
    multiSelect: true,
    options: [
      { id: 'q33_desirable', text: 'Desirable and necessary', description: 'Humanity\'s challenges are global. A democratic world government is the logical endpoint of political evolution.' },
      { id: 'q33_eventual', text: 'Possibly inevitable', description: 'Increased integration may eventually lead to world government, for better or worse.' },
      { id: 'q33_undesirable', text: 'Undesirable but unlikely', description: 'Consolidating power globally would be dangerous, but it\'s not a realistic prospect.' },
      { id: 'q33_dangerous', text: 'Dangerous and dystopian', description: 'World government would be tyrannical. Cultural diversity and national sovereignty must be preserved.' },
      { id: 'q33_unsure', text: 'Not sure / mixed', description: 'The concept of world government raises difficult questions without clear answers.', isUnsure: true }
    ]
  },

  // SECTION XVII: PERSONALITY
  {
    id: 34,
    sectionId: 'personality',
    text: 'Your primary motivation is:',
    multiSelect: true,
    options: [
      { id: 'q30_truth', text: 'Understanding truth', description: 'You are primarily driven by a desire to understand how things really are.' },
      { id: 'q30_reduce_suffering', text: 'Reducing suffering', description: 'Minimizing pain and harm is your core concern.' },
      { id: 'q30_achievement', text: 'Achievement and impact', description: 'Accomplishing significant things and having influence drives you.' },
      { id: 'q30_connection', text: 'Connection and belonging', description: 'Relationships and community are central to your motivation.' },
      { id: 'q30_autonomy', text: 'Freedom and autonomy', description: 'Personal independence and self-determination matter most.' },
      { id: 'q30_unsure', text: 'Multiple / unclear', description: 'Your motivations are complex or context-dependent.', isUnsure: true }
    ]
  }
];

export const getQuestionsBySection = (sectionId) => {
  return QUESTIONS.filter(q => q.sectionId === sectionId);
};

export const getSectionById = (sectionId) => {
  return SECTIONS.find(s => s.id === sectionId);
};
