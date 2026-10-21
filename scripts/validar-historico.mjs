// Audita os 100 registros historicos sem confundi-los com releases instalaveis.
import { readFileSync } from "node:fs";
const caminho=new URL("../docs/historico.json",import.meta.url);
const catalogo=JSON.parse(readFileSync(caminho,"utf8"));
const falhas=[];
const vistos=new Set();
if(catalogo.produto!=="Rastro")falhas.push("Produto divergente.");
if(catalogo.tipo!=="historico_documental_nao_instalavel")falhas.push("Tipo de arquivo historico invalido.");
if(!Array.isArray(catalogo.registros)||catalogo.registros.length!==100)falhas.push("Quantidade de registros inesperada.");
for(const [i,registro] of (catalogo.registros||[]).entries()){
 if(!registro.versao||typeof registro.versao!=="string")falhas.push("Versao nao informada: "+i);
 if(vistos.has(registro.versao))falhas.push("Versao duplicada: "+registro.versao);
 vistos.add(registro.versao);
 if(registro.estado!=="historico_sem_instalador"||registro.instaladorOriginalVerificado!==false)falhas.push("Registro nao pode afirmar instalador: "+registro.versao);
 if(registro.dataLancamentoOriginal!==null)falhas.push("Data original nao documentada: "+registro.versao);
 if("urlDownload" in registro||"token" in registro)falhas.push("Campo sensivel/inadequado: "+registro.versao);
 if(!Array.isArray(registro.notas))falhas.push("Notas invalidas: "+registro.versao);
}
if(falhas.length){console.error(falhas.join("\n"));process.exit(1)}
console.log("Historico validado: "+catalogo.registros.length+" registros, "+catalogo.registros.reduce((n,v)=>n+v.notas.length,0)+" anotacoes.");
