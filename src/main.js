'use strict';

import 'whatwg-fetch';
import News from './classNews';

const apiKey = '11230ec2000f450c914808f5b6f035f6';

var newsSource = 'bbc-sport';

new News(newsSource, apiKey);