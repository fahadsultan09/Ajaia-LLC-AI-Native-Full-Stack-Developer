import express from "express";
import cors from "cors";
import { prisma } from "./prisma/client";

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Enable CORS for Vite FE
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Backend Running",
  });
});

app.get("/api/users", async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
});

app.get("/api/documents", async (req, res) => {
  try {
    const userId =
      (req.headers["x-user-id"] as string) ||
      "user_alice";

    const documents =
      await prisma.document.findMany({
        where: {
          ownerId: userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

    res.json(documents);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch documents",
    });
  }
});

app.get("/api/documents/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const document =
      await prisma.document.findUnique({
        where: {
          id,
        },
      });

    if (!document) {
      return res.status(404).json({
        error: "Document not found",
      });
    }

    res.json(document);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch document",
    });
  }
});

app.post("/api/documents", async (req, res) => {
  try {
    const { title } = req.body;

    const document = await prisma.document.create({
      data: {
        title: title || "Untitled Document",
        content: "",
        ownerId: "user_alice",
      },
    });

    res.status(201).json(document);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create document",
    });
  }
});

app.put("/api/documents/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      content
    } = req.body;

    const updated =
      await prisma.document.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });

    res.json({
      success: true,
      document: updated,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update document",
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
