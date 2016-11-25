'use strict';

import 'whatwg-fetch';
//import styles from './css/styles.css'
import styles from './sass/styles.scss'

document.getElementById('loadBtn').onclick = function ( ) {
    require.ensure([], function (require) {
        const apiKey = '11230ec2000f450c914808f5b6f035f6';
        var newsSource = 'bbc-sport';

        let News = require("./src/classNews.js").default;

        new News(newsSource, apiKey);
    });
}