import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected length: number = 0;
    private readonly pattern: RegExp = new RegExp('')
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        this.name = other
        if (delimiter)
            this.delimiter = delimiter
        this.pattern = new RegExp(`(?<!\\\\)${ESCAPE_CHARACTER}${this.delimiter}`, 'g');
        this.length = this.name.split(this.pattern).length
    }

    public asString(delimiter: string = this.delimiter): string {
        let components = this.name.split(this.pattern)
        return components.join(delimiter)
    }

    public asDataString(): string {
        let components = this.name.split(this.pattern)
        return components.join(DEFAULT_DELIMITER)
    }

    public isEmpty(): boolean {
        return this.name.length === 0
    }

    public getDelimiterCharacter(): string {
        return this.delimiter
    }

    public getNoComponents(): number {
        return this.length
    }

    public getComponent(x: number): string {
        let components = this.name.split(this.pattern)
        return components[x]
    }

    public setComponent(n: number, c: string): void {
        let components = this.name.split(this.pattern)
        components[n] = c
        this.name = components.join(this.delimiter)
    }

    public insert(n: number, c: string): void {
        let components = this.name.split(this.pattern)
        components.splice(n, 0, c)
        this.name = components.join(this.delimiter)
        this.length += 1
    }

    public append(c: string): void {
        this.name = this.name.concat(this.delimiter + c)
        this.length += 1
    }

    public remove(n: number): void {
        let components = this.name.split(this.pattern)
        components.splice(n, 1)
        this.name = components.join(this.delimiter)
        this.length -= 1
    }

    public concat(other: Name): void {
        this.name = this.name.concat(this.delimiter + other.asString(this.delimiter))
        this.length += other.getNoComponents()
    }

}
