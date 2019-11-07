import service from './request';

export const getArticles=({offset=0,limited=10 })=>{
    return service.post('/api/v1/articlelist',{
        offset,
        limited
    })
}

export const deleArticle=(id)=>{
    return service.post(`/api/v1/articleDelete/${id}`)
}