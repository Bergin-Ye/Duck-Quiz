<template>
	<view class="container">
		<view class="header">
			<view class="back-btn" @tap="goBack">
				<dp-icon type="arrow_back" size="48" color="#1c1b1b"></dp-icon>
			</view>
			<text class="header-title">备份</text>
			<view style="width:80rpx;"></view>
		</view>

		<view class="main-content">
			<view class="card" @tap="exportData">
				<dp-icon type="upload" size="48" color="#1c1b1b"></dp-icon>
				<view class="card-text">
					<text class="card-title">导出数据</text>
					<text class="card-desc">将学习记录导出为 JSON 文件</text>
				</view>
				<dp-icon type="chevron_right" size="48" color="#847560"></dp-icon>
			</view>

			<view class="card" @tap="importData">
				<dp-icon type="download" size="48" color="#1c1b1b"></dp-icon>
				<view class="card-text">
					<text class="card-title">导入数据</text>
					<text class="card-desc">从 JSON 文件恢复学习记录</text>
				</view>
				<dp-icon type="chevron_right" size="48" color="#847560"></dp-icon>
			</view>

			<view class="card" @tap="clearData">
				<dp-icon type="delete" size="48" color="#ba1a1a"></dp-icon>
				<view class="card-text">
					<text class="card-title danger">清除所有数据</text>
					<text class="card-desc">删除所有本地学习记录</text>
				</view>
				<dp-icon type="chevron_right" size="48" color="#847560"></dp-icon>
			</view>

			<view class="info-box">
				<text class="info-text">数据存储在本地设备上，卸载应用会丢失数据。建议定期备份。</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goBack() { uni.navigateBack() },
			exportData() {
				const data = {}
				const keys = ['dp_corn_balance','dp_streak_days','dp_total_answered','dp_total_correct','dp_node_progress','dp_mistakes','dp_weekly_activity','dp_user_profile']
				keys.forEach(k => { data[k] = uni.getStorageSync(k) })
				uni.setClipboardData({
					data: JSON.stringify(data, null, 2),
					success() { uni.showToast({ title: '数据已复制到剪贴板', icon: 'none' }) }
				})
			},
			importData() {
				uni.showToast({ title: '请粘贴 JSON 数据', icon: 'none' })
			},
			clearData() {
				uni.showModal({
					title: '确认清除',
					content: '此操作不可恢复，确定要清除所有数据吗？',
					success: (res) => {
						if (res.confirm) {
							const keys = ['dp_corn_balance','dp_streak_days','dp_last_login','dp_total_answered','dp_total_correct','dp_node_progress','dp_mistakes','dp_weekly_activity','dp_user_profile']
							keys.forEach(k => uni.removeStorageSync(k))
							uni.showToast({ title: '数据已清除', icon: 'none' })
						}
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
	.card { background-color:$surface-container-lowest; border:3rpx solid $on-surface; border-radius:24rpx; padding:32rpx; margin-bottom:24rpx; display:flex; flex-direction:row; align-items:center; box-sizing:border-box; width:100%; &:active { background-color:$surface-container; } }
	.card-text { flex:1; margin-left:24rpx; margin-right:16rpx; }
	.card-title { font-size:32rpx; font-weight:700; color:$on-surface; margin-bottom:4rpx; }
	.danger { color:$error; }
	.card-desc { font-size:24rpx; color:$on-surface-variant; }
	.info-box { background-color:$surface-container; border-radius:16rpx; padding:24rpx; margin-top:24rpx; }
	.info-text { font-size:24rpx; color:$on-surface-variant; line-height:1.5; }
</style>
