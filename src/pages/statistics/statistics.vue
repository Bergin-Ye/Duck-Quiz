<template>
	<view class="container">
		<view class="header">
			<view class="header-left">
				<view class="header-avatar">
					<dp-icon type="person" size="40" color="#1c1b1b"></dp-icon>
				</view>
				<text class="header-title">学习统计</text>
			</view>
			<view class="date-picker" @tap="showDatePicker">
				<text class="date-text">本周</text>
				<dp-icon type="expand_more" size="36" color="#1c1b1b"></dp-icon>
			</view>
		</view>

		<view class="main-content" :key="pageKey">
			<view class="overview-grid">
				<view class="stat-card">
					<view class="card-top"><text class="card-label">题目数</text><dp-icon type="quiz" size="40" color="#1c1b1b"></dp-icon></view>
					<text class="card-value">{{ totalAnswered }}</text>
				</view>
				<view class="stat-card">
					<view class="card-top"><text class="card-label">准确率</text><dp-icon type="my_location" size="40" color="#1c1b1b"></dp-icon></view>
					<text class="card-value">{{ accuracy }}%</text>
				</view>
				<view class="stat-card">
					<view class="card-top"><text class="card-label">连续天数</text><dp-icon type="local_fire_department" size="40" color="#1c1b1b"></dp-icon></view>
					<view class="card-value-row"><text class="card-value">{{ streak }}</text><text class="card-unit">天</text></view>
				</view>
				<view class="stat-card">
					<view class="card-top"><text class="card-label">总玉米币</text><dp-icon type="grass" size="40" color="#1c1b1b"></dp-icon></view>
					<text class="card-value">{{ cornBalance }}</text>
				</view>
			</view>

			<view class="chart-card">
				<text class="card-title">每周学习</text>
				<view class="chart-area">
					<view v-for="(day, index) in weekDays" :key="index" class="bar-column">
						<view class="bar-wrapper">
							<view class="bar" :class="{ 'active': day.active }" :style="{ height: day.height + '%' }">
								<view v-if="day.active" class="bar-tooltip">
									<text class="tooltip-text">{{ day.minutes }}分钟</text>
								</view>
							</view>
						</view>
						<text class="bar-label" :class="{ 'active-label': day.active }">{{ day.label }}</text>
					</view>
				</view>
			</view>

			<view class="mastery-card">
				<text class="card-title">掌握进度</text>
				<view class="mastery-list">
					<view v-for="(topic, index) in topics" :key="index" class="mastery-item">
						<view class="mastery-header">
							<text class="topic-name">{{ topic.name }}</text>
							<text class="topic-percent">{{ topic.percent }}%</text>
						</view>
						<view class="mastery-bar">
							<view class="mastery-fill" :style="{ width: topic.percent + '%' }"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getStats, getStreak, getCornBalance, getWeeklyActivity } from '../../utils/storage.js'

	export default {
		data() {
			return {
				pageKey: 0,
				totalAnswered: 0,
				accuracy: 0,
				streak: 0,
				cornBalance: 0,
				weekDays: [],
				topics: [
					{ name: 'CSS布局', percent: 85 },
					{ name: 'JavaScript基础', percent: 60 },
					{ name: 'HTML语义化', percent: 100 },
					{ name: 'React基础', percent: 15 }
				]
			}
		},
		onShow() {
			this.pageKey++
			this.loadData()
		},
		methods: {
			loadData() {
				const stats = getStats()
				this.totalAnswered = stats.totalAnswered
				this.accuracy = stats.accuracy
				this.streak = getStreak()
				this.cornBalance = getCornBalance()
				const weekly = getWeeklyActivity()
				const maxMinutes = Math.max(...weekly.map(d => d.minutes), 1)
				this.weekDays = weekly.map(d => ({
					...d,
					height: Math.round((d.minutes / maxMinutes) * 100)
				}))
			},
			showDatePicker() { uni.showToast({ title: '日期选择开发中', icon: 'none' }) }
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
		z-index: 50;
		background-color: $surface;
		border-bottom: 2rpx solid rgba($on-surface, 0.1);
		padding: 0 40rpx;
		padding-top: env(safe-area-inset-top);
		height: calc(128rpx + env(safe-area-inset-top));
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.header-left { display: flex; flex-direction: row; align-items: center; }

	.header-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: $surface-variant;
		border: 3rpx solid $on-surface;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		flex-shrink: 0;
		margin-right: 24rpx;
	}

	.header-title { font-size: 40rpx; font-weight: 700; color: $primary; }

	.date-picker {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: $surface-container-lowest;
		border: 3rpx solid $on-surface;
		border-radius: 999rpx;
		padding: 12rpx 32rpx;
		flex-shrink: 0;
		&:active { background-color: $surface-variant; }
	}

	.date-text { font-size: 24rpx; font-weight: 700; color: $on-surface; margin-right: 8rpx; }

	.main-content { padding: 32rpx 40rpx; width: 100%; box-sizing: border-box; }

	/* 概览卡片 */
	.overview-grid { display: flex; flex-direction: row; flex-wrap: wrap; margin-bottom: 48rpx; width: 100%; box-sizing: border-box; }

	.stat-card {
		width: 48%;
		background-color: $surface-container-lowest;
		border: 3rpx solid $on-surface;
		border-radius: 24rpx;
		padding: 32rpx;
		min-height: 208rpx;
		box-sizing: border-box;
		margin-bottom: 24rpx;
		animation: cardPop 0.4s ease both;
		&:nth-child(1) { margin-right: 4%; animation-delay: 0s; }
		&:nth-child(2) { animation-delay: 0.08s; }
		&:nth-child(3) { margin-right: 4%; animation-delay: 0.16s; }
		&:nth-child(4) { animation-delay: 0.24s; }
	}

	.card-top { display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 16rpx; }
	.card-label { font-size: 24rpx; font-weight: 700; color: $on-surface-variant; }
	.card-value { font-size: 64rpx; font-weight: 700; color: $on-surface; }
	.card-value-row { display: flex; flex-direction: row; align-items: baseline; }
	.card-unit { font-size: 24rpx; font-weight: 700; color: $on-surface-variant; margin-left: 8rpx; }

	/* 图表卡片 */
	.chart-card {
		background-color: $surface-container-lowest;
		border: 3rpx solid $on-surface;
		border-radius: 24rpx;
		padding: 32rpx;
		margin-bottom: 48rpx;
		box-sizing: border-box;
		width: 100%;
		animation: slideUp 0.5s ease 0.3s both;
	}

	.mastery-card {
		background-color: $surface-container-lowest;
		border: 3rpx solid $on-surface;
		border-radius: 24rpx;
		padding: 32rpx;
		box-sizing: border-box;
		width: 100%;
		animation: slideUp 0.5s ease 0.5s both;
	}

	.card-title { font-size: 40rpx; font-weight: 700; color: $on-surface; margin-bottom: 48rpx; }

	.chart-area {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		height: 320rpx;
		padding-top: 32rpx;
		border-bottom: 3rpx solid rgba($on-surface, 0.2);
		padding-bottom: 16rpx;
	}

	.bar-column { flex: 1; display: flex; flex-direction: column; align-items: center; }

	.bar-wrapper {
		width: 100%;
		height: 240rpx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		margin-bottom: 16rpx;
	}

	.bar {
		width: 48rpx;
		background-color: $surface-variant;
		border: 3rpx solid $on-surface;
		border-radius: 24rpx 24rpx 0 0;
		position: relative;
		&.active { background-color: $primary-container; border-width: 4rpx; }
	}

	.bar-tooltip {
		position: absolute;
		top: -72rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: $surface-container-lowest;
		border: 3rpx solid $on-surface;
		padding: 8rpx 16rpx;
		border-radius: 12rpx;
		white-space: nowrap;
	}

	.tooltip-text { font-size: 24rpx; font-weight: 700; color: $on-surface; }
	.bar-label { font-size: 24rpx; font-weight: 700; color: $on-surface-variant; }
	.active-label { color: $on-surface; }

	.mastery-item { margin-bottom: 32rpx; &:last-child { margin-bottom: 0; } }
	.mastery-header { display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 16rpx; }
	.topic-name { font-size: 32rpx; font-weight: 700; color: $on-surface; }
	.topic-percent { font-size: 24rpx; font-weight: 700; color: $on-surface-variant; }

	.mastery-bar {
		width: 100%;
		height: 24rpx;
		background-color: $surface-variant;
		border: 3rpx solid $on-surface;
		border-radius: 999rpx;
		overflow: hidden;
	}

	.mastery-fill { height: 100%; background-color: $secondary; border-right: 3rpx solid $on-surface; border-radius: 999rpx; }

	@keyframes cardPop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
	@keyframes slideUp { from { opacity: 0; transform: translateY(32rpx); } to { opacity: 1; transform: translateY(0); } }
</style>
