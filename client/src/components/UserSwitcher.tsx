import { useDocumentStore } from '../store/useDocumentStore';

export function UserSwitcher() {
  const { currentUser, users, switchUser } = useDocumentStore();

  return (
    <select
      value={currentUser?.id || ''}
      onChange={(e) => switchUser(e.target.value)}
      className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
    >
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}