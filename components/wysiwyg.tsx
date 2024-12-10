import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

export function EditorText() {
  const [html, setHtml] = useState('my <b>HTML</b>');
  
  function onChange(e:any) {
    setHtml(e.target.value);
  }

  return (
    <Editor value={html} onChange={onChange} />
  );
}