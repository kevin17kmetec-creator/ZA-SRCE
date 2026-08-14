export default async function handler(req, res) {
  const fileId = req.query.id;
  if (!fileId) {
    return res.status(400).json({ error: "Missing file ID" });
  }

  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  try {
    const response = await fetch(driveUrl, { redirect: 'follow' });
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch PDF" });
    }
    
    const buffer = await response.arrayBuffer();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
