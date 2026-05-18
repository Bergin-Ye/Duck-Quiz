<template>
	<view class="container">
		<view class="header">
			<view class="header-left">
				<view class="header-avatar" @tap="changeAvatar">
					<image class="header-avatar-img" :src="avatar" mode="aspectFill"></image>
				</view>
				<text class="header-title">今日旅程</text>
			</view>
			<view class="corn-badge">
				<dp-icon type="star" size="36" color="#ffb300" :filled="true"></dp-icon>
				<text class="corn-text">{{ cornBalance }} corn</text>
			</view>
		</view>

		<view class="main-content" :key="pageKey">
			<view class="decorative-bg"></view>

			<view class="profile-header">
				<view class="avatar-wrapper">
					<view class="avatar-ring">
						<view class="avatar-inner" @tap="changeAvatar">
							<image class="avatar-img" :src="avatar" mode="aspectFill"></image>
						</view>
					</view>
					<view class="level-badge">
						<text class="level-text">Lv. {{ level }}</text>
					</view>
				</view>
				<text class="profile-name">{{ nickname }}</text>
				<text class="join-date">{{ joinDate }}加入</text>
			</view>

			<view class="section">
				<text class="section-title">成就</text>
				<view class="achievements-grid">
					<view class="achievement-card">
						<view class="achievement-icon" style="background-color: #ffdad6;">
							<dp-icon type="bolt" size="40" color="#bb171c" :filled="true"></dp-icon>
						</view>
						<text class="achievement-name">快速学习者</text>
					</view>
					<view class="achievement-card">
						<view class="achievement-icon" style="background-color: #ffdeac;">
							<dp-icon type="star" size="40" color="#ffb300" :filled="true"></dp-icon>
						</view>
						<text class="achievement-name">玉米收集者</text>
					</view>
					<view class="achievement-card locked">
						<view class="achievement-icon locked-icon">
							<dp-icon type="lock" size="40" color="#847560"></dp-icon>
						</view>
						<text class="achievement-name locked-text">大师</text>
					</view>
					<view class="achievement-card locked">
						<view class="achievement-icon locked-icon">
							<dp-icon type="lock" size="40" color="#847560"></dp-icon>
						</view>
						<text class="achievement-name locked-text">探索者</text>
					</view>
				</view>
			</view>

			<view class="section">
				<text class="section-title">设置</text>
				<view v-for="(setting, sIndex) in settings" :key="sIndex" class="setting-card" @tap="openSetting(setting.name)">
					<view class="setting-icon-wrap">
						<dp-icon :type="setting.icon" size="48" :color="setting.iconColor" :filled="setting.filled || false"></dp-icon>
					</view>
					<text class="setting-name">{{ setting.name }}</text>
					<view class="setting-right">
						<view v-if="setting.badge" class="setting-badge">
							<text class="badge-text">{{ setting.badge }}</text>
						</view>
						<text v-if="setting.value" class="setting-value">{{ setting.value }}</text>
						<dp-icon type="chevron_right" size="48" color="#514532"></dp-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getCornBalance, calculateLevel, getUserProfile, getAvatar, setAvatar } from '../../utils/storage.js'

	export default {
		data() {
			return {
				pageKey: 0,
				cornBalance: 0,
				level: 1,
				nickname: '冒险鸭',
				joinDate: '',
				avatar: '/static/duck.png',
				settings: [
					{ name: '订阅', icon: 'star', iconColor: '#ffb300', filled: true, badge: '升级' },
					{ name: '备份', icon: 'cloud_sync', iconColor: '#514532' },
					{ name: '账户', icon: 'person', iconColor: '#514532' },
					{ name: '心情', icon: 'mood', iconColor: '#514532' },
					{ name: '通知', icon: 'notifications', iconColor: '#514532' }
				]
			}
		},
		onShow() {
			this.pageKey++
			this.loadData()
		},
		methods: {
			loadData() {
				this.cornBalance = getCornBalance()
				this.level = calculateLevel()
				this.avatar = getAvatar()
				const profile = getUserProfile()
				this.nickname = profile.nickname
				this.joinDate = profile.joinedAt
			},
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const path = res.tempFilePaths[0]
						setAvatar(path)
						this.avatar = path
					}
				})
			},
			openSetting(name) {
				const routes = {
					'订阅': '/pages/subscribe/subscribe',
					'备份': '/pages/backup/backup',
					'账户': '/pages/account/account',
					'心情': '/pages/mood/mood',
					'通知': '/pages/notification/notification'
				}
				if (routes[name]) {
					uni.navigateTo({ url: routes[name] })
				} else {
					uni.showToast({ title: name, icon: 'none' })
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		width: 100%;
		background-color: $surface;
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
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		overflow: hidden;
		border: 4rpx solid $on-surface;
		background-color: $surface-container;
		flex-shrink: 0;
		margin-right: 24rpx;
	}

	.header-avatar-img { width: 100%; height: 100%; }
	.header-title { font-size: 40rpx; font-weight: 700; color: $primary; }

	.corn-badge {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 12rpx 24rpx;
		background-color: $surface-container-highest;
		border-radius: 999rpx;
		flex-shrink: 0;
	}

	.corn-text { font-size: 24rpx; font-weight: 700; color: $on-surface; margin-left: 16rpx; }

	.main-content { padding: 0 40rpx; position: relative; width: 100%; box-sizing: border-box; }

	.decorative-bg {
		position: absolute;
		top: 80rpx;
		right: 0;
		width: 256rpx;
		height: 256rpx;
		border: 3rpx solid $outline;
		border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
		opacity: 0.2;
		z-index: 0;
		pointer-events: none;
	}

	.profile-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 48rpx 0 32rpx;
		position: relative;
		z-index: 1;
		width: 100%;
		box-sizing: border-box;
	}

	.avatar-wrapper { position: relative; margin-bottom: 16rpx; }

	.avatar-ring {
		width: 192rpx;
		height: 192rpx;
		border-radius: 50%;
		border: 8rpx solid $primary-container;
		padding: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.avatar-inner {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
		border: 4rpx solid $on-surface;
		background-color: $surface-container-lowest;
	}

	.avatar-img { width: 100%; height: 100%; }

	.level-badge {
		position: absolute;
		bottom: 4rpx;
		right: 4rpx;
		background-color: $surface-container-lowest;
		border: 4rpx solid $on-surface;
		border-radius: 999rpx;
		padding: 8rpx 24rpx;
		z-index: 20;
		box-shadow: 0 4rpx 0 $on-surface;
	}

	.level-text { font-size: 24rpx; font-weight: 700; color: $on-surface; }
	.profile-name { font-size: 40rpx; font-weight: 700; color: $on-surface; margin-top: 16rpx; }
	.join-date { font-size: 28rpx; color: $on-surface-variant; margin-top: 8rpx; }

	.section { margin-top: 48rpx; position: relative; z-index: 1; width: 100%; box-sizing: border-box; }
	.section-title { font-size: 40rpx; font-weight: 700; color: $on-surface; margin-bottom: 16rpx; padding-left: 8rpx; }

	.achievements-grid { display: flex; flex-direction: row; flex-wrap: wrap; width: 100%; box-sizing: border-box; }

	.achievement-card {
		width: 46%;
		background-color: $surface-container-lowest;
		border: 4rpx solid $on-surface;
		border-radius: 24rpx;
		padding: 32rpx;
		box-sizing: border-box;
		margin-bottom: 24rpx;
		box-shadow: 4rpx 4rpx 0 $on-surface;
		animation: cardPop 0.4s ease both;
		&:nth-child(1) { margin-right: 4%; animation-delay: 0s; }
		&:nth-child(2) { animation-delay: 0.08s; }
		&:nth-child(3) { margin-right: 4%; animation-delay: 0.16s; }
		&:nth-child(4) { animation-delay: 0.24s; }
		&.locked { background-color: $surface-container; border: 3rpx solid $outline-variant; opacity: 0.7; box-shadow: none; }
	}

	.achievement-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3rpx solid $on-surface;
		margin-bottom: 16rpx;
	}

	.locked-icon { background-color: $surface-container-highest; border-color: $outline-variant; }
	.achievement-name { font-size: 24rpx; font-weight: 700; color: $on-surface; }
	.locked-text { color: $on-surface-variant; }

	/* 设置卡片 */
	.setting-card {
		background-color: $surface-container-lowest;
		border: 4rpx solid $on-surface;
		border-radius: 24rpx;
		padding: 32rpx;
		margin-bottom: 16rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
		&:active { background-color: $surface-container; }
		&:last-child { margin-bottom: 0; }
	}

	.setting-icon-wrap { margin-right: 24rpx; flex-shrink: 0; }
	.setting-name { flex: 1; font-size: 32rpx; color: $on-surface; }
	.setting-right { display: flex; flex-direction: row; align-items: center; flex-shrink: 0; }
	.setting-value { font-size: 28rpx; color: $on-surface-variant; margin-right: 16rpx; }

	.setting-badge {
		padding: 8rpx 24rpx;
		background-color: $primary-container;
		border-radius: 999rpx;
		border: 4rpx solid $on-surface;
		margin-right: 16rpx;
	}

	.badge-text { font-size: 24rpx; font-weight: 700; color: $on-primary-container; }

	@keyframes cardPop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
</style>
