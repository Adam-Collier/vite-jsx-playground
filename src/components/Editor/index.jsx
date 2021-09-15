import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
// we need access to jarles Provider to update the preview
import { useLiveContext } from 'jarle/esm/Provider';

import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab, selectLine } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

import s from "./editor.module.css"

export const Editor = () => {
  const {
    code: contextCode,
    onChange,
  } = useLiveContext();

  const [code, setCode] = useState(contextCode);

  useLayoutEffect(() => {
    onChange(code || '');
  }, [code, onChange]);

  const editor = useRef();

  const onUpdate = EditorView.updateListener.of((v) => {
      setCode(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
      // defaultLineHeight: 1.7,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab, selectLine]),
        oneDark,
        javascript({ jsx: true }),
        onUpdate,
      ],
    });

    const view = new EditorView({ state, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, []);


  useEffect(() => {
    console.log(EditorView);
  }, [EditorView]);

  return <div ref={editor} className={s.editor}></div>;
};
