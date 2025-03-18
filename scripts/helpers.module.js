/**
 * @module helpers
 * @description exposes some reusable functions
 * @author ceofyeast
 */

export function deepCopy(toCopy){
    return  JSON.parse(JSON.stringify(toCopy));
}