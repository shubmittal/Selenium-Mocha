import {By, until} from 'selenium-webdriver'

export default class Dashboard
{
    static loc_dashboard = By.className("dashboard");
    constructor (driver)
    {
        this.driver = driver;        
    }

    static getDefaultLocator()
    {
        return this.loc_dashboard;
    }

    async isDashboardPage()
    {
        let leaderboard = await this.driver.wait(until.elementLocated(this.loc_dashboard))
        return !!leaderboard;
    }

    

}