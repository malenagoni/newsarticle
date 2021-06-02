import React from 'react'
import ArticlesList from './ArticlesList/ArticlesList'
import SearchBar from './SearchBar/SearchBar'

export const Layout = () => {
    return (
        <div >
            <SearchBar/>
            <ArticlesList/>
        </div>
    )
}
