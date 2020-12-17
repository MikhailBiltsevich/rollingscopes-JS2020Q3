import ViewCreator from './viewCreator';
import schoolLogoLink from '../assets/img/rs_school_js.svg';

export default class FooterView {
  constructor() {
    this.element = ViewCreator.createElement('footer', 'footer');

    const courseLink = ViewCreator.createElement('a', 'course-link');
    const schoolLogo = ViewCreator.createElement('img');
    schoolLogo.src = schoolLogoLink;
    courseLink.href = 'https://rs.school/js/';
    courseLink.append(schoolLogo);
    courseLink.target = '_blank';

    const gitHubLink = ViewCreator.createElement('a');
    gitHubLink.textContent = 'Mikhail Biltsevich';
    gitHubLink.href = 'https://github.com/MikhailBiltsevich';
    gitHubLink.target = '_blank';

    const productionYear = ViewCreator.createElement('div');
    productionYear.textContent = '2020';

    this.element.append(gitHubLink, productionYear, courseLink);
  }

  get() {
    return this.element;
  }
}
