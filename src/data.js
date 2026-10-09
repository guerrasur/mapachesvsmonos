export const CREATURES = [
  {id:'rad',name:'Rastro',faction:'raccoon',mutation:'RADIACTIVO',lore:'Un brillo verde entre el óxido.'},
  {id:'spore',name:'Micelio',faction:'raccoon',mutation:'ESPORAS',lore:'El bosque crece sobre su espalda.'},
  {id:'volt',name:'Volt',faction:'monkey',mutation:'ELÉCTRICO',lore:'Se mueve por los cables que siguen vivos.'},
  {id:'thorn',name:'Zarza',faction:'monkey',mutation:'VEGETAL',lore:'Las ruinas le enseñaron a echar raíces.'}
];
export const FACTIONS = {
  raccoon:{name:'MAPACHES',zone:'Distrito oxidado',hiding:'arbusto',bait:'restos',ids:['rad','spore']},
  monkey:{name:'MONOS',zone:'Ruinas invadidas',hiding:'árbol',bait:'fruta',ids:['volt','thorn']}
};
