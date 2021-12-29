import { validateDateRange } from "../src/client/js/dateValidation";

describe("makes sure date range entered by user is sensical", () => {
    const input1 = '2022-01-01';
    const input2 = '2022-01-02';

    test("returns truthy values if return date is at least one day after departure", () => {
        expect(validateDateRange(input1,input2)).toBeTruthy();
    });
    
    test("returns false if return date is on or before departure date", () => {
        expect(validateDateRange(input1,input1)).toBeFalsy();
        expect(validateDateRange(input2,input1)).toBeFalsy();
    });
});