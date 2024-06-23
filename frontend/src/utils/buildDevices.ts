export default function (rangeList: string): string[] {
    const ranges = rangeList.split(",");
    const resultSet: Set<string> = new Set();

    ranges.forEach((range) => {
        const [start, end] = range.split("-").map((str) => str.trim());
        if (start) {
            const rangeResult = generateRange(start, end);
            rangeResult.forEach((item) => resultSet.add(item));
        } else {
            throw new Error("Invalid range format. Expected format: start or start-end");
        }
    });

    const resultArray = Array.from(resultSet);

    // Sort the array by numeric values of the parts
    resultArray.sort((a, b) => {
        const [aA, aB, aC] = a.split(".").map(Number);
        const [bA, bB, bC] = b.split(".").map(Number);

        if (aA !== bA) {
            return aA - bA;
        } else if (aB !== bB) {
            return aB - bB;
        } else {
            return aC - bC;
        }
    });

    return resultArray;
}

function generateRange(start: string, end?: string): string[] {
    const result: Set<string> = new Set();

    // Parse the start string
    const [startA, startB, startC] = start.split(".").map(Number);

    // Default end values
    let endA: number = startA,
        endB: number = startB,
        endC: number = startC;

    // If end is provided, parse it; otherwise, assume the end is the same as start
    if (end) {
        const endParts = end.split(".").map(Number);

        if (endParts.length === 1) {
            // If only one part, it's the third part (endC)
            endC = endParts[0];
        } else if (endParts.length === 3) {
            // If three parts, use them as endA, endB, and endC
            [endA, endB, endC] = endParts;
        } else {
            throw new Error("Invalid input format. Expected format: a.b.c or c");
        }
    }

    // Validate that the format is correct
    if (isNaN(startA) || isNaN(startB) || isNaN(startC) || isNaN(endC)) {
        throw new Error("Invalid input format. Expected format: a.b.c or c");
    }

    // Ensure the ranges are valid and start is less than or equal to end
    if (startA !== endA || startB !== endB || startC > endC) {
        throw new Error(
            "Invalid range. Ensure the start is less than or equal to the end and within the same section.",
        );
    }

    // Generate the range
    for (let c = startC; c <= endC; c++) {
        result.add(`${startA}.${startB}.${c}`);
    }

    return Array.from(result);
}
