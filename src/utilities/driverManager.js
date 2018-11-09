const {Builder} = require('selenium-webdriver');

export async function getDriver()
{
    let driver = await new Builder().forBrowser('chrome').build();
     return driver;
}

export async function cleanupDriver(driver)
{
    driver.close();

}