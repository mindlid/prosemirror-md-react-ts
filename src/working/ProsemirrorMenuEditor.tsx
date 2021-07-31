import React, { useEffect, useRef } from "react"

import "prosemirror-example-setup/style/style.css"
import "prosemirror-view/style/prosemirror.css"

import { toggleMark, setBlockType, wrapIn } from "prosemirror-commands"
import { schema } from "prosemirror-schema-basic"

import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { baseKeymap } from "prosemirror-commands"
import { keymap } from "prosemirror-keymap"
import { DOMParser } from "prosemirror-model"

import { Plugin } from "prosemirror-state"
import { MenuView } from "./MenuView"

const content =
    `This is a comment written in [Markdown](http://commonmark.org). 
*You* may know the syntax for inserting a link, but does your whole audience?
So you can give people the **choice** to use a more familiar, discoverable interface.
`

function menuPlugin(items) {
    return new Plugin({
        view(editorView) {
            let menuView = new MenuView(items, editorView)
            editorView.dom.parentNode?.insertBefore(menuView.dom, editorView.dom)
            return menuView
        }
    })
}

// Helper function to create menu icons
function icon(text, name) {
    let span = document.createElement("span")
    span.className = "menuicon " + name
    span.title = name
    span.textContent = text
    return span
}


// Create an icon for a heading at the given level
function heading(level) {
    return {
        command: setBlockType(schema.nodes.heading, { level }),
        dom: icon("H" + level, "heading")
    }
}

let menu = menuPlugin([
    { command: toggleMark(schema.marks.strong), dom: icon("Bold", "strong") },
    { command: toggleMark(schema.marks.em), dom: icon("italic", "em") },
    { command: setBlockType(schema.nodes.paragraph), dom: icon("paragraph", "paragraph") },
    heading(1), heading(2), heading(3),
    { command: wrapIn(schema.nodes.blockquote), dom: icon("\"", "blockquote") }
])



export const ProsemirrorMenuEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const editorView = new EditorView(editorRef.current!, {
            state: EditorState.create({
                doc: DOMParser.fromSchema(schema).parse(document.querySelector("#content")!),
                plugins: [keymap(baseKeymap), menu]
            })
        })


        editorView.focus()
        return () => {
            editorView.destroy()
        }
    }, [editorRef])

    return (
        <>
            <div ref={editorRef} />
            <div style={{ display: 'none' }} id="content">
                <h3>Simple editor</h3>
                <h3>Simple editor</h3>
                <p>With a very crude menu bar.</p>
            </div>
        </>
    )

}