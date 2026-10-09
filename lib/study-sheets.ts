import { days, slotsFor, type Slot } from "@/lib/plan";

export type SheetMode = "padhai" | "revision" | "practice" | "yaad";

export type SheetWhen = {
  iso: string;
  start: string;
  duty?: boolean;
};

export type SheetBlock = {
  h: string;
  lines: string[];
};

export type StudySheet = {
  id: string;
  title: string;
  mode: SheetMode;
  when: SheetWhen[];
  blocks: SheetBlock[];
};

function at(iso: string, starts: string[], duty?: boolean): SheetWhen[] {
  return starts.map((start) => ({ iso, start, duty }));
}

function sheet(
  id: string,
  title: string,
  mode: SheetMode,
  when: SheetWhen[],
  blocks: SheetBlock[],
): StudySheet {
  return { id, title, mode, when, blocks };
}

export const studySheets: StudySheet[] = [
  sheet("dl-bool", "Boolean, K-map, minimization", "padhai", at("2026-10-08", ["06:00", "13:00", "20:00"]), [
    {
      h: "Laws jo MCQ mein seedhe aate hain",
      lines: [
        "Identity: A+0=A, A·1=A. Null: A+1=1, A·0=0. Idempotent: A+A=A, A·A=A.",
        "Complement: A+A'=1, A·A'=0. Involution: (A')'=A.",
        "Commutative, associative, distributive: A+(B·C)=(A+B)·(A+C) bhi sach hai, yeh ordinary algebra jaisa nahi.",
        "Absorption: A+AB=A, A(A+B)=A. Consensus: AB+A'C+BC = AB+A'C.",
        "De Morgan: (A+B)'=A'B', (AB)'=A'+B'. NAND = OR of complements. NOR = AND of complements.",
      ],
    },
    {
      h: "SOP, POS, K-map",
      lines: [
        "Minterm: saari variables, SOP unka sum. Maxterm: POS unka product.",
        "K-map group sirf 1, 2, 4, 8... size. Edges wrap karti hain: corner ke chaar 1 ek group ho sakte hain.",
        "Don't-care (X) tabhi group mein lo jab group bada ho. Sirf X ka group mat banao.",
        "SOP ke liye 1 circle karo. POS ke liye 0 circle karo, phir factors ko complement samajh kar likho.",
        "Static-1 hazard: SOP mein ek extra consensus term jodne se cover ho jata hai. Static-0 POS mein.",
      ],
    },
    {
      h: "Exam trap",
      lines: [
        "XOR: A⊕B = A'B+AB'. XNOR: AB+A'B'. Bits alag hon to XOR 1.",
        "A+A'B = A+B. Yeh absorption ka variant hai, bahut baar seedha poochha jaata hai.",
        "2-variable map mein diagonal cells adjacent nahi hoti. Sirf edge-share adjacent hai.",
      ],
    },
  ]),
  sheet("dl-cir", "Circuits, flip-flop, number systems", "padhai", at("2026-10-08", ["07:35", "16:30", "18:50", "21:25", "22:25", "23:05"]), [
    {
      h: "Combinational",
      lines: [
        "Half adder: Sum=A⊕B, Carry=AB. Full adder: Sum=A⊕B⊕Cin, Cout=AB+BCin+CinA.",
        "n-bit ripple adder mein carry ek ke baad ek jaati hai. Carry-lookahead fast hai, propagate P=A⊕B, generate G=AB.",
        "MUX: 2^n data lines, n select. Decoder: n input, 2^n output, ek hi output 1. Encoder ulta.",
        "Priority encoder: sabse badi active input jeetti hai. Comparator: A>B, A=B, A<B.",
      ],
    },
    {
      h: "Latch aur flip-flop",
      lines: [
        "Latch level-sensitive hota hai. Flip-flop edge-triggered.",
        "SR=11 invalid. JK: Q+ = JQ' + K'Q. J=K=1 par toggle.",
        "D: Q+ = D. T: Q+ = T⊕Q. T=1 par toggle, T=0 par hold.",
        "n flip-flop ripple up-counter: mod 2^n, output frequency = input / 2^n.",
        "Mod-10 counter pure 4-bit free counter nahi. 1010 par reset chahiye.",
        "Shift register: SISO, SIPO, PISO, PIPO. Ring counter: n states. Johnson: 2n states.",
      ],
    },
    {
      h: "Number representation",
      lines: [
        "Unsigned n bit: 0 se 2^n−1. Signed 2's complement: −2^(n−1) se 2^(n−1)−1.",
        "2's complement: bits ulta karo, +1. Subtraction A−B = A + (2's of B).",
        "r's complement = r^n − N. (r−1)'s = (r^n−1)−N. Decimal: 9's phir +1 = 10's.",
        "IEEE-754 single: 1 sign, 8 exponent bias 127, 23 fraction. Value (−1)^s × 1.f × 2^(E−127).",
        "E=0 aur f=0 zero. E=255 f=0 infinity. E=255 f≠0 NaN. Double bias 1023.",
        "Fixed point: binary point fixed. Range chhota, precision uniform. Float: range bada, precision relative.",
      ],
    },
  ]),
  sheet("coa-ins", "Instructions, addressing, ALU, control", "padhai", at("2026-10-09", ["06:00", "07:35", "13:00"]), [
    {
      h: "Instruction cycle",
      lines: [
        "Fetch: PC se instruction memory se IR mein. PC badhta hai.",
        "Decode: opcode control unit ko batata hai kya karna hai.",
        "Execute: ALU ya memory ya I/O. Phir result register ya memory mein.",
        "MAR address rakhta hai, MBR/MDR data. IR instruction. PC agla address.",
      ],
    },
    {
      h: "Addressing modes",
      lines: [
        "Immediate: operand instruction ke andar. Memory EA nahi. Sab se tez.",
        "Register: operand register mein. Direct: EA = address field.",
        "Indirect: EA = M[address field]. Do memory access.",
        "Register-indirect: EA = register ka content.",
        "Indexed: EA = index register + address. Array ke liye.",
        "Relative: EA = PC + offset. Branch ke liye.",
        "Base register: EA = base + displacement. Relocation.",
        "Auto-increment / auto-decrement: register use ke baad ya pehle badalta hai.",
      ],
    },
    {
      h: "ALU aur control",
      lines: [
        "ALU arithmetic aur logic karta hai. Flags: zero, carry, sign, overflow.",
        "Hardwired control tez, complex ISA par mushkil. Microprogrammed control ROM mein microinstructions, flexible, thoda slow.",
        "Data path: registers, ALU, buses. Control unit inhe enable signals deta hai.",
        "Trap: 'operand instruction mein hai' = immediate. 'address of address' = indirect.",
      ],
    },
  ]),
  sheet("coa-pipe", "Pipeline, cache, interrupt, DMA", "padhai", at("2026-10-09", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Pipeline",
      lines: [
        "k stages, n instructions, koi stall nahi: speedup = (n·k)/(k+n−1). Badi n par speedup k ke kareeb.",
        "Ideal CPI = 1. Effective CPI = 1 + stall cycles per instruction.",
        "Structural hazard: ek hi resource do jagah chahiye. Data hazard: RAW, WAR, WAW. Control hazard: branch.",
        "Forwarding RAW ke kai stall hata deta hai, load-use stall aksar reh jaata hai.",
        "Branch prediction galat ho to pipeline flush. Delayed branch purani machines mein.",
      ],
    },
    {
      h: "Cache",
      lines: [
        "AMAT = hit time + miss rate × miss penalty.",
        "EAT = h·Tcache + (1−h)·Tmemory. Agar har access cache time bhi de: h·Tc + (1−h)·(Tc+Tm). Sawal ka wording padho.",
        "Offset bits = log2(block bytes). Direct index = log2(blocks). Set index = log2(sets). Tag = address bits − index − offset.",
        "Sets = blocks / ways. Cache bytes = sets × ways × block bytes.",
        "Write-through: har write memory tak. Write-back: dirty bit, eviction par likho. Write-allocate vs no-write-allocate alag sawal hai.",
        "Locality: temporal (wahi address jaldi) aur spatial (paas ka address).",
      ],
    },
    {
      h: "Interrupt aur DMA",
      lines: [
        "Interrupt: CPU context bachata hai, handler chalata hai, phir wapas.",
        "DMA: device block khud move karta hai. Ant mein CPU ko ek interrupt.",
        "Cycle stealing: beech-beech mein bus. Burst: poora block ek saath, CPU ruka rehta hai.",
        "Programmed I/O CPU ko busy rakhta hai. Interrupt-driven behtar. DMA sab se kam CPU.",
      ],
    },
  ]),
  sheet("ga-hist", "Itihaas: timeline aur pados", "padhai", at("2026-10-09", ["20:00"]), [
    {
      h: "Ek shasak, ek kaam",
      lines: [
        "IVC: Harappa, Mohenjo-daro. Planned drains, citadel, no clear horse evidence in the standard MCQ line.",
        "Vedic: Rigveda sab se purana. Later Vedic mein iron, painted grey ware ke saath jod kar yaad rakho.",
        "Maurya: Chandragupta, Ashoka (Kalinga, dhamma). Gupta: samudragupta, kalidasa, 'golden age' wala MCQ tag.",
        "Delhi Sultanate: Slave, Khilji (market reforms Alauddin), Tughlaq, Sayyid, Lodi.",
        "Mughal: Babur 1526 Panipat, Akbar mansabdari aur Din-i Ilahi, Aurangzeb ke baad decline.",
        "1857: Meerut se fauj. 1885 Congress. 1905 Bengal partition. 1919 Jallianwala. 1930 salt. 1942 Quit India. 1947.",
      ],
    },
    {
      h: "Padosi",
      lines: [
        "Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar, Afghanistan (land). Sri Lanka aur Maldives samundar.",
        "McMahon line China-Arunachal. Radcliffe Bengal aur Punjab. Durand Afghanistan-Pakistan.",
        "SAARC 1985. India's neighbours ka capital ek line mein error copy par likh lo.",
      ],
    },
  ]),
  sheet("re-code", "Coding-decoding aur analogy", "padhai", at("2026-10-09", ["21:50"]), [
    {
      h: "Pehle yeh order",
      lines: [
        "A=1 ... Z=26. Opposite pair ka yog 27: A-Z, B-Y, M-N.",
        "Pehle +1/−1 shift dekho, phir +2/−2, phir reverse word, phir position ka sum ya square.",
        "20 second mein pattern na dikhe to mark karke aage. Ant mein lautna.",
        "Analogy: pehli jodi ka relation doosri par waisa hi. Opposite, type, cause, place, degree.",
        "Similarities: teen ek rule, ek alag. Differences: wahi, bas alag waala chuno.",
      ],
    },
  ]),
  sheet(
    "c-out",
    "C: pointer, storage, recursion",
    "padhai",
    [...at("2026-10-10", ["07:00", "09:30"], false), ...at("2026-10-10", ["06:00", "07:35", "13:00"], true)],
    [
      {
        h: "Jo output sawal mein aata hai",
        lines: [
          "a[i] ka matlab *(a+i). Pointer + 1 agla element hai, agla byte nahi. Byte step = sizeof(*p).",
          "int *p; p address rakhta hai. *p us address ka value. &x ka address.",
          "Array ka naam pehle element ka address hai. sizeof(array) poora size. sizeof(pointer) address ka size.",
          "String '\\0' par khatam. strlen null nahi ginata. strcpy destination ko overwrite karta hai.",
          "Storage: auto stack, static/global data, lifetime program. register request hai, guarantee nahi. extern doosri file.",
          "Call by value copy bhejta hai. Pointer pass karke asli variable badal sakte ho.",
        ],
      },
      {
        h: "Recursion",
        lines: [
          "Base case na ho to stack phatata hai. Har call naya frame: parameters, locals, return address.",
          "Time us recurrence se aata hai. Depth sab se lambi chain hai, aksar O(n) ya O(log n).",
          "Dry run: har call ka argument likho, base par value, phir return pe jodte jao.",
          "Tail call aakhri kaam hai. Kai compilers frame reuse karte hain, exam mein depth phir bhi poochhte hain.",
        ],
      },
    ],
  ),
  sheet(
    "ds-lin",
    "Array, stack, queue, linked list",
    "padhai",
    [...at("2026-10-10", ["14:30", "17:00", "18:40"], false), ...at("2026-10-10", ["16:30", "18:50", "20:25", "22:35"], true)],
    [
      {
        h: "Address aur operations",
        lines: [
          "1D address = base + i × size. Row-major A[i][j] = base + (i×cols + j)×size. Column-major: base + (j×rows + i)×size. C row-major, 0-based.",
          "Stack: push/pop ek hi end, O(1). Use: function call, infix to postfix, DFS, undo.",
          "Queue: rear par insert, front par delete. Circular queue front aur rear ko mod capacity se ghumata hai, O(1).",
          "Deque dono taraf. Priority queue highest pehle, heap se O(log n).",
        ],
      },
      {
        h: "List",
        lines: [
          "Singly: next pointer. Insert at head O(1). Search O(n). Delete of a known node ko previous chahiye.",
          "Doubly: prev aur next. Known node delete O(1).",
          "Circular list aakhri node pehle ko point karti hai.",
          "Array: index O(1), beech mein insert O(n). List: index O(n), known position insert O(1).",
          "Yaad rakhne ki table: structure × insert / delete / search. Yahi 18:40 wali sheet hai.",
        ],
      },
    ],
  ),
  sheet(
    "re-dir",
    "Direction, ranking, similarities",
    "padhai",
    [...at("2026-10-10", ["11:30"], false), ...at("2026-10-10", ["21:50"], true)],
    [
      {
        h: "Kaise karna hai",
        lines: [
          "Direction dimagh mein mat ghumao. North up karke chhota sketch.",
          "Right turn clockwise hota hai. Left anti-clockwise. 'Right hand side' facing pe depend karta hai.",
          "Shadow sawal: subah shadow west, shaam east. Doppler nahi, sirf direction.",
          "Ranking: position from left + from right − 1 = total, jab dono same insaan hon.",
          "Similarities: kaun sa word/number teen ke rule mein baithta hai. Ek property likho, phir chuno.",
        ],
      },
    ],
  ),
  sheet(
    "ga-map",
    "Bharat ka map aur culture",
    "padhai",
    [...at("2026-10-10", ["16:30"], false), ...at("2026-10-10", ["20:00"], true)],
    [
      {
        h: "Geography, das facts",
        lines: [
          "Himalaya north, Thar west, Deccan plateau, coastal plains. Western Ghats Kerala-Maharashtra. Eastern Ghats toote hue.",
          "Ganga, Yamuna, Brahmaputra, Godavari, Krishna, Narmada (rift, west flow), Tapti. Sundarban Ganga-Brahmaputra delta.",
          "Monsoon: south-west summer, north-east winter. Rain shadow east of Western Ghats kam, west zyada.",
          "Soil: alluvial north plains, black regur Deccan cotton, laterite high rain, desert Rajasthan.",
          "Tropic of Cancer: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram.",
        ],
      },
      {
        h: "Culture, ek line",
        lines: [
          "Classical dance: Bharatanatyam TN, Kathak north, Kathakali Kerala, Odissi Odisha, Kuchipudi AP, Manipuri, Sattriya Assam, Mohiniyattam Kerala.",
          "UNESCO ya festival sawal mein state jod ke yaad karo. Nayi kitaab nahi, das pair error copy mein.",
        ],
      },
    ],
  ),
  sheet("ds-tree", "Tree, BST, heap, graph", "padhai", at("2026-10-11", ["08:00", "10:20"]), [
    {
      h: "Tree counts",
      lines: [
        "Root level 0. Level L par zyada se zyada 2^L nodes.",
        "Perfect binary height h (root 0): nodes = 2^(h+1)−1. Kuch kitaabein height 1 se ginati hain. Sawal ka convention padho.",
        "Full binary (0 ya 2 child): leaves = internal nodes + 1.",
        "n nodes binary tree ki minimum height floor(log2 n).",
      ],
    },
    {
      h: "BST, heap, graph",
      lines: [
        "BST: left < node < right. Search, insert, delete O(h). Balanced h = floor(log2 n). Skewed h = n−1.",
        "Inorder BST sorted hota hai. Preorder root pehle. Postorder root aakhir.",
        "Heap complete tree. Min-heap parent ≤ children. 0-based: parent floor((i−1)/2), left 2i+1, right 2i+2.",
        "Build heap O(n). Extract O(log n). Height floor(log2 n).",
        "Graph matrix O(V^2), edge check O(1). List O(V+E), edge check O(degree). Undirected edge list mein do baar.",
      ],
    },
  ]),
  sheet("w1-test", "Hafta 1 ka mini test", "practice", at("2026-10-11", ["14:00", "14:40", "17:10"]), [
    {
      h: "40 sawal, 40 minute",
      lines: [
        "Digital Logic, COA, DS. Phone dusre kamre.",
        "Pehle wahi chapter jo subah aaya. 40 second se zyada ek sawal par nahi.",
        "Analysis: topic tag karo, sahi concept ek line. Naya chapter is gap mein nahi.",
        "Kamzor list zyada se zyada teen topics. Kal unhe subah mat kholo, revision hafte mein aayega.",
      ],
    },
  ]),
  sheet("re-nv", "Non-verbal aur differences", "padhai", at("2026-10-11", ["15:40"]), [
    {
      h: "Figure",
      lines: [
        "Rotation clockwise ya anti, kitne degree. Mirror alag hai, rotation nahi.",
        "Pieces kitne badh rahe hain, kaun si side se. Embedded figure: bahar wali shape ke andar dhoondo.",
        "Differences: teen figures ek rule, chautha toot-ta hai. Pehle count, phir shade, phir rotation.",
        "Space visualization: paper fold aur punch. Unfold karke symmetry kheench lo.",
      ],
    },
  ]),
  sheet("ga-w1", "Hafta 1 static mix aur geography", "revision", at("2026-10-11", ["16:25"]), [
    {
      h: "Das minute",
      lines: [
        "Kal ki history timeline se paanch saal. Aaj ke map se paanch jagah.",
        "Jo fact galat hua sirf wahi dohrao. Naya current article nahi.",
      ],
    },
  ]),
  sheet("al-sort", "Search, sort, asymptotic", "padhai", at("2026-10-12", ["06:00", "07:35", "13:00", "22:35"]), [
    {
      h: "Notation",
      lines: [
        "O upper bound. Ω lower bound. Θ tight. Worst-case exam ka default hai jab tak average na likha ho.",
        "Comparison sort ki lower bound Ω(n log n).",
        "Binary search sorted array, about floor(log2 n)+1 comparisons.",
      ],
    },
    {
      h: "Sorting table",
      lines: [
        "Selection, bubble, insertion worst Θ(n^2). Insertion best Θ(n) agar sorted ho.",
        "Merge Θ(n log n) time, O(n) extra, stable.",
        "Heap Θ(n log n), in place, stable nahi.",
        "Quick average Θ(n log n), worst Θ(n^2) jab pivot hamesha kinare ka ho. Stable nahi.",
        "Counting O(n+k), radix O(d(n+k)). Integer range pata ho tab.",
        "Stable: barabar keys ka input order bacha rehta hai. Merge aur insertion stable. Heap, quick, selection nahi.",
      ],
    },
  ]),
  sheet("al-hash", "Hashing", "padhai", at("2026-10-12", ["16:30", "18:50", "20:25"]), [
    {
      h: "Load aur collision",
      lines: [
        "alpha = n/m. n keys, m slots.",
        "Chaining: unsuccessful search about 1+alpha. Successful about 1+alpha/2.",
        "Open addressing alpha 1 ke kareeb degrade. alpha 0.7 se neeche rakhna standard advice hai.",
        "Division method h(k)=k mod m, m prime. Multiplication method bhi MCQ mein naam se aata hai.",
        "Linear probing clustering. Quadratic aur double hashing kam clustering.",
      ],
    },
  ]),
  sheet("ga-eco", "Economy definitions aur economic scene", "padhai", at("2026-10-12", ["20:00"]), [
    {
      h: "Definitions",
      lines: [
        "GDP desh ki boundary ke andar. GNP residents ka, desh ke bahar ki income bhi.",
        "Fiscal deficit = total expenditure − total receipts except borrowing. Revenue deficit = revenue expenditure − revenue receipts.",
        "Repo: RBI banks ko short-term par jis rate par deta hai. Reverse repo ulta. CRR cash ratio. SLR liquid assets.",
        "WPI wholesale. CPI retail, inflation wala common MCQ CPI hi hai jab 'consumer' likha ho.",
        "Plan vs non-plan purana frame hai. Ab revenue aur capital expenditure yaad rakho.",
        "Padosi desh ka trade: SAFTA, current account vs capital account. Current = trade, services, transfers.",
      ],
    },
  ]),
  sheet("re-syl", "Syllogism aur space visualization", "padhai", at("2026-10-12", ["21:50"]), [
    {
      h: "Venn",
      lines: [
        "All A are B: A ka circle B ke andar. Some A are B: overlap. No A are B: alag.",
        "Some not: possibility mat banao jab definite na ho. 'Either or' jab dono complementary hon.",
        "Do statements, conclusion definite ho tabhi yes. Possibility alag option hota hai.",
        "Space visualization: cube color, dice ke opposite faces ka yog aksar 7, jab standard dice ho. Sawal bole to hi maan na.",
      ],
    },
  ]),
  sheet("al-gr", "Greedy", "padhai", at("2026-10-13", ["06:00", "07:35", "13:00"]), [
    {
      h: "Kab greedy sahi hai",
      lines: [
        "Greedy choice abhi best lage, aur optimal substructure ho.",
        "Fractional knapsack: value/weight se sort, fraction allowed. 0/1 knapsack greedy nahi, DP hai.",
        "Activity selection: sab se jaldi khatam hone wali compatible activity.",
        "Huffman: sab se chhote do frequency jodo.",
        "Dijkstra bhi greedy hai, par weights non-negative hon.",
      ],
    },
  ]),
  sheet("al-dp", "DP, divide-and-conquer, Master theorem", "padhai", at("2026-10-13", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Master",
      lines: [
        "T(n)=a T(n/b)+f(n). c = log_b(a).",
        "f = O(n^(c−e)): Theta(n^c). f = Theta(n^c): Theta(n^c log n). f = Omega(n^(c+e)) aur regularity: Theta(f).",
        "Merge sort: a=2, b=2, f=n, c=1, case 2, Theta(n log n).",
        "Binary search: a=1, b=2, f=1, c=0, case 2, Theta(log n).",
      ],
    },
    {
      h: "DP",
      lines: [
        "Overlapping subproblems + optimal substructure. Table bharo, recursion tree mat kaato har baar.",
        "0/1 knapsack: dp[i][w] = max(dp[i−1][w], v_i + dp[i−1][w−w_i]) jab w_i ≤ w.",
        "Fibonacci naive exponential. Table O(n).",
        "Divide-and-conquer: tukda, solve, jodo. Quicksort ka worst split 1 aur n−1 hai.",
        "Aaj raat ek chhota DP table khud bharo: 3 items, capacity 5. Copy se nahi.",
      ],
    },
  ]),
  sheet("ga-day", "Rozmarra science aur polity ke heads", "padhai", at("2026-10-13", ["20:00"]), [
    {
      h: "Science jo padhe-likhe se expect hai",
      lines: [
        "Photosynthesis carbon dioxide + water, light, glucose + oxygen. Chlorophyll.",
        "Vaccine antigen ya uska hissa. Antibiotic bacteria par, virus par nahi.",
        "pH 7 neutral, neeche acid, upar base. Vitamin C ascorbic, D bone, B12 cobalt.",
        "Current ka unit ampere, resistance ohm, power watt. P=VI.",
      ],
    },
    {
      h: "Polity, ek page",
      lines: [
        "Lok Sabha 5 saal, Rajya Sabha permanent, member 6 saal, ek-tihai retire.",
        "Money bill sirf Lok Sabha. President assent. PM Lok Sabha ka leader in practice.",
        "Fundamental rights Part III. DPSP Part IV, court enforce nahi. Fundamental duties 51A.",
        "Article 32 Supreme Court, 226 High Court. Basic structure kesavananda.",
      ],
    },
  ]),
  sheet("re-blood", "Blood relation aur problem-solving", "padhai", at("2026-10-13", ["21:50"]), [
    {
      h: "Generation",
      lines: [
        "Ek generation ek row. Khud ko centre. Maa-baap upar, bachche neeche, bhai-behen same row.",
        "'Meri maa ka bhai' mama. 'Meri bahan ka beta' bhanja. Gender tab tak mat maan jab sentence na de.",
        "Problem-solving: diya hua data kaun se option ko impossible banata hai, pehle wahi kaato.",
        "Agar do arrangement possible hon to 'cannot be determined'.",
      ],
    },
  ]),
  sheet("al-bfs", "BFS aur DFS", "padhai", at("2026-10-14", ["06:00", "07:35", "13:00"]), [
    {
      h: "Traversal",
      lines: [
        "List par time O(V+E). Matrix par O(V^2).",
        "BFS queue. Unweighted graph mein source se kam se kam edges ka path.",
        "DFS stack ya recursion. Finish time topological sort ke liye.",
        "Connected components undirected mein DFS/BFS se ginte hain.",
        "Tree edges, back edges. Directed mein back edge cycle batata hai.",
      ],
    },
  ]),
  sheet("al-mst", "MST, shortest path, topo", "padhai", at("2026-10-14", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Algorithms",
      lines: [
        "MST: V−1 edges, koi cycle nahi, total weight minimum. Negative weight allowed. 'Negative cycle' MST ka concept nahi.",
        "Kruskal: edges sort, cycle na bane to jodo, O(E log E). Union-find.",
        "Prim: ek tree badhao, O(E log V) heap se. Cut property: cut ki sab se halki edge kisi MST mein hai.",
        "Dijkstra: weights ≥ 0. Heap O((V+E) log V). Settled node dubara mat kholo.",
        "Bellman-Ford: V−1 baar saari edges relax, O(VE). Ek aur pass par change ho to negative cycle.",
        "Floyd: har intermediate k, O(V^3). Negative edge chalega, negative cycle nahi.",
        "Topological sort sirf DAG. DFS decreasing finish time, ya indegree zero queue.",
      ],
    },
  ]),
  sheet("ga-cur", "Current aur scientific research", "padhai", at("2026-10-14", ["20:00"]), [
    {
      h: "Tarika",
      lines: [
        "Is mahine Nobel, ISRO, RBI rate, budget headline, padosi desh ka election. Paanch heading, detail nahi.",
        "Scientific research MCQ: institution + discovery ka pair. DRDO, ISRO, CSIR, ICMR ke naam.",
        "Jo headline 15 din purani ho use chhodo. Roz 8 facts, error copy ke ant mein.",
      ],
    },
  ]),
  sheet("re-seat", "Linear seating aur analysis", "padhai", at("2026-10-14", ["21:50"]), [
    {
      h: "Arrangement",
      lines: [
        "Line: left-right facing pe depend. 'A ke left' uske apne left, jab tak 'as we see' na ho.",
        "Circle: centre ki taraf face kar rahe hon to right anti-clockwise hota hai. Sketch banao.",
        "Analysis: statement ko fact aur assumption alag karo. Fact diya hua hai. Assumption beech ka jump.",
        "Pehli pakki position fix karo, phir possibilities kam karo. Do case board par, dimagh mein nahi.",
      ],
    },
  ]),
  sheet("os-proc", "Process, thread, IPC", "padhai", at("2026-10-15", ["06:00", "07:35", "13:00"]), [
    {
      h: "Process",
      lines: [
        "Process program in execution. PCB: pid, state, PC, registers, memory map, open files.",
        "States: new, ready, running, waiting, terminated. Ready queue scheduler uthata hai.",
        "System call user mode se kernel mode. Fork naya process. Exec image badalta hai. Wait child ka exit.",
        "Thread: same address space, alag stack aur registers. Process switch mehnga, thread switch sasta.",
        "User thread library. Kernel thread OS dekhta hai.",
      ],
    },
    {
      h: "IPC",
      lines: [
        "Pipe: related processes, byte stream. Named pipe unrelated bhi.",
        "Message queue, shared memory sab se tez IPC, synchronization alag se chahiye.",
        "Socket alag machines. Signal async notification.",
      ],
    },
  ]),
  sheet("os-dead", "Semaphore, deadlock, Banker", "padhai", at("2026-10-15", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Sync",
      lines: [
        "Race: result timing pe depend kare. Critical section ek time par ek process.",
        "Mutex lock. Semaphore: wait (P) S−1, signal (V) S+1. Binary 0/1. Counting pool.",
        "Busy wait spinlock. Blocking semaphore sleep karta hai.",
        "Producer-consumer, readers-writers, dining philosophers classic MCQ naam hain.",
      ],
    },
    {
      h: "Deadlock",
      lines: [
        "Chaar saath: mutual exclusion, hold and wait, no preemption, circular wait. Ek tod do to deadlock nahi banta.",
        "Prevention inme se ek condition hatata hai. Avoidance Banker's. Detection graph + recovery.",
        "Need = Max − Allocation. Work = Available. Jis process ka Need ≤ Work use chuno, phir Work += Allocation.",
        "Safe state deadlock abhi nahi. Unsafe matlab abhi deadlock nahi, ho sakta hai.",
        "Aaj raat chaar conditions ek line mein error copy.",
      ],
    },
  ]),
  sheet("ga-parl", "Parliament, emergency, pados", "padhai", at("2026-10-15", ["20:00"]), [
    {
      h: "Polity",
      lines: [
        "Article 352 national emergency. 356 President's rule state. 360 financial.",
        "Speaker Lok Sabha. Chairman of Rajya Sabha Vice President.",
        "Amendment 368. Basic structure parliament bhi nahi tod sakti.",
        "Pados: Nepal Hindu-majority republic, Bangladesh 1971, Sri Lanka Palk strait, Bhutan treaty, Myanmar east.",
        "Judgment type sawal kal reasoning mein hai. Yahan fact yaad karo, opinion nahi.",
      ],
    },
  ]),
  sheet("re-ineq", "Inequality aur judgment", "padhai", at("2026-10-15", ["21:50"]), [
    {
      h: "Symbols",
      lines: [
        "A > B > C se A > C definite. A > B < C se A aur C ka relation nahi.",
        "Either-or jab dono conclusions ek hi pair par opposite hon aur koi definite na ho.",
        "Judgment: statement ke baad course of action practical ho, extreme na ho, problem se seedha jude.",
        "Decision-making kal aayega. Aaj sirf symbol chain aur ek judgment set.",
      ],
    },
  ]),
  sheet("os-mem", "Paging, virtual memory, files", "padhai", at("2026-10-16", ["06:00", "07:35", "13:00"]), [
    {
      h: "Address",
      lines: [
        "Offset bits = log2(page size). Logical pages = address space / page size. Frames = RAM / page size.",
        "Page aur frame same size. Page table page number ko frame number batata hai.",
        "TLB hit: EAT = h·(TLB+mem) + (1−h)·(TLB+2·mem) single-level table. Miss par page table + data.",
        "Page fault: EAT = (1−p)·ma + p·service. Service mein disk hai, yahi cost hai.",
        "Internal fragment paging ki aakhri page. External segment ke beech ke holes. Compaction segmentation mein.",
      ],
    },
    {
      h: "Replacement aur file",
      lines: [
        "FIFO Belady: frames badhao to faults kabhi badh sakte hain. LRU least recently used. Optimal future dekhta hai, online nahi.",
        "Thrashing: page faults itne ki CPU kaam na kare. Working set.",
        "Contiguous file: direct, external fragment. Linked: sequential, random slow. Indexed: index block, random, ek extra read.",
        "Inode: direct, single, double, triple indirect.",
      ],
    },
  ]),
  sheet("os-gantt", "Scheduling numbers aur page faults", "practice", at("2026-10-16", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Formula",
      lines: [
        "TAT = completion − arrival. Waiting = TAT − burst. Response = pehli baar CPU − arrival.",
        "CPU utilization = busy / total. Throughput = jobs / time.",
        "FCFS convoy. SJF average waiting kam jab saare ek saath aayein, non-preemptive. SRTF preemptive SJF.",
        "RR quantum q. q chhota to context switch zyada. q bada to FCFS jaisa.",
        "Priority starvation, aging waiting job ki priority badhati hai.",
        "Gantt: arrival order mat banao jab SJF ho. Ready queue har time par dekho.",
        "Page reference string par FIFO, LRU khud table banao. Optimal ko answer key samjho.",
      ],
    },
  ]),
  sheet("ga-1857", "Aadhunik Bharat ke saal aur current", "padhai", at("2026-10-16", ["20:00"]), [
    {
      h: "Saal",
      lines: [
        "1757 Plassey. 1857 revolt. 1885 INC. 1905 Bengal partition, 1911 cancel aur capital Delhi.",
        "1919 Rowlatt aur Jallianwala. 1920 non-cooperation. 1930 civil disobedience, salt. 1931 Gandhi-Irwin.",
        "1942 Quit India. 1946 cabinet mission. 1947 independence. 1950 republic 26 January.",
        "Current: aaj ki 8 headings. Scheme ka naam + ministry, detail nahi.",
      ],
    },
  ]),
  sheet("re-puz", "Puzzle aur decision-making", "padhai", at("2026-10-16", ["21:50"]), [
    {
      h: "Do case",
      lines: [
        "Floor, month, ya box puzzle: ek pakki position, phir do case. Teesra case banne se pehle pehla case kaato.",
        "Decision-making: diya hua rule follow karo, apna moral nahi. 'Data inadequate' tab jab rule decide na kare.",
        "Do chhote set. Ek set 8 minute se zyada nahi.",
      ],
    },
  ]),
  sheet(
    "db-er",
    "ER, keys, relational algebra",
    "padhai",
    [...at("2026-10-17", ["07:00", "09:30"], false), ...at("2026-10-17", ["06:00", "07:35", "13:00"], true)],
    [
      {
        h: "ER",
        lines: [
          "Entity set, attribute, relationship. Key attribute unique. Weak entity apni key owner ki key ke saath.",
          "Cardinality 1:1, 1:N, M:N. Participation total (double line) ya partial.",
          "Composite attribute toot sakta hai. Multivalued double ellipse. Derived dashed.",
        ],
      },
      {
        h: "Keys aur algebra",
        lines: [
          "Superkey unique. Candidate minimal superkey. Primary ek chosen candidate. Foreign key kisi candidate ko point karti hai.",
          "Prime attribute kisi candidate key ka hissa.",
          "sigma rows. pi columns, duplicate hat-te hain. rho rename. union, minus, cartesian.",
          "Join = cartesian phir select, phir duplicate column hatao natural join mein.",
          "Tuple calculus { t | predicate }. Domain calculus variables domain se.",
        ],
      },
    ],
  ),
  sheet(
    "db-sql",
    "SQL output",
    "practice",
    [...at("2026-10-17", ["14:30", "17:00", "18:40"], false), ...at("2026-10-17", ["16:30", "18:50", "20:25", "22:35"], true)],
    [
      {
        h: "Order",
        lines: [
          "FROM, WHERE (rows), GROUP BY, HAVING (groups), SELECT, ORDER BY.",
          "WHERE mein aggregate nahi. HAVING mein aggregate.",
          "SELECT mein jo column aggregate nahi, wo GROUP BY mein hona chahiye.",
          "COUNT(*) rows. COUNT(col) NULL chhodta hai. COUNT(DISTINCT col) unique.",
          "NULL comparison = se nahi, IS NULL. NULL kisi aggregate sum mein skip.",
          "INNER join match. LEFT join left ki saari rows, match na ho to NULL.",
          "Nested query: IN, EXISTS. Correlated subquery bahar wali row use karti hai.",
          "Galat query ko dubara chalao: pehle FROM ki table, phir WHERE ki bachi rows gino.",
        ],
      },
    ],
  ),
  sheet(
    "re-clock",
    "Clock, calendar, visual memory",
    "padhai",
    [...at("2026-10-17", ["11:30"], false), ...at("2026-10-17", ["21:50"], true)],
    [
      {
        h: "Time",
        lines: [
          "Minute hand 6 degree per minute. Hour hand 0.5 degree per minute. 30 degree per hour.",
          "Angle = |30H − 5.5M|. 5.5 isliye kyunki minute hand bhi hour hand ko aage chhodta hai.",
          "Odd days: 400 years 0, 100 years 5, 4 years 5, ordinary year 1, leap 2.",
          "Visual memory: 10 second figure dekho, band karke count aur position bolo. Aaj yahi drill.",
        ],
      },
    ],
  ),
  sheet(
    "ga-cult",
    "Kala, sanskriti, environment",
    "padhai",
    [...at("2026-10-17", ["16:30"], false), ...at("2026-10-17", ["20:00"], true)],
    [
      {
        h: "Yaad",
        lines: [
          "Dance, UNESCO site, fair: state ke saath pair. Das se zyada naya mat jodo.",
          "Environment: BOD high matlab organic pollution. Eutrophication nutrient se algae.",
          "Ozone stratosphere protect. Troposphere wala ozone pollutant.",
          "Food chain energy 10% next level, Lindeman ka rough MCQ number.",
          "Society: scheme ka laabh kis group ko. Naam + beneficiary ek line.",
        ],
      },
    ],
  ),
  sheet("db-nf", "Normal forms, index, transaction", "padhai", at("2026-10-18", ["08:00", "10:20"]), [
    {
      h: "Forms",
      lines: [
        "1NF atomic values, repeating group nahi.",
        "2NF: candidate key ke proper part se non-prime depend na kare. Partial dependency nahi.",
        "3NF: X→A ho to X superkey ho ya A prime. Transitive dependency of non-prime nahi.",
        "BCNF: har nontrivial X→A mein X superkey. BCNF implies 3NF. Ulta zaruri nahi.",
        "Lossless do hisse: R1 ∩ R2 kisi ek ki key ho.",
        "Dependency preserving alag test hai. Lossless aur preserving dono ho sakte hain, ek bhi ho sakta hai.",
      ],
    },
    {
      h: "Index aur txn",
      lines: [
        "Dense har record. Sparse har block, file ordered honi chahiye.",
        "B+ tree: data sirf leaves, leaves linked, range query leaf chain. Search O(log n).",
        "ACID: atomic all-or-nothing, consistent constraints, isolated serial jaisa asar, durable commit crash ke baad.",
        "Conflict: do transactions, same item, kam se kam ek write. Precedence graph mein cycle nahi to conflict serializable.",
        "Conflict serializable implies view serializable. Ulta nahi.",
        "2PL: pehle sirf lock, phir sirf unlock. Strict 2PL exclusive locks commit tak. Deadlock ab bhi ho sakta hai.",
      ],
    },
  ]),
  sheet("w2-test", "Hafta 2 sectional", "practice", at("2026-10-18", ["14:00", "15:00", "17:15"]), [
    {
      h: "50 sawal, 60 minute",
      lines: [
        "Algo, OS, DBMS. Galat par −1 maan kar chhodo. Andaza mehnga hai.",
        "Analysis topic-wise. 50% se neeche wale teen topics kal subah nahi, 27–28 Oct ko.",
        "Agle hafte CN. Aaj naya subnet mat shuru karna.",
      ],
    },
  ]),
  sheet("re-fig", "Figure classification aur discrimination", "padhai", at("2026-10-18", ["15:50"]), [
    {
      h: "Odd figure",
      lines: [
        "Rotation, reflection, number of lines, shading, dots. Ek property sab par lagao.",
        "Discrimination: do milte figures mein farq. Pehle outline, phir andar ka mark.",
        "Jo property teen par fit ho aur ek par na ho, wahi answer.",
      ],
    },
  ]),
  sheet("ga-w2", "Static mix aur everyday science", "revision", at("2026-10-18", ["16:30"]), [
    {
      h: "Bees facts",
      lines: [
        "Polity ke articles jo is hafte likhe. History ke paanch saal. Economy ke chaar deficit words.",
        "Everyday science: unit, vitamin, pH. Naya chapter nahi.",
      ],
    },
  ]),
  sheet("cn-lay", "OSI, TCP/IP, switching, delay", "padhai", at("2026-10-19", ["06:00", "07:35", "13:00"]), [
    {
      h: "Layers",
      lines: [
        "OSI 7: physical, data link, network, transport, session, presentation, application.",
        "TCP/IP: link, internet, transport, application. Session aur presentation alag layer nahi.",
        "Packet switching: store and forward, share. Circuit: dedicated path. Virtual circuit: path setup, packets usi par.",
      ],
    },
    {
      h: "Delay",
      lines: [
        "Transmission = L/R bits over bps. Propagation = d/v. Queue aur processing alag.",
        "a = Tp/Tt. Stop-and-wait utilization = 1/(1+2a).",
        "Sliding window: W < 1+2a ho to U = W/(1+2a), warna 1.",
        "Nyquist noiseless C = 2 B log2(M). Shannon C = B log2(1+S/N). dB ho to ratio = 10^(dB/10).",
      ],
    },
  ]),
  sheet("cn-crc", "Framing, CRC, Ethernet", "padhai", at("2026-10-19", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Link",
      lines: [
        "Framing: sentinel flags, byte stuffing, bit stuffing (five 1 ke baad 0).",
        "Hamming distance d: detect d−1, correct floor((d−1)/2). Parity detect 1, correct 0.",
        "CRC: polynomial division ka remainder. Receiver par remainder 0 to detected error nahi. Correction nahi.",
        "CRC steps: data ke baad generator degree jitne 0, divide, remainder append.",
        "Ethernet: CSMA/CD classic, MTU 1500. Switch learning bridge, flooding unknown, STP loop todta hai.",
        "MAC address link local. IP network layer.",
      ],
    },
  ]),
  sheet("ga-place", "Jagah aur observation", "padhai", at("2026-10-19", ["20:00"]), [
    {
      h: "Facts",
      lines: [
        "National park, dam, river, port: state pair. Das pair, map wale din se jod kar.",
        "Observation: diagram mein kya badla. Count pehle, phir position.",
        "Padosi capital aur strait ek aur baar: Palk, Duncan (India-related MCQ carefully), Malacca trade route.",
      ],
    },
  ]),
  sheet("re-ana", "Analogy set", "practice", at("2026-10-19", ["21:50"]), [
    {
      h: "Relation",
      lines: [
        "Word : word ka relation likho: synonym, worker-tool, part-whole, cause, place, degree.",
        "Number analogy: square, cube, ×n±k. Letter analogy: +1 shift ya opposite.",
        "Naya set. Purana pattern force mat karo agar fit na ho.",
      ],
    },
  ]),
  sheet("cn-route", "Routing", "padhai", at("2026-10-20", ["06:00", "07:35", "13:00"]), [
    {
      h: "Protocols",
      lines: [
        "Flooding: har neighbour ko, duplicate. Robust, mehnga.",
        "Distance vector: Bellman-Ford, poora vector. Count-to-infinity. Split horizon aur poison reverse kuch loops kaatte hain, sab nahi.",
        "Link state: link flood, phir har router Dijkstra. OSPF isi family.",
        "RIP distance vector. OSPF link state. BGP autonomous systems ke beech.",
        "Shortest path link weight pe. Hop count alag metric ho sakti hai.",
      ],
    },
  ]),
  sheet("cn-sub", "IPv4, CIDR, fragment, NAT", "practice", at("2026-10-20", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Numbers",
      lines: [
        "Prefix /p : network bits p, host bits 32−p. Usable hosts = 2^(32−p) − 2. /31 aur /32 par yeh −2 rule mat lagana.",
        "Mask: p ones. Interesting octet ka block = 256 / 2^(us octet ke ones).",
        "/26 ka fourth octet block 64. Network address host bits zero. Broadcast host bits one.",
        "Fragment offset 8-byte units. Byte offset = field × 8. MF=1 matlab aur fragment. Identification same datagram.",
        "IPv4 header minimum 20, maximum 60. Total length header sahit.",
        "Private: 10/8, 172.16/12, 192.168/16. NAT private source ko public table se badalta hai.",
        "ARP IP se MAC, local link. DHCP IP deta hai, ports 67/68. ICMP error aur echo.",
        "Do subnet bina notes: /26 aur /27 ek baar khud. Phir match karo.",
      ],
    },
  ]),
  sheet("ga-yoj", "Yojana aur mantralay", "padhai", at("2026-10-20", ["20:00"]), [
    {
      h: "Pair",
      lines: [
        "Scheme ka naam + kaun sa ministry + kiske liye. Das pair is mahine ke.",
        "Relationship concepts kal reasoning mein hain. Yahan sirf fact.",
        "Purani scheme ka naya naam ho to naya naam likho.",
      ],
    },
  ]),
  sheet("re-code2", "Coding naya pattern aur relationship", "practice", at("2026-10-20", ["21:50"]), [
    {
      h: "Pattern",
      lines: [
        "Purana +1 force mat karo. Reverse, position sum, first-last swap, vowel count.",
        "Relationship: family sketch phir se. 'Wife of brother' bhabhi. Generation row same rakho.",
        "20 second. Pattern na aaye to aage.",
      ],
    },
  ]),
  sheet("cn-tcp", "UDP, TCP, congestion, sockets", "padhai", at("2026-10-21", ["06:00", "07:35", "13:00"]), [
    {
      h: "Transport",
      lines: [
        "UDP: connection nahi, retransmission nahi, congestion window nahi. Header chhota. DNS, streaming.",
        "TCP: connection, byte sequence, ack = next expected byte, receiver window.",
        "Socket ek end (IP, port). Connection do sockets ka pair.",
        "Flow control receiver window, receiver na bhare. Congestion cwnd, network na bhare.",
        "Send window = min(receiver window, cwnd).",
        "Slow start cwnd har RTT double, ssthresh tak. Phir +1 MSS per RTT.",
        "Timeout: ssthresh = cwnd/2, cwnd = 1. Reno triple duplicate ACK: fast retransmit, cwnd aadha, fast recovery. Tahoe har loss par cwnd 1.",
      ],
    },
  ]),
  sheet("cn-app", "DNS, SMTP, HTTP, FTP", "padhai", at("2026-10-21", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Ports aur farq",
      lines: [
        "DNS 53, zyada tar UDP, badi reply TCP. DHCP 67/68. HTTP 80. HTTPS 443. SMTP 25 mail bhejna. FTP 21 control, 20 data.",
        "HTTP stateless. Cookie state lagata hai. GET read, POST body.",
        "SMTP push karta hai. POP/IMAP user mailbox se let-ta hai. Email application layer.",
        "TCP vs UDP chhe point: connection, reliability, order, congestion, header, use.",
        "Mix CN: delay, subnet, port ek hi set mein aayenge. Formula sheet band karke teen number bolo.",
      ],
    },
  ]),
  sheet("ga-sci", "Science GK chhota", "padhai", at("2026-10-21", ["20:00"]), [
    {
      h: "Units aur body",
      lines: [
        "Speed of light 3×10^8 m/s MCQ order. Sound air mein kam, solid mein zyada.",
        "Blood: RBC oxygen, WBC defence, platelets clot. Haemoglobin iron.",
        "Acid rain SO2 NOx. Greenhouse CO2, methane. CFC ozone.",
        "Arithmetical reasoning agle slot mein hai. Yahan fact.",
      ],
    },
  ]),
  sheet("re-stmt", "Statement-conclusion aur arithmetical reasoning", "padhai", at("2026-10-21", ["21:50"]), [
    {
      h: "Logic",
      lines: [
        "Conclusion statement ke bahar naya fact na laye. 'All' se 'some' nikal sakta hai jab set khali na ho, exam ke rules padho.",
        "Arithmetical reasoning: age, ratio, work. Equation likho. 40 second se zyada calculation ho to option se reverse check.",
        "Statement-assumption: assumption zaroori ho tab hi. Desirable alag cheez hai.",
      ],
    },
  ]),
  sheet("toc-re", "Regex, DFA, NFA", "padhai", at("2026-10-22", ["06:00", "07:35", "13:00"]), [
    {
      h: "Automata",
      lines: [
        "DFA: har state, har symbol par exactly ek move. NFA: set of moves, ya empty.",
        "Regex, NFA, DFA same class: regular languages.",
        "Subset construction NFA se DFA. Ek DFA state ek set of NFA states.",
        "Minimize DFA: distinguishable pairs.",
        "Regular nahi: { a^n b^n }. Pumping se 'not regular' prove. Regular hone ka proof pumping se nahi.",
        "Pump: |w|≥p, w=xyz, |xy|≤p, |y|≥1, har k par xy^k z language mein.",
      ],
    },
  ]),
  sheet("toc-tm", "CFG, PDA, TM, decidability", "padhai", at("2026-10-22", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Upar ki class",
      lines: [
        "CFG (V, Σ, R, S). Parse tree. Ambiguous: do leftmost derivation ya do trees.",
        "Har CFL ka PDA hota hai. Pump CFL: uvxyz, |vxy|≤p, |vy|≥1, dono v aur y saath pump.",
        "Type 3 regular, type 2 CF, type 1 context-sensitive, type 0 unrestricted TM.",
        "Decidable: har input par halt, haan ya na. Recognizable: haan par halt, na par loop ho sakta hai.",
        "Halting problem recognizable aur undecidable.",
        "Char class ka ek example error copy: regular, CFL not regular, CSL, undecidable.",
      ],
    },
  ]),
  sheet("ga-body", "Sanvaidhanik nikay", "padhai", at("2026-10-22", ["20:00"]), [
    {
      h: "Bodies",
      lines: [
        "Election Commission, CAG, UPSC, Finance Commission Article 280, Attorney General.",
        "Lokpal, NHRC statutory ya constitutional? Constitutional bodies alag list. EC aur CAG constitutional.",
        "Verbal classification agle slot. Yahan sirf naam aur kaam.",
      ],
    },
  ]),
  sheet("re-series", "Number series aur verbal classification", "padhai", at("2026-10-22", ["21:50"]), [
    {
      h: "Series",
      lines: [
        "Pehle difference, phir second difference, phir alternate terms, phir ×n±k, phir n^2±k.",
        "Do series interleaved hon to odd-even alag.",
        "Verbal classification: teen ek category (city, prime, synonym), ek odd.",
      ],
    },
  ]),
  sheet("cd-lex", "Lex, parse, phases", "padhai", at("2026-10-23", ["06:00", "07:35", "13:00"]), [
    {
      h: "Pipeline of compiler",
      lines: [
        "Lex tokens. Parse tree. Semantic types. IR. Optimize. Code gen. Symbol table sab phases.",
        "Lexeme se token: keyword, identifier, number, operator.",
        "Top-down LL. Bottom-up shift-reduce LR family.",
        "Syntax-directed translation: production ke saath semantic rule.",
        "Runtime: activation record mein locals, parameters, return, control link. Stack frames.",
      ],
    },
  ]),
  sheet("cd-ff", "FIRST, FOLLOW, dataflow", "padhai", at("2026-10-23", ["16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "LL(1)",
      lines: [
        "FIRST(X): jo terminals X se shuru ho sakte hain. X ⇒* ε ho to ε FIRST mein.",
        "FOLLOW(A): A ke turant baad ka terminal. Start ke FOLLOW mein $.",
        "A → α | β. FIRST(α) aur FIRST(β) alag. α nullable ho to FIRST(β) aur FOLLOW(A) alag.",
        "Shift/reduce aur reduce/reduce conflict. Grammar LL(1) na ho to bhi language kisi aur grammar se ho sakti hai.",
      ],
    },
    {
      h: "IR aur optimize",
      lines: [
        "Three-address: x = y op z, ek operator.",
        "Constant propagation: saari reaching definitions ek hi constant.",
        "Liveness: aage use ho, beech mein naya definition na aaye.",
        "CSE: wahi expression, operands beech mein badle nahi.",
        "Aaj ek chhota grammar FIRST/FOLLOW khud. Teen productions kaafi.",
      ],
    },
  ]),
  sheet("ga-pol2", "Polity ek page revise", "revision", at("2026-10-23", ["20:00"]), [
    {
      h: "Dobara",
      lines: [
        "Rights, DPSP, duties. 352, 356, 32, 226, 368.",
        "Lok Sabha vs Rajya Sabha money bill.",
        "Figure classification agle slot mein. Yahan polity.",
      ],
    },
  ]),
  sheet("re-mix1", "Direction, blood, figure classification", "revision", at("2026-10-23", ["21:50"]), [
    {
      h: "Mix",
      lines: [
        "Direction sketch. Blood generation row. Figure odd-one property.",
        "Teen type, 8-8 sawal. Naya theory nahi.",
      ],
    },
  ]),
  sheet(
    "ma-disc",
    "Discrete: logic, sets, groups, counting",
    "padhai",
    [...at("2026-10-24", ["07:00", "09:30"], false), ...at("2026-10-24", ["06:00", "07:35", "13:00"], true)],
    [
      {
        h: "Logic aur sets",
        lines: [
          "p→q ≡ ¬p ∨ q. Contrapositive ¬q→¬p same. Converse q→p same nahi.",
          "|A∪B| = |A|+|B|−|A∩B|. Teen sets: singles jodo, pairs ghatao, triple jodo.",
          "De Morgan sets: (A∪B)' = A'∩B'.",
          "Function: har element ka exactly ek image. Injective 1-1. Surjective onto. Bijective dono.",
        ],
      },
      {
        h: "Order, group, graph, count",
        lines: [
          "Equivalence: reflexive, symmetric, transitive. Partial order: reflexive, antisymmetric, transitive.",
          "Lattice: har pair ka join aur meet.",
          "Monoid: closure, associative, identity. Group: monoid + inverse. Abelian commutative. Lagrange: subgroup order |G| ko divide karta hai.",
          "Sum of degrees = 2|E|. Odd-degree vertices even count. Tree: connected, |E|=|V|−1. Kn edges n(n−1)/2. Bipartite iff no odd cycle.",
          "nPr = n!/(n−r)!. nCr = n!/(r!(n−r)!). Geometric sum a(r^n−1)/(r−1), r≠1.",
          "Linear recurrence: characteristic equation. Generating function A(x)=Σ a_n x^n.",
          "Matching: edges share vertex nahi. Colouring: adjacent alag colour. Bipartite chromatic ≤ 2.",
        ],
      },
    ],
  ),
  sheet(
    "ma-la",
    "Matrices, eigen, LU",
    "padhai",
    [...at("2026-10-24", ["14:30", "16:45", "18:15"], false), ...at("2026-10-24", ["16:30", "18:50", "20:25", "22:35"], true)],
    [
      {
        h: "Linear algebra",
        lines: [
          "det(AB)=det(A)det(B). det(A^T)=det(A). det(cA)=c^n det(A). Inverse iff det ≠ 0.",
          "(AB)^(−1)=B^(−1)A^(−1).",
          "Av=λv, v≠0. det(A−λI)=0. Trace = eigenvalues ka yog. det = product.",
          "A=LU. Ly=b forward, Ux=y back. Pivot swap ho to PA=LU.",
          "Unique solution rank(A)=rank([A|b])=n. Infinite ranks equal aur < n. Koi nahi agar rank(A) < rank(augmented).",
          "Rank nonzero echelon rows. Rank + nullity = columns.",
        ],
      },
    ],
  ),
  sheet(
    "re-puz2",
    "Puzzle aur number series",
    "practice",
    [...at("2026-10-24", ["11:15"], false), ...at("2026-10-24", ["21:50"], true)],
    [
      {
        h: "Ek set",
        lines: [
          "Ek puzzle poora, do case. Series ke paanch sawal: difference phir square.",
          "Abstract symbols kal hain. Aaj arithmetic series.",
        ],
      },
    ],
  ),
  sheet(
    "ga-eco2",
    "Economy current",
    "revision",
    [...at("2026-10-24", ["16:15"], false), ...at("2026-10-24", ["20:00"], true)],
    [
      {
        h: "Dobara",
        lines: [
          "GDP, repo, fiscal deficit, CPI. Is hafte ki teen economic headings.",
          "Nayi theory nahi.",
        ],
      },
    ],
  ),
  sheet("ma-calc", "Limits, MVT, integration", "padhai", at("2026-10-25", ["08:00"]), [
    {
      h: "Calculus MCQ",
      lines: [
        "sin x / x → 1 jab x→0. (1+1/n)^n → e. (1+x)^(1/x) → e.",
        "Differentiable implies continuous. Ulta nahi. |x| at 0 continuous, derivative nahi.",
        "(uv)'=u'v+uv'. (u/v)'=(u'v−uv')/v^2. Chain dy/dx = dy/du · du/dx.",
        "x^n → n x^(n−1). e^x → e^x. ln x → 1/x. sin→cos. cos→−sin.",
        "Rolle: f(a)=f(b) to kisi c par f'(c)=0. MVT: f'(c)=(f(b)−f(a))/(b−a).",
        "Local max: f'=0 aur f''<0. Min: f''>0. f''=0 ho to test fail, sign of f' dekho.",
        "∫ x^n = x^(n+1)/(n+1), n≠−1. ∫ dx/x = ln|x|. Parts: ∫u dv = uv − ∫v du.",
      ],
    },
  ]),
  sheet("ma-pr", "Probability aur distributions", "padhai", at("2026-10-25", ["09:30", "10:50", "17:20"]), [
    {
      h: "Rules",
      lines: [
        "P(A|B)=P(A and B)/P(B). Independent ho to P(A|B)=P(A).",
        "Bayes: P(A|B)=P(B|A)P(A)/P(B). P(B)=Σ P(B|Ai)P(Ai).",
        "E[X]=Σ x p(x). Var=E[X^2]−(E[X])^2. SD=sqrt(Var).",
        "Median ordered list ka beech. Mode sab se frequent.",
        "Binomial: C(n,k) p^k (1−p)^(n−k). Mean np. Var np(1−p).",
        "Poisson: e^(−λ) λ^k / k!. Mean=var=λ. Rare events, λ=np binomial limit.",
        "Uniform [a,b]: mean (a+b)/2, var (b−a)^2/12.",
        "Exponential mean 1/λ, var 1/λ^2, memoryless. pdf λ e^(−λx).",
        "Normal z=(x−μ)/σ. Standard μ=0, σ=1.",
      ],
    },
  ]),
  sheet("w3-test", "Hafta 3 sectional", "practice", at("2026-10-25", ["14:00", "15:00"]), [
    {
      h: "50 sawal, 60 minute",
      lines: [
        "CN, TOC, Compiler, Maths. −1 maan kar.",
        "Analysis ke baad distribution sheet band karke dohrao, wahi 17:20.",
      ],
    },
  ]),
  sheet("re-abs", "Non-verbal aur abstract symbols", "padhai", at("2026-10-25", ["15:50"]), [
    {
      h: "Symbols",
      lines: [
        "Symbol ka relation: pehla figure doosre mein kaise badla, wahi teesre par.",
        "Abstract: letter ko number, operator ka matlab badla hua ho to naya matlab lagao, purana arithmetic nahi.",
        "Non-verbal sectional: rotation aur mirror alag rakhna.",
      ],
    },
  ]),
  sheet("ga-w3", "Static 20", "revision", at("2026-10-25", ["16:35"]), [
    {
      h: "Mix",
      lines: [
        "Polity 5, history 5, geo 5, economy 5. Galat waale pehle.",
      ],
    },
  ]),
  sheet("rv-d1", "Revision: Digital Logic, COA, DS", "revision", at("2026-10-26", ["06:00", "07:35", "13:00", "16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Band karke bolo",
      lines: [
        "De Morgan dono. JK, D, T next state. 2's complement steps. IEEE bias 127.",
        "Addressing: immediate, direct, indirect, indexed, PC-relative ek example each.",
        "Pipeline speedup badi n par k. AMAT formula. Cache offset, index, tag.",
        "Interrupt vs DMA ek line. Row-major address. Stack vs queue. BST inorder. Heap parent index.",
        "Jo na aaye use star. Subah ke 30 MCQ unhi se. Naya chapter band hai.",
        "Arithmetical computation: do chhote complement aur ek cache numerical khud.",
      ],
    },
  ]),
  sheet("ga-rv1", "Static rapid", "revision", at("2026-10-26", ["20:00"]), [
    {
      h: "15",
      lines: [
        "History saal, map, economy words. Jo 9–16 Oct ko galat hue wahi.",
      ],
    },
  ]),
  sheet("re-rv1", "Reasoning mix aur computation", "revision", at("2026-10-26", ["21:50"]), [
    {
      h: "25",
      lines: [
        "Coding, direction, syllogism, blood. Computation wale do sawal equation se.",
        "Naya type shuru nahi.",
      ],
    },
  ]),
  sheet("rv-d2", "Revision: Algorithms aur OS", "revision", at("2026-10-27", ["06:00", "07:35", "13:00", "16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Band karke bolo",
      lines: [
        "Sort table: worst, stable, extra space. Master ke teen case. 0/1 vs fractional.",
        "Dijkstra kab nahi. Bellman V−1. MST V−1 edges.",
        "TAT, WT, RT. Banker Need. Deadlock ke chaar.",
        "Page offset log2. FIFO Belady. EAT page fault.",
        "Ek Gantt aur ek page string khud. SQL aur subnet kal, aaj unhe mat kholo.",
        "Verbal aur non-verbal dono: ek analogy, ek figure.",
      ],
    },
  ]),
  sheet("ga-rv2", "Static rapid 2", "revision", at("2026-10-27", ["20:00"]), [
    {
      h: "15",
      lines: ["Polity articles aur pados. Kal jaisa, naye facts kam."],
    },
  ]),
  sheet("re-rv2", "Verbal aur non-verbal mix", "revision", at("2026-10-27", ["21:50"]), [
    {
      h: "25",
      lines: ["Analogy, series, figure odd-one, seating. 25 sawal, analysis chhota."],
    },
  ]),
  sheet("rv-d3", "Revision: DBMS aur Networks", "revision", at("2026-10-28", ["06:00", "07:35", "13:00", "16:30", "18:50", "20:25", "22:35"]), [
    {
      h: "Band karke bolo",
      lines: [
        "sigma, pi, join. 3NF vs BCNF ek line. Lossless intersection test.",
        "WHERE phir GROUP BY phir HAVING. COUNT(*) vs COUNT(col).",
        "Conflict graph cycle. Strict 2PL. B+ data leaves mein.",
        "Tt=L/R, Tp=d/v, U=1/(1+2a). Hosts 2^(32−p)−2.",
        "Offset × 8. Ports: 53, 80, 25, 21, 443. TCP timeout cwnd 1.",
        "8 SQL output aur 8 subnet. Analytical functions: statement ko equation banao.",
      ],
    },
  ]),
  sheet("ga-rv3", "Current 15", "revision", at("2026-10-28", ["20:00"]), [
    {
      h: "Headings",
      lines: ["Is mahine ki 15 headings. Scheme + ministry jahan ho."],
    },
  ]),
  sheet("re-rv3", "Analytical functions", "revision", at("2026-10-28", ["21:50"]), [
    {
      h: "25",
      lines: [
        "Statement-conclusion, assumption, course of action.",
        "Naya pattern nahi. Jo mock style mein 40 second se zyada le use chhodo.",
      ],
    },
  ]),
  sheet("rv-d4", "Revision: TOC, Compiler, Maths", "revision", at("2026-10-29", ["06:00", "07:35", "13:00", "16:30", "18:50", "20:25"]), [
    {
      h: "Band karke bolo",
      lines: [
        "DFA vs NFA. Pumping regular |xy|≤p, |y|≥1. CFL pump v aur y saath.",
        "Halting undecidable. LL(1) FIRST disjoint, epsilon par FOLLOW.",
        "Liveness aur CSE ek line.",
        "Bayes, binomial np, Poisson λ, uniform var, eigen det(A−λI)=0, MVT slope.",
        "25 MCQ TOC/Compiler subah practice. 25 Maths raat ko.",
      ],
    },
  ]),
  sheet("ga-rv4", "Polity aur itihaas ek page", "revision", at("2026-10-29", ["20:00"]), [
    {
      h: "Second pass",
      lines: [
        "History timeline, culture dance-state, map rivers, economy four words, polity articles, science units, current 10.",
        "Yahi GA ka second pass hai. Naya source nahi.",
      ],
    },
  ]),
  sheet("re-rv4", "Reasoning second pass", "revision", at("2026-10-29", ["21:50", "22:35"]), [
    {
      h: "Analogy se analytical tak",
      lines: [
        "Har type ka ek sawal: analogy, series, coding, blood, direction, syllogism, seating, figure, statement.",
        "Do page band: jo type do baar galat hua use blacklist. Kal mock.",
      ],
    },
  ]),
  sheet("hy-read", "High-yield sheet, mock se pehle", "yaad", [...at("2026-10-30", ["06:00", "07:20", "13:00", "16:30", "18:50"]), ...at("2026-10-31", ["13:00", "16:30", "18:50"], true)], [
    {
      h: "Sirf yeh lines",
      lines: [
        "De Morgan. JK Q+=JQ'+K'Q. D Q+=D. T toggle. 2's invert+1. Bias 127.",
        "CPU time IC×CPI×cycle. Speedup → k. AMAT. Tag = bits − index − offset.",
        "Master c=log_b a. Dijkstra non-negative. Bellman V−1. MST V−1.",
        "TAT=CT−AT. WT=TAT−BT. Need=Max−Allocation. Offset=log2(page). Fault EAT.",
        "BCNF left side superkey. Lossless intersection key. Conflict graph no cycle.",
        "U=1/(1+2a). Hosts 2^h−2. Shannon B log2(1+S/N). Fragment offset×8.",
        "Pump |y|≥1. LL(1) FIRST/FOLLOW. Bayes. Binomial np. Poisson λ. Eigen det(A−λI)=0.",
        "Naya MCQ sirf subah ke 10 aasaan. Research nahi. Star lagi line chhod do agar 30 second se zyada lage.",
      ],
    },
  ]),
  sheet("mock-ii", "Paper-II kaise dena hai", "practice", at("2026-10-30", ["20:00", "22:00"]), [
    {
      h: "100 sawal, 120 minute, −1",
      lines: [
        "Teen galat ek sahi kha jaate hain. 40 second mein na aaye to chhodo.",
        "Pehle wahi chapter jo revision mein mazboot tha, taaki attempt jude.",
        "OMR jaisa: ek baar chuna. Wapas jaake mat badlo jab tak pakka galat na dikhe.",
        "Khatam hote hi sirf attempt, galat, paanch topics. Poora solution kal.",
      ],
    },
  ]),
  sheet(
    "mock-i",
    "Paper-I kaise dena hai",
    "practice",
    [...at("2026-10-31", ["08:00"], false), ...at("2026-10-31", ["06:00"], true)],
    [
      {
        h: "200 sawal, 120 minute, −0.25",
        lines: [
          "Order: 100 technical, phir 50 reasoning, phir 50 GA. Technical fresh dimaag se.",
          "20 second mein na aaye to mark karke aage. GA mein andaza tabhi jab do options tak simat jaaye.",
          "Duty ho to yeh mock 6:00–8:00, phir office. Solution office mein nahi.",
        ],
      },
    ],
  ),
  sheet(
    "mock-an",
    "Dono mock ka analysis",
    "revision",
    [...at("2026-10-31", ["10:20", "14:30"], false), ...at("2026-10-31", ["08:00", "20:00", "21:20"], true)],
    [
      {
        h: "Char topics",
        lines: [
          "Paper-II aur Paper-I topic-wise sahi/galat.",
          "50% se neeche wale topics, zyada se zyada chaar. Unke galat sawal, sahi concept ek line.",
          "Naya prashna-bank nahi.",
        ],
      },
    ],
  ),
  sheet(
    "mock-end",
    "Blacklist aur do page",
    "yaad",
    [...at("2026-10-31", ["16:30", "17:15", "18:00"], false), ...at("2026-10-31", ["22:20"], true)],
    [
      {
        h: "Band",
        lines: [
          "Reasoning: jo mock mein galat type hue, 25 unhi ke. Naya type nahi.",
          "GA: polity aur current headings, jo fact galat hua pehle.",
          "Do page formula ek baar. Alag se das lines jinhe dobara galat nahi karna.",
          "Iske baad yeh cycle band hai.",
        ],
      },
    ],
  ),
];

const byId = new Map(studySheets.map((item) => [item.id, item]));

export function sheetsForSlot(iso: string, start: string, saturdayDuty: boolean) {
  return studySheets.filter((item) =>
    item.when.some(
      (slot) =>
        slot.iso === iso &&
        slot.start === start &&
        (slot.duty === undefined || slot.duty === saturdayDuty),
    ),
  );
}

export function sheetsOnDay(iso: string, saturdayDuty: boolean) {
  const rows: { sheet: StudySheet; times: string[] }[] = [];
  for (const item of studySheets) {
    const times = [
      ...new Set(
        item.when
          .filter(
            (slot) =>
              slot.iso === iso &&
              (slot.duty === undefined || slot.duty === saturdayDuty),
          )
          .map((slot) => slot.start),
      ),
    ].sort();
    if (times.length > 0) rows.push({ sheet: item, times });
  }
  rows.sort((a, b) => a.times[0].localeCompare(b.times[0]) || a.sheet.title.localeCompare(b.sheet.title));
  return rows;
}

export function sheetById(id: string) {
  return byId.get(id);
}

export const sheetModeLabel: Record<SheetMode, string> = {
  padhai: "Padhai",
  revision: "Revision",
  practice: "Practice",
  yaad: "Yaad",
};

function needsSheet(slot: Slot) {
  return slot.kind !== "job" && slot.kind !== "buffer";
}

function assertStudySheets() {
  const ids = new Set<string>();
  for (const item of studySheets) {
    if (ids.has(item.id)) throw new Error(`Duplicate study sheet ${item.id}`);
    ids.add(item.id);
    if (item.blocks.length === 0) throw new Error(`Empty sheet ${item.id}`);
    if (item.when.length === 0) throw new Error(`Sheet has no time ${item.id}`);
  }
  for (const day of days) {
    const modes = day.dutySlots ? [false, true] : [false];
    for (const duty of modes) {
      for (const slot of slotsFor(day, duty)) {
        if (!needsSheet(slot)) continue;
        const found = sheetsForSlot(day.iso, slot.start, duty);
        if (found.length === 0) {
          throw new Error(`No sheet for ${day.iso} ${slot.start} duty=${duty} ${slot.title}`);
        }
      }
    }
  }
}

assertStudySheets();
