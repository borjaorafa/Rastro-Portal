"use strict";const lista=document.querySelector("#lista-versoes"),campo=document.querySelector("#pesquisa");document.querySelector("#ano").textContent=new Date().getFullYear();let versoes=[];function criar(tag,classe,valor){const e=document.createElement(tag);if(classe)e.className=classe;if(valor!==undefined)e.textContent=valor;return e}function atualizar(){const busca=(campo.value||"").trim().toLocaleLowerCase("pt-BR");lista.replaceChildren();const encontrados=versoes.filter(v=>[v.versao,v.resumo,...(v.notas||[])].join(" ").toLocaleLowerCase("pt-BR").includes(busca));if(!encontrados.length){const vazio=criar("div","estado");vazio.append(criar("strong","",versoes.length?"Nenhuma versão corresponde à pesquisa.":"Versões em preparação"),criar("p","",versoes.length?"Tente outro termo.":"A central está pronta. Os instaladores e as notas oficiais serão apresentados assim que forem homologados para distribuição."));lista.append(vazio);return}for(const v of encontrados){const card=criar("article","versao"),info=criar("div"),lateral=criar("div","versao-lateral");const publicado=v.estado==="publicada";const downloadAutorizado=publicado&&typeof v.urlDownload==="string"&&v.urlDownload.startsWith("https://");info.append(criar("span","tag",publicado?"Versão publicada":v.estado==="homologacao"?"Em homologação":"Aguardando homologação"),criar("h3","", "Rastro "+v.versao),criar("p","",v.resumo||""));if(v.publicadaEm)info.append(criar("p","", "Publicado em "+v.publicadaEm));if(Array.isArray(v.notas)&&v.notas.length){const ul=criar("ul","notas");for(const nota of v.notas)ul.append(criar("li","",nota));info.append(ul)}if(downloadAutorizado){const link=criar("a","botao principal","Acessar download autorizado ↗");link.href=v.urlDownload;link.rel="noopener noreferrer";lateral.append(link)}else{const b=criar("button","botao inativo",publicado?"Obter pelo Rastro licenciado":v.estado==="homologacao"?"Em testes · sem download":"Download indisponível");b.disabled=true;lateral.append(b)}card.append(info,lateral);lista.append(card)}}campo.addEventListener("input",atualizar);fetch("./versoes.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Catálogo indisponível");return r.json()}).then(d=>{versoes=Array.isArray(d.versoes)?d.versoes:[];atualizar()}).catch(()=>lista.replaceChildren(criar("div","estado","O catálogo está temporariamente indisponível.")))

/* Histórico importado do Rastro: documental, nunca gera link de instalador. */
const gradeHistorico=document.querySelector("#grade-historico");
const campoHistorico=document.querySelector("#busca-historico");
const botaoMaisHistorico=document.querySelector("#ver-mais-historico");
const quantidadeHistorico=document.querySelector("#quantidade-historico");
const contadorHistorico=document.querySelector("#contador-historico");
let registrosHistoricos=[];
let exibidosHistoricos=12;

function comporHistorico(registro){
 const cartao=criar("article","hist-card");
 const topo=criar("div","hist-top");
 topo.append(criar("span","hist-versao",registro.versao),criar("span","hist-tag","HISTÓRICO · SEM DOWNLOAD"));
 cartao.append(topo,criar("h3","",registro.titulo||"Alterações registradas"));
 if(registro.resumo)cartao.append(criar("p","",registro.resumo));
 const info=criar("div","hist-info");
 info.append(criar("span","","Data original não informada"),criar("span","","Instalador não recuperado"));
 cartao.append(info);
 if(Array.isArray(registro.notas)&&registro.notas.length){
  const detalhes=criar("details","hist-detalhes");
  detalhes.append(criar("summary","", "Ver "+registro.notas.length+" alteração(ões)"));
  const listaNotas=criar("ul");
  for(const nota of registro.notas)listaNotas.append(criar("li","",nota));
  detalhes.append(listaNotas);
  cartao.append(detalhes);
 }
 return cartao;
}
function mostrarHistorico(){
 const termo=(campoHistorico.value||"").trim().toLocaleLowerCase("pt-BR");
 const filtrados=registrosHistoricos.filter(v=>[v.versao,v.titulo,v.resumo,...(v.notas||[])].join(" ").toLocaleLowerCase("pt-BR").includes(termo));
 gradeHistorico.replaceChildren();
 quantidadeHistorico.textContent=filtrados.length+" registro(s) encontrado(s)";
 if(!filtrados.length){
  gradeHistorico.append(criar("div","estado","Nenhum registro encontrado. Experimente outra palavra ou número de versão."));
 }
 for(const registro of filtrados.slice(0,exibidosHistoricos))gradeHistorico.append(comporHistorico(registro));
 botaoMaisHistorico.hidden=filtrados.length<=exibidosHistoricos;
 botaoMaisHistorico.textContent="Carregar mais versões ("+Math.min(12,filtrados.length-exibidosHistoricos)+" próximas) ↓";
}
campoHistorico.addEventListener("input",()=>{exibidosHistoricos=12;mostrarHistorico()});
botaoMaisHistorico.addEventListener("click",()=>{exibidosHistoricos+=12;mostrarHistorico()});
fetch("./historico.json",{cache:"no-store"}).then(resposta=>{
 if(!resposta.ok)throw new Error("Falha na consulta do histórico.");
 return resposta.json();
}).then(dados=>{
 registrosHistoricos=Array.isArray(dados.registros)?dados.registros:[];
 contadorHistorico.textContent=String(registrosHistoricos.length);
 mostrarHistorico();
}).catch(()=>{
 gradeHistorico.replaceChildren(criar("div","estado","Histórico temporariamente indisponível."));
 quantidadeHistorico.textContent="Não foi possível carregar o histórico";
 botaoMaisHistorico.hidden=true;
});
