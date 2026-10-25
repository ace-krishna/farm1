import type { Animal } from '../theme';

// Demo data only — these are the animals from the Stitch Home screen.
// Gauri's photo is bundled locally (assets/gauri.png, from the Stitch design).
// The other animals use initials in the Stitch avatar colour: their Stitch
// icons were generic placeholders, so initials are clearer and consistent.
// Real animal records will replace this list when a backend / local store is added.
export const DEMO_ANIMALS: Animal[] = [
  { id: 'nandi', name: 'Nandi', breed: 'Bull', tag: '#01', initials: 'N' },
  { id: 'gauri', name: 'Gauri', breed: 'Gir', tag: '#02', initials: 'G', image: require('../../assets/gauri.png') },
  { id: 'lakshmi', name: 'Lakshmi', breed: 'Cow', tag: '#03', initials: 'L' },
  { id: 'bheema', name: 'Bheema', breed: 'Cow', tag: '#04', initials: 'B' },
];
