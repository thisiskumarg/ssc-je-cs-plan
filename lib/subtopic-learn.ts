import { officialTopics } from "@/lib/official-syllabus";

export type SubtopicVideo = { yt: string; title: string; who: string };
export type SubtopicRead = { title: string; href: string };
export type SubtopicPyq = { count: number; href: string; title: string; do: string };
export type SubtopicPack = {
  window: string;
  how: string;
  listen: SubtopicVideo[];
  read: SubtopicRead[];
  pyq: SubtopicPyq;
};

/** One official line, done inside a clock window that already exists on that day. */
export const subtopicPacks: Record<string, SubtopicPack> = {
  "dl-bool": {
    window: "20:00–20:45",
    how: "Video 15 min, page ke laws, aakhri 15 min ke 8 PYQ. Yeh 8 Oct ki raat wali theory ka pehla hissa hai.",
    listen: [
      { yt: "WW-NPtIzHwk", title: "Boolean algebra part 1", who: "Neso Academy" },
    ],
    read: [
      { title: "Boolean algebra", href: "https://www.geeksforgeeks.org/digital-logic/boolean-algebra/" },
      { title: "K-map", href: "https://www.geeksforgeeks.org/digital-logic/introduction-of-k-map-karnaugh-map/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-digital-logic-pyq/", title: "GATE Digital Logic PYQ", do: "Boolean laws aur De Morgan ke 8. K-map abhi nahi." },
  },
  "dl-comb": {
    window: "21:25–22:05",
    how: "Adder ya JK, jo pehle khule, 15 min. Phir 8 PYQ.",
    listen: [
      { yt: "RK3P9L2ZXk4", title: "Full adder", who: "Neso Academy" },
      { yt: "j6krFp511HA", title: "JK flip-flop", who: "Neso Academy" },
    ],
    read: [
      { title: "Flip-flop", href: "https://www.geeksforgeeks.org/digital-logic/flip-flop-types-their-conversion-and-applications/" },
      { title: "Digital Logic notes", href: "https://www.geeksforgeeks.org/digital-logic/digital-electronics-logic-design-tutorials/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-digital-logic-pyq/", title: "GATE Digital Logic PYQ", do: "MUX, adder, flip-flop ke 8." },
  },
  "dl-min": {
    window: "20:45–21:15",
    how: "K-map video, phir 8 PYQ. Don't-care tabhi lo jab group bada ho.",
    listen: [
      { yt: "FPrcIhqNPVo", title: "K-map part 1", who: "Neso Academy" },
    ],
    read: [
      { title: "K-map", href: "https://www.geeksforgeeks.org/digital-logic/introduction-of-k-map-karnaugh-map/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-digital-logic-pyq/", title: "GATE Digital Logic PYQ", do: "SOP grouping ke 8. Flip-flop chhodo." },
  },
  "dl-num": {
    window: "22:05–22:25",
    how: "IEEE video 9 min, phir 6 PYQ. 22:25–23:05 wala mix inhi teenon ka doosra pass hai.",
    listen: [
      { yt: "_NFaYk9R9jI", title: "IEEE 754", who: "Neso Academy" },
    ],
    read: [
      { title: "IEEE-754", href: "https://www.geeksforgeeks.org/digital-logic/ieee-standard-754-floating-point-numbers/" },
    ],
    pyq: { count: 6, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-digital-logic-pyq/", title: "GATE Digital Logic PYQ", do: "Complement aur floating point ke 6." },
  },
  "coa-ins": {
    window: "06:00–07:20",
    how: "Addressing video, page, aakhri 25 min ke 12 PYQ. 07:35 wala practice slot isi ka extra pass hai agar yeh 12 ho jayein.",
    listen: [
      { yt: "_CH4cm5PhK8", title: "Addressing modes", who: "Gate Smashers" },
    ],
    read: [
      { title: "Addressing modes", href: "https://www.geeksforgeeks.org/computer-organization-architecture/addressing-modes/" },
      { title: "COA notes", href: "https://www.geeksforgeeks.org/computer-organization-architecture/computer-organization-and-architecture-tutorials/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-organization-pyq/", title: "GATE COA PYQ", do: "Mode identify ke 12. Pipeline nahi." },
  },
  "coa-alu": {
    window: "07:35–08:50",
    how: "Control video 9 min, page, baaki time 13 PYQ.",
    listen: [
      { yt: "1q2JKX3qg-4", title: "Hardwired control unit", who: "Last Moment Tuitions" },
    ],
    read: [
      { title: "Control unit", href: "https://www.geeksforgeeks.org/computer-organization-architecture/introduction-of-control-unit-and-its-design/" },
    ],
    pyq: { count: 13, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-organization-pyq/", title: "GATE COA PYQ", do: "ALU aur control ke 13." },
  },
  "coa-pipe": {
    window: "20:25–21:00",
    how: "Pipeline video, phir hazard wala hissa, 6 PYQ.",
    listen: [
      { yt: "Al95Owan9Ck", title: "Pipelining", who: "Gate Smashers" },
      { yt: "srlgaJgaxRE", title: "Pipeline hazards", who: "Gate Smashers" },
    ],
    read: [
      { title: "Pipeline hazards", href: "https://www.geeksforgeeks.org/computer-organization-architecture/pipeline-hazards/" },
    ],
    pyq: { count: 6, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-organization-pyq/", title: "GATE COA PYQ", do: "Speedup aur hazard ke 6." },
  },
  "coa-mem": {
    window: "21:00–21:25",
    how: "Cache mapping video, 5 PYQ.",
    listen: [
      { yt: "m1dA7D6c3C0", title: "Cache mapping", who: "Gate Smashers" },
    ],
    read: [
      { title: "Cache", href: "https://www.geeksforgeeks.org/computer-organization-architecture/cache-memory-in-computer-organization/" },
    ],
    pyq: { count: 5, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-organization-pyq/", title: "GATE COA PYQ", do: "Direct, set, associative ke 5." },
  },
  "coa-io": {
    window: "21:25–21:40",
    how: "I/O video ke pehle 8 min, 4 PYQ.",
    listen: [
      { yt: "PM728r4oGcE", title: "I/O interface", who: "Gate Smashers" },
    ],
    read: [
      { title: "COA notes", href: "https://www.geeksforgeeks.org/computer-organization-architecture/computer-organization-and-architecture-tutorials/" },
    ],
    pyq: { count: 4, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-organization-pyq/", title: "GATE COA PYQ", do: "Interrupt aur DMA ke 4." },
  },
  "ds-c": {
    window: "Off 07:00–08:20 · Duty 06:00–07:00",
    how: "Pointer video, page, 12 PYQ isi window ke aakhir mein.",
    listen: [
      { yt: "cVLw5HeL3JM", title: "How pointer works", who: "Gate Smashers" },
    ],
    read: [
      { title: "Pointers", href: "https://www.geeksforgeeks.org/c/pointers-in-c-and-c-set-1-introduction-arithmetic-and-array/" },
      { title: "C language", href: "https://www.geeksforgeeks.org/c/c-programming-language/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-programming-and-data-structures-pyq/", title: "GATE Programming PYQ", do: "Pointer aur array output ke 12." },
  },
  "ds-rec": {
    window: "Off 08:20–09:00 · Duty 07:00–07:20 aur 07:35–08:05",
    how: "Recursion video, 8 PYQ.",
    listen: [
      { yt: "azXr6nTaD9M", title: "Recursion", who: "Gate Smashers" },
    ],
    read: [
      { title: "C language", href: "https://www.geeksforgeeks.org/c/c-programming-language/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-programming-and-data-structures-pyq/", title: "GATE Programming PYQ", do: "Base case aur stack depth ke 8." },
  },
  "ds-lin": {
    window: "Off 14:30–16:30 suno, 17:00–18:40 PYQ · Duty 20:25–21:40",
    how: "Stack-queue video ka pehla hissa, page, phir 20 PYQ.",
    listen: [
      { yt: "4_xdaIsY2nk", title: "Stack and queue", who: "GATE Wallah" },
    ],
    read: [
      { title: "Stack", href: "https://www.geeksforgeeks.org/dsa/stack-data-structure/" },
      { title: "DSA notes", href: "https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/" },
    ],
    pyq: { count: 20, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-data-structures-pyq/", title: "GATE DS PYQ", do: "Array, stack, queue, list ke 20. Tree nahi." },
  },
  "ds-tree": {
    window: "08:00–08:40 suno · 10:20–10:50 PYQ",
    how: "BST video 11 min, page, 10 PYQ.",
    listen: [
      { yt: "sXABdGalFNg", title: "Binary search tree", who: "Gate Smashers" },
    ],
    read: [
      { title: "BST", href: "https://www.geeksforgeeks.org/dsa/binary-search-tree-data-structure/" },
    ],
    pyq: { count: 10, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-data-structures-pyq/", title: "GATE DS PYQ", do: "Traversal aur BST ke 10." },
  },
  "ds-heap": {
    window: "08:40–09:15 suno · 10:50–11:15 PYQ",
    how: "Heap video 8 min, 10 PYQ.",
    listen: [
      { yt: "uuot9ItgTEI", title: "Heap", who: "Gate Smashers" },
    ],
    read: [
      { title: "Heap", href: "https://www.geeksforgeeks.org/dsa/binary-heap/" },
    ],
    pyq: { count: 10, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-data-structures-pyq/", title: "GATE DS PYQ", do: "Heap index aur insert ke 10." },
  },
  "ds-graph": {
    window: "09:15–10:00 suno · 11:15–11:40 PYQ",
    how: "Representation video, 10 PYQ. Traversal kal nahi, 14 Oct ko.",
    listen: [
      { yt: "5hPfm_uqXmw", title: "Graph representation", who: "Jenny's Lectures" },
    ],
    read: [
      { title: "Graph", href: "https://www.geeksforgeeks.org/dsa/graph-and-its-representations/" },
    ],
    pyq: { count: 10, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-data-structures-pyq/", title: "GATE DS PYQ", do: "Matrix vs list, degree ke 10." },
  },
  "al-ssh": {
    window: "06:40–08:50 sort · 20:25–21:40 hash",
    how: "Subah bubble aur quick, shaam collision aur probing. PYQ 15 subah, 10 shaam.",
    listen: [
      { yt: "re9ytVtt5zg", title: "Bubble sort", who: "Gate Smashers" },
      { yt: "j612Fj-mgCY", title: "Collision resolution", who: "Gate Smashers" },
    ],
    read: [
      { title: "Sorting", href: "https://www.geeksforgeeks.org/dsa/sorting-algorithms/" },
      { title: "Hashing", href: "https://www.geeksforgeeks.org/dsa/hashing-data-structure/" },
    ],
    pyq: { count: 25, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-algorithms-pyq/", title: "GATE Algorithms PYQ", do: "Sort ke 15, hash ke 10." },
  },
  "al-asy": {
    window: "06:00–06:40",
    how: "Notation video 14 min mein se pehle 12, page, 8 PYQ.",
    listen: [
      { yt: "7dz8Iaf_weM", title: "Asymptotic notation", who: "Gate Smashers" },
    ],
    read: [
      { title: "Sorting", href: "https://www.geeksforgeeks.org/dsa/sorting-algorithms/" },
      { title: "DSA notes", href: "https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-algorithms-pyq/", title: "GATE Algorithms PYQ", do: "Big-O, Omega, Theta ke 8." },
  },
  "al-tech": {
    window: "06:00–08:50 greedy aur DP · Master page 10 min isi subah",
    how: "Knapsack video, DP intro, Master theorem page. PYQ 12 greedy, 13 DP.",
    listen: [
      { yt: "M79iHjAG1tg", title: "Fractional knapsack", who: "Gate Smashers" },
      { yt: "0BhhiQGDbEA", title: "Dynamic programming", who: "Gate Smashers" },
    ],
    read: [
      { title: "Greedy", href: "https://www.geeksforgeeks.org/dsa/greedy-algorithms/" },
      { title: "Dynamic programming", href: "https://www.geeksforgeeks.org/dsa/dynamic-programming/" },
    ],
    pyq: { count: 25, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-algorithms-pyq/", title: "GATE Algorithms PYQ", do: "Greedy 12, DP aur divide-conquer 13." },
  },
  "al-gph": {
    window: "06:00–08:50 BFS · 20:25–21:40 shortest aur MST",
    how: "Subah BFS/DFS, shaam Dijkstra aur Bellman. Kruskal page. PYQ 12 subah, 13 shaam.",
    listen: [
      { yt: "N2P7w22tN9c", title: "BFS and DFS", who: "Gate Smashers" },
      { yt: "Gd92jSu_cZk", title: "Dijkstra", who: "Gate Smashers" },
    ],
    read: [
      { title: "BFS", href: "https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/" },
      { title: "Kruskal", href: "https://www.geeksforgeeks.org/dsa/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/" },
      { title: "Bellman-Ford", href: "https://www.geeksforgeeks.org/dsa/bellman-ford-algorithm-dp-23/" },
    ],
    pyq: { count: 25, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-algorithms-pyq/", title: "GATE Algorithms PYQ", do: "Traversal 12, MST aur shortest 13." },
  },
  "os-proc": {
    window: "06:00–06:45",
    how: "Process states video, 8 PYQ.",
    listen: [
      { yt: "2dJdHMpCLIg", title: "Process states", who: "Gate Smashers" },
    ],
    read: [
      { title: "OS notes", href: "https://www.geeksforgeeks.org/operating-systems/operating-systems/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/", title: "GATE OS PYQ", do: "Process, thread, scheduler ke 8." },
  },
  "os-ipc": {
    window: "06:45–07:20",
    how: "Shared memory vs message video, 6 PYQ.",
    listen: [
      { yt: "WjHe0djihmk", title: "Shared memory vs message passing", who: "Success GATEway" },
    ],
    read: [
      { title: "OS notes", href: "https://www.geeksforgeeks.org/operating-systems/operating-systems/" },
    ],
    pyq: { count: 6, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/", title: "GATE OS PYQ", do: "IPC ke 6." },
  },
  "os-sync": {
    window: "07:35–08:50",
    how: "Semaphore video, sync page, 12 PYQ.",
    listen: [
      { yt: "eoGkJWgxurQ", title: "Semaphores", who: "Gate Smashers" },
    ],
    read: [
      { title: "Synchronization", href: "https://www.geeksforgeeks.org/operating-systems/introduction-of-process-synchronization/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/", title: "GATE OS PYQ", do: "Semaphore aur race ke 12." },
  },
  "os-dead": {
    window: "20:25–21:40",
    how: "Deadlock 12 min, Banker agar time bache, 12 PYQ.",
    listen: [
      { yt: "rWFH6PLOIEI", title: "Deadlock", who: "Gate Smashers" },
      { yt: "7gMLNiEz3nw", title: "Banker's algorithm", who: "Gate Smashers" },
    ],
    read: [
      { title: "Deadlock", href: "https://www.geeksforgeeks.org/operating-systems/introduction-of-deadlock-in-operating-system/" },
      { title: "Banker", href: "https://www.geeksforgeeks.org/operating-systems/bankers-algorithm-in-operating-system-2/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/", title: "GATE OS PYQ", do: "Conditions aur Banker ke 12." },
  },
  "os-sch": {
    window: "06:00–07:20 suno · 07:35–08:25 PYQ",
    how: "FCFS phir SJF. 12 PYQ.",
    listen: [
      { yt: "MZdVAVMgNpA", title: "FCFS", who: "Gate Smashers" },
      { yt: "VCIVXPoiLpU", title: "SJF", who: "Gate Smashers" },
    ],
    read: [
      { title: "Scheduling", href: "https://www.geeksforgeeks.org/operating-systems/process-schedulers-in-operating-system/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/", title: "GATE OS PYQ", do: "FCFS, SJF, RR ke 12." },
  },
  "os-mem": {
    window: "08:25–08:50 intro · 20:25–21:10 PYQ",
    how: "Virtual memory video, FIFO page replacement, 10 PYQ shaam ko.",
    listen: [
      { yt: "o2_iCzS9-ZQ", title: "Virtual memory", who: "Gate Smashers" },
      { yt: "8rcUs5RutX0", title: "FIFO page replacement", who: "Gate Smashers" },
    ],
    read: [
      { title: "Paging", href: "https://www.geeksforgeeks.org/operating-systems/paging-in-operating-system/" },
    ],
    pyq: { count: 10, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/", title: "GATE OS PYQ", do: "Paging aur replacement ke 10." },
  },
  "os-fs": {
    window: "21:10–21:40",
    how: "File system video 10 min, 6 PYQ.",
    listen: [
      { yt: "0LtuQhNFFe0", title: "File system", who: "Gate Smashers" },
    ],
    read: [
      { title: "File systems", href: "https://www.geeksforgeeks.org/operating-systems/file-systems-in-operating-system/" },
    ],
    pyq: { count: 6, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/", title: "GATE OS PYQ", do: "Allocation aur directory ke 6." },
  },
  "db-er": {
    window: "Off 07:00–08:00 suno, 09:30–10:20 PYQ · Duty 06:00–07:20",
    how: "ER video, page, 12 PYQ.",
    listen: [
      { yt: "-ZG9FkHJ74s", title: "ER model", who: "Amit Khurana" },
    ],
    read: [
      { title: "ER model", href: "https://www.geeksforgeeks.org/dbms/introduction-of-er-model/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-dbms-pyq/", title: "GATE DBMS PYQ", do: "ER, key, cardinality ke 12." },
  },
  "db-rel": {
    window: "Off 08:00–09:00 algebra, 10:20–11:30 PYQ, SQL 14:30–18:40 · Duty 07:35–08:50 aur 20:25–21:40",
    how: "Algebra page subah, SQL video dopehar ya duty ki shaam. PYQ 13 algebra, 12 SQL.",
    listen: [
      { yt: "SZa2QWx4CLc", title: "Relational algebra", who: "Amit Khurana" },
      { yt: "AxKfMtwRVOk", title: "SQL", who: "Amit Khurana" },
    ],
    read: [
      { title: "SQL", href: "https://www.geeksforgeeks.org/dbms/sql-tutorial/" },
      { title: "DBMS notes", href: "https://www.geeksforgeeks.org/dbms/dbms/" },
    ],
    pyq: { count: 25, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-dbms-pyq/", title: "GATE DBMS PYQ", do: "Algebra 13, SQL output 12." },
  },
  "db-nf": {
    window: "08:00–08:40 suno · 10:20–10:45 PYQ",
    how: "Normal forms 11 min, 8 PYQ.",
    listen: [
      { yt: "EGEwkad_llA", title: "Normal forms", who: "Gate Smashers" },
    ],
    read: [
      { title: "Normal forms", href: "https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-dbms-pyq/", title: "GATE DBMS PYQ", do: "1NF se BCNF ke 8." },
  },
  "db-idx": {
    window: "08:40–09:20 suno · 10:45–11:05 PYQ",
    how: "B aur B+ video, 8 PYQ.",
    listen: [
      { yt: "BwUvgG29fPc", title: "B-tree vs B+ tree", who: "Gate Smashers" },
    ],
    read: [
      { title: "B-tree", href: "https://www.geeksforgeeks.org/dbms/introduction-of-b-tree/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-dbms-pyq/", title: "GATE DBMS PYQ", do: "Index aur B+ ke 8." },
  },
  "db-tx": {
    window: "09:20–10:00 suno · 11:05–11:30 PYQ",
    how: "ACID video, concurrency page, 9 PYQ.",
    listen: [
      { yt: "-GS0OxFJsYQ", title: "ACID", who: "Gate Smashers" },
    ],
    read: [
      { title: "ACID", href: "https://www.geeksforgeeks.org/dbms/acid-properties-in-dbms/" },
      { title: "Concurrency", href: "https://www.geeksforgeeks.org/dbms/concurrency-control-in-dbms/" },
    ],
    pyq: { count: 9, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-dbms-pyq/", title: "GATE DBMS PYQ", do: "ACID aur serializability ke 9." },
  },
  "cn-layer": {
    window: "06:00–06:50",
    how: "OSI video, TCP/IP page, 8 PYQ.",
    listen: [
      { yt: "4D55Cmj2t-A", title: "OSI model", who: "Knowledge Gate" },
    ],
    read: [
      { title: "OSI", href: "https://www.geeksforgeeks.org/computer-networks/layers-of-osi-model/" },
      { title: "TCP/IP", href: "https://www.geeksforgeeks.org/computer-networks/tcp-ip-model/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/", title: "GATE Networks PYQ", do: "Layer ka kaam, 8 sawal." },
  },
  "cn-sw": {
    window: "06:50–07:20 aur 07:35–08:10",
    how: "Circuit switching video, 8 PYQ.",
    listen: [
      { yt: "Cug52cpjM_g", title: "Circuit switching", who: "Knowledge Gate" },
    ],
    read: [
      { title: "Networks notes", href: "https://www.geeksforgeeks.org/computer-networks/computer-network-tutorials/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/", title: "GATE Networks PYQ", do: "Circuit, packet, virtual circuit ke 8." },
  },
  "cn-dll": {
    window: "20:25–21:40",
    how: "Framing page, CRC video, Ethernet page. 12 PYQ.",
    listen: [
      { yt: "5Q-Yv6_0Qcw", title: "CRC", who: "Knowledge Gate" },
    ],
    read: [
      { title: "Error detection", href: "https://www.geeksforgeeks.org/computer-networks/error-detection-in-computer-networks/" },
      { title: "Networks notes", href: "https://www.geeksforgeeks.org/computer-networks/computer-network-tutorials/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/", title: "GATE Networks PYQ", do: "Framing, CRC, Ethernet ke 12." },
  },
  "cn-route": {
    window: "06:00–07:20 suno · 07:35–08:20 PYQ",
    how: "Distance vector video, link state video, page. 12 PYQ.",
    listen: [
      { yt: "5ZuP5qjbKSI", title: "Distance vector", who: "Gate Smashers" },
      { yt: "kW6zV-040SY", title: "Link state", who: "Gate Smashers" },
    ],
    read: [
      { title: "Distance vector vs link state", href: "https://www.geeksforgeeks.org/computer-networks/difference-between-distance-vector-routing-and-link-state-routing/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/", title: "GATE Networks PYQ", do: "DV, link state, flooding ke 12." },
  },
  "cn-ip": {
    window: "20:25–21:05",
    how: "CIDR video, subnet page, 8 PYQ.",
    listen: [
      { yt: "N-ywmOpWehE", title: "CIDR", who: "Knowledge Gate" },
      { yt: "rdb2ki4iGuo", title: "Subnetting", who: "Knowledge Gate" },
    ],
    read: [
      { title: "IPv4", href: "https://www.geeksforgeeks.org/computer-networks/ip-addressing-introduction-and-classful-addressing/" },
      { title: "CIDR", href: "https://www.geeksforgeeks.org/computer-networks/classless-inter-domain-routing-cidr/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/", title: "GATE Networks PYQ", do: "IPv4, CIDR, fragment ke 8." },
  },
  "cn-sup": {
    window: "21:05–21:40",
    how: "ARP video, NAT video, 8 PYQ.",
    listen: [
      { yt: "IUSyV2BVh4A", title: "ARP", who: "Gate Smashers" },
      { yt: "47PUj7OSGkA", title: "NAT", who: "Gate Smashers" },
    ],
    read: [
      { title: "NAT", href: "https://www.geeksforgeeks.org/computer-networks/network-address-translation-nat/" },
      { title: "Networks notes", href: "https://www.geeksforgeeks.org/computer-networks/computer-network-tutorials/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/", title: "GATE Networks PYQ", do: "ARP, DHCP, ICMP, NAT ke 8." },
  },
  "cn-tr": {
    window: "06:00–07:20 suno · 07:35–08:50 PYQ",
    how: "TCP vs UDP, phir congestion. 15 PYQ.",
    listen: [
      { yt: "jJyXpMmXJI0", title: "TCP vs UDP", who: "Gate Smashers" },
      { yt: "0bc_T_pEZmo", title: "TCP congestion", who: "Gate Smashers" },
    ],
    read: [
      { title: "TCP vs UDP", href: "https://www.geeksforgeeks.org/computer-networks/differences-between-tcp-and-udp/" },
      { title: "TCP congestion", href: "https://www.geeksforgeeks.org/computer-networks/tcp-congestion-control/" },
    ],
    pyq: { count: 15, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/", title: "GATE Networks PYQ", do: "UDP, TCP, socket, congestion ke 15." },
  },
  "cn-app": {
    window: "20:25–21:40",
    how: "Application protocols video, DNS page, 12 PYQ.",
    listen: [
      { yt: "pnoWCK82apU", title: "HTTP FTP SMTP", who: "Gate Smashers" },
    ],
    read: [
      { title: "DNS", href: "https://www.geeksforgeeks.org/computer-networks/domain-name-system-dns-in-application-layer/" },
      { title: "Networks notes", href: "https://www.geeksforgeeks.org/computer-networks/computer-network-tutorials/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-computer-networks-pyq/", title: "GATE Networks PYQ", do: "DNS, SMTP, HTTP, FTP, email ke 12." },
  },
  "toc-re": {
    window: "06:00–07:20 suno · 07:35–08:30 PYQ",
    how: "DFA video, regex video, 12 PYQ.",
    listen: [
      { yt: "CiXJnosT0UE", title: "DFA", who: "Knowledge Gate" },
      { yt: "rjG5LwbqAp4", title: "Regular expressions", who: "Knowledge Gate" },
    ],
    read: [
      { title: "Finite automata", href: "https://www.geeksforgeeks.org/theory-of-computation/introduction-of-finite-automata/" },
      { title: "TOC notes", href: "https://www.geeksforgeeks.org/theory-of-computation/theory-of-computation-automata-tutorials/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-theory-of-computation-pyq/", title: "GATE TOC PYQ", do: "Regex aur DFA/NFA ke 12." },
  },
  "toc-cfg": {
    window: "20:55–21:20",
    how: "CFG video, PDA page, 6 PYQ.",
    listen: [
      { yt: "SlSA9vEXCm4", title: "Context free grammar", who: "Knowledge Gate" },
    ],
    read: [
      { title: "TOC notes", href: "https://www.geeksforgeeks.org/theory-of-computation/theory-of-computation-automata-tutorials/" },
    ],
    pyq: { count: 6, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-theory-of-computation-pyq/", title: "GATE TOC PYQ", do: "CFG aur PDA ke 6." },
  },
  "toc-pump": {
    window: "08:30–08:50 aur 20:25–20:55",
    how: "Pumping video, 8 PYQ shaam ke pehle 30 min.",
    listen: [
      { yt: "WdmbZnUesRw", title: "Pumping lemma", who: "Knowledge Gate" },
    ],
    read: [
      { title: "Pumping lemma", href: "https://www.geeksforgeeks.org/theory-of-computation/pumping-lemma-in-theory-of-computation/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-theory-of-computation-pyq/", title: "GATE TOC PYQ", do: "Regular aur CFL pumping ke 8." },
  },
  "toc-tm": {
    window: "21:20–21:40",
    how: "Decidability table video ke pehle 12 min, 6 PYQ.",
    listen: [
      { yt: "FvqG9RQWIQc", title: "Decidability", who: "Knowledge Gate" },
    ],
    read: [
      { title: "Turing machine", href: "https://www.geeksforgeeks.org/theory-of-computation/turing-machine-in-toc/" },
    ],
    pyq: { count: 6, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-theory-of-computation-pyq/", title: "GATE TOC PYQ", do: "TM aur undecidability ke 6." },
  },
  "cd-lex": {
    window: "06:00–06:45",
    how: "Lexical video 9 min, parsing page, 8 PYQ.",
    listen: [
      { yt: "BgNdtk9h8Ok", title: "Lexical analysis", who: "Gate Smashers" },
    ],
    read: [
      { title: "Syntax analysis", href: "https://www.geeksforgeeks.org/compiler-design/introduction-to-syntax-analysis-in-compiler-design/" },
      { title: "Compiler notes", href: "https://www.geeksforgeeks.org/compiler-design/compiler-design-tutorials/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-compiler-design-pyq/", title: "GATE Compiler PYQ", do: "Token aur phase ke 8." },
  },
  "cd-rt": {
    window: "06:45–07:20",
    how: "Runtime video, 6 PYQ.",
    listen: [
      { yt: "HcVVyiP0_BQ", title: "Runtime environment", who: "GATEHUB" },
    ],
    read: [
      { title: "Compiler notes", href: "https://www.geeksforgeeks.org/compiler-design/compiler-design-tutorials/" },
    ],
    pyq: { count: 6, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-compiler-design-pyq/", title: "GATE Compiler PYQ", do: "Activation record ke 6." },
  },
  "cd-ir": {
    window: "07:35–08:50",
    how: "Three-address video, 10 PYQ.",
    listen: [
      { yt: "tJUYVGDn0JE", title: "3-address code", who: "Gate Smashers" },
    ],
    read: [
      { title: "Compiler notes", href: "https://www.geeksforgeeks.org/compiler-design/compiler-design-tutorials/" },
    ],
    pyq: { count: 10, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-compiler-design-pyq/", title: "GATE Compiler PYQ", do: "Intermediate code ke 10." },
  },
  "cd-opt": {
    window: "20:25–21:00",
    how: "Peephole video, optimization page, 6 PYQ.",
    listen: [
      { yt: "clb4tnEm8l4", title: "Peephole optimization", who: "Gate Smashers" },
    ],
    read: [
      { title: "Compiler notes", href: "https://www.geeksforgeeks.org/compiler-design/compiler-design-tutorials/" },
    ],
    pyq: { count: 6, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-compiler-design-pyq/", title: "GATE Compiler PYQ", do: "Local optimization ke 6." },
  },
  "cd-df": {
    window: "21:00–21:40",
    how: "Liveness video, 8 PYQ.",
    listen: [
      { yt: "TLmcTXtOBKA", title: "Liveness analysis", who: "GATEHUB" },
    ],
    read: [
      { title: "Compiler notes", href: "https://www.geeksforgeeks.org/compiler-design/compiler-design-tutorials/" },
    ],
    pyq: { count: 8, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-compiler-design-pyq/", title: "GATE Compiler PYQ", do: "Liveness, constant propagation, CSE ke 8." },
  },
  "ma-logic": {
    window: "Off 07:00–07:25 suno, 09:30–09:50 PYQ · Duty 06:00–06:25",
    how: "Proposition video ka pehla hissa, discrete page, 5 PYQ.",
    listen: [
      { yt: "JnsT3ezRzuo", title: "Propositional logic", who: "GO Classes" },
    ],
    read: [
      { title: "Discrete maths", href: "https://www.geeksforgeeks.org/engineering-mathematics/discrete-mathematics-tutorial/" },
    ],
    pyq: { count: 5, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-discrete-mathematics-pyq/", title: "GATE Discrete PYQ", do: "Implication, contrapositive ke 5." },
  },
  "ma-set": {
    window: "Off 07:25–07:45, PYQ 09:50–10:10 · Duty 06:25–06:45",
    how: "Sets video, 4 PYQ.",
    listen: [
      { yt: "68zilHEUULk", title: "Sets, relations, functions", who: "GATE Wallah" },
    ],
    read: [
      { title: "Sets", href: "https://www.geeksforgeeks.org/engineering-mathematics/set-theory/" },
    ],
    pyq: { count: 4, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-discrete-mathematics-pyq/", title: "GATE Discrete PYQ", do: "Union aur function ke 4." },
  },
  "ma-poset": {
    window: "Off 07:45–08:05, PYQ 10:10–10:25 · Duty 06:45–07:05",
    how: "POSET video, 4 PYQ.",
    listen: [
      { yt: "h5Lv5ZeNl0g", title: "Partial order", who: "Gate Smashers" },
    ],
    read: [
      { title: "Discrete maths", href: "https://www.geeksforgeeks.org/engineering-mathematics/discrete-mathematics-tutorial/" },
    ],
    pyq: { count: 4, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-discrete-mathematics-pyq/", title: "GATE Discrete PYQ", do: "Poset aur lattice ke 4." },
  },
  "ma-grp": {
    window: "Off 08:05–08:25, PYQ 10:25–10:40 · Duty 07:05–07:20",
    how: "Group video, 4 PYQ.",
    listen: [
      { yt: "s_c6m3818KU", title: "Group theory", who: "GATE Wallah" },
    ],
    read: [
      { title: "Groups", href: "https://www.geeksforgeeks.org/engineering-mathematics/group-theory/" },
    ],
    pyq: { count: 4, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-discrete-mathematics-pyq/", title: "GATE Discrete PYQ", do: "Monoid, group, Lagrange ke 4." },
  },
  "ma-gph": {
    window: "Off 08:25–08:45, PYQ 10:40–10:55 · Duty 07:35–08:00",
    how: "Graph page, representation video ka pehla 10 min, 4 PYQ.",
    listen: [
      { yt: "5hPfm_uqXmw", title: "Graph representation", who: "Jenny's Lectures" },
    ],
    read: [
      { title: "Graph", href: "https://www.geeksforgeeks.org/dsa/graph-and-its-representations/" },
      { title: "Discrete maths", href: "https://www.geeksforgeeks.org/engineering-mathematics/discrete-mathematics-tutorial/" },
    ],
    pyq: { count: 4, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-discrete-mathematics-pyq/", title: "GATE Discrete PYQ", do: "Connectivity, matching, colouring ke 4." },
  },
  "ma-comb": {
    window: "Off 08:45–09:00, PYQ 10:55–11:15 · Duty 08:00–08:50",
    how: "Generating function video ka pehla 12 min, 4 PYQ.",
    listen: [
      { yt: "TLN76vdZGoY", title: "Generating functions", who: "Dr. Gajendra Purohit" },
    ],
    read: [
      { title: "Discrete maths", href: "https://www.geeksforgeeks.org/engineering-mathematics/discrete-mathematics-tutorial/" },
    ],
    pyq: { count: 4, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-discrete-mathematics-pyq/", title: "GATE Discrete PYQ", do: "Counting aur recurrence ke 4." },
  },
  "ma-mat": {
    window: "Off 14:30–15:25 suno, 16:45–17:30 PYQ · Duty 20:25–21:00",
    how: "Determinant video, 12 PYQ.",
    listen: [
      { yt: "b-UZJVdLbXc", title: "Determinant", who: "GATE crash course" },
    ],
    read: [
      { title: "Engineering maths", href: "https://www.geeksforgeeks.org/engineering-mathematics/engineering-mathematics-tutorials/" },
    ],
    pyq: { count: 12, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/", title: "GATE Engineering Maths PYQ", do: "Matrix, det, linear system ke 12." },
  },
  "ma-eig": {
    window: "Off 15:25–16:15 suno, 17:30–18:15 PYQ · Duty 21:00–21:40",
    how: "Eigen video, 13 PYQ.",
    listen: [
      { yt: "GRdSTBaAZMY", title: "Eigenvalues", who: "GATE crash course" },
    ],
    read: [
      { title: "Eigenvalues", href: "https://www.geeksforgeeks.org/engineering-mathematics/eigen-values-and-eigen-vectors/" },
    ],
    pyq: { count: 13, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/", title: "GATE Engineering Maths PYQ", do: "Eigen aur LU ke 13." },
  },
  "ma-lim": {
    window: "08:00–08:40 suno · PYQ 10:50–11:05",
    how: "Limits video, continuity page, 5 PYQ.",
    listen: [
      { yt: "r1p8pUd7AWs", title: "Limits", who: "GATE crash course" },
    ],
    read: [
      { title: "Calculus", href: "https://www.geeksforgeeks.org/engineering-mathematics/calculus/" },
    ],
    pyq: { count: 5, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/", title: "GATE Engineering Maths PYQ", do: "Limits aur continuity ke 5." },
  },
  "ma-max": {
    window: "08:40–09:20 suno · PYQ 11:05–11:15",
    how: "Derivative application video, MVT page, 5 PYQ.",
    listen: [
      { yt: "T0MwNyNBuw4", title: "Application of derivative", who: "GATE Wallah" },
    ],
    read: [
      { title: "Mean value theorem", href: "https://www.geeksforgeeks.org/engineering-mathematics/lagranges-mean-value-theorem/" },
      { title: "Calculus", href: "https://www.geeksforgeeks.org/engineering-mathematics/calculus/" },
    ],
    pyq: { count: 5, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/", title: "GATE Engineering Maths PYQ", do: "Maxima, MVT, integral ke 5." },
  },
  "ma-rv": {
    window: "10:10–10:35",
    how: "Poisson video, binomial page, 5 PYQ 11:25–11:35.",
    listen: [
      { yt: "zv7_EwPyzCo", title: "Poisson distribution", who: "Gate Smashers" },
    ],
    read: [
      { title: "Binomial", href: "https://www.geeksforgeeks.org/engineering-mathematics/binomial-distribution/" },
      { title: "Probability", href: "https://www.geeksforgeeks.org/engineering-mathematics/probability/" },
    ],
    pyq: { count: 5, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/", title: "GATE Engineering Maths PYQ", do: "Binomial, Poisson, normal, uniform, exponential ke 5." },
  },
  "ma-stat": {
    window: "10:35–10:50 suno · PYQ 11:35–11:40",
    how: "Mean median video, 5 PYQ.",
    listen: [
      { yt: "sc0OCzvKCwA", title: "Mean, median, mode", who: "5 Minutes Engineering" },
    ],
    read: [
      { title: "Probability", href: "https://www.geeksforgeeks.org/engineering-mathematics/probability/" },
    ],
    pyq: { count: 5, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/", title: "GATE Engineering Maths PYQ", do: "Mean, median, mode, SD ke 5." },
  },
  "ma-bayes": {
    window: "09:30–10:10 suno · PYQ 11:15–11:25",
    how: "Bayes video ka pehla 20 min, 5 PYQ.",
    listen: [
      { yt: "WOYylyjkq_g", title: "Bayes theorem", who: "Gate Smashers" },
    ],
    read: [
      { title: "Bayes", href: "https://www.geeksforgeeks.org/engineering-mathematics/bayes-theorem/" },
      { title: "Probability", href: "https://www.geeksforgeeks.org/engineering-mathematics/probability/" },
    ],
    pyq: { count: 5, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/", title: "GATE Engineering Maths PYQ", do: "Conditional aur Bayes ke 5." },
  },
  "re-ana": {
    window: "21:50–22:35",
    how: "Analogy video ke pehle 15 min, phir 20 PYQ. Coding wali sheet isi slot ka doosra drill hai.",
    listen: [
      { yt: "R8LRbeFFw5o", title: "Analogy", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 20, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Analogy ke 20. Baaki type chhodo." },
  },
  "re-sim": {
    window: "Off 11:30–12:10 · Duty 21:50–22:35",
    how: "Analogy video se similar pair ka rule, 15 PYQ.",
    listen: [
      { yt: "R8LRbeFFw5o", title: "Analogy", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Similarities aur analogy ke 15." },
  },
  "re-diff": {
    window: "15:40–16:25",
    how: "Odd-one video ke pehle 20 min, 20 PYQ.",
    listen: [
      { yt: "Ma_Fbu70bl8", title: "Odd one out", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 20, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Differences aur classification ke 20." },
  },
  "re-space": {
    window: "21:50–22:35",
    how: "Dice video ke pehle 20 min, 15 PYQ.",
    listen: [
      { yt: "LSMdVNIWZ1c", title: "Dice and cube", who: "Testbook" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Cube, dice, space ke 15." },
  },
  "re-prob": {
    window: "21:50–22:35",
    how: "Puzzle video 17 min, 15 PYQ.",
    listen: [
      { yt: "77wV1INtQrw", title: "Puzzle tricks", who: "RWA" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Puzzle aur problem-solving ke 15." },
  },
  "re-anly": {
    window: "21:50–22:35",
    how: "Seating video ka pehla case, 15 PYQ.",
    listen: [
      { yt: "wNzKxImG4GI", title: "Linear seating", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Seating aur analysis ke 15." },
  },
  "re-judg": {
    window: "21:50–22:35",
    how: "Inequality video 20 min, 15 PYQ.",
    listen: [
      { yt: "A-43Yzhnaqg", title: "Inequality", who: "Careerwill" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Inequality aur judgment ke 15." },
  },
  "re-dec": {
    window: "21:50–22:35",
    how: "Puzzle video, rule follow karo, 15 PYQ.",
    listen: [
      { yt: "77wV1INtQrw", title: "Puzzle and decision", who: "RWA" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Decision-making ke 15." },
  },
  "re-vmem": {
    window: "Off 11:30–12:10 · Duty 21:50–22:35",
    how: "Paper-folding 5 min, phir figure yaad karke 15 PYQ.",
    listen: [
      { yt: "0K4WtiRJ0GE", title: "Paper cutting and folding", who: "Rahul sir" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Figure memory aur folding ke 15." },
  },
  "re-disc": {
    window: "15:50–16:30",
    how: "Odd-one ke pehle 20 min, 15 PYQ. Slot 15:50 se figure sheet ke saath.",
    listen: [
      { yt: "Ma_Fbu70bl8", title: "Classification", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Discrimination aur odd-one ke 15." },
  },
  "re-obs": {
    window: "21:50–22:35",
    how: "Classification video se observation ka rule, 15 PYQ.",
    listen: [
      { yt: "Ma_Fbu70bl8", title: "Odd one out", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Observation aur figure ke 15." },
  },
  "re-rel": {
    window: "21:50–22:35",
    how: "Blood relation video, 15 PYQ.",
    listen: [
      { yt: "6uUWbFxxWys", title: "Blood relation", who: "Piyush Varshney" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Relationship concepts ke 15." },
  },
  "re-arith": {
    window: "21:50–22:35",
    how: "Arithmetical reasoning video ke pehle 20 min, 15 PYQ.",
    listen: [
      { yt: "GZ2ENZn7eDQ", title: "Arithmetical reasoning", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Age aur arithmetic ke 15." },
  },
  "re-vclass": {
    window: "21:50–22:35",
    how: "Classification video, 15 PYQ.",
    listen: [
      { yt: "Ma_Fbu70bl8", title: "Verbal classification", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Verbal classification ke 15." },
  },
  "re-fclass": {
    window: "21:50–22:35",
    how: "Mirror video ke pehle 20 min, 15 PYQ.",
    listen: [
      { yt: "Lw7OPUWicQ8", title: "Mirror and water image", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Figure classification ke 15." },
  },
  "re-series": {
    window: "Off 11:15–12:00 · Duty 21:50–22:35",
    how: "Series video ke pehle 20 min, 15 PYQ.",
    listen: [
      { yt: "g_DfPoWOFu0", title: "Number series", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Number series ke 15." },
  },
  "re-abs": {
    window: "15:50–16:35",
    how: "Dice video ke pehle 20 min, paper fold 5 min, 15 PYQ.",
    listen: [
      { yt: "LSMdVNIWZ1c", title: "Dice and cube", who: "Testbook" },
      { yt: "0K4WtiRJ0GE", title: "Paper folding", who: "Rahul sir" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 15, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Abstract symbols aur dice ke 15." },
  },
  "re-comp": {
    window: "21:50–22:35",
    how: "Coding video se computation pattern, 20 PYQ.",
    listen: [
      { yt: "7sTLzmyrR9k", title: "Coding decoding", who: "PARMAR SSC" },
    ],
    read: [
      { title: "Coding-decoding", href: "https://www.geeksforgeeks.org/aptitude/coding-decoding/" },
    ],
    pyq: { count: 20, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Arithmetical computation aur coding ke 20." },
  },
  "re-verb": {
    window: "21:50–22:35",
    how: "Syllogism video ka pehla 20 min, 20 PYQ mein verbal aur figure dono.",
    listen: [
      { yt: "CKY9GchvweU", title: "Syllogism", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 20, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Verbal 12, non-verbal 8." },
  },
  "re-func": {
    window: "21:50–22:35",
    how: "Statement-conclusion video ke pehle 25 min, 20 PYQ.",
    listen: [
      { yt: "q0SvHjqxziI", title: "Statement and conclusion", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 20, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Analytical functions ke 20." },
  },
  "ga-hist": {
    window: "20:00–20:25",
    how: "History video ke pehle 12 min, 8 PYQ. Pados wala hissa 15 Oct ko hai.",
    listen: [
      { yt: "osQpCMdUTpU", title: "Modern history in 30 min", who: "UPSC Wallah" },
    ],
    read: [
      { title: "History of India", href: "https://en.wikipedia.org/wiki/History_of_India" },
      { title: "Freedom movement", href: "https://en.wikipedia.org/wiki/Indian_independence_movement" },
    ],
    pyq: { count: 8, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "History ke 8." },
  },
  "ga-cul": {
    window: "Off 16:30–17:00 · Duty 20:00–20:25",
    how: "Dance video 17 min mein se pehle 12, 8 PYQ.",
    listen: [
      { yt: "l1aXtnKzOzU", title: "Classical dance", who: "Unacademy" },
    ],
    read: [
      { title: "Geography of India", href: "https://en.wikipedia.org/wiki/Geography_of_India" },
    ],
    pyq: { count: 8, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Culture aur dance ke 8." },
  },
  "ga-geo": {
    window: "16:25–17:10",
    how: "Rivers video ke pehle 25 min, 12 PYQ.",
    listen: [
      { yt: "XW9olxf6o_o", title: "Rivers of India", who: "Sudarshan Gurjar" },
    ],
    read: [
      { title: "Geography of India", href: "https://en.wikipedia.org/wiki/Geography_of_India" },
    ],
    pyq: { count: 12, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Rivers, soil, monsoon ke 12." },
  },
  "ga-eco": {
    window: "20:00–20:25",
    how: "GDP video ke pehle 12 min, deficit wala 5 min agar bache, 8 PYQ.",
    listen: [
      { yt: "wmjvCvqNMOA", title: "GDP GNP", who: "Khan GS" },
    ],
    read: [
      { title: "Economy of India", href: "https://en.wikipedia.org/wiki/Economy_of_India" },
      { title: "RBI", href: "https://www.rbi.org.in/" },
    ],
    pyq: { count: 8, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Economy ke 8." },
  },
  "ga-pol": {
    window: "20:00–20:25",
    how: "Emergency video 16 min, 8 PYQ.",
    listen: [
      { yt: "yy6mcY2L0lQ", title: "Emergency provisions", who: "Crazy GkTrick" },
    ],
    read: [
      { title: "Constitution", href: "https://en.wikipedia.org/wiki/Constitution_of_India" },
      { title: "Parliament", href: "https://en.wikipedia.org/wiki/Parliament_of_India" },
      { title: "Constitution text", href: "https://www.legislative.gov.in/constitution-of-india" },
    ],
    pyq: { count: 8, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Polity ke 8." },
  },
  "ga-sci": {
    window: "20:00–20:25",
    how: "9 Oct current video se scientific headings, 8 PYQ.",
    listen: [
      { yt: "s6xDZvezhP4", title: "9 October 2026 current affairs", who: "Current Affairs By Ravi" },
    ],
    read: [
      { title: "PIB releases", href: "https://www.pib.gov.in/allRel.aspx" },
    ],
    pyq: { count: 8, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Science aur research headings ke 8." },
  },
  "ga-nbr": {
    window: "20:00–20:25",
    how: "Neighbours video, 8 PYQ.",
    listen: [
      { yt: "dCJCyKrWFwo", title: "India and neighbours", who: "Crazy GkTrick" },
    ],
    read: [
      { title: "Geography of India", href: "https://en.wikipedia.org/wiki/Geography_of_India" },
    ],
    pyq: { count: 8, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Neighbour country ke 8." },
  },
  "ga-cur": {
    window: "20:00–20:25",
    how: "Current video se 8 headings, 8 PYQ.",
    listen: [
      { yt: "s6xDZvezhP4", title: "9 October 2026 current affairs", who: "Current Affairs By Ravi" },
    ],
    read: [
      { title: "PIB releases", href: "https://www.pib.gov.in/allRel.aspx" },
    ],
    pyq: { count: 8, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Current events ke 8." },
  },
  "ga-env": {
    window: "Off 16:30–17:00 · Duty 20:00–20:25",
    how: "Daily-life science video ke pehle 15 min, 8 PYQ.",
    listen: [
      { yt: "Q2j7XAN4irc", title: "Chemistry of daily life", who: "Adda247" },
    ],
    read: [
      { title: "Economy of India", href: "https://en.wikipedia.org/wiki/Economy_of_India" },
    ],
    pyq: { count: 8, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Environment aur society ke 8." },
  },
  "ga-day": {
    window: "16:30–17:10",
    how: "Daily science video, 10 PYQ.",
    listen: [
      { yt: "Q2j7XAN4irc", title: "Everyday science", who: "Adda247" },
    ],
    read: [
      { title: "PIB releases", href: "https://www.pib.gov.in/allRel.aspx" },
    ],
    pyq: { count: 10, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "Rozmarra science ke 10." },
  },
  "rv-dl": {
    window: "06:00–07:20 K-map aur addressing · 07:35–08:50 PYQ 30 · 20:25–21:40 wahi quiz ka baaki",
    how: "Naya chapter nahi. K-map aur addressing dobara, sirf atka hua hissa.",
    listen: [
      { yt: "FPrcIhqNPVo", title: "K-map", who: "Neso Academy" },
      { yt: "_CH4cm5PhK8", title: "Addressing modes", who: "Gate Smashers" },
    ],
    read: [
      { title: "Digital Logic notes", href: "https://www.geeksforgeeks.org/digital-logic/digital-electronics-logic-design-tutorials/" },
      { title: "COA notes", href: "https://www.geeksforgeeks.org/computer-organization-architecture/computer-organization-and-architecture-tutorials/" },
      { title: "DSA notes", href: "https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/" },
    ],
    pyq: { count: 30, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-digital-logic-pyq/", title: "GATE Digital Logic PYQ", do: "DL, COA, DS mix se 30. Jo doosri baar galat, 10 min concept." },
  },
  "rv-os": {
    window: "06:00–08:50 algo aur OS formula · 07:35–08:50 PYQ 20 · 20:25–21:40 PYQ 15",
    how: "DP aur Banker ka atka hua hissa.",
    listen: [
      { yt: "0BhhiQGDbEA", title: "Dynamic programming", who: "Gate Smashers" },
      { yt: "7gMLNiEz3nw", title: "Banker", who: "Gate Smashers" },
    ],
    read: [
      { title: "Dynamic programming", href: "https://www.geeksforgeeks.org/dsa/dynamic-programming/" },
      { title: "OS notes", href: "https://www.geeksforgeeks.org/operating-systems/operating-systems/" },
      { title: "Deadlock", href: "https://www.geeksforgeeks.org/operating-systems/introduction-of-deadlock-in-operating-system/" },
    ],
    pyq: { count: 30, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-operating-system-pyq/", title: "GATE OS PYQ", do: "Scheduling, deadlock, graph ke 30. Naya topic nahi." },
  },
  "rv-db": {
    window: "06:00–08:50 normal form aur CIDR · 20:25–21:40 PYQ",
    how: "11 min normal forms, phir subnet page. PYQ 15 subah, 15 shaam.",
    listen: [
      { yt: "EGEwkad_llA", title: "Normal forms", who: "Gate Smashers" },
      { yt: "rdb2ki4iGuo", title: "Subnetting", who: "Knowledge Gate" },
    ],
    read: [
      { title: "Normal forms", href: "https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/" },
      { title: "CIDR", href: "https://www.geeksforgeeks.org/computer-networks/classless-inter-domain-routing-cidr/" },
    ],
    pyq: { count: 30, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-dbms-pyq/", title: "GATE DBMS PYQ", do: "DBMS 15, networks 15. Naya chapter nahi." },
  },
  "rv-ma": {
    window: "06:00–08:50 DFA, FIRST, Bayes · 20:25–21:40 maths PYQ",
    how: "Teenon ka atka hua hissa. PYQ 25.",
    listen: [
      { yt: "CiXJnosT0UE", title: "DFA", who: "Knowledge Gate" },
      { yt: "WOYylyjkq_g", title: "Bayes", who: "Gate Smashers" },
    ],
    read: [
      { title: "TOC notes", href: "https://www.geeksforgeeks.org/theory-of-computation/theory-of-computation-automata-tutorials/" },
      { title: "Compiler notes", href: "https://www.geeksforgeeks.org/compiler-design/compiler-design-tutorials/" },
      { title: "Engineering maths", href: "https://www.geeksforgeeks.org/engineering-mathematics/engineering-mathematics-tutorials/" },
    ],
    pyq: { count: 25, href: "https://www.geeksforgeeks.org/quizzes/gate-cs-engineering-mathematics-pyq/", title: "GATE Engineering Maths PYQ", do: "TOC, compiler, maths mix se 25." },
  },
  "rv-re": {
    window: "21:50–22:35",
    how: "Series ka woh pattern jo pehle galat hua, 20 PYQ.",
    listen: [
      { yt: "g_DfPoWOFu0", title: "Number series", who: "Adda247" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
    ],
    pyq: { count: 20, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-intelligence-reasoning", title: "IMD 22 Nov 2017 Reasoning", do: "Reasoning second pass, 20." },
  },
  "rv-ga": {
    window: "20:00–20:25",
    how: "Polity 16 min mein se 12, history headings, 10 PYQ.",
    listen: [
      { yt: "yy6mcY2L0lQ", title: "Emergency", who: "Crazy GkTrick" },
    ],
    read: [
      { title: "History of India", href: "https://en.wikipedia.org/wiki/History_of_India" },
      { title: "Constitution", href: "https://en.wikipedia.org/wiki/Constitution_of_India" },
      { title: "Economy of India", href: "https://en.wikipedia.org/wiki/Economy_of_India" },
    ],
    pyq: { count: 10, href: "https://sscportal.in/scientific-assistant/papers/22-nov-2017-shift-1-general-awareness", title: "IMD 22 Nov 2017 GA", do: "History, polity, economy ke 10." },
  },
  "mk-ii": {
    window: "06:00–07:00 formula video nahi, sheet · Mock 20:00–22:00",
    how: "Subah formula sheet. Raat ko 100 sawal, 120 min, −1. Video tabhi jab koi ek line na samajh aaye.",
    listen: [
      { yt: "EGEwkad_llA", title: "Normal forms, sirf atke to", who: "Gate Smashers" },
    ],
    read: [
      { title: "Digital Logic notes", href: "https://www.geeksforgeeks.org/digital-logic/digital-electronics-logic-design-tutorials/" },
      { title: "DBMS notes", href: "https://www.geeksforgeeks.org/dbms/dbms/" },
      { title: "Networks notes", href: "https://www.geeksforgeeks.org/computer-networks/computer-network-tutorials/" },
    ],
    pyq: { count: 100, href: "https://sscstudy.com/ssc-scientific-assistant-previous-year-paper-pdf/", title: "IMD CS papers aur 2022 PDF", do: "Paper-II: 100 CS sawal. Solution mock ke baad sirf attempt count." },
  },
  "mk-i": {
    window: "Off 08:00–10:00 · Duty 06:00–08:00",
    how: "200 sawal, 120 min, −0.25. Order: technical, reasoning, GA.",
    listen: [
      { yt: "7sTLzmyrR9k", title: "Reasoning types, sirf analysis ke baad", who: "PARMAR SSC" },
    ],
    read: [
      { title: "Logical reasoning", href: "https://www.geeksforgeeks.org/aptitude/logical-reasoning/" },
      { title: "History of India", href: "https://en.wikipedia.org/wiki/History_of_India" },
    ],
    pyq: { count: 200, href: "https://sscstudy.com/ssc-scientific-assistant-previous-year-paper-pdf/", title: "IMD 2022 CS and IT paper", do: "Poora Paper-I. Analysis usi din ke review slot mein." },
  },
};

export function subtopicPack(id: string) {
  return subtopicPacks[id];
}

function assertPacks() {
  for (const topic of officialTopics) {
    const pack = subtopicPacks[topic.id];
    if (!pack) throw new Error(`Missing subtopic pack ${topic.id}`);
    if (!pack.window || !pack.how) throw new Error(`Blank window ${topic.id}`);
    if (pack.listen.length < 1 || pack.listen.length > 2) throw new Error(`Listen count ${topic.id}`);
    for (const video of pack.listen) {
      if (!/^[A-Za-z0-9_-]{11}$/.test(video.yt)) throw new Error(`Bad yt ${topic.id}`);
    }
    if (pack.read.length < 1) throw new Error(`No read ${topic.id}`);
    for (const item of pack.read) {
      if (!item.href.startsWith("https://")) throw new Error(`Bad read ${topic.id}`);
    }
    if (!pack.pyq.href.startsWith("https://") || pack.pyq.count < 1) throw new Error(`Bad pyq ${topic.id}`);
  }
  for (const id of Object.keys(subtopicPacks)) {
    if (!officialTopics.some((topic) => topic.id === id)) throw new Error(`Orphan pack ${id}`);
  }
}

assertPacks();
