import './style.css';
import iconElement from '../../assets/info.svg';
import { createElement } from '../../util/create-element.js';

const style = {
    INFO: 'info',
    TEXT: 'info__text',
    ICON: 'info__icon',
    ERROR: 'error',
}

/**
 * @param {string} text
 * @param {boolean} isError
 * @returns {HTMLElement}
 */
export default function createInfoComponent(text, isError) {
    const component = createElement({
        tagName: 'section',
        className: style.INFO
    });
    const icon = iconElement.cloneNode(true);
    icon.classList.add(style.ICON);
    const textElement = createElement({
        tagName: 'label',
        className: style.TEXT,
        textContent: text
    });

    component.append(icon, textElement);

    if (isError) {
        component.classList.add(style.ERROR);
    }

    return {
        getHtml: () => component
    };
}
