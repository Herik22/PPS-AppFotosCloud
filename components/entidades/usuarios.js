export class Usuario {
  /*
    id: 4,
            correo: "anonimo@anonimo.com",
            clave: 4444,
            perfil: "usuario",
            sexo: "masculino",
          },
     */
  correo;
  perfil;
  fotosSubidas;
  id;

  constructor(correo = "", perfil = "", fotos = [], id = 0) {
    this.correo = correo;
    this.perfil = perfil;
    this.fotosSubidas = fotos;
    this.id = id;
  }
}
