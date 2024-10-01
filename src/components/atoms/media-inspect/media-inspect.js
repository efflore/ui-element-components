import { UIElement, setText } from '@efflore/ui-element'

class MediaInspect extends UIElement {
	static consumedContexts = ['media-motion', 'media-theme', 'media-viewport', 'media-orientation']

	connectedCallback() {
		super.connectedCallback()

		MediaInspect.consumedContexts.forEach(context => {
			this.first(`.${context}`).map(setText(context))
		})
	}
}
MediaInspect.define('media-inspect')