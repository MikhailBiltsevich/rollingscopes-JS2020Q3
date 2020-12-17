import './style.scss';
import View from './views/view';
import Model from './model';
import Controller from './controller';

// eslint-disable-next-line no-new
new Controller(new View(), new Model());
