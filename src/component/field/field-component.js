import './style.css';
import iconShowElement from '../../assets/show.svg';
import iconHideElement from '../../assets/hide.svg';
import { createElement } from '../../util/create-element.js';

const style = {
    CONTAINER: 'field',
    NUMBER: 'field__number',
    FIELD: 'field__input',
    ICON: 'field__icon',
};

/**
 * @typedef {{ main: HTMLElement, input: HTMLInputElement, icon: HTMLDivElement, isHidden: boolean }} FiedlComponent
 */
/**
 * @param {number} numberItem
 * @param {array} fields
 */
export default function createFieldComponent(numberItem, fields) {
    /**
     * @type {FiedlComponent}
     */
    const component = {
        main: createElement({
            tagName: 'article',
            className: style.CONTAINER,
        }),
        input: null,
        icon: null,
        isHidden: true,
    };

    const textElement = createElement({
        tagName: 'label',
        className: style.NUMBER,
        textContent: numberItem,
    });
    component.input = createElement({
        tagName: 'input',
        className: style.FIELD,
    });
    component.input.setAttribute('type', 'password');
    component.icon = createElement({
        tagName: 'div',
    });
    component.icon.append(getHideIcon());

    component.main.append(textElement, component.input, component.icon);

    component.icon.addEventListener('click', () => iconClickHandler(component, fields));

    return {
        getHtml: () => component.main,
        getValue: () => component.input.value,
        setValue: (newValue) => (component.input.value = newValue),
        hide: () => setHidden(component),
    };
}
/**
 * @param {FiedlComponent} component
 * @param {array} fields
 */
function iconClickHandler(component, fields) {
    fields.forEach((field) => {
        if (field.getHtml() !== component.main) {
            field.hide();
        }
    });
    toggleVisibility(component);
}
/**
 * @param {FiedlComponent} component
 */
function toggleVisibility(component) {
    if(component.isHidden) {
        setShowed(component);
        component.isHidden = false;
    } else {
        setHidden(component);
        component.isHidden = true;
    }
}
/**
 * @param {FiedlComponent} component
 */
function setHidden(component) {
    component.icon.firstElementChild.remove();
    component.icon.append(getHideIcon());
    component.input.setAttribute('type', 'password');
    component.isHidden = true;
}
/**
 * @param {FiedlComponent} component
 */
function setShowed(component) {
    component.icon.firstElementChild.remove();
    component.icon.append(getShowIcon());
    component.input.setAttribute('type', 'text');
}
function getHideIcon() {
    const icon = iconHideElement.cloneNode(true);
    icon.classList.add(style.ICON);
    return icon;
}
function getShowIcon() {
    const icon = iconShowElement.cloneNode(true);
    icon.classList.add(style.ICON);
    return icon;
}
