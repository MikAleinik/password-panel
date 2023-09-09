import './style.css';
import { createElement } from '../util/create-element.js';
import createHeaderComponent from './header/header-component.js';
import createInfoComponent from './info/info-component.js';
import createPanelComponent from './panel/panel-component.js';

const style = {
    PANEL: 'panel',
    BUTTON: 'button__primary',
}
const infoText = 'Вы можете вставить всю свою секретную фразу для восстановления в любое поле, проверочная фраза выведена в консоль';
const errorTextEmptyFields = 'Секретные фразы для восстановления содержат 12, 15, 18, 21 или 24 слова';
const errorTextBadPassword = 'Неверная секретная фраза для восстановления';
const buttonText = 'Подтвердите секретную фразу для восстановления';
const defaultCountPasswordItems = 12;

const component = {
    main: createElement({
        tagName: 'form',
        className: style.PANEL
    }),
    panel: null,
    error: null,
    button: null
}

export default function createComponent() {
    const headerElement = createHeaderComponent(defaultCountPasswordItems, (count) => {
        createPanelComponent(count);
        validateHandler();
    });
    const infoElement = createInfoComponent(infoText);
    component.panel = createPanelComponent(defaultCountPasswordItems);
    component.button = createElement({
        tagName: 'button',
        className: style.BUTTON,
        textContent: buttonText
    });
    component.button.setAttribute('type', 'submit');
    component.button.setAttribute('disabled', '');

    component.main.append(headerElement.getHtml(), infoElement.getHtml(), component.panel.getHtml(), component.button);

    component.panel.getHtml().addEventListener('keyup', validateHandler);

    return {
        getHtml: () => component.main
    };
}
function validateHandler() {
    if (component.panel.isEmptyPassword()) {
        if(component.error) {
            removeErrorInfo();
        }
        return;
    }

    if (component.panel.isPartialEmptyPassword()) {
        if (component.error) {
            removeErrorInfo();
        }
        showErrorInfo(errorTextEmptyFields);
        return;
    }

    if (!component.panel.isValidPassword()) {
        if (component.error) {
            removeErrorInfo();
        }
        showErrorInfo(errorTextBadPassword);
        return;
    }

    if(component.error) {
        removeErrorInfo();
    }
    component.button.removeAttribute('disabled');
}
/**
 * @param {string} text 
 */
function showErrorInfo(text) {
    component.error = createInfoComponent(text, true);
    component.panel.getHtml().insertAdjacentElement('afterend', component.error.getHtml());
    component.button.setAttribute('disabled', '');
}
function removeErrorInfo(){
    component.panel.getHtml().nextElementSibling.remove();
    component.error = null;
}