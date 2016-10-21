package selenium.tests;

import  static org.junit.Assert.*;

import com.saucelabs.common.Utils;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;


import java.net.URL;
import io.github.bonigarcia.wdm.ChromeDriverManager;

public class WebTest
{
	private  static WebDriver driver;
	private  static WebDriverWait wait;
	
	@BeforeClass
	public  static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		//ChromeDriverManager.getInstance().setup();
		//driver = new ChromeDriver();
		
		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
        capabilities.setCapability("version", Utils.readPropertyOrEnv("SELENIUM_VERSION", "4"));
        capabilities.setCapability("platform", Utils.readPropertyOrEnv("SELENIUM_PLATFORM", "Windows 7"));
        capabilities.setCapability("version","52.0");
        //capabilities.setCapability("browserName", Utils.readPropertyOrEnv("SELENIUM_BROWSER", "firefox"));
        String username = Utils.readPropertyOrEnv("SAUCE_USER_NAME", "jsharda");
        String accessKey = Utils.readPropertyOrEnv("SAUCE_API_KEY", "32edb0ab-b3ec-4866-8677-1bdbc0d89f41");
        driver = new RemoteWebDriver(new URL("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub"),
                capabilities);

		driver.get("https://dockrrockr.slack.com/");
		
		// Wait until page loads and we can see a sign in button.
        wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Type in our test user login info.
		email.sendKeys("ssharm17@ncsu.edu");
		pw.sendKeys("Karuna215");

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

		driver.get("https://dockrrockr.slack.com/messages/tests");
		wait.until(ExpectedConditions.titleContains("tests"));
	}
	
	@AfterClass
	public  static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}
	
	
	//Tests for Use Case 1:
	@Test
	public void checkHelloConversationHappyPath()
	{
		
		//Happy Path for Use Case 1:
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("hello");
		messageBot.sendKeys(Keys.RETURN);
		
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		ArrayList<WebElement> getIDHello = (ArrayList<WebElement>) driver.findElements(
				By.xpath("//span[@class='message_body' and text() = 'hello']/../.."));

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		String idHello = getIDHello.get(getIDHello.size()-1).getAttribute("id").split("_")[2];	
		System.out.println(idHello);
	    int index = Integer.valueOf(idHello);
	    System.out.println(index);
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		WebElement getIDHelloResponseContent = driver.findElement(
				By.xpath("//ts-message[contains(@id,'"+(index+1)+"')]/div/span[@class='message_body']"));
	    
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		WebElement getIDHelloResponseContentName = driver.findElement(
				By.xpath("//ts-message[contains(@id,'"+(index+1)+"')]/div/span[@class='message_body']/span[@class='mention']"));
		
		
		assertEquals(getIDHelloResponseContent.getText(), "Hi, ssharm17! What can I do for you today?");
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		//Fail Path for Use Case 1:
		assertNotEquals(getIDHelloResponseContent.getText(), "Hi! What can I do for you today?");
	}
	
	@Test
	public void checkHelloConversationSadPath()
	{
		
		//Happy Path for Use Case 1:
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("hello");
		messageBot.sendKeys(Keys.RETURN);
		
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		ArrayList<WebElement> getIDHello = (ArrayList<WebElement>) driver.findElements(
				By.xpath("//span[@class='message_body' and text() = 'hello']/../.."));

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		String idHello = getIDHello.get(getIDHello.size()-1).getAttribute("id").split("_")[2];	
		System.out.println(idHello);
	    int index = Integer.valueOf(idHello);
	    System.out.println(index);
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		WebElement getIDHelloResponseContent = driver.findElement(
				By.xpath("//ts-message[contains(@id,'"+(index+1)+"')]/div/span[@class='message_body']"));
	    
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		WebElement getIDHelloResponseContentName = driver.findElement(
				By.xpath("//ts-message[contains(@id,'"+(index+1)+"')]/div/span[@class='message_body']/span[@class='mention']"));
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		//Fail Path for Use Case 1:
		assertNotEquals(getIDHelloResponseContent.getText(), "Hi! What can I do for you today?");
	}
	
	
	
	@Test
	public void checkCreateDockerConversationHappyPath()
	{
		
		//Happy Path for Use Case 1:
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("Create a Docker file");
		messageBot.sendKeys(Keys.RETURN);
		
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		ArrayList<WebElement> getIDHello = (ArrayList<WebElement>) driver.findElements(
				By.xpath("//span[@class='message_body' and text() = 'Create a Docker file']/../.."));

		wait.withTimeout(30, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		String idHello = getIDHello.get(getIDHello.size()-1).getAttribute("id").split("_")[2];	
		int index = Integer.valueOf(idHello);
	        
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		WebElement getIDHelloResponseContent = driver.findElement(
				By.xpath("//ts-message[contains(@id,'"+(index+1)+"')]/div/span[@class='message_body']"));
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		//System.out.println(getIDHelloResponseContent.getText().split("\\r?\\n")[1].split("#")[0]);
		assertEquals(getIDHelloResponseContent.getText().split("\\r?\\n")[0], ("Please fill this form to create a dockerfile"));
		
		assertEquals(getIDHelloResponseContent.getText().split("\\r?\\n")[1].split("#")[0],("http://localhost:8081"));
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		//Fail Path for Use Case 1:
		assertNotEquals(getIDHelloResponseContent.getText().split("\\r?\\n")[1].split("#")[0],("http://localhost:8080"));
		
	}
	
	@Test
	public void checkCreateDockerConversationSadPath()
	{
		
		//Happy Path for Use Case 1:
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("Create a Docker file");
		messageBot.sendKeys(Keys.RETURN);
		
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		ArrayList<WebElement> getIDHello = (ArrayList<WebElement>) driver.findElements(
				By.xpath("//span[@class='message_body' and text() = 'Create a Docker file']/../.."));

		wait.withTimeout(30, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		String idHello = getIDHello.get(getIDHello.size()-1).getAttribute("id").split("_")[2];	
		int index = Integer.valueOf(idHello);
	        
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		WebElement getIDHelloResponseContent = driver.findElement(
				By.xpath("//ts-message[contains(@id,'"+(index+1)+"')]/div/span[@class='message_body']"));
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);	
		
		//Fail Path for Use Case 1:
		assertNotEquals(getIDHelloResponseContent.getText().split("\\r?\\n")[1].split("#")[0],("http://localhost:8080"));
		
	}

	
	//Test for Use Case 3:
	@Test
	public void checkCreateDeployConversationHappyPath()
	{
		
		//Happy Path for Use Case 3:
		//Testing for request response below:
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("deploy");
		messageBot.sendKeys(Keys.RETURN);
		
		wait.withTimeout(30, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		ArrayList<WebElement> getIDHello = (ArrayList<WebElement>) driver.findElements(
				By.xpath("//span[@class='message_body' and text() = 'deploy']/../.."));
		
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.MINUTES);
		
		String idHello = getIDHello.get(getIDHello.size()-1).getAttribute("id").split("_")[2];	
		int index = Integer.valueOf(idHello);
	    
		WebElement getIDHelloResponseContent = driver.findElement(
				By.xpath("//ts-message[contains(@id,'"+(index+1)+"')]/div/span[@class='message_body']"));
		
		
		//System.out.println(getIDHelloResponseContent.getText());
		assertEquals(getIDHelloResponseContent.getText().split("\\r?\\n")[0], "Your app has been deployed at http://amazonaws.com/mock-url");
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		//Fail Path for Use Case 3:
		assertNotEquals(getIDHelloResponseContent.getText().split("\\r?\\n")[0], "Your app has been deployed at http://dockerhub.com/mock-url");
		
	}
	
	@Test
	public void checkCreateDeployConversationSadPath()
	{
		
		//Happy Path for Use Case 3:
		//Testing for request response below:
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("deploy");
		messageBot.sendKeys(Keys.RETURN);
		
		wait.withTimeout(30, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		ArrayList<WebElement> getIDHello = (ArrayList<WebElement>) driver.findElements(
				By.xpath("//span[@class='message_body' and text() = 'deploy']/../.."));
		
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.MINUTES);
		
		String idHello = getIDHello.get(getIDHello.size()-1).getAttribute("id").split("_")[2];	
		int index = Integer.valueOf(idHello);
	    
		WebElement getIDHelloResponseContent = driver.findElement(
				By.xpath("//ts-message[contains(@id,'"+(index+1)+"')]/div/span[@class='message_body']"));
		
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		//Fail Path for Use Case 3:
		assertNotEquals(getIDHelloResponseContent.getText().split("\\r?\\n")[0], "Your app has been deployed at http://dockerhub.com/mock-url");
		
	}
	

}
