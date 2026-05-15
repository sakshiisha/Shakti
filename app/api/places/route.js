const OVERPASS_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
]

async function fetchOverpass(query) {
  for (const url of OVERPASS_URLS) {
    try {
      const res = await fetch(url, {
        method:  'POST',
        body:    query,
        headers: { 'Content-Type': 'text/plain' },
        signal:  AbortSignal.timeout(8000), // 8 second timeout
      })
      if (res.ok) {
        const data = await res.json()
        return data
      }
    } catch (err) {
      console.log(`Overpass ${url} failed, trying next...`)
      continue
    }
  }
  return null
}

export async function POST(request) {
  try {
    const { lat, lng } = await request.json()

    if (!lat || !lng) {
      return Response.json({ elements: [] })
    }

    const query = `
      [out:json][timeout:8];
      (
        node["amenity"="hospital"](around:3000,${lat},${lng});
        node["amenity"="police"](around:3000,${lat},${lng});
        node["amenity"="pharmacy"](around:3000,${lat},${lng});
        node["amenity"="clinic"](around:3000,${lat},${lng});
        node["amenity"="fire_station"](around:3000,${lat},${lng});
      );
      out body;
    `

    const data = await fetchOverpass(query)

    if (!data) {
      return Response.json({ elements: [] })
    }

    return Response.json(data)

  } catch (err) {
    console.error('Places route error:', err)
    return Response.json({ elements: [] })
  }
}