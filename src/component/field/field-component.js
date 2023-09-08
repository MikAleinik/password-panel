import './style.css';
import iconShowElement from '../../assets/show.svg';
import iconHideElement from '../../assets/hide.svg';
import { createElement } from '../../util/create-element.js';

const style = {
    CONTAINER: 'field',
    NUMBER: 'field__number',
    FIELD: 'field__input',
    ICON: 'field__icon',
}

/**
 * @param {number} numberItem
 * @param {array} fields
 */
export default function createFieldComponent(numberItem, fields) {
    const component = {
        main: createElement({
            tagName: 'article',
            className: style.CONTAINER
        }),
        input: null,
        icon: null,
    }

    const textElement = createElement({
        tagName: 'label',
        className: style.NUMBER,
        textContent: numberItem
    });
    component.input = createElement({
        tagName: 'input',
        className: style.FIELD
    });
    component.input.setAttribute('type', 'password');
    component.icon = iconHideElement.cloneNode(true);
    component.icon.classList.add(style.ICON);

    component.main.append(textElement, component.input, component.icon);

    component.icon.addEventListener('click', () => iconClickHandler(component, fields));

    return {
        getHtml: () => component.main,
        getValue: () => component.input.value,
        setHidden: () => setHidden(component),
    };
}
/**
 * @param {array} fields 
 */
function iconClickHandler(component, fields) {
    fields.forEach((field) => {
        if (field.getHtml() !== component.main) {
            field.setHidden();
        }
    });
    component.icon = iconShowElement.cloneNode(true);
    component.icon.classList.add(style.ICON);
    component.input.setAttribute('type', 'text');
}
function setHidden(component) {
    component.icon = iconHideElement.cloneNode(true);
    component.icon.classList.add(style.ICON);
    component.input.setAttribute('type', 'password');
}
