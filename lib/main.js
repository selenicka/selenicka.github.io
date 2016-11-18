'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = '11230ec2000f450c914808f5b6f035f6';

var newsSource = 'bbc-sport';

var News = function () {
    function News(newsSource, apiKey) {
        _classCallCheck(this, News);

        var urlAPI = 'https://newsapi.org/v1/articles?source=' + newsSource + '&apiKey=' + apiKey,
            request = new Request(urlAPI);

        var requestInit = {
            method: 'GET',
            mode: 'cors'
        };

        this.requestNews(request, requestInit);
    }

    _createClass(News, [{
        key: 'requestNews',
        value: function requestNews(request, init) {
            var _this = this;

            fetch(request, init).then(function (r) {
                return r.json();
            }).then(function (response) {
                if (response.status === 'ok') {
                    _this.proceedResponce(response.articles);
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'proceedResponce',
        value: function proceedResponce(newsList) {
            var _this2 = this;

            var publishedList = document.createElement('div');
            publishedList.className = "newsList";

            newsList.forEach(function (element) {
                element = new Proxy(element, {
                    get: function get(target, prop) {
                        if (prop in target) {
                            return target[prop];
                        } else {
                            console.log('Property ' + prop + ' is undefined');
                            return false;
                        }
                    }
                });

                _this2.createArticle(element);
                publishedList.appendChild(_this2.publishArticle());
            });

            document.querySelector('.news-wrapper').appendChild(publishedList);
        }
    }, {
        key: 'createArticle',
        value: function createArticle(element) {
            var title = element.title,
                description = element.description,
                author = element.author,
                url = element.url,
                publishedAt = element.publishedAt,
                urlToImage = element.urlToImage;


            this.title = title;
            this.description = description;
            this.author = author;
            this.publishedAt = publishedAt;
            this.url = url;
            this.urlToImage = urlToImage;
        }
    }, {
        key: 'publishArticle',
        value: function publishArticle() {
            var wrapper = document.createElement('div');

            wrapper.className = "js-item";
            wrapper.innerHTML = this.getTemplate();

            return wrapper;
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            return '\n            <div class="article">\n                <div class="article-wrapper">\n                    ' + this.getImage() + '\n                    <div class="article-content">\n                        <h2>\n                            <a href="' + this.url + '">' + this.title + '</a>\n                        </h2>\n                        <p>' + this.description + '</p>\n                    </div>\n                    <div class="article-footer">\n                        ' + this.getAuthor() + '\n                        ' + this.getPublishDate() + '\n                    </div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'getImage',
        value: function getImage() {
            return this.urlToImage ? '\n            <figure class="article-image">\n                <img src="' + this.urlToImage + '"/>\n            </figure>\n        ' : '';
        }
    }, {
        key: 'getAuthor',
        value: function getAuthor() {
            return this.author ? '\n            <div class="article-author">' + this.author + '</div>\n        ' : '';
        }
    }, {
        key: 'getPublishDate',
        value: function getPublishDate() {
            return this.publishedAt ? '\n            <div class="article-published">\n                <time datetime="' + this.publishedAt + '">' + this.formatDate() + '</time>\n            </div>\n        ' : '';
        }
    }, {
        key: 'formatDate',
        value: function formatDate() {
            var MM = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" },
                d = new Date(this.publishedAt);

            return d.getDate() + ' ' + MM[d.getMonth()] + ' ' + d.getFullYear();
        }
    }]);

    return News;
}();

new News(newsSource, apiKey);