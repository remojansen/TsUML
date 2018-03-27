import { Weapon, Named } from "./interfaces";

export class BaseWeapon {
    damage = 25;
}

export class Katana extends BaseWeapon implements Weapon, Named  {
    name = "Katana";
    public tryHit(fromDistance: number) {
        return fromDistance <= 2;
    }
}
