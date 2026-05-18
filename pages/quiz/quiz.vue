<template>
	<view class="container">
		<view class="header">
			<view class="close-btn" @tap="closeQuiz">
				<dp-icon type="close" size="48" color="#1c1b1b"></dp-icon>
			</view>
			<view class="question-counter">
				<text class="counter-text">{{ currentQuestion + 1 }}</text>
			</view>
		</view>

		<view class="progress-section">
			<view class="progress-info">
				<text class="progress-label">问题 {{ currentQuestion + 1 }}/{{ questions.length }}</text>
			</view>
			<view class="progress-bar">
				<view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
			</view>
		</view>

		<view class="main-content">
			<view class="question-card" :key="'q-' + currentQuestion">
				<text class="question-text">{{ currentQuestionData.question }}</text>
			</view>

			<view class="options-list" :key="'opts-' + currentQuestion">
				<view
					v-for="(option, index) in currentQuestionData.options"
					:key="index"
					class="option-btn"
					:class="{
						'selected': selectedOption === index,
						'correct': showFeedback && index === currentQuestionData.correct,
						'wrong': showFeedback && selectedOption === index && index !== currentQuestionData.correct
					}"
					@tap="selectOption(index)"
				>
					<view class="option-letter">
						<text class="letter-text">{{ ['A', 'B', 'C', 'D'][index] }}</text>
					</view>
					<text class="option-text">{{ option }}</text>
					<view v-if="showFeedback && index === currentQuestionData.correct" class="feedback-icon">
						<dp-icon type="check" size="48" color="#006e1c"></dp-icon>
					</view>
					<view v-if="showFeedback && selectedOption === index && index !== currentQuestionData.correct" class="feedback-icon">
						<dp-icon type="error" size="48" color="#ba1a1a"></dp-icon>
					</view>
				</view>
			</view>

			<view v-if="showFeedback" class="feedback-section">
				<view v-if="isCorrect" class="feedback-area">
					<view class="feedback-avatar">
						<image class="duck-feedback" src="/static/duck.png" mode="aspectFit"></image>
					</view>
					<view class="feedback-content">
						<text class="feedback-title correct-text">正确！</text>
					</view>
					<view v-if="showCornAnim" class="corn-anim">
						<text class="corn-anim-text">+{{ cornEarned }} 🌽</text>
					</view>
				</view>

				<view v-else class="feedback-area">
					<view class="feedback-avatar">
						<image class="duck-feedback" src="/static/duck.png" mode="aspectFit"></image>
					</view>
					<view class="feedback-content">
						<text class="feedback-title wrong-text">错误！</text>
						<text class="feedback-desc">正确答案是：{{ currentQuestionData.options[currentQuestionData.correct] }}</text>
						<view v-if="currentQuestionData.explanation" class="explanation-box">
							<text class="explanation-text">{{ currentQuestionData.explanation }}</text>
						</view>
					</view>
				</view>

				<view class="next-btn" @tap="nextQuestion">
					<text class="next-text">{{ currentQuestion < questions.length - 1 ? '下一题' : '查看结果' }}</text>
				</view>
			</view>
		</view>

		<view v-if="showExitModal" class="exit-mask" @tap="cancelExit">
			<view class="exit-modal">
				<view class="exit-duck-header">
					<image class="exit-duck-img" src="/static/duck.png" mode="aspectFit"></image>
					<text class="exit-duck-title">要走了吗？</text>
				</view>
				<view class="exit-body">
					<text class="exit-desc">小鸭子还在等你答完呢！当前进度将不会保存。</text>
					<view class="exit-actions">
						<view class="exit-cancel" @tap="cancelExit">
							<text class="exit-cancel-text">继续答题</text>
						</view>
						<view class="exit-confirm" @tap="confirmExit">
							<text class="exit-confirm-text">退出</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getQuestions } from '../../utils/question-bank.js'
	import { addMistake, addCorn, recordQuizResult, completeNode, getNodeProgress } from '../../utils/storage.js'

	export default {
		data() {
			return {
				discipline: '', nodeId: '', pathId: '', currentQuestion: 0, selectedOption: -1,
				showFeedback: false, isCorrect: false, showCornAnim: false, showExitModal: false,
				cornEarned: 0, correctCount: 0, streak: 0,
				questions: []
			}
		},
		computed: {
			currentQuestionData() { return this.questions[this.currentQuestion] || { question: '', options: [], correct: 0 } },
			progressPercent() { return this.questions.length > 0 ? ((this.currentQuestion + 1) / this.questions.length) * 100 : 0 }
		},
		onLoad(options) {
			if (options.discipline) this.discipline = options.discipline
			if (options.nodeId) this.nodeId = options.nodeId
			if (options.pathId) this.pathId = options.pathId
			this.loadQuestions()
		},
		methods: {
			loadQuestions() {
				if (this.pathId && this.nodeId) {
					this.questions = getQuestions(this.pathId, this.nodeId, 5)
				}
				if (!this.questions || this.questions.length === 0) {
					this.questions = getQuestions('frontend', 'css', 5)
				}
			},
			selectOption(index) {
				if (this.showFeedback) return
				this.selectedOption = index
				this.showFeedback = true
				this.isCorrect = index === this.currentQuestionData.correct
				if (this.isCorrect) {
					this.correctCount++
					this.streak++
					this.cornEarned = Math.floor(Math.random() * 6) + 10
					addCorn(this.cornEarned)
					this.showCornAnim = true
					setTimeout(() => { this.showCornAnim = false }, 800)
				} else {
					this.streak = 0
					addMistake(this.currentQuestionData, this.pathId, this.nodeId)
				}
			},
			nextQuestion() {
				if (this.currentQuestion < this.questions.length - 1) {
					this.currentQuestion++
					this.selectedOption = -1
					this.showFeedback = false
					this.isCorrect = false
				} else {
					recordQuizResult(this.correctCount, this.questions.length)
					if (this.pathId && this.nodeId) {
						const nodes = getNodeProgress(this.pathId)
						if (nodes) completeNode(this.pathId, this.nodeId, null)
					}
					uni.redirectTo({ url: `/pages/quiz-result/quiz-result?correct=${this.correctCount}&total=${this.questions.length}&discipline=${this.discipline}&pathId=${this.pathId}&nodeId=${this.nodeId}` })
				}
			},
			closeQuiz() { this.showExitModal = true },
			cancelExit() { this.showExitModal = false },
			confirmExit() { this.showExitModal = false; uni.navigateBack() }
		}
	}
</script>

<style lang="scss">
	.container { min-height: 100vh; width: 100%; background-color: $background; box-sizing: border-box; display: flex; flex-direction: column; }

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 40rpx;
		padding-top: env(safe-area-inset-top);
		height: calc(96rpx + env(safe-area-inset-top));
		box-sizing: border-box;
		width: 100%;
	}

	.close-btn {
		width: 72rpx; height: 72rpx; border-radius: 50%;
		border: 3rpx solid $outline-variant;
		display: flex; align-items: center; justify-content: center;
		background-color: $surface; flex-shrink: 0;
	}

	.question-counter {
		width: 72rpx; height: 72rpx; border-radius: 50%;
		border: 3rpx solid $on-surface;
		display: flex; align-items: center; justify-content: center; flex-shrink: 0;
	}

	.counter-text { font-size: 28rpx; font-weight: 700; color: $on-surface; }

	.progress-section { padding: 0 40rpx; margin-bottom: 48rpx; width: 100%; box-sizing: border-box; }
	.progress-info { margin-bottom: 16rpx; }
	.progress-label { font-size: 24rpx; color: $outline; }

	.progress-bar {
		width: 100%; height: 24rpx;
		background-color: $surface-container;
		border-radius: 12rpx; border: 3rpx solid $outline-variant; overflow: hidden;
	}

	.progress-fill { height: 100%; background-color: $primary-container; border-right: 3rpx solid $on-surface; border-radius: 12rpx; }

	.main-content { padding: 0 40rpx 40rpx; width: 100%; box-sizing: border-box; flex: 1; }

	.question-card {
		background-color: $surface-container-lowest;
		border-radius: 24rpx; border: 3rpx solid $outline;
		padding: 48rpx; margin-bottom: 48rpx;
		box-sizing: border-box; width: 100%;
		flex-shrink: 0;
	}

	.question-text { font-size: 36rpx; font-weight: 700; color: $on-surface; line-height: 1.4; }

	.options-list { width: 100%; }

	.option-btn {
		background-color: $surface-container-lowest;
		border-radius: 24rpx; border: 3rpx solid $outline-variant;
		padding: 32rpx; box-sizing: border-box; width: 100%;
		margin-bottom: 24rpx;
		display: flex; flex-direction: row; align-items: center;
		flex-shrink: 0;
		&:last-child { margin-bottom: 0; }
		&.selected { background-color: $secondary-container; border-color: $secondary; }
		&.correct { background-color: $secondary-container; border-color: $secondary; border-width: 4rpx; }
		&.wrong { background-color: $error-container; border-color: $error; border-width: 4rpx; }
		&:active { opacity: 0.8; }
	}

	.option-letter {
		width: 64rpx; height: 64rpx; border-radius: 50%;
		border: 3rpx solid $on-surface; background-color: $surface;
		display: flex; align-items: center; justify-content: center;
		flex-shrink: 0; margin-right: 24rpx;
	}

	.letter-text { font-size: 24rpx; font-weight: 700; color: $on-surface; }
	.option-text { flex: 1; font-size: 28rpx; color: $on-surface; overflow: hidden; text-overflow: ellipsis; }
	.feedback-icon { flex-shrink: 0; margin-left: 16rpx; }

	.feedback-section { margin-top: 48rpx; width: 100%; }

	.feedback-area {
		background-color: $surface-container;
		border-radius: 24rpx; border: 3rpx solid $outline;
		padding: 32rpx; display: flex; flex-direction: row;
		position: relative; margin-bottom: 32rpx;
	}

	.feedback-avatar {
		width: 96rpx; height: 96rpx; border-radius: 50%;
		border: 3rpx solid $on-surface; background-color: $surface-bright;
		overflow: hidden; flex-shrink: 0; margin-right: 24rpx;
	}

	.duck-feedback { width: 100%; height: 100%; }
	.feedback-content { flex: 1; }
	.feedback-title { font-size: 28rpx; font-weight: 700; margin-bottom: 8rpx; }
	.correct-text { color: $secondary; }
	.wrong-text { color: $error; }
	.feedback-desc { font-size: 28rpx; color: $on-surface-variant; margin-bottom: 16rpx; }

	.explanation-box {
		background-color: rgba($primary-container, 0.15);
		border: 2rpx solid $primary-container;
		border-radius: 16rpx; padding: 24rpx; margin-top: 8rpx;
	}

	.explanation-text { font-size: 26rpx; color: $on-surface; line-height: 1.5; }

	.corn-anim {
		position: absolute; top: -16rpx; right: 32rpx;
		animation: corn-bounce 0.8s ease forwards; pointer-events: none;
	}

	.corn-anim-text { font-size: 36rpx; font-weight: 700; color: $primary-container; }

	@keyframes corn-bounce {
		0% { opacity: 1; transform: translateY(0) scale(1); }
		30% { transform: translateY(-40rpx) scale(1.3); }
		60% { transform: translateY(-80rpx) scale(1.1); }
		100% { opacity: 0; transform: translateY(-120rpx) scale(0.8); }
	}

	.next-btn {
		background-color: $primary-container;
		border-radius: 48rpx; border: 4rpx solid $on-surface;
		padding: 32rpx; display: flex; align-items: center; justify-content: center;
		box-shadow: 0 8rpx 0 $on-surface; width: 100%; box-sizing: border-box;
		flex-shrink: 0;
		&:active { transform: translateY(4rpx); box-shadow: none; }
	}

	.next-text { font-size: 24rpx; font-weight: 700; color: $on-primary-container; }

	.exit-mask {
		position: fixed; top: 0; left: 0; width: 100%; height: 100%;
		background-color: rgba(0, 0, 0, 0.45); z-index: 300;
		display: flex; align-items: center; justify-content: center;
	}

	.exit-modal {
		width: 580rpx;
		background-color: $surface;
		border: 3rpx solid $on-surface;
		border-radius: 32rpx;
		overflow: hidden;
	}

	.exit-duck-header {
		background-color: $primary-container;
		padding: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-bottom: 3rpx solid $on-surface;
	}

	.exit-duck-img {
		width: 128rpx;
		height: 128rpx;
		margin-bottom: 16rpx;
	}

	.exit-duck-title {
		font-size: 40rpx;
		font-weight: 700;
		color: $on-primary-container;
	}

	.exit-body {
		padding: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.exit-desc {
		font-size: 28rpx;
		color: $on-surface-variant;
		text-align: center;
		margin-bottom: 32rpx;
		line-height: 1.5;
	}

	.exit-actions {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.exit-cancel {
		flex: 1; padding: 24rpx;
		border: 3rpx solid $on-surface; border-radius: 999rpx;
		display: flex; align-items: center; justify-content: center;
		background-color: $surface; margin-right: 20rpx;
		&:active { background-color: $surface-container; }
	}

	.exit-cancel-text { font-size: 26rpx; font-weight: 700; color: $on-surface; }

	.exit-confirm {
		flex: 1; padding: 24rpx;
		border: 3rpx solid $on-surface; border-radius: 999rpx;
		display: flex; align-items: center; justify-content: center;
		background-color: $on-surface;
		&:active { opacity: 0.8; }
	}

	.exit-confirm-text { font-size: 26rpx; font-weight: 700; color: $surface; }
</style>
