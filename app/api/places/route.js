export async function POST(request) {
  try {
    const { lat, lng } = await request.json()

    const query = `
      [out:json][timeout:10];
      (
        node["amenity"="hospital"](around:2000,${lat},${lng});
        node["amenity"="police"](around:2000,${lat},${lng});
        node["amenity"="pharmacy"](around:2000,${lat},${lng});
        node["amenity"="clinic"](around:2000,${lat},${lng});
      );
      out body;
    `

    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body:   query,
      headers: { 'Content-Type': 'text/plain' },
    })

    if (!res.ok) {
      return Response.json({ elements: [] })
    }

    const data = await res.json()
    return Response.json(data)

  } catch (err) {
    console.error('Overpass proxy error:', err)
    return Response.json({ elements: [] })
  }
}