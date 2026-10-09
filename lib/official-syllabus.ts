import { days } from "@/lib/plan";

export type PaperCode = "I" | "II" | "both";

export type OfficialTopic = {
  id: string;
  paper: PaperCode;
  code: string;
  section: string;
  text: string;
  day: string;
};

function topic(
  id: string,
  paper: PaperCode,
  code: string,
  section: string,
  text: string,
  day: string,
): OfficialTopic {
  return { id, paper, code, section, text, day };
}

/** Official IMD lines, each pinned to a day already inside 8–31 Oct. */
export const officialTopics: OfficialTopic[] = [
  topic("dl-bool", "both", "14.3.4", "Digital Logic", "Boolean algebra", "2026-10-08"),
  topic("dl-comb", "both", "14.3.4", "Digital Logic", "Combinational and sequential circuits", "2026-10-08"),
  topic("dl-min", "both", "14.3.4", "Digital Logic", "Minimization", "2026-10-08"),
  topic("dl-num", "both", "14.3.4", "Digital Logic", "Number representations and computer arithmetic (fixed and floating point)", "2026-10-08"),

  topic("coa-ins", "both", "14.3.4", "Computer Organization and Architecture", "Machine instructions and addressing modes", "2026-10-09"),
  topic("coa-alu", "both", "14.3.4", "Computer Organization and Architecture", "ALU, data-path and control unit", "2026-10-09"),
  topic("coa-pipe", "both", "14.3.4", "Computer Organization and Architecture", "Instruction pipelining, pipeline hazards", "2026-10-09"),
  topic("coa-mem", "both", "14.3.4", "Computer Organization and Architecture", "Memory hierarchy: cache, main memory and secondary storage", "2026-10-09"),
  topic("coa-io", "both", "14.3.4", "Computer Organization and Architecture", "I/O interface (interrupt and DMA mode)", "2026-10-09"),

  topic("ds-c", "both", "14.3.4", "Programming and Data Structures", "Programming in C", "2026-10-10"),
  topic("ds-rec", "both", "14.3.4", "Programming and Data Structures", "Recursion", "2026-10-10"),
  topic("ds-lin", "both", "14.3.4", "Programming and Data Structures", "Arrays, stacks, queues, linked lists", "2026-10-10"),
  topic("ds-tree", "both", "14.3.4", "Programming and Data Structures", "Trees, binary search trees", "2026-10-11"),
  topic("ds-heap", "both", "14.3.4", "Programming and Data Structures", "Binary heaps", "2026-10-11"),
  topic("ds-graph", "both", "14.3.4", "Programming and Data Structures", "Graphs", "2026-10-11"),

  topic("al-ssh", "both", "14.3.4", "Algorithms", "Searching, sorting, hashing", "2026-10-12"),
  topic("al-asy", "both", "14.3.4", "Algorithms", "Asymptotic worst-case time and space complexity", "2026-10-12"),
  topic("al-tech", "both", "14.3.4", "Algorithms", "Algorithm design techniques: greedy, dynamic programming and divide-and-conquer", "2026-10-13"),
  topic("al-gph", "both", "14.3.4", "Algorithms", "Graph traversals, minimum spanning trees, shortest paths", "2026-10-14"),

  topic("os-proc", "both", "14.3.4", "Operating System", "System calls, processes, threads", "2026-10-15"),
  topic("os-ipc", "both", "14.3.4", "Operating System", "Inter-process communication", "2026-10-15"),
  topic("os-sync", "both", "14.3.4", "Operating System", "Concurrency and synchronization", "2026-10-15"),
  topic("os-dead", "both", "14.3.4", "Operating System", "Deadlock", "2026-10-15"),
  topic("os-sch", "both", "14.3.4", "Operating System", "CPU and I/O scheduling", "2026-10-16"),
  topic("os-mem", "both", "14.3.4", "Operating System", "Memory management and virtual memory", "2026-10-16"),
  topic("os-fs", "both", "14.3.4", "Operating System", "File systems", "2026-10-16"),

  topic("db-er", "both", "14.3.4", "Databases", "ER-model", "2026-10-17"),
  topic("db-rel", "both", "14.3.4", "Databases", "Relational model: relational algebra, tuple calculus, SQL", "2026-10-17"),
  topic("db-nf", "both", "14.3.4", "Databases", "Integrity constraints, normal forms", "2026-10-18"),
  topic("db-idx", "both", "14.3.4", "Databases", "File organization, indexing (B and B+ trees)", "2026-10-18"),
  topic("db-tx", "both", "14.3.4", "Databases", "Transactions and concurrency control", "2026-10-18"),

  topic("cn-layer", "both", "14.3.4", "Computer Networks", "Concept of layering: OSI and TCP/IP protocol stacks", "2026-10-19"),
  topic("cn-sw", "both", "14.3.4", "Computer Networks", "Basics of packet, circuit and virtual circuit-switching", "2026-10-19"),
  topic("cn-dll", "both", "14.3.4", "Computer Networks", "Data link layer: framing, error detection, medium access control, Ethernet bridging", "2026-10-19"),
  topic("cn-route", "both", "14.3.4", "Computer Networks", "Routing protocols: shortest path, flooding, distance vector and link state routing", "2026-10-20"),
  topic("cn-ip", "both", "14.3.4", "Computer Networks", "Fragmentation and IP addressing, IPv4, CIDR notation", "2026-10-20"),
  topic("cn-sup", "both", "14.3.4", "Computer Networks", "Basics of IP support protocols (ARP, DHCP, ICMP) and NAT", "2026-10-20"),
  topic("cn-tr", "both", "14.3.4", "Computer Networks", "Transport layer: flow control, congestion control, UDP, TCP, sockets", "2026-10-21"),
  topic("cn-app", "both", "14.3.4", "Computer Networks", "Application layer protocols: DNS, SMTP, HTTP, FTP, Email", "2026-10-21"),

  topic("toc-re", "both", "14.3.4", "Theory of Computation", "Regular expressions and finite automata", "2026-10-22"),
  topic("toc-cfg", "both", "14.3.4", "Theory of Computation", "Context-free grammars and push-down automata", "2026-10-22"),
  topic("toc-pump", "both", "14.3.4", "Theory of Computation", "Regular and context-free languages, pumping lemma", "2026-10-22"),
  topic("toc-tm", "both", "14.3.4", "Theory of Computation", "Turing machines and undecidability", "2026-10-22"),

  topic("cd-lex", "both", "14.3.4", "Compiler Design", "Lexical analysis, parsing, syntax-directed translation", "2026-10-23"),
  topic("cd-rt", "both", "14.3.4", "Compiler Design", "Runtime environments", "2026-10-23"),
  topic("cd-ir", "both", "14.3.4", "Compiler Design", "Intermediate code generation", "2026-10-23"),
  topic("cd-opt", "both", "14.3.4", "Compiler Design", "Local optimization", "2026-10-23"),
  topic("cd-df", "both", "14.3.4", "Compiler Design", "Data flow analysis: constant propagation, liveness analysis, common subexpression elimination", "2026-10-23"),

  topic("ma-logic", "both", "14.3.4", "Engineering Mathematics", "Discrete Mathematics: propositional and first-order logic", "2026-10-24"),
  topic("ma-set", "both", "14.3.4", "Engineering Mathematics", "Sets, relations, functions", "2026-10-24"),
  topic("ma-poset", "both", "14.3.4", "Engineering Mathematics", "Partial orders and lattices", "2026-10-24"),
  topic("ma-grp", "both", "14.3.4", "Engineering Mathematics", "Monoids, groups", "2026-10-24"),
  topic("ma-gph", "both", "14.3.4", "Engineering Mathematics", "Graphs: connectivity, matching, colouring", "2026-10-24"),
  topic("ma-comb", "both", "14.3.4", "Engineering Mathematics", "Combinatorics: counting, recurrence relations, generating functions", "2026-10-24"),
  topic("ma-mat", "both", "14.3.4", "Engineering Mathematics", "Linear algebra: matrices, determinants, systems of linear equations", "2026-10-24"),
  topic("ma-eig", "both", "14.3.4", "Engineering Mathematics", "Eigenvalues and eigenvectors, LU decomposition", "2026-10-24"),
  topic("ma-lim", "both", "14.3.4", "Engineering Mathematics", "Calculus: limits, continuity and differentiability", "2026-10-25"),
  topic("ma-max", "both", "14.3.4", "Engineering Mathematics", "Maxima and minima, mean value theorem, integration", "2026-10-25"),
  topic("ma-rv", "both", "14.3.4", "Engineering Mathematics", "Random variables. Uniform, normal, exponential, Poisson and binomial distributions", "2026-10-25"),
  topic("ma-stat", "both", "14.3.4", "Engineering Mathematics", "Mean, median, mode and standard deviation", "2026-10-25"),
  topic("ma-bayes", "both", "14.3.4", "Engineering Mathematics", "Conditional probability and Bayes' theorem", "2026-10-25"),

  topic("re-ana", "I", "14.2.1", "General Intelligence & Reasoning", "Analogies", "2026-10-09"),
  topic("re-sim", "I", "14.2.1", "General Intelligence & Reasoning", "Similarities", "2026-10-10"),
  topic("re-diff", "I", "14.2.1", "General Intelligence & Reasoning", "Differences", "2026-10-11"),
  topic("re-space", "I", "14.2.1", "General Intelligence & Reasoning", "Space visualization", "2026-10-12"),
  topic("re-prob", "I", "14.2.1", "General Intelligence & Reasoning", "Problem-solving", "2026-10-13"),
  topic("re-anly", "I", "14.2.1", "General Intelligence & Reasoning", "Analysis", "2026-10-14"),
  topic("re-judg", "I", "14.2.1", "General Intelligence & Reasoning", "Judgment", "2026-10-15"),
  topic("re-dec", "I", "14.2.1", "General Intelligence & Reasoning", "Decision-making", "2026-10-16"),
  topic("re-vmem", "I", "14.2.1", "General Intelligence & Reasoning", "Visual memory", "2026-10-17"),
  topic("re-disc", "I", "14.2.1", "General Intelligence & Reasoning", "Discrimination", "2026-10-18"),
  topic("re-obs", "I", "14.2.1", "General Intelligence & Reasoning", "Observation", "2026-10-19"),
  topic("re-rel", "I", "14.2.1", "General Intelligence & Reasoning", "Relationship concepts", "2026-10-20"),
  topic("re-arith", "I", "14.2.1", "General Intelligence & Reasoning", "Arithmetical reasoning", "2026-10-21"),
  topic("re-vclass", "I", "14.2.1", "General Intelligence & Reasoning", "Verbal classification", "2026-10-22"),
  topic("re-fclass", "I", "14.2.1", "General Intelligence & Reasoning", "Figure classification", "2026-10-23"),
  topic("re-series", "I", "14.2.1", "General Intelligence & Reasoning", "Arithmetical number series", "2026-10-24"),
  topic("re-abs", "I", "14.2.1", "General Intelligence & Reasoning", "Abstract ideas and symbols and their relationships", "2026-10-25"),
  topic("re-comp", "I", "14.2.1", "General Intelligence & Reasoning", "Arithmetical computations", "2026-10-26"),
  topic("re-verb", "I", "14.2.1", "General Intelligence & Reasoning", "Verbal and non-verbal questions", "2026-10-27"),
  topic("re-func", "I", "14.2.1", "General Intelligence & Reasoning", "Analytical functions", "2026-10-28"),

  topic("ga-hist", "I", "14.2.2", "General Awareness", "History, India and its neighboring countries", "2026-10-09"),
  topic("ga-cul", "I", "14.2.2", "General Awareness", "Culture", "2026-10-10"),
  topic("ga-geo", "I", "14.2.2", "General Awareness", "Geography", "2026-10-11"),
  topic("ga-eco", "I", "14.2.2", "General Awareness", "Economic scene", "2026-10-12"),
  topic("ga-pol", "I", "14.2.2", "General Awareness", "General polity", "2026-10-13"),
  topic("ga-sci", "I", "14.2.2", "General Awareness", "Scientific research", "2026-10-14"),
  topic("ga-nbr", "I", "14.2.2", "General Awareness", "India and its neighboring countries", "2026-10-15"),
  topic("ga-cur", "I", "14.2.2", "General Awareness", "Current events", "2026-10-16"),
  topic("ga-env", "I", "14.2.2", "General Awareness", "Environment around you and its application to society", "2026-10-17"),
  topic("ga-day", "I", "14.2.2", "General Awareness", "Everyday observation in its scientific aspect", "2026-10-18"),

  topic("rv-dl", "both", "14.3.4", "Revision", "Second pass: Digital Logic, Computer Organization, Programming and Data Structures", "2026-10-26"),
  topic("rv-os", "both", "14.3.4", "Revision", "Second pass: Algorithms and Operating System", "2026-10-27"),
  topic("rv-db", "both", "14.3.4", "Revision", "Second pass: Databases and Computer Networks", "2026-10-28"),
  topic("rv-ma", "both", "14.3.4", "Revision", "Second pass: Theory of Computation, Compiler Design, Engineering Mathematics", "2026-10-29"),
  topic("rv-re", "I", "14.2.1", "Revision", "Second pass: reasoning — analogy through analytical functions", "2026-10-29"),
  topic("rv-ga", "I", "14.2.2", "Revision", "Second pass: history, culture, geography, economy, polity, science, current events", "2026-10-29"),
  topic("mk-ii", "both", "14.3.4", "Mock", "Paper-II mock: every Part-D topic, 100 questions, −1", "2026-10-30"),
  topic("mk-i", "I", "14.2", "Mock", "Paper-I mock: reasoning, general awareness, and Part-D, 200 questions, −0.25", "2026-10-31"),
];

const knownDays = new Set(days.map((day) => day.iso));
const unknown = officialTopics.filter((item) => !knownDays.has(item.day));
if (unknown.length > 0) {
  throw new Error(`Syllabus day missing from the plan: ${unknown.map((item) => item.id).join(", ")}`);
}

const ids = new Set<string>();
for (const item of officialTopics) {
  if (ids.has(item.id)) throw new Error(`Duplicate syllabus id ${item.id}`);
  ids.add(item.id);
}

export const syllabusSectionOrder = [
  "Digital Logic",
  "Computer Organization and Architecture",
  "Programming and Data Structures",
  "Algorithms",
  "Operating System",
  "Databases",
  "Computer Networks",
  "Theory of Computation",
  "Compiler Design",
  "Engineering Mathematics",
  "General Intelligence & Reasoning",
  "General Awareness",
  "Revision",
  "Mock",
];

export function topicsOnDay(iso: string) {
  return officialTopics.filter((item) => item.day === iso);
}

export function paperLabel(paper: PaperCode) {
  if (paper === "both") return "Paper-I + II";
  return `Paper-${paper}`;
}
