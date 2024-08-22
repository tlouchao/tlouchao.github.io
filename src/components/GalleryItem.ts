import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ModalEvent, ModalEventType } from '../scripts/events';

@customElement('gallery-item')
export class GalleryItem extends LitElement {

  static styles = css`
    :host {
        position: relative;
        overflow: hidden;
        width: 100%;
        aspect-ratio: 1/1;
        background-color: transparent;
    }
    img {
        width:100%; 
        height:100%;
        object-position: center;
        object-fit: cover;
        opacity: 1;
        color: black;
    }
        img:hover {
        cursor: pointer;
        transition: .25s ease;
        opacity: 0.66;
    }
  `;
    @property()
    src : string | undefined = "";

    @property()
    label : string | undefined = "";

    constructor() {
        super();
      }
    
    // Not using connectedCallback, since shadowRoot may not render
    firstUpdated() {
        let img = this.shadowRoot?.querySelector('img');
        img?.addEventListener('click', this.handleClick);
        img?.addEventListener('error', this.handleError);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        let img = this.shadowRoot?.querySelector('img');
        img?.removeEventListener('click', this.handleClick);
        img?.removeEventListener('error', this.handleError);
    }

    handleClick() {
        let modal = document.querySelector('#gallery-modal');
        let evt = new ModalEvent(ModalEventType.OPEN, this.src);
        modal?.dispatchEvent(evt);
    }

    handleError() {
        let node : Node = this.getRootNode();
        if (node instanceof ShadowRoot) {
            node.host.setAttribute('style', 'display: none;');
        }
    }

    handleLoad() {
        let node : Node = this.getRootNode();
        if (node instanceof ShadowRoot) {
            node.host.setAttribute('style', 'background-color: white;');
        }
    }

    update(changed : any) {
        super.update(changed);
        if (this.src) {
            let img = this.shadowRoot?.querySelector('img');
            if (img) {
                img.onload = this.handleLoad;
                img.onerror = this.handleError;
                img.src = this.src;
            }
        }
    }

    // Render the UI as a function of component state
    render() {
        return html`
            <img src=${this.src} 
                 alt=${this.label} 
                 aria-label=${this.label} />
        `;
    }
}