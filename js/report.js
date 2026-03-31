// ── Report

// ══════════════════════════════════════════════════════════════
// REPORT
// ══════════════════════════════════════════════════════════════
const RP_MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const RP_MESES_FULL = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const RP_CLIENTES = [
  {c:'AFTERHOUSE S.A.',f:'Mensal',m:["VALIDADO","EM CURSO","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'AI MEDICAL - FUNDO DE CAPITAL DE RISCO FECHADO',f:'Trimestral',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Alfastandard - Investments, Unipessoal Lda',f:'Supervisão',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Ask IV - Mediação de Seguros, Lda',f:'Fiscal',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'ASK Marginal',f:'Trimestral',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Ask Patrimónios - Sociedade Gestora de Patrimónios S.A.',f:'Fiscal',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Ask, S.A.',f:'Fiscal',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Associação de Futebol de Setúbal',f:'Supervisão',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'BIOSURFIT S.A. /SPINT',f:'Mensal',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'BOTAO AZUL',f:'Mensal',m:["VALIDADO","faltam documentos/inf por parte cliente","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'ENCOSTA ALTA',f:'Trimestral',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'FAI - ITÁLIA',f:'Fiscal',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Famataíde, Lda',f:'Supervisão',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'FOREST BAY, UNIPESSOAL LDA',f:'Fiscal',m:["VALIDADO","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'HIPNOSE',f:'Mensal',m:["VALIDADO","VALIDADO","","","","","","","","","",""],obs:'Falta fazer alienação',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'TOPAMBITION',f:'Mensal',m:["faltam documentos/inf por parte cliente","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'IMOSLEN, S.A.',f:'Mensal',m:["FALTA FAZER FECHO","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'ISQ - Sociedade de Capital de Risco, S.A.',f:'Fiscal',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'MELHOR ESTRATÉGIA, UNIPESSOAL LDA',f:'Mensal',m:["FALTA FAZER FECHO","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'MIND SOFTWARE MULTIMEDIA E INDUSTRIAL SA',f:'Mensal',m:["EM CURSO","","","","","","","","","","",""],obs:'falta estimativa de irc e distribuição de horas',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'MORE TASTE',f:'Mensal',m:["faltam documentos/inf por parte cliente","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'NUMERO UM - REPARAÇÃO AUTOMOVEL, SA (MIDAS)',f:'Mensal',m:["","faltam documentos/inf por parte cliente","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'OGER - SGPS, S.A.',f:'Mensal',m:["FALTA FAZER FECHO","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Outdoit Associação Combater O Cancro',f:'Fiscal',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'PACE',f:'Supervisão',m:["VALIDADO","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'PETRIN',f:'Mensal',m:["VALIDADO","","","","","","","","","","",""],obs:'Conferência Poupa Mais /Caixa Adaufe e Salários',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'PRIME YIELD',f:'Mensal',m:["ENVIADO REPORT","ENVIADO REPORT","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Radical e trivial',f:'Trimestral',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Energy Yield - Sub fundo 1',f:'Trimestral',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Energy Yield - Sub fundo 2',f:'Trimestral',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Scalepharm',f:'Fiscal',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'Sky Valet Portugal, Unipessoal, Lda',f:'Mensal',m:["ENVIADO REPORT","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'SOCIEDADE AGRICOLA DE FRUJAIS',f:'Trimestral',m:Array(12).fill(''),obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
  {c:'TOPCHALLENGE SGPS, S.A',f:'Mensal',m:["faltam documentos/inf por parte cliente","","","","","","","","","","",""],obs:'',atrib:'',atribMes:'',atribCriadoPor:'',cellData:{}},
];

const RP_DD_OPTIONS = [
  { value: '', label: 'Limpar', cls: '' },
  { value: 'VALIDADO', label: 'VALIDADO', cls: 'rp-validado' },
  { value: 'EM CURSO', label: 'EM CURSO', cls: 'rp-em-curso' },
  { value: 'ENVIADO REPORT', label: 'ENVIADO REPORT', cls: 'rp-enviado' },
  { value: 'FALTA FAZER FECHO', label: 'FALTA FAZER FECHO', cls: 'rp-falta-fecho' },
  { value: 'faltam documentos/inf por parte cliente', label: 'faltam documentos/inf', cls: 'rp-falta-doc' },
  { value: 'LANÇADO', label: 'LANÇADO', cls: 'rp-lancado' },
  { value: 'FALTA VALIDAR', label: 'FALTA VALIDAR', cls: 'rp-falta-validar' },
];

function rpFechoCls(f) {
  if (!f) return '';
  const fl = f.toLowerCase();
  if (fl === 'mensal') return 'rp-fecho-mensal';
  if (fl === 'trimestral') return 'rp-fecho-trimestral';
  if (fl === 'fiscal') return 'rp-fecho-fiscal';
  if (fl === 'supervisão' || fl === 'supervisao') return 'rp-fecho-supervisao';
  return '';
}

function rpCellHtml(val, row, mi) {
  if (!val) return '<span class="cell-empty">·</span>';
  const opt = RP_DD_OPTIONS.find(o => o.value === val);
  const cls = opt ? opt.cls : '';
  const label = opt ? opt.label : val;
  const cellData = row?.cellData?.[mi];
  const person = cellData?.pessoa ? `<br><span style="font-size:9px;color:var(--muted);font-weight:600">${cellData.pessoa}</span>` : '';
  return `<span class="rp-cell ${cls}">${label}</span>${person}`;
}

let rpData = RP_CLIENTES.map(r => ({...r}));
let rpSaveTimer = null;

function rpScheduleSave() {
  clearTimeout(rpSaveTimer);
  rpSaveTimer = setTimeout(rpSaveToFirebase, 3000);
}

async function rpSaveToFirebase() {
  try {
    const fs = await cfGetFs();
    const db = window._cfDb;
    await fs.setDoc(fs.doc(db, 'report', '2026'), { data: JSON.stringify(rpData), updatedAt: new Date().toISOString() });
  } catch(e) { console.warn('Report save failed:', e); }
}

async function rpLoadFromFirebase() {
  document.getElementById('rpStatus').textContent = '⏳ A carregar...';
  try {
    const fs = await cfGetFs();
    const db = window._cfDb;
    const snap = await fs.getDoc(fs.doc(db, 'report', '2026'));
    if (snap.exists()) {
      const loaded = JSON.parse(snap.data().data);
      rpData = RP_CLIENTES.map(r => {
        const saved = loaded.find(s => s.c === r.c);
        return saved ? {...r, m: saved.m || Array(12).fill(''), obs: saved.obs || '', atrib: saved.atrib || '', atribMes: saved.atribMes || '', atribCriadoPor: saved.atribCriadoPor || '', cellData: saved.cellData || {}} : {...r, m: Array(12).fill(''), obs: '', atrib: '', atribMes: '', atribCriadoPor: '', cellData: {}};
      });
    } else {
      await rpSaveToFirebase();
    }
    document.getElementById('rpStatus').textContent = '';
    rpRender();
  } catch(e) {
    document.getElementById('rpStatus').textContent = '⚠️ Offline';
    rpRender();
  }
}

let rpOpenDropdown = null;
function rpCloseDropdown() {
  if (rpOpenDropdown) { rpOpenDropdown.remove(); rpOpenDropdown = null; document.removeEventListener('click', rpOnDocClick); }
}
function rpOnDocClick(e) { if (!rpOpenDropdown?.contains(e.target)) rpCloseDropdown(); }

function rpGetSelectedMonths() {
  const cbs = document.querySelectorAll('.rpMesCb:checked');
  if (cbs.length === 12 || cbs.length === 0) return [0,1,2,3,4,5,6,7,8,9,10,11];
  return Array.from(cbs).map(cb => +cb.value);
}

function rpToggleMesDD() {
  const dd = document.getElementById('rpMesDD');
  dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
  if (dd.style.display === 'block') {
    setTimeout(() => document.addEventListener('click', rpMesDDOutside), 0);
  }
}

function rpMesDDOutside(e) {
  if (!document.getElementById('rpMesWrap').contains(e.target)) {
    document.getElementById('rpMesDD').style.display = 'none';
    document.removeEventListener('click', rpMesDDOutside);
  }
}

function rpMesAllToggle(cb) {
  document.querySelectorAll('.rpMesCb').forEach(c => c.checked = cb.checked);
  localStorage.setItem('btoc-rp-meses', cb.checked ? 'null' : '[]');
  rpUpdateMesLabel(); rpRender();
}

function rpMesChanged() {
  const cbs = document.querySelectorAll('.rpMesCb');
  const checked = document.querySelectorAll('.rpMesCb:checked');
  document.getElementById('rpMesAll').checked = checked.length === cbs.length;
  const selected = Array.from(checked).map(c => +c.value);
  localStorage.setItem('btoc-rp-meses', JSON.stringify(selected.length === 12 ? null : selected));
  rpUpdateMesLabel(); rpRender();
}

function rpUpdateMesLabel() {
  const checked = Array.from(document.querySelectorAll('.rpMesCb:checked'));
  const label = document.getElementById('rpMesBtnLabel');
  if (checked.length === 0 || checked.length === 12) label.textContent = 'Todos os meses';
  else if (checked.length === 1) label.textContent = RP_MESES_FULL[+checked[0].value];
  else label.textContent = checked.length + ' meses';
}

function rpRender() {
  const q = document.getElementById('rpSearch').value.toLowerCase();
  const miList = rpGetSelectedMonths();
  const rows = rpData.filter(r => !q || r.c.toLowerCase().includes(q));
  const thead = document.querySelector('#rpTable thead');
  const tbody = document.querySelector('#rpTable tbody');
  thead.innerHTML = `<tr>
    <th style="min-width:220px">Cliente</th>
    <th style="min-width:90px;text-align:center">Fecho</th>
    ${miList.map(i => `<th class="month-col" style="min-width:130px;text-align:center">${RP_MESES[i]}</th>`).join('')}
    <th style="min-width:150px">Observações</th>
  </tr>`;
  if (!rows.length) { tbody.innerHTML = `<tr><td colspan="${2 + miList.length + 1}" style="text-align:center;color:var(--muted);padding:20px">Sem resultados</td></tr>`; return; }
  tbody.innerHTML = rows.map((r) => {
    const realIdx = rpData.indexOf(r);
    return `<tr>
      <td style="font-size:12px;font-weight:600">${r.c}</td>
      <td style="text-align:center"><span class="rp-fecho ${rpFechoCls(r.f)}">${r.f}</span></td>
      ${miList.map(mi => `<td class="cell-edit" style="text-align:center;border-left:1px solid #ddd" onclick="rpOpenCellModal(${realIdx},${mi})">${rpCellHtml(r.m[mi], r, mi)}</td>`).join('')}
      <td style="font-size:11px;color:var(--text);min-width:180px;cursor:pointer;border-left:2px solid var(--border)" onclick="rpOpenObs(${realIdx})" title="Clique para editar"><span style="color:${r.obs ? 'var(--text)' : 'var(--muted)'}">${r.obs || '＋ Adicionar nota'}</span></td>
    </tr>`;
  }).join('');
}

document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.page === 'report' && rpData.every(r => r.m.every(v => !v))) rpLoadFromFirebase();
  });
});

(function() {
  const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const saved = localStorage.getItem('btoc-rp-meses');
  const savedArr = saved ? JSON.parse(saved) : null;
  const list = document.getElementById('rpMesCbList');
  list.innerHTML = meses.map((m,i) => {
    const isChecked = savedArr ? savedArr.includes(i) : true;
    return '<label style="display:flex;align-items:center;gap:8px;padding:7px 14px;cursor:pointer;font-size:13px;"><input type="checkbox" class="rpMesCb" value="' + i + '"' + (isChecked ? ' checked' : '') + ' onchange="rpMesChanged()"> ' + m + '</label>';
  }).join('');
  const checkedCount = savedArr ? savedArr.length : 12;
  document.getElementById('rpMesAll').checked = checkedCount === 12;
  rpUpdateMesLabel();
})();
rpRender();

let rpAtribIdx = null;
function rpOpenAtrib(idx) {
  rpAtribIdx = idx;
  const r = rpData[idx];
  document.getElementById('rpAtribClient').textContent = r.c;
  document.getElementById('rpAtribPessoa').value = r.atrib || '';
  document.getElementById('rpAtribCriadoPor').value = r.atribCriadoPor || '';
  document.getElementById('rpAtribMes').value = r.atribMes || '';
  document.getElementById('rpAtribOverlay').style.display = 'flex';
}
function rpCloseAtrib() { document.getElementById('rpAtribOverlay').style.display = 'none'; rpAtribIdx = null; }
async function rpSaveAtrib() {
  if (rpAtribIdx === null) return;
  const savedIdx = rpAtribIdx;
  const pessoa = document.getElementById('rpAtribPessoa').value;
  const criadoPor = document.getElementById('rpAtribCriadoPor').value;
  const mes = document.getElementById('rpAtribMes').value;
  rpData[savedIdx].atrib = pessoa;
  rpData[savedIdx].atribCriadoPor = criadoPor;
  rpData[savedIdx].atribMes = mes;
  rpCloseAtrib(); rpRender(); rpScheduleSave();
  if (pessoa && mes) {
    try {
      const r = rpData[savedIdx];
      const mesIdx = RP_MESES_FULL.indexOf(mes);
      const mesVal = mesIdx >= 0 ? r.m[mesIdx] : '';
      const taskLabel = mesVal ? `${mesVal} - ${mes}` : `Report ${mes}`;
      const fs = await cfGetFs();
      const db = window._cfDb;
      await fs.addDoc(fs.collection(db, 'tarefas'), {
        client: r.c, task: taskLabel, assignee: [pessoa], deadline: '', status: '', notes: '',
        createdBy: criadoPor, fromReport: true, atribMes: mes,
        createdAt: fs.serverTimestamp(), updatedAt: fs.serverTimestamp()
      });
      if (typeof showToast === 'function') showToast('✅ Tarefa "' + taskLabel + '" criada!');
    } catch(e) { console.error('Erro ao criar tarefa:', e); }
  }
}
document.getElementById('rpAtribOverlay').addEventListener('click', e => { if (e.target === document.getElementById('rpAtribOverlay')) rpCloseAtrib(); });

let rpSyncTask = null, rpSyncVal = null;
function rpSyncShow(task) {
  rpSyncTask = task; rpSyncVal = null;
  document.getElementById('rpSyncSubtitle').textContent = (task?.client || '') + (task?.atribMes ? ' · ' + task.atribMes : '');
  document.querySelectorAll('.rp-sync-opt').forEach(o => o.style.outline = 'none');
  document.getElementById('rpSyncOverlay').style.display = 'flex';
}
function rpSyncClose() { document.getElementById('rpSyncOverlay').style.display = 'none'; rpSyncTask = null; rpSyncVal = null; }
function rpSyncSave() {
  if (!rpSyncTask || !rpSyncVal) { rpSyncClose(); return; }
  const rpRow = rpData.find(r => r.c === rpSyncTask.client || (rpSyncTask.client && r.c && rpSyncTask.client.toLowerCase().includes(r.c.toLowerCase())) || (rpSyncTask.client && r.c && r.c.toLowerCase().includes(rpSyncTask.client.toLowerCase())));
  if (rpRow) {
    const mesIdx = RP_MESES_FULL.indexOf(rpSyncTask.atribMes || '');
    if (mesIdx >= 0) { rpRow.m[mesIdx] = rpSyncVal; rpScheduleSave(); rpRender(); }
  }
  rpSyncClose();
}
function rpSyncInitListeners() {
  const overlay = document.getElementById('rpSyncOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) rpSyncClose(); });
  overlay.querySelectorAll('.rp-sync-opt').forEach(o => {
    o.addEventListener('click', () => {
      rpSyncVal = o.dataset.val;
      overlay.querySelectorAll('.rp-sync-opt').forEach(x => x.style.outline = 'none');
      o.style.outline = '2px solid var(--accent)';
    });
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rpSyncInitListeners);
else setTimeout(rpSyncInitListeners, 0);

let rpCellIdx = null, rpCellMi = null, rpCellVal = null;
function rpOpenCellModal(idx, mi) {
  rpCellIdx = idx; rpCellMi = mi;
  const r = rpData[idx];
  const cellData = r.cellData?.[mi] || {};
  rpCellVal = null;
  document.getElementById('rpCellTitle').textContent = RP_MESES_FULL[mi];
  document.getElementById('rpCellSubtitle').textContent = r.c;
  document.getElementById('rpCellPessoa').value = cellData.pessoa || '';
  document.getElementById('rpCellCriadoPor').value = cellData.criadoPor || '';
  document.querySelectorAll('.rp-cell-opt').forEach(o => { o.style.outline = o.dataset.val === rpCellVal ? '2px solid var(--accent)' : 'none'; });
  document.getElementById('rpCellOverlay').style.display = 'flex';
}
function rpCloseCellModal() { document.getElementById('rpCellOverlay').style.display = 'none'; rpCellIdx = null; rpCellMi = null; }
async function rpSaveCellModal() {
  if (rpCellIdx === null) return;
  const idx = rpCellIdx, mi = rpCellMi;
  const pessoa = document.getElementById('rpCellPessoa').value;
  const criadoPor = document.getElementById('rpCellCriadoPor').value;
  if (rpCellVal !== null) rpData[idx].m[mi] = rpCellVal;
  if (!rpData[idx].cellData) rpData[idx].cellData = {};
  rpData[idx].cellData[mi] = { pessoa, criadoPor };
  rpCloseCellModal(); rpRender();
  await rpSaveToFirebase();
  if (pessoa && rpCellVal) {
    try {
      const r = rpData[idx];
      const fs = await cfGetFs();
      const db = window._cfDb;
      await fs.addDoc(fs.collection(db, 'tarefas'), {
        client: r.c, task: rpCellVal + ' - ' + RP_MESES_FULL[mi],
        assignee: [pessoa], deadline: '', status: '', notes: '',
        createdBy: criadoPor, fromReport: true, atribMes: RP_MESES_FULL[mi],
        createdAt: fs.serverTimestamp(), updatedAt: fs.serverTimestamp()
      });
      if (typeof window.showToast === 'function') window.showToast('✅ Tarefa criada para ' + pessoa + '!');
    } catch(e) { console.warn('Erro ao criar tarefa:', e); }
  }
}
document.getElementById('rpCellOverlay').addEventListener('click', e => { if (e.target === document.getElementById('rpCellOverlay')) rpCloseCellModal(); });
document.querySelectorAll('.rp-cell-opt').forEach(o => {
  o.addEventListener('click', () => {
    rpCellVal = o.dataset.val;
    document.querySelectorAll('.rp-cell-opt').forEach(x => x.style.outline = 'none');
    o.style.outline = '2px solid var(--accent)';
  });
});

let rpObsIdx = null;
function rpOpenObs(idx) {
  rpObsIdx = idx;
  const r = rpData[idx];
  document.getElementById('rpObsTitle').textContent = 'Observações';
  document.getElementById('rpObsClient').textContent = r.c;
  document.getElementById('rpObsText').value = r.obs || '';
  document.getElementById('rpObsOverlay').style.display = 'flex';
  setTimeout(() => document.getElementById('rpObsText').focus(), 50);
}
function rpCloseObs() { document.getElementById('rpObsOverlay').style.display = 'none'; rpObsIdx = null; }
function rpSaveObs() {
  if (rpObsIdx === null) return;
  rpData[rpObsIdx].obs = document.getElementById('rpObsText').value.trim();
  rpCloseObs(); rpRender(); rpScheduleSave();
}
document.getElementById('rpObsOverlay').addEventListener('click', e => { if (e.target === document.getElementById('rpObsOverlay')) rpCloseObs(); });