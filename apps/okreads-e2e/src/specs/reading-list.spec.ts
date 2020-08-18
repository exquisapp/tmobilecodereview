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

  it('Then: I should be able to remove from reading list', async (done) => {
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

    const readingListBeforeClick = await $$('[data-testing="remove-container"]');

    const toggle = await $('[id="0a"]');
    await toggle.click();
    const readingListAfterClick = await $$('[data-testing="remove-container"]');
    expect(readingListBeforeClick.length).to.be.greaterThan(readingListAfterClick.length, 'One book was removed from reading list');
    expect(readingListBeforeClick.length - 1).to.be.equal(readingListAfterClick.length, 'One book was removed from reading list');

    done();
  });


  it('Then: I should be able to undo removing from reading list', async (done) => {
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
    const readingListBeforeClick = await $$('[data-testing="remove-container"]');

    const toggle = await $('[id="0a"]');
    await toggle.click();

    browser.wait(
      ExpectedConditions.visibilityOf(
        $('.mat-focus-indicator.mat-button.mat-button-base')
      )
    ).then(async () => {
      const un = await $('.mat-focus-indicator.mat-button.mat-button-base');
      await un.click(); // undo action
      const readingListAfterUndo = await $$('[data-testing="remove-container"]');

      expect(readingListBeforeClick.length).to.be.equal(readingListAfterUndo.length, 'One book was added back to reading list');
    });

    done();
  });

});
