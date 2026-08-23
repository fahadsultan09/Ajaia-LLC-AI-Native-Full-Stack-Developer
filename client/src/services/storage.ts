import { DocumentItem, User } from '../types/document';

const STORAGE_KEYS = {
  DOCUMENTS: 'ajaia_documents',
  CURRENT_USER: 'ajaia_current_user',
};

export const storage = {
  getDocuments: (): DocumentItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return data ? JSON.parse(data) : [];
  },

  saveDocuments: (documents: DocumentItem[]): void => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  },

  getCurrentUser: (): User => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (data) {
      return JSON.parse(data);
    }
    const defaultUser: User = {
      id: 'user_alice',
      name: 'Alice',
      email: 'alice@example.com',
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
    return defaultUser;
  },

  setCurrentUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },
};