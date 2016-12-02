//import BorderDecorator from './classDecorator';
import { Decorator, BorderDecorator, BackgroundDecorator } from './classDecorator';
import ArticleBuilder from './classArticleBuilder';

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

                const articleWithBorder = new BorderDecorator(fullArticleBuilder);

                let tpl = articleWithBorder.getTemplate();

                publishedList.appendChild(ArticleBuilder.publish(tpl));

            } else {

                var shortArticleBuilder = new ArticleBuilder(element);

                shortArticleBuilder.buildContent();

                const articleWithBg = new BackgroundDecorator(shortArticleBuilder);

                let tpl = articleWithBg.getTemplate();

                publishedList.appendChild(ArticleBuilder.publish(tpl));
            }
        });

        document.querySelector('.news-wrapper').appendChild(publishedList);
    }
}