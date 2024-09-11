export interface LoveCard {
  img: ImageCustom;
  blocked: boolean;
  date: string;
  day: number;
  hours: number;
  remainingTime?: string;
  title?: string,
  content?: string

}


export interface ImageCustom {
  url: string;
  alt: string;
}
