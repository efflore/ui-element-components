import UIElement, { effect  } from '@efflore/ui-element';
import Prism from 'prismjs';

class CodeBlock extends UIElement {
  static observedAttributes = ['collapsed'];
  attributeMap = { collapsed: 'boolean' };

  connectedCallback() {
    const language = this.getAttribute('language') || 'html';
    const copyButton = this.querySelector('.copy');
    const overlay = this.querySelector('.overlay');
    const content = this.querySelector('code');
    this.set('code', content.textContent.trim(), false);
    this.set('collapsed', false, false);

    // copy to clipboard
    copyButton.onclick = async () => {
      const label = copyButton.textContent;
      let success = true;
      try {
        await navigator.clipboard.writeText(content.textContent);
      } catch (err) {
        console.error('Error when trying to use navigator.clipboard.writeText()', err);
        success = false;
      }

      if (success) {
        copyButton.set('disabled', true);
        copyButton.set('variant', 'success');
        copyButton.set('label', this.getAttribute('copy-success'));
      } else {
        copyButton.set('disabled', true);
        copyButton.set('variant', 'error');
        copyButton.set('label', this.getAttribute('copy-error'));
      }

      setTimeout(() => {
        copyButton.set('disabled', false);
        copyButton.set('variant', 'secondary');
        copyButton.set('label', label);
      }, success ? 1000 : 3000);
    };

    // expand
    overlay.onclick = () => this.set('collapsed', false);

    // update code
    effect(() => {
      // apply syntax highlighting while preserving Lit's marker nodes in Storybook
      const code = document.createElement('code');
      code.innerHTML = Prism.highlight(this.get('code'), Prism.languages[language], language);
      Array.from(content.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
      Array.from(code.childNodes).forEach(node => content.appendChild(node));
    });

    // update collapsed attribute
    effect(() => {
      this.get('collapsed')? this.setAttribute('collapsed', '') : this.removeAttribute('collapsed');
    });
    
  }

}

CodeBlock.define('code-block');