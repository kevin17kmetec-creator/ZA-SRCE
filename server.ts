import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import https from "https";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route to proxy Google Drive PDFs
  app.get("/api/pdf", async (req, res) => {
    const fileId = req.query.id;
    if (!fileId || typeof fileId !== 'string') {
      return res.status(400).json({ error: "Missing file ID" });
    }

    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    console.log(`Proxying PDF request for: ${driveUrl}`);

    const makeRequest = (url: string) => {
      https.get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 302 || response.statusCode === 303) {
          if (response.headers.location) {
            makeRequest(response.headers.location);
          } else {
            res.status(500).send('Redirect location missing');
          }
          return;
        }

        if (response.statusCode !== 200) {
          return res.status(response.statusCode || 500).send(`Failed to fetch PDF, status code: ${response.statusCode}`);
        }

        // Forward CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/pdf');
        
        // Pipe the response directly to the client
        response.pipe(res);
      }).on('error', (err) => {
        console.error('Proxy Error:', err);
        res.status(500).json({ error: 'Failed to proxy request' });
      });
    };

    makeRequest(driveUrl);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
