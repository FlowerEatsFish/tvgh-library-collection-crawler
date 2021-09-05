import { DetailType } from "../index";
import tvghLibraryCollection from "../src/index";

const timeout = 60 * 1000;

describe("Run demo", (): void => {
  it(
    "Should get one result as Object",
    async (): Promise<void> => {
      const result: DetailType | DetailType[] | null = await tvghLibraryCollection("橡皮擦計畫");

      expect(typeof result === "object" && result !== null && !Array.isArray(result)).toBeTruthy();
    },
    timeout,
  );

  it(
    "Should get max 12 results as Array",
    async (): Promise<void> => {
      const result: DetailType | DetailType[] | null = await tvghLibraryCollection(
        "Alzheimer disease",
      );

      expect(Array.isArray(result) && result.length === 12).toBeTruthy();
    },
    timeout,
  );

  it(
    "Should do not have any result as Null",
    async (): Promise<void> => {
      const result: DetailType | DetailType[] | null = await tvghLibraryCollection(
        "no-result-as-example",
      );

      expect(result == null).toBeTruthy();
    },
    timeout,
  );
});
