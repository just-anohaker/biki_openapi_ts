import { KeyValueType } from "../common/types";
export declare function buildRestURI(path: string): string;
export declare function buildQueryString(params?: KeyValueType): string;
declare const _default: {
    buildRestURI: typeof buildRestURI;
    buildQueryString: typeof buildQueryString;
};
export default _default;
