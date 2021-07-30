import React, { useState } from 'react'
import { ProsemirrorEditor } from './ProsemirrorEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p>Hello Vite + React!</p>
      <ProsemirrorEditor />
    </div>
  )
}

export default App
