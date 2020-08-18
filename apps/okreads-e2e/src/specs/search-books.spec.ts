import { $, $$, browser, ExpectedConditions, by, element } from 'protractor';
import { expect } from 'chai';
import { async, TestBed, fakeAsync, tick, inject, flushMicrotasks } from "@angular/core/testing";

describe('When: Use the search feature', () => {
  
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');
  });


  it('Then: I should see search results as I am typing', async () => {
    let zero = 0;

    const input = await $('input[type="search"]');
    await input.clear();
    const js = ['j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't'];

    const idTyping = setInterval(async() => { 
      input.sendKeys(js[zero++]);
        if (zero === 5) { // we've typed enough
          clearInterval(idTyping);
          const items = await $$('[data-testing="book-item"]');

          expect(items.length).to.be.greaterThan(1, 'At least one book');
        }
    }, 700);

    
  });


  it('Then: I should see search results change once as I am typing', async () => {
    let zero = 0;

    const input = await $('input[type="search"]');
    await input.clear();
    const python = ['p', 'y', 't', 'h', 'o', 'n'];


  setTimeout(async() => { 
    await input.sendKeys(python[zero++]);
    const firstTitle = await $$('.book--title').first().getText();
      
    const idTypingFast = setInterval(() => {
      input.sendKeys(python[zero++]);
      
      if (zero === 4) { // we've typed enough
        clearInterval(idTypingFast);
        const getTitle = $$('.book--title').first().getText().then((text) => {
          expect(firstTitle).to.equal(text, 'After tying, nothing would have changed!');
        });
        
      }
    
  }, 400);
  }, 25 * 1000);
    
    
  });


  it('Then: I should see search results change continously as I am typing', async () => {
    let zero = 0;

    const input = await $('input[type="search"]');
    await input.clear();
    const ts = ['t', 'y', 'p', 'e', 's', 'c', 'r', 'i', 'p', 't'];

    


  setTimeout(async() => { 
    await input.sendKeys(ts[zero++]);
    const secondTitle = await $$('.book--title').first().getText();
      
    const idTypingOkay = setInterval(() => { 
      input.sendKeys(ts[zero++]);
      if (zero === 5) { // we've typed enough
        clearInterval(idTypingOkay);
        const getTitle = $$('.book--title').first().getText().then((text) => {
          expect(secondTitle).not.to.equal(text, 'After typing, books would have changed!');
        });
        
      }
    
  }, 700);
  }, 30 * 1000);
    
  });

});
