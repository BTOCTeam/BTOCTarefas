*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #fafafa;
  --surface: #ffffff;
  --surface2: #f4f4f5;
  --border: #e4e4e7;
  --border2: #d4d4d8;
  --accent: #18181b;
  --accent2: #27272a;
  --accent-dim: rgba(24, 24, 27, 0.08);
  --green: #059669;
  --red: #dc2626;
  --orange: #d97706;
  --yellow: #ca8a04;
  --text: #09090b;
  --muted: #71717a;
  --done-text: #a1a1aa;
  --shadow: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.1);
  --overlay-bg: rgba(9, 9, 11, 0.5);
  --cf-bg: #fafafa;
  --cf-surface: #ffffff;
  --cf-surface2: #f4f4f5;
  --cf-border: #e4e4e7;
  --cf-border2: #d4d4d8;
  --cf-text: #09090b;
  --cf-muted: #71717a;
  --cf-accent: #18181b;
  --cf-accent2: #27272a;
  --cf-green: #059669;
  --cf-green-bg: #ecfdf5;
  --cf-red: #dc2626;
  --cf-red-bg: #fef2f2;
  --cf-yellow: #d97706;
  --cf-yellow-bg: #fffbeb;
  --cf-blue: #2563eb;
  --cf-blue-bg: #eff6ff;
  --cf-gray: #71717a;
  --cf-gray-bg: #f4f4f5;
}

[data-theme="dark"] {
  --bg: #09090b;
  --surface: #18181b;
  --surface2: #27272a;
  --border: #3f3f46;
  --border2: #52525b;
  --accent: #fafafa;
  --accent2: #e4e4e7;
  --accent-dim: rgba(250, 250, 250, 0.1);
  --green: #34d399;
  --red: #f87171;
  --orange: #fb923c;
  --yellow: #fbbf24;
  --text: #fafafa;
  --muted: #a1a1aa;
  --done-text: #52525b;
  --shadow: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.4);
  --overlay-bg: rgba(0, 0, 0, 0.7);
  --cf-bg: #09090b;
  --cf-surface: #18181b;
  --cf-surface2: #27272a;
  --cf-border: #3f3f46;
  --cf-border2: #52525b;
  --cf-text: #fafafa;
  --cf-muted: #a1a1aa;
  --cf-accent: #fafafa;
  --cf-accent2: #e4e4e7;
  --cf-green: #34d399;
  --cf-green-bg: #064e3b;
  --cf-red: #f87171;
  --cf-red-bg: #450a0a;
  --cf-yellow: #fbbf24;
  --cf-yellow-bg: #451a03;
  --cf-blue: #60a5fa;
  --cf-blue-bg: #1e3a8a;
  --cf-gray: #a1a1aa;
  --cf-gray-bg: #27272a;
}

body {
  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  transition: background 0.2s, color 0.2s;
  line-height: 1.5;
}

/* Navigation */
.top-nav {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 56px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-brand img {
  height: 32px !important;
  width: auto !important;
}

.nav-logo {
  width: 32px;
  height: 32px;
  background: var(--accent);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Chivo', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: var(--bg);
}

.nav-title {
  font-family: 'Chivo', sans-serif;
  font-weight: 900;
  font-size: 1.1rem;
  letter-spacing: -0.03em;
  color: var(--text);
}

.nav-tabs {
  display: flex;
  align-items: stretch;
  gap: 0;
  height: 56px;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.25rem;
  height: 100%;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
}

.nav-tab:hover { color: var(--text); }
.nav-tab.active {
  color: var(--text);
  border-bottom-color: var(--text);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sync-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--yellow);
}

.sync-dot.online {
  background: var(--green);
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
}

.dark-toggle {
  width: 40px;
  height: 22px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 11px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.dark-toggle::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--muted);
  top: 2px;
  left: 2px;
  transition: all 0.2s;
}

[data-theme="dark"] .dark-toggle {
  background: var(--accent);
  border-color: var(--accent);
}

[data-theme="dark"] .dark-toggle::after {
  transform: translateX(18px);
  background: var(--bg);
}

.toggle-label {
  display: flex;
  align-items: center;
  color: var(--muted);
}

/* Pages */
.page { display: none; }
.page.active { display: block; }

/* Tarefas Page */
.tarefas-wrap {
  padding: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Stats Bar */
.stats-bar {
  display: flex;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.stat {
  flex: 1;
  background: var(--surface);
  padding: 1rem 1.25rem;
}

.stat-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-family: 'Chivo', sans-serif;
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--text);
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 6px;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.15s;
}

.tab:hover { background: var(--surface); }
.tab.active {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
}

.tab-badge {
  background: var(--surface2);
  color: var(--muted);
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
}

.tab.active .tab-badge {
  background: var(--accent);
  color: var(--bg);
}

/* Toolbar */
.toolbar {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-bar {
  flex: 1;
  min-width: 200px;
  max-width: 360px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 1rem;
  height: 38px;
}

.search-bar input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-family: inherit;
  font-size: 0.8125rem;
}

.search-bar input::placeholder { color: var(--muted); }

.filter-select {
  height: 38px;
  padding: 0 2rem 0 0.875rem;
  font-size: 0.8125rem;
  font-family: inherit;
  font-weight: 500;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 0.75rem center;
  color: var(--text);
  cursor: pointer;
  outline: none;
  appearance: none;
}

.filter-select.active {
  border-color: var(--accent);
  background-color: var(--accent-dim);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: 38px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: all 0.15s;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg);
}

.btn-primary:hover {
  background: var(--accent2);
}

.btn-ghost {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-ghost:hover {
  background: var(--surface2);
}

.btn-danger {
  background: var(--cf-red-bg);
  color: var(--red);
  border: 1px solid #fca5a5;
}

.btn-danger:hover {
  background: var(--red);
  color: white;
}

/* Table */
.table-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  padding: 0.75rem 1rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-align: left;
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
}

tbody tr {
  border-top: 1px solid var(--border);
}

tbody tr:first-child {
  border-top: none;
}

tbody tr:hover {
  background: var(--surface2);
}

td {
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  vertical-align: middle;
  color: var(--text);
}

.client-name {
  font-weight: 600;
}

.task-text {
  color: var(--muted);
}

.task-done .client-name,
.task-done .task-text {
  color: var(--done-text);
  text-decoration: line-through;
}

/* Assignee Avatars */
.assignee-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 700;
  color: white;
  margin: 0 -4px;
  border: 2px solid var(--surface);
}

.assignee-avatars {
  display: flex;
  align-items: center;
  padding-left: 4px;
}

.av-tf { background: #6366f1; }
.av-tp { background: #f97316; }
.av-ml { background: #10b981; }
.av-vc { background: #ec4899; }
.av-xx { background: #6b7280; }

/* Deadline Chip */
.deadline-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  background: var(--surface2);
  color: var(--muted);
  border: 1px solid var(--border);
}

.deadline-chip.overdue {
  background: var(--cf-red-bg);
  border-color: #fca5a5;
  color: var(--red);
}

.deadline-chip.soon {
  background: var(--cf-yellow-bg);
  border-color: #fcd34d;
  color: var(--orange);
}

.deadline-chip.ok {
  background: var(--cf-green-bg);
  border-color: #6ee7b7;
  color: var(--green);
}

/* Row States */
tbody tr.row-overdue {
  background: rgba(220, 38, 38, 0.03);
}

tbody tr.row-overdue:hover {
  background: rgba(220, 38, 38, 0.06);
}

tbody tr.row-report {
  background: rgba(37, 99, 235, 0.03);
}

tbody tr.row-report td:first-child {
  border-left: 3px solid var(--cf-blue);
}

tbody tr.row-report:hover {
  background: rgba(37, 99, 235, 0.06);
}

/* Status Button */
.status-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid;
  font-family: inherit;
}

.status-btn:hover {
  filter: brightness(0.95);
}

.status-btn.pending {
  background: var(--cf-yellow-bg);
  color: var(--orange);
  border-color: #fcd34d;
}

.status-btn.done {
  background: var(--cf-green-bg);
  color: var(--green);
  border-color: #6ee7b7;
}

.status-btn.progress {
  background: var(--cf-blue-bg);
  color: var(--cf-blue);
  border-color: #93c5fd;
}

/* Action Buttons */
.actions {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  transition: all 0.15s;
}

.icon-btn:hover {
  background: var(--surface2);
  color: var(--text);
}

.icon-btn.blue:hover { background: var(--cf-blue-bg); color: var(--cf-blue); border-color: #93c5fd; }
.icon-btn.red:hover { background: var(--cf-red-bg); color: var(--red); border-color: #fca5a5; }
.icon-btn.green:hover { background: var(--cf-green-bg); color: var(--green); border-color: #6ee7b7; }
.icon-btn.purple:hover { background: #f3e8ff; color: #9333ea; border-color: #c4b5fd; }
.icon-btn.orange:hover { background: var(--cf-yellow-bg); color: var(--orange); border-color: #fcd34d; }

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--muted);
}

/* Status Portal */
#status-portal {
  position: fixed;
  z-index: 9999;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  min-width: 160px;
  overflow: hidden;
  display: none;
}

#status-portal.open {
  display: block;
}

.status-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text);
  font-family: inherit;
}

.status-option:hover {
  background: var(--surface2);
}

.status-option.active {
  background: var(--accent-dim);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot-pending { background: var(--orange); }
.dot-progress { background: var(--cf-blue); }
.dot-done { background: var(--green); }

/* Modals */
.overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay-bg);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.overlay.open {
  opacity: 1;
  pointer-events: all;
}

.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  transform: translateY(20px);
  transition: transform 0.2s;
}

.overlay.open .modal {
  transform: translateY(0);
}

.modal-header {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
}

.modal-header h2 {
  font-family: 'Chivo', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.375rem;
}

.field input,
.field textarea,
.field select {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.625rem 0.875rem;
  color: var(--text);
  font-family: inherit;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.15s;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: var(--accent);
  background: var(--surface);
}

.modal-footer {
  padding: 1rem 1.5rem;
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid var(--border);
}

.modal-footer .btn {
  flex: 1;
  justify-content: center;
}

/* Confirm Modal */
.confirm-modal {
  max-width: 400px;
}

.confirm-icon {
  width: 48px;
  height: 48px;
  background: var(--cf-red-bg);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: var(--red);
}

.confirm-body {
  text-align: center;
  padding: 1.5rem;
}

.confirm-body h3 {
  font-family: 'Chivo', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.confirm-body p {
  color: var(--muted);
  font-size: 0.875rem;
}

.confirm-body .task-preview {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 1rem 0;
  text-align: left;
  font-size: 0.8125rem;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: var(--accent);
  color: var(--bg);
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s;
  z-index: 9998;
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}

/* Notes Tooltip */
.notes-tooltip {
  position: relative;
}

.notes-tooltip .tip {
  visibility: hidden;
  opacity: 0;
  background: var(--accent);
  color: var(--bg);
  font-size: 0.75rem;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  z-index: 50;
  transition: opacity 0.15s;
}

.notes-tooltip:hover .tip {
  visibility: visible;
  opacity: 1;
}

/* Assignee Dropdown */
.assignee-dropdown {
  position: relative;
}

.assignee-trigger {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.625rem 0.875rem;
  color: var(--text);
  font-family: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
}

.assignee-trigger:hover,
.assignee-trigger.open {
  border-color: var(--accent);
  background: var(--surface);
}

.assignee-trigger .trigger-label {
  color: var(--muted);
}

.assignee-trigger .trigger-label.filled {
  color: var(--text);
  font-weight: 500;
}

.assignee-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: var(--shadow-lg);
  z-index: 10;
  overflow: hidden;
  display: none;
}

.assignee-menu.open {
  display: block;
}

.assignee-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text);
}

.assignee-option:hover {
  background: var(--surface2);
}

.assignee-option input[type="checkbox"] {
  accent-color: var(--accent);
  width: 14px;
  height: 14px;
}

.assignee-option.checked {
  background: var(--accent-dim);
}

/* ========== CONTROLO FISCAL STYLES ========== */

.cf-wrap {
  padding: 1.5rem;
  max-width: 1800px;
  margin: 0 auto;
}

.cf-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  width: fit-content;
  min-width: 100%;
}

.cf-stat {
  background: var(--surface);
  padding: 1rem 1.25rem;
}

.cf-stat-label {
  font-size: 0.6875rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.cf-stat-val {
  font-family: 'Chivo', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
}

.cf-stat-val.green { color: var(--green); }
.cf-stat-val.red { color: var(--red); }
.cf-stat-val.blue { color: var(--cf-blue); }
.cf-stat-val.yellow { color: var(--orange); }

/* Section Tabs */
.cf-sections {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding: 0.375rem;
  background: var(--surface2);
  border-radius: 8px;
}

.cf-sec-btn {
  padding: 0.5rem 0.875rem;
  border-radius: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted);
  font-family: inherit;
  transition: all 0.15s;
  white-space: nowrap;
}

.cf-sec-btn:hover {
  color: var(--text);
}

.cf-sec-btn.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.cf-section-info {
  font-size: 0.8125rem;
  color: var(--muted);
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
}

/* CF Controls */
.cf-controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  align-items: center;
}

.cf-controls input,
.cf-controls select {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: inherit;
  font-size: 0.8125rem;
  padding: 0 0.75rem;
  border-radius: 6px;
  height: 36px;
  outline: none;
}

.cf-controls input {
  width: 220px;
}

.cf-controls input:focus,
.cf-controls select:focus {
  border-color: var(--accent);
}

.cf-btn {
  padding: 0 1rem;
  height: 36px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text);
  font-family: inherit;
  transition: all 0.15s;
}

.cf-btn:hover {
  background: var(--surface2);
}

.cf-btn-add {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}

.cf-btn-add:hover {
  background: var(--accent2);
}

.cf-btn-sm {
  font-size: 0.75rem;
  padding: 0 0.5rem;
  height: 28px;
}

/* CF Table */
.cf-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.cf-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  min-width: 900px;
}

.cf-table th {
  background: var(--surface2);
  padding: 0.75rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.6875rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.cf-table th.month-col {
  text-align: center;
  border-left: 1px solid var(--border);
}

.cf-table td {
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
  color: var(--text);
}

.cf-table td.cell-edit {
  text-align: center;
  border-left: 1px solid var(--border);
}

.cf-table tr:last-child td {
  border-bottom: none;
}

.cf-table tr:hover td {
  background: var(--surface2);
}

/* Sticky columns */
#cfTable td:nth-child(1),
#cfTable td:nth-child(2),
#cfTable td:nth-child(3) {
  background: var(--surface);
}

#cfTable th:nth-child(1),
#cfTable th:nth-child(2),
#cfTable th:nth-child(3) {
  background: var(--surface2);
}

#rpTable td:nth-child(1),
#rpTable td:nth-child(2) {
  background: var(--surface);
}

#rpTable th:nth-child(1),
#rpTable th:nth-child(2) {
  background: var(--surface2);
}

.cf-table tr:hover #cfTable td:nth-child(1),
.cf-table tr:hover #cfTable td:nth-child(2),
.cf-table tr:hover #cfTable td:nth-child(3),
.cf-table tr:hover #rpTable td:nth-child(1),
.cf-table tr:hover #rpTable td:nth-child(2) {
  background: var(--surface2);
}

/* Badges */
.cf-badge {
  display: inline-block;
  padding: 0.1875rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  white-space: nowrap;
}

.b-mensal {
  background: #dbeafe;
  color: #1e40af;
}

.b-trimestral {
  background: #fef3c7;
  color: #92400e;
}

.b-isento {
  background: var(--surface2);
  color: var(--muted);
  border: 1px solid var(--border);
}

.b-outro {
  background: #fce7f3;
  color: #9d174d;
}

.group-tag {
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  background: var(--surface2);
  color: var(--muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Cell Status */
.cell-ok {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--cf-green-bg);
  color: var(--green);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}

.cell-falta {
  background: var(--cf-red-bg);
  color: var(--red);
  border-radius: 4px;
  padding: 0.125rem 0.375rem;
  font-size: 0.625rem;
  font-weight: 600;
}

.cell-na {
  color: var(--muted);
  font-size: 0.75rem;
}

.cell-outro {
  background: var(--cf-yellow-bg);
  color: var(--orange);
  border-radius: 4px;
  padding: 0.125rem 0.375rem;
  font-size: 0.625rem;
  font-weight: 600;
}

.cell-empty {
  color: var(--muted);
  font-size: 1rem;
}

.cell-edit {
  cursor: pointer;
}

.cell-edit:hover .cell-empty {
  color: var(--text);
}

/* Report Status Badges */
.rp-fecho {
  display: inline-block;
  padding: 0.1875rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  white-space: nowrap;
}

.rp-fecho-mensal { background: #dbeafe; color: #1e40af; }
.rp-fecho-trimestral { background: #fef3c7; color: #92400e; }
.rp-fecho-fiscal { background: #e0e7ff; color: #3730a3; }
.rp-fecho-supervisao { background: #fae8ff; color: #86198f; }

[data-theme="dark"] .rp-fecho-mensal { background: #1e3a8a; color: #93c5fd; }
[data-theme="dark"] .rp-fecho-trimestral { background: #451a03; color: #fcd34d; }
[data-theme="dark"] .rp-fecho-fiscal { background: #312e81; color: #a5b4fc; }
[data-theme="dark"] .rp-fecho-supervisao { background: #701a75; color: #f0abfc; }

.rp-cell {
  display: inline-block;
  padding: 0.1875rem 0.375rem;
  border-radius: 3px;
  font-size: 0.625rem;
  font-weight: 700;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.rp-validado { background: var(--cf-green-bg); color: var(--green); }
.rp-em-curso { background: var(--cf-blue-bg); color: var(--cf-blue); }
.rp-enviado { background: #f3e8ff; color: #7c3aed; }
.rp-falta-fecho { background: var(--cf-red-bg); color: var(--red); }
.rp-falta-doc { background: var(--cf-yellow-bg); color: var(--orange); }
.rp-lancado { background: #dcfce7; color: #15803d; }
.rp-falta-validar { background: #fff7ed; color: #c2410c; }

[data-theme="dark"] .rp-validado { background: #064e3b; color: #6ee7b7; }
[data-theme="dark"] .rp-em-curso { background: #1e3a8a; color: #93c5fd; }
[data-theme="dark"] .rp-enviado { background: #4c1d95; color: #c4b5fd; }
[data-theme="dark"] .rp-falta-fecho { background: #450a0a; color: #fca5a5; }
[data-theme="dark"] .rp-falta-doc { background: #451a03; color: #fcd34d; }
[data-theme="dark"] .rp-lancado { background: #052e16; color: #86efac; }
[data-theme="dark"] .rp-falta-validar { background: #431407; color: #fdba74; }

/* CF Dropdown */
.cf-dropdown {
  position: fixed;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  min-width: 165px;
  overflow: hidden;
}

.cf-dd-header {
  padding: 0.5rem 0.75rem;
  font-size: 0.625rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
}

.cf-dd-item {
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
}

.cf-dd-item:hover {
  background: var(--surface2);
}

.cf-dd-item.selected {
  color: var(--cf-blue);
  font-weight: 600;
}

.cf-dd-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* CF Modal */
.cf-modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--overlay-bg);
  z-index: 200;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.cf-modal-overlay.open {
  display: flex;
}

.cf-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  width: 480px;
  max-width: 96vw;
  max-height: 90vh;
  overflow-y: auto;
}

.cf-modal h3 {
  font-family: 'Chivo', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--text);
}

.cf-modal label {
  font-size: 0.6875rem;
  color: var(--muted);
  display: block;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
}

.cf-modal input,
.cf-modal select,
.cf-modal textarea {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: inherit;
  font-size: 0.875rem;
  padding: 0.625rem 0.75rem;
  border-radius: 6px;
  outline: none;
  margin-bottom: 1rem;
}

.cf-modal input:focus,
.cf-modal select:focus {
  border-color: var(--accent);
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.month-grid > div label {
  font-size: 0.625rem;
}

.month-grid > div select {
  font-size: 0.75rem;
  padding: 0.375rem 0.5rem;
  height: 32px;
  margin-bottom: 0;
}

.modal-btns {
  display: flex;
  gap: 0.5rem;
}

/* Year indicator */
:root:not([data-theme="dark"]) #page-controlo.year-2025 {
  background: #fef3c7;
}

[data-theme="dark"] #page-controlo.year-2025 {
  background: #1c1917;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-tabs { gap: 0; }
  .nav-tab { padding: 0 0.75rem; font-size: 0.75rem; }
  .cf-stats { grid-template-columns: 1fr 1fr; }
  .cf-wrap { padding: 1rem; }
  .stats-bar { flex-wrap: wrap; }
  .stat { flex: 1 1 calc(50% - 0.5px); }
}