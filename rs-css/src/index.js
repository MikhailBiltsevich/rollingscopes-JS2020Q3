import './style.scss';
import View from './view';
import Model from './model';
import Controller from './controller';

// eslint-disable-next-line no-unused-vars
const app = new Controller(new View(), new Model());
