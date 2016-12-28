var nb1,nb2,nb3,nb4;
var nb1d,nb2d,nb3d,nb4d;

var addsous1,addsous2; // true si addition, false si soustraction

var nb1init,nb2init,nb3init,nb4init,addsous1init,addsous2init; //pour sauvegarder l'équation de départ

//variable type d'équations , 1>ax+b=cx+d 2>ax+b=d 3>ax=d 4>x+b=d
var typeequation=1;
function sousenadd(nb)
{
	if (nb==1)
	{
		if (!addsous1)
		{
			addsous1=true;
			nb2=nb2*(-1);
			ajouteligne();
			affichesolutionsibesoin();
		}
	}
	else
	{
		if (!addsous2)
		{
			addsous2=true;
			nb4=nb4*(-1);
			ajouteligne();
			affichesolutionsibesoin();
		}
	}

	document.getElementById('opencours').focus();
}
function init()
{
	nb1d=1;
	nb2d=1;
	nb3d=1;
	nb4d=1;
	nb1 = Math.floor((Math.random() * 100) - 50);
	while (nb1==0) 
	{
		nb1 = Math.floor((Math.random() * 100) - 50);
	}
	nb2 = Math.floor((Math.random() * 100) - 50);
	nb3 = Math.floor((Math.random() * 100) - 50);
	while ((nb3==nb1)||(nb3==0))
	{
		nb3 = Math.floor((Math.random() * 100) - 50);
	}
	
	nb4 = Math.floor((Math.random() * 100) - 50);
	
	// initialisation des opérations
	var nbtmp = Math.floor((Math.random() * 3) - 1);
	addsous1=(nbtmp>0);
	var nbtmp = Math.floor((Math.random() * 3) - 1);
	addsous2=(nbtmp>0);
	
	if (typeequation==2)
	{
		nb3=0;
		addsous2=true;
	}
	
	if (typeequation==3)
	{
		nb3=0;
		nb2=0;
		addsous2=true;
		addsous1=true;
	}
	if (typeequation==4)
	{
		nb1=1;
		nb3=0;
		addsous2=true;
	}	
	if (nb2==0)
	{
		addsous1=true;
	}
	if (nb4==0)
	{
		addsous2=true;
	}
	nb1init=nb1;
	nb2init=nb2;
	nb3init=nb3;
	nb4init=nb4;
	addsous1init=addsous1;
	addsous2init=addsous2;
	ajouteligne();


	
	document.getElementById('valider').addEventListener('click', valider,false);
	document.getElementById('opencours').addEventListener('keyup', function(e){
                        if (e.keyCode == 13){
                           valider();
                            }
                          },false);
	document.getElementById('boutonoptions').addEventListener('click', afficheroptions,false);
	document.getElementById('annuler').addEventListener('click', annuler,false);
	document.getElementById('aide').addEventListener('click', aide,false);
	document.getElementById('nouvelleequation').addEventListener('click', nouvelleequation,false);
	document.getElementById('eqaxpb_cxpd').addEventListener('click', function (){refaireeq(1)},false);
	document.getElementById('eqaxpb_d').addEventListener('click', function (){refaireeq(2)},false);
	document.getElementById('eqax_d').addEventListener('click', function (){refaireeq(3)},false);
	document.getElementById('eqxpb_d').addEventListener('click', function (){refaireeq(4)},false);
	vidermessage();
	document.getElementById('conteneuropencours').style.display="";
	document.getElementById('aide').style.display="";
	document.getElementById('opencours').focus();
}
function refaireeq(typeq)
{
	tableau=["eqaxpb_cxpd","eqaxpb_d","eqax_d","eqxpb_d"];
	typeequation=typeq;
	for(var i=0, l=tableau.length; i<l; i++)
	{
		if (i==typeequation-1)
		{
			document.getElementById(tableau[i]).style.backgroundColor="#ffd34e";
		}
		else
		{
			document.getElementById(tableau[i]).style.backgroundColor="#8ab1d9";
		}
	}
	document.getElementById("options").style.display="none";
	nouvelleequation();
}
function afficheroptions()
{
	if (document.getElementById("options").style.display=="none")
	{
		document.getElementById("options").style.display="";
	}
	else
	{
		document.getElementById("options").style.display="none";
	}
}
function aide()
{
	if ((!addsous1)||(!addsous2))
	{
		alert('On peut transformer les soustractions en addition pour que cela soit plus commode!');
	}

		if ((nb1!=0)&&(nb3!=0))
		{
			alert('Pour commencer, il faut "virer" un des termes en x.');
		}
		else
		{		
			if ((nb2==0)&&(nb3==0)&&(nb1!=1))
			{
				alert('Pour trouver la  valeur de x, c\'est aussi résoudre l\'opération à trous :'+nb1+'× ... = '+nb4);
				if (nb1<0)
				{
					document.getElementById('op1').value="×("+nb1+")";
					document.getElementById('rop1').value="÷("+nb1+")";
				}
				else
				{
					document.getElementById('rop1').value="÷"+nb1;
					document.getElementById('op1').value="×"+nb1;
				}
				document.getElementById('ax').value=nb1+"x";
				var elements = document.getElementsByClassName('c_axpb');
				for(var i=0, l=elements.length; i<l; i++)
				{
					elements[i].style.display = "none";
				}
				document.getElementById('schema').style.display="";			
			}
			else if ((nb1==0)&&(nb4==0)&&(nb3!=1))
			{
				alert('Pour trouver la  valeur de x, c\'est aussi résoudre l\'opération à trous :'+nb3+'× ... = '+nb2);			
				if (nb3<0)
				{
					document.getElementById('op1').value="×("+nb3+")";
					document.getElementById('rop1').value="÷("+nb3+")";
				}
				else
				{
					document.getElementById('rop1').value="÷"+nb3;
					document.getElementById('op1').value="×"+nb3;
				}
				document.getElementById('ax').value=nb3+"x";
				var elements = document.getElementsByClassName('c_axpb');
				for(var i=0, l=elements.length; i<l; i++)
				{
					elements[i].style.display = "none";
				}
				document.getElementById('schema').style.display="";			
			}
			else
			{
				if (nb3==0) //terme en x est à gauche
				{
					if (nb1==1)
					{
						if (nb2<0)
						{
							if (addsous1)
							{
								document.getElementById('op1').value="+("+nb2+")";
								document.getElementById('rop1').value="+"+Math.abs(nb2);
								document.getElementById('ax').value="x+("+nb2+")";
							}
							else
							{
								document.getElementById('op1').value="-("+nb2+")";
								document.getElementById('rop1').value="+("+nb2+")";
								document.getElementById('ax').value="x-("+nb2+")";
							}
						}
						else
						{
							if (addsous1)
							{
								document.getElementById('op1').value="+"+nb2;
								document.getElementById('rop1').value="-"+nb2;	
								document.getElementById('ax').value="x+"+nb2;
							}
							else
							{
								document.getElementById('op1').value="-"+nb2;
								document.getElementById('rop1').value="+"+nb2;	
								document.getElementById('ax').value="x-"+nb2;
							}
						}
						var elements = document.getElementsByClassName('c_axpb');
						for(var i=0, l=elements.length; i<l; i++)
						{
							elements[i].style.display = "none";
						}
					}
					else
					{

						if (nb1<0)
						{
							document.getElementById('op1').value="×("+nb1+")";
							document.getElementById('rop1').value="÷("+nb1+")";
						}
						else
						{
							document.getElementById('rop1').value="÷"+nb1;
							document.getElementById('op1').value="×"+nb1;
						}
						if (nb2<0)
						{
							if (addsous1)
							{
								document.getElementById('op2').value="+("+nb2+")";
								document.getElementById('rop2').value="+"+Math.abs(nb2);
								document.getElementById('axpb').value=nb1+"x+("+nb2+")";
							}
							else
							{
								document.getElementById('op2').value="-("+nb2+")";
								document.getElementById('rop2').value="+("+nb2+")";
								document.getElementById('axpb').value=nb1+"x-("+nb2+")";
							}
						}
						else
						{
							if (addsous1)
							{
								document.getElementById('op2').value="+"+nb2;
								document.getElementById('rop2').value="-"+nb2;
								document.getElementById('axpb').value=nb1+"x+"+nb2;
							}
							else
							{
								document.getElementById('op2').value="-"+nb2;
								document.getElementById('rop2').value="+"+nb2;
								document.getElementById('axpb').value=nb1+"x-"+nb2;
							}
							
						}
						document.getElementById('ax').value=nb1+"x";
						var elements = document.getElementsByClassName('c_axpb');
						for(var i=0, l=elements.length; i<l; i++)
						{
							elements[i].style.display = "";
						}
					}
				}
				else
				{
					if (nb3==1)
					{
						if (nb4<0)
						{
							if (addsous2)
							{
								document.getElementById('op1').value="+("+nb4+")";
								document.getElementById('rop1').value="+"+Math.abs(nb4);
								document.getElementById('ax').value="x+("+nb4+")";
							}
							else
							{
								document.getElementById('op1').value="-("+nb4+")";
								document.getElementById('rop1').value="+("+nb4+")";
								document.getElementById('ax').value="x-("+nb4+")";								
							}
						}
						else
						{
							if (addsous2)
							{
								document.getElementById('op1').value="+"+nb4;
								document.getElementById('rop1').value="-"+nb4;	
								document.getElementById('ax').value="x+"+nb4;
							}
							else
							{
								document.getElementById('op1').value="-"+nb4;
								document.getElementById('rop1').value="+"+nb4;	
								document.getElementById('ax').value="x-"+nb4;								
							}
						}
						var elements = document.getElementsByClassName('c_axpb');
						for(var i=0, l=elements.length; i<l; i++)
						{
							elements[i].style.display = "none";
						}
					}
					else
					{
						if (nb3<0)
						{
							document.getElementById('op1').value="×("+nb3+")";
							document.getElementById('rop1').value="÷("+nb3+")";
						}
						else
						{
							document.getElementById('rop1').value="÷"+nb3;
							document.getElementById('op1').value="×"+nb3;
						}
						if (nb4<0)
						{
							if (addsous2)
							{
								document.getElementById('op2').value="+("+nb4+")";
								document.getElementById('rop2').value="+"+Math.abs(nb4);
								document.getElementById('axpb').value=nb3+"x+("+nb4+")";
							}
							else
							{
								document.getElementById('op2').value="-("+nb4+")";
								document.getElementById('rop2').value="+("+nb4+")";
								document.getElementById('axpb').value=nb3+"x-("+nb4+")";								
							}
						}
						else
						{
							if (addsous2)
							{
								document.getElementById('op2').value="+"+nb4;
								document.getElementById('rop2').value="-"+nb4;	
								document.getElementById('axpb').value=nb3+"x+"+nb4;
							}
							else
							{
								document.getElementById('op2').value="-"+nb4;
								document.getElementById('rop2').value="+"+nb4;
								document.getElementById('axpb').value=nb3+"x-"+nb4;
							}

						}
						document.getElementById('ax').value=nb3+"x";
						var elements = document.getElementsByClassName('c_axpb');
						for(var i=0, l=elements.length; i<l; i++)
						{
							elements[i].style.display = "";
						}
					}
					

				}


				
				document.getElementById('schema').style.display="";
				
			}
		}

	document.getElementById('opencours').focus();
}
function vidermessage()
{
	var messagediv  = document.getElementById('message');
	var NodeListe = messagediv.childNodes;
	while(messagediv.hasChildNodes()==true)
	{
		var Enfant=NodeListe.item(0);
		messagediv.removeChild(Enfant);
	}
}

function pgcd(areel, breel) { // Algorithme d'Euclide  
	var a=Math.abs(areel);
	var b=Math.abs(breel);
  while (b>0) {   
    var r=a%b;  
    a=b;  
    b=r;  
  }   
  return Number(a);  
}

function message(nb,nbd)
{
	if (nbd==1)// Si c'est un nombre entier
	{
		var newText  = document.createTextNode("La solution est : "+nb);
		document.getElementById('message').appendChild(newText);		
		document.getElementById('message').style.display="";	
	}
	else// Si c'est une fraction
	{
		var newText  = document.createTextNode("La solution est : ");
		document.getElementById('message').appendChild(newText);		
		
		
		var newDiv  = document.createElement("div");
		newDiv.className="fraction";
		
		var span1  = document.createElement("span");
		span1.className="fup";
		var newText1  = document.createTextNode(nb);
		span1.appendChild(newText1);
		
		var span2  = document.createElement("span");
		span2.className="bar";
		var newText2  = document.createTextNode("/");
		span2.appendChild(newText2);
		
		var span3  = document.createElement("span");
		span3.className="fdn";
		var newText3  = document.createTextNode(nbd);
		span3.appendChild(newText3);
		newDiv.appendChild(span1);
		newDiv.appendChild(span2);
		newDiv.appendChild(span3);
		document.getElementById('message').appendChild(newDiv);
		document.getElementById('message').style.display="";	

	}
}

function ecrireoperation(nb,nbd,operation,avecx,nouvelleLigne)
{
	if (nbd==1)
	{
		
		var newCell=nouvelleLigne.insertCell(-1);
		if (avecx)
		{
			if (nb==1)
			{
				var newText  = document.createTextNode(operation+"x");
			}
			else
			{
				if (nb<0)
				{
					var newText  = document.createTextNode(operation+"("+nb+"x)");
				}
				else
				{
					var newText  = document.createTextNode(operation+nb+"x");
				}
			}
			
		}
		else
		{
			if (nb<0)
			{
				var newText  = document.createTextNode(operation+"("+nb+")");
			}
			else
			{
				var newText  = document.createTextNode(operation+nb);
			}
		}
		newCell.appendChild(newText);		
	}
	else
	{
		var newCell=nouvelleLigne.insertCell(-1);
		var newoperation  = document.createTextNode(operation);
		
		var newDiv  = document.createElement("div");
		newDiv.className="fraction";
		
		var span1  = document.createElement("span");
		span1.className="fup";
		if (avecx)
		{
			var newText1  = document.createTextNode(nb+"x");
		}
		else
		{
			var newText1  = document.createTextNode(nb);
		}
	
		span1.appendChild(newText1);
		
		var span2  = document.createElement("span");
		span2.className="bar";
		var newText2  = document.createTextNode("/");
		span2.appendChild(newText2);
		
		var span3  = document.createElement("span");
		span3.className="fdn";
		var newText3  = document.createTextNode(nbd);
		span3.appendChild(newText3);
		
		newDiv.appendChild(span1);
		newDiv.appendChild(span2);
		newDiv.appendChild(span3);
		newCell.appendChild(newoperation);
		newCell.appendChild(newDiv);
	}
}
function ecrirenombre(nb,nbd,avecx,nouvelleLigne)
{
	if (nbd==1)
	{
		
		var newCell=nouvelleLigne.insertCell(-1);
		if (avecx)
		{
			if (nb==1)
			{
				var newText  = document.createTextNode("x");
			}
			else
			{
				var newText  = document.createTextNode(nb+"x");
			}
			
		}
		else
		{
			if (nb<0)
			{
				var newText  = document.createTextNode("("+nb+")");
			}
			else
			{
				var newText  = document.createTextNode(nb);
			}
		}
		newCell.appendChild(newText);		
	}
	else
	{
		var newCell=nouvelleLigne.insertCell(-1);
		var newDiv  = document.createElement("div");
		newDiv.className="fraction";
		
		var span1  = document.createElement("span");
		span1.className="fup";
		if (avecx)
		{
			var newText1  = document.createTextNode(nb+"x");
		}
		else
		{
			var newText1  = document.createTextNode(nb);
		}
	
		span1.appendChild(newText1);
		
		var span2  = document.createElement("span");
		span2.className="bar";
		var newText2  = document.createTextNode("/");
		span2.appendChild(newText2);
		
		var span3  = document.createElement("span");
		span3.className="fdn";
		var newText3  = document.createTextNode(nbd);
		span3.appendChild(newText3);
		newDiv.appendChild(span1);
		newDiv.appendChild(span2);
		newDiv.appendChild(span3);
		
		newCell.appendChild(newDiv);
	}
}

function ajouteligne()
{
	var nouvelleLigne = document.getElementById("equation").insertRow(-1);
	
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);	
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);	
	
	if (nb1!=0)
	{
		ecrirenombre(nb1,nb1d,true,nouvelleLigne);
	}
	else //nb1==0 donc on n'affiche pas la première case du tableau
	{
		if ((nb1==0)&&(!addsous1)&&(nb2!=0)) // s'il y a une soustraction et que le premier terme est nul, il faut mettre un zero
		{
			var newCell=nouvelleLigne.insertCell(-1);
			var newText  = document.createTextNode("0");
			newCell.appendChild(newText);			
		}
		else
		{
			var newCell=nouvelleLigne.insertCell(-1);
			var newText  = document.createTextNode("");
			newCell.appendChild(newText);
		}
	}

	if ((nb2!=0)&&(nb1!=0))
	{
		var newCell=nouvelleLigne.insertCell(-1);
		if (addsous1)
		{
			var newText  = document.createTextNode("+");
			newCell.appendChild(newText);
		}
		else
		{
			var newText  = document.createTextNode("-");
			newCell.appendChild(newText);
			newCell.addEventListener('click', function (){sousenadd(1)},false);
			newCell.addEventListener('mouseover', function (){montre('Cliquer pour transformer la soustraction en addition.');},false);
			newCell.addEventListener('mouseout', cache ,false);
			newCell.style.cursor="pointer";
		}	
		
	}
	else
	{
		if ((nb2==0)&&(nb1==0))// si les deux sont nuls, il faut bien afficher quelque chose donc on met 0 
		{
			var newCell=nouvelleLigne.insertCell(-1);
			var newText  = document.createTextNode("0");
			addsous1=true;
			newCell.appendChild(newText);					
		}
		else
		{
			if ((nb1==0)&&(!addsous1)) // il faut garder le - s'il y a une soustraction, donc en gros 
			{
				var newCell=nouvelleLigne.insertCell(-1);
				var newText  = document.createTextNode("-");
				newCell.appendChild(newText);
				newCell.addEventListener('click', function (){sousenadd(1)},false);
				newCell.addEventListener('mouseover', function (){montre('Cliquer pour transformer la soustraction en addition.');},false);
				newCell.addEventListener('mouseout', cache ,false);
				newCell.style.cursor="pointer";
			}
			else
			{
				var newCell=nouvelleLigne.insertCell(-1);
				var newText  = document.createTextNode("");
				newCell.appendChild(newText);		
			}
		}
	}

	
	if (nb2!=0)//nb2==0 donc on n'affiche pas la 3e case du tableau
	{
		ecrirenombre(nb2,nb2d,false,nouvelleLigne);
    }
    else
    {
		var newCell=nouvelleLigne.insertCell(-1);
		var newText  = document.createTextNode("");
		newCell.appendChild(newText);
		
	}
	
	
	
    var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("=");
    newCell.appendChild(newText);

	
	
if (nb3!=0)
	{
		ecrirenombre(nb3,nb3d,true,nouvelleLigne);

	}
	else //nb3==0 donc on n'affiche pas la première case du tableau
	{
		if ((nb3==0)&&(!addsous2)&&(nb4!=0)) // s'il y a une soustraction et que le premier terme est nul, il faut mettre un zero
		{
			var newCell=nouvelleLigne.insertCell(-1);
			var newText  = document.createTextNode("0");
			newCell.appendChild(newText);			
		}
		else
		{
			var newCell=nouvelleLigne.insertCell(-1);
			var newText  = document.createTextNode("");
			newCell.appendChild(newText);
		}
	}

	if ((nb3!=0)&&(nb4!=0))
	{
		var newCell=nouvelleLigne.insertCell(-1);
		if (addsous2)
		{
			var newText  = document.createTextNode("+");
			newCell.appendChild(newText);
		}
		else
		{
			var newText  = document.createTextNode("-");
			newCell.appendChild(newText);
			newCell.addEventListener('click', function (){sousenadd(2)},true);
			newCell.addEventListener('mouseover', function (){montre('Cliquer pour transformer la soustraction en addition.');},false);
			newCell.addEventListener('mouseout', cache ,false);
			newCell.style.cursor="pointer";
		}	

	}
	else
	{
		if ((nb3==0)&&(nb4==0))// si les deux sont nuls, il faut bien afficher quelque chose donc on met 0 
		{
			var newCell=nouvelleLigne.insertCell(-1);
			var newText  = document.createTextNode("0");
			addsous2=true;
			newCell.appendChild(newText);					
		}
		else
		{
			if ((nb3==0)&&(!addsous2)) // il faut garder le - s'il y a une soustraction
			{
				var newCell=nouvelleLigne.insertCell(-1);
				var newText  = document.createTextNode("-");
				newCell.appendChild(newText);
				newCell.addEventListener('click', function (){sousenadd(2)},true);
				newCell.addEventListener('mouseover', function (){montre('Cliquer pour transformer la soustraction en addition.');},false);
				newCell.addEventListener('mouseout', cache ,false);
				newCell.style.cursor="pointer";
			}
			else
			{
				var newCell=nouvelleLigne.insertCell(-1);
				var newText  = document.createTextNode("");
				newCell.appendChild(newText);		
			}
		}
	}

	
	if (nb4!=0)//nb4==0 donc on n'affiche pas la 3e case du tableau
	{
		ecrirenombre(nb4,nb4d,false,nouvelleLigne);
    }
    else
    {
		var newCell=nouvelleLigne.insertCell(-1);
		var newText  = document.createTextNode("");
		newCell.appendChild(newText);
		
	}
	
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);		
	
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);	
}


function annuler()
{
	var arrayLignes = document.getElementById("equation").rows;
	var nbligne=arrayLignes.length;
	for (i=0;i<nbligne;i++)
	{
			document.getElementById("equation").deleteRow(-1);
	}
	vidermessage();
	nb1=nb1init;
	nb2=nb2init;
	nb3=nb3init;
	nb4=nb4init;
	addsous1=addsous1init;
	addsous2=addsous2init;
	ajouteligne();
	document.getElementById('opencours').focus();
}

function nouvelleequation()
{
	var arrayLignes = document.getElementById("equation").rows;
	var nbligne=arrayLignes.length;
	for (i=0;i<nbligne;i++)
	{
			document.getElementById("equation").deleteRow(-1);
	}
	
	init();
	document.getElementById('schema').style.display="none";
	
}
function afficheoperation(theoperation)
{
	thex=theoperation[theoperation.length-1];
	if (thex=="x")
	{
		sifraction=theoperation.indexOf("/");// au  cas où le nombre de l'opération est une fraction, on détecte numérateur et dénominateur
		if ((sifraction==-1)||(sifraction==0))
		{
			if ((theoperation=="+x")||(theoperation=="-x"))
			{
				var nombre=1;
			}
			else
			{
				var nombre=Number(theoperation.substring(1,theoperation.length-1));
			}
			var nombred=1;
		}
		else
		{
			var nombre=Number(theoperation.substring(1,sifraction));
			var nombred=Number(theoperation.substring(sifraction+1,theoperation.length-1));
			if (nombre%nombred==0) //si la fraction est un entier
			{
				nombre=nombre/nombred;
				nombred=1;
			}
		}			
	}
	else
	{
		sifraction=theoperation.indexOf("/");// au  cas où le nombre de l'opération est une fraction, on détecte numérateur et dénominateur
		if ((sifraction==-1)||(sifraction==0))
		{
			var nombre=Number(theoperation.substring(1,theoperation.length));
			var nombred=1;
		}
		else
		{
			var nombre=Number(theoperation.substring(1,sifraction));
			var nombred=Number(theoperation.substring(sifraction+1,theoperation.length));
			if (nombre%nombred==0) //si la fraction est un entier
			{
				nombre=nombre/nombred;
				nombred=1;
			}
		}				
	}


	if (theoperation[0]=="*")
		theoperation="×"+theoperation.substring(1,theoperation.length);
	if ((theoperation[0]=="/")|| (theoperation[0]==":"))
		theoperation="÷"+theoperation.substring(1,theoperation.length);

	var nouvelleLigne = document.getElementById("equation").insertRow(-1);
	
	ecrireoperation(nombre,nombred,theoperation[0],(thex=="x"),nouvelleLigne);
	


	var newCell=nouvelleLigne.insertCell(-1);
	var image = document.createElement("img");
	image.src = "fleche.png";
	newCell.appendChild(image);

	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);
	var newCell=nouvelleLigne.insertCell(-1);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);

	var newCell=nouvelleLigne.insertCell(-1);
	var image2 = document.createElement("img");
	image2.src = "fleche2.png";
	newCell.appendChild(image2);
	var newText  = document.createTextNode("");
	newCell.appendChild(newText);
	ecrireoperation(nombre,nombred,theoperation[0],(thex=="x"),nouvelleLigne);
}


function simplification()
{

		lepgcd=pgcd(nb1,nb1d); //simplication de la fractions, on évite de mettre un dénominateur négatif
		nb1=nb1/lepgcd*(Math.abs(nb1d)/nb1d);
		nb1d=Math.abs(nb1d)/lepgcd;
		
		lepgcd=pgcd(nb2,nb2d); //simplication de la fractions
		nb2=nb2/lepgcd*(Math.abs(nb2d)/nb2d);
		nb2d=Math.abs(nb2d)/lepgcd;
		lepgcd=pgcd(nb3,nb3d); //simplication de la fraction
		nb3=nb3/lepgcd*(Math.abs(nb3d)/nb3d);
		nb3d=Math.abs(nb3d)/lepgcd;
		lepgcd=pgcd(nb4,nb4d); //simplication de la fraction
		nb4=nb4/lepgcd*(Math.abs(nb4d)/nb4d);
		nb4d=Math.abs(nb4d)/lepgcd;
}

function valider()
{
	var operation = document.getElementById('opencours').value;
	op=operation[0];

	var ajoutligne=0;
//	var verif = new RegExp("^[+\\-\\*:/][0-9]+x?$", "g");
	var verif = new RegExp("^[+\\-\\*:/]\\-?[0-9]+([:/][0-9]+)?x?$", "g");
	var verif2 = new RegExp("^[+\\-\\*:/]\\(\\+?\\-?[0-9]+([:/][0-9]+)?x?\\)$", "g"); //avec parenthèses
	if (verif2.test(operation)) //si présence de parenhèses on les vire
	{
		operation=operation.replace("(","");
		operation=operation.replace(")","");
		
		if (operation[1]=='+')
		{
			
			
			operation=operation[0]+operation.substring(2,operation.length);
		}
	}
	
	thex=operation[operation.length-1];
	
	
	test=verif.test(operation);
	
	test=test||(operation=="+x")||(operation=="-x");
	
	if (!test)
	{
		if (operation!='')
		alert( "Mauvaise opération de base");
	}
	else
	{
		if (thex=="x")
		{

			sifraction=operation.indexOf("/");// au  cas où le nombre de l'opération est une fraction, on détecte numérateur et dénominateur
			if ((sifraction==-1)||(sifraction==0))
			{
				if ((operation=="+x")||(operation=="-x"))
				{
					var nombre=1;
				}
				else
				{
					var nombre=Number(operation.substring(1,operation.length-1));
				}
				var nombred=1;
			}
			else
			{
				var nombre=Number(operation.substring(1,sifraction));
				var nombred=Number(operation.substring(sifraction+1,operation.length-1));
				if (nombre%nombred==0) //si la fraction est un entier
				{
					nombre=nombre/nombred;
					nombred=1;
				}
			}			



			switch  (op)
			{
				case '+':
					nb1=nb1*nombred+nombre*nb1d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					nb1d=nb1d*nombred;
					nb3=nb3*nombred+nombre*nb3d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					nb3d=nb3d*nombred;
					ajoutligne=1;
				break;
				case '-':
					nb1=nb1*nombred-nombre*nb1d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					nb1d=nb1d*nombred;
					nb3=nb3*nombred-nombre*nb3d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					nb3d=nb3d*nombred;
					ajoutligne=1;
				break;
				case ':':
					ajoutligne=0;
				break;
				case '*':
					ajoutligne=0;
				break;
				 default:
					ajoutligne=0;
				break;
			}
		}
		else
		{
			//ici on ajoute un nombre sans "x", il faut donc faire attention à l'opération devant ces termes
			sifraction=operation.indexOf("/");// au  cas où le nombre de l'opération est une fraction, on détecte numérateur et dénominateur
			if ((sifraction==-1)||(sifraction==0))
			{
				var nombre=Number(operation.substring(1,operation.length));
				var nombred=1;
			}
			else
			{
				var nombre=Number(operation.substring(1,sifraction));
				var nombred=Number(operation.substring(sifraction+1,operation.length));
				if (nombre%nombred==0) //si la fraction est un entier
				{
					nombre=nombre/nombred;
					nombred=1;
				}
			}
				
			switch  (op)
			{
				case '+':
					if (addsous1)
					{
						nb2=nb2*nombred+nombre*nb2d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					}
					else //si soustraction alors cela revient à soustraire 
					{
						nb2=nb2*nombred-nombre*nb2d;
					}
					nb2d=nb2d*nombred;
					if (addsous2) //si addition alors on additionne normalement
					{
						nb4=nb4*nombred+nombre*nb4d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					}
					else//si soustraction alors cela revient à soustraire 
					{
						nb4=nb4*nombred-nombre*nb4d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					}
					nb4d=nb4d*nombred;
					ajoutligne=1;
				break;
				case '-':
					if (addsous1)
					{
						nb2=nb2*nombred-nombre*nb2d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					}
					else //si soustraction alors cela revient à soustraire 
					{
						nb2=nb2*nombred+nombre*nb2d;
					}
					nb2d=nb2d*nombred;
					if (addsous2) //si addition alors on additionne normalement
					{
						nb4=nb4*nombred-nombre*nb4d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					}
					else//si soustraction alors cela revient à soustraire 
					{
						nb4=nb4*nombred+nombre*nb4d; //réduction au même dénominateur bourrain sera simplifiée par la function simplification
					}
					nb4d=nb4d*nombred;
					ajoutligne=1;
				break;
				case ':':
					//diviser par un nombre revient à multiplier par son inverse. sera simplifiée par la function simplification
					nb1=nb1*nombred;
					nb1d=nb1d*nombre;
					nb2=nb2*nombred;
					nb2d=nb2d*nombre;
					nb3=nb3*nombred;
					nb3d=nb3d*nombre;
					nb4=nb4*nombred;
					nb4d=nb4d*nombre;

					ajoutligne=1;
				break;
				case '/':
					//diviser par un nombre revient à multiplier par son inverse. sera simplifiée par la function simplification
					nb1=nb1*nombred;
					nb1d=nb1d*nombre;
					nb2=nb2*nombred;
					nb2d=nb2d*nombre;
					nb3=nb3*nombred;
					nb3d=nb3d*nombre;
					nb4=nb4*nombred;
					nb4d=nb4d*nombre;
					ajoutligne=1;
				break;
				case '*':
					//On multiplie classiquement. sera simplifiée par la function simplification
					nb1=nb1*nombre;
					nb1d=nb1d*nombred;
					nb2=nb2*nombre;
					nb2d=nb2d*nombred;
					nb3=nb3*nombre;
					nb3d=nb3d*nombred;
					nb4=nb4*nombre;
					nb4d=nb4d*nombred;
					
					ajoutligne=1;
				break;
				 default:
					ajoutligne=0;
				break;
			}
		}
		if (ajoutligne)
		{
			afficheoperation(operation);
			simplification();
			ajouteligne();
			affichesolutionsibesoin();
		}
	}
	document.getElementById('opencours').value="";
	document.getElementById('schema').style.display="none";
	document.getElementById('opencours').focus();
	
}
function affichesolutionsibesoin()
{
	if ((nb1==0)&&(nb4==0)&&(nb3==1)&&(nb3d==1)&&(addsous1))//solution 
	{
		message(nb2,nb2d);
		document.getElementById('conteneuropencours').style.display="none";
		document.getElementById('aide').style.display="none";
	}
	if ((nb3==0)&&(nb2==0)&&(nb1==1)&&(nb1d==1)&&(addsous2))//solution 
	{
		message(nb4,nb4d);
		document.getElementById('conteneuropencours').style.display="none";
		document.getElementById('aide').style.display="none";
	}
}


// info bulle
var afficheinfobulle=false; // La variable afficheinfobulle nous dit si la bulle est visible ou non
 
function move(e) 
{
	if(afficheinfobulle)   // Si la bulle est visible, on calcul en temps reel sa position ideale
	{
		if (navigator.appName!="Microsoft Internet Explorer")  // Si on est pas sous IE
		{
			document.getElementById("infobulle").style.left=e.pageX + 5+"px";
			document.getElementById("infobulle").style.top=e.pageY + 10+"px";
		}
		else
		{
			if(document.documentElement.clientWidth>0)
			{
				document.getElementById("infobulle").style.left=20+event.x+document.documentElement.scrollLeft+"px";
				document.getElementById("infobulle").style.top=10+event.y+document.documentElement.scrollTop+"px";
			}
			else
			{
				document.getElementById("infobulle").style.left=20+event.x+document.body.scrollLeft+"px";
				document.getElementById("infobulle").style.top=10+event.y+document.body.scrollTop+"px";
			}
		}
	}
}
 
function montre(text) 
{
	if (afficheinfobulle==false) 
	{

		document.getElementById("infobulle").style.visibility="visible"; // Si il est cacher (la verif n'est qu'une securité) on le rend visible.
		document.getElementById("infobulle").innerHTML = text; // on copie notre texte dans l'élément html
		afficheinfobulle=true;
		document.onmousemove=move;
	}
}

function cache() 
{
	if(afficheinfobulle==true) 
	{
		document.getElementById("infobulle").style.visibility="hidden"; // Si la bulle est visible on la cache
		afficheinfobulle=false;
	}
}





//fin info bulle
window.onload=init();
