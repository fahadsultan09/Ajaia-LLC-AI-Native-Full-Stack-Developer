// src/components/EditorSkeleton.tsx
import { Bold, Italic, Underline, Heading1, Heading2, List, Sparkles } from 'lucide-react';

export function EditorSkeleton() {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Mock Toolbar */}
      <div className="h-12 border-b border-slate-800/80 bg-slate-900/40 px-6 flex items-center gap-1.5">
        <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><Bold className="w-4 h-4" /></button>
        <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><Italic className="w-4 h-4" /></button>
        <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><Underline className="w-4 h-4" /></button>
        <div className="h-4 w-px bg-slate-800 mx-1" />
        <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><Heading1 className="w-4 h-4" /></button>
        <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><Heading2 className="w-4 h-4" /></button>
        <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><List className="w-4 h-4" /></button>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" /> AI Assist
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-y-auto p-12 flex justify-center">
        <div className="w-full max-w-3xl min-h-[700px] bg-slate-900/50 border border-slate-800 rounded-2xl p-10 shadow-2xl space-y-4">
          <h1 className="text-3xl font-bold text-slate-100">Project Strategy 2026</h1>
          <p className="text-slate-400 leading-relaxed">
            Start typing your notes here or leverage AI autocompletion to accelerate your workflow...
          </p>
        </div>
      </div>
    </div>
  );
}