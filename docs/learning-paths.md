# Duck Path Learning - 学习路径设计文档

## 产品定位

面向**实习生和应届毕业生**的面试八股文刷题 App。帮助用户系统化准备技术面试。

## 学科选项（来自设计稿）

| 学科 | 图标 | 对应路径 ID |
|------|------|------------|
| Frontend | web | frontend |
| Backend | dns | backend |
| Mobile | smartphone | mobile |
| Client-side | devices | client |
| Embedded | memory | embedded |
| AI | smart_toy | ai |
| DevOps | cloud_sync | devops |
| Cyber Security | security | security |
| Game Dev | sports_esports | gamedev |

---

## 玉米币系统

- 答对一题：随机获得 **10-15 玉米**
- 答错：获得 **0 玉米**
- 玉米余额持久存储，跨会话累计

---

## 各路径节点设计

### Frontend（前端）

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | CSS | 25 | 盒模型、BFC、Flex/Grid、选择器优先级、响应式、CSS3 动画 |
| 2 | JavaScript | 30 | 原型链、闭包、作用域、this 指向、Event Loop、Promise、ES6+ |
| 3 | TypeScript | 20 | 基础类型、泛型、高级类型、类型守卫、Utility Types |
| 4 | Vue | 25 | 响应式原理、虚拟 DOM、Diff 算法、Composition API、生命周期 |
| 5 | React | 25 | Hooks、Fiber 架构、状态管理、虚拟 DOM、JSX |
| 6 | 工程化与性能 | 20 | Webpack/Vite、Tree Shaking、懒加载、首屏优化、Core Web Vitals |

**总计：145 题**

### Backend（后端）

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | Java 基础 | 30 | 面向对象、集合框架(HashMap)、异常、泛型、反射 |
| 2 | 并发与 JVM | 25 | synchronized、volatile、线程池、GC、类加载、内存模型 |
| 3 | MySQL | 30 | 索引(B+树)、事务隔离级别、MVCC、SQL 优化、Explain |
| 4 | Redis | 25 | 数据结构、持久化、缓存穿透/击穿/雪崩、分布式锁 |
| 5 | Spring | 25 | IOC、AOP、Bean 生命周期、事务管理、自动装配 |
| 6 | 场景与设计 | 20 | 分布式锁、消息队列、限流算法、秒杀系统、短链系统 |

**总计：155 题**

### Mobile（移动端）

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | Kotlin/Swift | 25 | Kotlin 协程/空安全、Swift 可选类型/协议/ARC |
| 2 | Android 核心 | 25 | 四大组件、Activity 生命周期、RecyclerView、自定义 View |
| 3 | iOS 核心 | 25 | SwiftUI/UIKit、Auto Layout、生命周期、内存管理 |
| 4 | 架构与框架 | 20 | MVVM/MVI、Jetpack、跨平台(Flutter/RN/UniApp) |
| 5 | 性能优化 | 15 | 内存泄漏、ANR、启动优化、包体积、布局优化 |

**总计：110 题**

### Client-side（客户端）

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | 浏览器原理 | 20 | 渲染流程、重排/重绘、垃圾回收、跨域、缓存策略 |
| 2 | 网络协议 | 20 | HTTP/HTTPS、TCP 三次握手/四次挥手、WebSocket、DNS |
| 3 | 安全 | 15 | XSS、CSRF、CSP、点击劫持、CORS |
| 4 | 性能优化 | 20 | 懒加载、代码分割、预加载、Service Worker、PWA |
| 5 | 调试与工具 | 15 | Chrome DevTools、Lighthouse、性能分析、内存分析 |

**总计：90 题**

### Embedded（嵌入式）

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | C/C++ 基础 | 25 | 指针、内存管理、STL、多线程、const/static/volatile |
| 2 | 操作系统 | 20 | 进程/线程、调度算法、内存管理、文件系统、中断 |
| 3 | 计算机网络 | 15 | TCP/IP、UDP、Socket 编程、HTTP、DNS |
| 4 | 硬件与驱动 | 15 | ARM 架构、GPIO、SPI/I2C/UART、中断处理 |
| 5 | RTOS 与调试 | 15 | FreeRTOS 基础、任务调度、GDB 调试、Core Dump |

**总计：90 题**

### AI（人工智能）

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | Python 基础 | 20 | 语法、数据结构、装饰器、生成器、GIL、NumPy |
| 2 | 机器学习 | 25 | 监督/无监督学习、特征工程、模型评估、经典算法 |
| 3 | 深度学习 | 25 | CNN、RNN/LSTM、Transformer、注意力机制、优化器 |
| 4 | NLP 与大模型 | 25 | 分词、BERT、GPT、Prompt Engineering、RAG、Fine-tuning |
| 5 | 工程化 | 15 | 模型部署(ONNX/TensorRT)、量化、推理优化、数据管道 |

**总计：110 题**

### DevOps

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | Linux 基础 | 20 | 常用命令、Shell 脚本、文件权限、进程管理、日志 |
| 2 | Docker 与 K8s | 25 | 容器原理、Dockerfile、K8s 核心概念、Pod/Service/Deployment |
| 3 | CI/CD | 20 | Jenkins/GitHub Actions、构建流水线、自动化测试、蓝绿/金丝雀 |
| 4 | 监控与运维 | 15 | Prometheus/Grafana、日志收集(ELK)、告警、SLO/SLA |
| 5 | 云服务 | 15 | AWS/阿里云基础、对象存储、CDN、负载均衡、VPC |

**总计：95 题**

### Cyber Security（网络安全）

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | 网络基础 | 20 | TCP/IP 协议栈、端口扫描、抓包分析、防火墙 |
| 2 | Web 安全 | 25 | SQL 注入、XSS、CSRF、SSRF、文件上传、RCE |
| 3 | 密码学 | 15 | 对称/非对称加密、哈希、数字签名、证书、TLS/SSL |
| 4 | 渗透与防御 | 20 | 信息收集、漏洞扫描、权限提升、WAF、IDS/IPS |
| 5 | 安全运维 | 15 | 日志审计、应急响应、等保合规、安全基线 |

**总计：95 题**

### Game Dev（游戏开发）

| # | 节点名称 | 题数 | 覆盖内容 |
|---|----------|------|----------|
| 1 | 游戏引擎基础 | 20 | Unity/Unreal 核心概念、场景管理、组件系统、Prefab |
| 2 | 图形与渲染 | 20 | 渲染管线、Shader 基础、光照模型、后处理、性能优化 |
| 3 | 物理与动画 | 15 | 碰撞检测、刚体、动画状态机、骨骼动画、IK |
| 4 | 游戏设计模式 | 15 | ECS、观察者、状态机、对象池、命令模式 |
| 5 | 网络与优化 | 15 | 网络同步、帧同步/状态同步、内存优化、Draw Call |

**总计：85 题**

---

## 总览

| 路径 | 节点数 | 题数 | 难度 |
|------|--------|------|------|
| Frontend | 6 | 145 | ⭐⭐ |
| Backend | 6 | 155 | ⭐⭐⭐ |
| Mobile | 5 | 110 | ⭐⭐ |
| Client-side | 5 | 90 | ⭐⭐ |
| Embedded | 5 | 90 | ⭐⭐⭐ |
| AI | 5 | 110 | ⭐⭐⭐ |
| DevOps | 5 | 95 | ⭐⭐ |
| Cyber Security | 5 | 95 | ⭐⭐⭐ |
| Game Dev | 5 | 85 | ⭐⭐ |
| **合计** | **47** | **975** | |

---

## 题目数据结构

```json
{
  "id": "q_css_001",
  "nodeId": "css",
  "pathId": "frontend",
  "question": "什么是 BFC？如何触发？",
  "options": [
    "块级格式化上下文，通过 overflow: hidden 触发",
    "浏览器渲染引擎，通过 display: flex 触发",
    "CSS 预处理器，通过 @import 触发",
    "布局容器，通过 position: absolute 触发"
  ],
  "correct": 0,
  "explanation": "BFC（Block Formatting Context）是页面中的一个独立渲染区域。触发条件包括：overflow 不为 visible、display 为 flex/grid/inline-block、position 为 absolute/fixed、float 不为 none 等。BFC 内部的布局不会影响外部元素。",
  "difficulty": "medium",
  "tags": ["CSS", "BFC", "布局"]
}
```

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/paths` | GET | 获取所有学科路径 |
| `/api/paths/:pathId/nodes` | GET | 获取路径下的节点列表 |
| `/api/nodes/:nodeId/questions` | GET | 获取节点的题目 |
| `/api/user/progress` | GET | 获取用户进度 |
| `/api/user/progress` | PUT | 更新用户进度 |
| `/api/user/corn` | POST | 增加玉米余额 |
| `/api/mistakes` | GET | 获取错题列表 |
| `/api/mistakes/add` | POST | 记录错题 |
| `/api/stats` | GET | 学习统计 |
