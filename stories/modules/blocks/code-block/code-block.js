import UIElement from '@efflore/ui-element';
import Prism from 'prismjs';

define('code-block', class extends UIElement {
  static observedAttributes = ['collapsed'];

  attributeMapping = { collapsed: 'boolean' };

  connectedCallback() {
    const language = this.getAttribute('language') || 'html';
    const content = this.querySelector('code');
    const copyButton = this.querySelector('.copy');
    const overlay = this.querySelector('.overlay');
    !this.has('collapsed') && this.set('collapsed', false);

    // apply syntax highlighting while preserving Lit's marker nodes in Storybook
    const code = document.createElement('code');
    code.innerHTML = Prism.highlight(content.textContent.trim(), Prism.languages[language], language);
    Array.from(content.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
    Array.from(code.childNodes).forEach(node => content.appendChild(node));

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
    overlay.onclick = () => {
      this.set('collapsed', false);
    };

    // update collapsed attribute
    this.effect(() => {
      const collapsed = this.get('collapsed');
      collapsed ? this.setAttribute('collapsed', '') : this.removeAttribute('collapsed');
    });
    
  }

});