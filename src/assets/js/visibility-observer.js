const VISIBILITY_STATE = 'visible'

export default class VisibilityObserver {
	observer = null;

	constructor(element) {
		element.set(VISIBILITY_STATE, false);

		this.observer = new IntersectionObserver(([entry]) => {
			element.set(VISIBILITY_STATE, entry.isIntersecting)
		}).observe(element)
	}

	disconnect() {
		this.observer && this.observer.disconnect()
	}
}