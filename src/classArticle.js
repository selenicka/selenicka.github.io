export default class Article {
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