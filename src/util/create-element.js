/**
 * @param {{tagName: string|Array<string>, className?: string, textContent?: string }} objectParams
 * @returns {HTMLElement}
 */
export function createElement({ tagName, className, textContent }) {
    const element = document.createElement(tagName);

    if (Array.isArray(className)) {
        element.classList.add(...className);
    } else if (typeof className === 'string') {
        className.split(' ').forEach((name) => {
            element.classList.add(name);
        });
    }
    if (textContent) {
        element.textContent = textContent.toString();
    }

    return element;
}