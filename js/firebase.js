// ── Firebase + Tarefas

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc, onSnapshot, serverTimestamp }
    from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

  const app = initializeApp({
    apiKey: "AIzaSyDgPRSqHtgVt4zDN7EHITC7gO6LucUsWpw",
    authDomain: "gestor-tarefas-6279d.firebaseapp.com",
    projectId: "gestor-tarefas-6279d",
    storageBucket: "gestor-tarefas-6279d.firebasestorage.app",
    messagingSenderId: "53481253000",
    appId: "1:53481253000:web:eb72a77788ad508f31573d"
  });
  const db = getFirestore(app);
  const tasksRef = collection(db, 'tarefas');

  window._cfDb = db;
  window._cfFs = { doc, getDoc, setDoc, addDoc, collection, serverTimestamp };

  let allTasks = [];
  let editId = null;
  let activeStatusId = null;
  let currentNoteId = null;
  let currentTab = 'active';
  let pendingDeleteId = null;

  const AVATAR_CFG = {
    'Tiago Fachada': { cls: 'av-tf', initials: 'TF' },
    'Tiago Pereira':  { cls: 'av-tp', initials: 'TP' },
    'Miguel Leitão':  { cls: 'av-ml', initials: 'ML' },
    'Vânia Costa':    { cls: 'av-vc', initials: 'VC' },
  };

  function avatarHTML(name) {
    const cfg = AVATAR_CFG[name];
    if (!cfg) return `<span class="assignee-avatar av-xx" title="${esc(name)}">${esc(name.substring(0,2).toUpperCase())}</span>`;
    return `<span class="assignee-avatar ${cfg.cls}" title="${esc(name)}">${cfg.initials}</span>`;
  }

  function openConfirmDelete(id) {
    const task = allTasks.find(t => t.id === id);
    if (!task) return;
    pendingDeleteId = id;
    document.getElementById('confirmClient').textContent = task.client || '—';
    document.getElementById('confirmTask').textContent = task.task || '—';
    document.getElementById('confirmOverlay').classList.add('open');
  }
  function closeConfirmDelete() { document.getElementById('confirmOverlay').classList.remove('open'); pendingDeleteId = null; }
  document.getElementById('btnCancelarConfirm').addEventListener('click', closeConfirmDelete);
  document.getElementById('confirmOverlay').addEventListener('click', e => { if (e.target.id === 'confirmOverlay') closeConfirmDelete(); });
  document.getElementById('btnConfirmarEliminar').addEventListener('click', async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    closeConfirmDelete();
    try { await deleteDoc(doc(db, 'tarefas', id)); showToast('Tarefa eliminada.'); }
    catch { showToast('Erro ao eliminar.'); }
  });

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentTab = tab.dataset.tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('filterStatus').style.display = currentTab === 'archive' ? 'none' : '';
      render();
    });
  });

  const STATUS_META = {
    '':         { label: 'Pendente',  cls: 'pending'  },
    'Em Curso': { label: 'Em Curso',  cls: 'progress' },
    'Feito':    { label: 'Feito',     cls: 'done'     },
  };
  const chevron = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`;

  onSnapshot(tasksRef, snap => {
    allTasks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    allTasks.sort((a, b) => (a.status === 'Feito' ? 1 : 0) - (b.status === 'Feito' ? 1 : 0));
    render();
    document.getElementById('syncDot').classList.add('online');
  }, () => showToast('Erro de ligação ao Firebase.'));

  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function deadlineInfo(dateStr, isDone) {
    if (!dateStr) return null;
    const today = new Date(); today.setHours(0,0,0,0);
    const d = new Date(dateStr + 'T00:00:00');
    const diff = Math.round((d - today) / 86400000);
    const fmt = d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
    if (isDone) return { label: fmt, cls: '' };
    if (diff < 0) return { label: fmt + ' · Atrasado', cls: 'overdue' };
    if (diff <= 3) return { label: fmt + ' · ' + (diff === 0 ? 'Hoje' : diff === 1 ? 'Amanhã' : 'Em ' + diff + ' d'), cls: 'soon' };
    return { label: fmt, cls: 'ok' };
  }

  function render() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const fA = document.getElementById('filterAssignee').value;
    const fS = document.getElementById('filterStatus').value;
    const fSActive = fS !== 'all';
    const activeTasks  = allTasks.filter(t => t.status !== 'Feito');
    const archiveTasks = allTasks.filter(t => t.status === 'Feito');
    document.getElementById('badge-active').textContent  = activeTasks.length;
    document.getElementById('badge-archive').textContent = archiveTasks.length;
    const today = new Date(); today.setHours(0,0,0,0);
    const overdue = activeTasks.filter(t => t.deadline && new Date(t.deadline+'T00:00:00') < today).length;
    document.getElementById('stat-total').textContent   = allTasks.length;
    document.getElementById('stat-pending').textContent = activeTasks.length;
    document.getElementById('stat-done').textContent    = archiveTasks.length;
    document.getElementById('stat-overdue').textContent = overdue;
    document.getElementById('filterAssignee').classList.toggle('active', !!fA);
    document.getElementById('filterStatus').classList.toggle('active', fSActive);
    const pool = currentTab === 'archive' ? archiveTasks : activeTasks;
    const filtered = pool.filter(t => {
      const matchQ = (t.client||'').toLowerCase().includes(q) || (t.task||'').toLowerCase().includes(q) || (t.notes||'').toLowerCase().includes(q);
      const assignees = Array.isArray(t.assignee) ? t.assignee : (t.assignee ? [t.assignee] : []);
      const matchA = !fA || assignees.includes(fA);
      const matchS = currentTab === 'archive' ? true : (!fSActive || (t.status || '') === fS);
      return matchQ && matchA && matchS;
    });
    const tbody = document.getElementById('tableBody');
    if (!filtered.length) {
      const msg = currentTab === 'archive'
        ? (archiveTasks.length ? 'Nenhum resultado com estes filtros.' : 'Ainda não há tarefas concluídas no arquivo.')
        : (activeTasks.length  ? 'Nenhum resultado com estes filtros.' : 'Ainda não há tarefas. Clique em "Nova Tarefa" para começar!');
      tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state">${msg}</div></td></tr>`;
      return;
    }
    tbody.innerHTML = filtered.map(t => {
      const isDone = t.status === 'Feito';
      const meta = STATUS_META[t.status || ''] || STATUS_META[''];
      const dl = deadlineInfo(t.deadline, isDone);
      const assignees = Array.isArray(t.assignee) ? t.assignee : (t.assignee ? [t.assignee] : []);
      const avatarsHTML = assignees.length
        ? `<div class="assignee-avatars">${assignees.map(a => avatarHTML(a)).join('')}</div>`
        : `<span style="color:var(--muted);font-size:0.8rem">—</span>`;
      const isOverdue = !isDone && t.deadline && new Date(t.deadline+'T00:00:00') < today;
      const rowCls = isOverdue ? 'row-overdue' : (isDone ? 'task-done' : (t.fromReport ? 'row-report' : ''));
      const actionsHTML = currentTab === 'archive'
        ? `<div class="actions">
            <button class="icon-btn orange" data-action="restore" data-id="${t.id}" title="Restaurar tarefa"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg></button>
            <button class="icon-btn red" data-action="del" data-id="${t.id}" title="Eliminar"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
          </div>`
        : `<div class="actions">
            <button class="icon-btn blue" data-action="edit" data-id="${t.id}" title="Editar"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            <button class="icon-btn red" data-action="del" data-id="${t.id}" title="Eliminar"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button>
            <div class="notes-tooltip">
              <button class="icon-btn purple" data-action="openNote" data-id="${t.id}" title="Notas" style="${t.notes ? 'background:var(--accent-dim);color:var(--accent);border-color:var(--accent);' : ''}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></button>
              ${t.notes ? `<span class="tip">${esc(t.notes)}</span>` : ''}
            </div>
          </div>`;
      return `<tr class="${rowCls}">
        <td><span class="client-name">${esc(t.client)}</span></td>
        <td><span class="task-text">${esc(t.task)}</span></td>
        <td>${avatarsHTML}</td>
        <td>${dl ? `<span class="deadline-chip ${dl.cls}">${esc(dl.label)}</span>` : '<span style="color:var(--muted)">—</span>'}</td>
        <td style="text-align:center">
          ${currentTab === 'archive'
            ? `<span class="status-btn done">${meta.label}</span>`
            : `<button class="status-btn ${meta.cls}" data-action="togglestatus" data-id="${t.id}">${meta.label} ${chevron}</button>`
          }
        </td>
        <td style="text-align:center">${actionsHTML}</td>
      </tr>`;
    }).join('');
  }

  const portal = document.getElementById('status-portal');
  function openPortal(taskId, anchor) {
    activeStatusId = taskId;
    const cur = allTasks.find(t => t.id === taskId)?.status || '';
    portal.querySelectorAll('.status-option').forEach(o => o.classList.toggle('active', o.dataset.status === cur));
    const r = anchor.getBoundingClientRect();
    portal.style.left = r.left + 'px';
    portal.style.minWidth = Math.max(r.width, 160) + 'px';
    const below = window.innerHeight - r.bottom;
    if (below >= 130) { portal.style.top = (r.bottom + 6) + 'px'; portal.style.bottom = 'auto'; }
    else { portal.style.bottom = (window.innerHeight - r.top + 6) + 'px'; portal.style.top = 'auto'; }
    portal.classList.add('open');
    setTimeout(() => document.addEventListener('click', portalOutsideClick), 0);
  }
  function portalOutsideClick(e) {
    if (!portal.contains(e.target)) {
      closePortal();
    }
  }
  function closePortal() {
    portal.classList.remove('open');
    activeStatusId = null;
    document.removeEventListener('click', portalOutsideClick);
  }

  function rpSyncStatus(task, newStatus) {
    if (!task?.fromReport) return;
    if (typeof rpData === 'undefined' || !Array.isArray(rpData)) return;
    const statusMap = { 'Feito': 'VALIDADO', 'Em Curso': 'EM CURSO', '': '' };
    const rpStatus = statusMap.hasOwnProperty(newStatus) ? statusMap[newStatus] : newStatus;
    const rpRow = rpData.find(r => r.c === task.client || (task.client && r.c && task.client.toLowerCase().includes(r.c.toLowerCase())) || (task.client && r.c && r.c.toLowerCase().includes(task.client.toLowerCase())));
    if (!rpRow) return;
    const mesIdx = RP_MESES_FULL.indexOf(task.atribMes || '');
    if (mesIdx >= 0 && rpStatus) { rpRow.m[mesIdx] = rpStatus; rpScheduleSave(); if (typeof rpRender === 'function') rpRender(); }
  }

  portal.addEventListener('click', async e => {
    const opt = e.target.closest('.status-option');
    if (!opt) return;
    const id = activeStatusId;
    const status = opt.dataset.status;
    closePortal();
    if (!id) return;
    try {
      await updateDoc(doc(db, 'tarefas', id), { status, updatedAt: serverTimestamp() });
      const task = allTasks.find(t => t.id === id);
      rpSyncStatus(task, status);
      if (status === 'Feito') {
        if (task?.createdBy) await sendEmailConcluida(task.createdBy, task.task, task.client, task.assignee, task.deadline, task.notes);
        showToast('Tarefa concluída! Movida para Arquivo ✅');
        if (task?.fromReport && typeof window.rpSyncShowFromModule === 'function') window.rpSyncShowFromModule(task);
      } else { showToast('Status atualizado!'); }
    } catch { showToast('Erro ao atualizar.'); }
  });

  document.getElementById('tableBody').addEventListener('click', async e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'togglestatus') { openPortal(id, btn); return; }
    if (action === 'edit') { openModal(id); return; }
    if (action === 'openNote') { openNoteModal(id); return; }
    if (action === 'restore') {
      try { await updateDoc(doc(db, 'tarefas', id), { status: '', updatedAt: serverTimestamp() }); showToast('Tarefa restaurada!'); }
      catch { showToast('Erro ao restaurar.'); }
      return;
    }
    if (action === 'del') openConfirmDelete(id);
  });

  function openNoteModal(id) {
    currentNoteId = id;
    const task = allTasks.find(t => t.id === id);
    if (!task) return;
    document.getElementById('noteModalTitle').textContent = 'Notas — ' + task.client;
    document.getElementById('notesText').value = task.notes || '';
    document.getElementById('notesOverlay').classList.add('open');
  }
  function closeNoteModal() { document.getElementById('notesOverlay').classList.remove('open'); currentNoteId = null; }
  document.getElementById('btnGuardarNotas').addEventListener('click', async () => {
    if (!currentNoteId) return;
    try {
      await updateDoc(doc(db, 'tarefas', currentNoteId), { notes: document.getElementById('notesText').value.trim(), updatedAt: serverTimestamp() });
      closeNoteModal(); showToast('Notas guardadas!');
    } catch { showToast('Erro ao guardar notas.'); }
  });
  document.getElementById('btnCloseNotes').addEventListener('click', closeNoteModal);
  document.getElementById('btnCancelarNotas').addEventListener('click', closeNoteModal);
  document.getElementById('notesOverlay').addEventListener('click', e => { if (e.target.id === 'notesOverlay') closeNoteModal(); });

  const assigneeTrigger = document.getElementById('assigneeTrigger');
  const assigneeMenu    = document.getElementById('assigneeMenu');
  const assigneeLabel   = document.getElementById('assigneeLabel');
  assigneeTrigger.addEventListener('click', e => { e.stopPropagation(); assigneeMenu.classList.toggle('open'); assigneeTrigger.classList.toggle('open'); });
  document.addEventListener('click', e => { if (!e.target.closest('#assigneeDropdown')) { assigneeMenu.classList.remove('open'); assigneeTrigger.classList.remove('open'); } });
  function getSelectedAssignees() { return Array.from(document.querySelectorAll('input[name="assignee"]:checked')).map(c => c.value); }
  function updateAssigneeLabel() {
    const sel = getSelectedAssignees();
    if (sel.length) { assigneeLabel.textContent = sel.join(', '); assigneeLabel.classList.add('filled'); }
    else { assigneeLabel.textContent = '— Sem responsável —'; assigneeLabel.classList.remove('filled'); }
    document.querySelectorAll('.assignee-option').forEach(opt => opt.classList.toggle('checked', opt.querySelector('input').checked));
  }
  document.querySelectorAll('input[name="assignee"]').forEach(cb => cb.addEventListener('change', updateAssigneeLabel));

  function openModal(id) {
    editId = id || null;
    closePortal();
    document.getElementById('modalTitle').textContent = id ? 'Editar Tarefa' : 'Nova Tarefa';
    document.getElementById('btnGuardar').innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${id ? 'Guardar Alterações' : 'Adicionar Tarefa'}`;
    document.querySelectorAll('input[name="assignee"]').forEach(cb => cb.checked = false);
    if (id) {
      const t = allTasks.find(x => x.id === id);
      document.getElementById('f-client').value   = t.client || '';
      document.getElementById('f-task').value     = t.task || '';
      document.getElementById('f-deadline').value = t.deadline || '';
      document.getElementById('f-notes').value    = t.notes || '';
      document.getElementById('f-creator').value  = t.createdBy || '';
      const saved = Array.isArray(t.assignee) ? t.assignee : (t.assignee ? [t.assignee] : []);
      document.querySelectorAll('input[name="assignee"]').forEach(cb => { if (saved.includes(cb.value)) cb.checked = true; });
    } else {
      ['f-client','f-task','f-deadline','f-notes','f-creator'].forEach(i => document.getElementById(i).value = '');
    }
    updateAssigneeLabel();
    document.getElementById('overlay').classList.add('open');
  }
  function closeModal() { document.getElementById('overlay').classList.remove('open'); editId = null; }

  const EMAILJS_SERVICE = 'service_6rvn33h';
  const EMAILJS_TEMPLATE = 'template_0mwhq1q';
  const EMAILJS_TEMPLATE_CONCLUIDA = 'template_brr3f3m';
  const EMAILJS_KEY = 'ZkRFx3yGH-xnC1m5e';
  const EMAILS = { 'Tiago Fachada': null, 'Tiago Pereira': null, 'Miguel Leitão': 'miguel.leitao@btocnet.com', 'Vânia Costa': null };

  async function sendEmailConcluida(creatorName, task, client, assignees, deadline, notes) {
    const to = EMAILS[creatorName];
    if (!to) return;
    const assigneeStr = Array.isArray(assignees) ? assignees.join(', ') : (assignees || '');
    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: EMAILJS_SERVICE, template_id: EMAILJS_TEMPLATE_CONCLUIDA, user_id: EMAILJS_KEY,
          template_params: { to_email: to, name: creatorName, task, client, deadline: new Date().toLocaleDateString('pt-PT',{day:'2-digit',month:'long',year:'numeric'}), notes: `Concluída por: ${assigneeStr}` } })
      });
    } catch(e) { console.warn('Email não enviado:', e); }
  }

  async function sendEmail(name, task, client, deadline, notes) {
    const to = EMAILS[name];
    if (!to) return;
    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: EMAILJS_SERVICE, template_id: EMAILJS_TEMPLATE, user_id: EMAILJS_KEY,
          template_params: { to_email: to, name, task, client, deadline: deadline || 'Sem data', notes: notes || '' } })
      });
    } catch(e) { console.warn('Email não enviado:', e); }
  }

  async function saveTask() {
    const client = document.getElementById('f-client').value.trim();
    const task   = document.getElementById('f-task').value.trim();
    if (!client || !task) { showToast('Preenche o cliente e a tarefa!'); return; }
    const btn = document.getElementById('btnGuardar');
    btn.disabled = true; btn.textContent = 'A guardar...';
    const assignees = getSelectedAssignees();
    const deadline  = document.getElementById('f-deadline').value || '';
    const creator = document.getElementById('f-creator').value;
    const data = { client, task, assignee: assignees, deadline,
      status: editId ? (allTasks.find(t => t.id === editId)?.status || '') : '',
      notes: document.getElementById('f-notes').value.trim(),
      createdBy: creator, updatedAt: serverTimestamp() };
    try {
      if (editId) {
        const prev = allTasks.find(t => t.id === editId);
        const prevA = Array.isArray(prev?.assignee) ? prev.assignee : (prev?.assignee ? [prev.assignee] : []);
        await updateDoc(doc(db, 'tarefas', editId), data);
        for (const n of assignees.filter(a => !prevA.includes(a))) await sendEmail(n, task, client, deadline, data.notes);
        showToast('Tarefa atualizada!');
      } else {
        await addDoc(tasksRef, { ...data, createdAt: serverTimestamp() });
        for (const n of assignees) await sendEmail(n, task, client, deadline, data.notes);
        showToast('Tarefa adicionada! ☁️');
      }
      closeModal();
    } catch { showToast('Erro ao guardar.'); }
    btn.disabled = false;
  }

  window.showToast = function(msg) { showToast(msg); };
  window.sendEmail = async (name, task, client, deadline, notes) => sendEmail(name, task, client, deadline, notes);
  window.rpSyncShowFromModule = (task) => { if (typeof rpSyncShow === 'function') rpSyncShow(task); };

  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg; el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
  }

  document.getElementById('btnNovaTarefa').addEventListener('click', () => openModal());
  document.getElementById('btnCloseModal').addEventListener('click', closeModal);
  document.getElementById('btnCancelar').addEventListener('click', closeModal);
  document.getElementById('btnGuardar').addEventListener('click', saveTask);
  document.getElementById('searchInput').addEventListener('input', render);
  document.getElementById('filterAssignee').addEventListener('change', render);
  document.getElementById('filterStatus').addEventListener('change', render);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closePortal(); closeModal(); closeNoteModal(); closeConfirmDelete(); } });
  window.addEventListener('scroll', closePortal, true);