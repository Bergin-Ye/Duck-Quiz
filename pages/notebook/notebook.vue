<template>
	<view class="container">
		<view class="header">
			<text class="header-title">错题本</text>
			<view class="search-btn" @tap="toggleSearch">
				<dp-icon :type="searching ? 'close' : 'search'" size="40" color="#1c1b1b"></dp-icon>
			</view>
		</view>

		<view v-if="searching" class="search-bar">
			<input class="search-input" v-model="searchQuery" placeholder="搜索错题..." @input="onSearch" />
		</view>

		<view class="main-content" :key="pageKey" :style="searching ? { paddingTop: '100rpx' } : {}">
			<view v-if="filteredGroups.length === 0" class="empty-state">
				<text class="empty-text">{{ searchQuery ? '没有找到匹配的错题' : '还没有错题，继续加油！' }}</text>
			</view>
			<view v-for="(group, index) in filteredGroups" :key="index" class="group-section">
				<view class="group-header" @tap="toggleGroup(index)">
					<view class="group-left">
						<view class="group-icon" :style="{ backgroundColor: group.color }">
							<dp-icon :type="group.icon" size="40" :color="group.iconColor"></dp-icon>
						</view>
						<text class="group-name">{{ group.name }}</text>
					</view>
					<view class="group-right">
						<view class="mistake-badge">
							<text class="badge-text">{{ group.mistakes.length }}个错误</text>
						</view>
						<dp-icon :type="group.expanded ? 'expand_less' : 'expand_more'" size="40" color="#1c1b1b"></dp-icon>
					</view>
				</view>

				<view v-if="group.expanded" class="mistakes-list">
					<view v-for="(mistake, mIndex) in group.mistakes" :key="mIndex" class="mistake-card">
						<view class="card-body">
							<view class="card-left">
								<text class="mistake-title">{{ mistake.title }}</text>
								<text class="mistake-desc">{{ mistake.description }}</text>
							</view>
							<view class="card-right">
								<view class="wrong-badge">
									<dp-icon type="close" size="28" color="#ba1a1a"></dp-icon>
									<text class="wrong-text">{{ mistake.count }}x</text>
								</view>
								<view class="redo-btn" @tap="redoMistake(mistake)">
									<text class="redo-text">重做</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getMistakes } from '../../utils/storage.js'

	const PATH_META = {
		frontend: { icon: 'web', color: '#ffb300', iconColor: '#6b4900' },
		backend: { icon: 'dns', color: '#006e1c', iconColor: '#00731e' },
		mobile: { icon: 'smartphone', color: '#ffaca3', iconColor: '#a30010' },
		client: { icon: 'computer', color: '#ffb300', iconColor: '#6b4900' },
		embedded: { icon: 'developer_board', color: '#e5e2e1', iconColor: '#514532' },
		ai: { icon: 'smart_toy', color: '#ffb300', iconColor: '#6b4900' },
		devops: { icon: 'cloud_sync', color: '#91f78e', iconColor: '#00731e' },
		security: { icon: 'security', color: '#ffaca3', iconColor: '#a30010' },
		gamedev: { icon: 'sports_esports', color: '#ffb300', iconColor: '#6b4900' }
	}

	export default {
		data() {
			return {
				pageKey: 0,
				searching: false,
				searchQuery: '',
				mistakeGroups: []
			}
		},
		computed: {
			filteredGroups() {
				if (!this.searchQuery) return this.mistakeGroups
				const q = this.searchQuery.toLowerCase()
				return this.mistakeGroups.map(group => {
					const filtered = group.mistakes.filter(m =>
						m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
					)
					return filtered.length > 0 ? { ...group, mistakes: filtered } : null
				}).filter(Boolean)
			}
		},
		onShow() {
			this.pageKey++
			this.loadMistakes()
		},
		methods: {
			loadMistakes() {
				const all = getMistakes()
				if (all.length === 0) {
					this.mistakeGroups = []
					return
				}
				// 按 pathId 分组
				const groups = {}
				all.forEach(m => {
					if (!groups[m.pathId]) groups[m.pathId] = []
					groups[m.pathId].push(m)
				})
				this.mistakeGroups = Object.keys(groups).map(pathId => {
					const meta = PATH_META[pathId] || PATH_META.frontend
					return {
						name: pathId,
						icon: meta.icon,
						color: meta.color,
						iconColor: meta.iconColor,
						expanded: false,
						mistakes: groups[pathId]
					}
				})
			},
			toggleGroup(index) {
				const wasExpanded = this.mistakeGroups[index].expanded
				this.mistakeGroups.forEach((g, i) => { this.mistakeGroups[i].expanded = false })
				this.mistakeGroups[index].expanded = !wasExpanded
			},
			redoMistake(mistake) {
				uni.navigateTo({ url: `/pages/quiz/quiz?nodeId=${mistake.nodeId || ''}&pathId=${mistake.pathId || 'frontend'}&discipline=${encodeURIComponent(mistake.title)}` })
			},
			toggleSearch() {
				this.searching = !this.searching
				if (!this.searching) this.searchQuery = ''
			},
			onSearch() {}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		width: 100%;
		background-color: $background;
		padding-top: calc(128rpx + env(safe-area-inset-top));
		padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
	}

	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 40;
		background-color: $surface;
		padding: 0 40rpx;
		padding-top: env(safe-area-inset-top);
		height: calc(128rpx + env(safe-area-inset-top));
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.header-title { font-size: 40rpx; font-weight: 700; color: $on-surface; }

	.search-btn {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.search-bar {
		position: fixed;
		top: calc(128rpx + env(safe-area-inset-top));
		left: 0;
		width: 100%;
		z-index: 39;
		padding: 16rpx 40rpx;
		background-color: $surface;
		border-bottom: 2rpx solid $outline-variant;
		box-sizing: border-box;
	}

	.search-input {
		width: 100%;
		height: 72rpx;
		background-color: $surface-container;
		border: 2rpx solid $outline-variant;
		border-radius: 16rpx;
		padding: 0 24rpx;
		font-size: 28rpx;
		box-sizing: border-box;
	}

	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 120rpx 40rpx;
	}

	.empty-text {
		font-size: 28rpx;
		color: $on-surface-variant;
	}

	.main-content { padding: 32rpx 40rpx; width: 100%; box-sizing: border-box; }

	.group-section {
		margin-bottom: 48rpx;
		width: 100%;
		animation: slideInUp 0.4s ease both;
		&:nth-child(1) { animation-delay: 0s; }
		&:nth-child(2) { animation-delay: 0.1s; }
		&:nth-child(3) { animation-delay: 0.2s; }
	}

	.group-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx;
		background-color: $surface;
		border: 2rpx solid $outline;
		border-radius: 24rpx;
		box-sizing: border-box;
		width: 100%;
		min-height: 112rpx;
		&:active { background-color: $surface-container-low; }
	}

	.group-left { display: flex; flex-direction: row; align-items: center; }

	.group-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3rpx solid $on-surface;
		flex-shrink: 0;
		margin-right: 24rpx;
	}

	.group-name { font-size: 40rpx; font-weight: 700; color: $on-surface; }

	.group-right { display: flex; flex-direction: row; align-items: center; flex-shrink: 0; }

	.mistake-badge {
		padding: 16rpx 24rpx;
		background-color: $surface-variant;
		border-radius: 999rpx;
		border: 2rpx solid $outline;
		margin-right: 24rpx;
	}

	.badge-text { font-size: 24rpx; font-weight: 700; color: $on-surface-variant; }

	.mistakes-list {
		padding-left: 32rpx;
		margin-left: 32rpx;
		border-left: 4rpx solid $outline-variant;
		margin-top: 32rpx;
		animation: expandIn 0.3s ease;
	}

	.mistake-card {
		background-color: $surface-container-lowest;
		border: 2rpx solid $on-surface;
		border-radius: 24rpx;
		padding: 32rpx;
		box-sizing: border-box;
		width: 100%;
		margin-bottom: 32rpx;
		&:last-child { margin-bottom: 0; }
		&:active { border-width: 4rpx; }
	}

	.card-body { display: flex; flex-direction: row; }
	.card-left { flex: 1; margin-right: 24rpx; }
	.mistake-title { font-size: 32rpx; font-weight: 700; color: $on-surface; margin-bottom: 8rpx; }
	.mistake-desc { font-size: 28rpx; color: $on-surface-variant; lines: 2; text-overflow: ellipsis; overflow: hidden; }
	.card-right { display: flex; flex-direction: column; align-items: flex-end; flex-shrink: 0; }

	.wrong-badge {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: $error-container;
		padding: 8rpx 16rpx;
		border-radius: 999rpx;
		border: 2rpx solid $error;
		margin-bottom: 16rpx;
	}

	.wrong-text { font-size: 24rpx; font-weight: 700; color: $error; margin-left: 8rpx; }

	.redo-btn {
		padding: 12rpx 32rpx;
		background-color: $surface;
		border: 3rpx solid $on-surface;
		border-radius: 999rpx;
		&:active { background-color: $surface-container; }
	}

	.redo-text { font-size: 24rpx; font-weight: 700; color: $on-surface; }

	@keyframes slideInUp {
		from { opacity: 0; transform: translateY(24rpx); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes expandIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
