import React, { useEffect, useRef } from "react"

import { EditorView } from "prosemirror-view"
import { EditorState } from "prosemirror-state"
import {
    schema, defaultMarkdownParser,
    defaultMarkdownSerializer
} from "prosemirror-markdown"
import { exampleSetup } from "prosemirror-example-setup"

import "prosemirror-example-setup/style/style.css"
import "prosemirror-view/style/prosemirror.css"

const content =
    `This is a comment written in [Markdown](http://commonmark.org). 
*You* may know the syntax for inserting a link, but does your whole audience?
So you can give people the **choice** to use a more familiar, discoverable interface.
`

export const ProsemirrorEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const editorView = new EditorView(editorRef.current!, {
            state: EditorState.create({
                doc: defaultMarkdownParser.parse(content),
                plugins: exampleSetup({ schema })
            })
        })
        editorView.focus()
        return () => {
            editorView.destroy()
        }
    }, [editorRef])

    return (
        <div ref={editorRef} />
    )

}