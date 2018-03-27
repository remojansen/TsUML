export interface Weapon {
    tryHit(fromDistance: number): boolean;
}

export interface Named {
    name: string;
}
