import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';
import { atom } from 'nanostores';

export const $themeDark = atom<boolean>(true);

// subscribe to theme change
$themeDark.subscribe((dark : boolean) => {
    document.body.classList[dark ? 'add' : 'remove']('theme-dark');
})

// listener is added once per page reload
document.addEventListener('astro:before-swap', (evt : TransitionBeforeSwapEvent) => {
    let dark = $themeDark.get();
    evt.newDocument.body.classList[dark ? 'add' : 'remove']('theme-dark');
});