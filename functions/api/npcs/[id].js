// Cloudflare Pages Function — /api/npcs/:id
//
// PUT    /api/npcs/:id  → update an existing NPC. Requires X-Board-Pin.
// DELETE /api/npcs/:id  → remove an NPC. Requires X-Board-Pin.

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

export async function onRequestPut({ request, env, params }) {
  if (!checkPin(request, env)) return json({ error: "wrong pin" }, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid JSON" }, 400);
  }

  const list = await loadAll(env);
  const idx = list.findIndex(n => n.id === params.id);
  if (idx === -1) return json({ error: "not found" }, 404);

  const name = (body.name || "").trim();
  if (!name) return json({ error: "name required" }, 400);

  list[idx] = {
    ...list[idx],
    name,
    remembrance: (body.remembrance || "").trim(),
    notes: (body.notes || "").trim()
  };
  await saveAll(env, list);
  return json(list[idx]);
}

export async function onRequestDelete({ request, env, params }) {
  if (!checkPin(request, env)) return json({ error: "wrong pin" }, 401);

  const list = await loadAll(env);
  const filtered = list.filter(n => n.id !== params.id);
  if (filtered.length === list.length) return json({ error: "not found" }, 404);

  await saveAll(env, filtered);
  return json({ ok: true });
}
