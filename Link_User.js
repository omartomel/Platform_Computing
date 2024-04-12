const { Builder, By, until } = require('selenium-webdriver');

async function extendPresenceTime() {
    let startTime = Date.now();
    let presenceTime = 0;

    //sets up the Selenium
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        //opens & navigates to the specified page
        await driver.get('http://kingdarian.fobby.net/enemies.php?enemy=155');










        
        //checks for links on the page using findElements & starts the count with 0
        let links = await driver.findElements(By.tagName('a'));
        let linkCount = links.length;
        let processedCount = 0;

        while (processedCount < linkCount) {
            //checks if there are still links on the page
            links = await driver.findElements(By.tagName('a'));
            if (links.length > 0) {
                //extends presence by 10sec
                presenceTime += 10000;
                console.log('Presence time extended by 10 seconds.');

                //waits the extended 10sec
                await driver.sleep(10000);

                //updates the count of links
                processedCount++;
            } else {
                //no more links are found, break the loop
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
