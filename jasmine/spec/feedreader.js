/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
         it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0); // expect(feed.url).toBeTruthy();
           });
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0); // or expect(feed.name).toBeTruthy();
           });
         });
    });


    describe('The menu', function() {
        let body = document.body;
        let menuIcon = document.querySelector('.menu-icon-link');
         // Test that ensures the menu element is hidden by default
         it('is hidden', function() {
           expect(body.classList).toContain('menu-hidden')
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('visibility is changed when icon is clicked', function() {
            menuIcon.click();
            expect(body.className).not.toContain('menu-hidden');
            menuIcon.click();
            expect(body.className).toContain('menu-hidden')
          });
        });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
          loadFeed(0 , function () {
            done();
          });
        });
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('has at least a single .entry element within the .feed container', (function(done) {
           let entriesNumber = document.querySelector('.feed').getElementsByClassName('entry').length;
           expect(entriesNumber).toBeGreaterThan(0);
           done();
         }));
       });

    describe('New Feed Selection', function() {
         let initFeedSelection;
         beforeEach(function(done) {
           loadFeed(0, function() {
             initFeedSelection = document.querySelector('.feed').innerHTML;
             loadFeed(1, function() {
               done();
             });
           });
         });

         /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         it('content is changed by loadFeed()', (function(done) {
           let newFeedSelection = document.querySelector('.feed').innetHTML;
           expect(initFeedSelection).not.toBe(newFeedSelection);
           done();
         }));
    });
}());
