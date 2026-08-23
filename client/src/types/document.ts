export interface User {
  id: string;
  name: string;
  email: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  imported?: boolean;
  sharedWith?: string[];
  createdAt?: string;
  updatedAt?: string;
}
export interface Activity {
  id: string;
  userId: number;
  userName: string;
  action: string;
  timestamp: string;
}

export interface CreateDocumentInput {
  title: string;
  content?: string;
  ownerId?: string;
  imported?: boolean;
}