export interface nombrePartsFoyerFiscalInterface {
  situationMaritale: 'celibataire' | 'marie' | 'pacs' | 'veuf'
  seul: 0 | 1
  enfantsGardeTotale: number
  enfantsGardeAlternee: number
  enfantsHandicapesGardeTotale: number
  enfantsHandicapesGardeAlternee: number
  parentIsole: 0 | 1
  ancienParentIsole: 0 | 1
  anciensCombattants: number
  veuveAncienCombattant: 0 | 1
  veuveGuerre: 0 | 1
  invalides: number
  autresHandicapesHeberges: number
}
