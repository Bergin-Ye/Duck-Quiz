<template>
	<text
		class="dp-icon material-symbols-outlined"
		:style="{
			fontSize: size + 'rpx',
			color: color,
			'font-variation-settings': filled ? `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24` : `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`
		}"
	>{{ resolvedName }}</text>
</template>

<script>
	// 别名 → Material Symbols 真实名称
	const ALIASES = {
		'arrow-right': 'arrow_forward',
		'arrow-left': 'arrow_back',
		'checkmark': 'check',
		'checkmark-filled': 'check',
		'locked': 'lock',
		'success': 'check_circle',
		'clock': 'schedule',
		'loop': 'sync',
		'notification': 'notifications',
		'fact-check': 'fact_check',
		'bar-chart': 'bar_chart',
		'heart-filled': 'favorite',
		'heart': 'favorite_border',
		'star-filled': 'star',
		'home-filled': 'home',
		'globe': 'public',
		'database': 'storage',
		'cpu': 'memory',
		'graph': 'insights',
		'devices': 'computer',
		'memory': 'developer_board',
		'mobile': 'smartphone',
		'cloud': 'cloud',
		'security': 'security',
		'game': 'sports_esports',
		'delete': 'delete',
		'edit': 'edit',
		'share': 'share',
		'bookmark': 'bookmark',
		'calendar': 'calendar_today',
		'refresh': 'refresh',
		'search': 'search',
		'settings': 'settings',
		'close': 'close',
		'plus': 'add',
		'minus': 'remove',
		'info': 'info',
		'warning': 'warning',
		'error': 'error',
		'person': 'person',
		'star': 'star',
		'home': 'home',
		'check': 'check',
		'lock': 'lock'
	}

	export default {
		name: 'dp-icon',
		props: {
			type: {
				type: String,
				required: true
			},
			size: {
				type: [Number, String],
				default: 32
			},
			color: {
				type: String,
				default: '#1c1b1b'
			},
			filled: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			resolvedName() {
				return ALIASES[this.type] || this.type
			}
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: 'Material Symbols Outlined';
		src: url('/static/fonts/MaterialSymbolsOutlined.ttf') format('truetype');
		font-weight: 100 700;
		font-style: normal;
	}

	.material-symbols-outlined {
		font-family: 'Material Symbols Outlined';
		font-weight: normal;
		font-style: normal;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-smoothing: antialiased;
	}
</style>
