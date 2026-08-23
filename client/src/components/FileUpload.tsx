import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importDocument = useDocumentStore((state) => state.importDocument);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['txt', 'md'].includes(extension || '')) {
      alert('Only .txt and .md files are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const title = file.name.replace(/\.[^/.]+$/, '');
      const formattedContent = `<h1>${title}</h1><p>${text
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br/>')}</p>`;

      if (typeof importDocument === 'function') {
        await importDocument(title, formattedContent);
      } else {
        console.error('importDocument function is missing from useDocumentStore');
      }

      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept=".txt,.md"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 transition rounded-lg text-xs font-medium border border-slate-700"
      >
        <Upload className="w-3.5 h-3.5" /> Import File (.txt, .md)
      </button>
    </div>
  );
}