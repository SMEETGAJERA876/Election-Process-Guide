export const regions = [
  { id: 'IN', name: 'India', country: 'IN', locale: 'en-IN' },
];

export const timelineEvents = [
  { 
    id: 't1', 
    region_id: 'IN', 
    date: 'Jan 15 - Mar 30, 2026', 
    title: 'Registration Window',
    description: 'Ensure your eligibility and secure your right to vote. This is the foundational step for all subsequent electoral participation.',
    type: 'registration',
    tasks: [
      'Verify your current residential address and citizenship status using official portal.',
      'Submit online Form 6 for registration or visit local civic centers with valid ID proofs.',
      'Check your name in the draft electoral roll once it is published for any corrections.',
      'Ensure your mobile number is linked to your EPIC (Voter ID) for digital services.'
    ],
    link: 'https://voters.eci.gov.in',
    deadline: 'March 30, 2026 (Midnight)'
  },
  { 
    id: 't2', 
    region_id: 'IN', 
    date: 'Apr 10 - May 20, 2026', 
    title: 'Campaign Period',
    description: 'Evaluate candidates, attend town halls, and review policy platforms to make an informed choice.',
    type: 'campaign',
    tasks: [
      'Research local candidate manifestos and past performance records.',
      'Attend at least one neighborhood town hall or virtual debate to ask questions.',
      'Verify campaign finance disclosures if available for transparency assessment.',
      'Review official fact-checks on common election misinformation and rumors.'
    ]
  },
  { 
    id: 't3', 
    region_id: 'IN', 
    date: 'Apr 19 - Jun 1, 2026', 
    title: 'General Voting Day (Phased)',
    description: 'Cast your vote at your designated polling station or through authorized mail-in channels.',
    type: 'voting',
    tasks: [
      'Locate your designated polling station using the ECI Booth Finder tool.',
      'Bring a valid form of identification (Voter ID card or alternate authorized ID).',
      'Understand the VVPAT verification process at the polling booth.',
      'Check polling booth timings and accessibility facilities for senior citizens.'
    ]
  },
  { 
    id: 't4', 
    region_id: 'IN', 
    date: 'June 4, 2026', 
    title: 'Results & Post-Election',
    description: 'Official counting of votes and declaration of results across all constituencies.',
    type: 'results',
    tasks: [
      'Monitor official ECI results portal for real-time updates.',
      'Understand the process of government formation and oath-taking.',
      'Review post-election reports and audit summaries.'
    ]
  }
];

export const glossaryTerms = [
  { id: 'g1', term: 'Absentee Ballot', definition: 'A vote cast by someone who is unable to attend the official polling station.' },
  { id: 'g2', term: 'Electoral College', definition: 'A set of electors who are selected to elect a candidate to a particular office.' },
  { id: 'g3', term: 'Voter ID', definition: 'Identification required to verify a voter\'s identity before voting.' },
  { id: 'g4', term: 'Constituency', definition: 'A body of voters in a specified area who elect a representative to a legislative body.' },
  { id: 'g5', term: 'Model Code of Conduct', definition: 'Guidelines issued by the Election Commission of India for candidates and political parties.' },
  { id: 'g6', term: 'EVM', definition: 'Electronic Voting Machine used to record and count votes.' },
  { id: 'g7', term: 'VVPAT', definition: 'Voter Verifiable Paper Audit Trail, a system that provides feedback to voters using a ballotless voting system.' },
  { id: 'g8', term: 'Epic Number', definition: 'The unique identification number on your Voter ID card.' },
  { id: 'g9', term: 'Delimitation', definition: 'The act or process of fixing limits or boundaries of territorial constituencies in a country.' },
  { id: 'g10', term: 'Incumbent', definition: 'The current holder of a political office.' },
];

export const quizData = [
  {
    id: 'q1',
    region_id: 'IN',
    question: 'Who conducts elections in India?',
    options: ['Supreme Court', 'Parliament', 'Election Commission of India', 'President'],
    correct_option: 2,
    explanation: 'The Election Commission of India is the autonomous constitutional authority responsible for administering election processes in India.',
  },
  {
    id: 'q2',
    region_id: 'IN',
    question: 'What is the minimum age required to vote in India?',
    options: ['16 years', '18 years', '21 years', '25 years'],
    correct_option: 1,
    explanation: 'The 61st Amendment Act, 1988 reduced the voting age from 21 to 18 years in India.',
  },
  {
    id: 'q3',
    region_id: 'IN',
    question: 'What is the tenure of the Lok Sabha?',
    options: ['4 years', '5 years', '6 years', 'Unlimited'],
    correct_option: 1,
    explanation: 'The Lok Sabha, unless sooner dissolved, continues for five years from the date appointed for its first meeting.',
  },
  {
    id: 'q4',
    region_id: 'IN',
    question: 'Which document is commonly known as EPIC?',
    options: ['Aadhaar Card', 'PAN Card', 'Voter ID Card', 'Ration Card'],
    correct_option: 2,
    explanation: 'EPIC stands for Elector\'s Photo Identity Card, commonly known as the Voter ID card.',
  },
  {
    id: 'q5',
    region_id: 'IN',
    question: 'What does NOTA stand for on an EVM?',
    options: ['No One To Answer', 'None Of The Above', 'Never On This Area', 'Notice Of The Authority'],
    correct_option: 1,
    explanation: 'NOTA (None Of The Above) is a ballot option designed to allow the voter to indicate disapproval of all candidates.',
  },
  {
    id: 'q6',
    region_id: 'IN',
    question: 'Who appoints the Chief Election Commissioner of India?',
    options: ['Prime Minister', 'Chief Justice of India', 'President of India', 'Home Minister'],
    correct_option: 2,
    explanation: 'The President of India appoints the Chief Election Commissioner and other Election Commissioners.',
  },
  {
    id: 'q7',
    region_id: 'IN',
    question: 'What is the maximum number of members in the Lok Sabha as per the Constitution?',
    options: ['500', '525', '550', '545'],
    correct_option: 2,
    explanation: 'The maximum strength of the House is 550 members - 530 to represent the States and 20 to represent the Union Territories.',
  },
  {
    id: 'q8',
    region_id: 'IN',
    question: 'What type of ink is used for marking a voter\'s finger?',
    options: ['Permanent Marker Ink', 'Indelible Ink', 'Scented Ink', 'Watercolour'],
    correct_option: 1,
    explanation: 'Indelible ink, containing silver nitrate, is used to prevent multiple voting.',
  },
  {
    id: 'q9',
    region_id: 'IN',
    question: 'In which year were the first general elections held in India?',
    options: ['1947', '1950', '1951-52', '1955'],
    correct_option: 2,
    explanation: 'The first general elections were held between 25 October 1951 and 21 February 1952.',
  },
  {
    id: 'q10',
    region_id: 'IN',
    question: 'What does VVPAT provide to the voter?',
    options: ['A physical receipt to take home', 'A visual verification of the vote cast', 'A digital copy of the vote', 'A discount coupon'],
    correct_option: 1,
    explanation: 'VVPAT allows voters to verify that their votes are cast as intended through a printed slip viewed behind a glass.',
  },
  {
    id: 'q11',
    region_id: 'IN',
    question: 'How many members does the President nominate to the Rajya Sabha?',
    options: ['2', '10', '12', '15'],
    correct_option: 2,
    explanation: 'The President nominates 12 members to the Rajya Sabha for their contributions to art, literature, science, and social services.',
  },
  {
    id: 'q12',
    region_id: 'IN',
    question: 'Which constitutional body is responsible for the delimitation of constituencies?',
    options: ['Election Commission', 'Delimitation Commission', 'Finance Commission', 'Law Commission'],
    correct_option: 1,
    explanation: 'The Delimitation Commission of India is a commission established by the Government of India under the Delimitation Commission Act.',
  }
];

export const faqs = [
  { question: 'Am I eligible to vote?', answer: 'Eligibility varies by region, but generally you must be a citizen and 18 years or older on election day.' },
  { question: 'How do I register to vote?', answer: 'You can often register online, by mail, or in-person. Check your local election authority\'s website for specific deadlines and methods.' },
  { question: 'Do I need an ID to vote?', answer: 'Many regions require a valid photo ID, but requirements vary. Always check local guidelines before heading to the polls.' },
];
