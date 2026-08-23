// import { useEffect, useRef } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Heading from '@tiptap/extension-heading';
// import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, List } from 'lucide-react';
// import { useDocumentStore } from '../store/useDocumentStore';
// import { calculateStats } from '../utils/helpers';

// export function Editor() {
//   const { selectedDocId, documents, updateDocument, setIsSaving } = useDocumentStore();
//   const currentDoc = documents.find((d) => d.id === selectedDocId);
//   const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const editor = useEditor({
//     extensions: [StarterKit, Underline, Heading.configure({ levels: [1, 2] })],
//     content: currentDoc?.content || '',
//     editorProps: {
//       attributes: {
//         // class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] text-slate-200',
//         class: 'prose prose-invert max-w-full focus:outline-none min-h-[500px] text-slate-200 break-words whitespace-pre-wrap overflow-wrap-break-word',
//     },
//     },
//     onUpdate: ({ editor }) => {
//       setIsSaving(true);
//       if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

//       saveTimeoutRef.current = setTimeout(() => {
//         if (currentDoc) {
//           updateDocument(currentDoc.id, { content: editor.getHTML() });
//         }
//         setIsSaving(false);
//       }, 1000);
//     },
//   });

//   useEffect(() => {
//     if (editor && currentDoc && editor.getHTML() !== currentDoc.content) {
//       editor.commands.setContent(currentDoc.content);
//     }
//   }, [selectedDocId, editor]);

//   if (!editor || !currentDoc) return null;

//   const stats = calculateStats(currentDoc.content);

//   return (
//     <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
//       <div className="h-12 border-b border-slate-800/80 bg-slate-900/40 px-6 flex items-center justify-between">
//         <div className="flex items-center gap-1.5">
//           <button
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             className={`p-1.5 rounded transition ${editor.isActive('bold') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
//           >
//             <Bold className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             className={`p-1.5 rounded transition ${editor.isActive('italic') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
//           >
//             <Italic className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleUnderline().run()}
//             className={`p-1.5 rounded transition ${editor.isActive('underline') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
//           >
//             <UnderlineIcon className="w-4 h-4" />
//           </button>
//           <div className="h-4 w-px bg-slate-800 mx-1" />
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//             className={`p-1.5 rounded transition ${editor.isActive('heading', { level: 1 }) ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
//           >
//             <Heading1 className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//             className={`p-1.5 rounded transition ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
//           >
//             <Heading2 className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => editor.chain().focus().toggleBulletList().run()}
//             className={`p-1.5 rounded transition ${editor.isActive('bulletList') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
//           >
//             <List className="w-4 h-4" />
//           </button>
//         </div>

//         <div className="text-xs text-slate-500 space-x-3">
//           <span>Words: {stats.words}</span>
//           <span>Chars: {stats.chars}</span>
//           <span>Read time: ~{stats.readingTime} min</span>
//         </div>
//       </div>

//     <div className="flex-1 overflow-y-auto p-12 flex justify-center">
//         <div className="w-full max-w-3xl min-w-0 min-h-[700px] bg-slate-900/50 border border-slate-800 rounded-2xl p-10 shadow-2xl overflow-hidden break-words">
//           <EditorContent editor={editor} />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Users,
  CheckCircle2,
  Loader2,
  Wifi,
} from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';
import '../styles/editor.css';

export function Editor() {
  const { documents, selectedDocId, updateDocument, isSaving, currentUser } = useDocumentStore();

  console.log('Editor rendering with selectedDocId:', selectedDocId, 'and currentUser:', currentUser);
  const currentDoc = documents.find((d) => d.id === selectedDocId);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2] }),
      Placeholder.configure({
        placeholder: 'Start writing or press "/" for commands...',
      }),
    ],
    content: currentDoc?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-full focus:outline-none min-h-[600px] text-slate-200 break-words whitespace-pre-wrap',
      },
    },
    onUpdate: ({ editor }) => {
      if (selectedDocId) {
        const html = editor.getHTML();
        updateDocument(selectedDocId, { content: html });
      }
    },
  });

  // Keep editor content in sync when selected document changes
  useEffect(() => {
    if (editor && currentDoc && editor.getHTML() !== currentDoc.content) {
      editor.commands.setContent(currentDoc.content || '');
    }
  }, [selectedDocId, editor]);

  if (!editor) return null;

  return (
    <div className="flex-1 flex flex-col h-full editor-canvas-bg overflow-hidden relative">
      {/* Floating Modern Toolbar */}
      <div className="h-14 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 shadow-inner">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('bold')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('italic')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('underline')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-slate-800 mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-slate-800 mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('bulletList')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('orderedList')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('blockquote')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded-lg text-xs font-medium transition ${
              editor.isActive('code')
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Code Inline"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Real-time Collaboration Status Header Controls */}
        <div className="flex items-center gap-4">
          {/* Active Collaborators */}
          <div className="flex items-center gap-2 bg-slate-950/40 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-400">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <div className="flex -space-x-1.5 overflow-hidden">
              <div
                className="inline-block h-5 w-5 rounded-full ring-2 ring-slate-900 bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center"
                title={currentUser?.name || 'You'}
              >
                {currentUser?.name?.[0] || 'Y'}
              </div>
              <div
                className="inline-block h-5 w-5 rounded-full ring-2 ring-slate-900 bg-purple-500 text-[10px] font-bold text-white flex items-center justify-center"
                title="Alice Smith"
              >
                A
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">2 editing</span>
          </div>

          {/* Sync Status Badge */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span className="text-amber-400/90 text-xs">Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400 text-xs">Saved live</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Document Sheet Canvas */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 flex justify-center custom-scrollbar">
        <div className="w-full max-w-4xl min-h-[780px] bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-10 md:p-16 shadow-2xl shadow-indigo-950/20 relative">
          
          {/* Document Header Input */}
          <div className="mb-8 border-b border-slate-800/60 pb-6">
            <input
              type="text"
              value={currentDoc?.title || ''}
              onChange={(e) => {
                if (selectedDocId) {
                  updateDocument(selectedDocId, { title: e.target.value });
                }
              }}
              placeholder="Untitled Document"
              className="w-full bg-transparent text-3xl md:text-4xl font-bold text-slate-100 placeholder:text-slate-600 focus:outline-none tracking-tight"
            />
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" /> Live Session Active
              </span>
              <span>•</span>
              <span>Owner: {currentUser?.name || 'User'}</span>
            </div>
          </div>

          {/* Tiptap Rich Text Content Engine */}
          <EditorContent editor={editor} className="w-full min-h-[500px]" />
        </div>
      </div>
    </div>
  );
}