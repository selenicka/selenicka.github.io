'use strict';

function _CLASSCALLCHECK(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = '11230ec2000f450c914808f5b6f035f6';

var newsSource = 'bbc-sport';

var News = function () {
    function NEWS(newsSource, apiKey) {
        _CLASSCALLCHECK(this, NEWS);

        var urlAPI = 'https://newsapi.org/v1/articles?source=' + newsSource + '&apiKey=' + apiKey,
            request = new Request(urlAPI);

        var requestInit = {
            method: 'GET',
            mode: 'cors'
        };

        this.REQUESTNEWS(request, requestInit);
    }

    NEWS.prototype.REQUESTNEWS = function REQUESTNEWS(request, init) {
        var _this = this;

        fetch(request, init).then(function (r) {
            return r.json();
        }).then(function (response) {
            if (response.status === 'ok') {
                _this.PROCEEDRESPONCE(response.articles);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };

    NEWS.prototype.PROCEEDRESPONCE = function PROCEEDRESPONCE(newsList) {
        var _this2 = this;

        var publishedList = document.createElement('div');
        publishedList.className = "newsList";

        newsList.forEach(function (element) {
            element = new Proxy(element, {
                get: function GET(target, prop) {
                    if (prop in target) {
                        return target[prop];
                    } else {
                        console.log('Property ' + prop + ' is undefined');
                        return false;
                    }
                }
            });

            _this2.CREATEARTICLE(element);
            publishedList.appendChild(_this2.PUBLISHARTICLE());
        });

        document.querySelector('.news-wrapper').appendChild(publishedList);
    };

    NEWS.prototype.CREATEARTICLE = function CREATEARTICLE(element) {
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
    };

    NEWS.prototype.PUBLISHARTICLE = function PUBLISHARTICLE() {
        var wrapper = document.createElement('div');

        wrapper.className = "js-item";
        wrapper.innerHTML = this.GETTEMPLATE();

        return wrapper;
    };

    NEWS.prototype.GETTEMPLATE = function GETTEMPLATE() {
        return '\n            <div class="article">\n                <div class="article-wrapper">\n                    ' + this.GETIMAGE() + '\n                    <div class="article-content">\n                        <h2>\n                            <a href="' + this.url + '">' + this.title + '</a>\n                        </h2>\n                        <p>' + this.description + '</p>\n                    </div>\n                    <div class="article-footer">\n                        ' + this.GETAUTHOR() + '\n                        ' + this.GETPUBLISHDATE() + '\n                    </div>\n                </div>\n            </div>\n        ';
    };

    NEWS.prototype.GETIMAGE = function GETIMAGE() {
        return this.urlToImage ? '\n            <figure class="article-image">\n                <img src="' + this.urlToImage + '"/>\n            </figure>\n        ' : '';
    };

    NEWS.prototype.GETAUTHOR = function GETAUTHOR() {
        return this.author ? '\n            <div class="article-author">' + this.author + '</div>\n        ' : '';
    };

    NEWS.prototype.GETPUBLISHDATE = function GETPUBLISHDATE() {
        return this.publishedAt ? '\n            <div class="article-published">\n                <time datetime="' + this.publishedAt + '">' + this.FORMATDATE() + '</time>\n            </div>\n        ' : '';
    };

    NEWS.prototype.FORMATDATE = function FORMATDATE() {
        var MM = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" },
            d = new Date(this.publishedAt);

        return d.getDate() + ' ' + MM[d.getMonth()] + ' ' + d.getFullYear();
    };

    return NEWS;
}();

new News(newsSource, apiKey);