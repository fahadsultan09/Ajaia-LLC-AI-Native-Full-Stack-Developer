import { useState } from 'react';
import { Share2, CheckCircle2, Loader2 } from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';
import { UserSwitcher } from './UserSwitcher';
import { ShareModal } from './ShareModal';

export function Header() {
  const { selectedDocId, documents, updateDocument, isSaving } = useDocumentStore();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const currentDoc = documents.find((d) => d.id === selectedDocId);

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-slate-900/30 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={currentDoc?.title || ''}
            onChange={(e) => currentDoc && updateDocument(currentDoc.id, { title: e.target.value })}
            className="bg-transparent text-lg font-semibold text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 rounded px-2 py-1"
          />

          {isSaving ? (
            <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2.5 py-1 rounded-full">
              <Loader2 className="w-3 h-3 animate-spin" /> Saving...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <UserSwitcher />
          <button
            onClick={() => setIsShareOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-700 transition"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </header>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </>
  );
}