import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter
    }

    public asString(delimiter: string = this.delimiter): string {
        let components: string[] = []
        let len = this.getNoComponents()
        for (let i = 0; i < len; i++) {
            components.push(this.getComponent(i))
        }
        return components.join(delimiter)
    }

    public toString(): string {
        return this.asString(DEFAULT_DELIMITER)
    }

    public asDataString(): string {
        return this.asString(DEFAULT_DELIMITER)
    }

    public isEqual(other: Name): boolean {
        if (this.getDelimiterCharacter() !== other.getDelimiterCharacter()) {
            return false
        }
        let len1 = this.getNoComponents()
        let len2 = other.getNoComponents()
        if (len1 !== len2) {
            return false
        }
        for (let i = 0; i < len1; i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false
            }
        }
        return true
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Name {
        const cloned = new (this.constructor as { new(): AbstractName })();
        for (let i = 0; i < this.getNoComponents(); i++) {
            cloned.append(this.getComponent(i));
        }
        return cloned;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0
    }

    public getDelimiterCharacter(): string {
        return this.delimiter
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;

    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;

    abstract append(c: string): void;

    abstract remove(i: number): void;

    public concat(other: Name): void {
        let other_components = other.asDataString().split(DEFAULT_DELIMITER)
        for (let i = 0; i < other_components.length; i++) {
            this.append(other_components[i])
        }
    }

}
