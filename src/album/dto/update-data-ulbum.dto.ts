/* eslint-disable prettier/prettier */
export class UpdateDataAlbumDto{
   readonly name: string;
   readonly year: number;
   readonly artistId: string | null; // refers to Artist
}