import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;
    private readonly pattern: RegExp = new RegExp('')
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super();
        this.name = other
        if (delimiter)
            this.delimiter = delimiter
        this.pattern = new RegExp(`(?<!\\\\)${ESCAPE_CHARACTER}${this.delimiter}`, 'g');
        this.length = this.name.split(this.pattern).length
    }

    public getNoComponents(): number {
        return this.length
    }

    public getComponent(i: number): string {
        let components = this.name.split(this.pattern)
        return components[i]
    }
    public setComponent(i: number, c: string) {
        let components = this.name.split(this.pattern)
        components[i] = c
        this.name = components.join(this.delimiter)
    }

    public insert(i: number, c: string) {
        let components = this.name.split(this.pattern)
        components.splice(i, 0, c)
        this.name = components.join(this.delimiter)
        this.length += 1
    }
    public append(c: string) {
        this.name = this.name.concat(this.delimiter + c)
        this.length += 1
    }
    public remove(i: number) {
        let components = this.name.split(this.pattern)
        components.splice(i, 1)
        this.name = components.join(this.delimiter)
        this.length -= 1
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
