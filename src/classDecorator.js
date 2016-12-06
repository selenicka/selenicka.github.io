import ArticleBuilder from './classArticleBuilder';

export class Decorator extends ArticleBuilder {
    constructor(template) {
        super();
        this.template = template;
    }

    getTemplate() {
        return this.template.getTemplate();
    }
}

export class BorderDecorator extends Decorator {
    getTemplate() {
        return `
            <div class="article-frame">
                ${super.getTemplate()}
            </div>
        `;
    }
}

export class BackgroundDecorator extends Decorator {
    getTemplate() {
        return `
            <div class="article-bg">
                ${super.getTemplate()}
            </div>
        `;
    }
}