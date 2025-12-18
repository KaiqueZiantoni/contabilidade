# contabilidade
# 📊 Calculadora de Apuração - Simples Nacional (Anexo III)

![Status](https://img.shields.io/badge/Status-Concluído-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido para solucionar uma demanda real na área contábil. O objetivo foi automatizar o cálculo da alíquota efetiva do **Simples Nacional (Anexo III - Serviços)**, substituindo processos manuais em planilhas e reduzindo a margem de erro humano.

A aplicação recebe o Faturamento Mensal e a Receita Bruta Acumulada (RBT12), aplica a fórmula de dedução oficial da Receita Federal e gera a guia de conferência, permitindo exportação dos dados.

## 🚀 Funcionalidades

- **Cálculo Automático:** Determinação dinâmica da alíquota efetiva baseada nas faixas de faturamento (Vigência 2024/2025).
- **Persistência de Dados (LocalStorage):** O sistema salva o histórico no navegador do usuário, garantindo que os dados não sejam perdidos ao fechar a aba.
- **Exportação CSV:** Funcionalidade que gera relatórios compatíveis com Excel para conferência fiscal.
- **Interface Intuitiva:** Design focado na usabilidade e leitura rápida de dados tributários.
- **Manipulação Dinâmica:** Adição e exclusão de lançamentos mensais com atualização imediata de totais.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando **Vanilla JavaScript** (JS Puro), aplicando o conceito de *Separation of Concerns* (Separação de Responsabilidades).

- **HTML5 Semântico:** Estruturação acessível.
- **CSS3:**
  - Uso de *CSS Variables* (`:root`) para fácil manutenção de temas.
  - Layout responsivo.
- **JavaScript (ES6+):**
  - **Lógica de Negócio:** Algoritmo de faixas tributárias implementado no Client-side.
  - **DOM Manipulation:** Inserção dinâmica de linhas na tabela.
  - **Template Strings:** Interpolação de dados para renderização HTML.
  - **LocalStorage API:** Para persistência de estado.

## 🧮 A Lógica Contábil

O algoritmo segue a fórmula oficial da Receita Federal para o Anexo III:

```math
Alíquota Efetiva = ((RBT12 * Alíquota Nominal) - Parcela a Deduzir) / RBT12
