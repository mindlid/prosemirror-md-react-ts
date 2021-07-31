import React, { useState } from 'react'
import { ProsemirrorEditor } from './ProsemirrorEditor'
import { ProsemirrorMenuEditor } from './working/ProsemirrorMenuEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p>Hello Vite + React!</p>
      <ProsemirrorMenuEditor />
    </div>
  )
}

export default App
