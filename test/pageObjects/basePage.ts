import { promise } from 'selenium-webdriver';
import { PageLink } from '../enums/pageLinks.enum';
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
        this.webUI.navigateTo(this.getDesiredPageUrl());
    }

    public getCurrentPageUrl = (): promise.Promise<string> =>
        this.webUI.getUrl()

    public refreshPage = (): promise.Promise<void> =>
        this.webUI.refreshPage()

    private getDesiredPageUrl = (): string => this.url;
}
