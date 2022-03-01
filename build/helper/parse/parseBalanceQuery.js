"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBalanceQuery = void 0;
const isPrototypeAttribute_1 = require("../isPrototypeAttribute");
const parseAccountField_1 = require("./parseAccountField");
const parseDateField_1 = require("./parseDateField");
/**
 * Turn query into an object readable by MongoDB.
 */
function parseBalanceQuery(query, book) {
    const { account, start_date, end_date, ...extra } = query;
    const filterQuery = {
        book: book.name,
        ...(0, parseAccountField_1.parseAccountField)(account, book.maxAccountPath),
    };
    if (start_date || end_date) {
        filterQuery["datetime"] = (0, parseDateField_1.parseDateQuery)(start_date, end_date);
    }
    for (const [key, value] of Object.entries(extra)) {
        if ((0, isPrototypeAttribute_1.isPrototypeAttribute)(key))
            continue;
        if (!filterQuery.meta)
            filterQuery.meta = {};
        filterQuery.meta[key] = value;
    }
    return filterQuery;
}
exports.parseBalanceQuery = parseBalanceQuery;
