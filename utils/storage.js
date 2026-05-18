/**
 * 存储工具 - 管理所有用户数据的持久化
 */

const KEYS = {
	CORN_BALANCE: 'dp_corn_balance',
	STREAK_DAYS: 'dp_streak_days',
	LAST_LOGIN: 'dp_last_login',
	TOTAL_ANSWERED: 'dp_total_answered',
	TOTAL_CORRECT: 'dp_total_correct',
	NODE_PROGRESS: 'dp_node_progress',
	MISTAKES: 'dp_mistakes',
	WEEKLY_ACTIVITY: 'dp_weekly_activity',
	USER_PROFILE: 'dp_user_profile'
}

// ==================== 玉米币 ====================
export function getCornBalance() {
	return uni.getStorageSync(KEYS.CORN_BALANCE) || 0
}

export function addCorn(amount) {
	const current = getCornBalance()
	uni.setStorageSync(KEYS.CORN_BALANCE, current + amount)
	return current + amount
}

// ==================== 连续天数 ====================
export function getStreak() {
	checkDailyLogin()
	return uni.getStorageSync(KEYS.STREAK_DAYS) || 0
}

export function checkDailyLogin() {
	const today = new Date().toDateString()
	const lastLogin = uni.getStorageSync(KEYS.LAST_LOGIN)
	if (lastLogin === today) return

	const yesterday = new Date(Date.now() - 86400000).toDateString()
	const currentStreak = uni.getStorageSync(KEYS.STREAK_DAYS) || 0

	if (lastLogin === yesterday) {
		uni.setStorageSync(KEYS.STREAK_DAYS, currentStreak + 1)
	} else if (lastLogin !== today) {
		uni.setStorageSync(KEYS.STREAK_DAYS, 1)
	}
	uni.setStorageSync(KEYS.LAST_LOGIN, today)
}

// ==================== 答题统计 ====================
export function getStats() {
	return {
		totalAnswered: uni.getStorageSync(KEYS.TOTAL_ANSWERED) || 0,
		totalCorrect: uni.getStorageSync(KEYS.TOTAL_CORRECT) || 0,
		accuracy: (() => {
			const t = uni.getStorageSync(KEYS.TOTAL_ANSWERED) || 0
			const c = uni.getStorageSync(KEYS.TOTAL_CORRECT) || 0
			return t > 0 ? Math.round((c / t) * 100) : 0
		})()
	}
}

export function recordQuizResult(correct, total) {
	const prevAnswered = uni.getStorageSync(KEYS.TOTAL_ANSWERED) || 0
	const prevCorrect = uni.getStorageSync(KEYS.TOTAL_CORRECT) || 0
	uni.setStorageSync(KEYS.TOTAL_ANSWERED, prevAnswered + total)
	uni.setStorageSync(KEYS.TOTAL_CORRECT, prevCorrect + correct)

	// 记录每周活动
	recordDailyActivity(total)
}

// ==================== 每周活动 ====================
export function getWeeklyActivity() {
	const data = uni.getStorageSync(KEYS.WEEKLY_ACTIVITY) || {}
	const today = new Date()
	const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay()
	const result = []

	for (let i = 1; i <= 7; i++) {
		const d = new Date(today)
		d.setDate(today.getDate() - (dayOfWeek - i))
		const key = d.toISOString().slice(0, 10)
		result.push({
			label: ['一', '二', '三', '四', '五', '六', '日'][i - 1],
			minutes: data[key] || 0,
			active: i === dayOfWeek
		})
	}
	return result
}

function recordDailyActivity(questionCount) {
	const data = uni.getStorageSync(KEYS.WEEKLY_ACTIVITY) || {}
	const today = new Date().toISOString().slice(0, 10)
	data[today] = (data[today] || 0) + Math.ceil(questionCount * 1.5)
	uni.setStorageSync(KEYS.WEEKLY_ACTIVITY, data)
}

// ==================== 节点进度 ====================
export function getNodeProgress(pathId) {
	const all = uni.getStorageSync(KEYS.NODE_PROGRESS) || {}
	return all[pathId] || null
}

export function saveNodeProgress(pathId, nodes) {
	const all = uni.getStorageSync(KEYS.NODE_PROGRESS) || {}
	all[pathId] = nodes
	uni.setStorageSync(KEYS.NODE_PROGRESS, all)
}

export function completeNode(pathId, nodeId, nodeConfig) {
	const nodes = getNodeProgress(pathId)
	if (!nodes) return null

	const idx = nodes.findIndex(n => n.id === nodeId)
	if (idx === -1) return nodes

	nodes[idx].status = 'completed'
	if (idx + 1 < nodes.length && nodes[idx + 1].status === 'locked') {
		nodes[idx + 1].status = 'current'
	}
	saveNodeProgress(pathId, nodes)
	return nodes
}

// ==================== 错题本 ====================
export function getMistakes() {
	return uni.getStorageSync(KEYS.MISTAKES) || []
}

export function addMistake(question, pathId, nodeId) {
	const mistakes = getMistakes()
	const existing = mistakes.find(m => m.questionId === question.id)
	if (existing) {
		existing.count++
		existing.lastWrongAt = Date.now()
	} else {
		mistakes.push({
			questionId: question.id,
			title: question.question.slice(0, 20) + (question.question.length > 20 ? '...' : ''),
			description: question.question,
			count: 1,
			pathId,
			nodeId,
			correctAnswer: question.options[question.correct],
			explanation: question.explanation || '',
			lastWrongAt: Date.now()
		})
	}
	uni.setStorageSync(KEYS.MISTAKES, mistakes)
}

export function removeMistake(questionId) {
	const mistakes = getMistakes().filter(m => m.questionId !== questionId)
	uni.setStorageSync(KEYS.MISTAKES, mistakes)
}

export function getMistakesByPath(pathId) {
	return getMistakes().filter(m => m.pathId === pathId)
}

// ==================== 用户资料 ====================
export function getUserProfile() {
	return uni.getStorageSync(KEYS.USER_PROFILE) || {
		nickname: '冒险鸭',
		level: 1,
		joinedAt: new Date().toISOString().slice(0, 7)
	}
}

export function updateUserProfile(updates) {
	const profile = getUserProfile()
	Object.assign(profile, updates)
	uni.setStorageSync(KEYS.USER_PROFILE, profile)
}

export function calculateLevel() {
	const stats = getStats()
	return Math.max(1, Math.floor(stats.totalAnswered / 20) + 1)
}

// ==================== 头像 ====================
export function getAvatar() {
	return uni.getStorageSync('dp_avatar') || '/static/duck.png'
}

export function setAvatar(path) {
	uni.setStorageSync('dp_avatar', path)
}

// ==================== 按节点统计 ====================
export function getMasteryByNode(pathId, nodeConfig) {
	const progress = getNodeProgress(pathId)
	if (!progress || !nodeConfig) return []

	return nodeConfig.map((node, i) => {
		const pNode = progress[i]
		let percent = 0
		if (pNode && pNode.status === 'completed') percent = 100
		else if (pNode && pNode.status === 'current') percent = 50
		return { name: node.name, percent }
	})
}
