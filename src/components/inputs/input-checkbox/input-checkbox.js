import UIElement, { effect } from '@efflore/ui-element';

class InputCheckbox extends UIElement {
  static observedAttributes = ['checked'];
  attributeMap = { checked: 'boolean' };

  connectedCallback() {
    this.set('checked', this.querySelector('input').checked, false);
    
    // event listener for 'change' event on input[type="checkbox"]
    this.onchange = e => this.set('checked', e.target.checked);

    // effect to update the checked attribute on the element
    effect(() => this.get('checked') ? this.setAttribute('checked', '') : this.removeAttribute('checked'));
  }
}

InputCheckbox.define('input-checkbox');
