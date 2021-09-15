import React, { useState } from 'react';
import './App.css';
import { Editor } from './components/Editor';
import { Provider, Error, Preview } from 'jarle';
import styled, { createGlobalStyle } from 'styled-components';
import * as utils from 'utils';
import s from './app.module.css';
import SplitPane from 'react-split-pane';
import Sidebar from './components/Sidebar';
import PanelTitle from './components/PanelTitle';

import { useAtom } from 'jotai';
import { viewAtom } from './atoms';

function App() {
  // const [code, setCode] = useState(null);
  // const [error, setError] = useState(null);
  const [view] = useAtom(viewAtom);

  return (
    <div className={s.app}>
      <Provider
        code="<strong>Hello World!</strong>"
        scope={{ ...utils, styled, createGlobalStyle }}
      >
        <Sidebar />
        <div className={s.wrapper}>
          <SplitPane split="vertical" defaultSize="50%" maxSize={-300}>
            {view === 'code' && (
              <SplitPane split="horizontal" defaultSize="80%" maxSize={-100}>
                <div className={s.editor}>
                  <PanelTitle text="Editor" />
                  <Editor />
                </div>
                <div className={s.error}>
                  <PanelTitle text="Error" />
                  <Error />
                </div>
              </SplitPane>
            )}
            {view === 'form' && <PanelTitle text="Form" />}
            <div className={s.preview}>
              <PanelTitle text="Preview" />
              <div className={s.content}>
                <Preview />
              </div>
            </div>
          </SplitPane>
        </div>
      </Provider>
    </div>
  );
}

export default App;
