import { Handler } from 'express'
import { nombrePartsFoyerFiscalInterface } from '../../interfaces/nombrePartsFoyerFiscalInterface'

export const getNombreParts: Handler = (req, res) => {
  const payload: Partial<nombrePartsFoyerFiscalInterface> = req.body

  const {
    situationMaritale = 'celibataire',
    enfantsGardeTotale = 0,
    enfantsGardeAlternee = 0,
    enfantsHandicapesGardeTotale = 0,
    enfantsHandicapesGardeAlternee = 0,
    parentIsole = 0,
    ancienParentIsole = 0,
    anciensCombattants = 0,
    veuveAncienCombattant = 0,
    veuveGuerre = 0,
    invalides = 0,
    autresHandicapesHeberges = 0,
  } = payload

  // calcul parts situation maritale
  const partsSituationMaritale = (
    situationMaritale: 'celibataire' | 'marie' | 'pacs' | 'veuf'
  ): number => {
    if (situationMaritale === 'celibataire') return 1
    else if (situationMaritale === 'marie') return 2
    else if (situationMaritale === 'pacs') return 2
    else if (situationMaritale === 'veuf') return 1
    else return -1
  }

  //calcul partsEnfantGardeTotale
  const partsEnfantsGardeTotale = (
    enfantsGardeTotale: number,
    autresHandicapesHeberges: number
  ) => {
    if (enfantsGardeTotale + autresHandicapesHeberges >= 3) {
      return (
        enfantsGardeTotale * 0.5 +
        0.5 * (enfantsGardeTotale + autresHandicapesHeberges - 2)
      )
    } else {
      return enfantsGardeTotale * 0.5
    }
  }

  // calcul parts enfants Garde Alternee
  const partsEnfantsGardeAlternee = (
    enfantsGardeTotale: number,
    enfantsGardeAlternee: number,
    autresHandicapesHeberges: number
  ) => {
    const nombrePersonnesCharge =
      enfantsGardeAlternee + enfantsGardeTotale + autresHandicapesHeberges
    if (nombrePersonnesCharge - enfantsGardeAlternee === 0) {
      return (
        0.25 * enfantsGardeAlternee +
        0.25 * Math.max(enfantsGardeAlternee - 2, 0)
      )
    } else if (nombrePersonnesCharge - enfantsGardeAlternee === 1) {
      return (
        0.25 * enfantsGardeAlternee +
        0.25 * Math.max(enfantsGardeAlternee - 1, 0)
      )
    } else {
      //(nombrePersonnesCharge - enfantsGardeAlternee >= 2)
      return 0.5 * enfantsGardeAlternee
    }
  }

  // calcul parts enfants handicapes
  const partsEnfantsHandicapes = (
    enfantsHandicapesGardeTotale: number,
    enfantsHandicapesGardeAlternee: number
  ) => {
    return (
      0.5 * enfantsHandicapesGardeTotale + 0.25 * enfantsHandicapesGardeAlternee
    )
  }

  // calcul part parent isole
  const partParentIsole = (
    parentIsole: 0 | 1,
    enfantsGardeTotale: number,
    enfantsGardeAlternee: number,
    autresHandicapesHeberges: number
  ) => {
    if (!parentIsole) {
      return 0
    } else {
      if (enfantsGardeTotale == 0 && autresHandicapesHeberges == 0) {
        if (enfantsGardeAlternee == 0) {
          return -1
        } else if (enfantsGardeAlternee == 1) {
          return 0.25
        } else {
          // enfantsGardeAlterne >= 2
          return 0.5
        }
      } else {
        return 0.5
      }
    }
  }

  // calcul ancien parent isole
  const partAncienParentIsole = (ancienParentIsole: number) => {
    return 0.5 * ancienParentIsole
  }

  // calcul part ancien combattant
  const partAncienCombattant = (anciensCombattants: number) => {
    if (anciensCombattants > 0) {
      return 0.5
    } else {
      return 0
    }
  }

  // calcul part veuve de guerre
  const partVeuveGuerre = (veuveGuerre: number) => {
    return 0.5 * veuveGuerre
  }

  // calcul part veuve ancien combattant
  const partVeuveAncienCombattant = (veuveAncienCombattant: number) => {
    return 0.5 * veuveAncienCombattant
  }

  // parts invalides
  const partsInvalides = (invalides: number) => {
    return 0.5 * invalides
  }

  //parts autres handicapes heberges
  const partsAutresHandicapesHeberges = (autresHandicapesHeberges: number) => {
    return autresHandicapesHeberges
  }

  const totalCompute = [
    partsSituationMaritale(situationMaritale),
    partsEnfantsGardeTotale(enfantsGardeTotale, autresHandicapesHeberges),
    partsEnfantsGardeAlternee(
      enfantsGardeTotale,
      enfantsGardeAlternee,
      autresHandicapesHeberges
    ),
    partsEnfantsHandicapes(
      enfantsHandicapesGardeTotale,
      enfantsHandicapesGardeAlternee
    ),
    partParentIsole(
      parentIsole,
      enfantsGardeTotale,
      enfantsGardeAlternee,
      autresHandicapesHeberges
    ),
    partAncienParentIsole(ancienParentIsole),
    partAncienCombattant(anciensCombattants),
    partVeuveGuerre(veuveGuerre),
    partVeuveAncienCombattant(veuveAncienCombattant),
    partsInvalides(invalides),
    partsAutresHandicapesHeberges(autresHandicapesHeberges),
  ]

  const partsTotales = totalCompute.reduce((a, b) => a + b, 0)

  res.status(200).json({
    partsSituationMaritale: totalCompute[0],
    partsEnfantsGardeTotale: totalCompute[1],
    partsEnfantsGardeAlternee: totalCompute[2],
    partsEnfantsHandicapes: totalCompute[3],
    partParentIsole: totalCompute[4],
    partAncienParentIsole: totalCompute[5],
    partAncienCombattant: totalCompute[6],
    partVeuveGuerre: totalCompute[7],
    partVeuveAncienCombattant: totalCompute[8],
    partsInvalides: totalCompute[9],
    partsAutresHandicapesHeberges: totalCompute[10],
    partsTotales,
  })
}
