import { prisma } from "../prisma/client";

export async function logActivity(
  userId: string,
  action: string,
  documentId?: string
) {
  return prisma.activity.create({
    data: {
      userId,
      action,
      documentId,
    },
  });
}