// Validacao do catalogo publico. Nunca inserir chaves, senhas ou URLs assinadas.
import { readFileSync } from "node:fs";

const caminho = new URL("../docs/versoes.json", import.meta.url);
const falhas = [];
const adicionarFalha = (mensagem) => falhas.push(mensagem);
const hashValido = (valor) => typeof valor === "string" && /^[a-fA-F0-9]{64}$/.test(valor);
const dataValida = (valor) => typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor) && !Number.isNaN(Date.parse(valor + "T00:00:00Z"));
const valorTexto = (valor) => typeof valor === "string" && valor.trim().length > 0;

let dados;
try {
  dados = JSON.parse(readFileSync(caminho, "utf8").replace(/^\uFEFF/, ""));
} catch (erro) {
  console.error("Falha ao ler docs/versoes.json:", erro.message);
  process.exit(1);
}

if (dados.produto !== "Rastro") adicionarFalha("O produto deve ser Rastro.");
if (!Array.isArray(dados.versoes)) adicionarFalha("versoes precisa ser uma lista.");

const vistas = new Set();
for (const [indice, versao] of (Array.isArray(dados.versoes) ? dados.versoes : []).entries()) {
  const prefixo = "versoes[" + indice + "]";
  if (!valorTexto(versao.versao)) adicionarFalha(prefixo + ": versao obrigatoria.");
  if (vistas.has(versao.versao)) adicionarFalha(prefixo + ": versao duplicada.");
  vistas.add(versao.versao);
  if (!["rascunho", "publicada", "descontinuada"].includes(versao.estado)) adicionarFalha(prefixo + ": estado invalido.");
  if (versao.distribuicao && versao.distribuicao !== "controlada") adicionarFalha(prefixo + ": este portal utiliza distribuicao controlada.");
  if (versao.notas !== undefined && !Array.isArray(versao.notas)) adicionarFalha(prefixo + ": notas precisa ser uma lista.");

  if (versao.estado === "publicada") {
    if (!dataValida(versao.publicadaEm)) adicionarFalha(prefixo + ": informe publicadaEm no formato AAAA-MM-DD.");
    if (!valorTexto(versao.resumo)) adicionarFalha(prefixo + ": resumo obrigatorio.");
    if (!valorTexto(versao.arquivo)) adicionarFalha(prefixo + ": nome do instalador obrigatorio.");
    if (!Number.isSafeInteger(versao.tamanhoBytes) || versao.tamanhoBytes <= 0) adicionarFalha(prefixo + ": tamanhoBytes invalido.");
    if (!hashValido(versao.sha256)) adicionarFalha(prefixo + ": SHA-256 invalido.");
    if (versao.distribuicao !== "controlada") adicionarFalha(prefixo + ": distribuicao deve ser controlada.");
    try {
      const destino = new URL(versao.urlDownload);
      if (destino.protocol !== "https:") adicionarFalha(prefixo + ": download precisa usar HTTPS.");
      if (destino.username || destino.password || destino.hash || destino.search) adicionarFalha(prefixo + ": URL nao pode conter tokens, parametros, credenciais ou fragmentos.");
      if (destino.hostname === "github.com" || destino.hostname === "api.github.com" || destino.hostname.endsWith(".githubusercontent.com")) {
        adicionarFalha(prefixo + ": use endpoint de autorizacao proprio, nao URL direta do GitHub.");
      }
    } catch { adicionarFalha(prefixo + ": urlDownload deve ser endereco HTTPS absoluto."); }
  }
}

if (falhas.length) {
  console.error("Catalogo invalido:\n" + falhas.map(f => " - " + f).join("\n"));
  process.exit(1);
}
console.log("Catalogo validado: " + (dados.versoes?.length ?? 0) + " versao(oes), sem erros.");
