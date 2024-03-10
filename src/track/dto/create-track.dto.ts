/* eslint-disable prettier/prettier */
export class CreateTrackDto{
   readonly id: string; // uuid v4
   readonly name: string;
   readonly artistId: string | null; // refers to Artist
   readonly albumId: string | null; // refers to Album
   readonly duration: number;
}