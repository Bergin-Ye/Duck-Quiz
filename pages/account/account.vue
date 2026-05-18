<template>
	<view class="container">
		<view class="header">
			<view class="back-btn" @tap="goBack">
				<dp-icon type="arrow_back" size="48" color="#1c1b1b"></dp-icon>
			</view>
			<text class="header-title">账户</text>
			<view style="width:80rpx;"></view>
		</view>

		<view class="main-content">
			<view class="avatar-section" @tap="changeAvatar">
				<view class="avatar-wrap">
					<image class="avatar-img" :src="avatar" mode="aspectFill"></image>
				</view>
				<text class="change-text">点击更换头像</text>
			</view>

			<view class="form-group">
				<text class="form-label">昵称</text>
				<input class="form-input" v-model="nickname" placeholder="输入昵称" />
			</view>

			<view class="form-group">
				<text class="form-label">学习目标</text>
				<view class="goal-options">
					<view v-for="g in goals" :key="g" class="goal-chip" :class="{ active: goal === g }" @tap="goal = g">
						<text class="goal-text">{{ g }}</text>
					</view>
				</view>
			</view>

			<view class="save-btn" @tap="save">
				<text class="save-text">保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getUserProfile, updateUserProfile, getAvatar, setAvatar } from '../../utils/storage.js'
	export default {
		data() {
			return {
				nickname: '',
				goal: '',
				avatar: '/static/duck.png',
				goals: ['求职面试', '技能提升', '兴趣学习', '考试备战']
			}
		},
		onLoad() {
			const p = getUserProfile()
			this.nickname = p.nickname
			this.goal = p.goal || ''
			this.avatar = getAvatar()
		},
		methods: {
			goBack() { uni.navigateBack() },
			save() {
				updateUserProfile({ nickname: this.nickname || '冒险鸭', goal: this.goal })
				uni.showToast({ title: '保存成功', icon: 'none' })
				setTimeout(() => uni.navigateBack(), 500)
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
	.avatar-section { display:flex; flex-direction:column; align-items:center; margin-bottom:48rpx; }
	.avatar-wrap { width:160rpx; height:160rpx; border-radius:50%; border:4rpx solid $on-surface; overflow:hidden; margin-bottom:16rpx; }
	.avatar-img { width:100%; height:100%; }
	.change-text { font-size:24rpx; color:$primary; }
	.form-group { margin-bottom:32rpx; }
	.form-label { font-size:28rpx; font-weight:700; color:$on-surface; margin-bottom:12rpx; }
	.form-input { width:100%; height:80rpx; background-color:$surface-container-lowest; border:3rpx solid $outline-variant; border-radius:16rpx; padding:0 24rpx; font-size:28rpx; box-sizing:border-box; }
	.goal-options { display:flex; flex-direction:row; flex-wrap:wrap; }
	.goal-chip { padding:16rpx 32rpx; border:2rpx solid $outline-variant; border-radius:999rpx; margin-right:16rpx; margin-bottom:16rpx; &.active { background-color:$primary-container; border-color:$on-surface; } }
	.goal-text { font-size:24rpx; color:$on-surface; }
	.save-btn { background-color:$primary-container; border:3rpx solid $on-surface; border-radius:999rpx; padding:32rpx; display:flex; align-items:center; justify-content:center; margin-top:32rpx; &:active { opacity:0.8; } }
	.save-text { font-size:28rpx; font-weight:700; color:$on-primary-container; }
</style>
