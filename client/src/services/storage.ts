import type { DocumentItem, Activity } from '../types/document';

const STORAGE_KEYS = {
  DOCUMENTS: 'docucraft_documents',
  ACTIVITIES: 'docucraft_activities',
  CURRENT_USER: 'docucraft_current_user_id',
};

const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Project Strategy 2026',
    content: '<h1>Project Strategy 2026</h1><p>Start typing your notes here or leverage AI autocompletion to accelerate your workflow...</p>',
    ownerId: 1,
    sharedWith: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'doc-2',
    title: 'Team Onboarding Guide',
    content: '<h1>Onboarding</h1><p>Welcome to the project! Please review the architecture notes below.</p>',
    ownerId: 2,
    sharedWith: [1],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const loadDocuments = (): DocumentItem[] => {
  const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
  return data ? JSON.parse(data) : initialDocuments;
};

export const saveDocuments = (docs: DocumentItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
};

export const loadActivities = (): Activity[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
  return data ? JSON.parse(data) : [
    {
      id: 'act-1',
      userId: 2,
      userName: 'Alice Smith',
      action: 'shared document "Team Onboarding Guide"',
      timestamp: new Date().toISOString(),
    },
  ];
};

export const saveActivities = (activities: Activity[]): void => {
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
};

export const loadCurrentUserId = (): number => {
  const id = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return id ? parseInt(id, 10) : 1;
};

export const saveCurrentUserId = (userId: number): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId.toString());
};