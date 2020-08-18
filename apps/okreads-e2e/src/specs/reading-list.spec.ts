import { $, $$, browser, ExpectedConditions, element, by } from 'protractor';
import { expect } from 'chai';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to mark a book as finished', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );


    browser.wait(
      ExpectedConditions.visibilityOf(
        $('.mat-checkbox.mat-accent.mat-checkbox-label-before')
      )
    ).then(async() => {
      const checkbox = await $('.mat-checkbox.mat-accent.mat-checkbox-label-before');
      const txt = await checkbox.getText();
      expect(txt).to.include('Completed');
      
      await checkbox.click();
      
      const txtAfter = await checkbox.getText();
      expect(txtAfter).to.include('2020');
    
    })

  });

  it('Then: I should be able to see "Finished" on button text', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    
     browser.wait(
      ExpectedConditions.visibilityOf(
        $('[ng-reflect-disabled="false"]')
      )
    ).then(async() => {

    const bookContwantToRead = await $('button[ng-reflect-disabled="false"]');
    // tslint:disable-next-line: prefer-const
    let content = await bookContwantToRead.$('span.mat-button-wrapper');
    const contentText = await content.getText();
    expect(contentText).to.include('Want to Read', 'The text should read "want to read"');
    await bookContwantToRead.click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
     browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    browser.wait(
      ExpectedConditions.visibilityOf(
        $('.mat-checkbox.mat-accent.mat-checkbox-label-before')
      )
    ).then(async() => {


      // get unchecked checkbox
      const recentlyAdded = await $('.reading-list-item.ng-star-inserted');
      await recentlyAdded.$$('.mat-checkbox.mat-accent.mat-checkbox-label-before').last();
      await recentlyAdded.click()

      const bookContFinished = await $$('button[ng-reflect-disabled="true"] .mat-button-wrapper').last();
      // tslint:disable-next-line: prefer-const
      let contentLater = await bookContFinished.getText();
      expect(contentLater).to.include('Finished', 'The text should read "Finished"');

    })

    })

  });
});
