import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;
    private readonly pattern: RegExp = new RegExp('')

    constructor(other: string, delimiter?: string) {
        super();
        this.name = other
        if (delimiter)
            this.delimiter = delimiter
        this.pattern = new RegExp(`(?<!\\\\)${ESCAPE_CHARACTER}${this.delimiter}`, 'g');
        this.length = this.name.split(this.pattern).length
    }

    getNoComponents(): number {
        return this.length
    }

    getComponent(i: number): string {
        let components = this.name.split(this.pattern)
        return components[i]
    }
    setComponent(i: number, c: string) {
        let components = this.name.split(this.pattern)
        components[i] = c
        this.name = components.join(this.delimiter)
    }

    insert(i: number, c: string) {
        let components = this.name.split(this.pattern)
        components.splice(i, 0, c)
        this.name = components.join(this.delimiter)
        this.length += 1
    }
    append(c: string) {
        this.name = this.name.concat(this.delimiter + c)
        this.length += 1
    }
    remove(i: number) {
        let components = this.name.split(this.pattern)
        components.splice(i, 1)
        this.name = components.join(this.delimiter)
        this.length -= 1
    }
}
