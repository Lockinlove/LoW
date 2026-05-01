// Cloudflare Pages Function — /api/npcs
//
// GET  /api/npcs  → list all NPCs (sorted alphabetically by name)
// POST /api/npcs  → add a new NPC. Requires X-Board-Pin header.
//
// Storage model: a single KV key ("npcs:all") holds the entire JSON array.
// Plenty fast for a party-sized list and atomic per write.
//
// Bindings (set up on the Pages project, not in code):
//   NPCS_KV         — KV namespace
//   NPC_BOARD_PIN   — shared password env var

const KEY = "npcs:all";

async function loadAll(env) {
  const raw = await env.NPCS_KV.get(KEY);
  return raw ? JSON.parse(raw) : [];
}

async function saveAll(env, list) {
  await env.NPCS_KV.put(KEY, JSON.stringify(list));
}

function checkPin(request, env) {
  const provided = request.headers.get("X-Board-Pin");
  return Boolean(provided && env.NPC_BOARD_PIN && provided === env.NPC_BOARD_PIN);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequestGet({ env }) {
  const list = await loadAll(env);
  list.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  return json(list);
}

export async function onRequestPost({ request, env }) {
  if (!checkPin(request, env)) {
    return json({ error: "wrong pin" }, 401);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid JSON" }, 400);
  }
  const name = (body.name || "").trim();
  const remembrance = (body.remembrance || "").trim();
  const notes = (body.notes || "").trim();
  if (!name) return json({ error: "name required" }, 400);

  const list = await loadAll(env);
  const newNpc = {
    id: crypto.randomUUID(),
    name,
    remembrance,
    notes,
    createdAt: Date.now()
  };
  list.push(newNpc);
  await saveAll(env, list);
  return json(newNpc, 201);
}
