package selenium.tests;

import static org.junit.Assert.*;

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

import io.github.bonigarcia.wdm.ChromeDriverManager;

public class WebTest
{
	private static WebDriver driver;
	private static WebDriverWait wait;
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
		
		driver.get("https://dockrrockr.slack.com/");
		
		// Wait until page loads and we can see a sign in button.
        wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Type in our test user login info.
		email.sendKeys("test@ncsu.edu");
		pw.sendKeys("test");

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

		driver.get("https://dockrrockr.slack.com/messages/tests");
		wait.until(ExpectedConditions.titleContains("tests"));
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}
	
	
	//Tests for Use Case 1:
	@Test
	public void checkHelloConversation()
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
		
		
		assertEquals(getIDHelloResponseContent.getText(), "Hi, "+getIDHelloResponseContentName.getText()+"! What can I do for you today?");
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		//Fail Path for Use Case 1:
		assertNotEquals(getIDHelloResponseContent.getText(), "Hi! What can I do for you today?");
	}
	
	
	@Test
	public void checkCreateDockerConversation()
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
	
	//TODO
	//Test For Use Case 2: 
	@Test
	public void checkNotifyConversation() {
		assertTrue(true);		
	}
	
	
	//Test for Use Case 3:
	@Test
	public void checkCreateDeployConversation()
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


}
