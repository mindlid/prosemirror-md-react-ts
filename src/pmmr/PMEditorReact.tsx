import React, { useEffect, useRef, useState } from "react"

import {
    schema,
    defaultMarkdownParser,
    defaultMarkdownSerializer
} from "prosemirror-markdown"

import { EditorState, Transaction } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { baseKeymap } from "prosemirror-commands"
import { keymap } from "prosemirror-keymap"
import { history, redo, undo } from "prosemirror-history"
import { PMMenuBar } from "./PMMenuBar"

const initialContent =
    `This is a comment written in [Markdown](http://commonmark.org).

*You* may know the syntax for inserting a link, but does your whole audience?

So you can give people the **choice** to use a more familiar, discoverable interface.
`

baseKeymap['Mod-z'] = undo
baseKeymap['Mod-y'] = redo

console.log('keymaps', Object.keys(baseKeymap))

export const PMEditorReact: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null)
    const [editorView, setEditorView] = useState<EditorView | null>(null)
    const [markdown, setMarkdown] = useState<string>('')

    useEffect(() => {

        const editorView = new EditorView(editorRef.current!, {
            state: EditorState.create({
                doc: defaultMarkdownParser.parse(initialContent),
                plugins: [keymap(baseKeymap), history()]
            }),
            dispatchTransaction: (transaction: Transaction) => {
                const docChanged = transaction.docChanged
                const state = editorView.state.apply(transaction)
                if (docChanged) {
                    console.log('doc changed')
                    const markdown = defaultMarkdownSerializer.serialize(state.doc)
                    setMarkdown(markdown)
                }
                editorView.updateState(state)
            }
        })

        setEditorView(editorView)
        setMarkdown(defaultMarkdownSerializer.serialize(editorView.state.doc))

        editorView.focus()
        return () => {
            editorView.destroy()
        }
    }, [editorRef])

    return (
        <div style={{ display: 'flex', width: 600, height: 360 }}>
            <div style={{ border: '1px solid black', borderRadius: '1rem', width: 300 }} >
                <PMMenuBar editorView={editorView!} />
                <hr style={{ margin: 0 }} />
                <div ref={editorRef} style={{ padding: '0.5rem' }} />
            </div>
            <div style={{ border: '1px solid black', borderRadius: '1rem', width: 300, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <span style={{ padding: '0.5rem' }}>Markdown</span>
                <hr style={{ margin: 0 }} />
                <textarea
                    readOnly
                    style={{ flexGrow: 1, borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
                    value={markdown} />
            </div>
        </div>
    )
}