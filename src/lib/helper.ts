import querystring from "querystring";
import { API_URL } from "../common/config";
import { KeyValueType } from "../common/types";

export function buildRestURI(path: string): string {
    return API_URL + path;
}

export function buildQueryString(params: KeyValueType = {}): string {
    const querystr = querystring.stringify(params);
    if (querystr !== "") {
        return "?" + querystr;
    }
    return "";
}

export default {
    buildRestURI,
    buildQueryString
}