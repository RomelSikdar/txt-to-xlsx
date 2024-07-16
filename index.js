const fs = require("fs");
const path = require("path");
const readline = require("readline");
const xlsx = require("node-xlsx");

/**
 * Asynchronously reads a text file, processes its content, and writes the processed content to an Excel file.
 * @returns None
 */
(async () => {
  /**
   * Creates a read stream for the specified file and sets up a readline interface to read the file line by line.
   * @param {string} path - The path to the file to be read.
   * @returns None
   */
  const fileStream = fs.createReadStream(path.join(__dirname, "import.txt"));
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  /**
   * Reads lines from a ReadableStream and populates an array with each line.
   * @param {ReadableStream} rl - The ReadableStream to read lines from.
   * @returns None
   */
  const fileRow = [];
  for await (const line of rl) {
    fileRow.push(line);
  }

  /**
   * Maps over an array of file rows and splits each value by tab character,
   * then trims any leading or trailing whitespace from the content.
   * @param {string[]} fileRow - An array of strings representing file rows.
   * @returns A new array with each row split by tab and trimmed content.
   */
  const filtered = fileRow.map((val) =>
    val.split("\t").map((content) => content.trim())
  );

  /**
   * Builds an Excel file buffer using the provided data.
   * @param {Array} filtered - The data to be included in the Excel file.
   * @returns A buffer containing the Excel file.
   */
  var buffer = xlsx.build([{ name: "output", data: filtered }]);

  /**
   * Write the buffer data to an Excel file at the specified path.
   * @param {string} path - The path where the Excel file will be written.
   * @param {Buffer} buffer - The buffer data to be written to the Excel file.
   * @returns None
   */
  fs.writeFileSync(path.join(__dirname, "output.xlsx"), buffer);
})();
