import type Location from '@/types/location.type';

function getShortestFlight(start: Location, end: Location): number {
  // Définir les mouvements possibles (haut, bas, gauche, droite, diagonales)
  const movements: Location[] = [
    { x: 0, y: -1 }, // Haut
    { x: 0, y: 1 },  // Bas
    { x: -1, y: 0 }, // Gauche
    { x: 1, y: 0 },  // Droite
    { x: -1, y: -1 }, // Diagonale supérieure gauche
    { x: 1, y: -1 },  // Diagonale supérieure droite
    { x: -1, y: 1 },  // Diagonale inférieure gauche
    { x: 1, y: 1 }    // Diagonale inférieure droite
  ];

  // Créer un ensemble pour stocker les positions déjà visitées
  const visited = new Set<string>();

  // Créer une file pour effectuer la recherche en largeur (BFS)
  const queue: { position: Location, cost: number }[] = [{ position: start, cost: 0 }];
  visited.add(`${start.x},${start.y}`);

  while (queue.length > 0) {
    // Extraire le nœud en cours d'examen de la file
    const currentNode = queue.shift();

    if (currentNode) {
      // Vérifier si nous sommes arrivés à la position d'arrivée
      if (currentNode.position.x === end.x && currentNode.position.y === end.y) {
        return currentNode.cost; // Retourner le coût total
      }

      // Explorer les mouvements possibles depuis la position actuelle
      for (const movement of movements) {
        const newX = currentNode.position.x + movement.x;
        const newY = currentNode.position.y + movement.y;
        const newPosition: Location = { x: newX, y: newY };
        const newPositionKey = `${newX},${newY}`;

        // Vérifier si la nouvelle position est valide et non visitée
        if (!visited.has(newPositionKey)) {
          // Calculer le coût pour atteindre la nouvelle position
          const newCost = currentNode.cost + 1;

          // Ajouter la nouvelle position à la file
          queue.push({ position: newPosition, cost: newCost });

          // Marquer la nouvelle position comme visitée
          visited.add(newPositionKey);
        }
      }
    }
  }

  // Si la destination n'est pas atteignable, retourner -1
  return -1;
}

export default getShortestFlight;
