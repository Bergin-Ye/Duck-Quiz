<template>
	<view class="page">
		<!-- 顶部应用栏 -->
		<view class="top-bar">
			<view class="avatar-circle" @tap="goToProfile">
				<image class="avatar-img" :src="avatar" mode="aspectFill"></image>
			</view>
			<text class="top-title">今日旅程</text>
			<view class="corn-badge">
				<dp-icon type="star" size="32" color="#ffb300" :filled="true"></dp-icon>
				<text class="corn-text">{{ cornBalance }} corn</text>
			</view>
		</view>

		<!-- 主内容 - 原生页面滚动 -->
		<view class="main-content" :key="pageKey">
			<!-- 切换路径按钮 -->
			<view class="switch-btn" @tap="showPathPicker = true">
				<dp-icon type="loop" size="32" color="#1c1b1b"></dp-icon>
				<text class="switch-text">切换路径</text>
			</view>

			<!-- 路径标题 -->
			<view class="path-header">
				<text class="path-title">{{ currentPath.name }}</text>
				<text class="path-subtitle">{{ currentPath.subtitle }}</text>
			</view>

			<!-- 学习路径节点 -->
			<view class="journey-container">
				<view
					v-for="(node, index) in journeyNodes"
					:key="node.id"
					class="node-wrapper"
					:class="['position-' + node.position, node.status, { 'current-node': node.status === 'current' }]"
					:style="{ animationDelay: index * 0.1 + 's' }"
				>
					<view v-if="index > 0" class="connector" :class="getConnectorClass(index)">
						<view class="connector-line" :class="{ dashed: node.status === 'locked' }"></view>
					</view>

					<view
						class="node-circle"
						:class="[node.status, 'size-' + (node.status === 'current' ? 'lg' : node.status === 'locked' ? 'sm' : 'md')]"
						@tap="onNodeTap(node)"
					>
						<dp-icon v-if="node.status === 'completed'" type="check" size="56" color="#1c1b1b"></dp-icon>
						<dp-icon v-else-if="node.status === 'current'" :type="node.icon" size="64" color="#1c1b1b"></dp-icon>
						<dp-icon v-else type="lock" size="44" color="#514532"></dp-icon>
					</view>

					<view v-if="node.status === 'current'" class="duck-wrapper">
						<image class="duck-img" :src="currentDuckSrc" mode="aspectFit"></image>
					</view>

					<view class="node-stem" :class="{ dashed: node.status === 'locked' }"></view>

					<view class="node-label" :class="node.status">
						<text class="node-name">{{ node.name }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 路径选择弹窗 -->
		<view v-if="showPathPicker" class="picker-mask" @tap="showPathPicker = false">
			<view class="picker-sheet">
				<view class="picker-header">
					<text class="picker-title">选择学习路径</text>
					<view @tap="showPathPicker = false">
						<dp-icon type="close" size="40" color="#1c1b1b"></dp-icon>
					</view>
				</view>
				<scroll-view scroll-y class="picker-scroll">
					<view class="picker-grid">
						<view
							v-for="path in availablePaths"
							:key="path.id"
							class="picker-card"
							:class="{ active: path.id === currentPath.id }"
							@tap="switchPath(path)"
						>
							<view class="picker-icon-wrap">
								<dp-icon :type="path.icon" size="56" color="#1c1b1b"></dp-icon>
							</view>
							<text class="picker-name">{{ path.name }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	const PATH_CONFIG = {
		frontend: { id: 'frontend', name: '前端', subtitle: '掌握 CSS、JavaScript 和主流框架。', icon: 'web', color: '#7e5700', nodes: [
			{ id: 'css', name: 'CSS', icon: 'css' }, { id: 'javascript', name: 'JavaScript', icon: 'javascript' },
			{ id: 'typescript', name: 'TypeScript', icon: 'code' }, { id: 'vue', name: 'Vue', icon: 'web' },
			{ id: 'react', name: 'React', icon: 'web' }, { id: 'engineering', name: '工程化与性能', icon: 'speed' }
		]},
		backend: { id: 'backend', name: '后端', subtitle: '一步一步掌握服务端开发。', icon: 'dns', color: '#006e1c', nodes: [
			{ id: 'java_basics', name: 'Java 基础', icon: 'coffee' }, { id: 'concurrent_jvm', name: '并发与 JVM', icon: 'memory' },
			{ id: 'mysql', name: 'MySQL', icon: 'database' }, { id: 'redis', name: 'Redis', icon: 'database' },
			{ id: 'spring', name: 'Spring', icon: 'eco' }, { id: 'design', name: '场景与设计', icon: 'architecture' }
		]},
		mobile: { id: 'mobile', name: '移动端', subtitle: 'Android 与 iOS 应用开发。', icon: 'smartphone', color: '#bb171c', nodes: [
			{ id: 'kotlin_swift', name: 'Kotlin / Swift', icon: 'code' }, { id: 'android', name: 'Android 核心', icon: 'phone_android' },
			{ id: 'ios', name: 'iOS 核心', icon: 'phone_iphone' }, { id: 'arch', name: '架构与框架', icon: 'widgets' },
			{ id: 'perf', name: '性能优化', icon: 'speed' }
		]},
		client: { id: 'client', name: '客户端', subtitle: '浏览器原理与网络协议。', icon: 'computer', color: '#7e5700', nodes: [
			{ id: 'browser', name: '浏览器原理', icon: 'public' }, { id: 'network', name: '网络协议', icon: 'lan' },
			{ id: 'security', name: '安全', icon: 'shield' }, { id: 'perf', name: '性能优化', icon: 'speed' },
			{ id: 'debug', name: '调试与工具', icon: 'bug_report' }
		]},
		embedded: { id: 'embedded', name: '嵌入式', subtitle: 'C/C++ 与硬件驱动开发。', icon: 'developer_board', color: '#514532', nodes: [
			{ id: 'c_cpp', name: 'C / C++ 基础', icon: 'code' }, { id: 'os', name: '操作系统', icon: 'computer' },
			{ id: 'network', name: '计算机网络', icon: 'lan' }, { id: 'hardware', name: '硬件与驱动', icon: 'memory' },
			{ id: 'rtos', name: 'RTOS 与调试', icon: 'settings' }
		]},
		ai: { id: 'ai', name: 'AI', subtitle: '机器学习、深度学习与大模型。', icon: 'smart_toy', color: '#7e5700', nodes: [
			{ id: 'python', name: 'Python 基础', icon: 'code' }, { id: 'ml', name: '机器学习', icon: 'psychology' },
			{ id: 'dl', name: '深度学习', icon: 'hub' }, { id: 'nlp_llm', name: 'NLP 与大模型', icon: 'auto_awesome' },
			{ id: 'engineering', name: '工程化', icon: 'deployed_code' }
		]},
		devops: { id: 'devops', name: 'DevOps', subtitle: 'Linux、Docker 与 CI/CD。', icon: 'cloud_sync', color: '#006e1c', nodes: [
			{ id: 'linux', name: 'Linux 基础', icon: 'terminal' }, { id: 'docker_k8s', name: 'Docker 与 K8s', icon: 'deployed_code' },
			{ id: 'cicd', name: 'CI/CD', icon: 'sync' }, { id: 'monitor', name: '监控与运维', icon: 'monitoring' },
			{ id: 'cloud', name: '云服务', icon: 'cloud' }
		]},
		security: { id: 'security', name: '网安', subtitle: 'Web 安全、渗透与防御。', icon: 'security', color: '#bb171c', nodes: [
			{ id: 'net_basics', name: '网络基础', icon: 'lan' }, { id: 'web_security', name: 'Web 安全', icon: 'gpp_maybe' },
			{ id: 'crypto', name: '密码学', icon: 'key' }, { id: 'pentest', name: '渗透与防御', icon: 'target' },
			{ id: 'sec_ops', name: '安全运维', icon: 'admin_panel_settings' }
		]},
		gamedev: { id: 'gamedev', name: '游戏', subtitle: '引擎、渲染与游戏设计。', icon: 'sports_esports', color: '#7e5700', nodes: [
			{ id: 'engine', name: '游戏引擎基础', icon: 'sports_esports' }, { id: 'graphics', name: '图形与渲染', icon: 'palette' },
			{ id: 'physics', name: '物理与动画', icon: 'animation' }, { id: 'patterns', name: '游戏设计模式', icon: 'extension' },
			{ id: 'net_opt', name: '网络与优化', icon: 'speed' }
		]}
	}

	import { getCornBalance, getNodeProgress, saveNodeProgress, getAvatar } from '../../utils/storage.js'

	export default {
		data() {
			return {
				pageKey: 0,
				showPathPicker: false,
				cornBalance: 0,
				avatar: '/static/duck.png',
				currentPathId: 'backend',
				journeyNodes: []
			}
		},
		computed: {
			currentPath() { return PATH_CONFIG[this.currentPathId] || PATH_CONFIG.backend },
			currentDuckSrc() {
				const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
				return `/static/duck/duck-${(dayOfYear % 8) + 1}.png`
			},
			availablePaths() { return Object.values(PATH_CONFIG) }
		},
		onLoad() {
			const saved = uni.getStorageSync('current_path_id')
			if (saved && PATH_CONFIG[saved]) this.currentPathId = saved
			this.loadJourneyData()
		},
		onShow() {
			this.pageKey++
			this.cornBalance = getCornBalance()
			this.avatar = getAvatar()
			this.loadJourneyData()
		},
		methods: {
			loadJourneyData() {
				const stored = getNodeProgress(this.currentPathId)
				if (stored && stored.length > 0) {
					this.journeyNodes = stored
				} else {
					this.journeyNodes = this.buildDefaultNodes()
					saveNodeProgress(this.currentPathId, this.journeyNodes)
				}
			},
			buildDefaultNodes() {
				const config = PATH_CONFIG[this.currentPathId]
				if (!config) return []
				return config.nodes.map((node, i) => ({
					id: node.id, name: node.name, icon: node.icon,
					status: i === 0 ? 'current' : 'locked',
					position: this.getNodePosition(i, config.nodes.length)
				}))
			},
			getNodePosition(index, total) {
				if (index === 0 || index === total - 1) return 'center'
				const cycle = index % 4
				if (cycle === 1) return 'right'
				if (cycle === 3) return 'left'
				return 'center'
			},
			getConnectorClass(index) {
				const prev = this.journeyNodes[index - 1]
				const curr = this.journeyNodes[index]
				if (!prev || !curr) return ''
				if (prev.position === 'center' && curr.position === 'right') return 'curve-right'
				if (prev.position === 'right' && curr.position === 'center') return 'curve-left'
				if (prev.position === 'center' && curr.position === 'left') return 'curve-left'
				if (prev.position === 'left' && curr.position === 'center') return 'curve-right'
				return ''
			},
			onNodeTap(node) {
				if (node.status === 'locked') {
					uni.showToast({ title: '请先完成前置课程', icon: 'none' })
					return
				}
				uni.navigateTo({ url: `/pages/quiz/quiz?nodeId=${node.id}&pathId=${this.currentPathId}&discipline=${encodeURIComponent(node.name)}` })
			},
			switchPath(path) {
				if (path.id === this.currentPathId) { this.showPathPicker = false; return }
				this.currentPathId = path.id
				uni.setStorageSync('current_path_id', path.id)
				this.showPathPicker = false
				// 新路径如果没有进度数据，初始化
				const stored = getNodeProgress(path.id)
				if (!stored || stored.length === 0) {
					const nodes = this.buildDefaultNodes()
					saveNodeProgress(path.id, nodes)
				}
				this.loadJourneyData()
			},
			goToProfile() {
				uni.switchTab({ url: '/pages/profile/profile' })
			}
		}
	}
</script>

<style lang="scss">
	.page {
		min-height: 100vh;
		width: 100%;
		background-color: $surface;
		padding-top: calc(128rpx + env(safe-area-inset-top));
		padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
	}

	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;
		padding-top: env(safe-area-inset-top);
		height: calc(128rpx + env(safe-area-inset-top));
		background-color: $surface;
		border-bottom: 2rpx solid rgba($on-surface, 0.1);
		box-sizing: border-box;
	}

	.avatar-circle {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: $surface-container;
		border: 3rpx solid $on-surface;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		flex-shrink: 0;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
	}

	.top-title {
		font-size: 40rpx;
		font-weight: 700;
		color: $primary;
	}

	.corn-badge {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: $surface-container-high;
		border: 3rpx solid $on-surface;
		border-radius: 999rpx;
		padding: 8rpx 24rpx;
		flex-shrink: 0;
	}

	.corn-text {
		font-size: 24rpx;
		font-weight: 700;
		color: $on-surface;
		margin-left: 8rpx;
	}

	.main-content {
		padding: 40rpx;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.switch-btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: $surface-container;
		border: 3rpx solid $on-surface;
		border-radius: 999rpx;
		padding: 16rpx 40rpx;
		margin-bottom: 32rpx;
		&:active { background-color: $surface-container-high; transform: scale(0.97); }
	}

	.switch-text {
		font-size: 24rpx;
		font-weight: 700;
		color: $on-surface;
		margin-left: 12rpx;
	}

	.path-header {
		text-align: center;
		margin-bottom: 48rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.path-title {
		font-size: 64rpx;
		font-weight: 700;
		color: $on-surface;
		line-height: 80rpx;
		margin-bottom: 12rpx;
	}

	.path-subtitle {
		font-size: 28rpx;
		color: $on-surface-variant;
		line-height: 40rpx;
	}

	.journey-container {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 80rpx;
	}

	.node-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		z-index: 10;
		animation: nodeFadeIn 0.5s ease both;
	}

	@keyframes nodeFadeIn {
		from { opacity: 0; transform: translateY(30rpx); }
		to { opacity: 1; transform: translateY(0); }
	}

	.position-left { align-self: flex-start; padding-left: 80rpx; }
	.position-right { align-self: flex-end; padding-right: 80rpx; }
	.position-center { align-self: center; }

	.connector { width: 100%; height: 80rpx; position: relative; z-index: 0; }

	.connector-line {
		position: absolute;
		top: 0;
		left: 50%;
		width: 3rpx;
		height: 100%;
		background-color: $on-surface;
		transform: translateX(-50%);
		&.dashed {
			background: repeating-linear-gradient(to bottom, $on-surface-variant 0, $on-surface-variant 12rpx, transparent 12rpx, transparent 24rpx);
		}
	}

	.node-circle {
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3rpx solid $on-surface;
		&:active { transform: scale(0.93); }
		&.completed { background-color: #91f78e; }
		&.current { background-color: $primary-container; border-width: 3rpx; box-shadow: 0 0 0 12rpx rgba(255, 179, 0, 0.2); animation: currentPulse 2s ease-in-out infinite; }
		&.locked { background-color: $surface-container-lowest; border-style: dashed; border-color: $on-surface-variant; }
		&.size-lg { width: 128rpx; height: 128rpx; }
		&.size-md { width: 112rpx; height: 112rpx; }
		&.size-sm { width: 96rpx; height: 96rpx; }
	}

	@keyframes currentPulse {
		0%, 100% { box-shadow: 0 0 0 12rpx rgba(255, 179, 0, 0.2); }
		50% { box-shadow: 0 0 0 20rpx rgba(255, 179, 0, 0.1); }
	}

	.duck-wrapper {
		position: absolute;
		top: -80rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 20;
		pointer-events: none;
		animation: duckBounce 2s ease-in-out infinite;
	}

	@keyframes duckBounce {
		0%, 100% { transform: translateX(-50%) translateY(0); }
		50% { transform: translateX(-50%) translateY(-10rpx); }
	}

	.duck-img { width: 128rpx; height: 128rpx; }

	.node-stem {
		width: 3rpx;
		height: 32rpx;
		background-color: $on-surface;
		margin-top: 8rpx;
		&.dashed { background: repeating-linear-gradient(to bottom, $on-surface-variant 0, $on-surface-variant 8rpx, transparent 8rpx, transparent 16rpx); }
	}

	.node-label {
		padding: 12rpx 32rpx;
		border: 3rpx solid $on-surface;
		border-radius: 16rpx;
		background-color: $surface;
		&.current { border-radius: 999rpx; padding: 16rpx 48rpx; }
		&.locked { border-style: dashed; border-color: $on-surface-variant; }
	}

	.node-name {
		font-size: 24rpx;
		font-weight: 700;
		color: $on-surface;
		.locked & { color: $on-surface-variant; }
	}

	/* 路径选择弹窗 */
	.picker-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 200;
		display: flex;
		align-items: flex-end;
	}

	.picker-sheet {
		width: 100%;
		max-height: 80vh;
		background-color: $surface;
		border-radius: 32rpx 32rpx 0 0;
		padding: 40rpx;
		padding-bottom: calc(80rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
	}

	.picker-scroll { flex: 1; max-height: 65vh; }

	.picker-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 32rpx;
	}

	.picker-title { font-size: 36rpx; font-weight: 700; color: $on-surface; }

	/* 九宫格 - flex-wrap */
	.picker-grid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.picker-card {
		width: 31.33%;
		margin-right: 3%;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		background-color: $surface-container-lowest;
		border: 3rpx solid $outline-variant;
		border-radius: 24rpx;
		box-sizing: border-box;
		&:nth-child(3n) { margin-right: 0; }
		&.active { border-color: $primary; background-color: rgba($primary-container, 0.1); border-width: 4rpx; }
		&:active { transform: scale(0.95); background-color: $surface-container; }
	}

	.picker-icon-wrap { width: 72rpx; height: 72rpx; display: flex; align-items: center; justify-content: center; margin-bottom: 16rpx; }
	.picker-name { font-size: 22rpx; font-weight: 700; color: $on-surface; text-align: center; }
</style>
