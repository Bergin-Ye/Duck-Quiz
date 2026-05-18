<template>
	<view class="container">
		<view class="header">
			<view class="back-btn" @tap="goBack">
				<dp-icon type="arrow_back" size="48" color="#1c1b1b"></dp-icon>
			</view>
			<text class="header-title">心情</text>
			<view style="width:80rpx;"></view>
		</view>

		<view class="main-content">
			<text class="section-title">今天学习心情如何？</text>
			<view class="mood-grid">
				<view v-for="m in moods" :key="m.emoji" class="mood-card" :class="{ active: selected === m.emoji }" @tap="selectMood(m)">
					<text class="mood-emoji">{{ m.emoji }}</text>
					<text class="mood-label">{{ m.label }}</text>
				</view>
			</view>

			<view v-if="selected" class="note-section">
				<text class="note-label">备注（可选）</text>
				<textarea class="note-input" v-model="note" placeholder="记录一下今天的学习感受..." />
				<view class="save-btn" @tap="saveMood">
					<text class="save-text">记录心情</text>
				</view>
			</view>

			<view class="history">
				<text class="section-title">最近心情</text>
				<view v-for="(h, i) in history" :key="i" class="history-item">
					<text class="history-emoji">{{ h.emoji }}</text>
					<view class="history-text">
						<text class="history-date">{{ h.date }}</text>
						<text v-if="h.note" class="history-note">{{ h.note }}</text>
					</view>
				</view>
				<view v-if="history.length === 0" class="empty">
					<text class="empty-text">还没有心情记录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: '',
				note: '',
				moods: [
					{ emoji: '😊', label: '开心' },
					{ emoji: '😤', label: '困难' },
					{ emoji: '😴', label: '疲惫' },
					{ emoji: '🤩', label: '兴奋' },
					{ emoji: '😰', label: '焦虑' },
					{ emoji: '😌', label: '平静' }
				],
				history: []
			}
		},
		onLoad() {
			this.history = uni.getStorageSync('dp_mood_history') || []
		},
		methods: {
			goBack() { uni.navigateBack() },
			selectMood(m) { this.selected = m.emoji },
			saveMood() {
				const today = new Date().toISOString().slice(0, 10)
				this.history.unshift({ emoji: this.selected, date: today, note: this.note })
				if (this.history.length > 30) this.history = this.history.slice(0, 30)
				uni.setStorageSync('dp_mood_history', this.history)
				this.selected = ''
				this.note = ''
				uni.showToast({ title: '已记录', icon: 'none' })
			}
		}
	}
</script>

<style lang="scss">
	.container { min-height:100vh; width:100%; background-color:$background; padding-top:calc(96rpx + env(safe-area-inset-top)); box-sizing:border-box; }
	.header { position:fixed; top:0; left:0; width:100%; z-index:50; background-color:$surface; border-bottom:2rpx solid rgba($on-surface,0.1); padding:0 40rpx; padding-top:env(safe-area-inset-top); height:calc(96rpx + env(safe-area-inset-top)); display:flex; flex-direction:row; align-items:center; justify-content:space-between; box-sizing:border-box; }
	.back-btn { width:80rpx; height:80rpx; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
	.header-title { font-size:36rpx; font-weight:700; color:$on-surface; }
	.main-content { padding:40rpx; }
	.section-title { font-size:32rpx; font-weight:700; color:$on-surface; margin-bottom:24rpx; }
	.mood-grid { display:flex; flex-direction:row; flex-wrap:wrap; margin-bottom:32rpx; }
	.mood-card { width:31.33%; margin-right:3%; margin-bottom:24rpx; background-color:$surface-container-lowest; border:3rpx solid $outline-variant; border-radius:24rpx; padding:32rpx 16rpx; display:flex; flex-direction:column; align-items:center; box-sizing:border-box; &:nth-child(3n) { margin-right:0; } &.active { border-color:$primary; background-color:rgba($primary-container,0.15); } }
	.mood-emoji { font-size:48rpx; margin-bottom:8rpx; }
	.mood-label { font-size:24rpx; color:$on-surface; }
	.note-section { margin-bottom:48rpx; }
	.note-label { font-size:28rpx; font-weight:700; color:$on-surface; margin-bottom:12rpx; }
	.note-input { width:100%; min-height:160rpx; background-color:$surface-container-lowest; border:3rpx solid $outline-variant; border-radius:16rpx; padding:24rpx; font-size:28rpx; box-sizing:border-box; }
	.save-btn { background-color:$primary-container; border:3rpx solid $on-surface; border-radius:999rpx; padding:24rpx; display:flex; align-items:center; justify-content:center; margin-top:24rpx; &:active { opacity:0.8; } }
	.save-text { font-size:28rpx; font-weight:700; color:$on-primary-container; }
	.history-item { display:flex; flex-direction:row; align-items:center; padding:24rpx 0; border-bottom:2rpx solid $outline-variant; }
	.history-emoji { font-size:40rpx; margin-right:24rpx; }
	.history-text { flex:1; }
	.history-date { font-size:24rpx; color:$on-surface-variant; }
	.history-note { font-size:28rpx; color:$on-surface; margin-top:4rpx; }
	.empty { padding:48rpx; display:flex; align-items:center; justify-content:center; }
	.empty-text { font-size:28rpx; color:$on-surface-variant; }
</style>
