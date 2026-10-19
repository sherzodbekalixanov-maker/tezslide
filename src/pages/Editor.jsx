import {useEffect,useRef,useState} from 'react';import {useParams} from 'react-router-dom';import {ArrowUp,ArrowDown,Trash2,Plus,Save,FileDown} from 'lucide-react';
import {supabase} from '../lib/supabase';import {THEMES} from '../lib/themes';import SlideView from '../components/SlideView';import {exportPptx,exportPdf} from '../lib/export';
export default function Editor(){const {id}=useParams(),[p,setP]=useState(null),[i,setI]=useState(0),[msg,setM]=useState(''),ref=useRef();
useEffect(()=>{supabase.from('presentations').select('*').eq('id',id).single().then(({data,error})=>error?setM(error.message):setP(data))},[id]);
if(!p)return <div className="pt-40 text-center">{msg||'Yuklanmoqda…'}</div>;
const t=THEMES[p.theme]||THEMES.neon,S=p.slides,s=S[i]||{},up=n=>setP({...p,slides:n});
const ch=(k,v)=>up(S.map((x,j)=>j===i?{...x,[k]:v}:x));
const mv=d=>{const j=i+d;if(j<0||j>=S.length)return;const n=[...S];[n[i],n[j]]=[n[j],n[i]];up(n);setI(j)};
const add=()=>{up([...S.slice(0,i+1),{title:'Yangi slayd',bullets:['Matn'],notes:''},...S.slice(i+1)]);setI(i+1)};
const del=()=>{if(S.length<2)return;up(S.filter((_,j)=>j!==i));setI(Math.max(0,i-1))};
async function save(){const {error}=await supabase.from('presentations').update({title:p.title,slides:S}).eq('id',id);setM(error?error.message:'Saqlandi ✓')}
async function run(fn){try{setM('Tayyorlanmoqda…');await fn();setM('Yuklab olindi ✓')}catch(e){setM(e.message)}}
return <div className="pt-24 px-4 max-w-7xl mx-auto"><div className="flex flex-wrap gap-2 items-center mb-4"><input className="inp max-w-xs" value={p.title} onChange={e=>setP({...p,title:e.target.value})}/>
<button className="btn flex gap-1" onClick={save}><Save size={16}/>Saqlash</button>
<button className="glass px-4 py-2 flex gap-1" onClick={()=>run(()=>exportPptx(p.title,S,t))}><FileDown size={16}/>PPTX</button>
<button className="glass px-4 py-2 flex gap-1" onClick={()=>run(()=>exportPdf(p.title,[...ref.current.children]))}><FileDown size={16}/>PDF</button><span className="text-sm text-white/60">{msg}</span></div>
<div className="grid md:grid-cols-[170px_1fr] gap-4"><div className="flex md:flex-col gap-2 overflow-auto md:max-h-[75vh]">{S.map((x,j)=><div key={j} onClick={()=>setI(j)} className={`cursor-pointer shrink-0 rounded-xl border-2 ${j===i?'border-purple-500':'border-transparent'}`}><SlideView s={x} t={t} w={160} n={j+1}/></div>)}</div>
<div className="grid lg:grid-cols-2 gap-4"><div><SlideView s={s} t={t} w={520}/><div className="flex gap-2 mt-3"><button className="glass p-2" onClick={()=>mv(-1)}><ArrowUp size={16}/></button><button className="glass p-2" onClick={()=>mv(1)}><ArrowDown size={16}/></button><button className="glass p-2" onClick={add}><Plus size={16}/></button><button className="glass p-2 text-red-400" onClick={del}><Trash2 size={16}/></button></div></div>
<div className="glass p-4 space-y-3"><input className="inp" value={s.title||''} onChange={e=>ch('title',e.target.value)}/>
<textarea className="inp" rows={6} placeholder="Har qatorda bitta punkt" value={(s.bullets||[]).join('\n')} onChange={e=>ch('bullets',e.target.value.split('\n'))}/>
<textarea className="inp" rows={4} placeholder="Spiker eslatmalari" value={s.notes||''} onChange={e=>ch('notes',e.target.value)}/></div></div></div>
<div ref={ref} style={{position:'fixed',left:-10000,top:0}}>{S.map((x,j)=><SlideView key={j} s={x} t={t} n={j+1}/>)}</div></div>}
