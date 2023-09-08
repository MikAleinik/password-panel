import './style.css';
import { createElement } from '../../util/create-element.js';

const style = {
    HEADER: 'header',
}
const headerText = 'Введите секретную фразу для восстановления';
const countTemplate = '{count}';
const optionsText = `У меня есть фраза из ${countTemplate} слов(-а)`;
const optionsCounter = [12, 15, 18, 21, 24];

const component = createElement({
    tagName: 'section',
    className: style.HEADER
});

/**
 * @param {number} selectedPasswordItems
 * @param {function} countFieldChangeHandler
 * @returns {HTMLElement}
 */
export default function createHeaderComponent(selectedPasswordItems, countFieldChangeHandler) {
    const textElement = createElement({
        tagName: 'h4',
        textContent: headerText
    });
    const selectElement = createElement({
        tagName: 'select'
    });
    optionsCounter.forEach((number) => {
        const text = optionsText.replace(countTemplate, number)
        const optionElement = createElement({
            tagName: 'option',
            textContent: text
        });
        optionElement.setAttribute('value', number);
        if (number === selectedPasswordItems) {
            optionElement.setAttribute('selected', '');
        }
        selectElement.append(optionElement);
    });

    component.append(textElement, selectElement);

    selectElement.addEventListener('change', () => countFieldChangeHandler(selectElement.value));

    return {
        getHtml: () => component
    };
}
