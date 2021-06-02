import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from "@material-ui/core/Button";
import {
  DataGrid,
  GridColDef,
  useGridSlotComponentProps
} from "@material-ui/data-grid";
import { initialStateInterface } from "../../reducer/reducer";
import { getArticles } from '../../actions/actions';
import Pagination from '@material-ui/lab/Pagination';

const columns: GridColDef[] = [   
    { 
        field: "image", 
        headerName: "Image", 
        width: 150,
        renderCell: (params) => {
            return <img src={params.value?.toString()} alt='' width= '100%'/>
        }},
  { field: "source", headerName: "Source", width: 250 },
  { field: "author", headerName: "Author", width: 250 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "date", headerName: "Date", width: 250 },
      {
        field: "url",
        headerName: "URL",
        sortable: false,
        width: 250,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return <Button variant="contained" color="secondary" href={params.value?.toString()}>GO</Button>;
        }
      }
];

function CustomPagination() {
    const { state, apiRef } = useGridSlotComponentProps();
  
    return (
      <Pagination style={{
        display: 'flex'
      }}
        color="secondary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

export default function ArticlesList() {

    const articles = useSelector((state:initialStateInterface) => state?.articles)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [art, setArt] = useState([])

    useEffect(() => {
        dispatch(getArticles(null, true))
    }, [dispatch])
    
    useEffect(() => {
        if(articles?.length === 0) {
            setLoading(true)
        } else {
            setLoading(false)
           setArt(getDataForRows(articles))
            // setArt(getDataForRows(articles))
        }

    }, [dispatch, articles])

    function getDataForRows (articles: any) {
        let id = 1;
        if(articles?.length > 0) {
            const rows = articles?.map( (a:any) => {
                const { source, author, title, url, urlToImage, publishedAt } = a
                id++
                return {
                    id,
                    source: source.name,
                    author,
                    title,
                    url,
                    image: urlToImage,
                    date: publishedAt.split('T').join(',')
                }
            })
            return rows
        } else {
            return []
        }
    }
  return (
    <div style={{ height: 750, width: '100%', display: 'flex', flexGrow: 1}}>
      {/* <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 } }> */}
          <DataGrid 
          rows={art} 
          columns={columns} 
          pageSize={10} 
          components={{
            Pagination: CustomPagination,
          }}
          loading={loading} 
          disableSelectionOnClick={true} 
          disableColumnMenu={true}
          
          />

        {/* </div> */}
      {/*  </div> */}
    </div>
  );
}