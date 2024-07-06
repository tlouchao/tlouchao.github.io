import { atom } from 'nanostores';

export const themeDark = atom(true);

export const setThemeDark = () => {
    let dark = themeDark.get();
    document.body.classList[dark ? 'add' : 'remove']('theme-dark');
}