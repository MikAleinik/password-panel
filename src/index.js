import './color.css';
import createComponent from './component/password-component.js';

const passwordComponent = createComponent();
document.body.append(passwordComponent.getHtml());