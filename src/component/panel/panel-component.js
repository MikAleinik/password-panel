import './style.css';
import { createElement } from '../../util/create-element.js';
import createFieldComponent from '../field/field-component.js';

const style = {
    CONTAINER: 'fields-container',
};
/**
 * @typedef {{main: HTMLElement, fields: import('../field/field-component').FiedlComponent[]}} PanelComponent
 * @type {PanelComponent}
 */
const component = {
    main: createElement({
        tagName: 'section',
        className: style.CONTAINER,
    }),
    fields: [],
};
let templatePassword = '';
/**
 * @param {number} countPasswordItems
 */
export default function createPanelComponent(countPasswordItems) {
    if(component.fields.length === 0) {
        component.main.innerHTML = '';
        addNewFields(countPasswordItems);
    
        component.main.addEventListener('input', textPasteHandler);
    } else {
        updateCountFields(countPasswordItems);
    }

    return {
        getHtml: () => component.main,
        isValidPassword: () => hasCheckValidPassword(),
        isEmptyPassword: () => hasCheckEmptyPassword(),
        isPartialEmptyPassword: () => hasCheckPartialEmptyPassword(),
    };
}
/**
 * @returns {boolean}
 */
function hasCheckValidPassword() {
    let password = '';
    component.fields.forEach((field) => (password += `${field.getValue()} `));
    if (password.trim() === templatePassword) {
        return true;
    }
    return false;
}
/**
 * @returns {boolean}
 */
function hasCheckEmptyPassword() {
    let password = '';
    component.fields.forEach((field) => (password += `${field.getValue()} `));
    if (password.trim() === '') {
        return true;
    }
    return false;
}
/**
 * @returns {boolean}
 */
function hasCheckPartialEmptyPassword() {
    let isPartial = false;
    component.fields.forEach((field) => (field.getValue() === '' ? (isPartial = true) : ''));
    return isPartial;
}
/**
 * @param {KeyboardEvent | ClipboardEvent} event
 */
function textPasteHandler(event) {
    const words = event.target.value.trim().split(' ');
    if (words.length > 1) {
        words.forEach((word, index) => {
            component.fields[index].setValue(word);
        });
    }
}
/**
 * @param {number} countPasswordItems 
 */
function updateCountFields(countPasswordItems) {
    if(component.fields.length < countPasswordItems) {
        addNewFields(countPasswordItems);
    } else {
        removeLastFields(countPasswordItems);
    }
}
/**
 * @param {number} countPasswordItems 
 */
function addNewFields(countPasswordItems) {
    for (let i = component.fields.length; i < countPasswordItems; i += 1) {
        const fieldElement = createFieldComponent(i + 1, component.fields);
        component.main.append(fieldElement.getHtml());
        component.fields.push(fieldElement);
    }

    showCurrentPassword();
}
/**
 * @param {number} countPasswordItems 
 */
function removeLastFields(countPasswordItems) {
    for (let i = component.fields.length; i > countPasswordItems; i -= 1) {
        component.fields.splice(component.fields.length - 1, 1);
        component.main.lastElementChild.remove();
    }
    console.log(component.fields);
    showCurrentPassword();
}
/**
 * TODO для тестов проверяющим
 */
function showCurrentPassword() {
    templatePassword = '';
    component.fields.forEach((field, index) => (templatePassword += `${index}${index} `));
    templatePassword = templatePassword.trim();
    console.log(templatePassword);
}