import {genaricMethods} from '..//helper/genaricMethods';
import { Page, test, expect, Locator} from "@playwright/test";
import AllureReporter, { allure } from "allure-playwright";
const data = require("..//fixtures/test_data.json");
var locators = require("..//fixtures/locators.json");

export class homePage {
    readonly page: Page
    readonly getStartedLink: Locator;
    readonly gettingStartedHeader: Locator;
    readonly pomLink: Locator;
    readonly tocList: Locator;

    constructor(page:Page){
        this.page=page
       
    }
    async goToUrl(url){
      console.log(url);
      await this.page.goto(url);
    }

async navigateToBack(){
    await this.page.goBack();
}
}
export default homePage;