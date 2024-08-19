import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { ModalEvent } from '../scripts/events';

@customElement('gallery-item')
export class GalleryItem extends LitElement {

  static styles = css`
    :host {
        position: relative;
        overflow: hidden;
        width: 100%;
        aspect-ratio: 1/1;
        background-color: white;
    }
    img {
        width:100%; 
        height:100%;
        object-position: center;
        object-fit: cover;
        opacity: 1;
    }
        img:hover {
        cursor: pointer;
        transition: .25s ease;
        opacity: 0.66;
    }
  `;
    @property()
    src : String | null = "";

    @property()
    label : String | null = "";

    constructor() {
        super();
      }
    
    firstUpdated() {
        let img = this.renderRoot?.querySelector('img');
        img?.addEventListener('click', this.handleClick);
    }

    handleClick() {
        let modal = document.querySelector('#gallery-modal');
        let evt = new Event(ModalEvent.OPEN);
        modal?.dispatchEvent(evt);
    }

    // Render the UI as a function of component state
    render() {
        return html`
            <img src=${this.src} label=${this.label} />
        `;
    }
}