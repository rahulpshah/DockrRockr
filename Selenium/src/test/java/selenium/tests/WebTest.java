package selenium.tests;

import static org.junit.Assert.*;

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
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}
	
	@Test
	public void postMessage()
	{
		driver.get("https://dockrrockr.slack.com/");

		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Type in our test user login info.
		email.sendKeys("testuser@ncsu.edu");
		pw.sendKeys("****");

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		wait.until(ExpectedConditions.titleContains("general"));

		driver.get("https://dockrrockr.slack.com/messages/testing");
		wait.until(ExpectedConditions.titleContains("testing"));
		
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("hello");
		messageBot.sendKeys(Keys.RETURN);
		
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		
		WebElement getIDHello = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'hello']/../.."));

		
		String idHello = getIDHello.getAttribute("id");		
		char lastIndex = idHello.charAt(idHello.length()-1);
		int nextIndex = Character.getNumericValue(lastIndex) + 1;	
		String idHelloResponse = idHello.substring(0, idHello.length()-1) + nextIndex;
		
		List<WebElement> allIds = driver.findElements(By.xpath("//span[@class='message_body']/../.."));
		
		allIds.stream().forEach(id -> System.out.println(id.getAttribute("id")));
		
		assertTrue(true);
		
	}

}
