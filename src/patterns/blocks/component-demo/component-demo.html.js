import { html } from 'lit'

import AccordionPanel from '../accordion-panel/accordion-panel.html'
import TabList from '../tab-list/tab-list.html'
import CodeBlock from '../code-block/code-block.html'

import './component-demo.css'

export default ({
	name,
	content,
	htmlSource,
	cssSource,
	jsSource,
	codeLabel,
	htmlLabel,
	cssLabel,
	jsLabel
}) => html`
<component-demo>
    <div class="preview">
		${content}
	</div>
	${AccordionPanel({
		open: false,
		collapsible: true,
        title: codeLabel,
        content: TabList({
			accordion: false,
            tabs: [
                {
					title: htmlLabel,
					titleHidden: true,
					open: true,
					collapsible: false,
					content: CodeBlock({ code: htmlSource, language: 'html', file: `${name}.html` })
				},
                {
					title: cssLabel,
					titleHidden: true,
					open: false,
					collapsible: false,
					content: CodeBlock({ code: cssSource, language: 'css', file: `${name}.css` })
				},
                {
					title: jsLabel,
					titleHidden: true,
					open: false,
					collapsible: false,
					content: CodeBlock({ code: jsSource, language: 'javascript', file: `${name}.js` })
				},
			],
		}),
	})}
</component-demo>`