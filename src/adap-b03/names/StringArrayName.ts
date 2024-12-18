import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
        this.components = other
        if (delimiter)
            this.delimiter = delimiter
    }

    public getNoComponents(): number {
        return this.components.length
    }

    public getComponent(i: number): string {
        return this.components[i]
    }
    public  setComponent(i: number, c: string) {
        this.components[i] = c
    }

    public insert(i: number, c: string) {
        this.components.splice(i, 0, c)
    }
    public append(c: string) {
        this.components.push(c)
    }
    public remove(i: number) {
        this.components.splice(i, 1)
    }

    public clone(): Name {
        throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public toString(): string {
        throw new Error("needs implementation");
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation");
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }
}
