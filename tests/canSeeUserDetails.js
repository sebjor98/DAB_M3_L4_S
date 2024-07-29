const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function test() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.name("username")).sendKeys("admin");
  await driver.findElement(By.name("password")).sendKeys("admin");
  await driver.findElement(By.name("submit")).click();

  await driver.get("http://localhost:3000/users/5");
  var name = await driver.findElement(By.name("user")).getText();
  console.log("User name is:", name);

  await driver.quit();
}

test();
