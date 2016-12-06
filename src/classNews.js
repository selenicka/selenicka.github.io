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
                    this.addFilter(response.articles);
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
        document.querySelector('.search-wrap').style.display = 'block';
    }

    addFilter(newsList){
        var self = this;
        var filterInput = document.getElementById('filterField');
        var resetBtn = document.getElementById('resetFilter');
        var removeBtn = document.getElementById('removeFilter');

        self.filterSubject = new FilterSubject();
        var filterObserver = new FilterObserver(1, self.filterSubject);

        self.filterSubject.subscribe('filter', self.onFilter, self);
        self.filterSubject.subscribe('resetFilter', self.onResetFilter, self);

        self.newsList = newsList;

        filterInput.onkeyup = function (e) {
            var value = e.target.value;
            if (value && value.length > 2) {
                self.filterSubject.notifyObserver('filter', value);
            }
        }

        resetBtn.onclick = function (e) {
            if(filterInput.value && filterInput.value.length > 2) {
                self.filterSubject.notifyObserver('resetFilter');
            }
            filterInput.value = '';
        }

        removeBtn.onclick = function (e) {
            var filterHtml = document.querySelector('.search-wrap');
            self.filterSubject.unsubscribe('filter');
            self.filterSubject.unsubscribe('resetFilter');
            filterHtml.parentNode.removeChild(filterHtml);
        }
    }

    onFilter(value) {
        var filteredList = this.newsList.filter(function (obj) {
            return obj.title.toLowerCase().indexOf(value) != -1 ? obj : false;
        });

        if(filteredList.length > 0) {
            this.filterSubject.notifyObserver('changeStatus', 'disable');
            this.render(filteredList);
        }
    }

    onResetFilter(){
        this.filterSubject.notifyObserver('changeStatus', 'enable');
        this.render(this.newsList);
    }

    render(list) {
        document.querySelector('.news-wrapper').innerHTML = "";
        this.proceedResponce(list);
    }
}

//todo: move classes to another file

class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer, fn, context) {
        this.observers.push({
            'name': observer,
            'callback': fn,
            'context': context || this
        });
    }

    unsubscribe(observer) {
        this.observers.forEach(function (item, i, arr) {
            if(item.name === observer) {
                arr.splice(i, 1);
            }
        });
    }

    notifyObserver(observer, data) {
        return this.observers.filter(function (obj) {
            return obj.name === observer ? obj.callback.call(obj.context, data) : false;
        });
    }
}

class FilterSubject extends Subject {
    constructor() {
        super();
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
}

class Observer {
    update() {
        console.log('ConcreteObserver.update() is not implemented');
    }
}

class FilterObserver extends Observer {
    constructor(id, subject) {
        super();
        this.subject = subject;
        this.subject.subscribe("changeStatus", (data) => this.update(data));
    }
    update(status) {
        var removeBtn = document.getElementById('removeFilter');

        if (status === 'disable') {
            removeBtn.setAttribute('disabled', status);
        } else if (removeBtn.hasAttribute("disabled")) {
            removeBtn.removeAttribute("disabled");
        }
    }
}