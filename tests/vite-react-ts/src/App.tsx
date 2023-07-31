import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useApiQuery} from "../../../src/hooks/useApiQuery";
import useFormInputs from "../../../src/hooks/useFormInputs";
import {client} from "./services/client";

function App() {
  const [count, setCount] = useState(0)
    useApiQuery({axios: client, axiosUrl: "/typicode/demo/posts", queryKey: []})
    const {view} = useFormInputs({
        url:"/typicode/demo/posts",
        formName:"test-1-form",
        listKeyId: "test-1-form-key",
        clientQuery: (url:string, attributes:any, config:any):any => client.post(url, attributes, config)
    });


  return (
    <>
        {view}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
