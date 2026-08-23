import { FileText, Share2, Download, Plus, Sparkles } from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';
import { FileUpload } from './FileUpload';

export function Sidebar() {
  const { documents, selectedDocId, selectDocument, createDocument, currentUser } = useDocumentStore();

  const currentUserId = currentUser?.id;

  // Document categorization filters
  const ownedDocs = documents.filter((d) => currentUserId && d.ownerId === currentUserId && !d.imported);
  const sharedDocs = documents.filter((d) => currentUserId && d.sharedWith?.includes(currentUserId));
  const importedDocs = documents.filter((d) => currentUserId && d.ownerId === currentUserId && d.imported);

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between p-4">
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          {/* <div className="p-1.5 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div> */}
          {/* AJAIA Logo Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <img 
            src="https://ajaia.ai/static/mirror/framerusercontent.com/1WLelqbeyj7nE3eRuorp4vURh4c-5a27d3a4238c.png" 
            alt="AJAIA Logo" 
            className="h-7 w-auto object-contain brightness-110" 
          />
        </div>
          {/* <span className="font-semibold text-lg tracking-tight text-slate-100">Ajaia LLC AI</span> */}
        </div>

        <div className="space-y-2">
          <button
            onClick={createDocument}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all rounded-xl font-medium text-sm text-white shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" /> New Document
          </button>
          <FileUpload />
        </div>

        <nav className="space-y-4">
          <div>
            <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Owned Docs</p>
            <ul className="space-y-1">
              {ownedDocs.map((doc) => (
                <li key={doc.id}>
                  <button
                    onClick={() => selectDocument(doc.id)}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition ${
                      selectedDocId === doc.id ? 'bg-slate-800 text-indigo-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{doc.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {sharedDocs.length > 0 && (
            <div>
              <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Shared Docs</p>
              <ul className="space-y-1">
                {sharedDocs.map((doc) => (
                  <li key={doc.id}>
                    <button
                      onClick={() => selectDocument(doc.id)}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition ${
                        selectedDocId === doc.id ? 'bg-slate-800 text-indigo-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Share2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{doc.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {importedDocs.length > 0 && (
            <div>
              <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Imported</p>
              <ul className="space-y-1">
                {importedDocs.map((doc) => (
                  <li key={doc.id}>
                    <button
                      onClick={() => selectDocument(doc.id)}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition ${
                        selectedDocId === doc.id ? 'bg-slate-800 text-indigo-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Download className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{doc.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>

      {currentUser && (
        <div className="border-t border-slate-800/80 pt-4 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
            {currentUser.name ? currentUser.name.split(' ').map((n) => n[0]).join('') : 'U'}
          </div>
          <div className="flex flex-col text-xs">
            <span className="font-medium text-slate-200">{currentUser.name}</span>
            <span className="text-slate-500">{currentUser.email || ''}</span>
          </div>
        </div>
      )}
    </aside>
  );
}