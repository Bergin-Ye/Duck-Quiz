<template>
	<view class="container">
		<view class="header">
			<view class="back-btn" @tap="goBack">
				<dp-icon type="arrow_back" size="48" color="#1c1b1b"></dp-icon>
			</view>
			<text class="header-title">通知</text>
			<view style="width:80rpx;"></view>
		</view>

		<view class="main-content">
			<view class="setting-row">
				<view class="setting-left">
					<dp-icon type="notifications" size="48" color="#514532"></dp-icon>
					<text class="setting-name">每日学习提醒</text>
				</view>
				<switch :checked="dailyReminder" @change="toggleDaily" color="#ffb300" />
			</view>

			<view v-if="dailyReminder" class="sub-setting">
				<text class="sub-label">提醒时间</text>
				<picker mode="time" :value="reminderTime" @change="onTimeChange">
					<view class="time-picker">
						<text class="time-text">{{ reminderTime }}</text>
						<dp-icon type="expand_more" size="40" color="#1c1b1b"></dp-icon>
					</view>
				</picker>
			</view>

			<view class="setting-row">
				<view class="setting-left">
					<dp-icon type="local_fire_department" size="48" color="#514532"></dp-icon>
					<text class="setting-name">连续天数提醒</text>
				</view>
				<switch :checked="streakReminder" @change="toggleStreak" color="#ffb300" />
			</view>

			<view class="info-box">
				<dp-icon type="info" size="36" color="#847560"></dp-icon>
				<text class="info-text">开启提醒后，系统会在指定时间推送学习提醒通知。</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dailyReminder: false,
				streakReminder: false,
				reminderTime: '09:00'
			}
		},
		onLoad() {
			this.dailyReminder = uni.getStorageSync('dp_daily_reminder') || false
			this.streakReminder = uni.getStorageSync('dp_streak_reminder') || false
			this.reminderTime = uni.getStorageSync('dp_reminder_time') || '09:00'
		},
		methods: {
			goBack() { uni.navigateBack() },
			toggleDaily(e) {
				this.dailyReminder = e.detail.value
				uni.setStorageSync('dp_daily_reminder', this.dailyReminder)
			},
			toggleStreak(e) {
				this.streakReminder = e.detail.value
				uni.setStorageSync('dp_streak_reminder', this.streakReminder)
			},
			onTimeChange(e) {
				this.reminderTime = e.detail.value
				uni.setStorageSync('dp_reminder_time', this.reminderTime)
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
	.setting-row { background-color:$surface-container-lowest; border:3rpx solid $on-surface; border-radius:24rpx; padding:32rpx; margin-bottom:24rpx; display:flex; flex-direction:row; align-items:center; justify-content:space-between; box-sizing:border-box; width:100%; }
	.setting-left { display:flex; flex-direction:row; align-items:center; }
	.setting-name { font-size:32rpx; color:$on-surface; margin-left:24rpx; }
	.sub-setting { padding:0 16rpx 32rpx; margin-top:-8rpx; }
	.sub-label { font-size:28rpx; color:$on-surface-variant; margin-bottom:12rpx; }
	.time-picker { display:flex; flex-direction:row; align-items:center; background-color:$surface-container-lowest; border:2rpx solid $outline-variant; border-radius:16rpx; padding:24rpx; }
	.time-text { font-size:32rpx; font-weight:700; color:$on-surface; margin-right:16rpx; }
	.info-box { display:flex; flex-direction:row; align-items:flex-start; background-color:$surface-container; border-radius:16rpx; padding:24rpx; margin-top:24rpx; }
	.info-text { font-size:24rpx; color:$on-surface-variant; line-height:1.5; margin-left:16rpx; flex:1; }
</style>
