// temperature
export const toCelcius = function (farenheit:number): number { return (farenheit - 32) * 5 / 9 };

// gravity
export const toPlato = function (sg:number): number { return ((135.997 * sg - 630.272) * sg + 1111.14) * sg - 616.868 };
export const toBrix = function (sg:number):number { return ((182.4601 * sg - 775.6821) * sg + 1262.7794) * sg - 669.5622 };