import { epsilon } from "./constants";

export function equals(a: number, b: number, threshold = epsilon)
{
    return Math.abs(a - b) <= threshold;
}
