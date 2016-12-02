import Article from './classArticle';

export default class ArticleBuilder {
    constructor(element) {
        if(element) {
            this.article = new Article(element);
        }
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

    getTemplate() {
        return `
            <div class="article">
                <div class="article-wrapper">
                    ${ this.articleHtml }
                </div>
            </div>
        `;
    }

    static publish(template){
        let wrapper = document.createElement('div');

        wrapper.className = "js-item";
        wrapper.innerHTML = template;

        return wrapper;
    }
}