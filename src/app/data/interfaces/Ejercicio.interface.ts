export interface Ejercicios {
  id: number,
  descripcion: string,
  musculoObjetivo_id: MusculoObjetivo;
  parteCuerpo_id: ParteCuerpo;
  ejercicioRutinas: string;
  urlGif: string;
}

export interface MusculoObjetivo{
  id: number,
  descripcion: string,
}

export interface ParteCuerpo{
  id: number,
  descripcion: string,
}
