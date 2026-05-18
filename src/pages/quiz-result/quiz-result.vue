<template>
	<view class="container">
		<view class="decorative-bg">
			<view class="decorative-shape"></view>
		</view>

		<view class="result-container">
			<view class="duck-illustration">
				<image class="duck-image" src="/static/duck.png" mode="aspectFit"></image>
			</view>

			<view class="result-card">
				<text class="result-title">课程完成！</text>

				<view class="progress-ring" :style="{ '--fill-deg': correctPercent * 3.6 + 'deg' }">
					<view class="ring-bg"></view>
					<view class="ring-fill"></view>
					<view class="ring-inner">
						<text class="percent-text">{{ correctPercent }}%</text>
						<text class="percent-label">正确</text>
					</view>
				</view>

				<view class="stats-divider"></view>

				<view class="stats-row">
					<view class="stat-item">
						<text class="stat-value">{{ earnedCorn }} 🌽</text>
						<text class="stat-label">获得</text>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item">
						<view class="stat-with-icon">
							<dp-icon type="clock" size="40" color="#1c1b1b"></dp-icon>
							<text class="stat-value">{{ formatTime(timeSpent) }}</text>
						</view>
						<text class="stat-label">时间</text>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item">
						<view class="stat-with-icon">
							<dp-icon type="warning" size="40" color="#bb171c"></dp-icon>
							<text class="stat-value">{{ streak }}</text>
						</view>
						<text class="stat-label">连续</text>
					</view>
				</view>
			</view>

			<view class="action-buttons">
				<view class="primary-btn" @tap="tryAgain">
					<text class="primary-text">再试一次</text>
				</view>
				<view class="secondary-btn" @tap="reviewMistakes">
					<text class="secondary-text">复习错题</text>
				</view>
				<view class="text-link" @tap="backToHome">
					<text class="link-text">返回首页</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				discipline: '', correct: 0, total: 0,
				timeSpent: 165, streak: 5, earnedCorn: 30
			}
		},
		computed: {
			correctPercent() { return this.total > 0 ? Math.round((this.correct / this.total) * 100) : 0 }
		},
		onLoad(options) {
			if (options.correct) this.correct = parseInt(options.correct)
			if (options.total) this.total = parseInt(options.total)
			if (options.discipline) this.discipline = options.discipline
			this.earnedCorn = this.correct * 10
		},
		methods: {
			formatTime(seconds) {
				const mins = Math.floor(seconds / 60)
				const secs = seconds % 60
				return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
			},
			tryAgain() { uni.redirectTo({ url: `/pages/quiz/quiz?discipline=${this.discipline}` }) },
			reviewMistakes() { uni.switchTab({ url: '/pages/notebook/notebook' }) },
			backToHome() { uni.switchTab({ url: '/pages/index/index' }) }
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		width: 100%;
		background-color: $background;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}

	.decorative-bg {
		position: absolute;
		top: 80rpx;
		left: 80rpx;
		opacity: 0.2;
		pointer-events: none;
	}

	.decorative-shape {
		width: 120rpx;
		height: 120rpx;
		background-color: $primary-container;
		border-radius: 50%;
	}

	.result-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}

	.duck-illustration {
		position: relative;
		z-index: 10;
		margin-bottom: -96rpx;
		animation: duckDropIn 0.5s ease;
	}

	.duck-image {
		width: 256rpx;
		height: 256rpx;
		border-radius: 50%;
		border: 4rpx solid $on-surface;
		background-color: $surface-container-lowest;
	}

	.result-card {
		width: 100%;
		background-color: $surface-container-lowest;
		border: 4rpx solid $on-surface;
		border-radius: 24rpx;
		padding: 144rpx 48rpx 48rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		animation: slideUp 0.5s ease 0.2s both;
	}

	.result-title {
		font-size: 40rpx;
		font-weight: 700;
		color: $on-surface;
		margin-bottom: 48rpx;
	}

	.progress-ring {
		position: relative;
		width: 280rpx;
		height: 280rpx;
		margin-bottom: 48rpx;
		animation: ringFadeIn 0.6s ease 0.4s both;
	}

	.ring-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: $surface-variant;
	}

	.ring-fill {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: conic-gradient($primary-container 0deg, $primary-container var(--fill-deg, 0deg), transparent var(--fill-deg, 0deg));
	}

	.ring-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 220rpx;
		height: 220rpx;
		border-radius: 50%;
		background: $surface-container-lowest;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.percent-text {
		font-size: 56rpx;
		font-weight: 700;
		color: $on-surface;
		line-height: 1;
	}

	.percent-label {
		font-size: 24rpx;
		color: $on-surface-variant;
		margin-top: 8rpx;
	}

	.stats-divider {
		width: 100%;
		height: 3rpx;
		background-color: rgba($on-surface-variant, 0.3);
		margin-bottom: 32rpx;
	}

	.stats-row {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.stat-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.stat-value {
		font-size: 40rpx;
		font-weight: 700;
		color: $on-surface;
		margin-bottom: 8rpx;
	}

	.stat-with-icon {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 8rpx;
	}

	.stat-label {
		font-size: 24rpx;
		color: $on-surface-variant;
	}

	.stat-divider {
		width: 3rpx;
		height: 80rpx;
		background-color: rgba($on-surface-variant, 0.3);
		align-self: center;
	}

	.action-buttons {
		width: 100%;
		margin-top: 48rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		animation: slideUp 0.5s ease 0.6s both;
	}

	.primary-btn {
		width: 100%;
		background-color: $primary-container;
		border: 4rpx solid $on-surface;
		border-radius: 48rpx;
		padding: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 24rpx;
		box-sizing: border-box;
		&:active { background-color: $primary-fixed-dim; }
	}

	.primary-text { font-size: 24rpx; font-weight: 700; color: $on-surface; }

	.secondary-btn {
		width: 100%;
		background-color: $surface-container-lowest;
		border: 4rpx solid $on-surface;
		border-radius: 48rpx;
		padding: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 24rpx;
		box-sizing: border-box;
		&:active { background-color: $surface-container-low; }
	}

	.secondary-text { font-size: 24rpx; font-weight: 700; color: $on-surface; }

	.text-link {
		padding: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		box-sizing: border-box;
	}

	.link-text {
		font-size: 24rpx;
		color: $outline;
		&:active { color: $on-surface; }
	}

	@keyframes duckDropIn {
		0% { opacity: 0; transform: translateY(-60rpx) scale(0.5); }
		60% { transform: translateY(10rpx) scale(1.05); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}

	@keyframes slideUp {
		from { opacity: 0; transform: translateY(40rpx); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes ringFadeIn {
		from { opacity: 0; transform: scale(0.8); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
