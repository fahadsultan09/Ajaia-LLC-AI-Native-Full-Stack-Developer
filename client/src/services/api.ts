import type { CreateDocumentInput, DocumentItem, User } from '../types/document';

const BASE_URL = 'http://localhost:3001/api';

export const api = {
  getUsers: async (): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  getDocuments: async (userId: string): Promise<DocumentItem[]> => {
    const res = await fetch(`${BASE_URL}/documents`, {
      headers: { 'x-user-id': userId },
    });
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  },

  getDocumentById: async (id: string): Promise<DocumentItem> => {
    const res = await fetch(`${BASE_URL}/documents/${id}`);
    if (!res.ok) throw new Error('Failed to fetch document');
    return res.json();
  },

  createDocument: async (data: string | CreateDocumentInput) => {
    const payload = typeof data === 'string' ? { title: data } : data;
    
    const response = await fetch('http://localhost:3001/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create document');
    }

    return response.json();
  },

  updateDocument: async (id: string, updates: { title?: string; content?: string }): Promise<DocumentItem> => {
    const res = await fetch(`${BASE_URL}/documents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update document');
    const data = await res.json();
    return data.document;
  },
};