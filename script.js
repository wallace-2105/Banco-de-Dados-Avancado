/**
 * ==============================================================================
 * MESTRE DO BANCO DE DADOS AVANÇADO (Oracle PL/SQL) - script.js
 * Lógica do Quiz Interativo, Accordion da Teoria, Web Audio API e Filtros
 * ==============================================================================
 */

// ==========================================
// 1. BANCO DE DADOS DAS 30 QUESTÕES DO QUIZ
// ==========================================
const QUIZ_QUESTIONS = [
  // --- NÍVEL FÁCIL (1 a 10) ---
  {
    id: 1,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "1. O que é PL/SQL?",
    options: [
      "Extensão da linguagem SQL da Oracle que inclui linguagem procedural",
      "Um banco de dados não-relacional (NoSQL) concorrente do MongoDB",
      "Um protocolo de rede para conexões criptografadas ao Oracle Cloud",
      "Uma biblioteca frontend JavaScript para manipulação de tabelas HTML"
    ],
    correct: 0,
    explanation: "PL/SQL (Procedural Language/SQL) é a extensão da Oracle que adiciona construções procedurais clássicas (como loops, ifs, variáveis e tratamento de exceções) à linguagem SQL padrão.",
    isCode: false
  },
  {
    id: 2,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "2. Qual comando é usado para eliminar valores duplicados no resultado de um SELECT?",
    options: [
      "UNIQUE ROW",
      "DISTINCT",
      "NO_DUPLICATE",
      "GROUP ALL"
    ],
    correct: 1,
    explanation: "A cláusula DISTINCT filtra o conjunto retornado por uma instrução SELECT, garantindo que apenas registros com combinações exclusivas de colunas sejam exibidos.",
    isCode: false
  },
  {
    id: 3,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "3. Qual a principal diferença entre Procedure e Function?",
    options: [
      "A Procedure não aceita parâmetros de entrada (IN), enquanto a Function aceita",
      "A Function só pode ser executada por administradores com privilégio SYSDBA",
      "A Function deve obrigatoriamente retornar um valor único, a Procedure não",
      "A Procedure não permite transações DML (INSERT/UPDATE), enquanto a Function permite"
    ],
    correct: 2,
    explanation: "Uma Function é projetada para calcular e obrigatoriamente retornar um valor único através da cláusula RETURN, enquanto uma Procedure realiza tarefas operacionais sem a obrigação de retornar valores diretamente.",
    isCode: false
  },
  {
    id: 4,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "4. O que faz o operador LIKE '%Silva%' em uma consulta?",
    options: [
      "Localiza valores que contenham a palavra Silva em qualquer parte do texto",
      "Localiza apenas registros que começam exatamente com a palavra 'Silva'",
      "Localiza apenas registros que terminam com a palavra 'Silva'",
      "Localiza registros onde 'Silva' tenha exatamente 5 caracteres e sem espaços"
    ],
    correct: 0,
    explanation: "O caractere coringa '%' representa zero ou mais caracteres arbitrários. Posicionado antes e depois ('%Silva%'), indica busca em qualquer posição do campo de texto.",
    isCode: false
  },
  {
    id: 5,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "5. Para que serve o objeto SEQUENCE no Oracle?",
    options: [
      "Para definir a ordem física de armazenamento das tabelas em disco",
      "Para gerar números sequenciais parametrizados, comumente para chaves primárias",
      "Para criar filas de mensageria assíncronas entre sessões ativas",
      "Para ordenar automaticamente os resultados de todas as consultas sem ORDER BY"
    ],
    correct: 1,
    explanation: "As Sequences são geradores independentes de números inteiros sequenciais (incrementais ou decrementais), largamente usados para preencher chaves primárias (PKs) de forma concorrente e segura.",
    isCode: false
  },
  {
    id: 6,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "6. Qual tipo de Join deve ser usado quando queremos APENAS os registros que possuem coincidência em ambas as tabelas?",
    options: [
      "LEFT OUTER JOIN",
      "FULL OUTER JOIN",
      "INNER JOIN",
      "CROSS JOIN"
    ],
    correct: 2,
    explanation: "O INNER JOIN retorna estritamente a interseção entre duas tabelas, descartando qualquer linha que não possua correspondência de chave em ambas as partes.",
    isCode: false
  },
  {
    id: 7,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "7. Na linguagem PL/SQL, em qual bloco ocorre o tratamento de erros?",
    options: [
      "CATCH",
      "EXCEPTION",
      "DECLARE",
      "ERROR_HANDLER"
    ],
    correct: 1,
    explanation: "O bloco EXCEPTION é a seção reservada no final de blocos anônimos, procedures e functions para interceptar e tratar exceções pré-definidas ou customizadas.",
    isCode: false
  },
  {
    id: 8,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "8. O que faz o comando NEXTVAL ao trabalhar com Sequences?",
    options: [
      "Retorna o valor atual da sequência sem incrementá-la",
      "Redefine a sequência de volta ao valor de START WITH",
      "Gera e retorna o próximo valor da sequência",
      "Exclui da memória o valor anterior alocado em cache"
    ],
    correct: 2,
    explanation: "A pseudo-coluna NEXTVAL avança a sequência conforme o INCREMENT BY configurado e retorna o novo número sequencial gerado para a sessão.",
    isCode: false
  },
  {
    id: 9,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "9. Em qual situação um TRIGGER pode ser acionado?",
    options: [
      "Apenas manualmente chamando a instrução EXECUTE TRIGGER",
      "Automaticamente de acordo com eventos DML, DDL ou de Banco de Dados",
      "Exclusivamente durante operações de backup (RMAN)",
      "Apenas quando ocorre falha crítica e o banco entra em modo recovery"
    ],
    correct: 1,
    explanation: "Triggers são procedimentos disparados implicitamente pelo Oracle Engine em resposta a operações DML (INSERT, UPDATE, DELETE), instruções DDL (CREATE, DROP) ou eventos de sistema (LOGON, STARTUP).",
    isCode: false
  },
  {
    id: 10,
    level: "easy",
    levelLabel: "Nível Fácil",
    question: "10. O que significa criar um 'Alias' (apelido) para uma tabela ou coluna?",
    options: [
      "Alterar fisicamente o nome do objeto no catálogo de tabelas (RENAME)",
      "Criar um sinônimo público persistente para todos os usuários",
      "Renomear temporariamente a coluna/tabela no resultado do select para evitar ambiguidades",
      "Duplicar os dados da tabela em uma partição de memória SGA temporária"
    ],
    correct: 2,
    explanation: "Um Alias fornece um identificador temporário de conveniência em consultas SQL para desambiguar colunas homônimas em junções e encurtar nomes de tabelas na escrita do código.",
    isCode: false
  },

  // --- NÍVEL MÉDIO (11 a 20) ---
  {
    id: 11,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "11. Qual exceção é gerada quando um SELECT INTO retorna mais de uma linha quando apenas uma era esperada?",
    options: [
      "NO_DATA_FOUND",
      "TOO_MANY_ROWS",
      "VALUE_ERROR",
      "CURSOR_ALREADY_OPEN"
    ],
    correct: 1,
    explanation: "A instrução 'SELECT ... INTO' requer o retorno de exatamente 1 registro escalar. Se retornar 2 ou mais registros, o Oracle dispara imediatamente a exceção pré-definida TOO_MANY_ROWS (ORA-01422).",
    isCode: false
  },
  {
    id: 12,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "12. Qual a sintaxe correta para iterar de 1 a 5 usando FOR no PL/SQL?",
    options: [
      "FOR v_counter IN 1..5 LOOP",
      "FOR (int i = 1; i <= 5; i++) LOOP",
      "FOREACH v_counter FROM 1 TO 5 DO",
      "FOR v_counter BETWEEN 1 AND 5 REPEAT"
    ],
    correct: 0,
    explanation: "A sintaxe padrão do loop numérico em PL/SQL é 'FOR variavel_contador IN limite_inferior..limite_superior LOOP ... END LOOP;'. A variável de controle é declarada implicitamente.",
    isCode: false
  },
  {
    id: 13,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "13. Qual a diferença prática entre o LEFT JOIN e o RIGHT JOIN?",
    options: [
      "O Left prioriza todos os registros da primeira tabela declarada, o Right prioriza a segunda",
      "O Left Join só é compatível com colunas numéricas e o Right com colunas de texto",
      "O Right Join não aceita valores nulos na cláusula ON, enquanto o Left aceita",
      "O Left Join realiza ordenação automática dos dados, enquanto o Right preserva a ordem de inserção"
    ],
    correct: 0,
    explanation: "LEFT JOIN garante a preservação de todos os registros da tabela à esquerda (primeira após o FROM), preenchendo com NULL colunas não casadas. O RIGHT JOIN faz o oposto para a tabela à direita.",
    isCode: false
  },
  {
    id: 14,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "14. Em uma Trigger para auditar exclusões (DELETE), qual pseudo-registro guarda os valores que estão prestes a serem apagados?",
    options: [
      ":NEW",
      ":PREV",
      ":OLD",
      ":DELETED"
    ],
    correct: 2,
    explanation: "Em operações DELETE, apenas o pseudo-registro :OLD está populado com os valores originais da linha que será removida (:NEW é NULL). Em UPDATE, ambos :OLD e :NEW ficam acessíveis.",
    isCode: false
  },
  {
    id: 15,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "15. Como é a estrutura condicional correta de um IF com múltiplas condições em PL/SQL?",
    options: [
      "IF cond1 THEN ... ELSEIF cond2 THEN ... ELSE ... ENDIF;",
      "IF cond1 THEN ... ELSIF cond2 THEN ... ELSE ... END IF;",
      "IF (cond1) { ... } ELSE IF (cond2) { ... } ELSE { ... };",
      "IF cond1 DO ... ELIF cond2 DO ... DEFAULT ... END;"
    ],
    correct: 1,
    explanation: "No PL/SQL a palavra-chave para ramificações condicionais intermediárias é escrita estritamente como 'ELSIF' (sem a letra 'e' intermediária) e o fechamento do bloco requer 'END IF;'.",
    isCode: false
  },
  {
    id: 16,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "16. Para que serve a cláusula FOR EACH ROW na criação de uma Trigger?",
    options: [
      "Para que a trigger seja executada para cada linha afetada pelo comando DML",
      "Para bloquear exclusivamente as linhas da tabela durante toda a transação",
      "Para garantir que a trigger seja executada somente uma única vez por comando SQL",
      "Para converter uma trigger de nível DML em uma trigger de auditoria DDL"
    ],
    correct: 0,
    explanation: "A cláusula 'FOR EACH ROW' define uma Row-Level Trigger (gatilho de nível de linha), permitindo inspecionar e manipular valores individuais linha a linha usando :OLD e :NEW.",
    isCode: false
  },
  {
    id: 17,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "17. Se as tabelas A e B possuem uma coluna 'ID' com mesmo nome, mas A.ID é NUMBER e B.ID é VARCHAR2, o que acontece ao usar NATURAL JOIN?",
    options: [
      "O comando retornará um erro",
      "O Oracle converterá implicitamente a coluna VARCHAR2 para NUMBER sem avisos",
      "O Oracle ignorará a coluna ID e fará um produto cartesiano (CROSS JOIN)",
      "A consulta funcionará normalmente comparando apenas o comprimento dos campos"
    ],
    correct: 0,
    explanation: "No NATURAL JOIN do Oracle, todas as colunas com nomes idênticos devem ter tipos de dados correspondentes. Se os tipos forem incompatíveis (ex: NUMBER e VARCHAR2), o Oracle emite o erro ORA-01722 / ORA-00932.",
    isCode: false
  },
  {
    id: 18,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "18. Como capturar qualquer erro não previsto especificamente no bloco de exceções do PL/SQL?",
    options: [
      "Usando CATCH (Exception e)",
      "Declarando DEFAULT_ERROR_HANDLER",
      "Usando a cláusula WHEN OTHERS THEN",
      "Ativando o parâmetro ON ERROR GOTO EXIT"
    ],
    correct: 2,
    explanation: "A cláusula 'WHEN OTHERS THEN' captura todas as exceções não tratadas explicitamente nas cláusulas anteriores, sendo frequentemente combinada com SQLCODE e SQLERRM para diagnóstico.",
    isCode: false
  },
  {
    id: 19,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "19. O que o FULL JOIN retorna?",
    options: [
      "Apenas as linhas onde as chaves estrangeiras forem nulas em ambos os lados",
      "A coincidência entre tabelas somada às linhas não associadas tanto do lado direito quanto do esquerdo",
      "O produto cartesiano multiplicando irrestritamente as linhas de A pelas de B",
      "Exclusivamente as linhas órfãs que não coincidem em nenhuma das tabelas"
    ],
    correct: 1,
    explanation: "O FULL OUTER JOIN combina o resultado do INNER JOIN com as linhas não correspondentes de ambas as tabelas (esquerda e direita), completando as colunas faltantes com valores NULL.",
    isCode: false
  },
  {
    id: 20,
    level: "medium",
    levelLabel: "Nível Médio",
    question: "20. No ORDER BY, como ordenar o 'Salario' de forma decrescente e o 'Nome' de forma crescente?",
    options: [
      "ORDER BY Salario DOWN, Nome UP",
      "ORDER BY Salario DESC, Nome ASC",
      "ORDER BY Salario ASC, Nome DESC",
      "SORT BY Salario DESCENDING, Nome ASCENDING"
    ],
    correct: 1,
    explanation: "A cláusula ORDER BY aceita múltiplos critérios separados por vírgula. A palavra-chave DESC especifica ordem decrescente e ASC (padrão) especifica ordem crescente.",
    isCode: false
  },

  // --- NÍVEL DIFÍCIL / DESAFIOS PRÁTICOS (21 a 30) ---
  {
    id: 21,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "21. Desafio: Como criar uma Procedure que receba o código de um funcionário e atualize seu status para 'demitido'?",
    options: [
      "CREATE OR REPLACE PROCEDURE change_status(p_cod IN NUMBER) IS BEGIN UPDATE funcionarios SET status='demitido' WHERE cd_func=p_cod; COMMIT; END;",
      "CREATE FUNCTION change_status(p_cod NUMBER) RETURN VOID IS UPDATE funcionarios SET status='demitido'; END;",
      "CREATE OR REPLACE PROCEDURE change_status(p_cod OUT NUMBER) AS BEGIN INSERT INTO funcionarios(status) VALUES('demitido'); END;",
      "PROCEDURE change_status(p_cod IN NUMBER) DO UPDATE funcionarios SET status='demitido'; RETURN TRUE; END;"
    ],
    correct: 0,
    explanation: "A sintaxe correta usa 'CREATE OR REPLACE PROCEDURE nome(param IN tipo) IS BEGIN ... END;'. A procedure recebe o código pelo parâmetro IN, atualiza o registro específico no WHERE e pode finalizar com COMMIT.",
    isCode: true
  },
  {
    id: 22,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "22. Desafio: Se a Tabela A tem 3 linhas e a Tabela B tem 3 linhas, quantas linhas serão retornadas em um CROSS JOIN entre elas?",
    options: [
      "3 linhas",
      "6 linhas",
      "9 linhas",
      "0 linhas (erro por falta de cláusula ON)"
    ],
    correct: 2,
    explanation: "O CROSS JOIN gera o produto cartesiano direto das tabelas. Multiplica a quantidade de registros da primeira tabela pela segunda: 3 x 3 = 9 linhas.",
    isCode: true
  },
  {
    id: 23,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "23. Desafio Consulta: Qual comando retorna todos os funcionários do departamento 'Estoque' (ST_CLERK) ou que ganham acima de 8000?",
    options: [
      "SELECT * FROM Employees WHERE Salary > 8000 OR Job_id = 'ST_CLERK';",
      "SELECT * FROM Employees HAVING Salary > 8000 AND Job_id = 'ST_CLERK';",
      "SELECT Employees WHERE Salary > 8000 UNION ALL Job_id = 'ST_CLERK';",
      "SELECT * FROM Employees WHERE Salary >= 8000 NOR Job_id = 'ST_CLERK';"
    ],
    correct: 0,
    explanation: "O operador lógico disjuntivo 'OR' na cláusula WHERE seleciona linhas que atendam a pelo menos uma das condições: 'Salary > 8000' ou 'Job_id = 'ST_CLERK''.",
    isCode: true
  },
  {
    id: 24,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "24. Desafio Function: Construa o cabeçalho correto de uma Function para calcular imposto de 3% sobre um valor financeiro.",
    options: [
      "CREATE OR REPLACE FUNCTION calc_imp(valor IN NUMBER) RETURN NUMBER IS ...",
      "CREATE OR REPLACE PROCEDURE calc_imp(valor IN NUMBER) RETURNING NUMBER AS ...",
      "CREATE FUNCTION calc_imp(valor NUMBER) RETURNS VOID BEGIN ...",
      "CREATE OR REPLACE FUNCTION calc_imp(valor OUT NUMBER) OUTPUT NUMBER IS ..."
    ],
    correct: 0,
    explanation: "No Oracle PL/SQL, a cláusula que declara o tipo retornado pela Function é 'RETURN tipo' (no singular, sem a letra 's') logo após a lista de parâmetros formais.",
    isCode: true
  },
  {
    id: 25,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "25. Desafio de Precedência: Na cláusula WHERE, qual operador é avaliado primeiro se parênteses não forem usados: AND ou OR?",
    options: [
      "AND tem prioridade sobre o OR",
      "OR tem prioridade sobre o AND",
      "São avaliados estritamente da direita para a esquerda sem hierarquia",
      "O banco emite erro de sintaxe exigindo parênteses mandatórios"
    ],
    correct: 0,
    explanation: "Nas regras de precedência de operadores lógicos do SQL, o operador AND possui prioridade maior que o operador OR. Sem parênteses, todas as condições unidas por AND são avaliadas antes dos ORs.",
    isCode: true
  },
  {
    id: 26,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "26. Desafio Trigger: Para impedir que um salário seja reduzido durante um UPDATE, qual tipo de Trigger usar?",
    options: [
      "BEFORE UPDATE FOR EACH ROW",
      "AFTER DELETE FOR EACH STATEMENT",
      "INSTEAD OF INSERT ON TABLE",
      "AFTER TRUNCATE FOR EACH ROW"
    ],
    correct: 0,
    explanation: "A trigger BEFORE UPDATE FOR EACH ROW intercepta a modificação antes que ela seja persistida nos blocos da tabela. Nela, podemos comparar ':NEW.salary < :OLD.salary' e disparar um RAISE_APPLICATION_ERROR para abortar a operação.",
    isCode: true
  },
  {
    id: 27,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "27. Desafio de Consulta: Qual é a sintaxe do padrão ANSI (SQL92) para um Inner Join entre Employees (E) e Departments (D)?",
    options: [
      "FROM Employees E INNER JOIN Departments D ON E.department_id = D.department_id",
      "FROM Employees E, Departments D WHERE E.department_id (+) = D.department_id",
      "FROM Employees E JOIN Departments D USING (ALL COLUMNS)",
      "FROM Employees E MERGE Departments D MATCH ON E.department_id = D.department_id"
    ],
    correct: 0,
    explanation: "A sintaxe padrão ANSI SQL92 explícita utiliza a cláusula 'INNER JOIN ... ON ...' estabelecendo o predicado de junção entre as chaves primária e estrangeira das tabelas.",
    isCode: true
  },
  {
    id: 28,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "28. Desafio: Como buscar pessoas que o nome começa com a letra 'M' e o salário não está entre 1000 e 2000?",
    options: [
      "WHERE First_name LIKE 'M%' AND Salary NOT BETWEEN 1000 AND 2000",
      "WHERE First_name = 'M*' OR Salary OUTSIDE (1000, 2000)",
      "WHERE First_name IN ('M%') AND Salary <> BETWEEN 1000..2000",
      "WHERE Substr(First_name, 1, 1) = 'M' OR NOT (Salary IN (1000, 2000))"
    ],
    correct: 0,
    explanation: "A expressão combina 'First_name LIKE 'M%'' (começa com 'M' seguido por qualquer caractere) com o operador lógico negado 'Salary NOT BETWEEN 1000 AND 2000' unificados por 'AND'.",
    isCode: true
  },
  {
    id: 29,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "29. Desafio PL/SQL: Em um bloco anônimo, como atribuir o valor 'João' a uma variável nomeada 'v_nome'?",
    options: [
      "v_nome VARCHAR2(50) := 'João';",
      "v_nome: STRING = \"João\";",
      "SET v_nome = 'João';",
      "DECLARE v_nome == 'João';"
    ],
    correct: 0,
    explanation: "Em PL/SQL, o operador de atribuição direta é ':=' (dois pontos seguido de igual). Variáveis textuais utilizam o tipo VARCHAR2 com tamanho especificado e literais são delimitados por aspas simples.",
    isCode: true
  },
  {
    id: 30,
    level: "hard",
    levelLabel: "Nível Difícil / Desafio Prático",
    question: "30. Desafio DML PL/SQL: É possível utilizar o comando COMMIT dentro de uma PROCEDURE após um UPDATE?",
    options: [
      "Sim, o controle de transação como COMMIT pode ser feito dentro da seção BEGIN de uma Procedure",
      "Não, instruções de controle de transação (COMMIT/ROLLBACK) são estritamente proibidas em PL/SQL",
      "Apenas se a procedure for declarada como AUTONOMOUS_FUNCTION em pacote isolado",
      "Não, pois o Oracle efetua commit automático antes de cada procedure terminar a execução"
    ],
    correct: 0,
    explanation: "Sim! Procedures PL/SQL suportam comandos de controle de transação (COMMIT, ROLLBACK, SAVEPOINT) diretamente no bloco executável BEGIN...END. (Diferente de Functions chamadas dentro de SELECTs, que possuem restrições a DML/COMMIT).",
    isCode: true
  }
];

// ==========================================
// 2. SISTEMA DE ÁUDIO WEB (Efeitos Sintetizados)
// ==========================================
class SoundSystem {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16); // G5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      // Falha silenciosa em navegadores com restrições
    }
  }

  playWrong() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {}
  }

  playCompletion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const now = this.ctx.currentTime + (i * 0.1);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {}
  }
}

// ==========================================
// 3. ESTADO DA APLICAÇÃO
// ==========================================
const appState = {
  currentTab: "theory",
  currentFilter: "all",
  activeQuestionList: [...QUIZ_QUESTIONS],
  userSelections: {}, // Mapeia { [questionId]: selectedOptionIndex }
  isSubmitted: false,
  score: 0,
  sound: new SoundSystem()
};

// ==========================================
// 4. ELEMENTOS DO DOM
// ==========================================
const DOM = {
  // Navegação
  tabTheory: document.getElementById("tab-theory"),
  tabQuiz: document.getElementById("tab-quiz"),
  sectionTheory: document.getElementById("section-theory"),
  sectionQuiz: document.getElementById("section-quiz"),
  toggleSound: document.getElementById("toggle-sound"),
  soundIconOn: document.getElementById("sound-icon-on"),
  soundIconOff: document.getElementById("sound-icon-off"),
  quickScore: document.getElementById("quick-score"),

  // Accordion Teoria
  theoryAccordion: document.getElementById("theory-accordion"),
  theorySearch: document.getElementById("theory-search"),
  btnExpandAll: document.getElementById("btn-expand-all"),
  btnCollapseAll: document.getElementById("btn-collapse-all"),
  btnJumpToQuiz: document.getElementById("btn-jump-to-quiz"),

  // Controles Quiz
  difficultyButtons: document.querySelectorAll(".diff-btn"),
  btnRestartQuiz: document.getElementById("btn-restart-quiz"),

  // Barra de Acompanhamento Fixo
  trackerAnswered: document.getElementById("tracker-answered"),
  trackerTotal: document.getElementById("tracker-total"),
  trackerProgressFill: document.getElementById("tracker-progress-fill"),
  btnSubmitTop: document.getElementById("btn-submit-quiz-top"),
  btnSubmitBottom: document.getElementById("btn-submit-quiz-bottom"),

  // Container de Todas as Questões
  questionsListContainer: document.getElementById("questions-list-container"),

  // Modal de Confirmação
  modalConfirm: document.getElementById("modal-confirm-submit"),
  modalAnsweredCount: document.getElementById("modal-answered-count"),
  modalTotalCount: document.getElementById("modal-total-count"),
  modalPendingCount: document.getElementById("modal-pending-count"),
  btnCancelSubmit: document.getElementById("btn-cancel-submit"),
  btnForceSubmit: document.getElementById("btn-force-submit"),

  // Banner / Resumo de Resultados
  resultsBanner: document.getElementById("quiz-results-banner"),
  resultsHeadline: document.getElementById("results-headline"),
  resultsSubtitle: document.getElementById("results-subtitle"),
  resultsMedal: document.getElementById("results-medal"),
  finalPercentage: document.getElementById("final-percentage"),
  scoreRingFill: document.getElementById("score-ring-fill"),
  finalCorrectCount: document.getElementById("final-correct-count"),
  finalWrongCount: document.getElementById("final-wrong-count"),
  finalTotalCount: document.getElementById("final-total-count"),
  breakdownEasyStat: document.getElementById("breakdown-easy-stat"),
  breakdownEasyBar: document.getElementById("breakdown-easy-bar"),
  breakdownMedStat: document.getElementById("breakdown-med-stat"),
  breakdownMedBar: document.getElementById("breakdown-med-bar"),
  breakdownHardStat: document.getElementById("breakdown-hard-stat"),
  breakdownHardBar: document.getElementById("breakdown-hard-bar"),
  btnRetryAll: document.getElementById("btn-retry-all"),
  btnScrollToQuestions: document.getElementById("btn-scroll-to-questions")
};

// ==========================================
// 5. INICIALIZAÇÃO & EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTheoryAccordion();
  initQuiz();
});

// Navegação entre Abas (Teoria x Quiz)
function initNavigation() {
  DOM.tabTheory.addEventListener("click", () => switchTab("theory"));
  DOM.tabQuiz.addEventListener("click", () => switchTab("quiz"));

  DOM.btnJumpToQuiz.addEventListener("click", () => {
    switchTab("quiz");
  });

  // Alternador de Som
  DOM.toggleSound.addEventListener("click", () => {
    appState.sound.enabled = !appState.sound.enabled;
    if (appState.sound.enabled) {
      DOM.soundIconOn.classList.remove("hidden");
      DOM.soundIconOff.classList.add("hidden");
      DOM.toggleSound.setAttribute("title", "Som Ativado");
    } else {
      DOM.soundIconOn.classList.add("hidden");
      DOM.soundIconOff.classList.remove("hidden");
      DOM.toggleSound.setAttribute("title", "Som Desativado");
    }
  });
}

function switchTab(tab) {
  appState.currentTab = tab;
  if (tab === "theory") {
    DOM.tabTheory.classList.add("active");
    DOM.tabQuiz.classList.remove("active");
    DOM.sectionTheory.classList.add("active");
    DOM.sectionQuiz.classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    DOM.tabTheory.classList.remove("active");
    DOM.tabQuiz.classList.add("active");
    DOM.sectionTheory.classList.remove("active");
    DOM.sectionQuiz.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ==========================================
// 6. FUNCIONALIDADES DA ÁREA DE TEORIA
// ==========================================
function initTheoryAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const isExpanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", !isExpanded);
    });
  });

  // Expandir Todos
  DOM.btnExpandAll.addEventListener("click", () => {
    accordionHeaders.forEach(h => h.setAttribute("aria-expanded", "true"));
  });

  // Recolher Todos
  DOM.btnCollapseAll.addEventListener("click", () => {
    accordionHeaders.forEach(h => h.setAttribute("aria-expanded", "false"));
  });

  // Campo de Pesquisa em Tempo Real nos Tópicos de Teoria
  DOM.theorySearch.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll(".accordion-item");

    items.forEach(item => {
      const topicKeywords = item.getAttribute("data-topic") || "";
      const textContent = item.textContent.toLowerCase();

      if (query === "" || topicKeywords.includes(query) || textContent.includes(query)) {
        item.style.display = "block";
        if (query.length > 2) {
          item.querySelector(".accordion-header").setAttribute("aria-expanded", "true");
        }
      } else {
        item.style.display = "none";
      }
    });
  });

  // Botões de Copiar Código
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const code = btn.getAttribute("data-copy");
      if (code && navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          const originalText = btn.textContent;
          btn.textContent = "Copiado!";
          btn.style.color = "#34d399";
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = "";
          }, 1800);
        });
      }
    });
  });
}

// ==========================================
// 7. FUNCIONALIDADES DO QUIZ (TODAS AS QUESTÕES SIMULTÂNEAS)
// ==========================================
function initQuiz() {
  // Filtros de Dificuldade
  DOM.difficultyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      DOM.difficultyButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const level = btn.getAttribute("data-level");
      setDifficultyFilter(level);
    });
  });

  // Botão Limpar / Reiniciar Seleções
  DOM.btnRestartQuiz.addEventListener("click", () => {
    if (confirm("Deseja limpar suas respostas e recomeçar o simulado?")) {
      restartQuiz();
    }
  });

  // Botões de Enviar Simulado (Topo e Rodapé)
  DOM.btnSubmitTop.addEventListener("click", submitQuiz);
  DOM.btnSubmitBottom.addEventListener("click", submitQuiz);

  // Ações do Modal de Confirmação para Questões Pendentes
  DOM.btnCancelSubmit.addEventListener("click", () => {
    DOM.modalConfirm.classList.add("hidden");
  });
  DOM.btnForceSubmit.addEventListener("click", () => {
    DOM.modalConfirm.classList.add("hidden");
    executeSubmission();
  });

  // Botões do Banner de Resultado
  DOM.btnRetryAll.addEventListener("click", restartQuiz);
  DOM.btnScrollToQuestions.addEventListener("click", () => {
    DOM.questionsListContainer.scrollIntoView({ behavior: "smooth" });
  });

  // Renderiza todas as questões inicialmente
  renderAllQuestions();
  updateTracker();
}

function setDifficultyFilter(level) {
  appState.currentFilter = level;
  if (level === "all") {
    appState.activeQuestionList = [...QUIZ_QUESTIONS];
  } else {
    appState.activeQuestionList = QUIZ_QUESTIONS.filter(q => q.level === level);
  }
  restartQuiz();
}

function restartQuiz() {
  appState.userSelections = {};
  appState.isSubmitted = false;
  appState.score = 0;

  DOM.resultsBanner.classList.add("hidden");
  DOM.modalConfirm.classList.add("hidden");
  DOM.quickScore.textContent = `0/${appState.activeQuestionList.length}`;
  
  DOM.btnSubmitTop.disabled = false;
  DOM.btnSubmitBottom.disabled = false;
  DOM.btnSubmitTop.querySelector("span").textContent = "Enviar Simulado";
  DOM.btnSubmitBottom.querySelector("span").textContent = "Finalizar e Enviar Todas as Respostas";

  renderAllQuestions();
  updateTracker();
  window.scrollTo({ top: DOM.sectionQuiz.offsetTop - 80, behavior: "smooth" });
}

// Renderiza todas as questões no DOM simultaneamente
function renderAllQuestions() {
  DOM.questionsListContainer.innerHTML = "";
  const prefixes = ["A", "B", "C", "D"];

  appState.activeQuestionList.forEach((q) => {
    const card = document.createElement("article");
    card.className = "question-card";
    card.id = `qcard-${q.id}`;

    // Cabeçalho da Questão
    const header = document.createElement("div");
    header.className = "question-header";

    const numSpan = document.createElement("span");
    numSpan.className = "question-num";
    numSpan.textContent = `Questão #${q.id}`;

    const badgeSpan = document.createElement("span");
    badgeSpan.className = "level-badge";
    if (q.level === "easy") {
      badgeSpan.classList.add("badge-easy");
      badgeSpan.textContent = "Fácil";
    } else if (q.level === "medium") {
      badgeSpan.classList.add("badge-medium");
      badgeSpan.textContent = "Médio";
    } else {
      badgeSpan.classList.add("badge-hard");
      badgeSpan.textContent = "Difícil / Prático";
    }

    header.appendChild(numSpan);
    header.appendChild(badgeSpan);
    card.appendChild(header);

    // Enunciado
    const statement = document.createElement("h3");
    statement.className = "question-statement";
    statement.textContent = q.question;
    card.appendChild(statement);

    // Dica para questões de código
    if (q.isCode) {
      const subtext = document.createElement("p");
      subtext.className = "question-subtext";
      subtext.innerHTML = `<span>💡</span> <em>Desafio de Código / Consulta SQL: Analise a sintaxe abaixo.</em>`;
      card.appendChild(subtext);
    }

    // Grade de Opções
    const optionsGrid = document.createElement("div");
    optionsGrid.className = "options-grid";
    optionsGrid.setAttribute("role", "radiogroup");

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", "false");
      btn.dataset.qid = q.id;
      btn.dataset.idx = optIdx;

      // Restaura seleção se já existia
      if (appState.userSelections[q.id] === optIdx) {
        btn.classList.add("selected");
        btn.setAttribute("aria-checked", "true");
        card.classList.add("answered");
      }

      const prefixSpan = document.createElement("span");
      prefixSpan.className = "option-prefix";
      prefixSpan.textContent = prefixes[optIdx];

      const textSpan = document.createElement("span");
      textSpan.className = "option-text";

      if (q.isCode) {
        const codeEl = document.createElement("code");
        codeEl.className = "option-code";
        codeEl.textContent = optText;
        textSpan.appendChild(codeEl);
      } else {
        textSpan.textContent = optText;
      }

      btn.appendChild(prefixSpan);
      btn.appendChild(textSpan);

      // Clique para selecionar alternativa
      btn.addEventListener("click", () => {
        if (appState.isSubmitted) return;
        selectQuestionOption(q.id, optIdx, optionsGrid, card);
      });

      optionsGrid.appendChild(btn);
    });

    card.appendChild(optionsGrid);

    // Container de Feedback Inline (Inicialmente Vazio e Oculto)
    const feedbackBox = document.createElement("div");
    feedbackBox.className = "question-inline-feedback hidden";
    feedbackBox.id = `qfeedback-${q.id}`;
    card.appendChild(feedbackBox);

    DOM.questionsListContainer.appendChild(card);
  });
}

// Seleção de alternativa em uma questão
function selectQuestionOption(qid, optIdx, optionsGrid, card) {
  appState.userSelections[qid] = optIdx;
  card.classList.add("answered");

  // Atualiza classes visuais nas alternativas desta questão
  const allBtns = optionsGrid.querySelectorAll(".option-btn");
  allBtns.forEach((btn, idx) => {
    if (idx === optIdx) {
      btn.classList.add("selected");
      btn.setAttribute("aria-checked", "true");
    } else {
      btn.classList.remove("selected");
      btn.setAttribute("aria-checked", "false");
    }
  });

  updateTracker();
}

// Atualiza o contador de respondidas no tracker fixo
function updateTracker() {
  const total = appState.activeQuestionList.length;
  const answeredCount = appState.activeQuestionList.filter(q => appState.userSelections[q.id] !== undefined).length;

  DOM.trackerAnswered.textContent = answeredCount;
  DOM.trackerTotal.textContent = total;
  const percent = total > 0 ? (answeredCount / total) * 100 : 0;
  DOM.trackerProgressFill.style.width = `${percent}%`;

  DOM.quickScore.textContent = `${answeredCount}/${total}`;
}

// ==========================================
// 8. FINALIZAR E ENVIAR RESPOSTAS DO SIMULADO
// ==========================================
function submitQuiz() {
  if (appState.isSubmitted) return;

  const total = appState.activeQuestionList.length;
  const answeredCount = appState.activeQuestionList.filter(q => appState.userSelections[q.id] !== undefined).length;

  if (answeredCount < total) {
    const pendentes = total - answeredCount;
    DOM.modalAnsweredCount.textContent = answeredCount;
    DOM.modalTotalCount.textContent = total;
    DOM.modalPendingCount.textContent = pendentes;
    DOM.modalConfirm.classList.remove("hidden");
    return;
  }

  executeSubmission();
}

function executeSubmission() {
  appState.isSubmitted = true;
  const total = appState.activeQuestionList.length;
  let correctCount = 0;
  let wrongCount = 0;

  let easyTotal = 0, easyCorrect = 0;
  let medTotal = 0, medCorrect = 0;
  let hardTotal = 0, hardCorrect = 0;

  // Itera por todas as questões e avalia
  appState.activeQuestionList.forEach(q => {
    const card = document.getElementById(`qcard-${q.id}`);
    const feedbackBox = document.getElementById(`qfeedback-${q.id}`);
    const optionButtons = card.querySelectorAll(".option-btn");
    const userChoice = appState.userSelections[q.id];
    const isAnswered = userChoice !== undefined;
    const isCorrect = isAnswered && userChoice === q.correct;

    // Desativa botões
    optionButtons.forEach(btn => {
      btn.disabled = true;
    });

    // Contabiliza por nível
    if (q.level === "easy") {
      easyTotal++;
      if (isCorrect) easyCorrect++;
    } else if (q.level === "medium") {
      medTotal++;
      if (isCorrect) medCorrect++;
    } else if (q.level === "hard") {
      hardTotal++;
      if (isCorrect) hardCorrect++;
    }

    if (isCorrect) {
      correctCount++;
      card.classList.add("correct");
      if (optionButtons[userChoice]) {
        optionButtons[userChoice].classList.add("correct");
      }
    } else {
      wrongCount++;
      card.classList.add("incorrect");
      // Marca a errada escolhida pelo usuário
      if (isAnswered && optionButtons[userChoice]) {
        optionButtons[userChoice].classList.add("incorrect");
      }
      // Destaca qual era a alternativa correta
      if (optionButtons[q.correct]) {
        optionButtons[q.correct].classList.add("correct");
      }
    }

    // Monta o Feedback Inline na própria questão
    feedbackBox.classList.remove("hidden");
    if (isCorrect) {
      feedbackBox.className = "question-inline-feedback correct";
      feedbackBox.innerHTML = `
        <div class="qfb-icon">✅</div>
        <div class="qfb-details">
          <div class="qfb-status">Você Acertou!</div>
          <div class="qfb-explanation">${q.explanation}</div>
        </div>
      `;
    } else if (isAnswered) {
      feedbackBox.className = "question-inline-feedback incorrect";
      feedbackBox.innerHTML = `
        <div class="qfb-icon">❌</div>
        <div class="qfb-details">
          <div class="qfb-status">Você Errou! Alternativa correta: Letra ${["A", "B", "C", "D"][q.correct]}</div>
          <div class="qfb-explanation">${q.explanation}</div>
        </div>
      `;
    } else {
      feedbackBox.className = "question-inline-feedback unanswered";
      feedbackBox.innerHTML = `
        <div class="qfb-icon">⚠️</div>
        <div class="qfb-details">
          <div class="qfb-status">Não Respondida! Resposta correta: Letra ${["A", "B", "C", "D"][q.correct]}</div>
          <div class="qfb-explanation">${q.explanation}</div>
        </div>
      `;
    }
  });

  appState.score = correctCount;
  const percent = Math.round((correctCount / total) * 100);

  // Som de finalização
  appState.sound.playCompletion();

  // Atualiza botões de envio
  DOM.btnSubmitTop.disabled = true;
  DOM.btnSubmitBottom.disabled = true;
  DOM.btnSubmitTop.querySelector("span").textContent = "Simulado Corrigido";
  DOM.btnSubmitBottom.querySelector("span").textContent = "Simulado Corrigido com Sucesso";

  // Preenche dados do Banner de Resultados
  DOM.finalCorrectCount.textContent = correctCount;
  DOM.finalWrongCount.textContent = wrongCount;
  DOM.finalTotalCount.textContent = total;
  DOM.finalPercentage.textContent = `${percent}%`;

  // Animação do anel SVG circular (perímetro 264 = 2 * pi * 42)
  const circumference = 264;
  const offset = circumference - (circumference * percent) / 100;
  DOM.scoreRingFill.style.strokeDashoffset = offset;

  // Título e medalha de acordo com aproveitamento
  if (percent === 100) {
    DOM.resultsMedal.textContent = "🏆";
    DOM.resultsHeadline.textContent = "Excelente! Mestre Supremo de PL/SQL!";
    DOM.resultsSubtitle.textContent = `Você gabaritou todas as ${total} questões! Domínio absoluto de comandos, procedimentos, triggers e joins.`;
  } else if (percent >= 80) {
    DOM.resultsMedal.textContent = "🥇";
    DOM.resultsHeadline.textContent = "Muito Bom! DBA Especialista!";
    DOM.resultsSubtitle.textContent = `Você acertou ${correctCount} de ${total} questões (${percent}% de aproveitamento). Conhecimento avançado comprovado!`;
  } else if (percent >= 60) {
    DOM.resultsMedal.textContent = "🥈";
    DOM.resultsHeadline.textContent = "Bom Desempenho! No Caminho Certo!";
    DOM.resultsSubtitle.textContent = `Você acertou ${correctCount} de ${total} questões. Veja as correções abaixo para fixar os pontos onde errou.`;
  } else {
    DOM.resultsMedal.textContent = "📚";
    DOM.resultsHeadline.textContent = "Continue Praticando e Estudando!";
    DOM.resultsSubtitle.textContent = `Você acertou ${correctCount} de ${total} questões. Analise o gabarito comentado abaixo e releia a seção de Resumos Teóricos.`;
  }

  // Barras de Progresso por Nível
  DOM.breakdownEasyStat.textContent = `${easyCorrect}/${easyTotal}`;
  DOM.breakdownEasyBar.style.width = `${easyTotal > 0 ? (easyCorrect / easyTotal) * 100 : 0}%`;

  DOM.breakdownMedStat.textContent = `${medCorrect}/${medTotal}`;
  DOM.breakdownMedBar.style.width = `${medTotal > 0 ? (medCorrect / medTotal) * 100 : 0}%`;

  DOM.breakdownHardStat.textContent = `${hardCorrect}/${hardTotal}`;
  DOM.breakdownHardBar.style.width = `${hardTotal > 0 ? (hardCorrect / hardTotal) * 100 : 0}%`;

  // Exibe o Banner de Resultados e rola suavemente para ele
  DOM.resultsBanner.classList.remove("hidden");
  DOM.quickScore.textContent = `${correctCount}/${total} (${percent}%)`;
  DOM.resultsBanner.scrollIntoView({ behavior: "smooth" });
}
