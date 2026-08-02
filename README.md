Plano de implementação — Calculadora estilo iPhone (site responsivo)

 (Realizado apenas para estudo de testes de Vibe Coding usando o Copilot Github CLI - Plan Mode - GPT 5-mini)

Calculadora simples para operações matemáticas básicas.

Stack: Vanilla HTML / CSS / JavaScript (sem dependências).
Funcionalidade: Básica (adição, subtração, multiplicação, divisão, decimal, porcentagem, trocar sinal, limpar).
Aparência: Inspirada pelo iPhone (botões arredondados, sombreados sutis, tipografia limpa).
Entrega: Arquivos estáticos (index.html, styles.css, app.js).
Arquivos a criar

index.html — marcação semântica, display e grade de botões.
styles.css — layout responsivo, temas de cor, estilos de botão, animações leves.
app.js — lógica das operações, gerenciamento de estado, teclado e toque.
assets/ — ícones ou fontes (opcional).
Passos de implementação (alto nível)

Criar markup HTML semântico e acessível (display, botões, atributos ARIA).
Implementar layout CSS inspirado no iPhone: grid de botões, cantos arredondados, sombras, fontes, responsividade.
Implementar lógica JS: entrada de números, operações, cálculo, limpar, ponto decimal, porcentagem, ± e lidar com erros (divisão por zero).
Testes responsivos: testar em desktop, tablet e mobile; ajustar breakpoints e tamanhos de botão.
Acessibilidade: suporte a teclado, foco visível, contraste e labels ARIA.
Finalizar artefatos: otimizar CSS/JS, empacotar arquivos estáticos e gerar instruções simples de deploy (GitHub Pages / copiar para site).
Tarefas (para rastreamento)

creating-markup — Criando marcação HTML da calculadora
styling-css — Estilizando a calculadora (CSS responsivo)
implementing-js — Implementando lógica JavaScript
testing-responsive — Testando e ajustando responsividade
improving-accessibility — Melhorando acessibilidade e suporte a teclado
preparing-deliverables — Preparando artefatos finais e instruções de deploy
Notas e considerações

Utilizar unitários não é necessário aqui; testes manuais e validação cross-browser bastam.
Manter o CSS modular e com variáveis (CSS custom properties) para facilitar personalização de cores.
Para animações, preferir transform/opacity para desempenho.
Se desejar mais tarde, possibilitar tema escuro.
Próximos passos

Confirmar decisões (stack, funcionalidades, estilo). Após aprovação, começar a implementação seguindo a ordem das tarefas.
