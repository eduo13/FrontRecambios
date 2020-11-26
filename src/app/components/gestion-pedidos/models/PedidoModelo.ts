import { ArticuloEnLista } from './ArticuloEnLista';
export class PedidoModelo {
    ID_Pedido?: number;
    PersonaContacto: string;
    Provincia: string;
    Poblacion: number;
    Calle: string;
    Numero: string;
    CodigoPostal: number;
    Telefono: string;
    Estado?: string;
    Articulos?: ArticuloEnLista[];
}
