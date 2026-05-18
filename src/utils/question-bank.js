/**
 * 题库 - 按路径 > 节点分层，每节点 5-8 道题
 */

const QUESTIONS = {
	// ==================== 前端 ====================
	frontend: {
		css: [
			{ id: 'css_1', question: '哪个CSS属性用于改变元素的文本颜色？', options: ['color', 'text-color', 'font-color', 'background'], correct: 0, explanation: 'CSS 中使用 color 属性来设置文本颜色。text-color 和 font-color 不是有效的 CSS 属性。' },
			{ id: 'css_2', question: 'Flexbox 中，哪个属性用于设置主轴方向？', options: ['flex-direction', 'flex-wrap', 'justify-content', 'align-items'], correct: 0, explanation: 'flex-direction 定义主轴方向（row/column），justify-content 控制主轴对齐，align-items 控制交叉轴对齐。' },
			{ id: 'css_3', question: 'CSS Grid 中，grid-template-columns: 1fr 2fr 表示什么？', options: ['两列等宽', '第一列是第二列的两倍', '第二列是第一列的两倍', '无效语法'], correct: 2, explanation: 'fr 单位按比例分配空间。1fr 2fr 表示第二列宽度是第一列的两倍。' },
			{ id: 'css_4', question: 'position: sticky 元素在什么条件下会"粘住"？', options: ['父元素 overflow: auto', '滚动到指定偏移位置时', '页面加载时', '鼠标悬停时'], correct: 1, explanation: 'sticky 元素在滚动到 top/left/right/bottom 指定的偏移位置时变为 fixed 定位。' },
			{ id: 'css_5', question: 'CSS 选择器优先级从高到低排列正确的是？', options: ['id > class > tag', 'class > id > tag', 'tag > class > id', 'class > tag > id'], correct: 0, explanation: '优先级：!important > inline > id(#) > class(.) > tag。id 选择器权重为 100，class 为 10，tag 为 1。' },
			{ id: 'css_6', question: 'box-sizing: border-box 的作用是什么？', options: ['元素总宽高包含 padding 和 border', '元素总宽高不包含 padding', '设置元素为块级元素', '设置元素为弹性盒子'], correct: 0, explanation: 'border-box 让 width/height 包含 padding 和 border，避免设置 padding 后元素变大。' }
		],
		javascript: [
			{ id: 'js_1', question: 'JavaScript 中，typeof null 的返回值是什么？', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2, explanation: '这是 JS 的一个历史 bug。typeof null 返回 "object"，要用 === null 判断 null。' },
			{ id: 'js_2', question: 'Promise.all() 和 Promise.allSettled() 的区别是？', options: ['没有区别', 'all 遇到 reject 立即失败，allSettled 等全部完成', 'allSettled 遇到 reject 立即失败', 'all 不支持数组'], correct: 1, explanation: 'Promise.all() 中任一 promise reject 就立即 reject。allSettled() 等所有 promise 完成，返回每个的结果状态。' },
			{ id: 'js_3', question: '闭包（Closure）是什么？', options: ['全局变量', '函数与其词法环境的组合', '类的私有属性', '异步回调函数'], correct: 1, explanation: '闭包是函数能够访问其定义时所在的词法作用域，即使该函数在其他地方执行。' },
			{ id: 'js_4', question: 'let、const、var 的区别中，哪个说法正确？', options: ['var 有块级作用域', 'const 声明后不能修改', 'let 会提升到函数顶部', 'var 不会提升'], correct: 1, explanation: 'const 声明的变量不能重新赋值（但对象属性可修改）。var 有函数作用域，let/const 有块级作用域。' },
			{ id: 'js_5', question: '事件循环中，微任务（microtask）包括哪些？', options: ['setTimeout', 'Promise.then', 'requestAnimationFrame', 'setInterval'], correct: 1, explanation: '微任务包括 Promise.then/catch/finally、MutationObserver。setTimeout/setInterval 是宏任务。' },
			{ id: 'js_6', question: '=== 和 == 的区别是什么？', options: ['没有区别', '=== 不做类型转换', '== 不做类型转换', '=== 只比较值'], correct: 1, explanation: '=== 严格相等，不做类型转换。== 宽松相等，会尝试类型转换后再比较。推荐始终使用 ===。' }
		],
		typescript: [
			{ id: 'ts_1', question: 'TypeScript 中 interface 和 type 的主要区别是什么？', options: ['没有区别', 'interface 可以被 extends/implements', 'type 可以被 extends', 'interface 不能定义对象形状'], correct: 1, explanation: 'interface 支持 extends 和 implements，适合定义对象形状。type 更灵活，支持联合类型、交叉类型等。' },
			{ id: 'ts_2', question: '泛型 <T> 的作用是什么？', options: ['定义变量类型', '创建可复用的类型参数', '声明全局类型', '导入外部类型'], correct: 1, explanation: '泛型允许创建可复用的组件，支持多种类型而不丢失类型信息。如 Array<T> 可以是 Array<number> 或 Array<string>。' },
			{ id: 'ts_3', question: 'any、unknown、never 的区别是什么？', options: ['完全一样', 'any 绕过检查，unknown 需要类型收窄，never 表示不可能的值', 'unknown 和 any 一样', 'never 可以赋值给任何类型'], correct: 1, explanation: 'any 绕过类型检查，unknown 是类型安全的 any（使用前需收窄），never 表示永远不会发生的类型。' },
			{ id: 'ts_4', question: 'TypeScript 的枚举（enum）编译后会变成什么？', options: ['被删除', '变成对象', '变成常量', '变成字符串'], correct: 1, explanation: '数字枚举编译为双向映射的对象，字符串枚举编译为普通对象。const enum 会被内联。' },
			{ id: 'ts_5', question: '条件类型 extends 关键字的作用是？', options: ['继承类', '类型约束和条件判断', '导入模块', '声明变量'], correct: 1, explanation: '在条件类型中，T extends U ? X : Y 表示如果 T 可赋值给 U 则为 X 类型，否则为 Y 类型。' }
		],
		vue: [
			{ id: 'vue_1', question: 'Vue 3 的 Composition API 中，ref 和 reactive 的区别是什么？', options: ['没有区别', 'ref 用于基本类型，reactive 用于对象', 'reactive 用于基本类型', 'ref 不能用于模板'], correct: 1, explanation: 'ref 包装基本类型（访问用 .value），reactive 包装对象（直接访问属性）。ref 也可包装对象。' },
			{ id: 'vue_2', question: 'Vue 中 key 属性的作用是什么？', options: ['设置样式', '帮助 Vue 识别节点身份', '绑定事件', '设置默认值'], correct: 1, explanation: 'key 帮助 Vue 的 diff 算法识别哪些节点是相同的，避免就地复用导致的渲染问题。' },
			{ id: 'vue_3', question: 'computed 和 watch 的区别是什么？', options: ['没有区别', 'computed 有缓存，watch 用于副作用', 'watch 有缓存', 'computed 不能用于模板'], correct: 1, explanation: 'computed 基于依赖缓存，适合派生状态。watch 监听变化执行副作用，适合异步操作或开销大的操作。' },
			{ id: 'vue_4', question: 'Vue 的 nextTick 的作用是什么？', options: ['延迟执行函数', '在 DOM 更新后执行回调', '创建微任务', '设置定时器'], correct: 1, explanation: 'nextTick 在下次 DOM 更新循环结束后执行回调，用于在修改数据后立即获取更新后的 DOM。' },
			{ id: 'vue_5', question: 'Vue Router 中 hash 模式和 history 模式的区别？', options: ['没有区别', 'hash 带 # 号，history 不带', 'history 不支持刷新', 'hash 不能传参'], correct: 1, explanation: 'hash 模式 URL 带 #，通过 hashchange 事件监听。history 模式使用 HTML5 History API，URL 更美观，需要服务端配置。' },
			{ id: 'vue_6', question: 'Vue 3 的 provide/inject 解决了什么问题？', options: ['全局状态管理', '跨层级组件通信', '异步数据请求', '事件监听'], correct: 1, explanation: 'provide/inject 允许祖先组件向所有后代组件注入依赖，解决 props 逐层传递（prop drilling）的问题。' }
		],
		react: [
			{ id: 'react_1', question: 'React 中 useState 的返回值是什么？', options: ['一个值', '一个数组 [state, setState]', '一个对象', '一个函数'], correct: 1, explanation: 'useState 返回 [currentState, setStateFunction] 的数组，通常用解构语法 const [count, setCount] = useState(0)。' },
			{ id: 'react_2', question: 'useEffect 的第二个参数（依赖数组）为空数组时会怎样？', options: ['每次渲染都执行', '只在挂载和卸载时执行', '永远不执行', '报错'], correct: 1, explanation: '空依赖数组意味着 effect 不依赖任何值，只在组件挂载时执行一次，卸载时执行 cleanup。' },
			{ id: 'react_3', question: 'React 中为什么不能在条件语句中调用 Hook？', options: ['语法错误', 'Hook 调用顺序必须保持一致', '性能问题', '安全问题'], correct: 1, explanation: 'React 依赖 Hook 的调用顺序来正确关联 state 和对应的 Hook。条件调用会打乱顺序导致 state 错乱。' },
			{ id: 'react_4', question: '虚拟 DOM 的主要优势是什么？', options: ['减少内存使用', '批量更新减少 DOM 操作', '直接操作真实 DOM', '不需要 diff 算法'], correct: 1, explanation: '虚拟 DOM 通过 diff 算法找出最小变更集，批量更新真实 DOM，减少昂贵的 DOM 操作次数。' },
			{ id: 'react_5', question: 'React.memo 和 useMemo 的区别是什么？', options: ['没有区别', 'memo 用于组件，useMemo 用于值', 'useMemo 用于组件', 'memo 用于值'], correct: 1, explanation: 'React.memo 是高阶组件，缓存组件渲染结果。useMemo 是 Hook，缓存计算结果。两者都用于性能优化。' },
			{ id: 'react_6', question: '受控组件和非受控组件的区别是什么？', options: ['没有区别', '受控组件由 React state 控制值', '非受控组件由 state 控制', '受控组件不能使用表单'], correct: 1, explanation: '受控组件的值由 React state 控制（value + onChange）。非受控组件通过 ref 直接访问 DOM 节点获取值。' }
		],
		engineering: [
			{ id: 'eng_1', question: 'Webpack 中 loader 和 plugin 的区别是什么？', options: ['没有区别', 'loader 转换文件，plugin 扩展构建能力', 'plugin 转换文件', 'loader 不能处理 CSS'], correct: 1, explanation: 'loader 对模块源码进行转换（如 babel-loader）。plugin 在构建生命周期中执行更广泛的任务（如 HtmlWebpackPlugin）。' },
			{ id: 'eng_2', question: 'Tree Shaking 的原理是什么？', options: ['删除注释', '基于 ES Module 静态分析删除未使用代码', '压缩代码', '合并文件'], correct: 1, explanation: 'Tree Shaking 利用 ES Module 的静态结构（import/export），在编译时分析哪些导出没有被使用，然后删除。' },
			{ id: 'eng_3', question: 'HTTP 缓存中，强缓存和协商缓存的区别是什么？', options: ['没有区别', '强缓存不发请求，协商缓存发请求确认', '协商缓存不发请求', '强缓存总是过期'], correct: 1, explanation: '强缓存（Cache-Control/Expires）直接用本地副本。协商缓存（ETag/Last-Modified）向服务器确认是否过期。' },
			{ id: 'eng_4', question: '首屏加载优化中，代码分割（Code Splitting）的作用是？', options: ['减少代码量', '按需加载减少初始包大小', '提高代码质量', '减少 HTTP 请求'], correct: 1, explanation: '代码分割将代码拆分成多个 chunk，首屏只加载必要的代码，其他代码按需加载，减少首屏加载时间。' },
			{ id: 'eng_5', question: 'SSR 和 CSR 的主要区别是什么？', options: ['没有区别', 'SSR 在服务端渲染 HTML，CSR 在浏览器端渲染', 'CSR 更快', 'SSR 不能用 React'], correct: 1, explanation: 'SSR 在服务端生成完整 HTML（首屏快、SEO 好）。CSR 在浏览器端用 JS 渲染（交互快、服务器压力小）。' }
		]
	},

	// ==================== 后端 ====================
	backend: {
		java_basics: [
			{ id: 'java_1', question: 'Java 中 == 和 equals() 的区别是什么？', options: ['没有区别', '== 比较引用，equals() 比较内容', 'equals() 比较引用', '== 比较内容'], correct: 1, explanation: '== 比较引用地址（是否同一对象），equals() 默认也是比较引用，但 String 等类重写为比较内容。' },
			{ id: 'java_2', question: 'Java 中 final 关键字的作用是什么？', options: ['声明常量', '修饰类（不可继承）、方法（不可重写）、变量（不可修改）', '声明抽象方法', '创建线程'], correct: 1, explanation: 'final 修饰类表示不可继承，修饰方法表示不可重写，修饰变量表示不可重新赋值。' },
			{ id: 'java_3', question: 'Java 集合中 ArrayList 和 LinkedList 的区别是什么？', options: ['没有区别', 'ArrayList 基于数组，LinkedList 基于链表', 'LinkedList 基于数组', 'ArrayList 不能随机访问'], correct: 1, explanation: 'ArrayList 基于动态数组，随机访问 O(1)，插入删除 O(n)。LinkedList 基于双向链表，随机访问 O(n)，插入删除 O(1)。' },
			{ id: 'java_4', question: 'Java 中 HashMap 的底层实现原理是什么？', options: ['红黑树', '数组 + 链表 + 红黑树', '链表', '哈希表'], correct: 1, explanation: 'JDK8 的 HashMap 使用数组 + 链表 + 红黑树。数组每个位置是一个桶，冲突时用链表，链表长度 > 8 时转红黑树。' },
			{ id: 'java_5', question: 'Java 中 String、StringBuilder、StringBuffer 的区别？', options: ['完全一样', 'String 不可变，StringBuilder 线程不安全，StringBuffer 线程安全', 'StringBuilder 线程安全', 'String 可变'], correct: 1, explanation: 'String 不可变。StringBuilder 可变、线程不安全、性能好。StringBuffer 可变、线程安全（synchronized）、性能略差。' },
			{ id: 'java_6', question: 'Java 的垃圾回收机制（GC）主要回收哪部分内存？', options: ['栈内存', '堆内存', '方法区', '程序计数器'], correct: 1, explanation: 'GC 主要管理堆内存中的对象。栈内存随方法结束自动释放，不需要 GC。' }
		],
		concurrent_jvm: [
			{ id: 'jvm_1', question: 'Java 中 synchronized 和 ReentrantLock 的区别是什么？', options: ['没有区别', 'synchronized 自动释放，ReentrantLock 需手动释放', 'ReentrantLock 自动释放', 'synchronized 更灵活'], correct: 1, explanation: 'synchronized 自动获取/释放锁。ReentrantLock 需手动 lock()/unlock()，支持公平锁、可中断、条件变量。' },
			{ id: 'jvm_2', question: 'JVM 内存模型中，堆和方法区的区别是什么？', options: ['没有区别', '堆存对象实例，方法区存类信息和常量', '方法区存对象', '堆存类信息'], correct: 1, explanation: '堆存放对象实例（GC 主要区域）。方法区存类元信息、常量池、静态变量。' },
			{ id: 'jvm_3', question: '线程池的核心参数有哪些？', options: ['只有线程数', '核心线程数、最大线程数、队列、拒绝策略', '只有队列', '只有拒绝策略'], correct: 1, explanation: 'ThreadPoolExecutor 7 大参数：corePoolSize、maximumPoolSize、keepAliveTime、unit、workQueue、threadFactory、handler。' },
			{ id: 'jvm_4', question: 'volatile 关键字的作用是什么？', options: ['加锁', '保证可见性和禁止指令重排', '保证原子性', '创建线程'], correct: 1, explanation: 'volatile 保证变量修改对所有线程立即可见，禁止指令重排序优化。但不保证原子性（如 i++ 仍不安全）。' },
			{ id: 'jvm_5', question: 'JVM 类加载过程的顺序是什么？', options: ['加载 → 链接 → 初始化', '链接 → 加载 → 初始化', '初始化 → 加载 → 链接', '加载 → 初始化 → 链接'], correct: 0, explanation: '类加载过程：加载（Loading）→ 链接（Linking：验证+准备+解析）→ 初始化（Initialization）。' }
		],
		mysql: [
			{ id: 'mysql_1', question: 'MySQL 中 InnoDB 和 MyISAM 的主要区别是什么？', options: ['没有区别', 'InnoDB 支持事务和行锁，MyISAM 不支持', 'MyISAM 支持事务', 'InnoDB 不支持索引'], correct: 1, explanation: 'InnoDB 支持事务、行级锁、外键。MyISAM 不支持事务，只有表级锁，但读性能好。' },
			{ id: 'mysql_2', question: 'MySQL 索引使用 B+ 树而不是 B 树的原因是什么？', options: ['B+ 树更简单', 'B+ 树叶子节点链表连接，范围查询高效', 'B 树不能存数据', '没有区别'], correct: 1, explanation: 'B+ 树叶子节点用链表连接，范围查询只需遍历叶子。非叶子节点不存数据，单节点能存更多 key，树更矮。' },
			{ id: 'mysql_3', question: 'MySQL 事务的 ACID 特性分别是什么？', options: ['增删改查', '原子性、一致性、隔离性、持久性', '准确性、完整性、安全性、可靠性', '自动性、并发性、独立性、持续性'], correct: 1, explanation: 'ACID：Atomicity（原子性）、Consistency（一致性）、Isolation（隔离性）、Durability（持久性）。' },
			{ id: 'mysql_4', question: 'MySQL 中什么情况下索引会失效？', options: ['查询条件有索引就一定生效', '对索引列使用函数或运算、LIKE 以 % 开头', '使用 WHERE 子句', '使用 JOIN'], correct: 1, explanation: "索引失效场景：对索引列用函数/运算、LIKE '%xx'、OR 连接非索引列、类型隐式转换等。" },
			{ id: 'mysql_5', question: 'MySQL 的四种事务隔离级别中，哪个是默认的？', options: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'], correct: 2, explanation: 'MySQL InnoDB 默认隔离级别是 REPEATABLE READ（可重复读），通过 MVCC + 间隙锁避免幻读。' }
		],
		redis: [
			{ id: 'redis_1', question: 'Redis 的五种基本数据类型是什么？', options: ['数组、对象、字符串、数字、布尔', 'String、List、Set、Hash、ZSet', 'String、Map、Queue、Stack、Tree', 'Int、Float、String、Bool、Array'], correct: 1, explanation: 'Redis 五种基本类型：String（字符串）、List（列表）、Set（集合）、Hash（哈希）、ZSet（有序集合）。' },
			{ id: 'redis_2', question: 'Redis 为什么这么快？', options: ['使用 SSD', '纯内存操作 + 单线程避免上下文切换 + IO 多路复用', '使用多线程', '数据量小'], correct: 1, explanation: 'Redis 快的原因：数据在内存中、单线程避免锁竞争、IO 多路复用、高效数据结构。' },
			{ id: 'redis_3', question: 'Redis 的持久化方式有哪些？', options: ['只有 RDB', 'RDB（快照）和 AOF（追加日志）', '只有 AOF', '不需要持久化'], correct: 1, explanation: 'RDB 定期生成内存快照（fork 子进程）。AOF 记录每个写命令（可配置同步频率）。生产建议两者都开。' },
			{ id: 'redis_4', question: '缓存穿透、缓存击穿、缓存雪崩的区别是什么？', options: ['都一样', '穿透是查不存在的数据，击穿是热点 key 过期，雪崩是大量 key 同时过期', '都是缓存过期', '都是缓存满了'], correct: 1, explanation: '穿透：查询不存在的数据（布隆过滤器/缓存空值）。击穿：热点 key 过期（互斥锁）。雪崩：大量 key 同时过期（随机过期时间）。' },
			{ id: 'redis_5', question: 'Redis 的过期策略有哪些？', options: ['只有定时删除', '惰性删除 + 定期删除', '只有惰性删除', 'LRU 删除'], correct: 1, explanation: '惰性删除：访问时检查是否过期。定期删除：每隔一段时间随机检查。内存满时还有淘汰策略（LRU/LFU/随机/TTL）。' }
		],
		spring: [
			{ id: 'spring_1', question: 'Spring IOC（控制反转）的核心思想是什么？', options: ['手动创建对象', '对象的创建和依赖关系由容器管理', '使用 new 关键字', '全局变量'], correct: 1, explanation: 'IOC 将对象创建和依赖注入交给 Spring 容器，降低代码耦合度。开发者只需声明依赖，容器负责注入。' },
			{ id: 'spring_2', question: 'Spring AOP 的底层实现原理是什么？', options: ['反射', '动态代理（JDK 动态代理 / CGLIB）', '注解', '编译时增强'], correct: 1, explanation: 'JDK 动态代理基于接口（Proxy + InvocationHandler），CGLIB 基于继承（生成子类）。Spring 根据目标类是否实现接口选择。' },
			{ id: 'spring_3', question: 'Spring Bean 的默认作用域是什么？', options: ['prototype', 'singleton', 'request', 'session'], correct: 1, explanation: '默认 singleton（单例），整个容器只有一个实例。prototype 每次请求创建新实例。' },
			{ id: 'spring_4', question: 'Spring Boot 的自动配置原理是什么？', options: ['手动配置', '@EnableAutoConfiguration 读取 META-INF/spring.factories', 'XML 配置', '注解扫描'], correct: 1, explanation: '@SpringBootApplication 包含 @EnableAutoConfiguration，它读取 spring.factories 中的自动配置类，根据条件注解决定是否生效。' },
			{ id: 'spring_5', question: 'Spring 中 @Transactional 事务失效的场景有哪些？', options: ['不会失效', '方法非 public、同类内部调用、异常被 catch', '只在 private 方法失效', '只在 static 方法失效'], correct: 1, explanation: '失效场景：方法非 public、同类方法自调用（绕过代理）、异常被 catch 未抛出、rollbackFor 设置不当。' }
		],
		design: [
			{ id: 'design_1', question: '单例模式的实现方式中，哪种是线程安全的？', options: ['懒汉式（无同步）', '双重检查锁（DCL）', '饿汉式', 'B 和 C 都是'], correct: 3, explanation: '饿汉式类加载时创建（线程安全）。DCL 加 volatile + 双重检查（线程安全）。懒汉式无同步不安全。' },
			{ id: 'design_2', question: '微服务架构中，服务注册与发现的作用是什么？', options: ['存储数据', '服务动态注册地址，消费方自动发现', '负载均衡', '日志收集'], correct: 1, explanation: '服务启动时注册到注册中心（如 Nacos/Eureka），消费方从注册中心获取服务地址列表，实现动态发现。' },
			{ id: 'design_3', question: '分布式系统中 CAP 理论的三个要素是什么？', options: ['增删改', '一致性、可用性、分区容错性', '安全性、性能、可靠性', '存储、计算、网络'], correct: 1, explanation: 'CAP：Consistency（一致性）、Availability（可用性）、Partition tolerance（分区容错性）。三者最多同时满足两个。' },
			{ id: 'design_4', question: '消息队列（MQ）的主要作用是什么？', options: ['数据库替代', '异步处理、解耦、削峰', '缓存数据', '文件存储'], correct: 1, explanation: 'MQ 三大作用：异步处理（提高响应速度）、系统解耦（生产者消费者独立）、流量削峰（缓冲突发流量）。' },
			{ id: 'design_5', question: 'RESTful API 中，HTTP 方法 GET/POST/PUT/DELETE 分别对应什么操作？', options: ['都一样', '查/增/改/删', '增/删/改/查', '查/改/增/删'], correct: 1, explanation: 'GET 查询、POST 新增、PUT 全量更新、PATCH 部分更新、DELETE 删除。这是 REST 的资源操作约定。' }
		]
	},

	// ==================== 移动端 ====================
	mobile: {
		kotlin_swift: [
			{ id: 'ks_1', question: 'Kotlin 中 val 和 var 的区别是什么？', options: ['没有区别', 'val 不可变，var 可变', 'var 不可变', 'val 只能用于函数'], correct: 1, explanation: 'val 声明只读变量（不可重新赋值），var 声明可变变量。类似 Java 的 final 和非 final。' },
			{ id: 'ks_2', question: 'Swift 中 Optional 的作用是什么？', options: ['存储数组', '表示值可能为 nil', '定义常量', '创建闭包'], correct: 1, explanation: 'Optional 表示变量可能有值也可能是 nil。使用时需要解包（! 强制解包或 ??. 安全解包）。' },
			{ id: 'ks_3', question: 'Kotlin 协程（Coroutine）解决什么问题？', options: ['内存泄漏', '简化异步编程，避免回调地狱', 'UI 渲染', '数据库操作'], correct: 1, explanation: '协程用同步写法处理异步逻辑（suspend 函数），比回调和 RxJava 更简洁。底层复用线程，开销极小。' },
			{ id: 'ks_4', question: 'Swift 中 struct 和 class 的主要区别是什么？', options: ['没有区别', 'struct 值类型，class 引用类型', 'class 值类型', 'struct 不能有方法'], correct: 1, explanation: 'struct 是值类型（赋值时拷贝），class 是引用类型（赋值时共享引用）。struct 不支持继承。' },
			{ id: 'ks_5', question: 'Kotlin 中 ?.（安全调用）和 !!（非空断言）的区别？', options: ['都一样', '?. 遇到 null 返回 null，!! 遇到 null 抛异常', '!! 更安全', '?. 不能链式调用'], correct: 1, explanation: '?. 安全调用：遇到 null 返回 null 不崩溃。!! 非空断言：遇到 null 抛 NPE。推荐用 ?.' }
		],
		android: [
			{ id: 'and_1', question: 'Android 中 Activity 的生命周期方法调用顺序是什么？', options: ['onCreate → onStart → onResume', 'onStart → onCreate → onResume', 'onResume → onCreate → onStart', 'onCreate → onResume → onStart'], correct: 0, explanation: 'Activity 生命周期：onCreate → onStart → onResume（可见可交互）→ onPause → onStop → onDestroy。' },
			{ id: 'and_2', question: 'Android 中 Handler 的作用是什么？', options: ['网络请求', '线程间通信（主线程更新 UI）', '数据存储', '权限申请'], correct: 1, explanation: 'Handler 机制：Handler 发送消息 → MessageQueue 队列 → Looper 循环取出 → Handler 处理。用于子线程通知主线程更新 UI。' },
			{ id: 'and_3', question: 'Jetpack Compose 相比传统 View 系统的优势是什么？', options: ['没有优势', '声明式 UI、状态驱动、代码更简洁', '性能更好', '兼容性更好'], correct: 1, explanation: 'Compose 使用声明式范式描述 UI，状态变化自动更新。代码更简洁，不需要 XML 布局和 findViewById。' },
			{ id: 'and_4', question: 'Android 中 ViewModel 的作用是什么？', options: ['网络请求', '存储 UI 相关数据，配置变更时保留', '数据库操作', '权限管理'], correct: 1, explanation: 'ViewModel 在配置变更（如旋转屏幕）时保留数据，避免 Activity 重建导致数据丢失。生命周期比 Activity 长。' },
			{ id: 'and_5', question: 'Android 中 Room 数据库的优势是什么？', options: ['比 SQLite 更快', '编译时 SQL 验证、LiveData 集成、减少模板代码', '不需要 SQL', '只能存键值对'], correct: 1, explanation: 'Room 是 SQLite 的抽象层，编译时验证 SQL 语法，支持 LiveData/Flow 响应式查询，减少样板代码。' }
		],
		ios: [
			{ id: 'ios_1', question: 'iOS 中 MVC 和 MVVM 的区别是什么？', options: ['没有区别', 'MVVM 多了 ViewModel 层处理业务逻辑', 'MVC 多了 ViewModel', 'MVVM 不需要 Controller'], correct: 1, explanation: 'MVC：Model-View-Controller。MVVM：Model-View-ViewModel，ViewModel 处理视图逻辑，减轻 Controller 负担。' },
			{ id: 'ios_2', question: 'SwiftUI 中 @State 和 @Binding 的区别是什么？', options: ['都一样', '@State 拥有数据，@Binding 引用外部数据', '@Binding 拥有数据', '@State 不能用于 Bool'], correct: 1, explanation: '@State 是数据的唯一来源（拥有者）。@Binding 是对 @State 的引用，子视图通过 @Binding 读写父视图的数据。' },
			{ id: 'ios_3', question: 'iOS 中 ARC（自动引用计数）的工作原理是什么？', options: ['垃圾回收', '编译时插入 retain/release 代码', '手动管理内存', '引用计数 + GC'], correct: 1, explanation: 'ARC 在编译时自动插入 retain（引用+1）和 release（引用-1）代码。引用为 0 时立即释放。不是 GC。' },
			{ id: 'ios_4', question: 'iOS 中 GCD 的主队列和全局队列的区别是什么？', options: ['没有区别', '主队列在主线程执行（UI），全局队列在子线程执行', '全局队列在主线程', '主队列是并发的'], correct: 1, explanation: '主队列（main）串行，在主线程执行，用于更新 UI。全局队列（global）并发，在子线程执行，用于耗时操作。' },
			{ id: 'ios_5', question: 'Swift 中 protocol 和 class 的区别是什么？', options: ['都一样', 'protocol 定义接口规范，class 定义实现', 'class 不能继承', 'protocol 可以有存储属性'], correct: 1, explanation: 'protocol 定义方法和属性的契约（不能有存储属性的默认实现）。class 提供具体实现。Swift 支持 protocol-oriented 编程。' }
		],
		arch: [
			{ id: 'arch_1', question: '移动端组件化开发的目的是什么？', options: ['增加代码量', '解耦模块、独立开发编译、代码复用', '减少功能', '增加复杂度'], correct: 1, explanation: '组件化将 App 拆分为独立模块，各模块独立开发/编译/测试，降低耦合，支持多人并行开发。' },
			{ id: 'arch_2', question: '移动端热修复技术的原理是什么？', options: ['重新发版', '运行时替换类/方法/资源', '服务器渲染', '缓存更新'], correct: 1, explanation: '热修复通过运行时替换有问题的代码。Android 有 Tinker/Sophix，iOS 有 JSPatch（受限）/热重载。' },
			{ id: 'arch_3', question: '移动端图片加载框架（如 Glide/SDWebImage）的核心机制是什么？', options: ['直接下载', '三级缓存（内存 → 磁盘 → 网络）', '只用内存缓存', '只用磁盘缓存'], correct: 1, explanation: '三级缓存：先查内存，再查磁盘，最后网络下载。下载后存入缓存。支持图片压缩、变换、生命周期管理。' },
			{ id: 'arch_4', question: '移动端响应式编程（RxSwift/RxJava）的核心思想是什么？', options: ['回调函数', '数据流 + 变换 + 观察者模式', '事件总线', '多线程'], correct: 1, explanation: '响应式编程将数据视为可观察的流（Observable），通过操作符变换（map/filter/flatMap），观察者订阅处理。' },
			{ id: 'arch_5', question: '跨平台框架（Flutter/RN/UniApp）各自的渲染方式是什么？', options: ['都用 WebView', 'Flutter 自绘引擎，RN 原生组件，UniApp WebView', '都用原生组件', '都用 Canvas'], correct: 1, explanation: 'Flutter 用 Skia 自绘引擎。React Native 映射到原生组件。UniApp 基于 WebView + 原生混合渲染。' }
		],
		perf: [
			{ id: 'mperf_1', question: '移动端内存泄漏的常见原因是什么？', options: ['使用变量', '未释放的引用（闭包/代理/通知未注销）', '使用数组', '使用字符串'], correct: 1, explanation: '常见原因：循环引用、delegate 强引用、通知未移除、定时器未销毁、Block/闭包持有 self。' },
			{ id: 'mperf_2', question: '移动端列表滑动卡顿的优化方案有哪些？', options: ['减少列表项', '图片异步加载、视图复用、减少布局层级、预加载', '不显示图片', '减少数据量'], correct: 1, explanation: '优化：异步加载图片、视图复用（RecyclerView/UITableView）、减少视图层级、避免主线程耗时操作、预加载。' },
			{ id: 'mperf_3', question: '移动端启动优化分为哪几个阶段？', options: ['只有一个阶段', 'pre-main（加载 dylib）和 main 后（首屏渲染）', '网络请求', '数据库初始化'], correct: 1, explanation: 'pre-main：加载动态库、Rebase/Bind、ObjC 初始化。main 后：AppDelegate、首屏 ViewController、首帧渲染。' },
			{ id: 'mperf_4', question: '移动端包体积优化的方法有哪些？', options: ['删除代码', '资源压缩、代码混淆、移除无用代码/资源、动态化', '减少功能', '不使用图片'], correct: 1, explanation: '优化：图片压缩/WebP、代码混淆压缩、Tree Shaking 移除死代码、资源按需加载、插件化动态下发。' },
			{ id: 'mperf_5', question: '移动端网络优化的核心策略是什么？', options: ['增加带宽', '连接复用、协议优化、数据压缩、缓存策略', '减少请求', '使用 WiFi'], correct: 1, explanation: '优化：HTTP/2 多路复用、连接池复用、Protocol Buffers 压缩、DNS 预解析、请求合并、本地缓存。' }
		]
	},

	// ==================== 客户端 ====================
	client: {
		browser: [
			{ id: 'br_1', question: '浏览器渲染页面的主要步骤是什么？', options: ['直接显示', '解析 HTML → 构建 DOM → 构建 CSSOM → 布局 → 绘制', '解析 CSS → 解析 HTML → 绘制', '构建 DOM → 绘制'], correct: 1, explanation: '渲染流程：解析 HTML 构建 DOM 树 → 解析 CSS 构建 CSSOM → 合并为渲染树 → 布局（计算位置）→ 绘制（像素化）。' },
			{ id: 'br_2', question: '什么是回流（Reflow）和重绘（Repaint）？', options: ['都一样', '回流重新计算布局，重绘只重新绘制样式', '重绘更耗性能', '回流只影响颜色'], correct: 1, explanation: '回流：元素尺寸/位置变化，重新计算布局（开销大）。重绘：样式变化不影响布局（如颜色），只重新绘制。回流一定触发重绘。' },
			{ id: 'br_3', question: '浏览器的同源策略（SOP）限制了什么？', options: ['所有请求', '不同源的 JS 读取响应数据', 'GET 请求', 'POST 请求'], correct: 1, explanation: '同源策略限制不同源（协议+域名+端口）的脚本读取响应。CORS 是跨源资源共享的解决方案。' },
			{ id: 'br_4', question: '浏览器的 JavaScript 引擎中，V8 的编译流程是什么？', options: ['直接执行', '源码 → AST → 字节码 → 机器码（JIT）', '源码 → 机器码', '源码 → 字节码'], correct: 1, explanation: 'V8：源码 → Parser 生成 AST → Ignition 解释器生成字节码 → TurboFan 编译器优化热点代码为机器码。' },
			{ id: 'br_5', question: '浏览器的存储方式 Cookie/localStorage/sessionStorage 的区别？', options: ['都一样', 'Cookie 随请求发送，localStorage 持久，sessionStorage 会话级', 'localStorage 随请求发送', 'sessionStorage 持久'], correct: 1, explanation: 'Cookie：自动随请求发送，4KB。localStorage：持久存储，5MB。sessionStorage：会话级，关闭标签页清除。' }
		],
		network: [
			{ id: 'net_1', question: 'TCP 三次握手的过程是什么？', options: ['两次握手', 'SYN → SYN+ACK → ACK', '四次握手', 'ACK → SYN → FIN'], correct: 1, explanation: '客户端发 SYN → 服务端回 SYN+ACK → 客户端发 ACK。三次握手确认双方收发能力正常，防止过期连接请求。' },
			{ id: 'net_2', question: 'HTTP/1.1、HTTP/2、HTTP/3 的主要区别是什么？', options: ['都一样', '1.1 队头阻塞，2 多路复用，3 基于 QUIC/UDP', 'HTTP/3 基于 TCP', 'HTTP/2 基于 UDP'], correct: 1, explanation: 'HTTP/1.1：队头阻塞。HTTP/2：二进制分帧、多路复用、头部压缩。HTTP/3：基于 QUIC（UDP），解决 TCP 队头阻塞。' },
			{ id: 'net_3', question: 'HTTPS 的 TLS 握手过程是什么？', options: ['和 HTTP 一样', 'Client Hello → Server Hello → 证书验证 → 密钥交换 → 加密通信', '只需要证书', '不需要握手'], correct: 1, explanation: 'TLS 握手：客户端发送支持的加密套件 → 服务端选择并发送证书 → 客户端验证证书 → 协商对称密钥 → 加密通信。' },
			{ id: 'net_4', question: 'DNS 解析的过程是什么？', options: ['直接查询', '浏览器缓存 → OS 缓存 → 本地 DNS → 根/顶级/权威 DNS', '只查一次', '直接问根服务器'], correct: 1, explanation: '递归查询：浏览器缓存 → OS 缓存 → hosts 文件 → 本地 DNS 服务器 → 根 DNS → 顶级域名 DNS → 权威 DNS。' },
			{ id: 'net_5', question: 'WebSocket 和 HTTP 的区别是什么？', options: ['都一样', 'WebSocket 全双工持久连接，HTTP 请求-响应', 'HTTP 是持久连接', 'WebSocket 基于 UDP'], correct: 1, explanation: 'HTTP：请求-响应模式，单向。WebSocket：全双工，客户端和服务端可互发消息，适合实时通信（聊天/推送）。' }
		],
		security: [
			{ id: 'sec_1', question: 'XSS（跨站脚本攻击）的原理和防御方法是什么？', options: ['注入 SQL', '注入恶意脚本到页面，防御：转义输出、CSP', '暴力破解密码', 'DDoS 攻击'], correct: 1, explanation: 'XSS 将恶意 JS 注入页面，窃取 Cookie/数据。防御：输出转义、Content-Security-Policy、HttpOnly Cookie。' },
			{ id: 'sec_2', question: 'CSRF（跨站请求伪造）的原理和防御方法是什么？', options: ['和 XSS 一样', '利用用户已登录状态伪造请求，防御：Token/Referer/SameSite', '注入脚本', 'SQL 注入'], correct: 1, explanation: 'CSRF 诱导用户访问恶意页面，利用浏览器自动发送 Cookie 的特性伪造请求。防御：CSRF Token、Referer 检查、SameSite Cookie。' },
			{ id: 'sec_3', question: 'SQL 注入的原理和防御方法是什么？', options: ['注入 JS', '拼接恶意 SQL，防御：参数化查询/预编译', '暴力破解', 'XSS 攻击'], correct: 1, explanation: 'SQL 注入通过拼接恶意 SQL 语句操作数据库。防御：参数化查询（PreparedStatement）、ORM 框架、输入验证。' },
			{ id: 'sec_4', question: 'JWT（JSON Web Token）的组成结构是什么？', options: ['只有签名', 'Header.Payload.Signature', '用户名+密码', 'Session ID'], correct: 1, explanation: 'JWT 三部分：Header（算法类型）、Payload（用户信息/声明）、Signature（签名验证完整性）。用 . 连接。' },
			{ id: 'sec_5', question: '什么是中间人攻击（MITM）？如何防御？', options: ['DDoS 攻击', '攻击者截获通信，防御：HTTPS + 证书验证', '暴力破解', 'SQL 注入'], correct: 1, explanation: '中间人攻击拦截客户端和服务器的通信。防御：使用 HTTPS、证书固定（Certificate Pinning）、不忽略证书警告。' }
		],
		perf: [
			{ id: 'cperf_1', question: '前端性能指标 LCP/FID/CLS 分别代表什么？', options: ['加载时间', '最大内容绘制/首次输入延迟/累积布局偏移', '代码行数', '文件大小'], correct: 1, explanation: 'LCP（Largest Contentful Paint）：最大内容渲染时间。FID（First Input Delay）：首次输入延迟。CLS（Cumulative Layout Shift）：布局稳定性。' },
			{ id: 'cperf_2', question: '减少 HTTP 请求数的方法有哪些？', options: ['增加请求', '合并文件、雪碧图、内联资源、懒加载', '使用 CDN', '增加缓存'], correct: 1, explanation: '减少请求：CSS/JS 合并、图片雪碧图、小图 Base64 内联、路由级代码分割+懒加载。' },
			{ id: 'cperf_3', question: 'CDN（内容分发网络）的加速原理是什么？', options: ['增加带宽', '将内容缓存到离用户最近的节点', '压缩数据', '减少 DNS 查询'], correct: 1, explanation: 'CDN 在全球部署边缘节点，用户请求就近节点获取资源，减少网络延迟和带宽消耗。' },
			{ id: 'cperf_4', question: '什么是懒加载（Lazy Loading）？适用于什么场景？', options: ['预加载所有资源', '延迟加载非首屏资源，适用于图片和路由', '立即加载', '缓存资源'], correct: 1, explanation: '懒加载在需要时才加载：图片进入视口时加载、路由切换时加载对应 chunk。减少首屏加载时间。' },
			{ id: 'cperf_5', question: 'Chrome DevTools 的 Performance 面板可以分析什么？', options: ['只能看网络', '运行时性能（JS 执行、渲染、绘制）', '只能看 DOM', '只能看 CSS'], correct: 1, explanation: 'Performance 面板录制运行时性能：JS 执行时间、Layout（回流）、Paint（重绘）、Composite（合成），找出性能瓶颈。' }
		],
		debug: [
			{ id: 'dbg_1', question: 'Chrome DevTools 中 Elements 面板的作用是什么？', options: ['调试 JS', '实时查看和修改 DOM/CSS', '查看网络请求', '查看控制台'], correct: 1, explanation: 'Elements 面板实时查看 DOM 结构、修改元素属性/样式、查看计算样式、调试 CSS 布局。' },
			{ id: 'dbg_2', question: '如何调试移动端 H5 页面？', options: ['alert 调试', 'Chrome Remote Debugging / vConsole / Eruda', '不能调试', '只用 console.log'], correct: 1, explanation: 'Chrome 连接 Android 远程调试。iOS 用 Safari Web Inspector。vConsole/Eruda 注入调试面板到页面。' },
			{ id: 'dbg_3', question: 'Source Map 的作用是什么？', options: ['压缩代码', '将编译后的代码映射回源码，方便调试', '加密代码', '打包代码'], correct: 1, explanation: 'Source Map 记录编译/压缩后的代码与源码的映射关系。浏览器可以用它在 DevTools 中显示原始源码。' },
			{ id: 'dbg_4', question: 'console.time/timeEnd 的作用是什么？', options: ['打印时间', '测量代码执行时间', '设置定时器', '显示当前时间'], correct: 1, explanation: "console.time('label') 开始计时，console.timeEnd('label') 结束并打印耗时。用于性能测量。" },
			{ id: 'dbg_5', question: '如何定位内存泄漏？', options: ['看控制台', 'Chrome DevTools Memory 面板（堆快照/分配时间线）', '看网络', '看 Elements'], correct: 1, explanation: 'Memory 面板：Heap Snapshot 对比找出增长的对象、Allocation Timeline 找出分配热点、Detached DOM 找出未释放的 DOM。' }
		]
	},

	// ==================== 嵌入式 ====================
	embedded: {
		c_cpp: [
			{ id: 'cc_1', question: 'C 语言中指针和数组的区别是什么？', options: ['完全一样', '指针是变量存地址，数组是连续内存块', '数组是指针', '指针不能指向数组'], correct: 1, explanation: '指针变量存储地址（可重新指向）。数组名是首元素地址常量（不可重新赋值）。数组可退化为指针。' },
			{ id: 'cc_2', question: 'C++ 中虚函数的作用是什么？', options: ['提高性能', '实现运行时多态（动态绑定）', '节省内存', '定义接口'], correct: 1, explanation: '虚函数通过 vtable（虚函数表）实现运行时多态。基类指针调用派生类重写的函数。非虚函数是编译时绑定。' },
			{ id: 'cc_3', question: 'C++ 中智能指针 shared_ptr 和 unique_ptr 的区别？', options: ['都一样', 'shared_ptr 共享所有权，unique_ptr 独占所有权', 'unique_ptr 可以共享', 'shared_ptr 不能拷贝'], correct: 1, explanation: 'shared_ptr 引用计数，可拷贝共享。unique_ptr 独占所有权，不可拷贝只能移动。优先用 unique_ptr。' },
			{ id: 'cc_4', question: 'C 语言中 malloc/free 和 new/delete 的区别？', options: ['都一样', 'malloc 是 C 函数（不调构造），new 是 C++ 运算符（调构造）', 'new 是 C 函数', 'malloc 调构造函数'], correct: 1, explanation: 'malloc/free 只分配/释放内存。new/delete 分配内存 + 调用构造/析构函数。C++ 推荐用 new/delete。' },
			{ id: 'cc_5', question: 'C++ 中 RAII 是什么？', options: ['内存泄漏', '资源获取即初始化（构造获取，析构释放）', '异常处理', '模板编程'], correct: 1, explanation: 'RAII：构造函数获取资源，析构函数释放资源。利用栈对象自动析构的特性，避免资源泄漏（如智能指针、锁守卫）。' },
			{ id: 'cc_6', question: 'C 语言中 volatile 关键字的作用是什么？', options: ['加锁', '告诉编译器不要优化该变量的读写', '声明常量', '创建线程'], correct: 1, explanation: 'volatile 告诉编译器变量可能被外部修改（硬件/中断），禁止编译器优化（如缓存到寄存器）。嵌入式必备。' }
		],
		os: [
			{ id: 'os_1', question: '进程和线程的区别是什么？', options: ['都一样', '进程是资源分配单位，线程是 CPU 调度单位', '线程是资源分配单位', '进程不能通信'], correct: 1, explanation: '进程拥有独立地址空间（资源分配单位）。线程是进程内的执行单元（CPU 调度单位），共享进程资源。' },
			{ id: 'os_2', question: '什么是死锁？产生死锁的四个必要条件是什么？', options: ['程序卡住', '互斥、持有并等待、不可剥夺、循环等待', '内存不足', 'CPU 满载'], correct: 1, explanation: '死锁四条件：互斥、持有并等待、不可剥夺、循环等待。破坏任一条件可预防死锁。' },
			{ id: 'os_3', question: '虚拟内存的作用是什么？', options: ['增加物理内存', '为每个进程提供独立的地址空间，支持大于物理内存的程序', '加速 CPU', '减少磁盘使用'], correct: 1, explanation: '虚拟内存通过页表映射虚拟地址到物理地址，支持内存隔离、内存超分配（页面换出到磁盘）。' },
			{ id: 'os_4', question: '操作系统中用户态和内核态的区别是什么？', options: ['都一样', '内核态可访问所有资源，用户态受限', '用户态权限更高', '内核态不能执行 IO'], correct: 1, explanation: '内核态：可访问所有硬件和内存。用户态：受限，需通过系统调用陷入内核态执行特权操作。' },
			{ id: 'os_5', question: '页面置换算法 LRU 的原理是什么？', options: ['先进先出', '淘汰最久未使用的页面', '随机淘汰', '淘汰最小的页面'], correct: 1, explanation: 'LRU（Least Recently Used）：当内存满时，淘汰最近最久未被访问的页面。用链表+哈希实现 O(1)。' }
		],
		network: [
			{ id: 'ennet_1', question: 'OSI 七层模型从下到上是什么？', options: ['五层', '物理→数据链路→网络→传输→会话→表示→应用', '四层', 'TCP/IP 五层'], correct: 1, explanation: 'OSI 七层：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。实际常用 TCP/IP 四层模型。' },
			{ id: 'ennet_2', question: 'TCP 和 UDP 的区别是什么？', options: ['都一样', 'TCP 可靠有序，UDP 不可靠但快', 'UDP 可靠', 'TCP 基于 UDP'], correct: 1, explanation: 'TCP：面向连接、可靠传输、有序、流量控制。UDP：无连接、不可靠、无序、但开销小延迟低。' },
			{ id: 'ennet_3', question: 'IP 地址中子网掩码的作用是什么？', options: ['加密', '区分网络地址和主机地址', '加速路由', '过滤流量'], correct: 1, explanation: '子网掩码与 IP 地址做 AND 运算得到网络地址。用于判断目标 IP 是否在同一子网，决定直接发送还是路由。' },
			{ id: 'ennet_4', question: 'ARP 协议的作用是什么？', options: ['分配 IP', '根据 IP 地址获取 MAC 地址', '域名解析', '路由选择'], correct: 1, explanation: 'ARP（地址解析协议）将网络层 IP 地址解析为数据链路层 MAC 地址。广播请求，单播响应。' },
			{ id: 'ennet_5', question: '什么是 NAT（网络地址转换）？', options: ['加密协议', '将私有 IP 转换为公网 IP', '路由协议', 'DNS 协议'], correct: 1, explanation: 'NAT 将内网私有 IP 转换为公网 IP，解决 IPv4 地址不足。路由器维护 NAT 映射表。' }
		],
		hardware: [
			{ id: 'hw_1', question: '嵌入式系统中中断（Interrupt）的作用是什么？', options: ['延迟执行', 'CPU 暂停当前任务响应紧急事件', '增加功耗', '减少代码量'], correct: 1, explanation: '中断让 CPU 暂停当前执行，跳转到中断服务程序（ISR）处理紧急事件（如外设数据到达、定时器溢出）。' },
			{ id: 'hw_2', question: 'GPIO 的输入模式和输出模式的区别是什么？', options: ['都一样', '输入模式读取引脚电平，输出模式设置引脚电平', '输入模式设置电平', '输出模式读取电平'], correct: 1, explanation: 'GPIO 输入模式：读取外部信号（按键、传感器）。输出模式：控制外部设备（LED、继电器）。' },
			{ id: 'hw_3', question: 'UART、SPI、I2C 三种通信协议的特点是什么？', options: ['都一样', 'UART 简单两线，SPI 高速四线，I2C 多设备两线', 'SPI 最慢', 'I2C 只能两个设备'], correct: 1, explanation: 'UART：异步、全双工、点对点。SPI：同步、全双工、高速、主从模式。I2C：同步、半双工、多设备寻址。' },
			{ id: 'hw_4', question: '嵌入式中 DMA 的作用是什么？', options: ['增加 CPU 负担', '数据直接在内存和外设间传输，不经过 CPU', '加密数据', '压缩数据'], correct: 1, explanation: 'DMA（直接内存访问）让外设和内存直接传输数据，CPU 不参与搬运，释放 CPU 算力。' },
			{ id: 'hw_5', question: '看门狗定时器（Watchdog Timer）的作用是什么？', options: ['看时间', '程序跑飞时自动复位系统', '定时关机', '计时器'], correct: 1, explanation: '看门狗需要程序定期"喂狗"（重置计数器）。如果程序跑飞未喂狗，计数器溢出触发系统复位。' }
		],
		rtos: [
			{ id: 'rtos_1', question: 'RTOS（实时操作系统）和普通 OS 的区别是什么？', options: ['都一样', 'RTOS 保证任务在确定时间内响应', 'RTOS 更大', '普通 OS 更快'], correct: 1, explanation: 'RTOS 关键特性：确定性响应（硬实时）、低延迟、任务优先级抢占。适合对时间敏感的嵌入式场景。' },
			{ id: 'rtos_2', question: 'FreeRTOS 中任务调度策略有哪些？', options: ['只有 FIFO', '抢占式、时间片轮转、协作式', '只有时间片', '只有协作式'], correct: 1, explanation: 'FreeRTOS 默认抢占式调度（高优先级立即抢占）。同优先级任务用时间片轮转。协作式需任务主动让出。' },
			{ id: 'rtos_3', question: 'RTOS 中信号量（Semaphore）和互斥量（Mutex）的区别？', options: ['都一样', '信号量用于同步/资源计数，互斥量用于互斥锁', '互斥量用于计数', '信号量不能用于同步'], correct: 1, explanation: '信号量：计数型，控制资源访问数量（如缓冲区）。互斥量：二值型，保护临界区（有优先级继承）。' },
			{ id: 'rtos_4', question: 'RTOS 中消息队列的作用是什么？', options: ['存储文件', '任务间传递数据（异步通信）', '全局变量', '中断处理'], correct: 1, explanation: '消息队列是任务间通信机制：生产者发送消息到队列，消费者从队列接收。支持超时、优先级排序。' },
			{ id: 'rtos_5', question: '嵌入式调试中 JTAG 和 SWD 的区别是什么？', options: ['都一样', 'JTAG 引脚多功能全，SWD 引脚少够用', 'SWD 功能更多', 'JTAG 引脚更少'], correct: 1, explanation: 'JTAG：4-5 线，支持边界扫描、多设备串联。SWD：2 线（CLK+DIO），引脚少，适合引脚紧张的 MCU。' }
		]
	},

	// ==================== AI ====================
	ai: {
		python: [
			{ id: 'py_1', question: 'Python 中列表（list）和元组（tuple）的区别是什么？', options: ['都一样', 'list 可变，tuple 不可变', 'tuple 可变', 'list 不可变'], correct: 1, explanation: 'list 用 [] 定义，可增删改。tuple 用 () 定义，创建后不可修改。tuple 更安全，可作为字典 key。' },
			{ id: 'py_2', question: 'Python 的 GIL（全局解释器锁）是什么？', options: ['内存锁', '限制同一时刻只有一个线程执行 Python 字节码', '数据库锁', '文件锁'], correct: 1, explanation: 'GIL 是 CPython 的全局锁，限制多线程并行（CPU 密集型任务受影响）。IO 密集型不受太大影响。用多进程绕过。' },
			{ id: 'py_3', question: 'Python 中装饰器（Decorator）的作用是什么？', options: ['修改类', '在不修改原函数代码的情况下扩展功能', '定义变量', '创建对象'], correct: 1, explanation: '装饰器是一个接受函数作为参数并返回新函数的高阶函数。用 @decorator 语法，常用于日志、权限、缓存。' },
			{ id: 'py_4', question: 'Python 中 *args 和 **kwargs 的区别是什么？', options: ['都一样', '*args 接收位置参数（元组），**kwargs 接收关键字参数（字典）', '**kwargs 接收位置参数', '*args 接收关键字参数'], correct: 1, explanation: '*args 将不定数量位置参数打包为元组。**kwargs 将不定数量关键字参数打包为字典。' },
			{ id: 'py_5', question: 'Python 的生成器（Generator）和列表推导式的区别？', options: ['都一样', '生成器惰性求值（逐个产生），列表推导式立即生成全部', '列表推导式惰性求值', '生成器更快'], correct: 1, explanation: '列表推导式 [x for x in range(10)] 立即生成全部元素。生成器 (x for x in range(10)) 逐个产生，节省内存。' },
			{ id: 'py_6', question: 'Python 中浅拷贝和深拷贝的区别是什么？', options: ['都一样', '浅拷贝只拷贝引用，深拷贝递归拷贝所有嵌套对象', '深拷贝只拷贝引用', '浅拷贝更彻底'], correct: 1, explanation: '浅拷贝（copy.copy）：新对象，但内部嵌套对象仍是引用。深拷贝（copy.deepcopy）：递归拷贝所有层级。' }
		],
		ml: [
			{ id: 'ml_1', question: '监督学习和无监督学习的区别是什么？', options: ['都一样', '监督学习有标签，无监督学习没有标签', '无监督学习有标签', '监督学习不需要数据'], correct: 1, explanation: '监督学习：训练数据有标签（分类/回归）。无监督学习：无标签（聚类/降维）。半监督学习介于两者之间。' },
			{ id: 'ml_2', question: '过拟合（Overfitting）的表现和解决方法是什么？', options: ['训练和测试都差', '训练好测试差，解决：正则化/交叉验证/增加数据/简化模型', '训练差测试好', '不会发生'], correct: 1, explanation: '过拟合：模型"记住"训练数据，泛化能力差。解决：L1/L2 正则化、Dropout、数据增强、早停、交叉验证。' },
			{ id: 'ml_3', question: '决策树和随机森林的区别是什么？', options: ['都一样', '随机森林是多棵决策树的集成（Bagging）', '决策树是多棵树', '随机森林只有一棵树'], correct: 1, explanation: '随机森林用 Bagging 方法训练多棵决策树，投票/平均得到最终结果。减少过拟合，提高泛化能力。' },
			{ id: 'ml_4', question: '特征工程中，标准化和归一化的区别是什么？', options: ['都一样', '标准化使均值0方差1，归一化缩放到[0,1]', '归一化使均值0', '标准化缩放到[0,1]'], correct: 1, explanation: '标准化（Z-score）：(x-μ)/σ，均值 0 方差 1。归一化（Min-Max）：(x-min)/(max-min)，缩放到 [0,1]。' },
			{ id: 'ml_5', question: '交叉验证（Cross Validation）的目的是什么？', options: ['增加数据', '更可靠地评估模型泛化能力', '加速训练', '减少特征'], correct: 1, explanation: 'K 折交叉验证将数据分 K 份，轮流用 1 份验证、K-1 份训练。减少单次划分的随机性，更可靠评估模型。' }
		],
		dl: [
			{ id: 'dl_1', question: '神经网络中激活函数 ReLU 的特点是什么？', options: ['输出范围 [-1,1]', 'f(x)=max(0,x)，解决梯度消失，计算简单', '输出范围 [0,1]', '不可导'], correct: 1, explanation: 'ReLU：x>0 时输出 x，x<=0 时输出 0。解决 sigmoid 的梯度消失问题，计算高效。Dead ReLU 是其缺点。' },
			{ id: 'dl_2', question: 'CNN 中卷积层的作用是什么？', options: ['减少参数', '提取局部特征（边缘/纹理/形状）', '全连接', '分类'], correct: 1, explanation: '卷积层用卷积核扫描输入，提取局部空间特征。浅层提取边缘/纹理，深层提取高级语义特征。参数共享减少参数量。' },
			{ id: 'dl_3', question: '反向传播（Backpropagation）算法的原理是什么？', options: ['前向计算', '链式法则计算梯度，梯度下降更新参数', '随机更新', '不需要梯度'], correct: 1, explanation: '反向传播利用链式法则从输出层向输入层逐层计算损失对每个参数的梯度，然后用梯度下降更新参数。' },
			{ id: 'dl_4', question: 'Batch Normalization 的作用是什么？', options: ['增加参数', '加速训练、减少内部协变量偏移', '减少层数', '增加非线性'], correct: 1, explanation: 'BN 对每层输入做归一化（均值 0 方差 1），加速训练收敛，允许更大学习率，有轻微正则化效果。' },
			{ id: 'dl_5', question: 'Transformer 中 Self-Attention 的作用是什么？', options: ['卷积操作', '计算序列中每个位置与其他位置的关联度', '池化操作', '全连接'], correct: 1, explanation: 'Self-Attention 计算 Query、Key、Value，通过 QK^T 得到注意力权重，加权求和 Value。捕获序列内长距离依赖。' }
		],
		nlp_llm: [
			{ id: 'nlp_1', question: 'Word2Vec 的两种训练方式是什么？', options: ['分类和回归', 'CBOW（上下文预测中心词）和 Skip-gram（中心词预测上下文）', '监督和无监督', '前向和反向'], correct: 1, explanation: 'CBOW：用周围词预测中心词（快，适合高频词）。Skip-gram：用中心词预测周围词（慢，适合低频词）。' },
			{ id: 'nlp_2', question: 'BERT 和 GPT 的主要区别是什么？', options: ['都一样', 'BERT 双向编码（理解），GPT 单向生成（生成）', 'GPT 双向', 'BERT 用于生成'], correct: 1, explanation: 'BERT：双向 Transformer 编码器，擅长理解任务（分类/问答）。GPT：单向 Transformer 解码器，擅长生成任务。' },
			{ id: 'nlp_3', question: '大语言模型（LLM）中的 Prompt Engineering 是什么？', options: ['训练模型', '设计输入提示以引导模型输出期望结果', '部署模型', '压缩模型'], correct: 1, explanation: 'Prompt Engineering 通过精心设计输入提示（指令/示例/约束）引导 LLM 生成高质量输出，无需微调模型。' },
			{ id: 'nlp_4', question: 'RAG（检索增强生成）的原理是什么？', options: ['只检索', '检索相关文档 + 拼接到 prompt + LLM 生成答案', '只生成', '训练新模型'], correct: 1, explanation: 'RAG：用户提问 → 检索知识库相关文档 → 拼接到 prompt → LLM 基于检索结果生成答案。解决 LLM 知识过时/幻觉问题。' },
			{ id: 'nlp_5', question: 'LLM 微调（Fine-tuning）和 Prompt Engineering 的区别？', options: ['都一样', '微调修改模型参数，Prompt 不修改模型', 'Prompt 修改参数', '微调不需要数据'], correct: 1, explanation: '微调：用特定数据继续训练模型（修改权重），成本高效果好。Prompt：不改模型，只改输入，成本低但效果有限。' }
		],
		engineering: [
			{ id: 'aieng_1', question: '模型部署中 ONNX 格式的作用是什么？', options: ['训练模型', '跨框架的通用模型格式，方便部署到不同平台', '压缩模型', '可视化模型'], correct: 1, explanation: 'ONNX（Open Neural Network Exchange）是开放的模型格式，PyTorch 训练的模型可转为 ONNX 部署到 TensorRT/ONNX Runtime 等。' },
			{ id: 'aieng_2', question: '模型量化（Quantization）的作用是什么？', options: ['增加精度', '降低模型精度（FP32→INT8）以减小体积和加速推理', '增加模型大小', '增加训练速度'], correct: 1, explanation: '量化将浮点权重转为低精度（如 INT8），模型体积缩小 4x，推理加速，精度略有损失。适合边缘部署。' },
			{ id: 'aieng_3', question: 'MLOps 的核心目标是什么？', options: ['只训练模型', '将机器学习模型可靠地部署到生产环境并持续监控', '只做数据处理', '只做可视化'], correct: 1, explanation: 'MLOps：模型版本管理、自动化训练流水线、A/B 测试、模型监控（漂移检测）、持续迭代。将 ML 工程化。' },
			{ id: 'aieng_4', question: '什么是模型蒸馏（Knowledge Distillation）？', options: ['删除模型', '用大模型（教师）的输出训练小模型（学生）', '增加模型', '压缩数据'], correct: 1, explanation: '模型蒸馏让小模型学习大模型的输出分布（soft labels），而不是直接学标签。小模型获得接近大模型的性能。' },
			{ id: 'aieng_5', question: 'AI 应用中的数据标注质量为什么重要？', options: ['不重要', '数据质量直接决定模型质量（Garbage In Garbage Out）', '只影响速度', '只影响大小'], correct: 1, explanation: '训练数据的标注质量直接影响模型性能。噪声标签会导致模型学到错误模式。数据清洗和标注质量控制是 AI 工程的核心。' }
		]
	},

	// ==================== DevOps ====================
	devops: {
		linux: [
			{ id: 'lnx_1', question: 'Linux 中文件权限 rwx 分别代表什么？', options: ['读写执行', '读（read）、写（write）、执行（execute）', '复制粘贴删除', '查看编辑运行'], correct: 1, explanation: 'r=4 读取，w=2 写入，x=1 执行。rwx=7（所有权限），rw-=6，r--=4。分属主/组/其他三组。' },
			{ id: 'lnx_2', question: 'Linux 中管道符 | 的作用是什么？', options: ['连接命令', '将前一个命令的输出作为后一个命令的输入', '并行执行', '后台执行'], correct: 1, explanation: '管道符 | 将左侧命令的 stdout 连接到右侧命令的 stdin。如 `ps aux | grep nginx` 过滤进程。' },
			{ id: 'lnx_3', question: 'Linux 中 crontab 定时任务的格式是什么？', options: ['时间 + 命令', '分 时 日 月 周 + 命令', '命令 + 时间', '只有命令'], correct: 1, explanation: 'crontab 格式：分(0-59) 时(0-23) 日(1-31) 月(1-12) 周(0-7) 命令。如 `0 2 * * * backup.sh` 每天凌晨 2 点。' },
			{ id: 'lnx_4', question: 'Linux 中 grep 命令的作用是什么？', options: ['查找文件', '在文本中搜索匹配的行', '排序', '统计行数'], correct: 1, explanation: 'grep 在文件或输入中搜索匹配正则表达式的行。常用：`grep -r "keyword" ./` 递归搜索目录。' },
			{ id: 'lnx_5', question: 'Linux 中 systemd 的作用是什么？', options: ['编译器', '系统和服务管理器（启动/停止/管理系统服务）', '包管理器', '文件系统'], correct: 1, explanation: 'systemd 是 Linux 的 init 系统，管理服务生命周期。`systemctl start/stop/status nginx` 管理服务。' }
		],
		docker_k8s: [
			{ id: 'dk_1', question: 'Docker 容器和虚拟机的区别是什么？', options: ['都一样', '容器共享宿主机内核（轻量），虚拟机有独立内核（重量）', '虚拟机更轻', '容器有独立内核'], correct: 1, explanation: '容器：共享宿主机内核，启动秒级，体积小。虚拟机：完整 OS，启动分钟级，隔离性更强。' },
			{ id: 'dk_2', question: 'Dockerfile 中 CMD 和 ENTRYPOINT 的区别？', options: ['都一样', 'ENTRYPOINT 是容器入口（不可被覆盖），CMD 是默认参数（可被覆盖）', 'CMD 不可被覆盖', 'ENTRYPOINT 可被覆盖'], correct: 1, explanation: 'ENTRYPOINT 定义容器启动时执行的命令。CMD 提供默认参数，docker run 的参数会覆盖 CMD。' },
			{ id: 'dk_3', question: 'Kubernetes 中 Pod 和 Container 的关系是什么？', options: ['都一样', 'Pod 包含一个或多个 Container，共享网络和存储', 'Container 包含 Pod', '没有关系'], correct: 1, explanation: 'Pod 是 K8s 最小部署单元，包含一个或多个紧密关联的容器。同一 Pod 内容器共享网络（localhost）和存储卷。' },
			{ id: 'dk_4', question: 'Kubernetes 中 Service 的作用是什么？', options: ['存储数据', '为 Pod 提供稳定的网络访问入口（负载均衡）', '调度 Pod', '监控 Pod'], correct: 1, explanation: 'Service 为一组 Pod 提供稳定的虚拟 IP 和 DNS 名，自动负载均衡。Pod IP 会变，Service IP 不变。' },
			{ id: 'dk_5', question: 'Docker Compose 的作用是什么？', options: ['构建镜像', '用 YAML 文件定义和运行多容器应用', '推送镜像', '监控容器'], correct: 1, explanation: 'Docker Compose 用 docker-compose.yml 定义多个服务、网络、卷，一条命令 `docker-compose up` 启动整个应用栈。' }
		],
		cicd: [
			{ id: 'cicd_1', question: 'CI 和 CD 分别代表什么？', options: ['都一样', 'CI=持续集成，CD=持续交付/部署', 'CI=持续部署', 'CD=持续集成'], correct: 1, explanation: 'CI（持续集成）：代码频繁合并到主分支，自动构建+测试。CD（持续交付/部署）：自动发布到生产环境。' },
			{ id: 'cicd_2', question: 'Jenkins Pipeline 中 Jenkinsfile 的作用是什么？', options: ['配置文件', '用代码定义 CI/CD 流水线（Pipeline as Code）', '日志文件', '部署脚本'], correct: 1, explanation: 'Jenkinsfile 将 CI/CD 流程定义为代码（声明式/脚本式），版本控制，支持多阶段（Build/Test/Deploy）。' },
			{ id: 'cicd_3', question: 'GitLab CI/CD 中 .gitlab-ci.yml 的作用是什么？', options: ['配置 Git', '定义 CI/CD 流水线（stages/jobs/scripts）', '定义权限', '定义分支'], correct: 1, explanation: '.gitlab-ci.yml 定义 stages（阶段）、jobs（任务）、scripts（脚本）。GitLab Runner 执行。' },
			{ id: 'cicd_4', question: '蓝绿部署和滚动更新的区别是什么？', options: ['都一样', '蓝绿部署有两套环境切换，滚动更新逐步替换实例', '滚动更新有两套环境', '蓝绿部署逐步替换'], correct: 1, explanation: '蓝绿部署：新旧两套环境，切换流量。滚动更新：逐步用新版本替换旧版本实例。蓝绿回滚快但资源翻倍。' },
			{ id: 'cicd_5', question: '什么是金丝雀发布（Canary Release）？', options: ['全量发布', '先让少量用户使用新版本，逐步扩大范围', '回滚', 'A/B 测试'], correct: 1, explanation: '金丝雀发布先将新版本部署到少量服务器（5-10%流量），观察指标正常后逐步扩大。出问题只影响少量用户。' }
		],
		monitor: [
			{ id: 'mon_1', question: 'Prometheus 的数据模型是什么？', options: ['关系型数据库', '时间序列数据库（指标名 + 标签 + 时间戳 + 值）', '文档数据库', '图数据库'], correct: 1, explanation: 'Prometheus 以时间序列存储指标：metric_name{label1="v1",label2="v2"} value timestamp。拉取模式采集。' },
			{ id: 'mon_2', question: 'Grafana 的作用是什么？', options: ['数据采集', '数据可视化和仪表板', '告警', '日志收集'], correct: 1, explanation: 'Grafana 连接多种数据源（Prometheus/Elasticsearch/InfluxDB），创建可视化仪表板和告警规则。' },
			{ id: 'mon_3', question: 'ELK Stack 的三个组件分别是什么？', options: ['容器工具', 'Elasticsearch + Logstash + Kibana（日志收集分析）', '监控工具', 'CI/CD 工具'], correct: 1, explanation: 'ELK：Elasticsearch（搜索存储）、Logstash（日志收集处理）、Kibana（可视化查询）。日志分析标准方案。' },
			{ id: 'mon_4', question: '告警中什么是告警降噪（Alert Deduplication）？', options: ['关闭告警', '合并重复/相似告警，避免告警风暴', '增加告警', '忽略告警'], correct: 1, explanation: '告警降噪：合并相同告警、设置静默期、告警聚合。避免一个故障触发几百条告警（告警风暴）。' },
			{ id: 'mon_5', question: 'SLI/SLO/SLA 的区别是什么？', options: ['都一样', 'SLI 是指标，SLO 是目标，SLA 是协议', 'SLA 是指标', 'SLO 是协议'], correct: 1, explanation: 'SLI（指标）：如可用性 99.9%。SLO（目标）：如可用性 > 99.95%。SLA（协议）：与客户约定的 SLO + 违约赔偿。' }
		],
		cloud: [
			{ id: 'cloud_1', question: 'IaaS/PaaS/SaaS 的区别是什么？', options: ['都一样', 'IaaS 管基础设施，PaaS 管平台，SaaS 管应用', 'SaaS 管基础设施', 'IaaS 管应用'], correct: 1, explanation: 'IaaS（VM/存储/网络）：用户管 OS 以上。PaaS（App Engine）：用户只管代码。SaaS（Gmail）：用户只管使用。' },
			{ id: 'cloud_2', question: 'AWS/Azure/GCP 的主要计算服务分别是什么？', options: ['都一样', 'AWS EC2、Azure VM、GCP Compute Engine', 'AWS Lambda', 'GCP Cloud Functions'], correct: 1, explanation: 'AWS EC2、Azure Virtual Machines、GCP Compute Engine 是各自的虚拟机服务。Lambda/Functions 是 Serverless。' },
			{ id: 'cloud_3', question: 'Serverless（无服务器）架构的特点是什么？', options: ['没有服务器', '开发者不管理服务器，按调用次数计费', '免费', '不能扩展'], correct: 1, explanation: 'Serverless：开发者只写函数（FaaS），平台自动扩缩容，按调用次数和执行时间计费。如 AWS Lambda。' },
			{ id: 'cloud_4', question: '云存储中对象存储和文件存储的区别？', options: ['都一样', '对象存储（S3）扁平结构 REST 访问，文件存储有目录层级', '文件存储用 REST', '对象存储有目录'], correct: 1, explanation: '对象存储：扁平结构、REST API、海量非结构化数据。文件存储：POSIX 文件系统接口、目录层级。' },
			{ id: 'cloud_5', question: '什么是基础设施即代码（IaC）？', options: ['写代码', '用代码定义和管理基础设施（Terraform/CloudFormation）', '手动配置', '脚本部署'], correct: 1, explanation: 'IaC 用声明式代码定义基础设施（VM/网络/存储），版本控制、可重复、自动化部署。工具：Terraform/Pulumi。' }
		]
	},

	// ==================== 网安 ====================
	security: {
		net_basics: [
			{ id: 'snet_1', question: 'TCP/IP 四层模型从下到上是什么？', options: ['七层', '网络接口层 → 网际层 → 传输层 → 应用层', '五层', '三层'], correct: 1, explanation: 'TCP/IP 四层：网络接口层（以太网/WiFi）、网际层（IP）、传输层（TCP/UDP）、应用层（HTTP/DNS）。' },
			{ id: 'snet_2', question: '什么是端口（Port）？常见端口号有哪些？', options: ['IP 地址', '传输层的服务标识（HTTP=80, HTTPS=443, SSH=22）', '物理接口', 'MAC 地址'], correct: 1, explanation: '端口号标识不同服务。HTTP=80, HTTPS=443, SSH=22, MySQL=3306, Redis=6379。范围 0-65535。' },
			{ id: 'snet_3', question: '什么是 VPN（虚拟专用网络）？', options: ['加速网络', '在公共网络上建立加密隧道，安全访问内网', '代理服务器', '防火墙'], correct: 1, explanation: 'VPN 在公共网络（互联网）上建立加密隧道，保护数据传输隐私，隐藏真实 IP，安全访问远程网络资源。' },
			{ id: 'snet_4', question: '防火墙（Firewall）的工作原理是什么？', options: ['杀病毒', '根据安全规则过滤网络流量', '加速网络', '存储数据'], correct: 1, explanation: '防火墙根据预设规则（IP/端口/协议）允许或拒绝流量。分为包过滤、状态检测、应用层防火墙。' },
			{ id: 'snet_5', question: '什么是 IDS 和 IPS？', options: ['都一样', 'IDS 检测入侵并告警，IPS 检测并自动阻断', 'IPS 只检测', 'IDS 自动阻断'], correct: 1, explanation: 'IDS（入侵检测系统）：旁路监听，检测到攻击告警。IPS（入侵防御系统）：串接网络，检测到攻击自动阻断。' }
		],
		web_security: [
			{ id: 'wsec_1', question: 'OWASP Top 10 中排名第一的漏洞类型是什么？', options: ['XSS', '注入（Injection：SQL/NoSQL/OS/LDAP）', 'CSRF', 'SSRF'], correct: 1, explanation: '注入漏洞（SQL 注入为首）一直是 OWASP Top 10 的首位。防御：参数化查询、输入验证、最小权限。' },
			{ id: 'wsec_2', question: 'SSRF（服务端请求伪造）的原理是什么？', options: ['客户端攻击', '让服务器发起请求访问内部资源', 'SQL 注入', 'XSS 攻击'], correct: 1, explanation: 'SSRF 利用服务器作为代理访问内部网络（如 127.0.0.1、内网 IP、云元数据）。防御：白名单、禁用内网访问。' },
			{ id: 'wsec_3', question: '文件上传漏洞的防御方法有哪些？', options: ['不限制', '白名单后缀名、检查 MIME 类型、重命名文件、隔离存储', '只检查大小', '只检查后缀名'], correct: 1, explanation: '防御：白名单后缀名（不是黑名单）、检查文件内容（Magic Number）、随机重命名、存储在非 Web 目录。' },
			{ id: 'wsec_4', question: '什么是 CORS 错误配置导致的安全问题？', options: ['性能问题', 'Access-Control-Allow-Origin: * 允许任意网站跨域读取数据', '加载失败', '样式错误'], correct: 1, explanation: 'CORS 配置不当（如 Allow-Origin: * 或反射 Origin）会让恶意网站跨域读取用户数据。应严格限制允许的源。' },
			{ id: 'wsec_5', question: '什么是反序列化漏洞？', options: ['JSON 解析错误', '攻击者构造恶意序列化数据，服务器反序列化时执行代码', 'XML 注入', '内存溢出'], correct: 1, explanation: '反序列化漏洞利用不安全的反序列化操作执行恶意代码。防御：白名单类、签名验证、避免反序列化用户输入。' }
		],
		crypto: [
			{ id: 'cry_1', question: '对称加密和非对称加密的区别是什么？', options: ['都一样', '对称加密一把密钥（快），非对称加密公钥+私钥（慢）', '非对称只有一把密钥', '对称加密更安全'], correct: 1, explanation: '对称加密（AES）：同一密钥加解密，速度快。非对称加密（RSA）：公钥加密私钥解密，速度慢但解决密钥分发问题。' },
			{ id: 'cry_2', question: '哈希函数（如 SHA-256）的特点是什么？', options: ['可逆', '不可逆、固定长度输出、抗碰撞', '输出不固定', '可解密'], correct: 1, explanation: '哈希特点：单向不可逆、输入任意长度输出固定长度、微小输入变化导致输出巨大变化、抗碰撞。用于密码存储/完整性校验。' },
			{ id: 'cry_3', question: '数字签名的原理是什么？', options: ['加密消息', '用私钥签名，用公钥验证（身份认证 + 完整性）', '用公钥签名', '哈希加密'], correct: 1, explanation: '发送方用私钥对消息哈希签名，接收方用公钥验证。保证消息确实来自发送方（身份认证）且未被篡改（完整性）。' },
			{ id: 'cry_4', question: '什么是盐值（Salt）？在密码存储中的作用？', options: ['加密密钥', '随机数据附加到密码后再哈希，防止彩虹表攻击', '压缩算法', '编码方式'], correct: 1, explanation: '盐值是随机字符串，与密码拼接后再哈希。即使两个用户密码相同，盐值不同导致哈希不同，防止彩虹表批量破解。' },
			{ id: 'cry_5', question: '什么是中间人攻击中的证书伪造？如何防御？', options: ['不能防御', '攻击者伪造 SSL 证书，防御：证书固定（Certificate Pinning）', '更换域名', '使用 HTTP'], correct: 1, explanation: '攻击者用伪造证书拦截 HTTPS 通信。防御：证书固定（App 内置证书指纹）、HSTS、不信任未知 CA。' }
		],
		pentest: [
			{ id: 'pent_1', question: '渗透测试的标准流程是什么？', options: ['直接攻击', '信息收集 → 漏洞扫描 → 漏洞利用 → 后渗透 → 报告', '只扫描', '只报告'], correct: 1, explanation: '渗透测试流程：信息收集（被动/主动）→ 漏洞扫描 → 漏洞利用（获取权限）→ 后渗透（提权/横移）→ 报告。' },
			{ id: 'pent_2', question: 'Nmap 工具的主要功能是什么？', options: ['抓包', '网络扫描（主机发现/端口扫描/服务识别/OS 检测）', '密码破解', '漏洞利用'], correct: 1, explanation: 'Nmap 是网络扫描工具：发现存活主机、扫描开放端口、识别服务版本、检测操作系统。渗透测试必备。' },
			{ id: 'pent_3', question: '什么是社会工程学攻击？', options: ['技术攻击', '利用人的心理弱点获取信息（钓鱼/伪装/尾随）', 'DDoS 攻击', 'SQL 注入'], correct: 1, explanation: '社会工程学利用人的信任/恐惧/好奇心。常见：钓鱼邮件、伪装客服、尾随进入、USB 诱饵。' },
			{ id: 'pent_4', question: 'Metasploit 框架的作用是什么？', options: ['网络监控', '渗透测试框架（漏洞利用/载荷生成/后渗透）', '防火墙', '杀毒软件'], correct: 1, explanation: 'Metasploit 集成大量漏洞利用模块、载荷（payload）、辅助模块。用于漏洞验证和渗透测试。' },
			{ id: 'pent_5', question: '红队/蓝队/紫队的区别是什么？', options: ['都一样', '红队攻击，蓝队防御，紫队协作提升安全', '红队防御', '蓝队攻击'], correct: 1, explanation: '红队：模拟攻击方。蓝队：防守方（SOC/应急响应）。紫队：红蓝协作，攻击中改进防御。' }
		],
		sec_ops: [
			{ id: 'sops_1', question: '安全运营中心（SOC）的职责是什么？', options: ['开发软件', '7x24 监控安全事件、分析威胁、应急响应', '网络运维', '代码审计'], correct: 1, explanation: 'SOC 负责安全监控（SIEM）、威胁分析、事件响应、漏洞管理。通常 7x24 值守。' },
			{ id: 'sops_2', question: '什么是安全信息和事件管理（SIEM）？', options: ['防火墙', '集中收集分析安全日志和事件的系统', '杀毒软件', 'VPN'], correct: 1, explanation: 'SIEM 集中收集各类设备日志（防火墙/IDS/服务器），关联分析发现安全事件。如 Splunk/ELK。' },
			{ id: 'sops_3', question: '应急响应的标准流程是什么？', options: ['直接修复', '准备→检测→遏制→根除→恢复→总结', '只检测', '只恢复'], correct: 1, explanation: '应急响应：准备（预案）→ 检测（发现事件）→ 遏制（隔离）→ 根除（消除威胁）→ 恢复（恢复服务）→ 总结（复盘）。' },
			{ id: 'sops_4', question: '什么是零信任安全模型？', options: ['信任所有人', '永不信任，始终验证（每次访问都需认证授权）', '只信任内部', '不需要认证'], correct: 1, explanation: '零信任：不信任任何用户/设备（无论内外网），每次访问都需认证和授权。最小权限原则。' },
			{ id: 'sops_5', question: '漏洞披露的负责任流程是什么？', options: ['直接公开', '私下通知厂商 → 给修复时间 → 到期后公开', '卖给黑客', '忽略'], correct: 1, explanation: '负责任披露：发现漏洞后私下报告给厂商，给合理修复时间（通常 90 天）。厂商修复后或超期后才公开细节。' }
		]
	},

	// ==================== 游戏 ====================
	gamedev: {
		engine: [
			{ id: 'ge_1', question: 'Unity 和 Unreal Engine 的主要区别是什么？', options: ['都一样', 'Unity 用 C#（移动端强），Unreal 用 C++/蓝图（画质强）', 'Unreal 用 C#', 'Unity 用 C++'], correct: 1, explanation: 'Unity：C# 脚本，移动端/独立游戏首选，学习曲线平缓。Unreal：C++/蓝图，3A 游戏首选，画质顶级。' },
			{ id: 'ge_2', question: '游戏引擎中实体组件系统（ECS）的思想是什么？', options: ['继承', '实体只是 ID，组件是数据，系统是逻辑', '面向对象', 'MVC 模式'], correct: 1, explanation: 'ECS：Entity 只是 ID（无数据无方法），Component 存数据（位置/渲染），System 处理逻辑（移动/渲染）。数据驱动，高性能。' },
			{ id: 'ge_3', question: '游戏中的帧率（FPS）和帧时间（Frame Time）的关系？', options: ['没有关系', 'FPS = 1000 / 帧时间(ms)', '帧时间 = FPS', 'FPS = 帧时间'], correct: 1, explanation: 'FPS = 1000 / Frame Time(ms)。60FPS = 16.67ms/帧。30FPS = 33.33ms/帧。帧时间更直观反映性能。' },
			{ id: 'ge_4', question: '游戏引擎中场景图（Scene Graph）的作用是什么？', options: ['存储数据', '管理游戏对象的层级关系和空间变换', '渲染图形', '播放音频'], correct: 1, explanation: '场景图以树状结构管理游戏对象。子节点继承父节点的变换（位置/旋转/缩放）。方便管理复杂场景。' },
			{ id: 'ge_5', question: '什么是游戏循环（Game Loop）？', options: ['重复关卡', '每帧执行：处理输入 → 更新逻辑 → 渲染画面', '循环播放音乐', '死循环'], correct: 1, explanation: '游戏循环是游戏运行的核心：每帧处理输入 → 更新游戏状态 → 渲染画面 → 等待下一帧。控制帧率和逻辑更新频率。' }
		],
		graphics: [
			{ id: 'gfx_1', question: 'GPU 渲染管线的主要阶段是什么？', options: ['只有渲染', '顶点处理 → 图元装配 → 光栅化 → 片元处理 → 输出', '只有光栅化', '只有顶点处理'], correct: 1, explanation: 'GPU 管线：顶点着色器 → 图元装配 → 光栅化 → 片元着色器 → 混合/输出。可编程阶段：顶点和片元着色器。' },
			{ id: 'gfx_2', question: '什么是法线贴图（Normal Map）？', options: ['颜色贴图', '用 RGB 编码表面法线方向，模拟凹凸细节', '透明贴图', '高光贴图'], correct: 1, explanation: '法线贴图在低面数模型上模拟高面数的凹凸细节。RGB 编码法线方向（X/Y/Z），不增加几何体但增加视觉细节。' },
			{ id: 'gfx_3', question: 'PBR（基于物理的渲染）的核心思想是什么？', options: ['美术风格', '遵循物理规律的光照计算（能量守恒/微表面理论）', '写实风格', '卡通风格'], correct: 1, explanation: 'PBR 核心：能量守恒（反射光 <= 入射光）、微表面理论（粗糙度）、菲涅尔效应。材质参数：金属度/粗糙度/法线。' },
			{ id: 'gfx_4', question: '什么是 LOD（Level of Detail）技术？', options: ['关卡设计', '根据物体与摄像机距离切换不同精度模型', '光照技术', '阴影技术'], correct: 1, explanation: 'LOD 远处使用低面数模型，近处使用高面数模型。减少渲染负担，保持视觉质量。' },
			{ id: 'gfx_5', question: '实时阴影的常见实现方法是什么？', options: ['手绘', 'Shadow Mapping（从光源视角渲染深度图）', '不需要阴影', '光线追踪'], correct: 1, explanation: 'Shadow Mapping：从光源视角渲染场景深度图，渲染场景时比较像素深度与深度图判断是否在阴影中。' }
		],
		physics: [
			{ id: 'phys_1', question: '游戏物理引擎中刚体（Rigidbody）和碰撞体（Collider）的区别？', options: ['都一样', '刚体受物理模拟（重力/力），碰撞体定义碰撞形状', '碰撞体受重力', '刚体定义形状'], correct: 1, explanation: 'Rigidbody：受物理引擎控制（重力、力、速度）。Collider：定义碰撞检测形状（盒子/球体/胶囊），可不挂 Rigidbody。' },
			{ id: 'phys_2', question: '什么是 AABB 碰撞检测？', options: ['圆形碰撞', '轴对齐包围盒（Axis-Aligned Bounding Box）', '精确碰撞', '无碰撞'], correct: 1, explanation: 'AABB 是与坐标轴对齐的矩形包围盒。检测简单快速（比较 min/max），但不够精确。常用作 broad phase。' },
			{ id: 'phys_3', question: '动画状态机（Animation State Machine）的作用是什么？', options: ['播放音乐', '管理动画状态之间的转换逻辑（待机→跑步→跳跃）', '物理模拟', '碰撞检测'], correct: 1, explanation: '动画状态机定义状态（Idle/Run/Jump）和转换条件（速度>0→Run）。根据游戏输入自动切换动画。' },
			{ id: 'phys_4', question: '什么是布娃娃物理（Ragdoll Physics）？', options: ['布料模拟', '角色死亡时用物理模拟代替动画，呈现自然倒下效果', '刚体动画', '粒子效果'], correct: 1, explanation: '布娃娃物理将角色骨骼用刚体+关节替代，受物理引擎控制。角色死亡/被击飞时呈现自然的物理效果。' },
			{ id: 'phys_5', question: '帧率独立（Frame-rate Independence）的实现方法是什么？', options: ['固定帧率', '用 deltaTime 乘以速度/力，确保不同帧率下行为一致', '不用物理', '锁定 30FPS'], correct: 1, explanation: '每帧位移 = 速度 × deltaTime（上一帧耗时）。这样无论 30FPS 还是 60FPS，角色每秒移动距离相同。' }
		],
		patterns: [
			{ id: 'gp_1', question: '游戏开发中对象池（Object Pool）的作用是什么？', options: ['存储数据', '复用频繁创建销毁的对象（子弹/特效），减少 GC', '排序对象', '查找对象'], correct: 1, explanation: '对象池预先创建一批对象，用完不销毁而是回收。避免频繁 new/destroy 的开销和 GC 卡顿。' },
			{ id: 'gp_2', question: '游戏开发中观察者模式（事件系统）的作用是什么？', options: ['存储数据', '解耦事件发送方和接收方（发布-订阅）', '渲染图形', '物理模拟'], correct: 1, explanation: '事件系统：发送方发布事件（如 PlayerDied），接收方订阅处理。双方互不依赖，解耦游戏逻辑。' },
			{ id: 'gp_3', question: '什么是游戏中的状态模式（State Pattern）？', options: ['全局变量', '对象行为随状态改变（角色：待机/攻击/死亡状态）', '继承', '工厂模式'], correct: 1, explanation: '状态模式将每个状态封装为独立类，状态切换时替换行为。避免大量 if-else。如 AI 状态机。' },
			{ id: 'gp_4', question: '游戏中的组件模式（Component Pattern）是什么？', options: ['继承树', '通过组合组件而非继承来构建游戏对象', '全局函数', '单例模式'], correct: 1, explanation: '组件模式：游戏对象由多个组件组成（Transform + Sprite + Physics + AI）。比深层继承更灵活。' },
			{ id: 'gp_5', question: '游戏开发中命令模式（Command Pattern）的应用场景是什么？', options: ['渲染', '撤销/重做、输入映射、网络同步', '物理', '音频'], correct: 1, explanation: '命令模式将操作封装为对象。应用：撤销/重做（存储命令历史）、输入映射（按键→命令）、网络同步（发送命令）。' }
		],
		net_opt: [
			{ id: 'gnet_1', question: '游戏网络同步中帧同步和状态同步的区别是什么？', options: ['都一样', '帧同步同步玩家输入，状态同步同步游戏状态', '帧同步同步状态', '状态同步同步输入'], correct: 1, explanation: '帧同步：同步输入指令，各客户端独立计算（带宽小，但需确定性）。状态同步：同步状态结果（带宽大，实现简单）。' },
			{ id: 'gnet_2', question: '游戏网络中客户端预测（Client Prediction）的目的是什么？', options: ['减少服务器', '减少操作延迟感（客户端先执行，后与服务器校验）', '加速渲染', '减少带宽'], correct: 1, explanation: '客户端预测：本地先执行玩家操作（如移动），服务器确认后校正。减少等待服务器响应的延迟感。' },
			{ id: 'gnet_3', question: '游戏性能优化中 Draw Call 优化的方法有哪些？', options: ['增加 Draw Call', '合批渲染（静态合批/动态合批/GPU Instancing）', '减少模型', '降低分辨率'], correct: 1, explanation: '减少 Draw Call：静态合批（合并不动物体）、动态合批（合并小物体）、GPU Instancing（同模型不同变换）、图集。' },
			{ id: 'gnet_4', question: '什么是遮挡剔除（Occlusion Culling）？', options: ['删除物体', '不渲染被其他物体完全遮挡的对象', 'LOD 技术', '阴影技术'], correct: 1, explanation: '遮挡剔除判断物体是否被其他物体挡住，被挡住的不渲染。减少 GPU 负担。与视锥剔除互补。' },
			{ id: 'gnet_5', question: '游戏内存优化中纹理压缩的作用是什么？', options: ['提高画质', '减少显存占用和带宽消耗（如 ASTC/ETC2/BC7）', '增加加载速度', '减少 CPU 使用'], correct: 1, explanation: 'GPU 纹理压缩：有损压缩大幅减少显存占用。移动端常用 ASTC/ETC2，PC 常用 BC7/DXT。GPU 可直接读取压缩纹理。' }
		]
	}
}

/**
 * 获取指定路径和节点的题目
 * @param {string} pathId - 路径 ID (frontend/backend/...)
 * @param {string} nodeId - 节点 ID (css/javascript/...)
 * @param {number} count - 题目数量（默认 5）
 * @returns {Array} 打乱顺序的题目数组
 */
export function getQuestions(pathId, nodeId, count = 5) {
	const pathData = QUESTIONS[pathId]
	if (!pathData) return []
	const nodeData = pathData[nodeId]
	if (!nodeData || nodeData.length === 0) return []

	// Fisher-Yates 洗牌
	const shuffled = [...nodeData]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled.slice(0, count)
}

/**
 * 获取指定路径的所有节点 ID
 */
export function getNodeIds(pathId) {
	const pathData = QUESTIONS[pathId]
	if (!pathData) return []
	return Object.keys(pathData)
}

/**
 * 获取指定路径和节点的题目总数
 */
export function getQuestionCount(pathId, nodeId) {
	const pathData = QUESTIONS[pathId]
	if (!pathData) return 0
	const nodeData = pathData[nodeId]
	return nodeData ? nodeData.length : 0
}

/**
 * 根据题目 ID 查找题目
 */
export function getQuestionById(questionId) {
	for (const pathId of Object.keys(QUESTIONS)) {
		for (const nodeId of Object.keys(QUESTIONS[pathId])) {
			const found = QUESTIONS[pathId][nodeId].find(q => q.id === questionId)
			if (found) return { ...found, pathId, nodeId }
		}
	}
	return null
}
