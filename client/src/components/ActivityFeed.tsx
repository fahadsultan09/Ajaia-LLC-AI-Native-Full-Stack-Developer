import { History, User } from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';
import { formatRelativeTime } from '../utils/helpers';

export function ActivityFeed() {
  const activities = useDocumentStore((state) => state.activities);

  return (
    <aside className="w-72 border-l border-slate-800 bg-slate-900/40 p-4 space-y-4 hidden xl:block">
      <div className="flex items-center gap-2 text-slate-300 font-medium text-sm pb-2 border-b border-slate-800">
        <History className="w-4 h-4 text-indigo-400" /> Activity Feed
      </div>
      <ul className="space-y-3 text-xs">
        {activities.map((act) => (
          <li key={act.id} className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
              <User className="w-3 h-3" />
            </div>
            <div className="space-y-0.5">
              <p className="text-slate-300">
                <span className="font-semibold text-slate-200">{act.userName}</span> {act.action}
              </p>
              <p className="text-slate-500 text-[10px]">{formatRelativeTime(act.timestamp)}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}