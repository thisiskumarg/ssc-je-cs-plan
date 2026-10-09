import { studySheets } from "@/lib/study-sheets";

export type TopicVideo = {
  yt: string;
  title: string;
  who: string;
  minutes: number;
  why: string;
  covers: string;
};

function clip(
  yt: string,
  title: string,
  who: string,
  minutes: number,
  why: string,
  covers: string,
): TopicVideo {
  return { yt, title, who, minutes, why, covers };
}

/** Mock windows are for the paper. A lecture there would eat the clock. */
const NO_LECTURE = new Set(["mock-ii", "mock-i", "mock-an"]);

export const sheetVideos: Record<string, TopicVideo[]> = {
  "dl-bool": [
    clip(
      "WW-NPtIzHwk",
      "Introduction to Boolean Algebra (Part 1)",
      "Neso Academy",
      0,
      "Laws aur De Morgan ke liye yeh pehli video. Diagram English hai, steps seedhe hain.",
      "Identity, null, De Morgan, absorption, consensus",
    ),
    clip(
      "FPrcIhqNPVo",
      "Karnaugh Map (K' Map) - Part 1",
      "Neso Academy",
      0,
      "K-map yahi se seekho. Group size, wrap, aur SOP isi lecture mein clear hota hai.",
      "SOP, POS, K-map grouping, wrap-around",
    ),
    clip(
      "_F9nAb6m4U4",
      "Don't Care in Karnaugh Map",
      "Neso Academy",
      0,
      "Don't-care tabhi group mein lo jab group bada ho. Yeh short video wahi trap hatati hai.",
      "Don't-care, hazard wala extra term",
    ),
  ],
  "dl-cir": [
    clip(
      "RK3P9L2ZXk4",
      "Full Adder",
      "Neso Academy",
      12,
      "Adder, carry, aur combinational circuit ka sabse saaf lecture.",
      "Half adder, full adder, carry",
    ),
    clip(
      "FKvnmxte98A",
      "Introduction to Multiplexers",
      "Neso Academy",
      0,
      "MUX, select lines, aur decoder ka relation isi se.",
      "MUX, decoder, encoder",
    ),
    clip(
      "HZg7fNu-l24",
      "Introduction to SR Flip Flop",
      "Neso Academy",
      8,
      "Latch aur flip-flop ka farq, phir SR. JK ke liye isi series ka agla hissa dekh lena.",
      "Latch, SR flip-flop, clock",
    ),
    clip(
      "_NFaYk9R9jI",
      "IEEE 754 Floating-Point",
      "Neso Academy",
      9,
      "Sign, exponent, mantissa. Number system ke baad yahi ek video kaafi hai.",
      "IEEE-754, bias, range",
    ),
  ],
  "coa-ins": [
    clip(
      "_CH4cm5PhK8",
      "What is Addressing Mode",
      "Gate Smashers",
      0,
      "Hindi mein saare modes ek saath. Aaj ki subah ki sheet isi se poori hoti hai.",
      "Immediate, direct, indirect, register, indexed, relative",
    ),
    clip(
      "1q2JKX3qg-4",
      "Hardwired Control Unit in Hindi",
      "Last Moment Tuitions",
      9,
      "Hardwired vs microprogrammed. Control unit ka MCQ isi comparison se aata hai.",
      "ALU, data path, hardwired, microprogrammed",
    ),
  ],
  "coa-pipe": [
    clip(
      "Al95Owan9Ck",
      "Pipelining with a real-life example",
      "Gate Smashers",
      0,
      "Speedup se pehle pipeline ka flow. Hindi, example ke saath.",
      "Pipeline stages, speedup, non-pipeline vs pipeline",
    ),
    clip(
      "srlgaJgaxRE",
      "What is Hazard in Pipelining",
      "Gate Smashers",
      0,
      "Structural, data, control. RAW/WAR/WAW ka naam yahin se yaad rakho.",
      "Hazards, stall, forwarding",
    ),
    clip(
      "m1dA7D6c3C0",
      "Cache Mapping techniques",
      "Gate Smashers",
      0,
      "Direct, associative, set-associative. AMAT se pehle mapping.",
      "Cache, mapping, locality, DMA se pehle ka memory model",
    ),
  ],
  "ga-hist": [
    clip(
      "osQpCMdUTpU",
      "Modern Indian History in 30 minutes",
      "UPSC Wallah",
      31,
      "25 minute ke GA slot mein yahi ek revision. 1857 se 1947 ki timeline.",
      "Freedom movement, 1857, Congress, neighbours ka historical context",
    ),
    clip(
      "dCJCyKrWFwo",
      "India and its neighbour countries",
      "Crazy GkTrick",
      23,
      "Padosi desh, direction, aur capital. History ke baad yahi dusra hissa.",
      "Neighbouring countries, borders",
    ),
  ],
  "re-code": [
    clip(
      "7sTLzmyrR9k",
      "Coding Decoding one shot",
      "PARMAR SSC",
      0,
      "SSC pattern ka Hindi one-shot. Letter, number, aur mixed coding.",
      "Coding-decoding patterns",
    ),
    clip(
      "R8LRbeFFw5o",
      "Analogy",
      "Adda247",
      0,
      "Analogy ka rule ek line mein. Coding ke baad yahi 15 minute.",
      "Word analogy, number analogy",
    ),
  ],
  "c-out": [
    clip(
      "cVLw5HeL3JM",
      "How Pointer Works",
      "Gate Smashers",
      0,
      "Pointer, address, aur * ka matlab ek example se. Output sawal isi se dry-run karo.",
      "Pointer arithmetic, array name, dereference",
    ),
  ],
  "ds-lin": [
    clip(
      "4_xdaIsY2nk",
      "Stack and Queue",
      "GATE Wallah",
      112,
      "Slot se lamba hai. Pehle stack aur queue, list wala hissa baad mein. Nayi tab mat kholo.",
      "Stack, queue, circular queue, linked list operations",
    ),
  ],
  "re-dir": [
    clip(
      "hKDQLRe7Fyo",
      "Direction and Distance",
      "Adda247",
      0,
      "North-up sketch. Right turn clockwise. Ranking formula bhi isi style ke sawal mein aati hai.",
      "Direction, turns, shadow, ranking total",
    ),
  ],
  "ga-map": [
    clip(
      "XW9olxf6o_o",
      "Rivers of India",
      "Sudarshan Gurjar",
      40,
      "Nadi, flow, aur delta. Map wale facts isi lecture se.",
      "Ganga, Narmada, Godavari, coasts",
    ),
    clip(
      "exdY5V_yNYA",
      "The Monsoon Explained",
      "CDS Wallah",
      14,
      "South-west aur north-east monsoon, 14 minute. Culture se pehle yahi geography.",
      "Monsoon, rain shadow",
    ),
  ],
  "ds-tree": [
    clip(
      "sXABdGalFNg",
      "Binary Search Tree",
      "Gate Smashers",
      11,
      "Insert aur traversal. Inorder sorted hota hai, yahi MCQ hai.",
      "BST, inorder, preorder, postorder",
    ),
    clip(
      "uuot9ItgTEI",
      "Introduction to Heap",
      "Gate Smashers",
      8,
      "Max-heap, min-heap, parent-child index. Graph se pehle yahi.",
      "Heap, heapify, priority queue",
    ),
  ],
  "w1-test": [
    clip(
      "FPrcIhqNPVo",
      "K-map, test ke baad",
      "Neso Academy",
      0,
      "Test ke dauran video band. Galat sawal ka concept baad mein isi lecture se.",
      "Digital logic jo test mein atka",
    ),
  ],
  "re-nv": [
    clip(
      "Ma_Fbu70bl8",
      "Classification, odd one out",
      "Adda247",
      121,
      "Figure aur word classification ka rule. Mirror alag video hai, aaj odd-one.",
      "Differences, classification, odd one out",
    ),
  ],
  "ga-w1": [
    clip(
      "osQpCMdUTpU",
      "Modern history revision",
      "UPSC Wallah",
      31,
      "Hafta 1 ka static. Naya current nahi, yahi timeline dobara.",
      "History facts of the week",
    ),
    clip(
      "XW9olxf6o_o",
      "Rivers of India",
      "Sudarshan Gurjar",
      40,
      "Geography wale galat facts. Poori nadi nahi, jo test mein aaye wahi hissa.",
      "Rivers, coasts",
    ),
  ],
  "al-sort": [
    clip(
      "7dz8Iaf_weM",
      "Asymptotic notations",
      "Gate Smashers",
      14,
      "Big-O, Omega, Theta. Sort se pehle yahi 14 minute.",
      "Big-O, tight bound, best and worst",
    ),
    clip(
      "re9ytVtt5zg",
      "Bubble Sort",
      "Gate Smashers",
      8,
      "Stable, swaps, aur best case. Quick sort ka idea isi series ka agla lecture hai.",
      "Bubble, comparison sorts, stability",
    ),
    clip(
      "tWCaFVJMUi8",
      "Quick Sort",
      "Gate Smashers",
      13,
      "Partition aur worst case O(n^2). Merge O(n log n) se compare karo.",
      "Quick sort, partition, recurrence",
    ),
  ],
  "al-hash": [
    clip(
      "j612Fj-mgCY",
      "Collision resolution",
      "Gate Smashers",
      5,
      "Chaining vs open addressing. Chhota hai, poora dekh lo.",
      "Collision, chaining",
    ),
    clip(
      "ZEyPqqRTO00",
      "Linear probing",
      "Gate Smashers",
      13,
      "Probe sequence aur clustering. alpha = n/m isi ke baad.",
      "Linear probing, load factor",
    ),
  ],
  "ga-eco": [
    clip(
      "wmjvCvqNMOA",
      "GDP, GNP, NNP",
      "Khan GS Research Centre",
      26,
      "GDP aur uske cousins. Repo aur deficit ke naam isi vocabulary se baithenge.",
      "GDP, GNP, national income",
    ),
    clip(
      "1txYCY27swk",
      "Fiscal deficit",
      "Crazy GkTrick",
      5,
      "Paanch minute. Fiscal, revenue, primary deficit ka farq.",
      "Fiscal deficit, budget words",
    ),
  ],
  "re-syl": [
    clip(
      "CKY9GchvweU",
      "Syllogism",
      "Adda247",
      0,
      "Venn se some/all/no. Space visualization ke figure baad mein, pehle yahi rule.",
      "Syllogism, Venn, all, some, no",
    ),
  ],
  "al-gr": [
    clip(
      "M79iHjAG1tg",
      "Fractional knapsack",
      "Gate Smashers",
      12,
      "Greedy tab sahi jab local choice global ko bigade nahi. Knapsack yahi example hai.",
      "Greedy choice, fractional knapsack",
    ),
  ],
  "al-dp": [
    clip(
      "0BhhiQGDbEA",
      "Introduction to Dynamic Programming",
      "Gate Smashers",
      9,
      "Greedy vs DP. Overlapping subproblem aur optimal substructure.",
      "DP vs greedy, memoization",
    ),
    clip(
      "FBKjvXGGCJM",
      "Master theorem example",
      "Gate Smashers",
      6,
      "T(n) = aT(n/b) + f(n). Teen cases. Chhota lecture, poora dekhna.",
      "Master theorem, divide and conquer",
    ),
  ],
  "ga-day": [
    clip(
      "Q2j7XAN4irc",
      "Chemistry of daily life",
      "Adda247",
      31,
      "Rozmarra science: acid, base, metal, mixture. Polity heads ke saath yahi.",
      "Everyday science",
    ),
  ],
  "re-blood": [
    clip(
      "6uUWbFxxWys",
      "Blood relation",
      "Piyush Varshney",
      0,
      "Generation row banao, phir relation. Problem-solving puzzle se pehle yahi.",
      "Blood relation, generation",
    ),
  ],
  "al-bfs": [
    clip(
      "N2P7w22tN9c",
      "BFS and DFS",
      "Gate Smashers",
      0,
      "Queue BFS, stack DFS. Visited array bhoolna hi galat sawal hai.",
      "BFS, DFS, visited, queue vs stack",
    ),
  ],
  "al-mst": [
    clip(
      "huQojf2tevI",
      "Kruskal MST",
      "Gate Smashers",
      11,
      "Sort edges, cycle na bane. MST ke V−1 edges.",
      "Kruskal, cycle, MST",
    ),
    clip(
      "Gd92jSu_cZk",
      "Dijkstra",
      "Gate Smashers",
      16,
      "Non-negative weight. Negative ho to Dijkstra mat chalao.",
      "Dijkstra, greedy shortest path",
    ),
    clip(
      "SiI03wnREt4",
      "Bellman-Ford",
      "Gate Smashers",
      17,
      "V−1 passes, negative edge, negative cycle. Dijkstra se farq yahi hai.",
      "Bellman-Ford, negative cycle",
    ),
  ],
  "ga-cur": [
    clip(
      "s6xDZvezhP4",
      "9 October 2026 current affairs",
      "Current Affairs By Ravi",
      30,
      "Aaj ki date ka current. Sirf heading aur number, kahani nahi.",
      "Current events, scientific headlines of the day",
    ),
  ],
  "re-seat": [
    clip(
      "wNzKxImG4GI",
      "Linear seating arrangement",
      "Adda247",
      98,
      "Lamba hai. Pehle ek line arrangement ka pehla case. Doosra case tabhi jab pehla kat jaaye.",
      "Linear seating, left-right, case split",
    ),
  ],
  "os-proc": [
    clip(
      "2dJdHMpCLIg",
      "Process states and schedulers",
      "Gate Smashers",
      21,
      "New, ready, running, waiting, terminated. Long, short, medium scheduler.",
      "Process state, PCB, scheduler",
    ),
    clip(
      "ITc09gOrqZk",
      "Process vs thread",
      "Gate Smashers",
      11,
      "Thread stack alag, code aur heap share. User vs kernel thread ka ek line.",
      "Thread, shared address space",
    ),
    clip(
      "WjHe0djihmk",
      "Message passing vs shared memory",
      "Success GATEway",
      0,
      "IPC ke do raaste. Shared memory tez, message passing safe.",
      "IPC, shared memory, message passing",
    ),
  ],
  "os-dead": [
    clip(
      "rWFH6PLOIEI",
      "Deadlock concept",
      "Gate Smashers",
      12,
      "Chaar conditions: mutual exclusion, hold and wait, no preemption, circular wait.",
      "Deadlock conditions",
    ),
    clip(
      "eoGkJWgxurQ",
      "Semaphores",
      "Gate Smashers",
      25,
      "Wait aur signal. Counting vs binary. Producer-consumer ka idea.",
      "Semaphore, wait, signal, critical section",
    ),
    clip(
      "7gMLNiEz3nw",
      "Banker's algorithm",
      "Gate Smashers",
      24,
      "Need = Max − Allocation. Safe sequence nikaalo. Yahi numerical hai.",
      "Banker, safe state, need matrix",
    ),
  ],
  "ga-parl": [
    clip(
      "yy6mcY2L0lQ",
      "Emergency provisions",
      "Crazy GkTrick",
      16,
      "352, 356, 360. President aur Parliament ka role isi 16 minute mein.",
      "Emergency, Parliament, President",
    ),
    clip(
      "dCJCyKrWFwo",
      "India and its neighbours",
      "Crazy GkTrick",
      23,
      "Pados ka doosra pass, emergency ke baad.",
      "Neighbours",
    ),
  ],
  "re-ineq": [
    clip(
      "A-43Yzhnaqg",
      "Inequality",
      "Careerwill",
      20,
      ">, <, ≥ aur conclusions. 20 minute, poora dekh lo.",
      "Inequality, coded inequality, conclusions",
    ),
  ],
  "os-mem": [
    clip(
      "o2_iCzS9-ZQ",
      "Virtual memory and page fault",
      "Gate Smashers",
      20,
      "Page, frame, fault, aur virtual address kyun chahiye.",
      "Paging, virtual memory, page fault",
    ),
    clip(
      "0LtuQhNFFe0",
      "File system",
      "Gate Smashers",
      10,
      "File, directory, aur allocation ka naam. Contiguous vs linked vs indexed.",
      "File system, allocation",
    ),
  ],
  "os-gantt": [
    clip(
      "MZdVAVMgNpA",
      "FCFS scheduling",
      "Gate Smashers",
      11,
      "Gantt, TAT = CT − AT, WT = TAT − BT. Pehle FCFS.",
      "FCFS, turnaround, waiting",
    ),
    clip(
      "VCIVXPoiLpU",
      "SJF scheduling",
      "Gate Smashers",
      9,
      "Shortest job pehle. Preemptive version SRTF.",
      "SJF, SRTF",
    ),
    clip(
      "8rcUs5RutX0",
      "FIFO page replacement",
      "Gate Smashers",
      16,
      "Frame bharo, sabse purana nikalo. Belady ka naam yaad rakho.",
      "FIFO page replacement, Belady",
    ),
  ],
  "ga-1857": [
    clip(
      "osQpCMdUTpU",
      "Modern history in 30 minutes",
      "UPSC Wallah",
      31,
      "1857, Congress, aur 1947. Saal wale facts isi revision se.",
      "1857, moderates, Gandhi, 1947",
    ),
  ],
  "re-puz": [
    clip(
      "77wV1INtQrw",
      "Puzzle reasoning tricks",
      "RWA",
      17,
      "Ek pakki position, phir do case. Decision-making mein diya hua rule, apna moral nahi.",
      "Puzzle cases, decision from given rules",
    ),
  ],
  "db-er": [
    clip(
      "-ZG9FkHJ74s",
      "ER model introduction",
      "Amit Khurana",
      0,
      "Entity, attribute, relationship, weak entity. Hindi GATE series.",
      "ER, cardinality, weak entity",
    ),
    clip(
      "SZa2QWx4CLc",
      "Relational algebra introduction",
      "Amit Khurana",
      0,
      "Select, project, join. Keys wale lecture isi series mein iske pehle hain.",
      "Relational algebra, keys",
    ),
  ],
  "db-sql": [
    clip(
      "AxKfMtwRVOk",
      "Introduction to SQL",
      "Amit Khurana",
      0,
      "SELECT ka order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.",
      "SQL clause order",
    ),
    clip(
      "UUo3tBhbj4k",
      "GROUP BY",
      "Amit Khurana",
      0,
      "WHERE row pe, HAVING group pe. Aggregate bina GROUP BY ke ek row.",
      "GROUP BY, HAVING, aggregate",
    ),
  ],
  "re-clock": [
    clip(
      "1FUyw_Vjbok",
      "Clock and calendar",
      "Adda247",
      47,
      "30H − 5.5M. Odd days ka rule isi class mein.",
      "Clock angle, calendar, odd days",
    ),
  ],
  "ga-cult": [
    clip(
      "l1aXtnKzOzU",
      "Indian classical dance forms",
      "Unacademy",
      17,
      "Dance aur state ka pair. 17 minute, das se zyada mat jodo.",
      "Classical dance, state",
    ),
    clip(
      "Q2j7XAN4irc",
      "Chemistry of daily life",
      "Adda247",
      31,
      "Environment aur rozmarra science ka hissa. BOD aur pollution alag se sheet mein likho.",
      "Everyday chemistry, environment hooks",
    ),
  ],
  "db-nf": [
    clip(
      "EGEwkad_llA",
      "All normal forms",
      "Gate Smashers",
      11,
      "1NF se BCNF, real example. 11 minute mein poora ladder.",
      "1NF, 2NF, 3NF, BCNF",
    ),
    clip(
      "BwUvgG29fPc",
      "B-tree vs B+ tree",
      "Gate Smashers",
      15,
      "Data sirf leaf pe B+ mein. Indexing ka MCQ yahi hai.",
      "B-tree, B+ tree, index",
    ),
    clip(
      "-GS0OxFJsYQ",
      "ACID properties",
      "Gate Smashers",
      0,
      "Atomicity, consistency, isolation, durability. Transaction ka pehla lecture.",
      "ACID, transaction",
    ),
  ],
  "w2-test": [
    clip(
      "EGEwkad_llA",
      "Normal forms, test ke baad",
      "Gate Smashers",
      11,
      "Sectional ke dauran mat dekho. Galat DBMS sawal ke baad yahi.",
      "Normal forms that the sectional missed",
    ),
  ],
  "re-fig": [
    clip(
      "Lw7OPUWicQ8",
      "Mirror and water image",
      "Adda247",
      103,
      "Lamba hai. Pehle mirror ka rule, water baad mein. Classification ka odd-one alag se.",
      "Mirror, water image, figure discrimination",
    ),
  ],
  "ga-w2": [
    clip(
      "Q2j7XAN4irc",
      "Everyday science",
      "Adda247",
      31,
      "Hafta 2 ka static mix. Naya chapter nahi.",
      "Daily science facts",
    ),
  ],
  "cn-lay": [
    clip(
      "4D55Cmj2t-A",
      "OSI model in Hindi",
      "Knowledge Gate",
      0,
      "Saat layers aur unka kaam. Pehli network video yahi honi chahiye.",
      "OSI layers",
    ),
    clip(
      "GfaHdjApnhU",
      "TCP/IP vs OSI",
      "Knowledge Gate",
      0,
      "Chaar ya paanch layer wala TCP/IP. OSI se map karo.",
      "TCP/IP, OSI mapping",
    ),
    clip(
      "Cug52cpjM_g",
      "Circuit switching",
      "Knowledge Gate",
      0,
      "Circuit, packet, message. Delay ka farq.",
      "Switching, delay",
    ),
  ],
  "cn-crc": [
    clip(
      "2U6kPu0dfqI",
      "Framing, bit and byte stuffing",
      "Knowledge Gate",
      0,
      "Flag, stuffing, aur frame boundary.",
      "Framing, bit stuffing",
    ),
    clip(
      "5Q-Yv6_0Qcw",
      "CRC",
      "Knowledge Gate",
      0,
      "Modulo-2 division. Remainder bhejo, receiver zero expect karta hai.",
      "CRC, polynomial",
    ),
    clip(
      "ewpq3qxx5Ls",
      "Ethernet frame",
      "Knowledge Gate",
      0,
      "IEEE 802.3 fields. CRC ke baad yahi.",
      "Ethernet, MAC",
    ),
  ],
  "ga-place": [
    clip(
      "XW9olxf6o_o",
      "Rivers of India",
      "Sudarshan Gurjar",
      40,
      "Jagah: nadi, bandh, coast. Observation wale facts map se.",
      "Places, rivers, coasts",
    ),
  ],
  "re-ana": [
    clip(
      "R8LRbeFFw5o",
      "Analogy practice",
      "Adda247",
      0,
      "Aaj naya theory nahi. Analogy set isi class ke pattern se.",
      "Analogy drill",
    ),
  ],
  "cn-route": [
    clip(
      "5ZuP5qjbKSI",
      "Distance vector routing",
      "Gate Smashers",
      0,
      "Hop count, Bellman-Ford jaisa update. Count-to-infinity ka naam.",
      "Distance vector, RIP",
    ),
  ],
  "cn-sub": [
    clip(
      "N-ywmOpWehE",
      "CIDR in Hindi",
      "Knowledge Gate",
      0,
      "Classful ke baad CIDR. Prefix length aur host bits.",
      "CIDR, classless",
    ),
    clip(
      "rdb2ki4iGuo",
      "Subnetting with examples",
      "Knowledge Gate",
      0,
      "/26 aur /27 khud, phir video se match. Hosts = 2^h − 2.",
      "Subnet, network, broadcast, hosts",
    ),
  ],
  "ga-yoj": [
    clip(
      "rl5xO3PgUWM",
      "Government schemes in 10 minutes",
      "SSC Crackers",
      11,
      "Naam aur beneficiary. Gyarah minute, poora dekh lo.",
      "Yojana, ministry, beneficiary",
    ),
  ],
  "re-code2": [
    clip(
      "7sTLzmyrR9k",
      "Coding decoding one shot",
      "PARMAR SSC",
      0,
      "Naya pattern: jo pehli baar atka, usi class ka wahi hissa.",
      "New coding pattern, relationship",
    ),
  ],
  "cn-tcp": [
    clip(
      "jJyXpMmXJI0",
      "TCP vs UDP",
      "Gate Smashers",
      12,
      "Connection, handshake, aur UDP kab. Pehle yahi farq.",
      "TCP, UDP, sockets",
    ),
    clip(
      "0bc_T_pEZmo",
      "TCP congestion control",
      "Gate Smashers",
      13,
      "Slow start, congestion avoidance, fast retransmit. 13 minute.",
      "Congestion window, slow start",
    ),
  ],
  "cn-app": [
    clip(
      "pnoWCK82apU",
      "HTTP, FTP, SMTP, POP",
      "Gate Smashers",
      18,
      "Port aur kaam: 80, 443, 25, 53, 20/21. Ek lecture mein saare.",
      "DNS, SMTP, HTTP, FTP, email",
    ),
  ],
  "ga-sci": [
    clip(
      "UEWa5FO9SX8",
      "Science MCQ for SSC",
      "Adda247",
      57,
      "Chhote science GK. Pehle 25 minute, jitne sawal usme hon.",
      "Physics, chemistry, biology GK",
    ),
  ],
  "re-stmt": [
    clip(
      "q0SvHjqxziI",
      "Statement and conclusion",
      "Adda247",
      53,
      "Conclusion di gayi statement se nikle, bahar ka gyaan nahi. Arithmetical reasoning ke number sawal alag se.",
      "Statement-conclusion",
    ),
    clip(
      "GZ2ENZn7eDQ",
      "Arithmetical reasoning",
      "Adda247",
      112,
      "Lamba hai. Age aur relation wale pehle 20 minute. Baaki kal.",
      "Age, arithmetical reasoning",
    ),
  ],
  "toc-re": [
    clip(
      "CiXJnosT0UE",
      "What is DFA",
      "Knowledge Gate",
      0,
      "DFA: har state se har symbol par exactly ek move.",
      "DFA, alphabet, language",
    ),
    clip(
      "rjG5LwbqAp4",
      "Regular expressions",
      "Knowledge Gate",
      0,
      "Star, plus, union. Regex se NFA ka idea.",
      "Regex, NFA",
    ),
    clip(
      "WdmbZnUesRw",
      "Pumping lemma for regular languages",
      "Knowledge Gate",
      0,
      "|xy| ≤ p, |y| ≥ 1. Regular nahi dikhane ka tarika.",
      "Pumping lemma",
    ),
  ],
  "toc-tm": [
    clip(
      "SlSA9vEXCm4",
      "Context free grammar",
      "Knowledge Gate",
      0,
      "CFG, derivation, parse tree.",
      "CFG, derivation",
    ),
    clip(
      "7lcwlNNCP1E",
      "Pushdown automata",
      "Knowledge Gate",
      0,
      "Stack wali machine. CFL ka automaton.",
      "PDA, stack",
    ),
    clip(
      "FvqG9RQWIQc",
      "Decidability table",
      "Knowledge Gate",
      0,
      "Halting undecidable. Recursive vs recursively enumerable.",
      "TM, decidability, undecidability",
    ),
  ],
  "ga-body": [
    clip(
      "yy6mcY2L0lQ",
      "Emergency and constitutional powers",
      "Crazy GkTrick",
      16,
      "President, Parliament, aur emergency. Sanvaidhanik nikay ka short pass.",
      "President, Parliament, emergency",
    ),
  ],
  "re-series": [
    clip(
      "g_DfPoWOFu0",
      "Number series",
      "Adda247",
      115,
      "Pehle difference, phir square. Verbal classification ka odd-one alag video hai.",
      "Number series, difference, square",
    ),
    clip(
      "Ma_Fbu70bl8",
      "Classification",
      "Adda247",
      121,
      "Verbal classification: ek property, phir odd one.",
      "Verbal classification",
    ),
  ],
  "cd-lex": [
    clip(
      "BgNdtk9h8Ok",
      "Lexical analysis",
      "Gate Smashers",
      9,
      "Token, pattern, lexeme. Compiler phases ka pehla hissa.",
      "Lex, token, phases",
    ),
  ],
  "cd-ff": [
    clip(
      "UXYqQ_CJsVE",
      "FIRST set",
      "Gate Smashers",
      11,
      "FIRST nikaalne ka rule. Nullable alag se.",
      "FIRST",
    ),
    clip(
      "WUwG50xJ9vc",
      "FOLLOW set",
      "Gate Smashers",
      9,
      "FOLLOW, aur LL(1) mein FIRST disjoint. Epsilon ho to FOLLOW dekho.",
      "FOLLOW, LL(1)",
    ),
  ],
  "ga-pol2": [
    clip(
      "yy6mcY2L0lQ",
      "Emergency provisions",
      "Crazy GkTrick",
      16,
      "Polity ka ek page. Nayi theory nahi, yahi 16 minute.",
      "Emergency articles, President",
    ),
  ],
  "re-mix1": [
    clip(
      "hKDQLRe7Fyo",
      "Direction",
      "Adda247",
      0,
      "Mix ka pehla hissa. Sketch, phir answer.",
      "Direction",
    ),
    clip(
      "6uUWbFxxWys",
      "Blood relation",
      "Piyush Varshney",
      0,
      "Doosra hissa. Generation row.",
      "Blood relation",
    ),
    clip(
      "Ma_Fbu70bl8",
      "Figure classification",
      "Adda247",
      121,
      "Teesra hissa. Odd-one property.",
      "Figure classification",
    ),
  ],
  "ma-disc": [
    clip(
      "68zilHEUULk",
      "Sets, relations, functions",
      "GATE Wallah",
      0,
      "Union, function injective/surjective, relation properties.",
      "Sets, relations, functions",
    ),
    clip(
      "s_c6m3818KU",
      "Group theory",
      "GATE Wallah",
      0,
      "Group, inverse, Lagrange. Counting alag se sheet par formula se.",
      "Group, identity, inverse, Lagrange",
    ),
  ],
  "ma-la": [
    clip(
      "GRdSTBaAZMY",
      "Eigenvalue and eigenvector",
      "GATE crash course",
      0,
      "det(A−λI)=0. Trace sum, det product.",
      "Eigen, determinant, rank idea",
    ),
    clip(
      "b-UZJVdLbXc",
      "Determinant",
      "GATE crash course",
      0,
      "det(AB)=det(A)det(B). Inverse tabhi jab det ≠ 0.",
      "Determinant, inverse",
    ),
  ],
  "re-puz2": [
    clip(
      "g_DfPoWOFu0",
      "Number series",
      "Adda247",
      115,
      "Aaj arithmetic series. Puzzle ek set, series ke paanch.",
      "Number series",
    ),
  ],
  "ga-eco2": [
    clip(
      "wmjvCvqNMOA",
      "GDP revision",
      "Khan GS Research Centre",
      26,
      "GDP, repo, deficit. Nayi theory nahi.",
      "GDP, deficit",
    ),
    clip(
      "s6xDZvezhP4",
      "9 October current affairs",
      "Current Affairs By Ravi",
      30,
      "Is hafte ki economic headings, agar video mein hon.",
      "Current economic headlines",
    ),
  ],
  "ma-calc": [
    clip(
      "r1p8pUd7AWs",
      "Limits",
      "GATE crash course",
      0,
      "sin x / x aur (1+1/n)^n. Standard limits yahi.",
      "Limits",
    ),
    clip(
      "5y70mUdzHT4",
      "Single integration",
      "GATE crash course",
      0,
      "MVT ka slope idea aur basic integral. Application of derivative isi series ka 17–18 hai.",
      "Integration, derivative application",
    ),
  ],
  "ma-pr": [
    clip(
      "f3MkZBFLuHs",
      "Probability episode 1",
      "GATE crash course",
      0,
      "Sample space, conditional probability. Bayes se pehle yahi.",
      "Probability rules, conditional",
    ),
    clip(
      "WOYylyjkq_g",
      "Bayes theorem",
      "Gate Smashers",
      30,
      "Total probability, phir Bayes. Binomial mean np yaad rakho.",
      "Bayes, total probability",
    ),
  ],
  "w3-test": [
    clip(
      "N-ywmOpWehE",
      "CIDR, test ke baad",
      "Knowledge Gate",
      0,
      "Sectional ke dauran band. Galat network sawal ke baad yahi.",
      "CIDR if the sectional missed it",
    ),
  ],
  "re-abs": [
    clip(
      "LSMdVNIWZ1c",
      "Dice and cube",
      "Testbook",
      45,
      "Opposite faces, open dice. Abstract symbols ka figure yahi se.",
      "Cube, dice, opposite faces",
    ),
    clip(
      "0K4WtiRJ0GE",
      "Paper cutting and folding",
      "Rahul sir",
      5,
      "Paanch minute ka trick. Dice ke baad.",
      "Paper folding",
    ),
  ],
  "ga-w3": [
    clip(
      "osQpCMdUTpU",
      "History 30 minute revision",
      "UPSC Wallah",
      31,
      "Static 20. Naya current nahi.",
      "History static",
    ),
    clip(
      "yy6mcY2L0lQ",
      "Emergency",
      "Crazy GkTrick",
      16,
      "Polity ke 16 minute. Dono milakar hafta 3 ka static.",
      "Polity static",
    ),
  ],
  "rv-d1": [
    clip(
      "FPrcIhqNPVo",
      "K-map revision",
      "Neso Academy",
      0,
      "Doosra pass. Sirf woh group jahan pehli baar galti hui.",
      "Boolean, K-map",
    ),
    clip(
      "_CH4cm5PhK8",
      "Addressing modes revision",
      "Gate Smashers",
      0,
      "Mode identify. Pipeline dobara sirf hazard wala hissa.",
      "Addressing, control",
    ),
    clip(
      "sXABdGalFNg",
      "BST revision",
      "Gate Smashers",
      11,
      "Inorder aur heap index. Linear DS ka address formula sheet se.",
      "BST, traversal",
    ),
  ],
  "ga-rv1": [
    clip(
      "dCJCyKrWFwo",
      "Neighbours, rapid",
      "Crazy GkTrick",
      23,
      "Static rapid. Ek fact galat ho to video pause karke likho.",
      "Neighbours, borders",
    ),
  ],
  "re-rv1": [
    clip(
      "7sTLzmyrR9k",
      "Coding revision",
      "PARMAR SSC",
      0,
      "Computation wale pattern. Naya type nahi.",
      "Coding, analogy",
    ),
  ],
  "rv-d2": [
    clip(
      "0BhhiQGDbEA",
      "DP revision",
      "Gate Smashers",
      9,
      "Greedy vs DP ek line. Master theorem ka case.",
      "DP, greedy, Master",
    ),
    clip(
      "7gMLNiEz3nw",
      "Banker revision",
      "Gate Smashers",
      24,
      "Ek safe sequence khud, phir video.",
      "Deadlock, Banker, scheduling numbers",
    ),
  ],
  "ga-rv2": [
    clip(
      "rl5xO3PgUWM",
      "Schemes rapid",
      "SSC Crackers",
      11,
      "Naam aur beneficiary, 11 minute.",
      "Yojana",
    ),
  ],
  "re-rv2": [
    clip(
      "CKY9GchvweU",
      "Syllogism revision",
      "Adda247",
      0,
      "Verbal. Non-verbal ke liye classification video.",
      "Syllogism",
    ),
    clip(
      "Ma_Fbu70bl8",
      "Classification revision",
      "Adda247",
      121,
      "Non-verbal odd one.",
      "Figure classification",
    ),
  ],
  "rv-d3": [
    clip(
      "EGEwkad_llA",
      "Normal forms revision",
      "Gate Smashers",
      11,
      "BCNF left side superkey. 11 minute.",
      "Normal forms, ACID",
    ),
    clip(
      "rdb2ki4iGuo",
      "Subnetting revision",
      "Knowledge Gate",
      0,
      "Ek /26 khud, phir video se match.",
      "CIDR, subnet, fragmentation idea",
    ),
  ],
  "ga-rv3": [
    clip(
      "s6xDZvezhP4",
      "9 October current affairs",
      "Current Affairs By Ravi",
      30,
      "Pandrah headings. Jo pehle likh chuke ho unhe skip.",
      "Current affairs",
    ),
  ],
  "re-rv3": [
    clip(
      "q0SvHjqxziI",
      "Statement and conclusion",
      "Adda247",
      53,
      "Analytical: conclusion statement ke andar se.",
      "Statement-conclusion, analytical",
    ),
  ],
  "rv-d4": [
    clip(
      "CiXJnosT0UE",
      "DFA revision",
      "Knowledge Gate",
      0,
      "DFA vs NFA ek line, phir pumping.",
      "DFA, NFA, pumping",
    ),
    clip(
      "UXYqQ_CJsVE",
      "FIRST revision",
      "Gate Smashers",
      11,
      "LL(1) FIRST disjoint.",
      "FIRST, FOLLOW",
    ),
    clip(
      "WOYylyjkq_g",
      "Bayes revision",
      "Gate Smashers",
      30,
      "Bayes aur binomial np. Eigen formula sheet se.",
      "Bayes, probability",
    ),
  ],
  "ga-rv4": [
    clip(
      "yy6mcY2L0lQ",
      "Polity one page",
      "Crazy GkTrick",
      16,
      "Emergency aur President.",
      "Polity",
    ),
    clip(
      "osQpCMdUTpU",
      "History one page",
      "UPSC Wallah",
      31,
      "Timeline ka doosra pass, sirf saal.",
      "History dates",
    ),
  ],
  "re-rv4": [
    clip(
      "g_DfPoWOFu0",
      "Series second pass",
      "Adda247",
      115,
      "Sirf woh pattern jo pehli baar galat hua. Poori class mat dohrao.",
      "Series, coding mix",
    ),
    clip(
      "6uUWbFxxWys",
      "Blood relation second pass",
      "Piyush Varshney",
      0,
      "Generation row wale galat sawal.",
      "Blood relation",
    ),
  ],
  "hy-read": [
    clip(
      "EGEwkad_llA",
      "Normal forms, high yield",
      "Gate Smashers",
      11,
      "Mock se pehle naya chapter nahi. Yahi 11 minute ka ladder.",
      "Normal forms",
    ),
    clip(
      "N-ywmOpWehE",
      "CIDR, high yield",
      "Knowledge Gate",
      0,
      "Host bits aur network address. Doosri high-yield video.",
      "CIDR, hosts",
    ),
  ],
  "mock-ii": [],
  "mock-i": [],
  "mock-an": [],
  "mock-end": [
    clip(
      "7sTLzmyrR9k",
      "Reasoning types that went wrong",
      "PARMAR SSC",
      0,
      "Sirf woh coding type jo mock mein galat hua.",
      "Wrong reasoning type",
    ),
    clip(
      "yy6mcY2L0lQ",
      "Polity last pass",
      "Crazy GkTrick",
      16,
      "GA ka aakhri pass. Polity aur emergency.",
      "Polity facts",
    ),
  ],
};

export function videosFor(id: string) {
  return sheetVideos[id] ?? [];
}

export function allTopicVideos() {
  const seen = new Set<string>();
  const out: TopicVideo[] = [];
  for (const list of Object.values(sheetVideos)) {
    for (const video of list) {
      if (seen.has(video.yt)) continue;
      seen.add(video.yt);
      out.push(video);
    }
  }
  return out;
}

function assertVideos() {
  for (const sheet of studySheets) {
    const list = sheetVideos[sheet.id];
    if (!list) throw new Error(`Missing videos for ${sheet.id}`);
    if (list.length === 0 && !NO_LECTURE.has(sheet.id)) {
      throw new Error(`No lecture for ${sheet.id}`);
    }
    if (list.length > 4) throw new Error(`Too many videos on ${sheet.id}`);
    for (const video of list) {
      if (!/^[A-Za-z0-9_-]{11}$/.test(video.yt)) {
        throw new Error(`Bad video id ${video.yt} on ${sheet.id}`);
      }
      if (!video.why || !video.covers) throw new Error(`Blank video copy ${sheet.id}`);
    }
  }
  for (const id of Object.keys(sheetVideos)) {
    if (!studySheets.some((sheet) => sheet.id === id)) {
      throw new Error(`Video pack without sheet ${id}`);
    }
  }
}

assertVideos();
