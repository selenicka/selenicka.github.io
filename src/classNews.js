class Article {
    constructor(element) {
        let {title, description, author, url, publishedAt, urlToImage} = element;

        this.title = title;
        this.description = description;
        this.author = author;
        this.publishedAt = publishedAt;
        this.url = url;
        this.urlToImage = urlToImage;
    }

    getContent() {
        return `
            <div class="article-content">
                <h2>
                    <a href="${ this.url }">${ this.title }</a>
                </h2>
                <p>${ this.description }</p>
            </div>
        `;
    }

    getImage() {
        return this.urlToImage ? `
            <figure class="article-image">
                <img src="${ this.urlToImage }"/>
            </figure>
        ` : '';
    }

    getAuthor() {
        return this.author ? `
            <div class="article-author">${ this.author }</div>
        ` : '';
    }

    getFooter() {
        return `
            <div class="article-footer">
                ${ this.getAuthor() }
                ${ this.getPublishDate() }
            </div>
        `;
    }

    getPublishDate() {
        return this.publishedAt ? `
            <div class="article-published">
                <time datetime="${ this.publishedAt }">${ this.formatDate() }</time>
            </div>
        ` : '';
    }

    formatDate() {
        let MM = {1:"January", 2:"February", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"},
            d = new Date(this.publishedAt);

        return `${ d.getDate() } ${ MM[d.getMonth()] } ${ d.getFullYear() }`;
    }
}

class ArticleBuilder {
    constructor(element) {
        this.article = new Article(element);
        this.articleHtml = '';
    }

    buildFigure(){
        this.articleHtml += this.article.getImage();
    }

    buildContent(){
        this.articleHtml += this.article.getContent();
    }

    buildFooter(){
        this.articleHtml += this.article.getFooter();
    }

    getTemplate() {
        return `
            <div class="article">
                <div class="article-wrapper">
                    ${ this.articleHtml }
                </div>
            </div>
        `;
    }

    publish(){
        let wrapper = document.createElement('div');

        wrapper.className = "js-item";
        wrapper.innerHTML = this.getTemplate();

        return wrapper;
    }
}

export default class News {
    constructor(newsSource, apiKey, newsView) {
        let urlAPI = 'https://newsapi.org/v1/articles?source=' + newsSource + '&apiKey=' + apiKey,
            request = new Request(urlAPI);

        let requestInit = {
            method: 'GET',
            mode: 'cors'
        };

        this.newsView = newsView;

        this.requestNews(request, requestInit);
    }

    requestNews(request, init) {
        fetch(request, init)
            .then(r => r.json())
            .then((response) => {
                if (response.status === 'ok'){
                    this.proceedResponce(response.articles);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    proceedResponce(newsList) {
        let publishedList = document.createElement('div');
        publishedList.className = "newsList";

        newsList.forEach(element => {
            element = new Proxy(element, {
                get(target, prop) {
                    if (prop in target) {
                        return target[prop];
                    } else {
                        console.log(`Property ${prop} is undefined`);
                        return false;
                    }
                }
            });

            if (this.newsView === 'full') {
                var fullArticleBuilder = new ArticleBuilder(element);

                fullArticleBuilder.buildFigure();
                fullArticleBuilder.buildContent();
                fullArticleBuilder.buildFooter();

                publishedList.appendChild(fullArticleBuilder.publish());
            } else {
                var shortArticleBuilder = new ArticleBuilder(element);

                shortArticleBuilder.buildContent();

                publishedList.appendChild(shortArticleBuilder.publish());
            }
        });

        document.querySelector('.news-wrapper').appendChild(publishedList);
    }
}

