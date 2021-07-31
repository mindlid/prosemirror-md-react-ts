import React from "react"

import "prosemirror-example-setup/style/style.css"
import "prosemirror-view/style/prosemirror.css"

import { toggleMark, setBlockType, wrapIn } from "prosemirror-commands"
import { schema } from "prosemirror-schema-basic"
import { EditorView } from "prosemirror-view"

type IPMMenuBarProps = {
    editorView: EditorView<any>
    //onBold: <S extends Schema = any>(state: EditorState<S>, dispatch?: (tr: Transaction<S>) => void) => boolean
    //onEmphasis: <S extends Schema = any>(state: EditorState<S>, dispatch?: (tr: Transaction<S>) => void) => boolean
}

const toggleStrong = toggleMark(schema.marks.strong)
const toggleEmphasis = toggleMark(schema.marks.em)
const toggleParagraph = setBlockType(schema.nodes.paragraph)
const toggleQuote = wrapIn(schema.nodes.blockquote)
const toggleHeadingLevel = (level: number) => setBlockType(schema.nodes.heading, { level })
const toggleHeadingOne = toggleHeadingLevel(1)
const toggleHeadingTwo = toggleHeadingLevel(2)
const toggleHeadingThree = toggleHeadingLevel(3)

export const PMMenuBar: React.FC<IPMMenuBarProps> = ({ editorView }) => {

    return (
        <div style={{ display: 'flex' }}>
            <button
                onClick={() => toggleStrong(editorView.state, editorView.dispatch)}>B</button>
            <button
                onClick={() => toggleEmphasis(editorView.state, editorView.dispatch)}>I</button>
            <button
                onClick={() => toggleParagraph(editorView.state, editorView.dispatch)}>P</button>
            <button
                onClick={() => toggleQuote(editorView.state, editorView.dispatch)}>"</button>
            <button
                onClick={() => toggleHeadingOne(editorView.state, editorView.dispatch)}>H1</button>
            <button
                onClick={() => toggleHeadingTwo(editorView.state, editorView.dispatch)}>H2</button>
            <button
                onClick={() => toggleHeadingThree(editorView.state, editorView.dispatch)}>H3</button>
        </div>
    )

}