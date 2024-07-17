let t;const e=t=>"function"==typeof t,s=t=>e(t)&&e(t.set),o=o=>{const n=()=>(t&&n.effects.add(t),o);return n.effects=new Set,n.set=t=>{const c=o;o=e(t)&&!s(t)?t(c):t,!Object.is(o,c)&&(t=>{for(const e of t)e.run()})(n.effects)},n},n=s=>{const o=new Map,n=()=>{const c=t;t=n;const a=s(((t,e)=>{!o.has(t)&&o.set(t,new Set),o.get(t).add(e)}));for(const t of o.values())for(const e of t)e();t=c,e(a)&&queueMicrotask(a)};n.run=()=>n(),n.targets=o,n()},c="context-request";class a extends Event{context;callback;subscribe;constructor(t,e,s=!1){super(c,{bubbles:!0,composed:!0}),this.context=t,this.callback=e,this.subscribe=s}}const r=(t,s)=>Array.isArray(t)?t:[s,e(t)?t:t=>t];class i extends HTMLElement{static define(t,e=customElements){try{e.get(t)||e.define(t,this)}catch(t){console.error(t)}}attributeMap={};contextMap={};#t=new Map;attributeChangedCallback(t,s,o){if(o!==s){const n=this.attributeMap[t],[c,a]=r(n,t);this.set(c,e(a)?a(o,this,s):o)}}connectedCallback(){const t=Object.getPrototypeOf(this),s=t.providedContexts||[];s.length&&this.addEventListener(c,(t=>{const{context:o,callback:n}=t;s.includes(o)&&e(n)&&(t.stopPropagation(),n(this.#t.get(o)))})),setTimeout((()=>{t.consumedContexts?.forEach((t=>{const s=new a(t,(s=>{const o=this.contextMap[t],[n,c]=r(o,t);this.#t.set(n||t,e(c)?c(s,this):s)}));this.dispatchEvent(s)}))}))}has(t){return this.#t.has(t)}get(t){const s=t=>e(t)?s(t()):t;return s(this.#t.get(t))}set(t,e,n=!0){if(this.#t.has(t)){const o=this.#t.get(t);n&&s(o)&&o.set(e)}else{const n=s(e)?e:o(e);this.#t.set(t,n)}}delete(t){return this.#t.delete(t)}async pass(t,s,n=customElements){await n.whenDefined(t.localName);for(const[n,c]of Object.entries(s))t.set(n,o(e(c)?c:this.#t.get(c)))}targets(t){const e=new Set;for(const s of this.#t.get(t).effects)for(const t of s.targets.keys())e.add(t);return e}}const l=t=>"string"==typeof t,f=t=>parseInt(t,10),u=t=>parseFloat(t),h=t=>t,d="text",g="prop",b="attr",p="class",m="style",y=t=>void 0!==t,E=t=>{const e=t.shadowRoot||t,s=()=>t;var o;return s.first=t=>{const s=e.querySelector(t);return s&&E(s)},s.all=t=>Array.from(e.querySelectorAll(t)).map((t=>E(t))),s[d]={get:()=>t.textContent?.trim()||"",set:e=>{Array.from(t.childNodes).filter((t=>t.nodeType!==Node.COMMENT_NODE)).forEach((t=>t.remove())),t.append(document.createTextNode(e))}},s[g]={get:e=>t[e],set:(e,s)=>t[e]=s},s[b]={get:e=>t.getAttribute(e),set:(e,s)=>"boolean"==typeof s?t.toggleAttribute(e,s):y(s)?t.setAttribute(e,s):t.removeAttribute(e)},s[p]={get:e=>t.classList.contains(e),set:(e,s)=>t.classList.toggle(e,s)},((o=t)instanceof HTMLElement||o instanceof SVGElement||o instanceof MathMLElement)&&(s[m]={get:e=>t.style.getPropertyValue(e),set:(e,s)=>y(s)?t.style.setProperty(e,s):t.style.removeProperty(e)}),s},v=(t,e,s)=>{const o=`data-${t.localName}-${e}`,n=t=>{s(t,t.getAttribute(o)),t.removeAttribute(o)};t.hasAttribute(o)&&n(t);for(const e of t.querySelectorAll(`[${o}]`))n(e)},x="hover",A="focus",M=(t,e={},s,o)=>{const c=class extends i{static observedAttributes=Object.keys(e);attributeMap=e;connectedCallback(){var t;super.connectedCallback(),s&&s(this),t=this,[d,g,b,p,m].forEach((e=>{v(t,e,e===d?(s,o)=>{const c=o.trim(),a=E(s)[e],r=a.get();t.set(c,r,!1),n((e=>{if(t.has(c)){const o=t.get(c);e(s,(()=>a.set(y(o)?o:r)))}}))}:(s,o)=>{const c=(t,e)=>t.split(e).map((t=>t.trim()));c(o,";").forEach((o=>{const[a,r=a]=c(o,":"),i=E(s)[e];t.set(r,i.get(),!1),n((e=>t.has(r)&&e(s,(()=>i.set(a,t.get(r))))))}))})})),((t,e="ui-effect")=>{[x,A].forEach((s=>{const[o,n]=s===x?["mouseenter","mouseleave"]:["focus","blur"];v(t,s,((s,c)=>{const a=c.trim(),r=(o,n)=>s.addEventListener(o,(()=>{for(const s of t.targets(a))s.classList.toggle(e,n)}));r(o,!0),r(n,!1)}))}))})(this)}disconnectedCallback(){o&&o(this)}};return c.define(t),c};export{i as UIElement,l as asBoolean,f as asInteger,u as asNumber,h as asString,M as default,n as effect,E as uiRef};