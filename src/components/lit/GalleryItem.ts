import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ModalEvent, ModalEventType } from '../../scripts/events';

@customElement('gallery-item')
export class GalleryItem extends LitElement {

  static styles = css`
    :host {
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
        transition: 0.25s ease;
        opacity: 0.66;
    }
  `;
    // reflect property to visible attribute in DOM
    @property({ type: Number, reflect: true })
    index : number = 0;

    @property({ type: String })
    src : string = "";

    @property({ type: String })
    label : string = "";

    @property() 
    tags : string[] = [];

    constructor() {
        super();
    }
    
    // Not using connectedCallback, since shadowRoot may not render
    firstUpdated(changed : any) {
        super.firstUpdated(changed);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.handleClick);
        this.addEventListener('error', this.handleError);
        this.setAttribute('style', 'background-color: white;');
        this.classList.remove("hidden");
        this.classList.add("visible");
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('error', this.handleError);
    }

    handleClick() {
        let modal = document.querySelector('#gallery-modal');
        let evt = new ModalEvent(ModalEventType.OPEN, this.src, this.label, this.index);
        modal?.dispatchEvent(evt); // modal is not a parent, so dispatch event directly
    }

    handleError() {
        let node : Node = this.getRootNode();
        if (node instanceof ShadowRoot) {
            node.host.setAttribute('style', 'display: none;');
        }
    }

    handleLoad() {
        // nothing
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
        let dynamicTags : {[k: string]: string} = {};
        this.tags.map((tag, idx) => dynamicTags[`tag${idx}`]=tag);
        return html `<img src=${this.src} alt=${this.label} data-tags=${JSON.stringify(dynamicTags)} />`
    }
}