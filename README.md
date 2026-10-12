# Mestre do Banco de Dados Avançado (Oracle PL/SQL) 🚀

Aplicação web interativa moderna para estudo e fixação de conceitos avançados de **Banco de Dados Oracle** e **PL/SQL**.

---

## 🌟 Funcionalidades

### 1. 📖 Área de Resumos (Teoria Interativa)
- **Módulo 01: Fundamentos de PL/SQL e Selects** (Cláusula `DISTINCT`, operadores `LIKE`, `IN`, `BETWEEN`, `IS NULL`, ordenação `ORDER BY ASC/DESC`).
- **Módulo 02: Procedures vs Functions** (Diferenças fundamentais, retorno obrigatório de Functions, sintaxes completas `CREATE OR REPLACE`).
- **Módulo 03: Controle de Fluxo e Loops** (`IF/ELSIF/ELSE`, loops `FOR 1..5`, `WHILE`, tratamento de exceções com `ZERO_DIVIDE`, `NO_DATA_FOUND`, `TOO_MANY_ROWS` e `WHEN OTHERS`).
- **Módulo 04: Triggers (Gatilhos de Banco)** (Eventos DML/DDL, `BEFORE` vs `AFTER`, pseudo-registros `:NEW` e `:OLD`, cláusula `FOR EACH ROW`).
- **Módulo 05: Sequences e Joins** (Objetos `SEQUENCE` com `NEXTVAL`/`CURRVAL`, tabela comparativa de `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`, `CROSS JOIN` e cuidados com `NATURAL JOIN`).
- **Pesquisa em tempo real:** Encontre rapidamente qualquer conceito digitando palavras-chave.
- **Códigos formatados com botão de cópia rápida.**

---

### 2. 🎯 Área de Desafios (Simulado Interativo com 30 Questões)
- **Todas as Questões na Mesma Página:** Todas as 30 perguntas ficam visíveis simultaneamente para que você responda com calma no seu próprio ritmo, como em uma prova real.
- **Rastreador de Progresso em Tempo Real:** Barra fixa no topo que contabiliza as questões respondidas (ex: *Respondidas: 18 de 30*).
- **3 Níveis de Dificuldade:**
  - 🟢 **Fácil (10 questões):** Conceitos essenciais e terminologias de Oracle PL/SQL.
  - 🟡 **Médio (10 questões):** Lógica procedural, exceções e junções de tabelas.
  - 🟣 **Difícil / Prático (10 questões):** Desafios de código e consultas SQL formatados em blocos de código (`pre`/`code`).
- **Envio do Simulado com Correção Completa:**
  - Botão **"Enviar Simulado"** no topo e no rodapé.
  - Aviso caso haja questões em branco antes de enviar.
  - Ao enviar, o sistema revela a nota global (total de acertos e erros) e exibe feedback inline na própria questão (alternativa marcada, gabarito correto e explicação pedagógica detalhada).
- **Feedback Sonoro:** Efeitos de som sintetizados via Web Audio API (com opção de desativar no cabeçalho).

---

## 📁 Estrutura de Arquivos

```
Banco-de-Dados-Avancado/
├── index.html       # Estrutura semântica HTML5 com abas e seções
├── style.css        # Estilos modernos em Vanilla CSS (Tech Blue & Dark Slate)
├── script.js        # Lógica do Quiz, banco de 30 questões e interatividades
└── README.md        # Documentação do projeto
```

---

## 🚀 Como Executar

A aplicação é puramente estática (Vanilla HTML, CSS e JavaScript), não necessitando de instalação ou dependências externas:

1. **Direto no Navegador:**
   - Dê um duplo clique no arquivo [`index.html`](file:///c:/banco%20de%20dados%20avan%C3%A7ado/Banco-de-Dados-Avancado/index.html) para abri-lo em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

2. **Via Servidor Local (Opcional):**
   ```bash
   npx serve .
   # ou
   python -m http.server 8000
   ```
   Acesse: `http://localhost:8000`