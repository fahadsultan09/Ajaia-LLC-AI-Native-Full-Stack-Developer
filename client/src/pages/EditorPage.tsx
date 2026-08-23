import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Editor } from '../components/Editor';
import { AIAssistPanel } from '../components/AIAssistPanel';
import { ActivityFeed } from '../components/ActivityFeed';
import { useDocumentStore } from '../store/useDocumentStore';
import { useEffect } from 'react';

export function EditorPage() {

  const fetchInitialData = useDocumentStore((state) => state.fetchInitialData);
  const isLoading = useDocumentStore((state) => state.isLoading)

  useEffect(() => {
    console.log('EditorPage mounted, fetching initial data...');
    fetchInitialData();
    console.log('Initial data fetch triggered.');
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Editor />
          <AIAssistPanel />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}