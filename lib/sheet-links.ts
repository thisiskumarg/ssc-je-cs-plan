import { studySheets } from "@/lib/study-sheets";

export type SourceLink = {
  title: string;
  href: string;
};

export type PyqSet = {
  id: string;
  title: string;
  href: string;
  do: string;
};

export type PyqPlan = {
  count: number;
  window: string;
  note: string;
  sets: PyqSet[];
};

export type SheetPack = {
  refs: SourceLink[];
  pyq?: PyqPlan;
};

const G = {
  dl: "https://www.geeksforgeeks.org/digital-logic/digital-electronics-logic-design-tutorials/",
  bool: "https://www.geeksforgeeks.org/digital-logic/boolean-algebra/",
  kmap: "https://www.geeksforgeeks.org/digital-logic/introduction-of-k-map-karnaugh-map/",
  ff: "https://www.geeksforgeeks.org/digital-logic/flip-flop-types-their-conversion-and-applications/",
  ieee: "https://www.geeksforgeeks.org/digital-logic/ieee-standard-754-floating-point-numbers/",
  coa: "https://www.geeksforgeeks.org/computer-organization-architecture/computer-organization-and-architecture-tutorials/",
  addr: "https://www.geeksforgeeks.org/computer-organization-architecture/addressing-modes/",
  ctrl: "https://www.geeksforgeeks.org/computer-organization-architecture/introduction-of-control-unit-and-its-design/",
  cache: "https://www.geeksforgeeks.org/computer-organization-architecture/cache-memory-in-computer-organization/",
  hazard: "https://www.geeksforgeeks.org/computer-organization-architecture/pipeline-hazards/",
  c: "https://www.geeksforgeeks.org/c/c-programming-language/",
  ptr: "https://www.geeksforgeeks.org/c/pointers-in-c-and-c-set-1-introduction-arithmetic-and-array/",
  dsa: "https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/",
  stack: "https://www.geeksforgeeks.org/dsa/stack-data-structure/",
  bst: "https://www.geeksforgeeks.org/dsa/binary-search-tree-data-structure/",
  heap: "https://www.geeksforgeeks.org/dsa/binary-heap/",
  graph: "https://www.geeksforgeeks.org/dsa/graph-and-its-representations/",
  sort: "https://www.geeksforgeeks.org/dsa/sorting-algorithms/",
  hash: "https://www.geeksforgeeks.org/dsa/hashing-data-structure/",
  greedy: "https://www.geeksforgeeks.org/dsa/greedy-algorithms/",
  dp: "https://www.geeksforgeeks.org/dsa/dynamic-programming/",
  bfs: "https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/",
  kruskal: "https://www.geeksforgeeks.org/dsa/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/",
  dij: "https://www.geeksforgeeks.org/dsa/dijkstras-shortest-path-algorithm-greedy-algo-7/",
  bf: "https://www.geeksforgeeks.org/dsa/bellman-ford-algorithm-dp-23/",
  os: "https://www.geeksforgeeks.org/operating-systems/operating-systems/",
  sched: "https://www.geeksforgeeks.org/operating-systems/process-schedulers-in-operating-system/",
  sync: "https://www.geeksforgeeks.org/operating-systems/introduction-of-process-synchronization/",
  dead: "https://www.geeksforgeeks.org/operating-systems/introduction-of-deadlock-in-operating-system/",
  banker: "https://www.geeksforgeeks.org/operating-systems/bankers-algorithm-in-operating-system-2/",
  page: "https://www.geeksforgeeks.org/operating-systems/paging-in-operating-system/",
  file: "https://www.geeksforgeeks.org/operating-systems/file-systems-in-operating-system/",
  db: "https://www.geeksforgeeks.org/dbms/dbms/",
  er: "https://www.geeksforgeeks.org/dbms/introduction-of-er-model/",
  nf: "https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/",
  sql: "https://www.geeksforgeeks.org/dbms/sql-tutorial/",
  acid: "https://www.geeksforgeeks.org/dbms/acid-properties-in-dbms/",
  btree: "https://www.geeksforgeeks.org/dbms/introduction-of-b-tree/",
  txn: "https://www.geeksforgeeks.org/dbms/concurrency-control-in-dbms/",
  cn: "https://www.geeksforgeeks.org/computer-networks/computer-network-tutorials/",
  osi: "https://www.geeksforgeeks.org/computer-networks/layers-of-osi-model/",
  tcpip: "https://www.geeksforgeeks.org/computer-networks/tcp-ip-model/",
  crc: "https://www.geeksforgeeks.org/computer-networks/error-detection-in-computer-networks/",
  route: "https://www.geeksforgeeks.org/computer-networks/difference-between-distance-vector-routing-and-link-state-routing/",
  ip: "https://www.geeksforgeeks.org/computer-networks/ip-addressing-introduction-and-classful-addressing/",
  cidr: "https://www.geeksforgeeks.org/computer-networks/classless-inter-domain-routing-cidr/",
  nat: "https://www.geeksforgeeks.org/computer-networks/network-address-translation-nat/",
  tcp: "https://www.geeksforgeeks.org/computer-networks/tcp-congestion-control/",
  udptcp: "https://www.geeksforgeeks.org/computer-networks/differences-between-tcp-and-udp/",
  dns: "https://www.geeksforgeeks.org/computer-networks/domain-name-system-dns-in-application-layer/",
  toc: "https://www.geeksforgeeks.org/theory-of-computation/theory-of-computation-automata-tutorials/",
  fa: "https://www.geeksforgeeks.org/theory-of-computation/introduction-of-finite-automata/",
  pump: "https://www.geeksforgeeks.org/theory-of-computation/pumping-lemma-in-theory-of-computation/",
  tm: "https://www.geeksforgeeks.org/theory-of-computation/turing-machine-in-toc/",
  cd: "https://www.geeksforgeeks.org/compiler-design/compiler-design-tutorials/",
  parse: "https://www.geeksforgeeks.org/compiler-design/introduction-to-syntax-analysis-in-compiler-design/",
  first: "https://www.geeksforgeeks.org/compiler-design/first-set-in-syntax-analysis/",
  follow: "https://www.geeksforgeeks.org/compiler-design/follow-set-in-syntax-analysis/",
  math: "https://www.geeksforgeeks.org/engineering-mathematics/engineering-mathematics-tutorials/",
  disc: "https://www.geeksforgeeks.org/engineering-mathematics/discrete-mathematics-tutorial/",
  sets: "https://www.geeksforgeeks.org/engineering-mathematics/set-theory/",
  group: "https://www.geeksforgeeks.org/engineering-mathematics/group-theory/",
  eigen: "https://www.geeksforgeeks.org/engineering-mathematics/eigen-values-and-eigen-vectors/",
  calc: "https://www.geeksforgeeks.org/engineering-mathematics/calculus/",
  mvt: "https://www.geeksforgeeks.org/engineering-mathematics/lagranges-mean-value-theorem/",
  prob: "https://www.geeksforgeeks.org/engineering-mathematics/probability/",
  binom: "https://www.geeksforgeeks.org/engineering-mathematics/binomial-distribution/",
  bayes: "https://www.geeksforgeeks.org/engineering-mathematics/bayes-theorem/",
  reason: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/",
  code: "https://www.geeksforgeeks.org/aptitude/coding-decoding/",
  qDl: "https://www.geeksforgeeks.org/quizzes/gate-cs-digital-logic-pyq/",
  qCoa: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-organization-pyq/",
  qDs: "https://www.geeksforgeeks.org/quizzes/gate-cs-data-structures-pyq/",
  qProg: "https://www.geeksforgeeks.org/quizzes/gate-cs-programming-and-data-structures-pyq/",
  qAlgo: "https://www.geeksforgeeks.org/quizzes/gate-cs-algorithms-pyq/",
  qOs: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/",
  qDb: "https://www.geeksforgeeks.org/quizzes/gate-cs-dbms-pyq/",
  qCn: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/",
  qToc: "https://www.geeksforgeeks.org/quizzes/gate-cs-theory-of-computation-pyq/",
  qCd: "https://www.geeksforgeeks.org/quizzes/gate-cs-compiler-design-pyq/",
  qMath: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/",
  qDisc: "https://www.geeksforgeeks.org/quizzes/gate-cs-discrete-mathematics-pyq/",
  goDl: "https://gateoverflow.in/questions/digital-logic?sort=gate",
  goCoa: "https://gateoverflow.in/questions/co-and-architecture?sort=gate",
  goProg: "https://gateoverflow.in/questions/programming?sort=gate",
  goDs: "https://gateoverflow.in/questions/ds?sort=gate",
  goAlgo: "https://gateoverflow.in/questions/algorithms?sort=gate",
  goOs: "https://gateoverflow.in/questions/operating-system?sort=gate",
  goDb: "https://gateoverflow.in/questions/databases?sort=gate",
  goCn: "https://gateoverflow.in/questions/computer-networks?sort=gate",
  goToc: "https://gateoverflow.in/questions/theory-of-computation?sort=gate",
  goCd: "https://gateoverflow.in/questions/compiler-design?sort=gate",
  goMath: "https://gateoverflow.in/questions/engineering-mathematics?sort=gate",
  imd: "https://sscportal.in/scientific-assistant/papers",
  imdCs1: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-computer-science",
  imdCs2: "https://sscportal.in/scientific-assistant/papers/23-nov-2017-shift-2-computer-science",
  imdCs3: "https://sscportal.in/scientific-assistant/papers/24-nov-2017-shift-2-computer-science",
  imdRe: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning",
  imdGa: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness",
  imd2022: "https://sscstudy.com/ssc-scientific-assistant-previous-year-paper-pdf/",
  hist: "https://en.wikipedia.org/wiki/History_of_India",
  freedom: "https://en.wikipedia.org/wiki/Indian_independence_movement",
  geo: "https://en.wikipedia.org/wiki/Geography_of_India",
  consti: "https://en.wikipedia.org/wiki/Constitution_of_India",
  parl: "https://en.wikipedia.org/wiki/Parliament_of_India",
  eco: "https://en.wikipedia.org/wiki/Economy_of_India",
  schemes: "https://en.wikipedia.org/wiki/List_of_schemes_of_the_government_of_India",
  law: "https://www.legislative.gov.in/constitution-of-india",
  india: "https://www.india.gov.in/my-government/constitution-india",
  pib: "https://www.pib.gov.in/allRel.aspx",
  rbi: "https://www.rbi.org.in/",
};

function refs(...items: SourceLink[]): SourceLink[] {
  return items;
}

function link(title: string, href: string): SourceLink {
  return { title, href };
}

function pyq(count: number, window: string, note: string, sets: PyqSet[]): PyqPlan {
  return { count, window, note, sets };
}

function set(id: string, title: string, href: string, doText: string): PyqSet {
  return { id, title, href, do: doText };
}

export const sheetPacks: Record<string, SheetPack> = {
  "dl-bool": {
    refs: refs(
      link("Boolean algebra", G.bool),
      link("K-map", G.kmap),
      link("Digital Logic notes", G.dl),
    ),
  },
  "dl-cir": {
    refs: refs(
      link("Flip-flop aur conversion", G.ff),
      link("IEEE-754", G.ieee),
      link("Digital Logic notes", G.dl),
    ),
    pyq: pyq(30, "22:25–23:05", "Timer 40 minute. Solution sirf galat sawal par.", [
      set("dl-q", "GATE CS Digital Logic PYQ", G.qDl, "Pehle 30 sawal. K-map, flip-flop, number system teeno se."),
      set("dl-go", "GATE Overflow Digital Logic, saal ke hisaab se", G.goDl, "Jo quiz mein repeat ho use chhodo. 2015 ke baad wale pehle."),
    ]),
  },
  "coa-ins": {
    refs: refs(
      link("Addressing modes", G.addr),
      link("Control unit", G.ctrl),
      link("COA notes", G.coa),
    ),
    pyq: pyq(25, "07:35–08:50", "Sirf mode identify aur control. Pipeline abhi nahi.", [
      set("coa-q1", "GATE CS COA PYQ", G.qCoa, "25 sawal jinme addressing mode ya instruction cycle ho."),
      set("coa-go", "GATE Overflow COA", G.goCoa, "Addressing mode tag ke sawal, pipeline wale shaam ko."),
    ]),
  },
  "coa-pipe": {
    refs: refs(
      link("Pipeline hazards", G.hazard),
      link("Cache", G.cache),
      link("COA notes", G.coa),
    ),
    pyq: pyq(15, "20:25–21:40", "Aakhri 30 minute sirf yeh 15. Subah wale mode dobara mat karo.", [
      set("coa-q2", "GATE CS COA PYQ, pipeline aur cache", G.qCoa, "15 sawal: speedup, hazard, AMAT, mapping."),
      set("coa-go2", "GATE Overflow COA", G.goCoa, "2015 Set 2 pipeline aur cache numerical."),
    ]),
  },
  "ga-hist": {
    refs: refs(
      link("History of India", G.hist),
      link("Freedom movement", G.freedom),
      link("IMD 2017 General Awareness paper", G.imdGa),
    ),
    pyq: pyq(10, "20:00–20:25", "Das sawal, kahani nahi.", [
      set("ga-h", "IMD 22 Nov 2017 GA", G.imdGa, "History aur neighbour wale 10 sawal. Baaki subject chhodo."),
    ]),
  },
  "re-code": {
    refs: refs(
      link("Coding-decoding", G.code),
      link("Logical reasoning notes", G.reason),
      link("IMD 2017 Reasoning paper", G.imdRe),
    ),
    pyq: pyq(20, "21:50–22:35", "20 second mein pattern na aaye to aage.", [
      set("re-c", "IMD 22 Nov 2017 Reasoning", G.imdRe, "Coding aur analogy ke 20 sawal."),
      set("re-c2", "Coding-decoding practice", G.code, "Page ke practice set se jitne 45 minute mein hon."),
    ]),
  },
  "c-out": {
    refs: refs(
      link("C language", G.c),
      link("Pointers", G.ptr),
      link("Programming PYQ list", G.goProg),
    ),
    pyq: pyq(25, "Shanivar 09:30–11:00, duty par 07:35–08:50", "Output dry-run. Theory dobara mat padho.", [
      set("c-q", "GATE CS Programming and DS PYQ", G.qProg, "25 C output sawal: pointer, array, recursion."),
      set("c-go", "GATE Overflow Programming", G.goProg, "Output-based C, storage class chhodo agar time kam ho."),
    ]),
  },
  "ds-lin": {
    refs: refs(
      link("Stack", G.stack),
      link("DSA notes", G.dsa),
    ),
    pyq: pyq(35, "Shanivar 17:00–18:40, duty par 20:25–21:40", "Complexity table ke saath milao.", [
      set("ds-q", "GATE CS Data Structures PYQ", G.qDs, "Array, stack, queue, list ke 35 sawal."),
      set("ds-go", "GATE Overflow DS", G.goDs, "Tree wale kal. Aaj linear structures."),
    ]),
  },
  "re-dir": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD 2017 Reasoning", G.imdRe)),
    pyq: pyq(20, "Shanivar 11:30–12:10, duty par 21:50–22:35", "Direction ka sketch, ranking formula.", [
      set("re-d", "IMD Reasoning paper", G.imdRe, "Direction aur ranking ke 20. Similarities ke 5 agar bachain."),
    ]),
  },
  "ga-map": {
    refs: refs(link("Geography of India", G.geo), link("IMD 2017 GA", G.imdGa)),
    pyq: pyq(10, "Shanivar 16:30–17:00, duty par 20:00–20:25", "Nadi, ghat, monsoon. Das facts.", [
      set("ga-m", "IMD 2017 GA", G.imdGa, "Geography aur culture ke 10 sawal."),
    ]),
  },
  "ds-tree": {
    refs: refs(link("BST", G.bst), link("Binary heap", G.heap), link("Graph representation", G.graph)),
    pyq: pyq(30, "10:20–12:00", "Test se pehle yeh 30. Analysis baad mein.", [
      set("tr-q", "GATE CS DS PYQ", G.qDs, "Tree, BST, heap, graph ke 30."),
      set("tr-go", "GATE Overflow DS", G.goDs, "Heap index aur BST inorder wale pehle."),
    ]),
  },
  "w1-test": {
    refs: refs(link("IMD CS 22 Nov 2017", G.imdCs1), link("Digital Logic PYQ", G.qDl), link("COA PYQ", G.qCoa)),
    pyq: pyq(40, "14:00–14:40", "40 sawal, 40 minute. Phone alag kamre mein.", [
      set("w1", "IMD 22 Nov 2017 Computer Science", G.imdCs1, "DL, COA, DS wale 40. Jo topic is hafte na aaya use chhodo."),
    ]),
  },
  "re-nv": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "15:40–16:25", "Figure: rotation aur mirror alag.", [
      set("re-nv", "IMD Reasoning paper", G.imdRe, "Non-verbal aur classification ke 20."),
    ]),
  },
  "ga-w1": {
    refs: refs(link("History", G.hist), link("Geography", G.geo), link("IMD GA", G.imdGa)),
    pyq: pyq(15, "16:25–17:10", "Is hafte ke galat facts.", [
      set("ga-w1", "IMD 2017 GA", G.imdGa, "15 static. Naya current nahi."),
    ]),
  },
  "al-sort": {
    refs: refs(link("Sorting", G.sort), link("DSA notes", G.dsa)),
    pyq: pyq(25, "07:35–08:50", "Worst case, stable, extra space.", [
      set("so-q", "GATE CS Algorithms PYQ", G.qAlgo, "Searching aur sorting ke 25."),
      set("so-go", "GATE Overflow Algorithms", G.goAlgo, "Asymptotic notation wale 5 alag se."),
    ]),
  },
  "al-hash": {
    refs: refs(link("Hashing", G.hash)),
    pyq: pyq(15, "20:25–21:40", "alpha = n/m wale numerical.", [
      set("ha-q", "GATE CS Algorithms PYQ", G.qAlgo, "Hashing ke 15."),
    ]),
  },
  "ga-eco": {
    refs: refs(link("Economy of India", G.eco), link("RBI", G.rbi), link("IMD GA", G.imdGa)),
    pyq: pyq(10, "20:00–20:25", "GDP, repo, deficit. Das sawal.", [
      set("ga-e", "IMD 2017 GA", G.imdGa, "Economy wale sawal. RBI page se is hafte ka ek rate fact."),
    ]),
  },
  "re-syl": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "21:50–22:35", "Venn pehle, words baad mein.", [
      set("re-s", "IMD Reasoning", G.imdRe, "Syllogism ke 20."),
    ]),
  },
  "al-gr": {
    refs: refs(link("Greedy", G.greedy)),
    pyq: pyq(20, "07:35–08:50", "Fractional vs 0/1 farq.", [
      set("gr-q", "GATE CS Algorithms PYQ", G.qAlgo, "Greedy ke 20."),
    ]),
  },
  "al-dp": {
    refs: refs(link("Dynamic programming", G.dp), link("DSA notes", G.dsa)),
    pyq: pyq(20, "20:25–21:40", "Ek DP table khud, phir 20 sawal.", [
      set("dp-q", "GATE CS Algorithms PYQ", G.qAlgo, "DP aur Master theorem ke 20."),
      set("dp-go", "GATE Overflow Algorithms", G.goAlgo, "Divide-and-conquer recurrence."),
    ]),
  },
  "ga-day": {
    refs: refs(link("Constitution of India", G.consti), link("Constitution text", G.law), link("IMD GA", G.imdGa)),
    pyq: pyq(10, "20:00–20:25", "Polity heads aur rozmarra science.", [
      set("ga-d", "IMD 2017 GA", G.imdGa, "Polity aur science ke 10."),
    ]),
  },
  "re-blood": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "21:50–22:35", "Generation ki row.", [
      set("re-b", "IMD Reasoning", G.imdRe, "Blood relation aur problem-solving ke 20."),
    ]),
  },
  "al-bfs": {
    refs: refs(link("BFS", G.bfs), link("Graph", G.graph)),
    pyq: pyq(20, "07:35–08:50", "Queue vs stack.", [
      set("bfs-q", "GATE CS Algorithms PYQ", G.qAlgo, "BFS aur DFS ke 20."),
    ]),
  },
  "al-mst": {
    refs: refs(link("Kruskal", G.kruskal), link("Dijkstra", G.dij), link("Bellman-Ford", G.bf)),
    pyq: pyq(20, "20:25–21:40", "Negative edge par Dijkstra mat.", [
      set("mst-q", "GATE CS Algorithms PYQ", G.qAlgo, "MST aur shortest path ke 20."),
      set("mst-go", "GATE Overflow Algorithms", G.goAlgo, "Topological sort wale 5."),
    ]),
  },
  "ga-cur": {
    refs: refs(link("PIB releases", G.pib), link("India.gov constitution desk", G.india)),
    pyq: pyq(8, "20:00–20:25", "Aath heading, detail nahi.", [
      set("ga-c", "PIB all releases", G.pib, "Is mahine ki 8 headings likho, phir IMD GA se science-research wale 5."),
      set("ga-c2", "IMD 2017 GA", G.imdGa, "Scientific research type ke 5 purane sawal."),
    ]),
  },
  "re-seat": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(15, "21:50–22:35", "Do case, teesra nahi.", [
      set("re-se", "IMD Reasoning", G.imdRe, "Seating aur analysis ke 15."),
    ]),
  },
  "os-proc": {
    refs: refs(link("Process schedulers", G.sched), link("Process synchronization", G.sync), link("OS notes", G.os)),
    pyq: pyq(20, "07:35–08:50", "PCB, fork, thread.", [
      set("osp-q", "GATE CS OS PYQ", G.qOs, "Process, thread, system call ke 20."),
      set("osp-go", "GATE Overflow OS", G.goOs, "IPC wale 5."),
    ]),
  },
  "os-dead": {
    refs: refs(link("Deadlock", G.dead), link("Banker's algorithm", G.banker), link("Synchronization", G.sync)),
    pyq: pyq(15, "20:25–21:40", "Need = Max − Allocation.", [
      set("osd-q", "GATE CS OS PYQ", G.qOs, "Semaphore aur deadlock ke 15."),
    ]),
  },
  "ga-parl": {
    refs: refs(link("Parliament of India", G.parl), link("Constitution", G.consti), link("Constitution text", G.law)),
    pyq: pyq(10, "20:00–20:25", "352, 356, 32, 226.", [
      set("ga-p", "IMD 2017 GA", G.imdGa, "Polity aur neighbour ke 10."),
    ]),
  },
  "re-ineq": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "21:50–22:35", "Definite relation hi chuno.", [
      set("re-i", "IMD Reasoning", G.imdRe, "Inequality aur judgment ke 20."),
    ]),
  },
  "os-mem": {
    refs: refs(link("Paging", G.page), link("File systems", G.file), link("OS notes", G.os)),
    pyq: pyq(15, "07:35–08:50", "Offset = log2(page size).", [
      set("osm-q", "GATE CS OS PYQ", G.qOs, "Paging aur virtual memory ke 15."),
    ]),
  },
  "os-gantt": {
    refs: refs(link("CPU schedulers", G.sched), link("Paging", G.page)),
    pyq: pyq(15, "20:25–21:40", "Ek Gantt aur ek page string khud.", [
      set("osg-q", "GATE CS OS PYQ", G.qOs, "Scheduling numerical aur page replacement ke 15."),
      set("osg-go", "GATE Overflow OS", G.goOs, "Belady wala sawal dhoondh kar ek baar."),
    ]),
  },
  "ga-1857": {
    refs: refs(link("Freedom movement", G.freedom), link("PIB", G.pib), link("IMD GA", G.imdGa)),
    pyq: pyq(10, "20:00–20:25", "Saal pehle, current baad mein.", [
      set("ga-1857", "IMD 2017 GA", G.imdGa, "Modern India ke 10. PIB se 5 heading alag se."),
    ]),
  },
  "re-puz": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(15, "21:50–22:35", "Do chhote puzzle, 8 minute each.", [
      set("re-pz", "IMD Reasoning", G.imdRe, "Puzzle aur decision-making ke 15."),
    ]),
  },
  "db-er": {
    refs: refs(link("ER model", G.er), link("DBMS notes", G.db)),
    pyq: pyq(20, "Shanivar 09:30–11:00, duty par 07:35–08:50", "sigma row, pi column.", [
      set("er-q", "GATE CS DBMS PYQ", G.qDb, "ER, keys, algebra ke 20."),
      set("er-go", "GATE Overflow Databases", G.goDb, "Tuple calculus wale 5."),
    ]),
  },
  "db-sql": {
    refs: refs(link("SQL", G.sql)),
    pyq: pyq(30, "Shanivar 17:00–18:40, duty par 20:25–21:40", "WHERE, phir GROUP BY, phir HAVING.", [
      set("sql-q", "GATE CS DBMS PYQ", G.qDb, "SQL output ke 30."),
    ]),
  },
  "re-clock": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(15, "Shanivar 11:30, duty par 21:50", "Angle = |30H − 5.5M|.", [
      set("re-ck", "IMD Reasoning", G.imdRe, "Clock aur calendar ke 15."),
    ]),
  },
  "ga-cult": {
    refs: refs(link("Geography of India", G.geo), link("IMD GA", G.imdGa)),
    pyq: pyq(10, "Shanivar 16:30, duty par 20:00", "Dance-state pair aur environment.", [
      set("ga-cu", "IMD 2017 GA", G.imdGa, "Culture aur environment ke 10."),
    ]),
  },
  "db-nf": {
    refs: refs(link("Normal forms", G.nf), link("B-tree", G.btree), link("ACID", G.acid), link("Concurrency", G.txn)),
    pyq: pyq(25, "10:20–12:00", "BCNF: left side superkey.", [
      set("nf-q", "GATE CS DBMS PYQ", G.qDb, "Normal form, index, transaction ke 25."),
      set("nf-go", "GATE Overflow Databases", G.goDb, "2PL aur conflict graph."),
    ]),
  },
  "w2-test": {
    refs: refs(link("IMD CS 23 Nov 2017", G.imdCs2), link("Algorithms PYQ", G.qAlgo), link("OS PYQ", G.qOs), link("DBMS PYQ", G.qDb)),
    pyq: pyq(50, "14:00–15:00", "50 sawal, 60 minute. −1 maan kar.", [
      set("w2", "IMD 23 Nov 2017 Computer Science", G.imdCs2, "Algo, OS, DBMS. Andaza chhodo."),
    ]),
  },
  "re-fig": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(15, "15:50–16:30", "Ek property teen par, ek par nahi.", [
      set("re-f", "IMD Reasoning", G.imdRe, "Figure classification ke 15."),
    ]),
  },
  "ga-w2": {
    refs: refs(link("Constitution", G.consti), link("Economy", G.eco), link("IMD GA", G.imdGa)),
    pyq: pyq(20, "16:30–17:15", "Is hafte ke articles aur deficits.", [
      set("ga-w2", "IMD 2017 GA", G.imdGa, "20 static."),
    ]),
  },
  "cn-lay": {
    refs: refs(link("OSI layers", G.osi), link("TCP/IP", G.tcpip), link("CN notes", G.cn)),
    pyq: pyq(15, "07:35–08:50", "L/R aur d/v alag.", [
      set("cn1-q", "GATE CS Networks PYQ", G.qCn, "Layer aur delay ke 15."),
      set("cn1-go", "GATE Overflow Networks", G.goCn, "Switching wale 5."),
    ]),
  },
  "cn-crc": {
    refs: refs(link("Error detection", G.crc), link("CN notes", G.cn)),
    pyq: pyq(15, "20:25–21:40", "CRC ke chaar step ek sawal par khud.", [
      set("crc-q", "GATE CS Networks PYQ", G.qCn, "Framing, CRC, Hamming, Ethernet ke 15."),
    ]),
  },
  "ga-place": {
    refs: refs(link("Geography of India", G.geo), link("IMD GA", G.imdGa)),
    pyq: pyq(10, "20:00–20:25", "State ke saath pair.", [
      set("ga-pl", "IMD 2017 GA", G.imdGa, "Places aur rivers ke 10."),
    ]),
  },
  "re-ana": {
    refs: refs(link("Coding-decoding aur analogy style", G.code), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "21:50–22:35", "Relation pehle likho.", [
      set("re-a", "IMD Reasoning", G.imdRe, "Analogy ka naya set, 20 sawal."),
    ]),
  },
  "cn-route": {
    refs: refs(link("Distance vector vs link state", G.route)),
    pyq: pyq(15, "07:35–08:50", "Count-to-infinity kahan aata hai.", [
      set("rt-q", "GATE CS Networks PYQ", G.qCn, "Routing ke 15."),
    ]),
  },
  "cn-sub": {
    refs: refs(link("IPv4 addressing", G.ip), link("CIDR", G.cidr), link("NAT", G.nat)),
    pyq: pyq(20, "20:25–21:40", "Do subnet bina notes, phir quiz.", [
      set("sub-q", "GATE CS Networks PYQ", G.qCn, "IP, CIDR, fragment, ARP, NAT ke 20."),
      set("sub-go", "GATE Overflow Networks", G.goCn, "Fragment offset × 8 wale sawal."),
    ]),
  },
  "ga-yoj": {
    refs: refs(link("Government schemes list", G.schemes), link("PIB", G.pib)),
    pyq: pyq(10, "20:00–20:25", "Naam + ministry + beneficiary.", [
      set("ga-y", "PIB releases", G.pib, "Das scheme headings. Purana GA paper se 5 scheme sawal."),
      set("ga-y2", "IMD 2017 GA", G.imdGa, "Scheme ya ministry wale 5."),
    ]),
  },
  "re-code2": {
    refs: refs(link("Coding-decoding", G.code), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "21:50–22:35", "Purana +1 force mat karo.", [
      set("re-c3", "IMD Reasoning", G.imdRe, "Naye pattern ke 20. Relationship ke 5 alag."),
    ]),
  },
  "cn-tcp": {
    refs: refs(link("TCP congestion", G.tcp), link("TCP vs UDP", G.udptcp)),
    pyq: pyq(20, "07:35–08:50", "Timeout par cwnd = 1.", [
      set("tcp-q", "GATE CS Networks PYQ", G.qCn, "UDP, TCP, congestion, socket ke 20."),
    ]),
  },
  "cn-app": {
    refs: refs(link("DNS", G.dns), link("TCP vs UDP", G.udptcp), link("CN notes", G.cn)),
    pyq: pyq(15, "20:25–21:40", "Port yaad: 53, 80, 25, 21, 443.", [
      set("app-q", "GATE CS Networks PYQ", G.qCn, "DNS, SMTP, HTTP, FTP ke 15."),
      set("app-go", "GATE Overflow Networks", G.goCn, "Application layer tag."),
    ]),
  },
  "ga-sci": {
    refs: refs(link("IMD 2017 GA", G.imdGa), link("PIB", G.pib)),
    pyq: pyq(10, "20:00–20:25", "Unit aur body. Chhota set.", [
      set("ga-sc", "IMD 2017 GA", G.imdGa, "Science GK ke 10."),
    ]),
  },
  "re-stmt": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "21:50–22:35", "Conclusion naya fact na laye.", [
      set("re-st", "IMD Reasoning", G.imdRe, "Statement-conclusion aur arithmetical reasoning ke 20."),
    ]),
  },
  "toc-re": {
    refs: refs(link("Finite automata", G.fa), link("TOC notes", G.toc)),
    pyq: pyq(20, "07:35–08:50", "DFA exactly one move.", [
      set("toc1-q", "GATE CS TOC PYQ", G.qToc, "Regex, DFA, NFA ke 20."),
      set("toc1-go", "GATE Overflow TOC", G.goToc, "Regular pumping wale 5."),
    ]),
  },
  "toc-tm": {
    refs: refs(link("Pumping lemma", G.pump), link("Turing machine", G.tm), link("TOC notes", G.toc)),
    pyq: pyq(15, "20:25–21:40", "Halting undecidable.", [
      set("toc2-q", "GATE CS TOC PYQ", G.qToc, "CFG, PDA, TM, decidability ke 15."),
    ]),
  },
  "ga-body": {
    refs: refs(link("Constitution of India", G.consti), link("Constitution text", G.law), link("India.gov", G.india)),
    pyq: pyq(10, "20:00–20:25", "EC, CAG, UPSC, Finance Commission.", [
      set("ga-bo", "IMD 2017 GA", G.imdGa, "Constitutional bodies ke 10."),
    ]),
  },
  "re-series": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "21:50–22:35", "Pehle difference, phir square.", [
      set("re-se2", "IMD Reasoning", G.imdRe, "Number series aur verbal classification ke 20."),
    ]),
  },
  "cd-lex": {
    refs: refs(link("Syntax analysis", G.parse), link("Compiler notes", G.cd)),
    pyq: pyq(20, "07:35–08:50", "Phase ka order.", [
      set("cd1-q", "GATE CS Compiler PYQ", G.qCd, "Lex, parse, phases ke 20."),
      set("cd1-go", "GATE Overflow Compiler", G.goCd, "SDT wale 5."),
    ]),
  },
  "cd-ff": {
    refs: refs(link("FIRST set", G.first), link("FOLLOW set", G.follow), link("Compiler notes", G.cd)),
    pyq: pyq(15, "20:25–21:40", "Ek grammar khud, phir quiz.", [
      set("cd2-q", "GATE CS Compiler PYQ", G.qCd, "FIRST, FOLLOW, liveness, CSE ke 15."),
    ]),
  },
  "ga-pol2": {
    refs: refs(link("Constitution", G.consti), link("Parliament", G.parl), link("Constitution text", G.law)),
    pyq: pyq(15, "20:00–20:25", "Ek page, naye article nahi.", [
      set("ga-po2", "IMD 2017 GA", G.imdGa, "Polity ke 15, jo pehle galat hue unhe pehle."),
    ]),
  },
  "re-mix1": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "21:50–22:35", "Teen type, 8-8 nahi, 20 kul.", [
      set("re-m1", "IMD Reasoning", G.imdRe, "Direction, blood, figure ke 20."),
    ]),
  },
  "ma-disc": {
    refs: refs(link("Discrete mathematics", G.disc), link("Set theory", G.sets), link("Group theory", G.group)),
    pyq: pyq(25, "Shanivar 09:30, duty par 07:35", "Equivalence vs partial order.", [
      set("di-q", "GATE CS Discrete Mathematics PYQ", G.qDisc, "Logic, sets, groups, counting ke 25."),
      set("di-go", "GATE Overflow Engineering Mathematics", G.goMath, "Graph handshaking aur nCr."),
    ]),
  },
  "ma-la": {
    refs: refs(link("Eigenvalues", G.eigen), link("Engineering mathematics", G.math)),
    pyq: pyq(25, "Shanivar 16:45, duty par 20:25", "det(A−λI)=0.", [
      set("la-q", "GATE CS Engineering Mathematics PYQ", G.qMath, "Matrices, determinant, eigen, LU ke 25."),
    ]),
  },
  "re-puz2": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(15, "Shanivar 11:15, duty par 21:50", "Ek puzzle poora.", [
      set("re-pz2", "IMD Reasoning", G.imdRe, "Puzzle aur series ke 15."),
    ]),
  },
  "ga-eco2": {
    refs: refs(link("Economy of India", G.eco), link("RBI", G.rbi), link("PIB", G.pib)),
    pyq: pyq(10, "Shanivar 16:15, duty par 20:00", "Char definition, teen headings.", [
      set("ga-e2", "IMD 2017 GA", G.imdGa, "Economy ke 10."),
    ]),
  },
  "ma-calc": {
    refs: refs(link("Calculus", G.calc), link("Mean value theorem", G.mvt)),
  },
  "ma-pr": {
    refs: refs(link("Probability", G.prob), link("Binomial", G.binom), link("Bayes", G.bayes)),
    pyq: pyq(25, "10:50–12:20", "Bayes se pehle total probability.", [
      set("pr-q", "GATE CS Engineering Mathematics PYQ", G.qMath, "Calculus aur probability ke 25."),
      set("pr-go", "GATE Overflow Mathematics", G.goMath, "Distribution wale numerical."),
    ]),
  },
  "w3-test": {
    refs: refs(
      link("IMD CS 24 Nov 2017", G.imdCs3),
      link("Networks PYQ", G.qCn),
      link("TOC PYQ", G.qToc),
      link("Compiler PYQ", G.qCd),
      link("Maths PYQ", G.qMath),
    ),
    pyq: pyq(50, "14:00–15:00", "50 sawal, 60 minute.", [
      set("w3", "IMD 24 Nov 2017 Computer Science", G.imdCs3, "CN, TOC, Compiler, Maths. −1 maan kar."),
    ]),
  },
  "re-abs": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(20, "15:50–16:35", "Naya operator matlab, purana arithmetic nahi.", [
      set("re-ab", "IMD Reasoning", G.imdRe, "Non-verbal aur symbol ke 20."),
    ]),
  },
  "ga-w3": {
    refs: refs(link("IMD GA", G.imdGa), link("PIB", G.pib)),
    pyq: pyq(20, "16:35–17:20", "5-5 polity, history, geo, economy.", [
      set("ga-w3", "IMD 2017 GA", G.imdGa, "20 static, galat waale pehle."),
    ]),
  },
  "rv-d1": {
    refs: refs(link("Digital Logic PYQ", G.qDl), link("COA PYQ", G.qCoa), link("DS PYQ", G.qDs), link("IMD CS shift 1", G.imdCs1)),
    pyq: pyq(30, "07:35–08:50 aur 20:25–21:40", "Naya chapter band. Jo star lage wahi.", [
      set("rv1", "GATE DL + COA + DS quizzes", G.qDl, "Subah 30 mix. Raat ko hafte ke galat, phir COA aur DS quiz se 30 naye."),
    ]),
  },
  "ga-rv1": {
    refs: refs(link("IMD GA", G.imdGa), link("History", G.hist)),
    pyq: pyq(15, "20:00–20:25", "Rapid.", [
      set("gar1", "IMD 2017 GA", G.imdGa, "15, pehle galat facts."),
    ]),
  },
  "re-rv1": {
    refs: refs(link("IMD Reasoning", G.imdRe), link("Coding-decoding", G.code)),
    pyq: pyq(25, "21:50–22:35", "Mix.", [
      set("rer1", "IMD Reasoning", G.imdRe, "25 mix, computation wale equation se."),
    ]),
  },
  "rv-d2": {
    refs: refs(link("Algorithms PYQ", G.qAlgo), link("OS PYQ", G.qOs)),
    pyq: pyq(20, "07:35–08:50 aur 20:25–21:40", "Ek Gantt khud, phir quiz.", [
      set("rv2", "GATE Algorithms aur OS PYQ", G.qAlgo, "Subah numerical + 20. Raat ko 30, OS quiz se."),
    ]),
  },
  "ga-rv2": {
    refs: refs(link("Constitution", G.consti), link("IMD GA", G.imdGa)),
    pyq: pyq(15, "20:00–20:25", "Articles.", [
      set("gar2", "IMD 2017 GA", G.imdGa, "15 polity aur pados."),
    ]),
  },
  "re-rv2": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(25, "21:50–22:35", "Verbal aur figure.", [
      set("rer2", "IMD Reasoning", G.imdRe, "25, analogy se figure tak."),
    ]),
  },
  "rv-d3": {
    refs: refs(link("DBMS PYQ", G.qDb), link("Networks PYQ", G.qCn)),
    pyq: pyq(16, "07:35–08:50", "8 SQL + 8 subnet, phir raat ko 35.", [
      set("rv3a", "GATE DBMS PYQ", G.qDb, "8 SQL output."),
      set("rv3b", "GATE Networks PYQ", G.qCn, "8 subnet, raat ko DBMS+CN se 35."),
    ]),
  },
  "ga-rv3": {
    refs: refs(link("PIB", G.pib)),
    pyq: pyq(15, "20:00–20:25", "Headings.", [
      set("gar3", "PIB releases", G.pib, "15 current headings is mahine ki."),
    ]),
  },
  "re-rv3": {
    refs: refs(link("Logical reasoning", G.reason), link("IMD Reasoning", G.imdRe)),
    pyq: pyq(25, "21:50–22:35", "Statement sets.", [
      set("rer3", "IMD Reasoning", G.imdRe, "25 analytical. 40 second se zyada ho to chhodo."),
    ]),
  },
  "rv-d4": {
    refs: refs(link("TOC PYQ", G.qToc), link("Compiler PYQ", G.qCd), link("Maths PYQ", G.qMath)),
    pyq: pyq(25, "07:35–08:50 aur 20:25–21:40", "Subah TOC+Compiler, raat Maths.", [
      set("rv4a", "GATE TOC PYQ", G.qToc, "Compiler quiz ke saath milakar 25."),
      set("rv4b", "GATE Maths PYQ", G.qMath, "Raat ke 25: Bayes, eigen, MVT."),
    ]),
  },
  "ga-rv4": {
    refs: refs(link("History", G.hist), link("Constitution", G.consti), link("IMD GA", G.imdGa)),
    pyq: pyq(20, "20:00–20:25", "Second pass.", [
      set("gar4", "IMD 2017 GA", G.imdGa, "Polity aur itihaas ke 20."),
    ]),
  },
  "re-rv4": {
    refs: refs(link("IMD Reasoning", G.imdRe), link("Logical reasoning", G.reason)),
    pyq: pyq(25, "21:50–22:35", "Har type ek.", [
      set("rer4", "IMD Reasoning", G.imdRe, "25, analogy se analytical tak. Do baar galat type blacklist."),
    ]),
  },
  "hy-read": {
    refs: refs(
      link("Digital Logic PYQ", G.qDl),
      link("COA PYQ", G.qCoa),
      link("OS PYQ", G.qOs),
      link("DBMS PYQ", G.qDb),
      link("Networks PYQ", G.qCn),
      link("Maths PYQ", G.qMath),
    ),
    pyq: pyq(10, "07:20–08:00", "Sirf aasaan 10. Mock ke liye dimaag khali rakho.", [
      set("hy", "Koi ek quiz, sirf confident sawal", G.qDl, "10 aasaan. Atki hui line ko research mat karo."),
    ]),
  },
  "mock-ii": {
    refs: refs(
      link("IMD CS 22 Nov 2017", G.imdCs1),
      link("IMD CS 23 Nov 2017", G.imdCs2),
      link("IMD CS 24 Nov 2017", G.imdCs3),
      link("Saare IMD papers", G.imd),
    ),
    pyq: pyq(100, "20:00–22:00", "100 CS sawal, 120 minute, har galat par −1. Paper-II jaisa.", [
      set("m2", "IMD 2017 Computer Science, ek poora paper", G.imdCs1, "Ek shift ke CS section ko 100 tak GATE quiz se bharo agar paper chhota lage. 22:00 par sirf topic count."),
    ]),
  },
  "mock-i": {
    refs: refs(
      link("IMD 2022 CS & IT paper PDF", G.imd2022),
      link("IMD 2017 Reasoning", G.imdRe),
      link("IMD 2017 GA", G.imdGa),
      link("IMD CS papers", G.imd),
    ),
    pyq: pyq(200, "31 Oct 08:00–10:00, duty par 06:00–08:00", "200 sawal, 120 minute, −0.25. Pehle technical.", [
      set("m1", "IMD 2022 CS & IT paper", G.imd2022, "Poora paper. Order: technical, reasoning, GA."),
    ]),
  },
  "mock-an": {
    refs: refs(link("IMD papers index", G.imd), link("IMD 2022 PDF", G.imd2022)),
    pyq: pyq(0, "Analysis slot", "Naya set nahi. Galat sawal ka concept ek line.", [
      set("man", "Wahi paper jo mock mein khola", G.imd, "Char se zyada kamzor topics mat banao."),
    ]),
  },
  "mock-end": {
    refs: refs(link("IMD Reasoning", G.imdRe), link("IMD GA", G.imdGa), link("High-yield quizzes", G.qDl)),
    pyq: pyq(25, "16:30 reasoning, 17:15 GA", "Sirf galat type.", [
      set("mend", "IMD Reasoning aur GA", G.imdRe, "25 reasoning unhi types ke. GA rapid 20 polity aur current."),
    ]),
  },
};

export function sheetPack(id: string) {
  return sheetPacks[id];
}

export function allPyqSets() {
  return Object.values(sheetPacks).flatMap((pack) => pack.pyq?.sets ?? []);
}

function assertLinks() {
  const ids = new Set<string>();
  for (const sheet of studySheets) {
    const pack = sheetPacks[sheet.id];
    if (!pack) throw new Error(`Missing links for sheet ${sheet.id}`);
    if (pack.refs.length === 0) throw new Error(`No reference for ${sheet.id}`);
    for (const ref of pack.refs) {
      if (!ref.href.startsWith("https://")) throw new Error(`Bad ref ${sheet.id}`);
    }
    for (const item of pack.pyq?.sets ?? []) {
      if (ids.has(item.id)) throw new Error(`Duplicate PYQ id ${item.id}`);
      ids.add(item.id);
      if (!item.href.startsWith("https://")) throw new Error(`Bad PYQ ${item.id}`);
    }
  }
  for (const id of Object.keys(sheetPacks)) {
    if (!studySheets.some((sheet) => sheet.id === id)) {
      throw new Error(`Link pack without sheet ${id}`);
    }
  }
}

assertLinks();
