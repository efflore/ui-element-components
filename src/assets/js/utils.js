/**
 * Format a number with a given number of maximum fraction digits
 * 
 * @param {number} number input number
 * @param {number} digits maximum number of fraction digits; defaults to 2
 * @returns {string} formatted number
 */
export const formatNumber = (number, digits = 2) => new Intl.NumberFormat('en-US', {
	style: 'decimal',
	minimumFractionDigits: 0,
	maximumFractionDigits: digits,
	useGrouping: false,
}).format(number)

/**
 * Calculate a step color from a base color
 * 
 * @param {import('culori').Color} base Culori base color
 * @param {number} step from 0 to 1; 0.5 is the base color, 0 is black, 1 is white
 * @returns {import('culori').Color} Culori step color
 */
export const getStepColor = (base, step) => {
	const calcLightness = () => {
		const l = base.l
		const exp = 2 * Math.log((1 - l) / l)
		return (Math.exp(exp * step) - 1) / (Math.exp(exp) - 1)
	}
	const calcSinChroma = () => {
		return base.c * (8 * (Math.sin(Math.PI * (4 * step + 1) / 6) ** 3) - 1) / 7
	}
	const stepL = base.l !== 0.5 ? calcLightness() : step
	const stepC = base.c > 0 ? calcSinChroma() : 0
	return { mode: 'oklch', l: stepL, c: stepC, h: base.h }
}