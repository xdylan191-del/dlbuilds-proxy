export default async function handler(req, res) {
  const q = req.query.q || "pc case";
  const style = req.query.style || "";
  const target = `https://www.cclonline.com/api/search/?q=${encodeURIComponent(
    q + (style ? " " + style : "")
  )}&category=Cases&limit=9`;

  try {
    const r = await fetch(target);
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).json(data);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({
      error: "Failed to fetch from CCL",
      details: err.message,
    });
  }
}
