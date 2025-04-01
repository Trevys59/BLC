alert('Bienvenue dans Blue Lock Clicker. \nVotre objectif: marquer le plus de but. \nPour cela vous pouvez appeler les meilleurs attaquant de Blue Lock. \nBon jeu.');

//////////////////////////////////////////////////
///// Déclariation des variables /////////////////
//////////////////////////////////////////////////

let goal = 0; //Variable du nombre de goals inscrit
let clic = 0; //Variable du nombre de clicks fait
let bpc = 1; // nombre de ButParClic
let bonusActif = ""; //Liste des bonus déjà achetés
let NbIsagi = 0;
let NbBachira = 0;
let NbRin = 0;
let NbNagi = 0;
let NbBaro = 0;
let NbKunigami = 0;
let NomDuButeur = 'Base';
let bonusID = '';
let bonusListe = [
    {
        'Nom': 'Isagi',
        'icon': '👁️',
        'prix': 20,
        'multiplier': 2,
        'Nb': NbIsagi
    },
    {
        'Nom': 'Bachira',
        'icon': '🎩',
        'prix': 50,
        'multiplier': 2.5,
        'Nb': NbBachira
    },
    {
        'Nom': 'Rin',
        'icon': '🎯',
        'prix': 200,
        'multiplier': 2,
        'Nb': NbRin
    },
    {
        'Nom': 'Nagi',
        'icon': '🥱',
        'prix': 500,
        'multiplier': 2,
        'Nb': NbNagi
    },
    {
        'Nom': 'Baro',
        'icon': '👑',
        'prix': 1000,
        'multiplier': 3,
        'Nb': NbBaro
    },
    {
        'Nom': 'Kunigami',
        'icon': '🃏',
        'prix': 5000,
        'multiplier': 1.7,
        'Nb': NbKunigami
    }
]

//A chaque clic augmente le nombre de but et de clic, lance la fonction de butanim
function but(){
    clic += 1;
    clicks.innerHTML=clic;
    goal += bpc;
    goals.innerHTML=goal;
    butanim();
    document.title = goal + ' Goals - Blue Lock Kicler';
    document.getElementById('bonusActif').innerText = bonusActif;     //Affiche les bonus achetés
}


//////////////////////////////////////////////////
///// Fonctions d'achat des bonus ////////////////
//////////////////////////////////////////////////

function achatIsagi(){
    achatBonus(0);
}
function achatBachira(){
    achatBonus(1);
}
function achatRin(){
    achatBonus(2);
}
function achatNagi(){
    achatBonus(3);
}
function achatBaro(){
    achatBonus(4);
}
function achatKunigami(){
    achatBonus(5);
}

function achatBonus(bonusID){
    let ID = bonusListe[bonusID];
    if(ID.Nb == 0){
        if(goal >= ID.prix){
            goal = goal - ID.prix;
            bpc = bpc * ID.multiplier;
            ID.Nb +=1;
            bonusActif = bonusActif + ID.icon;
            document.getElementById('Cout'+ID.Nom).innerText='';
            NomDuButeur = ID.Nom;
            changerimg(ID.Nom);
            alert(ID.Nom+" débloqué");
            Vidbonus();
            document.getElementById('bonusActif').innerText=bonusActif;
            goals.innerHTML=goal;
            butdebase();
        }

    }else{alert("Tu as déja "+ID.Nom);}
}


//////////////////////////////////////////////////
///// Fonctions d'animation/changement du html ///
//////////////////////////////////////////////////

// fonction qui change l'état de l'image du bouton shoot et des bonus
function changerimg(imgid){
    var img = document.getElementById(imgid);
    img.src = 'image/'+imgid+'2.png';
    var img = document.getElementById("shoot");
    img.src = 'image/shoot'+NomDuButeur+'.png';
}

// fonction qui créer une animation de but
function butanim(){
    let choix = Math.random();
    choix = choix * 10 % 2;
    var img = document.getElementById("but");
    if (choix<0.5){
        img.src = 'image/but'+NomDuButeur+'1.png';
    }else if (choix<1){
        img.src = 'image/but'+NomDuButeur+'2.png';
    }else if (choix<1.5){
        img.src = 'image/but'+NomDuButeur+'3.png';
    }else{
        img.src = 'image/but'+NomDuButeur+'4.png';
    }
    setTimeout(butdebase, 500); //fonction butdebase toutes les 0.5 secondes
}
function butdebase(){
    var img = document.getElementById("but");
    img.src = 'image/but'+NomDuButeur+'0.png';//Mettre l'image standard
}

// fonction qui lance une video sur les personnages
function Vidbonus(){
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = 'image/Vid'+NomDuButeur+'.mp4';
    videoPlayer.play();
    console.log(videoPlayer.src);
}

//////////////////////////////////////////////////
///// Fonctions sauvegarde/load/reset ////////////
//////////////////////////////////////////////////

// fonction de sauvegarde
function save() {
    let saveData = {
        goal: goal,
        clic: clic,
        bpc: bpc,
        bonusActif: bonusActif,
        NbIsagi: NbIsagi,
        NbBachira: NbBachira,
        NbRin: NbRin,
        NbNagi: NbNagi,
        NbBaro: NbBaro,
        NbKunigami: NbKunigami,
        bonusListe: bonusListe
    }
    localStorage.setItem("sauvegarde", JSON.stringify(saveData));
}
// sauvegarde automatique toutes les 3 secondes
let saveAuto = setInterval(function(){save()}, 3000); 

// fonction de chargement des données
function load() {
    let saveData = JSON.parse(localStorage.getItem("sauvegarde"));
    if (saveData !== null) {
        goal = saveData.goal;
        clic = saveData.clic;
        bpc = saveData.bpc;
        bonusActif = saveData.bonusActif;
        NbIsagi = saveData.NbIsagi;
        NbBachira = saveData.NbBachira;
        NbRin = saveData.NbRin;
        NbNagi = saveData.NbNagi;
        NbBaro = saveData.NbBaro;
        NbKunigami = saveData.NbKunigami;
        bonusListe = saveData.bonusListe;
        document.getElementById("goals").innerHTML = goal;
        document.getElementById("clicks").innerHTML = clic;
        document.getElementById('bonusActif').innerText = bonusActif;
        document.title = goal + ' Goals - Blue Lock Kicler';
        bonusLoad();
        butdebase();
    }
}
// Fonctions Reload des bonus
function bonusLoad(){
    for (let i=0; i<bonusListe.length; i++) {
        if (bonusListe[i].Nb==1) {
            console.log(bonusListe[i].Nb)
            document.getElementById('Cout'+bonusListe[i].Nom).innerText='';
            NomDuButeur = bonusListe[i].Nom;
            changerimg(bonusListe[i].Nom);
        }
    }
    document.getElementById('bonusActif').innerText=bonusActif;
    goals.innerHTML=goal;
    clicks.innerHTML=clic;
}

// fonction qui remet à zéro le jeu
function reset(){
    goal = 0;
    clic = 0;
    bpc = 1;
    bonusActif = "";
    NomDuButeur = 'Base';
    NbIsagi = 0;
    NbBachira = 0;
    NbRin = 0;
    NbNagi = 0;
    NbBaro = 0;
    NbKunigami = 0;
    resetimg();
    butdebase();
}
//Fonction qui reset les changements du html
function resetimg(){
    var img = document.getElementById("shoot");
    img.src = 'image/shootBase.png';
    for (let i=0; i<bonusListe.length; i++) {
        var img = document.getElementById(bonusListe[i].Nom);
        img.src = 'image/'+bonusListe[i].Nom+'.png';
        document.getElementById('Cout'+bonusListe[i].Nom).innerText= bonusListe[i].prix+' goals';
        bonusListe[i].Nb = 0;
    }
    document.getElementById('bonusActif').innerText=bonusActif;
    document.title = goal + ' Goals - Blue Lock Kicler';
    goals.innerHTML=goal;
    clicks.innerHTML=clic;
}

// appelle la fonction load au chargement de la page
window.onload = function() {
    load();
};