import { useState } from 'react';
import { X, UserPlus, Check } from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { selectedDocId, documents, users, currentUser, shareDocument } = useDocumentStore();
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  if (!isOpen || !selectedDocId) return null;

  const currentDoc = documents.find((d) => d.id === selectedDocId);
  const availableUsers = users.filter(
    (u) => u.id !== currentUser?.id && !(currentDoc?.sharedWith || []).includes(u.id)
  );

  const handleShare = () => {
    if (!selectedUserId) return;
    shareDocument(selectedDocId, selectedUserId);
    setSelectedUserId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-indigo-400" /> Share Document
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <label className="text-xs text-slate-400">Select team member to share with:</label>
          <div className="flex gap-2">
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select a user...</option>
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
            <button
              onClick={handleShare}
              disabled={!selectedUserId}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition"
            >
              Share
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-xs font-medium text-slate-400">Shared with:</p>
          <ul className="space-y-1.5 text-xs">
            {(currentDoc?.sharedWith || []).length === 0 ? (
              <li className="text-slate-500 italic">Not shared with anyone yet</li>
            ) : (
              (currentDoc?.sharedWith || []).map((userId) => {
                const u = users.find((user) => user.id === userId);
                return (
                  <li key={userId} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{u?.name || userId}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}