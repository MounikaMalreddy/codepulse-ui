export interface UpdateBlogPostRequest{
    title:string,
    shortDescription:string,
    content:string,
    featuredImageUrl:string,
    urlHandle:string,
    author:string,
    dateCreated:Date,
    isVisible:boolean,
    categories:string[]
}