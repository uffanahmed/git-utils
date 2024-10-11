Here’s a `README.md` file for your utility project:

---

# Git Commit Extractor

This utility generates a CSV file containing commit details (title, hash, author, and date) for a specified Git repository, branch, and commits starting from a given date.

## Author
**Uffan Ahmed** http://www.uffanahmed.com/

## Features

- Extracts commit history for a specific branch in a Git repository.
- Filters commits starting from a specified date.
- Outputs commit details (hash, author, date, title) into a CSV file.
- Saves the CSV file in the same directory as the repository.

## Requirements

- Node.js (version 12.x or higher)
- TypeScript
- Git installed locally

## Setup

1. **Clone the repository** (if it's a GitHub repository):
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**:
   Navigate to the project directory and install the required dependencies using `npm`:

   ```bash
   npm install
   ```

3. **Install TypeScript globally (if you haven't already)**:
   ```bash
   npm install -g typescript
   ```

4. **Install ts-node globally**:
   ```bash
   npm install -g ts-node
   ```

5. **Compile the TypeScript project**:
   If you want to compile TypeScript to JavaScript, you can run:
   ```bash
   tsc
   ```

## Usage

Run the utility using the following command:

```bash
npx ts-node src/index.ts <repository-local-path> <branch-name> <start-date>
```

### Command-line arguments:

- `<repository-local-path>`: Local path to the Git repository.
- `<branch-name>`: Name of the branch to check out and extract commits from.
- `<start-date>`: Filter commits from this date onwards (`YYYY-MM-DD` format).

### Example:

```bash
npx ts-node src/index.ts /path/to/repo master 2023-01-01
```

This command generates a CSV file named `commits.csv` in the specified repository directory containing all commit information starting from January 1, 2023.

## Output

The CSV file will contain the following columns:
- **Commit Hash**: The unique hash of the commit.
- **Author**: The author of the commit.
- **Date**: The commit date.
- **Title**: The commit message or title.

## Troubleshooting

If you encounter errors related to missing Node.js built-in modules (`fs`, `path`, etc.), ensure that the `@types/node` package is installed:

```bash
npm install @types/node --save-dev
```

If you encounter Git-related errors, ensure that Git is properly installed and accessible from your command line.

## License

This project is licensed under the MIT License.

---

You can customize this as needed. Let me know if you need further adjustments!
