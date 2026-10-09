export type Formula = {
  id: string;
  title: string;
  expr: string;
  note: string;
  kaam: string;
};

export type FormulaSheet = {
  id: string;
  subject: string;
  formulas: Formula[];
};

function f(
  id: string,
  title: string,
  expr: string,
  note: string,
  kaam: string,
): Formula {
  return { id, title, expr, note, kaam };
}

export const formulaSheets: FormulaSheet[] = [
  {
    id: "dl",
    subject: "Digital Logic",
    formulas: [
      f("dl-dm", "De Morgan", "(A+B)' = A'B'    (AB)' = A'+B'", "NAND is OR of complements. NOR is AND of complements.", "Complement ke baad AND aur OR aapas mein badal jaate hain."),
      f("dl-xor", "XOR aur XNOR", "A xor B = A'B + AB'    XNOR = AB + A'B'", "XOR is 1 when bits differ. XNOR is 1 when bits match.", "Bits alag hon to XOR 1. Dono same hon to XNOR 1."),
      f("dl-abs", "Absorption", "A + AB = A    A(A+B) = A    A + A'B = A + B", "Drop the larger product term when one term contains the other.", "Badi term hata do jab chhoti term uske andar ho."),
      f("dl-2s", "2's complement", "Invert every bit, then add 1. Range of n bits: -2^(n-1) .. 2^(n-1)-1", "Unsigned range is 0 .. 2^n - 1. One's complement is invert only.", "Bits ulta karo, 1 jodo. Signed range yaad rakho."),
      f("dl-rs", "r's complement", "(r-1)'s complement = (r^n - 1) - N. r's complement = r^n - N", "For decimal, 9's then add 1 gives 10's complement.", "Decimal mein 9's, phir +1 se 10's."),
      f("dl-ff", "Flip-flop next state", "SR (SR=0): Q+ = S + R'Q. JK: Q+ = JQ' + K'Q. D: Q+ = D. T: Q+ = T xor Q", "SR = 11 is invalid. JK = 11 toggles. T = 1 toggles.", "JK aur T ka toggle, D seedha copy. SR=11 invalid."),
      f("dl-count", "Counter aur MUX", "n flip-flops, ripple up-counter: mod 2^n, f_out = f_in / 2^n. MUX: 2^n data, n select. Decoder: n to 2^n", "A mod-10 counter needs extra reset logic. It is not a pure 4-bit free counter.", "n FF se 2^n states. MUX select lines n hoti hain."),
      f("dl-kmap", "K-map group", "Group size must be 1, 2, 4, 8, ... Circle power-of-two 1s (or 0s for POS). Don't-care may join a group, never a group of its own", "Adjacent cells differ by one bit, including wrap of the edges.", "Group sirf 2 ki power. Don't-care tabhi lo jab group bada ho."),
      f("dl-ieee", "IEEE-754 single", "1 sign, 8 exponent, 23 fraction. Bias 127. Normal value = (-1)^s * (1.f) * 2^(E-127)", "E = 0 and f = 0 is zero. E = 255 and f = 0 is infinity. E = 255 and f != 0 is NaN. Double bias is 1023.", "Bias 127. E=255 infinity ya NaN. Double ka bias 1023."),
    ],
  },
  {
    id: "coa",
    subject: "Computer Organization",
    formulas: [
      f("coa-cpu", "CPU time", "CPU time = IC * CPI * clock cycle. Clock cycle = 1 / frequency", "IC is instruction count. A lower CPI or a faster clock both cut time.", "Time = kitni instructions * CPI * cycle time."),
      f("coa-pipe", "Pipeline speedup", "No stalls, n instructions, k stages: S = (n*k) / (k + n - 1). Large n: S approaches k", "One stall cycle drops the ideal throughput. Efficiency = S / k.", "Lambi stream par speedup stages ke barabar."),
      f("coa-stall", "Stall CPI", "Ideal pipeline CPI = 1. Effective CPI = 1 + stall cycles per instruction", "Data hazard: forwarding removes many, not all, stalls. Control hazard: branch delay or flush.", "Har instruction par extra stall cycles CPI mein judte hain."),
      f("coa-amat", "Cache AMAT", "AMAT = Hit time + Miss rate * Miss penalty", "Miss rate = 1 - hit rate. Two-level: AMAT = T_L1 + M1*(T_L2 + M2*T_mem).", "Hit time, aur miss par penalty ka hissa."),
      f("coa-eat", "Hit-rate EAT", "EAT = h*T_cache + (1-h)*T_memory", "If every access also pays the cache lookup: EAT = h*Tc + (1-h)*(Tc+Tm). Use the form the question states.", "Sawal padho: miss par cache time dobara juda hai ya nahi."),
      f("coa-map", "Cache address split", "Offset = log2(block bytes). Direct index = log2(blocks). Set index = log2(sets). Tag = address bits - index - offset", "Sets = blocks / ways. Cache bytes = sets * ways * block bytes.", "Offset, index, tag. Set associative mein sets = blocks/ways."),
      f("coa-ea", "Effective address", "Direct: EA = address field. Indirect: EA = M[address]. Indexed: EA = index + address. Relative: EA = PC + offset. Register-indirect: EA = register", "Immediate has no memory EA. The operand sits in the instruction.", "Mode pehchaan: immediate, direct, indirect, indexed, PC-relative."),
      f("coa-io", "Interrupt vs DMA", "Interrupt: CPU saves context and runs the handler. DMA: device moves a block; CPU is told at the end", "Cycle stealing takes the bus for single transfers. Burst mode holds the bus for the block.", "Byte-byte CPU nahi. DMA block khatam hone par interrupt."),
    ],
  },
  {
    id: "ds",
    subject: "C, arrays, stacks, queues, lists",
    formulas: [
      f("ds-addr", "Array address", "1D: base + i * size. Row-major A[i][j] = base + (i*cols + j)*size. Column-major: base + (j*rows + i)*size", "C uses row-major and 0-based indexes.", "Row-major mein pehle poori row. C yahi karta hai."),
      f("ds-ptr", "Pointer step", "p + k moves k elements, not k bytes. Byte move = k * sizeof(*p)", "a[i] is *(a+i). &a[i] is a+i.", "Pointer + 1 agla element hai, agla byte nahi."),
      f("ds-stack", "Stack aur queue", "Stack: push and pop at the same end, O(1). Circular queue: front and rear mod capacity, O(1)", "Infix to postfix uses a stack. BFS uses a queue. DFS uses a stack.", "Stack ek hi taraf. Queue circular ho to O(1)."),
      f("ds-list", "Linked list", "Insert or delete at a known node: O(1). Search: O(n). Extra memory: one pointer per node", "Doubly linked delete of a known node does not need the previous walk.", "Position pata ho to insert O(1). Dhoondhna O(n)."),
      f("ds-rec", "Recursion cost", "Time follows the recurrence of the calls. Depth of the call stack is the deepest chain, often O(n) or O(log n)", "A missing base case overflows the stack. Tail recursion can reuse the frame.", "Base case na ho to stack phatata hai."),
    ],
  },
  {
    id: "ds2",
    subject: "Trees, heaps, graphs",
    formulas: [
      f("ds2-tree", "Binary tree counts", "Max nodes at level L (root level 0) = 2^L. Perfect tree height h: nodes = 2^(h+1) - 1. Full tree: leaves = internal nodes + 1", "Height of a single node is 0 in this sheet. Some books use 1. Match the question.", "Level L par zyada se zyada 2^L nodes."),
      f("ds2-bst", "BST", "Left subtree < node < right subtree. Search, insert, delete: O(h). Balanced h = floor(log2 n). Skewed h = n-1", "Inorder of a BST is sorted order.", "Balanced log n. Tedhi chain n. Inorder sorted."),
      f("ds2-heap", "Binary heap index", "0-based: parent floor((i-1)/2), left 2i+1, right 2i+2. Height floor(log2 n). Build O(n). Extract O(log n)", "Min-heap: parent <= children. Heap is a complete binary tree.", "Parent (i-1)/2. Build heap O(n), nikalo O(log n)."),
      f("ds2-graph", "Graph storage", "Adjacency matrix: O(V^2) space, edge check O(1). Adjacency list: O(V+E) space, edge check O(degree)", "Undirected edge appears twice in the list, once in the matrix triangle.", "Matrix V^2. List V+E."),
    ],
  },
  {
    id: "al1",
    subject: "Searching, sorting, hashing",
    formulas: [
      f("al1-bin", "Binary search", "Comparisons about floor(log2 n) + 1. Needs a sorted array. Time Theta(log n)", "Lower bound of comparison sort is Omega(n log n).", "Sorted array. Lagbhag log2 n comparisons."),
      f("al1-sort", "Sorting cost", "Insertion, selection, bubble: worst Theta(n^2). Merge: Theta(n log n), extra O(n). Heap: Theta(n log n), in place. Quick: average Theta(n log n), worst Theta(n^2)", "Insertion best case Theta(n) on sorted input. Merge and heap are stable? Merge is stable. Heap and quick are not.", "Merge aur heap n log n. Quick average n log n, worst n^2."),
      f("al1-stable", "Stability", "Stable: equal keys keep their input order. Merge and insertion are stable. Selection, heap, and quick are not", "Counting sort is stable if the prefix scan fills from the end.", "Barabar keys ka order tabhi bacha rahe jab sort stable ho."),
      f("al1-count", "Counting aur radix", "Counting: O(n + k) time, k is the key range. Radix: O(d (n + k)) for d digits", "Use when keys are integers in a known range, not for arbitrary comparisons.", "Range chhota ho to counting O(n+k)."),
      f("al1-hash", "Hash load", "alpha = n / m. Chaining, unsuccessful search about 1 + alpha. Successful about 1 + alpha/2", "Open addressing degrades as alpha approaches 1. Keep alpha well below 1.", "alpha = items / slots. Chaining mein search 1+alpha."),
    ],
  },
  {
    id: "al2",
    subject: "Greedy, DP, divide-and-conquer",
    formulas: [
      f("al2-master", "Master theorem", "T(n) = a T(n/b) + f(n). Let c = log_b(a). If f = O(n^(c-e)): Theta(n^c). If f = Theta(n^c): Theta(n^c log n). If f = Omega(n^(c+e)) and a*f(n/b) <= k*f(n) for k<1: Theta(f(n))", "e is a positive constant. Merge sort: a=2, b=2, f=n, c=1, case 2.", "c = log_b a. f chhota, barabar, ya bada: teen case."),
      f("al2-dac", "Divide and conquer", "Split, solve, combine. Binary search, merge sort, quicksort, Strassen. Cost is the recurrence, then Master theorem", "Not every split is equal. Quicksort's worst split is 1 and n-1.", "Tukde, solve, jodo. Cost recurrence se aati hai."),
      f("al2-greedy", "Greedy choice", "Feasible choice that looks best now, plus optimal substructure. Fractional knapsack: sort by value/weight", "0/1 knapsack is not greedy. It is DP. Activity selection: pick the finish-earliest.", "Fractional knapsack value/weight. 0/1 knapsack DP hai."),
      f("al2-dp", "DP shape", "Optimal substructure and overlapping subproblems. 0/1 knapsack: dp[i][w] = max(dp[i-1][w], v_i + dp[i-1][w-w_i])", "Fibonacci naive recursion is exponential. With a table it is O(n).", "Table bharo. 0/1 mein item ek baar. Overlap ho to DP."),
    ],
  },
  {
    id: "al3",
    subject: "Graph algorithms",
    formulas: [
      f("al3-trav", "BFS aur DFS", "Time O(V+E) on a list. BFS gives fewest edges from the source in an unweighted graph. DFS gives finishing times", "Topological sort: decreasing finish time, and only on a DAG.", "Bina weight ke shortest edge-count BFS. DAG par hi topological."),
      f("al3-mst", "MST", "Kruskal: sort edges, add if no cycle, O(E log E). Prim: grow one tree, O(E log V) with a heap. MST has V-1 edges", "Cut property: lightest edge across a cut is in some MST. Negative weights are allowed. Negative cycles are not a concept here.", "V-1 edges. Cycle banane wali edge mat jodo."),
      f("al3-dij", "Dijkstra", "Non-negative weights. Heap version O((V+E) log V). Dist[v] = min(dist[v], dist[u] + w(u,v)) when u is settled", "A negative edge can make a settled node wrong. Use Bellman-Ford then.", "Negative weight par Dijkstra mat lagana."),
      f("al3-bf", "Bellman-Ford aur Floyd", "Bellman-Ford: relax all edges V-1 times, O(VE). One more relax means a negative cycle. Floyd: dp[k][i][j] = min(dp[i][j], dp[i][k]+dp[k][j]), O(V^3)", "Floyd allows negative edges, not a negative cycle.", "V-1 baar relax. Vth pass par change ho to negative cycle."),
    ],
  },
  {
    id: "os1",
    subject: "Processes, sync, deadlock",
    formulas: [
      f("os1-time", "TAT, waiting, response", "TAT = completion - arrival. Waiting = TAT - burst. Response = first CPU start - arrival", "CPU utilization = busy time / total time. Throughput = jobs finished / time.", "Waiting mein burst nahi ginte. Response pehli baar CPU hai."),
      f("os1-sched", "Scheduling pick", "FCFS: simple, convoy. SJF: least average waiting if all arrive together, non-preemptive. SRTF: preemptive SJF. RR: quantum q, more switches as q shrinks", "Priority can starve unless aging raises the waiting job.", "SJF average wait kam karta hai. RR mein q chhota to switch zyada."),
      f("os1-need", "Banker's need", "Need[i] = Max[i] - Allocation[i]. Safe if a sequence exists: Work starts as Available, and each picked process has Need <= Work, then Work += Allocation", "An unsafe state is not a deadlock yet. It might become one.", "Need = Max - Allocation. Safe sequence ho to abhi deadlock nahi."),
      f("os1-dl", "Deadlock four", "Mutual exclusion, hold and wait, no preemption, circular wait. All four together", "Break any one condition and deadlock cannot form. Prevention vs avoidance vs detection.", "Chaaron ek saath. Ek tod do to deadlock nahi banta."),
      f("os1-sem", "Semaphore", "Wait (P): while S<=0 loop; S = S-1. Signal (V): S = S+1. Binary semaphore is 0 or 1. Counting semaphore tracks a pool", "Mutex lock is not a signal to a different process by itself. A semaphore can.", "P ghatata hai, V badhata hai. Binary 0/1."),
    ],
  },
  {
    id: "os2",
    subject: "Memory and file systems",
    formulas: [
      f("os2-page", "Page bits", "Offset bits = log2(page size). Page number = logical address bits - offset bits. Frames = physical bytes / page size", "Logical pages and physical frames are the same size.", "Offset log2(page). Frame count = RAM / page size."),
      f("os2-tlb", "TLB EAT", "Single-level page table: EAT = h*(T_tlb + T_mem) + (1-h)*(T_tlb + 2*T_mem)", "A miss reads the page table in memory, then the data. Two memory reads.", "Hit par ek memory. Miss par page table + data, do memory."),
      f("os2-pf", "Page fault time", "EAT = (1-p)*memory access + p*page-fault service", "p is the fault probability. Service includes disk. It dominates memory.", "p chhota bhi ho to disk cost EAT ko le jaati hai."),
      f("os2-rep", "Replacement", "FIFO can show Belady: more frames, more faults. Optimal: replace the page used farthest in the future. LRU: replace the least recently used", "Optimal needs the future. It is a yardstick, not an online policy.", "FIFO par frames badhao to faults kabhi badh sakte hain."),
      f("os2-frag", "Fragmentation", "Paging: internal fragment in the last page only. Segmentation: external fragment between variable segments", "Compaction moves segments. Paging does not need it for external holes.", "Paging mein internal. Segmentation mein external."),
      f("os2-file", "File allocation", "Contiguous: direct, external fragment. Linked: no external fragment, slow random. Indexed: index block, random access, one extra read", "Unix inode: direct blocks, then single, double, triple indirect.", "Indexed se random access. Linked se sequential."),
    ],
  },
  {
    id: "db1",
    subject: "ER, algebra, SQL, normal forms",
    formulas: [
      f("db1-ra", "Relational algebra", "sigma select, pi project, rho rename, union, minus, cartesian product, join", "Select keeps rows. Project keeps columns and removes duplicate rows.", "sigma row, pi column. Join = select on product, phir extra column hatao."),
      f("db1-key", "Keys", "Superkey uniquely identifies. Candidate key is a minimal superkey. Primary key is one chosen candidate. Foreign key references a candidate key", "Prime attribute: member of some candidate key.", "Candidate = minimal superkey. Prime usi ka hissa hai."),
      f("db1-nf", "Normal forms", "1NF: atomic values. 2NF: no partial dependency of a non-prime on a candidate key. 3NF: for X->A, X is a superkey or A is prime. BCNF: for every nontrivial X->A, X is a superkey", "BCNF implies 3NF. 3NF does not imply BCNF. A table can be 3NF and still have overlapping keys.", "BCNF: left side hamesha superkey. 3NF mein prime attribute ko chhoot milti hai."),
      f("db1-lj", "Lossless join", "Decomposition of two parts is lossless if R1 intersect R2 is a key of R1 or of R2", "Dependency preserving: the union of the projected FDs is equivalent to F. Lossless and preserving are different tests.", "Intersection kisi ek side ki key ho to lossless."),
      f("db1-sql", "SQL groups", "WHERE filters rows before groups. HAVING filters groups. SELECT aggregates need GROUP BY of the other selected columns", "COUNT(*) counts rows. COUNT(col) skips NULL. DISTINCT inside COUNT counts uniques.", "WHERE pehle, GROUP BY, phir HAVING."),
    ],
  },
  {
    id: "db2",
    subject: "Indexing, transactions, concurrency",
    formulas: [
      f("db2-btree", "B and B+ tree", "Order-m node holds up to m children. Search O(log n). B+ tree stores records only in the leaves, and leaves are linked", "A B+ leaf scan is the range query. Internal nodes are a sparse directory.", "Data sirf B+ ke leaves mein. Range leaf chain se."),
      f("db2-idx", "Index kind", "Dense: one entry per record. Sparse: one entry per block, file must be ordered. Primary index is on the ordering key. Secondary index is on another field", "Clustering index can be on a non-unique ordered field.", "Sparse tabhi jab file ordered ho."),
      f("db2-acid", "ACID", "Atomic: all or nothing. Consistent: constraints hold. Isolated: concurrent effect matches some serial order. Durable: commit survives a crash", "A schedule can be atomic per transaction and still not serializable.", "Commit ke baad durable. Beech mein fail ho to atomic rollback."),
      f("db2-ser", "Serializability", "Conflict: two ops, different transactions, same item, at least one write. Conflict serializable iff the precedence graph has no cycle", "Conflict serializable implies view serializable. The converse is false.", "Precedence graph mein cycle nahi to conflict serializable."),
      f("db2-2pl", "Two-phase lock", "Growing phase, then shrinking phase. Strict 2PL holds exclusive locks until commit", "2PL guarantees conflict serializability. It can still deadlock.", "Pehle sirf lock, phir sirf unlock. Deadlock ab bhi ho sakta hai."),
    ],
  },
  {
    id: "cn1",
    subject: "Delay, framing, error, MAC",
    formulas: [
      f("cn1-delay", "Four delays", "Transmission = L/R. Propagation = d/v. Total = transmission + propagation + queue + processing", "Bandwidth is R in bits per second. L is in bits. Do not mix bytes.", "L/R wire par chadhna. d/v wire par chalna."),
      f("cn1-sw", "Stop-and-wait", "a = Tp / Tt. Utilization = 1 / (1 + 2a)", "2a is the round trip measured in transmission times. A large a wastes the link.", "Door link ya chhoti packet: utilization girti hai."),
      f("cn1-win", "Sliding window", "If W < 1+2a: utilization = W/(1+2a). Else utilization = 1. W is the window in packets", "Sequence space must be at least W+1 for go-back-N in the simple model, and 2W for selective repeat.", "Window badi ho to link bhar jaati hai, warna W/(1+2a)."),
      f("cn1-cap", "Nyquist aur Shannon", "Noiseless Nyquist: C = 2 * B * log2(M). Noisy Shannon: C = B * log2(1 + S/N)", "If SNR is in dB, ratio = 10^(dB/10). M is the number of levels.", "dB ko pehle ratio banao: 10^(dB/10)."),
      f("cn1-ham", "Hamming", "Distance d detects up to d-1 errors and corrects floor((d-1)/2) errors", "Parity adds distance. A single parity bit detects 1 and corrects 0.", "Distance d: detect d-1, correct (d-1)/2."),
      f("cn1-crc", "CRC", "Treat the frame as a polynomial. Append remainder of division by the generator. A zero remainder at the receiver means no detected error", "CRC is strong detection, not correction.", "Remainder zero ho to detected error nahi."),
    ],
  },
  {
    id: "cn2",
    subject: "Routing, IPv4, CIDR, NAT",
    formulas: [
      f("cn2-route", "Routing idea", "Distance vector: Bellman-Ford, advertise the whole vector, count-to-infinity. Link state: flood links, then Dijkstra at each router", "Split horizon and poison reverse cut some, not all, loops.", "DV vector bhejta hai. LS link flood karke Dijkstra."),
      f("cn2-sub", "IPv4 subnet", "Prefix /p uses p network bits. Host bits = 32 - p. Usable hosts = 2^(32-p) - 2", "The -2 drops network and broadcast. /31 and /32 are special and do not follow this usable-host rule.", "Host bits 32-p. Usable 2^host - 2. /31 alag hai."),
      f("cn2-mask", "Mask from prefix", "/p mask: p ones, then zeros. Block size of the interesting octet = 256 / 2^(ones in that octet)", "A /26 interesting octet is the 4th: 2 bits host in that octet, block 64.", "Block = 256 / us octet ki values. /26 ka block 64."),
      f("cn2-frag", "Fragment offset", "Offset field is in 8-byte units. Byte offset = offset * 8. MF = 1 means more fragments follow. All fragments of a datagram carry the same identification", "IPv4 header is 20 bytes minimum, 60 maximum. Total length includes the header.", "Offset * 8 = byte. MF aakhri fragment par 0."),
      f("cn2-nat", "Private and NAT", "Private: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. NAT rewrites the private source to a public address, remembered in a table", "ARP: IP to MAC on the local link. DHCP gives the IP. ICMP carries errors such as unreachable and echo.", "Teen private ranges. NAT table source ko public banati hai."),
    ],
  },
  {
    id: "cn3",
    subject: "TCP, UDP, application ports",
    formulas: [
      f("cn3-tcp", "TCP control", "Sequence number counts bytes. Ack is the next byte expected. Window is the receiver's free buffer. UDP has no connection, no retransmission, no congestion window", "Socket is (IP, port) at one end. A TCP connection is a pair of sockets.", "Ack = agla byte. UDP window aur retry nahi rakhta."),
      f("cn3-cc", "Congestion window", "Slow start: cwnd doubles each RTT until ssthresh. Then congestion avoidance: cwnd += 1 MSS per RTT. Timeout: ssthresh = cwnd/2, cwnd = 1 MSS. Reno triple duplicate ACK: fast retransmit, ssthresh = cwnd/2, then fast recovery", "Tahoe sets cwnd to 1 on any loss signal. Reno keeps the pipe fuller on triple ACK.", "Timeout par cwnd 1. Triple ACK par Reno cwnd aadha."),
      f("cn3-port", "Ports", "DNS 53, DHCP 67/68, HTTP 80, HTTPS 443, SMTP 25, FTP 20 data and 21 control", "DNS is usually UDP, TCP if the response is large. SMTP sends mail. HTTP fetches the web.", "53 DNS, 80 HTTP, 25 SMTP, 21 FTP control."),
      f("cn3-flow", "Flow vs congestion", "Flow control: receiver window, do not overrun the receiver. Congestion control: cwnd, do not overrun the network. Send window = min(receiver window, cwnd)", "Silly window happens when the receiver opens a tiny window. Nagle and delayed ACK interact.", "Receiver window flow hai. cwnd congestion hai. Chhota wala chalta hai."),
    ],
  },
  {
    id: "toc",
    subject: "Theory of Computation",
    formulas: [
      f("toc-dfa", "DFA aur NFA", "DFA: (Q, Sigma, delta, q0, F), delta: Q x Sigma -> Q, exactly one move. NFA: delta returns a set. Subset construction builds the DFA", "Epsilon-NFA allows an empty move. Regular expressions, NFA, and DFA describe the same languages.", "DFA ek hi move. NFA set. Dono regular languages."),
      f("toc-pump-r", "Pumping, regular", "Exists p. For every w in L with |w| >= p: w = xyz, |xy| <= p, |y| >= 1, and xy^k z is in L for every k >= 0", "Use it to prove a language is not regular. It cannot prove that a language is regular.", "|y| kam se kam 1, |xy| <= p. Isse 'not regular' prove hota hai."),
      f("toc-cfg", "CFG aur PDA", "CFG: (V, Sigma, R, S). Every context-free language has a PDA. Pumping for CFL: w = uvxyz, |vxy| <= p, |vy| >= 1, and uv^k x y^k z stays in L", "A grammar is ambiguous if some string has two leftmost derivations or two parse trees.", "CFL pump dono hisse v aur y ko ek saath badhata hai."),
      f("toc-tm", "TM aur decidability", "Decidable: a TM halts with yes or no on every input. Recognizable: it halts on yes, and may loop on no. Halting problem is recognizable and undecidable", "Type 3 regular, type 2 context-free, type 1 context-sensitive, type 0 unrestricted.", "Halt hamesha ho to decidable. Halting problem undecidable hai."),
    ],
  },
  {
    id: "cd",
    subject: "Compiler Design",
    formulas: [
      f("cd-phase", "Phases", "Lex -> parse -> semantic -> intermediate code -> optimize -> target code. The symbol table is used across phases", "Lexemes become tokens. Parse builds the tree. Semantic checks types.", "Token, tree, type, IR, optimize, code."),
      f("cd-first", "FIRST", "FIRST(X) holds terminals that can begin a string derived from X. If X derives epsilon, epsilon is in FIRST(X)", "FIRST of a sequence: take FIRST of each symbol until one does not derive epsilon.", "Epsilon tab tak aage badho jab tak symbol nullable hai."),
      f("cd-follow", "FOLLOW", "FOLLOW(A) holds terminals that can sit just after A in some sentential form. $ is in FOLLOW of the start symbol", "If A -> alpha B beta and beta derives epsilon, FOLLOW(A) joins FOLLOW(B).", "Start ke FOLLOW mein $. Nullable beta ho to FOLLOW aage se aata hai."),
      f("cd-ll1", "LL(1) test", "For A -> alpha | beta: FIRST(alpha) and FIRST(beta) are disjoint. If alpha derives epsilon, FIRST(beta) and FOLLOW(A) are disjoint", "One lookahead. A conflict means the grammar is not LL(1), even if the language has some other LL(1) grammar.", "FIRST alag. Epsilon ho to FOLLOW se bhi takrao nahi."),
      f("cd-sr", "Shift-reduce", "Actions: shift, reduce, accept, error. Shift/reduce and reduce/reduce are conflicts", "Bottom-up. The handle is the right-hand side that is reduced.", "Conflict ho to grammar is parser ke liye clear nahi."),
      f("cd-opt", "Local dataflow", "Constant propagation: every reaching definition assigns the same constant. Liveness: a value is used on some path before the next definition. CSE: the same expression is computed again and operands are unchanged", "Three-address code has at most one operator: x = y op z.", "Live = aage use, beech mein naya assign nahi. CSE same expression."),
    ],
  },
  {
    id: "disc",
    subject: "Discrete mathematics",
    formulas: [
      f("disc-imp", "Implication", "p -> q is equivalent to (not p) or q. Contrapositive not q -> not p is equivalent. Converse q -> p is not", "Inverse is not p -> not q. It matches the converse, not the original.", "Contrapositive same hai. Converse same nahi."),
      f("disc-set", "Set sizes", "|A union B| = |A| + |B| - |A intersect B|. De Morgan: (A union B)' = A' intersect B'", "Three sets: add singles, subtract pairs, add back the triple intersection.", "Dono mein jo do baar aaya use ek baar hatao."),
      f("disc-rel", "Relations", "Equivalence: reflexive, symmetric, transitive. Partial order: reflexive, antisymmetric, transitive", "A partial order is a poset. A lattice gives every pair a join and a meet.", "Equivalence teen. Poset mein symmetric ki jagah antisymmetric."),
      f("disc-grp", "Group", "Closure, associativity, identity, inverse. Abelian if also commutative. Lagrange: subgroup order divides |G|", "A monoid has closure, associativity, identity, and may lack inverses.", "Group mein inverse zaroori. Monoid mein nahi. Lagrange divide."),
      f("disc-graph", "Graph counts", "Sum of degrees = 2|E|. Tree: connected, |E| = |V| - 1. Complete graph edges = n(n-1)/2. Bipartite iff no odd cycle", "Handshaking says the number of odd-degree vertices is even.", "Degree ka yog do guna edges. Tree mein edges = vertices - 1."),
      f("disc-count", "Counting", "nPr = n! / (n-r)!. nCr = n! / (r! (n-r)!). Sum of geometric series a + ar + ... + ar^(n-1) = a (r^n - 1) / (r - 1), r != 1", "Recurrence: solve the characteristic equation for linear constant coefficients. Generating function A(x) = sum a_n x^n.", "Arrangement nPr, selection nCr. Geometric sum (r^n-1)/(r-1)."),
    ],
  },
  {
    id: "la",
    subject: "Linear algebra",
    formulas: [
      f("la-det", "Determinant", "det(AB) = det(A) det(B). det(A^T) = det(A). det(cA) = c^n det(A) for an n by n matrix. Inverse exists iff det != 0", "(AB)^(-1) = B^(-1) A^(-1).", "det zero ho to inverse nahi. cA par c ki power n."),
      f("la-eig", "Eigen", "A v = lambda v, v != 0. Characteristic equation det(A - lambda I) = 0. Trace = sum of eigenvalues. det = product of eigenvalues", "A symmetric real matrix has real eigenvalues and orthogonal eigenvectors.", "det(A - lambda I) = 0. Trace eigenvalues ka yog."),
      f("la-lu", "LU", "A = L U. Solve L y = b by forward substitution, then U x = y by back substitution", "P A = L U when a pivot swap is required. L is unit lower triangular in the usual form.", "Pehle L y = b, phir U x = y."),
      f("la-sys", "Linear system", "Unique solution if rank(A) = rank([A|b]) = n. Infinite if rank(A) = rank([A|b]) < n. None if rank(A) < rank([A|b])", "Rank is the number of nonzero rows in row-echelon form. Rank-nullity: rank + nullity = number of columns.", "Augmented rank bada ho to koi solution nahi."),
    ],
  },
  {
    id: "calc",
    subject: "Calculus",
    formulas: [
      f("calc-lim", "Limits to remember", "sin x / x -> 1 as x -> 0. (1 + x)^(1/x) -> e as x -> 0. (1 + 1/n)^n -> e", "Continuity at a: limit equals the function value. Differentiable implies continuous. The converse is false.", "sin x/x aur (1+1/n)^n. Differentiable ho to continuous."),
      f("calc-der", "Derivatives", "(uv)' = u'v + uv'. (u/v)' = (u'v - uv') / v^2. Chain: dy/dx = dy/du * du/dx. x^n -> n x^(n-1). e^x -> e^x. ln x -> 1/x. sin -> cos. cos -> -sin", "A critical point has f' = 0 or f' undefined.", "Product, quotient, chain. ln x ka slope 1/x."),
      f("calc-mvt", "MVT aur extrema", "Rolle: f(a)=f(b) implies some c with f'(c)=0. MVT: f'(c) = (f(b)-f(a))/(b-a). Local max: f'=0 and f''<0. Local min: f'=0 and f''>0", "If f''=0 the test fails. Check the sign of f' around the point.", "MVT slope of chord. f'' negative ho to max."),
      f("calc-int", "Integrals", "integral x^n dx = x^(n+1)/(n+1) + C, n != -1. integral dx/x = ln|x| + C. integral e^x dx = e^x + C. Parts: integral u dv = u v - integral v du", "Definite integral is net area. Swap limits and the sign flips.", "x^(-1) alag hai, ln. Parts: u v minus integral v du."),
    ],
  },
  {
    id: "pr",
    subject: "Probability and statistics",
    formulas: [
      f("pr-cond", "Conditional aur Bayes", "P(A|B) = P(A and B) / P(B). Bayes: P(A|B) = P(B|A) P(A) / P(B). Total: P(B) = sum P(B|A_i) P(A_i)", "Independent means P(A and B) = P(A)P(B), so P(A|B)=P(A).", "Bayes: ulta probability. Pehle total probability se P(B)."),
      f("pr-stat", "Mean aur spread", "E[X] = sum x p(x). Var = E[X^2] - (E[X])^2. SD = sqrt(Var). Median splits the ordered list. Mode is the most frequent value", "For grouped data the mean uses class marks. Two modes: bimodal.", "Variance E[X^2] minus mean ka square. SD uska sqrt."),
      f("pr-bin", "Binomial", "P(K=k) = C(n,k) p^k (1-p)^(n-k). Mean = n p. Variance = n p (1-p)", "n independent trials, two outcomes, constant p.", "Mean n p. Variance n p (1-p)."),
      f("pr-poi", "Poisson", "P(K=k) = e^(-lambda) * lambda^k / k!. Mean = variance = lambda", "Use for rare events in a fixed interval. It is the limit of binomial when n is large and p is small, lambda = n p.", "Mean aur variance dono lambda."),
      f("pr-dist", "Uniform, exponential, normal", "Uniform [a,b]: mean (a+b)/2, variance (b-a)^2 / 12. Exponential: mean 1/lambda, variance 1/lambda^2, memoryless. Normal z = (x - mu) / sigma", "Exponential pdf is lambda e^(-lambda x) for x >= 0. Standard normal has mu 0 and sigma 1.", "Uniform mean beech mein. Exponential mean 1/lambda. z score normal."),
    ],
  },
  {
    id: "re",
    subject: "Reasoning patterns",
    formulas: [
      f("re-alpha", "Letter position", "A=1 ... Z=26. Opposite pairs sum to 27: A-Z, B-Y, C-X", "A jump of +1, -1, +2, -2 is the first pattern to test.", "Position jodo 27 ho to opposite letter."),
      f("re-series", "Number series", "Check first difference, then second difference, then alternate terms, then *n + k or n^2 + k", "If two series are interleaved, split odd and even positions.", "Pehle antar, phir doosra antar, phir beech ki series."),
      f("re-code", "Coding", "Letter shift, reverse the word, square, or position sum. If it does not show in 20 seconds, mark and return", "Number coding often uses the letter positions added or multiplied.", "20 second mein pattern na dikhe to aage, ant mein lautna."),
      f("re-rel", "Relation aur direction", "Draw the family. One generation is one row. Directions: sketch, do not turn in the head. A right turn is clockwise", "Analogy is the same relation on the second pair. Classification: three share a rule, one does not.", "Family aur direction ka sketch. Dimagh mein mat ghumao."),
    ],
  },
  {
    id: "hy",
    subject: "High-yield, mock week",
    formulas: [
      f("hy-1", "De Morgan, flip-flop, 2's", "(A+B)'=A'B'. JK: Q+=JQ'+K'Q. D: Q+=D. T: Q+=T xor Q. 2's: invert, add 1. n-bit signed: -2^(n-1)..2^(n-1)-1", "IEEE single bias 127.", "Yahi teen Digital Logic mein sab se zyada aate hain."),
      f("hy-2", "CPU, pipeline, cache", "Time = IC*CPI*cycle. Speedup -> k stages. AMAT = hit time + miss rate*penalty. Tag = bits - index - offset", "EAT form depends on whether a miss also pays the cache time.", "Pipeline lambi ho to speedup k. Cache bits teen tukde."),
      f("hy-3", "Master, MST, shortest path", "Master: c=log_b a, three cases on f vs n^c. MST V-1 edges. Dijkstra only if weights >= 0. Bellman-Ford V-1 passes, O(VE)", "Negative cycle: one extra Bellman-Ford pass still updates.", "Negative edge Dijkstra mein nahi."),
      f("hy-4", "OS numbers", "TAT=CT-AT. WT=TAT-BT. Need=Max-Allocation. Offset bits=log2(page size). Fault EAT=(1-p)*ma + p*service", "Deadlock needs all four conditions.", "Page offset log2. Banker Need = Max - Allocation."),
      f("hy-5", "DBMS tests", "3NF: X->A means X superkey or A prime. BCNF: X superkey. Lossless if intersection is a key of one side. Conflict serializable iff precedence graph has no cycle", "Strict 2PL holds write locks until commit.", "BCNF left side superkey. Graph mein cycle nahi."),
      f("hy-6", "Network numbers", "Tt=L/R. Tp=d/v. Stop-and-wait U=1/(1+2a), a=Tp/Tt. Hosts=2^(32-p)-2. Shannon C=B log2(1+S/N). Offset bytes = field*8", "Send window = min(receiver window, cwnd). Timeout sets cwnd to 1.", "a = Tp/Tt. Subnet usable 2^host - 2."),
      f("hy-7", "TOC aur compiler", "Regular pump: |xy|<=p, |y|>=1. LL(1): FIRST sets disjoint, and epsilon pulls in FOLLOW. Live: used before the next definition", "Halting problem is undecidable.", "Pump se 'not regular'. LL(1) FIRST aur FOLLOW."),
      f("hy-8", "Math numbers", "Bayes P(A|B)=P(B|A)P(A)/P(B). Binomial mean np, variance np(1-p). Poisson mean=variance=lambda. Eigen: det(A-lambda I)=0. MVT slope=(f(b)-f(a))/(b-a)", "Uniform variance (b-a)^2/12. Exponential mean 1/lambda.", "Bayes, np, lambda, eigenvalue, MVT. Yahi mock se pehle."),
    ],
  },
];

const sheetById = new Map(formulaSheets.map((sheet) => [sheet.id, sheet]));

export const daySheets: Record<string, string[]> = {
  "2026-10-08": ["dl"],
  "2026-10-09": ["coa"],
  "2026-10-10": ["ds"],
  "2026-10-11": ["ds2"],
  "2026-10-12": ["al1"],
  "2026-10-13": ["al2"],
  "2026-10-14": ["al3"],
  "2026-10-15": ["os1"],
  "2026-10-16": ["os2"],
  "2026-10-17": ["db1"],
  "2026-10-18": ["db2"],
  "2026-10-19": ["cn1"],
  "2026-10-20": ["cn2"],
  "2026-10-21": ["cn3"],
  "2026-10-22": ["toc"],
  "2026-10-23": ["cd"],
  "2026-10-24": ["disc", "la"],
  "2026-10-25": ["calc", "pr"],
  "2026-10-26": ["dl", "coa", "ds", "ds2"],
  "2026-10-27": ["al1", "al2", "al3", "os1", "os2"],
  "2026-10-28": ["db1", "db2", "cn1", "cn2", "cn3"],
  "2026-10-29": ["toc", "cd", "disc", "la", "calc", "pr", "re"],
  "2026-10-30": ["hy"],
  "2026-10-31": ["hy", "re"],
};

export function sheetsForDay(iso: string) {
  return (daySheets[iso] ?? []).map((id) => sheetById.get(id)).filter((sheet): sheet is FormulaSheet => Boolean(sheet));
}

export function allFormulas() {
  return formulaSheets.flatMap((sheet) => sheet.formulas);
}

export type DeskCopy = {
  morning: string;
  lunchTitle: string;
  lunch: string;
  lunchTech?: number;
  mid: string;
  teaTitle: string;
  tea: string;
  pm: string;
  outTitle: string;
  out: string;
};

const mockDays = new Set(["2026-10-30", "2026-10-31"]);

export function deskCopy(iso: string): DeskCopy {
  const names = sheetsForDay(iso).map((sheet) => sheet.subject).join(", ") || "aaj ki formula sheet";
  if (mockDays.has(iso)) {
    return {
      morning:
        "Kaam shuru. Aaj mock hai. Beech mein naya chapter nahi. Lunch par sirf high-yield sheet.",
      lunchTitle: "Lunch: high-yield formula, 20 minute",
      lunch: `${names}. Har line ek baar padho aur tick karo. Naya MCQ nahi. Jo line atke use star, research nahi.`,
      mid: "Dopahar ka kaam. Sheet band. Mock ke liye dimaag khali rakho.",
      teaTitle: "Chai: 12 minute, band karke",
      tea: "Sheet band. Star wali lines ek baar bol ke dekho. Na aaye to chhod do.",
      pm: "Shaam ka kaam. 18:50 se pehle notes mat kholna.",
      outTitle: "Nikalte hue 5 line",
      out: "Pocket card par sirf 5 formulas. Phir pen band. Raat ki mock isi se garam hogi, naya topic nahi.",
    };
  }
  return {
    morning: `Kaam. 13:00 par ${names} ki sheet khulegi. Abhi naya topic nahi.`,
    lunchTitle: `Lunch: ${names}`,
    lunch: `20 minute, zaroori. Formula tab mein aaj ki lines kholo. Har formula ek baar bol ke tick karo. Phir usi topic ke 6 chhote MCQ, solution ek line. ${names}.`,
    lunchTech: 6,
    mid: "Dopahar ka kaam. Sheet band. Agli yaad chai ke break par.",
    teaTitle: "Chai: formula band karke",
    tea: `12 minute, zaroori. Sheet band. ${names} mein se 8 formulas yaad se bolo. Jo na aaye use tick mat karo.`,
    pm: "Shaam ka kaam. 18:50 par pocket card, phir seedha ghar.",
    outTitle: "Nikalte hue 5 formulas",
    out: `10 minute, zaroori. Jo lunch par nahi aaye unme se 5 line error copy mein. Raat ka slot yahin se shuru hoga. ${names}.`,
  };
}

function assertFormulas() {
  const ids = new Set<string>();
  for (const sheet of formulaSheets) {
    if (ids.has(sheet.id)) throw new Error(`Duplicate sheet ${sheet.id}`);
    ids.add(sheet.id);
    const seen = new Set<string>();
    for (const item of sheet.formulas) {
      if (seen.has(item.id)) throw new Error(`Duplicate formula ${item.id}`);
      seen.add(item.id);
    }
  }
  for (const [iso, list] of Object.entries(daySheets)) {
    if (!/^2026-10-(0[8-9]|[12][0-9]|3[01])$/.test(iso)) {
      throw new Error(`Formula day out of range ${iso}`);
    }
    for (const id of list) {
      if (!sheetById.has(id)) throw new Error(`Missing sheet ${id} on ${iso}`);
    }
  }
}

assertFormulas();
