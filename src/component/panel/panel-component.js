import './style.css';
import { createElement } from '../../util/create-element.js';
import createFieldComponent from '../field/field-component.js';

const style = {
    CONTAINER: 'fields-container'
}

const component = {
    main: createElement({
        tagName: 'section',
        className: style.CONTAINER
    }),
    fields: [],
}
let templatePassword = '';
/**
 * @param {number} countPasswordItems
 */
export default function createPanelComponent(countPasswordItems) {
    component.main.innerHTML = '';
    templatePassword = '';
    for (let i = 1; i <= countPasswordItems; i += 1) {
        const fieldElement = createFieldComponent(i, component.fields);
        component.main.append(fieldElement.getHtml());
        component.fields.push(fieldElement);
        templatePassword += `${i}${i} `;
    }

    templatePassword = templatePassword.trim();
    showCurrentPassword();

    return {
        getHtml: () => component.main,
        isValidPassword: () => hasCheckValidPassword(),
        isEmptyPassword: () => hasCheckEmptyPassword(),
        isPartialEmptyPassword: () => hasCheckPartialEmptyPassword(),
    };
}

function hasCheckValidPassword() {
    let password = '';
    component.fields.forEach((field) => password += `${field.getValue()} `);
    if (password.trim() === templatePassword) {
        return true;
    }
    return false;
}
function hasCheckEmptyPassword() {
    let password = '';
    component.fields.forEach((field) => password += `${field.getValue()} `);
    if (password.trim() === '') {
        return true;
    }
    return false;
}
function hasCheckPartialEmptyPassword() {
    let isPartial = false;
    component.fields.forEach((field) => field.getValue() === '' ? isPartial = true : '');
    return isPartial;
}
function showCurrentPassword() {
    console.log(templatePassword);
}
