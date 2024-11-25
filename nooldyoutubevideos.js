// ==UserScript==
// @name        YouTube Days Ago Blocker
// @namespace   https://greasyfork.org/users/91645
// @description Removes any YouTube videos older than 1 day from subscription feed
// @grant       none
// @version     1.0
// @include     https://www.youtube.com/feed/subscriptions
// @require     http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    function hideOldVideos() {
        $("ytd-grid-video-renderer").each(function() {
            const timeText = $(this).find("#metadata-line span:contains('ago')").text().trim();
            
            // Hide if contains 'days', 'weeks', 'months', or 'years'
            if (timeText.includes('days ago') || 
                timeText.includes('weeks ago') || 
                timeText.includes('months ago') || 
                timeText.includes('years ago')) {
                $(this).css({
                    'display': 'none',
                    'visibility': 'hidden'
                });
            }
        });
    }

    // Initial run
    hideOldVideos();

    // Run when scrolling (for dynamically loaded content)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(hideOldVideos, 150);
    });

    // Run periodically to catch any updates
    setInterval(hideOldVideos, 1000);

    // Run when page content changes
    new MutationObserver(hideOldVideos).observe(document.body, {
        childList: true,
        subtree: true
    });
})();
