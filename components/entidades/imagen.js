export class Imagen {
  uid;
  url;
  likes;
  disLikes;
  cantidadVotos;
  constructor(uid = 0, url = "", likes = [], disLikes = [], cantidadVotos = 0) {
    (this.uid = uid),
      (this.url = url),
      (this.likes = likes),
      (this.disLikes = disLikes),
      (this.cantidadVotos = cantidadVotos);
  }
}
