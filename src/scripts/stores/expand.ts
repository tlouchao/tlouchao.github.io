import { map } from 'nanostores'

interface ExpandInterface {
    [key: string]: boolean,
}

export const $expand = map<ExpandInterface>(
    { 
        navbar: false,
        gallery: true,
    }
)

enum ExpandEvent {
    ENABLE = "enableautoexpand", // TODO: remove enum?
    DISABLE = "disableautoexpand",
  }

// ----------------------------- Media Query ------------------------------- //

var mql : MediaQueryList = window.matchMedia("(max-width: 768px)");

// monitor the viewport size
// dispatch custom event on reaching media query breakpoint
const handleMqlChange = (evtTarget : HTMLElement) => {
    return function handleMqlChangeInner(evt : MediaQueryListEvent) {
        let newEvt : Event = (mql.matches) ? new Event(ExpandEvent.ENABLE) : new Event(ExpandEvent.DISABLE);
        evtTarget.dispatchEvent(newEvt);
    }
}

export default { ExpandEvent, mql, handleMqlChange };