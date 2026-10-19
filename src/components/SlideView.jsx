export default function SlideView({s,t,w=960,n}){const k=w/960;
return <div style={{width:w,height:w*9/16,overflow:'hidden',position:'relative',borderRadius:k<1?10:0}}>
<div style={{width:960,height:540,transform:`scale(${k})`,transformOrigin:'top left',background:`linear-gradient(135deg,${t.bg},${t.bg2})`,color:t.txt,padding:56,boxSizing:'border-box',position:'relative',fontFamily:'Inter,system-ui,sans-serif'}}>
<div style={{position:'absolute',left:0,top:0,bottom:0,width:10,background:t.acc}}/>
<div style={{fontSize:40,fontWeight:800,marginBottom:28}}>{s.title}</div>
<ul style={{fontSize:24,lineHeight:1.5,paddingLeft:28,listStyle:'disc'}}>{(s.bullets||[]).map((b,i)=><li key={i}>{b}</li>)}</ul>
{n&&<div style={{position:'absolute',right:28,bottom:18,opacity:.6}}>{n}</div>}</div></div>}
