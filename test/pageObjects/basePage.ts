import { PageLink } from './../enums/page_links.enum';
import { WebDriverWrapper } from '../helpers/webdriverWrapper';
import { NavigationComponent } from './pageComponents/navigationComponent';

export class BasePage {
    protected url: PageLink;
    protected webUI: WebDriverWrapper;
    protected navigation: NavigationComponent;

    constructor(webUI: WebDriverWrapper) {
        this.webUI = webUI;
        this.navigation = new NavigationComponent(webUI);
    }

    public navigateToPage = (): void => {
        this.webUI.navigateTo(this.getPageLink());
    }

    public navigateViaSubNavElement = (mainNavLink: string, subNavLink: string) => {
        this.navigation.hoverNavElement(mainNavLink);
        this.navigation.clickSubNavElement(subNavLink);
    }

    private getPageLink = (): string => this.url;
}
