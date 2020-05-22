export interface IArticle {
    _id: string,
    title: string,
    desc: string,
    poster: string,
    tag: string,
    content: string
}

export interface IArticleDTO {
    title: string,
    desc: string,
    poster: string,
    tag: string,
    content: string
}
