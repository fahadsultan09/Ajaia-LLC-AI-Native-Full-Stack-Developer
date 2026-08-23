import axios from "axios";

export interface CreateDocumentInput {
  title: string;
  content?: string;
  ownerId?: string;
  imported?: boolean;
}

export interface UpdateDocumentInput {
  title?: string;
  content?: string;
  imported?: boolean;
}

const API = "http://localhost:3001/api";

export const getDocuments = (userId: string) =>
  axios.get(`${API}/documents`, {
    headers: {
      "x-user-id": userId,
    },
  });

export const getDocument = (id: string) =>
  axios.get(`${API}/documents/${id}`);

export const createDocument = (data: CreateDocumentInput | string) => {
  // Support both object payloads and direct title strings
  const payload = typeof data === "string" ? { title: data } : data;
  return axios.post(`${API}/documents`, payload);
};

export const updateDocument = (id: string, data: UpdateDocumentInput) =>
  axios.put(`${API}/documents/${id}`, data);