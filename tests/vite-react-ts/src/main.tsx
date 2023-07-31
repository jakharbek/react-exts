import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Query from "./services/query";



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Query>
            <App/>
        </Query>
    </React.StrictMode>,
)
