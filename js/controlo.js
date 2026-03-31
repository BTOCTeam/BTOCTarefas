// ── Controlo Fiscal — lógica

// ══════════════════════════════════════════════════════════════
// CONTROLO FISCAL — dados 2026 (atualizados via Livro1.xlsx)
// ══════════════════════════════════════════════════════════════
const CF_MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const CF_MESES_FULL = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const CF_ESTADOS = ['','Submetido','Entregue','Inexistência','Falta validação','GOFF','N/A (-)','Aplicável','Não aplicável','Em curso'];

const CF_SECTIONS_META = {
  'IVA Declaração': 'Declaração periódica de IVA — clientes com obrigação de entrega mensal ou trimestral.',
  'IVA IN': 'IVA de clientes IN — entidades com obrigação de entrega de IVA (clientes internos).',
  'Dec. Recapitulativa IVA': 'Declaração Recapitulativa de IVA — obrigações de entrega mensal ou trimestral.',
  'Retenções / DMIS': 'Retenções na Fonte e DMIS — controlo mensal de submissão.',
  'SAFT Vendas': 'SAFT Vendas — até dia 5 de cada mês.',
  'Modelo 10': 'Modelo 10 — declaração anual de rendimentos. Validação e submissão AT.',
  'Seg. Social Ind.': 'Segurança Social Independentes — controlo mensal.',
  'COPE': 'COPE — até dia 20 de cada mês.',
  'Pag. por Conta': 'Pagamentos por Conta e Adicional por Conta — prazos trimestrais.',
  'Modelo 30': 'Modelo 30 — obrigações declarativas.',
  'Modelo 39': 'Modelo 39 — até 29 de Fevereiro.',
  'Inventários': 'Comunicação de Inventários — até 31/01/2027.',
  'Inquéritos INE': 'Inquéritos INE — INTRASAT e ITENF.',
};

// ══════════════════════════════════════════════════════
// cfRawData ATUALIZADO — Controlo Fiscal 2026
// Fonte: Livro1.xlsx (Controlo Fiscal 2026)
// ══════════════════════════════════════════════════════

let cfActiveSection = 'IVA Declaração';
let cfData = {};
Object.keys(cfRawData).forEach(s => { cfData[s] = cfRawData[s].map(r => r.m ? ({...r, m:[...r.m]}) : ({...r, pc:[...(r.pc||[])], pac:[...(r.pac||[])]})); });

function cfInitSections() {
  const c = document.getElementById('cfSections');
  c.innerHTML = '';
  Object.keys(cfData).forEach(s => {
    const b = document.createElement('button');
    b.className = 'cf-sec-btn' + (s === cfActiveSection ? ' active' : '');
    b.textContent = s;
    b.onclick = () => { cfActiveSection = s; cfInitSections(); cfPopulateFilters(); cfRender(); };
    c.appendChild(b);
  });
}

function cfPopulateFilters() {
  const rows = cfData[cfActiveSection];
  const tf = document.getElementById('cfTipoFilter');
  const tv = tf.value;
  tf.innerHTML = '<option value="">Todas as tipologias</option>';
  const ts = new Set();
  rows.forEach(r => { if(r.t) ts.add(r.t); });
  ts.forEach(t => { const o = document.createElement('option'); o.value = t; o.textContent = t; tf.appendChild(o); });
  tf.value = tv;
}

function cfGetFiltered() {
  const q = document.getElementById('cfSearch').value.toLowerCase();
  const tf = document.getElementById('cfTipoFilter').value;
  return cfData[cfActiveSection].map((r, i) => ({...r, _idx: i})).filter(r => {
    if (q && !r.c.toLowerCase().includes(q)) return false;
    if (tf && r.t !== tf) return false;
    return true;
  });
}

function cfGetStatMonth() {
  const el = document.getElementById('cfStatMonth');
  return el ? el.value : '';
}

const CF_ANNUAL_SECTIONS = ['Modelo 39', 'Inventários'];
const PPC_STAT_LABELS = ['Jul (31/07)', 'Set (30/09)', 'Dez (15/12)'];

function cfCalcStats(miList) {
  const rows = cfData[cfActiveSection];
  if (cfActiveSection === 'Pag. por Conta') return { sub: 0, pend: 0 };
  if (CF_ANNUAL_SECTIONS.includes(cfActiveSection)) {
    let sub = 0, pend = 0;
    rows.forEach(r => {
      const v = (r.m || [])[0];
      if (v && v !== '') sub++; else pend++;
    });
    return { sub, pend };
  }
  let sub = 0, pend = 0;
  const trimesterEnd = [2, 5, 8, 11];
  rows.forEach(r => {
    if (!r.m) return;
    const isTrimestral = r.t && r.t.toLowerCase().includes('trimestral');
    miList.forEach(mi => {
      if (isTrimestral && !trimesterEnd.includes(mi)) return;
      const v = r.m[mi];
      const vl = (v || '').toLowerCase();
      if (v === 'Submetido' || v === 'Entregue' || v === 'GOFF' || vl.includes('aplicável') || vl.startsWith('validado') || vl.includes('falta enviar doc') || vl.includes('inexist') || v === 'Não tem.' || v === 'não tem') sub++;
      else if (!v || v === '') pend++;
    });
  });
  return { sub, pend };
}

function cfCalcStatsPPC() {
  const rows = cfData['Pag. por Conta'];
  return PPC_STAT_LABELS.map((label, i) => {
    let pc_sub = 0, pc_pend = 0, pac_sub = 0, pac_pend = 0;
    rows.forEach(r => {
      const vpc = (r.pc || [])[i];
      const vpac = (r.pac || [])[i];
      if (vpc && vpc !== '' && vpc !== 'N/A') pc_sub++; else pc_pend++;
      if (vpac && vpac !== '' && vpac !== 'N/A') pac_sub++; else pac_pend++;
    });
    return { label, pc_sub, pc_pend, pac_sub, pac_pend };
  });
}

function cfRenderStats() {
  const rows = cfData[cfActiveSection];
  const total = rows.length;
  const isPPC = cfActiveSection === 'Pag. por Conta';
  const isAnnual = CF_ANNUAL_SECTIONS.includes(cfActiveSection);

  // Toggle selectores: mês normal vs datas PPC vs nada
  const monthSel = document.getElementById('cfStatMonth');
  const ppcSel   = document.getElementById('cfStatPPC');
  const monthWrap = document.getElementById('cfMonthSelWrap');
  const ppcWrap   = document.getElementById('cfPPCSelWrap');
  if (monthWrap) monthWrap.style.display = (!isPPC && !isAnnual) ? 'flex' : 'none';
  if (ppcWrap)   ppcWrap.style.display   = isPPC ? 'flex' : 'none';

  const statsDiv = document.getElementById('cfStats');
  statsDiv.innerHTML = ''; statsDiv.style.display = 'none';

  if (isPPC) {
    const selIdx = ppcSel ? ppcSel.value : '';
    const cards = [];
    if (selIdx !== '') {
      const s = cfCalcStatsPPC()[+selIdx];
      // Linha 1: Data + Clientes (já no cards[])
      // Linha 2: 4 cards a span toda a largura
      const row2 = `<div style="grid-column:1/-1;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border-top:1px solid var(--border);">
        <div class="cf-stat"><div class="cf-stat-label">PC · Submetidos</div><div class="cf-stat-val green">${s.pc_sub}</div></div>
        <div class="cf-stat"><div class="cf-stat-label">PC · Por fazer</div><div class="cf-stat-val red">${s.pc_pend}</div></div>
        <div class="cf-stat"><div class="cf-stat-label">PAC · Submetidos</div><div class="cf-stat-val green">${s.pac_sub}</div></div>
        <div class="cf-stat"><div class="cf-stat-label">PAC · Por fazer</div><div class="cf-stat-val red">${s.pac_pend}</div></div>
      </div>`;
      cards.push(row2);
      statsDiv.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
      statsDiv.style.gridTemplateColumns = 'repeat(2, auto)';
    }
    if (cards.length) { statsDiv.style.display = ''; statsDiv.insertAdjacentHTML('beforeend', cards.join('')); }
    document.getElementById('cfSectionInfo').textContent = CF_SECTIONS_META[cfActiveSection] || '';
    return;
  }

  const sm = (!isAnnual && cfGetStatMonth() !== '') ? cfGetStatMonth() : '';
  const miList = sm !== '' ? [+sm] : [0,1,2,3,4,5,6,7,8,9,10,11];
  const { sub, pend } = cfCalcStats(miList);
  const mesLabel = sm !== '' ? CF_MESES_FULL[+sm] : null;
  const subLabel = isAnnual ? 'Concluídos · Anual' : ('Submetidos/OK' + (mesLabel ? ' · ' + mesLabel : ''));
  const pendLabel = isAnnual ? 'Por concluir · Anual' : ('Por entregar' + (mesLabel ? ' · ' + mesLabel : ''));
  const cards = [

    '<div class="cf-stat"><div class="cf-stat-label">' + subLabel + '</div><div class="cf-stat-val green">' + sub + '</div></div>',
    '<div class="cf-stat"><div class="cf-stat-label">' + pendLabel + '</div><div class="cf-stat-val red">' + pend + '</div></div>',
  ];
  if (cards.length) { statsDiv.style.display = ''; statsDiv.style.gridTemplateColumns = `repeat(${cards.length}, auto)`; statsDiv.insertAdjacentHTML('beforeend', cards.join('')); }
  document.getElementById('cfSectionInfo').textContent = CF_SECTIONS_META[cfActiveSection] || '';
}

function cfCellHtml(v) {
  if (!v) return `<span class="cell-empty">·</span>`;
  const vl = v.toLowerCase();
  if (v === 'Submetido' || v === 'Entregue' || v === 'GOFF' || vl.startsWith('validado') || vl.includes('falta enviar doc')) return `<span class="cell-ok">${v}</span>`;
  if (v === 'Não tem.' || v === 'não tem') return `<span style="background:#dcfce7;color:#16a34a;border:1px solid #86efac;border-radius:4px;padding:1px 6px;font-size:10px;display:inline-block;font-weight:500;">Não tem</span>`;
  if (vl === 'podem avançar') return `<span style="background:#fff7ed;color:#f97316;border:1px solid #fed7aa;border-radius:4px;padding:1px 6px;font-size:10px;display:inline-block;white-space:nowrap;font-weight:500;">${v}</span>`;
  if (vl === 'falta validação') return `<span style="background:#fefce8;color:#ca8a04;border:1px solid #fde047;border-radius:4px;padding:1px 6px;font-size:10px;display:inline-block;white-space:nowrap;font-weight:500;">${v}</span>`;
  if (vl === 'enviado email') return `<span style="background:#eff6ff;color:#3b82f6;border:1px solid #bfdbfe;border-radius:4px;padding:1px 6px;font-size:10px;display:inline-block;white-space:nowrap;font-weight:500;">${v}</span>`;
  if (vl.includes('sem dados') || vl.includes('falta')) return `<span class="cell-falta">${v}</span>`;
  if (vl.includes('inexist') || vl.includes('inesxist')) return `<span class="cell-outro">Inexist.</span>`;
  if (v === '-' || vl.includes('n/a') || vl.includes('não aplicável')) return `<span class="cell-na">—</span>`;
  if (vl.includes('aplicável')) return `<span class="cell-ok">${v}</span>`;
  return `<span style="font-size:10px;color:var(--muted)">${v}</span>`;
}

function cfTipoBadge(t) {
  if (!t || t === '-') return '<span style="color:var(--muted)">—</span>';
  const tl = t.toLowerCase();
  if (tl === 'mensal') return `<span class="cf-badge b-mensal">Mensal</span>`;
  if (tl === 'trimestral') return `<span class="cf-badge b-trimestral">Trimestral</span>`;
  if (tl.includes('isento')) return `<span class="cf-badge b-isento">Isento IVA</span>`;
  if (tl.includes('cessação')) return `<span class="cf-badge b-isento">Cessação</span>`;
  return `<span class="cf-badge b-outro">${t.length > 22 ? t.substring(0,22)+'…' : t}</span>`;
}

const PPC_LABELS = ['Jul (31/07)', 'Set (30/09)', 'Dez (15/12)'];

function cfRender() {
  cfRenderStats();
  const rows = cfGetFiltered();
  const mf = document.getElementById('cfMesFilter').value;
  const miList = mf !== '' ? [+mf] : [0,1,2,3,4,5,6,7,8,9,10,11];
  const thead = document.querySelector('#cfTable thead');
  const tbody = document.querySelector('#cfTable tbody');
  const isPPC = cfActiveSection === 'Pag. por Conta';
  const isInventarios = cfActiveSection === 'Inventários';

  if (isPPC) {
    thead.innerHTML = `<tr>
      <th style="min-width:180px">Cliente</th>
      <th style="min-width:60px">Grupo</th>
      <th style="min-width:100px">Tipologia</th>
      <th colspan="3" style="text-align:center;border-left:2px solid var(--accent);background:rgba(109,74,255,0.08);color:var(--accent);font-size:10px;letter-spacing:0.08em;">PAG. POR CONTA</th>
      <th colspan="3" style="text-align:center;border-left:2px solid #0ea5e9;background:rgba(14,165,233,0.08);color:#0ea5e9;font-size:10px;letter-spacing:0.08em;">PAG. ADICIONAL POR CONTA</th>
      <th style="min-width:40px"></th>
    </tr><tr>
      <th></th><th></th><th></th>
      ${PPC_LABELS.map(l => `<th class="month-col" style="min-width:90px;border-left:1px solid var(--border)">${l}</th>`).join('')}
      ${PPC_LABELS.map((l,i) => `<th class="month-col" style="min-width:90px;border-left:${i===0?'2px solid #0ea5e9':'1px solid var(--border)'}">${l}</th>`).join('')}
      <th></th>
    </tr>`;
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;color:var(--muted);padding:20px">Sem resultados</td></tr>`; return; }
    tbody.innerHTML = rows.map(r => `<tr>
      <td style="max-width:200px;font-size:12px">${r.c}</td>
      <td><span class="group-tag">${r.g || '—'}</span></td>
      <td>${cfTipoBadge(r.t)}</td>
      ${(r.pc||['','','']).map((v,i) => `<td class="cell-edit" style="text-align:center;border-left:${i===0?'2px solid var(--accent)':'1px solid var(--border)'}" onclick="ppcEditCell(${r._idx},'pc',${i},this)">${cfCellHtml(v)}</td>`).join('')}
      ${(r.pac||['','','']).map((v,i) => `<td class="cell-edit" style="text-align:center;border-left:${i===0?'2px solid #0ea5e9':'1px solid var(--border)'}" onclick="ppcEditCell(${r._idx},'pac',${i},this)">${cfCellHtml(v)}</td>`).join('')}
      <td><button class="cf-btn cf-btn-sm" onclick="cfEditEntry(${r._idx})">✎</button></td>
    </tr>`).join('');
    return;
  }

  if (isInventarios) {
    thead.innerHTML = `<tr>
      <th style="min-width:220px">Cliente</th>
      <th style="min-width:80px">Quem comunica?</th>
      <th style="min-width:120px;text-align:center">Verificação</th>
      <th style="min-width:40px"></th>
    </tr>`;
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:20px">Sem resultados</td></tr>`; return; }
    tbody.innerHTML = rows.map(r => `<tr>
      <td style="max-width:220px;font-size:12px">${r.c}</td>
      <td><span class="group-tag">${r.g || '—'}</span></td>
      <td class="cell-edit" style="text-align:center" onclick="cfEditCell(${r._idx},0,this)">${cfCellHtml((r.m||[])[0])}</td>
      <td><button class="cf-btn cf-btn-sm" onclick="cfEditEntry(${r._idx})">✎</button></td>
    </tr>`).join('');
    return;
  }

  if (cfActiveSection === 'Modelo 39') {
    thead.innerHTML = `<tr>
      <th style="min-width:220px">Cliente</th>
      <th style="min-width:80px">Grupo</th>
      <th style="min-width:140px;text-align:center;border-left:1px solid var(--border)">AT</th>
      <th style="min-width:40px"></th>
    </tr>`;
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:20px">Sem resultados</td></tr>`; return; }
    tbody.innerHTML = rows.map(r => `<tr>
      <td style="max-width:220px;font-size:12px">${r.c}</td>
      <td><span class="group-tag">${r.g || '—'}</span></td>
      <td class="cell-edit" style="text-align:center;border-left:1px solid var(--border)" onclick="cfEditCell(${r._idx},0,this)">${cfCellHtml((r.m||[])[0])}</td>
      <td><button class="cf-btn cf-btn-sm" onclick="cfEditEntry(${r._idx})">✎</button></td>
    </tr>`).join('');
    return;
  }

  thead.innerHTML = `<tr>
    <th style="min-width:180px">Cliente</th>
    <th style="min-width:60px">Grupo</th>
    <th style="min-width:90px">Tipologia</th>
    ${miList.map(i => `<th class="month-col" style="min-width:72px">${CF_MESES[i]}</th>`).join('')}
    <th style="min-width:50px"></th>
  </tr>`;
  if (!rows.length) { tbody.innerHTML = `<tr><td colspan="${3 + miList.length + 1}" style="text-align:center;color:var(--muted);padding:20px">Sem resultados</td></tr>`; return; }
  tbody.innerHTML = rows.map(r => `<tr>
    <td style="max-width:200px;font-size:12px">${r.c}</td>
    <td><span class="group-tag">${r.g || '—'}</span></td>
    <td>${cfTipoBadge(r.t)}</td>
    ${(() => {
      const isTrimestral = r.t && r.t.toLowerCase().includes('trimestral');
      if (!isTrimestral) {
        return miList.map(mi => `<td class="cell-edit" onclick="cfEditCell(${r._idx},${mi},this)">${cfCellHtml((r.m||[])[mi])}</td>`).join('');
      }
      let cells = '', i = 0;
      while (i < miList.length) {
        const mi = miList[i];
        const trimStart = Math.floor(mi / 3) * 3;
        const trimEnd = trimStart + 2;
        let span = 0, j = i;
        while (j < miList.length && miList[j] <= trimEnd) { span++; j++; }
        const val = r.m ? r.m[mi] : '';
        cells += `<td class="cell-edit" colspan="${span}" style="text-align:center" onclick="cfEditCell(${r._idx},${mi},this)">${cfCellHtml(val)}</td>`;
        i += span;
      }
      return cells;
    })()}
    <td><button class="cf-btn cf-btn-sm" onclick="cfEditEntry(${r._idx})">✎</button></td>
  </tr>`).join('');
}

let cfOpenDropdown = null;
function cfCloseDropdown() {
  if (cfOpenDropdown) { cfOpenDropdown.remove(); cfOpenDropdown = null; }
  document.removeEventListener('click', cfOnDocClick);
}
function cfOnDocClick(e) { if (cfOpenDropdown && !cfOpenDropdown.contains(e.target)) cfCloseDropdown(); }

const CF_DD_OPTIONS = [
  { value: '', label: 'Limpar', color: 'var(--border2)' },
  { value: 'Submetido', label: 'Submetido', color: 'var(--cf-green)' },
  { value: 'Inexistência', label: 'Inexistência', color: 'var(--cf-yellow)' },
  { value: 'N/A', label: 'N/A', color: 'var(--cf-gray)' },
  { value: 'Falta verificação', label: 'Falta verificação', color: 'var(--cf-red)' },
];
const CF_DD_OPTIONS_IVA = [
  { value: '', label: 'Limpar', color: 'var(--border2)' },
  { value: 'N/A', label: 'N/A', color: 'var(--cf-gray)' },
  { value: 'Podem avançar', label: 'Podem avançar', color: '#f97316' },
  { value: 'Falta validação', label: 'Falta validação', color: '#eab308' },
  { value: 'enviado email', label: 'enviado email', color: '#3b82f6' },
  { value: 'Submetido, falta enviar DOC', label: 'Submetido, falta enviar DOC', color: '#4ade80' },
  { value: 'Submetido', label: 'Submetido', color: 'var(--cf-green)' },
];
const CF_DD_OPTIONS_DEC_RECAP = [
  { value: '', label: 'Limpar', color: 'var(--border2)' },
  { value: 'Submetido', label: 'Submetido', color: 'var(--cf-green)' },
  { value: 'Não tem.', label: 'Não tem', color: 'var(--cf-green)' },
  { value: 'N/A', label: 'N/A', color: 'var(--cf-gray)' },
  { value: 'Falta verificação', label: 'Falta verificação', color: 'var(--cf-red)' },
];

function cfDropdownPosition(dd, triggerEl) {
  const rect = triggerEl.getBoundingClientRect();
  const ddRect = dd.getBoundingClientRect();
  const ddH = ddRect.height || 300;
  const ddW = ddRect.width || 180;
  let top = rect.bottom + 4;
  let left = rect.left;
  if (left + ddW > window.innerWidth - 8) left = window.innerWidth - ddW - 8;
  if (left < 4) left = 4;
  if (top + ddH > window.innerHeight - 8) top = rect.top - ddH - 4;
  if (top < 4) top = 4;
  dd.style.top = top + 'px';
  dd.style.left = left + 'px';
}

function cfGetTrimesterMonths(mi) { const t = Math.floor(mi / 3); return [t*3, t*3+1, t*3+2]; }

function ppcEditCell(idx, field, i, tdEl) {
  cfCloseDropdown();
  const cur = (cfData['Pag. por Conta'][idx][field] || ['','',''])[i];
  const dd = document.createElement('div');
  dd.className = 'cf-dropdown';
  const hdr = document.createElement('div');
  hdr.className = 'cf-dd-header';
  hdr.textContent = (field === 'pc' ? 'Pag. por Conta' : 'Pag. Adicional') + ' · ' + PPC_LABELS[i];
  dd.appendChild(hdr);
  CF_DD_OPTIONS.forEach(opt => {
    const item = document.createElement('div');
    item.className = 'cf-dd-item' + (cur === opt.value ? ' selected' : '');
    const dot = document.createElement('span');
    dot.className = 'cf-dd-dot';
    dot.style.background = opt.color;
    item.appendChild(dot);
    item.appendChild(document.createTextNode(opt.label || '—'));
    item.onclick = (e) => {
      e.stopPropagation();
      if (!cfData['Pag. por Conta'][idx][field]) cfData['Pag. por Conta'][idx][field] = ['','',''];
      cfData['Pag. por Conta'][idx][field][i] = opt.value;
      cfCloseDropdown(); cfRender(); cfScheduleSave();
    };
    dd.appendChild(item);
  });
  document.body.appendChild(dd);
  cfOpenDropdown = dd;
  requestAnimationFrame(() => cfDropdownPosition(dd, tdEl));
  setTimeout(() => document.addEventListener('click', cfOnDocClick), 0);
}

function cfEditCell(idx, mi, tdEl) {
  cfCloseDropdown();
  const row = cfData[cfActiveSection][idx];
  const cur = (row.m || [])[mi];
  const isTrimestral = row.t && row.t.toLowerCase().includes('trimestral');
  const affectedMonths = isTrimestral ? cfGetTrimesterMonths(mi) : [mi];
  const dd = document.createElement('div');
  dd.className = 'cf-dropdown';
  const hdr = document.createElement('div');
  hdr.className = 'cf-dd-header';
  hdr.textContent = isTrimestral ? affectedMonths.map(m => CF_MESES_FULL[m]).join(' · ') : CF_MESES_FULL[mi];
  dd.appendChild(hdr);
  const opts = cfActiveSection === 'IVA Declaração' ? CF_DD_OPTIONS_IVA : cfActiveSection === 'Dec. Recapitulativa IVA' ? CF_DD_OPTIONS_DEC_RECAP : CF_DD_OPTIONS;
  opts.forEach(opt => {
    const item = document.createElement('div');
    item.className = 'cf-dd-item' + (cur === opt.value ? ' selected' : '');
    const dot = document.createElement('span');
    dot.className = 'cf-dd-dot';
    dot.style.background = opt.color;
    item.appendChild(dot);
    item.appendChild(document.createTextNode(opt.label || '—'));
    item.onclick = (e) => {
      e.stopPropagation();
      if (cfData[cfActiveSection][idx].m) affectedMonths.forEach(m => { cfData[cfActiveSection][idx].m[m] = opt.value; });
      cfCloseDropdown(); cfRender(); cfScheduleSave();
    };
    dd.appendChild(item);
  });
  document.body.appendChild(dd);
  cfOpenDropdown = dd;
  requestAnimationFrame(() => cfDropdownPosition(dd, tdEl));
  setTimeout(() => document.addEventListener('click', cfOnDocClick), 0);
}

function cfBuildMonthGrid(r) {
  const div = document.getElementById('cfMonthGrid');
  div.innerHTML = CF_MESES.map((m, i) => `<div>
    <label>${m}</label>
    <select id="cfmf${i}">
      ${CF_ESTADOS.map(e => `<option value="${e}"${(r.m||[])[i]===e?' selected':''}>${e||'—'}</option>`).join('')}
      ${r.m && !CF_ESTADOS.includes(r.m[i]) && r.m[i] ? `<option value="${r.m[i]}" selected>${r.m[i]}</option>` : ''}
    </select>
  </div>`).join('');
}

function cfOpenAdd() {
  document.getElementById('cfEditIdx').value = -1;
  document.getElementById('cfModalTitle').textContent = 'Adicionar — ' + cfActiveSection;
  document.getElementById('cfCliente').value = '';
  document.getElementById('cfGrupo').value = '';
  document.getElementById('cfTipo').value = '';
  document.getElementById('cfDeleteBtn').style.display = 'none';
  cfBuildMonthGrid({m: Array(12).fill('')});
  document.getElementById('cfModalOverlay').classList.add('open');
}

function cfEditEntry(idx) {
  const r = cfData[cfActiveSection][idx];
  document.getElementById('cfEditIdx').value = idx;
  document.getElementById('cfModalTitle').textContent = 'Editar — ' + r.c;
  document.getElementById('cfCliente').value = r.c;
  document.getElementById('cfGrupo').value = r.g;
  document.getElementById('cfTipo').value = r.t;
  document.getElementById('cfDeleteBtn').style.display = 'inline-block';
  cfBuildMonthGrid(r);
  document.getElementById('cfModalOverlay').classList.add('open');
}

function cfSaveEntry() {
  const idx = +document.getElementById('cfEditIdx').value;
  const entry = {
    c: document.getElementById('cfCliente').value.trim(),
    g: document.getElementById('cfGrupo').value.trim(),
    t: document.getElementById('cfTipo').value.trim(),
    m: CF_MESES.map((_, i) => document.getElementById('cfmf'+i).value)
  };
  if (!entry.c) { alert('O nome do cliente é obrigatório.'); return; }
  if (idx === -1) cfData[cfActiveSection].push(entry);
  else cfData[cfActiveSection][idx] = entry;
  cfCloseModal(); cfPopulateFilters(); cfRender(); cfScheduleSave();
}

function cfDeleteEntry() {
  const idx = +document.getElementById('cfEditIdx').value;
  if (idx < 0) return;
  if (confirm('Eliminar esta linha?')) {
    cfData[cfActiveSection].splice(idx, 1);
    cfCloseModal(); cfPopulateFilters(); cfRender();
  }
}

function cfCloseModal() { document.getElementById('cfModalOverlay').classList.remove('open'); }
document.getElementById('cfModalOverlay').onclick = e => { if(e.target === document.getElementById('cfModalOverlay')) cfCloseModal(); };

function cfExportCSV() {
  const rows = cfData[cfActiveSection];
  const header = ['Cliente','Grupo','Tipologia',...CF_MESES_FULL].join(';');
  const lines = rows.map(r => [r.c,r.g,r.t,...(r.m||r.pc||[])].map(v => `"${v}"`).join(';'));
  const csv = [header,...lines].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent('\uFEFF'+csv);
  a.download = cfActiveSection.replace(/\W+/g,'_') + '_2026.csv';
  a.click();
}

// ── Year management
let cfActiveYear = 2026;
const cfData2026 = cfData;
let cfData2025 = null;

async function cfGetFs() {
  for (let i = 0; i < 50; i++) {
    if (window._cfFs) return window._cfFs;
    await new Promise(r => setTimeout(r, 100));
  }
  throw new Error('Firebase não disponível');
}

async function cfSetYear(year) {
  if (cfActiveYear === year) return;
  cfActiveYear = year;
  document.getElementById('cfYearSelect').value = String(year);
  const page = document.getElementById('page-controlo');
  page.classList.remove('year-2025','year-2026');
  page.classList.add('year-' + year);
  if (year === 2026) {
    cfData = cfData2026;
    document.getElementById('cfYearStatus').textContent = '';
    cfInitSections(); cfPopulateFilters(); cfRender(); cfRenderStats();
  } else {
    document.getElementById('cfYearStatus').textContent = '⏳ A carregar...';
    cfLoadYear2025();
  }
}

async function cfSaveYearToFirebase(year) {
  try {
    const fs = await cfGetFs();
    const db = window._cfDb;
    const payload = {};
    Object.keys(cfData).forEach(section => { payload[section] = cfData[section]; });
    await fs.setDoc(fs.doc(db, 'controloFiscal', String(year)), { data: JSON.stringify(payload), updatedAt: new Date().toISOString() });
  } catch(e) { console.warn('Erro ao guardar:', e); }
}

async function cfLoadYear2025() {
  try {
    const fs = await cfGetFs();
    const db = window._cfDb;
    const snap = await fs.getDoc(fs.doc(db, 'controloFiscal', '2025'));
    if (snap.exists()) {
      cfData2025 = JSON.parse(snap.data().data);
    } else {
      cfData2025 = {};
      await fs.setDoc(fs.doc(db, 'controloFiscal', '2025'), { data: JSON.stringify(cfData2025), updatedAt: new Date().toISOString() });
    }
    cfData = cfData2025;
    document.getElementById('cfYearStatus').textContent = '';
    cfInitSections(); cfPopulateFilters(); cfRender();
  } catch(e) {
    cfData2025 = {};
    cfData = cfData2025;
    document.getElementById('cfYearStatus').textContent = '⚠️ Offline';
    cfInitSections(); cfPopulateFilters(); cfRender();
  }
}

let cfSaveTimer = null;
function cfScheduleSave() {
  clearTimeout(cfSaveTimer);
  cfSaveTimer = setTimeout(() => cfSaveYearToFirebase(cfActiveYear), 3000);
}

document.getElementById('page-controlo').classList.add('year-2026');

async function cfLoadYear2026() {
  cfInitSections(); cfPopulateFilters(); cfRender();
  document.getElementById('cfStatMonth').value = String((new Date().getMonth() + 11) % 12);
  cfRenderStats();
  try {
    const fs = await cfGetFs();
    const db = window._cfDb;
    const snap = await fs.getDoc(fs.doc(db, 'controloFiscal', '2026'));
    if (snap.exists()) {
      const loaded = JSON.parse(snap.data().data);
      Object.keys(loaded).forEach(section => {
        if (cfData2026[section]) cfData2026[section] = loaded[section];
      });
      cfRender(); cfRenderStats();
    } else {
      await cfSaveYearToFirebase(2026);
    }
  } catch(e) { console.warn('2026 Firebase load failed, using local:', e); }
}
cfLoadYear2026();