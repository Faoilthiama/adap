import {DEFAULT_DELIMITER, Name} from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other
        if (delimiter)
            this.delimiter = delimiter
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(DEFAULT_DELIMITER);
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }

    public getNoComponents(): number {
        return this.components.length
    }

    public getComponent(i: number): string {
        return this.components[i]
    }

    public setComponent(i: number, c: string): void {
        this.components[i] = c
    }

    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c)
    }

    public append(c: string): void {
        this.components.push(c)
    }

    public remove(i: number): void {
        this.components.splice(i, 1)
    }

    public concat(other: Name): void {
        let other_components = other.asDataString().split(DEFAULT_DELIMITER)
        this.components = this.components.concat(other_components)
    }

}
