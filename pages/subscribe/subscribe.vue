<template>
	<view class="container">
		<view class="header">
			<view class="back-btn" @tap="goBack">
				<dp-icon type="arrow_back" size="48" color="#1c1b1b"></dp-icon>
			</view>
			<text class="header-title">订阅</text>
			<view style="width:80rpx;"></view>
		</view>

		<view class="main-content">
			<view class="hero">
				<image class="hero-duck" src="/static/duck.png" mode="aspectFit"></image>
				<text class="hero-title">解锁完整学习体验</text>
				<text class="hero-desc">无限答题、详细解析、学习报告</text>
			</view>

			<view class="plan-card" @tap="selectPlan('year')">
				<view class="plan-badge">
					<text class="badge-text">推荐</text>
				</view>
				<text class="plan-name">年度订阅</text>
				<text class="plan-price">¥98/年</text>
				<text class="plan-desc">相当于 ¥8.2/月，节省 40%</text>
			</view>

			<view class="plan-card" @tap="selectPlan('month')">
				<text class="plan-name">月度订阅</text>
				<text class="plan-price">¥12/月</text>
				<text class="plan-desc">随时可取消</text>
			</view>

			<view class="features">
				<text class="features-title">订阅特权</text>
				<view class="feature-item">
					<dp-icon type="check_circle" size="40" color="#006e1c"></dp-icon>
					<text class="feature-text">无限次答题挑战</text>
				</view>
				<view class="feature-item">
					<dp-icon type="check_circle" size="40" color="#006e1c"></dp-icon>
					<text class="feature-text">详细题目解析</text>
				</view>
				<view class="feature-item">
					<dp-icon type="check_circle" size="40" color="#006e1c"></dp-icon>
					<text class="feature-text">学习进度报告</text>
				</view>
				<view class="feature-item">
					<dp-icon type="check_circle" size="40" color="#006e1c"></dp-icon>
					<text class="feature-text">错题导出功能</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goBack() { uni.navigateBack() },
			selectPlan(type) {
				uni.showToast({ title: '支付功能开发中', icon: 'none' })
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
	.hero { display:flex; flex-direction:column; align-items:center; margin-bottom:48rpx; }
	.hero-duck { width:160rpx; height:160rpx; margin-bottom:24rpx; }
	.hero-title { font-size:40rpx; font-weight:700; color:$on-surface; margin-bottom:8rpx; }
	.hero-desc { font-size:28rpx; color:$on-surface-variant; }
	.plan-card { background-color:$surface-container-lowest; border:3rpx solid $on-surface; border-radius:24rpx; padding:32rpx; margin-bottom:24rpx; box-sizing:border-box; width:100%; position:relative; &:active { background-color:$surface-container; } }
	.plan-badge { position:absolute; top:-1rpx; right:32rpx; background-color:$primary-container; border:2rpx solid $on-surface; border-radius:0 0 12rpx 12rpx; padding:4rpx 16rpx; }
	.badge-text { font-size:20rpx; font-weight:700; color:$on-primary-container; }
	.plan-name { font-size:32rpx; font-weight:700; color:$on-surface; margin-bottom:8rpx; }
	.plan-price { font-size:48rpx; font-weight:700; color:$primary; margin-bottom:8rpx; }
	.plan-desc { font-size:24rpx; color:$on-surface-variant; }
	.features { margin-top:48rpx; }
	.features-title { font-size:32rpx; font-weight:700; color:$on-surface; margin-bottom:24rpx; }
	.feature-item { display:flex; flex-direction:row; align-items:center; margin-bottom:24rpx; }
	.feature-text { font-size:28rpx; color:$on-surface; margin-left:16rpx; }
</style>
