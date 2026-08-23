import { create } from 'zustand';
import type { DocumentItem, Activity, User } from '../types/document';
import { api } from '../services/api';

interface DocumentState {
  documents: DocumentItem[];
  selectedDocId: string | null;
  users: User[];
  currentUser: User | null;
  activities: Activity[];
  isSaving: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  fetchInitialData: () => Promise<void>;
  selectDocument: (id: string) => void;
  createDocument: () => Promise<void>;
  updateDocument: (id: string, updates: Partial<DocumentItem>) => Promise<void>;
  switchUser: (userId: string) => Promise<void>;
  shareDocument: (docId: string, targetUserId: string) => void;
  setIsSaving: (saving: boolean) => void;
  importDocument: (title: string, content: string) => Promise<void>;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  selectedDocId: null,
  users: [],
  currentUser: null,
  activities: [],
  isSaving: false,
  isLoading: false,
  isInitialized: false,

  setIsSaving: (saving) => set({ isSaving: saving }),

  fetchInitialData: async () => {
    if (get().isInitialized || get().isLoading) return;

    set({ isLoading: true });
    try {
      const fetchedUsers = await api.getUsers();
      const defaultUser = fetchedUsers[0] || { id: 'user_alice', name: 'Alice', email: 'alice@example.com' };
      const docs = await api.getDocuments(String(defaultUser.id));

      set({
        users: fetchedUsers,
        currentUser: defaultUser,
        documents: docs,
        selectedDocId: docs[0]?.id || null,
        isLoading: false,
        isInitialized: true,
      });
    } catch (err) {
      console.error('API Initialization error:', err);
      set({ isLoading: false });
    }
  },

  selectDocument: (id) => set({ selectedDocId: id }),

  createDocument: async () => {
    try {
      const newDoc = await api.createDocument('Untitled Document');
      const { documents, currentUser } = get();

      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        userId: String(currentUser?.id || 'user_alice'),
        userName: currentUser?.name || 'Alice',
        action: `created "${newDoc.title}"`,
        timestamp: new Date().toISOString(),
      };

      set({
        documents: [newDoc, ...documents],
        selectedDocId: newDoc.id,
        activities: [newActivity, ...get().activities],
      });
    } catch (err) {
      console.error('Error creating document:', err);
    }
  },

  updateDocument: async (id, updates) => {
    try {
      const updatedDoc = await api.updateDocument(id, updates);
      set((state) => ({
        documents: state.documents.map((d) => (d.id === id ? updatedDoc : d)),
      }));
    } catch (err) {
      console.error('Error updating document:', err);
    }
  },

  switchUser: async (userId: string) => {
    const targetUser = get().users.find((u) => String(u?.id) === String(userId));
    if (!targetUser) return;

    set({ currentUser: targetUser, isLoading: true });
    try {
      const docs = await api.getDocuments(String(targetUser.id));
      set({
        documents: docs,
        selectedDocId: docs[0]?.id || null,
        isLoading: false,
      });
    } catch (err) {
      console.error('Error switching user:', err);
      set({ isLoading: false });
    }
  },

  shareDocument: (docId: string, targetUserId: string) => {
    const { documents, currentUser, users } = get();
    const targetUser = users.find((u) => String(u.id) === String(targetUserId));

    set({
      documents: documents.map((doc) => {
        if (doc.id === docId) {
          const currentShared = doc.sharedWith || [];
          return currentShared.includes(targetUserId)
            ? doc
            : { ...doc, sharedWith: [...currentShared, targetUserId] };
        }
        return doc;
      }),
      activities: currentUser && targetUser ? [
        {
          id: `act-${Date.now()}`,
          userId: String(currentUser.id),
          userName: currentUser.name,
          action: `shared a document with ${targetUser.name}`,
          timestamp: new Date().toISOString(),
        },
        ...get().activities,
      ] : get().activities,
    });
  },

  importDocument: async (title: string, content: string) => {
    const currentUser = get().currentUser;
    if (!currentUser) return;

    set({ isSaving: true });
    try {
      const newDoc = await api.createDocument(title);
      const updatedDoc = await api.updateDocument(newDoc.id, { content });

      set((state) => ({
        documents: [updatedDoc, ...state.documents.filter((d) => d.id !== newDoc.id)],
        selectedDocId: updatedDoc.id,
        isSaving: false,
      }));
    } catch (err) {
      console.error('Failed to import document:', err);
      set({ isSaving: false });
    }
  },
}));