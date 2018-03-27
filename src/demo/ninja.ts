import { Weapon } from "./interfaces";

export class Ninja {
    private _weapon: Weapon;
    public constructor(weapon: Weapon) {
        this._weapon = weapon;
    }
    public fight(fromDistance: number) {
        return this._weapon.tryHit(fromDistance);
    }
}
