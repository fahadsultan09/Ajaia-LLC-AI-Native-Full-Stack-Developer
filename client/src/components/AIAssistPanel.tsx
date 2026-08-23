import { Sparkles, FileText, Wand2, CheckSquare } from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';
import { summarizeText, improveWritingText, generateActionItemsText } from '../utils/ai';

export function AIAssistPanel() {
  const { selectedDocId, documents, updateDocument } = useDocumentStore();
  const currentDoc = documents.find((d) => d.id === selectedDocId);

  const handleAIAction = (actionType: 'summarize' | 'improve' | 'actions') => {
    if (!currentDoc) return;

    let updatedContent = currentDoc.content;

    if (actionType === 'summarize') {
      const summary = summarizeText(currentDoc.content);
      updatedContent = `${summary}<hr/>${currentDoc.content}`;
    } else if (actionType === 'improve') {
      updatedContent = improveWritingText(currentDoc.content);
    } else if (actionType === 'actions') {
      const actionItems = generateActionItemsText(currentDoc.content);
      updatedContent = `${currentDoc.content}<br/>${actionItems}`;
    }

    updateDocument(currentDoc.id, { content: updatedContent });
  };

  return (
    <aside className="w-64 border-l border-slate-800 bg-slate-900/40 p-4 space-y-4 hidden lg:block">
      <div className="flex items-center gap-2 text-slate-300 font-medium text-sm pb-2 border-b border-slate-800">
        <Sparkles className="w-4 h-4 text-indigo-400" /> AI Assistant
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleAIAction('summarize')}
          className="w-full flex items-center gap-2.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded-lg text-xs transition border border-slate-700/60"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-400" /> Summarize Doc
        </button>
        <button
          onClick={() => handleAIAction('improve')}
          className="w-full flex items-center gap-2.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded-lg text-xs transition border border-slate-700/60"
        >
          <Wand2 className="w-3.5 h-3.5 text-purple-400" /> Improve Writing
        </button>
        <button
          onClick={() => handleAIAction('actions')}
          className="w-full flex items-center gap-2.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded-lg text-xs transition border border-slate-700/60"
        >
          <CheckSquare className="w-3.5 h-3.5 text-emerald-400" /> Action Items
        </button>
      </div>
    </aside>
  );
}