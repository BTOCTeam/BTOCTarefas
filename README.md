# BTOC TEAM

Ferramenta interna de gestão de tarefas e controlo fiscal.

## Estrutura

```
btoc-team/
├── index.html          ← HTML principal
├── css/
│   └── styles.css      ← Todos os estilos
├── js/
│   ├── app.js          ← Navegação, dark mode
│   ├── controlo.js     ← Lógica do Controlo Fiscal
│   ├── report.js       ← Lógica do Report
│   └── firebase.js     ← Firebase + lógica das Tarefas
└── data/
    └── cf-data-2026.js ← Dados base do Controlo Fiscal 2026
```

## Como actualizar os dados anuais

1. No início de cada ano, duplicar `data/cf-data-2026.js` → `data/cf-data-2027.js`
2. Actualizar o `cfRawData` com os novos clientes/estados
3. Em `index.html`, mudar a linha:
   ```html
   <script src="data/cf-data-2026.js"></script>
   ```
   para:
   ```html
   <script src="data/cf-data-2027.js"></script>
   ```
4. Em `js/controlo.js`, actualizar o `cfYearSelect` para incluir 2027

## Tecnologias

- Firebase Firestore (base de dados em tempo real)
- EmailJS (notificações por email)
- GitHub Pages (alojamento gratuito)
