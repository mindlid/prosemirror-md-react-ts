import React, { useEffect, useRef, useState } from "react"
import "prosemirror-example-setup/style/style.css"
import "prosemirror-view/style/prosemirror.css"
import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { baseKeymap } from "prosemirror-commands"
import { keymap } from "prosemirror-keymap"
import { DOMParser } from "prosemirror-model"
import { PMMenuBar } from "./PMMenuBar"

export const PMEditorReact: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null)
    const [editorView, setEditorView] = useState<EditorView | null>(null)

    useEffect(() => {

        const editorView = new EditorView(editorRef.current!, {
            state: EditorState.create({
                doc: DOMParser.fromSchema(schema).parse(document.querySelector("#content")!),
                plugins: [keymap(baseKeymap)]
            })
        })

        setEditorView(editorView)


        editorView.focus()
        return () => {
            editorView.destroy()
        }
    }, [editorRef])

    return (
        <>
            <PMMenuBar editorView={editorView!} />
            <div ref={editorRef} style={{ outline: '1px', maxWidth: 200 }} />
            <div style={{ display: 'none' }} id="content">
                <h3>Simple editor</h3>
                <h3>Simple editor</h3>
                <p>With a very crude menu bar.</p>
            </div>
        </>
    )

}