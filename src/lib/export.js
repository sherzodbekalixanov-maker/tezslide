import PptxGenJS from 'pptxgenjs';import jsPDF from 'jspdf';import html2canvas from 'html2canvas';
const hex=c=>c.replace('#','');
export async function exportPptx(title,slides,t){const p=new PptxGenJS();p.layout='LAYOUT_16x9';
slides.forEach(s=>{const sl=p.addSlide();sl.background={color:hex(t.bg)};
sl.addShape(p.ShapeType.rect,{x:0,y:0,w:0.15,h:5.625,fill:{color:hex(t.acc)}});
sl.addText(s.title||'',{x:0.6,y:0.4,w:8.8,h:1,fontSize:30,bold:true,color:hex(t.txt)});
if(s.bullets?.length)sl.addText(s.bullets.map(b=>({text:b,options:{bullet:true,breakLine:true}})),{x:0.7,y:1.6,w:8.6,h:3.5,fontSize:18,color:hex(t.txt),valign:'top'});
if(s.notes)sl.addNotes(s.notes)});
await p.writeFile({fileName:`${title||'tezslide'}.pptx`})}
export async function exportPdf(title,nodes){const pdf=new jsPDF({orientation:'landscape',unit:'px',format:[960,540]});
for(let i=0;i<nodes.length;i++){const c=await html2canvas(nodes[i],{scale:1.5,useCORS:true});
if(i)pdf.addPage([960,540],'landscape');pdf.addImage(c.toDataURL('image/jpeg',.92),'JPEG',0,0,960,540)}
pdf.save(`${title||'tezslide'}.pdf`)}
