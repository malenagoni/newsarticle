import axios from 'axios'
import { Dispatch } from 'react'

export const SAVE_ACTICLES = 'SAVE_ACTICLES'
export const SEARCH_ARTICLES = 'SEARCH_ARTICLES'

const {REACT_APP_API_KEY} = process.env


// export function getArticles () {
//     return (dispatch: Dispatch<any>) => {
//         const data = axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=d${REACT_APP_API_KEY}`)
//     }
// }

// export interface RowsInterface{
    
// }
export function getArticles (e: string | null, all: boolean):any {
    if(e) {
        if(e === '') {
            return getArticles(null, true)
        } else {
            e = e.split(' ').join('%20').toLowerCase()
            return async (dispatch:Dispatch<any>) => {
                console.log(e)
                try {
                    const data = await axios.get(`https://newsapi.org/v2/everything?q=${e}&domains=wsj.com&apiKey=${REACT_APP_API_KEY}`)
                    if(data?.data?.articles?.length > 0) {
                        dispatch(searchArticles(data.data.articles))
                    } else {
                        dispatch(getArticles(null, true))
                    }
                } catch(e) {
                    dispatch(getArticles(null, true))
                    console.log(e)
                }
            }
        }
    } else {

    
    return async (dispatch: Dispatch<any>) => {
        //agregar await
        
        const data = await axios.get(`https://newsapi.org/v2/everything?pageSize=100&domains=wsj.com&apiKey=${REACT_APP_API_KEY}`)
        dispatch(saveArticles(data.data.articles))
    }
    }
}

export function saveArticles (payload:any) {
    return {
        type: SAVE_ACTICLES,
        payload
    }
}

// export function searchInput (e:string) {
//     if(e === '') {
//         return getArticles()
//     } else {
//         e = e.split(' ').join('%20')
//         return async (dispatch:Dispatch<any>) => {
//             try {
//                 const data = await axios.get(`https://newsapi.org/v2/everything?q=${e}&domains=wsj.com&apiKey=${REACT_APP_API_KEY}`)
//                 if(data?.data?.articles?.length > 0) {
//                     dispatch(searchArticles(data.data.articles))
//                 } else {
//                     dispatch(getArticles())
//                 }
//             } catch(e) {
//                 dispatch(getArticles())
//                 console.log(e)
//             }
//         }
//     }
// }

export function searchArticles(payload:any) {
    return {
        type: SEARCH_ARTICLES,
        payload
    }
}