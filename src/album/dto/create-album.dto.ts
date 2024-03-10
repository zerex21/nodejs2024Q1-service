/* eslint-disable prettier/prettier */
export class CreateAlbumDto{
   readonly id: string; // uuid v4
   readonly name: string;
   readonly year: number;
   readonly artistId: string | null; // refers to Artist
}