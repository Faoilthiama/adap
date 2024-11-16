import {describe, expect, it} from "vitest";

import {Name} from "../../../src/adap-b03/names/Name";
import {StringName} from "../../../src/adap-b03/names/StringName";
import {StringArrayName} from "../../../src/adap-b03/names/StringArrayName";

describe("Basic StringName function tests", () => {
    it("test insert", () => {
        let n: Name = new StringName("oss.fau.de");
        n.insert(1, "cs");
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
        let n: Name = new StringName("oss.cs.fau");
        n.append("de");
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
        let n: Name = new StringName("oss.cs.fau.de");
        n.remove(0);
        expect(n.asString()).toBe("cs.fau.de");
    });
    it("test asString and escaping", () => {
        let n: Name = new StringName("oss.cs.fau\\.de");
        expect(n.asString()).toBe("oss.cs.fau\\.de");
        expect(n.getNoComponents()).toBe(3)
    });
    it("test asString and escaping", () => {
        let n: Name = new StringArrayName(["oss", "cs", "fau\\.de"]);
        expect(n.asString()).toBe("oss.cs.fau\\.de");
        expect(n.getNoComponents()).toBe(3)
    });
});

describe("Basic StringArrayName function tests", () => {
    it("test insert", () => {
        let n: Name = new StringArrayName(["oss", "fau", "de"]);
        n.insert(1, "cs");
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
        let n: Name = new StringArrayName(["oss", "cs", "fau"]);
        n.append("de");
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
        let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
        n.remove(0);
        expect(n.asString()).toBe("cs.fau.de");
    });
});

describe("Delimiter function tests", () => {
    it("test insert", () => {
        let n: Name = new StringName("oss#fau#de", '#');
        n.insert(1, "cs");
        expect(n.asString()).toBe("oss#cs#fau#de");
    });
});

describe("Escape character extravaganza", () => {
    it("test escape and delimiter boundary conditions", () => {
        let n: Name = new StringName("oss.cs.fau.de", '#');
        expect(n.getNoComponents()).toBe(1);
        expect(n.asString()).toBe("oss.cs.fau.de");
        n.append("people");
        expect(n.asString()).toBe("oss.cs.fau.de#people");
    });
});

describe("Concat", () => {
    it("concat StringArrayName and StringArrayName", () => {
        let n = new StringArrayName(["oss", "cs"], '.');
        expect(n.asString()).toBe("oss.cs");
        let n2 = new StringArrayName(["fau", "de"], '#');
        expect(n2.asString()).toBe("fau#de");
        n.concat(n2);
        expect(n.asString()).toBe("oss.cs.fau.de");
    });

    it("concat StringArrayName and StringName", () => {
        let n = new StringArrayName(["oss", "cs"], '.');
        expect(n.asString()).toBe("oss.cs");
        let n2 = new StringName("fau#de", '#');
        expect(n2.asString()).toBe("fau#de");
        n.concat(n2);
        expect(n.asString()).toBe("oss.cs.fau.de");
    });

    it("concat StringName and StringName", () => {
        let n = new StringName("oss.cs", '.');
        expect(n.asString()).toBe("oss.cs");
        let n2 = new StringName("fau#de", '#');
        expect(n2.asString()).toBe("fau#de");
        n.concat(n2);
        expect(n.asString()).toBe("oss.cs.fau.de");
    });
});

describe("isEqual", () => {
    it("StringArrayName true", () => {
        let n = new StringArrayName(["oss", "cs", "fau", "de"], '.');
        let n2 = new StringArrayName(["oss", "cs", "fau", "de"], '.');
        expect(n.isEqual(n2))
    });

    it("StringArrayName false", () => {
        let n = new StringArrayName(["oss", "cs", "fau", "de"], '.');
        let n2 = new StringArrayName(["oss", "cs", "fau"], '.');
        expect(n.isEqual(n2)).toBe(false)
    });

    it("StringArrayName wrong delimiter", () => {
        let n = new StringArrayName(["oss", "cs", "fau", "de"], '.');
        let n2 = new StringArrayName(["oss", "cs", "fau", "de"], '#');
        expect(n.isEqual(n2)).toBe(false)
    });
});
