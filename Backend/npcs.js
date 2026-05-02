// npcs.js — drives the Tavern Board UI.
//
// State model:
//  - The board is read-only by default. Anyone can view it.
//  - Clicking "Edit board" prompts for the shared pin (asked once, stored
//    in localStorage). Once unlocked, the body gets a `.edit-mode` class
//    and add/edit/delete controls become visible.
//  - All write requests carry the pin in the X-Board-Pin header. The server
//    verifies it.

(function () {
  const PIN_STORAGE_KEY = "npcBoardPin";

  // ---- DOM refs ----
  const listEl       = document.getElementById("npcs-list");
  const emptyEl      = document.getElementById("empty-state");
  const editToggle   = document.getElementById("edit-toggle");
  const addBtn       = document.getElementById("add-npc-btn");

  const pinModal     = document.getElementById("pin-modal");
  const pinForm      = document.getElementById("pin-form");
  const pinError     = document.getElementById("pin-error");
  const pinCancel    = document.getElementById("pin-cancel");

  const editModal    = document.getElementById("edit-modal");
  const editForm     = document.getElementById("edit-form");
  const editTitle    = document.getElementById("edit-modal-title");
  const editError    = document.getElementById("edit-error");
  const editCancel   = document.getElementById("edit-cancel");
  const editSaveBtn  = document.getElementById("edit-save");

  const deleteModal   = document.getElementById("delete-modal");
  const deleteName    = document.getElementById("delete-modal-name");
  const deleteCancel  = document.getElementById("delete-cancel");
  const deleteConfirm = document.getElementById("delete-confirm");

  // ---- State ----
  let npcs = [];
  let pendingDeleteId = null;

  // ---- Helpers ----
  const getPin = () => localStorage.getItem(PIN_STORAGE_KEY) || "";
  const setPin = (p) => localStorage.setItem(PIN_STORAGE_KEY, p);
  const clearPin = () => localStorage.removeItem(PIN_STORAGE_KEY);

  function showModal(modal) {
    modal.hidden = false;
    // Focus the first input if there is one.
    const focusable = modal.querySelector("input, textarea, button");
    if (focusable) setTimeout(() => focusable.focus(), 30);
  }
  function hideModal(modal) {
    modal.hidden = true;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ---- Rendering ----
  function render() {
    if (!npcs.length) {
      listEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    // Server already sorts, but we sort again client-side for safety
    // (e.g. after a local create before refetch).
    const sorted = [...npcs].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );

    listEl.innerHTML = sorted.map(renderCard).join("");
  }

  function renderCard(n) {
    const remembrance = n.remembrance
      ? `<div class="npc-section-body">${escapeHtml(n.remembrance)}</div>`
      : `<div class="npc-section-body empty">No remembrance recorded.</div>`;
    const notes = n.notes
      ? `<div class="npc-section-body">${escapeHtml(n.notes)}</div>`
      : `<div class="npc-section-body empty">No notes yet.</div>`;

    return `
      <article class="npc-card" data-id="${escapeHtml(n.id)}">
        <div class="npc-actions">
          <button type="button" class="icon-btn" data-action="edit" aria-label="Edit ${escapeHtml(n.name)}">&#9998;</button>
          <button type="button" class="icon-btn danger" data-action="delete" aria-label="Delete ${escapeHtml(n.name)}">&#10005;</button>
        </div>
        <h3 class="npc-name">${escapeHtml(n.name)}</h3>
        <div class="npc-section">
          <div class="npc-section-label">Remembrance</div>
          ${remembrance}
        </div>
        <div class="npc-section">
          <div class="npc-section-label">Notes</div>
          ${notes}
        </div>
      </article>
    `;
  }

  // ---- API calls ----
  async function fetchNpcs() {
    try {
      const res = await fetch("/api/npcs", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      npcs = await res.json();
      render();
    } catch (err) {
      listEl.innerHTML =
        `<p class="board-loading">The board is silent. Could not reach the server.</p>`;
    }
  }

  async function createNpc({ name, remembrance, notes }) {
    const res = await fetch("/api/npcs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Board-Pin": getPin()
      },
      body: JSON.stringify({ name, remembrance, notes })
    });
    if (res.status === 401) throw new Error("wrong-pin");
    if (!res.ok) throw new Error("save failed");
    return res.json();
  }

  async function updateNpc(id, { name, remembrance, notes }) {
    const res = await fetch(`/api/npcs/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Board-Pin": getPin()
      },
      body: JSON.stringify({ name, remembrance, notes })
    });
    if (res.status === 401) throw new Error("wrong-pin");
    if (!res.ok) throw new Error("save failed");
    return res.json();
  }

  async function deleteNpc(id) {
    const res = await fetch(`/api/npcs/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "X-Board-Pin": getPin() }
    });
    if (res.status === 401) throw new Error("wrong-pin");
    if (!res.ok) throw new Error("delete failed");
    return res.json();
  }

  // ---- Edit-mode toggle ----
  async function enterEditMode() {
    if (!getPin()) {
      // Need to ask for the pin first.
      pinError.hidden = true;
      pinForm.reset();
      showModal(pinModal);
      return;
    }
    document.body.classList.add("edit-mode");
    editToggle.querySelector(".edit-label").textContent = "Done editing";
  }

  function exitEditMode() {
    document.body.classList.remove("edit-mode");
    editToggle.querySelector(".edit-label").textContent = "Edit board";
  }

  // ---- Pin modal ----
  pinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(pinForm);
    const candidate = String(fd.get("pin") || "").trim();
    if (!candidate) return;

    // We don't pre-validate; we save and then try a lightweight write.
    // Easier: try a no-op POST with empty name (server returns 400 for empty
    // name, 401 for wrong pin) — that's a tiny test. Simpler still: store pin
    // and test by making the *real* request when the user submits the form.
    // For better UX, ping the server with the pin once before unlocking.
    try {
      const res = await fetch("/api/npcs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Board-Pin": candidate
        },
        body: JSON.stringify({ name: "" }) // server returns 400 if pin is right
      });
      if (res.status === 401) {
        pinError.hidden = false;
        return;
      }
      // 400 (empty name) or 201 means pin was accepted.
      setPin(candidate);
      hideModal(pinModal);
      document.body.classList.add("edit-mode");
      editToggle.querySelector(".edit-label").textContent = "Done editing";
    } catch (err) {
      pinError.textContent = "Could not reach the server.";
      pinError.hidden = false;
    }
  });

  pinCancel.addEventListener("click", () => hideModal(pinModal));

  // ---- Edit / create modal ----
  function openEditModal(npc) {
    editError.hidden = true;
    editForm.reset();
    if (npc) {
      editTitle.textContent = "Edit name on the board";
      editForm.elements.id.value = npc.id;
      editForm.elements.name.value = npc.name || "";
      editForm.elements.remembrance.value = npc.remembrance || "";
      editForm.elements.notes.value = npc.notes || "";
      editSaveBtn.textContent = "Save changes";
    } else {
      editTitle.textContent = "Pin a new name";
      editForm.elements.id.value = "";
      editSaveBtn.textContent = "Pin to the board";
    }
    showModal(editModal);
  }

  editCancel.addEventListener("click", () => hideModal(editModal));

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    editError.hidden = true;
    editSaveBtn.disabled = true;
    const fd = new FormData(editForm);
    const id = String(fd.get("id") || "");
    const payload = {
      name: String(fd.get("name") || "").trim(),
      remembrance: String(fd.get("remembrance") || "").trim(),
      notes: String(fd.get("notes") || "").trim()
    };
    if (!payload.name) {
      editError.textContent = "A name is required.";
      editError.hidden = false;
      editSaveBtn.disabled = false;
      return;
    }
    try {
      if (id) {
        const updated = await updateNpc(id, payload);
        const idx = npcs.findIndex(n => n.id === id);
        if (idx !== -1) npcs[idx] = updated;
      } else {
        const created = await createNpc(payload);
        npcs.push(created);
      }
      render();
      hideModal(editModal);
    } catch (err) {
      if (err.message === "wrong-pin") {
        clearPin();
        hideModal(editModal);
        exitEditMode();
        pinError.hidden = true;
        pinForm.reset();
        showModal(pinModal);
      } else {
        editError.textContent = "Could not save. Please try again.";
        editError.hidden = false;
      }
    } finally {
      editSaveBtn.disabled = false;
    }
  });

  // ---- Delete modal ----
  function openDeleteModal(npc) {
    pendingDeleteId = npc.id;
    deleteName.textContent = npc.name;
    showModal(deleteModal);
  }

  deleteCancel.addEventListener("click", () => {
    pendingDeleteId = null;
    hideModal(deleteModal);
  });

  deleteConfirm.addEventListener("click", async () => {
    if (!pendingDeleteId) return;
    try {
      await deleteNpc(pendingDeleteId);
      npcs = npcs.filter(n => n.id !== pendingDeleteId);
      pendingDeleteId = null;
      render();
      hideModal(deleteModal);
    } catch (err) {
      if (err.message === "wrong-pin") {
        clearPin();
        hideModal(deleteModal);
        exitEditMode();
        showModal(pinModal);
      } else {
        // Soft-fail; keep the modal open.
        deleteName.textContent =
          "Could not remove. Please try again.";
      }
    }
  });

  // ---- Card actions delegation ----
  listEl.addEventListener("click", (e) => {
    if (!document.body.classList.contains("edit-mode")) return;
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const card = btn.closest(".npc-card");
    if (!card) return;
    const id = card.dataset.id;
    const npc = npcs.find(n => n.id === id);
    if (!npc) return;
    if (btn.dataset.action === "edit") openEditModal(npc);
    if (btn.dataset.action === "delete") openDeleteModal(npc);
  });

  // ---- Top-level controls ----
  editToggle.addEventListener("click", () => {
    if (document.body.classList.contains("edit-mode")) {
      exitEditMode();
    } else {
      enterEditMode();
    }
  });

  addBtn.addEventListener("click", () => openEditModal(null));

  // Close any modal with Escape, or by clicking the backdrop.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    [pinModal, editModal, deleteModal].forEach((m) => {
      if (!m.hidden) hideModal(m);
    });
  });
  document.querySelectorAll(".modal-backdrop").forEach((bd) => {
    bd.addEventListener("click", () => {
      const modal = bd.closest(".modal");
      if (modal) hideModal(modal);
    });
  });

  // ---- Boot ----
  fetchNpcs();
})();
