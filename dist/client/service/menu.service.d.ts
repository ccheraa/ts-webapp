import { MenuItemClass } from '../class';
import { Observable } from 'rxjs/rx';
export declare class MenuService {
    getItems(): Observable<MenuItemClass[]>;
}
