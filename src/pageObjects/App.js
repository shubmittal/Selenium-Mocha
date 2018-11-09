import LoginPage from './LoginPage'

export default class App{

    constructor(driver)
    {
        this.driver = driver;
        this.baseURL = process.env.BASE_URL || "https://hgnapplication_react_dev.surge.sh";
    }

 async navigateToApp()
    {
        await this.driver.navigate().to(this.baseURL);
        return;
    }

     getLoginPage()
    {
        return new LoginPage(this.driver);
    }

}