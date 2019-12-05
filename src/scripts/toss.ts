const playersReferencial: string[] = [
   'Justine',
   'Julien',
   'Laëtitia',
   'Josselin',
   'Jean-Marie',
   'Sunny',
   'Thérèse',
   'Martine',
   'Gérard',
 ];
 
 const forbidenMatches = [
   ['Jean-Marie', 'Sunny'],
   ['Justine', 'Julien'],
   ['Martine', 'Gérard'],
   ['Josselin', 'Laëtitia'],
 ];
 
 console.log(`${playersReferencial.length} participants: ${playersReferencial.join(',')}`);
 
 const play = (): string[][] => {
   const playersLeft: string[] = Array.from(playersReferencial);
   let playersRight: string[] = Array.from(playersReferencial);
 
   function getRandomInt(max: number): number {
     return Math.floor(Math.random() * Math.floor(max));
   }
 
   const getMatch = (): string[] => {
     const indexPlayLeft: number = getRandomInt(playersLeft.length);
     const playerLeft: string = playersLeft.splice(indexPlayLeft, 1)[0];
     const playersRightCopy = Array.from(playersRight);
 
     // remove the player left from the players available
     const indexToRemove = playersRightCopy.findIndex(p => p === playerLeft);
     if (indexToRemove > -1) {
       playersRightCopy.splice(indexToRemove, 1);
     }
 
     // get a random player
     const indexPlayerRight: number = getRandomInt(playersRightCopy.length);
     const playerRight: string = playersRightCopy.splice(indexPlayerRight, 1)[0];
 
     if (indexToRemove > -1) {
       playersRightCopy.push(playerLeft);
     }
     playersRight = playersRightCopy;
 
     return [playerLeft, playerRight];
   };
 
   const result: string[][] = [];
   while (playersLeft.length) {
     result.push(getMatch());
   }
 
   return result;
 };
 
 const getMatch = (): string[][] => {
   const results = play();
   try {
     results.forEach(result => {
       forbidenMatches.forEach(forbidenMath => {
         if (
           forbidenMath.includes(result[0]) &&
           forbidenMath.includes(result[1])
         ) {
           throw Error('Invalid Math');
         }
       });
     });
     return results;
   } catch (e) {
     return getMatch();
   }
 };
 
 const results = getMatch();
 console.log('');
 console.log('Résultat:');
 results.forEach(result => {
   console.log(`${result[0]} offre à ${result[1]}`);
 });
 