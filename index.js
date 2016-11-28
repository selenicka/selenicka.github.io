'use strict';

import 'whatwg-fetch';
import styles from './sass/styles.scss'

if (NODE_ENV === 'production') {
    console.log('Production mode');
} else {
    console.log('Development mode');
}

document.getElementById('loadBtn').onclick = function ( ) {
    var self = this;

    require.ensure([], function (require) {
        const apiKey = '11230ec2000f450c914808f5b6f035f6';
        var newsSource = 'bbc-sport';

        let News = require("./src/classNews.js").default;

        new News(newsSource, apiKey);

        setTimeout(function () {
            self.style.display = 'none';
        }, 1000);
    });
}