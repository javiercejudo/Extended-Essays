var demora=200;
var avancemas=5;
var avancemenos=-15;
var altscroll=295;
var anchoscroll=535;
var posinicial=20;
var posparada=270;
///////////////////////////////////////////////////////////////////////////////////////////////
function menP1(texto,pagina){
var capa=window.parent.window.frames['cabeza'].document.getElementById('typer');
cambioI="<table align=center width=85% id='cabezaPrin'><td height=90>";
cambioI +=texto+"</td></table>";
capa.innerHTML=cambioI;
window.parent.window.frames['cuerpo'].window.location=pagina;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function escribir(b){
if (invertir==1){
velo=50;
contador++;
}else{
contador--;
velo=10;
}
if (contador<=cadena[b].length){
   largo=contador;
}
if (contador==cadena[b].length){
largo=cadena[b].length;
contador=cadena[b].length;
invertir=(-1)*invertir;
salir=1;
}
if (contador==0){
largo=0;
contador=0;
 invertir=(-1)*invertir;
}
text=cadena[b].substring(0,largo);
texto1=text.replace(/\*/gi,"<br>");
texto2=texto1.replace(/{/gi,"<span id='resaltarPrin'>");
texto=texto2.replace(/}/gi,"</span>");

var capa=document.getElementById('typer');
capa.innerHTML=texto;

if(salir==1 && largo==0){
salir=0;
largo=0;
contador=0;
invertir=1;
   if (b<cadena.length-1){
            b++;
         }else{
            b=0;
         }
            pasador="escribir("+b+")";
            tiempo=setTimeout(pasador,velo);
        

}else{
		pasador="escribir("+b+")";
        tiempo=setTimeout(pasador,velo);
		}
}
/////////////////////////////////////////////////////////////////////////////////////////
function desactiva() {
  
  clearTimeout(tiempo);
  
}
/////////////////////////////////////////////////////////////////////////////////////////

function avanzaPrinc(a){
mide=eval(dc+'deslizaPrinc'+st);
if (!((a<0 && posicion>=posinicial) ||(a>0 && posicion<=posinicial-altura+posparada))){
positop +=a;
posiabajo +=a;
posicion-=a;
mide.top =posicion;
}
if (N4){
mide.clip.top = positop ;
mide.clip.bottom =posiabajo ;
}else{
mide.clip = "rect("+positop+"px "+posidere+"px "+posiabajo+"px "+posileft+"px)";
}

if ((a<0 && posicion>=posinicial) ||(a>0 && posicion<=posinicial-altura+posparada)){
     paraPrinc();
	 }else{
reloj=setTimeout("avanzaPrinc("+a+")",demora)
}
}
//////////////////////////////////////////////////////////////////////////////////
function paraPrinc(){
	clearTimeout(reloj)
	
}
///////////////////////////////////////////////////////////////////////////////////
function medirPrinc(){
mide1=eval(dc+'deslizaPrinc'+st1);
mide=eval(dc+'deslizaPrinc'+st);
if (N4){
altura=mide1.height;
mide.visibility=verlo;
mide.clip.top = positop ;
mide.clip.right =posidere ;
mide.clip.bottom =posiabajo ;
mide.clip.left = posileft ;
}else{
altura=mide1.offsetHeight;
mide.visibility=verlo;
posicion +=mide.top;
mide.clip = "rect("+positop+"px "+posidere+"px "+posiabajo+"px "+posileft+"px)";

}

}

////////////////////////////////////////
function ventanaSecundaria (URL){
   window.open(URL,"buscador","top=15,left=175, height=500, width=450, scrollbars=1");
}

function posicion(){
if(navigator.appName=="Netscape"){
   var scrollarriba=window.pageYOffset;
   }
else{
   var scrollarriba=document.body.scrollTop;
   }
   
   var posarriba=scrollarriba;
  if (posarriba>90){ 
        document.getElementById('FLOTANTE').style.top=posarriba-107;
        document.getElementById('FLOTANTE').style.visibility="visible";
		document.getElementById('recuadro1').style.top=posarriba;
        }else{
 document.getElementById('FLOTANTE').style.top=0;
 document.getElementById('FLOTANTE').style.visibility="hidden";
 document.getElementById('recuadro1').style.top=100;
  }
reloj=window.setTimeout('posicion()',1)
}
function nada(){

}
