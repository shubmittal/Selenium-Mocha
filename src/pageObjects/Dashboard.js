import {By, until} from 'selenium-webdriver'

export default class Dashboard
{
    constructor (driver)
    {
        this.driver = driver;
        this.loc_dashboard = By.className("dashboard");
    }

    async isDashboardPage()
    {
        let leaderboard = await this.driver.wait(until.elementLocated(this.loc_dashboard))
        return !!leaderboard;
    }

    

}