import { deskCopy } from "@/lib/formulas";

export type Kind =
  | "theory"
  | "practice"
  | "reasoning"
  | "ga"
  | "mock"
  | "review"
  | "desk"
  | "job"
  | "buffer";

export type Slot = {
  id: string;
  start: string;
  end: string;
  kind: Kind;
  title: string;
  detail: string;
  tech?: number;
  reasoning?: number;
  ga?: number;
  optional?: boolean;
};

export type DayPlan = {
  iso: string;
  dateLabel: string;
  weekday: string;
  week: 1 | 2 | 3 | 4;
  title: string;
  outcome: string;
  numerical: boolean;
  note?: string;
  dutyNote?: string;
  slots: Slot[];
  dutySlots?: Slot[];
};

type Block = {
  title: string;
  detail: string;
  tech?: number;
  reasoning?: number;
  ga?: number;
  kind?: Kind;
  optional?: boolean;
};

export const PLAN_START = "2026-10-08";
export const PLAN_END = "2026-10-31";

export const weeks = [
  {
    id: 1 as const,
    title: "Neenv",
    kicker: "8–11 Oct",
    goal: "Digital Logic, Computer Organization aur Programming & Data Structures ka pehla poora round. C ke output-based sawal alag se.",
    test: "Raviwar, 11 Oct: 40 sawal, 40 minute. Digital Logic + COA + DS. Phone dusre kamre mein.",
  },
  {
    id: 2 as const,
    title: "Core",
    kicker: "12–18 Oct",
    goal: "Algorithms, Operating System aur DBMS. Scheduling, page replacement aur SQL output is hafte ke number hain.",
    test: "Raviwar, 18 Oct: 50 sawal, 60 minute. Algo + OS + DBMS. Jo nahi aata use chhodo — Paper-II jaisa −1 maan kar.",
  },
  {
    id: 3 as const,
    title: "Baaki syllabus",
    kicker: "19–25 Oct",
    goal: "Computer Networks, Theory of Computation, Compiler Design aur Engineering Mathematics. Subnetting aur probability alag drill hain.",
    test: "Raviwar, 25 Oct: 50 sawal, 60 minute. CN + TOC + Compiler + Maths.",
  },
  {
    id: 4 as const,
    title: "Revision aur mock",
    kicker: "26–31 Oct",
    goal: "Naya chapter band. Chaar din sirf mix practice aur pichhli galtiyan. Phir do timed mock.",
    test: "30 Oct raat: Paper-II, 100 sawal, 120 minute, har galat par −1. 31 Oct: Paper-I, 200 sawal, 120 minute, har galat par −0.25.",
  },
];

export const syllabus = [
  {
    id: "dl",
    name: "Digital Logic",
    days: ["2026-10-08"],
    weight: "Scoring, short",
    points: [
      "Boolean algebra, De Morgan, SOP/POS, K-map, don't care",
      "Adder, multiplexer, decoder, encoder, comparator",
      "Latch, SR, JK, D, T, counters, registers",
      "Number systems, complements, fixed and floating point",
    ],
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture",
    days: ["2026-10-09"],
    weight: "Numerical + theory",
    points: [
      "Machine instructions and addressing modes",
      "ALU, data path, hardwired vs microprogrammed control",
      "Pipelining, stalls, data / control / structural hazards",
      "Cache mapping, write policies, interrupt vs DMA",
    ],
  },
  {
    id: "ds",
    name: "Programming & Data Structures",
    days: ["2026-10-10", "2026-10-11"],
    weight: "High weight",
    points: [
      "C: pointers, arrays, strings, storage class, output questions",
      "Recursion",
      "Arrays, stacks, queues, linked lists",
      "Trees, BST, binary heap, graph representation",
    ],
  },
  {
    id: "algo",
    name: "Algorithms",
    days: ["2026-10-12", "2026-10-13", "2026-10-14"],
    weight: "High weight",
    points: [
      "Searching, sorting, stability, asymptotic notation",
      "Hashing",
      "Greedy, dynamic programming, divide-and-conquer, Master theorem",
      "BFS, DFS, MST, shortest paths, topological sort",
    ],
  },
  {
    id: "os",
    name: "Operating System",
    days: ["2026-10-15", "2026-10-16"],
    weight: "Numerical heavy",
    points: [
      "Processes, threads, system calls, IPC",
      "Semaphores, deadlock, Banker's algorithm",
      "CPU scheduling and Gantt charts",
      "Paging, virtual memory, page replacement, file allocation",
    ],
  },
  {
    id: "db",
    name: "Databases",
    days: ["2026-10-17", "2026-10-18"],
    weight: "High weight",
    points: [
      "ER model, keys, relational algebra",
      "SQL output, GROUP BY, nested queries",
      "Normal forms through BCNF",
      "B and B+ trees, ACID, serializability, locks, 2PL",
    ],
  },
  {
    id: "cn",
    name: "Computer Networks",
    days: ["2026-10-19", "2026-10-20", "2026-10-21"],
    weight: "Numerical heavy",
    points: [
      "OSI and TCP/IP, switching, framing, CRC",
      "Routing: flooding, distance vector, link state",
      "IPv4, CIDR, subnetting, ARP, DHCP, ICMP, NAT, fragmentation",
      "UDP, TCP, congestion, DNS, SMTP, HTTP, FTP",
    ],
  },
  {
    id: "toc",
    name: "Theory of Computation",
    days: ["2026-10-22"],
    weight: "Conceptual MCQ",
    points: [
      "Regular expressions, DFA, NFA",
      "CFG, PDA, pumping lemma as a classifier",
      "Turing machines",
      "Decidability and the halting problem",
    ],
  },
  {
    id: "cd",
    name: "Compiler Design",
    days: ["2026-10-23"],
    weight: "Conceptual MCQ",
    points: [
      "Phases, tokens, symbol table",
      "FIRST / FOLLOW, LL(1), shift-reduce",
      "Syntax-directed translation, three-address code",
      "Constant propagation, liveness, common subexpression elimination",
    ],
  },
  {
    id: "math",
    name: "Engineering Mathematics",
    days: ["2026-10-24", "2026-10-25"],
    weight: "Formula MCQ",
    points: [
      "Logic, sets, relations, posets, lattices, groups, counting",
      "Matrices, determinants, eigenvalues",
      "Limits, continuity, maxima-minima, integration",
      "Bayes, binomial, Poisson, uniform, exponential, normal",
    ],
  },
  {
    id: "reason",
    name: "General Intelligence & Reasoning",
    days: [
      "2026-10-09",
      "2026-10-10",
      "2026-10-11",
      "2026-10-12",
      "2026-10-13",
      "2026-10-14",
      "2026-10-15",
      "2026-10-16",
      "2026-10-17",
      "2026-10-18",
      "2026-10-19",
      "2026-10-20",
      "2026-10-21",
      "2026-10-22",
      "2026-10-23",
      "2026-10-24",
      "2026-10-25",
      "2026-10-26",
      "2026-10-27",
      "2026-10-28",
      "2026-10-29",
      "2026-10-31",
    ],
    weight: "Paper-I, 50 marks",
    points: [
      "Analogy, classification, series, coding-decoding",
      "Blood relation, direction, ranking, syllogism",
      "Seating, puzzle, inequality, clock, calendar",
      "Figure series, mirror, paper fold, embedded figures",
    ],
  },
  {
    id: "ga",
    name: "General Awareness",
    days: [
      "2026-10-09",
      "2026-10-10",
      "2026-10-11",
      "2026-10-12",
      "2026-10-13",
      "2026-10-14",
      "2026-10-15",
      "2026-10-16",
      "2026-10-17",
      "2026-10-18",
      "2026-10-19",
      "2026-10-20",
      "2026-10-21",
      "2026-10-22",
      "2026-10-23",
      "2026-10-24",
      "2026-10-25",
      "2026-10-26",
      "2026-10-27",
      "2026-10-28",
      "2026-10-29",
      "2026-10-31",
    ],
    weight: "Paper-I, 50 marks",
    points: [
      "Polity: rights, parliament, constitutional bodies",
      "History timeline and modern India years",
      "India and world geography facts",
      "Economy basics, schemes, and a thin layer of current affairs",
    ],
  },
];

export const rules = [
  {
    title: "Merit Paper-II par hai",
    detail:
      "Paper-I shortlist ke liye qualifying hai: Reasoning 50, GA 50, CS & IT 100, negative −0.25. Paper-II sirf CS & IT hai, 100 sawal, 300 marks, har galat par −1. Antim merit normalized Paper-II se banta hai. Isliye din ka bhaari hissa technical practice hai.",
  },
  {
    title: "Office mein teen zaroori desk slots",
    detail:
      "10:00–19:00 kaam hai, par beech mein teen slot chhootenge nahi: 13:00–13:20 aaj ki formula sheet aur 6 MCQ, 16:30–16:42 band karke yaad, 18:50–19:00 paanch line pocket card. Naya chapter office mein nahi. Baaki padhai subah 6:00–8:50 aur raat 8:00–10:50.",
  },
  {
    title: "Ek source, ek error copy",
    detail:
      "GATE/JE CS ke jo short notes pehle se hon, wahi. Nayi kitaab is mahine shuru mat karo. Part-D graduation level ka hai, sirf diploma notes se paper nahi katega. Har galat sawal par ek line: topic, galti, sahi baat.",
  },
  {
    title: "Thakaan par kya kaatein",
    detail:
      "Pehle GA, phir reasoning, phir nayi theory. Technical practice us din ke hisaab se kam mat hone do. Koi poora din chhoot jaaye to agla din naya topic adha karo, practice poori rakho.",
  },
  {
    title: "Neend bhi slot hai",
    detail:
      "Roz 23:00 tak band, 5:45 par uthna. Mock wali raat ko solution likhne mat baith jaana. Analysis agle slot mein hai.",
  },
];

function minutesBetween(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return eh * 60 + em - (sh * 60 + sm);
}

function toMin(value: string) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

function office(iso: string, blocks: {
  theory: Block;
  practice: Block;
  ga: Block;
  evening: Block;
  reasoning: Block;
  review: Block;
}): Slot[] {
  const row = (
    key: string,
    start: string,
    end: string,
    kind: Kind,
    block: Block,
  ): Slot => ({
    id: `${iso}-${key}`,
    start,
    end,
    kind: block.kind ?? kind,
    title: block.title,
    detail: block.detail,
    tech: block.tech,
    reasoning: block.reasoning,
    ga: block.ga,
    optional: block.optional,
  });

  return [
    row("t", "06:00", "07:20", "theory", blocks.theory),
    {
      id: `${iso}-b1`,
      start: "07:20",
      end: "07:35",
      kind: "buffer",
      title: "Chhoti break",
      detail:
        "Chai. Agla set pehle se khol ke rakho, taaki agle 75 minute sirf solve aur review mein jaayein.",
    },
    row("p", "07:35", "08:50", "practice", blocks.practice),
    {
      id: `${iso}-leave`,
      start: "08:50",
      end: "10:00",
      kind: "buffer",
      title: "Office ke liye nikalna",
      detail:
        "9:15 tak nikal jao. Bag mein ek formula sheet. Commute par gaana, ya GA ke 10 flashcard. Naya chapter nahi.",
    },
    {
      id: `${iso}-job`,
      start: "10:00",
      end: "19:00",
      kind: "job",
      title: "Office",
      detail:
        "10:00 se 19:00 duty. Is khidki ka padhai mein hisaab nahi. Kaam khatam, phir 8 baje desk.",
    },
    {
      id: `${iso}-din`,
      start: "19:00",
      end: "20:00",
      kind: "buffer",
      title: "Ghar aur khana",
      detail:
        "Ek ghanta buffer. Padhai 20:00 baje. Thake hue dimaag par naya topic tabhi jab slot mein likha ho, usse pehle nahi.",
    },
    row("g", "20:00", "20:25", "ga", blocks.ga),
    row("e", "20:25", "21:40", "theory", blocks.evening),
    {
      id: `${iso}-b2`,
      start: "21:40",
      end: "21:50",
      kind: "buffer",
      title: "Das minute",
      detail: "Paani aur stretch. Phone dusre kamre mein.",
    },
    row("r", "21:50", "22:35", "reasoning", blocks.reasoning),
    row("v", "22:35", "22:50", "review", blocks.review),
  ];
}

function slot(
  id: string,
  start: string,
  end: string,
  kind: Kind,
  title: string,
  detail: string,
  counts?: { tech?: number; reasoning?: number; ga?: number; optional?: boolean },
): Slot {
  return { id, start, end, kind, title, detail, ...counts };
}

export const days: DayPlan[] = [
  {
    iso: "2026-10-08",
    dateLabel: "8 Oct",
    weekday: "गुरुवार",
    week: 1,
    title: "Digital Logic",
    numerical: true,
    outcome:
      "Boolean algebra, circuits aur number representation ek baar poora, saath mein 30 MCQ.",
    note: "Aaj ka zaroori kaam raat 8 baje se 11:20 tak hai. Subah wale slots tabhi karo jab yeh din abhi subah se shuru ho. Office ja chuke ho to subah chhodo — raat wale chaar slots mein poora chapter hai. Dono mat ghisna.",
    slots: [
      slot(
        "2026-10-08-opt-t",
        "06:00",
        "07:20",
        "theory",
        "Optional: Boolean aur K-map",
        "Sirf tab, jab subah free ho. Boolean laws, De Morgan, SOP/POS, 2/3/4 variable K-map, don't care. Number systems aur 1's, 2's complement.",
        { optional: true },
      ),
      slot(
        "2026-10-08-b0",
        "07:20",
        "07:35",
        "buffer",
        "Break",
        "Optional subah ke saath hi. Raat wala plan is par depend nahi karta.",
      ),
      slot(
        "2026-10-08-opt-p",
        "07:35",
        "08:50",
        "practice",
        "Optional: 25 MCQ Digital Logic",
        "K-map aur complement. Subah kar liya ho to raat ka practice slot fir bhi rakho, par theory doosri baar mat padho.",
        { tech: 25, optional: true },
      ),
      slot(
        "2026-10-08-leave",
        "08:50",
        "10:00",
        "buffer",
        "Office ke liye nikalna",
        "9:15 tak nikalna. Aaj pehla din hai, bag mein sirf khaali error copy.",
      ),
      slot(
        "2026-10-08-job",
        "10:00",
        "19:00",
        "job",
        "Office",
        "10 se 7 duty. Chapter ka guilt is dauran nahi. Raat 8 baje shuru karna hai.",
      ),
      slot(
        "2026-10-08-din",
        "19:00",
        "20:00",
        "buffer",
        "Ghar aur khana",
        "Ek ghanta. 20:00 baje desk, phone dusre kamre.",
      ),
      slot(
        "2026-10-08-e1",
        "20:00",
        "21:15",
        "theory",
        "Boolean, K-map, complements",
        "Laws, De Morgan, SOP/POS, K-map 2 se 4 variable, don't care. Binary, octal, hex. Signed magnitude, 1's aur 2's complement. Yahi subah wale optional ka poora hissa hai.",
      ),
      slot(
        "2026-10-08-b2",
        "21:15",
        "21:25",
        "buffer",
        "Das minute",
        "Paani. Agla hissa circuits ka hai.",
      ),
      slot(
        "2026-10-08-e2",
        "21:25",
        "22:25",
        "theory",
        "Circuits aur number representation",
        "Half/full adder, MUX, decoder, encoder, comparator. Latch vs flip-flop. SR, JK, D, T ki characteristic equation. Ripple aur synchronous counter, shift register. Fixed vs floating point: sign, mantissa, exponent, bias.",
      ),
      slot(
        "2026-10-08-p",
        "22:25",
        "23:05",
        "practice",
        "30 MCQ, mix Digital Logic",
        "K-map, flip-flop aur complement teeno se sawal hon. Last 15 minute sirf galat sawal. Reasoning aur GA aaj nahi — kal se roz shuru.",
        { tech: 30 },
      ),
      slot(
        "2026-10-08-v",
        "23:05",
        "23:20",
        "review",
        "Paanch line aur neend",
        "Error copy: De Morgan, 2's complement ke steps, JK/D/T equations, floating-point ke hisse. 23:20 ke baad band.",
      ),
    ],
  },
  {
    iso: "2026-10-09",
    dateLabel: "9 Oct",
    weekday: "शुक्रवार",
    week: 1,
    title: "Computer Organization",
    numerical: true,
    outcome: "Addressing modes, pipeline aur cache, 40 MCQ, reasoning aur GA shuru.",
    slots: office("2026-10-09", {
      theory: {
        title: "Instructions aur addressing modes",
        detail:
          "Instruction cycle. Opcode aur operand. Modes: immediate, direct, indirect, register, register-indirect, indexed, relative. ALU ka kaam. Hardwired vs microprogrammed control. PC, IR, MAR, MBR ka role, detail architecture nahi.",
      },
      practice: {
        title: "25 MCQ — mode identify karo",
        detail:
          "Ek instruction dekar mode poochha jaata hai. Galat ho to definition ek line mein error copy. Aakhri 20 minute sirf review.",
        tech: 25,
      },
      ga: {
        title: "Itihaas, sirf timeline",
        detail:
          "IVC, Vedic, Maurya, Gupta, Delhi Sultanate, Mughals. Har ek ka ek shasak aur ek kaam. Kahani nahi.",
        ga: 10,
      },
      evening: {
        title: "Pipeline, cache, interrupt, DMA",
        detail:
          "Pehle 45 minute: ideal speedup, stall, data/control/structural hazard, forwarding. Cache: direct, set-associative, fully associative, hit rate, write-through vs write-back, effective access time. Interrupt vs DMA. Aakhri 30 minute: 15 MCQ.",
        tech: 15,
      },
      reasoning: {
        title: "Coding-decoding",
        detail:
          "Letter shift aur number coding, 20 sawal. Tees second mein pattern na dikhe to aage badho, ant mein lautna.",
        reasoning: 20,
      },
      review: {
        title: "Teen formula",
        detail:
          "Likh kar so jao: ideal speedup, hit rate, effective memory access time. 23:00 tak light band.",
      },
    }),
  },
  {
    iso: "2026-10-10",
    dateLabel: "10 Oct",
    weekday: "शनिवार",
    week: 1,
    title: "C aur linear data structures",
    numerical: false,
    outcome: "Pointers, recursion, stack, queue, linked list, aur 65 MCQ.",
    dutyNote:
      "Shanivar duty par hai to C aur linear DS subah-shaam. Trees kal hain, aaj unhe mat chhedo. Practice 40 MCQ reh jaayegi, raviwar ka test cover karega.",
    slots: [
      slot(
        "2026-10-10-sat-t1",
        "07:00",
        "09:00",
        "theory",
        "C jo MCQ mein aata hai",
        "Pointers, pointer arithmetic, arrays, strings, storage class, call by value. Recursion tree aur base case. Output-based sawal ka andaaz samjho, poori language nahi.",
      ),
      slot(
        "2026-10-10-sat-b1",
        "09:00",
        "09:30",
        "buffer",
        "Nashta",
        "Aadha ghanta. Phone yahin khatam.",
      ),
      slot(
        "2026-10-10-sat-p1",
        "09:30",
        "11:30",
        "practice",
        "30 MCQ — C output aur recursion",
        "Galat output ko dry-run ke saath error copy mein likho. Sirf jawab mark karke aage mat badho.",
        { tech: 30 },
      ),
      slot(
        "2026-10-10-sat-r",
        "11:30",
        "12:10",
        "reasoning",
        "Direction aur ranking",
        "20 sawal. Distance-direction mein diagram bina solve kiye jawab mat chuno.",
        { reasoning: 20 },
      ),
      slot(
        "2026-10-10-sat-rest",
        "12:10",
        "14:30",
        "buffer",
        "Khana aur aaram",
        "Yeh aaram plan ka hissa hai. 14:30 se pehle agla chapter mat kholo.",
      ),
      slot(
        "2026-10-10-sat-t2",
        "14:30",
        "16:30",
        "theory",
        "Array, stack, queue, linked list",
        "Insert aur delete ki complexity. Stack se infix/postfix ka idea. Circular queue. Singly, doubly, circular list par insertion ke cases. Code yaad karne ki jagah operation yaad karo.",
      ),
      slot(
        "2026-10-10-sat-g",
        "16:30",
        "17:00",
        "ga",
        "Bharat ka physical map",
        "Nadiyan, darre, mittiyan, monsoon. Das se pandrah facts, ek baar likh lo.",
        { ga: 15 },
      ),
      slot(
        "2026-10-10-sat-p2",
        "17:00",
        "18:40",
        "practice",
        "35 MCQ — stack, queue, list",
        "Complexity wale sawal alag se mark karo. Jo structure confuse ho, uska ek chhota diagram banao.",
        { tech: 35 },
      ),
      slot(
        "2026-10-10-sat-v",
        "18:40",
        "19:10",
        "review",
        "Complexity ki ek table",
        "Array, stack, queue, singly aur doubly list ke insert/delete/search. Iske baad aaj band. Raat ko naya topic nahi.",
      ),
    ],
    dutySlots: office("2026-10-10", {
      theory: {
        title: "C: pointers, arrays, recursion",
        detail:
          "Output-based C. Pointers, arrays, strings, storage class, recursion tree. Poori language nahi, wahi jo MCQ mein aata hai.",
      },
      practice: {
        title: "25 MCQ — C output",
        detail: "Galat output ka dry-run error copy mein. Aakhri 15 minute review.",
        tech: 25,
      },
      ga: {
        title: "Bharat ka physical map",
        detail: "Nadi, darra, mitti, monsoon. Das facts.",
        ga: 10,
      },
      evening: {
        title: "Stack, queue, linked list",
        detail:
          "Pehle 45 minute operations aur complexity. Circular queue aur doubly list ke cases. Aakhri 30 minute 15 MCQ.",
        tech: 15,
        kind: "practice",
      },
      reasoning: {
        title: "Direction aur ranking",
        detail: "20 sawal, diagram ke bina direction mat chuno.",
        reasoning: 20,
      },
      review: {
        title: "Complexity table",
        detail: "Chaar structures ki insert/delete/search complexity. 23:00 tak band.",
      },
    }),
  },
  {
    iso: "2026-10-11",
    dateLabel: "11 Oct",
    weekday: "रविवार",
    week: 1,
    title: "Trees, heap, graph aur hafta test",
    numerical: false,
    outcome: "Non-linear DS khatam, phir 40 minute ka timed test.",
    slots: [
      slot(
        "2026-10-11-t",
        "08:00",
        "10:00",
        "theory",
        "Tree, BST, heap, graph",
        "Inorder, preorder, postorder. BST insert, search, delete. AVL sirf balance factor tak. Binary heap insert/delete. Graph: adjacency list vs matrix, degree. Traversal ka code nahi, order yaad hai.",
      ),
      slot(
        "2026-10-11-b1",
        "10:00",
        "10:20",
        "buffer",
        "Break",
        "Chai. Test ka set alag rakhna, abhi use mat kholo.",
      ),
      slot(
        "2026-10-11-p",
        "10:20",
        "11:40",
        "practice",
        "30 MCQ — tree, BST, heap, graph",
        "Traversal wale sawal haath se banao. Sirf option padh kar mat chuno.",
        { tech: 30 },
      ),
      slot(
        "2026-10-11-rest",
        "11:40",
        "14:00",
        "buffer",
        "Khana aur aaram",
        "Test dopehar ko hai. Is aaram ko skip karke subah ka topic dobara mat padho.",
      ),
      slot(
        "2026-10-11-m",
        "14:00",
        "14:40",
        "mock",
        "Mini test: 40 sawal, 40 minute",
        "Digital Logic + COA + DS. Timer. Phone dusre kamre. Jo nahi aata chhodo, negative −0.25 maan kar.",
        { tech: 40 },
      ),
      slot(
        "2026-10-11-v1",
        "14:40",
        "15:40",
        "review",
        "Test ka analysis",
        "Har galat par topic tag. Teen se zyada galat wale topic ka naam kal ke error copy ke upar likho.",
      ),
      slot(
        "2026-10-11-r",
        "15:40",
        "16:25",
        "reasoning",
        "Non-verbal",
        "Figure series, mirror, water image, paper folding. 25 sawal.",
        { reasoning: 25 },
      ),
      slot(
        "2026-10-11-g",
        "16:25",
        "17:10",
        "ga",
        "Hafte ka static mix",
        "Polity, itihaas, geo se 15 sawal. Naya chapter nahi.",
        { ga: 15 },
      ),
      slot(
        "2026-10-11-v2",
        "17:10",
        "17:40",
        "review",
        "Hafta band",
        "Error copy band karo. Kal Algorithms hai — sorting ki table wale notes sirf nikaal ke rakh do, padhna kal subah.",
      ),
    ],
  },
  {
    iso: "2026-10-12",
    dateLabel: "12 Oct",
    weekday: "सोमवार",
    week: 2,
    title: "Algorithms: sort, search, hash",
    numerical: false,
    outcome: "Sorting table aur hashing, 40 MCQ.",
    slots: office("2026-10-12", {
      theory: {
        title: "Search, sort, asymptotic notation",
        detail:
          "Linear aur binary search. Bubble, selection, insertion, merge, quick, heap, counting, radix: best, average, worst, stable, in-place. Big-O, Omega, Theta. Simple recurrence sirf merge sort jitni.",
      },
      practice: {
        title: "25 MCQ — sorting identify karo",
        detail:
          "Best/worst/stable wale sawal. Galat sort ka ek cell error copy mein. Comparison sort ki lower bound yaad rakhna.",
        tech: 25,
      },
      ga: {
        title: "Economy, definitions",
        detail:
          "GDP, inflation, repo, reverse repo, CRR, budget, RBI ke kaam. Das definitions, ek line each.",
        ga: 10,
      },
      evening: {
        title: "Hashing, phir 15 MCQ",
        detail:
          "Hash function, chaining, open addressing, collision, load factor. Primary clustering ka naam. 45 minute theory, 30 minute mein 15 MCQ search+sort+hash.",
        tech: 15,
      },
      reasoning: {
        title: "Syllogism",
        detail: "Do statements, Venn se. 20 sawal. 'Some not' wale cases alag se dhyaan.",
        reasoning: 20,
      },
      review: {
        title: "Sort table yaad se",
        detail: "Bina notes ke 8 sorts ki teen complexities. Jo atak jaaye sirf wahi kal subah se pehle dekho. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-13",
    dateLabel: "13 Oct",
    weekday: "मंगलवार",
    week: 2,
    title: "Greedy, DP, divide-and-conquer",
    numerical: false,
    outcome: "Design techniques ka MCQ round, 40 sawal.",
    slots: office("2026-10-13", {
      theory: {
        title: "Greedy",
        detail:
          "Fractional knapsack, activity selection, Huffman ka idea. Greedy kab fail hota hai, yeh 0/1 knapsack se farq. Proof nahi, choice ki property.",
      },
      practice: {
        title: "20 MCQ — greedy choice",
        detail: "Kaun sa problem greedy hai, kaun DP. Galat classification error copy mein.",
        tech: 20,
      },
      ga: {
        title: "Rozmarra science",
        detail: "Units, vitamins, common diseases, light aur sound ke basic facts. Das sawal.",
        ga: 10,
      },
      evening: {
        title: "DP, Master theorem, 20 MCQ",
        detail:
          "0/1 knapsack, LCS, LIS — table padhna aur bharna. Matrix chain sirf idea. Master theorem: a, b, k ke teen cases, lamba proof nahi. Aakhri 25 minute 20 MCQ.",
        tech: 20,
      },
      reasoning: {
        title: "Blood relation",
        detail: "20 sawal. Generation ka diagram. 'Only son of' wale sentences par ruko.",
        reasoning: 20,
      },
      review: {
        title: "Ek DP table khud",
        detail: "LCS ya knapsack ka ek chhota table bina notes ke. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-14",
    dateLabel: "14 Oct",
    weekday: "बुधवार",
    week: 2,
    title: "Graph algorithms",
    numerical: false,
    outcome: "BFS se shortest path tak, aur poore algo ka mix set.",
    slots: office("2026-10-14", {
      theory: {
        title: "BFS aur DFS",
        detail:
          "Queue vs stack. Connected components, cycle detection undirected aur directed. Complexity adjacency list par.",
      },
      practice: {
        title: "20 MCQ — traversal",
        detail: "Chhote graph par BFS/DFS order haath se. Starting vertex dhyan se.",
        tech: 20,
      },
      ga: {
        title: "Current affairs ka tarika",
        detail:
          "Pichhle teen mahine ke 10 headings chuno. Aaj 4 headings, har ek par do line. Roz isi list mein se do revise karoge.",
        ga: 10,
      },
      evening: {
        title: "MST, shortest path, topo sort",
        detail:
          "Prim aur Kruskal, cycle check. Dijkstra negative edge par nahi. Bellman-Ford ka idea. Topological sort. Phir 20 MCQ mix: sort + DP + graph.",
        tech: 20,
        kind: "practice",
      },
      reasoning: {
        title: "Linear seating",
        detail: "15 sawal ya do chhote sets. Poora arrangement likho, option se ulta mat jao.",
        reasoning: 15,
      },
      review: {
        title: "Graph complexity",
        detail: "BFS, DFS, Prim, Kruskal, Dijkstra ki time complexity ek line each. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-15",
    dateLabel: "15 Oct",
    weekday: "गुरुवार",
    week: 2,
    title: "OS: process, sync, deadlock",
    numerical: false,
    outcome: "Process se Banker's algorithm tak, 40 MCQ.",
    slots: office("2026-10-15", {
      theory: {
        title: "Process, thread, IPC",
        detail:
          "System call kya hai. Process vs thread. PCB. States: new, ready, running, waiting, terminated. Shared memory vs message passing.",
      },
      practice: {
        title: "20 MCQ — process aur thread",
        detail: "State transition wale sawal diagram se. Galat transition likho.",
        tech: 20,
      },
      ga: {
        title: "Parliament aur emergency",
        detail:
          "Lok Sabha, Rajya Sabha, President, PM. Money bill vs ordinary. National, state, financial emergency ka article number agar yaad ho, warna naam aur farq.",
        ga: 10,
      },
      evening: {
        title: "Semaphore aur deadlock",
        detail:
          "Race, critical section, mutex, binary aur counting semaphore. Producer-consumer ka idea. Deadlock ki 4 conditions. Prevention, avoidance, Banker's ka concept, detection. 20 MCQ.",
        tech: 20,
      },
      reasoning: {
        title: "Inequality",
        detail: "20 sawal. Symbols ko chain banao, yaad se mat chuno.",
        reasoning: 20,
      },
      review: {
        title: "Deadlock ki chaar lines",
        detail: "Mutual exclusion, hold and wait, no preemption, circular wait. Apne shabdon mein. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-16",
    dateLabel: "16 Oct",
    weekday: "शुक्रवार",
    week: 2,
    title: "OS numerical: schedule aur paging",
    numerical: true,
    outcome: "Gantt chart aur page replacement haath se, 40 MCQ.",
    slots: office("2026-10-16", {
      theory: {
        title: "Memory ka nakshe",
        detail:
          "Paging, segmentation, internal vs external fragmentation. Page table, frame. Virtual memory aur page fault ka matlab. File allocation contiguous, linked, indexed — sirf farq.",
      },
      practice: {
        title: "15 MCQ — memory concepts",
        detail: "Fragmentation aur page fault wale seedhe sawal. Numerical raat ko hai.",
        tech: 15,
      },
      ga: {
        title: "Aadhunik Bharat, saal",
        detail: "1857 se 1947. Andolan aur saal. Das events, kahani nahi.",
        ga: 10,
      },
      evening: {
        title: "Gantt chart aur page replacement",
        detail:
          "FCFS, SJF, SRTF, Priority, Round Robin — kam se kam 4 schedule. Waiting time aur turnaround. FIFO, LRU, Optimal — 3 numerical. Phir jitna time bache 10 MCQ. Calculator ki aadat mat daalo.",
        tech: 25,
        kind: "practice",
      },
      reasoning: {
        title: "Do chhote puzzle",
        detail: "Floor ya box, 15 sawal. Ek puzzle 20 minute se aage mat kheecho.",
        reasoning: 15,
      },
      review: {
        title: "Ek galat Gantt dubara",
        detail: "Jo schedule galat hua, bina notes ke ek baar aur. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-17",
    dateLabel: "17 Oct",
    weekday: "शनिवार",
    week: 2,
    title: "DBMS: ER, algebra, SQL",
    numerical: true,
    outcome: "Relational algebra aur SQL output, 55 MCQ.",
    dutyNote:
      "Duty mode mein algebra subah, SQL raat ko. 40 MCQ. Jo SQL reh jaaye use raviwar subah ke 25 MCQ mein pehle lo.",
    slots: [
      slot(
        "2026-10-17-sat-t1",
        "07:00",
        "09:00",
        "theory",
        "ER, keys, relational algebra",
        "Entity, attribute, relationship, cardinality. Super, candidate, primary, foreign key. Select, project, union, difference, cartesian, theta/equi/natural/outer join, division.",
      ),
      slot(
        "2026-10-17-sat-b1",
        "09:00",
        "09:30",
        "buffer",
        "Nashta",
        "Aadha ghanta.",
      ),
      slot(
        "2026-10-17-sat-p1",
        "09:30",
        "11:30",
        "practice",
        "25 MCQ — algebra",
        "Query ka result chhota table bana kar nikalo. Division wale sawal skip mat karo, ek example samajh lo.",
        { tech: 25 },
      ),
      slot(
        "2026-10-17-sat-r",
        "11:30",
        "12:10",
        "reasoning",
        "Clock aur calendar",
        "20 sawal. Angle of clock ka formula ek baar likh lo, phir sawal.",
        { reasoning: 20 },
      ),
      slot(
        "2026-10-17-sat-rest",
        "12:10",
        "14:30",
        "buffer",
        "Khana aur aaram",
        "14:30 se pehle SQL mat kholo.",
      ),
      slot(
        "2026-10-17-sat-t2",
        "14:30",
        "16:30",
        "theory",
        "SQL jo output poochhta hai",
        "SELECT, WHERE, GROUP BY, HAVING, JOIN, nested query, view, NULL. Clause ka order. HAVING vs WHERE.",
      ),
      slot(
        "2026-10-17-sat-g",
        "16:30",
        "17:00",
        "ga",
        "Kala aur sanskriti",
        "Nritya, tyohar, UNESCO sites. Ek chhoti list, 15 facts.",
        { ga: 15 },
      ),
      slot(
        "2026-10-17-sat-p2",
        "17:00",
        "18:40",
        "practice",
        "30 MCQ — SQL output",
        "Query likho ya table par chalao, option se andaza mat lagao. NULL wale sawal alag tag.",
        { tech: 30 },
      ),
      slot(
        "2026-10-17-sat-v",
        "18:40",
        "19:10",
        "review",
        "Teen galat query dubara",
        "Bina options ke result likho. Aaj yahin band.",
      ),
    ],
    dutySlots: office("2026-10-17", {
      theory: {
        title: "ER, keys, relational algebra",
        detail:
          "Cardinality aur keys. Select, project, joins, division. Chhote table par ek-ek operator.",
      },
      practice: {
        title: "20 MCQ — algebra",
        detail: "Result table banao. Division ka ek sawal zaroor.",
        tech: 20,
      },
      ga: {
        title: "Kala aur sanskriti",
        detail: "Das facts: nritya, tyohar, sites.",
        ga: 10,
      },
      evening: {
        title: "SQL output, 20 MCQ",
        detail:
          "GROUP BY, HAVING, JOIN, nested, NULL. Pehle 40 minute do examples, phir 20 sawal.",
        tech: 20,
        kind: "practice",
      },
      reasoning: {
        title: "Clock aur calendar",
        detail: "20 sawal. Clock angle ka formula pehle likho.",
        reasoning: 20,
      },
      review: {
        title: "Ek galat SQL dubara",
        detail: "Bina options ke. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-18",
    dateLabel: "18 Oct",
    weekday: "रविवार",
    week: 2,
    title: "Normalization, transactions, hafta test",
    numerical: true,
    outcome: "DBMS ka baaki hissa aur 50 sawal ka sectional.",
    slots: [
      slot(
        "2026-10-18-t",
        "08:00",
        "10:00",
        "theory",
        "Normal forms, index, transaction",
        "Anomaly, functional dependency. 1NF, 2NF, 3NF, BCNF — example se. B-tree vs B+ tree, primary vs secondary index. ACID. Conflict serializability, precedence graph. Shared/exclusive lock, 2PL.",
      ),
      slot(
        "2026-10-18-b1",
        "10:00",
        "10:20",
        "buffer",
        "Break",
        "Test ka set abhi band rakho.",
      ),
      slot(
        "2026-10-18-p",
        "10:20",
        "11:30",
        "practice",
        "25 MCQ — normal form aur transaction",
        "Form identify karo. Precedence graph wala ek sawal khud banao.",
        { tech: 25 },
      ),
      slot(
        "2026-10-18-rest",
        "11:30",
        "14:00",
        "buffer",
        "Khana aur aaram",
        "Sectional 2 baje hai. Subah wala topic doosri baar mat padho.",
      ),
      slot(
        "2026-10-18-m",
        "14:00",
        "15:00",
        "mock",
        "Sectional: 50 sawal, 60 minute",
        "Algorithms + OS + DBMS. Timer. Har galat par −1 maan kar, isliye andaza kam. Paper-II ki practice yahin se hai.",
        { tech: 50 },
      ),
      slot(
        "2026-10-18-v1",
        "15:00",
        "15:50",
        "review",
        "Analysis",
        "Topic-wise galat count. Hafta 4 ki revision list mein teeno sabse kamzor topic likho.",
      ),
      slot(
        "2026-10-18-r",
        "15:50",
        "16:30",
        "reasoning",
        "Figure classification",
        "Embedded figure aur classification, 20 sawal.",
        { reasoning: 20 },
      ),
      slot(
        "2026-10-18-g",
        "16:30",
        "17:15",
        "ga",
        "Static mix",
        "Polity, itihaas, economy se 20 sawal.",
        { ga: 20 },
      ),
      slot(
        "2026-10-18-v2",
        "17:15",
        "17:45",
        "review",
        "Agle hafte ki ek line",
        "Kal Networks. OSI ke 7 naam raat ko yaad karne ki koshish mat karo — subah ka pehla kaam yahi hai.",
      ),
    ],
  },
  {
    iso: "2026-10-19",
    dateLabel: "19 Oct",
    weekday: "सोमवार",
    week: 3,
    title: "Networks: layers aur data link",
    numerical: true,
    outcome: "OSI/TCP aur CRC tak, 40 MCQ.",
    slots: office("2026-10-19", {
      theory: {
        title: "Layering aur switching",
        detail:
          "OSI ke 7 aur TCP/IP ke layers, PDU ke naam. Circuit, packet, virtual circuit switching. Kaun si layer kya karti hai, device kis layer ka hai.",
      },
      practice: {
        title: "15 MCQ — layers",
        detail: "Protocol ko layer se match karo. Galat match ek table mein.",
        tech: 15,
      },
      ga: {
        title: "Jagahon ke facts",
        detail: "Straits, dams, capitals jo exams mein ghoomte hain. 15 facts likh lo.",
        ga: 10,
      },
      evening: {
        title: "Framing, CRC, Ethernet",
        detail:
          "Parity, checksum, CRC numerical kam se kam 4. MAC, CSMA/CD ka idea, Ethernet, bridge vs router. Phir 25 MCQ. CRC ke steps error copy mein.",
        tech: 25,
        kind: "practice",
      },
      reasoning: {
        title: "Analogy, naya set",
        detail: "20 sawal. Word aur number dono.",
        reasoning: 20,
      },
      review: {
        title: "CRC ke chaar step",
        detail: "Generator polynomial se remainder tak, apne shabdon mein. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-20",
    dateLabel: "20 Oct",
    weekday: "मंगलवार",
    week: 3,
    title: "IP aur subnetting",
    numerical: true,
    outcome: "CIDR numerical ka din. Kam se kam 20 subnet sawal.",
    slots: office("2026-10-20", {
      theory: {
        title: "Routing",
        detail:
          "Flooding, distance vector, count-to-infinity, split horizon ka naam. Link state. Shortest path as a routing idea, algorithm kal wale graph se jod lo.",
      },
      practice: {
        title: "15 MCQ — routing",
        detail: "DV vs LS. Infinite count wala classic sawal.",
        tech: 15,
      },
      ga: {
        title: "Yojana aur mantralay",
        detail: "Das schemes, har ek ka mantralay ya ek line ka uddeshya.",
        ga: 10,
      },
      evening: {
        title: "Subnetting drill",
        detail:
          "Classful limits, CIDR, network aur broadcast, usable hosts. Kam se kam 8 subnet khud se: /26, /27, /28, /29. ARP, DHCP, ICMP, NAT, fragmentation (offset, MF, DF). Phir 25 MCQ, inmein se adhe numerical.",
        tech: 25,
        kind: "practice",
      },
      reasoning: {
        title: "Coding, naya pattern",
        detail: "20 sawal. Symbol coding alag se 5.",
        reasoning: 20,
      },
      review: {
        title: "Do subnet bina notes",
        detail: "Ek /26 aur ek /28. Host range likho. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-21",
    dateLabel: "21 Oct",
    weekday: "बुधवार",
    week: 3,
    title: "Transport aur application",
    numerical: false,
    outcome: "TCP/UDP aur application protocols, CN ka mix set.",
    slots: office("2026-10-21", {
      theory: {
        title: "UDP, TCP, congestion",
        detail:
          "UDP vs TCP header ka farq, ports. Three-way handshake, FIN. Flow control vs congestion. Slow start ka idea. Socket kya hai, code nahi.",
      },
      practice: {
        title: "20 MCQ — transport",
        detail: "Handshake ke steps wale sawal. Galat sequence likho.",
        tech: 20,
      },
      ga: {
        title: "Science GK, chhota",
        detail:
          "ISRO ke recent headings jo aapki current list mein hon, aur rozmarra computer full forms jo GA poochhta hai. Technical CN nahi.",
        ga: 10,
      },
      evening: {
        title: "DNS, mail, HTTP, mix CN",
        detail:
          "DNS hierarchy, SMTP, HTTP, FTP, email ka flow (user agent se server tak). Phir 20 MCQ poore networks se: layer, CRC, subnet, TCP.",
        tech: 20,
        kind: "practice",
      },
      reasoning: {
        title: "Statement aur conclusion",
        detail: "20 sawal. Conclusion ko statement se bahar mat le jao.",
        reasoning: 20,
      },
      review: {
        title: "TCP vs UDP, chhe point",
        detail: "Connection, reliability, order, header, use-case. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-22",
    dateLabel: "22 Oct",
    weekday: "गुरुवार",
    week: 3,
    title: "Theory of Computation",
    numerical: false,
    outcome: "Automata se decidability tak, 40 MCQ.",
    slots: office("2026-10-22", {
      theory: {
        title: "Regex, DFA, NFA",
        detail:
          "Language, regex, DFA vs NFA, epsilon-NFA. Conversion ka idea, poora algorithm ratna nahi. Chhoti language ka DFA bana lena.",
      },
      practice: {
        title: "20 MCQ — automata",
        detail: "Kaun si language regular hai. State count wale chhote sawal.",
        tech: 20,
      },
      ga: {
        title: "Sanvaidhanik nikay",
        detail: "Election Commission, CAG, UPSC, Finance Commission. Kaun banata hai, kya karta hai. Ek page.",
        ga: 10,
      },
      evening: {
        title: "CFG, PDA, TM, decidability",
        detail:
          "CFG, leftmost derivation, PDA ka idea. Pumping lemma se language ko regular/CFL se bahar pehchanna, lamba proof nahi. TM. Halting problem undecidable hai — yeh list banao: decidable vs undecidable ke 6 classic naam. 20 MCQ.",
        tech: 20,
      },
      reasoning: {
        title: "Number series",
        detail: "20 sawal. Missing number aur galat number dono.",
        reasoning: 20,
      },
      review: {
        title: "Char class, ek example",
        detail: "Regular, CFL, recursive, RE. Har ek ki ek language. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-23",
    dateLabel: "23 Oct",
    weekday: "शुक्रवार",
    week: 3,
    title: "Compiler Design",
    numerical: true,
    outcome: "Parsing aur local optimization, 40 MCQ.",
    slots: office("2026-10-23", {
      theory: {
        title: "Phases aur tokens",
        detail:
          "Compiler ki phases ka order. Lexeme vs token. Symbol table kab banti hai. Parse tree vs syntax tree. Error kis phase mein pakda jaata hai.",
      },
      practice: {
        title: "20 MCQ — phases",
        detail: "Kaun sa kaam kis phase ka hai. Galat phase ko sahi ke saath likho.",
        tech: 20,
      },
      ga: {
        title: "Polity, ek page revise",
        detail: "Rights, DPSP, parliament, emergency. 10 rapid sawal apni purani sheet se.",
        ga: 10,
      },
      evening: {
        title: "FIRST, FOLLOW, optimization",
        detail:
          "Ek chhota grammar: FIRST aur FOLLOW. LL(1) conflict ka matlab. Shift-reduce, handle. Three-address code ka ek example. Constant folding, constant propagation, liveness, common subexpression — har ek ka ek line example. 20 MCQ.",
        tech: 20,
      },
      reasoning: {
        title: "Direction aur blood, mix",
        detail: "20 sawal, aadhe-aadhe. Diagram compulsory.",
        reasoning: 20,
      },
      review: {
        title: "FIRST / FOLLOW ek grammar",
        detail: "Bina notes ke wahi chhota grammar dubara. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-24",
    dateLabel: "24 Oct",
    weekday: "शनिवार",
    week: 3,
    title: "Maths: discrete aur linear algebra",
    numerical: true,
    outcome: "Logic, relations, matrices, 50 MCQ.",
    dutyNote:
      "Duty mode mein discrete subah, matrices raat ko. Calculus aur probability kal ke hain.",
    slots: [
      slot(
        "2026-10-24-sat-t1",
        "07:00",
        "09:00",
        "theory",
        "Discrete mathematics",
        "Propositional logic, sets, relations: reflexive, symmetric, transitive, equivalence. Partial order, Hasse diagram, lattice. Functions. Groups ke axioms, example level. Counting, permutation, combination. Recurrence ka simple form. Graph words: connectivity, matching, colouring.",
      ),
      slot(
        "2026-10-24-sat-b1",
        "09:00",
        "09:30",
        "buffer",
        "Nashta",
        "Aadha ghanta.",
      ),
      slot(
        "2026-10-24-sat-p1",
        "09:30",
        "11:15",
        "practice",
        "25 MCQ — discrete",
        "Relation properties wale sawal sabse pehle. Galat property ko example ke saath likho.",
        { tech: 25 },
      ),
      slot(
        "2026-10-24-sat-r",
        "11:15",
        "12:00",
        "reasoning",
        "Ek puzzle set",
        "20 minute setup, phir sawal. 20 se zyada mat badhao agar set lamba ho.",
        { reasoning: 20 },
      ),
      slot(
        "2026-10-24-sat-rest",
        "12:00",
        "14:30",
        "buffer",
        "Khana aur aaram",
        "Matrices 14:30 se.",
      ),
      slot(
        "2026-10-24-sat-t2",
        "14:30",
        "16:15",
        "theory",
        "Linear algebra",
        "Matrix operations, determinant, rank, linear system kab solution hai. Eigenvalue aur eigenvector 2×2 par haath se. LU decomposition sirf yeh ki kya toda jaata hai.",
      ),
      slot(
        "2026-10-24-sat-g",
        "16:15",
        "16:45",
        "ga",
        "Economy, current",
        "Apni 10 headings mein se economy wale. 15 facts ya sawal.",
        { ga: 15 },
      ),
      slot(
        "2026-10-24-sat-p2",
        "16:45",
        "18:15",
        "practice",
        "25 MCQ — matrices",
        "2×2 eigen haath se. Rank wale sawal. Calculator nahi.",
        { tech: 25 },
      ),
      slot(
        "2026-10-24-sat-v",
        "18:15",
        "18:45",
        "review",
        "Formula ki aadhi sheet",
        "Relation properties aur det/eigen. Kal probability ki sheet isi mein judegi. Aaj band.",
      ),
    ],
    dutySlots: office("2026-10-24", {
      theory: {
        title: "Discrete: logic, relations, counting",
        detail:
          "Propositional logic, relation properties, poset, lattice, group axioms, counting, graph terms jo definition poochhte hain.",
      },
      practice: {
        title: "20 MCQ — discrete",
        detail: "Relation identify karna. Galat property + counterexample.",
        tech: 20,
      },
      ga: {
        title: "Economy, current",
        detail: "Apni headings mein se economy. 10 sawal.",
        ga: 10,
      },
      evening: {
        title: "Matrices aur eigen, 20 MCQ",
        detail:
          "Det, rank, 2×2 eigenvalue haath se. LU sirf definition. Phir 20 MCQ.",
        tech: 20,
        kind: "practice",
      },
      reasoning: {
        title: "Ek chhota puzzle",
        detail: "20 sawal ke barabar ek set. 45 minute se aage nahi.",
        reasoning: 20,
      },
      review: {
        title: "Relation + eigen, paanch line",
        detail: "23:00 band. Calculus kal.",
      },
    }),
  },
  {
    iso: "2026-10-25",
    dateLabel: "25 Oct",
    weekday: "रविवार",
    week: 3,
    title: "Calculus, probability, hafta test",
    numerical: true,
    outcome: "Maths khatam aur teesre hafte ka 50 sawal ka sectional.",
    slots: [
      slot(
        "2026-10-25-t1",
        "08:00",
        "09:20",
        "theory",
        "Calculus, MCQ jitna",
        "Limits, continuity, differentiability. Maxima-minima first derivative se. Mean value theorem ka statement. Definite integration ke simple sawal. Lamba technique nahi.",
      ),
      slot(
        "2026-10-25-b1",
        "09:20",
        "09:30",
        "buffer",
        "Das minute",
        "Probability ka formula page khali rakho.",
      ),
      slot(
        "2026-10-25-t2",
        "09:30",
        "10:50",
        "theory",
        "Probability aur distributions",
        "Conditional probability, Bayes. Mean, median, mode, standard deviation. Binomial, Poisson, uniform, exponential, normal — sirf mean aur variance ke formula, aur kab kaun si distribution.",
      ),
      slot(
        "2026-10-25-p",
        "10:50",
        "11:40",
        "practice",
        "25 MCQ — calculus aur probability",
        "Bayes ke do poore sawal haath se. Baaki formula identify.",
        { tech: 25 },
      ),
      slot(
        "2026-10-25-rest",
        "11:40",
        "14:00",
        "buffer",
        "Khana aur aaram",
        "Hafte ka aakhri test 2 baje. Formula sheet saath rakhni hai, kholni nahi.",
      ),
      slot(
        "2026-10-25-m",
        "14:00",
        "15:00",
        "mock",
        "Sectional: 50 sawal, 60 minute",
        "Networks + TOC + Compiler + Maths. −1 maan kar. Subnet aur Bayes aayein to pehle wahi, kyunki wahan number hai.",
        { tech: 50 },
      ),
      slot(
        "2026-10-25-v1",
        "15:00",
        "15:50",
        "review",
        "Analysis",
        "Kaun se topic 50% se neeche hain. Wahi 26–29 Oct ki revision mein pehle aayenge.",
      ),
      slot(
        "2026-10-25-r",
        "15:50",
        "16:35",
        "reasoning",
        "Non-verbal sectional",
        "25 sawal, mix figure. Timer 25 minute.",
        { reasoning: 25 },
      ),
      slot(
        "2026-10-25-g",
        "16:35",
        "17:20",
        "ga",
        "Static 20",
        "Polity aur itihaas se zyada, kyunki wahan dohraane layak cheez hai.",
        { ga: 20 },
      ),
      slot(
        "2026-10-25-v2",
        "17:20",
        "17:50",
        "review",
        "Distribution sheet band",
        "Mean/variance ki chhoti table. Kal se naya chapter nahi. Sirf revision.",
      ),
    ],
  },
  {
    iso: "2026-10-26",
    dateLabel: "26 Oct",
    weekday: "सोमवार",
    week: 4,
    title: "Revision: Logic, COA, DS",
    numerical: false,
    outcome: "Naya topic nahi. 60 mix MCQ aur hafta 1 ki galtiyan.",
    note: "Aaj se koi naya chapter nahi. Notes sirf formula sheet jitne khulenge.",
    slots: office("2026-10-26", {
      theory: {
        title: "Formula sheet: DL, COA, DS",
        kind: "review",
        detail:
          "K-map rules, flip-flop equations, speedup, cache, complexities of list/stack/tree. Padhna nahi, yaad se likhna. Jo na aaye sirf wahi line notes mein dekho.",
      },
      practice: {
        title: "30 MCQ mix",
        detail: "Digital Logic, COA, DS. Timer rakho, 30 sawal 50 minute mein, baaki review.",
        tech: 30,
      },
      ga: {
        title: "Static rapid",
        detail: "Purani sheets se 15 sawal. Naya fact tabhi jab purana galat hua ho.",
        ga: 15,
      },
      evening: {
        title: "Hafta 1 ke galat + 30 naye",
        detail:
          "Error copy ke Digital Logic/COA/DS sawal pehle. Phir 30 fresh MCQ. Jo doosri baar bhi galat ho, us par 10 minute concept, usse zyada nahi.",
        tech: 30,
        kind: "practice",
      },
      reasoning: {
        title: "Mix 25",
        detail: "Analogy, coding, series, syllogism. Sectional jaisa, 25 minute try karo.",
        reasoning: 25,
      },
      review: {
        title: "Kal ke numerical mark karo",
        detail: "OS scheduling aur page replacement kal hain. Formula sheet par unke naam likh do. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-27",
    dateLabel: "27 Oct",
    weekday: "मंगलवार",
    week: 4,
    title: "Revision: Algorithms aur OS",
    numerical: true,
    outcome: "Scheduling aur page replacement dubara, 60 MCQ.",
    slots: office("2026-10-27", {
      theory: {
        title: "Sort aur schedule, yaad se",
        kind: "review",
        detail:
          "8 sorts ki complexity. FCFS, SJF, SRTF, RR ke rules. FIFO, LRU, Optimal ka farq. Likh kar dekho.",
      },
      practice: {
        title: "Numerical + 20 MCQ",
        detail:
          "4 scheduling Gantt aur 3 page-replacement. Phir 20 MCQ algorithms se. Kul milakar 30 sawal ke barabar kaam.",
        tech: 30,
      },
      ga: {
        title: "Static rapid",
        detail: "Geo aur culture ki purani list, 15 sawal.",
        ga: 15,
      },
      evening: {
        title: "Hafta 2 ki galtiyan + 30 MCQ",
        detail: "Algo aur OS ke marked wrong pehle. Phir 30 fresh. DP table wala ek sawal zaroor ho.",
        tech: 30,
        kind: "practice",
      },
      reasoning: {
        title: "Mix 25",
        detail: "Blood, direction, inequality, seating ka ek chhota set.",
        reasoning: 25,
      },
      review: {
        title: "SQL aur subnet kal",
        detail: "Error copy se un dono ke galat alag kar do. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-28",
    dateLabel: "28 Oct",
    weekday: "बुधवार",
    week: 4,
    title: "Revision: DBMS aur Networks",
    numerical: true,
    outcome: "SQL output aur subnetting dubara, 60 MCQ.",
    slots: office("2026-10-28", {
      theory: {
        title: "Forms aur clause order",
        kind: "review",
        detail:
          "1NF se BCNF ek-ek line. SELECT ka clause order. TCP vs UDP ki chhe lines. Subnet ke steps.",
      },
      practice: {
        title: "8 SQL + 8 subnet",
        detail: "Timed. SQL 25 minute, subnet 25 minute, review 25 minute. Inhe 25 sawal gino.",
        tech: 25,
      },
      ga: {
        title: "Current, 15",
        detail: "Apni 10 headings mein se aaj 15 ek-line sawal banao aur khud solve karo.",
        ga: 15,
      },
      evening: {
        title: "35 MCQ, DBMS + CN",
        detail:
          "Normalization, transaction, CRC, routing, application protocols. Hafta 2–3 ki galtiyan beech mein ghol do.",
        tech: 35,
        kind: "practice",
      },
      reasoning: {
        title: "Mix 25",
        detail: "Puzzle ya seating ek, baaki series aur coding.",
        reasoning: 25,
      },
      review: {
        title: "Jo form ab bhi uljha hai",
        detail: "Sirf ek normal form. Example ke saath. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-29",
    dateLabel: "29 Oct",
    weekday: "गुरुवार",
    week: 4,
    title: "Revision: TOC, Compiler, Maths",
    numerical: true,
    outcome: "Antim theory revision. 50 MCQ. Formula sheet do page par band.",
    slots: office("2026-10-29", {
      theory: {
        title: "Teen sheets, yaad se",
        kind: "review",
        detail:
          "Language classes ka ek example each. FIRST/FOLLOW ke steps. Bayes, mean/variance, relation properties, 2×2 eigen. Teesra page shuru mat karo.",
      },
      practice: {
        title: "25 MCQ — TOC aur Compiler",
        detail: "Language identify, phase identify, ek chhota FIRST set.",
        tech: 25,
      },
      ga: {
        title: "Ek page polity + itihaas",
        detail: "15 rapid. Naya fact nahi.",
        ga: 15,
      },
      evening: {
        title: "25 MCQ — Maths",
        detail:
          "Relation, eigen, Bayes, distribution identify. Calculus ke do sawal. Jo formula na yaad aaye use sheet par last line mein likho.",
        tech: 25,
        kind: "practice",
      },
      reasoning: {
        title: "Mix 25",
        detail: "Poora mix, 25 minute. Yeh Paper-I ki rehearsal hai.",
        reasoning: 25,
      },
      review: {
        title: "Do page band",
        detail:
          "Formula sheet ko do page par rok do. Kal subah yahi sheet hai, naya likhna nahi. 23:00 band.",
      },
    }),
  },
  {
    iso: "2026-10-30",
    dateLabel: "30 Oct",
    weekday: "शुक्रवार",
    week: 4,
    title: "Paper-II mock",
    numerical: true,
    outcome: "100 sawal, 120 minute, negative −1. Raat ko sirf topic count.",
    note: "Aaj naya sawal subah ko sirf 10, confidence ke liye. Asli kaam raat ki mock hai. Mock ke baad poora solution mat likho.",
    slots: [
      slot(
        "2026-10-30-t",
        "06:00",
        "07:00",
        "review",
        "Sirf do-page formula sheet",
        "Naya topic nahi, nayi sheet nahi. Ek baar poori sheet. Jo line na samajh aaye use mock ke baad ke liye mark karo, abhi research nahi.",
      ),
      slot(
        "2026-10-30-b1",
        "07:00",
        "07:20",
        "buffer",
        "Nashta",
        "Halka. Mock raat ko hai, subah thakna nahi.",
      ),
      slot(
        "2026-10-30-p",
        "07:20",
        "08:00",
        "practice",
        "10 aasaan MCQ",
        "Wahi topics jo aate hain. Analysis lamba nahi. Yeh confidence hai, syllabus nahi.",
        { tech: 10 },
      ),
      slot(
        "2026-10-30-leave",
        "08:00",
        "10:00",
        "buffer",
        "Taiyaari aur nikalna",
        "Aaj subah chhoti hai. 9:15 tak nikalna waise hi.",
      ),
      slot(
        "2026-10-30-job",
        "10:00",
        "19:00",
        "job",
        "Office",
        "Duty. Mock ka soch kar beech mein notes mat kholo. Shaam ko dimaag chahiye.",
      ),
      slot(
        "2026-10-30-din",
        "19:00",
        "20:00",
        "buffer",
        "Khana, halka",
        "Bhaari khana nahi. 20:00 baje timer.",
      ),
      slot(
        "2026-10-30-m",
        "20:00",
        "22:00",
        "mock",
        "Paper-II: 100 sawal, 120 minute",
        "Sirf CS & IT. Har galat par −1, yaani teen galat ek sahi ko kha jaate hain. Jo 40 second mein na aaye use chhodo. OMR jaisa: ek baar chuna, bas. Section ka order syllabus jaisa mat socho — pehle wahi chapter jo revision mein mazboot tha, taaki attempt jud sake.",
        { tech: 100 },
      ),
      slot(
        "2026-10-30-v",
        "22:00",
        "22:30",
        "review",
        "Sirf topic count",
        "Kitne attempt, kitne galat, kaun se paanch topics. Solution kal dopehar ko, Paper-I ke analysis ke saath. 22:30 ke baad band.",
      ),
    ],
  },
  {
    iso: "2026-10-31",
    dateLabel: "31 Oct",
    weekday: "शनिवार",
    week: 4,
    title: "Paper-I mock aur band",
    numerical: true,
    outcome: "200 sawal ki mock, dono paper ki galtiyan, aur do-page sheet ka antim padhna.",
    dutyNote:
      "Agar shanivar duty hai to Paper-I subah 6:00–8:00, analysis raat ko. Do ghante mock office se pehle hi possible hai. 5:40 utthna.",
    slots: [
      slot(
        "2026-10-31-m",
        "08:00",
        "10:00",
        "mock",
        "Paper-I: 200 sawal, 120 minute",
        "Negative −0.25. Order: pehle 100 technical, phir 50 reasoning, phir 50 GA. Technical fresh dimaag se. 20 second mein na aaye to mark karke aage. GA mein andaza tabhi jab do options tak simat jaaye.",
        { tech: 100, reasoning: 50, ga: 50 },
      ),
      slot(
        "2026-10-31-b1",
        "10:00",
        "10:20",
        "buffer",
        "Break",
        "Score dekho, abhi solution nahi.",
      ),
      slot(
        "2026-10-31-v1",
        "10:20",
        "12:00",
        "review",
        "Dono mock ka analysis",
        "Kal raat ka Paper-II aur aaj ka Paper-I. Topic-wise sahi/galat. 50% se neeche wale topics ki list, zyada se zyada chaar.",
      ),
      slot(
        "2026-10-31-rest",
        "12:00",
        "14:30",
        "buffer",
        "Khana aur aaram",
        "Yeh aakhri aaram hai. Naya chapter is gap mein bhi nahi.",
      ),
      slot(
        "2026-10-31-p",
        "14:30",
        "16:30",
        "review",
        "Sirf kamzor topics ke galat sawal",
        "Accuracy 50% se neeche wale topics. Sahi concept ek line. Naya prashna-bank nahi kholna.",
      ),
      slot(
        "2026-10-31-r",
        "16:30",
        "17:15",
        "reasoning",
        "Jo mock mein galat hue",
        "25 sawal unhi types ke. Naya type shuru nahi karna.",
        { reasoning: 25 },
      ),
      slot(
        "2026-10-31-g",
        "17:15",
        "18:00",
        "ga",
        "Rapid 20",
        "Polity aur current headings. Jo fact mock mein galat hua wahi pehle.",
        { ga: 20 },
      ),
      slot(
        "2026-10-31-v2",
        "18:00",
        "18:40",
        "review",
        "Do page aur ek blacklist",
        "Formula sheet ek baar. Alag se das cheezein jinhe dobara galat nahi karna. Iske baad yeh crash cycle band hai.",
      ),
    ],
    dutySlots: [
      slot(
        "2026-10-31-duty-m",
        "06:00",
        "08:00",
        "mock",
        "Paper-I: 200 sawal, 120 minute",
        "Office se pehle. −0.25. Pehle 100 technical, phir reasoning, phir GA. 5:40 tak uthna, 8:00 par pen band.",
        { tech: 100, reasoning: 50, ga: 50 },
      ),
      slot(
        "2026-10-31-duty-v0",
        "08:00",
        "08:40",
        "review",
        "Sirf attempt aur topic tag",
        "Score aur paanch kamzor topics. Solution nahi. Phir nikalna hai.",
      ),
      slot(
        "2026-10-31-duty-leave",
        "08:40",
        "10:00",
        "buffer",
        "Office ke liye nikalna",
        "9:15 deadline waise hi. Mock ka soch kar late mat hona.",
      ),
      slot(
        "2026-10-31-duty-job",
        "10:00",
        "19:00",
        "job",
        "Office",
        "Aakhri duty-day is plan ka. Raat ko analysis.",
      ),
      slot(
        "2026-10-31-duty-din",
        "19:00",
        "20:00",
        "buffer",
        "Khana",
        "Halka. 20:00 se analysis.",
      ),
      slot(
        "2026-10-31-duty-v1",
        "20:00",
        "21:20",
        "review",
        "Paper-I aur Paper-II analysis",
        "Topic-wise galat. Chaar se zyada topics ko 'kamzor' mat banao, warna raat khatam ho jaayegi.",
      ),
      slot(
        "2026-10-31-duty-p",
        "21:20",
        "22:20",
        "review",
        "Unhi topics ke galat sawal",
        "Naya set nahi. Sahi concept ek line.",
      ),
      slot(
        "2026-10-31-duty-v2",
        "22:20",
        "22:50",
        "review",
        "Do-page sheet, aakhri baar",
        "Blacklist das lines. 22:50 ke baad band. Cycle poori.",
      ),
    ],
  },
];

const WEEKDAYS = [
  "रविवार",
  "सोमवार",
  "मंगलवार",
  "बुधवार",
  "गुरुवार",
  "शुक्रवार",
  "शनिवार",
] as const;

function weekdayOf(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return WEEKDAYS[new Date(y, m - 1, d).getDay()];
}

function assertSlots(list: Slot[], label: string) {
  const ids = new Set<string>();
  let prevEnd = -1;
  for (const item of list) {
    if (ids.has(item.id)) {
      throw new Error(`Duplicate slot ${item.id}`);
    }
    ids.add(item.id);
    const start = toMin(item.start);
    const end = toMin(item.end);
    if (end <= start) {
      throw new Error(`Bad range ${item.id}`);
    }
    if (start < prevEnd) {
      throw new Error(`Overlap ${label} ${item.id}`);
    }
    prevEnd = end;
  }
}

function validatePlan() {
  if (days.length !== 24) {
    throw new Error(`Expected 24 days, got ${days.length}`);
  }
  const seen = new Set<string>();
  days.forEach((day, index) => {
    const [y, m, d] = PLAN_START.split("-").map(Number);
    const date = new Date(y, m - 1, d + index);
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    if (day.iso !== iso) {
      throw new Error(`Date gap at ${day.iso}, expected ${iso}`);
    }
    if (day.weekday !== weekdayOf(day.iso)) {
      throw new Error(`Weekday mismatch ${day.iso}`);
    }
    if (seen.has(day.iso)) {
      throw new Error(`Duplicate day ${day.iso}`);
    }
    seen.add(day.iso);
    assertSlots(day.slots, day.iso);
    if (day.dutySlots) {
      assertSlots(day.dutySlots, `${day.iso} duty`);
    }
  });
  const allIds = new Set<string>();
  for (const day of days) {
    for (const item of [...day.slots, ...(day.dutySlots ?? [])]) {
      if (allIds.has(item.id)) {
        throw new Error(`Slot id reused ${item.id}`);
      }
      allIds.add(item.id);
    }
  }
}

function deskBlock(iso: string): Slot[] {
  const copy = deskCopy(iso);
  return [
    {
      id: `${iso}-job-am`,
      start: "10:00",
      end: "13:00",
      kind: "job",
      title: "Office, subah",
      detail: copy.morning,
    },
    {
      id: `${iso}-desk-lunch`,
      start: "13:00",
      end: "13:20",
      kind: "desk",
      title: copy.lunchTitle,
      detail: copy.lunch,
      tech: copy.lunchTech,
    },
    {
      id: `${iso}-job-mid`,
      start: "13:20",
      end: "16:30",
      kind: "job",
      title: "Office, dopahar",
      detail: copy.mid,
    },
    {
      id: `${iso}-desk-tea`,
      start: "16:30",
      end: "16:42",
      kind: "desk",
      title: copy.teaTitle,
      detail: copy.tea,
    },
    {
      id: `${iso}-job-pm`,
      start: "16:42",
      end: "18:50",
      kind: "job",
      title: "Office, shaam",
      detail: copy.pm,
    },
    {
      id: `${iso}-desk-out`,
      start: "18:50",
      end: "19:00",
      kind: "desk",
      title: copy.outTitle,
      detail: copy.out,
    },
  ];
}

function expandOffice(list: Slot[]) {
  const out: Slot[] = [];
  for (const item of list) {
    if (item.kind === "job" && item.start === "10:00" && item.end === "19:00") {
      out.push(...deskBlock(item.id.slice(0, 10)));
    } else {
      out.push(item);
    }
  }
  return out;
}

for (const day of days) {
  day.slots = expandOffice(day.slots);
  if (day.dutySlots) day.dutySlots = expandOffice(day.dutySlots);
}

validatePlan();

export function slotsFor(day: DayPlan, saturdayDuty: boolean) {
  if (saturdayDuty && day.dutySlots) {
    return day.dutySlots;
  }
  return day.slots;
}

export function studySlots(list: Slot[]) {
  return list.filter((item) => item.kind !== "job" && item.kind !== "buffer");
}

export function requiredSlots(list: Slot[]) {
  return studySlots(list).filter((item) => !item.optional);
}

export function tally(list: Slot[]) {
  return list.reduce(
    (sum, item) => ({
      tech: sum.tech + (item.tech ?? 0),
      reasoning: sum.reasoning + (item.reasoning ?? 0),
      ga: sum.ga + (item.ga ?? 0),
    }),
    { tech: 0, reasoning: 0, ga: 0 },
  );
}

export function studyMinutes(list: Slot[]) {
  return studySlots(list).reduce(
    (sum, item) => sum + minutesBetween(item.start, item.end),
    0,
  );
}

export function formatDuration(mins: number) {
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  if (hours === 0) return `${rest} मि`;
  if (rest === 0) return `${hours} घं`;
  return `${hours} घं ${rest} मि`;
}

export function isoFromDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function clampIso(iso: string) {
  if (iso < PLAN_START) return PLAN_START;
  if (iso > PLAN_END) return PLAN_END;
  return iso;
}

export function dayByIso(iso: string) {
  return days.find((day) => day.iso === iso) ?? days[0];
}

export function dayNumber(iso: string) {
  return days.findIndex((day) => day.iso === iso) + 1;
}

export const kindLabel: Record<Kind, string> = {
  theory: "Theory",
  practice: "Practice",
  reasoning: "Reasoning",
  ga: "GA",
  mock: "Mock",
  review: "Error log",
  desk: "Office desk",
  job: "Office",
  buffer: "Break",
};
