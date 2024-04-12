const { Builder, By, until } = require('selenium-webdriver');

async function extendPresenceTime() {
    let startTime = Date.now();
    let presenceTime = 0;

    //sets up the Selenium
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        //opens & navigates to the specified page
        await driver.get('https://en.wikipedia.org/wiki/Lion');

        //checks for "student" on the page using findElement & starts the count with 0
        let bodyText = await driver.findElement(By.tagName('body')).getText();
        let studentCount = (bodyText.match(/student/gi) || []).length;
        let processedCount = 0;






        while (processedCount < studentCount) {
            if (bodyText.includes('student')) {
                //extends presence by 10sec if found
                presenceTime += 10000;
                console.log('Presence time extended by 10 seconds.');

                //waits the extended 10sec
                await driver.sleep(10000);

                //updates the count of "student"s
                processedCount++;

                
                bodyText = await driver.findElement(By.tagName('body')).getText();
            } else {
                // If the word "student" is not found, break the loop
                break;
            }
        }







        //calculcates the time we spent on the page
        let endTime = Date.now();
        presenceTime += endTime - startTime;

        //displays time
        console.log(`Total presence time: ${presenceTime / 1000} seconds`);
    } finally {





        //closes
        await driver.quit();
    }
}

extendPresenceTime().catch(console.error);