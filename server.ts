import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { LookerNodeSDK } from "@looker/sdk-node";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/looker/signed-embed", async (req, res) => {
    try {
      const sdk = LookerNodeSDK.init40();
      // Remove user_timezone entirely as requested
      const payload = { ...req.body };
      delete payload.user_timezone;

      const signedUrl = await sdk.ok(sdk.create_sso_embed_url(payload));
      res.json({ url: signedUrl.url });
    } catch (error: any) {
      console.error("Looker Signed Embed Error:", error);
      res.status(500).json({ error: error.message || "Failed to create signed embed URL" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
