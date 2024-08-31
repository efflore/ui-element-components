import { html } from 'lit'

import './hello-world.js'

export default ({ greeting = 'Hello', name = 'World' }) => html`
<hello-world>
	<p>${greeting} <span>${name}</span>!</p>
</hello-world>`